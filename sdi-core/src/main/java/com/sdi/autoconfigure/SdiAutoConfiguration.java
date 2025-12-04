package com.sdi.autoconfigure;

import com.sdi.detector.AnomalyDetector;
import com.sdi.deployer.ImmunizationDeployer;
import com.sdi.genetic.GeneticExtractor;
import com.sdi.honeypot.HoneypotManager;
import com.sdi.mutation.MutationSynthesizer;
import com.sdi.pre.PolymorphicResponseEngine;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.core.KafkaTemplate;

/**
 * Auto-configuration for Synthetic Digital Immunity
 * 
 * Automatically configures SDI components when:
 * - SDI is enabled via properties (default: true)
 * - Required dependencies are present
 * 
 * Usage: Just add the dependency to your Spring Boot app!
 */
@AutoConfiguration
@ConditionalOnProperty(prefix = "sdi", name = "enabled", havingValue = "true", matchIfMissing = true)
@EnableConfigurationProperties(SdiProperties.class)
public class SdiAutoConfiguration {
    
    @Bean
    @ConditionalOnMissingBean
    public AnomalyDetector anomalyDetector(SdiProperties properties) {
        AnomalyDetector detector = new AnomalyDetector();
        detector.setAnomalyThreshold(properties.getDetection().getThreshold());
        return detector;
    }
    
    @Bean
    @ConditionalOnMissingBean
    @ConditionalOnProperty(prefix = "sdi.honeypot", name = "enabled", havingValue = "true", matchIfMissing = true)
    public HoneypotManager honeypotManager(SdiProperties properties) {
        try {
            return new HoneypotManager();
        } catch (Exception e) {
            throw new RuntimeException("Failed to initialize HoneypotManager. " +
                "Ensure Kubernetes access is configured or disable honeypot: sdi.honeypot.enabled=false", e);
        }
    }
    
    @Bean
    @ConditionalOnMissingBean
    public GeneticExtractor geneticExtractor(SdiProperties properties) {
        return new GeneticExtractor();
    }
    
    @Bean
    @ConditionalOnMissingBean
    public MutationSynthesizer mutationSynthesizer(SdiProperties properties) {
        return new MutationSynthesizer();
    }
    
    @Bean
    @ConditionalOnMissingBean
    @ConditionalOnProperty(prefix = "sdi.deployment", name = "enabled", havingValue = "true", matchIfMissing = true)
    public ImmunizationDeployer immunizationDeployer(SdiProperties properties) {
        return new ImmunizationDeployer();
    }
    
    @Bean
    @ConditionalOnMissingBean
    @ConditionalOnClass(KafkaTemplate.class)
    @ConditionalOnProperty(prefix = "sdi.kafka", name = "enabled", havingValue = "true", matchIfMissing = true)
    public PolymorphicResponseEngine polymorphicResponseEngine(
            AnomalyDetector detector,
            HoneypotManager honeypotManager,
            GeneticExtractor geneticExtractor,
            MutationSynthesizer mutationSynthesizer,
            ImmunizationDeployer deployer,
            KafkaTemplate<String, String> kafkaTemplate,
            SdiProperties properties) {
        return new PolymorphicResponseEngine(
            detector, honeypotManager, geneticExtractor,
            mutationSynthesizer, deployer, kafkaTemplate
        );
    }
    
    // Fallback: PRE without Kafka and optional components (for simpler setups)
    @Bean
    @ConditionalOnMissingBean(PolymorphicResponseEngine.class)
    @ConditionalOnProperty(prefix = "sdi.kafka", name = "enabled", havingValue = "false")
    public PolymorphicResponseEngine polymorphicResponseEngineSimple(
            AnomalyDetector detector,
            GeneticExtractor geneticExtractor,
            MutationSynthesizer mutationSynthesizer,
            SdiProperties properties) {
        // Create a simplified PRE without Kafka, honeypot, or deployment
        return new PolymorphicResponseEngine(detector, null, geneticExtractor, mutationSynthesizer, null, null);
    }
}
