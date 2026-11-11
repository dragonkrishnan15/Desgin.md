import React, { useRef, useEffect } from 'react';
import { noise2D } from './noise';

interface SmokeCanvasProps {
  progress: number; // 0 = drift, 1 = fully condensed at center
  stopped?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  noiseOffset: number;
  colorMix: number; // 0 = black, 1 = violet/cyan/pink gradient
  spriteIndex: number;
}

export const SmokeCanvas: React.FC<SmokeCanvasProps> = ({ progress, stopped = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (stopped) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // 1. Pre-render offscreen particle sprites (Performance rule: never create gradients per frame!)
    const SPRITE_SIZE = 64;
    const spriteColors = [
      'rgba(20, 20, 24,',      // Black/graphite smoke
      'rgba(139, 92, 246,',    // Violet
      'rgba(34, 211, 238,',    // Cyan
      'rgba(244, 114, 182,',   // Pink
    ];

    const offscreenSprites: HTMLCanvasElement[] = spriteColors.map(colorPrefix => {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = SPRITE_SIZE;
      offCanvas.height = SPRITE_SIZE;
      const offCtx = offCanvas.getContext('2d')!;

      const grad = offCtx.createRadialGradient(
        SPRITE_SIZE / 2, SPRITE_SIZE / 2, 0,
        SPRITE_SIZE / 2, SPRITE_SIZE / 2, SPRITE_SIZE / 2
      );
      grad.addColorStop(0, `${colorPrefix} 0.8)`);
      grad.addColorStop(0.4, `${colorPrefix} 0.35)`);
      grad.addColorStop(0.8, `${colorPrefix} 0.08)`);
      grad.addColorStop(1, `${colorPrefix} 0)`);

      offCtx.fillStyle = grad;
      offCtx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
      return offCanvas;
    });

    // 2. Initialize Particles (150 desktop, 70 mobile)
    const isMobile = width < 768;
    const count = isMobile ? 70 : 150;
    const particles: Particle[] = [];

    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < count; i++) {
      // Spawn near edges and drift in
      const angle = Math.random() * Math.PI * 2;
      const distance = (Math.max(width, height) * 0.4) + Math.random() * 200;
      particles.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        vx: 0,
        vy: 0,
        size: 32 + Math.random() * 48,
        baseAlpha: 0.15 + Math.random() * 0.45,
        noiseOffset: Math.random() * 100,
        colorMix: 0,
        spriteIndex: 0,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const targetX = width / 2;
      const targetY = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Curl noise velocity field
        const n1 = noise2D((p.x * 0.003) + p.noiseOffset, (p.y * 0.003) + time * 0.4);
        const n2 = noise2D((p.x * 0.003) + time * 0.4, (p.y * 0.003) + p.noiseOffset);

        p.vx = n1 * 1.8;
        p.vy = n2 * 1.8;

        // In condensation phase (progress > 0), pull toward center
        if (progress > 0) {
          const dx = targetX - p.x;
          const dy = targetY - p.y;
          const pullForce = progress * 0.08;
          p.x += dx * pullForce;
          p.y += dy * pullForce;

          // Transition color from black (sprite 0) to gradient stops (sprites 1, 2, 3)
          if (progress > 0.2) {
            p.spriteIndex = 1 + (i % 3);
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Shrink particle size as it condenses
        const currentSize = p.size * (1 - progress * 0.65);
        const alpha = p.baseAlpha * (1 - progress * 0.35);

        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        const sprite = offscreenSprites[p.spriteIndex];
        ctx.drawImage(
          sprite,
          p.x - currentSize / 2,
          p.y - currentSize / 2,
          currentSize,
          currentSize
        );
      }

      ctx.globalAlpha = 1;

      if (!stopped) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [progress, stopped]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ opacity: 1 }}
    />
  );
};

