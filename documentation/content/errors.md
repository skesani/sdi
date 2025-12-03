---
title: "Errors"
weight: 20
---

# Errors

SDI uses conventional HTTP response codes to indicate the success or failure of an API request. In general:

- Codes in the `2xx` range indicate success.
- Codes in the `4xx` range indicate an error that failed given the information provided (e.g., a required parameter was omitted, an anomaly was detected, etc.).
- Codes in the `5xx` range indicate an error with SDI servers (these are rare).

Some `4xx` errors that could be handled programmatically (e.g., an anomaly detected) include an error code that briefly explains the error reported.

## Error Object

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

### Attributes

#### `code` (nullable string)
For some errors that could be handled programmatically, a short string indicating the error code reported.

#### `message` (nullable string)
A human-readable message providing more details about the error. For anomaly errors, these messages can be shown to your users.

#### `type` (enum)
The type of error returned. One of `anomaly_error`, `api_error`, `invalid_request_error`, or `authentication_error`

Possible enum values:
- `anomaly_error` - An anomaly was detected in the request
- `api_error` - API errors cover any other type of problem
- `invalid_request_error` - Invalid request errors arise when your request has invalid parameters
- `authentication_error` - Authentication errors occur when API keys are invalid or missing

#### `anomaly_score` (nullable number)
For anomaly errors, the confidence score of the detected anomaly (0.0 to 1.0).

#### `severity` (nullable string)
For anomaly errors, the severity level: `low`, `medium`, `high`, or `critical`.

## HTTP Status Code Summary

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Everything worked as expected. |
| 400 | Bad Request | The request was unacceptable, often due to missing a required parameter. |
| 401 | Unauthorized | No valid API key provided. |
| 403 | Forbidden | The API key doesn't have permissions to perform the request. |
| 404 | Not Found | The requested resource doesn't exist. |
| 429 | Too Many Requests | Too many requests hit the API too quickly. We recommend an exponential backoff of your requests. |
| 500, 502, 503, 504 | Server Errors | Something went wrong on SDI's end. (These are rare.) |

## Error Types

| Type | Description |
|------|-------------|
| `anomaly_error` | Anomaly errors are the most common type of error you should expect to handle. They result when SDI detects suspicious patterns in the request. |
| `api_error` | API errors cover any other type of problem (e.g., a temporary problem with SDI servers), and are extremely uncommon. |
| `invalid_request_error` | Invalid request errors arise when your request has invalid parameters. |
| `authentication_error` | Authentication errors occur when API keys are invalid or missing. |

## Handling Errors

Our client libraries raise exceptions for many reasons, such as a detected anomaly, invalid parameters, authentication errors, and network unavailability. We recommend writing code that gracefully handles all possible API exceptions.

```java
try {
    AnalysisResponse response = sdiClient.analyze(request);
} catch (AnomalyDetectedException e) {
    // Handle anomaly
    log.warn("Anomaly detected: {}", e.getAnomalyScore());
} catch (SdiException e) {
    // Handle other errors
    log.error("SDI error: {}", e.getMessage());
}
```

```python
try:
    response = client.analyze(request)
except sdi.AnomalyDetectedError as e:
    # Handle anomaly
    print(f"Anomaly detected: {e.anomaly_score}")
except sdi.SdiException as e:
    # Handle other errors
    print(f"SDI error: {e.message}")
```

```javascript
try {
    const response = await client.analyze(request);
} catch (error) {
    if (error.type === 'anomaly_error') {
        // Handle anomaly
        console.log(`Anomaly detected: ${error.anomaly_score}`);
    } else {
        // Handle other errors
        console.error(`SDI error: ${error.message}`);
    }
}
```
