'use client';

import React, { useMemo, useState } from 'react';
import type { BlogPostData } from '@/lib/blog';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/foundation';
import { BlogCard, BlogCardAccent } from '@/components/organisms/cards/BlogCard';
import { EditorialCover } from '@/components/illustrations/editorial';
import NextLink from 'next/link';
import { cn } from '@/lib/utils';

const ACCENT_CYCLE: BlogCardAccent[] = ['terra', 'sage', 'gold'];
const ALL_FILTER = 'All';

function sortByDateDesc(posts: BlogPostData[]) {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export interface BlogIndexClientProps {
  posts: BlogPostData[];
}

export function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const categories = useMemo(
    () => [...new Set(posts.map((post) => post.category))],
    [posts],
  );
  const sortedPosts = useMemo(() => sortByDateDesc(posts), [posts]);
  const featured = sortedPosts[0];

  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_FILTER);

  const filteredPosts =
    selectedCategory === ALL_FILTER
      ? sortedPosts
      : sortedPosts.filter((post) => post.category === selectedCategory);

  const gridPosts =
    selectedCategory === ALL_FILTER ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="min-h-screen bg-canvas-base text-ink-primary">
      {/* Editorial header */}
      <Section className="pb-10 pt-14 md:pb-12 md:pt-20">
        <Container size="default">
          <Reveal>
            <p className="font-display text-lg italic text-terra-600">The NorAI journal</p>
            <h1 className="mt-3 max-w-2xl font-display text-[clamp(40px,6vw,60px)] leading-[1.05] tracking-[-0.01em] text-ink-primary">
              Notes from the workshop.
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-body">
              What we learn building small AI tools for real workflows — orchestration
              patterns, retrieval tricks, and the occasional operational scar.
            </p>
          </Reveal>

          {/* Topic filters */}
          <div
            role="group"
            aria-label="Filter notes by topic"
            className="mt-10 flex flex-wrap items-center gap-2"
          >
            {[ALL_FILTER, ...categories].map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'cursor-pointer rounded-full border px-4 py-2 font-sans text-[13px] transition-colors duration-200',
                    isActive
                      ? 'border-transparent bg-terra-500 text-white hover:bg-terra-600'
                      : 'border-line-subtle bg-canvas-paper text-ink-secondary hover:border-line-default hover:text-ink-primary',
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="pt-4 pb-20 md:pb-24">
        <Container size="default">
          {/* Featured post — most recent */}
          {selectedCategory === ALL_FILTER && featured && (
            <Reveal>
              <article className="group relative mb-14 grid overflow-hidden rounded-2xl border border-line-subtle bg-canvas-paper shadow-sm transition-shadow duration-200 hover:shadow-md md:grid-cols-2">
                <EditorialCover
                  title={featured.title}
                  seed={featured.slug}
                  className="aspect-[4/3] md:aspect-auto md:min-h-[340px]"
                />
                <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
                  <span className="w-fit rounded-full bg-sage-100 px-2.5 py-1 text-xs font-medium text-sage-700">
                    {featured.category}
                  </span>
                  <h2 className="font-display text-[30px] leading-tight text-ink-primary transition-colors duration-200 group-hover:text-terra-600">
                    <NextLink
                      href={`/blog/${featured.slug}`}
                      className="outline-none after:absolute after:inset-0"
                    >
                      {featured.title}
                    </NextLink>
                  </h2>
                  <p className="text-[15px] leading-relaxed text-ink-body">{featured.excerpt}</p>
                  <p className="text-[13px] text-ink-secondary">
                    By {featured.author} · {featured.date} · {featured.readTime}
                  </p>
                </div>
              </article>
            </Reveal>
          )}

          {/* Post grid */}
          {gridPosts.length > 0 ? (
            <StaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {gridPosts.map((post, index) => (
                <StaggerItem key={post.slug}>
                  <BlogCard
                    title={post.title}
                    excerpt={post.excerpt}
                    href={`/blog/${post.slug}`}
                    author={post.author}
                    date={post.date}
                    category={post.category}
                    accent={ACCENT_CYCLE[index % ACCENT_CYCLE.length]}
                    className="h-full"
                  />
                </StaggerItem>
              ))}
            </StaggerGrid>
          ) : (
            <div className="rounded-2xl border border-dashed border-line-default bg-canvas-paper p-12 text-center">
              <p className="font-display text-2xl text-ink-primary">
                Nothing filed under &ldquo;{selectedCategory}&rdquo; yet.
              </p>
              <p className="mx-auto mt-2 max-w-sm text-[15px] text-ink-body">
                We write when we have something worth saying — this shelf is waiting.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory(ALL_FILTER)}
                className="mt-6 cursor-pointer rounded-full border border-transparent bg-terra-500 px-5 py-2.5 font-sans text-[13px] font-medium text-white transition-colors duration-200 hover:bg-terra-600"
              >
                Show all notes
              </button>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
