---
title: "Node.js Setup"
weight: 4
---

# Node.js Setup - One Click Plug & Play

Get SDI protection for your Node.js application in under 5 minutes.

## Step 1: Install SDK

```bash
npm install sdi-nodejs
```

Or with yarn:

```bash
yarn add sdi-nodejs
```

## Step 2: Configure

### Environment Variables

```bash
export SDI_API_KEY=your-api-key-here
export SDI_ENABLED=true
```

Or create `.env` file:

```env
SDI_API_KEY=your-api-key-here
SDI_ENABLED=true
SDI_DETECTOR_THRESHOLD=0.8
```

## Step 3: Use It

### Express.js Example

```javascript
const express = require('express');
const { SdiClient } = require('sdi-nodejs');

const app = express();
const sdi = new SdiClient(); // Auto-loads from env vars

// Middleware for automatic protection
app.use((req, res, next) => {
  const analysis = sdi.analyze({
    method: req.method,
    path: req.path,
    headers: req.headers,
    body: req.body,
    serviceId: 'express-app'
  });
  
  if (analysis.anomalyDetected) {
    return res.status(403).json({
      error: 'Anomaly detected',
      score: analysis.anomalyScore,
      severity: analysis.severity
    });
  }
  
  next();
});

app.get('/api/users/:id', (req, res) => {
  // SDI automatically protected this endpoint
  res.json({ id: req.params.id, name: 'John Doe' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Next.js API Route Example

```javascript
// pages/api/users/[id].js
import { SdiClient } from 'sdi-nodejs';

const sdi = new SdiClient();

export default async function handler(req, res) {
  // Analyze request
  const analysis = sdi.analyze({
    method: req.method,
    path: req.url,
    headers: req.headers,
    serviceId: 'nextjs-app'
  });
  
  if (analysis.anomalyDetected) {
    return res.status(403).json({
      error: 'Anomaly detected',
      score: analysis.anomalyScore
    });
  }
  
  const { id } = req.query;
  res.json({ id, name: 'John Doe' });
}
```

### NestJS Example

```typescript
// sdi.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SdiClient } from 'sdi-nodejs';

@Injectable()
export class SdiInterceptor implements NestInterceptor {
  private sdi = new SdiClient();
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    const analysis = this.sdi.analyze({
      method: request.method,
      path: request.url,
      headers: request.headers,
      serviceId: 'nestjs-app'
    });
    
    if (analysis.anomalyDetected) {
      throw new ForbiddenException('Anomaly detected');
    }
    
    return next.handle();
  }
}

// app.module.ts
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SdiInterceptor } from './sdi.interceptor';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SdiInterceptor,
    },
  ],
})
export class AppModule {}
```

## Proof It Works

### Test 1: Normal Request

```bash
curl http://localhost:3000/api/users/123
```

**Expected**: `{"id":"123","name":"John Doe"}`

### Test 2: SQL Injection Attempt

```bash
curl "http://localhost:3000/api/users?id=1 OR 1=1"
```

**Expected**:
```json
{
  "error": "Anomaly detected",
  "score": 0.92,
  "severity": "critical"
}
```

### Test 3: Programmatic Test

```javascript
const { SdiClient } = require('sdi-nodejs');

const sdi = new SdiClient();

// Test normal request
const normal = sdi.analyze({
  method: 'GET',
  path: '/api/users/123',
  headers: {},
  serviceId: 'test'
});
console.log('Normal:', normal.anomalyDetected); // false

// Test attack
const attack = sdi.analyze({
  method: 'GET',
  path: '/api/users?id=1 OR 1=1',
  headers: {},
  serviceId: 'test'
});
console.log('Attack:', attack.anomalyDetected); // true
console.log('Score:', attack.anomalyScore); // 0.92
```

## Advanced Configuration

### Custom Configuration

```javascript
const { SdiClient, SdiConfig } = require('sdi-nodejs');

const config = new SdiConfig({
  apiKey: 'your-key',
  detectorThreshold: 0.7, // Lower = more sensitive
  enabled: true
});

const sdi = new SdiClient(config);
```

### Async/Await Support

```javascript
const { AsyncSdiClient } = require('sdi-nodejs');

const sdi = new AsyncSdiClient();

async function checkRequest(req) {
  const analysis = await sdi.analyzeAsync({
    method: req.method,
    path: req.path,
    headers: req.headers,
    serviceId: 'async-app'
  });
  
  return analysis;
}
```

### TypeScript Types

```typescript
import { SdiClient, AnalysisResponse } from 'sdi-nodejs';

const sdi = new SdiClient();

function analyzeRequest(req: Request): AnalysisResponse {
  return sdi.analyze({
    method: req.method,
    path: req.url,
    headers: req.headers,
    serviceId: 'typescript-app'
  });
}
```

## Troubleshooting

### Module Not Found?

```bash
npm install sdi-nodejs --save
```

### Not Detecting Threats?

1. Check environment variables:
```javascript
console.log(process.env.SDI_API_KEY);
console.log(process.env.SDI_ENABLED);
```

2. Enable debug mode:
```javascript
const sdi = new SdiClient({ debug: true });
```

## Next Steps

- [API Reference](/api/)
- [Java Setup](/java/)
- [Python Setup](/python/)

