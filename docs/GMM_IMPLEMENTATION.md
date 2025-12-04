# GMM Implementation in SDI Code

## Where GMM is Used

The Gaussian Mixture Model (GMM) is implemented in the `AnomalyDetector` class:

**File:** `sdi-core/src/main/java/com/sdi/detector/AnomalyDetector.java`

## Code Locations

### 1. GMM Declaration (Line 27)
```java
private MixtureMultivariateNormalDistribution gmm;
```
- Declares the GMM variable that holds the trained model

### 2. GMM Initialization (Lines 47-71)
```java
private void initializeGMM() {
    // Creates default GMM with 5 mixture components
    // Each component is a MultivariateNormalDistribution
    // Components are initialized with random means and identity covariance
}
```
- **Location:** Called in constructor (line 32)
- **Purpose:** Creates a default GMM for initial use before training
- **Components:** 5 Gaussian distributions with equal weights (1/5 each)

### 3. GMM Usage in Detection (Lines 97-115)
```java
public AnomalyToken detect(RequestVector request) {
    double[] features = extractFeatures(request);
    double probability = computeProbability(features); // Uses GMM here
    if (probability < anomalyThreshold) {
        return new AnomalyToken(...);
    }
    return null;
}
```
- **Location:** Main detection method
- **GMM Usage:** Calls `computeProbability()` which uses GMM if available

### 4. GMM Probability Computation (Lines 117-145)
```java
private double computeProbability(double[] features) {
    if (gmm != null) {
        // Uses GMM to compute probability density
        double probability = gmm.density(features);
        return Math.min(1.0, probability * 1000.0);
    }
    // Fallback to simplified method if GMM not available
    return computeProbabilityFallback(features);
}
```
- **Location:** Private helper method
- **GMM Usage:** 
  - Calls `gmm.density(features)` to compute probability density
  - Falls back to distance-based method if GMM is null or fails

### 5. GMM Training (Lines 147-220)
```java
public void train(List<RequestVector> normalRequests) {
    // Extracts features from training data
    // Computes mean and covariance from training samples
    // Creates GMM components using k-means-like initialization
    // Constructs MixtureMultivariateNormalDistribution
}
```
- **Location:** Public training method
- **GMM Usage:** 
  - Trains GMM on normal traffic samples
  - Creates new `MixtureMultivariateNormalDistribution` instance
  - Stores trained model in `this.gmm`

## Feature Extraction (Lines 73-89)

Before GMM can be used, features must be extracted:

```java
public double[] extractFeatures(RequestVector request) {
    // Extracts 10 features from HTTP request
    // Returns feature vector for GMM evaluation
}
```

**10 Features Extracted:**
1. Path Length
2. Query Param Count
3. Header Count
4. Body Size
5. Method Hash
6. User-Agent Hash
7. Request Rate
8. Time of Day
9. IP Entropy
10. Cookie Count

## GMM Flow Diagram

```
1. Initialize GMM (default or trained)
   ↓
2. Extract features from HTTP request
   ↓
3. Compute P(R | GMM) using gmm.density(features)
   ↓
4. Compare with threshold
   ↓
5. Return AnomalyToken if P(R | GMM) < threshold
```

## Dependencies

**Apache Commons Math3 Library:**
- `MixtureMultivariateNormalDistribution` - The GMM class
- `MultivariateNormalDistribution` - Individual Gaussian components
- `RandomGenerator` / `Well19937c` - Random number generation

**Maven Dependency:**
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-math3</artifactId>
    <version>3.6.1</version>
</dependency>
```

## Usage Example

```java
// 1. Create detector (initializes default GMM)
AnomalyDetector detector = new AnomalyDetector(0.01);

// 2. Train on normal traffic (optional, improves accuracy)
List<RequestVector> normalTraffic = collectNormalTraffic();
detector.train(normalTraffic);

// 3. Detect anomalies
AnomalyToken token = detector.detect(request);
if (token != null) {
    System.out.println("Anomaly detected! Score: " + token.getAnomalyScore());
}
```

## Implementation Notes

1. **Default GMM**: Created on initialization with random components
2. **Trained GMM**: Created via `train()` method using actual traffic data
3. **Fallback**: If GMM is null or fails, uses simplified distance-based method
4. **Training**: Simplified EM-like algorithm (for production, use full EM algorithm)

## Current Status

✅ **GMM is now fully implemented and used in the code**
- GMM is initialized on construction
- GMM is used in `computeProbability()` when available
- GMM can be trained on normal traffic
- Falls back gracefully if GMM is not available

