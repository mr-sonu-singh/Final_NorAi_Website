import React from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg';
export type IconStrokeWidth = 1.5 | 2;

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: string;
  size?: IconSize;
  strokeWidth?: IconStrokeWidth;
  'aria-label'?: string;
}
