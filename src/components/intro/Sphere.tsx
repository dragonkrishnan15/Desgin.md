import React from 'react';
import { motion } from 'framer-motion';

interface SphereProps {
  scale: number;
  bobY: number;
  squashY: number;
  blink: boolean;
  showEyes: boolean;
  showSparkles?: boolean;
}

export const Sphere: React.FC<SphereProps> = ({
  scale,
  bobY,
  squashY,
  blink,
  showEyes,
  showSparkles = false,
}) => {
  return (
    <div className="relative flex items-center justify-center select-none pointer-events-none">
      {/* 1. Ambient Glow Layer behind sphere */}
      <motion.div
        className="absolute rounded-full w-28 h-28 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #8B5CF6, #22D3EE, #F472B6)',
          filter: 'blur(36px)',
          opacity: 0.65,
          scale: scale * 1.15,
        }}
      />

      {/* 2. Main Glossy Gradient Sphere with Squash & Stretch */}
      <motion.div
        className="relative w-24 h-24 rounded-full shadow-2xl flex items-center justify-center overflow-hidden border border-white/20"
        style={{
          y: bobY,
          scaleX: 1 / Math.max(0.6, squashY), // Stretch horizontally when squashed
          scaleY: squashY * scale,
          background: `
            radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 36%),
            linear-gradient(135deg, #8B5CF6 0%, #22D3EE 50%, #F472B6 100%)
          `,
          boxShadow: '0 12px 32px rgba(139, 92, 246, 0.4), inset 0 -4px 8px rgba(0, 0, 0, 0.25)',
          willChange: 'transform',
        }}
      >
        {/* Soft specular inner rim */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 65% 75%, rgba(0,0,0,0.2) 0%, transparent 50%)',
          }}
        />

        {/* 3. Amusing Tiny Eyes that blink */}
        {showEyes && (
          <div className="relative flex items-center gap-3.5 -mt-1 z-20">
            {/* Left Eye */}
            <motion.div
              className="w-2 h-2.5 rounded-full bg-[#1e1b4b] shadow-sm relative overflow-hidden"
              animate={blink ? { scaleY: [1, 0.1, 1] } : { scaleY: 1 }}
              transition={{ duration: 0.2 }}
            >
              {/* Eye Catchlight */}
              <div className="w-0.5 h-0.5 rounded-full bg-white absolute top-0.5 left-0.5" />
            </motion.div>

            {/* Right Eye */}
            <motion.div
              className="w-2 h-2.5 rounded-full bg-[#1e1b4b] shadow-sm relative overflow-hidden"
              animate={blink ? { scaleY: [1, 0.1, 1] } : { scaleY: 1 }}
              transition={{ duration: 0.2 }}
            >
              {/* Eye Catchlight */}
              <div className="w-0.5 h-0.5 rounded-full bg-white absolute top-0.5 left-0.5" />
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* 4. Downstroke Sparkles */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, scale: 0, y: 10, x: 0 }}
              animate={{
                opacity: [1, 0],
                scale: [0, 1.2, 0.4],
                y: [0, 30 + (i % 3) * 15],
                x: [-20 + i * 8, -40 + i * 16],
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-sm"
              style={{
                boxShadow: '0 0 6px #ffffff, 0 0 12px #22d3ee',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

