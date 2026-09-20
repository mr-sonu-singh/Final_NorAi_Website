'use client';

import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAlpha: number;
}

export function EngineeringLatticeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Palette: Deep pine tones with subtle royal blue, violet, and mint hints
    const colors = ['#072929', '#1E40AF', '#7C3AED', '#046A47', '#1EF4B4'];

    const numPoints = Math.min(Math.floor((width * height) / 14000), 55);
    const points: Point[] = [];

    for (let i = 0; i < numPoints; i++) {
      const selectedColor = colors[Math.floor(Math.random() * colors.length)] ?? '#072929';
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.45,
        vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1.2,
        color: selectedColor,
        baseAlpha: Math.random() * 0.35 + 0.15,
      });
    }

    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect points with delicate hairline strokes
      const maxDistance = 120;
      for (let i = 0; i < points.length; i++) {
        const ptA = points[i];
        if (!ptA) continue;
        for (let j = i + 1; j < points.length; j++) {
          const ptB = points[j];
          if (!ptB) continue;
          const dx = ptA.x - ptB.x;
          const dy = ptA.y - ptB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.14;
            ctx.beginPath();
            ctx.moveTo(ptA.x, ptA.y);
            ctx.lineTo(ptB.x, ptB.y);
            ctx.strokeStyle = `rgba(7, 41, 41, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Render points and interact with mouse
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        if (!pt) continue;

        if (!prefersReducedMotion) {
          pt.x += pt.vx;
          pt.y += pt.vy;

          if (pt.x < 0 || pt.x > width) pt.vx *= -1;
          if (pt.y < 0 || pt.y > height) pt.vy *= -1;
        }

        // Mouse proximity glow and attraction
        let nodeAlpha = pt.baseAlpha;
        let nodeRadius = pt.radius;
        let strokeRing = false;

        if (mouse.active) {
          const mdx = pt.x - mouse.x;
          const mdy = pt.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < 140) {
            const proximity = 1 - mdist / 140;
            nodeAlpha = Math.min(0.9, pt.baseAlpha + proximity * 0.6);
            nodeRadius = pt.radius + proximity * 1.5;
            strokeRing = true;

            // Subtle line connecting to mouse cursor
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(30, 64, 175, ${proximity * 0.22})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = nodeAlpha;
        ctx.fill();

        if (strokeRing) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, nodeRadius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(124, 58, 237, 0.35)';
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }

        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
    />
  );
}
