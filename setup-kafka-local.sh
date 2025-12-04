#!/bin/bash
# Setup Kafka in Local Kubernetes Cluster for SDI

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
echo "   Kafka Setup for Local Kubernetes"
echo "========================================"
echo ""

# Check if cluster exists
if ! kubectl cluster-info &> /dev/null; then
    log_error "No Kubernetes cluster found. Please run setup-local-k8s.sh first"
    exit 1
fi

log_success "Kubernetes cluster found"

# Deploy Kafka using Bitnami Helm chart or direct manifests
log_info "Deploying Kafka and Zookeeper..."

# Create namespace if it doesn't exist
kubectl create namespace kafka --dry-run=client -o yaml | kubectl apply -f -

# Deploy Kafka in KRaft mode (no Zookeeper needed)
log_info "Deploying Kafka (KRaft mode - no Zookeeper)..."
cat <<'EOF' | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kafka
  namespace: kafka
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kafka
  template:
    metadata:
      labels:
        app: kafka
    spec:
      containers:
      - name: kafka
        image: apache/kafka:3.7.0
        ports:
        - containerPort: 9092
          name: kafka
        env:
        - name: KAFKA_NODE_ID
          value: "1"
        - name: KAFKA_PROCESS_ROLES
          value: "broker,controller"
        - name: KAFKA_CONTROLLER_QUORUM_VOTERS
          value: "1@localhost:9093"
        - name: KAFKA_LISTENERS
          value: "PLAINTEXT://:9092,CONTROLLER://:9093"
        - name: KAFKA_ADVERTISED_LISTENERS
          value: "PLAINTEXT://kafka.kafka.svc.cluster.local:9092"
        - name: KAFKA_LISTENER_SECURITY_PROTOCOL_MAP
          value: "CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT"
        - name: KAFKA_CONTROLLER_LISTENER_NAMES
          value: "CONTROLLER"
        - name: KAFKA_INTER_BROKER_LISTENER_NAME
          value: "PLAINTEXT"
        - name: KAFKA_AUTO_CREATE_TOPICS_ENABLE
          value: "true"
        - name: KAFKA_LOG_RETENTION_HOURS
          value: "168"
        - name: KAFKA_LOG_RETENTION_BYTES
          value: "1073741824"
        - name: KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR
          value: "1"
        - name: KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR
          value: "1"
        - name: KAFKA_TRANSACTION_STATE_LOG_MIN_ISR
          value: "1"
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
---
apiVersion: v1
kind: Service
metadata:
  name: kafka
  namespace: kafka
spec:
  type: ClusterIP
  ports:
  - port: 9092
    targetPort: 9092
    name: kafka
  selector:
    app: kafka
EOF

log_info "Waiting for Kafka to be ready (this may take 1-2 minutes)..."
kubectl wait --for=condition=available --timeout=120s deployment/kafka -n kafka || {
    log_warn "Kafka not ready yet, checking status..."
    kubectl get pods -n kafka
    kubectl logs -n kafka -l app=kafka --tail=20
}

log_success "Kafka deployed!"

# Get Kafka service address
KAFKA_SERVICE="kafka.kafka.svc.cluster.local:9092"
log_info "Kafka service: $KAFKA_SERVICE"

# Create Kafka topics for SDI
log_info "Creating SDI Kafka topics..."
sleep 10  # Give Kafka more time to start

kubectl run kafka-client -n kafka --rm -i --restart=Never \
  --image=apache/kafka:3.7.0 -- \
  kafka-topics.sh --create \
  --bootstrap-server $KAFKA_SERVICE \
  --topic sdi-anomalies \
  --partitions 1 \
  --replication-factor 1 || log_warn "Topic may already exist"

kubectl run kafka-client -n kafka --rm -i --restart=Never \
  --image=apache/kafka:3.7.0 -- \
  kafka-topics.sh --create \
  --bootstrap-server $KAFKA_SERVICE \
  --topic sdi-events \
  --partitions 1 \
  --replication-factor 1 || log_warn "Topic may already exist"

log_success "Kafka topics created"

# Show status
echo ""
echo "========================================"
log_info "Kafka Status"
echo "========================================"
kubectl get pods -n kafka
kubectl get svc -n kafka

echo ""
log_success "Kafka is ready!"
echo ""
echo "Kafka Bootstrap Server: $KAFKA_SERVICE"
echo ""
echo "To use Kafka with SDI, set these environment variables:"
echo "  KAFKA_BOOTSTRAP_SERVERS=$KAFKA_SERVICE"
echo "  SDI_KAFKA_ENABLED=true"
echo ""
echo "Useful commands:"
echo "  View Kafka logs:    kubectl logs -n kafka -l app=kafka -f"
echo "  List topics:        kubectl run kafka-client -n kafka --rm -i --restart=Never --image=apache/kafka:3.7.0 -- kafka-topics.sh --list --bootstrap-server $KAFKA_SERVICE"
echo "  Delete Kafka:       kubectl delete namespace kafka"

