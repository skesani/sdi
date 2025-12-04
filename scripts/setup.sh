#!/bin/bash
set -e

echo "=== Synthetic Digital Immunity (SDI) Setup Script ==="

# Check prerequisites
echo "Checking prerequisites..."
command -v java >/dev/null 2>&1 || { echo "Java not found. Please install Java 17+"; exit 1; }
command -v mvn >/dev/null 2>&1 || { echo "Maven not found. Please install Maven"; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "Docker not found. Please install Docker"; exit 1; }
command -v kubectl >/dev/null 2>&1 || { echo "kubectl not found. Please install kubectl"; exit 1; }

echo "✓ Prerequisites check passed"

# Generate diagrams
echo ""
echo "Generating architecture diagrams..."
cd "$(dirname "$0")/.."
python3 diagrams/generate_figures.py || {
    echo "Warning: Diagram generation failed. Make sure matplotlib is installed: pip3 install matplotlib"
}

# Build SDI Core
echo ""
echo "Building SDI Core..."
cd sdi-core
mvn clean install -DskipTests
cd ..

# Build demo services
echo ""
echo "Building demo services..."
cd demo-services/service1
mvn clean package -DskipTests
cd ../..

# Build Docker images (if Docker is available)
if command -v docker >/dev/null 2>&1; then
    echo ""
    echo "Building Docker images..."
    docker build -t sdi-core:latest -f sdi-core/Dockerfile sdi-core/ || echo "Warning: Docker build failed"
    docker build -t service1:latest -f demo-services/service1/Dockerfile demo-services/service1/ || echo "Warning: Docker build failed"
fi

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Ensure Kubernetes cluster is running and kubectl is configured"
echo "2. Deploy Kafka (if not already deployed):"
echo "   kubectl apply -f k8s/kafka/  # (create Kafka manifests if needed)"
echo "3. Deploy SDI Core:"
echo "   kubectl apply -f k8s/"
echo "4. Check deployment status:"
echo "   kubectl get pods -n sdi"
echo ""
echo "For AWS deployment, see docs/aws-setup.md"

