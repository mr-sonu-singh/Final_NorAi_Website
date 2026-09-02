import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Heading } from '@/components/foundation/Heading';
import {
  Reveal,
  TextReveal,
  CountUp,
} from '@/components/foundation';
import { WorkshopTrackExplorer } from '@/components/organisms/WorkshopTrackExplorer';
import { GrassrootsTransitionsSlider } from '@/components/organisms/GrassrootsTransitionsSlider';
import { MissionActionDock } from '@/components/organisms/MissionActionDock';
import {
  ArrowRight,
  MapPin,
  Sparkles,
  Landmark,
  Languages,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/mission',
  title: 'AI Skill Mission & Regional Enablement Movement',
  description:
    'Democratizing everyday AI literacy and deterministic engineering across 75 districts of Uttar Pradesh. 100% free workshops for students, youth, and village citizens.',
});

const ADAPTATION_FACTORS = [
  {
    category: 'Target Demographics',
    rural: 'Village elders, rural youth, local shopkeepers, women self-help groups, first-time digital citizens.',
    town: 'Undergraduate engineers, polytechnic diploma students, aspiring tech founders in regional hubs.',
  },
  {
    category: 'Primary Curriculum',
    rural: 'Everyday AI: ChatGPT & Gemini Hindi voice prompts, government welfare navigation, and digital fraud/scam safety.',
    town: 'Model Context Protocol (MCP) servers, local vLLM open-weight serving, vector search, and type-safe API deployment.',
  },
  {
    category: 'Infrastructure & Tech',
    rural: 'Smartphone-first, low-bandwidth optimized, offline tool demonstrations, projector-led community sessions.',
    town: 'Campus computer labs, live code sandboxes, API key security, Git repositories, and local edge GPU hardware.',
  },
  {
    category: 'Immediate Takeaway',
    rural: 'Independence in drafting formal letters, verifying agricultural advice, and recognizing online fraud.',
    town: 'Automated study flashcard engines, deployable AI micro-SaaS portfolio apps, and verified internship pathways.',
  },
];

const GOVERNMENT_ROADMAP = [
  {
    phase: 'PHASE 01',
    status: 'Active Deployment',
    statusVariant: 'active',
    title: 'Grassroots & Campus Hub Pilots',
    desc: 'Founder-led masterclasses across regional colleges, polytechnics, and village clusters across eastern and central Uttar Pradesh.',
    regions: ['Gorakhpur', 'Lucknow', 'Varanasi', 'Meerut', 'Prayagraj'],
    milestone: '500+ Regional Participants Reached',
  },
  {
    phase: 'PHASE 02',
    status: 'Scaling Cohort',
    statusVariant: 'scaling',
    title: 'District-Level Collegiate Network',
    desc: 'Establishing recurring monthly AI engineering and literacy clinics across 25+ Tier-2/3 district hubs with partner laboratories.',
    regions: ['25+ Target District Hubs', 'Polytechnic Labs', 'B.Tech Chapters'],
    milestone: '25+ Institutional Partners',
  },
  {
    phase: 'PHASE 03',
    status: 'Strategic Blueprint',
    statusVariant: 'blueprint',
    title: 'Statewide UP Government Partnership',
    desc: 'Collaborating with the UP Skill Development Mission and IT Department to standardize vernacular AI curricula across all 75 districts.',
    regions: ['All 75 UP Districts', 'UPSDM Alignment', 'Public-Private Scale'],
    milestone: 'Statewide Public-Private Impact',
  },
];

const IMPACT_COUNTERS = [
  { value: 75, suffix: '', label: 'UP Districts Vision', detail: 'Statewide regional enablement target' },
  { value: 500, suffix: '+', label: 'Participants Mentored', detail: 'Across grassroots & collegiate cohorts' },
  { value: 0, prefix: '₹', label: 'Student Cost', detail: '100% free educational masterclasses' },
  { value: 25, suffix: '+', label: 'Target District Hubs', detail: 'Collegiate & polytechnic network' },
];

export default function MissionPage() {
  const missionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: 'NorAI Skill Mission & Regional Enablement Movement',
    description:
      'Democratizing everyday AI literacy and deterministic engineering across 75 districts of Uttar Pradesh. 100% free workshops for students, youth, and village citizens.',
    provider: {
      '@type': 'Organization',
      name: 'NorAI Technologies',
      url: 'https://norai.asia',
    },
  };

  return (
    <div className="min-h-screen bg-canvas-base text-ink-primary font-sans selection:bg-accent-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(missionJsonLd) }}
      />

      {/* SECTION 1: EDITORIAL HERO & HIGH-DENSITY TELEMETRY RIBBON */}
      <Section className="relative pt-12 pb-14 md:pt-20 md:pb-20 border-b border-[rgba(20,28,43,0.08)] overflow-hidden">
        {/* Subtle Archival Warmth Gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-canvas-paper/70 to-transparent"
        />

        <Container size="default" className="relative z-10 space-y-10">
          {/* Hero Statement & Narrative */}
          <div className="max-w-4xl space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-sunken border border-[rgba(20,28,43,0.08)] text-terra-600 text-xs font-mono font-semibold">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              <span>Statewide Youth Upliftment &amp; Grassroots AI Movement · Uttar Pradesh</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-ink-primary leading-[1.05] tracking-tight">
              <TextReveal text="Democratizing AI" as="span" /> <br />
              <span className="italic text-terra-600 font-normal">
                from villages to tech hubs.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-ink-body leading-relaxed max-w-2xl font-normal font-sans">
              Artificial intelligence should not be a metro-only privilege. We conduct tailored,
              zero-cost workshops across rural communities, regional schools, and collegiate tech
              hubs in Uttar Pradesh—teaching everyday AI literacy to elders, academic mastery to
              students, and production-grade engineering to builders.
            </p>

            {/* Primary Action Dispatch */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#join-mission"
                className="inline-flex items-center gap-2 rounded-xl bg-[#141C2B] px-5 py-3 font-sans text-xs sm:text-sm font-semibold text-[#F5F0EA] hover:bg-[#1F2B3E] transition-all active:scale-[0.98] group"
              >
                <span>Bring NorAI to Your Campus / Village</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>

              <a
                href="#workshop-tracks"
                className="inline-flex items-center gap-2 rounded-xl border border-[rgba(20,28,43,0.12)] bg-canvas-paper px-5 py-3 font-sans text-xs sm:text-sm font-semibold text-ink-primary hover:bg-canvas-sunken transition-all active:scale-[0.98]"
              >
                <span>Explore Workshop Tracks &amp; Syllabi</span>
              </a>
            </div>
          </div>

          {/* High-Density Live Impact Telemetry Strip */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1 text-xs font-mono text-ink-secondary">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sage-500 animate-pulse" />
                <span className="font-semibold text-sage-800 uppercase tracking-wider">
                  MISSION TELEMETRY ACTIVE
                </span>
              </div>
              <span>Status: Direct Founder-Led Deployments</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {IMPACT_COUNTERS.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[rgba(20,28,43,0.08)] bg-canvas-paper p-4 sm:p-5 space-y-1"
                >
                  <div className="font-display text-2xl sm:text-3xl md:text-4xl text-ink-primary font-normal flex items-baseline">
                    <CountUp
                      value={item.value}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      duration={1.6}
                      className="font-display text-2xl sm:text-3xl md:text-4xl text-ink-primary font-normal"
                    />
                  </div>
                  <div className="font-sans text-xs font-semibold text-ink-primary">
                    {item.label}
                  </div>
                  <p className="font-mono text-[11px] text-ink-secondary leading-tight">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Archival Specimen Documentary Frame */}
          <Reveal delay={0.15}>
            <figure className="relative overflow-hidden rounded-2xl border border-[rgba(20,28,43,0.08)] bg-canvas-paper">
              <div className="relative aspect-[21/9] sm:aspect-[21/8] w-full overflow-hidden bg-canvas-sunken">
                <Image
                  src="/images/about/skill-mission.jpg"
                  alt="NorAI Skill Mission hands-on AI engineering masterclass in a regional college classroom in Uttar Pradesh"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <figcaption className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-[rgba(20,28,43,0.06)] bg-canvas-paper px-4 py-2.5 text-[11px] font-mono text-ink-secondary">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-terra-500" />
                  <span>Specimen UP-75-AI · Classroom Masterclass · Eastern UP Hub</span>
                </span>
                <span className="text-sage-700 font-medium">Democratizing Deterministic Engineering</span>
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* SECTION 2: THE ACTION BLUEPRINT — 3-PILLAR HIGH-DENSITY BENTO */}
      <Section className="py-14 md:py-20 border-b border-[rgba(20,28,43,0.08)] bg-canvas-paper">
        <Container size="default">
          <div className="max-w-3xl mb-10 text-left space-y-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-terra-600">
              The Action Blueprint
            </span>
            <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
              Three grassroots transformations.
            </Heading>
            <p className="text-sm md:text-base text-ink-body font-sans">
              How NorAI calibrates its pedagogy to bridge specific regional divides—from village
              literacy to production software systems.
            </p>
          </div>

          {/* High-Density 3-Column Bento Grid */}
          <GrassrootsTransitionsSlider />
        </Container>
      </Section>

      {/* SECTION 3: WIDESCREEN WORKSHOP TRACK & SYLLABUS WORKBENCH */}
      <Section id="workshop-tracks" className="py-14 md:py-20 bg-canvas-base border-b border-[rgba(20,28,43,0.08)] scroll-mt-20">
        <Container size="default">
          <div className="max-w-3xl mb-10 text-left space-y-2">
            <span className="font-mono text-xs font-semibold text-terra-600 uppercase tracking-wider">
              Curriculum Architecture
            </span>
            <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
              Tailored workshop tracks &amp; live syllabi.
            </Heading>
            <p className="text-sm md:text-base text-ink-body font-sans">
              Select a demographic tier and toggle delivery contexts to explore modules,
              prerequisites, and tangible take-home projects.
            </p>
          </div>

          {/* Interactive Workshop Track Organism */}
          <WorkshopTrackExplorer />
        </Container>
      </Section>

      {/* SECTION 4: DUAL-ENVIRONMENT GROUND EXECUTION MATRIX */}
      <Section className="py-14 md:py-20 bg-canvas-paper border-b border-[rgba(20,28,43,0.08)]">
        <Container size="default">
          <div className="max-w-3xl mb-10 text-left space-y-2">
            <span className="font-mono text-xs font-semibold text-sage-800 uppercase tracking-wider">
              On-Ground Execution Rigor
            </span>
            <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
              How we adapt to geography &amp; digital readiness.
            </Heading>
            <p className="text-sm md:text-base text-ink-body font-sans">
              We never parachute a generic metro slide deck into a village or regional college.
              Every element of the session—from language to network architecture—is tailored to the
              ground reality.
            </p>
          </div>

          {/* Precision Comparison Ledger */}
          <div className="overflow-hidden rounded-2xl border border-[rgba(20,28,43,0.08)] bg-canvas-base">
            <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[rgba(20,28,43,0.08)] bg-canvas-sunken p-4 font-mono text-xs font-semibold text-ink-primary text-left">
              <div className="md:col-span-3 text-ink-secondary">OPERATIONAL DIMENSION</div>
              <div className="md:col-span-4 text-terra-600 flex items-center gap-1.5 pt-2 md:pt-0">
                <Languages className="w-3.5 h-3.5" aria-hidden="true" />
                <span>RURAL &amp; VILLAGE DEPLOYMENT</span>
              </div>
              <div className="md:col-span-5 text-sage-800 flex items-center gap-1.5 pt-2 md:pt-0">
                <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>TOWN &amp; COLLEGIATE DEPLOYMENT</span>
              </div>
            </div>

            <div className="divide-y divide-[rgba(20,28,43,0.06)] text-left">
              {ADAPTATION_FACTORS.map((factor, idx) => (
                <div
                  key={factor.category}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 md:p-6 hover:bg-canvas-paper/60 transition-colors"
                >
                  <div className="md:col-span-3 space-y-1">
                    <span className="font-mono text-[10px] text-ink-secondary block">
                      DIMENSION 0{idx + 1}
                    </span>
                    <div className="font-sans font-semibold text-sm text-ink-primary">
                      {factor.category}
                    </div>
                  </div>
                  <div className="md:col-span-4 text-xs md:text-sm text-ink-body leading-relaxed font-sans">
                    {factor.rural}
                  </div>
                  <div className="md:col-span-5 text-xs md:text-sm text-ink-body leading-relaxed font-sans">
                    {factor.town}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* SECTION 5: STATEWIDE UP ROADMAP & CONNECTED MILESTONE LEDGER */}
      <Section id="statewide-vision" className="py-14 md:py-20 bg-canvas-base border-b border-[rgba(20,28,43,0.08)] scroll-mt-20">
        <Container size="default">
          <div className="max-w-3xl mb-12 text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-sunken border border-[rgba(20,28,43,0.08)] text-terra-600 text-xs font-mono font-semibold">
              <Landmark className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Statewide Vision · Uttar Pradesh Skill Mission</span>
            </div>

            <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
              Partnering for statewide scale across 75 districts.
            </Heading>

            <p className="text-base text-ink-body leading-relaxed font-sans">
              Our long-term objective is to collaborate directly with the{' '}
              <strong className="text-ink-primary font-semibold">Uttar Pradesh Government</strong>, state skill development initiatives, and
              regional technical boards to transform Uttar Pradesh into India&rsquo;s premier
              grassroots AI talent hub.
            </p>
          </div>

          {/* Connected Linear Milestone Timeline Ledger */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {GOVERNMENT_ROADMAP.map((item) => (
              <div
                key={item.phase}
                className="rounded-2xl bg-canvas-paper border border-[rgba(20,28,43,0.08)] p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-[rgba(20,28,43,0.16)] transition-colors"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-[rgba(20,28,43,0.06)] pb-3">
                    <span className="font-mono text-xs font-bold text-terra-600 tracking-wider">
                      {item.phase}
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-canvas-sunken text-ink-secondary border border-[rgba(20,28,43,0.06)]">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-ink-primary font-normal leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-body leading-relaxed font-sans">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.regions.map((reg) => (
                      <span
                        key={reg}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-canvas-base text-ink-secondary border border-[rgba(20,28,43,0.06)]"
                      >
                        {reg}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3.5 border-t border-[rgba(20,28,43,0.06)] text-xs font-mono text-sage-800 font-semibold flex items-center justify-between">
                  <span>{item.milestone}</span>
                  <ShieldCheck className="w-4 h-4 text-sage-600" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* SECTION 6: INTERACTIVE 4-PERSONA ACTION DOCK (CONVERSION ENGINE) */}
      <Section id="join-mission" className="py-16 md:py-24 bg-canvas-paper scroll-mt-20">
        <Container size="default">
          <div className="max-w-3xl mb-10 text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-sunken border border-[rgba(20,28,43,0.08)] text-terra-600 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Multi-Stakeholder Participation Hub</span>
            </div>

            <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
              Become part of the mission.
            </Heading>

            <p className="text-sm md:text-base text-ink-body leading-relaxed font-sans">
              Whether you are a college department chair, Gram Pradhan, CSR leader, or student
              builder—select your pathway below to host a workshop, sponsor compute, or join the
              cohort.
            </p>
          </div>

          {/* Interactive 4-Persona Action Dock */}
          <MissionActionDock />
        </Container>
      </Section>
    </div>
  );
}

