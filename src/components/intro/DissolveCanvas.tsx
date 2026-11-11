import React, { useRef, useEffect } from 'react';

interface DissolveCanvasProps {
  active: boolean;
  onComplete?: () => void;
}

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  delay: number;
}

export const DissolveCanvas: React.FC<DissolveCanvasProps> = ({ active, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMobile = w < 768;
    const dpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const cx = w / 2;
    const cy = h / 2;

    // Palette: pure chrome silver & ice-blue dust
    const CHROME_COLORS = [
      '#ffffff',
      '#f1f5f9',
      '#e2e8f0',
      '#bfe3ff', // Ice blue accent
      '#94a3b8',
      '#cbd5e1',
      '#64748b',
    ];

    // Responsive dust count for lightweight smooth rendering across mobile and desktop
    const count = isMobile ? 380 : 850;
    const particles: DustParticle[] = [];

    for (let i = 0; i < count; i++) {
      // Sample elliptical distribution mimicking wings
      const isWing = Math.random() > 0.18;
      let px: number, py: number, distRatio: number;

      if (isWing) {
        const side = Math.random() > 0.5 ? 1 : -1;
        const spreadX = 40 + Math.random() * 320;
        const spreadY = -40 + (spreadX / 320) * 120 + (Math.random() - 0.5) * 60;
        px = cx + side * spreadX;
        py = cy + spreadY;
        distRatio = spreadX / 320;
      } else {
        // Center body
        px = cx + (Math.random() - 0.5) * 60;
        py = cy - 60 + Math.random() * 140;
        distRatio = 0.2;
      }

      // Outer tips dissolve first (spawn delay based on 1 - distRatio)
      const delay = (1 - distRatio) * 0.28 + Math.random() * 0.08;
      const outwardAngle = Math.atan2(py - cy, px - cx);
      const speed = 1.2 + Math.random() * 2.8;

      particles.push({
        x: px,
        y: py,
        vx: Math.cos(outwardAngle) * speed + (Math.random() - 0.5) * 1.2,
        vy: Math.sin(outwardAngle) * speed - 0.8 - Math.random() * 1.5, // Drifts upward
        size: 1.5 + Math.random() * 2.2,
        color: CHROME_COLORS[Math.floor(Math.random() * CHROME_COLORS.length)],
        alpha: 1.0,
        decay: 0.012 + Math.random() * 0.018,
        delay,
      });
    }

    let elapsed = 0;
    let lastT = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
      elapsed += dt;

      ctx.clearRect(0, 0, w, h);
      let aliveCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (elapsed < p.delay) continue;

        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.02; // Gentle buoyancy
        p.alpha = Math.max(0, p.alpha - p.decay);

        if (p.alpha > 0.01) {
          aliveCount++;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;

      if (aliveCount > 0 && elapsed < 1.6) {
        animRef.current = requestAnimationFrame(loop);
      } else {
        onComplete?.();
      }
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-30 pointer-events-none"
    />
  );
};
