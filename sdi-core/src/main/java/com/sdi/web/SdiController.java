package com.sdi.web;

import com.sdi.detector.AnomalyDetector;
import com.sdi.detector.AnomalyDetector.RequestVector;
import com.sdi.pre.PolymorphicResponseEngine;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Optional REST controller for SDI integration
 * Only available when Spring Web is on classpath
 */
@RestController
@RequestMapping("/sdi")
@ConditionalOnWebApplication
public class SdiController {
    
    private final PolymorphicResponseEngine pre;
    private final AnomalyDetector detector;
    
    public SdiController(PolymorphicResponseEngine pre, AnomalyDetector detector) {
        this.pre = pre;
        this.detector = detector;
    }
    
    @PostMapping("/analyze")
    public Map<String, Object> analyzeRequest(@RequestBody Map<String, Object> request) {
        // Convert to RequestVector
        RequestVector vector = new RequestVector();
        vector.setServiceId((String) request.getOrDefault("serviceId", "default"));
        vector.setPathLength(((String) request.getOrDefault("path", "")).length());
        vector.setBodySize(request.toString().length());
        // ... set other fields
        
        // Process through PRE
        pre.processRequest(vector);
        
        Map<String, Object> response = new HashMap<>();
        response.put("status", "processed");
        response.put("message", "Request analyzed by SDI");
        return response;
    }
    
    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "enabled");
        response.put("sdi", "active");
        return response;
    }
}

