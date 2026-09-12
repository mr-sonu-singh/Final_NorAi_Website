import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PRODUCTS_DATA } from '@/lib/products';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import { buildMetadata, getSoftwareApplicationJsonLd, getBreadcrumbListJsonLd, JsonLd } from '@/lib/seo';
import { ProductInteractiveView } from '@/components/organisms/ProductDetail/ProductInteractiveView';
import {
  FileText,
  Headphones,
  MessageSquare,
  Newspaper,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles: FileText,
  Zap: Headphones,
  Cpu: MessageSquare,
  Layers: Newspaper,
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
    title: `${product.title} — NorAI Self-Serve AI Tools`,
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

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: product.title, path: `/products/${product.slug}` },
  ];

  return (
    <div className="bg-canvas-base text-ink-primary min-h-screen font-sans selection:bg-accent-500 selection:text-white">
      <JsonLd schema={getSoftwareApplicationJsonLd(product)} />
      <JsonLd schema={getBreadcrumbListJsonLd(breadcrumbs)} />
      {/* Editorial Hero Header */}
      <section className="relative pt-16 pb-14 md:pt-24 md:pb-18 border-b border-[rgba(13,37,61,0.08)] bg-canvas-paper">
        <Container size="default">
          <div className="max-w-3xl space-y-6 text-left">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-ink-secondary">
              <Link href="/products" className="hover:text-accent-500 transition-colors">
                Products
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-ink-primary font-medium">{product.title}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent-50 text-accent-500 flex items-center justify-center shadow-sm">
                <IconComp className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-canvas-recessed text-ink-body text-xs font-semibold">
                {product.badge}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink-primary font-normal leading-tight tracking-display">
              {product.title}
            </h1>

            <p className="fluid-lead text-ink-body leading-relaxed font-normal text-pretty">
              {product.tagline}
            </p>

            <div className="pt-2 flex flex-wrap gap-6 text-xs text-ink-secondary font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Permanent Data Retention</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent-secondary" />
                <span>Gemini 3.5 Lite High-Context</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent-secondary" />
                <span>REST API & Web UI</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Interactive Studio Canvas & Tabs */}
      <section className="py-12 md:py-20 bg-canvas-base border-b border-[rgba(13,37,61,0.08)]">
        <Container size="wide">
          <ProductInteractiveView product={product} slug={slug} />
        </Container>
      </section>

      {/* Option B: Free to Start Commitments & Enterprise Scoping */}
      <section className="py-16 md:py-20 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="rounded-2xl border border-[rgba(13,37,61,0.12)] bg-canvas-base p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left shadow-sm">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-accent-50 border border-accent-500/20 text-accent-500 text-xs font-mono font-semibold">
                <span>OPTION B · FREE TO START</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-ink-primary font-normal">
                Ready to deploy {product.title}?
              </h2>
              <p className="text-sm text-ink-body leading-relaxed">
                Free to start with 50 sandbox credits and zero credit card required. For dedicated API endpoints, custom parser schemas, or private VPC enclaves, talk directly to our engineering team.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href={`/contact?tool=${product.slug}`}
                className="inline-flex items-center justify-center py-2.5 px-5 rounded-lg text-sm font-semibold bg-accent-500 text-white hover:bg-accent-600 transition-colors shadow-sm"
              >
                Talk to an engineer &rarr;
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center py-2.5 px-4 rounded-lg text-sm font-semibold border border-[rgba(13,37,61,0.15)] bg-canvas-paper text-ink-primary hover:border-accent-500 hover:text-accent-500 transition-colors"
              >
                API Reference
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}