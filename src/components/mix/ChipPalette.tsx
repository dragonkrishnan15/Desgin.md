import React from 'react';
import { Palette } from '@/types';

interface ChipPaletteProps {
  palette: Palette;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

export const ChipPalette: React.FC<ChipPaletteProps> = ({
  palette,
  isActive,
  onHover,
  onLeave,
  onClick,
}) => {
  return (
    <button
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 shrink-0 ${
        isActive
          ? 'bg-white/15 ring-2 ring-indigo-500 shadow-md'
          : 'bg-white/5 hover:bg-white/10 opacity-70 hover:opacity-100'
      }`}
    >
      {/* 5-stop color strip */}
      <div className="w-14 h-9 rounded-md overflow-hidden flex border border-white/20 group-hover:scale-110 transition-transform duration-200 shadow-sm">
        <div className="flex-1 h-full" style={{ backgroundColor: palette.bg }} />
        <div className="flex-1 h-full" style={{ backgroundColor: palette.surface }} />
        <div className="flex-1 h-full" style={{ backgroundColor: palette.text }} />
        <div className="flex-1 h-full" style={{ backgroundColor: palette.accent }} />
        <div className="flex-1 h-full" style={{ backgroundColor: palette.accent2 }} />
      </div>

      <span className="text-[10px] font-semibold text-white/90 whitespace-nowrap max-w-[68px] truncate">
        {palette.name}
      </span>
    </button>
  );
};

