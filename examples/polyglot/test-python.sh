#!/bin/bash
# Test Python Flask application with SDI

set -e

echo "=== Testing Python Flask + SDI ==="

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

# Install Python dependencies
echo "Installing Python dependencies..."
cd "$(dirname "$0")"
pip3 install -q flask requests

# Set SDI endpoint
export SDI_ENDPOINT=http://localhost:8080

# Run Flask app in background
echo "Starting Flask application..."
python3 python-flask-app.py &
FLASK_PID=$!

# Wait for Flask to start
sleep 3

# Test the application
echo ""
echo "Testing Flask application..."
echo "1. Testing normal request:"
curl -s http://localhost:5000/api/data | jq '.'

echo ""
echo "2. Testing user request:"
curl -s http://localhost:5000/api/users/123 | jq '.'

echo ""
echo "3. Testing potentially malicious request:"
curl -s "http://localhost:5000/api/users/123?query='; DROP TABLE users--" | jq '.'

# Cleanup
echo ""
echo "Cleaning up..."
kill $FLASK_PID 2>/dev/null || true
docker stop sdi-sidecar-test 2>/dev/null || true
docker rm sdi-sidecar-test 2>/dev/null || true

echo ""
echo "=== Test completed ==="

