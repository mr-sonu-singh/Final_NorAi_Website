'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface Stage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  specs: string[];
  badge: string;
}

const STAGES: Stage[] = [
  {
    id: 'stage-ingest',
    step: '01',
    title: 'Multi-Format Ingestion',
    subtitle: 'Zero-Egress Stream Parser',
    specs: [
      'PDF / DOCX / TXT Parsing',
      'Audio / Video Whisper Ingestion',
      'Webhook & Telegram Listeners',
    ],
    badge: '< 45ms cold start',
  },
  {
    id: 'stage-core',
    step: '02',
    title: 'Deterministic Neural Core',
    subtitle: 'Quantized vLLM & Guardrails',
    specs: [
      'FP8 / AWQ LoRA Inference',
      'Strict Zod Schema Enforcement',
      'Zero Hallucination Validation',
    ],
    badge: '100% JSON Guarantee',
  },
  {
    id: 'stage-deliver',
    step: '03',
    title: 'Actionable Dispatch',
    subtitle: 'Sub-Second Payload Relay',
    specs: [
      'MCP Server Endpoint Response',
      'Ephemeral RAM Flushed (0B Egress)',
      'Immediate Webhook Callbacks',
    ],
    badge: 'P95 < 320ms',
  },
];

export function InteractiveCircuitTrace({ className }: { className?: string }) {
  const [activeStage, setActiveStage] = useState<number>(1);

  return (
    <div className={cn('w-full space-y-8', className)}>
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <span className="text-xs font-mono font-semibold text-accent-primary uppercase tracking-wider">
            Deterministic Pipeline Architecture
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-normal text-text-primary mt-0.5">
            End-to-End Execution Flow
          </h3>
        </div>
        <div className="text-xs font-mono text-text-secondary bg-surface-panel-subtle px-3 py-1.5 rounded-lg border border-border-subtle">
          <span>Active Pipeline: Zero Egress Memory</span>
        </div>
      </div>

      {/* Interactive 3-Stage Stage Cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
        {STAGES.map((stage, idx) => {
          const isActive = activeStage === idx;

          return (
            <div
              key={stage.id}
              onClick={() => setActiveStage(idx)}
              onMouseEnter={() => setActiveStage(idx)}
              className={cn(
                'relative z-10 p-6 rounded-xl transition-[background-color,border-color,transform] duration-150 ease-out cursor-pointer border text-left active:scale-[0.985]',
                isActive
                  ? 'bg-surface-panel border-border-strong ring-1 ring-border-strong'
                  : 'bg-surface-panel border-border-subtle hover:border-border-strong hover:bg-surface-hover/50',
              )}
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-accent-primary">
                  STAGE {stage.step}
                </span>
                <span className="text-[11px] font-mono text-text-muted">{stage.badge}</span>
              </div>

              {/* Title and Subtitle */}
              <h4 className="text-lg font-bold text-text-primary">{stage.title}</h4>
              <p className="text-xs font-mono text-text-secondary mt-0.5 mb-4">{stage.subtitle}</p>

              {/* Specs List */}
              <ul className="space-y-2 border-t border-border-subtle pt-3">
                {stage.specs.map((spec, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2 text-xs text-text-secondary">
                    <span className="text-text-muted select-none font-mono">—</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>

              {/* Active Indicator Bar */}
              {isActive && (
                <motion.div
                  layoutId="pipeline-active-indicator"
                  className="absolute bottom-0 left-6 right-6 h-0.5 bg-accent-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Live Pipeline Telemetry Footer */}
      <div className="p-4 rounded-xl bg-surface-panel-subtle border border-border-subtle flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-text-secondary">
        <div className="flex items-center gap-3">
          <span>Continuous throughput: 1,400+ ops/min</span>
          <span className="text-border-strong select-none">/</span>
          <span>RAM state: Auto-cleared after each JSON completion</span>
        </div>
        <div className="text-text-muted">
          Click or hover over any stage to inspect execution telemetry.
        </div>
      </div>
    </div>
  );
}

export default InteractiveCircuitTrace;
