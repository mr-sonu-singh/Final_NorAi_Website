import { NavItem } from '@/types';
import { LogoVariant } from '@/components/molecules/Logo/Logo.types';

export interface HeaderCTA {
  label: string;
  href: string;
  onClick?: () => void;
  external?: boolean;
}

export interface HeaderProps {
  navItems?: NavItem[];
  logoVariant?: LogoVariant;
  primaryCta?: HeaderCTA;
  secondaryCta?: HeaderCTA;
  sticky?: boolean;
  className?: string;
}