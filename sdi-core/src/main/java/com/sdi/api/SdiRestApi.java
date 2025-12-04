package com.sdi.api;

import com.sdi.detector.AnomalyDetector;
import com.sdi.detector.AnomalyDetector.RequestVector;
import com.sdi.detector.AnomalyDetector.AnomalyToken;
import com.sdi.pre.PolymorphicResponseEngine;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * REST API for language-agnostic SDI integration
 * 
 * Use from any language via HTTP:
 * - Python: requests.post()
 * - Node.js: axios.post()
 * - Go: http.Post()
 * - etc.
 */
@RestController
@RequestMapping("/api/sdi")
public class SdiRestApi {
    
    private final AnomalyDetector detector;
    private final PolymorphicResponseEngine pre;
    
    public SdiRestApi(AnomalyDetector detector, PolymorphicResponseEngine pre) {
        this.detector = detector;
        this.pre = pre;
    }
    
    /**
     * Analyze a request for anomalies
     * 
     * POST /api/v1/analyze
     * {
     *   "serviceId": "my-service",
     *   "path": "/api/endpoint",
     *   "method": "POST",
     *   "headers": {...},
     *   "body": "...",
     *   "metadata": {...}
     * }
     */
    @PostMapping("/analyze")
    public AnalysisResponse analyzeRequest(@RequestBody AnalysisRequest request) {
        // Convert to RequestVector
        RequestVector vector = toRequestVector(request);
        
        // Detect anomaly
        AnomalyToken token = detector.detect(vector);
        
        AnalysisResponse response = new AnalysisResponse();
        response.setAnomalyDetected(token != null);
        
        if (token != null) {
            response.setAnomalyScore(token.getAnomalyScore());
            response.setServiceId(token.getServiceId());
            response.setTimestamp(token.getTimestamp());
            response.setSeverity(getSeverity(token.getAnomalyScore()));
            
            // Trigger full PRE pipeline if high severity
            if (token.getAnomalyScore() > 0.8) {
                pre.processRequest(vector);
                response.setPipelineTriggered(true);
            }
        }
        
        return response;
    }
    
    /**
     * Quick anomaly detection only
     * 
     * POST /api/v1/detect
     */
    @PostMapping("/detect")
    public DetectionResponse detectAnomaly(@RequestBody AnalysisRequest request) {
        RequestVector vector = toRequestVector(request);
        AnomalyToken token = detector.detect(vector);
        
        DetectionResponse response = new DetectionResponse();
        response.setAnomalyDetected(token != null);
        if (token != null) {
            response.setScore(token.getAnomalyScore());
            response.setSeverity(getSeverity(token.getAnomalyScore()));
        }
        return response;
    }
    
    /**
     * Health check
     * 
     * GET /api/v1/health
     */
    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "healthy");
        health.put("service", "sdi");
        health.put("version", "1.0.0");
        return health;
    }
    
    private RequestVector toRequestVector(AnalysisRequest request) {
        RequestVector vector = new RequestVector();
        vector.setServiceId(request.getServiceId());
        vector.setPathLength(request.getPath() != null ? request.getPath().length() : 0);
        vector.setBodySize(request.getBody() != null ? request.getBody().length() : 0);
        vector.setHeaderCount(request.getHeaders() != null ? request.getHeaders().size() : 0);
        vector.setMethodHash(request.getMethod() != null ? request.getMethod().hashCode() : 0);
        
        if (request.getMetadata() != null) {
            vector.setMetadata(request.getMetadata());
        }
        
        return vector;
    }
    
    private String getSeverity(double score) {
        if (score > 0.9) return "critical";
        if (score > 0.7) return "high";
        if (score > 0.5) return "medium";
        return "low";
    }
    
    // DTOs
    public static class AnalysisRequest {
        private String serviceId;
        private String path;
        private String method;
        private Map<String, String> headers;
        private String body;
        private Map<String, String> metadata;
        
        // Getters and setters
        public String getServiceId() { return serviceId; }
        public void setServiceId(String serviceId) { this.serviceId = serviceId; }
        public String getPath() { return path; }
        public void setPath(String path) { this.path = path; }
        public String getMethod() { return method; }
        public void setMethod(String method) { this.method = method; }
        public Map<String, String> getHeaders() { return headers; }
        public void setHeaders(Map<String, String> headers) { this.headers = headers; }
        public String getBody() { return body; }
        public void setBody(String body) { this.body = body; }
        public Map<String, String> getMetadata() { return metadata; }
        public void setMetadata(Map<String, String> metadata) { this.metadata = metadata; }
    }
    
    public static class AnalysisResponse {
        private boolean anomalyDetected;
        private double anomalyScore;
        private String severity;
        private String serviceId;
        private long timestamp;
        private boolean pipelineTriggered;
        
        // Getters and setters
        public boolean isAnomalyDetected() { return anomalyDetected; }
        public void setAnomalyDetected(boolean anomalyDetected) { this.anomalyDetected = anomalyDetected; }
        public double getAnomalyScore() { return anomalyScore; }
        public void setAnomalyScore(double anomalyScore) { this.anomalyScore = anomalyScore; }
        public String getSeverity() { return severity; }
        public void setSeverity(String severity) { this.severity = severity; }
        public String getServiceId() { return serviceId; }
        public void setServiceId(String serviceId) { this.serviceId = serviceId; }
        public long getTimestamp() { return timestamp; }
        public void setTimestamp(long timestamp) { this.timestamp = timestamp; }
        public boolean isPipelineTriggered() { return pipelineTriggered; }
        public void setPipelineTriggered(boolean pipelineTriggered) { this.pipelineTriggered = pipelineTriggered; }
    }
    
    public static class DetectionResponse {
        private boolean anomalyDetected;
        private double score;
        private String severity;
        
        // Getters and setters
        public boolean isAnomalyDetected() { return anomalyDetected; }
        public void setAnomalyDetected(boolean anomalyDetected) { this.anomalyDetected = anomalyDetected; }
        public double getScore() { return score; }
        public void setScore(double score) { this.score = score; }
        public String getSeverity() { return severity; }
        public void setSeverity(String severity) { this.severity = severity; }
    }
}

