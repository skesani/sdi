---
title: "Java Setup"
weight: 2
---

# Java Setup - One Click Plug & Play

Get SDI protection for your Java/Spring Boot application in under 5 minutes.

## Step 1: Add Dependency

### Maven

Add to your `pom.xml`:

```xml
<dependency>
    <groupId>com.sdi</groupId>
    <artifactId>sdi-spring-boot-starter</artifactId>
    <version>1.0.0</version>
</dependency>
```

### Gradle

Add to your `build.gradle`:

```groovy
implementation 'com.sdi:sdi-spring-boot-starter:1.0.0'
```

## Step 2: Configure (Optional)

Create or update `application.yml`:

```yaml
sdi:
  enabled: true
  api-key: ${SDI_API_KEY:your-api-key-here}
  
  # Optional: Configure detection sensitivity
  detector:
    threshold: 0.8  # Anomaly score threshold (0.0-1.0)
  
  # Optional: Enable Kafka for distributed systems
  kafka:
    enabled: false
    bootstrap-servers: localhost:9092
```

Or use environment variables:

```bash
export SDI_API_KEY=your-api-key-here
export SDI_ENABLED=true
```

## Step 3: Use It

That's it! SDI automatically protects your endpoints:

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        // SDI automatically analyzes this request
        // No code changes needed!
        return ResponseEntity.ok(userService.findById(id));
    }
}
```

## Proof It Works

### Test 1: Normal Request (Should Pass)

```bash
curl http://localhost:8080/api/users/123 \
  -H "Authorization: Bearer valid-token"
```

**Expected**: Request succeeds, no anomalies detected

### Test 2: SQL Injection Attempt (Should Be Detected)

```bash
curl "http://localhost:8080/api/users?id=1 OR 1=1" \
  -H "Authorization: Bearer valid-token"
```

**Expected**: 
- Anomaly detected (score > 0.8)
- Request isolated to honeypot
- PRE pipeline triggered

### Test 3: Check Detection Logs

```bash
# View SDI logs
tail -f logs/application.log | grep SDI
```

**Expected Output**:
```
[SDI] Anomaly detected: score=0.92, severity=CRITICAL
[SDI] Request isolated to honeypot: hp-abc123
[SDI] PRE pipeline triggered: mutation-synthesis started
```

## Advanced Configuration

### Custom Anomaly Threshold

```yaml
sdi:
  detector:
    threshold: 0.7  # Lower = more sensitive
```

### Enable Kafka for Multi-Service

```yaml
sdi:
  kafka:
    enabled: true
    bootstrap-servers: kafka-1:9092,kafka-2:9092
    topic: sdi-events
```

### Programmatic Configuration

```java
@Configuration
public class SdiConfig {
    
    @Bean
    public SdiProperties sdiProperties() {
        SdiProperties props = new SdiProperties();
        props.setEnabled(true);
        props.setApiKey("your-key");
        props.getDetector().setThreshold(0.8);
        return props;
    }
}
```

## Troubleshooting

### SDI Not Detecting Threats?

1. Check if SDI is enabled:
```yaml
sdi:
  enabled: true  # Must be true
```

2. Verify API key:
```bash
echo $SDI_API_KEY
```

3. Check logs:
```bash
grep "SDI" logs/application.log
```

### Performance Impact?

SDI adds < 5ms latency per request. Monitor with:

```java
@RestController
public class MetricsController {
    
    @Autowired
    private MeterRegistry registry;
    
    @GetMapping("/metrics/sdi")
    public Map<String, Object> sdiMetrics() {
        return Map.of(
            "avgLatency", registry.timer("sdi.analysis").mean(),
            "requests", registry.counter("sdi.requests").count()
        );
    }
}
```

## Next Steps

- [API Reference](/api/)
- [Python Setup](/python/)
- [Node.js Setup](/nodejs/)

