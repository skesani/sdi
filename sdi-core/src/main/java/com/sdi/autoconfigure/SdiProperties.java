package com.sdi.autoconfigure;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Configuration properties for Synthetic Digital Immunity
 * 
 * Configure via application.yml or application.properties:
 * 
 * sdi:
 *   enabled: true
 *   detection:
 *     threshold: 0.01
 *   honeypot:
 *     enabled: true
 *   kafka:
 *     enabled: true
 *     topic: sdi-anomalies
 *   deployment:
 *     enabled: true
 *     canary-percentage: 0.05
 */
@ConfigurationProperties(prefix = "sdi")
public class SdiProperties {
    
    /**
     * Enable or disable SDI
     */
    private boolean enabled = true;
    
    private Detection detection = new Detection();
    private Honeypot honeypot = new Honeypot();
    private Kafka kafka = new Kafka();
    private Deployment deployment = new Deployment();
    
    public boolean isEnabled() {
        return enabled;
    }
    
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
    
    public Detection getDetection() {
        return detection;
    }
    
    public void setDetection(Detection detection) {
        this.detection = detection;
    }
    
    public Honeypot getHoneypot() {
        return honeypot;
    }
    
    public void setHoneypot(Honeypot honeypot) {
        this.honeypot = honeypot;
    }
    
    public Kafka getKafka() {
        return kafka;
    }
    
    public void setKafka(Kafka kafka) {
        this.kafka = kafka;
    }
    
    public Deployment getDeployment() {
        return deployment;
    }
    
    public void setDeployment(Deployment deployment) {
        this.deployment = deployment;
    }
    
    public static class Detection {
        /**
         * Anomaly detection threshold (0.0 - 1.0)
         * Lower values = more sensitive
         */
        private double threshold = 0.01;
        
        public double getThreshold() {
            return threshold;
        }
        
        public void setThreshold(double threshold) {
            this.threshold = threshold;
        }
    }
    
    public static class Honeypot {
        /**
         * Enable honeypot isolation phase
         */
        private boolean enabled = true;
        
        public boolean isEnabled() {
            return enabled;
        }
        
        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }
    }
    
    public static class Kafka {
        /**
         * Enable Kafka-based event bus
         */
        private boolean enabled = true;
        
        /**
         * Kafka topic for anomaly events
         */
        private String topic = "sdi-anomalies";
        
        public boolean isEnabled() {
            return enabled;
        }
        
        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }
        
        public String getTopic() {
            return topic;
        }
        
        public void setTopic(String topic) {
            this.topic = topic;
        }
    }
    
    public static class Deployment {
        /**
         * Enable automatic deployment
         */
        private boolean enabled = true;
        
        /**
         * Canary deployment percentage (0.0 - 1.0)
         */
        private double canaryPercentage = 0.05;
        
        public boolean isEnabled() {
            return enabled;
        }
        
        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }
        
        public double getCanaryPercentage() {
            return canaryPercentage;
        }
        
        public void setCanaryPercentage(double canaryPercentage) {
            this.canaryPercentage = canaryPercentage;
        }
    }
}

