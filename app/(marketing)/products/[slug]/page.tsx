import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PRODUCTS_DATA } from '@/lib/products';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import {
  buildMetadata,
  getSoftwareApplicationJsonLd,
  getBreadcrumbListJsonLd,
  JsonLd,
} from '@/lib/seo';
import { ProductInteractiveView } from '@/components/organisms/ProductDetail/ProductInteractiveView';
import {
  FileText,
  Headphones,
  MessageSquare,
  Newspaper,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles: FileText,
  Zap: Headphones,
  Cpu: MessageSquare,
  Layers: Newspaper,
};

const NEXT_TOOL_MAP: Record<string, { slug: string; title: string; category: string }> = {
  'resume-shortlister': {
    slug: 'course-note-taker',
    title: 'Course Note-Taker',
    category: 'EdTech & Study AI',
  },
  'course-note-taker': {
    slug: 'chat-digest',
    title: 'Community Chat Digest',
    category: 'Community AI',
  },
  'chat-digest': {
    slug: 'smart-dainik-news',
    title: 'Smart Dainik News',
    category: 'Regional Intelligence',
  },
  'smart-dainik-news': {
    slug: 'resume-shortlister',
    title: 'AI Resume Shortlister',
    category: 'Recruitment AI',
  },
};

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(PRODUCTS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS_DATA[slug];

  if (!product) {
    return buildMetadata({
      path: `/products/${slug}`,
      title: 'Product Not Found — NorAI Technologies',
      description: 'The requested product could not be found.',
    });
  }

  return buildMetadata({
    path: `/products/${product.slug}`,
    title: `${product.title} — Built to change what happens`,
    description: product.excerpt,
  });
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = PRODUCTS_DATA[slug];

  if (!product) {
    notFound();
  }

  const IconComp = ICON_MAP[product.iconName] || FileText;
  const nextTool = NEXT_TOOL_MAP[slug];

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Capabilities', path: '/products' },
    { name: product.title, path: `/products/${product.slug}` },
  ];

  return (
    <div className="min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]">
      <JsonLd schema={getSoftwareApplicationJsonLd(product)} />
      <JsonLd schema={getBreadcrumbListJsonLd(breadcrumbs)} />

      {/* =========================================================================
          BEAT 1: AURORA HERO CHAMBER (.phero)
          ========================================================================= */}
      <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-16 overflow-hidden border-b border-[var(--line)]">
        {/* Ambient Blurred Radiant Orbs */}
        <div
          className="aurora__orb -top-32 -left-20 w-[450px] h-[450px] bg-[var(--mint)]/15"
          aria-hidden="true"
        />
        <div
          className="aurora__orb -top-20 right-0 w-[500px] h-[500px] bg-[var(--lavender)]/12"
          aria-hidden="true"
        />

        <Container size="default" className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-4xl space-y-6 text-left">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[var(--pine)]/85">
              <Link href="/" className="hover:text-[var(--pine)] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/products" className="hover:text-[var(--pine)] transition-colors">
                Capabilities
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[var(--pine)] font-semibold">{product.title}</span>
            </nav>

            {/* Badge & Tool Monospace Identifier */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#fffdf7] border border-[var(--line)] flex items-center justify-center text-[var(--pine)] shadow-xs">
                <IconComp className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-[var(--mint)]/20 border border-[var(--mint-ink)]/20 text-xs font-mono font-bold text-[var(--mint-ink)] uppercase tracking-wider">
                {product.badge}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--pine)] leading-[1.05] tracking-tight">
              {product.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[var(--pine)]/80 leading-relaxed font-normal text-pretty max-w-3xl">
              {product.tagline}
            </p>

            {/* Hardware Telemetry Strip */}
            <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-[var(--pine)]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)] shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[var(--mint-ink)]" />
                <span>Zero Permanent Storage</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[var(--mint-ink)]" />
                <span>Execution: {product.latency}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf7] border border-[var(--line)] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[var(--mint-ink)]" />
                <span>REST API &amp; Web UI</span>
              </div>
            </div>

            {/* Quick Action Cluster */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a href="#studio-canvas" className="btn btn--mint h-11 px-6 text-sm font-semibold shadow-xs">
                <span>Launch Interactive Studio</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href={`/contact?tool=${product.slug}`}
                className="btn btn--ghost h-11 px-6 text-sm font-medium"
              >
                <span>Schedule Architecture Review &rarr;</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BEAT 2: INTERACTIVE STUDIO CHASSIS (.pstage)
          ========================================================================= */}
      <section id="studio-canvas" className="py-12 sm:py-20 border-b border-[var(--line)]">
        <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-mono text-xs text-[var(--mint-ink)] uppercase tracking-wider font-bold">
                NEURAL WORKBENCH · SANDBOX ENVIRONMENT
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--pine)] mt-0.5">
                Live Studio Simulator
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse" />
              <span className="font-mono text-xs text-[var(--mint-ink)] font-semibold uppercase">
                Air-Gapped In-Memory Enclave Active
              </span>
            </div>
          </div>

          {/* Interactive Component Chassis */}
          <div className="rounded-[22px] bg-[#fffdf7] border border-[var(--line)] p-4 sm:p-8 shadow-sm">
            <ProductInteractiveView product={product} slug={slug} />
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BEAT 3: THE FRICTION VS SOVEREIGN PIPELINE BREAKDOWN
          ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-[var(--line)]">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <span className="font-mono text-xs text-[var(--mint-ink)] uppercase tracking-wider font-bold block">
              ARCHITECTURE RATIONALE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--pine)] mt-1">
              Why traditional methods break at scale.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* The Friction */}
            <div className="rounded-[22px] bg-[var(--bone)]/50 border border-[var(--line)] p-7 sm:p-9 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--coral)]" />
                <span className="font-mono text-xs font-bold text-[var(--pine)] uppercase tracking-wider">
                  The Friction (Legacy Workflow)
                </span>
              </div>
              <ul className="space-y-3 pt-2">
                {product.problem.map((prob, pIdx) => (
                  <li key={pIdx} className="text-sm sm:text-base text-[var(--pine)]/80 leading-relaxed flex items-start gap-2.5">
                    <span className="text-[var(--coral)] font-bold shrink-0">✕</span>
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Sovereign Fix */}
            <div className="rounded-[22px] bg-[#fffdf7] border border-[var(--mint-ink)]/30 p-7 sm:p-9 space-y-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--mint-ink)]" />
                <span className="font-mono text-xs font-bold text-[var(--mint-ink)] uppercase tracking-wider">
                  The Sovereign Fix (NorAI Pipeline)
                </span>
              </div>
              <ul className="space-y-3 pt-2">
                {product.solution.map((sol, sIdx) => (
                  <li key={sIdx} className="text-sm sm:text-base text-[var(--pine)] leading-relaxed flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[var(--mint-ink)] shrink-0 mt-1" />
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BEAT 4: DELIVERABLES SPECIFICATION BENTO
          ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-[var(--line)]">
        <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-xs text-[var(--mint-ink)] uppercase tracking-wider font-bold block">
              TECHNICAL DELIVERABLES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--pine)] mt-1">
              What ships in the container.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {product.features.map((feat, fIdx) => (
              <div
                key={fIdx}
                className="rounded-[22px] bg-[#fffdf7] border border-[var(--line)] p-6 flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-[var(--pine)]/85 block">
                    0{fIdx + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[var(--pine)]">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--pine)]/75 leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-[var(--line)]">
                  <span className="font-mono text-[10px] text-[var(--mint-ink)] font-semibold uppercase tracking-wider">
                    Verified Schema Contract
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BEAT 5: NEXTRAIL NAVIGATION (.nextrail)
          Signature Audens next capability link
          ========================================================================= */}
      {nextTool && (
        <section className="py-12 sm:py-16 border-b border-[var(--line)]">
          <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="nextrail rounded-[22px] bg-[#fffdf7] border border-[var(--line)] p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs group hover:border-[var(--pine)]/30 transition-colors">
              <div className="space-y-2">
                <span className="nextrail__n font-mono text-xs font-bold text-[var(--mint-ink)] uppercase tracking-wider block">
                  Next Capability in Sequence
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--pine)]">
                  {nextTool.title}
                </h3>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--pine-08)] text-[var(--pine)]">
                  {nextTool.category}
                </span>
              </div>

              <Link
                href={`/products/${nextTool.slug}`}
                className="btn btn--solid h-12 px-7 text-sm font-semibold shadow-xs self-start sm:self-auto"
              >
                <span>Explore {nextTool.title}</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* =========================================================================
          BEAT 6: CLOSING CONIC DISPATCH (.gradient-card)
          ========================================================================= */}
      <section className="py-16 sm:py-24">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="gradient-card max-w-4xl mx-auto text-center">
            <div className="gradient-card__inner p-8 sm:p-12 space-y-6 bg-[#fffdf7] text-[var(--pine)]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--pine-08)] border border-[var(--line)] text-xs font-mono font-bold text-[var(--mint-ink)] uppercase tracking-wider">
                Option B · Free to Start
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--pine)] tracking-tight leading-tight">
                Ready to deploy {product.title}?
              </h2>

              <p className="text-base sm:text-lg text-[var(--pine)]/75 max-w-2xl mx-auto leading-relaxed font-normal">
                Free to start with 50 sandbox credits and zero credit card required. For dedicated
                REST API endpoints, custom parser schemas, or private VPC enclaves, talk directly to our
                engineering team.
              </p>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/contact?tool=${product.slug}`}
                  className="btn btn--solid w-full sm:w-auto h-12 px-7 text-sm font-semibold shadow-xs active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out"
                >
                  <span>Talk to an engineer</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-160 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/products"
                  className="btn btn--ghost w-full sm:w-auto h-12 px-6 text-sm font-medium text-[var(--pine)] hover:bg-[var(--pine-08)] active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out"
                >
                  <span>&larr; Back to Capabilities Index</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
