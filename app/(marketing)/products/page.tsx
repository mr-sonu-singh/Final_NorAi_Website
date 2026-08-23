'use client';

import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { AnimatedSection } from '@/components/foundation/AnimatedSection';
import { MeshGradient } from '@/components/atoms/MeshGradient';

import {
  FileText,
  Headphones,
  MessageSquare,
  Newspaper,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const PRODUCTS = [
  {
    id: 'resume-shortlister',
    slug: 'ai-resume-shortlister',
    title: 'AI Resume Shortlister',
    category: 'Recruitment AI',
    tagline: 'Parse, score, and rank hundreds of candidate resumes against job specifications in seconds.',
    latency: '< 0.35s',
    color: 'accent',
    icon: FileText,
    features: [
      'Multi-format parsing (PDF, DOCX, TXT)',
      'Deterministic skill & experience matching',
      'Structured JSON scorecard & ATS integration',
      'Ephemeral in-memory data processing',
    ],
    cta: 'Try Resume Shortlister',
  },
  {
    id: 'course-note-taker',
    slug: 'course-note-taker',
    title: 'Course Note-Taker',
    category: 'EdTech & Study AI',
    tagline: 'Transform raw video lectures, audio recordings, and slides into executive study notes and flashcards.',
    latency: '< 0.8s',
    color: 'sage',
    icon: Headphones,
    features: [
      'Multi-speaker audio transcription',
      'Automatic key concept & formula extraction',
      'Interactive flashcard generation',
      'Markdown & Notion export ready',
    ],
    cta: 'Explore Course Note-Taker',
  },
  {
    id: 'community-chat-digest',
    slug: 'community-chat-digest',
    title: 'Community Chat Digest',
    category: 'Community Intelligence',
    tagline: 'Condense noisy Telegram, Discord, and Slack channels into daily executive briefs highlighting actionable bugs and sentiment.',
    latency: '< 0.5s',
    color: 'gold',
    icon: MessageSquare,
    features: [
      'Channel noise & spam filtering',
      'Automated issue & bug categorization',
      'Daily morning digest via email or webhook',
      'Sentiment trend analysis',
    ],
    cta: 'Explore Chat Digest',
  },
  {
    id: 'smart-dainik-news',
    slug: 'smart-dainik-news',
    title: 'Smart Dainik News',
    category: 'Regional Intelligence',
    tagline: 'Curate hyper-local regional news and market updates filtered by sentiment, relevance, and interest categories.',
    latency: '< 0.25s',
    color: 'accent',
    icon: Newspaper,
    features: [
      'Multilingual regional language translation',
      'Clickbait & sensationalism removal',
      'Category & sentiment-based tagging',
      'Custom webhook feeds for media apps',
    ],
    cta: 'Explore Dainik News',
  },
];

export default function ProductsPage() {
  return (
    <div className="text-ink-primary min-h-screen font-sans bg-canvas-base selection:bg-accent-500 selection:text-white">
      {/* Editorial Hero Header */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-20 overflow-hidden border-b border-[rgba(13,37,61,0.08)]">
        <MeshGradient intensity="subtle" />

        <Container size="default" className="relative z-10">
          <div className="max-w-3xl text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-[rgba(194,85,58,0.2)] text-accent-500 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Self-Serve Utilities</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal text-ink-primary leading-tight tracking-tight">
              Four tools. <br />
              <span className="italic text-accent-500 font-normal">Each solves one problem.</span>
            </h1>

            <p className="text-lg md:text-xl text-ink-body leading-relaxed max-w-2xl font-normal">
              Autonomous micro-SaaS utilities engineered for high-volume operational workflows. No complex onboarding or platform bloat. Deploy in minutes.
            </p>

            <div className="pt-2 flex flex-wrap gap-6 text-xs text-ink-secondary font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent-secondary" />
                <span>Zero data retention</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent-secondary" />
                <span>Sub-second execution</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-accent-secondary" />
                <span>REST API & Web UI</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Asymmetric Product Catalog */}
      <section className="py-16 md:py-24 bg-canvas-base">
        <Container size="default">
          <div className="space-y-12">
            {PRODUCTS.map((product, idx) => {
              const IconComp = product.icon;
              const isEven = idx % 2 === 0;

              return (
                <AnimatedSection
                  key={product.id}
                  className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 md:p-12 shadow-sm hover:shadow-md transition-all"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                    {/* Text Details Column */}
                    <div className={`lg:col-span-7 space-y-6 ${isEven ? '' : 'lg:col-start-6'}`}>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-canvas-recessed text-ink-body text-xs font-semibold">
                          {product.category}
                        </span>
                        <span className="text-xs font-semibold text-accent-secondary flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5" />
                          {product.latency} latency
                        </span>
                      </div>

                      <h2 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
                        {product.title}
                      </h2>

                      <p className="text-base text-ink-body leading-relaxed">
                        {product.tagline}
                      </p>

                      {/* Feature Bullet List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {product.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-sm text-ink-body">
                            <CheckCircle2 className="w-4 h-4 text-accent-secondary shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <Link href={`/products/${product.slug}`}>
                          <Button variant="primary" size="md" className="group">
                            <span>{product.cta}</span>
                            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                        <Link href="/pricing">
                          <Button variant="secondary" size="md">
                            View Pricing
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Visual Mockup Column */}
                    <div className={`lg:col-span-5 ${isEven ? '' : 'lg:col-start-1'}`}>
                      <div className="rounded-2xl bg-canvas-recessed/60 border border-[rgba(13,37,61,0.08)] p-6 text-left">
                        <div className="w-12 h-12 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.08)] flex items-center justify-center text-accent-500 mb-4 shadow-sm">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <h4 className="font-display text-lg text-ink-primary font-normal">
                          {product.title} Overview
                        </h4>
                        <p className="mt-1 text-xs text-ink-secondary">
                          Deterministic neural pipeline ready for instant execution.
                        </p>

                        {/* Monolinear Diagram Box */}
                        <div className="mt-4 pt-4 border-t border-[rgba(13,37,61,0.08)] space-y-2">
                          <div className="flex items-center justify-between text-xs p-2 rounded bg-canvas-paper border border-[rgba(13,37,61,0.06)]">
                            <span className="text-ink-body">Input Format</span>
                            <span className="font-mono text-ink-primary font-medium">Standard REST / File</span>
                          </div>
                          <div className="flex items-center justify-between text-xs p-2 rounded bg-canvas-paper border border-[rgba(13,37,61,0.06)]">
                            <span className="text-ink-body">Output Delivery</span>
                            <span className="font-mono text-accent-secondary font-medium">Structured JSON</span>
                          </div>
                          <div className="flex items-center justify-between text-xs p-2 rounded bg-canvas-paper border border-[rgba(13,37,61,0.06)]">
                            <span className="text-ink-body">Data Security</span>
                            <span className="font-mono text-accent-500 font-medium">In-Memory Ephemeral</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bottom Scoping Banner */}
      <section className="py-20 md:py-24 bg-canvas-paper border-t border-[rgba(13,37,61,0.08)]">
        <Container size="narrow">
          <div className="text-center space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
              Need a custom AI tool for your workflow?
            </h2>
            <p className="text-base text-ink-body max-w-xl mx-auto leading-relaxed">
              We design, build, and deploy specialized enterprise automation pipelines with dedicated infrastructure and strict SLAs.
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  <span>Scope custom solution</span>
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