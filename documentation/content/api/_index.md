---
title: "SDI API Reference"
---

# SDI API Reference

The SDI API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

You can use the SDI API in test mode, which doesn't affect your production services. The API endpoint you use determines whether the request is in test mode or production mode.

The SDI API doesn't support bulk updates. You can work on only one request per API call.

## Base URL

```
http://localhost:8080/api/sdi
```

## Client Libraries

- Java (Spring Boot Starter)
- Python SDK
- Node.js SDK
- Go SDK

By default, the SDI API Docs demonstrate using `curl` to interact with the API over HTTP. Select one of our official client libraries to see examples in code.

## Just getting started?

Check out our [Getting Started Guide](/docs/getting-started/).

## Not a developer?

Use SDI's sidecar pattern for automatic protection without code changes.
