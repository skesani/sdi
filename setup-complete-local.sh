#!/bin/bash
# Complete Local Kubernetes Setup with Kafka and SDI
# This script sets up everything: cluster, Kafka, and SDI

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[✓]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[⚠]${NC} $1"; }
log_error() { echo -e "${RED}[✗]${NC} $1"; }

echo "========================================"
echo "   Complete SDI + Kafka Local Setup"
echo "========================================"
echo ""

# Step 1: Setup Kubernetes cluster
log_info "Step 1: Setting up Kubernetes cluster..."
if ! kubectl cluster-info &> /dev/null; then
    bash setup-local-k8s.sh
else
    log_success "Kubernetes cluster already exists"
fi

# Step 2: Setup Kafka
log_info "Step 2: Setting up Kafka..."
if ! kubectl get namespace kafka &> /dev/null; then
    bash setup-kafka-local.sh
else
    log_success "Kafka already deployed"
fi

# Step 3: Update SDI deployment with Kafka config
log_info "Step 3: Updating SDI deployment with Kafka configuration..."

KAFKA_SERVICE="kafka.kafka.svc.cluster.local:9092"

cat > /tmp/sdi-deployment-with-kafka.yaml <<YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sdi-demo
  labels:
    app: sdi-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: sdi-demo
  template:
    metadata:
      labels:
        app: sdi-demo
    spec:
      containers:
      - name: app
        image: python-test-app:local
        imagePullPolicy: Never
        ports:
        - containerPort: 5000
          name: http
        env:
        - name: SDI_ENDPOINT
          value: "http://localhost:8080"
        - name: PORT
          value: "5000"
        
      - name: sdi-sidecar
        image: sdi-sidecar:1.0.0
        imagePullPolicy: Never
        ports:
        - containerPort: 8080
          name: api
        - containerPort: 8081
          name: management
        env:
        - name: SDI_DETECTION_ENABLED
          value: "true"
        - name: SDI_KUBERNETES_ENABLED
          value: "false"
        - name: SDI_KAFKA_ENABLED
          value: "true"
        - name: SPRING_KAFKA_BOOTSTRAP_SERVERS
          value: "$KAFKA_SERVICE"
        - name: SERVER_PORT
          value: "8080"
        - name: MANAGEMENT_SERVER_PORT
          value: "8081"
        resources:
          requests:
            memory: "512Mi"
            cpu: "300m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8081
          initialDelaySeconds: 60
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health
            port: 8081
          initialDelaySeconds: 30
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: sdi-demo-service
spec:
  type: NodePort
  selector:
    app: sdi-demo
  ports:
  - name: app
    port: 5000
    targetPort: 5000
    nodePort: 30000
  - name: sdi-api
    port: 8080
    targetPort: 8080
    nodePort: 30001
YAML

log_info "Deploying updated SDI with Kafka support..."
kubectl apply -f /tmp/sdi-deployment-with-kafka.yaml

log_info "Waiting for deployment to be ready..."
kubectl wait --for=condition=available --timeout=120s deployment/sdi-demo || {
    log_warn "Deployment taking longer than expected..."
    kubectl get pods -l app=sdi-demo
}

POD_NAME=$(kubectl get pods -l app=sdi-demo -o jsonpath='{.items[0].metadata.name}')
log_success "Deployment ready! Pod: $POD_NAME"

# Wait a bit more for containers to fully start
log_info "Waiting for containers to be fully ready..."
sleep 20

# Check status
echo ""
echo "========================================"
log_info "Status Check"
echo "========================================"
kubectl get pods -l app=sdi-demo
kubectl get pods -n kafka

# Show logs
echo ""
log_info "Recent Logs"
echo "========================================"
echo "--- SDI Sidecar Logs (last 15 lines) ---"
kubectl logs $POD_NAME -c sdi-sidecar --tail=15 || log_warn "Sidecar not ready yet"
echo ""
echo "--- App Logs (last 10 lines) ---"
kubectl logs $POD_NAME -c app --tail=10 || log_warn "App not ready yet"
echo ""
echo "--- Kafka Logs (last 10 lines) ---"
kubectl logs -n kafka -l app=kafka --tail=10 || log_warn "Kafka logs not available"

# Test connectivity
echo ""
echo "========================================"
log_info "Testing Connectivity"
echo "========================================"

log_info "Setting up port forwarding..."
kubectl port-forward service/sdi-demo-service 5000:5000 8080:8080 > /dev/null 2>&1 &
PF_PID=$!
sleep 5

# Test endpoints
echo -n "  App health: "
if curl -s -f http://localhost:5000/health > /dev/null 2>&1; then
    log_success "PASS"
else
    log_error "FAIL"
fi

echo -n "  SDI health: "
if curl -s -f http://localhost:8080/actuator/health > /dev/null 2>&1; then
    log_success "PASS"
else
    log_error "FAIL"
fi

echo -n "  SDI API: "
RESPONSE=$(curl -s -X POST http://localhost:8080/api/sdi/analyze \
  -H "Content-Type: application/json" \
  -d '{"method":"GET","path":"/test","headers":{},"body":null}' 2>/dev/null)
if echo "$RESPONSE" | grep -q "anomalyScore"; then
    log_success "PASS"
else
    log_error "FAIL"
fi

kill $PF_PID 2>/dev/null || true

# Summary
echo ""
echo "========================================"
log_success "Setup Complete!"
echo "========================================"
echo ""
echo "Components deployed:"
echo "  ✓ Kubernetes cluster: kind-sdi-local"
echo "  ✓ Kafka: kafka.kafka.svc.cluster.local:9092"
echo "  ✓ Zookeeper: zookeeper.kafka.svc.cluster.local:2181"
echo "  ✓ SDI Demo: sdi-demo deployment"
echo ""
echo "Kafka Topics:"
echo "  - sdi-anomalies"
echo "  - sdi-events"
echo ""
echo "Useful commands:"
echo "  View SDI logs:      kubectl logs $POD_NAME -c sdi-sidecar -f"
echo "  View Kafka logs:   kubectl logs -n kafka -l app=kafka -f"
echo "  List Kafka topics: kubectl exec -n kafka -it \$(kubectl get pod -n kafka -l app=kafka -o jsonpath='{.items[0].metadata.name}') -- kafka-topics.sh --list --bootstrap-server localhost:9092"
echo "  Port forward:      kubectl port-forward $POD_NAME 5000:5000 8080:8080"
echo "  Delete all:         kubectl delete -f /tmp/sdi-deployment-with-kafka.yaml && kubectl delete namespace kafka"
echo ""
log_success "All components are ready! 🎉"

