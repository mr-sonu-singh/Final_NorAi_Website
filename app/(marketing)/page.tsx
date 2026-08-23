import React from 'react';
import { buildMetadata, getOrganizationJsonLd } from '@/lib/seo';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { MeshGradient } from '@/components/foundation/MeshGradient';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Cpu,
  Layers,
  HelpCircle,
  ChevronDown,
  Terminal,
} from 'lucide-react';

export const metadata = buildMetadata({
  path: '/',
  title: 'NorAI Technologies — Micro-SaaS & Enterprise AI Automation',
  description: 'Automate your operations with NorAI micro-SaaS suite: AI Resume Shortlister, Course Note-Taker, Community Chat Digest, and Smart Government Job News.',
});

const METRICS_DATA = [
  { value: '5+', label: 'Core Micro-Tools', desc: 'Pre-built SaaS agents ready to deploy' },
  { value: '< 1s', label: 'Processing Latency', desc: 'Sub-second response time guarantee' },
  { value: '100%', label: 'Automated Pipelines', desc: 'Zero manual intervention required' },
  { value: '24/7', label: 'API Availability', desc: 'Enterprise reliability & 99.9% SLA' },
];

const PRODUCTS_DATA = [
  {
    title: 'AI Resume Shortlister',
    badge: 'Recruitment AI',
    desc: 'Parse, score, and rank hundreds of applicant resumes instantly with customizable candidate criteria and skill extraction.',
    icon: Sparkles,
    href: '/products',
  },
  {
    title: 'Course Note-Taker',
    badge: 'EdTech AI',
    desc: 'Transform raw video lectures, audio recordings, and slides into concise executive summaries and interactive flashcards.',
    icon: Zap,
    href: '/products',
  },
  {
    title: 'Community Chat Digest',
    badge: 'Community AI',
    desc: 'Digest noisy Telegram, Discord, and Slack channels into daily executive briefs highlighting actionable community feedback.',
    icon: Cpu,
    href: '/products',
  },
  {
    title: 'Smart Government Job News',
    badge: 'Media AI',
    desc: 'Curate hyper-local regional news and market updates filtered by sentiment, relevance, and custom interest categories.',
    icon: Layers,
    href: '/products',
  },
];

const UNITY_PRODUCTS_DATA = [
  {
    title: 'AI-Powered AR Experiences',
    badge: 'AR + AI',
    desc: 'Build intelligent augmented reality experiences using Unity, AR Foundation, computer vision, and AI-powered interactions.',
    icon: ShieldCheck,
  },
  {
    title: 'AI-Powered VR Training',
    badge: 'VR + AI',
    desc: 'Create immersive VR training simulations for education, healthcare, industrial training, safety, and enterprise learning.',
    icon: ShieldCheck,
  },
  {
    title: 'AI Virtual Characters',
    badge: 'AI + Unity',
    desc: 'Develop intelligent virtual characters, AI NPCs, conversational agents, and interactive digital environments inside Unity.',
    icon: Cpu,
  },
  {
    title: 'AI 3D & XR Solutions',
    badge: '3D + XR',
    desc: 'Combine Unity 3D, AI, AR, and VR to build interactive simulations, visualization systems, digital twins, and next-generation experiences.',
    icon: Layers,
  },
];

const HOW_IT_WORKS_DATA = [
  {
    step: '01',
    title: 'Tell Us Your Workflow',
    desc: 'Define your repetitive candidate screening, lecture summarization, or chat filtering bottleneck.',
  },
  {
    step: '02',
    title: 'We Match a Micro-Agent',
    desc: 'Select from our pre-built NorAI micro-SaaS agents or configure a custom API integration.',
  },
  {
    step: '03',
    title: 'Plug In & Go Live',
    desc: 'Connect our REST API or standalone dashboard and experience 10x workflow speedup instantly.',
  },
];

const FEATURES_DATA = [
  {
    title: 'Sub-Second Latency',
    desc: 'Optimized neural inference engine designed for instantaneous response times and low latency processing.',
    icon: Clock,
  },
  {
    title: 'Reliable Failover',
    desc: 'Built with redundancy and multi-cloud compute nodes ensuring 99.9% API availability and zero downtime.',
    icon: ShieldCheck,
  },
  {
    title: 'Predictable Pricing',
    desc: 'Replace expensive manual labor with transparent pay-as-you-go micro-SaaS subscriptions.',
    icon: CheckCircle2,
  },
  {
    title: 'Drop-In Integration',
    desc: 'One-line API keys, webhooks, and drop-in UI widgets compatible with Next.js, React, and REST clients.',
    icon: Zap,
  },
];

const TESTIMONIALS_DATA = [
  {
    quote: 'NorAI Resume Shortlister cut our candidate screening phase from 4 days to under 15 minutes. It is an indispensable tool for our HR team.',
    author: 'Priya Sharma',
    role: 'Head of Talent, TechCorp India',
  },
  {
    quote: 'The Course Note-Taker transformed our online academy experience. Students love the auto-generated summaries and flashcards!',
    author: 'Arjun Kapoor',
    role: 'Director of Learning, EdSpark',
  },
  {
    quote: 'Community Chat Digest keeps our team informed of customer feedback across 10,000+ Discord members without spending hours reading chats.',
    author: 'Meera Sundaram',
    role: 'Community Lead, Web3 Global',
  },
];

const FAQ_DATA = [
  {
    question: 'How fast can I set up NorAI micro-tools for my business?',
    answer: 'You can get started in less than 5 minutes. Our tools offer pre-built web dashboards as well as standard REST API endpoints with instant API key access.',
  },
  {
    question: 'Is my business data private and secure?',
    answer: 'Yes, absolutely. All data passed through NorAI pipelines is encrypted in transit and at rest. We do not use customer data for public model training.',
  },
  {
    question: 'Can I request a custom AI tool for my unique business workflow?',
    answer: 'Yes! In addition to our pre-built micro-SaaS suite, our AI engineering team builds custom enterprise agents tailored to your custom database and APIs.',
  },
  {
    question: 'What pricing options are available?',
    answer: 'We offer flexible pay-as-you-go usage tiers for startups, flat monthly SaaS subscriptions for growing teams, and enterprise custom plans.',
  },
];

export default function HomePage() {
  const organizationJsonLd = getOrganizationJsonLd();

  return (
    <div className="text-primary-800 min-h-screen font-sans selection:bg-[var(--accent-500)] selection:text-[var(--bg-page)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* Hero Section */}
      <Section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden isolate">
        {/* Cover image — place your file at /public/images/hero-bg.jpg (rename here if your file uses a different name/extension).
            backgroundColor is a fallback: if the image fails to load, this dark navy keeps the white hero text readable
            instead of disappearing against a white page. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-bg.jpg')",
            backgroundColor: 'var(--primary-900)',
          }}
        />

        {/* AI Neural Network Animation */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          {/* Soft AI Glow - background only */}
          <div
            className="
              absolute
              -left-20
              top-1/2
              w-72
              h-72
              rounded-full
              bg-cyan-400/10
              blur-[100px]
              animate-pulse
            "
          />

          <div
            className="
              absolute
              -right-20
              top-1/3
              w-80
              h-80
              rounded-full
              bg-blue-500/10
              blur-[110px]
              animate-pulse
            "
            style={{ animationDelay: '1200ms' }}
          />

          {/* AI Node - Left */}
          <div className="absolute left-[15%] top-[30%]">
            <span
              className="
                block
                w-2
                h-2
                rounded-full
                bg-cyan-300
                shadow-[0_0_18px_rgba(103,232,249,0.9)]
                animate-pulse
              "
            />

            <span
              className="
                absolute
                -inset-3
                rounded-full
                border
                border-cyan-300/20
                animate-ping
              "
            />
          </div>

          {/* AI Node - Right */}
          <div className="absolute right-[22%] top-[25%]">
            <span
              className="
                block
                w-1.5
                h-1.5
                rounded-full
                bg-cyan-200
                shadow-[0_0_15px_rgba(103,232,249,0.8)]
                animate-pulse
              "
              style={{ animationDelay: '500ms' }}
            />
          </div>

          {/* AI Node - Bottom Left */}
          <div className="absolute left-[27%] bottom-[18%]">
            <span
              className="
                block
                w-1.5
                h-1.5
                rounded-full
                bg-blue-200
                shadow-[0_0_14px_rgba(147,197,253,0.8)]
                animate-pulse
              "
              style={{ animationDelay: '900ms' }}
            />
          </div>

          {/* AI Node - Bottom Right */}
          <div className="absolute right-[13%] bottom-[25%]">
            <span
              className="
                block
                w-2
                h-2
                rounded-full
                bg-cyan-300
                shadow-[0_0_18px_rgba(103,232,249,0.8)]
                animate-pulse
              "
              style={{ animationDelay: '1400ms' }}
            />
          </div>

          {/* Small Neural Connection Lines */}

          <div
            className="
              absolute
              left-[15.5%]
              top-[30.5%]
              w-32
              h-px
              origin-left
              rotate-[18deg]
              bg-gradient-to-r
              from-cyan-300/40
              to-transparent
              animate-pulse
            "
          />

          <div
            className="
              absolute
              right-[22%]
              top-[25%]
              w-28
              h-px
              origin-right
              -rotate-[20deg]
              bg-gradient-to-l
              from-cyan-300/30
              to-transparent
              animate-pulse
            "
            style={{ animationDelay: '700ms' }}
          />

          {/* Tiny Data Particles */}
          <span className="absolute left-[9%] top-[45%] w-1 h-1 rounded-full bg-cyan-200/70 animate-pulse" />

          <span
            className="absolute left-[35%] top-[20%] w-1 h-1 rounded-full bg-blue-200/70 animate-pulse"
            style={{ animationDelay: '300ms' }}
          />

          <span
            className="absolute right-[32%] top-[45%] w-1 h-1 rounded-full bg-cyan-200/70 animate-pulse"
            style={{ animationDelay: '800ms' }}
          />

          <span
            className="absolute right-[8%] top-[40%] w-1 h-1 rounded-full bg-cyan-300/70 animate-pulse"
            style={{ animationDelay: '1100ms' }}
          />
        </div>
        {/* Tinted overlay so text/headline stay readable over the image */}
        <div aria-hidden="true" className="absolute inset-0 bg-[var(--bg-page)]/20" />

        <Container size="default" className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="md:col-span-6 space-y-6 text-center md:text-left">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/30 bg-white/10 text-white text-xs font-mono tracking-wide uppercase">
                <Terminal className="w-3.5 h-3.5 text-white" />
                <span>NorAI Micro-SaaS • Autonomous AI Agents</span>
              </div>

              {/* Main Headline */}
                <Heading
                  as="h1"
                  variant="display-xl"
                  className="font-display font-extrabold text-white tracking-[-0.03em] leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
                >
                  Autonomous Micro-AI Agents for{" "}
                  <span className="text-[#DDF7FF] underline decoration-[color:var(--accent-mono)/0.6] underline-offset-8">
                    High-Growth Businesses
                  </span>
                </Heading>

                {/* Subhead */}
                <Text
                  variant="body-lg"
                  className="font-sans font-medium text-[#E8F7FF] max-w-2xl mx-auto md:mx-0 leading-[1.8] tracking-[-0.01em] drop-shadow-[0_1px_6px_rgba(0,20,50,0.35)]"
                >
                  Automate your daily operations with NorAI’s micro-SaaS suite. Shortlist
                  candidates, summarize lectures, digest community chats, and power
                  hyper-local news feeds with sub-second API execution.
                </Text>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      className="
                        w-full sm:w-auto
                        bg-[var(--accent-500)]
                        hover:bg-[var(--accent-mono)]
                        text-white
                        font-semibold
                        px-8 py-3.5
                        rounded-lg
                        shadow-lg shadow-[color:var(--accent-500)/0.3]
                        hover:shadow-[color:var(--accent-mono)/0.4]
                        transition-all duration-200
                      "
                    >
                      Get Started Free
                      <ArrowRight className="w-4 h-4 ml-2 inline-block" />
                    </Button>
                  </Link>

                  <Link href="/products" className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="
                        w-full sm:w-auto
                        border border-white/70
                        bg-white/95
                        hover:bg-[#E8F7FF]
                        text-[var(--accent-700)]
                        font-semibold
                        px-8 py-3.5
                        rounded-lg
                        shadow-lg shadow-black/10
                        transition-all duration-200
                      "
                    >
                      Explore Micro-Tools
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="pt-4 flex items-center justify-center md:justify-start gap-6 text-xs font-mono text-[#D5F5FF]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent-mono)]" />
                    No credit card required
                  </span>

                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent-mono)]" />
                    Instant API keys
                  </span>
                </div>
            </div>

            {/* Right Signature Element: placeholder pending homepage rebuild */}
            <div className="md:col-span-6 flex justify-center">
              <MeshGradient className="inset-0 w-full h-full" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Impact Stats Grid - Engineered Console Visual Language */}
      <Section className="py-12 border-y border-slate-200/60 bg-transparent" aria-label="Key performance metrics">
        <Container size="default">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 list-none p-0 m-0" role="list">
            {METRICS_DATA.map((metric, index) => (
              <li
                key={index}
                className="bg-gradient-to-br from-white via-[#F8FBFF] to-[#EEF5FF] border border-[color:var(--accent-500)/0.1] rounded-xl p-5 relative overflow-hidden group hover:border-[color:var(--accent-500)/0.3] hover:shadow-[0_12px_35px_rgba(46,91,255,0.10)] transition-all duration-300 flex flex-col justify-between space-y-3"              >
                {/* Console Status Tag Header */}
                <div className="flex items-center justify-between text-[10px] font-mono text-primary-700">
                  <span className="uppercase tracking-wider font-bold">METRIC_0{index + 1}</span>
                  <span className="inline-flex items-center gap-1 text-[var(--accent-mono)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-mono)] animate-pulse" />
                    LIVE
                  </span>
                </div>

                {/* Big Metric Value */}
                <div>
                  <div className="text-3xl md:text-4xl font-extrabold text-[var(--accent-500)] font-mono tracking-tight group-hover:text-[var(--accent-mono)] transition-colors">
                    {metric.value}
                  </div>
                  <div className="text-sm font-bold text-primary-800 font-display mt-1">
                    {metric.label}
                  </div>
                </div>

                {/* Description Footer */}
                <div className="text-xs text-primary-700 pt-2 border-t border-slate-200/60 font-sans leading-relaxed">
                  {metric.desc}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

     
      {/* Product Suite Matrix */}
        <Section
            className="
              relative
              py-20
              overflow-hidden
              bg-[radial-gradient(circle_at_8%_35%,rgba(59,130,246,0.12),transparent_32%),radial-gradient(circle_at_92%_65%,rgba(139,92,246,0.12),transparent_34%)]
            "
          >
              {/* AI Ambient Glow */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                  >
                    {/* Blue Glow */}
                    <div
                      className="
                        absolute
                        -left-32
                        top-20
                        w-[420px]
                        h-[420px]
                        rounded-full
                        bg-blue-500/15
                        blur-[90px]
                        animate-pulse
                      "
                      style={{
                        animationDuration: "4s",
                      }}
                    />

                    {/* Purple Glow */}
                    <div
                      className="
                        absolute
                        -right-32
                        bottom-10
                        w-[460px]
                        h-[460px]
                        rounded-full
                        bg-violet-500/15
                        blur-[95px]
                        animate-pulse
                      "
                      style={{
                        animationDuration: "5s",
                        animationDelay: "1s",
                      }}
                    />

                    {/* Small Cyan Glow */}
                    <div
                      className="
                        absolute
                        left-1/2
                        top-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        w-[220px]
                        h-[220px]
                        rounded-full
                        bg-cyan-400/10
                        blur-[80px]
                      "
                    />

                    {/* AI Nodes */}
                    <span
                      className="
                        absolute
                        left-[10%]
                        top-[30%]
                        w-2
                        h-2
                        rounded-full
                        bg-blue-500
                        shadow-[0_0_20px_rgba(59,130,246,0.9)]
                        animate-pulse
                      "
                    />

                    <span
                      className="
                        absolute
                        right-[12%]
                        top-[28%]
                        w-2
                        h-2
                        rounded-full
                        bg-violet-500
                        shadow-[0_0_20px_rgba(139,92,246,0.9)]
                        animate-pulse
                      "
                      style={{ animationDelay: "800ms" }}
                    />
                  </div>

          <Container size="default" className="relative z-10">
                  <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                    <Heading as="h2" variant="display-md" className="font-display font-extrabold text-primary-800">
                      NorAI Micro-SaaS Product Suite
                    </Heading>
                    <Text variant="body-md" className="text-primary-700">
                      Purpose-built AI micro-tools designed for immediate operational speedup and zero-friction automation.
                    </Text>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PRODUCTS_DATA.map((prod, index) => {
                      const IconComp = prod.icon;
                      return (
                        <div
                            key={index}
                            className="
                              tilt-card
                              group
                              relative
                              overflow-hidden
                              p-6
                              flex
                              flex-col
                              justify-between
                              space-y-6
                              bg-gradient-to-br
                              from-white
                              via-[#FAFCFF]
                              to-[#EEF5FF]
                              border
                              border-[color:var(--accent-500)/0.12]
                              hover:border-[color:var(--accent-500)/0.35]
                              hover:shadow-[0_20px_50px_rgba(46,91,255,0.14)]
                              hover:-translate-y-1
                              transition-all
                              duration-300
                            "
                          >
                            {/* Card AI Glow */}
                            <div
                              aria-hidden="true"
                              className="
                                absolute
                                -top-20
                                -right-20
                                w-40
                                h-40
                                rounded-full
                                bg-blue-400/10
                                blur-3xl
                                opacity-0
                                group-hover:opacity-100
                                transition-opacity
                                duration-500
                              "
                            />

                            {/* Card Scan Line */}
                            <div
                              aria-hidden="true"
                              className="
                                absolute
                                left-0
                                right-0
                                top-0
                                h-px
                                bg-gradient-to-r
                                from-transparent
                                via-blue-400/40
                                to-transparent
                                opacity-0
                                group-hover:opacity-100
                                transition-opacity
                                duration-500
                              "
                            />
                          <div className="relative z-10 space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="p-3 rounded-lg bg-[color:var(--accent-500)/0.1] border border-[color:var(--accent-500)/0.2] text-[var(--accent-500)] group-hover:scale-105 transition-transform">
                                <IconComp className="w-5 h-5" />
                              </div>
                              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--bg-page)] text-[var(--accent-mono)] border border-slate-200/60">
                                {prod.badge}
                              </span>
                            </div>

                            <Heading as="h3" variant="heading-lg" className="font-display font-bold text-primary-800 group-hover:text-[var(--accent-500)] transition-colors">
                              {prod.title}
                            </Heading>

                            <Text variant="body-sm" className="text-primary-700 leading-relaxed">
                              {prod.desc}
                            </Text>
                          </div>

                          <div className="relative z-10 pt-2 border-t border-slate-200/60">
                            <Link href={prod.href} className="inline-flex items-center text-xs font-mono font-semibold text-[var(--accent-500)] group-hover:text-[var(--accent-mono)]">
                              Learn more & try tool <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Container>
              </Section>

              {/* AI + Unity / AR / VR Solutions */}
                          
                  <Section className="relative py-20 overflow-hidden border-y border-[rgba(148,163,184,0.12)]">

                    {/* XR / AI Animated Background */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none overflow-hidden"
                    >

                      {/* Main AI Glow */}
                      <div
                        className="
                          absolute
                          top-[-120px]
                          left-[20%]
                          w-[420px]
                          h-[420px]
                          rounded-full
                          bg-cyan-400/10
                          blur-[120px]
                          animate-pulse
                        "
                      />

                      {/* Purple XR Glow */}
                      <div
                        className="
                          absolute
                          bottom-[-150px]
                          right-[15%]
                          w-[500px]
                          h-[500px]
                          rounded-full
                          bg-violet-500/10
                          blur-[140px]
                          animate-pulse
                        "
                        style={{ animationDelay: '1200ms' }}
                      />

                      {/* Blue AI Glow */}
                      <div
                        className="
                          absolute
                          top-[40%]
                          left-[-100px]
                          w-[300px]
                          h-[300px]
                          rounded-full
                          bg-blue-500/10
                          blur-[100px]
                          animate-pulse
                        "
                        style={{ animationDelay: '700ms' }}
                      />

                      {/* AI Neural Nodes */}
                      <span
                        className="
                          absolute
                          left-[12%]
                          top-[25%]
                          w-2
                          h-2
                          rounded-full
                          bg-cyan-400
                          shadow-[0_0_20px_rgba(34,211,238,0.8)]
                          animate-pulse
                        "
                      />

                      <span
                        className="
                          absolute
                          left-[35%]
                          top-[18%]
                          w-1.5
                          h-1.5
                          rounded-full
                          bg-blue-400
                          shadow-[0_0_16px_rgba(59,130,246,0.8)]
                          animate-pulse
                        "
                        style={{ animationDelay: '500ms' }}
                      />

                      <span
                        className="
                          absolute
                          right-[25%]
                          top-[30%]
                          w-2
                          h-2
                          rounded-full
                          bg-violet-400
                          shadow-[0_0_20px_rgba(139,92,246,0.8)]
                          animate-pulse
                        "
                        style={{ animationDelay: '900ms' }}
                      />

                      <span
                        className="
                          absolute
                          right-[12%]
                          bottom-[25%]
                          w-1.5
                          h-1.5
                          rounded-full
                          bg-cyan-400
                          shadow-[0_0_18px_rgba(34,211,238,0.8)]
                          animate-pulse
                        "
                        style={{ animationDelay: '1400ms' }}
                      />

                      {/* Neural Connection Lines */}
                      <div
                        className="
                          absolute
                          left-[12%]
                          top-[25%]
                          w-[260px]
                          h-px
                          origin-left
                          rotate-[10deg]
                          bg-gradient-to-r
                          from-cyan-400/40
                          via-blue-400/20
                          to-transparent
                          animate-pulse
                        "
                      />

                      <div
                        className="
                          absolute
                          left-[35%]
                          top-[18%]
                          w-[300px]
                          h-px
                          origin-left
                          rotate-[18deg]
                          bg-gradient-to-r
                          from-blue-400/30
                          via-violet-400/20
                          to-transparent
                          animate-pulse
                        "
                        style={{ animationDelay: '800ms' }}
                      />

                      {/* XR Grid */}
                      <div
                        className="
                          absolute
                          inset-0
                          opacity-[0.035]
                          bg-[linear-gradient(rgba(37,99,235,1)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,1)_1px,transparent_1px)]
                          bg-[size:50px_50px]
                        "
                      />

                    </div>

          {/* Section Content */}
          <Container size="default" className="relative z-10">

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">

              <Heading
                as="h2"
                variant="display-md"
                className="font-display font-extrabold text-primary-800"
              >
                AI-Powered Unity & XR Solutions
              </Heading>

              <Text
                variant="body-md"
                className="text-primary-700 leading-relaxed"
              >
                We combine Artificial Intelligence with Unity, AR, VR, and
                3D technologies to build immersive products, intelligent
                simulations, and next-generation digital experiences.
              </Text>

            </div>

          {/* Unity Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {UNITY_PRODUCTS_DATA.map((product, index) => {
              const IconComp = product.icon;

              return (
                <div
                    key={index}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      p-6

                      bg-white/20
                      backdrop-blur-xl

                      border
                      border-white/30

                      shadow-[0_10px_40px_rgba(59,130,246,0.04)]

                      hover:-translate-y-2
                      hover:bg-white/30
                      hover:border-white/50
                      hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]

                      transition-all
                      duration-500
                    "
                  >
                  {/* Ambient AI Glow */}
                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        -top-24
                        -right-24
                        w-56
                        h-56
                        rounded-full
                        bg-blue-500/10
                        blur-[80px]
                        opacity-60
                        group-hover:opacity-100
                        group-hover:scale-125
                        transition-all
                        duration-700
                      "
                    />

                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        -bottom-24
                        -left-24
                        w-56
                        h-56
                        rounded-full
                        bg-violet-500/10
                        blur-[80px]
                        opacity-50
                        group-hover:opacity-100
                        group-hover:scale-125
                        transition-all
                        duration-700
                      "
                    />    
                  {/* Background Glow */}
                  <div
                    className="
                      absolute
                      -top-16
                      -right-16
                      w-40
                      h-40
                      rounded-full
                      bg-[color:var(--accent-mono)/0.1]
                      blur-3xl
                      group-hover:bg-[color:var(--accent-500)/0.15]
                      transition-all
                    "
                  />
                  {/* Futuristic Top Shine */}
                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        top-0
                        left-[15%]
                        right-[15%]
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-blue-400/50
                        to-transparent
                        opacity-60
                        group-hover:via-violet-400/70
                        transition-all
                        duration-500
                      "
                    />

                  <div className="relative z-10">

                    {/* Icon + Badge */}
                    <div className="flex items-center justify-between mb-6">

                      <div
                          className="
                            relative
                            p-3
                            rounded-xl

                            bg-white/20
                            backdrop-blur-md

                            border
                            border-blue-400/30

                            text-blue-500

                            shadow-[0_0_25px_rgba(59,130,246,0.08)]

                            group-hover:bg-blue-500/10
                            group-hover:border-blue-400/50
                            group-hover:text-blue-600
                            group-hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]

                            group-hover:scale-110
                            group-hover:rotate-3

                            transition-all
                            duration-500
                          "
                        >
                        <IconComp className="w-6 h-6" />
                      </div>

                      <span
                          className="
                            text-xs
                            font-mono
                            font-semibold

                            px-3
                            py-1.5
                            rounded-full

                            bg-white/20
                            backdrop-blur-md

                            text-blue-600

                            border
                            border-blue-400/25

                            shadow-[0_0_20px_rgba(59,130,246,0.05)]

                            group-hover:bg-blue-500/10
                            group-hover:border-blue-400/40

                            transition-all
                            duration-300
                          "
                        >
                        {product.badge}
                      </span>

                    </div>

                    {/* Title */}
                    <Heading
                      as="h3"
                      variant="heading-lg"
                      className="
                        font-display
                        font-bold
                        text-primary-800
                        group-hover:text-[var(--accent-500)]
                        transition-colors
                      "
                    >
                      {product.title}
                    </Heading>

                    {/* Description */}
                    <Text
                      variant="body-sm"
                      className="
                        mt-3
                        text-primary-700
                        leading-relaxed
                      "
                    >
                      {product.desc}
                    </Text>

                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-2 mt-6">

                      {index === 0 && (
                        <>
                          <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-sm border border-blue-400/15 text-blue-500 text-xs font-mono">
                            Unity
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-sm border border-blue-400/15 text-blue-500 text-xs font-mono">
                            AR Foundation
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-sm border border-blue-400/15 text-blue-500 text-xs font-mono">
                            Computer Vision
                          </span>
                        </>
                      )}

                      {index === 1 && (
                        <>
                          <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-sm border border-blue-400/15 text-blue-500 text-xs font-mono">
                            Unity
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-sm border border-blue-400/15 text-blue-500 text-xs font-mono">
                            XR
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-sm border border-blue-400/15 text-blue-500 text-xs font-mono">
                            VR Simulation
                          </span>
                        </>
                      )}

                      {index === 2 && (
                        <>
                          <span className="px-2.5 py-1 rounded-md bg-[color:var(--accent-500)/0.08] text-[var(--accent-500)] text-xs font-mono">
                            AI Agents
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-[color:var(--accent-500)/0.08] text-[var(--accent-500)] text-xs font-mono">
                            Unity
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-[color:var(--accent-500)/0.08] text-[var(--accent-500)] text-xs font-mono">
                            Voice AI
                          </span>
                        </>
                      )}

                      {index === 3 && (
                        <>
                          <span className="px-2.5 py-1 rounded-md bg-[color:var(--accent-500)/0.08] text-[var(--accent-500)] text-xs font-mono">
                            Unity 3D
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-[color:var(--accent-500)/0.08] text-[var(--accent-500)] text-xs font-mono">
                            AR / VR
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-[color:var(--accent-500)/0.08] text-[var(--accent-500)] text-xs font-mono">
                            Digital Twin
                          </span>
                        </>
                      )}

                    </div>

                    {/* Bottom Line */}
                    <div
                      className="
                        mt-6
                        pt-4
                        border-t border-white/20
                        flex items-center justify-between
                      "
                    >
                      <span className="text-xs font-mono text-[var(--accent-500)]">
                        AI_XR_SOLUTIONS
                      </span>

                      <ArrowRight
                        className="
                          w-4 h-4
                          text-[var(--accent-500)]
                          group-hover:translate-x-1
                          transition-transform
                        "
                      />
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

    {/* Bottom CTA */}
    <div className="mt-10 text-center">

      <Text
        variant="body-sm"
        className="text-primary-700 mb-4"
      >
        Build your next AI-powered AR, VR or Unity experience with NorAI.
      </Text>

      <Link href="/services">
        <Button
          variant="primary"
          size="lg"
          className="
            bg-[var(--accent-500)]
            hover:bg-[var(--accent-mono)]
            text-white
            font-semibold
            px-8
            py-3.5
            rounded-lg
            shadow-lg
            shadow-[color:var(--accent-500)/0.2]
            transition-all
          "
        >
          Explore AI & XR Services
          <ArrowRight className="w-4 h-4 ml-2 inline-block" />
        </Button>
      </Link>

    </div>

              </Container>
            </Section>
                  {/* How It Works Section: Horizontal Connected Pipeline */}
                  <Section className="relative py-20 bg-transparent border-y border-[rgba(148,163,184,0.12)] overflow-hidden">
                    {/* AI Pipeline Background Animation */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none overflow-hidden"
                    >
                      {/* Soft blue glow */}
                      <div
                        className="
                          absolute
                          left-[15%]
                          top-[20%]
                          w-72
                          h-72
                          rounded-full
                          bg-blue-400/10
                          blur-[100px]
                          animate-pulse
                        "
                      />

                      {/* Purple glow */}
                      <div
                        className="
                          absolute
                          right-[10%]
                          bottom-[10%]
                          w-80
                          h-80
                          rounded-full
                          bg-violet-400/10
                          blur-[110px]
                          animate-pulse
                        "
                        style={{ animationDelay: '1200ms' }}
                      />

                      {/* Moving AI line */}
                      <div
                        className="
                          absolute
                          left-0
                          right-0
                          top-1/2
                          h-px
                          bg-gradient-to-r
                          from-transparent
                          via-blue-400/30
                          to-transparent
                          animate-pulse
                        "
                      />

                      {/* AI Nodes */}
                      <span
                        className="
                          absolute
                          left-[18%]
                          top-[48%]
                          w-2
                          h-2
                          rounded-full
                          bg-blue-400
                          shadow-[0_0_18px_rgba(59,130,246,0.8)]
                          animate-pulse
                        "
                      />

                      <span
                        className="
                          absolute
                          left-[50%]
                          top-[48%]
                          w-2
                          h-2
                          rounded-full
                          bg-cyan-400
                          shadow-[0_0_18px_rgba(34,211,238,0.8)]
                          animate-pulse
                        "
                        style={{ animationDelay: '500ms' }}
                      />

                      <span
                        className="
                          absolute
                          right-[18%]
                          top-[48%]
                          w-2
                          h-2
                          rounded-full
                          bg-violet-400
                          shadow-[0_0_18px_rgba(167,139,250,0.8)]
                          animate-pulse
                        "
                        style={{ animationDelay: '1000ms' }}
                      />
                    </div>
                    <Container size="default">
                      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                        <Heading as="h2" variant="display-md" className="font-display font-extrabold text-primary-800">
                          How NorAI Works
                        </Heading>
                        <Text variant="body-md" className="text-primary-700">
                          Three simple steps to connect our micro-agents and automate your operational bottlenecks.
                        </Text>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        {HOW_IT_WORKS_DATA.map((step, index) => (
                          <div
                              key={index}
                              className="tilt-card p-6 space-y-4 relative bg-gradient-to-br from-white to-[#F4F8FF] border border-[color:var(--accent-500)/0.1] hover:border-[color:var(--accent-500)/0.25] hover:shadow-[0_16px_40px_rgba(46,91,255,0.08)] transition-all duration-300"
                            >
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-extrabold font-mono text-[var(--accent-500)] bg-[color:var(--accent-500)/0.1] px-3 py-1 rounded border border-[color:var(--accent-500)/0.3]">
                                {step.step}
                              </span>
                              {index < HOW_IT_WORKS_DATA.length - 1 && (
                                <span className="hidden md:block text-primary-700 font-mono text-xs">PIPELINE_STEP &#8594;</span>
                              )}
                            </div>
                            <Heading as="h3" variant="heading-md" className="font-display font-bold text-primary-800">
                              {step.title}
                            </Heading>
                            <Text variant="body-sm" className="text-primary-700 leading-relaxed">
                              {step.desc}
                            </Text>
                          </div>
                        ))}
                      </div>
                    </Container>
                  </Section>

                {/* Core Benefits / Why Choose NorAI */}
            <Section className="relative py-20 bg-transparent overflow-hidden">

             {/* AI Ambient Background */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                >
                  {/* Blue Glow - Left */}
                  <div
                    className="
                      absolute
                      -left-28
                      top-[15%]
                      w-[440px]
                      h-[440px]
                      rounded-full
                      bg-blue-400/20
                      blur-[105px]
                      animate-pulse
                    "
                    style={{
                      animationDuration: "4.5s",
                    }}
                  />

                  {/* Purple Glow - Right */}
                  <div
                    className="
                      absolute
                      -right-28
                      bottom-[10%]
                      w-[480px]
                      h-[480px]
                      rounded-full
                      bg-violet-400/20
                      blur-[115px]
                      animate-pulse
                    "
                    style={{
                      animationDuration: "5s",
                      animationDelay: "1s",
                    }}
                  />

                  {/* Cyan Center Glow */}
                  <div
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      -translate-x-1/2
                      -translate-y-1/2
                      w-[280px]
                      h-[280px]
                      rounded-full
                      bg-cyan-400/10
                      blur-[100px]
                      animate-pulse
                    "
                    style={{
                      animationDuration: "6s",
                    }}
                  />

                  {/* AI Nodes */}

                  <span
                    className="
                      absolute
                      left-[12%]
                      top-[35%]
                      w-2
                      h-2
                      rounded-full
                      bg-blue-400
                      shadow-[0_0_20px_rgba(59,130,246,0.9)]
                      animate-pulse
                    "
                  />

                  <span
                    className="
                      absolute
                      left-[45%]
                      top-[20%]
                      w-1.5
                      h-1.5
                      rounded-full
                      bg-cyan-400
                      shadow-[0_0_18px_rgba(34,211,238,0.9)]
                      animate-pulse
                    "
                    style={{ animationDelay: "600ms" }}
                  />

                  <span
                    className="
                      absolute
                      right-[15%]
                      top-[30%]
                      w-2
                      h-2
                      rounded-full
                      bg-violet-400
                      shadow-[0_0_20px_rgba(139,92,246,0.9)]
                      animate-pulse
                    "
                    style={{ animationDelay: "1200ms" }}
                  />
                </div>

              <Container size="default" className="relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">

                  <Heading
                    as="h2"
                    variant="display-md"
                    className="
                      font-display
                      font-extrabold
                      text-primary-800
                    "
                  >
                    Why Modern Teams Choose NorAI
                  </Heading>

                  <Text
                    variant="body-md"
                    className="text-primary-700"
                  >
                    Engineered with speed, security, and simplicity at the core.
                  </Text>

                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                  {FEATURES_DATA.map((feat, index) => {

                    const IconComp = feat.icon;

                    return (
                      <div
                        key={index}
                        className="
                          tilt-card
                          group
                          relative
                          overflow-hidden
                          p-6
                          space-y-3

                          bg-gradient-to-br
                          from-white/75
                          via-white/65
                          to-[#F5F0FF]/70
                          backdrop-blur-md

                          border
                          border-[color:var(--brand-purple)/0.10]

                          rounded-xl

                          hover:-translate-y-2
                          hover:border-[color:var(--brand-purple)/0.30]
                          hover:shadow-[0_20px_50px_rgba(124,58,237,0.12)]

                          transition-all
                          duration-500
                        "
                      >

                        {/* Card AI Glow */}
                        <div
                          aria-hidden="true"
                          className="
                            absolute
                            -top-20
                            -right-20
                            w-40
                            h-40
                            rounded-full
                            bg-violet-400/10
                            blur-3xl

                            opacity-0
                            group-hover:opacity-100

                            transition-opacity
                            duration-500
                          "
                        />

                        {/* Card Blue Glow */}
                        <div
                          aria-hidden="true"
                          className="
                            absolute
                            -bottom-20
                            -left-20
                            w-36
                            h-36
                            rounded-full
                            bg-blue-400/10
                            blur-3xl

                            opacity-0
                            group-hover:opacity-100

                            transition-opacity
                            duration-700
                          "
                        />

                        {/* Card Scan Line */}
                        <div
                          aria-hidden="true"
                          className="
                            absolute
                            left-0
                            right-0
                            top-0
                            h-px

                            bg-gradient-to-r
                            from-transparent
                            via-violet-400/60
                            to-transparent

                            opacity-0
                            group-hover:opacity-100

                            transition-opacity
                            duration-500
                          "
                        />

                        {/* Card Content */}
                        <div className="relative z-10 space-y-3">

                          {/* Icon */}
                          <div
                            className="
                              p-2.5
                              w-fit
                              rounded-lg

                              bg-[color:var(--accent-500)/0.1]
                              text-[var(--accent-500)]

                              border
                              border-[color:var(--accent-500)/0.2]

                              group-hover:bg-[color:var(--accent-mono)/0.12]
                              group-hover:text-[var(--accent-mono)]
                              group-hover:border-[color:var(--accent-mono)/0.3]

                              group-hover:scale-110
                              group-hover:rotate-3

                              transition-all
                              duration-300
                            "
                          >
                            <IconComp className="w-5 h-5" />
                          </div>

                          {/* Title */}
                          <Heading
                            as="h4"
                            variant="heading-sm"
                            className="
                              font-display
                              font-bold
                              text-primary-800

                              group-hover:text-[var(--accent-500)]

                              transition-colors
                              duration-300
                            "
                          >
                            {feat.title}
                          </Heading>

                          {/* Description */}
                          <Text
                            variant="body-xs"
                            className="
                              text-primary-700
                              leading-relaxed
                            "
                          >
                            {feat.desc}
                          </Text>

                        </div>

                      </div>
                    );
                  })}

                </div>

              </Container>
            </Section>

      {/* Testimonials Section */}
<Section className="relative py-20 overflow-hidden bg-[#F3F1FF]">

  {/* AI Animated Background */}
  <div
    aria-hidden="true"
    className="absolute inset-0 pointer-events-none overflow-hidden"
  >

    {/* 🔵 Blue Glow - Left */}
    <div
      className="
        absolute
        -left-32
        top-10
        w-[420px]
        h-[420px]
        rounded-full
        bg-blue-500/20
        blur-[110px]
        animate-[floatBlue_8s_ease-in-out_infinite]
      "
    />

    {/* 🟣 Purple Glow - Right */}
    <div
      className="
        absolute
        -right-32
        top-20
        w-[460px]
        h-[460px]
        rounded-full
        bg-violet-500/20
        blur-[120px]
        animate-[floatPurple_10s_ease-in-out_infinite]
      "
    />

    {/* 🔵 Center Cyan Glow */}
    <div
      className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[320px]
        h-[320px]
        rounded-full
        bg-cyan-400/10
        blur-[100px]
        animate-pulse
      "
    />

    {/* AI Node - Left */}
    <span
      className="
        absolute
        left-[12%]
        top-[30%]
        w-2
        h-2
        rounded-full
        bg-blue-500
        shadow-[0_0_25px_rgba(59,130,246,1)]
        animate-ping
      "
    />

    {/* AI Node - Right */}
    <span
      className="
        absolute
        right-[15%]
        top-[35%]
        w-2
        h-2
        rounded-full
        bg-violet-500
        shadow-[0_0_25px_rgba(139,92,246,1)]
        animate-ping
      "
      style={{ animationDelay: "1s" }}
    />

  </div>


  {/* Actual Section Content */}
  <Container size="default" className="relative z-10">

    {/* Section Header */}
    <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">

      <Heading
        as="h2"
        variant="display-md"
        className="font-display font-extrabold text-primary-800"
      >
        Validated by Business Leaders
      </Heading>

      <Text
        variant="body-md"
        className="text-primary-700"
      >
        Here is what founders, HR leads, and edtech directors say about NorAI.
      </Text>

    </div>


    {/* Testimonial Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {TESTIMONIALS_DATA.map((t, index) => (

        <div
          key={index}
          className="
            tilt-card
            group
            relative
            overflow-hidden
            p-6
            flex
            flex-col
            justify-between
            space-y-6

            bg-white/80
            backdrop-blur-md

            border
            border-white/70

            hover:-translate-y-2
            hover:bg-white/90
            hover:border-blue-300/40

            hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)]

            transition-all
            duration-500
          "
        >

          {/* Card Glow */}
          <div
            aria-hidden="true"
            className="
              absolute
              -top-20
              -right-20
              w-40
              h-40
              rounded-full
              bg-blue-400/20
              blur-3xl
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-500
            "
          />

          {/* Quote */}
          <Text
            variant="body-sm"
            className="
              relative
              z-10
              text-primary-700
              italic
              leading-relaxed
            "
          >
            &ldquo;{t.quote}&rdquo;
          </Text>


          {/* Author */}
          <div className="relative z-10 pt-4 border-t border-slate-300/60">

            <div className="font-display font-bold text-primary-800 text-sm">
              {t.author}
            </div>

            <div className="text-xs font-mono text-[var(--accent-500)]">
              {t.role}
            </div>

          </div>

        </div>

      ))}

    </div>

  </Container>

</Section>
     {/* Interactive FAQ Accordion */}
<Section className="relative py-20 overflow-hidden bg-[#F3F1FF]">

  {/* AI Animated Background */}
  <div
    aria-hidden="true"
    className="absolute inset-0 pointer-events-none overflow-hidden"
  >

    {/* 🔵 Blue Glow */}
    <div
      className="
        absolute
        -left-32
        top-10
        w-[420px]
        h-[420px]
        rounded-full
        bg-blue-500/20
        blur-[110px]
        animate-[floatBlue_8s_ease-in-out_infinite]
      "
    />

    {/* 🟣 Purple Glow */}
    <div
      className="
        absolute
        -right-32
        bottom-0
        w-[460px]
        h-[460px]
        rounded-full
        bg-violet-500/20
        blur-[120px]
        animate-[floatPurple_10s_ease-in-out_infinite]
      "
    />

    {/* 🔵 Center Cyan Glow */}
    <div
      className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[320px]
        h-[320px]
        rounded-full
        bg-cyan-400/10
        blur-[100px]
        animate-pulse
      "
    />

    {/* AI Node Left */}
    <span
      className="
        absolute
        left-[10%]
        top-[25%]
        w-2
        h-2
        rounded-full
        bg-blue-500
        shadow-[0_0_25px_rgba(59,130,246,1)]
        animate-ping
      "
    />

    {/* AI Node Right */}
    <span
      className="
        absolute
        right-[12%]
        bottom-[30%]
        w-2
        h-2
        rounded-full
        bg-violet-500
        shadow-[0_0_25px_rgba(139,92,246,1)]
        animate-ping
      "
      style={{ animationDelay: "1s" }}
    />

  </div>


  {/* FAQ Content */}
  <Container size="narrow" className="relative z-10">

    {/* Heading */}
    <div className="text-center space-y-4 mb-12">

      <Heading
        as="h2"
        variant="display-md"
        className="
          font-display
          font-extrabold
          text-primary-800
        "
      >
        Frequently Asked Questions
      </Heading>

      <Text
        variant="body-md"
        className="text-primary-700"
      >
        Have questions? We have answers.
      </Text>

    </div>


    {/* FAQ Items */}
    <div className="space-y-4">

      {FAQ_DATA.map((faq, index) => (

        <details
          key={index}
          className="
            group
            relative
            overflow-hidden
            rounded-xl

            border
            border-white/70

            bg-white/75
            backdrop-blur-md

            p-5

            shadow-[0_8px_30px_rgba(59,130,246,0.04)]

            hover:bg-white/85
            hover:border-blue-300/40
            hover:shadow-[0_15px_40px_rgba(59,130,246,0.10)]

            transition-all
            duration-500

            [&_summary::-webkit-details-marker]:hidden
          "
        >

          {/* FAQ Card Glow */}
          <div
            aria-hidden="true"
            className="
              absolute
              -top-16
              -right-16
              w-32
              h-32
              rounded-full
              bg-blue-400/15
              blur-3xl
              opacity-0
              group-open:opacity-100
              group-hover:opacity-100
              transition-opacity
              duration-500
              pointer-events-none
            "
          />

          <summary
            className="
              relative
              z-10
              flex
              items-center
              justify-between
              cursor-pointer
              font-semibold
              text-primary-800
              text-sm
              md:text-base
            "
          >

            <span className="flex items-center gap-3">

              <HelpCircle
                className="
                  w-5
                  h-5
                  text-[var(--accent-500)]
                  flex-shrink-0
                "
              />

              {faq.question}

            </span>

            <ChevronDown
              className="
                w-4
                h-4
                text-primary-700
                transition-transform
                group-open:rotate-180
              "
            />

          </summary>


          <p
            className="
              relative
              z-10
              mt-4
              text-sm
              text-primary-700
              leading-relaxed
              pl-8
            "
          >
            {faq.answer}
          </p>

        </details>

      ))}

    </div>

  </Container>

</Section>
      {/* Final Conversion CTA Banner */}
      <Section className="py-20 relative overflow-hidden bg-transparent">
        <Container size="default">
          <div className="rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white via-[#F8FAFF] to-[#EEF5FF] p-12 md:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[color:var(--accent-500)/0.1] blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <Heading as="h2" variant="display-lg" className="font-display font-extrabold text-primary-800">
                Ready to Automate Your Business Workflow?
              </Heading>
              <Text variant="body-lg" className="text-primary-700">
                Join hundreds of modern teams leveraging NorAI micro-tools to save time, lower costs, and scale intelligence.
              </Text>
            </div>

            <div className="relative z-10 pt-4 flex justify-center gap-4">
              <Link href="/contact">
                <Button variant="primary" size="lg" className="bg-[var(--accent-500)] hover:bg-[var(--accent-mono)] text-[var(--bg-page)] font-semibold px-10 py-4 rounded-lg shadow-xl shadow-[color:var(--accent-500)/0.2]">
                  Get Started Free <ArrowRight className="w-4 h-4 ml-2 inline-block" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}