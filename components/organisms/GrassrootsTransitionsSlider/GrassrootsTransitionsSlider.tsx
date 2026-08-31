'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import {
  Users,
  GraduationCap,
  Cpu,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Languages,
  Radio,
} from 'lucide-react';
import NextLink from 'next/link';
import type { Route } from 'next';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

interface TierTransition {
  id: string;
  step: string;
  badge: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  realityTitle: string;
  realityText: string;
  transformationTitle: string;
  transformationText: string;
  metric: string;
  tools: string[];
  ctaLink: string;
  ctaText: string;
}

const TRANSITIONS: TierTransition[] = [
  {
    id: 'tier-1',
    step: '01',
    badge: 'Tier 1: Grassroots Inclusion',
    icon: Users,
    title: 'Rural Citizens & Elders',
    subtitle: 'From bureaucratic dependency to Hindi voice self-reliance.',
    realityTitle: 'The Ground Reality in Regional UP',
    realityText:
      'Elderly citizens and rural residents struggle with complicated paperwork and official forms, while being increasingly targeted by emerging digital voice-cloning scams and fraudulent scheme calls.',
    transformationTitle: 'The NorAI Transformation',
    transformationText:
      'We introduce simple Hindi and dialect voice prompts with ChatGPT and Gemini—enabling citizens to independently draft formal letters, access crop advice, and recognize voice scams without middlemen.',
    metric: '100% Free Vernacular Sessions',
    tools: ['Hindi Voice AI', 'Public Welfare Radar', 'Digital Scam Safety', 'Voice Letters'],
    ctaLink: '/contact?service=village-clinic',
    ctaText: 'Request a Village Literacy Clinic',
  },
  {
    id: 'tier-2',
    step: '02',
    badge: 'Tier 2: Youth Foundations',
    icon: GraduationCap,
    title: 'School & College Learners',
    subtitle: 'From passive phone scrolling to personal Socratic tutors.',
    realityTitle: 'The Ground Reality in Regional UP',
    realityText:
      'Students record hours of lectures that dissolve into unorganized phone screenshots across three apps, relying on passive rote memorization for high-stakes competitive examinations.',
    transformationTitle: 'The NorAI Transformation',
    transformationText:
      'Students learn to turn AI into a 24/7 personal tutor for STEM, convert chaotic lecture recordings into structured flashcards with Course Note-Taker, and build solid computational coding logic.',
    metric: 'Free Scholar Tier Access',
    tools: ['Course Note-Taker', 'Socratic STEM Tutors', 'LaTeX Extraction', 'Prompt-to-Code'],
    ctaLink: '/contact?service=student-fellowship',
    ctaText: 'Explore Scholar Tier Tools',
  },
  {
    id: 'tier-3',
    step: '03',
    badge: 'Tier 3: Advanced Builders',
    icon: Cpu,
    title: 'Collegiate & Tech Hubs',
    subtitle: 'From superficial prompt fluff to production AI architecture.',
    realityTitle: 'The Ground Reality in Regional UP',
    realityText:
      'Ambitious engineering students watch superficial "prompt guru" videos and build toys, but lack the systems architecture to build deterministic, high-throughput software that companies can hire for.',
    transformationTitle: 'The NorAI Transformation',
    transformationText:
      'We teach Model Context Protocol (MCP) servers, local open-weight model serving (vLLM / Ollama), vector databases, and type-safe Next.js micro-SaaS deployments with sub-second SLAs.',
    metric: 'Direct Founder Mentorship',
    tools: ['Model Context Protocol (MCP)', 'vLLM Local Models', 'pgvector RAG', 'Next.js Micro-SaaS'],
    ctaLink: '/contact?service=campus-workshop',
    ctaText: 'Bring AI Masterclass to Campus',
  },
];

export function GrassrootsTransitionsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [viewMode, setViewMode] = useState<'comparison' | 'transformation' | 'reality'>('comparison');
  const shouldReduceMotion = useReducedMotion();

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : TRANSITIONS.length - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev < TRANSITIONS.length - 1 ? prev + 1 : 0));
  };

  const activeItem: TierTransition =
    TRANSITIONS[activeIndex] || (TRANSITIONS[0] as TierTransition);
  const Icon = activeItem.icon;

  const slideVariants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: EASE_OUT,
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.25,
        ease: EASE_OUT,
      },
    }),
  };

  return (
    <div className="w-full space-y-6 select-none">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[rgba(13,37,61,0.08)] pb-4">
        {/* Step Pill Indicators */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Transformation Tiers">
          {TRANSITIONS.map((item, idx) => {
            const isSelected = activeIndex === idx;
            const ItemIcon = item.icon;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl font-sans text-xs md:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terra-500 focus-visible:ring-offset-canvas-base ${
                  isSelected
                    ? 'text-ink-primary'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-paper/60'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeTransitionPill"
                    className="absolute inset-0 rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm"
                    transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <ItemIcon
                    className={`w-4 h-4 transition-colors ${
                      isSelected ? 'text-terra-500' : 'text-ink-secondary'
                    }`}
                  />
                  <span>
                    {item.step}. {item.title.split(' ')[0]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle & Arrow Controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* View Filter Pill */}
          <div className="hidden md:flex items-center p-1 rounded-xl bg-canvas-sunken border border-[rgba(13,37,61,0.08)] text-xs font-mono">
            <button
              type="button"
              onClick={() => setViewMode('comparison')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                viewMode === 'comparison'
                  ? 'bg-canvas-paper text-ink-primary shadow-xs border border-[rgba(13,37,61,0.08)]'
                  : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              Side-by-Side
            </button>
            <button
              type="button"
              onClick={() => setViewMode('transformation')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                viewMode === 'transformation'
                  ? 'bg-canvas-paper text-sage-800 shadow-xs border border-[rgba(13,37,61,0.08)]'
                  : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              NorAI Fix
            </button>
            <button
              type="button"
              onClick={() => setViewMode('reality')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                viewMode === 'reality'
                  ? 'bg-canvas-paper text-terra-600 shadow-xs border border-[rgba(13,37,61,0.08)]'
                  : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              Ground Reality
            </button>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Transformation Tier"
              className="w-9 h-9 rounded-xl border border-[rgba(13,37,61,0.10)] bg-canvas-paper text-ink-primary flex items-center justify-center shadow-xs hover:border-terra-500/40 hover:bg-canvas-recessed active:scale-[0.96] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-500"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Transformation Tier"
              className="w-9 h-9 rounded-xl border border-[rgba(13,37,61,0.10)] bg-canvas-paper text-ink-primary flex items-center justify-center shadow-xs hover:border-terra-500/40 hover:bg-canvas-recessed active:scale-[0.96] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-500"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Animated Card Deck Container */}
      <div className="relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeItem.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="rounded-3xl border border-[rgba(13,37,61,0.12)] bg-canvas-paper p-7 md:p-10 shadow-md space-y-8 relative overflow-hidden"
          >
            {/* Top Card Ribbon */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[rgba(13,37,61,0.08)] pb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-terra-50 border border-terra-500/20 text-terra-600 flex items-center justify-center shrink-0 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded bg-canvas-recessed text-terra-600 border border-line-subtle">
                      {activeItem.badge}
                    </span>
                    <span className="font-mono text-[11px] text-ink-secondary flex items-center gap-1">
                      <Radio className="w-3 h-3 text-sage-600 animate-pulse" />
                      <span>Cohort Step {activeItem.step}/03</span>
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-ink-primary font-normal">
                    {activeItem.title}
                  </h3>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold px-3 py-1 rounded-full bg-sage-50 border border-sage-300 text-sage-800 self-start sm:self-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
                {activeItem.metric}
              </span>
            </div>

            {/* Subtitle / Promise */}
            <p className="text-base md:text-lg text-ink-body font-normal leading-relaxed max-w-3xl">
              {activeItem.subtitle}
            </p>

            {/* Before vs After Transformation Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reality (Before) */}
              {(viewMode === 'comparison' || viewMode === 'reality') && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.08)] p-6 space-y-3.5"
                >
                  <div className="flex items-center gap-2 text-terra-600">
                    <AlertCircle className="w-4 h-4" />
                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wider">
                      {activeItem.realityTitle}
                    </h4>
                  </div>
                  <p className="text-sm text-ink-body leading-relaxed">
                    {activeItem.realityText}
                  </p>
                </motion.div>
              )}

              {/* Transformation (After) */}
              {(viewMode === 'comparison' || viewMode === 'transformation') && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-sage-50/70 border border-sage-300/80 p-6 space-y-3.5"
                >
                  <div className="flex items-center gap-2 text-sage-800">
                    <CheckCircle2 className="w-4 h-4 text-sage-600" />
                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wider">
                      {activeItem.transformationTitle}
                    </h4>
                  </div>
                  <p className="text-sm text-ink-primary leading-relaxed">
                    {activeItem.transformationText}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Tools Covered & Direct Route Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-[rgba(13,37,61,0.08)]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink-secondary mr-1">
                  Tools &amp; Protocols:
                </span>
                {activeItem.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-xs font-medium px-2.5 py-1 rounded-lg bg-canvas-base border border-[rgba(13,37,61,0.08)] text-ink-primary shadow-2xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <NextLink
                href={activeItem.ctaLink as Route}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-canvas-base border border-line-default px-4 py-2.5 font-sans text-xs font-semibold text-ink-primary hover:text-terra-600 hover:border-terra-500 shadow-2xs active:scale-[0.98] transition-all group shrink-0"
              >
                <span>{activeItem.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </NextLink>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtle Pagination & Drag Guidance */}
      <div className="flex items-center justify-between px-2 text-xs font-mono text-ink-secondary">
        <span className="flex items-center gap-1.5">
          <Languages className="w-3.5 h-3.5 text-terra-500" />
          <span>Vernacular Voice to Production Engineering</span>
        </span>
        <span className="tabular-nums font-medium">
          {activeIndex + 1} / {TRANSITIONS.length}
        </span>
      </div>
    </div>
  );
}
