---
title: "Go Setup"
weight: 5
---

# Go Setup - One Click Plug & Play

Get SDI protection for your Go application in under 5 minutes.

## Step 1: Install SDK

```bash
go get github.com/yourusername/sdi-go
```

Or with go.mod:

```go
require github.com/yourusername/sdi-go v1.0.0
```

## Step 2: Configure

### Environment Variables

```bash
export SDI_API_KEY=your-api-key-here
export SDI_ENABLED=true
```

## Step 3: Use It

### Gin Framework Example

```go
package main

import (
    "github.com/gin-gonic/gin"
    "github.com/yourusername/sdi-go"
)

func main() {
    r := gin.Default()
    
    // SDI middleware
    sdiClient := sdi.NewClient()
    r.Use(sdiMiddleware(sdiClient))
    
    r.GET("/api/users/:id", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "id": c.Param("id"),
            "name": "John Doe",
        })
    })
    
    r.Run(":8080")
}

func sdiMiddleware(client *sdi.Client) gin.HandlerFunc {
    return func(c *gin.Context) {
        analysis := client.Analyze(&sdi.AnalysisRequest{
            Method:    c.Request.Method,
            Path:      c.Request.URL.Path,
            Headers:   c.Request.Header,
            ServiceID: "gin-app",
        })
        
        if analysis.AnomalyDetected {
            c.JSON(403, gin.H{
                "error":   "Anomaly detected",
                "score":   analysis.AnomalyScore,
                "severity": analysis.Severity,
            })
            c.Abort()
            return
        }
        
        c.Next()
    }
}
```

### Standard HTTP Example

```go
package main

import (
    "net/http"
    "github.com/yourusername/sdi-go"
)

func main() {
    sdiClient := sdi.NewClient()
    
    http.HandleFunc("/api/users/", func(w http.ResponseWriter, r *http.Request) {
        // Analyze request
        analysis := sdiClient.Analyze(&sdi.AnalysisRequest{
            Method:    r.Method,
            Path:      r.URL.Path,
            Headers:   r.Header,
            ServiceID: "http-app",
        })
        
        if analysis.AnomalyDetected {
            http.Error(w, "Anomaly detected", http.StatusForbidden)
            return
        }
        
        w.WriteHeader(http.StatusOK)
        w.Write([]byte(`{"id": "123", "name": "John Doe"}`))
    })
    
    http.ListenAndServe(":8080", nil)
}
```

### Echo Framework Example

```go
package main

import (
    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
    "github.com/yourusername/sdi-go"
)

func main() {
    e := echo.New()
    
    sdiClient := sdi.NewClient()
    
    // SDI middleware
    e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
        return func(c echo.Context) error {
            analysis := sdiClient.Analyze(&sdi.AnalysisRequest{
                Method:    c.Request().Method,
                Path:      c.Request().URL.Path,
                Headers:   c.Request().Header,
                ServiceID: "echo-app",
            })
            
            if analysis.AnomalyDetected {
                return c.JSON(403, map[string]interface{}{
                    "error":   "Anomaly detected",
                    "score":   analysis.AnomalyScore,
                    "severity": analysis.Severity,
                })
            }
            
            return next(c)
        }
    })
    
    e.GET("/api/users/:id", func(c echo.Context) error {
        return c.JSON(200, map[string]string{
            "id":   c.Param("id"),
            "name": "John Doe",
        })
    })
    
    e.Start(":8080")
}
```

## Proof It Works

### Test 1: Normal Request

```bash
curl http://localhost:8080/api/users/123
```

**Expected**: `{"id":"123","name":"John Doe"}`

### Test 2: SQL Injection Attempt

```bash
curl "http://localhost:8080/api/users?id=1 OR 1=1"
```

**Expected**:
```json
{
  "error": "Anomaly detected",
  "score": 0.92,
  "severity": "critical"
}
```

### Test 3: Unit Test

```go
package main

import (
    "testing"
    "github.com/yourusername/sdi-go"
)

func TestSDIDetection(t *testing.T) {
    client := sdi.NewClient()
    
    // Test normal request
    normal := client.Analyze(&sdi.AnalysisRequest{
        Method:    "GET",
        Path:      "/api/users/123",
        ServiceID: "test",
    })
    
    if normal.AnomalyDetected {
        t.Error("Normal request should not be detected as anomaly")
    }
    
    // Test attack
    attack := client.Analyze(&sdi.AnalysisRequest{
        Method:    "GET",
        Path:      "/api/users?id=1 OR 1=1",
        ServiceID: "test",
    })
    
    if !attack.AnomalyDetected {
        t.Error("SQL injection should be detected")
    }
    
    if attack.AnomalyScore < 0.8 {
        t.Errorf("Expected high score, got %f", attack.AnomalyScore)
    }
}
```

## Advanced Configuration

### Custom Configuration

```go
import "github.com/yourusername/sdi-go"

config := &sdi.Config{
    APIKey:          "your-key",
    DetectorThreshold: 0.7, // Lower = more sensitive
    Enabled:         true,
}

client := sdi.NewClientWithConfig(config)
```

### Context Support

```go
ctx := context.Background()
analysis := client.AnalyzeWithContext(ctx, &sdi.AnalysisRequest{
    Method:    "GET",
    Path:      "/api/users/123",
    ServiceID: "context-app",
})
```

## Troubleshooting

### Import Error?

```bash
go mod tidy
go get github.com/yourusername/sdi-go@latest
```

### Not Detecting Threats?

1. Check environment:
```go
import "os"
fmt.Println(os.Getenv("SDI_API_KEY"))
```

2. Enable debug:
```go
client := sdi.NewClient()
client.SetDebug(true)
```

## Next Steps

- [API Reference](/api/)
- [Java Setup](/java/)
- [Python Setup](/python/)

