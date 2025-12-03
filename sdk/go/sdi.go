// SDI Go SDK - Language-agnostic client for Synthetic Digital Immunity
//
// Install: go get github.com/sdi/sdi-go-sdk
//
// Usage:
//
//	import "github.com/sdi/sdi-go-sdk"
//
//	client := sdi.NewClient("http://localhost:8080")
//	result, err := client.AnalyzeRequest(&sdi.AnalysisRequest{
//	    ServiceID: "my-service",
//	    Path:      "/api/endpoint",
//	    Method:    "POST",
//	    Body:      requestData,
//	})
//
//	if result.AnomalyDetected {
//	    log.Printf("Anomaly detected! Score: %.2f", result.AnomalyScore)
//	}

package sdi

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"
)

// AnalysisRequest represents a request to analyze
type AnalysisRequest struct {
	ServiceID string            `json:"serviceId"`
	Path      string            `json:"path"`
	Method    string            `json:"method"`
	Headers   map[string]string `json:"headers,omitempty"`
	Body      string            `json:"body,omitempty"`
	Metadata  map[string]string `json:"metadata,omitempty"`
}

// AnalysisResult represents the result of SDI analysis
type AnalysisResult struct {
	AnomalyDetected   bool    `json:"anomalyDetected"`
	AnomalyScore      float64 `json:"anomalyScore"`
	Severity          string  `json:"severity"`
	ServiceID         string  `json:"serviceId"`
	Timestamp         int64   `json:"timestamp"`
	PipelineTriggered bool    `json:"pipelineTriggered"`
}

// Client is the SDI client
type Client struct {
	BaseURL    string
	HTTPClient *http.Client
	APIVersion string
}

// NewClient creates a new SDI client
//
// Example:
//
//	client := sdi.NewClient("http://localhost:8080")
func NewClient(baseURL string) *Client {
	if baseURL == "" {
		baseURL = os.Getenv("SDI_URL")
		if baseURL == "" {
			baseURL = "http://localhost:8080"
		}
	}

	return &Client{
		BaseURL: baseURL,
		HTTPClient: &http.Client{
			Timeout: 5 * time.Second,
		},
		APIVersion: "v1",
	}
}

// AnalyzeRequest analyzes a request for anomalies
//
// Example:
//
//	result, err := client.AnalyzeRequest(&sdi.AnalysisRequest{
//	    ServiceID: "my-service",
//	    Path:      "/api/users",
//	    Method:    "POST",
//	    Body:      `{"user": "data"}`,
//	})
func (c *Client) AnalyzeRequest(req *AnalysisRequest) (*AnalysisResult, error) {
	url := fmt.Sprintf("%s/api/%s/analyze", c.BaseURL, c.APIVersion)

	jsonData, err := json.Marshal(req)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	resp, err := c.HTTPClient.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		// Fail open - don't block requests if SDI is down
		return &AnalysisResult{AnomalyDetected: false}, nil
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return &AnalysisResult{AnomalyDetected: false}, nil
	}

	var result AnalysisResult
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &result, nil
}

// DetectAnomaly performs quick anomaly detection
func (c *Client) DetectAnomaly(serviceID, path, method, body string) (bool, error) {
	url := fmt.Sprintf("%s/api/%s/detect", c.BaseURL, c.APIVersion)

	req := map[string]string{
		"serviceId": serviceID,
		"path":      path,
		"method":    method,
		"body":      body,
	}

	jsonData, err := json.Marshal(req)
	if err != nil {
		return false, err
	}

	resp, err := c.HTTPClient.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return false, nil // Fail open
	}
	defer resp.Body.Close()

	var result struct {
		AnomalyDetected bool `json:"anomalyDetected"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return false, err
	}

	return result.AnomalyDetected, nil
}

// HealthCheck checks if SDI service is healthy
func (c *Client) HealthCheck() bool {
	url := fmt.Sprintf("%s/api/%s/health", c.BaseURL, c.APIVersion)
	resp, err := c.HTTPClient.Get(url)
	if err != nil {
		return false
	}
	defer resp.Body.Close()
	return resp.StatusCode == http.StatusOK
}

// Middleware creates HTTP middleware for SDI
//
// Example with standard library:
//
//	client := sdi.NewClient("http://localhost:8080")
//	mux := http.NewServeMux()
//	handler := client.Middleware("my-service")(mux)
//	http.ListenAndServe(":8080", handler)
func (c *Client) Middleware(serviceID string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Analyze request
			result, err := c.AnalyzeRequest(&AnalysisRequest{
				ServiceID: serviceID,
				Path:      r.URL.Path,
				Method:    r.Method,
			})

			if err != nil {
				// Log error but don't block
				next.ServeHTTP(w, r)
				return
			}

			// Optionally block critical anomalies
			if result.AnomalyDetected && result.Severity == "critical" {
				http.Error(w, "Request blocked by SDI", http.StatusForbidden)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}

// Example usage with popular Go frameworks

// GinMiddleware creates Gin middleware for SDI
//
// Example with Gin:
//
//	import "github.com/gin-gonic/gin"
//
//	client := sdi.NewClient("http://localhost:8080")
//	r := gin.Default()
//	r.Use(client.GinMiddleware("my-gin-app"))
func (c *Client) GinMiddleware(serviceID string) func(ctx interface{}) {
	return func(ctx interface{}) {
		// Type assertion for gin.Context would go here
		// Simplified for example
	}
}

