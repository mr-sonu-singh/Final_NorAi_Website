'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import type { BlogPostData } from '@/lib/blog';
import { Container } from '@/components/foundation/Container';
import { Link } from '@/components/atoms/Link';
import { cn } from '@/lib/utils';
import { Search, X, Clock, ArrowRight, BookOpen } from 'lucide-react';

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

  const categories = useMemo(
    () => [ALL_FILTER, ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts],
  );

  const sortedPosts = useMemo(() => sortByDateDesc(posts), [posts]);

  const filteredPosts = useMemo(() => {
    return sortedPosts.filter((post) => {
      const matchesCategory = selectedCategory === ALL_FILTER || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [sortedPosts, selectedCategory, searchQuery]);

  const isFiltering = selectedCategory !== ALL_FILTER || searchQuery.trim().length > 0;
  const featured = !isFiltering ? sortedPosts[0] : null;
  const listPosts = !isFiltering ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="min-h-screen font-sans bg-[#f5f5f0] text-[var(--pine)] selection:bg-[var(--mint)] selection:text-[var(--pine)]">
      {/* =========================================================================
          HERO CHAMBER (.phero)
          ========================================================================= */}
      <section className="relative pt-12 pb-14 sm:pt-20 sm:pb-18 overflow-hidden border-b border-[var(--line)]">
        {/* Soft Organic Aurora Glow Orbs */}
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
            {/* Monospace Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--pine-08)] border border-[var(--line)] text-xs font-mono text-[var(--pine)]">
              <span className="w-2 h-2 rounded-full bg-[var(--mint-ink)] animate-pulse" aria-hidden="true" />
              <span className="tracking-wide uppercase font-medium">
                04 · THE CANONICAL · WRITING ON SOFTWARE THAT CHANGES WHAT HAPPENS
              </span>
            </div>

            {/* Kinetic Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--pine)] leading-[1.04] tracking-tight">
              The Canonical. <br />
              <span className="relative inline-block text-[var(--mint-ink)]">
                Field notes that ship.
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[var(--mint)]"
                  viewBox="0 0 240 40"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 33C50 12 150 5 237 22"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--pine)]/80 leading-relaxed max-w-2xl font-normal text-pretty">
              Practical technical dispatches on Model Context Protocol (MCP) servers, private VPC
              retrieval enclaves, and sovereign machine learning across Uttar Pradesh.
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SEARCH & CATEGORY FILTER RAIL
          ========================================================================= */}
      <section className="py-8 bg-[#fffdf7] border-b border-[var(--line)]">
        <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none" role="tablist">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      'px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer active:scale-[0.98]',
                      isSelected
                        ? 'bg-[var(--pine)] text-[#f5f5f0] shadow-xs font-semibold'
                        : 'bg-[var(--porcelain)] text-[var(--pine)]/70 hover:bg-[var(--bone)] border border-[var(--line)]',
                    )}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--pine)]/40 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles... (Press '/')"
                className="w-full h-10 pl-10 pr-9 rounded-full bg-[var(--porcelain)] border border-[var(--line)] text-xs text-[var(--pine)] placeholder:text-[var(--pine)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--mint-ink)]/20 focus:border-[var(--mint-ink)] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--pine)]/40 hover:text-[var(--pine)]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          FEATURED DISPATCH CARD (If not filtering)
          ========================================================================= */}
      {featured && (
        <section className="py-12 sm:py-16 border-b border-[var(--line)]">
          <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <Link
              href={`/blog/${featured.slug}`}
              className="block py-10 sm:py-14 border-b border-[var(--line)] transition-colors group text-left"
            >
              <div className="max-w-3xl space-y-5 text-left">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[var(--mint)]/20 border border-[var(--mint-ink)]/20 text-xs font-mono font-bold text-[var(--mint-ink)] uppercase tracking-wider">
                    FEATURED DISPATCH · {featured.category}
                  </span>
                  <span className="font-mono text-xs text-[var(--pine)]/85 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readTime}
                  </span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--pine)] tracking-tight leading-tight group-hover:text-[var(--mint-ink)] transition-colors">
                  {featured.title}
                </h2>

                <p className="text-base sm:text-lg text-[var(--pine)]/75 leading-relaxed font-normal">
                  {featured.excerpt}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-[var(--line)]">
                  <span className="font-mono text-xs text-[var(--pine)]/85 font-medium">
                    By {featured.author} · {featured.date}
                  </span>
                  <span className="btn btn--mint h-9 px-4 text-xs font-semibold">
                    <span>Read Dispatch</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </Container>
        </section>
      )}

      {/* =========================================================================
          THE ARTICLE LEDGER (.ledger)
          ========================================================================= */}
      <section className="py-14 sm:py-20 border-b border-[var(--line)]">
        <Container size="wide" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--pine)]">
              All Dispatches ({filteredPosts.length})
            </h2>
            {isFiltering && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(ALL_FILTER);
                  setSearchQuery('');
                }}
                className="text-xs font-mono text-[var(--mint-ink)] hover:underline font-semibold cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="ledger divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {listPosts.map((post, idx) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[var(--porcelain)] transition-colors group text-left"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[var(--pine)]/85">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--pine-08)] text-[var(--pine)]">
                      {post.category}
                    </span>
                    <span className="font-mono text-[11px] text-[var(--pine)]/85 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--pine)] group-hover:text-[var(--mint-ink)] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--pine)]/75 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-4 text-xs font-mono text-[var(--pine)]/85 font-medium">
                  <span>{post.date}</span>
                  <div className="w-9 h-9 rounded-full bg-[var(--pine-08)] flex items-center justify-center text-[var(--pine)] group-hover:bg-[var(--mint)] group-hover:text-[var(--pine)] transition-colors">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}

            {filteredPosts.length === 0 && (
              <div className="p-16 text-center space-y-3">
                <BookOpen className="w-8 h-8 text-[var(--pine)]/30 mx-auto" />
                <p className="font-display text-xl font-bold text-[var(--pine)]">No dispatches match your filter.</p>
                <p className="text-xs text-[var(--pine)]/80 max-w-sm mx-auto">
                  Try searching with different terms or reset your category selection.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          CLOSING CONIC DISPATCH (.gradient-card)
          ========================================================================= */}
      <section className="py-16 sm:py-24">
        <Container size="default" className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div
            className="rounded-[32px] p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FF7755 0%, #FFAE42 40%, #00E599 100%)',
            }}
          >
            <div className="max-w-3xl mx-auto space-y-6 text-[#072929]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--pine-08)] border border-[var(--line)] text-xs font-mono font-bold text-[var(--mint-ink)] uppercase tracking-wider">
                Direct Engineering Telemetry
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--pine)] tracking-tight leading-tight">
                Want to publish a benchmark with NorAI?
              </h2>

              <p className="text-base sm:text-lg text-[var(--pine)]/75 max-w-2xl mx-auto leading-relaxed font-normal">
                We regularly collaborate with university researchers, open-source maintainers, and enterprise
                architects to co-publish reproducible benchmarks on local LLM runtimes.
              </p>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="btn btn--solid w-full sm:w-auto h-12 px-7 text-sm font-semibold shadow-xs active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out"
                >
                  <span>Pitch an Analysis &rarr;</span>
                </Link>
                <Link
                  href="/products"
                  className="btn btn--ghost w-full sm:w-auto h-12 px-6 text-sm font-medium text-[var(--pine)] hover:bg-[var(--pine-08)] active:scale-[0.97] transition-[transform,background-color] duration-160 ease-out"
                >
                  <span>Explore 4 live tools</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
