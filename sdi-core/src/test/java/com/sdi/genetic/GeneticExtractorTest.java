package com.sdi.genetic;

import com.sdi.detector.AnomalyDetector.AnomalyToken;
import com.sdi.honeypot.HoneypotManager.ExploitTraceBundle;
import com.sdi.honeypot.HoneypotManager.ExecutionTrace;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

@DisplayName("Genetic Extractor Tests")
class GeneticExtractorTest {
    
    private GeneticExtractor extractor;
    
    @BeforeEach
    void setUp() {
        extractor = new GeneticExtractor();
    }
    
    @Test
    @DisplayName("Should extract vulnerability signature from exploit trace bundle")
    void testVulnerabilityExtraction() {
        // Create mock exploit trace bundle
        ExploitTraceBundle etb = createMockTraceBundle();
        
        GeneticExtractor.VulnerabilitySignature signature = extractor.extract(etb);
        
        assertNotNull(signature, "Should extract vulnerability signature");
        assertNotNull(signature.getServiceId(), "Service ID should be set");
        assertTrue(signature.getVulnerableLineStart() >= 0, "Vulnerable line start should be valid");
        assertTrue(signature.getVulnerableLineEnd() >= signature.getVulnerableLineStart(), 
            "Vulnerable line end should be >= start");
    }
    
    @Test
    @DisplayName("Should process exploit trace bundle")
    void testTraceBundleProcessing() {
        ExploitTraceBundle etb = createMockTraceBundle();
        
        GeneticExtractor.VulnerabilitySignature signature = extractor.extract(etb);
        
        assertNotNull(signature);
        assertNotNull(signature.getDataFlowPattern());
        assertNotNull(signature.getRemediationTemplate());
    }
    
    @Test
    @DisplayName("Should generate valid vulnerability signature")
    void testSignatureGeneration() {
        ExploitTraceBundle etb = createMockTraceBundle();
        GeneticExtractor.VulnerabilitySignature signature = extractor.extract(etb);
        
        assertNotNull(signature);
        assertEquals("test-service", signature.getServiceId());
        assertTrue(signature.getExploitClass() >= 0);
    }
    
    private ExploitTraceBundle createMockTraceBundle() {
        // Create mock anomaly token
        java.util.Map<String, String> metadata = new java.util.HashMap<>();
        metadata.put("source", "test");
        double[] features = new double[]{1.0, 2.0, 3.0};
        AnomalyToken token = new AnomalyToken("test-service", metadata, 
            System.currentTimeMillis(), 0.85, features);
        
        // Create mock execution trace
        ExecutionTrace trace = new ExecutionTrace();
        trace.setPayload("test-payload");
        List<String> taintedVars = new ArrayList<>();
        taintedVars.add("userInput");
        trace.setTaintedVariables(taintedVars);
        List<String> controlFlow = new ArrayList<>();
        controlFlow.add("entry");
        controlFlow.add("process");
        controlFlow.add("exit");
        trace.setControlFlowPath(controlFlow);
        
        // Create exploit trace bundle
        return new ExploitTraceBundle("honeypot-123", token, trace, System.currentTimeMillis());
    }
}

