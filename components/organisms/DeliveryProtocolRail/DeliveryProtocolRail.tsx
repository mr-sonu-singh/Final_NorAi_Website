'use client';

import React, { useState } from 'react';
import { Container } from '@/components/foundation/Container';
import { FileCheck, Zap, Server, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const PROTOCOL_STEPS = [
  {
    stepNumber: '01',
    phase: 'PHASE 01',
    timeline: 'Day 01–02',
    title: 'Technical Workflow & Latency Audit',
    desc: 'We analyze your data schemas, query volume, latency bottlenecks, and private network boundaries during an initial technical deep-dive.',
    icon: FileCheck,
    deliverables: [
      'Document Schema & Chunking Blueprint',
      'Zero-Trust Security Boundary Plan',
      'Target Latency & Accuracy SLA Spec',
    ],
  },
  {
    stepNumber: '02',
    phase: 'PHASE 02',
    timeline: 'Day 03–05',
    title: '5-Day Rapid Sandbox PoC Sprint',
    desc: 'We engineer a functioning proof-of-concept pipeline in an isolated test sandbox with live benchmarks on your sample datasets.',
    icon: Zap,
    deliverables: [
      'Isolated Sandbox Inference Pipeline',
      'P95 Latency & Accuracy Benchmark Report',
      'Deterministic Output Guardrails',
    ],
  },
  {
    stepNumber: '03',
    phase: 'PHASE 03',
    timeline: 'Day 06+',
    title: 'Production VPC & Guaranteed SLA',
    desc: 'We deploy the hardened container into your private cloud (AWS / GCP / Azure PrivateLink or On-Prem) backed by automated telemetry.',
    icon: Server,
    deliverables: [
      'Air-Gapped Docker / Helm Package',
      '99.9% Uptime & Sub-200ms Latency SLA',
      'Direct Senior Architect Walkthrough',
    ],
  },
];

export function DeliveryProtocolRail() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="operating-rituals" className="py-16 sm:py-24 border-b border-[var(--line)] bg-[#f5f5f0] scroll-mt-24">
      <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-14 text-left space-y-2">
          <span className="font-mono text-xs text-[var(--mint-ink)] uppercase tracking-widest font-bold block">
            — DELIVERY PROTOCOL · MILESTONE TIMELINE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--pine)] tracking-[-0.03em]">
            How we partner with engineering teams.
          </h2>
          <p className="text-sm sm:text-base text-[var(--pine)]/75">
            A predictable, milestone-driven framework designed to deliver a verified proof-of-concept in days, not quarters.
          </p>
        </div>

        {/* The Continuous Kinetic Timeline Rail */}
        <div className="relative">
          {/* Continuous illuminated connecting hairline */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-[var(--pine-12)]" aria-hidden="true" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {PROTOCOL_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;

              return (
                <div
                  key={step.phase}
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    'rounded-2xl p-7 text-left transition-all duration-200 cursor-pointer border relative overflow-hidden group',
                    isSelected
                      ? 'bg-[#072929] text-white border-transparent shadow-xl ring-1 ring-white/15'
                      : 'bg-[#fffdf7] text-[var(--pine)] border-[var(--line)] hover:border-[var(--pine)]/30 hover:bg-[#fffdf7]/90 shadow-xs',
                  )}
                >
                  {/* Glowing Milestone Header */}
                  <div className="flex items-center justify-between border-b pb-4 mb-5" style={{ borderColor: isSelected ? 'rgba(255,255,255,0.15)' : 'var(--line)' }}>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center border font-mono font-bold text-sm',
                          isSelected
                            ? 'bg-[#00E599]/20 text-[#00E599] border-[#00E599]/30'
                            : 'bg-[var(--porcelain)] text-[var(--pine)] border-[var(--line)]',
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold block" style={{ color: isSelected ? '#00E599' : 'var(--mint-ink)' }}>
                          {step.phase}
                        </span>
                        <span className="text-[11px] font-mono" style={{ color: isSelected ? 'var(--bone-70)' : 'var(--pine)/60' }}>
                          {step.timeline}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--pine-08)] text-[var(--pine)]" style={isSelected ? { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' } : undefined}>
                      STEP {step.stepNumber}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 mb-6">
                    <h3 className="font-display text-xl font-bold tracking-tight leading-snug" style={{ color: isSelected ? '#fff' : 'var(--pine)' }}>
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: isSelected ? 'var(--bone-70)' : 'var(--pine)/75' }}>
                      {step.desc}
                    </p>
                  </div>

                  {/* Deliverables Ledger */}
                  <div className="space-y-2 pt-4 border-t" style={{ borderColor: isSelected ? 'rgba(255,255,255,0.15)' : 'var(--line)' }}>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest block" style={{ color: isSelected ? '#00E599' : 'var(--pine)/80' }}>
                      KEY DELIVERABLES:
                    </span>
                    <div className="space-y-1.5">
                      {step.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs" style={{ color: isSelected ? 'var(--bone-70)' : 'var(--pine)/85' }}>
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: isSelected ? '#00E599' : 'var(--mint-ink)' }} />
                          <span className="font-medium leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
