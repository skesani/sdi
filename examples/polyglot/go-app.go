// Go app using SDI sidecar
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "log"
    "net/http"
    "os"
    "time"
)

var sdiURL = getEnv("SDI_URL", "http://localhost:8080")
var sdiEnabled = getEnv("SDI_ENABLED", "true") == "true"

type SDIRequest struct {
    ServiceID string            `json:"serviceId"`
    Path      string            `json:"path"`
    Method    string            `json:"method"`
    Headers   map[string]string `json:"headers"`
    Body      string            `json:"body"`
}

type SDIResponse struct {
    AnomalyDetected bool    `json:"anomalyDetected"`
    AnomalyScore    float64 `json:"anomalyScore"`
    Severity        string  `json:"severity"`
}

// SDI middleware
func sdiMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        if !sdiEnabled {
            next(w, r)
            return
        }

        // Read body
        body, _ := io.ReadAll(r.Body)
        r.Body = io.NopCloser(bytes.NewBuffer(body))

        // Send to SDI sidecar
        sdiReq := SDIRequest{
            ServiceID: "go-app",
            Path:      r.URL.Path,
            Method:    r.Method,
            Headers:   make(map[string]string),
            Body:      string(body),
        }

        for key, values := range r.Header {
            if len(values) > 0 {
                sdiReq.Headers[key] = values[0]
            }
        }

        jsonData, _ := json.Marshal(sdiReq)

        client := &http.Client{Timeout: 1 * time.Second}
        resp, err := client.Post(
            fmt.Sprintf("%s/api/v1/analyze", sdiURL),
            "application/json",
            bytes.NewBuffer(jsonData),
        )

        if err != nil {
            // Fail open
            log.Printf("SDI check failed: %v", err)
            next(w, r)
            return
        }
        defer resp.Body.Close()

        var sdiResp SDIResponse
        json.NewDecoder(resp.Body).Decode(&sdiResp)

        if sdiResp.AnomalyDetected {
            log.Printf("⚠️  Anomaly detected! Severity: %s, Score: %.2f", 
                sdiResp.Severity, sdiResp.AnomalyScore)

            // Block critical anomalies
            if sdiResp.Severity == "critical" {
                http.Error(w, "Request blocked by SDI", http.StatusForbidden)
                return
            }
        }

        next(w, r)
    }
}

func usersHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method == "GET" {
        json.NewEncoder(w).Encode(map[string]interface{}{
            "users": []string{"alice", "bob"},
        })
    } else if r.Method == "POST" {
        json.NewEncoder(w).Encode(map[string]string{
            "message": "User created",
        })
    }
}

func dataHandler(w http.ResponseWriter, r *http.Request) {
    json.NewEncoder(w).Encode(map[string]string{
        "data": "some data",
    })
}

func main() {
    http.HandleFunc("/api/users", sdiMiddleware(usersHandler))
    http.HandleFunc("/api/data", sdiMiddleware(dataHandler))

    port := getEnv("PORT", "3000")
    log.Printf("Server running on port %s", port)
    log.Printf("SDI sidecar: %s", sdiURL)
    log.Fatal(http.ListenAndServe(":"+port, nil))
}

func getEnv(key, defaultValue string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultValue
}

