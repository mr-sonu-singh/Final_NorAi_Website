'use client';

import React, { useEffect, useRef } from 'react';

interface Firefly {
  x: number;
  y: number;
  ax: number;
  ay: number;
  wx: number;
  wy: number;
  phaseX: number;
  phaseY: number;
  blinkSpeed: number;
  radius: number;
  colorType: 'mint' | 'amber';
}

export function FirefliesCanvas() {
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
    let flies: Firefly[] = [];

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const sprites: Record<string, HTMLCanvasElement> = {};
    const spriteColors = {
      mint: '30, 244, 180',
      amber: '255, 178, 100',
    };

    Object.entries(spriteColors).forEach(([key, rgb]) => {
      const s = document.createElement('canvas');
      s.width = 36;
      s.height = 36;
      const sCtx = s.getContext('2d');
      if (sCtx) {
        const grad = sCtx.createRadialGradient(18, 18, 0, 18, 18, 18);
        grad.addColorStop(0, `rgba(${rgb}, 1)`);
        grad.addColorStop(0.25, `rgba(${rgb}, 0.5)`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);
        sCtx.fillStyle = grad;
        sCtx.fillRect(0, 0, 36, 36);
      }
      sprites[key] = s;
    });

    const initFlies = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(18, Math.max(8, Math.round(width / 90)));
      flies = [];
      for (let i = 0; i < count; i++) {
        flies.push({
          x: width * (0.45 + Math.random() * 0.50),
          y: height * (0.40 + Math.random() * 0.48),
          ax: 12 + Math.random() * 32,
          ay: 8 + Math.random() * 24,
          wx: 0.15 + Math.random() * 0.25,
          wy: 0.12 + Math.random() * 0.2,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          blinkSpeed: 0.4 + Math.random() * 0.6,
          radius: 2.2 + Math.random() * 2.4,
          colorType: Math.random() > 0.4 ? 'amber' : 'mint',
        });
      }
    };

    initFlies();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initFlies, 120);
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

        for (const f of flies) {
          if (!f) continue;
          const currX = f.x + Math.sin(elapsed * f.wx + f.phaseX) * f.ax;
          const currY = f.y + Math.cos(elapsed * f.wy + f.phaseY) * f.ay;
          const pulse = reduceMotion
            ? 0.7
            : Math.pow(0.5 + 0.5 * Math.sin(elapsed * f.blinkSpeed + f.phaseX * 2), 2);
          const alpha = 0.2 + 0.8 * pulse;

          ctx.globalAlpha = alpha;
          const sprite = sprites[f.colorType];
          if (sprite) {
            const size = f.radius * 4;
            ctx.drawImage(sprite, currX - size / 2, currY - size / 2, size, size);
          }
        }
        ctx.globalAlpha = 1;
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
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-[3]"
      aria-hidden="true"
    />
  );
}
