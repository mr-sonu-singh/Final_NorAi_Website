import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Heading } from '@/components/foundation/Heading';
import {
  Reveal,
  StaggerGrid,
  StaggerItem,
  AnimatedSection,
  TextReveal,
} from '@/components/foundation';
import { MeshGradient } from '@/components/atoms/MeshGradient';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { buildMetadata, getBreadcrumbListJsonLd, JsonLd } from '@/lib/seo';
import {
  ArrowRight,
  ArrowUpRight,
  Code,
  Compass,
  Cpu,
  MapPin,
  Users,
  Workflow,
  Lightbulb,
  ShieldCheck,
  Zap,
  Clock,
} from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  path: '/careers',
  title: 'Engineering Careers',
  description:
    'Open engineering roles at NorAI Technologies in Uttar Pradesh, building browser tools and high-reliability AI systems for real users.',
});

const PRACTICE_AREAS = [
  {
    title: 'AI Product & Micro-SaaS Engineering',
    role: 'AI Product Engineer',
    desc: 'Build sub-second REST API endpoints and interactive web workbenches for parsing, summarization, and data digestion utilities.',
    tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Zod', 'REST APIs'],
    icon: Code,
    mailSubject: 'AI Product & Micro-SaaS Engineering',
    type: 'Full-time · Remote (India)',
  },
  {
    title: 'Enterprise AI & RAG Orchestration',
    role: 'RAG Orchestration Engineer',
    desc: 'Engineer custom conversational pipelines, hybrid vector search indices, and Model Context Protocol (MCP) tool servers.',
    tags: ['Python', 'vLLM', 'MCP Protocol', 'Qdrant / Milvus', 'LangGraph'],
    icon: Cpu,
    mailSubject: 'Enterprise AI & RAG Orchestration',
    type: 'Full-time · Remote (India)',
  },
  {
    title: 'Workflow & System Automation',
    role: 'Automation Engineer',
    desc: 'Design fault-tolerant background queues, webhook ingestion systems, and automated enterprise data synchronization pipelines.',
    tags: ['Node.js / Python', 'Redis / BullMQ', 'Docker', 'PostgreSQL', 'Webhooks'],
    icon: Workflow,
    mailSubject: 'Workflow & System Automation',
    type: 'Full-time · Remote (India)',
  },
];

const PERKS = [
  {
    icon: MapPin,
    tone: 'text-accent-secondary bg-sage-100/70 border border-accent-secondary/20',
    title: 'Work from anywhere in India',
    body: 'Remote-first engineering team with our physical development and research hub in Uttar Pradesh.',
  },
  {
    icon: Users,
    tone: 'text-gold-600 bg-gold-100 border border-gold-300/40',
    title: 'Lean team, direct ownership',
    body: 'Zero bureaucracy. Your code ships to production immediately and you own the feature lifecycle end-to-end.',
  },
  {
    icon: Zap,
    tone: 'text-accent-500 bg-accent-50 border border-accent-500/20',
    title: 'Tools people rely on daily',
    body: 'Your work directly powers live resume screening, student lecture digests, and regional employment gazettes.',
  },
  {
    icon: ShieldCheck,
    tone: 'text-accent-secondary bg-sage-100/70 border border-accent-secondary/20',
    title: 'High-craft engineering bar',
    body: 'Deterministic JSON schemas, < 0.35s latency SLAs, strict type-safety, and zero AI slop.',
  },
  {
    icon: Clock,
    tone: 'text-accent-500 bg-accent-50 border border-accent-500/20',
    title: 'Asynchronous flexibility',
    body: 'We measure output, rigor, and code reliability — not hours logged in a time tracker.',
  },
  {
    icon: Lightbulb,
    tone: 'text-gold-600 bg-gold-100 border border-gold-300/40',
    title: 'Competitive compensation',
    body: 'Transparent regional salaries, performance incentives, and hardware/learning allowances.',
  },
];

const HIRING_STEPS = [
  {
    number: '01',
    title: 'Async Work Sample',
    desc: 'A small, realistic engineering challenge (e.g. building a typed parser or optimizing a tool route) that respects your time.',
  },
  {
    number: '02',
    title: 'Technical Deep-Dive',
    desc: 'A 45-minute conversation with our core engineering team walking through your architecture decisions and trade-offs.',
  },
  {
    number: '03',
    title: 'Offer & Onboarding',
    desc: 'Clear, transparent compensation offer within 48 hours of final review. Seamless remote onboarding on day one.',
  },
];

export default function CareersPage() {
  const breadcrumbSchema = getBreadcrumbListJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Careers', path: '/careers' },
  ]);

  return (
    <div className="min-h-screen bg-canvas-base font-sans text-ink-primary selection:bg-accent-500 selection:text-white">
      <JsonLd schema={breadcrumbSchema} />

      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden bg-canvas-base border-b border-[rgba(13,37,61,0.08)]">
        <MeshGradient intensity="subtle" />

        <Container size="default" className="relative z-10">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
              <span>Engineering & Product Careers · Uttar Pradesh</span>
            </div>

            {/* Display H1 */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-ink-primary leading-[1.05] tracking-display">
              <TextReveal text="Do the best work of your career." splitBy="word" as="span" /> <br />
              <span className="italic text-accent-500 font-normal inline-block">
                <TextReveal text="From anywhere in India." splitBy="word" as="span" delay={0.12} />
              </span>
            </h1>

            {/* Lead Prose */}
            <p className="fluid-lead text-ink-body font-normal leading-relaxed max-w-2xl mx-auto text-pretty">
              We are a lean engineering team operating out of Uttar Pradesh, India. Zero
              bureaucracy, zero throwaway prototypes — just high-precision AI utilities that real
              people rely on every single day.
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          OPEN PRACTICE AREAS
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="max-w-2xl mb-12 text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
              <span>Open Engineering Roles</span>
            </div>
            <Heading as="h2" variant="display-lg" className="text-ink-primary">
              Where we are hiring
            </Heading>
            <p className="fluid-body text-ink-body leading-relaxed max-w-xl text-pretty">
              We keep our team small on purpose. If your craft aligns with one of our core practices
              below, we would love to review your work and past code repositories.
            </p>
          </div>

          <StaggerGrid className="space-y-4" stagger={0.06}>
            {PRACTICE_AREAS.map((area) => (
              <StaggerItem key={area.title}>
                <article
                  aria-labelledby={`role-${area.role.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group rounded-2xl border border-[rgba(13,37,61,0.1)] bg-canvas-base/80 p-6 md:p-8 shadow-sm hover:shadow-md hover:border-accent-500/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-5">
                    <span className="mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-canvas-paper text-accent-500 border border-[rgba(13,37,61,0.08)] shadow-sm group-hover:bg-accent-50 group-hover:text-accent-600 transition-colors">
                      <area.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div className="space-y-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5 mb-1">
                          <h3
                            id={`role-${area.role.toLowerCase().replace(/\s+/g, '-')}`}
                            className="font-display text-2xl text-ink-primary font-normal"
                          >
                            {area.title}
                          </h3>
                          <span className="font-mono text-xs font-medium text-accent-secondary bg-sage-100/70 border border-accent-secondary/20 px-2 py-0.5 rounded">
                            {area.type}
                          </span>
                        </div>
                        <p className="max-w-2xl text-sm leading-relaxed text-ink-body">
                          {area.desc}
                        </p>
                      </div>

                      {/* Tech stack tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {area.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[11px] font-medium px-2.5 py-0.5 rounded bg-canvas-paper border border-[rgba(13,37,61,0.06)] text-ink-secondary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a
                    href={`mailto:noraitechnologies@gmail.com?subject=${encodeURIComponent(`Application: ${area.mailSubject}`)}`}
                    className="inline-flex shrink-0 items-center justify-center gap-2 self-start lg:self-auto rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow-accent transition-all duration-150 hover:bg-accent-600 hover:shadow-hover active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-500 focus-visible:ring-offset-bg-page"
                  >
                    <span>Apply for {area.role}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          CULTURE & HOW WE WORK
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-canvas-base border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="max-w-3xl mb-14 text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
              <span>Engineering Culture</span>
            </div>
            <Heading as="h2" variant="display-lg" className="text-ink-primary">
              Built for craft, speed, and real utility
            </Heading>
            <p className="fluid-body text-ink-body leading-relaxed text-pretty">
              NorAI builds software that solves unglamorous problems exceptionally well: screening
              hundreds of resumes in sub-second bursts, turning multi-hour lectures into revision
              cards, distilling noisy community channels into action points, and clustering
              vernacular news feeds.
            </p>
          </div>

          {/* Perks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERKS.map((perk) => (
              <div
                key={perk.title}
                className="rounded-2xl border border-[rgba(13,37,61,0.08)] bg-canvas-paper p-6 shadow-sm hover:shadow-md hover:border-accent-500/30 transition-all duration-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${perk.tone}`}
                  >
                    <perk.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold text-ink-primary">{perk.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-body">{perk.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          OUR HIRING PROCESS
          ========================================================================= */}
      <AnimatedSection className="py-20 md:py-28 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="max-w-2xl mb-14 text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
              <span>Transparent Process</span>
            </div>
            <Heading as="h2" variant="display-lg" className="text-ink-primary">
              How we hire
            </Heading>
            <p className="fluid-body text-ink-body leading-relaxed max-w-xl text-pretty">
              We respect your time. No 6-round marathon interviews, no whiteboard trivia — just
              direct technical evaluation of what you have built and can build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HIRING_STEPS.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-[rgba(13,37,61,0.08)] bg-canvas-base p-7 shadow-sm space-y-4 relative"
              >
                <span className="font-mono text-3xl font-bold text-accent-500/40 tabular-nums block">
                  {step.number}
                </span>
                <h3 className="font-display text-2xl text-ink-primary font-normal">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-body">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      {/* =========================================================================
          GENERAL APPLICATION CTA
          ========================================================================= */}
      <aside
        aria-label="General Application"
        role="complementary"
        className="py-20 md:py-28 bg-canvas-base"
      >
        <Container size="narrow">
          <Reveal>
            <div className="rounded-3xl border border-[rgba(13,37,61,0.12)] bg-canvas-paper p-8 sm:p-12 text-center shadow-lg space-y-6 relative overflow-hidden">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-600 border border-gold-300/40">
                <Compass className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="space-y-3">
                <Heading as="h2" variant="display-md" className="text-ink-primary">
                  Nothing that fits your exact title?
                </Heading>
                <p className="fluid-body text-ink-body leading-relaxed max-w-lg mx-auto text-pretty">
                  We are always eager to connect with exceptional full-stack engineers, AI
                  researchers, and systems builders. Tell us about the hardest problem you have
                  solved.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto justify-center group shadow-accent hover:shadow-hover"
                  >
                    <span>Send general application</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <a
                  href="mailto:noraitechnologies@gmail.com?subject=General%20application"
                  className="w-full sm:w-auto inline-flex items-center justify-center font-sans font-medium h-11 px-4 rounded-md border border-[rgba(13,37,61,0.15)] text-ink-primary hover:bg-canvas-recessed text-sm transition-colors"
                >
                  Email founders directly
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </aside>
    </div>
  );
}
