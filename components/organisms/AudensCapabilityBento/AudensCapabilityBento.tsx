'use client';

import React, { useState } from 'react';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import {
  FileText,
  Headphones,
  MessageSquare,
  Newspaper,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  VignetteResumeScore,
  VignetteCourseNotes,
  VignetteChatDigest,
  VignetteDainikNews,
} from './vignettes';

interface BentoProductCardProps {
  number: string;
  badge: string;
  category: string;
  title: string;
  tagline: string;
  slug: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  icon: React.ComponentType<{ className?: string }>;
  vignette: React.ReactNode;
  features: string[];
  privacyNote: string;
}

const PRODUCTS: BentoProductCardProps[] = [
  {
    number: '01',
    badge: 'v1.0',
    category: 'Recruitment AI',
    title: 'AI Resume Shortlister',
    tagline:
      'Screen hundreds of engineering resumes against your exact rubric in seconds—zero bias, sub-second scoring, and zero stored candidate data.',
    slug: 'resume-shortlister',
    accentColor: '#2EFCC2',
    accentBg: 'rgba(46, 252, 194, 0.1)',
    accentBorder: 'rgba(46, 252, 194, 0.25)',
    icon: FileText,
    vignette: <VignetteResumeScore />,
    features: [
      'Sub-second semantic evaluation against custom technical job rubrics',
      'Instant qualification evidence extraction with direct line attribution',
      'One-click export directly to Greenhouse, Lever, and standard ATS tables',
    ],
    privacyNote: '100% Private: Resumes are processed in RAM and deleted immediately after scoring.',
  },
  {
    number: '02',
    badge: 'v1.0',
    category: 'EdTech & Study AI',
    title: 'Course Note-Taker',
    tagline:
      'Transform raw 2-hour lecture audio, whiteboard snaps, and slide PDFs into structured study outlines, LaTeX math, and interactive flashcards.',
    slug: 'course-note-taker',
    accentColor: '#D8B4FE',
    accentBg: 'rgba(216, 180, 254, 0.1)',
    accentBorder: 'rgba(216, 180, 254, 0.25)',
    icon: Headphones,
    vignette: <VignetteCourseNotes />,
    features: [
      'Real-time lecture speech transcription synchronized with slide timestamps',
      'Mathematical formulas rendered directly to clean, editable KaTeX and LaTeX',
      'Automated spaced-repetition flashcard generator exportable to Anki & Markdown',
    ],
    privacyNote: 'Zero Training: Your class recordings and course notes are never used to train public models.',
  },
  {
    number: '03',
    badge: 'v1.0',
    category: 'Community AI',
    title: 'Community Chat Digest',
    tagline:
      'Condense 4,800+ unread Discord, Slack, and Telegram messages into scannable 90-second executive action briefs with zero channel fatigue.',
    slug: 'chat-digest',
    accentColor: '#FFA07A',
    accentBg: 'rgba(255, 160, 122, 0.1)',
    accentBorder: 'rgba(255, 160, 122, 0.25)',
    icon: MessageSquare,
    vignette: <VignetteChatDigest />,
    features: [
      'Noise-filtering NLP that strips chit-chat to highlight decisions and PR merges',
      'Configurable cadence: hourly critical alerts or daily morning executive summaries',
      'Multi-platform ingestion across Discord channels, Slack teams, and Telegram groups',
    ],
    privacyNote: 'Encrypted Stream: Message bodies are processed in isolated RAM and purged post-digest.',
  },
  {
    number: '04',
    badge: 'v1.0',
    category: 'Regional Intelligence',
    title: 'Smart Dainik News',
    tagline:
      'Hyper-local public employment alerts and government gazette notifications clustered across Hindi and English feeds without spam or broken links.',
    slug: 'smart-dainik-news',
    accentColor: '#34D399',
    accentBg: 'rgba(52, 211, 153, 0.1)',
    accentBorder: 'rgba(52, 211, 153, 0.25)',
    icon: Newspaper,
    vignette: <VignetteDainikNews />,
    features: [
      'Direct verification against state gazettes across all 75 Uttar Pradesh districts',
      'Instant bilingual toggle between English and authentic Hindi notifications',
      'Zero phishing or clickbait: only verified government portal links are published',
    ],
    privacyNote: 'Direct Public Data: Real-time RSS and gazette feeds without ad trackers or paywalls.',
  },
];

function BentoCard({ product }: { product: BentoProductCardProps }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = product.icon;
  const drawerId = `drawer-${product.slug}`;

  return (
    <div
      className="product-card rounded-2xl bg-[#0D1017] border border-white/10 overflow-hidden flex flex-col justify-between transition-colors duration-200 hover:border-white/20 relative group"
      style={{
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Top Chrome Bar */}
      <div className="p-5 sm:p-6 pb-0 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            style={{ color: product.accentColor, backgroundColor: product.accentBg }}
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border border-white/10"
          >
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-xs font-bold text-text-primary tracking-wider">
              TOOL {product.number}
            </span>
            <span className="text-text-muted text-xs mx-1.5">·</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">
              {product.category}
            </span>
          </div>
        </div>

        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-text-secondary">
          {product.badge}
        </span>
      </div>

      {/* The Micro-Vignette Chassis */}
      <div className="p-5 sm:p-6 my-auto">
        {product.vignette}
      </div>

      {/* Typography & Plain-English Outcome */}
      <div className="p-5 sm:p-6 pt-0 space-y-2">
        <Link
          href={`/products/${product.slug}`}
          data-testid={`capability-link-${product.slug}`}
          className="group/title inline-block no-underline"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug group-hover/title:text-[var(--mint)] transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-text-secondary leading-relaxed text-pretty">
          {product.tagline}
        </p>

        {/* Progressive Disclosure Toggle */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls={drawerId}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-text-primary hover:text-white transition-colors duration-150 py-1.5 px-2.5 -ml-2.5 rounded-lg hover:bg-white/5 cursor-pointer active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#2EFCC2] focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080D]"
          >
            <span>{isExpanded ? 'Hide Details' : 'Read Full Details'}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Progressive Disclosure Drawer (100% semantic HTML retained in DOM) */}
        <div
          id={drawerId}
          data-expanded={isExpanded}
          className="bento-drawer-grid border-t border-white/5 mt-2"
        >
          <div className="bento-drawer-content pt-4 space-y-4">
            {/* Feature Checklist */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Engineered Capabilities
              </span>
              <ul className="space-y-2 text-xs text-text-secondary">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2
                      style={{ color: product.accentColor }}
                      className="w-4 h-4 shrink-0 mt-0.5"
                    />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ephemeral Privacy Guarantee */}
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] text-text-muted">
              <ShieldCheck style={{ color: product.accentColor }} className="w-4 h-4 shrink-0" />
              <span>{product.privacyNote}</span>
            </div>

            {/* Primary Action Button */}
            <div className="pt-1 pb-1">
              <Link
                href={`/products/${product.slug}`}
                data-testid={`capability-drawer-link-${product.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-sans font-semibold text-xs text-[#07080D] transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#2EFCC2] focus-visible:outline-none cursor-pointer"
                style={{ backgroundColor: product.accentColor }}
              >
                <span>Try Free Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AudensCapabilityBento() {
  return (
    <section
      className="py-16 md:py-24 bg-surface-canvas border-b border-border-subtle scroll-mt-24 relative overflow-hidden"
      id="tools"
    >
      <Container size="default">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-[#2EFCC2] animate-pulse" aria-hidden="true" />
            <span className="tracking-wide uppercase font-medium">
              The Capability Bento · Four Tools, One Problem Each
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight tracking-tight">
            Four focused tools. <br />
            <span className="text-[#2EFCC2]">Each solves one operational problem.</span>
          </h2>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl text-pretty">
            Single-purpose autonomous tools designed to eliminate busywork—screen resumes in seconds,
            synthesize hours of lecture notes into KaTeX, condense chat noise into 2-minute briefs,
            and monitor regional government jobs. 100% private and instant.
          </p>
        </div>

        {/* 2-Column Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {PRODUCTS.map((product) => (
            <BentoCard key={product.slug} product={product} />
          ))}
        </div>

        {/* Bottom Guarantee Strip */}
        <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-text-secondary">
              <Zap className="w-3.5 h-3.5 text-[#2EFCC2]" />
              <span>50 Free Sandbox Credits</span>
            </span>
            <span className="text-border-strong hidden sm:inline select-none">/</span>
            <span>No Credit Card Required</span>
            <span className="text-border-strong hidden sm:inline select-none">/</span>
            <span>Zero Data Retention</span>
          </div>

          <Link
            href="/products"
            className="text-text-secondary hover:text-[#2EFCC2] transition-colors inline-flex items-center gap-1 group font-medium"
          >
            <span>Explore Complete Product Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
