package com.sdi.deployer;

import com.sdi.mutation.MutationSynthesizer.MutationPatch;
import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.apis.AppsV1Api;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.models.V1Deployment;
import io.kubernetes.client.openapi.models.V1DeploymentSpec;
import io.kubernetes.client.openapi.models.V1PodTemplateSpec;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

/**
 * Phase 5: Propagation - Distributed Immunization
 * 
 * Injects MP into CI/CD pipeline, produces new build, and deploys as canary.
 * After validation, performs rolling upgrade to reach Immunized Fleet State (IFS).
 */
@Component
public class ImmunizationDeployer {
    
    private static final double CANARY_PERCENTAGE = 0.05; // 5% canary
    private static final int CANARY_VALIDATION_SECONDS = 60;
    private static final double MAX_LATENCY_INCREASE = 1.2; // 20% increase allowed
    private static final double MAX_ERROR_RATE_INCREASE = 1.1; // 10% increase allowed
    
    private final AppsV1Api appsApi;
    private final CoreV1Api coreApi;
    private final Map<String, DeploymentState> activeDeployments = new HashMap<>();
    
    public ImmunizationDeployer() {
        this.appsApi = new AppsV1Api();
        this.coreApi = new CoreV1Api();
    }
    
    /**
     * Deploy mutation patch through CI/CD pipeline
     * 
     * @param patch Mutation patch to deploy
     * @return Deployment identifier
     */
    public String deploy(MutationPatch patch) {
        String deploymentId = "immunized-" + patch.getServiceId() + "-" + System.currentTimeMillis();
        
        try {
            // Step 1: Trigger CI/CD build
            String imageTag = triggerCICDBuild(patch);
            
            // Step 2: Deploy canary
            String canaryDeploymentName = deployCanary(patch.getServiceId(), imageTag);
            
            // Step 3: Validate canary
            CompletableFuture<Boolean> validation = validateCanary(canaryDeploymentName);
            
            // Step 4: If valid, roll out to full fleet
            validation.thenAccept(valid -> {
                if (valid) {
                    rolloutToFleet(patch.getServiceId(), imageTag);
                    activeDeployments.put(deploymentId, 
                        new DeploymentState(deploymentId, patch.getServiceId(), 
                                          DeploymentStatus.IMMUNIZED));
                } else {
                    rollbackCanary(canaryDeploymentName);
                    activeDeployments.put(deploymentId,
                        new DeploymentState(deploymentId, patch.getServiceId(),
                                          DeploymentStatus.FAILED));
                }
            });
            
            activeDeployments.put(deploymentId,
                new DeploymentState(deploymentId, patch.getServiceId(), DeploymentStatus.DEPLOYING));
            
            return deploymentId;
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to deploy mutation: " + e.getMessage(), e);
        }
    }
    
    /**
     * Trigger CI/CD build (integrate with Jenkins/GitLab)
     */
    private String triggerCICDBuild(MutationPatch patch) {
        // In production, this would:
        // 1. Commit mutated code to Git
        // 2. Trigger CI/CD pipeline
        // 3. Wait for build completion
        // 4. Return image tag
        
        // For demo, simulate build
        String imageTag = "sdi-immunized:" + patch.getServiceId() + "-" + System.currentTimeMillis();
        
        // Simulate build process
        System.out.println("Triggering CI/CD build for service: " + patch.getServiceId());
        System.out.println("Building image: " + imageTag);
        
        return imageTag;
    }
    
    /**
     * Deploy canary version (5% of pods)
     */
    private String deployCanary(String serviceId, String imageTag) throws ApiException {
        String canaryName = serviceId + "-canary-" + System.currentTimeMillis();
        
        // Get current deployment
        V1Deployment currentDeployment = appsApi.readNamespacedDeployment(serviceId, "default").execute();
        
        if (currentDeployment == null) {
            throw new RuntimeException("Service deployment not found: " + serviceId);
        }
        
        // Create canary deployment
        V1Deployment canaryDeployment = new V1Deployment();
        canaryDeployment.setApiVersion("apps/v1");
        canaryDeployment.setKind("Deployment");
        
        // Metadata
        io.kubernetes.client.openapi.models.V1ObjectMeta metadata =
            new io.kubernetes.client.openapi.models.V1ObjectMeta();
        metadata.setName(canaryName);
        metadata.setLabels(Map.of(
            "app", serviceId,
            "version", "canary",
            "sdi-immunized", "true"
        ));
        canaryDeployment.setMetadata(metadata);
        
        // Replicate spec from original but with new image
        V1DeploymentSpec spec = currentDeployment.getSpec();
        V1DeploymentSpec canarySpec = new V1DeploymentSpec();
        
        // Scale down to 5% of original replicas
        int originalReplicas = spec.getReplicas() != null ? spec.getReplicas() : 1;
        int canaryReplicas = Math.max(1, (int) Math.ceil(originalReplicas * CANARY_PERCENTAGE));
        canarySpec.setReplicas(canaryReplicas);
        
        // Update image in container
        V1PodTemplateSpec template = spec.getTemplate();
        V1PodTemplateSpec canaryTemplate = new V1PodTemplateSpec();
        canaryTemplate.setMetadata(template.getMetadata());
        
        // Clone pod spec and update image
        io.kubernetes.client.openapi.models.V1PodSpec podSpec = template.getSpec();
        if (podSpec != null && podSpec.getContainers() != null) {
            podSpec.getContainers().forEach(container -> {
                if (container.getName().equals(serviceId)) {
                    container.setImage(imageTag);
                }
            });
            canaryTemplate.setSpec(podSpec);
        }
        
        canarySpec.setTemplate(canaryTemplate);
        canarySpec.setSelector(spec.getSelector());
        canaryDeployment.setSpec(canarySpec);
        
        // Create canary deployment
        appsApi.createNamespacedDeployment("default", canaryDeployment).execute();
        
        System.out.println("Deployed canary: " + canaryName + " with " + canaryReplicas + " replicas");
        
        return canaryName;
    }
    
    /**
     * Validate canary deployment
     */
    private CompletableFuture<Boolean> validateCanary(String canaryName) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                // Wait for pods to be ready
                Thread.sleep(10000); // 10 seconds
                
                // Collect metrics
                Metrics baseline = getBaselineMetrics();
                Metrics canary = getCanaryMetrics(canaryName);
                
                // Check latency
                if (canary.avgLatency > baseline.avgLatency * MAX_LATENCY_INCREASE) {
                    System.out.println("Canary validation failed: latency too high");
                    return false;
                }
                
                // Check error rate
                if (canary.errorRate > baseline.errorRate * MAX_ERROR_RATE_INCREASE) {
                    System.out.println("Canary validation failed: error rate too high");
                    return false;
                }
                
                System.out.println("Canary validation passed");
                return true;
                
            } catch (Exception e) {
                System.err.println("Canary validation error: " + e.getMessage());
                return false;
            }
        });
    }
    
    /**
     * Rollout to full fleet
     */
    private void rolloutToFleet(String serviceId, String imageTag) {
        try {
            // Update main deployment with new image
            V1Deployment deployment = appsApi.readNamespacedDeployment(serviceId, "default").execute();
            
            if (deployment != null && deployment.getSpec() != null) {
                deployment.getSpec().getTemplate().getSpec().getContainers().forEach(container -> {
                    if (container.getName().equals(serviceId)) {
                        container.setImage(imageTag);
                    }
                });
                
                appsApi.replaceNamespacedDeployment(serviceId, "default", deployment).execute();
                
                System.out.println("Rolled out immunized version to full fleet: " + serviceId);
            }
        } catch (ApiException e) {
            throw new RuntimeException("Failed to rollout to fleet: " + e.getMessage(), e);
        }
    }
    
    /**
     * Rollback canary deployment
     */
    private void rollbackCanary(String canaryName) {
        try {
            appsApi.deleteNamespacedDeployment(canaryName, "default").execute();
            System.out.println("Rolled back canary: " + canaryName);
        } catch (ApiException e) {
            System.err.println("Failed to rollback canary: " + e.getMessage());
        }
    }
    
    /**
     * Get baseline metrics
     */
    private Metrics getBaselineMetrics() {
        // In production, query Prometheus/CloudWatch
        // For demo, return simulated metrics
        return new Metrics(100.0, 0.01); // 100ms latency, 1% error rate
    }
    
    /**
     * Get canary metrics
     */
    private Metrics getCanaryMetrics(String canaryName) {
        // In production, query metrics for canary pods
        // For demo, return simulated metrics (slightly better)
        return new Metrics(95.0, 0.005); // 95ms latency, 0.5% error rate
    }
    
    /**
     * Get deployment state
     */
    public DeploymentState getDeploymentState(String deploymentId) {
        return activeDeployments.get(deploymentId);
    }
    
    // Inner classes
    public static class DeploymentState {
        private String deploymentId;
        private String serviceId;
        private DeploymentStatus status;
        
        public DeploymentState(String deploymentId, String serviceId, DeploymentStatus status) {
            this.deploymentId = deploymentId;
            this.serviceId = serviceId;
            this.status = status;
        }
        
        public String getDeploymentId() { return deploymentId; }
        public String getServiceId() { return serviceId; }
        public DeploymentStatus getStatus() { return status; }
    }
    
    public enum DeploymentStatus {
        DEPLOYING,
        IMMUNIZED,
        FAILED
    }
    
    private static class Metrics {
        double avgLatency;
        double errorRate;
        
        Metrics(double avgLatency, double errorRate) {
            this.avgLatency = avgLatency;
            this.errorRate = errorRate;
        }
    }
}

