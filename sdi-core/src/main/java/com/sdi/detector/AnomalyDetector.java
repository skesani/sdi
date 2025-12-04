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
     * Creates a default GMM with random components for initial use
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
        
        // Create mixture components with equal weights
        double[] weights = new double[MIXTURE_COMPONENTS];
        MultivariateNormalDistribution[] distributions = new MultivariateNormalDistribution[MIXTURE_COMPONENTS];
        
        for (int i = 0; i < MIXTURE_COMPONENTS; i++) {
            weights[i] = 1.0 / MIXTURE_COMPONENTS;
            
            // Random mean for each component (centered around origin with some variance)
            double[] componentMean = new double[FEATURE_DIMENSION];
            for (int j = 0; j < FEATURE_DIMENSION; j++) {
                componentMean[j] = rng.nextGaussian() * 2.0;
            }
            
            distributions[i] = new MultivariateNormalDistribution(rng, componentMean, covariance);
        }
        
        // Create the GMM using the components
        // Note: MixtureMultivariateNormalDistribution constructor takes weights and distributions arrays
        try {
            this.gmm = new MixtureMultivariateNormalDistribution(weights, distributions);
        } catch (Exception e) {
            // Fallback: if GMM construction fails, set to null and use simplified method
            System.err.println("Warning: Failed to initialize GMM, using simplified detection: " + e.getMessage());
            this.gmm = null;
        }
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
     * Uses the trained GMM if available, otherwise falls back to simplified distance-based method
     */
    private double computeProbability(double[] features) {
        // Use GMM if it's been trained and initialized
        if (gmm != null) {
            try {
                // Compute probability density using the GMM
                double probability = gmm.density(features);
                // Normalize to [0, 1] range (GMM density can be very small, so we normalize)
                // Using a sigmoid-like normalization to convert density to probability-like value
                return Math.min(1.0, probability * 1000.0); // Scale factor may need tuning
            } catch (Exception e) {
                // If GMM evaluation fails, fall back to simplified method
                System.err.println("Warning: GMM evaluation failed, using fallback: " + e.getMessage());
                return computeProbabilityFallback(features);
            }
        }
        
        // Fallback: simplified distance-based method when GMM is not available
        return computeProbabilityFallback(features);
    }
    
    /**
     * Fallback probability computation using distance-based method
     * Used when GMM is not trained or available
     */
    private double computeProbabilityFallback(double[] features) {
        // Simplified: check if features are within reasonable bounds
        double sumSquared = 0.0;
        for (double f : features) {
            sumSquared += f * f;
        }
        double distance = Math.sqrt(sumSquared);
        
        // Normalize to probability-like value
        return Math.exp(-distance / 10.0);
    }
    
    /**
     * Train GMM on normal traffic using Expectation-Maximization (EM) algorithm
     * This is a simplified implementation - for production, use a more robust EM implementation
     */
    public void train(List<RequestVector> normalRequests) {
        if (normalRequests == null || normalRequests.isEmpty()) {
            System.err.println("Warning: No training data provided");
            return;
        }
        
        List<double[]> featureVectors = new ArrayList<>();
        for (RequestVector req : normalRequests) {
            featureVectors.add(extractFeatures(req));
        }
        
        // Store training data
        trainingData.put("normal", featureVectors);
        
        // Simple GMM training: compute mean and covariance from training data
        if (featureVectors.size() < MIXTURE_COMPONENTS) {
            System.err.println("Warning: Not enough training samples. Need at least " + MIXTURE_COMPONENTS);
            return;
        }
        
        // Compute overall mean
        double[] overallMean = new double[FEATURE_DIMENSION];
        for (double[] vector : featureVectors) {
            for (int i = 0; i < FEATURE_DIMENSION; i++) {
                overallMean[i] += vector[i];
            }
        }
        for (int i = 0; i < FEATURE_DIMENSION; i++) {
            overallMean[i] /= featureVectors.size();
        }
        
        // Compute covariance matrix
        double[][] covariance = new double[FEATURE_DIMENSION][FEATURE_DIMENSION];
        for (double[] vector : featureVectors) {
            for (int i = 0; i < FEATURE_DIMENSION; i++) {
                for (int j = 0; j < FEATURE_DIMENSION; j++) {
                    double diffI = vector[i] - overallMean[i];
                    double diffJ = vector[j] - overallMean[j];
                    covariance[i][j] += diffI * diffJ;
                }
            }
        }
        for (int i = 0; i < FEATURE_DIMENSION; i++) {
            for (int j = 0; j < FEATURE_DIMENSION; j++) {
                covariance[i][j] /= featureVectors.size();
                // Add small value to diagonal for numerical stability
                if (i == j && covariance[i][j] < 0.01) {
                    covariance[i][j] = 0.01;
                }
            }
        }
        
        // Create GMM components centered around clusters in the data
        // Simplified: use k-means-like initialization (random sampling)
        double[] weights = new double[MIXTURE_COMPONENTS];
        MultivariateNormalDistribution[] distributions = new MultivariateNormalDistribution[MIXTURE_COMPONENTS];
        
        for (int i = 0; i < MIXTURE_COMPONENTS; i++) {
            weights[i] = 1.0 / MIXTURE_COMPONENTS;
            
            // Sample a random point from training data as component mean
            int randomIndex = rng.nextInt(featureVectors.size());
            double[] componentMean = Arrays.copyOf(featureVectors.get(randomIndex), FEATURE_DIMENSION);
            
            // Use the computed covariance (scaled for each component)
            double[][] componentCov = new double[FEATURE_DIMENSION][FEATURE_DIMENSION];
            for (int j = 0; j < FEATURE_DIMENSION; j++) {
                System.arraycopy(covariance[j], 0, componentCov[j], 0, FEATURE_DIMENSION);
            }
            
            distributions[i] = new MultivariateNormalDistribution(rng, componentMean, componentCov);
        }
        
        // Create the trained GMM
        try {
            this.gmm = new MixtureMultivariateNormalDistribution(weights, distributions);
            System.out.println("GMM trained successfully on " + featureVectors.size() + " samples");
        } catch (Exception e) {
            System.err.println("Error training GMM: " + e.getMessage());
            e.printStackTrace();
            // Keep existing GMM or use fallback
        }
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

