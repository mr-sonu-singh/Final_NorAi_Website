import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import NextLink from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';
import { BlogPostTemplate } from '@/components/templates/BlogPostTemplate';
import { MonogramAvatar } from '@/components/illustrations/editorial';


interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

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
      path: `/blog/${slug}`,
      title: 'Article Not Found — NorAi Blog',
      description: 'The requested blog article could not be found.',
    });
  }

  return buildMetadata({
    path: `/blog/${post.slug}`,
    title: `${post.title} — NorAi Journal`,
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

  return (
    <BlogPostTemplate
      backLink={
        <NextLink
          href="/blog"
          className="inline-flex items-center gap-1.5 font-sans text-[13px] text-ink-secondary transition-colors duration-200 hover:text-ink-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          All notes
        </NextLink>
      }
      header={
        <>
          <span className="w-fit rounded-full bg-sage-100 px-2.5 py-1 text-xs font-medium text-sage-700">
            {post.category}
          </span>
          <h1 className="mt-4 font-display text-[clamp(34px,5vw,44px)] leading-[1.12] tracking-[-0.01em] text-ink-primary">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-3">
            <MonogramAvatar name={post.author} size="sm" />
            <p className="font-sans text-[13px] text-ink-secondary">
              By {post.author} · {post.date} · {post.readTime}
            </p>
          </div>
          <hr className="mt-8 border-line-subtle" />
        </>
      }
      footer={
        related.length > 0 ? (
          <div>
            <p className="font-sans text-[13px] text-ink-secondary">Keep reading</p>
            <ul className="mt-5 space-y-6">
              {related.map((relatedPost) => (
                <li key={relatedPost.slug}>
                  <NextLink
                    href={`/blog/${relatedPost.slug}`}
                    className="group inline-flex items-baseline gap-2 outline-none"
                  >
                    <span className="font-display text-xl leading-snug text-ink-primary transition-colors duration-200 group-hover:text-terra-600">
                      {relatedPost.title}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 self-center text-terra-500 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </NextLink>
                  <p className="mt-1 font-sans text-[13px] text-ink-secondary">
                    By {relatedPost.author} · {relatedPost.date} · {relatedPost.category}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : undefined
      }
    >
      {post.sections.map((section, idx) => (
        <section key={idx}>
          {section.heading && (
            <h2 className="mb-4 mt-12 font-display text-[26px] leading-snug text-ink-primary first:mt-0">
              {section.heading}
            </h2>
          )}
          <div className="space-y-5">
            {section.paragraphs.map((paragraph, pIdx) => (
              <p key={pIdx} className="text-[17px] leading-[1.8] text-ink-body">
                {paragraph}
              </p>
            ))}
          </div>

          {section.codeSnippet && (
            <figure className="my-8 overflow-hidden rounded-lg border border-line-subtle bg-canvas-recessed">
              <figcaption className="px-5 pt-4 font-sans text-[11px] tracking-wide text-ink-secondary">
                {section.codeSnippet.language}
              </figcaption>
              <pre className="overflow-x-auto p-5 pt-2 font-mono text-sm leading-relaxed text-ink-body">
                <code>{section.codeSnippet.code}</code>
              </pre>
            </figure>
          )}
        </section>
      ))}
    </BlogPostTemplate>
  );
}
