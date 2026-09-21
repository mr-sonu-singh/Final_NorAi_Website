import { NavItem } from '@/types';
import { SocialLinkItem } from '@/components/molecules/SocialLinks/SocialLinks.types';
import { LogoVariant } from '@/components/molecules/Logo/Logo.types';

export interface FooterColumn {
  title: string;
  links: NavItem[];
}

export interface FooterProps {
  columns?: FooterColumn[];
  socialLinks?: SocialLinkItem[];
  legalText?: string;
  logoVariant?: LogoVariant;
  className?: string;
}
