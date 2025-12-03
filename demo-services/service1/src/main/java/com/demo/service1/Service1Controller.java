package com.demo.service1;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class Service1Controller {
    
    @GetMapping("/data")
    public Map<String, Object> getData(@RequestParam(required = false) String userId) {
        Map<String, Object> response = new HashMap<>();
        response.put("service", "service1");
        response.put("userId", userId);
        response.put("data", "Sample data from service 1");
        return response;
    }
    
    @PostMapping("/process")
    public Map<String, Object> processData(@RequestBody Map<String, Object> input) {
        // Simulated vulnerable endpoint for demo
        Map<String, Object> response = new HashMap<>();
        response.put("status", "processed");
        response.put("input", input);
        return response;
    }
}

