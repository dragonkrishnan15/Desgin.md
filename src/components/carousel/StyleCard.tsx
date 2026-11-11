import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { StyleDef, Theme } from '@/types';
import { ThemeScope } from '@/theme/ThemeScope';
import { Specimen } from '@/components/Specimen';
import { BlueprintRenderer } from '@/components/blueprints/BlueprintRenderer';
import { loadFontPair } from '@/data/fonts';
import { ArrowRight, Bookmark, Wand2, Trash2 } from 'lucide-react';

interface StyleCardProps {
  styleDef: StyleDef;
  isHero: boolean;
  distance: number; // 0 = hero, 1 = neighbor, 2+ = far
  offsetX: number; // pixel offset from center
  onSelect: () => void;
  onCommit: () => void;
  onSaveToBucket: () => void;
  onCopyPrompt: () => void;
  onDeleteCustom?: () => void;
  motionSetting: Theme['motion'];
  entranceDelay?: number;
}

export const StyleCard: React.FC<StyleCardProps> = ({
  styleDef,
  isHero,
  distance,
  offsetX,
  onSelect,
  onCommit,
  onSaveToBucket,
  onCopyPrompt,
  onDeleteCustom,
  motionSetting,
  entranceDelay = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Preload this card's font
  useEffect(() => {
    if (distance <= 2) {
      loadFontPair(styleDef.defaults.fontId);
    }
  }, [styleDef.defaults.fontId, distance]);

  // 3D Tilt Motion Values — all hooks called unconditionally at top level
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 25, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Rotate ±8deg based on cursor position (-0.5 to 0.5)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  // Cursor light position
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(50);

  // Build the radial gradient string from lightX/lightY — called unconditionally
  const cursorLightBg = useTransform(
    [lightX, lightY],
    ([lx, ly]: number[]) =>
      `radial-gradient(circle at ${lx}% ${ly}%, #ffffff 0%, transparent 60%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHero || motionSetting === 'none' || motionSetting === 'subtle') return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cursorX = (e.clientX - rect.left) / rect.width;
    const cursorY = (e.clientY - rect.top) / rect.height;

    mouseX.set(cursorX - 0.5);
    mouseY.set(cursorY - 0.5);
    lightX.set(cursorX * 100);
    lightY.set(cursorY * 100);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    lightX.set(50);
    lightY.set(50);
  };

  // Card theme
  const cardTheme: Theme = {
    styleId: styleDef.id,
    paletteId: styleDef.defaults.paletteId,
    fontId: styleDef.defaults.fontId,
    geometry: styleDef.defaults.geometry,
    motion: motionSetting,
    locks: { style: false, palette: false, font: false, geometry: false },
  };

  // Visual scaling based on distance
  let scale = 1.0;
  let cardOpacity = 1.0;
  let blurAmount = 0;
  let zIndex = 1;

  if (isHero) {
    scale = 1.08;
    cardOpacity = 1.0;
    blurAmount = 0;
    zIndex = 10;
  } else if (distance === 1) {
    scale = 0.85;
    cardOpacity = 0.6;
    blurAmount = 2;
    zIndex = 5;
  } else {
    scale = 0.7;
    cardOpacity = 0.35;
    blurAmount = 4;
    zIndex = 1;
  }

  const shouldTilt = isHero && motionSetting === 'expressive';
  const shouldShowLight = isHero && motionSetting === 'expressive';

  return (
    // Outer wrapper provides the perspective (must be separate from rotated element)
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{
        opacity: cardOpacity,
        y: 0,
        x: offsetX,
        scale,
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 28,
        mass: 0.8,
        delay: entranceDelay,
      }}
      style={{
        position: 'absolute',
        zIndex,
        perspective: 1200,
      }}
      className="select-none"
    >
      {/* Inner card that tilts */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (!isHero) onSelect();
        }}
        style={{
          rotateX: shouldTilt ? rotateX : 0,
          rotateY: shouldTilt ? rotateY : 0,
          transformStyle: 'preserve-3d',
          willChange: isHero ? 'transform' : 'auto',
        }}
        className={`relative w-[340px] sm:w-[460px] md:w-[540px] h-[480px] sm:h-[540px] rounded-[28px] overflow-hidden cursor-pointer transition-shadow duration-300 ${
          isHero ? 'shadow-2xl shadow-black/80 ring-1 ring-white/10' : 'hover:opacity-80'
        }`}
      >
        <ThemeScope theme={cardTheme} className="w-full h-full relative flex flex-col justify-between overflow-hidden bg-[var(--bg)] border border-[var(--border)]">
          {/* Dynamic Cursor Light (Hero only, but hook called unconditionally) */}
          {shouldShowLight && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-30 mix-blend-screen opacity-15"
              style={{ background: cursorLightBg }}
            />
          )}

          {/* Top Header: Massive Style Name + Tagline */}
          <div className="p-6 sm:p-8 z-20 space-y-1.5 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
                  {styleDef.category}
                </span>
                {styleDef.isCustom && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                    CUSTOM
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                {styleDef.isCustom && onDeleteCustom && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Delete custom design "${styleDef.name}"?`)) {
                        onDeleteCustom();
                      }
                    }}
                    className="p-1.5 rounded-full hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
                    title="Delete custom design"
                    aria-label="Delete custom design"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSaveToBucket();
                  }}
                  className="p-1.5 rounded-full hover:bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                  title="Save style to bucket"
                  aria-label="Save style to bucket"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopyPrompt();
                  }}
                  className="p-1.5 rounded-full hover:bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                  title="Copy AI prompt"
                  aria-label="Copy AI prompt"
                >
                  <Wand2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[var(--text)] tracking-[var(--tracking)] leading-none pt-1">
              {styleDef.name}
            </h2>

            <p className="text-xs sm:text-sm text-[var(--muted)] line-clamp-1 pt-1 font-medium">
              {styleDef.tagline}
            </p>
          </div>

          {/* Live Mini Preview */}
          <div className="flex-1 mx-6 sm:mx-8 mb-6 rounded-[var(--radius)] overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] relative z-10">
            {styleDef.category === 'Real-World Blueprints' ? (
              <BlueprintRenderer blueprintId={styleDef.id.replace('bp-', '')} compact={true} />
            ) : (
              <Specimen compact={true} />
            )}
          </div>

          {/* Hero Actions Bar */}
          {isHero && (
            <div className="p-4 sm:p-6 pt-0 z-20 flex items-center justify-between gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCommit();
                }}
                className="btn-primary flex-1 py-3 px-6 text-xs sm:text-sm font-bold tracking-wide shadow-lg"
              >
                <span>Use this style</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSaveToBucket();
                }}
                className="btn-secondary py-3 px-4 text-xs font-semibold"
                title="Add to saved bucket"
              >
                <Bookmark className="w-4 h-4 text-[var(--muted)]" />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          )}
        </ThemeScope>
      </motion.div>
    </motion.div>
  );
};
