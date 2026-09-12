'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  School,
  Landmark,
  Building2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import NextLink from 'next/link';
import type { Route } from 'next';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type PersonaId = 'colleges' | 'panchayats' | 'sponsors' | 'students';

interface PersonaData {
  id: PersonaId;
  label: string;
  icon: React.ElementType;
  badge: string;
  tagline: string;
  description: string;
  delivers: string[];
  requirements: string[];
  ctaLabel: string;
  ctaHref: string;
  metricBadge: string;
}

const PERSONAS: PersonaData[] = [
  {
    id: 'colleges',
    label: 'Colleges & Universities',
    icon: School,
    badge: 'Campus Chapter & Hackathons',
    tagline: 'Bring NorAI AI Engineering Masterclasses to your students.',
    description:
      'We conduct hands-on, zero-cost 1-day or 2-day on-campus bootcamps. Students learn Model Context Protocol (MCP), open-weight model serving with vLLM, vector databases, and deploy production-grade micro-SaaS applications.',
    delivers: [
      'Full 1-Day or 2-Day on-campus engineering bootcamp led directly by core founders and engineers.',
      '100% Free Scholar Tier access to Course Note-Taker for all attending students & faculty.',
      'Hands-on hackathon with live deployment to GitHub and Vercel.',
      'Official verified certificates of completion & project portfolio repositories.',
    ],
    requirements: [
      'Campus computer lab with internet connection or projector-equipped auditorium.',
      'Minimum cohort of 40 committed student participants (B.Tech, BCA, MCA, Polytechnic).',
      'Faculty coordinator to assist with local schedule and on-campus logistics.',
    ],
    ctaLabel: 'Request a Campus Workshop',
    ctaHref: '/contact?service=campus-workshop',
    metricBadge: 'Zero Cost to Institution & Students',
  },
  {
    id: 'panchayats',
    label: 'Gram Panchayats & Schools',
    icon: Landmark,
    badge: 'Grassroots & Citizen Inclusion',
    tagline: 'Empower village elders, youth, and citizens with everyday voice AI.',
    description:
      'We host interactive 3-hour community clinics in Panchayat Bhawans and regional schools. Citizens learn how to use voice AI in simple Hindi for public scheme navigation, official letter drafting, and digital scam protection.',
    delivers: [
      '3-Hour interactive vernacular (Hindi) workshop in your community hall or school.',
      'Hands-on practice using voice prompts on standard mobile smartphones.',
      'Printed and digital citizen scam safety guides & emergency verification steps.',
      'Guidance on accessing government welfare schemes, agricultural advice, and public gazettes.',
    ],
    requirements: [
      'Community hall, Panchayat Bhawan, or school auditorium.',
      'Participants bring their everyday smartphones (no computer or high-speed Wi-Fi required).',
      'Local coordinator or Gram Pradhan support for community mobilization.',
    ],
    ctaLabel: 'Request a Village Literacy Clinic',
    ctaHref: '/contact?service=village-clinic',
    metricBadge: '100% Free Vernacular Sessions',
  },
  {
    id: 'sponsors',
    label: 'Industry Leaders & Sponsors',
    icon: Building2,
    badge: 'Catalytic Ecosystem Support',
    tagline: 'Co-sponsor compute grants, hardware, and student hackathon prizes.',
    description:
      'Partner with NorAI to bridge the regional talent divide. Your compute credits and sponsorship directly subsidize GPU hours for student builders, hackathon prize pools, and regional engineering clinics across Tier-2/3 UP districts.',
    delivers: [
      'Direct attribution on all regional workshop materials, hackathon tracks, and certificates.',
      'First-look access to hire verified regional engineering graduates and hackathon finalists.',
      'Transparent impact reports detailing student projects built, GPU hours utilized, and districts reached.',
      'Quarterly ecosystem reviews with NorAI founders on regional tech enablement.',
    ],
    requirements: [
      'Cloud compute credits (AWS, GCP, Azure, RunPod, Together AI) or GPU hardware grants.',
      'Sponsorship for regional hackathon student prize pools and travel stipends.',
      'Commitment to evaluate regional builder candidates for remote/hybrid internships.',
    ],
    ctaLabel: 'Partner as Industry Sponsor',
    ctaHref: '/contact?service=mission-sponsor',
    metricBadge: 'Direct Catalytic Talent Pipeline',
  },
  {
    id: 'students',
    label: 'Students & Aspiring Builders',
    icon: Sparkles,
    badge: 'Builder Network & Fellowships',
    tagline: 'Apply for free study tools, workshop cohorts, and builder mentorship.',
    description:
      'Are you a student in Uttar Pradesh ready to build real software? Join the NorAI Student Builder Network to get free tools, participate in regional hackathons, and receive direct architecture guidance from experienced engineers.',
    delivers: [
      'Free Scholar Tier access to Course Note-Taker to synthesize lecture audio and video into notes.',
      'Open-source starter templates for Model Context Protocol (MCP) servers and full-stack Next.js apps.',
      'Invitation to upcoming regional hackathons and Discord technical office hours.',
      'Direct peer code reviews and recommendations for top-performing builder portfolios.',
    ],
    requirements: [
      'Enrolled in a regional school, polytechnic, or college in Uttar Pradesh (or self-taught builder).',
      'Curiosity, discipline, and willingness to learn real software engineering beyond prompt tricks.',
      'Active GitHub account or willingness to set one up.',
    ],
    ctaLabel: 'Apply for Student Cohort',
    ctaHref: '/contact?service=student-fellowship',
    metricBadge: 'Free Student Scholar Access',
  },
];

export function MissionActionDock() {
  const [activePersonaId, setActivePersonaId] = useState<PersonaId>('colleges');
  const shouldReduceMotion = useReducedMotion();

  const activePersona: PersonaData =
    PERSONAS.find((p) => p.id === activePersonaId) || (PERSONAS[0] as PersonaData);
  const PersonaIcon = activePersona.icon;

  return (
    <div className="w-full space-y-6 select-none">
      {/* Persona Tab Switcher */}
      <div
        role="tablist"
        aria-label="Choose your role to join the mission"
        className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-canvas-sunken border border-[rgba(20,28,43,0.08)]"
      >
        {PERSONAS.map((persona) => {
          const Icon = persona.icon;
          const isActive = persona.id === activePersonaId;
          return (
            <button
              key={persona.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${persona.id}`}
              id={`tab-${persona.id}`}
              onClick={() => setActivePersonaId(persona.id)}
              className={`relative flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg font-sans text-xs md:text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'text-ink-primary'
                  : 'text-ink-secondary hover:text-ink-primary hover:bg-canvas-paper/50'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-500`}
            >
              {isActive && (
                <motion.div
                  layoutId="activePersonaPill"
                  className="absolute inset-0 rounded-lg bg-canvas-paper border border-[rgba(20,28,43,0.12)] shadow-xs"
                  transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
                />
              )}
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors relative z-10 ${
                  isActive ? 'text-terra-600' : 'text-ink-secondary'
                }`}
                aria-hidden="true"
              />
              <span className="truncate relative z-10">{persona.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Persona Intake Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePersona.id}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          role="tabpanel"
          id={`panel-${activePersona.id}`}
          aria-labelledby={`tab-${activePersona.id}`}
          className="rounded-2xl border border-[rgba(20,28,43,0.08)] bg-canvas-paper p-6 sm:p-8 md:p-10 space-y-6"
        >
          {/* Header Ribbon */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[rgba(20,28,43,0.06)] pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-canvas-sunken border border-[rgba(20,28,43,0.08)] text-terra-600 flex items-center justify-center shrink-0">
                <PersonaIcon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="space-y-0.5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-terra-600 block">
                  {activePersona.badge}
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-ink-primary font-normal leading-tight">
                  {activePersona.tagline}
                </h3>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold px-2.5 py-1 rounded-lg bg-sage-50/70 border border-sage-200 text-sage-800 self-start sm:self-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-sage-600" aria-hidden="true" />
              <span>{activePersona.metricBadge}</span>
            </span>
          </div>

          <p className="text-sm md:text-[15px] text-ink-body leading-relaxed max-w-3xl font-sans">
            {activePersona.description}
          </p>

          {/* 2-Column Bento: Deliverables vs Logistics */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left: What NorAI Delivers */}
            <div className="md:col-span-7 rounded-xl bg-canvas-base border border-[rgba(20,28,43,0.08)] p-5 space-y-3.5">
              <div className="flex items-center gap-1.5 pb-1 border-b border-[rgba(20,28,43,0.06)]">
                <Zap className="w-3.5 h-3.5 text-terra-600" aria-hidden="true" />
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-primary">
                  What NorAI Delivers (100% Free)
                </h4>
              </div>
              <ul className="space-y-2.5">
                {activePersona.delivers.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs md:text-sm text-ink-body leading-relaxed"
                  >
                    <CheckCircle2
                      className="w-3.5 h-3.5 text-sage-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Requirements & Action */}
            <div className="md:col-span-5 rounded-xl bg-canvas-sunken border border-[rgba(20,28,43,0.08)] p-5 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 pb-1 border-b border-[rgba(20,28,43,0.06)]">
                  <Calendar className="w-3.5 h-3.5 text-ochre-600" aria-hidden="true" />
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-primary">
                    What Is Required
                  </h4>
                </div>
                <ul className="space-y-2">
                  {activePersona.requirements.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-ink-body leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-ochre-500 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-[rgba(20,28,43,0.06)]">
                <NextLink
                  href={activePersona.ctaHref as Route}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#141C2B] px-5 py-3 font-sans text-xs font-semibold text-[#F5F0EA] hover:bg-[#1F2B3E] active:scale-[0.98] transition-all group"
                >
                  <span>{activePersona.ctaLabel}</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </NextLink>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default MissionActionDock;
