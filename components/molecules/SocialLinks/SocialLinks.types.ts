import React from 'react';
import { IconSize } from '@/components/atoms/Icon/Icon.types';

export interface SocialLinkItem {
  label: string;
  href: string;
  icon: string;
}

export type SocialLinksOrientation = 'horizontal' | 'vertical';

export interface SocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  links: SocialLinkItem[];
  size?: IconSize;
  orientation?: SocialLinksOrientation;
  className?: string;
}
