import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react';

export function ArchitecturalSpecMatrix() {
  return (
    <div className="w-full text-left font-sans border-t border-b border-[rgba(13,37,61,0.12)] divide-y lg:divide-y-0 lg:divide-x divide-[rgba(13,37,61,0.12)] grid grid-cols-1 lg:grid-cols-12 py-12 lg:py-16 items-stretch">
      {/* Left Thesis Anchor */}
      <div className="lg:col-span-4 pr-0 lg:pr-10 pb-8 lg:pb-0 space-y-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent-50 text-accent-500 font-mono text-xs font-semibold border border-accent-500/20">
          <Layers className="w-3.5 h-3.5" />
          <span>Core Engineering Specs</span>
        </div>

        <h3 className="font-display text-4xl sm:text-5xl text-ink-primary font-normal leading-[1.08] tracking-tight">
          The engineering <br />
          <span className="italic text-accent-500 font-normal">principles that matter.</span>
        </h3>

        <p className="text-base text-ink-body leading-relaxed max-w-sm">
          We skip the decorative AI marketing hype. Every utility is engineered with deterministic inference pipelines, strict ephemeral memory guarantees, and transparent unit economics.
        </p>
      </div>

      {/* Right 3 Dense Engineering Ledger Columns */}
      <div className="lg:col-span-8 pl-0 lg:pl-10 pt-8 lg:pt-0 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-accent-500">
            <Zap className="w-3.5 h-3.5" />
            <span>Inference Timing</span>
          </div>

          <div className="text-3xl sm:text-4xl font-mono tabular-nums font-bold text-ink-primary tracking-tight">
            &lt; 0.35s
          </div>

          <h4 className="font-display text-xl text-ink-primary font-normal">
            Sub-Second Serverless
          </h4>

          <p className="text-sm text-ink-body leading-relaxed">
            Optimized serverless runtime ensures operations execute with immediate responses. Zero cold-start stalls or multi-minute queue backlogs.
          </p>

          <div className="pt-2 text-xs font-mono text-accent-secondary flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-accent-secondary shrink-0" />
            <span className="tabular-nums">P95 &lt; 400ms SLA</span>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-accent-500">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Data Residency</span>
          </div>

          <div className="text-3xl sm:text-4xl font-mono tabular-nums font-bold text-ink-primary tracking-tight">
            0 Bytes
          </div>

          <h4 className="font-display text-xl text-ink-primary font-normal">
            Ephemeral In-Memory
          </h4>

          <p className="text-sm text-ink-body leading-relaxed">
            Customer documents and voice streams are processed in transient RAM containers and wiped instantly. Never pooled, retained, or used for model training.
          </p>

          <div className="pt-2 text-xs font-mono text-accent-secondary flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-accent-secondary shrink-0" />
            <span>RAM flushed on close</span>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-accent-500">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Integration SLA</span>
          </div>

          <div className="text-3xl sm:text-4xl font-mono tabular-nums font-bold text-ink-primary tracking-tight">
            100%
          </div>

          <h4 className="font-display text-xl text-ink-primary font-normal">
            Deterministic APIs
          </h4>

          <p className="text-sm text-ink-body leading-relaxed">
            Typed JSON schemas and typed REST webhooks. Seamlessly integrates into your existing Slack workflows, internal dashboards, and ATS platforms.
          </p>

          <div className="pt-2 text-xs font-mono text-accent-secondary flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-accent-secondary shrink-0" />
            <span>TypeScript SDK ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
