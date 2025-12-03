
package com.sdi.genetic;

import com.sdi.honeypot.HoneypotManager.ExploitTraceBundle;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Phase 3: Antigen Extraction - Genetic Algorithm Convergence
 * 
 * Processes ETB using a constrained genetic algorithm to derive
 * Vulnerability Signature (VS) describing vulnerability locus and remediation hints.
 */
@Component
public class GeneticExtractor {
    
    private static final int GENOME_LENGTH = 256; // 256-bit genome
    private static final int POPULATION_SIZE = 50;
    private static final int MAX_GENERATIONS = 50;
    private static final double MUTATION_RATE = 0.01;
    private static final double CROSSOVER_RATE = 0.7;
    private static final double CONVERGENCE_THRESHOLD = 0.95;
    
    /**
     * Extract vulnerability signature from exploit trace bundle
     * 
     * @param etb Exploit Trace Bundle
     * @return Vulnerability Signature
     */
    public VulnerabilitySignature extract(ExploitTraceBundle etb) {
        // Initialize population
        List<Genome> population = initializePopulation();
        
        double bestFitness = 0.0;
        Genome bestGenome = null;
        int generation = 0;
        
        // GA main loop
        while (generation < MAX_GENERATIONS && bestFitness < CONVERGENCE_THRESHOLD) {
            // Evaluate fitness
            for (Genome genome : population) {
                genome.fitness = evaluateFitness(genome, etb);
                if (genome.fitness > bestFitness) {
                    bestFitness = genome.fitness;
                    bestGenome = genome;
                }
            }
            
            // Check convergence
            if (bestFitness >= CONVERGENCE_THRESHOLD) {
                break;
            }
            
            // Selection, crossover, mutation
            population = evolve(population);
            generation++;
        }
        
        // Decode best genome to vulnerability signature
        return decodeGenome(bestGenome != null ? bestGenome : population.get(0), etb);
    }
    
    /**
     * Initialize random population
     */
    private List<Genome> initializePopulation() {
        List<Genome> population = new ArrayList<>();
        Random random = new Random();
        
        for (int i = 0; i < POPULATION_SIZE; i++) {
            boolean[] genes = new boolean[GENOME_LENGTH];
            for (int j = 0; j < GENOME_LENGTH; j++) {
                genes[j] = random.nextBoolean();
            }
            population.add(new Genome(genes));
        }
        
        return population;
    }
    
    /**
     * Evaluate fitness of genome against exploit trace
     * 
     * Fitness balances:
     * - Similarity to ETB
     * - Structural simplicity
     * - Line-range specificity
     */
    private double evaluateFitness(Genome genome, ExploitTraceBundle etb) {
        double similarityScore = computeSimilarity(genome, etb);
        double simplicityScore = computeSimplicity(genome);
        double specificityScore = computeSpecificity(genome);
        
        // Weighted combination
        return 0.5 * similarityScore + 0.3 * simplicityScore + 0.2 * specificityScore;
    }
    
    private double computeSimilarity(Genome genome, ExploitTraceBundle etb) {
        // Simplified: check if genome patterns match trace characteristics
        // In production, use sophisticated pattern matching
        int matchingBits = 0;
        boolean[] genes = genome.genes;
        
        // Extract features from ETB and compare with genome encoding
        String payload = etb.getTrace().getPayload();
        if (payload != null) {
            int payloadHash = payload.hashCode();
            for (int i = 0; i < Math.min(32, genes.length); i++) {
                boolean expectedBit = ((payloadHash >> i) & 1) == 1;
                if (genes[i] == expectedBit) {
                    matchingBits++;
                }
            }
        }
        
        return matchingBits / (double) Math.min(32, genes.length);
    }
    
    private double computeSimplicity(Genome genome) {
        // Prefer simpler (fewer 1s) genomes
        int ones = 0;
        for (boolean bit : genome.genes) {
            if (bit) ones++;
        }
        return 1.0 - (ones / (double) GENOME_LENGTH);
    }
    
    private double computeSpecificity(Genome genome) {
        // Prefer genomes with concentrated patterns (not random)
        // Simplified: check for consecutive patterns
        int patterns = 0;
        for (int i = 1; i < genome.genes.length; i++) {
            if (genome.genes[i] == genome.genes[i-1]) {
                patterns++;
            }
        }
        return patterns / (double) (GENOME_LENGTH - 1);
    }
    
    /**
     * Evolve population: selection, crossover, mutation
     */
    private List<Genome> evolve(List<Genome> population) {
        // Sort by fitness
        population.sort((a, b) -> Double.compare(b.fitness, a.fitness));
        
        // Elitism: keep top 20%
        int eliteCount = POPULATION_SIZE / 5;
        List<Genome> newPopulation = new ArrayList<>(population.subList(0, eliteCount));
        
        Random random = new Random();
        
        // Generate rest through crossover and mutation
        while (newPopulation.size() < POPULATION_SIZE) {
            // Tournament selection
            Genome parent1 = tournamentSelect(population, random);
            Genome parent2 = tournamentSelect(population, random);
            
            // Crossover
            Genome offspring;
            if (random.nextDouble() < CROSSOVER_RATE) {
                offspring = crossover(parent1, parent2, random);
            } else {
                offspring = new Genome(parent1.genes.clone());
            }
            
            // Mutation
            mutate(offspring, random);
            
            newPopulation.add(offspring);
        }
        
        return newPopulation;
    }
    
    private Genome tournamentSelect(List<Genome> population, Random random) {
        int tournamentSize = 3;
        Genome best = null;
        double bestFitness = -1.0;
        
        for (int i = 0; i < tournamentSize; i++) {
            Genome candidate = population.get(random.nextInt(population.size()));
            if (candidate.fitness > bestFitness) {
                bestFitness = candidate.fitness;
                best = candidate;
            }
        }
        
        return best;
    }
    
    private Genome crossover(Genome parent1, Genome parent2, Random random) {
        boolean[] genes = new boolean[GENOME_LENGTH];
        int crossoverPoint = random.nextInt(GENOME_LENGTH);
        
        for (int i = 0; i < GENOME_LENGTH; i++) {
            genes[i] = (i < crossoverPoint) ? parent1.genes[i] : parent2.genes[i];
        }
        
        return new Genome(genes);
    }
    
    private void mutate(Genome genome, Random random) {
        for (int i = 0; i < GENOME_LENGTH; i++) {
            if (random.nextDouble() < MUTATION_RATE) {
                genome.genes[i] = !genome.genes[i];
            }
        }
    }
    
    /**
     * Decode genome to vulnerability signature
     */
    private VulnerabilitySignature decodeGenome(Genome genome, ExploitTraceBundle etb) {
        // Extract exploit class (first 8 bits)
        int exploitClass = bitsToInt(genome.genes, 0, 8);
        
        // Extract vulnerable line range (next 16 bits)
        int lineStart = bitsToInt(genome.genes, 8, 16);
        int lineEnd = bitsToInt(genome.genes, 24, 16);
        
        // Extract data-flow pattern (next 64 bits)
        String dataFlowPattern = bitsToString(genome.genes, 40, 64);
        
        // Extract remediation template (remaining bits)
        String remediationTemplate = bitsToString(genome.genes, 104, 152);
        
        return new VulnerabilitySignature(
            exploitClass,
            lineStart,
            lineEnd,
            dataFlowPattern,
            remediationTemplate,
            etb.getAnomalyToken().getServiceId()
        );
    }
    
    private int bitsToInt(boolean[] bits, int start, int length) {
        int value = 0;
        for (int i = 0; i < length && (start + i) < bits.length; i++) {
            if (bits[start + i]) {
                value |= (1 << i);
            }
        }
        return value;
    }
    
    private String bitsToString(boolean[] bits, int start, int length) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length && (start + i) < bits.length; i += 8) {
            int charValue = bitsToInt(bits, start + i, Math.min(8, length - i));
            if (charValue > 0 && charValue < 128) {
                sb.append((char) charValue);
            }
        }
        return sb.toString();
    }
    
    // Inner classes
    private static class Genome {
        boolean[] genes;
        double fitness;
        
        Genome(boolean[] genes) {
            this.genes = genes;
            this.fitness = 0.0;
        }
    }
    
    public static class VulnerabilitySignature {
        private int exploitClass;
        private int vulnerableLineStart;
        private int vulnerableLineEnd;
        private String dataFlowPattern;
        private String remediationTemplate;
        private String serviceId;
        
        public VulnerabilitySignature(int exploitClass, int vulnerableLineStart, 
                                     int vulnerableLineEnd, String dataFlowPattern,
                                     String remediationTemplate, String serviceId) {
            this.exploitClass = exploitClass;
            this.vulnerableLineStart = vulnerableLineStart;
            this.vulnerableLineEnd = vulnerableLineEnd;
            this.dataFlowPattern = dataFlowPattern;
            this.remediationTemplate = remediationTemplate;
            this.serviceId = serviceId;
        }
        
        // Getters
        public int getExploitClass() { return exploitClass; }
        public int getVulnerableLineStart() { return vulnerableLineStart; }
        public int getVulnerableLineEnd() { return vulnerableLineEnd; }
        public String getDataFlowPattern() { return dataFlowPattern; }
        public String getRemediationTemplate() { return remediationTemplate; }
        public String getServiceId() { return serviceId; }
    }
}

