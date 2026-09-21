export type BlogCardAccent = 'terra' | 'sage' | 'gold';

export interface BlogCardProps {
  title: string;
  excerpt: string;
  href: string;
  author: string;
  date: string;
  category?: string;
  readTime?: string;
  difficulty?: 'Foundational' | 'Intermediate' | 'Advanced';
  tags?: string[];
  /** Rotating warm accent for the card's top bar */
  accent?: BlogCardAccent;
  className?: string;
}
