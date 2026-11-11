import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmokeShader } from './SmokeShader';
import { Emblem, EmblemRefs } from './Emblem';
import { DissolveCanvas } from './DissolveCanvas';
import { useFlapEngine, IntroPhase } from './useFlapEngine';
import { FLAP } from './FLAP';
import { useIntroSeen } from './useIntroSeen';
import { useAppReady } from './useAppReady';

// Section 5: Expose BURST_MODE constant with default "dissolve"
export const BURST_MODE: 'dissolve' | 'rays' = 'dissolve';
export { FLAP };

interface EmblemLoaderProps {
  onDone?: () => void;
  burstMode?: 'dissolve' | 'rays';
}

export const EmblemLoader: React.FC<EmblemLoaderProps> = ({
  onDone,
  burstMode = BURST_MODE,
}) => {
  const [, markIntroSeen] = useIntroSeen();
  const isAppReady = useAppReady(4000, 8000); // 4.0s min, 8.0s max

  const [phase, setPhase] = useState<IntroPhase>('smoke');
  const [materializeProgress, setMaterializeProgress] = useState(0);
  const [smokeStopped, setSmokeStopped] = useState(false);
  const [smokeAlpha, setSmokeAlpha] = useState(1.0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const config = FLAP;
  const [wipePercent, setWipePercent] = useState(-15);
  const [showRays, setShowRays] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);

  const stageContainerRef = useRef<HTMLDivElement>(null);

  const emblemRefs: EmblemRefs = {
    rootRef: useRef<SVGSVGElement>(null),
    emblemGroupRef: useRef<SVGGElement>(null),
    shadowRef: useRef<SVGEllipseElement>(null),
    wingLRef: useRef<SVGGElement>(null),
    wingRRef: useRef<SVGGElement>(null),
    forewingLRef: useRef<SVGGElement>(null),
    forewingRRef: useRef<SVGGElement>(null),
    feathersLRef: useRef<(SVGGElement | null)[]>([]),
    feathersRRef: useRef<(SVGGElement | null)[]>([]),
    shieldLRef: useRef<SVGGElement>(null),
    shieldRRef: useRef<SVGGElement>(null),
    glintsLRef: useRef<(SVGGElement | null)[]>([]),
    glintsRRef: useRef<(SVGGElement | null)[]>([]),
    bodyRef: useRef<SVGGElement>(null),
    crestRef: useRef<SVGGElement>(null),
    crestOuterRef: useRef<SVGGElement>(null),
    tailRef: useRef<SVGGElement>(null),
    gradWingLRef: useRef<SVGLinearGradientElement>(null),
    gradWingRRef: useRef<SVGLinearGradientElement>(null),
    wordmarkRef: useRef<SVGTextElement>(null),
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.setAttribute('aria-busy', 'true');
    }

    return () => {
      document.body.style.overflow = '';
      if (rootEl) {
        rootEl.removeAttribute('aria-busy');
        rootEl.removeAttribute('inert');
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase]);

  // Section 7 Timeline Driver: 0.0s to 2.4s (Smoke In -> Bottom-Up Materialize -> Unfurl)
  useEffect(() => {
    if (prefersReducedMotion || isSkipping) return;

    let startTime = performance.now();
    let frameId: number;

    const timeline = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      if (elapsed < 1.0) {
        // 0.0 - 1.0s: Smoke In (Ribbons in from edges)
        if (phase !== 'smoke') setPhase('smoke');
      } else if (elapsed < 2.4) {
        // 1.0 - 2.4s: Condense + Chrome Materialize (bottom-up upward traveling mask)
        if (phase !== 'materialize') setPhase('materialize');
        const p = (elapsed - 1.0) / 1.4;
        setMaterializeProgress(p);
      } else {
        // 2.4s: Condensation complete, start Unfurl
        setMaterializeProgress(1.0);
        setSmokeAlpha(0.2);
        setSmokeStopped(true);
        if (phase === 'materialize' || phase === 'smoke') {
          setPhase('unfurl');
        }
      }

      if (elapsed < 2.6) {
        frameId = requestAnimationFrame(timeline);
      }
    };

    frameId = requestAnimationFrame(timeline);
    return () => cancelAnimationFrame(frameId);
  }, [prefersReducedMotion, isSkipping]);

  // Handle phase changes triggered by physics engine
  const handlePhaseChange = (nextPhase: IntroPhase) => {
    if (isSkipping) return;
    setPhase(nextPhase);

    if (nextPhase === 'flap3') {
      setShowWordmark(true);
    }

    if (nextPhase === 'burst') {
      executeBurstAndReveal();
    }
  };

  const executeBurstAndReveal = () => {
    if (burstMode === 'dissolve') {
      // Mode A: Dissolve silver dust + Chrome Sheen Wipe
      // 1. SVG fades to 0 over 0.35s
      if (emblemRefs.emblemGroupRef.current) {
        emblemRefs.emblemGroupRef.current.style.transition = 'opacity 0.35s ease-out';
        emblemRefs.emblemGroupRef.current.style.opacity = '0';
      }

      // 2. Sheen Wipe across screen (-15% to 115% over 0.8s)
      const wipeStart = performance.now();
      const wipeDuration = 800;

      const animateWipe = (now: number) => {
        const wipeP = Math.min((now - wipeStart) / wipeDuration, 1.0);
        // Cubic bezier (.76, 0, .24, 1)
        const t = wipeP;
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const currentWipe = -15 + ease * 130;
        setWipePercent(currentWipe);

        if (wipeP < 1.0) {
          requestAnimationFrame(animateWipe);
        } else {
          setPhase('reveal');
          setTimeout(() => {
            finishIntro();
          }, 600);
        }
      };

      requestAnimationFrame(animateWipe);
    } else {
      // Mode B: Rays burst (Tasteful silver-white, ice-blue, soft violet)
      setShowRays(true);
      setTimeout(() => {
        setPhase('reveal');
        setTimeout(() => {
          finishIntro();
        }, 550);
      }, 900);
    }
  };

  useFlapEngine(emblemRefs, {
    phase,
    materializeProgress,
    isReady: isAppReady,
    reducedMotion: prefersReducedMotion,
    stageContainerRef,
    onPhaseChange: handlePhaseChange,
    config,
  });

  const finishIntro = () => {
    markIntroSeen();
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.removeAttribute('inert');
      rootEl.removeAttribute('aria-busy');
    }
    onDone?.();
  };

  const handleSkip = () => {
    if (isSkipping) return;
    setIsSkipping(true);
    setSmokeStopped(true);
    executeBurstAndReveal();
  };

  // Reduced motion alternative
  if (prefersReducedMotion) {
    return (
      <motion.div
        role="status"
        aria-live="polite"
        className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          onAnimationComplete={() => {
            setTimeout(() => {
              finishIntro();
            }, 800);
          }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-400 to-white flex items-center justify-center shadow-xl border border-slate-300">
            <span className="text-3xl font-black text-slate-900 tracking-wider">S</span>
          </div>
          <p className="text-slate-600 font-medium tracking-wide">Loading StyleLab...</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9999] overflow-hidden select-none pointer-events-auto"
    >
      {/* Skip Button (44px touch target, accessible, responsive positioning) */}
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10002] px-3.5 sm:px-4 py-2 sm:py-2.5 min-h-[44px] min-w-[44px] rounded-full bg-slate-900/60 hover:bg-slate-900/80 text-white/90 hover:text-white backdrop-blur-md border border-white/20 text-xs font-medium tracking-wide transition-all shadow-lg active:scale-95 flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        aria-label="Skip intro animation"
      >
        <span>Skip intro</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white/20 rounded font-mono text-white/80">
          Esc
        </kbd>
      </button>

      {/* Mode A: Chrome Sheen Wipe Mask Container */}
      <div
        className="relative w-full h-full bg-white flex flex-col items-center justify-center overflow-hidden"
        style={
          burstMode === 'dissolve' && wipePercent > -15
            ? {
                WebkitMaskImage: `linear-gradient(105deg, transparent ${wipePercent}%, #000 ${wipePercent + 6}%)`,
                maskImage: `linear-gradient(105deg, transparent ${wipePercent}%, #000 ${wipePercent + 6}%)`,
              }
            : undefined
        }
      >
        {/* Photographic Light Vignette on White Canvas */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,1) 0%, rgba(248,250,252,0.9) 60%, rgba(226,232,240,0.5) 100%)',
          }}
        />

        {/* 3.5% Static Film Grain Overlay (Section 6.5) */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Parallax Layer 1: Slower Back Smoke WebGL Shader */}
        <SmokeShader
          condense={materializeProgress}
          alpha={smokeAlpha}
          layer="back"
          stopped={smokeStopped}
        />

        {/* Stage Container: Receives Camera Push-in and Hero Close-up (Section 6.1 & 6.2) */}
        <div
          ref={stageContainerRef}
          className="relative z-10 w-full max-w-[920px] px-6 flex items-center justify-center will-change-transform transition-[transform-origin] duration-500 ease-out"
        >
          <Emblem
            refs={emblemRefs}
            materializeProgress={materializeProgress}
            showWordmark={showWordmark}
          />
        </div>

        {/* Parallax Layer 2: Thin Foreground Wisp WebGL Shader */}
        <SmokeShader
          condense={materializeProgress}
          alpha={smokeAlpha * 0.65}
          layer="front"
          stopped={smokeStopped}
        />

        {/* Mode A: Silver Dust Dissolve Particles (Section 5.2) */}
        <DissolveCanvas active={phase === 'burst' && burstMode === 'dissolve'} />

        {/* Mode A: Diagonal Chrome Sheen Band (Section 5.3) */}
        {burstMode === 'dissolve' && wipePercent > -15 && wipePercent < 115 && (
          <div
            className="absolute inset-0 z-40 pointer-events-none"
            style={{
              left: `${wipePercent}%`,
              width: '120px',
              transform: 'skewX(-15deg) translateX(-50%)',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 35%, #BFE3FF 50%, rgba(255,255,255,0.85) 65%, transparent 100%)',
              boxShadow: '0 0 40px rgba(191, 227, 255, 0.6)',
            }}
          />
        )}

        {/* Mode B: Storyboard B Conic Ray Burst (Monochrome + Ice Blue + Soft Violet) */}
        <AnimatePresence>
          {showRays && burstMode === 'rays' && (
            <motion.div
              className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: [0, 0.95, 0], rotate: 20 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              style={{
                background: `repeating-conic-gradient(
                  from 0deg at 50% 50%,
                  #ffffff 0deg 8deg,
                  #BFE3FF 8deg 16deg,
                  rgba(155, 140, 255, 0.6) 16deg 24deg,
                  #ffffff 24deg 32deg
                )`,
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 0% 15%, transparent 85%)',
                maskImage: 'radial-gradient(circle at 50% 50%, #000 0% 15%, transparent 85%)',
                mixBlendMode: 'screen',
              }}
            >
              {/* Soft center white flash halo */}
              <motion.div
                className="w-96 h-96 rounded-full bg-white"
                initial={{ scale: 0.2, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimal monochrome status line */}
        <div className="absolute bottom-10 z-10 text-center pointer-events-none">
          <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-slate-400/80">
            {phase === 'smoke' || phase === 'materialize'
              ? 'Materializing...'
              : phase === 'unfurl'
              ? 'Awakening...'
              : phase === 'flap1' || phase === 'flap2' || phase === 'flap3'
              ? 'Synthesizing...'
              : phase === 'charge'
              ? 'Resonating...'
              : ''}
          </p>
        </div>
      </div>
    </div>
  );
};
