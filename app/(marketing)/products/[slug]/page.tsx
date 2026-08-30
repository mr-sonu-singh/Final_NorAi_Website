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
                <span>Gemini 2.5 Flash High-Context</span>
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

      {/* Pricing Tiers for this tool */}
      {product.pricing && product.pricing.length > 0 && (
        <section className="py-16 md:py-24 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
          <Container size="default">
            <div className="max-w-2xl mb-12">
              <h2 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
                Predictable pricing.
              </h2>
              <p className="mt-2 text-base text-ink-body">
                Simple monthly plans. Scale as your volume grows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {product.pricing.map((tier, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl p-8 flex flex-col justify-between transition-all ${
                    tier.highlighted
                      ? 'bg-canvas-base border-2 border-accent-500 shadow-md'
                      : 'bg-canvas-base border border-[rgba(13,37,61,0.12)] shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-2xl text-ink-primary font-normal">{tier.tier}</h3>
                      {tier.highlighted && (
                        <span className="px-2.5 py-0.5 rounded-full bg-accent-50 text-accent-500 text-xs font-bold">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <span className="font-display text-4xl text-ink-primary font-normal">{tier.price}</span>
                    </div>
                    <p className="text-xs text-ink-secondary mb-6 leading-relaxed">{tier.desc}</p>

                    <div className="space-y-2.5 pt-4 border-t border-[rgba(13,37,61,0.08)]">
                      {tier.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-ink-body">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent-secondary shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8">
                    <Link
                      href="/contact"
                      className={`w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                        tier.highlighted
                          ? 'bg-accent-500 text-white hover:bg-accent-600 shadow-sm'
                          : 'border border-[rgba(13,37,61,0.15)] bg-canvas-paper text-ink-primary hover:border-accent-500 hover:text-accent-500'
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ Section */}
      {product.faq && product.faq.length > 0 && (
        <section className="py-16 md:py-24 bg-canvas-base">
          <Container size="narrow">
            <div className="max-w-2xl mb-12">
              <h2 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {product.faq.map((faqItem, idx) => (
                <div key={idx} className="rounded-xl bg-canvas-paper border border-[rgba(13,37,61,0.1)] p-6 shadow-sm">
                  <h3 className="font-semibold text-base text-ink-primary mb-2">{faqItem.question}</h3>
                  <p className="text-sm text-ink-body leading-relaxed">{faqItem.answer}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}