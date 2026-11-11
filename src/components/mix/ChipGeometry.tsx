import React from 'react';
import { GeometryPreset } from '@/data/geometry';

interface ChipGeometryProps {
  preset: GeometryPreset;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

export const ChipGeometry: React.FC<ChipGeometryProps> = ({
  preset,
  isActive,
  onHover,
  onLeave,
  onClick,
}) => {
  const displayRadius = preset.geometry.radius === 999 ? 999 : Math.min(18, preset.geometry.radius);

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
      title={preset.description}
    >
      <div className="w-14 h-9 rounded-md bg-white/5 border border-white/20 flex items-center justify-center p-1.5">
        <div
          className="w-7 h-7 border-2 border-indigo-400 bg-white/10 transition-transform group-hover:scale-110"
          style={{
            borderRadius: `${displayRadius}px`,
          }}
        />
      </div>

      <span className="text-[10px] font-semibold text-white/90 whitespace-nowrap max-w-[68px] truncate">
        {preset.name}
      </span>
    </button>
  );
};

