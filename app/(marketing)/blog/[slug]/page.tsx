import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import NextLink from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';
import { BlogPostTemplate } from '@/components/templates/BlogPostTemplate';
import { MonogramAvatar } from '@/components/illustrations/editorial/MonogramAvatar';
import {
  CodeSnippetBlock,
  EditorialCallout,
  BenchmarkTable,
  ShareAndMetaBar,
  AuthorBioCard,
  ContextualProductCard,
} from '@/components/templates/BlogPostInteractive';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    return buildMetadata({
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
      noIndex: true,
      noCanonical: true,
    });
  }

  return buildMetadata({
    path: `/blog/${post.slug}`,
    title: post.seoTitle ?? post.title,
    description: post.excerpt,
  });
}

function pickRelatedPosts(slug: string, category: string) {
  const others = Object.values(BLOG_POSTS).filter((post) => post.slug !== slug);
  const sameCategory = others
    .filter((post) => post.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const rest = others
    .filter((post) => post.category !== category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return [...sameCategory, ...rest].slice(0, 2);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    notFound();
  }

  const related = pickRelatedPosts(post.slug, post.category);

  // Extract table of contents from sections with headings
  const tocItems = post.sections
    .filter((sec) => sec.heading && sec.id)
    .map((sec) => ({
      id: sec.id,
      title: sec.heading ?? '',
    }));

  const difficultyColors = {
    Foundational: 'bg-sage-100 text-sage-800 border-sage-200',
    Intermediate: 'bg-ochre-100 text-ochre-800 border-ochre-200',
    Advanced: 'bg-terra-100 text-terra-800 border-terra-200',
  }[post.difficulty];

  return (
    <BlogPostTemplate
      tocItems={tocItems}
      backLink={
        <NextLink
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-ink-secondary transition-colors duration-200 hover:text-ink-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Back to All Notes</span>
        </NextLink>
      }
      header={
        <>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-sage-100 border border-sage-200 px-3 py-1 font-mono text-xs font-semibold text-sage-800">
              {post.category}
            </span>
            <span
              className={`rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold ${difficultyColors}`}
            >
              {post.difficulty}
            </span>
          </div>

          <h1 className="mt-4 font-display text-[clamp(34px,5vw,50px)] leading-[1.08] tracking-[-0.015em] text-ink-primary">
            {post.title}
          </h1>

          <p className="mt-4 text-[17px] leading-relaxed text-ink-body font-sans">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 pt-4 border-t border-[rgba(13,37,61,0.08)]">
            <div className="flex items-center gap-3">
              <MonogramAvatar name={post.author} size="sm" />
              <div>
                <p className="font-sans text-[14px] font-semibold text-ink-primary">
                  {post.author}
                </p>
                <p className="font-sans text-[12px] text-ink-secondary">{post.authorRole}</p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3 font-mono text-xs text-ink-secondary">
              <span>{post.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>
        </>
      }
      footer={
        <div className="space-y-12">
          {/* Author bio */}
          <AuthorBioCard author={post.author} authorRole={post.authorRole} />

          {/* Related reading */}
          {related.length > 0 && (
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-ink-secondary">
                Keep Reading
              </p>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((relatedPost) => (
                  <li
                    key={relatedPost.slug}
                    className="group rounded-xl border border-[rgba(13,37,61,0.08)] bg-canvas-paper p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="font-mono text-[11px] text-sage-700 font-medium">
                      {relatedPost.category}
                    </span>
                    <h3 className="mt-2 font-display text-xl leading-snug text-ink-primary transition-colors group-hover:text-terra-600">
                      <NextLink href={`/blog/${relatedPost.slug}`} className="outline-none">
                        {relatedPost.title}
                      </NextLink>
                    </h3>
                    <p className="mt-2 text-xs text-ink-secondary">
                      {relatedPost.author} · {relatedPost.readTime}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      }
    >
      {post.sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24 mb-10">
          {section.heading && (
            <h2 className="mb-4 mt-8 font-display text-[26px] sm:text-[30px] leading-snug text-ink-primary">
              {section.heading}
            </h2>
          )}

          <div className="space-y-4">
            {section.paragraphs.map((paragraph, pIdx) => (
              <p key={pIdx} className="text-[17px] leading-[1.8] text-ink-body font-sans">
                {paragraph}
              </p>
            ))}
          </div>

          {section.callout && <EditorialCallout callout={section.callout} />}

          {section.table && <BenchmarkTable table={section.table} />}

          {section.codeSnippet && <CodeSnippetBlock snippet={section.codeSnippet} />}
        </section>
      ))}

      {/* Contextual Product Widget */}
      {post.relatedProduct && <ContextualProductCard product={post.relatedProduct} />}

      {/* Share and Metadata Bar */}
      <ShareAndMetaBar title={post.title} slug={post.slug} tags={post.tags} />
    </BlogPostTemplate>
  );
}
