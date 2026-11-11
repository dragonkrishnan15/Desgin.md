import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { getCategoriesFromStyles } from '@/data/styleRegistry';
import { StyleCard } from './StyleCard';
import { Counter } from './Counter';
import { useStore } from '@/state/store';
import { generateAiPrompt } from '@/theme/promptGen';
import { AddDesignModal } from '@/components/styles/AddDesignModal';
import { Search, ChevronLeft, ChevronRight, Sliders, Check, Plus } from 'lucide-react';

// Card width constants (matching StyleCard responsive sizes)
const CARD_GAP = 40; // px gap between cards

export const HeroCarousel: React.FC = () => {
  const { 
    styles,
    activeIndex, 
    setActiveIndex, 
    setStyle, 
    setStage, 
    addToBucket, 
    deleteCustomStyle,
    setBlueprint,
    theme 
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showKeyHint, setShowKeyHint] = useState(true);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic Categories derived from all current styles (built-in + custom)
  const categories = useMemo(() => getCategoriesFromStyles(styles), [styles]);

  // Trigger entrance animation after mount
  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Filtered styles
  const filteredStyles = useMemo(() => {
    return styles.filter(s => {
      const matchCat = selectedCategory === 'All' || s.category === selectedCategory;
      const matchQuery = !searchQuery.trim() || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [styles, searchQuery, selectedCategory]);

  const total = filteredStyles.length;
  const safeActiveIndex = Math.min(Math.max(0, activeIndex), Math.max(0, total - 1));

  // Current active style
  const currentStyle = filteredStyles[safeActiveIndex] || filteredStyles[0] || styles[0];

  // Navigate next/prev
  const goToNext = useCallback(() => {
    setShowKeyHint(false);
    if (safeActiveIndex < total - 1) {
      const nextIdx = safeActiveIndex + 1;
      setActiveIndex(nextIdx);
      setStyle(filteredStyles[nextIdx].id);
    }
  }, [safeActiveIndex, total, filteredStyles, setActiveIndex, setStyle]);

  const goToPrev = useCallback(() => {
    setShowKeyHint(false);
    if (safeActiveIndex > 0) {
      const prevIdx = safeActiveIndex - 1;
      setActiveIndex(prevIdx);
      setStyle(filteredStyles[prevIdx].id);
    }
  }, [safeActiveIndex, filteredStyles, setActiveIndex, setStyle]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'Enter') {
        setStage('mix');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, setStage]);

  // Mouse wheel navigation (debounced)
  const wheelLockRef = useRef(false);
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelLockRef.current) return;
    if (Math.abs(e.deltaX) > 30 || Math.abs(e.deltaY) > 30) {
      wheelLockRef.current = true;
      if (e.deltaX > 0 || e.deltaY > 0) {
        goToNext();
      } else {
        goToPrev();
      }
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 350);
    }
  };

  // Handle Drag end with velocity
  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setShowKeyHint(false);
    const threshold = 50;
    const velocity = info.velocity.x;
    if (info.offset.x < -threshold || velocity < -300) {
      goToNext();
    } else if (info.offset.x > threshold || velocity > 300) {
      goToPrev();
    }
  };

  const handleCopyPrompt = () => {
    const promptText = generateAiPrompt({
      ...theme,
      styleId: currentStyle.id,
      paletteId: currentStyle.defaults.paletteId,
      fontId: currentStyle.defaults.fontId,
      geometry: currentStyle.defaults.geometry,
    });
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Compute the pixel offset for each card so the hero is always centered.
  // Card width varies by breakpoint but we use the md width as reference (540px).
  // The actual card sets its own width via classes; we just position using offsets.
  const getCardOffset = (idx: number): number => {
    const diff = idx - safeActiveIndex;
    // Space between card centers
    const cardWidth = 540;
    const spacing = cardWidth + CARD_GAP;
    return diff * spacing;
  };

  return (
    <motion.div 
      className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-between py-6 px-4 sm:px-8 relative overflow-hidden"
      onWheel={handleWheel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Filter and Search Bar */}
      <motion.div 
        className="w-full max-w-5xl mx-auto space-y-4 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.1 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1 scrollbar-none">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveIndex(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-white text-black shadow-md'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input & Add Design Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder={`Search ${styles.length} styles...`}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs whitespace-nowrap transition-all shadow-md shadow-indigo-600/30"
              title="Add or import a custom design"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Design</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main 3D Carousel Stage */}
      <div 
        ref={containerRef}
        className="relative w-full my-auto flex items-center justify-center py-6 sm:py-10 select-none"
        style={{ minHeight: '560px' }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          className="relative w-full h-[480px] sm:h-[540px] cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pan-y' }}
        >
          {/* Cards are absolutely positioned from center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {filteredStyles.map((styleDef, idx) => {
                const distance = Math.abs(idx - safeActiveIndex);
                // 60fps rule: render only 5 nearest cards
                if (distance > 2) return null;

                const offsetX = getCardOffset(idx);

                return (
                  <StyleCard
                    key={styleDef.id}
                    styleDef={styleDef}
                    isHero={idx === safeActiveIndex}
                    distance={distance}
                    offsetX={offsetX}
                    onSelect={() => {
                      setShowKeyHint(false);
                      setActiveIndex(idx);
                      if (styleDef.id.startsWith('bp-')) {
                        setBlueprint(styleDef.id.replace('bp-', ''));
                      }
                      setStyle(styleDef.id);
                    }}
                    onCommit={() => {
                      if (styleDef.id.startsWith('bp-')) {
                        setBlueprint(styleDef.id.replace('bp-', ''));
                      }
                      setStyle(styleDef.id);
                      setStage('mix');
                    }}
                    onSaveToBucket={() => addToBucket()}
                    onCopyPrompt={handleCopyPrompt}
                    onDeleteCustom={() => deleteCustomStyle(styleDef.id)}
                    motionSetting={theme.motion}
                    entranceDelay={hasEntered ? 0 : distance * 0.08}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Carousel Arrow Controls */}
        <motion.button
          onClick={goToPrev}
          disabled={safeActiveIndex === 0}
          className="absolute left-2 sm:left-6 z-30 p-3 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white disabled:opacity-20 disabled:pointer-events-none backdrop-blur-md transition-all shadow-xl"
          aria-label="Previous style"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <motion.button
          onClick={goToNext}
          disabled={safeActiveIndex >= total - 1}
          className="absolute right-2 sm:right-6 z-30 p-3 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white disabled:opacity-20 disabled:pointer-events-none backdrop-blur-md transition-all shadow-xl"
          aria-label="Next style"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Bottom Controls: Counter, Slider, Key Hint */}
      <motion.div 
        className="w-full max-w-2xl mx-auto flex flex-col items-center gap-3 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.25 }}
      >
        <div className="flex items-center gap-4 w-full">
          <Counter current={safeActiveIndex} total={total} />

          {/* Slider synced with activeIndex */}
          <input
            type="range"
            min={0}
            max={Math.max(0, total - 1)}
            value={safeActiveIndex}
            onChange={e => {
              setShowKeyHint(false);
              const idx = parseInt(e.target.value, 10);
              setActiveIndex(idx);
              if (filteredStyles[idx]) {
                setStyle(filteredStyles[idx].id);
              }
            }}
            className="flex-1 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <button
            onClick={() => {
              setStyle(currentStyle.id);
              setStage('mix');
            }}
            className="px-4 py-1.5 rounded-full bg-white text-black font-bold text-xs hover:bg-white/90 transition-all flex items-center gap-1.5 shadow-md"
          >
            <span>Mix</span>
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Keyboard hint that fades out */}
        <AnimatePresence>
          {showKeyHint && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-[11px] font-mono text-white/40 flex items-center gap-2"
            >
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white/70">←</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white/70">→</kbd>
              <span>to navigate · drag or scroll to browse</span>
            </motion.div>
          )}
        </AnimatePresence>

        {copiedPrompt && (
          <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            <span>AI prompt copied to clipboard!</span>
          </div>
        )}
      </motion.div>

      {/* Add Design Modal */}
      <AddDesignModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </motion.div>
  );
};
