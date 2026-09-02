import React from 'react';

export function ArchitecturalSpecMatrix() {
  return (
    <div className="w-full text-left font-sans border-t border-b border-border-subtle divide-y lg:divide-y-0 lg:divide-x divide-border-subtle grid grid-cols-1 lg:grid-cols-12 py-8 lg:py-12 items-stretch">
      {/* Left Thesis Anchor */}
      <div className="lg:col-span-4 pr-0 lg:pr-10 pb-8 lg:pb-0 space-y-4">
        <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-accent-primary">
          Core Engineering Specifications
        </p>

        <h3 className="font-display text-4xl sm:text-5xl text-text-primary font-normal leading-[1.08] tracking-tight">
          The engineering <br />
          <span className="font-medium text-text-primary">principles that matter.</span>
        </h3>

        <p className="text-base text-text-secondary leading-relaxed max-w-sm">
          We skip the decorative AI marketing hype. Every utility is engineered with deterministic inference pipelines, strict ephemeral memory guarantees, and transparent unit economics.
        </p>
      </div>

      {/* Right 3 Dense Engineering Ledger Columns */}
      <div className="lg:col-span-8 pl-0 lg:pl-10 pt-8 lg:pt-0 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div className="space-y-3.5">
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-primary">
            Inference Timing
          </p>

          <div className="text-3xl sm:text-4xl font-mono tabular-nums font-bold text-text-primary tracking-tight">
            &lt; 0.35s
          </div>

          <h4 className="font-sans font-semibold text-base text-text-primary">
            Sub-Second Serverless
          </h4>

          <p className="text-sm text-text-secondary leading-relaxed">
            Optimized serverless runtime ensures operations execute with immediate responses. Zero cold-start stalls or multi-minute queue backlogs.
          </p>

          <div className="pt-2 text-xs font-mono text-text-muted">
            <span className="tabular-nums">P95 &lt; 400ms SLA</span>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-3.5">
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-primary">
            Data Residency
          </p>

          <div className="text-3xl sm:text-4xl font-mono tabular-nums font-bold text-text-primary tracking-tight">
            0 Bytes
          </div>

          <h4 className="font-sans font-semibold text-base text-text-primary">
            Ephemeral In-Memory
          </h4>

          <p className="text-sm text-text-secondary leading-relaxed">
            Customer documents and voice streams are processed in transient RAM containers and wiped instantly. Never pooled, retained, or used for model training.
          </p>

          <div className="pt-2 text-xs font-mono text-text-muted">
            <span>RAM flushed on close</span>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-3.5">
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-primary">
            Integration SLA
          </p>

          <div className="text-3xl sm:text-4xl font-mono tabular-nums font-bold text-text-primary tracking-tight">
            100%
          </div>

          <h4 className="font-sans font-semibold text-base text-text-primary">
            Deterministic APIs
          </h4>

          <p className="text-sm text-text-secondary leading-relaxed">
            Typed JSON schemas and typed REST webhooks. Seamlessly integrates into your existing Slack workflows, internal dashboards, and ATS platforms.
          </p>

          <div className="pt-2 text-xs font-mono text-text-muted">
            <span>TypeScript SDK ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArchitecturalSpecMatrix;
