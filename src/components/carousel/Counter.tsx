import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CounterProps {
  current: number;
  total: number;
}

export const Counter: React.FC<CounterProps> = ({ current, total }) => {
  const currentFormatted = String(current + 1).padStart(2, '0');
  const totalFormatted = String(total).padStart(2, '0');

  return (
    <div 
      className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold tracking-wider text-white/60 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm select-none"
      aria-live="polite"
    >
      <div className="relative overflow-hidden h-5 w-6 flex justify-center items-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={currentFormatted}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="absolute font-bold text-indigo-400"
          >
            {currentFormatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="opacity-40">/</span>
      <span className="opacity-70">{totalFormatted}</span>
    </div>
  );
};
