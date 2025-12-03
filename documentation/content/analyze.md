---
title: "Analysis"
weight: 30
---

# Analysis

Analyze a request for anomalies and security threats. The analysis endpoint is the core of SDI's threat detection system.

![Analysis Flow](/images/analysis-flow.png)

## The Analysis object

This is an object representing the analysis result of an HTTP request. You can retrieve it to see if an anomaly was detected and the confidence score.

The top-level `anomalyDetected` and `anomalyScore` comprise your "analysis result."

### Attributes

#### `anomalyDetected` (boolean)
Whether an anomaly was detected in the request.

#### `anomalyScore` (number)
Confidence score of the detected anomaly (0.0 to 1.0). Higher values indicate higher confidence.

#### `severity` (string)
Severity level of the detected anomaly. One of `low`, `medium`, `high`, or `critical`.

#### `serviceId` (string)
Identifier for the service that made the request.

#### `timestamp` (number)
Unix timestamp of when the analysis was performed.

#### `pipelineTriggered` (boolean)
Whether the full PRE pipeline was triggered due to high severity.

### The Analysis object

```json
{
  "anomalyDetected": false,
  "anomalyScore": 0.12,
  "severity": "low",
  "serviceId": "user-service",
  "timestamp": 1701234567890,
  "pipelineTriggered": false
}
```

## POST /api/sdi/analyze

Analyzes an HTTP request for anomalies and potential security threats. This endpoint uses machine learning models to detect suspicious patterns in real-time.

![Request Flow](/images/request-flow.png)

```shell
curl https://api.yourservice.com/api/sdi/analyze \
  -X POST \
  -H "Authorization: Bearer sdi_test_your_key" \
  -H "Content-Type: application/json" \
  -d '{
    "method": "GET",
    "path": "/api/users/123",
    "headers": {
      "User-Agent": "Mozilla/5.0",
      "Accept": "application/json"
    },
    "body": null,
    "serviceId": "user-service"
  }'
```

```java
import com.sdi.SdiClient;
import com.sdi.api.SdiRestApi.AnalysisRequest;
import com.sdi.api.SdiRestApi.AnalysisResponse;

SdiClient client = new SdiClient("sdi_test_your_key");

AnalysisRequest request = new AnalysisRequest();
request.setMethod("GET");
request.setPath("/api/users/123");
request.setServiceId("user-service");

AnalysisResponse response = client.analyze(request);

if (response.isAnomalyDetected()) {
    System.out.println("Anomaly detected: " + response.getAnomalyScore());
}
```

```python
import sdi

client = sdi.SdiClient(api_key='sdi_test_your_key')

response = client.analyze(
    method='GET',
    path='/api/users/123',
    headers={
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
    },
    service_id='user-service'
)

if response['anomaly_detected']:
    print(f"Anomaly detected: {response['anomaly_score']}")
```

```javascript
const sdi = require('sdi');

const client = new sdi.Client('sdi_test_your_key');

const response = await client.analyze({
  method: 'GET',
  path: '/api/users/123',
  headers: {
    'User-Agent': 'Mozilla/5.0',
    'Accept': 'application/json'
  },
  serviceId: 'user-service'
});

if (response.anomalyDetected) {
  console.log(`Anomaly detected: ${response.anomalyScore}`);
}
```

```go
package main

import (
    "github.com/yourusername/sdi-go"
)

client := sdi.NewClient("sdi_test_your_key")

request := &sdi.AnalysisRequest{
    Method:    "GET",
    Path:      "/api/users/123",
    ServiceID: "user-service",
}

response, err := client.Analyze(request)
if err != nil {
    log.Fatal(err)
}

if response.AnomalyDetected {
    log.Printf("Anomaly detected: %f", response.AnomalyScore)
}
```

> The above command returns JSON structured like this:

```json
{
  "anomalyDetected": false,
  "anomalyScore": 0.12,
  "severity": "low",
  "serviceId": "user-service",
  "timestamp": 1701234567890,
  "pipelineTriggered": false
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `method` | string | Yes | HTTP method (GET, POST, PUT, DELETE, etc.) |
| `path` | string | Yes | Request path |
| `headers` | object | No | HTTP headers as key-value pairs |
| `body` | string | No | Request body content |
| `serviceId` | string | No | Identifier for the service making the request |

### Returns

Returns an analysis object with anomaly detection results.

<aside class="warning">
If `anomalyScore` exceeds 0.8, the full PRE pipeline is automatically triggered, which may include deploying honeypots and generating polymorphic defenses.
</aside>

### Example: Detecting SQL Injection

```shell
curl https://api.yourservice.com/api/sdi/analyze \
  -X POST \
  -H "Authorization: Bearer sdi_test_your_key" \
  -H "Content-Type: application/json" \
  -d '{
    "method": "GET",
    "path": "/api/users?id=1 OR 1=1",
    "headers": {},
    "serviceId": "user-service"
  }'
```

```json
{
  "anomalyDetected": true,
  "anomalyScore": 0.92,
  "severity": "critical",
  "serviceId": "user-service",
  "timestamp": 1701234567890,
  "pipelineTriggered": true
}
```
