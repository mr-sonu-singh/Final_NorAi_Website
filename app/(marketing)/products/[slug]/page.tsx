import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PRODUCTS_DATA } from '@/lib/products';
import { Container } from '@/components/foundation/Container';
import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { buildMetadata } from '@/lib/seo';
import {
  FileText,
  Headphones,
  MessageSquare,
  Newspaper,
  ArrowRight,
  CheckCircle2,
  Zap,
  ChevronRight,
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

  return (
    <div className="bg-canvas-base text-ink-primary min-h-screen font-sans selection:bg-accent-500 selection:text-white">
      {/* Editorial Hero Header */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-20 border-b border-[rgba(13,37,61,0.08)] bg-canvas-paper">
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
              <div className="w-12 h-12 rounded-xl bg-accent-50 text-accent-500 flex items-center justify-center">
                <IconComp className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-canvas-recessed text-ink-body text-xs font-semibold">
                {product.badge}
              </span>
              <span className="text-xs font-semibold text-accent-secondary flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                {product.latency} execution
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink-primary font-normal leading-tight tracking-tight">
              {product.title}
            </h1>

            <p className="text-lg md:text-xl text-ink-body leading-relaxed font-normal">
              {product.tagline}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/contact">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  <span>Start using this tool</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View pricing tiers
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Overview & Problem/Solution Section */}
      <section className="py-16 md:py-24 bg-canvas-base border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Problem vs Solution */}
            <div className="lg:col-span-7 space-y-8">
              <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm space-y-4">
                <h2 className="font-display text-2xl text-ink-primary font-normal">The Bottleneck</h2>
                <div className="space-y-3">
                  {product.problem.map((prob, idx) => (
                    <p key={idx} className="text-sm text-ink-body leading-relaxed pl-3 border-l-2 border-accent-400">
                      {prob}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm space-y-4">
                <h2 className="font-display text-2xl text-ink-primary font-normal">The NorAI Solution</h2>
                <div className="space-y-3">
                  {product.solution.map((sol, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-ink-body leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-accent-secondary shrink-0 mt-0.5" />
                      <span>{sol}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Technical Spec Card */}
            <div className="lg:col-span-5 rounded-2xl bg-canvas-paper border border-[rgba(13,37,61,0.12)] p-8 shadow-sm space-y-6">
              <h3 className="font-display text-xl text-ink-primary font-normal">Technical Specifications</h3>

              <div className="space-y-3 font-sans text-xs">
                <div className="flex items-center justify-between p-3 rounded-lg bg-canvas-recessed/60">
                  <span className="text-ink-secondary">Execution Latency</span>
                  <span className="font-mono text-ink-primary font-medium">{product.latency}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-canvas-recessed/60">
                  <span className="text-ink-secondary">Integration</span>
                  <span className="font-mono text-ink-primary font-medium">REST API & Webhooks</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-canvas-recessed/60">
                  <span className="text-ink-secondary">Data Policy</span>
                  <span className="font-mono text-accent-secondary font-medium">Zero Permanent Storage</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-canvas-recessed/60">
                  <span className="text-ink-secondary">Uptime SLA</span>
                  <span className="font-mono text-ink-primary font-medium">99.9% Availability</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[rgba(13,37,61,0.08)]">
                <Link href="/docs" className="text-xs font-semibold text-accent-500 hover:underline flex items-center gap-1">
                  <span>Explore developer API docs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Feature Breakdown */}
      <section className="py-16 md:py-24 bg-canvas-paper border-b border-[rgba(13,37,61,0.08)]">
        <Container size="default">
          <div className="max-w-2xl mb-12">
            <h2 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
              Built for speed and precision.
            </h2>
            <p className="mt-2 text-base text-ink-body">
              Core technical capabilities designed for seamless enterprise workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.features.map((feat, idx) => (
              <div key={idx} className="rounded-2xl bg-canvas-base border border-[rgba(13,37,61,0.1)] p-6 shadow-sm">
                <h3 className="font-display text-xl text-ink-primary font-normal mb-2">{feat.title}</h3>
                <p className="text-sm text-ink-body leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Tiers for this tool */}
      {product.pricing && product.pricing.length > 0 && (
        <section className="py-16 md:py-24 bg-canvas-base border-b border-[rgba(13,37,61,0.08)]">
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
                      ? 'bg-canvas-paper border-2 border-accent-500 shadow-md'
                      : 'bg-canvas-paper border border-[rgba(13,37,61,0.12)] shadow-sm'
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
                    <Link href="/contact" className="w-full">
                      <Button
                        variant={tier.highlighted ? 'primary' : 'secondary'}
                        size="md"
                        fullWidth
                      >
                        Get Started
                      </Button>
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
        <section className="py-16 md:py-24 bg-canvas-paper">
          <Container size="narrow">
            <div className="max-w-2xl mb-12">
              <h2 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {product.faq.map((faqItem, idx) => (
                <div key={idx} className="rounded-xl bg-canvas-base border border-[rgba(13,37,61,0.1)] p-6">
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