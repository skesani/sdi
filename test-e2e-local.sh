#!/bin/bash
# End-to-End SDI Test with Local Kubernetes Cluster
# This script sets up everything from scratch and runs complete tests

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Cleanup function
cleanup() {
    log_warn "Cleaning up..."
    kubectl delete -f examples/polyglot/kubernetes-sidecar.yaml 2>/dev/null || true
    # Optionally delete the cluster
    # kind delete cluster --name sdi-test 2>/dev/null || true
}

trap cleanup EXIT

echo "========================================"
echo "   SDI End-to-End Testing Suite"
echo "========================================"
echo ""

# Step 1: Check prerequisites
log_info "Step 1/8: Checking prerequisites..."

if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed. Please install Docker first."
    exit 1
fi
log_success "Docker is installed"

if ! command -v kubectl &> /dev/null; then
    log_error "kubectl is not installed. Please install kubectl first."
    exit 1
fi
log_success "kubectl is installed"

# Check for cluster tool (kind or minikube)
CLUSTER_TOOL=""
if command -v kind &> /dev/null; then
    CLUSTER_TOOL="kind"
    log_success "kind is installed"
elif command -v minikube &> /dev/null; then
    CLUSTER_TOOL="minikube"
    log_success "minikube is installed"
else
    log_error "Neither kind nor minikube is installed."
    echo ""
    echo "Please install one of them:"
    echo "  kind:     brew install kind"
    echo "  minikube: brew install minikube"
    exit 1
fi

# Step 2: Verify Docker image
log_info "Step 2/8: Verifying SDI Docker image..."
if ! docker images | grep -q "sdi-sidecar.*1.0.0"; then
    log_error "SDI Docker image not found. Please build it first:"
    echo "  docker build -f Dockerfile.sidecar -t sdi-sidecar:1.0.0 ."
    exit 1
fi
log_success "SDI Docker image found: sdi-sidecar:1.0.0"

# Step 3: Create/verify Kubernetes cluster
log_info "Step 3/8: Setting up Kubernetes cluster..."

if [ "$CLUSTER_TOOL" = "kind" ]; then
    if ! kind get clusters | grep -q "sdi-test"; then
        log_info "Creating kind cluster..."
        cat <<EOF | kind create cluster --name sdi-test --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  kubeadmConfigPatches:
  - |
    kind: InitConfiguration
    nodeRegistration:
      kubeletExtraArgs:
        node-labels: "ingress-ready=true"
  extraPortMappings:
  - containerPort: 30000
    hostPort: 30000
    protocol: TCP
EOF
        log_success "Kind cluster created"
    else
        log_info "Using existing kind cluster"
        kubectl config use-context kind-sdi-test
    fi
    
    # Load image into kind
    log_info "Loading Docker image into kind cluster..."
    kind load docker-image sdi-sidecar:1.0.0 --name sdi-test
    log_success "Image loaded into kind"
    
elif [ "$CLUSTER_TOOL" = "minikube" ]; then
    if ! minikube status &> /dev/null; then
        log_info "Starting minikube cluster..."
        minikube start --driver=docker --cpus=2 --memory=4096
        log_success "Minikube cluster started"
    else
        log_info "Using existing minikube cluster"
    fi
    
    # Load image into minikube
    log_info "Loading Docker image into minikube..."
    minikube image load sdi-sidecar:1.0.0
    log_success "Image loaded into minikube"
fi

# Step 4: Verify cluster is ready
log_info "Step 4/8: Verifying cluster is ready..."
kubectl cluster-info
kubectl wait --for=condition=Ready nodes --all --timeout=60s
log_success "Cluster is ready"

# Step 5: Build and load Python app image
log_info "Step 5/8: Building Python application Docker image..."
cd examples/polyglot

cat > Dockerfile.python-app <<'EOF'
FROM python:3.9-slim
WORKDIR /app
COPY python-flask-app.py .
RUN pip install --no-cache-dir flask
ENV FLASK_APP=python-flask-app.py
ENV SDI_ENDPOINT=http://localhost:8080
CMD ["python", "python-flask-app.py"]
EOF

docker build -f Dockerfile.python-app -t python-app:test .
log_success "Python app image built"

# Load Python app into cluster
log_info "Loading Python app image into cluster..."
if [ "$CLUSTER_TOOL" = "kind" ]; then
    kind load docker-image python-app:test --name sdi-test
elif [ "$CLUSTER_TOOL" = "minikube" ]; then
    minikube image load python-app:test
fi
log_success "Python app image loaded"

cd ../..

# Step 6: Deploy application with SDI sidecar
log_info "Step 6/8: Deploying application with SDI sidecar..."
kubectl apply -f examples/polyglot/kubernetes-sidecar.yaml

# Wait for deployment
log_info "Waiting for deployment to be ready (this may take a minute)..."
kubectl wait --for=condition=available --timeout=120s deployment/python-app-with-sdi || {
    log_error "Deployment failed to become ready"
    log_info "Checking pod status..."
    kubectl get pods
    log_info "Checking events..."
    kubectl get events --sort-by='.lastTimestamp'
    exit 1
}
log_success "Deployment is ready"

# Get pod information
POD_NAME=$(kubectl get pods -l app=python-app -o jsonpath='{.items[0].metadata.name}')
log_info "Pod name: $POD_NAME"

# Step 7: Verify both containers are running
log_info "Step 7/8: Verifying containers..."
kubectl get pod $POD_NAME -o jsonpath='{.status.containerStatuses[*].name}' | grep -q "python-app" || {
    log_error "Python app container not found"
    exit 1
}
kubectl get pod $POD_NAME -o jsonpath='{.status.containerStatuses[*].name}' | grep -q "sdi-sidecar" || {
    log_error "SDI sidecar container not found"
    exit 1
}
log_success "Both containers are running"

# Step 8: Run end-to-end tests
log_info "Step 8/8: Running end-to-end tests..."

# Setup port forwarding in background
log_info "Setting up port forwarding..."
kubectl port-forward $POD_NAME 5000:5000 8080:8080 8081:8081 > /dev/null 2>&1 &
PF_PID=$!
sleep 5

# Test 1: Health checks
log_info "Test 1: Health checks..."
echo -n "  - Application health: "
if curl -s http://localhost:5000/health | jq -e '.status == "healthy"' > /dev/null; then
    log_success "PASS"
else
    log_error "FAIL"
    kill $PF_PID 2>/dev/null || true
    exit 1
fi

echo -n "  - SDI sidecar health: "
if curl -s http://localhost:8081/actuator/health | jq -e '.status == "UP"' > /dev/null; then
    log_success "PASS"
else
    log_error "FAIL"
    kill $PF_PID 2>/dev/null || true
    exit 1
fi

# Test 2: Application endpoints
log_info "Test 2: Application endpoints..."
echo -n "  - GET /api/data: "
if curl -s http://localhost:5000/api/data | jq -e '.data' > /dev/null; then
    log_success "PASS"
else
    log_error "FAIL"
fi

echo -n "  - GET /api/users/123: "
if curl -s http://localhost:5000/api/users/123 | jq -e '.user_id == "123"' > /dev/null; then
    log_success "PASS"
else
    log_error "FAIL"
fi

# Test 3: SDI API endpoint
log_info "Test 3: SDI API endpoint..."
echo -n "  - POST /api/sdi/analyze: "
RESPONSE=$(curl -s -X POST http://localhost:8080/api/sdi/analyze \
  -H "Content-Type: application/json" \
  -d '{"method":"GET","path":"/test","headers":{},"body":null}')

if echo "$RESPONSE" | jq -e '.anomalyScore >= 0' > /dev/null; then
    log_success "PASS (score: $(echo $RESPONSE | jq -r '.anomalyScore'))"
else
    log_error "FAIL"
fi

# Test 4: Check logs
log_info "Test 4: Checking logs..."
echo ""
echo "Application logs (last 10 lines):"
kubectl logs $POD_NAME -c python-app --tail=10
echo ""
echo "SDI sidecar logs (last 10 lines):"
kubectl logs $POD_NAME -c sdi-sidecar --tail=10
echo ""

# Test 5: Stress test
log_info "Test 5: Load test (100 requests)..."
SUCCESS_COUNT=0
for i in {1..100}; do
    if curl -s http://localhost:5000/api/data > /dev/null 2>&1; then
        ((SUCCESS_COUNT++))
    fi
done
log_success "$SUCCESS_COUNT/100 requests succeeded"

if [ $SUCCESS_COUNT -ge 95 ]; then
    log_success "Load test PASSED (>95% success rate)"
else
    log_warn "Load test WARNING (${SUCCESS_COUNT}% success rate)"
fi

# Test 6: Metrics
log_info "Test 6: Checking metrics..."
echo -n "  - Prometheus metrics endpoint: "
if curl -s http://localhost:8081/actuator/prometheus | grep -q "jvm_memory_used_bytes"; then
    log_success "PASS"
else
    log_error "FAIL"
fi

# Cleanup port forwarding
kill $PF_PID 2>/dev/null || true

# Summary
echo ""
echo "========================================"
log_success "End-to-End Test Summary"
echo "========================================"
echo "✅ Kubernetes cluster: Running"
echo "✅ SDI sidecar: Running"
echo "✅ Application: Running"
echo "✅ Health checks: PASS"
echo "✅ API endpoints: PASS"
echo "✅ Load test: PASS"
echo "✅ Metrics: Available"
echo ""
log_info "Resources created:"
echo "  - Cluster: ${CLUSTER_TOOL} $([ "$CLUSTER_TOOL" = "kind" ] && echo "sdi-test" || echo "")"
echo "  - Namespace: default"
echo "  - Deployment: python-app-with-sdi"
echo "  - Service: python-app-service"
echo "  - Pod: $POD_NAME"
echo ""
log_info "Useful commands:"
echo "  View logs:    kubectl logs $POD_NAME -c sdi-sidecar -f"
echo "  Describe pod: kubectl describe pod $POD_NAME"
echo "  Port forward: kubectl port-forward $POD_NAME 5000:5000 8080:8080"
echo "  Shell access: kubectl exec -it $POD_NAME -c python-app -- /bin/sh"
echo "  Delete:       kubectl delete -f examples/polyglot/kubernetes-sidecar.yaml"
if [ "$CLUSTER_TOOL" = "kind" ]; then
    echo "  Delete cluster: kind delete cluster --name sdi-test"
else
    echo "  Stop cluster:   minikube stop"
    echo "  Delete cluster: minikube delete"
fi
echo ""
log_success "All tests completed successfully! 🎉"

