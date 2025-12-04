package com.example;

import com.sdi.detector.AnomalyDetector;
import com.sdi.detector.AnomalyDetector.RequestVector;
import com.sdi.pre.PolymorphicResponseEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

/**
 * Example: Simple integration of SDI into your microservice
 * 
 * Just add the dependency and SDI auto-configures!
 */
@SpringBootApplication
@RestController
public class MyApplication {
    
    // SDI components are auto-wired - no configuration needed!
    @Autowired(required = false)
    private PolymorphicResponseEngine sdiEngine;
    
    @Autowired(required = false)
    private AnomalyDetector detector;
    
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
    
    @GetMapping("/api/data")
    public String getData() {
        return "Hello from my microservice!";
    }
    
    @PostMapping("/api/process")
    public String processRequest(@RequestBody String data) {
        // SDI automatically monitors requests if enabled
        // You can also manually trigger analysis:
        
        if (detector != null) {
            RequestVector vector = new RequestVector();
            vector.setServiceId("my-service");
            vector.setPathLength(data.length());
            // ... set other fields
            
            // Check for anomalies
            var token = detector.detect(vector);
            if (token != null) {
                // Anomaly detected! SDI will handle it automatically
                System.out.println("Anomaly detected: " + token.getAnomalyScore());
            }
        }
        
        return "Processed: " + data;
    }
}

