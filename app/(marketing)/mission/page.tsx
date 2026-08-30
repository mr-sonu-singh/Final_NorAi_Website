import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { MeshGradient } from '@/components/atoms/MeshGradient';
import { WorkshopTrackExplorer } from '@/components/organisms/WorkshopTrackExplorer';
import {
  Users,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Sparkles,
  School,
  Landmark,
  Languages,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/mission',
  title: 'AI Skill Mission & Regional Enablement',
  description:
    'Democratizing AI literacy, practical tool usage, and deterministic engineering across rural villages, town youth, and regional colleges in Uttar Pradesh.',
});

const ADAPTATION_FACTORS = [
  {
    category: 'Target Demographics',
    rural: 'Village elders, rural youth, local shopkeepers, women self-help groups, first-time digital citizens.',
    town: 'High school students, undergraduate engineers, polytechnic diploma students, aspiring founders.',
  },
  {
    category: 'Primary Curriculum',
    rural: 'Everyday AI: ChatGPT, Gemini, Hindi voice prompts, government welfare navigation, and digital fraud/scam safety.',
    town: 'Academic research workflows, coding fundamentals, Model Context Protocol (MCP), and local vLLM model serving.',
  },
  {
    category: 'Infrastructure & Tech',
    rural: 'Smartphone-first, low-bandwidth optimized, offline AI tool demonstrations, projector-led community sessions.',
    town: 'Campus computer labs, live code sandboxes, API key management, Git repositories, and local edge hardware.',
  },
  {
    category: 'Immediate Takeaway',
    rural: 'Independence in drafting formal letters, verifying news, using voice AI for daily tasks, and avoiding online fraud.',
    town: 'Automated study flashcard engines, deployable AI micro-SaaS portfolio apps, and verified internship pathways.',
  },
];

const GOVERNMENT_ROADMAP = [
  {
    phase: 'Phase 01',
    status: 'Active Deployment',
    title: 'Grassroots & Campus Hub Pilots',
    desc: 'Conducting direct founder-led masterclasses across select regional colleges, polytechnics, and village clusters across eastern and central Uttar Pradesh.',
    milestone: '500+ Regional Participants Reached',
  },
  {
    phase: 'Phase 02',
    status: 'Scaling Cohort',
    title: 'District-Level Collegiate Network',
    desc: 'Establishing recurring monthly AI engineering and literacy clinics across 25+ Tier-2/3 district hubs (Gorakhpur, Lucknow, Varanasi, Meerut, Prayagraj).',
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

const INITIATIVE_PILLARS = [
  {
    icon: Users,
    badge: 'Tier 1 Inclusion',
    title: 'Rural & Senior AI Literacy',
    subtitle: 'Practical AI for everyday citizens and elders.',
    description:
      'We introduce ChatGPT, Gemini, and Hindi voice interfaces to rural citizens, demystifying technology and teaching everyday problem solving, crop advice, and digital scam prevention.',
    metrics: '100% Free Vernacular Sessions',
  },
  {
    icon: School,
    badge: 'Tier 2 Foundations',
    title: 'Youth & Academic Enablement',
    subtitle: 'AI study engines for schools and colleges.',
    description:
      'Students learn to turn AI into a personal tutor for STEM subjects, convert lecture recordings into study cards via Course Note-Taker, and develop foundational coding literacy.',
    metrics: 'Free Scholar Tier Access',
  },
  {
    icon: Landmark,
    badge: 'Tier 3 Engineering',
    title: 'Advanced Builder Masterclasses',
    subtitle: 'Production-grade engineering & MCP systems.',
    description:
      'For town students ready for real software craft: we teach Model Context Protocol (MCP) servers, local open-weight model serving (vLLM), and full-stack micro-SaaS deployments.',
    metrics: 'Direct Founder Mentorship',
  },
];

export default function MissionPage() {
  const missionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: 'NorAI Skill Mission & Youth Enablement',
    description:
      'Democratizing everyday AI literacy and deterministic engineering across rural villages, town youth, and regional colleges in Uttar Pradesh.',
    provider: {
      '@type': 'Organization',
      name: 'NorAI Technologies',
      url: 'https://norai.in',
    },
  };

  return (
    <div className="min-h-screen bg-canvas-base text-ink-primary font-sans selection:bg-accent-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(missionJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 border-b border-[rgba(13,37,61,0.08)] overflow-hidden">
        <MeshGradient intensity="subtle" />

        <Container size="default" className="relative z-10">
          <div className="max-w-4xl space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Social Impact & Statewide Youth Upliftment · Uttar Pradesh</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-ink-primary leading-[1.04] tracking-display">
              Democratizing AI <br />
              <span className="italic text-accent-500 font-normal">
                from villages to tech hubs.
              </span>
            </h1>

            <p className="fluid-lead text-ink-body leading-relaxed max-w-2xl font-normal text-pretty">
              Artificial intelligence should not be a metro-only privilege. We conduct tailored, hands-on workshops across rural communities, regional schools, and collegiate tech hubs in Uttar Pradesh—teaching everyday AI literacy to elders, academic mastery to students, and production-grade engineering to builders.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link href="#workshop-tracks">
                <Button variant="primary" size="lg" className="group">
                  <span>Explore Workshop Tracks</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/contact?service=campus-workshop">
                <Button variant="secondary" size="lg">
                  Request a Workshop Session
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Manifesto / Editorial Body */}
      <Section className="py-16 md:py-24 border-b border-[rgba(13,37,61,0.08)] bg-canvas-base">
        <Container size="default">
          <div className="mx-auto max-w-[760px] space-y-6 text-[17px] leading-[1.8] text-ink-body text-left">
            <h2 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal leading-tight">
              Bridging the Real AI Divide: Why One Curriculum Never Fits All
            </h2>

            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[64px] first-letter:leading-[0.85] first-letter:text-accent-500">
              When artificial intelligence is discussed in tech headlines, it is almost always framed through Silicon Valley APIs or Tier-1 corporate boardrooms. But in Uttar Pradesh and regional Bharat, the reality on the ground is bifurcated:
            </p>

            <p>
              In <strong>rural villages and small towns</strong>, elderly citizens and first-time digital users struggle with bureaucratic paperwork, local dialect translations, and emerging digital scam calls. Introducing conversational voice tools like ChatGPT and Gemini in simple Hindi creates immediate self-reliance and daily dignity.
            </p>

            <p>
              Meanwhile, in <strong>semi-urban colleges and polytechnic hubs</strong>, ambitious computer science students are already playing with AI chatbots but lack the engineering discipline to build real software. They don&rsquo;t need more &ldquo;prompt guru&rdquo; videos—they need to learn the underlying architecture: Model Context Protocol (MCP) servers, local open-weight inference (vLLM), vector search, and type-safe API deployment.
            </p>

            {/* Editorial Pull-Quote */}
            <figure className="my-12 border-y border-accent-500/20 py-8">
              <span aria-hidden="true" className="block font-display text-[72px] leading-none text-accent-500">
                &ldquo;
              </span>
              <blockquote className="-mt-6 font-display text-[26px] italic leading-snug text-ink-primary">
                True digital empowerment is not teaching people to click a prompt. It is giving an elder the confidence to navigate public services with voice AI, and giving a collegiate builder the architecture to deploy production software.
              </blockquote>
              <figcaption className="mt-4 font-sans text-xs font-mono text-ink-secondary">
                NorAI Skill Mission Charter · Uttar Pradesh, India
              </figcaption>
            </figure>

            <p>
              That is why the NorAI Skill Mission operates with <strong>demographic precision</strong>. We calibrate each workshop to the local community&rsquo;s specific technological starting point—ensuring genuine capability that uplifts the entire state.
            </p>
          </div>
        </Container>
      </Section>

      {/* 3 Core Action Pillars */}
      <section className="py-16 md:py-24 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="max-w-2xl mb-14 text-left space-y-3">
            <h2 className="font-display text-4xl sm:text-5xl text-ink-primary font-normal">
              Three Pillars of Grassroots Action.
            </h2>
            <p className="text-base text-ink-body">
              How NorAI structures its outreach to serve different segments of regional society.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
            {INITIATIVE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-3xl bg-canvas-base border border-[rgba(13,37,61,0.12)] p-8 shadow-sm flex flex-col justify-between space-y-6 hover:border-accent-500/30 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-accent-50 text-accent-500 border border-accent-500/20">
                        {pillar.badge}
                      </span>
                      <Icon className="w-5 h-5 text-accent-500" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-display text-2xl text-ink-primary font-normal">
                        {pillar.title}
                      </h3>
                      <p className="text-xs font-mono text-accent-500">
                        {pillar.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-ink-body leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] flex items-center justify-between text-xs font-mono text-accent-secondary font-semibold">
                    <span>{pillar.metrics}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Interactive Workshop Track Explorer */}
      <section id="workshop-tracks" className="py-16 md:py-24 bg-canvas-base border-b border-[rgba(13,37,61,0.08)] scroll-mt-20">
        <Container size="default">
          <div className="max-w-2xl mb-12 text-left space-y-3">
            <span className="font-mono text-xs font-semibold text-accent-500 uppercase tracking-wider">
              Curriculum Architecture
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-ink-primary font-normal">
              Tailored Workshop Tracks.
            </h2>
            <p className="text-base text-ink-body">
              Select a demographic tier and toggle delivery contexts to explore specific syllabi, tools, and real-world outcomes.
            </p>
          </div>

          {/* Interactive Organism */}
          <WorkshopTrackExplorer />
        </Container>
      </section>

      {/* Context Adaptation Matrix */}
      <section className="py-16 md:py-24 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="max-w-3xl mb-14 text-left space-y-3">
            <span className="font-mono text-xs font-semibold text-accent-secondary uppercase tracking-wider">
              On-Ground Execution Rigor
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-ink-primary font-normal">
              How We Adapt to Geography & Digital Readiness.
            </h2>
            <p className="text-base text-ink-body">
              We never parachute a generic metro slide deck into a village or regional college. Every element of the session—from language to network architecture—is tailored to the ground reality.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[rgba(13,37,61,0.12)] bg-canvas-base shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[rgba(13,37,61,0.08)] bg-canvas-recessed/50 p-4 font-mono text-xs font-semibold text-ink-primary text-left">
              <div className="md:col-span-3 text-ink-secondary">Dimension</div>
              <div className="md:col-span-4 text-accent-500 flex items-center gap-1.5 pt-2 md:pt-0">
                <Languages className="w-3.5 h-3.5" />
                <span>Rural & Village Deployment</span>
              </div>
              <div className="md:col-span-5 text-accent-secondary flex items-center gap-1.5 pt-2 md:pt-0">
                <Building2 className="w-3.5 h-3.5" />
                <span>Town & Collegiate Deployment</span>
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
      </section>

      {/* Statewide Vision & UP Government Partnership Blueprint */}
      <section id="statewide-vision" className="py-16 md:py-24 bg-canvas-base border-b border-[rgba(13,37,61,0.08)] scroll-mt-20">
        <Container size="default">
          <div className="max-w-3xl mb-14 text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff4d6] border border-[#7c5506]/20 text-[#7c5506] text-xs font-mono font-semibold">
              <Landmark className="w-3.5 h-3.5" />
              <span>Statewide Vision · Uttar Pradesh Skill Mission</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl text-ink-primary font-normal">
              Partnering for Statewide Scale.
            </h2>

            <p className="text-base md:text-lg text-ink-body leading-relaxed">
              Our long-term objective is to collaborate directly with the <strong>Uttar Pradesh Government</strong>, state skill development initiatives, and regional technical boards to transform Uttar Pradesh into India&rsquo;s premier grassroots AI talent hub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {GOVERNMENT_ROADMAP.map((item) => (
              <div
                key={item.phase}
                className="rounded-3xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-accent-500 uppercase tracking-wider">
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

                <div className="pt-4 border-t border-[rgba(13,37,61,0.08)] text-xs font-mono text-accent-secondary font-semibold flex items-center justify-between">
                  <span>{item.milestone}</span>
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pre-Footer Call to Action for Colleges, Panchayats & Government Leads */}
      <section className="py-20 md:py-28 bg-canvas-paper">
        <Container size="default">
          <div className="rounded-3xl bg-canvas-base border border-[rgba(13,37,61,0.12)] p-10 md:p-16 text-center shadow-lg relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-accent-50 border border-accent-500/20 text-accent-500 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-normal text-ink-primary leading-tight">
                Bring NorAI to your village, school, or collegiate campus.
              </h2>

              <p className="text-base md:text-lg text-ink-body leading-relaxed">
                Whether you are a Gram Pradhan, school principal, college department chair, or government official—partner with us to organize a tailored AI workshop for your community.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact?service=campus-workshop" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto group">
                    <span>Request a Workshop Session</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/contact?service=government-partnership" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Institutional & Government Inquiries
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
