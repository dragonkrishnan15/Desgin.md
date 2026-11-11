import React, { useState, useRef, useCallback } from 'react';
import { Theme } from '@/types';
import { ThemeScope } from '@/theme/ThemeScope';
import { BlueprintRenderer } from '@/components/blueprints/BlueprintRenderer';
import { useStore } from '@/state/store';
import { ChevronsLeftRight } from 'lucide-react';

interface SliderCompareProps {
  themeA: Theme;
  themeB: Theme;
}

export const SliderCompare: React.FC<SliderCompareProps> = ({ themeA, themeB }) => {
  const { blueprintId } = useStore();
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(0, Math.min(rect.width, x));
    const percent = (clamped / rect.width) * 100;
    setSliderPos(percent);
  }, []);

  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      updatePosition(e.clientX);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      className="relative w-full rounded-2xl overflow-hidden border border-white/15 select-none bg-black/40 shadow-2xl"
      style={{ height: '700px' }}
    >
      {/* Combo B (Background layer) */}
      <div className="absolute inset-0 overflow-y-auto">
        <ThemeScope theme={themeB} className="w-full min-h-full">
          <BlueprintRenderer blueprintId={blueprintId} />
        </ThemeScope>
      </div>

      {/* Combo A (Top layer with clip-path: inset(0 (100 - sliderPos)% 0 0)) */}
      <div
        className="absolute inset-0 overflow-y-auto pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      >
        <ThemeScope theme={themeA} className="w-full min-h-full pointer-events-auto">
          <BlueprintRenderer blueprintId={blueprintId} />
        </ThemeScope>
      </div>

      {/* Draggable Divider Handle */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        style={{ left: `${sliderPos}%` }}
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-[0_0_15px_rgba(0,0,0,0.8)] -translate-x-1/2 flex items-center justify-center"
      >
        <div className="w-8 h-8 rounded-full bg-white text-black shadow-lg flex items-center justify-center -translate-x-0.5">
          <ChevronsLeftRight className="w-4 h-4" />
        </div>
      </div>

      {/* Floating Mode Labels */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-white/90 border border-white/20">
        Left: Combo A
      </div>
      <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-white/90 border border-white/20">
        Right: Combo B
      </div>
    </div>
  );
};

