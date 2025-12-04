package com.sdi.web;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Bean;

/**
 * Auto-configuration for web endpoints
 */
@AutoConfiguration
@ConditionalOnWebApplication
@ConditionalOnClass(name = "org.springframework.web.bind.annotation.RestController")
public class SdiWebAutoConfiguration {
    
    @Bean
    public SdiController sdiController(com.sdi.pre.PolymorphicResponseEngine pre,
                                     com.sdi.detector.AnomalyDetector detector) {
        return new SdiController(pre, detector);
    }
}

