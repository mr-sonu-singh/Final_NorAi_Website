'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { Reveal } from '@/components/foundation/AnimatedSection';
import { MagneticButton } from '@/components/atoms/MagneticButton';
import {
  ArrowRight,
  Users,
  Landmark,
  GraduationCap,
  Cpu,
  CheckCircle2,
  Handshake,
} from 'lucide-react';

const COMMUNITY_QUADRANTS = [
  {
    id: 'villages',
    category: 'Everyday Inclusion',
    title: 'Rural Villages & Elders',
    focus: 'Vernacular Voice Tools & Scam Defense',
    description:
      'We break down language barriers through conversational AI in native dialects. Citizens learn how to use voice prompts for agricultural guidance, everyday queries, and essential digital safety drills to recognize AI-generated voice scams and online fraud.',
    deliverable: 'Assisted voice-prompting & digital safety drills in native dialects',
    icon: Users,
  },
  {
    id: 'panchayats',
    category: 'Grassroots Governance',
    title: 'Gram Panchayats & Community Centers',
    focus: 'Administrative Access & Citizen Independence',
    description:
      'Conducted in local community spaces with assisted hands-on walkthroughs. We help citizens independently draft formal applications, navigate public welfare portals, and utilize digital resources without relying on third-party intermediaries.',
    deliverable: 'Practical letter-drafting & citizen welfare portal navigation',
    icon: Landmark,
  },
  {
    id: 'schools',
    category: 'Academic Foundations',
    title: 'Schools & Academic Youth',
    focus: 'Socratic Inquiry & STEM Tutoring',
    description:
      'Moving students beyond rote memorization. We introduce ethical AI study companions that encourage active inquiry, break down complex science and mathematics concepts step-by-step, and foster critical computational thinking.',
    deliverable: 'Socratic STEM inquiry models & structured study companions',
    icon: GraduationCap,
  },
  {
    id: 'towns',
    category: 'Youth Capability',
    title: 'Towns & Aspiring Builders',
    focus: 'Practical Engineering & Modern Skills',
    description:
      'Equipping regional youth with practical technical confidence. We bridge the gap from passive smartphone consumption to active creation, teaching modern software workflows, foundational AI concepts, and problem-solving for regional needs.',
    deliverable: 'Hands-on software creation & practical problem-solving capability',
    icon: Cpu,
  },
];

export function SkillMissionSection() {
  return (
    <section
      id="skill-mission"
      aria-label="NorAI AI Skill Mission & Regional Enablement"
      className="py-20 md:py-28 bg-surface-canvas border-b border-border-subtle relative overflow-hidden"
    >
      <Container size="wide" className="relative z-10 space-y-16 md:space-y-20">
        {/* =====================================================================
            1. SECTION HEADER: EDITORIAL MANIFESTO & STRATEGIC VISION
            ===================================================================== */}
        <Reveal delay={0} y={16}>
          <div className="max-w-4xl space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-panel border border-border-strong text-accent-primary text-xs font-mono font-semibold">
              <Handshake className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>REGIONAL ENABLEMENT · PUBLIC-PRIVATE &amp; NGO PARTNERSHIP</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary leading-[1.06] tracking-tight">
              Democratizing artificial intelligence <br />
              <span className="italic text-accent-primary font-normal">
                across our communities.
              </span>
            </h2>

            <p className="fluid-lead text-text-secondary font-normal leading-relaxed max-w-3xl text-pretty">
              Frontier technology cannot remain confined to metro tech enclaves. We partner with non-profits, local councils, and educational institutions to deliver structured, on-ground computational literacy tailored to how people live, learn, and build.
            </p>
          </div>
        </Reveal>

        {/* =====================================================================
            2. CINEMATIC DOCUMENTARY SPECIMEN (Classroom Reality Frame)
            ===================================================================== */}
        <Reveal delay={0.08} y={20}>
          <figure className="relative rounded-2xl overflow-hidden border border-border-subtle bg-white shadow-xs">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.4/1] w-full overflow-hidden bg-surface-panel-subtle">
              <Image
                src="/images/about/skill-mission.jpg"
                alt="NorAI hands-on classroom AI masterclass in session with regional students"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1440px) 100vw, 1380px"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#141C2B]/75 via-[#141C2B]/20 to-transparent pointer-events-none"
              />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                <div className="space-y-1 text-left max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-[11px] font-mono text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>On-Ground Reality</span>
                  </span>
                  <p className="font-display text-lg sm:text-xl md:text-2xl font-normal drop-shadow-sm">
                    Hands-on Interactive Learning in Regional Classrooms
                  </p>
                  <p className="text-xs text-white/80 font-sans leading-relaxed hidden sm:block">
                    Bridging digital gaps through assisted, practical walkthroughs—turning everyday smartphones and community computer labs into instruments of empowerment.
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 text-xs font-mono text-white/90">
                    Turnkey Institutional Deployment
                  </span>
                </div>
              </div>
            </div>

            <figcaption className="p-4 sm:p-5 bg-surface-panel border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left text-xs font-mono text-text-muted">
              <span className="text-text-primary font-medium">
                Syllabus Architecture: Tailored across literacy levels, local dialects, and available equipment.
              </span>
              <span className="text-accent-primary font-semibold">
                Scalable Regional Model
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* =====================================================================
            3. THE 4 COMMUNITY TRANSFORMATION QUADRANTS
            ===================================================================== */}
        <Reveal delay={0.12} y={20}>
          <div className="space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border-subtle pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-semibold text-accent-primary uppercase tracking-wider">
                  Community Impact Architecture
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-text-primary font-normal">
                  How our workshops adapt to diverse regional needs.
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary font-sans max-w-md">
                We never force a generic slide deck. Every session is calibrated to local literacy, native language, and practical daily utility.
              </p>
            </div>

            {/* 4-Quadrant Architectural Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {COMMUNITY_QUADRANTS.map((quad) => {
                const Icon = quad.icon;
                return (
                  <div
                    key={quad.id}
                    className="rounded-xl border border-border-subtle bg-white p-6 sm:p-8 space-y-5 flex flex-col justify-between hover:border-border-strong hover:shadow-xs transition-all text-left"
                  >
                    <div className="space-y-4">
                      {/* Header Strip: Category Badge */}
                      <div className="flex items-center justify-between gap-2 border-b border-border-subtle pb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-surface-panel-subtle text-text-secondary border border-border-subtle">
                          {quad.category}
                        </span>
                      </div>

                      {/* Title & Focus */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-accent-primary shrink-0" />
                          <h4 className="font-display text-xl sm:text-2xl text-text-primary font-normal leading-snug">
                            {quad.title}
                          </h4>
                        </div>
                        <p className="text-xs font-medium text-accent-primary">
                          {quad.focus}
                        </p>
                      </div>

                      {/* Narrative Description */}
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                        {quad.description}
                      </p>
                    </div>

                    {/* Ground Deliverable Strip */}
                    <div className="pt-4 border-t border-border-subtle flex items-start gap-2.5 text-xs text-text-primary bg-surface-panel -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-4 sm:p-5 rounded-b-xl border-t">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-sans text-text-secondary leading-normal">
                        <strong className="text-text-primary font-semibold">Core Deliverable:</strong>{' '}
                        {quad.deliverable}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* =====================================================================
            4. NGO & INSTITUTIONAL PARTNERSHIP DOCK
            ===================================================================== */}
        <Reveal delay={0.16} y={20}>
          <div className="rounded-xl border border-border-strong bg-surface-panel p-6 sm:p-8 md:p-10 text-left flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2.5 max-w-2xl">
              <span className="text-xs font-mono font-semibold text-accent-primary uppercase tracking-wider">
                Institutional &amp; NGO Alliance
              </span>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-normal text-text-primary leading-tight">
                Partner with us to scale AI literacy in your region.
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans max-w-xl">
                Whether you represent an NGO focused on digital inclusion, a CSR foundation, an educational trust, or a government initiative, NorAI provides turnkey on-ground workshop delivery, ground-calibrated bilingual curricula, and trained facilitators.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link href="/mission#join-mission" className="w-full sm:w-auto">
                <MagneticButton strength={10} className="w-full sm:w-auto">
                  <Button
                    size="md"
                    className="w-full sm:w-auto bg-[#141C2B] hover:bg-[#222E42] text-white font-sans text-xs sm:text-sm font-semibold px-5 py-3 rounded-lg shadow-xs cursor-pointer transition-all active:scale-98 inline-flex items-center justify-center gap-2 group whitespace-nowrap"
                  >
                    <span>Partner With Our Mission</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </MagneticButton>
              </Link>

              <Link href="/mission" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto border border-border-strong hover:bg-surface-hover text-text-primary font-sans text-xs sm:text-sm font-medium px-4 py-3 rounded-lg cursor-pointer transition-all whitespace-nowrap"
                >
                  <span>Read Institutional Monograph &rarr;</span>
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default SkillMissionSection;
