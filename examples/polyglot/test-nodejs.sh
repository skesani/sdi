#!/bin/bash
# Test Node.js Express application with SDI

set -e

echo "=== Testing Node.js Express + SDI ==="

# Start SDI sidecar in background
echo "Starting SDI sidecar..."
docker run -d --name sdi-sidecar-test \
  -p 8080:8080 \
  -e SDI_DETECTION_ENABLED=false \
  -e SDI_KUBERNETES_ENABLED=false \
  -e SDI_KAFKA_ENABLED=false \
  sdi-sidecar:1.0.0

# Wait for sidecar to be ready
echo "Waiting for sidecar to be ready..."
sleep 5

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
cd "$(dirname "$0")"
npm install --silent express axios

# Set SDI endpoint
export SDI_ENDPOINT=http://localhost:8080

# Run Express app in background
echo "Starting Express application..."
node nodejs-express-app.js &
NODE_PID=$!

# Wait for Express to start
sleep 3

# Test the application
echo ""
echo "Testing Express application..."
echo "1. Testing normal request:"
curl -s http://localhost:3000/api/data | jq '.'

echo ""
echo "2. Testing user request:"
curl -s http://localhost:3000/api/users/456 | jq '.'

echo ""
echo "3. Testing potentially malicious request:"
curl -s "http://localhost:3000/api/users/456?input=<script>alert('xss')</script>" | jq '.'

# Cleanup
echo ""
echo "Cleaning up..."
kill $NODE_PID 2>/dev/null || true
docker stop sdi-sidecar-test 2>/dev/null || true
docker rm sdi-sidecar-test 2>/dev/null || true

echo ""
echo "=== Test completed ==="

