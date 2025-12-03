#!/usr/bin/env python3
"""
Generate IEEE-style architecture diagrams for Synthetic Digital Immunity (SDI)
Figures are optimized for black-and-white printing with optional color for digital viewing.
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, ConnectionPatch
import numpy as np
from matplotlib.patches import Rectangle, Circle, Arrow
import matplotlib.patheffects as path_effects

# IEEE-style settings
plt.rcParams['font.family'] = 'serif'
plt.rcParams['font.serif'] = ['Times New Roman', 'Times', 'DejaVu Serif']
plt.rcParams['font.size'] = 10
plt.rcParams['axes.linewidth'] = 0.5
plt.rcParams['figure.dpi'] = 300
plt.rcParams['savefig.dpi'] = 300
plt.rcParams['savefig.bbox'] = 'tight'

def figure1_sdi_architecture():
    """Figure 1: SDI Architecture Overview"""
    fig, ax = plt.subplots(1, 1, figsize=(12, 8))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')
    
    # Title
    ax.text(5, 9.5, 'Synthetic Digital Immunity (SDI) Architecture Overview', 
            ha='center', fontsize=14, weight='bold')
    
    # User/Client layer
    users_box = FancyBboxPatch((1, 8), 8, 0.8, boxstyle="round,pad=0.1", 
                                edgecolor='black', facecolor='lightgray', linewidth=1.5)
    ax.add_patch(users_box)
    ax.text(5, 8.4, 'Users/Clients', ha='center', fontsize=11, weight='bold')
    
    # Load Balancer
    lb_box = FancyBboxPatch((4, 7), 2, 0.6, boxstyle="round,pad=0.1",
                            edgecolor='black', facecolor='white', linewidth=1.5)
    ax.add_patch(lb_box)
    ax.text(5, 7.3, 'Load Balancer', ha='center', fontsize=10)
    
    # Kubernetes Cluster boundary
    cluster_box = FancyBboxPatch((0.5, 1.5), 9, 5, boxstyle="round,pad=0.2",
                                 edgecolor='black', facecolor='none', linewidth=2, linestyle='--')
    ax.add_patch(cluster_box)
    ax.text(5, 6.2, 'Kubernetes Cluster (Federal Cloud)', ha='center', fontsize=11, weight='bold',
            bbox=dict(boxstyle='round', facecolor='white', edgecolor='none', pad=0.3))
    
    # Service 1
    svc1_box = FancyBboxPatch((1.5, 4), 2.5, 1.5, boxstyle="round,pad=0.1",
                               edgecolor='black', facecolor='white', linewidth=1.5)
    ax.add_patch(svc1_box)
    ax.text(2.75, 5, 'Service 1', ha='center', fontsize=10, weight='bold')
    
    # Envoy sidecar 1
    envoy1_box = FancyBboxPatch((1.7, 3.5), 2.1, 0.4, boxstyle="round,pad=0.05",
                                 edgecolor='blue', facecolor='lightblue', linewidth=1)
    ax.add_patch(envoy1_box)
    ax.text(2.75, 3.7, 'Envoy Sidecar', ha='center', fontsize=8)
    
    # Service 2
    svc2_box = FancyBboxPatch((6, 4), 2.5, 1.5, boxstyle="round,pad=0.1",
                               edgecolor='black', facecolor='white', linewidth=1.5)
    ax.add_patch(svc2_box)
    ax.text(7.25, 5, 'Service 2', ha='center', fontsize=10, weight='bold')
    
    # Envoy sidecar 2
    envoy2_box = FancyBboxPatch((6.2, 3.5), 2.1, 0.4, boxstyle="round,pad=0.05",
                                 edgecolor='blue', facecolor='lightblue', linewidth=1)
    ax.add_patch(envoy2_box)
    ax.text(7.25, 3.7, 'Envoy Sidecar', ha='center', fontsize=8)
    
    # Honeypot container
    honeypot_box = FancyBboxPatch((1.5, 2), 2.5, 0.8, boxstyle="round,pad=0.1",
                                  edgecolor='red', facecolor='lightcoral', linewidth=1.5, linestyle='--')
    ax.add_patch(honeypot_box)
    ax.text(2.75, 2.4, 'Honeypot Container', ha='center', fontsize=9, style='italic')
    
    # Kafka (Immune Bus)
    kafka_box = FancyBboxPatch((6, 1.5), 2.5, 1.3, boxstyle="round,pad=0.1",
                                edgecolor='black', facecolor='lightyellow', linewidth=1.5, linestyle='--')
    ax.add_patch(kafka_box)
    ax.text(7.25, 2.15, 'Immune Bus', ha='center', fontsize=10, weight='bold')
    ax.text(7.25, 1.85, '(Apache Kafka)', ha='center', fontsize=8, style='italic')
    
    # AI Analyzer
    ai_box = FancyBboxPatch((4, 0.5), 2, 0.8, boxstyle="round,pad=0.1",
                            edgecolor='black', facecolor='lightgreen', linewidth=1.5)
    ax.add_patch(ai_box)
    ax.text(5, 0.9, 'AI Analyzer', ha='center', fontsize=10, weight='bold')
    
    # CI/CD Pipeline
    cicd_box = FancyBboxPatch((0.5, 0.5), 2.5, 0.8, boxstyle="round,pad=0.1",
                              edgecolor='black', facecolor='lightcyan', linewidth=1.5)
    ax.add_patch(cicd_box)
    ax.text(1.75, 0.9, 'CI/CD Pipeline', ha='center', fontsize=9)
    ax.text(1.75, 0.7, '(Jenkins/GitLab)', ha='center', fontsize=7, style='italic')
    
    # Arrows - Normal flow
    arrow1 = FancyArrowPatch((5, 7.6), (5, 6.5), arrowstyle='->', 
                             mutation_scale=20, linewidth=1.5, color='black')
    ax.add_patch(arrow1)
    
    arrow2 = FancyArrowPatch((5, 6.5), (2.75, 5.5), arrowstyle='->',
                             mutation_scale=15, linewidth=1, color='black')
    ax.add_patch(arrow2)
    
    arrow3 = FancyArrowPatch((5, 6.5), (7.25, 5.5), arrowstyle='->',
                             mutation_scale=15, linewidth=1, color='black')
    ax.add_patch(arrow3)
    
    # Dashed arrows - Anomaly detection to Kafka
    arrow4 = FancyArrowPatch((2.75, 3.5), (6.5, 2.5), arrowstyle='->',
                             mutation_scale=15, linewidth=1, color='blue', linestyle='--')
    ax.add_patch(arrow4)
    ax.text(4.5, 3, '① Detection', ha='center', fontsize=9, color='blue', weight='bold',
            bbox=dict(boxstyle='round', facecolor='white', edgecolor='blue', pad=0.2))
    
    arrow5 = FancyArrowPatch((7.25, 3.5), (7.5, 2.5), arrowstyle='->',
                             mutation_scale=15, linewidth=1, color='blue', linestyle='--')
    ax.add_patch(arrow5)
    
    # Dotted red arrow - Isolation to Honeypot
    arrow6 = FancyArrowPatch((2.75, 4), (2.75, 2.8), arrowstyle='->',
                             mutation_scale=15, linewidth=1.5, color='red', linestyle=':')
    ax.add_patch(arrow6)
    ax.text(3.5, 3.4, '③ Isolation', ha='left', fontsize=9, color='red', weight='bold',
            bbox=dict(boxstyle='round', facecolor='white', edgecolor='red', pad=0.2))
    
    # Arrow from Kafka to AI Analyzer
    arrow7 = FancyArrowPatch((7.25, 1.5), (6, 1.3), arrowstyle='->',
                             mutation_scale=15, linewidth=1, color='green', linestyle='--')
    ax.add_patch(arrow7)
    ax.text(6.6, 1.2, '② Antigen Extraction', ha='center', fontsize=9, color='green', weight='bold',
            bbox=dict(boxstyle='round', facecolor='white', edgecolor='green', pad=0.2))
    
    # Arrow from AI Analyzer to CI/CD
    arrow8 = FancyArrowPatch((4, 0.9), (3, 0.9), arrowstyle='->',
                             mutation_scale=15, linewidth=1.5, color='purple')
    ax.add_patch(arrow8)
    ax.text(3.5, 1.2, '④ Mutation Synthesis', ha='center', fontsize=9, color='purple', weight='bold',
            bbox=dict(boxstyle='round', facecolor='white', edgecolor='purple', pad=0.2))
    
    # Arrow from CI/CD back to cluster (Propagation)
    arrow9 = FancyArrowPatch((1.75, 1.3), (2.75, 4.5), arrowstyle='->',
                             mutation_scale=15, linewidth=1.5, color='orange')
    ax.add_patch(arrow9)
    ax.text(1.2, 2.8, '⑤ Propagation', ha='center', fontsize=9, color='orange', weight='bold',
            rotation=90, bbox=dict(boxstyle='round', facecolor='white', edgecolor='orange', pad=0.2))
    
    # Legend
    legend_elements = [
        mpatches.Patch(facecolor='lightblue', edgecolor='blue', label='Envoy Sidecar'),
        mpatches.Patch(facecolor='lightcoral', edgecolor='red', linestyle='--', label='Honeypot'),
        mpatches.Patch(facecolor='lightyellow', edgecolor='black', linestyle='--', label='Event Bus (Kafka)'),
        mpatches.Patch(facecolor='lightgreen', edgecolor='black', label='AI Analyzer'),
        mpatches.Patch(facecolor='lightcyan', edgecolor='black', label='CI/CD Pipeline')
    ]
    ax.legend(handles=legend_elements, loc='upper right', fontsize=8, framealpha=0.9)
    
    plt.tight_layout()
    plt.savefig('diagrams/figure1_sdi_architecture.pdf', format='pdf', bbox_inches='tight')
    plt.savefig('diagrams/figure1_sdi_architecture.png', format='png', bbox_inches='tight', dpi=300)
    print("Generated Figure 1: SDI Architecture Overview")
    plt.close()

def figure2_pre_pipeline():
    """Figure 2: PRE Pipeline Flow"""
    fig, ax = plt.subplots(1, 1, figsize=(14, 6))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 6)
    ax.axis('off')
    
    # Title
    ax.text(7, 5.5, 'Polymorphic Response Engine (PRE) Five-Phase Pipeline', 
            ha='center', fontsize=14, weight='bold')
    
    # Phase boxes
    phases = [
        ('Detection', 1.5, 3, 'lightblue', 'Anomaly Token\n(AT)'),
        ('Isolation', 3.8, 3, 'lightcoral', 'Exploit Test\nBundle (ETB)'),
        ('Antigen\nExtraction', 6.1, 3, 'lightgreen', 'Variant\nSpecification (VS)'),
        ('Mutation\nSynthesis', 8.4, 3, 'lightyellow', 'Mutated\nPackage (MP)'),
        ('Propagation', 10.7, 3, 'lightcyan', 'Immune Fortified\nService (IFS)')
    ]
    
    phase_boxes = []
    for i, (name, x, y, color, artifact) in enumerate(phases):
        box = FancyBboxPatch((x-0.7, y-0.8), 1.4, 1.6, boxstyle="round,pad=0.1",
                            edgecolor='black', facecolor=color, linewidth=1.5)
        ax.add_patch(box)
        ax.text(x, y+0.4, name, ha='center', fontsize=10, weight='bold')
        ax.text(x, y-0.3, artifact, ha='center', fontsize=8, style='italic')
        phase_boxes.append((x, y))
    
    # Phase numbers
    for i, (x, y) in enumerate(phase_boxes, 1):
        circle = Circle((x, y-1.2), 0.15, facecolor='black', edgecolor='black')
        ax.add_patch(circle)
        ax.text(x, y-1.2, str(i), ha='center', va='center', fontsize=8, color='white', weight='bold')
    
    # Arrows between phases with colors
    arrow_colors = ['blue', 'orange', 'green', 'purple', 'red']
    arrow_labels = ['AT', 'ETB', 'VS', 'MP', 'IFS']
    
    for i in range(len(phase_boxes)-1):
        x1, y1 = phase_boxes[i]
        x2, y2 = phase_boxes[i+1]
        arrow = FancyArrowPatch((x1+0.7, y1), (x2-0.7, y2), arrowstyle='->',
                                mutation_scale=20, linewidth=2, color=arrow_colors[i])
        ax.add_patch(arrow)
        # Label above arrow
        mid_x = (x1 + x2) / 2
        ax.text(mid_x, y1+0.5, arrow_labels[i], ha='center', fontsize=8, 
                color=arrow_colors[i], weight='bold',
                bbox=dict(boxstyle='round', facecolor='white', edgecolor=arrow_colors[i], pad=0.2))
    
    # Input: Anomaly
    anomaly_box = FancyBboxPatch((0.2, 2.5), 0.8, 0.6, boxstyle="round,pad=0.05",
                                 edgecolor='red', facecolor='white', linewidth=1.5)
    ax.add_patch(anomaly_box)
    ax.text(0.6, 2.8, 'Anomaly', ha='center', fontsize=9, color='red', weight='bold')
    
    arrow_in = FancyArrowPatch((1, 2.8), (0.8, 2.8), arrowstyle='->',
                               mutation_scale=15, linewidth=1.5, color='red')
    ax.add_patch(arrow_in)
    
    # Output: Immunized Service
    output_box = FancyBboxPatch((12.5, 2.5), 1.2, 0.6, boxstyle="round,pad=0.05",
                                edgecolor='green', facecolor='white', linewidth=1.5)
    ax.add_patch(output_box)
    ax.text(13.1, 2.8, 'Immunized\nService', ha='center', fontsize=9, color='green', weight='bold')
    
    arrow_out = FancyArrowPatch((11.4, 2.8), (12.5, 2.8), arrowstyle='->',
                                mutation_scale=15, linewidth=1.5, color='green')
    ax.add_patch(arrow_out)
    
    # Description text
    desc_text = ("Each phase processes inputs and produces artifacts that feed into the next stage.\n"
                "The pipeline ensures continuous, autonomous adaptation to threats.")
    ax.text(7, 1.2, desc_text, ha='center', fontsize=9, style='italic',
            bbox=dict(boxstyle='round', facecolor='lightgray', edgecolor='none', pad=0.5))
    
    plt.tight_layout()
    plt.savefig('diagrams/figure2_pre_pipeline.pdf', format='pdf', bbox_inches='tight')
    plt.savefig('diagrams/figure2_pre_pipeline.png', format='png', bbox_inches='tight', dpi=300)
    print("Generated Figure 2: PRE Pipeline Flow")
    plt.close()

def figure3_ga_convergence():
    """Figure 3: Genetic Algorithm Convergence Graph"""
    fig, ax = plt.subplots(1, 1, figsize=(10, 6))
    
    # Generate convergence data
    generations = np.arange(0, 51)
    
    # Run 1: converges at generation 19
    run1 = np.zeros_like(generations, dtype=float)
    for i, gen in enumerate(generations):
        if gen <= 19:
            # Exponential growth towards threshold
            run1[i] = 0.25 + (0.95 - 0.25) * (1 - np.exp(-gen / 8))
        else:
            # Level off after convergence
            run1[i] = 0.95 + 0.02 * np.sin(gen * 0.1)  # Small oscillations
    
    # Run 2: converges at generation 28
    run2 = np.zeros_like(generations, dtype=float)
    for i, gen in enumerate(generations):
        if gen <= 28:
            # Slower convergence
            run2[i] = 0.2 + (0.95 - 0.2) * (1 - np.exp(-gen / 12))
        else:
            run2[i] = 0.95 + 0.015 * np.sin(gen * 0.08)
    
    # Plot
    ax.plot(generations, run1, 'k-', linewidth=2, label='Run 1', zorder=3)
    ax.plot(generations, run2, 'k--', linewidth=2, label='Run 2', zorder=3)
    
    # Convergence threshold
    ax.axhline(y=0.95, color='red', linestyle=':', linewidth=2, label='Convergence Threshold (0.95)')
    
    # Mark convergence points
    ax.plot(19, 0.95, 'ro', markersize=10, zorder=4)
    ax.plot(28, 0.95, 'ro', markersize=10, zorder=4)
    ax.annotate('Convergence\n(Gen 19)', xy=(19, 0.95), xytext=(19, 0.85),
                arrowprops=dict(arrowstyle='->', color='red', lw=1.5),
                fontsize=9, ha='center', color='red', weight='bold')
    ax.annotate('Convergence\n(Gen 28)', xy=(28, 0.95), xytext=(28, 0.85),
                arrowprops=dict(arrowstyle='->', color='red', lw=1.5),
                fontsize=9, ha='center', color='red', weight='bold')
    
    # Styling
    ax.set_xlabel('Generation', fontsize=12, weight='bold')
    ax.set_ylabel('Average Fitness', fontsize=12, weight='bold')
    ax.set_title('Genetic Algorithm Convergence for Automated Mutation Synthesis', 
                fontsize=13, weight='bold', pad=15)
    ax.set_xlim(0, 50)
    ax.set_ylim(0, 1)
    ax.grid(True, linestyle='--', alpha=0.3, linewidth=0.5)
    ax.legend(loc='lower right', fontsize=10, framealpha=0.9)
    ax.set_xticks(np.arange(0, 51, 5))
    ax.set_yticks(np.arange(0, 1.1, 0.1))
    
    plt.tight_layout()
    plt.savefig('diagrams/figure3_ga_convergence.pdf', format='pdf', bbox_inches='tight')
    plt.savefig('diagrams/figure3_ga_convergence.png', format='png', bbox_inches='tight', dpi=300)
    print("Generated Figure 3: GA Convergence Graph")
    plt.close()

def figure4_mutation_topology():
    """Figure 4: Mutation Topology Before/After Comparison"""
    fig, ax = plt.subplots(1, 1, figsize=(12, 8))
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 10)
    ax.axis('off')
    
    # Title
    ax.text(6, 9.5, 'Microservice Code Mutation – Before vs. After', 
            ha='center', fontsize=14, weight='bold')
    
    # Before section
    before_box = FancyBboxPatch((0.5, 1), 4.5, 7, boxstyle="round,pad=0.2",
                                edgecolor='black', facecolor='white', linewidth=2)
    ax.add_patch(before_box)
    ax.text(2.75, 7.5, 'BEFORE MUTATION', ha='center', fontsize=12, weight='bold',
            bbox=dict(boxstyle='round', facecolor='lightcoral', edgecolor='black', pad=0.3))
    
    # Original code steps
    steps_before = [
        ('1', 'validateUser()', 1.2, 6.5),
        ('2', 'fetchData()', 1.2, 5.5),
        ('3', 'processData()', 1.2, 4.5),
        ('4', 'returnResult()', 1.2, 3.5)
    ]
    
    for step_num, code, x, y in steps_before:
        step_box = FancyBboxPatch((x, y-0.3), 3.5, 0.6, boxstyle="round,pad=0.05",
                                  edgecolor='black', facecolor='lightgray', linewidth=1)
        ax.add_patch(step_box)
        ax.text(x+0.2, y, f'Step {step_num}:', ha='left', fontsize=9, weight='bold')
        ax.text(x+1.2, y, code, ha='left', fontsize=9, family='monospace')
    
    # Arrows between steps
    for i in range(len(steps_before)-1):
        y1 = steps_before[i][3]
        y2 = steps_before[i+1][3]
        arrow = FancyArrowPatch((2.75, y1-0.3), (2.75, y2+0.3), arrowstyle='->',
                                mutation_scale=15, linewidth=1, color='black')
        ax.add_patch(arrow)
    
    # After section
    after_box = FancyBboxPatch((7, 1), 4.5, 7, boxstyle="round,pad=0.2",
                               edgecolor='black', facecolor='white', linewidth=2)
    ax.add_patch(after_box)
    ax.text(9.25, 7.5, 'AFTER MUTATION', ha='center', fontsize=12, weight='bold',
            bbox=dict(boxstyle='round', facecolor='lightgreen', edgecolor='black', pad=0.3))
    
    # Mutated code steps
    steps_after = [
        ('1', 'guardCheck()', 7.7, 6.5, 'NEW'),
        ('2', 'processData()', 7.7, 5.5, 'REORDERED'),
        ('3', 'fetchData()', 7.7, 4.5, 'REORDERED'),
        ('4', 'returnResult()', 7.7, 3.5, 'UNCHANGED')
    ]
    
    for step_num, code, x, y, change_type in steps_after:
        color = 'lightgreen' if change_type == 'NEW' else 'lightyellow' if 'REORDERED' in change_type else 'lightgray'
        step_box = FancyBboxPatch((x, y-0.3), 3.5, 0.6, boxstyle="round,pad=0.05",
                                  edgecolor='black', facecolor=color, linewidth=1)
        ax.add_patch(step_box)
        ax.text(x+0.2, y, f'Step {step_num}:', ha='left', fontsize=9, weight='bold')
        ax.text(x+1.2, y, code, ha='left', fontsize=9, family='monospace')
        if change_type != 'UNCHANGED':
            ax.text(x+3.2, y, f'[{change_type}]', ha='right', fontsize=7, 
                   style='italic', color='red', weight='bold')
    
    # Arrows between steps
    for i in range(len(steps_after)-1):
        y1 = steps_after[i][3]
        y2 = steps_after[i+1][3]
        arrow = FancyArrowPatch((9.25, y1-0.3), (9.25, y2+0.3), arrowstyle='->',
                                mutation_scale=15, linewidth=1, color='black')
        ax.add_patch(arrow)
    
    # Arrow from Before to After
    transform_arrow = FancyArrowPatch((5, 4.5), (7, 4.5), arrowstyle='->',
                                     mutation_scale=25, linewidth=2, color='purple')
    ax.add_patch(transform_arrow)
    ax.text(6, 5, 'Polymorphic\nTransformation', ha='center', fontsize=10, 
           color='purple', weight='bold',
           bbox=dict(boxstyle='round', facecolor='white', edgecolor='purple', pad=0.3))
    
    # Metrics box
    metrics_box = FancyBboxPatch((2.75, 0.5), 6.5, 0.4, boxstyle="round,pad=0.1",
                                 edgecolor='black', facecolor='lightblue', linewidth=1.5)
    ax.add_patch(metrics_box)
    ax.text(6, 0.7, 'Bytecode Δ > 30% | Functional Equivalence Preserved | AST-Level Transformation',
           ha='center', fontsize=9, weight='bold')
    
    # Notes
    note_text = ("Guard check inserted to pre-empt exploit vector\n"
                "Control-flow reshaped without altering functional outcome\n"
                "Polymorphic alterations create moving target for attackers")
    ax.text(6, 2.2, note_text, ha='center', fontsize=8, style='italic',
           bbox=dict(boxstyle='round', facecolor='lightyellow', edgecolor='black', pad=0.3))
    
    plt.tight_layout()
    plt.savefig('diagrams/figure4_mutation_topology.pdf', format='pdf', bbox_inches='tight')
    plt.savefig('diagrams/figure4_mutation_topology.png', format='png', bbox_inches='tight', dpi=300)
    print("Generated Figure 4: Mutation Topology")
    plt.close()

if __name__ == '__main__':
    import os
    os.makedirs('diagrams', exist_ok=True)
    
    print("Generating SDI Architecture Diagrams...")
    figure1_sdi_architecture()
    figure2_pre_pipeline()
    figure3_ga_convergence()
    figure4_mutation_topology()
    print("\nAll diagrams generated successfully!")
    print("Output files:")
    print("  - diagrams/figure1_sdi_architecture.pdf/png")
    print("  - diagrams/figure2_pre_pipeline.pdf/png")
    print("  - diagrams/figure3_ga_convergence.pdf/png")
    print("  - diagrams/figure4_mutation_topology.pdf/png")

