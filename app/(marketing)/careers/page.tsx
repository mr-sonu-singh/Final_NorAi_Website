import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/foundation';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { buildMetadata } from '@/lib/seo';
import { ArrowRight, ArrowUpRight, Code, Compass, Cpu, MapPin, Sparkles, Users, Workflow } from 'lucide-react';

export const metadata = buildMetadata({
  title: 'Careers | NorAi Technologies',
  description:
    'Join NorAi Technologies — building micro-SaaS utilities and enterprise AI automation pipelines out of Uttar Pradesh, India.',
  path: '/careers',
});

const PRACTICE_AREAS = [
  {
    title: 'AI Product & Micro-SaaS Engineering',
    role: 'AI Product Engineer',
    desc: 'Building sub-second REST API endpoints and web dashboards for parsing, summarization, and data digestion utilities.',
    icon: Code,
    mailSubject: 'AI Product & Micro-SaaS Engineering',
  },
  {
    title: 'Enterprise AI & RAG Orchestration',
    role: 'RAG Orchestration Engineer',
    desc: 'Engineering custom conversational agents, vector search indexes, and Model Context Protocol (MCP) tool servers.',
    icon: Cpu,
    mailSubject: 'Enterprise AI & RAG Orchestration',
  },
  {
    title: 'Workflow & System Automation',
    role: 'Automation Engineer',
    desc: 'Designing fault-tolerant background worker queues, ERP ingestion webhooks, and automated data pipelines.',
    icon: Workflow,
    mailSubject: 'Workflow & System Automation',
  },
];

const PERKS = [
  {
    icon: MapPin,
    tone: 'text-sage-600 bg-sage-100',
    title: 'Work from anywhere in India',
    body: 'Remote-friendly engineering with a home base in Uttar Pradesh.',
  },
  {
    icon: Users,
    tone: 'text-gold-600 bg-gold-100',
    title: 'Lean team, real ownership',
    body: 'No layers of management — your code ships to production and stays yours.',
  },
  {
    icon: Sparkles,
    tone: 'text-terra-600 bg-terra-100',
    title: 'Tools people use daily',
    body: 'Your work powers resume screens, lecture notes, digests, and news briefs every day.',
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-canvas-base font-sans text-ink-primary">
      {/* Hero */}
      <Section className="relative overflow-hidden pb-14 pt-12 md:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-canvas-paper [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <Container size="default" className="relative z-10">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-line-subtle bg-canvas-pure px-3 py-1 text-[13px] font-medium text-ink-secondary">
              Careers
            </p>
            <Heading as="h1" variant="display-xl" className="text-balance text-ink-primary">
              Do the best work of your life — from anywhere in India.
            </Heading>
            <Text variant="body-lg" as="p" className="mx-auto max-w-xl leading-relaxed text-ink-body">
              We are a lean engineering and product team operating out of Uttar Pradesh, India. No
              bloated process, no throwaway work — just practical AI products that people rely on
              every day.
            </Text>
          </div>
        </Container>
      </Section>

      {/* Culture */}
      <Section variant="sunken" className="py-16">
        <Container size="narrow">
          <Reveal className="space-y-6">
            <Heading as="h2" variant="display-md" className="text-balance text-ink-primary">
              How we work
            </Heading>
            <div className="space-y-4 leading-[1.75] text-ink-body">
              <p>
                NorAi builds tools that solve unglamorous problems well: screening resumes in
                seconds instead of hours, turning three-hour lectures into revision-ready notes,
                distilling noisy community chats into executive briefs, and clustering regional
                news into something readable.
              </p>
              <p>
                The team is small on purpose. Engineers talk directly to the people using what they
                build, decisions happen in hours rather than weeks, and everyone owns a slice of
                the product from design through production.
              </p>
            </div>
          </Reveal>

          {/* Perks strip */}
          <StaggerGrid className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-3" stagger={0.06}>
            {PERKS.map((perk) => (
              <StaggerItem key={perk.title}>
                <div className="flex h-full flex-col gap-3 rounded-xl border border-line-subtle bg-canvas-paper p-5 shadow-sm">
                  <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${perk.tone}`}>
                    <perk.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-[15px] font-semibold text-ink-primary">{perk.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-body">{perk.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </Section>

      {/* Open roles */}
      <Section className="py-16 lg:py-20">
        <Container size="default">
          <div className="mb-10 max-w-2xl space-y-3">
            <Heading as="h2" variant="display-md" className="text-balance text-ink-primary">
              Where we are hiring
            </Heading>
            <Text variant="body-md" className="leading-relaxed text-ink-body">
              We do not always run formal job posts. If your craft fits one of these practices,
              we would like to hear from you.
            </Text>
          </div>

          <StaggerGrid className="space-y-3" stagger={0.06}>
            {PRACTICE_AREAS.map((area) => (
              <StaggerItem key={area.title}>
                <div className="group flex flex-col gap-4 rounded-xl border border-line-subtle bg-canvas-paper p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-hover sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-canvas-recessed text-ink-primary transition-colors duration-300 group-hover:bg-terra-50 group-hover:text-terra-600">
                      <area.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-ink-primary">{area.title}</h3>
                      <p className="max-w-xl text-sm leading-relaxed text-ink-body">{area.desc}</p>
                      <p className="inline-flex items-center gap-1.5 pt-1 text-[13px] font-medium text-ink-secondary">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        Remote (India) · Uttar Pradesh hub
                      </p>
                    </div>
                  </div>
                  <a
                    href={`mailto:noraitechnologies@gmail.com?subject=${encodeURIComponent(`Application: ${area.mailSubject}`)}`}
                    className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-md border border-line-default bg-canvas-pure px-4 py-2.5 text-sm font-semibold text-ink-primary transition-colors duration-200 hover:border-terra-500 hover:text-terra-600 sm:self-auto"
                  >
                    Apply for {area.role}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </Section>

      {/* General applications */}
      <Section variant="sunken" className="py-16">
        <Container size="narrow">
          <Reveal>
            <div className="space-y-5 rounded-2xl border border-line-subtle bg-canvas-paper p-8 text-center shadow-sm sm:p-10">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold-100 text-gold-600">
                <Compass className="h-5 w-5" aria-hidden="true" />
              </span>
              <Heading as="h2" variant="heading-xl" className="text-balance text-ink-primary">
                Nothing that fits? Introduce yourself anyway.
              </Heading>
              <Text variant="body-sm" as="p" className="mx-auto max-w-xl leading-relaxed text-ink-body">
                We are always open to connecting with exceptional full-stack developers, AI pipeline
                engineers, and product designers. Tell us what you have built and what you want to
                build next.
              </Text>
              <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
                <Link href="/contact" variant="unstyled" aria-label="Send a general application via our contact form">
                  <Button variant="primary" size="lg">
                    Send a general application <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
                <a
                  href="mailto:noraitechnologies@gmail.com?subject=General%20application"
                  className="text-sm font-semibold text-ink-secondary underline underline-offset-4 transition-colors duration-200 hover:text-ink-primary"
                >
                  or email noraitechnologies@gmail.com
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
