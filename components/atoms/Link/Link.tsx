import React from 'react';
import NextLink from 'next/link';
import type { Route } from 'next';
import { cn } from '@/lib/utils';
import { Icon } from '../Icon';
import { LinkProps, LinkVariant } from './Link.types';

const variantClasses: Record<LinkVariant, string> = {
  inline:
    'text-[var(--mint-ink)] underline underline-offset-4 hover:text-[var(--pine)] transition-colors duration-200 ease-[var(--ease-smooth)]',
  standalone:
    'inline-flex items-center gap-1 text-[var(--mint-ink)] font-medium hover:text-[var(--pine)] transition-colors duration-200 ease-[var(--ease-smooth)]',
  quiet:
    'text-[var(--pine)]/70 hover:text-[var(--pine)] transition-colors duration-200 ease-[var(--ease-smooth)]',
  unstyled: 'text-inherit no-underline',
};

export function Link({
  href,
  variant = 'inline',
  external = false,
  prefetch,
  'aria-label': ariaLabel,
  className,
  children,
  ...props
}: LinkProps) {
  const isExternal = external || href.startsWith('http://') || href.startsWith('https://');

  const isWrapper = React.isValidElement(children) && typeof children.type !== 'string';
  const effectiveVariant = isWrapper ? 'unstyled' : variant;

  const combinedClasses = cn(
    'font-sans cursor-pointer',
    variantClasses[effectiveVariant],
    className,
  );

  const linkContent = (
    <>
      {children}
      {isExternal && variant === 'standalone' && (
        <Icon name="ExternalLink" size="xs" aria-label="(opens in new tab)" />
      )}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={combinedClasses}
        {...props}
      >
        {linkContent}
      </a>
    );
  }

  return (
    <NextLink
      href={href as Route}
      prefetch={prefetch}
      aria-label={ariaLabel}
      className={combinedClasses}
      {...props}
    >
      {linkContent}
    </NextLink>
  );
}
