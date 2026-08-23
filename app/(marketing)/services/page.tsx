'use client';

import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { AnimatedSection } from '@/components/foundation/AnimatedSection';
import { MeshGradient } from '@/components/atoms/MeshGradient';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { ServicesDirectory } from '@/components/organisms/ServicesDirectory';

const ENGAGEMENT_STEPS = [
  {
    step: '01',
    title: 'Technical Workflow Audit',
    desc: 'We analyze your data bottlenecks, latency targets, and integration requirements during an initial architecture deep-dive.',
  },
  {
    step: '02',
    title: 'Rapid Functional Prototype',
    desc: 'We construct a functional pipeline prototype in 3–5 days to validate accuracy, response speed, and unit economics.',
  },
  {
    step: '03',
    title: 'Production Deployment & SLA',
    desc: 'We plug the solution into your production stack backed by automated monitoring, redundancy failover, and guaranteed response SLAs.',
  },
];

export default function ServicesPage() {
  return (
    <div className="text-ink-primary min-h-screen font-sans bg-canvas-base selection:bg-accent-500 selection:text-white">
      {/* Editorial Hero Header */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-20 border-b border-[rgba(13,37,61,0.08)]">
        <MeshGradient intensity="subtle" />

        <Container size="default" className="relative z-10">
          <div className="max-w-3xl space-y-6 text-left">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-accent-500 tracking-wider uppercase">
              <span>// ENTERPRISE AI ENGINEERING · 2026</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal text-ink-primary leading-tight tracking-tight">
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
          <div className="max-w-2xl mb-14 text-left space-y-3">
            <span className="font-mono text-xs font-semibold text-accent-500 uppercase tracking-wider block">
              // ENGAGEMENT ROADMAP
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-ink-primary leading-tight">
              How we partner with <br />
              <span className="italic text-accent-500 font-normal">engineering teams.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
            {ENGAGEMENT_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-6 md:p-8 rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.1)] shadow-sm space-y-3"
              >
                <span className="font-mono text-xs font-bold text-accent-500 block">
                  STAGE {step.step}
                </span>
                <h3 className="font-display text-2xl text-ink-primary font-normal">
                  {step.title}
                </h3>
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