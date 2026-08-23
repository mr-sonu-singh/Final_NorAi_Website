import React from 'react';
import { StatCard } from '../StatCard';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/lib/utils';
import { MetricCardProps } from './MetricCard.types';

export function MetricCard({
  value,
  label,
  change,
  trend = 'neutral',
  icon,
  className,
  ...props
}: MetricCardProps) {
  const getBadgeVariant = () => {
    if (trend === 'up') return 'success';
    if (trend === 'down') return 'error';
    return 'neutral';
  };

  const getTrendIcon = (): string | undefined => {
    if (trend === 'up') return 'trending-up';
    if (trend === 'down') return 'trending-down';
    return undefined;
  };

  const trendIcon = getTrendIcon();

  return (
    <div className={cn('relative w-full', className)} data-testid="metric-card-molecule" {...props}>
      <StatCard value={value} label={label} icon={icon} />

      {change && (
        <div className="absolute top-6 right-6 z-10 flex items-center gap-1">
          <Badge variant={getBadgeVariant()} size="sm">
            {trendIcon && <Icon name={trendIcon} size="xs" className="mr-1" />}
            {change}
          </Badge>
        </div>
      )}
    </div>
  );
}
