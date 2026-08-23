import React from 'react';
import { cn } from '@/lib/utils';

export interface BlogPostTemplateProps {
  /** Quiet back link rendered above the article header */
  backLink: React.ReactNode;
  /** Category chip, headline, byline */
  header: React.ReactNode;
  /** Article prose body */
  children: React.ReactNode;
  /** Related reading footer */
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Reading-experience shell for /blog/[slug]: a single quiet 680px column on
 * warm canvas. Owns chrome and rhythm; pages own content.
 */
export function BlogPostTemplate({
  backLink,
  header,
  children,
  footer,
  className,
}: BlogPostTemplateProps) {
  return (
    <article className={cn('min-h-screen bg-canvas-base', className)}>
      <div className="mx-auto w-full max-w-[680px] px-4 pb-20 pt-10 sm:px-6 md:pt-14">
        <div>{backLink}</div>

        <header className="mt-8">{header}</header>

        <div className="prose-editorial mt-10">{children}</div>

        {footer && <footer className="mt-16 border-t border-line-subtle pt-10">{footer}</footer>}
      </div>
    </article>
  );
}
