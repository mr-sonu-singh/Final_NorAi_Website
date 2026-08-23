import React from 'react';
import { cn } from '@/lib/utils';

export interface EditorialCoverProps {
  /** Post title — the first letter becomes the cover's serif glyph */
  title: string;
  /** Stable seed (post slug) so each article gets its own arrangement */
  seed: string;
  className?: string;
}

/** Deterministic small hash → stable pseudo-random arrangement per slug. */
function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

const ACCENTS = [
  { fill: '#C2553A', soft: '#F5E1DA' }, // terra
  { fill: '#5B8A72', soft: '#E2EDE7' }, // sage
  { fill: '#B8860B', soft: '#FFF4D6' }, // gold
];

/**
 * Generated editorial cover: layered warm shapes on parchment with an
 * oversized serif initial. Pure CSS/SVG — no photos, no AI imagery.
 */
export function EditorialCover({ title, seed, className }: EditorialCoverProps) {
  const h = hashSeed(seed);
  const primary = ACCENTS[h % ACCENTS.length] ?? ACCENTS[0] ?? { fill: '#C2553A', soft: '#F5E1DA' };
  const secondary = ACCENTS[(h >> 3) % ACCENTS.length] ?? ACCENTS[1] ?? { fill: '#5B8A72', soft: '#E2EDE7' };


  const initial = title.trim().charAt(0).toUpperCase() || 'N';

  const arcX = 90 + ((h >> 4) % 60);
  const discY = 40 + ((h >> 6) % 50);
  const barY = 190 + ((h >> 8) % 30);

  return (
    <div
      aria-hidden="true"
      className={cn('relative overflow-hidden bg-canvas-recessed', className)}
    >
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {/* layered warm shapes */}
        <circle cx={arcX} cy={discY} r="110" fill={primary.soft} opacity="0.9" />
        <circle cx={arcX + 34} cy={discY + 26} r="72" fill={secondary.soft} opacity="0.9" />
        <path
          d={`M -20 ${barY + 60} Q 200 ${barY - 70} 420 ${barY + 40} L 420 320 L -20 320 Z`}
          fill="#FDFBF7"
          opacity="0.85"
        />
        <path
          d={`M -20 ${barY + 96} Q 200 ${barY - 20} 420 ${barY + 84} L 420 320 L -20 320 Z`}
          fill={secondary.soft}
          opacity="0.7"
        />
        <line x1="-20" y1="52" x2="150" y2="52" stroke={primary.fill} strokeWidth="3" opacity="0.35" />

        {/* oversized serif initial */}
        <text
          x="286"
          y="228"
          textAnchor="middle"
          fontFamily="var(--font-display), Georgia, serif"
          fontSize="170"
          fill={primary.fill}
          opacity="0.92"
        >
          {initial}
        </text>
      </svg>
    </div>
  );
}
