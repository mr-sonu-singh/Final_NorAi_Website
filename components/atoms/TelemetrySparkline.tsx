'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TelemetrySparklineProps {
  data?: number[];
  color?: string;
  className?: string;
  width?: number;
  height?: number;
}

export function TelemetrySparkline({
  data = [12, 19, 15, 28, 24, 38, 32, 45, 42, 58, 54, 68, 62, 79, 74, 88],
  color = '#C85A32',
  className,
  width = 96,
  height = 24,
}: TelemetrySparklineProps) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * (width - 4) + 2;
      const y = height - 4 - ((val - min) / range) * (height - 8);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const areaPoints = `2,${height - 2} ${points} ${width - 2},${height - 2}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn('overflow-visible inline-block', className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sparkline-grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <polygon
        points={areaPoints}
        fill={`url(#sparkline-grad-${color.replace('#', '')})`}
      />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}
