'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function ArchitecturalSpecMatrix() {
  return (
    <div className="w-full text-left font-sans border-t border-b border-[rgba(13,37,61,0.12)] divide-y lg:divide-y-0 lg:divide-x divide-[rgba(13,37,61,0.12)] grid grid-cols-1 lg:grid-cols-12 py-8 lg:py-12 items-stretch">
      {/* Left Thesis Anchor */}
      <div className="lg:col-span-4 pr-0 lg:pr-8 pb-6 lg:pb-0 space-y-4">
        <span className="font-mono text-xs font-semibold text-accent-500 uppercase tracking-wider block">
          // ARCHITECTURAL GUARANTEES
        </span>

        <h3 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal leading-tight">
          The engineering <br />
          <span className="italic text-accent-500 font-normal">principles that matter.</span>
        </h3>

        <p className="text-sm text-ink-body leading-relaxed max-w-sm">
          We skip the decorative AI marketing hype. Every utility is engineered with deterministic inference pipelines, strict ephemeral memory guarantees, and transparent unit economics.
        </p>
      </div>

      {/* Right 3 Dense Engineering Ledger Columns */}
      <div className="lg:col-span-8 pl-0 lg:pl-8 pt-6 lg:pt-0 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
        {/* Column 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-secondary">
            <span className="font-bold text-accent-500">01</span>
            <span className="uppercase font-semibold">INFERENCE TIMING</span>
          </div>

          <div className="text-2xl sm:text-3xl font-mono font-bold text-ink-primary">
            &lt; 0.35s
          </div>

          <h4 className="font-display text-lg text-ink-primary font-normal">
            Sub-Second Serverless
          </h4>

          <p className="text-xs text-ink-body leading-relaxed">
            Optimized serverless runtime ensures operations execute with immediate responses. Zero cold-start stalls or multi-minute queue backlogs.
          </p>

          <div className="pt-2 text-[11px] font-mono text-accent-secondary flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>P95 &lt; 400ms SLA</span>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-secondary">
            <span className="font-bold text-accent-500">02</span>
            <span className="uppercase font-semibold">DATA RESIDENCY</span>
          </div>

          <div className="text-2xl sm:text-3xl font-mono font-bold text-ink-primary">
            0 Bytes
          </div>

          <h4 className="font-display text-lg text-ink-primary font-normal">
            Ephemeral In-Memory
          </h4>

          <p className="text-xs text-ink-body leading-relaxed">
            Customer documents and voice streams are processed in transient RAM containers and wiped instantly. Never pooled, retained, or used for model training.
          </p>

          <div className="pt-2 text-[11px] font-mono text-accent-secondary flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>RAM flushed on close</span>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-secondary">
            <span className="font-bold text-accent-500">03</span>
            <span className="uppercase font-semibold">INTEGRATION</span>
          </div>

          <div className="text-2xl sm:text-3xl font-mono font-bold text-ink-primary">
            100%
          </div>

          <h4 className="font-display text-lg text-ink-primary font-normal">
            Deterministic APIs
          </h4>

          <p className="text-xs text-ink-body leading-relaxed">
            Typed JSON schemas and typed REST webhooks. Seamlessly integrates into your existing Slack workflows, internal dashboards, and ATS platforms.
          </p>

          <div className="pt-2 text-[11px] font-mono text-accent-secondary flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>TypeScript SDK ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
