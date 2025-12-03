---
title: "API Reference"
weight: 6
---

# API Reference

Complete API reference for SDI endpoints.

## Base URL

```
http://localhost:8080/api/sdi
```

## Authentication

All requests require an API key:

```bash
Authorization: Bearer your-api-key-here
```

## Endpoints

### POST /api/sdi/analyze

Analyze a request for anomalies.

**Request:**

```json
{
  "method": "GET",
  "path": "/api/users/123",
  "headers": {
    "User-Agent": "Mozilla/5.0"
  },
  "body": null,
  "serviceId": "user-service"
}
```

**Response:**

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

### POST /api/sdi/detect

Quick anomaly detection only.

**Request:**

```json
{
  "method": "POST",
  "path": "/api/login",
  "body": "username=admin&password=test"
}
```

**Response:**

```json
{
  "anomalyDetected": true,
  "score": 0.87,
  "severity": "high"
}
```

### GET /api/sdi/health

Health check endpoint.

**Response:**

```json
{
  "status": "healthy",
  "service": "sdi",
  "version": "1.0.0"
}
```

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "anomaly_detected",
    "message": "Anomaly detected in request",
    "type": "anomaly_error",
    "anomaly_score": 0.85,
    "severity": "high"
  }
}
```

## Rate Limits

- 1000 requests per minute per API key
- 10000 requests per hour per API key

## Status Codes

- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Anomaly Detected
- `429` - Rate Limit Exceeded
- `500` - Server Error
