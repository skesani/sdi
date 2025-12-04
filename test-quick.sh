#!/bin/bash
# Simplified E2E Test - Deploy and test SDI

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

echo "========================================"
echo "   SDI Quick Test"
echo "========================================"

# Deploy
log_info "Deploying to Kubernetes..."
kubectl apply -f examples/polyglot/kubernetes-sidecar.yaml

# Wait
log_info "Waiting for pod to be ready..."
sleep 10

# Get pod name
POD_NAME=$(kubectl get pods -l app=python-app -o jsonpath='{.items[0].metadata.name}' 2>/dev/null)

if [ -z "$POD_NAME" ]; then
    log_error "No pod found!"
    kubectl get pods
    kubectl get events --sort-by='.lastTimestamp' | tail -20
    exit 1
fi

log_info "Pod: $POD_NAME"

# Check pod status
log_info "Pod status:"
kubectl get pod $POD_NAME

# Wait for containers
log_info "Waiting 30s for containers to start..."
sleep 30

# Show logs
echo ""
log_info "=== SDI Sidecar Logs ==="
kubectl logs $POD_NAME -c sdi-sidecar --tail=30 || echo "Sidecar not ready yet"

echo ""
log_info "=== Python App Logs ==="
kubectl logs $POD_NAME -c python-app --tail=30 || echo "App not ready yet"

# Try port forward and test
log_info "Testing with port-forward..."
kubectl port-forward $POD_NAME 5000:5000 8080:8080 &
PF_PID=$!
sleep 5

# Test
if curl -s http://localhost:5000/health 2>/dev/null; then
    log_success "App is responding!"
else
    log_error "App not responding"
fi

if curl -s http://localhost:8080/actuator/health 2>/dev/null; then
    log_success "SDI sidecar is responding!"
else
    log_error "SDI sidecar not responding"
fi

kill $PF_PID 2>/dev/null || true

log_info "To clean up: kubectl delete -f examples/polyglot/kubernetes-sidecar.yaml"

