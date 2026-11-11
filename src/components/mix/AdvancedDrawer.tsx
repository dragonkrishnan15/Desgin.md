import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sliders, Info } from 'lucide-react';
import { useStore } from '@/state/store';
import { getResolvedTheme } from '@/theme/applyTheme';
import { checkPaletteContrast } from '@/theme/contrast';

interface AdvancedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvancedDrawer: React.FC<AdvancedDrawerProps> = ({ isOpen, onClose }) => {
  const { theme, setGeometry, setMotion } = useStore();
  const { style, palette, font } = getResolvedTheme(theme);
  const contrastInfo = checkPaletteContrast(palette.bg, palette.text);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] bg-[#12141c] border-l border-white/10 p-6 z-50 overflow-y-auto space-y-6 text-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold">Theme Fine-Tuning</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Style Signature Rules */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white/60 uppercase tracking-wider">
                <Info className="w-3.5 h-3.5 text-indigo-400" />
                <span>Signature Style Rules</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                {style.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-white/80">
                    <span className="text-indigo-400 font-mono font-bold">{idx + 1}.</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Best For Tags */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
                Recommended Use Cases
              </span>
              <div className="flex flex-wrap gap-1.5">
                {style.bestFor.map((item, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full text-[11px] bg-white/5 border border-white/10 text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Typeface Specification */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
                Typeface Hierarchy
              </span>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60">Heading:</span>
                  <span className="font-mono text-white/90">{font.name} ({font.headingWeight})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Letter Spacing:</span>
                  <span className="font-mono text-white/90">{font.tracking}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Body Text:</span>
                  <span className="font-mono text-white/90">{font.name} ({font.bodyWeight})</span>
                </div>
              </div>
            </div>

            {/* Individual Token Overrides */}
            <div className="space-y-4 pt-2 border-t border-white/10">
              <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
                Token Overrides
              </span>

              {/* Corner Radius Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/80">Corner Radius</span>
                  <span className="font-mono text-indigo-400 font-bold">{theme.geometry.radius}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={40}
                  step={2}
                  value={theme.geometry.radius > 40 ? 40 : theme.geometry.radius}
                  onChange={e => setGeometry({ radius: parseInt(e.target.value, 10) })}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Gap Spacing Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/80">Layout Gap</span>
                  <span className="font-mono text-indigo-400 font-bold">{theme.geometry.gap}px</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={32}
                  step={4}
                  value={theme.geometry.gap}
                  onChange={e => setGeometry({ gap: parseInt(e.target.value, 10) })}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Border Width Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/80">Border Width</span>
                  <span className="font-mono text-indigo-400 font-bold">{theme.geometry.borderWidth}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={4}
                  step={1}
                  value={theme.geometry.borderWidth}
                  onChange={e => setGeometry({ borderWidth: parseInt(e.target.value, 10) })}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Motion Physics Mode */}
              <div className="space-y-2">
                <span className="text-xs text-white/80">Motion Experience</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['none', 'subtle', 'expressive'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setMotion(m)}
                      className={`py-1.5 text-xs font-semibold rounded-lg capitalize border transition-all ${
                        theme.motion === m
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* WCAG Contrast Health */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      contrastInfo.status === 'pass'
                        ? 'bg-emerald-400'
                        : contrastInfo.status === 'warn'
                        ? 'bg-amber-400'
                        : 'bg-rose-400'
                    }`}
                  />
                  <div>
                    <div className="text-xs font-bold">Contrast Ratio: {contrastInfo.ratio}:1</div>
                    <div className="text-[10px] text-white/50">WCAG 2.1 AA Compliance</div>
                  </div>
                </div>
                <span className={`text-[11px] font-bold uppercase ${contrastInfo.isAA ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {contrastInfo.isAA ? 'AA Pass' : 'Large Only'}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
