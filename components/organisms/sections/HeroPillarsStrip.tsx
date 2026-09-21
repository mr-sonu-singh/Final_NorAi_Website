'use client';

import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';

export function AiSolutionsIcon({ className = 'w-6 h-6 sm:w-7 sm:h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Central Chip Body */}
      <rect x="10" y="10" width="28" height="28" rx="6" />
      {/* Top Pins */}
      <line x1="18" y1="4" x2="18" y2="10" />
      <line x1="24" y1="4" x2="24" y2="10" />
      <line x1="30" y1="4" x2="30" y2="10" />
      {/* Bottom Pins */}
      <line x1="18" y1="38" x2="18" y2="44" />
      <line x1="24" y1="38" x2="24" y2="44" />
      <line x1="30" y1="38" x2="30" y2="44" />
      {/* Left Pins */}
      <line x1="4" y1="18" x2="10" y2="18" />
      <line x1="4" y1="24" x2="10" y2="24" />
      <line x1="4" y1="30" x2="10" y2="30" />
      {/* Right Pins */}
      <line x1="38" y1="18" x2="44" y2="18" />
      <line x1="38" y1="24" x2="44" y2="24" />
      <line x1="38" y1="30" x2="44" y2="30" />
      {/* Center 'Ai' text glyph */}
      <text
        x="24"
        y="29"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        fontSize="13"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-0.5px"
      >
        Ai
      </text>
    </svg>
  );
}

export function CustomSoftwareIcon({ className = 'w-6 h-6 sm:w-7 sm:h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Rounded Square Frame */}
      <rect x="8" y="8" width="32" height="32" rx="7" />
      {/* < / > code glyphs */}
      <path d="M19 19L14 24L19 29" />
      <path d="M29 19L34 24L29 29" />
      <line x1="26" y1="17" x2="22" y2="31" />
    </svg>
  );
}

export function ArVrIcon({ className = 'w-6 h-6 sm:w-7 sm:h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Main Goggles Body */}
      <path d="M8 18C8 14.6863 10.6863 12 14 12H34C37.3137 12 40 14.6863 40 18V26C40 29.3137 37.3137 32 34 32H30C28.5 32 27.5 30 24 30C20.5 30 19.5 32 18 32H14C10.6863 32 8 29.3137 8 26V18Z" />
      {/* Front Visor Inset Lenses */}
      <path d="M13 18C13 16.8954 13.8954 16 15 16H20C21.1046 16 22 16.8954 22 18V23C22 24.1046 21.1046 25 20 25H15C13.8954 25 13 24.1046 13 23V18Z" />
      <path d="M26 18C26 16.8954 26.8954 16 28 16H33C34.1046 16 35 16.8954 35 18V23C35 24.1046 34.1046 25 33 25H28C26.8954 25 26 24.1046 26 23V18Z" />
      {/* Side Straps */}
      <path d="M4 22H8" />
      <path d="M40 22H44" />
      {/* Top Strap Connector */}
      <path d="M24 12V8" />
    </svg>
  );
}

export function ResearchInnovationIcon({ className = 'w-6 h-6 sm:w-7 sm:h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Lightbulb Dome */}
      <path d="M16 20C16 15.5817 19.5817 12 24 12C28.4183 12 32 15.5817 32 20C32 23.5 30 26 28.5 28C27.5 29.3 27 30.5 27 32H21C21 30.5 20.5 29.3 19.5 28C18 26 16 23.5 16 20Z" />
      {/* Base Screw Threads */}
      <line x1="21" y1="36" x2="27" y2="36" />
      <path d="M22 40H26" />
      {/* Inner Filament */}
      <path d="M22 24L24 20L26 24" />
      {/* Radiant Rays */}
      <line x1="24" y1="4" x2="24" y2="8" />
      <line x1="11" y1="9" x2="14" y2="12" />
      <line x1="37" y1="9" x2="34" y2="12" />
      <line x1="6" y1="20" x2="10" y2="20" />
      <line x1="42" y1="20" x2="38" y2="20" />
    </svg>
  );
}

interface PillarItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: Route;
}

const PILLARS_LIST: PillarItem[] = [
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    icon: AiSolutionsIcon,
    href: '/services',
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    icon: CustomSoftwareIcon,
    href: '/services',
  },
  {
    id: 'ar-vr',
    title: 'AR/VR',
    icon: ArVrIcon,
    href: '/services',
  },
  {
    id: 'research-innovation',
    title: 'Research & Innovation',
    icon: ResearchInnovationIcon,
    href: '/services',
  },
];

export function HeroPillarsStrip({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative w-full max-w-xl py-2 sm:py-2.5 px-2 sm:px-3 rounded-2xl bg-white/[0.025] backdrop-blur-md border border-white/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.12)] select-none ${className}`}
      aria-label="NorAI Core Engineering Capabilities"
    >
      <div className="grid grid-cols-4 gap-1 sm:gap-2 text-center">
        {PILLARS_LIST.map((pillar) => {
          const IconComp = pillar.icon;
          return (
            <Link
              key={pillar.id}
              href={pillar.href}
              className="group flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-xl transition-all duration-200 hover:bg-white/[0.04] active:scale-[0.98]"
            >
              <div className="text-white/75 group-hover:text-[#B278E3] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_0_10px_rgba(178,120,227,0.45)]">
                <IconComp className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <span className="mt-1.5 text-[11px] sm:text-xs font-medium tracking-tight text-white/80 group-hover:text-white transition-colors text-center leading-tight">
                {pillar.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HeroPillarsStrip;
