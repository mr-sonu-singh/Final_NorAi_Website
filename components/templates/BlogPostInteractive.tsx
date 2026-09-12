'use client';

import React, { useState, useEffect } from 'react';
import {
  Check,
  Copy,
  Terminal,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Share2,
  Twitter,
  Linkedin,
  ArrowRight,
  Bookmark,
} from 'lucide-react';
import { MonogramAvatar } from '@/components/illustrations/editorial/MonogramAvatar';
import type { BlogCallout, BlogCodeSnippet, BlogTable, BlogRelatedProduct } from '@/lib/blog';
import NextLink from 'next/link';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const currentProgress = (totalScroll / windowHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div aria-hidden="true" className="fixed left-0 top-0 z-50 h-[3px] w-full bg-line-subtle">
      <div
        className="h-full bg-terra-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export interface TableOfContentsProps {
  items: Array<{ id: string; title: string }>;
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0.1,
      },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-28 rounded-xl border border-[rgba(13,37,61,0.08)] bg-canvas-paper/80 p-5 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 border-b border-[rgba(13,37,61,0.06)] pb-3 mb-3">
        <Bookmark className="h-3.5 w-3.5 text-terra-600" aria-hidden="true" />
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-primary">
          Contents
        </span>
      </div>
      <ul className="space-y-2 font-sans text-[13px]">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block leading-snug transition-colors duration-150 ${
                  isActive
                    ? 'font-medium text-terra-600'
                    : 'text-ink-secondary hover:text-ink-primary'
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function CodeSnippetBlock({ snippet }: { snippet: BlogCodeSnippet }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-[rgba(13,37,61,0.12)] bg-[#141C2B] text-white shadow-sm">
      {/* Code header bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0F1622] px-4 py-2.5">
        <div className="flex items-center gap-2 font-mono text-xs text-white/70">
          <Terminal className="h-3.5 w-3.5 text-terra-400" aria-hidden="true" />
          <span className="font-medium text-white/90">{snippet.filename || snippet.language}</span>
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/60">
            {snippet.language}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code snippet to clipboard"
          className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/80 transition-colors hover:bg-white/15 hover:text-white active:scale-95"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-sage-400" aria-hidden="true" />
              <span className="text-sage-300">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-white/90">
        <code>{snippet.code}</code>
      </pre>

      {/* Optional terminal output simulation */}
      {snippet.output && (
        <div className="border-t border-white/10 bg-[#0C111A] px-5 py-3 font-mono text-[12px] text-sage-300">
          <span className="text-white/40 mr-2">$</span>
          <span>{snippet.output}</span>
        </div>
      )}
    </figure>
  );
}

export function EditorialCallout({ callout }: { callout: BlogCallout }) {
  const styles = {
    takeaway: {
      border: 'border-sage-300/80 bg-sage-50/70',
      icon: <Lightbulb className="h-5 w-5 text-sage-700 shrink-0 mt-0.5" aria-hidden="true" />,
      badge: 'text-sage-800 bg-sage-100 border-sage-300',
    },
    warning: {
      border: 'border-ochre-300/80 bg-ochre-50/70',
      icon: <AlertTriangle className="h-5 w-5 text-ochre-700 shrink-0 mt-0.5" aria-hidden="true" />,
      badge: 'text-ochre-800 bg-ochre-100 border-ochre-300',
    },
    benchmark: {
      border: 'border-terra-300/80 bg-terra-50/70',
      icon: <BarChart3 className="h-5 w-5 text-terra-700 shrink-0 mt-0.5" aria-hidden="true" />,
      badge: 'text-terra-800 bg-terra-100 border-terra-300',
    },
  }[callout.type];

  return (
    <aside className={`my-8 rounded-xl border p-5 sm:p-6 ${styles.border} shadow-sm`} role="note">
      <div className="flex items-start gap-3.5">
        {styles.icon}
        <div className="space-y-1.5">
          <h3 className="font-display text-lg text-ink-primary font-medium">{callout.title}</h3>
          <p className="text-[15px] leading-relaxed text-ink-body">{callout.content}</p>
        </div>
      </div>
    </aside>
  );
}

export function BenchmarkTable({ table }: { table: BlogTable }) {
  return (
    <div className="my-8 overflow-hidden rounded-xl border border-[rgba(13,37,61,0.12)] bg-canvas-paper shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left font-sans text-[14px]">
          <thead>
            <tr className="border-b border-[rgba(13,37,61,0.10)] bg-canvas-recessed/60">
              {table.headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 font-mono text-xs font-semibold text-ink-primary uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(13,37,61,0.06)]">
            {table.rows.map((row, rIdx) => (
              <tr key={rIdx} className="transition-colors hover:bg-canvas-recessed/30">
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`px-4 py-3 text-ink-body ${
                      cIdx === 0 ? 'font-medium text-ink-primary' : 'font-mono text-xs'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.caption && (
        <p className="border-t border-[rgba(13,37,61,0.06)] bg-canvas-recessed/20 px-4 py-2 font-sans text-xs italic text-ink-secondary">
          {table.caption}
        </p>
      )}
    </div>
  );
}

export function ShareAndMetaBar({
  title,
  slug,
  tags,
}: {
  title: string;
  slug: string;
  tags: string[];
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}/blog/${slug}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(`${window.location.origin}/blog/${slug}`);
    const text = encodeURIComponent(`${title} — via @NorAITech`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(`${window.location.origin}/blog/${slug}`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-y border-[rgba(13,37,61,0.08)] py-5">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="font-mono text-xs text-ink-secondary mr-1">Tags:</span>
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-canvas-recessed px-2.5 py-0.5 font-mono text-[11px] text-ink-secondary"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line-default bg-canvas-pure px-3 py-1.5 font-sans text-xs font-medium text-ink-primary shadow-sm hover:bg-canvas-recessed active:scale-95 transition-all"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-sage-600" aria-hidden="true" />
              <span className="text-sage-700">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5 text-ink-secondary" aria-hidden="true" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleShareTwitter}
          aria-label="Share on X"
          className="inline-flex items-center justify-center rounded-lg border border-line-default bg-canvas-pure p-1.5 text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed transition-colors shadow-sm"
        >
          <Twitter className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={handleShareLinkedIn}
          aria-label="Share on LinkedIn"
          className="inline-flex items-center justify-center rounded-lg border border-line-default bg-canvas-pure p-1.5 text-ink-secondary hover:text-ink-primary hover:bg-canvas-recessed transition-colors shadow-sm"
        >
          <Linkedin className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function AuthorBioCard({ author, authorRole }: { author: string; authorRole: string }) {
  return (
    <div className="mt-10 rounded-2xl border border-[rgba(13,37,61,0.08)] bg-canvas-paper p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
      <MonogramAvatar name={author} size="md" />
      <div className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-wider text-terra-600">Published by</p>
        <h4 className="font-display text-xl text-ink-primary">{author}</h4>
        <p className="text-[13px] text-ink-secondary">{authorRole} at NorAI Technologies</p>
      </div>
    </div>
  );
}

export function ContextualProductCard({ product }: { product: BlogRelatedProduct }) {
  return (
    <div className="my-12 rounded-2xl border border-[rgba(13,37,61,0.12)] bg-gradient-to-br from-canvas-paper to-canvas-recessed/50 p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div className="space-y-2">
          <span className="inline-block rounded-full bg-terra-100 border border-terra-200/80 px-2.5 py-0.5 font-mono text-[11px] font-medium text-terra-700">
            {product.badge}
          </span>
          <h3 className="font-display text-2xl text-ink-primary">{product.name}</h3>
          <p className="max-w-xl text-[14px] leading-relaxed text-ink-body">
            {product.description}
          </p>
        </div>
        <NextLink
          href={product.href as import('next').Route}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-terra-500 px-5 py-2.5 font-sans text-xs font-semibold text-white shadow-sm transition-all hover:bg-terra-600 hover:-translate-y-0.5 active:scale-95"
        >
          <span>Explore Tool</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </NextLink>
      </div>
    </div>
  );
}
