import React from 'react';

export type SkeletonShape = 'text' | 'rect' | 'circle';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: SkeletonShape;
  width?: string | number;
  height?: string | number;
}
