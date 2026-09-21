export type SiteTheme = 'light' | 'dark';

export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  external?: boolean;
  disabled?: boolean;
  children?: NavItem[];
}
