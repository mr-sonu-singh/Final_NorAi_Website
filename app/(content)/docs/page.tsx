import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/foundation';
import { Link } from '@/components/atoms/Link';
import { buildMetadata } from '@/lib/seo';
import { ArrowRight, BookOpen, Braces, Cpu, FileSearch, Layers } from 'lucide-react';


export const metadata: Metadata = buildMetadata({
  path: '/docs',
  title: 'Documentation & Integration Guide — NorAi Technologies',
  description:
    'Conceptual documentation and getting started guide for NorAi self-serve micro-SaaS utilities and API integration patterns.',
});

const QUICK_START = [
  {
    step: '1',
    title: 'Dashboard access',
    body: 'Sign up for a self-serve account and access your product dashboard to configure input parameters.',
  },
  {
    step: '2',
    title: 'Payload ingestion',
    body: 'Submit text payloads, resume documents, lecture transcripts, or channel feeds for processing.',
  },
  {
    step: '3',
    title: 'Structured response',
    body: 'Receive verified JSON outputs, structured summary briefs, or flashcard decks.',
  },
];

const TOOL_DOCS = [
  {
    id: 'resume-shortlister',
    icon: FileSearch,
    category: 'Recruitment AI',
    name: 'AI Resume Shortlister',
    description:
      'Parses PDF, Word, and text resumes against custom job requirement specifications. Returns an objective candidate qualification score, skill breakdown, and candidate match summary.',
    meta: 'Supported formats: PDF, DOCX, TXT',
    href: '/products/resume-shortlister',
    linkText: 'Resume Shortlister documentation',
  },
  {
    id: 'course-note-taker',
    icon: BookOpen,
    category: 'EdTech AI',
    name: 'AI Course Note-Taker',

    description:
      'Converts lecture audio tracks, video transcripts, and educational documents into structured chapter outlines, core concept definitions, and interactive digital flashcards.',
    meta: 'Export formats: Markdown, PDF, JSON',
    href: '/products/course-note-taker',
    linkText: 'Course Note-Taker documentation',
  },
  {
    id: 'chat-digest',
    icon: Cpu,
    category: 'Community AI',
    name: 'Chat Digest & Newsletter AI',
    description:
      'Aggregates daily channel transcript exports from public community spaces. Filters out noise and casual chatter to extract customer feedback, bug reports, and key discussion highlights into daily executive briefs.',
    meta: 'Input sources: Public transcripts & webhooks',
    href: '/products/chat-digest',
    linkText: 'Chat Digest documentation',
  },
  {
    id: 'news-aggregator',
    icon: Layers,
    category: 'Media AI',
    name: 'Smart News Aggregator',
    description:
      'Curates regional news feeds, press releases, and market updates by topic and sentiment. Groups syndicated articles into single topic clusters for efficient media monitoring.',
    meta: 'Features: Topic clustering & sentiment tagging',
    href: '/products/news-aggregator',
    linkText: 'News Aggregator documentation',
  },
];

const RESPONSE_FIELDS = [
  { field: 'score', type: 'number', desc: 'Overall match score from 0 to 100' },
  { field: 'skills', type: 'array', desc: 'Detected skills with per-skill confidence' },
  { field: 'summary', type: 'string', desc: 'Short written match rationale' },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-canvas-base font-sans text-ink-primary">
      {/* Header */}
      <Section className="relative overflow-hidden border-b border-line-subtle pb-12 pt-12 md:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-canvas-paper [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <Container size="default" className="relative z-10">
          <div className="mx-auto max-w-3xl space-y-5 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-line-subtle bg-canvas-pure px-3 py-1 text-[13px] font-medium text-ink-secondary">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Developer documentation
            </p>
            <Heading as="h1" variant="display-xl" className="text-balance text-ink-primary">
              Developer documentation.
            </Heading>
            <Text variant="body-lg" as="p" className="mx-auto max-w-xl leading-relaxed text-ink-body">
              Getting-started overview, product concepts, and integration patterns for every NorAi
              self-serve tool.
            </Text>
          </div>
        </Container>
      </Section>

      {/* Quick start */}
      <Section variant="sunken" className="py-14">
        <Container size="default">
          <Reveal className="mx-auto max-w-2xl space-y-2">
            <Heading as="h2" variant="heading-xl" className="text-balance text-ink-primary">
              How integration works
            </Heading>
            <Text variant="body-md" className="text-ink-body">
              Every NorAi micro-tool follows the same three-stage workflow.
            </Text>
          </Reveal>

          <StaggerGrid className="grid grid-cols-1 gap-6 pt-10 md:grid-cols-3" stagger={0.06}>
            {QUICK_START.map((step) => (
              <StaggerItem key={step.step}>
                <div className="flex h-full gap-4 rounded-xl border border-line-subtle bg-canvas-paper p-6 shadow-sm">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terra-100 text-sm font-semibold tabular-nums text-terra-600">
                    {step.step}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-[15px] font-semibold text-ink-primary">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-body">{step.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </Section>

      {/* Tool reference cards */}
      <Section className="py-16">
        <Container size="default">
          <Reveal className="mx-auto max-w-2xl space-y-2 pb-10">
            <Heading as="h2" variant="heading-xl" className="text-balance text-ink-primary">
              Tool reference guides
            </Heading>
            <Text variant="body-md" className="text-ink-body">
              One card per tool — what it does, what it accepts, and where the full docs live.
            </Text>
          </Reveal>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {TOOL_DOCS.map((tool) => (
              <Reveal key={tool.id} className="h-full">
                <article
                  id={tool.id}
                  className="flex h-full flex-col rounded-xl border border-line-subtle bg-canvas-paper p-6 shadow-sm transition-shadow duration-300 hover:shadow-hover"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-canvas-recessed text-ink-primary">
                      <tool.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-ink-secondary">
                        {tool.category}
                      </p>
                      <h3 className="font-display text-xl leading-snug text-ink-primary">{tool.name}</h3>
                    </div>
                  </div>

                  <p className="flex-1 pt-4 text-sm leading-relaxed text-ink-body">{tool.description}</p>

                  <p className="border-t border-line-subtle pt-3 text-[13px] font-medium text-ink-secondary [font-feature-settings:'tnum']">
                    {tool.meta}
                  </p>

                  <Link
                    href={tool.href}
                    variant="standalone"
                    aria-label={`${tool.linkText} — opens the ${tool.name} product page`}
                    className="pt-4 text-sm"
                  >
                    {tool.linkText} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Response shape */}
      <Section variant="sunken" className="py-14">
        <Container size="narrow">
          <Reveal className="space-y-6">
            <div className="space-y-2">
              <Heading as="h2" variant="heading-xl" className="text-balance text-ink-primary">
                What a response looks like
              </Heading>
              <Text variant="body-md" className="text-ink-body">
                Tools return predictable JSON so your integration stays simple. A screening result,
                for example:
              </Text>
            </div>

            <pre className="overflow-x-auto rounded-xl border border-line-subtle bg-canvas-pure p-5 shadow-sm">
              <code className="font-mono text-[13px] leading-relaxed text-ink-body">{`{
  "score": 87,
  "skills": [
    { "name": "React", "confidence": 0.96 },
    { "name": "Node.js", "confidence": 0.91 }
  ],
  "summary": "Strong frontend profile; matches 9 of 11 requirements."
}`}</code>
            </pre>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {RESPONSE_FIELDS.map((f) => (
                <li key={f.field} className="rounded-lg border border-line-subtle bg-canvas-paper p-4">
                  <p className="font-mono text-[13px] font-semibold text-terra-600">{f.field}</p>
                  <p className="text-xs font-medium text-ink-secondary">{f.type}</p>
                  <p className="pt-1 text-sm leading-relaxed text-ink-body">{f.desc}</p>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-sm text-ink-body">
              <Braces className="h-4 w-4 text-ink-secondary" aria-hidden="true" />
              Looking for something custom?{' '}
              <Link href="/contact" variant="inline" aria-label="Ask our team about custom integrations">
                Ask us about custom integrations
              </Link>
              .
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
