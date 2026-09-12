'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import type { BlogPostData } from '@/lib/blog';
import { Container } from '@/components/foundation/Container';
import { Section } from '@/components/foundation/Section';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/foundation';
import { BlogCard, BlogCardAccent } from '@/components/organisms/cards/BlogCard';
import { EditorialCover } from '@/components/illustrations/editorial';
import NextLink from 'next/link';
import { cn } from '@/lib/utils';
import { Search, X, Rss, Mail, Clock } from 'lucide-react';

const ACCENT_CYCLE: BlogCardAccent[] = ['terra', 'sage', 'gold'];
const ALL_FILTER = 'All';

function sortByDateDesc(posts: BlogPostData[]) {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export interface BlogIndexClientProps {
  posts: BlogPostData[];
}

export function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_FILTER);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(ALL_FILTER);
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success'>('idle');

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = useMemo(() => [...new Set(posts.map((post) => post.category))], [posts]);

  const sortedPosts = useMemo(() => sortByDateDesc(posts), [posts]);

  const filteredPosts = useMemo(() => {
    return sortedPosts.filter((post) => {
      const matchesCategory = selectedCategory === ALL_FILTER || post.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === ALL_FILTER || post.difficulty === selectedDifficulty;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [sortedPosts, selectedCategory, selectedDifficulty, searchQuery]);

  const isFiltering =
    selectedCategory !== ALL_FILTER ||
    selectedDifficulty !== ALL_FILTER ||
    searchQuery.trim().length > 0;

  const featured = !isFiltering ? sortedPosts[0] : null;
  const gridPosts = !isFiltering ? filteredPosts.slice(1) : filteredPosts;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribedEmail) {
      setSubscribeStatus('success');
    }
  };

  const clearAllFilters = () => {
    setSelectedCategory(ALL_FILTER);
    setSelectedDifficulty(ALL_FILTER);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-canvas-base text-ink-primary">
      {/* Editorial Header */}
      <Section className="pb-8 pt-12 md:pb-10 md:pt-16">
        <Container size="default">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <p className="font-display text-lg italic text-terra-600">The NorAI Journal</p>
              <div className="flex items-center gap-2 font-mono text-xs text-ink-secondary">
                <span className="flex h-2 w-2 rounded-full bg-sage-500 animate-pulse" />
                <span>9 Technical Publications</span>
              </div>
            </div>

            <h1 className="mt-3 max-w-3xl font-display text-[clamp(38px,6vw,58px)] leading-[1.05] tracking-[-0.015em] text-ink-primary">
              Notes from the workshop.
            </h1>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-body font-sans">
              Practical engineering notes on multi-agent state machines, hybrid vector retrieval,
              MCP developer tooling, quantized local inference, and production automation scars.
            </p>
          </Reveal>

          {/* Search & Filter Console */}
          <div className="mt-8 space-y-4 rounded-2xl border border-[rgba(13,37,61,0.08)] bg-canvas-paper/70 p-5 sm:p-6 shadow-sm">
            {/* Search Input Bar */}
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-secondary"
                aria-hidden="true"
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes by keyword, algorithm, or author... (Press '/' to focus)"
                className="w-full rounded-xl border border-[rgba(13,37,61,0.12)] bg-canvas-pure pl-10 pr-10 py-2.5 font-sans text-[14px] text-ink-primary placeholder:text-ink-secondary/70 focus:border-terra-500 focus:outline-none focus:ring-2 focus:ring-terra-500/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-secondary hover:text-ink-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category & Level Pills */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2">
              <div
                role="group"
                aria-label="Filter notes by topic"
                className="flex flex-wrap items-center gap-1.5"
              >
                <span className="font-mono text-xs text-ink-secondary mr-1">Topic:</span>
                {[ALL_FILTER, ...categories].map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        'cursor-pointer rounded-full border px-3 py-1 font-sans text-xs transition-colors duration-150',
                        isActive
                          ? 'border-transparent bg-terra-500 text-white font-medium hover:bg-terra-600'
                          : 'border-line-subtle bg-canvas-pure text-ink-secondary hover:border-line-default hover:text-ink-primary',
                      )}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              {/* Difficulty Level Filter */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="font-mono text-xs text-ink-secondary mr-1">Level:</span>
                {[ALL_FILTER, 'Foundational', 'Intermediate', 'Advanced'].map((lvl) => {
                  const isActive = selectedDifficulty === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSelectedDifficulty(lvl)}
                      className={cn(
                        'cursor-pointer rounded-md border px-2.5 py-0.5 font-mono text-[11px] transition-colors',
                        isActive
                          ? 'border-ink-primary bg-ink-primary text-white font-semibold'
                          : 'border-line-subtle bg-canvas-pure text-ink-secondary hover:border-line-default hover:text-ink-primary',
                      )}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter status banner */}
            {isFiltering && (
              <div className="flex items-center justify-between border-t border-[rgba(13,37,61,0.06)] pt-3 text-xs text-ink-secondary">
                <span>
                  Found{' '}
                  <strong className="text-ink-primary font-semibold">{filteredPosts.length}</strong>{' '}
                  matching notes
                </span>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="font-mono text-terra-600 hover:text-terra-700 underline underline-offset-2"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Main Content Section */}
      <Section className="pt-2 pb-20 md:pb-24">
        <Container size="default">
          {/* Featured Lead Post (Shown only when not actively filtering) */}
          {featured && (
            <Reveal>
              <article className="group relative mb-12 grid overflow-hidden rounded-2xl border border-[rgba(13,37,61,0.08)] bg-canvas-paper shadow-sm transition-all duration-200 hover:shadow-md md:grid-cols-12">
                <EditorialCover
                  title={featured.title}
                  seed={featured.slug}
                  className="md:col-span-5 aspect-[4/3] md:aspect-auto md:min-h-[360px]"
                />
                <div className="md:col-span-7 flex flex-col justify-center gap-4 p-7 sm:p-9 md:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-fit rounded-full bg-sage-100 border border-sage-200 px-3 py-0.5 font-mono text-xs font-semibold text-sage-800">
                      {featured.category}
                    </span>
                    <span className="rounded-full bg-terra-100 border border-terra-200 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-terra-800">
                      {featured.difficulty}
                    </span>
                    <span className="ml-auto flex items-center gap-1 font-mono text-xs text-ink-secondary">
                      <Clock className="h-3 w-3" />
                      {featured.readTime}
                    </span>
                  </div>

                  <h2 className="font-display text-[28px] sm:text-[32px] leading-tight text-ink-primary transition-colors duration-200 group-hover:text-terra-600">
                    <NextLink
                      href={`/blog/${featured.slug}`}
                      className="outline-none after:absolute after:inset-0"
                    >
                      {featured.title}
                    </NextLink>
                  </h2>

                  <p className="text-[15px] leading-relaxed text-ink-body font-sans">
                    {featured.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-canvas-recessed/70 px-2 py-0.5 font-mono text-[11px] text-ink-secondary"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <p className="pt-3 border-t border-[rgba(13,37,61,0.06)] text-[13px] text-ink-secondary font-sans">
                    By {featured.author} · {featured.date}
                  </p>
                </div>
              </article>
            </Reveal>
          )}

          {/* Grid of Posts */}
          {gridPosts.length > 0 ? (
            <StaggerGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post, index) => (
                <StaggerItem key={post.slug}>
                  <BlogCard
                    title={post.title}
                    excerpt={post.excerpt}
                    href={`/blog/${post.slug}`}
                    author={post.author}
                    date={post.date}
                    category={post.category}
                    readTime={post.readTime}
                    difficulty={post.difficulty}
                    tags={post.tags}
                    accent={ACCENT_CYCLE[index % ACCENT_CYCLE.length]}
                    className="h-full"
                  />
                </StaggerItem>
              ))}
            </StaggerGrid>
          ) : (
            <div className="rounded-2xl border border-dashed border-[rgba(13,37,61,0.16)] bg-canvas-paper p-12 text-center">
              <p className="font-display text-2xl text-ink-primary">
                No engineering notes matched your search criteria.
              </p>
              <p className="mx-auto mt-2 max-w-sm text-[15px] text-ink-body font-sans">
                Try searching for broader terms like &ldquo;RAG&rdquo;, &ldquo;Zod&rdquo;,
                &ldquo;GPU&rdquo;, or reset your filters.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-6 cursor-pointer rounded-full bg-terra-500 px-5 py-2 font-sans text-xs font-semibold text-white shadow-sm transition-colors hover:bg-terra-600"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Archival Engineering Newsletter / RSS Block */}
          <div className="mt-16 rounded-2xl border border-[rgba(13,37,61,0.09)] bg-gradient-to-br from-canvas-paper to-canvas-recessed/60 p-8 md:p-10 shadow-sm">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
              <div className="space-y-3 md:col-span-7">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-terra-600" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-wider text-terra-600 font-semibold">
                    The Engineering Dispatch
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-ink-primary">
                  Deep dives on practical AI systems, delivered bi-weekly.
                </h3>
                <p className="text-[14px] leading-relaxed text-ink-body font-sans">
                  No marketing promotions or spam. Just verified code architectures, RAG benchmarks,
                  and sub-second inference patterns from the NorAI engineering desk.
                </p>
              </div>

              <div className="md:col-span-5">
                {subscribeStatus === 'success' ? (
                  <div className="rounded-xl border border-sage-300 bg-sage-50 p-4 text-center">
                    <p className="font-sans text-xs font-medium text-sage-800">
                      ✓ Subscribed! You will receive new engineering notes as they publish.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="engineer@company.com"
                        value={subscribedEmail}
                        onChange={(e) => setSubscribedEmail(e.target.value)}
                        className="w-full rounded-lg border border-[rgba(13,37,61,0.12)] bg-canvas-pure px-3.5 py-2 font-sans text-xs text-ink-primary placeholder:text-ink-secondary focus:border-terra-500 focus:outline-none focus:ring-1 focus:ring-terra-500"
                      />
                      <button
                        type="submit"
                        className="shrink-0 rounded-lg bg-terra-500 px-4 py-2 font-sans text-xs font-semibold text-white shadow-sm hover:bg-terra-600 active:scale-95 transition-all"
                      >
                        Subscribe
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-ink-secondary">
                      <span>Zero spam · Unsubscribe anytime</span>
                      <NextLink
                        href="/feed.xml"
                        className="inline-flex items-center gap-1 hover:text-terra-600 transition-colors"
                      >
                        <Rss className="h-3 w-3" />
                        <span>RSS Feed</span>
                      </NextLink>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
