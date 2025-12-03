package com.sdi.detector;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

import java.util.HashMap;
import java.util.Map;

@DisplayName("Anomaly Detector Tests")
class AnomalyDetectorTest {
    
    private AnomalyDetector detector;
    
    @BeforeEach
    void setUp() {
        detector = new AnomalyDetector();
    }
    
    @Test
    @DisplayName("Should detect normal request as non-anomalous")
    void testNormalRequest() {
        AnomalyDetector.RequestVector vector = createNormalRequest();
        AnomalyDetector.AnomalyToken token = detector.detect(vector);
        
        assertNull(token, "Normal request should not trigger anomaly");
    }
    
    @Test
    @DisplayName("Should detect anomalous request")
    void testAnomalousRequest() {
        AnomalyDetector.RequestVector vector = createAnomalousRequest();
        AnomalyDetector.AnomalyToken token = detector.detect(vector);
        
        assertNotNull(token, "Anomalous request should be detected");
        assertTrue(token.getAnomalyScore() > 0.5, "Anomaly score should be significant");
    }
    
    @Test
    @DisplayName("Should handle multiple requests and build baseline")
    void testBaselineBuilding() {
        // Send multiple normal requests
        for (int i = 0; i < 10; i++) {
            AnomalyDetector.RequestVector vector = createNormalRequest();
            detector.detect(vector);
        }
        
        // Now anomalous request should be detected
        AnomalyDetector.RequestVector anomalous = createAnomalousRequest();
        AnomalyDetector.AnomalyToken token = detector.detect(anomalous);
        
        assertNotNull(token, "Should detect anomaly after baseline established");
    }
    
    @Test
    @DisplayName("Should extract features correctly")
    void testFeatureExtraction() {
        AnomalyDetector.RequestVector vector = createNormalRequest();
        
        assertEquals(10, vector.getPathLength());
        assertEquals(20, vector.getBodySize());
        assertEquals(3, vector.getHeaderCount());
    }
    
    private AnomalyDetector.RequestVector createNormalRequest() {
        AnomalyDetector.RequestVector vector = new AnomalyDetector.RequestVector();
        vector.setServiceId("test-service");
        vector.setPathLength(10);
        vector.setBodySize(20);
        vector.setHeaderCount(3);
        vector.setMethodHash("GET".hashCode());
        return vector;
    }
    
    private AnomalyDetector.RequestVector createAnomalousRequest() {
        AnomalyDetector.RequestVector vector = new AnomalyDetector.RequestVector();
        vector.setServiceId("test-service");
        vector.setPathLength(1000); // Very long path
        vector.setBodySize(100000); // Very large body
        vector.setHeaderCount(100); // Many headers
        vector.setMethodHash("POST".hashCode());
        return vector;
    }
}

