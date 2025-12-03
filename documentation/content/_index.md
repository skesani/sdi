---
title: "SDI API Reference"
weight: 1
---

# Introduction

Welcome to the SDI API! Synthetic Digital Immunity (SDI) is an AI-driven, bio-inspired cybersecurity solution for microservices that provides autonomous threat detection and polymorphic defense.

> **Note**: This documentation follows the same structure and style as [Stainless API docs](https://www.stainless.com/docs) for consistency and clarity.

You can use our API to access SDI endpoints for analyzing HTTP requests, detecting anomalies, and protecting your microservices in real-time.

We have language bindings in **Java**, **Python**, and **Node.js**! You can view code examples in the dark area to the right, and you can switch the programming language of the examples with the tabs in the top right.

## What is SDI?

SDI mimics the human immune system's adaptive response to threats:

- **Detection**: AI-powered anomaly detection analyzes request patterns
- **Isolation**: Suspicious requests are routed to honeypots
- **Antigen Extraction**: Genetic algorithms identify attack signatures
- **Mutation Synthesis**: Code mutations create polymorphic defenses
- **Propagation**: Immunizations are deployed across the microservices ecosystem

## Key Features

- **Autonomous Threat Detection**: Machine learning models detect anomalies in real-time
- **Polymorphic Defense**: Self-healing code mutations adapt to new threats
- **Platform Independent**: Works with any language via REST API or sidecar pattern
- **Zero Configuration**: Plug-and-play Spring Boot starter for Java applications
- **Kubernetes Native**: Seamless integration with Kubernetes deployments

## Base URL

```
http://localhost:8080/api/sdi
```

## Client Libraries

- **Java**: Spring Boot Starter (Maven/Gradle) - `com.sdi:sdi-spring-boot-starter:1.0.0`
- **Python**: `pip install sdi-python`
- **Node.js**: `npm install sdi-nodejs`

By default, the SDI API Docs demonstrate using `curl` to interact with the API over HTTP. Select one of our official client libraries to see examples in code.

## Quick Start

<aside class="notice">
Get started in 5 minutes! Add the dependency to your project and start protecting your services immediately.
</aside>

### Java (Spring Boot)

```xml
<dependency>
  <groupId>com.sdi</groupId>
  <artifactId>sdi-spring-boot-starter</artifactId>
  <version>1.0.0</version>
</dependency>
```

### Python

```bash
pip install sdi-python
```

### Node.js

```bash
npm install sdi-nodejs
```

## Just getting started?

Check out our [Getting Started Guide](/getting-started).

## Not a developer?

Use SDI's sidecar pattern for automatic protection without code changes. Deploy the SDI sidecar alongside your services in Kubernetes for instant protection.
