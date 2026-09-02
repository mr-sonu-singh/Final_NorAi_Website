import React from 'react';
import NextLink from 'next/link';
import type { Route } from 'next';
import { cn } from '@/lib/utils';
import { BlogCardProps, BlogCardAccent } from './BlogCard.types';
import { Clock } from 'lucide-react';

const accentBarClasses: Record<BlogCardAccent, string> = {
  terra: 'bg-terra-500',
  sage: 'bg-sage-500',
  gold: 'bg-gold-500',
};

const difficultyClasses = {
  Foundational: 'bg-sage-100 text-sage-800 border-sage-200',
  Intermediate: 'bg-ochre-100 text-ochre-800 border-ochre-200',
  Advanced: 'bg-terra-100 text-terra-800 border-terra-200',
};

/**
 * Editorial vertical post card: 8px warm top bar, serif title as the single
 * clickable element (stretched across the whole card), plain body-font byline.
 */
export function BlogCard({
  title,
  excerpt,
  href,
  author,
  date,
  category,
  readTime,
  difficulty,
  tags,
  accent = 'terra',
  className,
}: BlogCardProps) {
  return (
    <article
      data-testid="blog-card-organism"
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(13,37,61,0.08)] bg-canvas-paper shadow-sm transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-[rgba(13,37,61,0.16)] hover:shadow-md focus-within:border-line-accent',
        className,
      )}
    >
      <div aria-hidden="true" className={cn('h-1.5 w-full', accentBarClasses[accent])} />

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          {category && (
            <span className="w-fit rounded-full bg-sage-100 border border-sage-200/80 px-2.5 py-0.5 font-mono text-[11px] font-medium text-sage-800">
              {category}
            </span>
          )}
          {difficulty && (
            <span
              className={cn(
                'rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold',
                difficultyClasses[difficulty],
              )}
            >
              {difficulty}
            </span>
          )}
          {readTime && (
            <span className="ml-auto flex items-center gap-1 font-mono text-[11px] text-ink-secondary">
              <Clock className="h-3 w-3" />
              {readTime}
            </span>
          )}
        </div>

        <h3 className="font-display text-[22px] leading-snug text-ink-primary">
          <NextLink
            href={href as Route}
            className="outline-none after:absolute after:inset-0 after:rounded-2xl transition-colors duration-200 group-hover:text-terra-600 focus-visible:ring-2 focus-visible:ring-terra-500"
          >
            {title}
          </NextLink>
        </h3>

        <p className="line-clamp-3 text-[14px] leading-relaxed text-ink-body font-sans">
          {excerpt}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded bg-canvas-recessed/60 px-1.5 py-0.5 font-mono text-[10px] text-ink-secondary"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between text-[12px] text-ink-secondary border-t border-[rgba(13,37,61,0.06)] font-sans">
          <span>By {author}</span>
          <span className="font-mono text-[11px]">{date}</span>
        </div>
      </div>
    </article>
  );
}
