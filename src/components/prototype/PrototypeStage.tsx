import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/state/store';
import { ThemeScope } from '@/theme/ThemeScope';
import { LandingTemplate } from './templates/LandingTemplate';
import { BlueprintRenderer } from '@/components/blueprints/BlueprintRenderer';
import { BLUEPRINTS } from '@/data/blueprints';
import { ExportPanel } from './ExportPanel';
import { ViewportToggle } from '../mix/ViewportToggle';
import { ArrowLeft, Download } from 'lucide-react';

export const PrototypeStage: React.FC = () => {
  const { theme, setStage, viewport, blueprintId, setBlueprint } = useStore();
  const [isExportOpen, setIsExportOpen] = useState(false);

  const viewportWidth = 
    viewport === 'mobile' 
      ? '385px' 
      : viewport === 'tablet' 
      ? '780px' 
      : '100%';

  const currentBlueprint = BLUEPRINTS.find(b => b.id === blueprintId);

  return (
    <div className="w-full min-h-screen bg-[#07080c] relative flex flex-col justify-between overflow-x-hidden">
      {/* Floating Mini-Toolbar at Top */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3 bg-black/80 backdrop-blur-xl border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Back to Edit & Mode status */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <button
            onClick={() => setStage('mix')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Edit Theme</span>
          </button>

          <div className="text-xs text-white/50 font-mono hidden lg:block">
            {blueprintId ? (
              <span>Blueprint: <strong className="text-white">{currentBlueprint?.name}</strong></span>
            ) : (
              <span>Template: <strong className="text-white">Generic Specimen</strong></span>
            )}
          </div>

          {/* Export Button for mobile */}
          <button
            onClick={() => setIsExportOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>

        {/* Center: Blueprint & Template Switcher Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto py-1 scrollbar-none px-1">
          {BLUEPRINTS.map(bp => {
            const isSelected = blueprintId === bp.id;
            return (
              <button
                key={bp.id}
                onClick={() => setBlueprint(bp.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md font-bold'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
                title={bp.tagline}
              >
                <span>{bp.name}</span>
              </button>
            );
          })}

          <button
            onClick={() => setBlueprint(null)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              blueprintId === null
                ? 'bg-white text-black shadow-md font-bold'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>Generic Specimen</span>
          </button>
        </div>

        {/* Right: Viewport Toggle & Export Panel Button */}
        <div className="hidden md:flex items-center gap-3">
          <ViewportToggle />

          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Spec</span>
          </button>
        </div>
      </header>

      {/* Main Full-Screen Layout with Shared-Element Transition */}
      <main className="w-full flex-1 flex justify-center items-start py-6 px-2 sm:px-6">
        <motion.div
          layoutId="preview"
          animate={{ width: viewportWidth }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto rounded-[28px] overflow-hidden border border-white/15 shadow-2xl bg-black"
        >
          <ThemeScope theme={theme} className="w-full min-h-[85vh]">
            {blueprintId ? (
              <BlueprintRenderer blueprintId={blueprintId} />
            ) : (
              <LandingTemplate />
            )}
          </ThemeScope>
        </motion.div>
      </main>

      {/* Export Dialog */}
      <ExportPanel
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        theme={theme}
      />
    </div>
  );
};
