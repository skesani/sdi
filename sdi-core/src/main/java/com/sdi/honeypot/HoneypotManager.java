package com.sdi.honeypot;

import com.sdi.detector.AnomalyDetector.AnomalyToken;
import io.kubernetes.client.openapi.ApiClient;
import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.Configuration;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.models.V1Pod;
import io.kubernetes.client.openapi.models.V1PodSpec;
import io.kubernetes.client.openapi.models.V1Container;
import io.kubernetes.client.util.Config;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Phase 2: Isolation - Controlled Exploit Capture
 * 
 * Creates ephemeral honeypot instances of implicated microservices.
 * Execution Path Isolation (EPI) ensures no shared memory or socket access.
 */
@Component
public class HoneypotManager {
    
    private final CoreV1Api k8sApi;
    private final Map<String, HoneypotInstance> activeHoneypots = new ConcurrentHashMap<>();
    private final Map<String, ExploitTraceBundle> capturedTraces = new ConcurrentHashMap<>();
    
    public HoneypotManager() throws Exception {
        // Initialize Kubernetes client
        ApiClient client = Config.defaultClient();
        Configuration.setDefaultApiClient(client);
        this.k8sApi = new CoreV1Api(client);
    }
    
    /**
     * Spawn ephemeral honeypot for anomaly token
     * 
     * @param token The anomaly token triggering isolation
     * @return HoneypotInstance identifier
     */
    public String spawnHoneypot(AnomalyToken token) {
        String serviceId = token.getServiceId();
        String honeypotId = "honeypot-" + serviceId + "-" + System.currentTimeMillis();
        
        try {
            // Create isolated pod with restricted security context
            V1Pod honeypotPod = createHoneypotPod(honeypotId, serviceId);
            k8sApi.createNamespacedPod("default", honeypotPod).execute();
            
            HoneypotInstance instance = new HoneypotInstance(
                honeypotId,
                serviceId,
                token,
                System.currentTimeMillis(),
                honeypotPod.getMetadata().getName()
            );
            
            activeHoneypots.put(honeypotId, instance);
            
            return honeypotId;
        } catch (ApiException e) {
            throw new RuntimeException("Failed to spawn honeypot: " + e.getMessage(), e);
        }
    }
    
    /**
     * Create Kubernetes pod specification for honeypot
     */
    private V1Pod createHoneypotPod(String honeypotId, String serviceId) {
        V1Pod pod = new V1Pod();
        pod.setApiVersion("v1");
        pod.setKind("Pod");
        
        // Metadata
        io.kubernetes.client.openapi.models.V1ObjectMeta metadata = 
            new io.kubernetes.client.openapi.models.V1ObjectMeta();
        metadata.setName(honeypotId);
        metadata.setLabels(Map.of(
            "app", "sdi-honeypot",
            "service", serviceId,
            "ephemeral", "true"
        ));
        pod.setMetadata(metadata);
        
        // Pod spec with security constraints
        V1PodSpec spec = new V1PodSpec();
        
        V1Container container = new V1Container();
        container.setName("honeypot-container");
        container.setImage("sdi-honeypot:" + serviceId); // Service-specific honeypot image
        
        // Security context - restricted permissions
        io.kubernetes.client.openapi.models.V1SecurityContext securityContext =
            new io.kubernetes.client.openapi.models.V1SecurityContext();
        securityContext.setRunAsNonRoot(true);
        securityContext.setReadOnlyRootFilesystem(true);
        securityContext.setAllowPrivilegeEscalation(false);
        container.setSecurityContext(securityContext);
        
        spec.setContainers(List.of(container));
        spec.setRestartPolicy("Never"); // Ephemeral - don't restart
        
        pod.setSpec(spec);
        
        return pod;
    }
    
    /**
     * Capture exploit trace from honeypot execution
     * 
     * @param honeypotId The honeypot instance identifier
     * @param traceData Execution trace data
     */
    public void captureTrace(String honeypotId, ExecutionTrace traceData) {
        HoneypotInstance instance = activeHoneypots.get(honeypotId);
        if (instance == null) {
            throw new IllegalArgumentException("Honeypot not found: " + honeypotId);
        }
        
        ExploitTraceBundle etb = new ExploitTraceBundle(
            honeypotId,
            instance.getAnomalyToken(),
            traceData,
            System.currentTimeMillis()
        );
        
        capturedTraces.put(honeypotId, etb);
    }
    
    /**
     * Retrieve exploit trace bundle
     */
    public ExploitTraceBundle getTraceBundle(String honeypotId) {
        return capturedTraces.get(honeypotId);
    }
    
    /**
     * Cleanup honeypot instance
     */
    public void destroyHoneypot(String honeypotId) {
        try {
            HoneypotInstance instance = activeHoneypots.remove(honeypotId);
            if (instance != null) {
                k8sApi.deleteNamespacedPod(instance.getPodName(), "default").execute();
            }
        } catch (ApiException e) {
            // Log error but don't fail
            System.err.println("Failed to destroy honeypot " + honeypotId + ": " + e.getMessage());
        }
    }
    
    // Inner classes
    public static class HoneypotInstance {
        private String honeypotId;
        private String serviceId;
        private AnomalyToken anomalyToken;
        private long createdAt;
        private String podName;
        
        public HoneypotInstance(String honeypotId, String serviceId, 
                               AnomalyToken anomalyToken, long createdAt, String podName) {
            this.honeypotId = honeypotId;
            this.serviceId = serviceId;
            this.anomalyToken = anomalyToken;
            this.createdAt = createdAt;
            this.podName = podName;
        }
        
        public String getHoneypotId() { return honeypotId; }
        public String getServiceId() { return serviceId; }
        public AnomalyToken getAnomalyToken() { return anomalyToken; }
        public long getCreatedAt() { return createdAt; }
        public String getPodName() { return podName; }
    }
    
    public static class ExecutionTrace {
        private List<String> taintedVariables;
        private List<String> controlFlowPath;
        private Map<String, Object> exceptionGraph;
        private String payload;
        private Map<String, Object> syscalls;
        
        public ExecutionTrace() {
            this.taintedVariables = new ArrayList<>();
            this.controlFlowPath = new ArrayList<>();
            this.exceptionGraph = new HashMap<>();
            this.syscalls = new HashMap<>();
        }
        
        // Getters and setters
        public List<String> getTaintedVariables() { return taintedVariables; }
        public void setTaintedVariables(List<String> taintedVariables) { 
            this.taintedVariables = taintedVariables; 
        }
        public List<String> getControlFlowPath() { return controlFlowPath; }
        public void setControlFlowPath(List<String> controlFlowPath) { 
            this.controlFlowPath = controlFlowPath; 
        }
        public Map<String, Object> getExceptionGraph() { return exceptionGraph; }
        public void setExceptionGraph(Map<String, Object> exceptionGraph) { 
            this.exceptionGraph = exceptionGraph; 
        }
        public String getPayload() { return payload; }
        public void setPayload(String payload) { this.payload = payload; }
        public Map<String, Object> getSyscalls() { return syscalls; }
        public void setSyscalls(Map<String, Object> syscalls) { this.syscalls = syscalls; }
    }
    
    public static class ExploitTraceBundle {
        private String honeypotId;
        private AnomalyToken anomalyToken;
        private ExecutionTrace trace;
        private long capturedAt;
        
        public ExploitTraceBundle(String honeypotId, AnomalyToken anomalyToken, 
                                 ExecutionTrace trace, long capturedAt) {
            this.honeypotId = honeypotId;
            this.anomalyToken = anomalyToken;
            this.trace = trace;
            this.capturedAt = capturedAt;
        }
        
        public String getHoneypotId() { return honeypotId; }
        public AnomalyToken getAnomalyToken() { return anomalyToken; }
        public ExecutionTrace getTrace() { return trace; }
        public long getCapturedAt() { return capturedAt; }
    }
}

