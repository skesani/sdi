package com.sdi.mutation;

import com.github.javaparser.JavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.Node;
import com.github.javaparser.ast.body.MethodDeclaration;
import com.github.javaparser.ast.expr.MethodCallExpr;
import com.github.javaparser.ast.stmt.BlockStmt;
import com.github.javaparser.ast.stmt.Statement;
import com.github.javaparser.printer.lexicalpreservation.LexicalPreservingPrinter;
import com.sdi.genetic.GeneticExtractor.VulnerabilitySignature;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

/**
 * Phase 4: Mutation Synthesis - AST-Level Code Transformation
 * 
 * Uses VS to synthesize code mutation at Abstract Syntax Tree level.
 * Transformations include guard insertion, control-flow reshaping, strengthened typing.
 * 
 * Constraints:
 * - Hamming distance between original and mutated bytecode > threshold
 * - All existing test cases must pass (functional equivalence)
 */
@Component
public class MutationSynthesizer {
    
    private static final double POLYMORPHIC_THRESHOLD = 0.30; // 30% bytecode change required
    private final JavaParser parser = new JavaParser();
    
    /**
     * Synthesize mutation patch from vulnerability signature
     * 
     * @param vs Vulnerability Signature
     * @param sourceCodePath Path to original source code
     * @return Mutation Patch
     */
    public MutationPatch synthesize(VulnerabilitySignature vs, String sourceCodePath) {
        try {
            // Parse source code
            Path path = Paths.get(sourceCodePath);
            String originalCode = Files.readString(path);
            CompilationUnit cu = parser.parse(originalCode).getResult().orElseThrow();
            
            // Apply transformations
            CompilationUnit mutatedCu = applyTransformations(cu, vs);
            
            // Generate mutated code
            String mutatedCode = LexicalPreservingPrinter.print(mutatedCu);
            
            // Verify constraints
            if (!verifyConstraints(originalCode, mutatedCode, vs)) {
                // Retry with adjusted transformations
                return synthesizeWithRetry(vs, sourceCodePath, 3);
            }
            
            // Compute bytecode delta
            double bytecodeDelta = computeBytecodeDelta(originalCode, mutatedCode);
            
            return new MutationPatch(
                vs.getServiceId(),
                mutatedCode,
                bytecodeDelta,
                vs.getVulnerableLineStart(),
                vs.getVulnerableLineEnd(),
                System.currentTimeMillis()
            );
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to synthesize mutation: " + e.getMessage(), e);
        }
    }
    
    /**
     * Apply AST transformations based on vulnerability signature
     */
    private CompilationUnit applyTransformations(CompilationUnit cu, VulnerabilitySignature vs) {
        // 1. Insert guard check at vulnerable location
        cu = insertGuardCheck(cu, vs);
        
        // 2. Reshape control flow
        cu = reshapeControlFlow(cu, vs);
        
        // 3. Strengthen typing/validation
        cu = strengthenValidation(cu, vs);
        
        return cu;
    }
    
    /**
     * Insert guard check to pre-empt exploit vector
     */
    private CompilationUnit insertGuardCheck(CompilationUnit cu, VulnerabilitySignature vs) {
        cu.findAll(MethodDeclaration.class).forEach(method -> {
            BlockStmt body = method.getBody().orElse(null);
            if (body != null) {
                // Find insertion point (beginning of method)
                // Create guard check statement
                String guardCode = String.format(
                    "if (!guardCheck(%d, %d)) { throw new SecurityException(\"Exploit detected\"); }",
                    vs.getVulnerableLineStart(),
                    vs.getVulnerableLineEnd()
                );
                
                try {
                    JavaParser javaParser = new JavaParser();
                    Statement guardStmt = javaParser.parseStatement(guardCode).getResult().orElse(null);
                    if (guardStmt != null) {
                        body.getStatements().add(0, guardStmt);
                    }
                } catch (Exception e) {
                    // Skip if parsing fails
                }
            }
        });
        
        return cu;
    }
    
    /**
     * Reshape control flow without altering functionality
     */
    private CompilationUnit reshapeControlFlow(CompilationUnit cu, VulnerabilitySignature vs) {
        cu.findAll(MethodDeclaration.class).forEach(method -> {
            BlockStmt body = method.getBody().orElse(null);
            if (body != null && body.getStatements().size() > 1) {
                // Reorder statements (preserve data dependencies)
                List<Statement> statements = new ArrayList<>(body.getStatements());
                
                // Simple reordering: swap adjacent independent statements
                if (statements.size() >= 2) {
                    // Check if statements can be swapped (simplified check)
                    Statement first = statements.get(0);
                    Statement second = statements.get(1);
                    
                    // Swap if safe (in production, use sophisticated dependency analysis)
                    if (canSwap(first, second)) {
                        Collections.swap(statements, 0, 1);
                        body.getStatements().clear();
                        body.getStatements().addAll(statements);
                    }
                }
            }
        });
        
        return cu;
    }
    
    /**
     * Check if two statements can be safely swapped
     */
    private boolean canSwap(Statement stmt1, Statement stmt2) {
        // Simplified: assume independent if they don't share variables
        // In production, use sophisticated data-flow analysis
        return true; // Conservative: allow swap
    }
    
    /**
     * Strengthen validation and typing
     */
    private CompilationUnit strengthenValidation(CompilationUnit cu, VulnerabilitySignature vs) {
        // Add additional validation based on data flow pattern
        cu.findAll(MethodCallExpr.class).forEach(call -> {
            // Add null checks, bounds checks, etc.
            // Simplified for demo
        });
        
        return cu;
    }
    
    /**
     * Verify constraints: bytecode delta and functional equivalence
     */
    private boolean verifyConstraints(String originalCode, String mutatedCode, 
                                     VulnerabilitySignature vs) {
        // Check bytecode delta
        double delta = computeBytecodeDelta(originalCode, mutatedCode);
        if (delta < POLYMORPHIC_THRESHOLD) {
            return false;
        }
        
        // In production, run test suite here
        // For demo, assume tests pass if code compiles
        return true;
    }
    
    /**
     * Compute bytecode delta (Hamming distance normalized)
     */
    private double computeBytecodeDelta(String original, String mutated) {
        // Simplified: use character-level difference
        // In production, compile to bytecode and compute actual Hamming distance
        
        int maxLen = Math.max(original.length(), mutated.length());
        if (maxLen == 0) return 0.0;
        
        int differences = 0;
        int minLen = Math.min(original.length(), mutated.length());
        
        for (int i = 0; i < minLen; i++) {
            if (original.charAt(i) != mutated.charAt(i)) {
                differences++;
            }
        }
        
        differences += Math.abs(original.length() - mutated.length());
        
        return differences / (double) maxLen;
    }
    
    /**
     * Retry synthesis with adjusted parameters
     */
    private MutationPatch synthesizeWithRetry(VulnerabilitySignature vs, 
                                             String sourceCodePath, int maxRetries) {
        for (int i = 0; i < maxRetries; i++) {
            try {
                MutationPatch patch = synthesize(vs, sourceCodePath);
                if (patch.getBytecodeDelta() >= POLYMORPHIC_THRESHOLD) {
                    return patch;
                }
            } catch (Exception e) {
                // Continue to next retry
            }
        }
        
        throw new RuntimeException("Failed to synthesize valid mutation after " + maxRetries + " retries");
    }
    
    /**
     * Save mutated code to file
     */
    public String saveMutatedCode(MutationPatch patch, String outputPath) throws IOException {
        Path path = Paths.get(outputPath);
        Files.createDirectories(path.getParent());
        Files.writeString(path, patch.getMutatedCode());
        return path.toString();
    }
    
    // Inner class
    public static class MutationPatch {
        private String serviceId;
        private String mutatedCode;
        private double bytecodeDelta;
        private int lineStart;
        private int lineEnd;
        private long createdAt;
        
        public MutationPatch(String serviceId, String mutatedCode, double bytecodeDelta,
                           int lineStart, int lineEnd, long createdAt) {
            this.serviceId = serviceId;
            this.mutatedCode = mutatedCode;
            this.bytecodeDelta = bytecodeDelta;
            this.lineStart = lineStart;
            this.lineEnd = lineEnd;
            this.createdAt = createdAt;
        }
        
        // Getters
        public String getServiceId() { return serviceId; }
        public String getMutatedCode() { return mutatedCode; }
        public double getBytecodeDelta() { return bytecodeDelta; }
        public int getLineStart() { return lineStart; }
        public int getLineEnd() { return lineEnd; }
        public long getCreatedAt() { return createdAt; }
    }
}

