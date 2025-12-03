package com.sdi.sidecar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * SDI Sidecar Application
 * 
 * Runs as a sidecar container alongside applications in any language.
 * Provides REST API for language-agnostic integration.
 */
@SpringBootApplication
@ComponentScan(basePackages = "com.sdi")
public class SdiSidecarApplication {
    
    public static void main(String[] args) {
        System.out.println("=================================");
        System.out.println("  SDI Sidecar Starting...");
        System.out.println("  Platform-Independent Security");
        System.out.println("=================================");
        SpringApplication.run(SdiSidecarApplication.class, args);
    }
}

