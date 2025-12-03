package com.sdi.detector;

import org.apache.commons.math3.distribution.MixtureMultivariateNormalDistribution;
import org.apache.commons.math3.distribution.MultivariateNormalDistribution;
import org.apache.commons.math3.random.RandomGenerator;
import org.apache.commons.math3.random.Well19937c;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Phase 1: Detection - Probabilistic Anomaly Triggering
 * 
 * Evaluates each request vector R against a Gaussian Mixture Model (GMM)
 * representing normal behavior. An anomaly is declared when P(R | GMM) < threshold.
 * 
 * Complexity: O(1) per request with fixed number of mixture components.
 */
@Component
public class AnomalyDetector {
    
    private double anomalyThreshold = 0.01; // epsilon - configurable
    private static final int FEATURE_DIMENSION = 10; // Request vector dimension
    private static final int MIXTURE_COMPONENTS = 5;
    
    private MixtureMultivariateNormalDistribution gmm;
    private final RandomGenerator rng = new Well19937c();
    private final Map<String, List<double[]>> trainingData = new ConcurrentHashMap<>();
    
    public AnomalyDetector() {
        initializeGMM();
    }
    
    public AnomalyDetector(double threshold) {
        this.anomalyThreshold = threshold;
        initializeGMM();
    }
    
    public void setAnomalyThreshold(double threshold) {
        this.anomalyThreshold = threshold;
    }
    
    /**
     * Initialize GMM with default parameters (in production, load from trained model)
     */
    private void initializeGMM() {
        List<Pair<Double, MultivariateNormalDistribution>> components = new ArrayList<>();
        double[] mean = new double[FEATURE_DIMENSION];
        double[][] covariance = new double[FEATURE_DIMENSION][FEATURE_DIMENSION];
        
        // Initialize identity covariance matrix
        for (int i = 0; i < FEATURE_DIMENSION; i++) {
            Arrays.fill(covariance[i], 0.0);
            covariance[i][i] = 1.0;
        }
        
        // Create mixture components
        for (int i = 0; i < MIXTURE_COMPONENTS; i++) {
            // Random mean for each component
            for (int j = 0; j < FEATURE_DIMENSION; j++) {
                mean[j] = rng.nextGaussian() * 2.0;
            }
            components.add(new Pair<>(1.0 / MIXTURE_COMPONENTS, 
                new MultivariateNormalDistribution(rng, mean, covariance)));
        }
        
        // Note: Simplified initialization - in production, use trained model
        // For demo, we'll use a single component
        this.gmm = null; // Will be set via training
    }
    
    /**
     * Extract features from HTTP request
     */
    public double[] extractFeatures(RequestVector request) {
        double[] features = new double[FEATURE_DIMENSION];
        features[0] = request.getPathLength();
        features[1] = request.getQueryParamCount();
        features[2] = request.getHeaderCount();
        features[3] = request.getBodySize();
        features[4] = request.getMethodHash();
        features[5] = request.getUserAgentHash();
        features[6] = request.getRequestRate();
        features[7] = request.getTimeOfDay();
        features[8] = request.getIpEntropy();
        features[9] = request.getCookieCount();
        return features;
    }
    
    /**
     * Detect anomaly in request vector
     * 
     * @param request The request to evaluate
     * @return AnomalyToken if anomaly detected, null otherwise
     */
    public AnomalyToken detect(RequestVector request) {
        double[] features = extractFeatures(request);
        
        // Simplified probability computation (in production, use trained GMM)
        double probability = computeProbability(features);
        
        if (probability < anomalyThreshold) {
            double anomalyScore = 1.0 - probability;
            return new AnomalyToken(
                request.getServiceId(),
                request.getMetadata(),
                System.currentTimeMillis(),
                anomalyScore,
                features
            );
        }
        
        return null;
    }
    
    /**
     * Compute probability P(R | GMM)
     * Simplified version for demo - in production, use actual GMM
     */
    private double computeProbability(double[] features) {
        // Simplified: check if features are within reasonable bounds
        // In production, this would use the trained GMM
        double sumSquared = 0.0;
        for (double f : features) {
            sumSquared += f * f;
        }
        double distance = Math.sqrt(sumSquared);
        
        // Normalize to probability-like value
        return Math.exp(-distance / 10.0);
    }
    
    /**
     * Train GMM on normal traffic (for production use)
     */
    public void train(List<RequestVector> normalRequests) {
        List<double[]> featureVectors = new ArrayList<>();
        for (RequestVector req : normalRequests) {
            featureVectors.add(extractFeatures(req));
        }
        // Store for future GMM training
        trainingData.put("normal", featureVectors);
        // In production, train actual GMM here
    }
    
    // Inner classes
    public static class RequestVector {
        private String serviceId;
        private Map<String, String> metadata;
        private int pathLength;
        private int queryParamCount;
        private int headerCount;
        private int bodySize;
        private int methodHash;
        private int userAgentHash;
        private double requestRate;
        private double timeOfDay;
        private double ipEntropy;
        private int cookieCount;
        
        // Getters and setters
        public String getServiceId() { return serviceId; }
        public void setServiceId(String serviceId) { this.serviceId = serviceId; }
        public Map<String, String> getMetadata() { return metadata; }
        public void setMetadata(Map<String, String> metadata) { this.metadata = metadata; }
        public int getPathLength() { return pathLength; }
        public void setPathLength(int pathLength) { this.pathLength = pathLength; }
        public int getQueryParamCount() { return queryParamCount; }
        public void setQueryParamCount(int queryParamCount) { this.queryParamCount = queryParamCount; }
        public int getHeaderCount() { return headerCount; }
        public void setHeaderCount(int headerCount) { this.headerCount = headerCount; }
        public int getBodySize() { return bodySize; }
        public void setBodySize(int bodySize) { this.bodySize = bodySize; }
        public int getMethodHash() { return methodHash; }
        public void setMethodHash(int methodHash) { this.methodHash = methodHash; }
        public int getUserAgentHash() { return userAgentHash; }
        public void setUserAgentHash(int userAgentHash) { this.userAgentHash = userAgentHash; }
        public double getRequestRate() { return requestRate; }
        public void setRequestRate(double requestRate) { this.requestRate = requestRate; }
        public double getTimeOfDay() { return timeOfDay; }
        public void setTimeOfDay(double timeOfDay) { this.timeOfDay = timeOfDay; }
        public double getIpEntropy() { return ipEntropy; }
        public void setIpEntropy(double ipEntropy) { this.ipEntropy = ipEntropy; }
        public int getCookieCount() { return cookieCount; }
        public void setCookieCount(int cookieCount) { this.cookieCount = cookieCount; }
    }
    
    public static class AnomalyToken {
        private String serviceId;
        private Map<String, String> metadata;
        private long timestamp;
        private double anomalyScore;
        private double[] featureVector;
        
        public AnomalyToken(String serviceId, Map<String, String> metadata, 
                           long timestamp, double anomalyScore, double[] featureVector) {
            this.serviceId = serviceId;
            this.metadata = metadata != null ? new HashMap<>(metadata) : new HashMap<>();
            this.timestamp = timestamp;
            this.anomalyScore = anomalyScore;
            this.featureVector = Arrays.copyOf(featureVector, featureVector.length);
        }
        
        // Getters
        public String getServiceId() { return serviceId; }
        public Map<String, String> getMetadata() { return metadata; }
        public long getTimestamp() { return timestamp; }
        public double getAnomalyScore() { return anomalyScore; }
        public double[] getFeatureVector() { return Arrays.copyOf(featureVector, featureVector.length); }
    }
    
    private static class Pair<K, V> {
        private K key;
        private V value;
        
        public Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }
        
        public K getKey() { return key; }
        public V getValue() { return value; }
    }
}

