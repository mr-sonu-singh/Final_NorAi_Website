'use client';

import React from 'react';

export interface KineticWaveMarqueeProps {
  className?: string;
}

const MARQUEE_ITEMS = [
  'PRACTICAL AI SOLUTIONS',
  'CUSTOM WEB SOFTWARE',
  'SPATIAL COMPUTING (AR & VR)',
  'APPLIED R&D',
  'OPEN ARCHITECTURE',
  'GHAZIPUR TO BHARAT',
  '100% CODE OWNERSHIP',
];

export function KineticWaveMarquee({ className = '' }: KineticWaveMarqueeProps) {
  return (
    <section
      aria-label="NorAI Practice Capability Ticker"
      className={`relative w-full bg-[#051f1f] py-8 sm:py-12 overflow-hidden border-y border-white/10 select-none ${className}`}
    >
      {/* Edge gradient masks for seamless visual fading */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#051f1f] to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#051f1f] to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />

      <span className="sr-only">
        NorAI Practice Pillars: Practical AI Solutions, Custom Web Software, Spatial Computing, Applied R&D, Open Architecture, Ghazipur to Bharat, 100% Code Ownership.
      </span>

      {/* Looping Marquee Track */}
      <div
        aria-hidden="true"
        className="motion-reduce:hidden flex w-max kinetic-wave-track will-change-transform"
      >
        {[0, 1].map((groupIndex) => (
          <div key={groupIndex} className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12">
            {MARQUEE_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-8 sm:gap-12 shrink-0 font-display font-black text-2xl sm:text-4xl md:text-5xl text-[#f5f5f0] tracking-[-0.03em] whitespace-nowrap"
              >
                <span className="hover:text-[#38BDF8] transition-colors duration-200 cursor-default">
                  {item}
                </span>
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#38BDF8] inline-block shrink-0 shadow-[0_0_10px_rgba(30,244,180,0.5)]" aria-hidden="true" />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Reduced Motion Accessible Fallback */}
      <div
        aria-hidden="true"
        className="hidden motion-reduce:flex py-3 px-4 w-full max-w-7xl mx-auto items-center justify-center flex-wrap gap-3 font-mono text-xs sm:text-sm"
      >
        {MARQUEE_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90"
          >
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            <span className="font-bold tracking-wider uppercase text-xs">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default KineticWaveMarquee;
