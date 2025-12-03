---
title: "Getting Started"
weight: 5
---

# Getting Started

Get up and running with SDI in 5 minutes. This guide will walk you through installing SDI and making your first API call.

![SDI Quick Start](/images/quick-start.png)

## Prerequisites

- A microservice application (Java, Python, Node.js, or Go)
- Kubernetes cluster (optional, for sidecar deployment)
- API key from your SDI dashboard

## Installation

### Java (Spring Boot)

Add the dependency to your `pom.xml`:

```xml
<dependency>
  <groupId>com.sdi</groupId>
  <artifactId>sdi-spring-boot-starter</artifactId>
  <version>1.0.0</version>
</dependency>
```

Or for Gradle:

```groovy
implementation 'com.sdi:sdi-spring-boot-starter:1.0.0'
```

Configure in `application.yml`:

```yaml
sdi:
  api-key: ${SDI_API_KEY}
  enabled: true
```

### Python

```bash
pip install sdi-python
```

```python
import sdi

client = sdi.SdiClient(api_key='your_api_key')
```

### Node.js

```bash
npm install sdi-nodejs
```

```javascript
const sdi = require('sdi');

const client = new sdi.Client('your_api_key');
```

### Go

```bash
go get github.com/yourusername/sdi-go
```

```go
import "github.com/yourusername/sdi-go"

client := sdi.NewClient("your_api_key")
```

## Your First Request

Let's analyze a simple HTTP request:

```shell
curl https://api.yourservice.com/api/sdi/analyze \
  -X POST \
  -H "Authorization: Bearer your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "method": "GET",
    "path": "/api/users",
    "serviceId": "my-service"
  }'
```

## Next Steps

- Read the [Authentication guide](/authentication) to learn about API keys
- Explore the [Analysis endpoint](/analyze) for detailed usage
- Check out [Error handling](/errors) for robust integration
- Deploy with [Kubernetes sidecar](/docs/deployment) for automatic protection

