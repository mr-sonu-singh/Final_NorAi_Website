import React from 'react';

export interface HandWaveIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function HandWaveIcon({ className, ...props }: HandWaveIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-1a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1-6 6h-1.2a5 5 0 0 1-3.8-1.8L4 16.2a1.5 1.5 0 0 1 2.2-2L8 16V8.5a1.5 1.5 0 0 1 1-1.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
