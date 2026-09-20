'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  speed: number;
  phase: number;
  color: string;
}

export function StarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const palette = ['180, 244, 255', '215, 200, 255', '255, 225, 190', '255, 255, 255'];

    const initStars = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(120, Math.max(40, Math.round(width / 14)));
      stars = [];
      for (let i = 0; i < count; i++) {
        const pColor = palette[Math.floor(Math.random() * palette.length)] ?? '255, 255, 255';
        stars.push({
          x: Math.random() * width,
          y: Math.pow(Math.random(), 1.3) * height * 0.75,
          r: 0.5 + Math.random() * 1.2,
          a: 0.25 + Math.random() * 0.7,
          speed: 0.6 + Math.random() * 1.2,
          phase: Math.random() * Math.PI * 2,
          color: pColor,
        });
      }
    };

    initStars();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initStars, 120);
    };
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        isVisible = entry.isIntersecting;
      }
    });
    observer.observe(canvas);

    const startTime = performance.now();
    const render = (now: number) => {
      if (isVisible) {
        const elapsed = (now - startTime) / 1000;
        ctx.clearRect(0, 0, width, height);

        for (const s of stars) {
          if (!s) continue;
          const twinkle = reduceMotion ? 1 : 0.6 + 0.4 * Math.sin(elapsed * s.speed + s.phase);
          const alpha = s.a * twinkle;
          if (alpha < 0.05) continue;

          ctx.fillStyle = `rgba(${s.color}, ${alpha.toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-[2]"
      aria-hidden="true"
    />
  );
}
