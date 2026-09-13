'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '@/components/foundation/Container';
import { cn } from '@/lib/utils';

interface Practice {
  id: string;
  title: string;
  category: string;
  tagline: string;
  solution: string;
  sla: string;
  terminal: {
    command: string;
    lines: string[];
  };
  href: string;
}

const PRACTICES: Practice[] = [
  {
    id: 'document-ingestion',
    title: 'Multi-Format Ingestion & Stream Extraction',
    category: 'Enterprise Ingestion',
    tagline: 'Documents tokenized in transient RAM. Zero permanent storage.',
    solution:
      'We engineer layout-aware neural tokenizers and stream extraction workers that process complex multi-column PDFs, tables, and mixed documents with sub-second response times.',
    sla: 'P95 Latency < 350ms · Zero Data Retention',
    terminal: {
      command: 'norai verify --stack ingestion --airgap',
      lines: [
        'Parser: Layout-Aware Neural Tokenizer (Spatial Bounding Boxes)',
        'P95 Latency: 142ms (Transient In-Memory Buffer)',
        'Network Egress: 0.00 KB (Strict Air-Gap Enforced)',
        'Contract Validation: Strict Zod Schema Enforced',
      ],
    },
    href: '/contact?service=document-ingestion',
  },
  {
    id: 'rag-orchestration',
    title: 'Deterministic RAG & Agent Orchestration',
    category: 'Knowledge Retrieval & MCP',
    tagline: 'Deterministic retrieval with cryptographic source lineage.',
    solution:
      'Enterprise hybrid vector search combining sparse BM25 and dense embeddings, verified with strict citation ground truth and standardized Model Context Protocol (MCP) tool execution.',
    sla: '99.95% Citation Grounding · < 180ms Retrieval',
    terminal: {
      command: 'norai verify --stack rag --mcp',
      lines: [
        'Search Engine: Hybrid Sparse BM25 + Dense pgvector',
        'Latency: 64ms Vector Distance Top-K',
        'Citation Grounding: 100% Cryptographic Lineage Match',
        'Tool Protocol: Standardized MCP Server Active',
      ],
    },
    href: '/contact?service=rag-orchestration',
  },
  {
    id: 'sovereign-infra',
    title: 'Private VPC & Air-Gapped Inference',
    category: 'Sovereign Infrastructure',
    tagline: 'Bare-metal and private cloud LLM serving inside your VPC.',
    solution:
      'Dedicated vLLM and TensorRT-LLM container deployments operating entirely inside your private VPC. Open-weight models (Llama 3, DeepSeek, Qwen) with FP8 quantization and zero telemetry.',
    sla: 'Sub-100ms TTFT · Zero Cloud Egress',
    terminal: {
      command: 'norai verify --stack vpc-inference --hardware',
      lines: [
        'Serving Engine: vLLM + TensorRT PagedAttention',
        'First Token Latency: 78ms TTFT (FP8 Quantized)',
        'Data Egress: 0.00 KB (Private VPC Air-Gap)',
        'Throughput: 450 req/sec Continuous Concurrency',
      ],
    },
    href: '/contact?service=sovereign-infra',
  },
  {
    id: 'spatial-systems',
    title: 'Spatial & Immersive Systems (AR/VR)',
    category: 'R&D Pilot · AR/VR & Spatial AI',
    tagline: 'High-dimensional semantic clusters rendered at 60fps.',
    solution:
      'Custom WebGPU compute shaders and WebXR tactile gesture engines that render high-dimensional vector embeddings and multi-modal sensory telemetry natively in the browser.',
    sla: '60fps Locked · Sub-16ms Frame Budget',
    terminal: {
      command: 'norai verify --stack spatial-webgpu --framerate',
      lines: [
        'Compute Pipeline: Client-Side WebGPU WGSL Shaders',
        'Framerate: 60.0 fps (14.2ms Frame Budget)',
        'Spatial Telemetry: Raycast & Tactile Hand Event Loop',
        'Data Privacy: Client-Side Ephemeral Processing',
      ],
    },
    href: '/contact?service=spatial-systems',
  },
];

export function ServicesDirectory() {
  const [activeId, setActiveId] = useState<string>(PRACTICES[0]?.id || 'document-ingestion');
  const activePractice = PRACTICES.find((p) => p.id === activeId) || (PRACTICES[0] as Practice);

  return (
    <section id="architectural-deliverables" className="py-16 sm:py-24 border-b border-[var(--line)] bg-[#f5f5f0]">
      <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Borderless Practice Selector */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#06845A] font-bold block">
              — ARCHITECTURAL DELIVERABLES
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--pine)] tracking-tight leading-[1.1]">
              Built for production. <br />
              Deployed in days.
            </h3>
          </div>

          {/* Borderless Selector List */}
          <div className="border-t border-[var(--line)]">
            {PRACTICES.map((practice, idx) => {
              const isActive = practice.id === activeId;
              return (
                <button
                  key={practice.id}
                  type="button"
                  onClick={() => setActiveId(practice.id)}
                  className={cn(
                    'w-full text-left py-4 sm:py-5 px-3.5 rounded-2xl border-b border-[var(--line)] transition-all duration-200 group flex items-start gap-4 cursor-pointer',
                    isActive
                      ? 'bg-[var(--pine-08)] text-[var(--pine)]'
                      : 'hover:bg-[var(--pine-04)] text-[var(--pine)]/70 hover:text-[var(--pine)]'
                  )}
                >
                  <span
                    className={cn(
                      'font-mono text-xs font-bold pt-0.5 tracking-wider shrink-0 transition-colors',
                      isActive ? 'text-[#06845A]' : 'text-[var(--pine)]/40'
                    )}
                  >
                    /{String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display font-bold text-base sm:text-lg leading-snug group-hover:text-[var(--pine)]">
                        {practice.title}
                      </span>
                      {isActive && (
                        <span
                          className="w-2 h-2 rounded-full bg-[#06845A] shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-[var(--pine)]/60 uppercase tracking-wider block mt-1">
                      {practice.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-[var(--pine-04)] border border-[var(--line)] text-xs text-[var(--pine)]/80 font-sans leading-relaxed">
            <strong className="font-semibold text-[var(--pine)]">Zero Seat-License Lock-in:</strong> Every deliverable is packaged into air-gapped Docker/Helm containers with deterministic SLAs and handed over to your internal team.
          </div>
        </div>

        {/* Right Column: Deep Pine Architectural Console */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePractice.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-[#072929] text-[var(--bone)] border border-white/10 rounded-[32px] p-7 sm:p-10 lg:p-12 shadow-2xl space-y-6 relative overflow-hidden"
            >
              {/* Telemetry Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 text-xs font-mono">
                <span className="text-[var(--mint)] font-bold tracking-widest uppercase">
                  {'// ' + activePractice.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0b3333] border border-[var(--mint)]/30 text-[var(--mint)] font-semibold text-[11px]">
                  {activePractice.sla}
                </span>
              </div>

              {/* Monumental Headline */}
              <h4 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[var(--bone)] tracking-tight leading-[1.1]">
                {activePractice.tagline}
              </h4>

              {/* Conviction Description */}
              <p className="text-[var(--bone-70)] text-sm sm:text-base leading-relaxed font-sans">
                {activePractice.solution}
              </p>

              {/* Deterministic Verification Terminal */}
              <div className="rounded-2xl bg-[#041a1a] border border-white/10 p-5 font-mono text-xs space-y-2.5 overflow-x-auto shadow-inner">
                <div className="flex items-center justify-between pb-2.5 border-b border-white/10 text-[11px] text-[var(--bone-50)]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" aria-hidden="true" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" aria-hidden="true" />
                    <span className="ml-2 text-[var(--bone-60)]">norai-telemetry · {activePractice.id}</span>
                  </div>
                  <span className="text-[var(--mint)] font-bold">AIR-GAPPED // VERIFIED</span>
                </div>

                <div className="text-[var(--mint)] font-semibold pt-1">
                  $ {activePractice.terminal.command}
                </div>

                {activePractice.terminal.lines.map((line, i) => (
                  <div key={i} className="text-[var(--bone-80)] flex items-center gap-2">
                    <span className="text-[var(--mint)]">✔</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>

              {/* Action Strip */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs font-mono text-[var(--bone-60)]">
                  <span className="block text-[11px] uppercase tracking-wider text-[var(--mint)] font-bold">
                    Delivery SLA
                  </span>
                  <span>3–5 Days to Production PoC · Zero Egress</span>
                </div>

                <Link
                  href={activePractice.href as Route}
                  className="btn btn--solid h-11 px-6 rounded-full bg-[var(--mint)] text-[var(--pine)] font-extrabold hover:bg-white transition-[background-color,transform] duration-160 ease-out active:scale-[0.98] shrink-0"
                >
                  Scope this Architecture →
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </Container>
    </section>
  );
}
