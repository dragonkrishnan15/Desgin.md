import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/state/store';
import { getResolvedTheme } from '@/theme/applyTheme';
import { HeroCarousel } from '@/components/carousel/HeroCarousel';
import { MixStage } from '@/components/mix/MixStage';
import { CompareStage } from '@/components/compare/CompareStage';
import { PrototypeStage } from '@/components/prototype/PrototypeStage';
import { EmblemLoader } from '@/components/intro/EmblemLoader';
import { useIntroSeen } from '@/components/intro/useIntroSeen';
import {
  Sparkles,
  Layers,
  Sliders,
  GitCompare,
  Eye,
  Bookmark,
  Share2,
  Check,
  RotateCcw
} from 'lucide-react';

export const App: React.FC = () => {
  const { stage, setStage, theme, bucket, applyThemeDirectly } = useStore();
  const { palette } = getResolvedTheme(theme);
  const [copiedShare, setCopiedShare] = useState(false);
  const [showBucketMenu, setShowBucketMenu] = useState(false);
  const [introSeen, markIntroSeen] = useIntroSeen();
  const [replayIntro, setReplayIntro] = useState(false);

  const showLoader = !introSeen || replayIntro;

  // Background Morph over 600ms (Section 8)
  useEffect(() => {
    document.documentElement.style.setProperty('--active-accent', palette.accent);
  }, [palette.accent]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <>
      {/* Chrome Emblem Loader with Natural Wing-Flap Animation */}
      {showLoader && (
        <EmblemLoader
          onDone={() => {
            markIntroSeen();
            setReplayIntro(false);
          }}
        />
      )}

      <motion.div
        className="relative min-h-screen bg-[#0b0c10] text-white overflow-x-hidden flex flex-col justify-between selection:bg-indigo-500/30 selection:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
      {/* Ambient Grain Overlay */}
      <div className="bg-grain" aria-hidden="true" />

      {/* Dynamic Background Morph Glow (Section 8: 600ms crossfade) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-20 transition-colors duration-[600ms] ease-out"
        style={{
          background: `radial-gradient(circle at 50% 20%, var(--active-accent, #6366f1) 0%, transparent 65%)`,
        }}
        aria-hidden="true"
      />

      {/* Faint Stage Grid */}
      <div className="fixed inset-0 stage-grid pointer-events-none z-0" aria-hidden="true" />

      {/* Top Application Header (Hidden in full-screen Prototype mode for immersion) */}
      {stage !== 'prototype' && (
        <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3 bg-[#0b0c10]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setStage('pick')}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                StyleLab
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                Studio
              </span>
            </div>
          </div>

          {/* Center Stage Navigation Tabs */}
          <nav className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 text-xs">
            {[
              { id: 'pick', label: '1. Pick', icon: Layers },
              { id: 'mix', label: '2. Mix', icon: Sliders },
              { id: 'compare', label: '3. Compare', icon: GitCompare },
              { id: 'prototype', label: '4. Prototype', icon: Eye },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setStage(id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-medium transition-all ${stage === id
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </nav>

          {/* Right Header Actions: Saved Bucket & Share */}
          <div className="flex items-center gap-2 relative">
            {/* Saved Bucket Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowBucketMenu(!showBucketMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold transition-all border border-white/10"
                title="Saved combo bucket"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Saved</span>
                {bucket.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {bucket.length}
                  </span>
                )}
              </button>

              {showBucketMenu && (
                <div className="absolute right-0 mt-2 w-64 p-3 rounded-2xl bg-[#151724] border border-white/15 shadow-2xl z-50 space-y-2">
                  <div className="text-xs font-bold text-white/70 uppercase tracking-wider pb-1 border-b border-white/10">
                    Saved Combos ({bucket.length})
                  </div>
                  {bucket.length === 0 ? (
                    <div className="text-xs text-white/40 py-2 text-center">No saved combos yet</div>
                  ) : (
                    <div className="max-h-60 overflow-y-auto space-y-1.5">
                      {bucket.map((bTheme, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            applyThemeDirectly(bTheme);
                            setShowBucketMenu(false);
                          }}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer text-xs flex justify-between items-center transition-colors"
                        >
                          <div>
                            <div className="font-bold">{bTheme.styleId}</div>
                            <div className="text-[10px] text-white/50">{bTheme.paletteId}</div>
                          </div>
                          <span className="text-[10px] text-indigo-400 font-mono">Load</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Share Link Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold transition-all border border-white/10"
              title="Copy shareable link"
            >
              {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedShare ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </header>
      )}

      {/* Main Content Body */}
      <main className="flex-1 relative z-10 flex flex-col">
        <AnimatePresence mode="wait">
          {stage === 'pick' && <motion.div key="pick" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}><HeroCarousel /></motion.div>}
          {stage === 'mix' && <motion.div key="mix" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}><MixStage /></motion.div>}
          {stage === 'compare' && <motion.div key="compare" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}><CompareStage /></motion.div>}
          {stage === 'prototype' && <motion.div key="prototype" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}><PrototypeStage /></motion.div>}
        </AnimatePresence>
      </main>

      {/* Minimal Footer */}
      {stage !== 'prototype' && (
        <footer className="w-full py-4 px-6 text-center text-xs text-white/40 z-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
          <div>
            <span>StyleLab · Dynamic Living Theme Engine · Deployable to Cloudflare Pages</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>28 Styles</span>
            <span>24 Palettes</span>
            <span>8 Blueprints</span>
            <button
              onClick={() => setReplayIntro(true)}
              className="flex items-center gap-1 text-white/50 hover:text-indigo-300 transition-colors cursor-pointer"
              title="Replay intro animation"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Replay Intro</span>
            </button>
          </div>
        </footer>
      )}
    </motion.div>
    </>
  );
};

export default App;

