import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { MeshGradient } from '@/components/atoms/MeshGradient';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { ServicesDirectory } from '@/components/organisms';

const ENGAGEMENT_STEPS = [
  {
    phase: 'Discovery',
    title: 'Technical Workflow Audit',
    desc: 'We analyze your data bottlenecks, latency targets, and integration requirements during an initial architecture deep-dive.',
  },
  {
    phase: 'Prototyping',
    title: '3–5 Day PoC Sprint',
    desc: 'We build a functioning proof-of-concept pipeline in an isolated test environment with real benchmarks on your sample datasets.',
  },
  {
    phase: 'Delivery',
    title: 'Production Deployment & SLA',
    desc: 'We plug the solution into your production stack backed by automated monitoring, redundancy failover, and guaranteed response SLAs.',
  },
];

export default function ServicesPage() {
  return (
    <div className="text-ink-primary min-h-screen font-sans bg-canvas-base selection:bg-accent-500 selection:text-white">
      {/* Editorial Hero Header */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 border-b border-[rgba(13,37,61,0.08)]">
        <MeshGradient intensity="subtle" />

        <Container size="default" className="relative z-10">
          <div className="max-w-4xl space-y-6 text-left">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-ink-primary leading-[1.04] tracking-tight">
              Bespoke AI solutions <br />
              <span className="italic text-accent-500 font-normal">engineered for your stack.</span>
            </h1>

            <p className="text-lg md:text-xl text-ink-body leading-relaxed max-w-2xl font-normal">
              From custom RAG pipelines to Model Context Protocol (MCP) tool servers and multi-agent workflow orchestration, we build reliable, production-grade intelligence.
            </p>

            <div className="pt-2 flex flex-wrap gap-6 text-xs text-ink-secondary font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent-secondary" />
                <span>Dedicated VPC & on-prem deployment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent-secondary" />
                <span>3–5 day rapid prototyping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent-secondary" />
                <span>Deterministic inference guarantees</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Bespoke Interactive Master Engineering Directory */}
      <section className="py-16 md:py-24 bg-canvas-base border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <ServicesDirectory />
        </Container>
      </section>

      {/* Engagement Roadmap (Clean Editorial Timeline) */}
      <section className="py-16 md:py-24 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="max-w-2xl mb-14 text-left space-y-4">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink-primary leading-tight">
              How we partner with <br />
              <span className="italic text-accent-500 font-normal">engineering teams.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
            {ENGAGEMENT_STEPS.map((step) => (
              <div
                key={step.title}
                className="p-6 md:p-8 rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.1)] shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent-500">
                    {step.phase}
                  </span>
                  <h3 className="font-display text-2xl text-ink-primary font-normal">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs text-ink-body leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pre-Footer Call to Action */}
      <section className="py-20 md:py-28 bg-canvas-base">
        <Container size="default">
          <div className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-10 md:p-16 text-center shadow-lg relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-normal text-ink-primary leading-tight">
                Have a custom AI workflow in mind?
              </h2>
              <p className="text-base md:text-lg text-ink-body leading-relaxed">
                Connect directly with our engineering team to scope your technical architecture, latency requirements, and proof-of-concept timeline.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto group">
                    <span>Schedule technical consultation</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/products" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Explore self-serve tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}