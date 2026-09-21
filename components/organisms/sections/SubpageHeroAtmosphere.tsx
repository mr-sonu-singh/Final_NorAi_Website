'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface SubpageHeroAtmosphereProps {
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  glowGradient?: string;
}

export function SubpageHeroAtmosphere({
  imageSrc,
  imageAlt,
  imagePosition = 'object-cover object-[78%_center] md:object-[75%_center]',
  glowGradient = 'radial-gradient(ellipse 60% 40% at 75% 60%, rgba(100,180,255,0.16), transparent 70%), radial-gradient(ellipse 50% 50% at 20% 30%, rgba(255,162,77,0.15), transparent 70%)',
}: SubpageHeroAtmosphereProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

    if (!reduceMotion && !isCoarse) {
      const handlePointerMove = (e: PointerEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 6;
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
      {/* Parallax Panoramic Scenic Artwork */}
      <div
        className="absolute inset-[-10px] transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(${-mousePos.x}px, ${-mousePos.y}px, 0)`,
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className={`${imagePosition} opacity-90 transition-opacity duration-500`}
        />
      </div>

      {/* Atmospheric Shimmer & Color Field */}
      <div
        className="absolute inset-0 z-[1] mix-blend-screen opacity-40 pointer-events-none animate-pulse"
        style={{
          background: glowGradient,
          animationDuration: '7s',
        }}
      />

      {/* Fine Cosmic Starlight Mesh */}
      <div
        className="absolute inset-0 z-[2] opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.7) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Directional Scrim: Preserves 100% WCAG AAA Text Legibility on Left Side */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, rgba(6, 9, 25, 0.96) 0%, rgba(6, 9, 25, 0.88) 38%, rgba(6, 9, 25, 0.40) 65%, rgba(6, 9, 25, 0.15) 85%),
            linear-gradient(180deg, rgba(6, 9, 25, 0.70) 0%, rgba(6, 9, 25, 0) 25%, rgba(6, 9, 25, 0.60) 80%, rgba(6, 9, 25, 1) 100%)
          `,
        }}
      />
    </div>
  );
}
