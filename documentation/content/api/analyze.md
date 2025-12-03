---
title: "Analysis"
weight: 1
---

# Analysis

Analyze a request for anomalies and security threats.

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

Analyzes an HTTP request for anomalies and potential security threats.

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

**Request**

```bash
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

**Response**

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

