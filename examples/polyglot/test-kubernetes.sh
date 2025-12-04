#!/bin/bash
# Test SDI in Kubernetes environment

set -e

echo "=== Testing SDI in Kubernetes ==="

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo "Error: kubectl is not installed"
    exit 1
fi

# Check if we have a Kubernetes cluster
if ! kubectl cluster-info &> /dev/null; then
    echo "Error: No Kubernetes cluster available"
    echo "You can use minikube or kind to create a local cluster:"
    echo "  minikube start"
    echo "  OR"
    echo "  kind create cluster"
    exit 1
fi

echo "Using Kubernetes cluster:"
kubectl cluster-info | head -1

# Load the Docker image into the cluster (for local testing)
echo ""
echo "Loading SDI sidecar image into cluster..."
if command -v minikube &> /dev/null && minikube status &> /dev/null; then
    echo "Detected minikube, loading image..."
    minikube image load sdi-sidecar:1.0.0
elif command -v kind &> /dev/null; then
    echo "Detected kind, loading image..."
    kind load docker-image sdi-sidecar:1.0.0
else
    echo "Warning: Could not detect cluster type, skipping image load"
    echo "If deployment fails, you may need to push the image to a registry"
fi

# Apply the Kubernetes manifest
echo ""
echo "Deploying application with SDI sidecar..."
cd "$(dirname "$0")"
kubectl apply -f kubernetes-sidecar.yaml

# Wait for deployment to be ready
echo ""
echo "Waiting for deployment to be ready..."
kubectl wait --for=condition=available --timeout=120s deployment/python-app-with-sdi

# Get pod name
POD_NAME=$(kubectl get pods -l app=python-app -o jsonpath='{.items[0].metadata.name}')
echo "Pod name: $POD_NAME"

# Port forward to access the application
echo ""
echo "Setting up port forwarding..."
kubectl port-forward $POD_NAME 5000:5000 8080:8080 &
PF_PID=$!
sleep 3

# Test the application
echo ""
echo "Testing application through Kubernetes..."
echo "1. Testing app container:"
curl -s http://localhost:5000/health | jq '.'

echo ""
echo "2. Testing SDI sidecar health:"
curl -s http://localhost:8080/actuator/health | jq '.'

echo ""
echo "3. Testing application endpoint:"
curl -s http://localhost:5000/api/data | jq '.'

# Show logs
echo ""
echo "Application logs:"
kubectl logs $POD_NAME -c python-app --tail=20

echo ""
echo "SDI sidecar logs:"
kubectl logs $POD_NAME -c sdi-sidecar --tail=20

# Cleanup
echo ""
echo "Cleaning up..."
kill $PF_PID 2>/dev/null || true
echo "To delete the deployment, run:"
echo "  kubectl delete -f kubernetes-sidecar.yaml"

echo ""
echo "=== Test completed ==="

