import React from 'react';
import NextLink from 'next/link';
import type { Route } from 'next';
import { cn } from '@/lib/utils';
import { BlogCardProps, BlogCardAccent } from './BlogCard.types';

const accentBarClasses: Record<BlogCardAccent, string> = {
  terra: 'bg-terra-500',
  sage: 'bg-sage-500',
  gold: 'bg-gold-500',
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
  accent = 'terra',
  className,
}: BlogCardProps) {
  return (
    <article
      data-testid="blog-card-organism"
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line-subtle bg-canvas-paper shadow-sm transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-line-default hover:shadow-md focus-within:border-line-accent',
        className,
      )}
    >
      <div aria-hidden="true" className={cn('h-2 w-full', accentBarClasses[accent])} />

      <div className="flex flex-1 flex-col gap-3 p-6">
        {category && (
          <span className="w-fit rounded-full bg-sage-100 px-2.5 py-1 text-xs font-medium text-sage-700">
            {category}
          </span>
        )}

        <h3 className="font-display text-[22px] leading-snug text-ink-primary">
          <NextLink
            href={href as Route}
            className="outline-none after:absolute after:inset-0 after:rounded-2xl transition-colors duration-200 group-hover:text-terra-600 focus-visible:ring-2 focus-visible:ring-terra-500"
          >
            {title}
          </NextLink>
        </h3>

        <p className="line-clamp-3 text-[15px] leading-relaxed text-ink-body">{excerpt}</p>

        <p className="mt-auto pt-4 text-[13px] text-ink-secondary border-t border-line-subtle">
          By {author} · {date}
        </p>
      </div>
    </article>
  );
}
