import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Headphones,
  MessageSquare,
  Newspaper,
  Zap,
} from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  path: '/products',
  title: 'Autonomous AI Tools — NorAI Technologies',
  description:
    'Explore instant-deploy autonomous AI tools for resume shortlisting, course note-taking, community chat digests, and smart public gazette news. Free to start.',
});

const CATALOG_TOOLS = [
  {
    number: '01',
    slug: 'resume-shortlister',
    title: 'AI Resume Shortlister',
    category: 'Recruitment AI',
    tagline:
      'Screen hundreds of engineering resumes in seconds with sub-second vector scoring and weighted skills matching.',
    metric: '< 0.35s / PDF',
    inputFormat: 'PDF, DOCX, TXT',
    outputFormat: 'Ranked Scorecard & Validated JSON',
    highlights: [
      'Multi-format resume parsing with zero permanent storage',
      'Custom skill vector weighting and experience thresholds',
      'ATS-compatible structured JSON export',
    ],
    icon: FileText,
  },
  {
    number: '02',
    slug: 'course-note-taker',
    title: 'Course Note-Taker',
    category: 'EdTech & Study AI',
    tagline:
      'Transform raw lecture recordings, videos, and slide decks into executive study notes and interactive flashcards.',
    metric: 'Real-Time Audio NLP',
    inputFormat: 'MP3, WAV, MP4, YouTube',
    outputFormat: 'Markdown, Notion & SRS Flashcards',
    highlights: [
      'LaTeX math formula extraction and rendering',
      'Interactive 3D study flashcards with spaced repetition',
      '100% free scholar access for students',
    ],
    icon: Headphones,
  },
  {
    number: '03',
    slug: 'chat-digest',
    title: 'Community Chat Digest',
    category: 'Community AI',
    tagline:
      'Condense thousands of unread Discord, Slack, and Telegram messages into structured executive briefs.',
    metric: '2m Executive Brief',
    inputFormat: 'Discord, Slack, Telegram Exports',
    outputFormat: 'Daily Digest & Task Webhooks',
    highlights: [
      '94%+ message deduplication and token compression',
      'Action item extraction with automated assignee tagging',
      'Sentiment analysis and topic cluster summaries',
    ],
    icon: MessageSquare,
  },
  {
    number: '04',
    slug: 'smart-dainik-news',
    title: 'Smart Dainik News',
    category: 'Regional Intelligence',
    tagline:
      'Hyper-local regional news and public employment alerts clustered across Hindi and English feeds.',
    metric: 'Bilingual NLP Feeds',
    inputFormat: 'UP Gazette, Regional Wires, RSS',
    outputFormat: 'Verified Employment Alerts',
    highlights: [
      'Bi-directional Hindi/English public notification parsing',
      'Official UP public service commission alert verification',
      'Zero advertising clutter or clickbait filtering',
    ],
    icon: Newspaper,
  },
];

export default function ProductsPage() {
  return (
    <div className="text-text-primary min-h-screen font-sans bg-surface-canvas selection:bg-accent-primary selection:text-white">
      {/* Editorial Hero Header */}
      <section className="relative pt-16 pb-14 md:pt-24 md:pb-18 border-b border-border-subtle bg-surface-canvas">
        <Container size="default">
          <div className="max-w-3xl space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-primary/20 text-accent-primary text-xs font-mono font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>OPTION B · FREE TO START · NO CARD REQUIRED</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-text-primary leading-[1.05] tracking-display">
              Four tools. <br />
              <span className="italic text-accent-primary font-normal">
                Each solves one problem.
              </span>
            </h1>

            <p className="fluid-lead text-text-secondary leading-relaxed max-w-2xl font-normal text-pretty">
              Autonomous micro-SaaS utilities engineered for high-volume operational workflows. No
              complex onboarding, no forced contracts, and zero permanent data retention.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-text-secondary">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-panel border border-border-subtle">
                <ShieldCheck className="w-4 h-4 text-accent-secondary" />
                <span>Zero Data Retention</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-panel border border-border-subtle">
                <CheckCircle2 className="w-4 h-4 text-accent-secondary" />
                <span>Sub-Second Execution</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-panel border border-border-subtle">
                <CheckCircle2 className="w-4 h-4 text-accent-secondary" />
                <span>REST API & Web UI</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Scalable 4-Card Catalog Stage */}
      <section className="py-16 md:py-24 bg-surface-panel border-b border-border-subtle">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {CATALOG_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.slug}
                  className="rounded-2xl bg-surface-canvas border border-border-strong p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-accent-primary/40 transition-colors group"
                >
                  <div className="space-y-5">
                    {/* Card Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-surface-panel-subtle flex items-center justify-center text-text-primary group-hover:bg-accent-50 group-hover:text-accent-primary transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider block">
                            Tool {tool.number} · {tool.category}
                          </span>
                          <h2 className="font-display text-2xl sm:text-3xl text-text-primary font-normal">
                            {tool.title}
                          </h2>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold text-accent-secondary px-2.5 py-1 rounded bg-surface-panel border border-border-subtle">
                        {tool.metric}
                      </span>
                    </div>

                    <p className="text-sm text-text-secondary leading-relaxed">{tool.tagline}</p>

                    {/* Highlights List */}
                    <div className="space-y-2 pt-2 border-t border-border-subtle">
                      {tool.highlights.map((point, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-start gap-2 text-xs text-text-secondary"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent-secondary shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technical Specs Strip */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-3 border-t border-border-subtle">
                      <div className="p-2 rounded bg-surface-panel border border-border-subtle">
                        <span className="text-[10px] text-text-muted block">INPUT</span>
                        <span className="text-text-primary text-[11px]">{tool.inputFormat}</span>
                      </div>
                      <div className="p-2 rounded bg-surface-panel border border-border-subtle">
                        <span className="text-[10px] text-text-muted block">OUTPUT</span>
                        <span className="text-text-primary text-[11px] truncate block">
                          {tool.outputFormat}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-2 flex items-center justify-between border-t border-border-subtle">
                    <span className="font-mono text-xs text-text-muted">
                      Free to start · 50 sandbox credits
                    </span>
                    <Link href={`/products/${tool.slug}`}>
                      <Button
                        variant="primary"
                        size="md"
                        className="group/btn cursor-pointer whitespace-nowrap"
                      >
                        <span>Open Tool</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Pre-Footer Enterprise Scoping Console (No fake pricing links) */}
      <section className="py-16 md:py-24 bg-surface-canvas">
        <Container size="default">
          <div className="rounded-2xl bg-surface-panel border border-border-strong p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-semibold">
                High-Volume Capacity &amp; Private Deployments
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary leading-tight tracking-display">
                Need dedicated endpoints or private VPC hosting?
              </h2>
              <p className="fluid-body text-text-secondary leading-relaxed max-w-xl mx-auto text-pretty">
                All tools provide dedicated endpoints, custom rate limits, and isolated VPC
                instances for enterprise engineering teams.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/contact?service=enterprise-capacity" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto group cursor-pointer whitespace-nowrap"
                  >
                    <span>Talk to an engineer</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/docs" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto cursor-pointer whitespace-nowrap"
                  >
                    Read API documentation &rarr;
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
