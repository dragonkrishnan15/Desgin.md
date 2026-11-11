import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/state/store';
import { PALETTES } from '@/data/palettes';
import { FONT_PAIRS } from '@/data/fonts';
import { GEOMETRY_PRESETS } from '@/data/geometry';
import { ThemeScope } from '@/theme/ThemeScope';
import { BlueprintRenderer } from '@/components/blueprints/BlueprintRenderer';
import { BLUEPRINTS } from '@/data/blueprints';
import { SlotRail } from './SlotRail';
import { ChipStyle } from './ChipStyle';
import { ChipFont } from './ChipFont';
import { ChipPalette } from './ChipPalette';
import { ChipGeometry } from './ChipGeometry';
import { ViewportToggle } from './ViewportToggle';
import { AdvancedDrawer } from './AdvancedDrawer';
import { AddDesignModal } from '@/components/styles/AddDesignModal';
import { getResolvedTheme } from '@/theme/applyTheme';
import { 
  Dices, 
  Sliders, 
  ArrowRight, 
  Bookmark, 
  GitCompare, 
  ArrowLeft,
  Plus
} from 'lucide-react';

export const MixStage: React.FC = () => {
  const {
    styles,
    theme,
    blueprintId,
    setBlueprint,
    hoverPreviewTheme,
    setStyle,
    setPalette,
    setFont,
    setGeometry,
    toggleLock,
    shuffle,
    setHoverPreviewTheme,
    viewport,
    setStage,
    addToBucket,
    addToCompare,
  } = useStore();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Active theme (either hovered or committed)
  const activeTheme = hoverPreviewTheme || theme;
  const { style, palette, font } = getResolvedTheme(activeTheme);

  // Container width based on viewport toggle
  const viewportWidth = 
    viewport === 'mobile' 
      ? '375px' 
      : viewport === 'tablet' 
      ? '768px' 
      : '100%';

  const handleShuffle = () => {
    setIsShuffling(true);
    shuffle();
    setTimeout(() => setIsShuffling(false), 500);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-between py-4 px-3 sm:px-6 lg:px-8 space-y-6">
      {/* Top Mini Bar: Back to Carousel, Viewport Toggles, Shuffle, Actions */}
      <div className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStage('pick')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Pick Style</span>
          </button>

          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
            title="Randomize unlocked design tokens"
          >
            <Dices className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin' : ''}`} />
            <span>Shuffle</span>
          </button>
        </div>

        {/* Viewport Toggles */}
        <ViewportToggle />

        {/* Right Stage Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            title="Advanced Drawer (Rules, overrides, contrast)"
            aria-label="Open advanced drawer"
          >
            <Sliders className="w-4 h-4" />
          </button>

          <button
            onClick={() => addToBucket()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium transition-all"
            title="Save combo to bucket"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button
            onClick={() => {
              addToCompare(theme);
              setStage('compare');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium transition-all"
            title="Compare with other combos"
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compare</span>
          </button>

          <button
            onClick={() => setStage('prototype')}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black text-xs font-bold hover:bg-white/90 transition-all shadow-lg active:scale-95"
          >
            <span>Proceed</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Blueprint Selector Bar (Real-World Page Archetypes) */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-3 px-2 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none w-full">
          <span className="text-[10px] font-mono uppercase font-bold text-white/50 shrink-0 pr-1">
            Blueprint Page:
          </span>
          <button
            onClick={() => setBlueprint(null)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              blueprintId === null
                ? 'bg-white text-black shadow-md'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            Generic Specimen
          </button>
          {BLUEPRINTS.map(bp => (
            <button
              key={bp.id}
              onClick={() => setBlueprint(bp.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                blueprintId === bp.id
                  ? 'bg-indigo-600 text-white shadow-md font-bold'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
              title={bp.tagline}
            >
              <span>{bp.name}</span>
              <span className="text-[9px] font-mono opacity-60">({bp.group})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Center Live Specimen / Blueprint Preview (Shared-element layoutId="preview") */}
      <div className="w-full flex-1 flex justify-center items-center py-2 overflow-x-hidden">
        <motion.div
          layoutId="preview"
          animate={{ width: viewportWidth }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="mx-auto rounded-[24px] overflow-hidden border border-white/15 shadow-2xl bg-black/40 backdrop-blur-xl"
        >
          <ThemeScope theme={activeTheme} className="w-full">
            <BlueprintRenderer blueprintId={blueprintId} />
          </ThemeScope>
        </motion.div>
      </div>

      {/* Bottom 4 Slot Rails Container */}
      <div className="w-full max-w-6xl mx-auto p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-4">
        {/* Slot 1: Design Style */}
        <SlotRail
          title="Style"
          activeLabel={style.name}
          isLocked={theme.locks.style}
          onToggleLock={() => toggleLock('style')}
        >
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/30 text-indigo-200 text-xs font-bold transition-all shrink-0"
            title="Create or import new design"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Design</span>
          </button>
          {styles.map(s => (
            <ChipStyle
              key={s.id}
              styleDef={s}
              isActive={theme.styleId === s.id}
              onHover={() => setHoverPreviewTheme({ ...theme, styleId: s.id })}
              onLeave={() => setHoverPreviewTheme(null)}
              onClick={() => setStyle(s.id)}
            />
          ))}
        </SlotRail>

        {/* Slot 2: Typography */}
        <SlotRail
          title="Typography"
          activeLabel={font.name}
          isLocked={theme.locks.font}
          onToggleLock={() => toggleLock('font')}
        >
          {FONT_PAIRS.map(f => (
            <ChipFont
              key={f.id}
              fontPair={f}
              isActive={theme.fontId === f.id}
              onHover={() => setHoverPreviewTheme({ ...theme, fontId: f.id })}
              onLeave={() => setHoverPreviewTheme(null)}
              onClick={() => setFont(f.id)}
            />
          ))}
        </SlotRail>

        {/* Slot 3: Color Palette */}
        <SlotRail
          title="Color Palette"
          activeLabel={palette.name}
          isLocked={theme.locks.palette}
          onToggleLock={() => toggleLock('palette')}
        >
          {PALETTES.map(p => (
            <ChipPalette
              key={p.id}
              palette={p}
              isActive={theme.paletteId === p.id}
              onHover={() => setHoverPreviewTheme({ ...theme, paletteId: p.id })}
              onLeave={() => setHoverPreviewTheme(null)}
              onClick={() => setPalette(p.id)}
            />
          ))}
        </SlotRail>

        {/* Slot 4: Shape & Effects */}
        <SlotRail
          title="Shape &amp; Radius"
          activeLabel={`${theme.geometry.radius}px (${theme.geometry.shadow} shadow)`}
          isLocked={theme.locks.geometry}
          onToggleLock={() => toggleLock('geometry')}
        >
          {GEOMETRY_PRESETS.map(preset => (
            <ChipGeometry
              key={preset.id}
              preset={preset}
              isActive={theme.geometry.radius === preset.geometry.radius && theme.geometry.shadow === preset.geometry.shadow}
              onHover={() => setHoverPreviewTheme({ ...theme, geometry: preset.geometry })}
              onLeave={() => setHoverPreviewTheme(null)}
              onClick={() => setGeometry(preset.geometry)}
            />
          ))}
        </SlotRail>
      </div>

      {/* Advanced Drawer */}
      <AdvancedDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Add Design Modal */}
      <AddDesignModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
