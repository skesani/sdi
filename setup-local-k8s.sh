#!/bin/bash
# Complete SDI Local Kubernetes Setup and Test
# This creates everything from scratch

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
echo "   SDI Local Kubernetes Setup"
echo "========================================"
echo ""

# Step 1: Check prerequisites
log_info "Checking prerequisites..."
if ! command -v kind &> /dev/null; then
    log_error "kind is not installed. Installing..."
    brew install kind
fi
log_success "kind is installed"

if ! command -v kubectl &> /dev/null; then
    log_error "kubectl is required but not installed"
    exit 1
fi
log_success "kubectl is installed"

if ! command -v docker &> /dev/null; then
    log_error "Docker is required but not installed"
    exit 1
fi
log_success "Docker is installed and running"

# Step 2: Create kind cluster
log_info "Creating kind cluster 'sdi-local'..."
cat <<EOF | kind create cluster --name sdi-local --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraPortMappings:
  - containerPort: 30000
    hostPort: 30000
    protocol: TCP
  - containerPort: 30001
    hostPort: 30001
    protocol: TCP
EOF

log_success "Kind cluster created"

# Step 3: Verify cluster
log_info "Verifying cluster..."
kubectl cluster-info --context kind-sdi-local
kubectl wait --for=condition=Ready nodes --all --timeout=60s
log_success "Cluster is ready"

# Step 4: Load Docker images
log_info "Loading Docker images into cluster..."

# Load SDI sidecar
if docker images | grep -q "sdi-sidecar.*1.0.0"; then
    log_info "Loading sdi-sidecar:1.0.0..."
    kind load docker-image sdi-sidecar:1.0.0 --name sdi-local
    log_success "SDI sidecar image loaded"
else
    log_error "sdi-sidecar:1.0.0 image not found. Please build it first:"
    echo "  docker build -f Dockerfile.sidecar -t sdi-sidecar:1.0.0 ."
    exit 1
fi

# Build and load Python app
log_info "Building Python test application..."
cd examples/polyglot

cat > Dockerfile.python-test <<'DOCKERFILE'
FROM python:3.9-slim
WORKDIR /app
COPY python-flask-app.py .
RUN pip install --no-cache-dir flask requests
ENV FLASK_RUN_HOST=0.0.0.0
CMD ["python", "python-flask-app.py"]
DOCKERFILE

docker build -f Dockerfile.python-test -t python-test-app:local . --quiet
log_success "Python app built"

log_info "Loading python-test-app:local..."
kind load docker-image python-test-app:local --name sdi-local
log_success "Python app image loaded"

cd ../..

# Step 5: Create deployment manifest
log_info "Creating Kubernetes manifests..."
cat > /tmp/sdi-deployment.yaml <<'YAML'
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
          value: "false"
        - name: SDI_KUBERNETES_ENABLED
          value: "false"
        - name: SDI_KAFKA_ENABLED
          value: "false"
        - name: SERVER_PORT
          value: "8080"
        - name: MANAGEMENT_SERVER_PORT
          value: "8081"
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

log_success "Manifests created"

# Step 6: Deploy to cluster
log_info "Deploying application with SDI sidecar..."
kubectl apply -f /tmp/sdi-deployment.yaml

log_info "Waiting for deployment to be ready (this may take up to 60 seconds)..."
kubectl wait --for=condition=available --timeout=60s deployment/sdi-demo 2>/dev/null || {
    log_warn "Deployment not ready yet, checking status..."
    kubectl get pods -l app=sdi-demo
    
    POD_NAME=$(kubectl get pods -l app=sdi-demo -o jsonpath='{.items[0].metadata.name}' 2>/dev/null)
    if [ -n "$POD_NAME" ]; then
        echo ""
        log_info "Container status:"
        kubectl get pod $POD_NAME -o jsonpath='{range .status.containerStatuses[*]}{.name}{"\t"}{.state}{"\n"}{end}'
        
        echo ""
        log_info "Checking logs..."
        echo "--- SDI Sidecar logs ---"
        kubectl logs $POD_NAME -c sdi-sidecar --tail=20 2>/dev/null || echo "No logs yet"
        echo ""
        echo "--- App logs ---"
        kubectl logs $POD_NAME -c app --tail=20 2>/dev/null || echo "No logs yet"
    fi
    
    log_error "Deployment failed. See logs above."
    exit 1
}

log_success "Deployment is ready!"

# Step 7: Get pod info
POD_NAME=$(kubectl get pods -l app=sdi-demo -o jsonpath='{.items[0].metadata.name}')
log_info "Pod name: $POD_NAME"

# Step 8: Run tests
echo ""
echo "========================================"
log_info "Running Tests"
echo "========================================"
echo ""

# Setup port forwarding
log_info "Setting up port forwarding..."
kubectl port-forward service/sdi-demo-service 5000:5000 8080:8080 > /dev/null 2>&1 &
PF_PID=$!
sleep 5

# Test 1: Health checks
log_info "Test 1: Health Checks"
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

# Test 2: API endpoints
log_info "Test 2: API Endpoints"
echo -n "  GET /api/data: "
RESPONSE=$(curl -s http://localhost:5000/api/data 2>/dev/null)
if echo "$RESPONSE" | grep -q "data"; then
    log_success "PASS"
else
    log_error "FAIL"
fi

echo -n "  GET /api/users/123: "
RESPONSE=$(curl -s http://localhost:5000/api/users/123 2>/dev/null)
if echo "$RESPONSE" | grep -q "user_id"; then
    log_success "PASS"
else
    log_error "FAIL"
fi

# Test 3: SDI Analysis
log_info "Test 3: SDI Analysis Endpoint"
echo -n "  POST /api/sdi/analyze: "
RESPONSE=$(curl -s -X POST http://localhost:8080/api/sdi/analyze \
  -H "Content-Type: application/json" \
  -d '{"method":"GET","path":"/test","headers":{},"body":null}' 2>/dev/null)

if echo "$RESPONSE" | grep -q "anomalyScore"; then
    SCORE=$(echo "$RESPONSE" | grep -o '"anomalyScore":[0-9.]*' | cut -d':' -f2)
    log_success "PASS (score: $SCORE)"
else
    log_error "FAIL"
fi

# Test 4: Load test
log_info "Test 4: Load Test (50 requests)"
SUCCESS=0
for i in {1..50}; do
    if curl -s -f http://localhost:5000/api/data > /dev/null 2>&1; then
        ((SUCCESS++))
    fi
done
log_success "$SUCCESS/50 requests succeeded"

# Cleanup port forward
kill $PF_PID 2>/dev/null || true

# Show logs
echo ""
echo "========================================"
log_info "Recent Logs"
echo "========================================"
echo ""
echo "--- Application Logs (last 10 lines) ---"
kubectl logs $POD_NAME -c app --tail=10
echo ""
echo "--- SDI Sidecar Logs (last 10 lines) ---"
kubectl logs $POD_NAME -c sdi-sidecar --tail=10

# Summary
echo ""
echo "========================================"
log_success "Setup Complete!"
echo "========================================"
echo ""
echo "Your local Kubernetes cluster is ready with SDI deployed."
echo ""
echo "Cluster: kind-sdi-local"
echo "Deployment: sdi-demo"
echo "Pod: $POD_NAME"
echo ""
echo "Useful commands:"
echo "  View pods:         kubectl get pods"
echo "  View logs:         kubectl logs $POD_NAME -c sdi-sidecar -f"
echo "  Port forward:      kubectl port-forward $POD_NAME 5000:5000 8080:8080"
echo "  Shell into pod:    kubectl exec -it $POD_NAME -c app -- /bin/bash"
echo "  Delete deployment: kubectl delete -f /tmp/sdi-deployment.yaml"
echo "  Delete cluster:    kind delete cluster --name sdi-local"
echo ""
log_success "All tests completed! 🎉"

