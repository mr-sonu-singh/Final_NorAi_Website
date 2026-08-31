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
    phase: 'Phase 01',
    status: 'Active Deployment',
    title: 'Grassroots & Campus Hub Pilots',
    desc: 'Conducting direct founder-led masterclasses across regional colleges, polytechnics, and village clusters across eastern and central Uttar Pradesh (Gorakhpur, Lucknow, Varanasi, Meerut, Prayagraj).',
    milestone: '500+ Regional Participants Reached',
  },
  {
    phase: 'Phase 02',
    status: 'Scaling Cohort',
    title: 'District-Level Collegiate Network',
    desc: 'Establishing recurring monthly AI engineering and literacy clinics across 25+ Tier-2/3 district hubs, partnering directly with collegiate departments and polytechnic laboratories.',
    milestone: '25+ Institutional Partners',
  },
  {
    phase: 'Phase 03',
    status: 'Strategic Blueprint',
    title: 'Statewide UP Government Partnership',
    desc: 'Collaborating with the Uttar Pradesh Skill Development Mission and Department of IT & Electronics to standardize vernacular AI literacy curricula across all 75 UP districts.',
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

      {/* SECTION 1: MOVEMENT HERO & TELEMETRY RIBBON */}
      <Section className="relative pt-16 pb-16 md:pt-24 md:pb-24 border-b border-[rgba(13,37,61,0.08)] overflow-hidden">
        {/* Archival paper top gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-canvas-paper/70 to-transparent"
        />

        <Container size="default" className="relative z-10 space-y-12">
          <div className="max-w-4xl space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-terra-50 border border-terra-500/20 text-terra-600 text-xs font-mono font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Statewide Youth Upliftment & Grassroots AI Movement · Uttar Pradesh</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-ink-primary leading-[1.04] tracking-display">
              <TextReveal text="Democratizing AI" as="span" /> <br />
              <span className="italic text-terra-500 font-normal">
                from villages to tech hubs.
              </span>
            </h1>

            <p className="fluid-lead text-ink-body leading-relaxed max-w-2xl font-normal text-pretty">
              Artificial intelligence should not be a metro-only privilege. We conduct tailored,
              zero-cost workshops across rural communities, regional schools, and collegiate tech
              hubs in Uttar Pradesh—teaching everyday AI literacy to elders, academic mastery to
              students, and production-grade engineering to builders.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#join-mission"
                className="inline-flex items-center gap-2 rounded-xl bg-terra-500 px-6 py-3.5 font-sans text-sm font-semibold text-white shadow-sm hover:bg-terra-600 transition-all hover:-translate-y-0.5 active:scale-[0.98] group"
              >
                <span>Bring NorAI to Your Campus / Village</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#workshop-tracks"
                className="inline-flex items-center gap-2 rounded-xl border border-line-default bg-canvas-paper px-6 py-3.5 font-sans text-sm font-semibold text-ink-primary hover:bg-canvas-recessed transition-all shadow-sm active:scale-[0.98]"
              >
                <span>Explore Workshop Tracks & Syllabi</span>
              </a>
            </div>
          </div>

          {/* Hero Documentary Photo Frame */}
          <Reveal delay={0.25}>
            <figure className="relative overflow-hidden rounded-2xl border border-[rgba(13,37,61,0.12)] bg-canvas-paper shadow-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-canvas-recessed">
                <Image
                  src="/images/about/skill-mission.jpg"
                  alt="NorAI Skill Mission interactive AI masterclass in a regional college classroom in Uttar Pradesh"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-[1.01]"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <figcaption className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-[rgba(13,37,61,0.08)] bg-canvas-paper/90 px-5 py-3 text-xs font-mono text-ink-secondary">
                <span>NorAI Skill Mission · Hands-on AI Engineering Masterclass · Uttar Pradesh</span>
                <span className="text-sage-700 font-medium">Democratizing Engineering Beyond Metros</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Live Impact Telemetry Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[rgba(13,37,61,0.08)]">
            {IMPACT_COUNTERS.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[rgba(13,37,61,0.08)] bg-canvas-paper p-5 space-y-1"
              >
                <div className="font-display text-3xl sm:text-4xl text-ink-primary font-normal flex items-baseline">
                  <CountUp
                    value={item.value}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    duration={1.8}
                    className="font-display text-3xl sm:text-4xl text-ink-primary font-normal"
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
        </Container>
      </Section>

      {/* SECTION 2: THE ACTION BLUEPRINT — INTERACTIVE TRANSITIONS SLIDER */}
      <Section className="py-16 md:py-24 border-b border-[rgba(13,37,61,0.08)] bg-canvas-paper">
        <Container size="default">
          <div className="max-w-3xl mb-12 text-left space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-terra-600">
              The Action Blueprint
            </span>
            <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
              Three grassroots transformations.
            </Heading>
            <p className="text-base text-ink-body">
              How NorAI calibrates its pedagogy to bridge specific regional divides—from village
              literacy to production software systems.
            </p>
          </div>

          {/* Interactive Sliding Card Deck */}
          <GrassrootsTransitionsSlider />
        </Container>
      </Section>

      {/* SECTION 3: WIDESCREEN WORKSHOP TRACK & SYLLABUS WORKBENCH */}
      <Section id="workshop-tracks" className="py-16 md:py-24 bg-canvas-base border-b border-[rgba(13,37,61,0.08)] scroll-mt-20">
        <Container size="wide">
          <div className="max-w-3xl mb-12 text-left space-y-3">
            <span className="font-mono text-xs font-semibold text-terra-600 uppercase tracking-wider">
              Curriculum Architecture
            </span>
            <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
              Tailored workshop tracks &amp; live syllabi.
            </Heading>
            <p className="text-base text-ink-body">
              Select a demographic tier and toggle delivery contexts to explore modules,
              prerequisites, and tangible take-home projects.
            </p>
          </div>

          {/* Interactive Workshop Track Organism */}
          <WorkshopTrackExplorer />
        </Container>
      </Section>

      {/* SECTION 4: DUAL-ENVIRONMENT GROUND EXECUTION MATRIX */}
      <Section className="py-16 md:py-24 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="max-w-3xl mb-14 text-left space-y-3">
            <span className="font-mono text-xs font-semibold text-sage-700 uppercase tracking-wider">
              On-Ground Execution Rigor
            </span>
            <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
              How we adapt to geography &amp; digital readiness.
            </Heading>
            <p className="text-base text-ink-body">
              We never parachute a generic metro slide deck into a village or regional college.
              Every element of the session—from language to network architecture—is tailored to the
              ground reality.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[rgba(13,37,61,0.12)] bg-canvas-base shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[rgba(13,37,61,0.08)] bg-canvas-sunken/60 p-4 font-mono text-xs font-semibold text-ink-primary text-left">
              <div className="md:col-span-3 text-ink-secondary">Operational Dimension</div>
              <div className="md:col-span-4 text-terra-600 flex items-center gap-1.5 pt-2 md:pt-0">
                <Languages className="w-3.5 h-3.5" />
                <span>Rural &amp; Village Deployment</span>
              </div>
              <div className="md:col-span-5 text-sage-700 flex items-center gap-1.5 pt-2 md:pt-0">
                <Building2 className="w-3.5 h-3.5" />
                <span>Town &amp; Collegiate Deployment</span>
              </div>
            </div>

            <div className="divide-y divide-[rgba(13,37,61,0.08)] text-left">
              {ADAPTATION_FACTORS.map((factor) => (
                <div
                  key={factor.category}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 md:p-6 hover:bg-canvas-paper/50 transition-colors"
                >
                  <div className="md:col-span-3 font-sans font-semibold text-sm text-ink-primary">
                    {factor.category}
                  </div>
                  <div className="md:col-span-4 text-xs md:text-sm text-ink-body leading-relaxed">
                    {factor.rural}
                  </div>
                  <div className="md:col-span-5 text-xs md:text-sm text-ink-body leading-relaxed">
                    {factor.town}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* SECTION 5: STATEWIDE UP ROADMAP & IMPACT TRACKER */}
      <Section id="statewide-vision" className="py-16 md:py-24 bg-canvas-base border-b border-[rgba(13,37,61,0.08)] scroll-mt-20">
        <Container size="default">
          <div className="max-w-3xl mb-14 text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ochre-50 border border-ochre-500/20 text-ochre-700 text-xs font-mono font-semibold">
              <Landmark className="w-3.5 h-3.5" />
              <span>Statewide Vision · Uttar Pradesh Skill Mission</span>
            </div>

            <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
              Partnering for statewide scale across 75 districts.
            </Heading>

            <p className="text-base md:text-lg text-ink-body leading-relaxed">
              Our long-term objective is to collaborate directly with the{' '}
              <strong>Uttar Pradesh Government</strong>, state skill development initiatives, and
              regional technical boards to transform Uttar Pradesh into India&rsquo;s premier
              grassroots AI talent hub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {GOVERNMENT_ROADMAP.map((item) => (
              <div
                key={item.phase}
                className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm flex flex-col justify-between space-y-6 hover:border-terra-500/30 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-terra-600 uppercase tracking-wider">
                      {item.phase}
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-canvas-recessed border border-[rgba(13,37,61,0.08)] text-ink-secondary">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-ink-primary font-normal">
                    {item.title}
                  </h3>

                  <p className="text-sm text-ink-body leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] text-xs font-mono text-sage-800 font-semibold flex items-center justify-between">
                  <span>{item.milestone}</span>
                  <ShieldCheck className="w-4 h-4 text-sage-600" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* SECTION 6: INTERACTIVE 4-PERSONA ACTION DOCK (CONVERSION ENGINE) */}
      <Section id="join-mission" className="py-20 md:py-28 bg-canvas-paper scroll-mt-20">
        <Container size="default">
          <div className="max-w-3xl mb-12 text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terra-50 border border-terra-500/20 text-terra-600 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Stakeholder Participation Hub</span>
            </div>

            <Heading as="h2" variant="display-lg" className="text-ink-primary font-normal">
              Become part of the mission.
            </Heading>

            <p className="text-base md:text-lg text-ink-body leading-relaxed">
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
