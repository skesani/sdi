package com.sdi.pre;

import com.sdi.detector.AnomalyDetector;
import com.sdi.detector.AnomalyDetector.AnomalyToken;
import com.sdi.detector.AnomalyDetector.RequestVector;
import com.sdi.genetic.GeneticExtractor;
import com.sdi.genetic.GeneticExtractor.VulnerabilitySignature;
import com.sdi.honeypot.HoneypotManager;
import com.sdi.honeypot.HoneypotManager.ExploitTraceBundle;
import com.sdi.honeypot.HoneypotManager.ExecutionTrace;
import com.sdi.mutation.MutationSynthesizer;
import com.sdi.mutation.MutationSynthesizer.MutationPatch;
import com.sdi.deployer.ImmunizationDeployer;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.lang.Nullable;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * Unified PRE Pipeline Orchestrator
 * 
 * Coordinates the five-phase pipeline:
 * Detection → Isolation → Antigen Extraction → Mutation Synthesis → Propagation
 */
@Service
public class PolymorphicResponseEngine {
    
    private final AnomalyDetector detector;
    private final HoneypotManager honeypotManager;
    private final GeneticExtractor geneticExtractor;
    private final MutationSynthesizer mutationSynthesizer;
    private final ImmunizationDeployer deployer;
    private final Optional<KafkaTemplate<String, String>> kafkaTemplate;
    
    private final Map<String, PipelineState> activePipelines = new HashMap<>();
    
    @Autowired(required = false)
    public PolymorphicResponseEngine(
            AnomalyDetector detector,
            @Nullable HoneypotManager honeypotManager,
            GeneticExtractor geneticExtractor,
            MutationSynthesizer mutationSynthesizer,
            @Nullable ImmunizationDeployer deployer,
            @Nullable KafkaTemplate<String, String> kafkaTemplate) {
        this.detector = detector;
        this.honeypotManager = honeypotManager;
        this.geneticExtractor = geneticExtractor;
        this.mutationSynthesizer = mutationSynthesizer;
        this.deployer = deployer;
        this.kafkaTemplate = Optional.ofNullable(kafkaTemplate);
    }
    
    /**
     * Process request through PRE pipeline
     */
    public void processRequest(RequestVector request) {
        // Phase 1: Detection
        AnomalyToken token = detector.detect(request);
        if (token == null) {
            return; // No anomaly detected
        }
        
        String pipelineId = "pipeline-" + System.currentTimeMillis();
        PipelineState state = new PipelineState(pipelineId, request.getServiceId());
        activePipelines.put(pipelineId, state);
        
        state.setPhase(PipelinePhase.DETECTION);
        state.setAnomalyToken(token);
        
        // Publish to Immune Bus (Kafka)
        publishAnomalyEvent(token);
        
        // Phase 2: Isolation (if honeypot is available)
        ExploitTraceBundle etb = null;
        if (honeypotManager != null) {
            state.setPhase(PipelinePhase.ISOLATION);
            String honeypotId = honeypotManager.spawnHoneypot(token);
            state.setHoneypotId(honeypotId);
            
            // Simulate exploit capture (in production, this happens asynchronously)
            ExecutionTrace trace = captureExploitTrace(honeypotId, request);
            honeypotManager.captureTrace(honeypotId, trace);
            
            etb = honeypotManager.getTraceBundle(honeypotId);
            state.setExploitTraceBundle(etb);
        } else {
            // Simplified trace bundle without honeypot
            ExecutionTrace trace = captureExploitTrace(null, request);
            etb = new ExploitTraceBundle("no-honeypot", token, trace, System.currentTimeMillis());
            state.setExploitTraceBundle(etb);
        }
        
        // Phase 3: Antigen Extraction
        state.setPhase(PipelinePhase.ANTIGEN_EXTRACTION);
        VulnerabilitySignature vs = geneticExtractor.extract(etb);
        state.setVulnerabilitySignature(vs);
        
        // Phase 4: Mutation Synthesis
        state.setPhase(PipelinePhase.MUTATION_SYNTHESIS);
        String sourceCodePath = getSourceCodePath(request.getServiceId());
        MutationPatch mp = mutationSynthesizer.synthesize(vs, sourceCodePath);
        state.setMutationPatch(mp);
        
        // Phase 5: Propagation (if deployer is available)
        if (deployer != null) {
            state.setPhase(PipelinePhase.PROPAGATION);
            String deploymentId = deployer.deploy(mp);
            state.setDeploymentId(deploymentId);
        }
        
        state.setPhase(PipelinePhase.COMPLETE);
        
        // Cleanup honeypot (if used)
        if (honeypotManager != null && state.getHoneypotId() != null) {
            honeypotManager.destroyHoneypot(state.getHoneypotId());
        }
        
        System.out.println("PRE Pipeline completed: " + pipelineId);
    }
    
    /**
     * Listen to anomaly events from Kafka (Immune Bus)
     * Only active if Kafka is enabled and available
     */
    @org.springframework.kafka.annotation.KafkaListener(
        topics = "${sdi.kafka.topic:sdi-anomalies}", 
        groupId = "sdi-pre"
    )
    public void handleAnomalyEvent(String eventJson) {
        // Parse event and trigger pipeline
        // Simplified for demo
        System.out.println("Received anomaly event: " + eventJson);
    }
    
    /**
     * Publish anomaly event to Immune Bus (if Kafka is available)
     */
    private void publishAnomalyEvent(AnomalyToken token) {
        if (kafkaTemplate != null) {
            String eventJson = String.format(
                "{\"serviceId\":\"%s\",\"timestamp\":%d,\"score\":%.4f}",
                token.getServiceId(),
                token.getTimestamp(),
                token.getAnomalyScore()
            );
            kafkaTemplate.ifPresent(template -> 
                template.send("sdi-anomalies", token.getServiceId(), eventJson)
            );
        } else {
            // Log locally if Kafka not available
            System.out.println("SDI Anomaly detected: " + token.getServiceId() + 
                             " (score: " + token.getAnomalyScore() + ")");
        }
    }
    
    /**
     * Capture exploit trace (simplified)
     */
    private ExecutionTrace captureExploitTrace(String honeypotId, RequestVector request) {
        ExecutionTrace trace = new ExecutionTrace();
        if (request.getMetadata() != null) {
            trace.setPayload(request.getMetadata().getOrDefault("payload", ""));
        }
        trace.getControlFlowPath().add("entry");
        trace.getControlFlowPath().add("vulnerable_method");
        trace.getControlFlowPath().add("exploit_execution");
        trace.getTaintedVariables().add("userInput");
        return trace;
    }
    
    /**
     * Get source code path for service
     */
    private String getSourceCodePath(String serviceId) {
        // In production, resolve from service registry or Git
        return "/tmp/services/" + serviceId + "/src/main/java/com/service/" + serviceId + ".java";
    }
    
    /**
     * Get pipeline state
     */
    public PipelineState getPipelineState(String pipelineId) {
        return activePipelines.get(pipelineId);
    }
    
    // Inner classes
    public static class PipelineState {
        private String pipelineId;
        private String serviceId;
        private PipelinePhase phase;
        private AnomalyToken anomalyToken;
        private String honeypotId;
        private ExploitTraceBundle exploitTraceBundle;
        private VulnerabilitySignature vulnerabilitySignature;
        private MutationPatch mutationPatch;
        private String deploymentId;
        
        public PipelineState(String pipelineId, String serviceId) {
            this.pipelineId = pipelineId;
            this.serviceId = serviceId;
            this.phase = PipelinePhase.INITIALIZED;
        }
        
        // Getters and setters
        public String getPipelineId() { return pipelineId; }
        public String getServiceId() { return serviceId; }
        public PipelinePhase getPhase() { return phase; }
        public void setPhase(PipelinePhase phase) { this.phase = phase; }
        public AnomalyToken getAnomalyToken() { return anomalyToken; }
        public void setAnomalyToken(AnomalyToken anomalyToken) { this.anomalyToken = anomalyToken; }
        public String getHoneypotId() { return honeypotId; }
        public void setHoneypotId(String honeypotId) { this.honeypotId = honeypotId; }
        public ExploitTraceBundle getExploitTraceBundle() { return exploitTraceBundle; }
        public void setExploitTraceBundle(ExploitTraceBundle exploitTraceBundle) { 
            this.exploitTraceBundle = exploitTraceBundle; 
        }
        public VulnerabilitySignature getVulnerabilitySignature() { return vulnerabilitySignature; }
        public void setVulnerabilitySignature(VulnerabilitySignature vulnerabilitySignature) { 
            this.vulnerabilitySignature = vulnerabilitySignature; 
        }
        public MutationPatch getMutationPatch() { return mutationPatch; }
        public void setMutationPatch(MutationPatch mutationPatch) { this.mutationPatch = mutationPatch; }
        public String getDeploymentId() { return deploymentId; }
        public void setDeploymentId(String deploymentId) { this.deploymentId = deploymentId; }
    }
    
    public enum PipelinePhase {
        INITIALIZED,
        DETECTION,
        ISOLATION,
        ANTIGEN_EXTRACTION,
        MUTATION_SYNTHESIS,
        PROPAGATION,
        COMPLETE
    }
}

