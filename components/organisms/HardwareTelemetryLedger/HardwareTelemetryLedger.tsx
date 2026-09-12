'use client';

import React from 'react';
import { Container } from '@/components/foundation/Container';
import { CountUp } from '@/components/foundation/CountUp';

export function HardwareTelemetryLedger() {
  return (
    <aside
      aria-label="Platform engineering benchmarks and verifiable SLA ledger"
      className="relative py-6 sm:py-8 border-y border-border-subtle bg-surface-panel/70 backdrop-blur-sm"
    >
      <Container size="default">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border-subtle">
          {/* Cell 1: Inference SLA */}
          <div className="p-4 sm:p-6 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[11px] font-mono text-text-muted font-semibold tracking-wider">
                P95 INFERENCE SLA
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-1 font-mono text-2xl sm:text-3xl font-bold text-text-primary tabular-nums tracking-tight">
                <span className="text-accent-primary font-sans text-xl font-normal">&lt;</span>
                <CountUp value={0.35} decimals={2} duration={0.8} suffix="s" />
              </div>
              <p className="text-xs font-medium text-text-secondary">Sub-second parser latency</p>
            </div>
            <div className="pt-1">
              <span className="font-mono text-[11px] text-text-muted">
                P50: 180ms · P95: 320ms vLLM
              </span>
            </div>
          </div>

          {/* Cell 2: Ephemeral RAM Isolation */}
          <div className="p-4 sm:p-6 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[11px] font-mono text-text-muted font-semibold tracking-wider">
                DATA RESIDENCY
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-1 font-mono text-2xl sm:text-3xl font-bold text-text-primary tabular-nums tracking-tight">
                <span>0</span>
                <span className="text-accent-secondary font-sans text-lg font-semibold">Bytes</span>
              </div>
              <p className="text-xs font-medium text-text-secondary">Zero customer data to disk</p>
            </div>
            <div className="pt-1">
              <span className="font-mono text-[11px] text-text-muted">Ephemeral RAM</span>
            </div>
          </div>

          {/* Cell 3: Schema Validation */}
          <div className="p-4 sm:p-6 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[11px] font-mono text-text-muted font-semibold tracking-wider">
                SCHEMA VALIDATION
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-1 font-mono text-2xl sm:text-3xl font-bold text-text-primary tabular-nums tracking-tight">
                <CountUp value={100} duration={0.8} />
                <span className="text-accent-primary font-sans font-semibold text-lg">%</span>
              </div>
              <p className="text-xs font-medium text-text-secondary">
                Strict runtime Zod contracts
              </p>
            </div>
            <div className="pt-1">
              <span className="font-mono text-[11px] text-text-muted">
                Zero hallucination schema drift
              </span>
            </div>
          </div>

          {/* Cell 4: Pipeline Reliability */}
          <div className="p-4 sm:p-6 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[11px] font-mono text-text-muted font-semibold tracking-wider">
                PIPELINE RELIABILITY
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-1 font-mono text-2xl sm:text-3xl font-bold text-text-primary tabular-nums tracking-tight">
                <CountUp value={99.98} decimals={2} duration={0.8} suffix="%" />
              </div>
              <p className="text-xs font-medium text-text-secondary">Deterministic P99 uptime</p>
            </div>
            <div className="pt-1">
              <span className="font-mono text-[11px] text-text-muted">Active SLA</span>
            </div>
          </div>
        </div>
      </Container>
    </aside>
  );
}

export default HardwareTelemetryLedger;
