import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import { Button } from '@/components/atoms/Button';
import { MagneticButton } from '@/components/atoms/MagneticButton';
import {
  ArrowRight,
  Terminal,
  Shield,
  Zap,
  Code2,
  Server,
  Layers,
  Key,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { buildMetadata, getBreadcrumbListJsonLd, JsonLd } from '@/lib/seo';
import { ApiReferenceMatrix, TechnicalArtifactsLedger } from '@/components/organisms';
import { InteractiveCircuitTrace } from '@/components/molecules/InteractiveCircuitTrace';

export const metadata: Metadata = buildMetadata({
  path: '/docs',
  title: 'Developer Documentation',
  description:
    'Request contracts, deterministic response schemas, rate limits, and error handling for the four NorAI browser tools.',
});

const DOCS_NAV = [
  { id: 'quickstart', label: 'Quickstart & Auth', icon: Key },
  { id: 'endpoints', label: 'REST API Reference', icon: Terminal },
  { id: 'pipeline', label: 'Pipeline Architecture', icon: Layers },
  { id: 'schemas', label: 'Typed Zod Contracts', icon: Code2 },
  { id: 'errors', label: 'Error Handling', icon: AlertTriangle },
  { id: 'custom-infra', label: 'Dedicated VPC & MCP', icon: Server },
];

const ERROR_CODES = [
  {
    code: '400',
    name: 'BAD_SCHEMA',
    desc: 'Request payload failed strict Zod schema validation. Inspect details array for failed fields.',
  },
  {
    code: '401',
    name: 'UNAUTHORIZED',
    desc: 'Missing or malformed Authorization header. Expected Bearer <api_key>.',
  },
  {
    code: '422',
    name: 'UNPARSEABLE_PAYLOAD',
    desc: 'Corrupt binary file or unextractable text stream. Ensure document complies with size limits (<25MB).',
  },
  {
    code: '429',
    name: 'RATE_LIMIT_EXCEEDED',
    desc: 'Tier concurrency threshold exceeded. Retry with exponential backoff.',
  },
  {
    code: '500',
    name: 'INTERNAL_ENGINE_ERROR',
    desc: 'Deterministic worker execution timed out (>800ms) or model container unreachable.',
  },
];

export default function DocsPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Docs', path: '/docs' },
  ];

  return (
    <div className="min-h-screen bg-surface-canvas font-sans text-text-primary selection:bg-accent-primary selection:text-white">
      <JsonLd schema={getBreadcrumbListJsonLd(breadcrumbs)} />

      {/* =========================================================================
          HERO BANNER
          ========================================================================= */}
      <section className="relative overflow-hidden border-b border-border-subtle pb-14 pt-16 md:pt-24 bg-surface-canvas">
        <Container size="default" className="relative z-10">
          <div className="max-w-4xl space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-50 border border-accent-primary/20 text-accent-primary text-xs font-mono font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              <span>Developer Documentation · API Contracts v1</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-text-primary leading-[1.02] tracking-display">
              Developer documentation <br />
              <span className="italic text-accent-primary font-normal">&amp; API contracts.</span>
            </h1>

            <p className="fluid-lead text-text-secondary leading-relaxed max-w-2xl font-normal text-pretty">
              Deterministic REST endpoints and typed Zod schemas for high-throughput automated
              workflows. Sub-350ms response budgets with ephemeral RAM memory guarantees.
            </p>

            {/* Quick Stat Chips */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-text-secondary">
              <span className="px-3 py-1.5 rounded-lg bg-surface-panel border border-border-subtle flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-accent-primary" />
                <span>P95 &lt; 350ms Cold Execution</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-surface-panel border border-border-subtle flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-accent-secondary" />
                <span>0 Bytes Client Data Retained</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-surface-panel border border-border-subtle flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-accent-tertiary" />
                <span>Strict Zod Schema Guarantee</span>
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          2-COLUMN LEAN DEVELOPER HUB
          ========================================================================= */}
      <section className="py-12 md:py-16 bg-surface-canvas">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* STICKY LEFT SIDEBAR */}
            <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-6">
              <div className="p-4 rounded-2xl bg-surface-panel border border-border-subtle space-y-3">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-text-muted px-2 block">
                  Documentation Index
                </span>
                <nav className="space-y-1">
                  {DOCS_NAV.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono text-text-secondary hover:text-text-primary hover:bg-surface-canvas transition-colors group"
                      >
                        <Icon className="w-3.5 h-3.5 text-accent-primary group-hover:scale-110 transition-transform" />
                        <span>{item.label}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Sandbox Card */}
              <div className="p-4 rounded-2xl bg-surface-panel-subtle border border-border-subtle space-y-2 text-left">
                <div className="text-xs font-semibold text-text-primary">Interactive Sandbox</div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Test live endpoints with 50 pre-seeded credits in your browser.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent-primary hover:underline pt-1"
                >
                  <span>Open web sandbox</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </aside>

            {/* MAIN CONTENT READER */}
            <div className="lg:col-span-9 space-y-16 text-left">
              {/* SECTION 1: QUICKSTART & AUTH */}
              <section id="quickstart" className="space-y-6 scroll-mt-28">
                <div className="space-y-2 border-b border-border-subtle pb-4">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-primary">
                    Authentication &amp; Overview
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl text-text-primary font-normal">
                    Quickstart &amp; API Keys
                  </h2>
                </div>

                <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                  All requests to the NorAI API must be authenticated using an API bearer token in
                  the HTTP request headers. Pass your key in the{' '}
                  <code className="text-xs font-mono px-1.5 py-0.5 rounded bg-surface-panel border border-border-subtle text-accent-primary">
                    Authorization
                  </code>{' '}
                  header.
                </p>

                {/* Base URL Box */}
                <div className="p-4 rounded-2xl bg-surface-panel border border-border-subtle space-y-2">
                  <span className="text-[11px] font-mono uppercase text-text-muted block font-semibold">
                    Production Base URL
                  </span>
                  <div className="flex items-center justify-between bg-surface-canvas p-3 rounded-xl border border-border-subtle font-mono text-xs text-text-primary overflow-x-auto">
                    <span>https://api.norai.tech/v1</span>
                    <span className="text-[10px] text-accent-secondary bg-sage-100/60 border border-accent-secondary/20 px-2 py-0.5 rounded">
                      Active
                    </span>
                  </div>
                </div>

                {/* Code Sample Box */}
                <div className="p-5 rounded-2xl bg-[#0D253D] text-[#F5F0EA] space-y-3 font-mono text-xs overflow-x-auto border border-border-strong shadow-sm">
                  <div className="flex items-center justify-between text-[#8DA0B0] text-[11px] border-b border-[#1F3A56] pb-2">
                    <span>Headers &amp; Authorization</span>
                    <span>HTTP/1.1</span>
                  </div>
                  <pre className="leading-relaxed">
                    {`Authorization: Bearer norai_live_sec_key
Content-Type: application/json
Accept: application/json`}
                  </pre>
                </div>
              </section>

              {/* SECTION 2: REST API REFERENCE */}
              <section id="endpoints" className="space-y-6 scroll-mt-28">
                <div className="space-y-2 border-b border-border-subtle pb-4">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-primary">
                    Core Endpoints
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl text-text-primary font-normal">
                    REST API Reference
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Select an endpoint below to inspect the path, request parameters, and executable
                    code snippets in cURL and TypeScript.
                  </p>
                </div>

                <ApiReferenceMatrix />
              </section>

              {/* SECTION 3: PIPELINE ARCHITECTURE */}
              <section id="pipeline" className="space-y-6 scroll-mt-28">
                <div className="space-y-2 border-b border-border-subtle pb-4">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-secondary">
                    Execution Lifecycle
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl text-text-primary font-normal">
                    3-Stage Execution Pipeline Trace
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Inspect the deterministic flow of data through our multi-format ingestion,
                    quantized inference core, and sub-second dispatch relay.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-surface-panel border border-border-subtle shadow-sm">
                  <InteractiveCircuitTrace />
                </div>
              </section>

              {/* SECTION 4: TYPED ZOD SCHEMAS & PROTOCOLS */}
              <section id="schemas" className="space-y-6 scroll-mt-28">
                <div className="space-y-2 border-b border-border-subtle pb-4">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-primary">
                    Runtime Contracts
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl text-text-primary font-normal">
                    Typed Schemas &amp; Protocols
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Zero schema drift. Every pipeline in the NorAI ecosystem runs against strict,
                    versioned Zod schemas before returning data to the caller.
                  </p>
                </div>

                <TechnicalArtifactsLedger />
              </section>

              {/* SECTION 5: ERROR HANDLING MATRIX */}
              <section id="errors" className="space-y-6 scroll-mt-28">
                <div className="space-y-2 border-b border-border-subtle pb-4">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-secondary">
                    Deterministic Status Codes
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl text-text-primary font-normal">
                    Error Handling Matrix
                  </h2>
                  <p className="text-sm text-text-secondary">
                    All error responses return a standardized JSON envelope with an explicit error
                    code and actionable diagnostic string.
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-panel shadow-sm">
                  <div className="divide-y divide-border-subtle">
                    {ERROR_CODES.map((err) => (
                      <div
                        key={err.code}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 hover:bg-surface-panel-subtle transition-colors"
                      >
                        <div className="flex items-center gap-2.5 sm:w-48 shrink-0">
                          <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-accent-50 text-accent-primary border border-accent-primary/20">
                            HTTP {err.code}
                          </span>
                          <span className="font-mono text-xs font-semibold text-text-primary">
                            {err.name}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary leading-relaxed flex-1">
                          {err.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION 6: DEDICATED VPC & MCP DISPATCH */}
              <section id="custom-infra" className="space-y-6 scroll-mt-28">
                <div className="p-8 sm:p-10 rounded-3xl bg-surface-panel border border-border-strong space-y-6 relative overflow-hidden">
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-primary">
                      Custom Enterprise Deployment
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl text-text-primary font-normal">
                      Need a dedicated VPC or private MCP server?
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
                      We package custom RAG engines, MCP tool servers, and air-gapped Docker / Helm
                      containers directly into your cloud boundary with dedicated SLAs.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link href="/contact?service=dedicated-vpc">
                      <MagneticButton strength={12}>
                        <Button
                          variant="primary"
                          size="md"
                          className="justify-between group shadow-accent hover:shadow-hover hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer btn-tactile pl-5 pr-2 py-2 text-xs"
                        >
                          <span className="font-semibold">Talk to Infrastructure Engineers</span>
                          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center ml-2.5">
                            <ArrowRight className="w-3.5 h-3.5 text-white" />
                          </span>
                        </Button>
                      </MagneticButton>
                    </Link>

                    <Link href="/services">
                      <Button
                        variant="secondary"
                        size="md"
                        className="hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer text-xs"
                      >
                        Explore 4 Core Practices
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
