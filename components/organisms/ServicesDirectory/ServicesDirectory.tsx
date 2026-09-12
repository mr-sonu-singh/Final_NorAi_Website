'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { MagneticButton } from '@/components/atoms/MagneticButton';
import {
  ArrowRight,
  CheckCircle2,
  Server,
  Cpu,
  Layers,
  Shield,
  Code2,
  Workflow,
  Zap,
  Lock,
  Boxes,
} from 'lucide-react';

interface TopologyNode {
  title: string;
  subtitle: string;
  category: string;
  icon: React.ElementType;
}

interface Practice {
  id: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  sla: string;
  security: string;
  topology: {
    flowLabel: string;
    nodes: TopologyNode[];
  };
  codeContract: string;
  deliverables: string[];
  cta: string;
  href: string;
}

const PRACTICES: Practice[] = [
  {
    id: 'document-ingestion',
    title: 'Multi-Format Ingestion & Stream Extraction',
    category: 'Enterprise Ingestion',
    tagline:
      'Zero-egress stream parsing, layout-aware PDF tokenization, and sub-second extraction pipelines for complex document formats.',
    problem:
      'Legacy OCR systems fail on multi-column layouts, tables, and mixed documents, stalling high-volume workflows.',
    solution:
      'We engineer layout-aware neural tokenizers and stream extraction workers that process documents in transient RAM with sub-second response times.',
    sla: 'P95 Latency < 350ms · Zero Data Retention',
    security: 'RAM Flushed Post-Parse · Air-Gapped Docker Ready',
    topology: {
      flowLabel: 'Ingestion Pipeline: Stream Receiver ➔ Layout-Aware OCR ➔ Zod Validation ➔ Webhook Relay',
      nodes: [
        { title: 'Stream Receiver', subtitle: 'PDF / DOCX / Audio / Gazette', category: 'Ingress Queue', icon: Layers },
        { title: 'Spatial Tokenizer', subtitle: 'Column & Bounding Box Aware', category: 'Layout Engine', icon: Cpu },
        { title: 'Zod Validation Gate', subtitle: 'Deterministic Typed Contract', category: 'Security Gate', icon: Shield },
        { title: 'Downstream Dispatch', subtitle: 'Sub-Second Webhook Callback', category: 'Egress API', icon: CheckCircle2 },
      ],
    },
    codeContract: `// NorAI Stream Ingestion & Layout-Aware Extraction Contract
import { z } from 'zod';

export const IngestionStreamSchema = z.object({
  payloadId: z.string().uuid(),
  documentType: z.enum(['application/pdf', 'application/docx', 'text/plain', 'audio/wav']),
  byteSize: z.number().max(50_000_000), // 50MB transient limit
  preserveSpatialColumns: z.boolean().default(true),
  outputContract: z.literal('ZOD_TYPED_EXTRACT'),
});

export type IngestionResult = {
  status: 'PROCESSED_EPHEMERAL';
  latencyMs: number;
  extractedFields: Record<string, string | number>;
  ramFlushed: true;
};`,
    deliverables: [
      'Multi-format ingestion pipeline (PDF, DOCX, Gazette, Audio)',
      'Spatial layout preservation preventing column and table text merges',
      'Typed Zod validation before any database persistence',
      'Air-gapped container packaging with zero internet dependency',
    ],
    cta: 'Talk to us',
    href: '/contact?service=document-ingestion',
  },
  {
    id: 'rag-orchestration',
    title: 'Deterministic RAG & Agent Orchestration',
    category: 'Knowledge Retrieval & MCP',
    tagline:
      'Enterprise hybrid vector search, Model Context Protocol (MCP) servers, and grounded citation verification for zero hallucination.',
    problem:
      'Off-the-shelf chatbots hallucinate on complex internal policies and require brittle ad-hoc connectors.',
    solution:
      'We build hybrid dense + BM25 keyword search engines paired with standardized Model Context Protocol (MCP) tool servers.',
    sla: 'P95 Latency < 180ms · 99.95% Citation Grounding',
    security: 'Sandboxed Stdio / SSE · Granular RBAC',
    topology: {
      flowLabel: 'Pipeline Flow: Query Ingress ➔ Semantic Vectorizer ➔ Hybrid Ranker ➔ MCP Tool Bus',
      nodes: [
        { title: 'Multi-Document Ingest', subtitle: 'Internal Wiki / SQL / PDFs', category: 'Ingress', icon: Layers },
        { title: 'Hybrid Dense Vectorizer', subtitle: 'pgvector + BM25 Keyword Search', category: 'Embedding Engine', icon: Cpu },
        { title: 'Citation Grounding Gate', subtitle: 'Source Confidence Filter (≥0.92)', category: 'Verification Gate', icon: Shield },
        { title: 'MCP Tool Bus', subtitle: 'Claude / Cursor / IDE Dispatch', category: 'Client Execution', icon: Boxes },
      ],
    },
    codeContract: `// NorAI Hybrid RAG & MCP Protocol Contract
import { z } from 'zod';

export const MCPToolDefinition = {
  name: 'query_internal_knowledge_base',
  description: 'Search verified internal engineering documentation with grounded citations',
  parameters: z.object({
    query: z.string().min(3),
    collection: z.enum(['architecture-specs', 'compliance-audits', 'api-contracts']),
    minConfidence: z.number().min(0.85).default(0.92),
  }),
  securityPolicy: {
    tenantIsolation: true,
    allowNetworkEgress: false,
    auditLogged: true,
  },
};`,
    deliverables: [
      'Hybrid vector DB infrastructure (pgvector / Qdrant) with Reciprocal Rank Fusion',
      'Standardized Model Context Protocol (MCP) tool servers for engineering teams',
      'Deterministic citation verification guaranteeing zero false answers',
      'Private on-prem or isolated cloud deployment',
    ],
    cta: 'Talk to us',
    href: '/contact?service=rag-orchestration',
  },
  {
    id: 'private-vpc',
    title: 'Private VPC & Air-Gapped Inference',
    category: 'Sovereign Infrastructure',
    tagline:
      'Dedicated vLLM and TensorRT-LLM container deployments operating inside your private VPC or on-premise hardware with zero data egress.',
    problem:
      'Enterprise IP, defense data, and customer privacy forbid sending proprietary payloads to public cloud API providers.',
    solution:
      'We deploy hardened, quantized open-weight inference engines within your private VPC boundary with zero outbound internet access.',
    sla: 'Sub-100ms Inference · 99.99% Hardware Uptime',
    security: 'Air-Gapped Docker/Helm · Zero Third-Party Egress',
    topology: {
      flowLabel: 'Sovereign Topology: Private Gateway ➔ vLLM Enclave ➔ Ephemeral DRAM ➔ Internal Microservice',
      nodes: [
        { title: 'Private VPC Ingress', subtitle: 'AWS / GCP / Azure PrivateLink', category: 'Network Enclave', icon: Lock },
        { title: 'Quantized vLLM Core', subtitle: 'FP8 / AWQ Tensor Parallel Engine', category: 'Compute Cluster', icon: Server },
        { title: 'Ephemeral DRAM Isolation', subtitle: 'Transient Memory Flush (0B Disk)', category: 'Memory Security', icon: Shield },
        { title: 'Internal Gateway API', subtitle: 'Sub-100ms Microservice Response', category: 'Private Egress', icon: CheckCircle2 },
      ],
    },
    codeContract: `// NorAI Sovereign VPC Enclave Specification
export interface SovereignClusterSpec {
  vpcId: string; // e.g., vpc-0a4b9c1d2e3f
  isolatedSubnet: 'private-isolated-airgapped';
  computeEngine: 'vllm-tensorrt-fp8';
  multiGpuTensorParallel: 2 | 4 | 8;
  outboundEgressRules: []; // Strictly zero external IP egress
  diskWriteAllowed: false; // Ephemeral RAM runtime only
  slaP95Ms: 95;
}`,
    deliverables: [
      'Dedicated vLLM / TensorRT-LLM cluster deployment in your private cloud',
      'Automated multi-GPU tensor parallel scaling for peak workloads',
      'Zero-egress network security policy validation with signed DPA',
      'Direct infrastructure health telemetry and 99.99% uptime guarantee',
    ],
    cta: 'Talk to us',
    href: '/contact?service=private-vpc',
  },
  {
    id: 'spatial-ai',
    title: 'Spatial & Immersive Systems',
    category: 'R&D Pilot · Spatial AI',
    tagline:
      'WebGPU compute shaders, Three.js/WGSL, tactile spatial interaction models, and multi-modal sensory telemetry for spatial document exploration.',
    problem:
      'Traditional 2D dashboard tables struggle to represent high-dimensional vector embeddings, knowledge graphs, and complex telemetry.',
    solution:
      'We prototype spatial canvas interactions using WebGPU compute shaders, translating high-dimensional semantic spaces into tactile, gesture-navigated 3D workspaces.',
    sla: '60fps WebGPU Compute · Sub-16ms Frame Budget · R&D Pilot',
    security: 'Client-Side WebGPU Shaders · Zero Remote Telemetry',
    topology: {
      flowLabel: 'Spatial Topology: Vector Graph ➔ WebGPU WGSL Compute ➔ Tactile Gesture Engine ➔ 60fps Viewport',
      nodes: [
        { title: 'Semantic Graph Ingress', subtitle: 'High-Dimensional Vector Embeddings', category: 'Data Feed', icon: Workflow },
        { title: 'WebGPU WGSL Shaders', subtitle: 'Hardware-Accelerated Compute Pass', category: 'Compute Pass', icon: Cpu },
        { title: 'Tactile Gesture Engine', subtitle: 'Raycast & Hand Telemetry Dispatch', category: 'Interaction', icon: Zap },
        { title: 'Air-Gapped Canvas View', subtitle: 'Sub-16ms 60fps Native Viewport', category: 'Rendering', icon: CheckCircle2 },
      ],
    },
    codeContract: `// NorAI Spatial AI Shader & Interaction Pipeline Contract
import { z } from 'zod';

export const SpatialCanvasPipelineSpec = z.object({
  pipelineId: z.literal('@norai/spatial-mesh/v1'),
  renderTarget: z.literal('WebGPU'),
  wgslShaderComputeEnabled: z.boolean().default(true),
  targetFramerate: z.literal(60),
  spatialTrackingMode: z.enum(['raycast_pointer', 'hand_telemetry', 'spatial_mouse']),
  maxVectorNodesRendered: z.number().max(50_000).default(10_000),
  originPedigree: z.literal('Japan VR/AR Summit Research'),
});`,
    deliverables: [
      'WebGPU and WGSL compute shader rendering pipeline for complex datasets',
      'High-dimensional vector projection onto 3D interactive canvases',
      'Tactile gesture tracking and raycast event dispatch',
      'Grounded in founder research from Japan VR/AR Summit',
    ],
    cta: 'Talk to us',
    href: '/contact?service=spatial-ai',
  },
];

export function ServicesDirectory() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'topology' | 'schema'>('topology');

  const practice = (PRACTICES[selectedIdx] || PRACTICES[0]) as Practice;

  return (
    <div className="w-full text-left font-sans space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Navigation Rail: Machined Double-Bezel Shell */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-2 rounded-3xl bg-surface-panel/40 border border-border-strong shadow-sm space-y-1.5">
            <div className="px-3 py-2 border-b border-border-subtle flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-text-muted">
                Enterprise Practices
              </span>
              <span className="text-[10px] font-mono text-accent-primary font-bold px-1.5 py-0.5 rounded bg-accent-50 border border-accent-primary/20">
                0{selectedIdx + 1} / 0{PRACTICES.length}
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              {PRACTICES.map((p, idx) => {
                const isSelected = selectedIdx === idx;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    className={cn(
                      'w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-start justify-between gap-3 group relative cursor-pointer',
                      isSelected
                        ? 'bg-surface-panel border border-accent-primary/30 shadow-md ring-1 ring-accent-primary/20 translate-y-[-1px]'
                        : 'hover:bg-surface-panel/70 border border-transparent hover:border-border-subtle'
                    )}
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            'text-[10px] font-mono font-semibold uppercase tracking-wider block truncate',
                            isSelected ? 'text-accent-primary' : 'text-text-muted'
                          )}
                        >
                          {p.category}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse shrink-0" />
                        )}
                      </div>
                      <h3
                        className={cn(
                          'font-display text-lg sm:text-xl font-normal transition-colors leading-snug truncate',
                          isSelected ? 'text-text-primary font-medium' : 'text-text-secondary group-hover:text-text-primary'
                        )}
                      >
                        {p.title}
                      </h3>
                    </div>

                    <div
                      className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 transition-all',
                        isSelected
                          ? 'bg-accent-50 text-accent-primary'
                          : 'bg-surface-panel-subtle/50 text-text-muted opacity-0 group-hover:opacity-100 group-hover:bg-surface-panel-subtle'
                      )}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Active Stage: Dynamic Double-Bezel Architectural Blueprint */}
        <div className="lg:col-span-8 p-2 rounded-3xl bg-surface-panel/40 border border-border-strong shadow-md">
          <div className="rounded-[calc(1.5rem-0.25rem)] bg-surface-panel border border-border-subtle p-6 sm:p-8 md:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={practice.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                {/* Header with Category & Telemetry Badges */}
                <div className="space-y-4 pb-6 border-b border-border-subtle">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-accent-50 text-accent-primary border border-accent-primary/25">
                      {practice.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-medium text-accent-secondary bg-sage-100/70 border border-accent-secondary/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                        <Lock className="w-3 h-3" />
                        <span>{practice.security}</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-text-primary font-normal leading-tight tracking-tight">
                      {practice.title}
                    </h2>
                    <p className="fluid-body text-text-secondary leading-relaxed max-w-2xl text-pretty">
                      {practice.tagline}
                    </p>
                  </div>

                  {/* Problem / Solution Snapshot Inset */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-surface-panel-subtle/40 border border-border-subtle space-y-1">
                      <span className="font-mono font-semibold text-accent-primary uppercase tracking-wider text-[10px]">
                        The Operational Bottleneck
                      </span>
                      <p className="text-text-secondary leading-relaxed">{practice.problem}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-surface-panel-subtle/40 border border-border-subtle space-y-1">
                      <span className="font-mono font-semibold text-accent-secondary uppercase tracking-wider text-[10px]">
                        The Deterministic Solution
                      </span>
                      <p className="text-text-secondary leading-relaxed">{practice.solution}</p>
                    </div>
                  </div>
                </div>

                {/* View Mode Switcher Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono font-semibold text-text-primary uppercase tracking-wider block">
                      Architectural Blueprint
                    </span>
                    <span className="text-[11px] font-mono text-text-muted">
                      {practice.topology.flowLabel}
                    </span>
                  </div>

                  {/* Segmented Mode Toggle */}
                  <div className="p-1 rounded-xl bg-surface-canvas border border-border-subtle flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setViewMode('topology')}
                      className={cn(
                        'px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer',
                        viewMode === 'topology'
                          ? 'bg-surface-panel text-text-primary shadow-sm border border-border-subtle'
                          : 'text-text-muted hover:text-text-primary'
                      )}
                    >
                      System Topology
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('schema')}
                      className={cn(
                        'px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1',
                        viewMode === 'schema'
                          ? 'bg-surface-panel text-text-primary shadow-sm border border-border-subtle'
                          : 'text-text-muted hover:text-text-primary'
                      )}
                    >
                      <Code2 className="w-3 h-3 text-accent-primary" />
                      <span>TypeScript Contract</span>
                    </button>
                  </div>
                </div>

                {/* Dynamic Content: Topology Graph vs. Code Schema */}
                <div className="rounded-2xl bg-surface-canvas border border-border-subtle p-5 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {viewMode === 'topology' ? (
                      <motion.div
                        key="topology"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                      >
                        {practice.topology.nodes.map((node, nIdx) => {
                          const NodeIcon = node.icon;
                          return (
                            <div
                              key={nIdx}
                              className="p-4 rounded-xl bg-surface-panel border border-border-subtle flex items-start gap-3 relative overflow-hidden group hover:border-accent-primary/30 transition-colors"
                            >
                              <div className="w-9 h-9 rounded-lg bg-surface-panel-subtle border border-border-subtle flex items-center justify-center text-accent-primary shrink-0 group-hover:scale-105 transition-transform">
                                <NodeIcon className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5 min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[10px] font-mono text-accent-primary font-semibold uppercase tracking-wider">
                                    {node.category}
                                  </span>
                                  <span className="font-mono text-[10px] text-text-muted">
                                    0{nIdx + 1}
                                  </span>
                                </div>
                                <h4 className="text-xs font-semibold text-text-primary leading-snug">
                                  {node.title}
                                </h4>
                                <p className="text-[11px] text-text-secondary font-mono leading-tight truncate">
                                  {node.subtitle}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="schema"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-text-muted pb-2 border-b border-border-subtle">
                          <span>contract.ts · Typed Zod Guardrail</span>
                          <span className="text-accent-secondary font-semibold">Strict Schema Sync</span>
                        </div>
                        <pre className="text-xs font-mono text-text-primary overflow-x-auto p-3 rounded-lg bg-surface-panel border border-border-subtle leading-relaxed">
                          <code>{practice.codeContract}</code>
                        </pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Scope & Verified Deliverables Checklist */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-text-primary uppercase tracking-wider block">
                      Scope &amp; Production Deliverables
                    </span>
                    <span className="text-xs font-mono text-accent-primary font-semibold">
                      {practice.sla}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {practice.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-3 rounded-xl bg-surface-canvas border border-border-subtle flex items-start gap-2.5 text-xs text-text-primary"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent-secondary shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Strip with Tactile Button-in-Button CTA */}
                <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="space-y-0.5 text-xs">
                    <span className="text-text-muted block font-mono text-[11px]">Sprint Timeline</span>
                    <span className="font-semibold text-text-primary">3–5 Days to Production PoC</span>
                  </div>

                  <Link href={practice.href} className="w-full sm:w-auto">
                    <MagneticButton strength={12} className="w-full sm:w-auto">
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full sm:w-auto justify-between group shadow-accent hover:shadow-hover active:scale-[0.98] transition-all cursor-pointer btn-tactile pl-5 pr-2 py-2"
                      >
                        <span className="font-semibold text-xs tracking-wide">{practice.cta}</span>
                        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 ml-3">
                          <ArrowRight className="w-3.5 h-3.5 text-white" />
                        </span>
                      </Button>
                    </MagneticButton>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

