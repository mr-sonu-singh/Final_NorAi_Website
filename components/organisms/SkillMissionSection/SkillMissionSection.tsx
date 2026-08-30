'use client';

import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import {
  GraduationCap,
  Cpu,
  Users,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

interface Pillar {
  icon: React.ElementType;
  badge: string;
  badgeVariant: 'terracotta' | 'sage' | 'ochre';
  title: string;
  tagline: string;
  description: string;
  points: string[];
}

const PILLARS: Pillar[] = [
  {
    icon: GraduationCap,
    badge: 'Rural AI Enablement',
    badgeVariant: 'ochre',
    title: 'Grassroots & Tier-2/3 Outreach',
    tagline: 'Bridging the metro vs. regional technical divide directly at the campus level.',
    description:
      'We conduct hands-on, zero-cost AI literacy bootcamps, practical hackathons, and automation masterclasses across regional colleges, polytechnics, and schools in Uttar Pradesh and beyond.',
    points: [
      'Hands-on on-ground campus workshops',
      'Vernacular & bilingual AI curriculum',
      'Free student tiers on NorAI EdTech tools',
    ],
  },
  {
    icon: Cpu,
    badge: 'AI Knowledge-as-a-Service',
    badgeVariant: 'terracotta',
    title: 'Deterministic AI Curriculum',
    tagline: 'Practical engineering over speculative buzzwords and prompt tricks.',
    description:
      'We open-source our internal engineering playbooks—teaching students and young developers how to build Model Context Protocol (MCP) servers, structured RAG pipelines, and local vLLM deployments.',
    points: [
      'Model Context Protocol (MCP) tooling',
      'Structured schemas & JSON verification',
      'Real-world vector search & caching',
    ],
  },
  {
    icon: Users,
    badge: 'AI Talent Development',
    badgeVariant: 'sage',
    title: 'Youth Mentorship & Incubation',
    tagline: 'From first-time learners to production-grade open-source builders.',
    description:
      'Direct 1-on-1 mentorship with our founding team. We help regional students build verifiable portfolio projects, contribute to open protocols, and step into high-impact engineering careers.',
    points: [
      'Code reviews & architectural feedback',
      'Regional micro-enterprise incubation',
      'Direct internship & fellowship pathways',
    ],
  },
];

const METRICS = [
  { label: 'Students Mentored', value: '500+', note: 'Across regional colleges' },
  { label: 'Focus Geography', value: 'Tier 2 & 3', note: 'Uttar Pradesh & Bharat' },
  { label: 'Student Access', value: '100% Free', note: 'On Course Note-Taker' },
  { label: 'Curriculum Philosophy', value: 'Zero Fluff', note: 'Real code & deployable tools' },
];

export function SkillMissionSection() {
  return (
    <section className="py-20 md:py-28 bg-canvas-base border-t border-[rgba(13,37,61,0.08)]">
      <Container size="default">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 text-left">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>The NorAI Skill Mission · Uttar Pradesh</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-ink-primary leading-tight tracking-tight">
              Building local intelligence. <br />
              <span className="italic text-accent-500 font-normal">
                Uplifting regional youth.
              </span>
            </h2>

            <p className="text-base md:text-lg text-ink-body leading-relaxed">
              We don&rsquo;t just engineer deterministic software in Uttar Pradesh—we actively invest in the next generation of builders, researchers, and operators across Tier-2/3 cities and rural institutions.
            </p>
          </div>

          {/* Header Action Button */}
          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link href="/mission">
              <Button variant="primary" size="md" className="w-full sm:w-auto group">
                <span>Explore the Skill Mission</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact?service=campus-workshop">
              <Button variant="secondary" size="md" className="w-full sm:w-auto">
                Invite us to your campus
              </Button>
            </Link>
          </div>
        </div>

        {/* 3 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch mb-16 text-left">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 md:p-9 shadow-sm hover:shadow-md hover:border-accent-500/30 transition-all duration-200 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Badge & Icon Row */}
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`font-mono text-xs font-semibold px-2.5 py-1 rounded border ${
                        pillar.badgeVariant === 'terracotta'
                          ? 'bg-accent-50 text-accent-500 border-accent-500/20'
                          : pillar.badgeVariant === 'sage'
                          ? 'bg-[#e2ede7] text-accent-secondary border-accent-secondary/30'
                          : 'bg-[#fff4d6] text-[#976a08] border-[#976a08]/20'
                      }`}
                    >
                      {pillar.badge}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.08)] flex items-center justify-center text-ink-primary">
                      <Icon className="w-4 h-4 text-accent-500" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <h3 className="font-display text-2xl sm:text-3xl text-ink-primary font-normal">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-mono text-accent-500 font-medium">
                      {pillar.tagline}
                    </p>
                  </div>

                  {/* Body prose */}
                  <p className="text-sm text-ink-body leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Checklist bullet points */}
                <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] space-y-2">
                  {pillar.points.map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-ink-body">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-secondary shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Telemetry / Impact Strip */}
        <div className="rounded-2xl bg-canvas-paper/70 border border-[rgba(13,37,61,0.08)] p-6 md:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(13,37,61,0.08)] text-left">
            {METRICS.map((metric, idx) => (
              <div key={metric.label} className={idx > 0 ? 'sm:pl-8 pt-4 sm:pt-0' : ''}>
                <div className="font-display text-3xl sm:text-4xl text-ink-primary font-normal tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-ink-primary mt-1">
                  {metric.label}
                </div>
                <div className="text-[11px] font-mono text-ink-secondary mt-0.5">
                  {metric.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SkillMissionSection;
