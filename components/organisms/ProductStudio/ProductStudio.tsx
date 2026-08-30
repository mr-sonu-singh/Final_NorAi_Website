'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import {
  FileText,
  Headphones,
  MessageSquare,
  Newspaper,
  ArrowRight,
} from 'lucide-react';

interface ProductItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  inputFormat: string;
  outputFormat: string;
  icon: React.ElementType;
  cta: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'resume-shortlister',
    slug: 'resume-shortlister',
    title: 'AI Resume Shortlister',
    category: 'Recruitment AI',
    tagline: 'Parse, score, and rank hundreds of candidate resumes against job specifications in seconds.',
    problem: 'Recruiters spend 15+ hours weekly reading hundreds of unstructured PDF/DOCX resumes by hand.',
    solution: 'Extracts verified technical skill vectors in memory and returns a structured qualification score in < 0.35s.',
    inputFormat: 'PDF, DOCX, TXT',
    outputFormat: 'Structured JSON & Scorecard',
    icon: FileText,
    cta: 'Try Resume Shortlister',
  },
  {
    id: 'course-note-taker',
    slug: 'course-note-taker',
    title: 'Course Note-Taker',
    category: 'EdTech & Study AI',
    tagline: 'Transform raw video lectures, audio recordings, and slides into executive study notes and flashcards.',
    problem: 'Students and professionals lose key lecture concepts buried in 2-hour unindexed audio/video recordings.',
    solution: 'Generates timestamped chapter outlines, core concept definitions, and interactive digital flashcards.',
    inputFormat: 'MP3, WAV, MP4, YouTube URL',
    outputFormat: 'Markdown, Notion, Flashcard Deck',
    icon: Headphones,
    cta: 'Explore Note-Taker',
  },
  {
    id: 'community-chat-digest',
    slug: 'chat-digest',
    title: 'Community Chat Digest',
    category: 'Community AI',
    tagline: 'Condense thousands of unread Slack, Discord, and Telegram messages into structured executive briefings.',
    problem: 'Operators and founders drown in thousands of messages across 20+ active community channels.',
    solution: 'Eliminates noise, clusters related discussions by topic, and highlights action items in a 2-minute daily brief.',
    inputFormat: 'Slack / Discord / Telegram Webhook',
    outputFormat: 'Daily Executive Digest & Action Log',
    icon: MessageSquare,
    cta: 'Try Chat Digest',
  },
  {
    id: 'smart-dainik-news',
    slug: 'smart-dainik-news',
    title: 'Smart Dainik News',
    category: 'Regional Intelligence',
    tagline: 'Hyper-local, noise-filtered regional news intelligence clustered by topic, sentiment, and civic impact.',
    problem: 'Regional news in India is filled with clickbait, duplicate reprints, and unverified rumors.',
    solution: 'Aggregates multi-source regional coverage into verified, unbiased event clusters with timeline tracking.',
    inputFormat: 'Regional RSS, Wire Feeds, Vernacular Text',
    outputFormat: 'Clustered News Feed & Impact Brief',
    icon: Newspaper,
    cta: 'Explore Dainik News',
  },
];

export function ProductStudio() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeProduct = (PRODUCTS[selectedIdx] || PRODUCTS[0]) as ProductItem;


  // Demo interactive states
  const [resumeThreshold, setResumeThreshold] = useState(80);
  const [activeCardFlipped, setActiveCardFlipped] = useState(false);
  const [digestTimeframe, setDigestTimeframe] = useState<'24h' | '7d'>('24h');

  return (
    <div className="w-full text-left font-sans space-y-8">
      {/* Top Segmented Tool Dock */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <div className="inline-flex p-1.5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm">
          {PRODUCTS.map((prod, idx) => {
            const isSelected = selectedIdx === idx;
            const IconComp = prod.icon;
            return (
              <button
                key={prod.id}
                type="button"
                onClick={() => {
                  setSelectedIdx(idx);
                  setActiveCardFlipped(false);
                }}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap',
                  isSelected
                    ? 'bg-[#0D253D] text-white shadow-sm'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed/50'
                )}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{prod.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dual-Pane Studio Canvas */}
      <div className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Specification Column */}
        <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[rgba(13,37,61,0.08)] bg-canvas-paper space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                {activeProduct.category}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal leading-tight">
              {activeProduct.title}
            </h2>

            <p className="text-base text-ink-body leading-relaxed">
              {activeProduct.tagline}
            </p>

            {/* Problem vs Solution */}
            <div className="space-y-3 pt-2 text-xs leading-relaxed">
              <div className="p-3.5 rounded-xl bg-canvas-recessed/50 border border-[rgba(13,37,61,0.06)]">
                <span className="font-mono font-semibold text-accent-500 block mb-1">
                  THE BOTTLENECK
                </span>
                <span className="text-ink-body">{activeProduct.problem}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-canvas-recessed/50 border border-[rgba(13,37,61,0.06)]">
                <span className="font-mono font-semibold text-accent-secondary block mb-1">
                  THE NORAI FIX
                </span>
                <span className="text-ink-body">{activeProduct.solution}</span>
              </div>
            </div>
          </div>

          {/* I/O Contracts & CTA */}
          <div className="space-y-4 pt-4 border-t border-[rgba(13,37,61,0.08)]">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-ink-secondary block">Input Support</span>
                <span className="font-mono font-medium text-ink-primary">
                  {activeProduct.inputFormat}
                </span>
              </div>
              <div>
                <span className="text-ink-secondary block">Output Delivery</span>
                <span className="font-mono font-medium text-ink-primary">
                  {activeProduct.outputFormat}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Link href={`/products/${activeProduct.slug}`} className="w-full">
                <Button variant="primary" size="md" className="w-full justify-center group">
                  <span>{activeProduct.cta}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Live Interactive Simulation Stage */}
        <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 bg-canvas-recessed/30 flex flex-col justify-center">
          {/* 1. Resume Shortlister Live Simulator */}
          {activeProduct.id === 'resume-shortlister' && (
            <div className="space-y-4 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[rgba(13,37,61,0.08)] pb-3">
                <span className="font-mono text-xs font-semibold text-ink-primary">
                  Interactive Candidate Threshold Filter
                </span>
                <span className="font-mono text-xs text-accent-500 font-bold">
                  ≥ {resumeThreshold}% Match
                </span>
              </div>

              <div className="space-y-1">
                <input
                  type="range"
                  min="60"
                  max="95"
                  value={resumeThreshold}
                  onChange={(e) => setResumeThreshold(Number(e.target.value))}
                  className="w-full accent-accent-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-ink-secondary">
                  <span>60% (Broad)</span>
                  <span>95% (Strict Vector Match)</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                {[
                  { name: 'Aditya Verma', score: 96, role: 'Sr. Backend Engineer', pass: 96 >= resumeThreshold },
                  { name: 'Neha Kulkarni', score: 84, role: 'Full Stack Engineer', pass: 84 >= resumeThreshold },
                  { name: 'Rohit Sen', score: 71, role: 'Frontend Engineer', pass: 71 >= resumeThreshold },
                ].map((cand, cIdx) => (
                  <div
                    key={cIdx}
                    className={cn(
                      'p-3 rounded-xl border flex items-center justify-between text-xs transition-all',
                      cand.pass
                        ? 'bg-canvas-paper border-accent-secondary/50 text-ink-primary'
                        : 'bg-canvas-recessed/40 border-transparent opacity-40'
                    )}
                  >
                    <div>
                      <span className="font-medium block">{cand.name}</span>
                      <span className="text-[11px] text-ink-secondary">{cand.role}</span>
                    </div>
                    <span className="font-mono font-bold px-2 py-0.5 rounded bg-canvas-recessed text-accent-500">
                      {cand.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Course Note-Taker Live Simulator */}
          {activeProduct.id === 'course-note-taker' && (
            <div className="space-y-4 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[rgba(13,37,61,0.08)] pb-3">
                <span className="font-mono text-xs font-semibold text-ink-primary">
                  Lecture: Distributed Consensus & Raft (42:15)
                </span>
                <span className="font-mono text-xs text-accent-secondary font-medium">
                  Summary Ready
                </span>
              </div>

              {/* Toggleable Flashcard Demo */}
              <div
                onClick={() => setActiveCardFlipped(!activeCardFlipped)}
                className="cursor-pointer p-6 rounded-xl bg-canvas-recessed/50 border border-[rgba(13,37,61,0.1)] text-center transition-all hover:bg-canvas-recessed/80"
              >
                <span className="font-mono text-[11px] text-ink-secondary block mb-2">
                  CLICK TO FLIP STUDY FLASHCARD
                </span>
                {!activeCardFlipped ? (
                  <p className="font-display text-lg text-ink-primary font-normal">
                    Q: What is the primary role of the Leader in the Raft Consensus Protocol?
                  </p>
                ) : (
                  <p className="text-xs text-ink-body leading-relaxed">
                    A: The leader handles all client requests, appends log entries, and replicates them to follower nodes before committing.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-lg bg-canvas-recessed/30">
                  <span className="font-medium text-ink-primary block">3 Core Axioms</span>
                  <span className="text-ink-secondary text-[11px]">Leader election, log replication, safety</span>
                </div>
                <div className="p-3 rounded-lg bg-canvas-recessed/30">
                  <span className="font-medium text-ink-primary block">Markdown Export</span>
                  <span className="text-ink-secondary text-[11px]">Syncs directly to Notion & Obsidian</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Community Chat Digest Live Simulator */}
          {activeProduct.id === 'community-chat-digest' && (
            <div className="space-y-4 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[rgba(13,37,61,0.08)] pb-3">
                <span className="font-mono text-xs font-semibold text-ink-primary">
                  #engineering-core (1,482 messages)
                </span>
                <div className="flex gap-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setDigestTimeframe('24h')}
                    className={cn(
                      'px-2 py-0.5 rounded',
                      digestTimeframe === '24h' ? 'bg-[#0D253D] text-white' : 'text-ink-secondary'
                    )}
                  >
                    24 Hours
                  </button>
                  <button
                    type="button"
                    onClick={() => setDigestTimeframe('7d')}
                    className={cn(
                      'px-2 py-0.5 rounded',
                      digestTimeframe === '7d' ? 'bg-[#0D253D] text-white' : 'text-ink-secondary'
                    )}
                  >
                    7 Days
                  </button>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-ink-body">
                <div className="p-3 rounded-xl bg-canvas-recessed/40 space-y-1">
                  <span className="font-semibold text-ink-primary block">
                    1. Redis Cache Sharding Resolved
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    Team agreed on consistent hashing ring for node distribution. Memory footprint reduced by 34%.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-canvas-recessed/40 space-y-1">
                  <span className="font-semibold text-ink-primary block">
                    2. Webhook Retries Scheduled for v2.4
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    Exponential backoff handler merged to staging; pending security audit review.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. Smart Dainik News Live Simulator */}
          {activeProduct.id === 'smart-dainik-news' && (
            <div className="space-y-4 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[rgba(13,37,61,0.08)] pb-3">
                <span className="font-mono text-xs font-semibold text-ink-primary">
                  UP Regional Intelligence Cluster
                </span>
                <span className="font-mono text-xs text-accent-secondary font-medium">
                  Verified Clean Feed
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-canvas-recessed/40 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-ink-primary">UPPSC Technical Recruitment Notification</span>
                    <span className="text-[10px] font-mono text-accent-500 font-bold">ELIGIBLE</span>
                  </div>
                  <p className="text-[11px] text-ink-secondary leading-relaxed">
                    Clustered from 4 official gazette updates. Application window opens March 2; age relaxation criteria verified.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-canvas-recessed/40 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-ink-primary">Agra-Lucknow Expressway Optical Grid Upgrade</span>
                    <span className="text-[10px] font-mono text-accent-secondary font-bold">INFRASTRUCTURE</span>
                  </div>
                  <p className="text-[11px] text-ink-secondary leading-relaxed">
                    High-speed fiber rollout reaching Tier-2 district industrial parks by Q3 2026.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
