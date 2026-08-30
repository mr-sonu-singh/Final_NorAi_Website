'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import {
  Server,
  Cpu,
  Layers,
  Shield,
  ArrowRight,
  CheckCircle2,
  Lock,
  Workflow,
} from 'lucide-react';

interface EnterpriseTier {
  id: 'tier1' | 'tier2' | 'tier3';
  tierLabel: string;
  name: string;
  tagline: string;
  description: string;
  sla: string;
  security: string;
  deliverables: string[];
  topology: {
    nodes: { title: string; subtitle: string; icon: React.ElementType }[];
    flowLabel: string;
  };
}

const TIERS: EnterpriseTier[] = [
  {
    id: 'tier1',
    tierLabel: 'TIER 01',
    name: 'High-Throughput Ingestion & Vector Indexing',
    tagline: 'Private RAG pipelines engineered for 10M+ unstructured records.',
    description:
      'We design and deploy custom high-throughput ingestion pipelines that parse complex PDF hierarchies, audio streams, and tabular records into structured vector indices with ephemeral RAM guarantees.',
    sla: '< 200ms Query Latency · 99.9% Uptime',
    security: 'VPC / Air-Gapped Dedicated Tenant',
    deliverables: [
      'Document OCR & Layout-Aware Table Parser',
      'Hybrid Dense + Sparse Vector Search (Milvus / Qdrant)',
      'Deterministic Zod Schema Validation Guardrails',
      'Ephemeral In-Memory Processing Container',
    ],
    topology: {
      flowLabel: 'Pipeline Flow: Ingestion ➔ Vectorization ➔ Structured Output',
      nodes: [
        { title: 'Multi-Format Ingestion', subtitle: 'PDF / Audio / Gazettes', icon: Layers },
        { title: 'Layout-Aware Parser', subtitle: 'Table & Formula Extract', icon: Cpu },
        { title: 'Vector Indexer', subtitle: 'Sub-200ms Hybrid Search', icon: Server },
        { title: 'Typed API Output', subtitle: 'Strict Schema Guardrails', icon: CheckCircle2 },
      ],
    },
  },
  {
    id: 'tier2',
    tierLabel: 'TIER 02',
    name: 'Model Context Protocol (MCP) & Agent Orchestration',
    tagline: 'Production-grade tool servers and deterministic multi-agent routing.',
    description:
      'Connect LLMs directly to your internal SQL databases, ERP systems, and proprietary APIs via hardened Model Context Protocol (MCP) servers with human-in-the-loop validation checkpoints.',
    sla: 'Sub-second Tool Dispatch · Zero Leaks',
    security: 'Role-Based Access Control (RBAC) & Audit Logs',
    deliverables: [
      'Custom MCP Tool Servers (TypeScript / Python)',
      'Deterministic Multi-Agent Orchestration Graphs',
      'Human-in-the-Loop Approval Interceptors',
      'Direct Cursor, Claude & Custom IDE Integration',
    ],
    topology: {
      flowLabel: 'MCP Topology: Intent Router ➔ MCP Tool Bus ➔ Verification Checkpoint',
      nodes: [
        { title: 'Intent Classifier', subtitle: 'Task Deconstruction', icon: Workflow },
        { title: 'NorAI MCP Tool Bus', subtitle: 'Secure ERP / SQL Hooks', icon: Server },
        { title: 'Validation Interceptor', subtitle: 'Human Approval Gate', icon: Shield },
        { title: 'Deterministic Execution', subtitle: 'Atomic State Commit', icon: CheckCircle2 },
      ],
    },
  },
  {
    id: 'tier3',
    tierLabel: 'TIER 03',
    name: 'Domain Fine-Tuning & Private On-Prem vLLM',
    tagline: 'Sovereign hardware inference with proprietary LoRA adapters.',
    description:
      'Eliminate third-party API dependencies. We train domain-specific LoRA adapters on your proprietary datasets and deploy high-throughput quantized inference engines on your on-premise GPUs or private cloud.',
    sla: 'P95 < 120ms Cold Start · 100% On-Prem',
    security: 'Zero External Network Egress (Sovereign)',
    deliverables: [
      'Domain-Specific LoRA Adapter Training & Evaluation',
      'vLLM & TensorRT-LLM Quantization (FP8 / AWQ)',
      'Air-Gapped On-Premise GPU Cluster Setup',
      'Custom Continuous Fine-Tuning CI/CD Harness',
    ],
    topology: {
      flowLabel: 'Inference Topology: Quantized Model ➔ Local vLLM Engine ➔ Zero-Egress VPC',
      nodes: [
        { title: 'Proprietary Dataset', subtitle: 'Sanitized Domain Corpus', icon: Layers },
        { title: 'LoRA Adapter Engine', subtitle: 'Targeted Task Tuning', icon: Cpu },
        { title: 'Quantized vLLM Server', subtitle: 'FP8 Ultra-Low Latency', icon: Server },
        { title: 'Air-Gapped Private VPC', subtitle: 'Zero External Egress', icon: Lock },
      ],
    },
  },
];

export function EnterpriseBlueprintMatrix() {
  const [selectedTier, setSelectedTier] = useState<EnterpriseTier>(TIERS[0] as EnterpriseTier);

  return (
    <div className="w-full text-left font-sans space-y-12">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
            <Server className="w-3.5 h-3.5" />
            <span>Bespoke Enterprise Systems</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink-primary leading-tight tracking-tight">
            Tailored architectures for <br />
            <span className="italic text-accent-500 font-normal">mission-critical scale.</span>
          </h2>
          <p className="text-base md:text-lg text-ink-body leading-relaxed">
            When off-the-shelf APIs can&apos;t satisfy strict data sovereignty, deterministic schema contracts, or sub-second latency SLAs, our core engineering team builds dedicated infrastructure.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link href="/services">
            <Button variant="secondary" size="md" className="w-full sm:w-auto">
              View All Services
            </Button>
          </Link>
          <Link href="/contact?service=enterprise-architecture">
            <Button variant="primary" size="md" className="w-full sm:w-auto group">
              <span>Book Architecture Audit</span>
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Interactive Tier Switcher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TIERS.map((tier) => {
          const isSelected = selectedTier.id === tier.id;
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => setSelectedTier(tier)}
              className={cn(
                'p-6 rounded-2xl border text-left transition-all duration-200 space-y-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500',
                isSelected
                  ? 'bg-canvas-paper border-accent-500 shadow-md ring-1 ring-accent-500/20 translate-y-[-2px]'
                  : 'bg-canvas-paper/50 border-[rgba(13,37,61,0.08)] hover:bg-canvas-paper hover:border-accent-500/30'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-accent-500">
                  {tier.tierLabel}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-accent-500" />
                )}
              </div>
              <h3 className="font-display text-2xl text-ink-primary font-normal leading-tight">
                {tier.name}
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2">
                {tier.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Tier Deep-Dive Ledger */}
      <div className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 md:p-12 shadow-lg space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Description & Deliverables (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-accent-500 px-2.5 py-0.5 rounded bg-accent-50 border border-accent-500/20">
                  {selectedTier.tierLabel}
                </span>
                <span className="font-mono text-xs text-accent-secondary flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  {selectedTier.security}
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
                {selectedTier.name}
              </h3>
              <p className="text-base text-ink-body leading-relaxed">
                {selectedTier.description}
              </p>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono font-semibold text-ink-primary uppercase tracking-wider block">
                Engineered Deliverables:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedTier.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-canvas-recessed/40 border border-[rgba(13,37,61,0.06)] flex items-start gap-2.5 text-xs text-ink-primary"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent-secondary shrink-0 mt-0.5" />
                    <span className="font-medium leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right SLA & Architecture Card (Span 5) */}
          <div className="lg:col-span-5 rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.08)] p-6 space-y-5">
            <div className="space-y-1 pb-4 border-b border-[rgba(13,37,61,0.08)]">
              <span className="text-[11px] font-mono text-ink-secondary block">Performance SLA</span>
              <span className="font-display text-xl text-ink-primary font-normal block">
                {selectedTier.sla}
              </span>
            </div>

            {/* Architecture Topology Step Map */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-semibold text-ink-primary uppercase tracking-wider block">
                System Topology
              </span>
              <div className="space-y-2">
                {selectedTier.topology.nodes.map((node, i) => {
                  const NodeIcon = node.icon;
                  return (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.06)] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded bg-canvas-recessed flex items-center justify-center text-accent-500">
                          <NodeIcon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-ink-primary">{node.title}</p>
                          <p className="text-[11px] font-mono text-ink-secondary">{node.subtitle}</p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-accent-secondary font-semibold">
                        0{i + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <Link href={`/contact?service=${selectedTier.id}`}>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-center group text-xs font-semibold"
                >
                  <span>Request Tier {selectedTier.tierLabel.replace('TIER ', '')} Specification</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterpriseBlueprintMatrix;
