import React, { useState } from 'react';
import { useStore } from '@/state/store';
import { ScoreBadge } from './ScoreBadge';
import { SliderCompare } from './SliderCompare';
import { ThemeScope } from '@/theme/ThemeScope';
import { BlueprintRenderer } from '@/components/blueprints/BlueprintRenderer';
import { ArrowLeft, SplitSquareVertical, Columns, Trash2, Plus } from 'lucide-react';

export const CompareStage: React.FC = () => {
  const {
    styles,
    blueprintId,
    compareList,
    bucket,
    theme,
    setStage,
    applyThemeDirectly,
    removeFromCompare,
    addToCompare,
  } = useStore();

  const [compareMode, setCompareMode] = useState<'side-by-side' | 'slider'>('side-by-side');

  // Ensure we have at least 2 themes to compare
  const altStyle = styles[1] || styles[0];
  const effectiveList = compareList.length >= 2 
    ? compareList 
    : compareList.length === 1 
      ? [compareList[0], { ...theme, styleId: altStyle.id, paletteId: altStyle.defaults.paletteId }] 
      : [theme, { ...theme, styleId: altStyle.id, paletteId: altStyle.defaults.paletteId }];

  const handleUseTheme = (selectedTheme: typeof theme) => {
    applyThemeDirectly(selectedTheme);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] py-6 px-4 sm:px-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStage('mix')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Mix</span>
          </button>
          <h2 className="text-xl font-bold text-white tracking-tight">Theme Comparison</h2>
        </div>

        {/* Mode Switcher: Side by side vs Slider */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center p-1 rounded-full bg-white/5 border border-white/10">
            <button
              onClick={() => setCompareMode('side-by-side')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                compareMode === 'side-by-side' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>
            <button
              onClick={() => setCompareMode('slider')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                compareMode === 'slider' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
              }`}
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
              <span>Split Slider</span>
            </button>
          </div>

          {/* Add current theme if not full */}
          {compareList.length < 3 && (
            <button
              onClick={() => addToCompare(theme)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Current</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Comparison Area */}
      {compareMode === 'slider' ? (
        <div className="space-y-4">
          <SliderCompare themeA={effectiveList[0]} themeB={effectiveList[1]} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScoreBadge theme={effectiveList[0]} onSelectTheme={() => handleUseTheme(effectiveList[0])} />
            <ScoreBadge theme={effectiveList[1]} onSelectTheme={() => handleUseTheme(effectiveList[1])} />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className={`grid grid-cols-1 ${effectiveList.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-6 items-start`}>
            {effectiveList.slice(0, 3).map((itemTheme, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-mono font-bold text-white/50">Combo 0{idx + 1}</span>
                  {compareList.length > 2 && (
                    <button
                      onClick={() => removeFromCompare(idx)}
                      className="p-1 text-white/40 hover:text-rose-400 transition-colors"
                      title="Remove combo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Living Preview in its own ThemeScope */}
                <div className="rounded-2xl overflow-hidden border border-white/15 bg-black/40 shadow-xl max-h-[580px] overflow-y-auto">
                  <ThemeScope theme={itemTheme} className="w-full">
                    <BlueprintRenderer blueprintId={blueprintId} />
                  </ThemeScope>
                </div>

                {/* Computed Contrast & Palette Score Badge */}
                <ScoreBadge theme={itemTheme} onSelectTheme={() => handleUseTheme(itemTheme)} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved Combos from Bucket */}
      {bucket.length > 0 && (
        <div className="pt-6 border-t border-white/10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-white/50">
            Saved Combos in Bucket ({bucket.length})
          </span>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {bucket.map((bTheme, bIdx) => (
              <button
                key={bIdx}
                onClick={() => handleUseTheme(bTheme)}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left shrink-0 transition-all space-y-1.5"
              >
                <div className="text-xs font-bold text-white">{bTheme.styleId}</div>
                <div className="text-[10px] text-white/50">{bTheme.paletteId} · {bTheme.geometry.radius}px</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

