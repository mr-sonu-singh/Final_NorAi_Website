'use client';

import React from 'react';
import Image from 'next/image';
import { Heading } from '@/components/foundation/Heading';
import { Text } from '@/components/foundation/Text';
import { Badge } from '@/components/atoms/Badge';
import { Tag } from '@/components/atoms/Tag';
import { Icon } from '@/components/atoms/Icon';
import { Skeleton } from '@/components/atoms/Skeleton';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';
import { ProductCardProps } from './ProductCard.types';

export function ProductCard({
  name,
  summary,
  href,
  image,
  category,
  variant = 'Default',
  pending = false,
}: ProductCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isExpanded = variant === 'Expanded';

  if (pending) {
    return (
      <div className="p-6 bg-elevated border border-primary-200 rounded-lg space-y-4">
        <Skeleton className="w-full h-48 rounded-md" />
        <Skeleton className="w-1/4 h-4" />
        <Skeleton className="w-2/3 h-6" />
        <Skeleton className="w-full h-12" />
      </div>
    );
  }

  return (
    <a
      href={href}
      className={cn(
        'group block bg-elevated border border-primary-200 rounded-lg overflow-hidden transition-all duration-fast',
        !prefersReducedMotion && 'hover:-translate-y-1 hover:shadow-lg hover:border-primary-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        isExpanded ? 'p-8 space-y-6' : 'p-6 space-y-4',
      )}
      data-testid="product-card-organism"
      data-variant={variant}
    >
      {image && (
        <div
          className={cn(
            'relative w-full overflow-hidden rounded-md bg-primary-100 mb-4',
            isExpanded ? 'h-64' : 'h-48',
          )}
          style={{ position: 'relative', height: isExpanded ? '16rem' : '12rem' }}
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-normal group-hover:scale-105"
          />
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          {category ? (
            <Tag variant="accent">{category}</Tag>
          ) : (
            <Badge variant="neutral">Product</Badge>
          )}
          <span className="text-primary-400 group-hover:text-accent transition-colors duration-fast">
            <Icon name="arrow-right" size="sm" aria-hidden="true" />
          </span>
        </div>

        <Heading
          as="h3"
          variant={isExpanded ? 'heading-lg' : 'heading-md'}
          className="font-bold text-primary-900 group-hover:text-accent transition-colors duration-fast"
        >
          {name}
        </Heading>

        <Text variant="body-sm" className="text-primary-600 line-clamp-3">
          {summary}
        </Text>
      </div>
    </a>
  );
}
