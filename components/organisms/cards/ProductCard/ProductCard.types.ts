export type ProductCardVariant = 'Default' | 'Expanded';

export interface ProductCardProps {
  name: string;
  summary: string;
  href: string;
  image?: string;
  category?: string;
  variant?: ProductCardVariant;
  pending?: boolean;
}
