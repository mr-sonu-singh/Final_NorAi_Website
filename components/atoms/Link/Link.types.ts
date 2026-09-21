import React from 'react';

export type LinkVariant = 'inline' | 'standalone' | 'quiet' | 'unstyled';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: LinkVariant;
  external?: boolean;
  prefetch?: boolean;
  'aria-label'?: string;
}
