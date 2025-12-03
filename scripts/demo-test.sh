#!/bin/bash
# Simple demo test script for SDI

set -e

echo "=== SDI Demo Test Script ==="
echo ""

# Check if SDI Core is running
SDI_URL="${SDI_URL:-http://localhost:8080}"

echo "Testing SDI Core at: $SDI_URL"
echo ""

# Test 1: Health check
echo "1. Testing health endpoint..."
curl -s "$SDI_URL/actuator/health" | jq '.' || echo "Health check failed"
echo ""

# Test 2: Simulate normal request
echo "2. Simulating normal request..."
curl -s -X POST "$SDI_URL/api/process" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "action": "getData",
    "timestamp": "'$(date +%s)'"
  }' | jq '.' || echo "Request failed"
echo ""

# Test 3: Simulate anomalous request (should trigger detection)
echo "3. Simulating anomalous request (should trigger SDI pipeline)..."
curl -s -X POST "$SDI_URL/api/process" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "../../etc/passwd",
    "action": "malicious_payload",
    "payload": "'$(python3 -c "import base64; print(base64.b64encode(b'shellcode').decode())")'",
    "timestamp": "'$(date +%s)'"
  }' | jq '.' || echo "Anomalous request sent"
echo ""

echo "=== Demo Test Complete ==="
echo ""
echo "Check logs for SDI pipeline execution:"
echo "  kubectl logs -n sdi deployment/sdi-core -f"
echo ""
echo "Or if running locally:"
echo "  Check application logs for 'PRE Pipeline' messages"

