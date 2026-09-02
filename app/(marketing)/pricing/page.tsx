import React from 'react';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/foundation';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { ComparisonTable } from '@/components/organisms/sections/ComparisonTable';
import {
  RotateCcw,
  ShieldCheck,
  Headphones,
  ArrowRight,
} from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import {
  PricingToggleClient,
  type PricingTier,
  type IndividualToolPlan,
} from './PricingToggleClient';
import { PricingEstimator } from './PricingEstimator';
import { PricingFaqAccordion, type PricingFaqItem } from './PricingFaqAccordion';

export const metadata = buildMetadata({
  path: '/pricing',
  title: 'Pricing & Infrastructure Plans',
  description:
    'Transparent, deterministic pricing for NorAI micro-SaaS tools and high-throughput AI pipelines. Sub-second latency guarantees with zero hidden costs.',
});

const TIERS: PricingTier[] = [
  {
    id: 'starter',
    tierLabel: 'Starter',
    audience: 'Freelancers & Early Teams',
    description: 'Essential micro-AI pipeline tools for individuals and early-stage product teams.',
    monthlyPrice: 29,
    annualPrice: 23,
    latencySla: 'p95 < 950ms (Shared Pool)',
    features: [
      '5,000 AI API operations / mo',
      'Sub-1s latency guarantee across all tools',
      'All 4 micro-SaaS applications included',
      'Standard REST API & export formats (JSON, Markdown)',
      'Community & email support (24h response)',
    ],
    cta: 'Start 14-day free trial',
    href: '/contact?tier=starter',
    highlighted: false,
  },
  {
    id: 'pro',
    tierLabel: 'Pro',
    audience: 'High-Throughput Businesses',
    description: 'High-throughput automation pipelines with dedicated compute and priority SLAs.',
    monthlyPrice: 99,
    annualPrice: 79,
    latencySla: 'p95 < 350ms (Dedicated Pool)',
    features: [
      '50,000 AI API operations / mo',
      'Sub-350ms processing SLA guarantee',
      'Model Context Protocol (MCP) & Webhook triggers',
      'Custom candidate scoring & parsing rules',
      'Team seats (up to 5 members)',
      'Priority engineer chat support (4h response)',
    ],
    cta: 'Get started with Pro',
    href: '/contact?tier=pro',
    highlighted: true,
  },
  {
    id: 'enterprise',
    tierLabel: 'Enterprise',
    audience: 'Dedicated VPC & Hardware',
    description: 'Isolated compute clusters, custom model fine-tuning (LoRA), and zero-egress SLAs.',
    monthlyPrice: null,
    annualPrice: null,
    latencySla: 'p95 < 100ms (Isolated VPC)',
    features: [
      'Unlimited AI request throughput',
      'Private on-prem / VPC vLLM deployment',
      'Custom model fine-tuning & ATS connector development',
      '99.99% uptime guarantee with contractual SLA',
      'Dedicated solution architect & Slack channel',
    ],
    cta: 'Schedule architecture call',
    href: '/contact?service=enterprise-capacity',
    highlighted: false,
  },
];

const INDIVIDUAL_TOOLS: IndividualToolPlan[] = [
  {
    id: 'resume-shortlister',
    name: 'AI Resume Shortlister',
    tagline: 'Automated candidate screening and weighted scoring for recruitment teams.',
    freeLimit: '50 resumes / mo',
    paidPrice: '$29 / mo (1,000 resumes)',
    latency: '< 0.35s parser latency',
    keyFeature: 'Weighted JSON scorecard & skill vector extraction',
    href: '/products/resume-shortlister',
    badge: 'Popular',
  },
  {
    id: 'course-note-taker',
    name: 'Course Note-Taker',
    tagline: 'Turn video lectures and webinars into structured study guides in seconds.',
    freeLimit: '3 hours audio / mo',
    paidPrice: '$12 / mo (25 hours)',
    latency: '< 0.5s summary latency',
    keyFeature: 'LaTeX formula parsing & active-recall quiz cards',
    href: '/products/course-note-taker',
  },
  {
    id: 'chat-digest',
    name: 'Community Chat Digest',
    tagline: 'Automated daily intelligence briefs for Discord, Telegram, and Slack communities.',
    freeLimit: '1 channel free',
    paidPrice: '$19 / mo (10 channels)',
    latency: '< 0.4s digest latency',
    keyFeature: 'Token-efficient batch deduplication & sentiment radar',
    href: '/products/chat-digest',
  },
  {
    id: 'smart-dainik-news',
    name: 'Smart Dainik Gazette',
    tagline: 'Instant, verified employment gazette alerts and regional policy summaries.',
    freeLimit: '100% Free for citizens',
    paidPrice: 'Institutional licensing',
    latency: '< 0.2s alert latency',
    keyFeature: 'Bilingual Hindi/English eligibility matchers',
    href: '/products/smart-dainik-news',
    badge: 'Free',
  },
];

const COMPARISON_COLUMNS = [
  { id: 'starter', label: 'Starter' },
  { id: 'pro', label: 'Pro', highlighted: true },
  { id: 'enterprise', label: 'Enterprise' },
];

const COMPARISON_CATEGORIES = [
  {
    name: 'Compute & Telemetry',
    rows: [
      {
        id: 'requests',
        label: 'Monthly AI operations',
        hint: 'Combined quota across all micro-SaaS tools and API calls',
        values: { starter: '5,000', pro: '50,000', enterprise: 'Unlimited' },
      },
      {
        id: 'latency',
        label: 'p95 Latency SLA',
        hint: 'Guaranteed processing turnaround on warm instances',
        values: { starter: '< 950ms', pro: '< 350ms', enterprise: '< 100ms' },
      },
      {
        id: 'memory',
        label: 'Memory state persistence',
        hint: 'Data processed in ephemeral RAM without disk writes',
        values: { starter: 'In-RAM only', pro: 'In-RAM only', enterprise: 'Zero-Egress VPC' },
      },
      {
        id: 'concurrency',
        label: 'Concurrent worker threads',
        hint: 'Simultaneous document & stream parsing capacity',
        values: { starter: '2 workers', pro: '10 workers', enterprise: 'Dedicated cluster' },
      },
    ],
  },
  {
    name: 'Micro-SaaS Access & Capabilities',
    rows: [
      {
        id: 'shortlister',
        label: 'AI Resume Shortlister',
        hint: 'PDF/DOCX parsing with weighted JSON skill scorecards',
        values: { starter: true, pro: true, enterprise: true },
      },
      {
        id: 'notetaker',
        label: 'Course Note-Taker',
        hint: 'Audio/video ingestion with LaTeX formula rendering',
        values: { starter: true, pro: true, enterprise: true },
      },
      {
        id: 'chatdigest',
        label: 'Community Chat Digest',
        hint: 'Topic clustering, deduplication, and sentiment radar',
        values: { starter: true, pro: true, enterprise: true },
      },
      {
        id: 'smartdainik',
        label: 'Smart Dainik Gazette Alerts',
        hint: 'Bilingual Hindi/English government job matching',
        values: { starter: true, pro: true, enterprise: true },
      },
    ],
  },
  {
    name: 'API & Developer Integrations',
    rows: [
      {
        id: 'mcp',
        label: 'Model Context Protocol (MCP) Endpoints',
        hint: 'Agent-ready tool definitions for Claude Desktop & Cursor',
        values: { starter: false, pro: true, enterprise: true },
      },
      {
        id: 'webhooks',
        label: 'Webhooks & REST API access',
        hint: 'Direct programmatic pipeline integration',
        values: { starter: 'Basic REST', pro: 'Full REST + Webhooks', enterprise: 'Full Custom SDK' },
      },
      {
        id: 'customrules',
        label: 'Custom candidate & parser rules',
        hint: 'Define proprietary rubrics and regex scoring',
        values: { starter: false, pro: true, enterprise: true },
      },
      {
        id: 'exportformats',
        label: 'Export formats supported',
        hint: 'Data interoperability options',
        values: { starter: 'JSON, TXT', pro: 'JSON, LaTeX, Markdown', enterprise: 'All + ATS Direct Sync' },
      },
    ],
  },
  {
    name: 'Security, Governance & Support',
    rows: [
      {
        id: 'training',
        label: 'Zero Model Training Guarantee',
        hint: 'Your proprietary documents are never used to train models',
        values: { starter: true, pro: true, enterprise: true },
      },
      {
        id: 'finetuning',
        label: 'Custom LoRA Fine-Tuning & Private Weights',
        hint: 'Dedicated quantized open models for proprietary domains',
        values: { starter: false, pro: false, enterprise: true },
      },
      {
        id: 'support',
        label: 'Support SLA & Channels',
        hint: 'Real engineers and founders answering',
        values: { starter: 'Email (24h SLA)', pro: 'Priority Chat (4h SLA)', enterprise: 'Dedicated Slack (1h SLA)' },
      },
      {
        id: 'uptime',
        label: 'Uptime SLA',
        hint: 'Contractual infrastructure availability guarantee',
        values: { starter: '99.5%', pro: '99.9%', enterprise: '99.99%' },
      },
    ],
  },
];

const ASSURANCES = [
  {
    tag: 'PRIVACY',
    icon: ShieldCheck,
    title: 'Zero Model Training & In-Memory RAM',
    body: 'Your resumes, audio files, and chat logs are processed ephemerally in RAM. We never store raw documents or train public models on your data.',
  },
  {
    tag: 'FLEXIBILITY',
    icon: RotateCcw,
    title: 'Self-Serve Cancellation & Pro-Rated Upgrades',
    body: 'Upgrade, downgrade, or cancel anytime directly from your dashboard with one click. Pro-rated credits are calculated automatically with zero friction.',
  },
  {
    tag: 'ENGINEERING SUPPORT',
    icon: Headphones,
    title: 'Real Engineers on Desk (9 AM – 8 PM IST)',
    body: 'No outsourced ticket centers. Real founding engineers answer technical inquiries Monday through Saturday across our development hubs.',
  },
];

const PRICING_FAQS: PricingFaqItem[] = [
  {
    id: 'plan-changes',
    tag: 'Billing',
    question: 'Can I change, upgrade, or pause my plan anytime?',
    answer:
      'Yes. You can switch between Monthly and Annual billing or upgrade tiers anytime from your dashboard. Pro-rated differences are automatically computed and credited immediately.',
  },
  {
    id: 'usage-limits',
    tag: 'Usage & Quotas',
    question: 'What happens if our team exceeds the monthly operation cap?',
    answer:
      'We notify your workspace administrator at 80% and 100% capacity. Extra operations continue seamlessly at a transparent pay-as-you-go rate of $0.002 per operation with zero pipeline interruption.',
  },
  {
    id: 'free-trial',
    tag: 'Evaluation',
    question: 'How does the 14-day free trial work?',
    answer:
      'The trial grants full access to Starter and Pro capabilities with 1,000 free operations across all four micro-tools. No credit card is required to create an account and benchmark latency.',
  },
  {
    id: 'mcp-support',
    tag: 'Integrations',
    question: 'How do Model Context Protocol (MCP) endpoints work?',
    answer:
      'Pro and Enterprise tiers include pre-configured MCP manifests that allow AI agents (in Claude Desktop, Cursor, or LangChain) to directly query the Resume Shortlister and Note-Taker as deterministic tools.',
  },
  {
    id: 'custom-hardware',
    tag: 'Enterprise',
    question: 'Can NorAI deploy on our private AWS/GCP VPC or on-premise hardware?',
    answer:
      'Yes. Our Enterprise tier includes custom vLLM deployment templates, private LoRA quantization, and air-gapped container configurations with zero network egress outside your VPC perimeter.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-canvas-base font-sans text-ink-primary">
      {/* Hero Header */}
      <Section className="relative overflow-hidden pb-4 pt-12 md:pb-6 md:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-canvas-paper [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <Container size="default" className="relative z-10">
          <div className="mx-auto max-w-3xl space-y-5 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-line-subtle bg-canvas-pure px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-accent-primary shadow-xs">
              Deterministic Pricing
            </p>
            <Heading
              as="h1"
              variant="display-xl"
              className="text-balance text-ink-primary tracking-tight"
            >
              Simple prices. Serious instrument craft.
            </Heading>
            <Text variant="body-lg" as="p" className="mx-auto max-w-2xl leading-relaxed text-ink-body">
              Transparent capacity tiers with sub-second latency guarantees and zero data retention.
              Choose an all-access platform suite or license individual micro-tools.
            </Text>
          </div>
        </Container>
      </Section>

      {/* Interactive Billing Toggle, View Mode Switch & Tier Cards */}
      <PricingToggleClient tiers={TIERS} individualTools={INDIVIDUAL_TOOLS} />

      {/* Workload & Compute Estimator Calculator */}
      <PricingEstimator />

      {/* Tactile Engineering Assurance Index Cards */}
      <Section className="py-16 lg:py-20">
        <Container size="default">
          <div className="mb-10 text-center max-w-xl mx-auto space-y-2">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent-primary">
              The NorAI Guarantee
            </p>
            <h2 className="font-display text-2xl sm:text-3xl text-ink-primary">
              Built on transparency, not fine print.
            </h2>
          </div>

          <StaggerGrid className="grid grid-cols-1 gap-6 sm:grid-cols-3" stagger={0.06}>
            {ASSURANCES.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-line-subtle bg-canvas-paper p-7 shadow-sm transition-shadow hover:shadow-md">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-secondary">
                        {item.tag}
                      </span>
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-subtle text-accent-primary">
                        <item.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-body">{item.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </Section>

      {/* Categorized Detailed Feature Comparison Table */}
      <ComparisonTable
        heading="Comprehensive Capability Matrix"
        description="Side-by-side technical breakdown across compute limits, integrations, and governance SLAs."
        columns={COMPARISON_COLUMNS}
        categories={COMPARISON_CATEGORIES}
        caption="All plans include access to all four NorAI micro-tools. Quotas reset automatically at the beginning of each billing cycle."
      />

      {/* In-Place Interactive FAQ Accordion */}
      <PricingFaqAccordion items={PRICING_FAQS} />

      {/* Closing CTA */}
      <Section className="py-16 lg:py-24">
        <Container size="default">
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-line-subtle bg-canvas-paper p-10 text-center shadow-md sm:p-14">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-primary">
                Custom Architecture Support
              </span>
              <Heading as="h2" variant="display-lg" className="text-balance text-ink-primary">
                Need tailored capacity or an on-prem deployment?
              </Heading>
              <Text variant="body-md" className="mx-auto max-w-xl leading-relaxed text-ink-body">
                Tell our engineering team about your throughput constraints and compliance requirements.
                We will configure a dedicated VPC cluster or custom fine-tuned pipeline.
              </Text>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact?service=enterprise-audit"
                  variant="unstyled"
                  aria-label="Talk to our engineering team about pricing"
                >
                  <Button variant="primary" size="lg" className="group">
                    <span>Talk to our engineers</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link
                  href="/services"
                  variant="unstyled"
                  aria-label="Explore Bespoke Enterprise Services"
                >
                  <Button variant="secondary" size="lg">
                    Explore Enterprise Services
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
