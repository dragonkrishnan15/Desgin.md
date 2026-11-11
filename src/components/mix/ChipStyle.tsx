import React from 'react';
import { StyleDef } from '@/types';

interface ChipStyleProps {
  styleDef: StyleDef;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

export const ChipStyle: React.FC<ChipStyleProps> = ({
  styleDef,
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
      title={styleDef.tagline}
    >
      {/* Miniature preview thumbnail box */}
      <div 
        className="w-14 h-9 rounded-md border border-white/20 flex flex-col justify-between p-1 overflow-hidden"
        style={{
          backgroundColor: styleDef.defaults.paletteId.includes('clean') || styleDef.defaults.paletteId.includes('paper') 
            ? '#fafafa' 
            : '#12141c',
          borderRadius: `${Math.min(8, styleDef.defaults.geometry.radius)}px`,
        }}
      >
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <div className="w-5 h-1 rounded-full bg-white/30" />
        </div>
        <div className="w-8 h-1 rounded-full bg-white/50" />
      </div>

      <span className="text-[10px] font-semibold text-white/90 whitespace-nowrap max-w-[68px] truncate">
        {styleDef.name}
      </span>
    </button>
  );
};

