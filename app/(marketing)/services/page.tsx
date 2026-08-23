'use client';

import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { AnimatedSection } from '@/components/foundation/AnimatedSection';
import { MeshGradient } from '@/components/atoms/MeshGradient';
import {
  Bot,
  Database,
  Server,
  BarChart2,
  Globe,
  Workflow,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';


const ACTIVE_SERVICES = [
  {
    title: 'RAG Systems & Vector Search',
    category: 'Knowledge Retrieval',
    tagline: 'Enterprise vector search pipelines, hybrid retrieval, and multi-document indexing engines for high-accuracy knowledge retrieval.',
    badge: 'Production Ready',
    badgeColor: 'sage',
    highlights: ['Vector DB & Hybrid Search', 'Document Chunking & Embeddings', 'Grounded Context Verification'],
    ctaText: 'Build your RAG pipeline',
    href: '/contact?service=rag-systems',
    icon: Database,
  },
  {
    title: 'Model Context Protocol (MCP) Integration',
    category: 'Protocol Tooling',
    tagline: 'Implement Model Context Protocol (MCP) servers connecting Claude and AI assistants directly to your private databases and internal APIs.',
    badge: 'Production Ready',
    badgeColor: 'sage',
    highlights: ['Standardized MCP Protocol', 'Custom Tool & Resource Servers', 'Secure Execution Handlers'],
    ctaText: 'Integrate MCP today',
    href: '/contact?service=mcp-integration',
    icon: Server,
  },
  {
    title: 'LLM Stack Optimization & Cost Auditing',
    category: 'Model Optimization',
    tagline: 'Evaluate model performance, optimize prompt pipelines, eliminate token waste, and implement latency benchmarks across your LLM infrastructure.',
    badge: 'Production Ready',
    badgeColor: 'sage',
    highlights: ['Token & Cost Optimization', 'Latency & Benchmark Audits', 'Prompt & Model Evaluation'],
    ctaText: 'Audit your LLM stack',
    href: '/contact?service=llm-consulting',
    icon: BarChart2,
  },
  {
    title: 'Custom AI Web Applications',
    category: 'Full-Stack Web',
    tagline: 'Modern Next.js and React web applications powered by sub-second neural inference, dynamic UI generation, and deterministic workflow engines.',
    badge: 'Production Ready',
    badgeColor: 'sage',
    highlights: ['Next.js 15 & React 19 Stack', 'Sub-100ms Inference Endpoints', 'Clean UX & Tactile Controls'],
    ctaText: 'Build AI web apps',
    href: '/contact?service=ai-web-apps',
    icon: Globe,
  },
  {
    title: 'Business Automation Pipelines',
    category: 'Workflow Engineering',
    tagline: 'Automate manual data entry, ERP ingestion, compliance auditing, and multi-app synchronization with fault-tolerant background workers.',
    badge: 'Production Ready',
    badgeColor: 'sage',
    highlights: ['Fault-Tolerant Worker Queues', 'Webhook & REST Orchestration', 'Automated Health Retries'],
    ctaText: 'Automate your workflows',
    href: '/contact?service=automation-pipelines',
    icon: Workflow,
  },
];

const ENGAGEMENT_STEPS = [
  {
    step: '1',
    title: 'Technical Workflow Audit',
    desc: 'We analyze your data bottlenecks, latency targets, and integration requirements during an initial deep-dive session.',
  },
  {
    step: '2',
    title: 'Rapid Functional Prototype',
    desc: 'We construct a functional pipeline prototype in 3–5 days to validate accuracy, response speed, and unit economics.',
  },
  {
    step: '3',
    title: 'Production Deployment & SLA',
    desc: 'We plug the solution into your production stack backed by 24/7 automated monitoring, redundancy failover, and guaranteed response SLAs.',
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-[rgba(194,85,58,0.2)] text-accent-500 text-xs font-semibold">
              <span>Enterprise AI Engineering</span>
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

      {/* Flagship Enterprise Solution: Full-Width Editorial Spread */}
      <section className="py-16 md:py-24 bg-canvas-base border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <AnimatedSection className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 md:p-14 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 text-accent-500 text-xs font-semibold">
                  Our flagship practice
                </div>

                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink-primary font-normal leading-tight">
                  Autonomous AI Agents & Orchestration
                </h2>

                <p className="text-base sm:text-lg text-ink-body leading-relaxed font-normal">
                  Deploy autonomous conversational and task-execution agents grounded on your proprietary documents, CRM records, and internal knowledge bases with strict context validation and verified source citations.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5 text-sm text-ink-body">
                    <CheckCircle2 className="w-4 h-4 text-accent-secondary shrink-0 mt-0.5" />
                    <span>Strict RAG context validation with zero hallucination fallback</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-ink-body">
                    <CheckCircle2 className="w-4 h-4 text-accent-secondary shrink-0 mt-0.5" />
                    <span>Live synchronization with Postgres, Snowflake, Salesforce, and Vector DBs</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-ink-body">
                    <CheckCircle2 className="w-4 h-4 text-accent-secondary shrink-0 mt-0.5" />
                    <span>Deterministic guardrails and audit logging on every agent decision</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link href="/contact?service=autonomous-agents">
                    <Button variant="primary" size="lg" className="group">
                      <span>Scope autonomous agent project</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Architecture Box */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-canvas-recessed/70 border border-[rgba(13,37,61,0.08)] p-6 space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-50 text-accent-500 flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-ink-primary">Agent Architecture</h4>
                      <p className="text-xs text-ink-secondary">Production Deployment Blueprint</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.08)] flex items-center justify-between">
                      <span className="text-ink-body">Context Routing</span>
                      <span className="text-accent-secondary font-semibold">Deterministic Filter</span>
                    </div>
                    <div className="p-3 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.08)] flex items-center justify-between">
                      <span className="text-ink-body">Tool Handlers</span>
                      <span className="text-ink-primary font-semibold">Model Context Protocol</span>
                    </div>
                    <div className="p-3 rounded-lg bg-canvas-paper border border-[rgba(13,37,61,0.08)] flex items-center justify-between">
                      <span className="text-ink-body">Safety Policy</span>
                      <span className="text-accent-500 font-semibold">Isolated VPC + Guardrails</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Active Specialized Services Grid */}
      <section className="py-16 md:py-24 bg-canvas-base border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="max-w-2xl mb-14 text-left">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink-primary font-normal leading-tight">
              Specialized Engineering Services
            </h2>
            <p className="mt-3 text-base sm:text-lg text-ink-body leading-relaxed font-normal">
              Modular technical engagements focused on specific high-leverage architectural upgrades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ACTIVE_SERVICES.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <AnimatedSection
                  key={idx}
                  className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-canvas-recessed flex items-center justify-center text-accent-500">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-accent-secondary-soft text-accent-secondary text-xs font-semibold">
                        {srv.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl text-ink-primary font-normal mb-2">
                      {srv.title}
                    </h3>

                    <p className="text-sm text-ink-body leading-relaxed mb-6">
                      {srv.tagline}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-[rgba(13,37,61,0.08)] mb-6">
                      {srv.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-ink-body">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent-secondary shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link href={srv.href} className="text-xs font-semibold text-accent-500 hover:underline flex items-center gap-1">
                      <span>{srv.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Early Access Practice (Tier 2 - Gold) */}
      <section className="py-16 md:py-24 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <AnimatedSection className="rounded-2xl border border-[rgba(184,134,11,0.3)] bg-gold-50/50 p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-tertiary-soft text-accent-tertiary text-xs font-semibold">
                  Early Access Program
                </div>
                <h3 className="font-display text-3xl text-ink-primary font-normal">
                  Enterprise AI Modernization & Transformation
                </h3>
                <p className="text-base text-ink-body leading-relaxed">
                  Comprehensive technical audit and modernization roadmap to integrate AI workflows into legacy enterprise software and operational pipelines. We are currently onboarding select enterprise pilot partners.
                </p>
              </div>
              <div className="shrink-0 w-full sm:w-auto">
                <Link href="/contact?service=enterprise-transformation">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    <span>Apply for pilot onboarding</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Engagement Model */}
      <section className="py-20 md:py-28 bg-canvas-base border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="max-w-2xl mb-14 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-secondary-soft text-accent-secondary text-xs font-semibold mb-4">
              Engagement Lifecycle
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-ink-primary font-normal leading-tight">
              How we partner with your team.
            </h2>
            <p className="mt-3 text-lg text-ink-body leading-relaxed">
              Fast, transparent, and milestone-driven from initial architecture audit to production rollout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ENGAGEMENT_STEPS.map((step, idx) => (
              <div key={idx} className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-accent-50 text-accent-500 font-display text-lg font-bold flex items-center justify-center mb-4">
                  {step.step}
                </div>
                <h3 className="font-display text-2xl text-ink-primary font-normal mb-2">{step.title}</h3>
                <p className="text-sm text-ink-body leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 md:py-24 bg-canvas-paper">
        <Container size="narrow">
          <div className="text-center space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
              Have a complex architecture requirement?
            </h2>
            <p className="text-base text-ink-body max-w-xl mx-auto leading-relaxed">
              Schedule a 30-minute technical consultation directly with our lead AI systems architect.
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  <span>Schedule technical consultation</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}