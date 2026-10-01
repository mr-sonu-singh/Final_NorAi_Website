import React from 'react';
import { cn } from '@/lib/utils';
import { ReadingProgressBar, TableOfContents } from './BlogPostInteractive';

export interface BlogPostTemplateProps {
  /** Quiet back link rendered above the article header */
  backLink: React.ReactNode;
  /** Category chip, headline, byline */
  header: React.ReactNode;
  /** Article prose body */
  children: React.ReactNode;
  /** Table of contents items for desktop sticky sidebar */
  tocItems?: Array<{ id: string; title: string }>;
  /** Related reading footer */
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Reading-experience shell for /blog/[slug]: an elegant editorial stage with
 * sticky reading progress, table of contents sidebar on large screens,
 * and high-contrast typography.
 */
export function BlogPostTemplate({
  backLink,
  header,
  children,
  tocItems,
  footer,
  className,
}: BlogPostTemplateProps) {
  return (
    <article className={cn('min-h-screen bg-canvas-base relative', className)}>
      <ReadingProgressBar />

      <div className="mx-auto w-full max-w-[1140px] px-4 pb-24 pt-10 sm:px-6 md:pt-14">
        <div className="mb-6">{backLink}</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          {/* Main Reading Column (8 cols on desktop) */}
          <div className="lg:col-span-8">
            <header className="mb-10">{header}</header>

            <div className="prose-editorial">{children}</div>

            {footer && (
              /* A <div>, not a <footer>: the document already has exactly one
                 footer, and a second one made `locator('footer')` ambiguous. */
              <div className="mt-16 border-t border-[rgba(13,37,61,0.08)] pt-10">
                {footer}
              </div>
            )}
          </div>

          {/* Sticky Sidebar on Desktop (4 cols) */}
          <div className="hidden lg:block lg:col-span-4">
            {tocItems && tocItems.length > 0 && (
              <div className="sticky top-24 space-y-6">
                <TableOfContents items={tocItems} />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
