import React from 'react';
import { FontPair } from '@/types';
import { loadFontPair } from '@/data/fonts';

interface ChipFontProps {
  fontPair: FontPair;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

export const ChipFont: React.FC<ChipFontProps> = ({
  fontPair,
  isActive,
  onHover,
  onLeave,
  onClick,
}) => {
  const handleMouseEnter = () => {
    loadFontPair(fontPair.id);
    onHover();
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 shrink-0 ${
        isActive
          ? 'bg-white/15 ring-2 ring-indigo-500 shadow-md'
          : 'bg-white/5 hover:bg-white/10 opacity-70 hover:opacity-100'
      }`}
    >
      <div 
        className="w-14 h-9 rounded-md bg-white/5 border border-white/20 flex items-center justify-center text-lg font-bold text-white transition-transform group-hover:scale-105"
        style={{ fontFamily: fontPair.heading }}
      >
        Aa
      </div>

      <span className="text-[10px] font-semibold text-white/90 whitespace-nowrap max-w-[68px] truncate">
        {fontPair.name}
      </span>
    </button>
  );
};

