---
title: "Python Setup"
weight: 3
---

# Python Setup - One Click Plug & Play

Get SDI protection for your Python application in under 5 minutes.

## Step 1: Install SDK

```bash
pip install sdi-python
```

Or with requirements.txt:

```txt
sdi-python==1.0.0
```

## Step 2: Configure

### Option A: Environment Variables (Recommended)

```bash
export SDI_API_KEY=your-api-key-here
export SDI_ENABLED=true
```

### Option B: Configuration File

Create `sdi_config.yaml`:

```yaml
sdi:
  enabled: true
  api_key: your-api-key-here
  detector:
    threshold: 0.8
```

## Step 3: Use It

### Flask Example

```python
from flask import Flask, request, jsonify
from sdi import SdiClient

app = Flask(__name__)
sdi_client = SdiClient()  # Auto-loads from env vars

@app.route('/api/users/<user_id>', methods=['GET'])
def get_user(user_id):
    # SDI automatically analyzes the request
    # No code changes needed!
    
    # Or manually analyze:
    analysis = sdi_client.analyze(
        method=request.method,
        path=request.path,
        headers=dict(request.headers),
        service_id='user-service'
    )
    
    if analysis['anomaly_detected']:
        return jsonify({'error': 'Anomaly detected'}), 403
    
    return jsonify({'id': user_id, 'name': 'John Doe'})

if __name__ == '__main__':
    app.run(port=5000)
```

### Django Example

```python
# middleware.py
from sdi import SdiClient

class SdiMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.sdi = SdiClient()
    
    def __call__(self, request):
        # Analyze request
        analysis = self.sdi.analyze(
            method=request.method,
            path=request.path,
            headers=dict(request.headers),
            service_id='django-app'
        )
        
        if analysis['anomaly_detected']:
            from django.http import JsonResponse
            return JsonResponse({'error': 'Anomaly detected'}, status=403)
        
        return self.get_response(request)

# settings.py
MIDDLEWARE = [
    'myapp.middleware.SdiMiddleware',  # Add this
    # ... other middleware
]
```

### FastAPI Example

```python
from fastapi import FastAPI, Request
from sdi import SdiClient

app = FastAPI()
sdi = SdiClient()

@app.middleware("http")
async def sdi_middleware(request: Request, call_next):
    analysis = sdi.analyze(
        method=request.method,
        path=request.url.path,
        headers=dict(request.headers),
        service_id='fastapi-app'
    )
    
    if analysis['anomaly_detected']:
        from fastapi.responses import JSONResponse
        return JSONResponse(
            status_code=403,
            content={'error': 'Anomaly detected', 'score': analysis['anomaly_score']}
        )
    
    return await call_next(request)

@app.get("/api/users/{user_id}")
async def get_user(user_id: int):
    return {"id": user_id, "name": "John Doe"}
```

## Proof It Works

### Test 1: Normal Request

```bash
curl http://localhost:5000/api/users/123
```

**Expected**: `{"id": 123, "name": "John Doe"}`

### Test 2: SQL Injection Attempt

```bash
curl "http://localhost:5000/api/users?id=1 OR 1=1"
```

**Expected**: 
```json
{
  "error": "Anomaly detected",
  "score": 0.92,
  "severity": "critical"
}
```

### Test 3: Check Detection

```python
from sdi import SdiClient

sdi = SdiClient()

# Test request
result = sdi.analyze(
    method='GET',
    path='/api/users?id=1 OR 1=1',
    headers={},
    service_id='test'
)

print(f"Anomaly detected: {result['anomaly_detected']}")
print(f"Score: {result['anomaly_score']}")
print(f"Severity: {result['severity']}")
```

**Expected Output**:
```
Anomaly detected: True
Score: 0.92
Severity: critical
```

## Advanced Configuration

### Custom Threshold

```python
from sdi import SdiClient, SdiConfig

config = SdiConfig(
    api_key='your-key',
    detector_threshold=0.7  # Lower = more sensitive
)
sdi = SdiClient(config=config)
```

### Enable Logging

```python
import logging
from sdi import SdiClient

logging.basicConfig(level=logging.INFO)
sdi = SdiClient()
# Now you'll see SDI logs
```

### Async Support

```python
import asyncio
from sdi import AsyncSdiClient

async def main():
    sdi = AsyncSdiClient()
    
    result = await sdi.analyze_async(
        method='GET',
        path='/api/users/123',
        headers={},
        service_id='async-app'
    )
    
    print(result)

asyncio.run(main())
```

## Troubleshooting

### Import Error?

```bash
pip install --upgrade sdi-python
```

### Not Detecting Threats?

1. Check API key:
```python
import os
print(os.getenv('SDI_API_KEY'))
```

2. Enable debug mode:
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## Next Steps

- [API Reference](/api/)
- [Java Setup](/java/)
- [Node.js Setup](/nodejs/)

