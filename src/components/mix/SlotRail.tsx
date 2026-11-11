import React from 'react';
import { Lock, Unlock } from 'lucide-react';
import { motion } from 'framer-motion';

interface SlotRailProps {
  title: string;
  activeLabel: string;
  isLocked: boolean;
  onToggleLock: () => void;
  children: React.ReactNode;
}

export const SlotRail: React.FC<SlotRailProps> = ({
  title,
  activeLabel,
  isLocked,
  onToggleLock,
  children,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">
            {title}
          </span>
          <span className="text-xs font-semibold text-white/90">
            {activeLabel}
          </span>
        </div>

        <button
          onClick={onToggleLock}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono transition-all ${
            isLocked
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'text-white/40 hover:text-white/80 hover:bg-white/5'
          }`}
          title={isLocked ? 'Slot is locked (shuffle preserves it)' : 'Slot is unlocked (shuffle changes it)'}
          aria-label={`Toggle lock for ${title}`}
        >
          {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
          <span>{isLocked ? 'Locked' : 'Unlocked'}</span>
        </button>
      </div>

      {/* Horizontal Rail of Visual Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
        {children}
      </div>
    </motion.div>
  );
};

