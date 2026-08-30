import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { MeshGradient } from '@/components/atoms/MeshGradient';
import {
  Users,
  ArrowRight,
  BookOpen,
  MapPin,
  CheckCircle2,
  Terminal,
  Sparkles,
  School,
} from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/mission',
  title: 'AI Skill Mission & Youth Enablement — NorAI Technologies',
  description:
    'Democratizing deterministic AI engineering across Tier-2/3 cities, regional colleges, and rural youth in Uttar Pradesh and Bharat.',
});

const WORKSHOP_MODULES = [
  {
    module: 'Module 01',
    title: 'Model Context Protocol (MCP) & Agent Tooling',
    desc: 'Move beyond simple prompt wrappers. Learn to write type-safe MCP servers in TypeScript and Python that connect LLMs directly to APIs, databases, and local systems.',
    tags: ['MCP Standard', 'JSON Schemas', 'Tool Sandboxing'],
  },
  {
    module: 'Module 02',
    title: 'Local Neural Inference & Optimization',
    desc: 'How to run, quantize, and serve open-weights models (Llama, Mistral, Gemma) locally using vLLM and Ollama on budget hardware with sub-second latency.',
    tags: ['vLLM', 'Model Quantization', 'In-RAM Serving'],
  },
  {
    module: 'Module 03',
    title: 'High-Accuracy RAG & Vector Retrieval',
    desc: 'Build hybrid dense + sparse retrieval engines using PostgreSQL (pgvector) and Qdrant. Eliminate hallucinations with deterministic context grounding.',
    tags: ['pgvector', 'Hybrid Search', 'Citation Grounding'],
  },
  {
    module: 'Module 04',
    title: 'Building & Deploying Micro-SaaS AI Tools',
    desc: 'From initial prototype to production Next.js 15 deployment. How to build full-stack AI utilities with streaming interfaces, rate limits, and zero data leaks.',
    tags: ['Next.js 15', 'TypeScript', 'Serverless APIs'],
  },
];

const INITIATIVE_PILLARS = [
  {
    icon: School,
    badge: 'Campus Outreach',
    title: 'On-Ground Campus Workshops',
    subtitle: 'Zero-cost technical bootcamps for regional colleges & polytechnics.',
    description:
      'We visit engineering campuses and degree colleges across Uttar Pradesh to deliver intensive 1-day and 2-day live coding masterclasses. Students build and deploy working AI tools during the session.',
    metrics: '15+ Campus Sessions Planned',
  },
  {
    icon: BookOpen,
    badge: 'Educational Subsidies',
    title: 'Free Student Tool Access',
    subtitle: 'High-grade AI tools made accessible to every learner.',
    description:
      'We provide 100% free scholar access to NorAI Course Note-Taker and Smart Dainik News for verified students, researchers, and government exam aspirants across regional India.',
    metrics: '100% Free Scholar Tier',
  },
  {
    icon: Users,
    badge: 'Direct Mentorship',
    title: 'Young Builders Fellowship',
    subtitle: 'Code reviews, architectural guidance, and project incubation.',
    description:
      'Our founding team conducts weekly virtual code reviews and provides dedicated mentorship for motivated students building open-source AI projects or launching regional tech initiatives.',
    metrics: '1-on-1 Founder Mentorship',
  },
];

export default function MissionPage() {
  const missionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: 'NorAI Skill Mission & Youth Enablement',
    description:
      'Empowering regional youth and Tier-2/3 college students across Uttar Pradesh with practical, deterministic AI engineering skills.',
    provider: {
      '@type': 'Organization',
      name: 'NorAI Technologies',
      url: 'https://norai.in',
    },
  };

  return (
    <div className="min-h-screen bg-canvas-base text-ink-primary font-sans selection:bg-accent-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(missionJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 border-b border-[rgba(13,37,61,0.08)] overflow-hidden">
        <MeshGradient intensity="subtle" />

        <Container size="default" className="relative z-10">
          <div className="max-w-4xl space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Social Impact & Youth Upliftment · Uttar Pradesh</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-ink-primary leading-[1.04] tracking-tight">
              Democratizing AI <br />
              <span className="italic text-accent-500 font-normal">beyond the metros.</span>
            </h1>

            <p className="text-lg md:text-xl text-ink-body leading-relaxed max-w-2xl font-normal">
              World-class AI capability shouldn&rsquo;t be confined to Tier-1 capital hubs. We take practical, production-grade AI engineering, open toolkits, and direct founder mentorship to young builders across regional India.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link href="#workshops">
                <Button variant="primary" size="lg" className="group">
                  <span>Explore Workshop Curriculum</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/contact?service=campus-workshop">
                <Button variant="secondary" size="lg">
                  Request Campus Session
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Manifesto / Editorial Body */}
      <Section className="py-16 md:py-24 border-b border-[rgba(13,37,61,0.08)] bg-canvas-base">
        <Container size="default">
          <div className="mx-auto max-w-[760px] space-y-6 text-[17px] leading-[1.8] text-ink-body text-left">
            <h2 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal leading-tight">
              The Reality: Why Regional Youth Need Real Engineering, Not Fluff
            </h2>

            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[64px] first-letter:leading-[0.85] first-letter:text-accent-500">
              Across Tier-2 and Tier-3 cities in India, thousands of ambitious computer science students and young professionals are sold overpriced &ldquo;Prompt Engineering&rdquo; and &ldquo;AI Guru&rdquo; courses. These programs teach trivial chat tricks that become obsolete within weeks, offering zero actual software engineering substance.
            </p>

            <p>
              At NorAI, we believe true empowerment comes from <strong>understanding the metal and the protocols</strong>. When a student in Gorakhpur, Lucknow, Varanasi, or Meerut learns how to deploy an isolated Model Context Protocol (MCP) server, tune a vector database, or write sub-second deterministic pipelines in TypeScript and Python, their career trajectory permanently shifts.
            </p>

            {/* Editorial Pull-Quote */}
            <figure className="my-12 border-y border-accent-500/20 py-8">
              <span aria-hidden="true" className="block font-display text-[72px] leading-none text-accent-500">
                &ldquo;
              </span>
              <blockquote className="-mt-6 font-display text-[26px] italic leading-snug text-ink-primary">
                Talent is evenly distributed; opportunity and technical truth are not. Our mission is to make real AI craftsmanship accessible to every motivated learner in Bharat.
              </blockquote>
              <figcaption className="mt-4 font-sans text-xs font-mono text-ink-secondary">
                NorAI Skill Mission Charter · Uttar Pradesh, India
              </figcaption>
            </figure>

            <p>
              Because we build and maintain our own commercial AI micro-SaaS utilities from Uttar Pradesh, everything we teach is grounded in production realities. No hypothetical slide decks—just real code, real error logs, and practical architectures that students can deploy immediately.
            </p>
          </div>
        </Container>
      </Section>

      {/* 3 Core Impact Initiatives */}
      <section className="py-16 md:py-24 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="max-w-2xl mb-14 text-left space-y-3">
            <h2 className="font-display text-4xl sm:text-5xl text-ink-primary font-normal">
              Three Pillars of Action.
            </h2>
            <p className="text-base text-ink-body">
              How the NorAI Skill Mission translates intent into tangible outcomes for students and educational institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
            {INITIATIVE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-3xl bg-canvas-base border border-[rgba(13,37,61,0.12)] p-8 shadow-sm flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                        {pillar.badge}
                      </span>
                      <Icon className="w-5 h-5 text-accent-500" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-display text-2xl text-ink-primary font-normal">
                        {pillar.title}
                      </h3>
                      <p className="text-xs font-mono text-accent-500">
                        {pillar.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-ink-body leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] flex items-center justify-between text-xs font-mono text-accent-secondary font-semibold">
                    <span>{pillar.metrics}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Workshop Curriculum Grid */}
      <section id="workshops" className="py-16 md:py-24 bg-canvas-base border-b border-[rgba(13,37,61,0.08)] scroll-mt-20">
        <Container size="default">
          <div className="max-w-2xl mb-14 text-left space-y-3">
            <span className="font-mono text-xs font-semibold text-accent-500 uppercase tracking-wider">
              Live Coding Masterclasses
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-ink-primary font-normal">
              What we teach on campus.
            </h2>
            <p className="text-base text-ink-body">
              Engineered specifically for undergraduate engineers, polytechnic students, and open-source contributors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {WORKSHOP_MODULES.map((mod) => (
              <div
                key={mod.module}
                className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm space-y-4 hover:border-accent-500/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-accent-500 uppercase tracking-wider">
                    {mod.module}
                  </span>
                  <Terminal className="w-4 h-4 text-ink-secondary" />
                </div>

                <h3 className="font-display text-2xl text-ink-primary font-normal">
                  {mod.title}
                </h3>

                <p className="text-sm text-ink-body leading-relaxed">
                  {mod.desc}
                </p>

                <div className="pt-3 flex flex-wrap gap-2">
                  {mod.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] px-2 py-0.5 rounded bg-canvas-recessed border border-[rgba(13,37,61,0.08)] text-ink-body"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pre-Footer Call to Action for Colleges & Community Leads */}
      <section className="py-20 md:py-28 bg-canvas-paper">
        <Container size="default">
          <div className="rounded-3xl bg-canvas-base border border-[rgba(13,37,61,0.12)] p-10 md:p-16 text-center shadow-lg relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-accent-50 border border-accent-500/20 text-accent-500 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-normal text-ink-primary leading-tight">
                Bring NorAI to your campus or community.
              </h2>

              <p className="text-base md:text-lg text-ink-body leading-relaxed">
                Are you a faculty member, department head, or student club lead at a regional college? Partner with us to organize a free, hands-on AI engineering masterclass for your students.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact?service=campus-workshop" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto group">
                    <span>Schedule a Campus Workshop</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/products/course-note-taker" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Try Free EdTech Tools
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
