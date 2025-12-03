# SDI Go SDK

Synthetic Digital Immunity SDK for Go - AI-powered cybersecurity for microservices.

## Installation

```bash
go get github.com/skesani/sdi-go
```

## Quick Start

```go
package main

import (
    "github.com/skesani/sdi-go"
    "os"
)

func main() {
    client := sdi.NewClient(os.Getenv("SDI_API_KEY"))
    
    analysis := client.Analyze(&sdi.AnalysisRequest{
        Method:    "GET",
        Path:      "/api/users/123",
        ServiceID: "my-service",
    })
    
    if analysis.AnomalyDetected {
        println("Anomaly detected:", analysis.AnomalyScore)
    }
}
```

## Documentation

Full documentation: https://github.com/skesani/sdi

## License

Apache-2.0

