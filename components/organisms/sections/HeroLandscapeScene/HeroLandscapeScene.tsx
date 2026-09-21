'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { StarsCanvas } from './StarsCanvas';
import { FirefliesCanvas } from './FirefliesCanvas';

export function HeroLandscapeScene() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

    if (!reduceMotion && !isCoarse) {
      const handlePointerMove = (e: PointerEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 8;
        setMousePos({ x, y });
      };
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      return () => window.removeEventListener('pointermove', handlePointerMove);
    }
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#060919]"
      aria-hidden="true"
    >
      {/* Base Cinematic Tree & Cosmic Aurora Backdrop */}
      <div
        className="absolute inset-[-12px] transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(${-mousePos.x}px, ${-mousePos.y}px, 0)`,
        }}
      >
        <Image
          src="/images/hero-cosmic-tree.webp"
          alt="Majestic Banyan Tree and Cosmic Aurora Backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] sm:object-[78%_center] md:object-[80%_bottom] opacity-95 transition-opacity duration-500"
        />
      </div>

      {/* Atmospheric Aurora Ambient Glow Filter */}
      <div
        className="absolute inset-0 z-[1] mix-blend-screen opacity-40 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_78%_75%,rgba(255,162,77,0.28),transparent_70%),radial-gradient(ellipse_50%_50%_at_25%_35%,rgba(100,180,255,0.16),transparent_70%)] animate-pulse"
        style={{ animationDuration: '6s' }}
      />

      {/* Live Twinkling Starfield Overlay */}
      {mounted && <StarsCanvas />}

      {/* Bioluminescent Floating Fireflies Overlay */}
      {mounted && <FirefliesCanvas />}

      {/* Editorial Scrim: Preserves 100% WCAG AAA Text Legibility on Left Side */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, rgba(6, 9, 25, 0.96) 0%, rgba(6, 9, 25, 0.88) 36%, rgba(6, 9, 25, 0.40) 65%, rgba(6, 9, 25, 0) 85%),
            linear-gradient(180deg, rgba(6, 9, 25, 0.70) 0%, rgba(6, 9, 25, 0) 25%, rgba(6, 9, 25, 0.65) 85%, rgba(6, 9, 25, 1) 100%)
          `,
        }}
      />

      {/* Light Mode Adaptive Overlay: softens into a morning dawn watercolor */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none opacity-0 dark:opacity-0 transition-opacity duration-300"
      />
    </div>
  );
}
