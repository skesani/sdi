#!/bin/bash
# Performance Benchmark Script for SDI

set -e

CONTAINER_NAME="sdi-benchmark"
RESULTS_FILE="performance-results-$(date +%Y%m%d_%H%M%S).txt"

echo "SDI Performance Benchmark" > $RESULTS_FILE
echo "Date: $(date)" >> $RESULTS_FILE
echo "========================================" >> $RESULTS_FILE
echo "" >> $RESULTS_FILE

# Start container
docker run -d --name $CONTAINER_NAME -p 8080:8080 \
  -e SDI_DETECTION_ENABLED=true \
  -e SDI_KUBERNETES_ENABLED=false \
  -e SDI_KAFKA_ENABLED=false \
  sdi-sidecar:1.0.0

sleep 15

# Warmup
echo "Warming up..."
for i in {1..50}; do
    curl -s -X POST http://localhost:8080/api/sdi/analyze \
      -H "Content-Type: application/json" \
      -d "{\"method\":\"GET\",\"path\":\"/warmup$i\",\"headers\":{},\"body\":null}" > /dev/null
done

# Latency Test
echo "Testing latency..."
LATENCIES=()
for i in {1..100}; do
    START=$(date +%s%N)
    curl -s -X POST http://localhost:8080/api/sdi/analyze \
      -H "Content-Type: application/json" \
      -d "{\"method\":\"GET\",\"path\":\"/test$i\",\"headers\":{},\"body\":null}" > /dev/null
    END=$(date +%s%N)
    LATENCY=$((($END - $START) / 1000000))
    LATENCIES+=($LATENCY)
done

# Calculate statistics
IFS=$'\n' sorted=($(sort -n <<<"${LATENCIES[*]}"))
unset IFS

TOTAL=0
for lat in "${LATENCIES[@]}"; do
    TOTAL=$((TOTAL + lat))
done

AVG=$(echo "scale=2; $TOTAL / 100" | bc)
P50=${sorted[49]}
P95=${sorted[94]}
P99=${sorted[98]}

echo "Latency Results:" >> $RESULTS_FILE
echo "- Average: ${AVG}ms" >> $RESULTS_FILE
echo "- P50: ${P50}ms" >> $RESULTS_FILE
echo "- P95: ${P95}ms" >> $RESULTS_FILE
echo "- P99: ${P99}ms" >> $RESULTS_FILE
echo "" >> $RESULTS_FILE

# Throughput Test
echo "Testing throughput..."
START_TIME=$(date +%s%N)
for i in {1..1000}; do
    curl -s -X POST http://localhost:8080/api/sdi/analyze \
      -H "Content-Type: application/json" \
      -d "{\"method\":\"GET\",\"path\":\"/throughput$i\",\"headers\":{},\"body\":null}" > /dev/null
done
END_TIME=$(date +%s%N)

DURATION=$((($END_TIME - $START_TIME) / 1000000))
THROUGHPUT=$(echo "scale=2; 1000 * 1000 / $DURATION" | bc)

echo "Throughput Results:" >> $RESULTS_FILE
echo "- Duration: ${DURATION}ms" >> $RESULTS_FILE
echo "- Throughput: ${THROUGHPUT} req/s" >> $RESULTS_FILE
echo "" >> $RESULTS_FILE

# Memory Usage
MEMORY=$(docker stats $CONTAINER_NAME --no-stream --format "{{.MemUsage}}" | awk '{print $1}')
echo "Memory Usage: $MEMORY" >> $RESULTS_FILE

# Cleanup
docker stop $CONTAINER_NAME > /dev/null 2>&1
docker rm $CONTAINER_NAME > /dev/null 2>&1

echo "Results saved to: $RESULTS_FILE"
cat $RESULTS_FILE

