'use client';

import React, { useState } from 'react';
import { Container } from '@/components/foundation/Container';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Cpu, Database, Cloud, Glasses, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CapabilityPractice {
  number: string;
  tag: string;
  title: string;
  summary: string;
  metric: string;
  accent: string;
  details: string[];
  telemetry: string;
  icon: React.ElementType;
}

export const CAPABILITY_PRACTICES: CapabilityPractice[] = [
  {
    number: '01',
    tag: 'DATA INGESTION',
    title: 'Multi-Format Ingestion & Stream Extraction',
    summary:
      'Zero-egress stream parsing, layout-aware PDF tokenization, and sub-second extraction pipelines in transient RAM.',
    metric: 'P95 Latency < 350ms',
    accent: '#00E599',
    details: [
      'Transient memory stream with 0 bytes written to cold disk',
      'Layout-aware bounding box extraction for multi-column tables',
      'Native streaming response back to client in < 250ms',
    ],
    telemetry: 'LATENCY: 0.28s · RAM: 42MB · 0 EGRESS',
    icon: Database,
  },
  {
    number: '02',
    tag: 'RAG & RETRIEVAL',
    title: 'Deterministic RAG & Agent Orchestration',
    summary:
      'Enterprise hybrid vector search (pgvector + BM25), Model Context Protocol (MCP) tool servers, and grounded citation verification.',
    metric: '99.95% Citation Grounding',
    accent: '#C6B5FF',
    details: [
      'Hybrid reciprocal rank fusion (BM25 sparse + pgvector dense)',
      'MCP tool servers with deterministic schema verification',
      'Zero-hallucination citation provenance guaranteed',
    ],
    telemetry: 'GROUNDING: 99.95% · RECALL@5: 0.98 · MCP: ACTIVE',
    icon: Cpu,
  },
  {
    number: '03',
    tag: 'SOVEREIGN CLOUD',
    title: 'Private VPC & Air-Gapped Inference',
    summary:
      'Dedicated vLLM and TensorRT-LLM container deployments operating inside your private VPC with zero external egress.',
    metric: 'Sub-100ms Inference',
    accent: '#FFAE42',
    details: [
      'Air-gapped Kubernetes Helm charts & Docker compose recipes',
      'Continuous batching & PagedAttention with vLLM engines',
      'Your cryptographic keys, your physical servers, zero telemetry',
    ],
    telemetry: 'THROUGHPUT: 180 tok/s · P99: 84ms · EGRESS: 0 BYTES',
    icon: Cloud,
  },
  {
    number: '04',
    tag: 'R&D PILOT · AR/VR',
    title: 'Spatial & Immersive Systems (AR/VR)',
    summary:
      'WebGPU compute shaders, Three.js/WGSL tactile spatial interaction models, and multi-modal sensory telemetry for spatial data.',
    metric: '60fps WebGPU Compute',
    accent: '#5EEAD4',
    details: [
      'Custom WGSL compute pipelines for dense point cloud physics',
      'Zero latency hand-tracking gesture recognition models',
      'Led by Japan VR/AR Summit finalist & spatial AI engineers',
    ],
    telemetry: 'FRAME RATE: 60 FPS · WGSL: OPTIMIZED · LATENCY: 12ms',
    icon: Glasses,
  },
];

export function SpiralCapabilitiesMatrix() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePractice: CapabilityPractice = (CAPABILITY_PRACTICES[activeIndex] || CAPABILITY_PRACTICES[0]) as CapabilityPractice;
  const ActiveIcon = activePractice.icon;

  return (
    <section className="py-16 sm:py-24 border-b border-[var(--line)] bg-[#f5f5f0] relative overflow-hidden">
      <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-2xl mb-12 text-left space-y-2">
          <span className="font-mono text-xs text-[var(--mint-ink)] uppercase tracking-widest font-bold block">
            — ENGINEERED CAPABILITIES · THE SPIRAL MATRIX
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--pine)] tracking-[-0.03em]">
            Mission-critical scale practices.
          </h2>
          <p className="text-sm sm:text-base text-[var(--pine)]/75">
            Explore our core practices across data ingestion, deterministic retrieval, sovereign VPC inference, and WebGPU spatial computing.
          </p>
        </div>

        {/* Fanned / Spiral Interactive Architecture Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Radial Selector Cards with subtle rotational spiral offsets */}
          <div className="lg:col-span-6 space-y-3 relative">
            {CAPABILITY_PRACTICES.map((p, idx) => {
              const isSelected = activeIndex === idx;
              const Icon = p.icon;
              // Rotational spiral fan offsets: -2.5deg, -0.8deg, 0.8deg, 2.5deg
              const rotationDeg = [-2.5, -0.8, 0.8, 2.5][idx];

              return (
                <motion.div
                  key={p.number}
                  whileHover={{ x: 6, scale: 1.01 }}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    'p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left relative overflow-hidden shadow-xs',
                    isSelected
                      ? 'bg-[#072929] text-white border-white/20 shadow-xl ring-1 ring-white/10 z-20'
                      : 'bg-[#fffdf7] text-[var(--pine)] border-[var(--line)] hover:border-[var(--pine)]/30 z-10',
                  )}
                  style={{
                    transform: isSelected ? 'none' : 'rotate(' + rotationDeg + 'deg)',
                  }}
                >
                  {isSelected && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5"
                      style={{ backgroundColor: p.accent }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center border',
                          isSelected
                            ? 'bg-white/10 text-white border-white/10'
                            : 'bg-[var(--porcelain)] text-[var(--pine)] border-[var(--line)]',
                        )}
                        style={isSelected ? { color: p.accent } : undefined}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="font-mono text-xs font-bold"
                            style={{ color: isSelected ? p.accent : 'var(--mint-ink)' }}
                          >
                            {p.number}
                          </span>
                          <h3
                            className={cn(
                              'font-display text-base sm:text-lg font-bold tracking-tight',
                              isSelected ? 'text-white' : 'text-[var(--pine)]',
                            )}
                          >
                            {p.title}
                          </h3>
                        </div>
                        <span
                          className={cn(
                            'text-[11px] font-mono tracking-wide',
                            isSelected ? 'text-[var(--bone-70)]' : 'text-[var(--pine)]/60',
                          )}
                        >
                          {p.tag}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        'font-mono text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0',
                        isSelected
                          ? 'bg-white/10 text-white border-white/15'
                          : 'bg-[var(--pine-08)] text-[var(--pine)] border-[var(--line)]',
                      )}
                      style={isSelected ? { color: p.accent, borderColor: p.accent + '40' } : undefined}
                    >
                      {p.metric}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Deep Telemetry Projection Stage */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePractice.number}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="rounded-3xl bg-[#072929] border border-white/15 p-7 sm:p-9 text-[#f5f5f0] shadow-2xl relative overflow-hidden text-left"
              >
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #00E599 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: activePractice.accent + '20',
                        borderColor: activePractice.accent + '40',
                        color: activePractice.accent,
                      }}
                    >
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span
                        className="font-mono text-xs font-bold tracking-widest uppercase block"
                        style={{ color: activePractice.accent }}
                      >
                        PRACTICE {activePractice.number} · {activePractice.tag}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                        {activePractice.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="relative z-10 text-sm sm:text-base text-[var(--bone-70)] leading-relaxed mt-4">
                  {activePractice.summary}
                </p>

                {/* Telemetry Console Strip */}
                <div className="relative z-10 my-6 rounded-xl bg-black/50 border border-white/10 p-4 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] border-b border-white/10 pb-1.5">
                    <span className="flex items-center gap-1.5" style={{ color: activePractice.accent }}>
                      <Activity className="w-3.5 h-3.5" />
                      <span>RUNTIME SLA VERIFICATION</span>
                    </span>
                    <span className="text-[var(--bone-70)]">AUDITED BENCHMARK</span>
                  </div>
                  <div className="font-semibold text-xs pt-1" style={{ color: activePractice.accent }}>
                    {activePractice.telemetry}
                  </div>
                </div>

                {/* Technical Pillars */}
                <div className="relative z-10 space-y-2.5 border-t border-white/15 pt-4">
                  {activePractice.details.map((d, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--bone-70)]">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: activePractice.accent }}
                      />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
