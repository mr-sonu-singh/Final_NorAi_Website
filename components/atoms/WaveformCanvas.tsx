'use client';

import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

interface WaveformCanvasProps {
  isPlaying?: boolean;
  color?: string;
  height?: number;
  barCount?: number;
  className?: string;
}

export function WaveformCanvas({
  isPlaying = true,
  color = '#C85A32',
  height = 48,
  barCount = 36,
  className,
}: WaveformCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // IntersectionObserver to pause rendering when canvas is offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          isVisibleRef.current = entry.isIntersecting;
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      if (!isVisibleRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const h = height;

      if (canvas.width !== width * dpr || canvas.height !== h * dpr) {
        canvas.width = width * dpr;
        canvas.height = h * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, h);

      const spacing = width / barCount;
      const barWidth = Math.max(2, spacing * 0.55);

      if (prefersReducedMotion || !isPlaying) {
        // Static frame
        for (let i = 0; i < barCount; i++) {
          const staticRatio = 0.2 + 0.6 * Math.sin((i / barCount) * Math.PI);
          const barHeight = Math.max(4, h * staticRatio);
          const x = i * spacing + (spacing - barWidth) / 2;
          const y = (h - barHeight) / 2;

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, 2);
          ctx.fill();
        }
        ctx.restore();
        return;
      }

      phase += 0.06;

      for (let i = 0; i < barCount; i++) {
        // Multi-frequency wave calculation simulating speech/audio modulation
        const wave1 = Math.sin(phase + i * 0.28);
        const wave2 = Math.cos(phase * 1.4 + i * 0.18);
        const wave3 = Math.sin(phase * 0.7 + i * 0.45);
        const envelope = Math.sin((i / barCount) * Math.PI);

        const amplitude = (wave1 * 0.4 + wave2 * 0.35 + wave3 * 0.25) * envelope;
        const normalizedHeight = Math.max(0.12, Math.abs(amplitude));
        const barHeight = Math.max(4, h * normalizedHeight);

        const x = i * spacing + (spacing - barWidth) / 2;
        const y = (h - barHeight) / 2;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [isPlaying, color, height, barCount, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{ height: `${height}px` }}
      className={cn('w-full block', className)}
      aria-hidden="true"
    />
  );
}
