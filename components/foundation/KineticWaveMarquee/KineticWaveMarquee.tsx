import React, { useId } from 'react';

export interface KineticWaveMarqueeProps {
  className?: string;
}

const MARQUEE_COPY =
  'INSTANT CANDIDATE MATCHING ✦ CLEAN LECTURE NOTES ✦ 2-MINUTE CHAT BRIEFS ✦ VERIFIED REGIONAL JOBS ✦ 100% PRIVATE & SECURE ✦ FREE STUDENT WORKSHOPS ✦ ';

const STATIC_CAPABILITIES = [
  { label: 'Instant Candidate Matching', accent: 'text-[#2EFCC2]' },
  { label: 'Clean Lecture Notes', accent: 'text-[#D8B4FE]' },
  { label: '2-Minute Chat Briefs', accent: 'text-[#FFA07A]' },
  { label: 'Verified Regional Jobs', accent: 'text-[#34D399]' },
  { label: '100% Private & Secure', accent: 'text-[#2EFCC2]' },
  { label: 'Free Student Workshops', accent: 'text-[#D8B4FE]' },
];

// Smooth undulating sine wave coordinates across 2000 x 140 space
// Tangents at x=0 and x=2000 are identical for seamless infinite horizontal continuity
const WAVE_PATH_DATA =
  'M 0 70 C 160 20, 340 20, 500 70 C 660 120, 840 120, 1000 70 C 1160 20, 1340 20, 1500 70 C 1660 120, 1840 120, 2000 70';

/**
 * KineticWaveMarquee — Section 4 of NorAI Official Web
 *
 * Visual & Motion Craft:
 * - Undulating sine wave ribbon separating Hero Command Stage from Capability Arc.
 * - Off-main-thread GPU acceleration via CSS hardware transform3d, linear velocity.
 * - Multi-stop jewel gradient typography: Mint (#2EFCC2) -> White (#F8FAFC) -> Lavender (#D8B4FE).
 * - Full prefers-reduced-motion support with graceful static badge fallback ribbon.
 * - WCAG AA compliant screen reader summary with aria-hidden looping decorative text.
 */
export function KineticWaveMarquee({ className = '' }: KineticWaveMarqueeProps) {
  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  // 4 identical segments ensure continuous loop without gaps even on 4K (3840px) displays
  const segmentIndices = [0, 1, 2, 3];

  return (
    <section
      aria-label="NorAI Core Capabilities"
      className={`relative w-full bg-[#07080D] overflow-hidden border-y border-white/[0.08] select-none ${className}`}
    >
      {/* Top hairline laser sheen gradient */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-20"
        aria-hidden="true"
      />

      {/* Bottom hairline laser sheen gradient */}
      <div
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-20"
        aria-hidden="true"
      />

      {/* Subtle radial ambient jewel glow in the background */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(46,252,194,0.03),transparent)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Edge fade gradients for seamless visual entrance & exit */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-[#07080D] via-[#07080D]/80 to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-[#07080D] via-[#07080D]/80 to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Screen Reader Semantic Announcement (Assistive Tech Summary) */}
      <span className="sr-only">
        NorAI Core Capabilities: Instant candidate matching, clean lecture notes, 2-minute chat
        briefs, verified regional jobs, and 100% private processing.
      </span>

      {/* =========================================================================
          ANIMATED WAVE TRACK (Off-Main-Thread GPU Composited)
          Hidden when prefers-reduced-motion: reduce is requested
          ========================================================================= */}
      <div
        aria-hidden="true"
        className="motion-reduce:hidden relative w-full overflow-hidden pointer-events-none py-1.5 sm:py-2.5 md:py-3"
      >
        <div className="kinetic-wave-track flex w-max will-change-transform">
          {segmentIndices.map((idx) => {
            const gradId = `kwm-grad-${safeId}-${idx}`;
            const pathId = `kwm-path-${safeId}-${idx}`;

            return (
              <svg
                key={idx}
                viewBox="0 0 2000 140"
                preserveAspectRatio="none"
                className="w-[2000px] h-[110px] sm:h-[125px] md:h-[135px] shrink-0 pointer-events-none"
              >
                <defs>
                  {/* High-Voltage Jewel Typography Gradient: Mint -> Crisp White -> Lavender -> Crisp White -> Mint */}
                  <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2EFCC2" />
                    <stop offset="25%" stopColor="#F8FAFC" />
                    <stop offset="50%" stopColor="#D8B4FE" />
                    <stop offset="75%" stopColor="#F8FAFC" />
                    <stop offset="100%" stopColor="#2EFCC2" />
                  </linearGradient>

                  {/* Undulating Wave Guide Path */}
                  <path id={pathId} d={WAVE_PATH_DATA} fill="none" />
                </defs>

                {/* Subtle Hairline Laser Wave Sheen Guide */}
                <path
                  d={WAVE_PATH_DATA}
                  fill="none"
                  stroke={`url(#${gradId})`}
                  strokeWidth="1"
                  strokeOpacity="0.18"
                  strokeDasharray="4 6"
                />

                {/* Kinetic Undulating Typography */}
                <text
                  fill={`url(#${gradId})`}
                  fontSize="16"
                  fontWeight="700"
                  letterSpacing="0.25em"
                  style={{
                    fontFamily:
                      'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace)',
                  }}
                >
                  <textPath href={`#${pathId}`} startOffset="0">
                    {MARQUEE_COPY}
                  </textPath>
                </text>
              </svg>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          STATIC FALLBACK RIBBON (WCAG AA & prefers-reduced-motion: reduce)
          Zero CPU/GPU overhead; renders an immaculate horizontal badge ribbon
          ========================================================================= */}
      <div
        aria-hidden="true"
        className="hidden motion-reduce:flex py-4 sm:py-5 px-4 sm:px-6 w-full max-w-6xl mx-auto items-center justify-center flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm font-mono tracking-wider"
      >
        {STATIC_CAPABILITIES.map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-text-primary shadow-sm"
          >
            <span className={`${item.accent} text-xs`} aria-hidden="true">
              ✦
            </span>
            <span className="font-semibold uppercase text-[11px] sm:text-xs tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default KineticWaveMarquee;
