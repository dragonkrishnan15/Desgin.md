import React from 'react';
import { Theme } from '@/types';
import { getResolvedTheme } from '@/theme/applyTheme';
import { checkPaletteContrast, contrast } from '@/theme/contrast';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface ScoreBadgeProps {
  theme: Theme;
  onSelectTheme: () => void;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ theme, onSelectTheme }) => {
  const { palette, font, style } = getResolvedTheme(theme);
  const bodyContrast = checkPaletteContrast(palette.bg, palette.text);
  const accentContrast = contrast(palette.bg, palette.accent);

  return (
    <div className="card p-4 space-y-3 bg-[#151724]/90 border border-white/10 text-white backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold">{style.name}</h4>
          <p className="text-[11px] text-white/50">{font.name} · {theme.geometry.radius}px</p>
        </div>
        <button
          onClick={onSelectTheme}
          className="btn-primary py-1.5 px-3 text-xs font-semibold"
        >
          Use this one
        </button>
      </div>

      {/* 5-stop color strip */}
      <div className="h-4 rounded-md overflow-hidden flex border border-white/20">
        <div className="flex-1 h-full" style={{ backgroundColor: palette.bg }} />
        <div className="flex-1 h-full" style={{ backgroundColor: palette.surface }} />
        <div className="flex-1 h-full" style={{ backgroundColor: palette.text }} />
        <div className="flex-1 h-full" style={{ backgroundColor: palette.accent }} />
        <div className="flex-1 h-full" style={{ backgroundColor: palette.accent2 }} />
      </div>

      {/* Computed Metrics */}
      <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
        {/* Body Text Contrast */}
        <div className="p-2 rounded bg-white/5 border border-white/10 flex items-center justify-between">
          <span className="text-white/60">Body text:</span>
          <div className="flex items-center gap-1 font-mono font-bold">
            {bodyContrast.isAA ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span className={bodyContrast.isAA ? 'text-emerald-400' : 'text-amber-400'}>
              {bodyContrast.ratio}:1
            </span>
          </div>
        </div>

        {/* Accent on BG */}
        <div className="p-2 rounded bg-white/5 border border-white/10 flex items-center justify-between">
          <span className="text-white/60">Accent UI:</span>
          <span className="font-mono font-bold text-white/90">
            {accentContrast}:1
          </span>
        </div>
      </div>

      <div className="text-[10px] text-white/40 font-mono">
        Font size base: 16px · Headings: clamp(24px, 4vw, 48px)
      </div>
    </div>
  );
};
