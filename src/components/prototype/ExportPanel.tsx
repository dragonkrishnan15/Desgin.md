import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme } from '@/types';
import { 
  exportCssVariables, 
  exportTailwindConfig, 
  exportJsonTheme, 
  exportShareUrl 
} from '@/theme/exporters';
import { generateAiPrompt } from '@/theme/promptGen';
import { assemblePrompt } from '@/theme/assemblePrompt';
import { getBlueprintById } from '@/data/blueprints';
import { useStore } from '@/state/store';
import confetti from 'canvas-confetti';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Code, 
  Share2, 
  FileJson, 
  Sparkles,
  Palette
} from 'lucide-react';

interface ExportPanelProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({
  isOpen,
  onClose,
  theme,
}) => {
  const { blueprintId } = useStore();
  const [activeTab, setActiveTab] = useState<'css' | 'tailwind' | 'json' | 'prompt' | 'share'>('css');
  const [copied, setCopied] = useState(false);

  // Blueprint inputs
  const [project, setProject] = useState('');
  const [audience, setAudience] = useState('');
  const [approvedContent, setApprovedContent] = useState('');
  const [brandRules, setBrandRules] = useState('');
  const [hasReferenceImage, setHasReferenceImage] = useState(false);

  const currentBlueprint = blueprintId ? getBlueprintById(blueprintId) : null;

  const cssCode = exportCssVariables(theme);
  const tailwindCode = exportTailwindConfig(theme);
  const jsonCode = exportJsonTheme(theme);
  
  const promptCode = currentBlueprint
    ? assemblePrompt(
        currentBlueprint,
        theme,
        {
          PROJECT: project,
          AUDIENCE: audience,
          APPROVED_CONTENT: approvedContent,
          BRAND_RULES: brandRules,
        },
        { reference: hasReferenceImage }
      )
    : generateAiPrompt(theme);

  const shareUrl = exportShareUrl(theme);

  const triggerConfetti = () => {
    if (theme.motion !== 'none') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: [theme.geometry.shadow === 'none' ? '#ffffff' : '#6366f1', '#a855f7', '#38bdf8'],
        disableForReducedMotion: true,
      });
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    triggerConfetti();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([jsonCode], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stylelab-theme-${theme.styleId}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerConfetti();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-2xl bg-[#12141c] border border-white/15 rounded-2xl shadow-2xl z-50 overflow-hidden text-white flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold">Export Theme Specs &amp; Code</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                aria-label="Close export dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1.5 px-5 pt-3 overflow-x-auto border-b border-white/10 text-xs">
              {[
                { id: 'css', label: 'CSS Variables', icon: Code },
                { id: 'tailwind', label: 'Tailwind Config', icon: Palette },
                { id: 'json', label: 'Theme JSON', icon: FileJson },
                { id: 'prompt', label: 'AI Prompt', icon: Sparkles },
                { id: 'share', label: 'Share Link', icon: Share2 },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
                    activeTab === id
                      ? 'border-indigo-500 text-white font-bold'
                      : 'border-transparent text-white/50 hover:text-white/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 overflow-y-auto space-y-4">
              {activeTab === 'css' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-white/60">
                    <span>Pure CSS Custom Properties (zero framework dependency)</span>
                    <button
                      onClick={() => handleCopy(cssCode)}
                      className="btn-primary py-1 px-3 text-xs"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy CSS'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-emerald-400 overflow-x-auto max-h-72">
                    {cssCode}
                  </pre>
                </div>
              )}

              {activeTab === 'tailwind' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-white/60">
                    <span>tailwind.config.js extend tokens snippet</span>
                    <button
                      onClick={() => handleCopy(tailwindCode)}
                      className="btn-primary py-1 px-3 text-xs"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy Tailwind'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-indigo-300 overflow-x-auto max-h-72">
                    {tailwindCode}
                  </pre>
                </div>
              )}

              {activeTab === 'json' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-white/60">
                    <span>Comprehensive JSON theme representation</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleDownloadJson}
                        className="btn-secondary py-1 px-3 text-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                      <button
                        onClick={() => handleCopy(jsonCode)}
                        className="btn-primary py-1 px-3 text-xs"
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
                      </button>
                    </div>
                  </div>
                  <pre className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-amber-300 overflow-x-auto max-h-72">
                    {jsonCode}
                  </pre>
                </div>
              )}

              {activeTab === 'prompt' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs text-white/60">
                    <div>
                      <span className="font-bold text-white">
                        {currentBlueprint ? `Ready-to-Paste Blueprint Build Prompt: ${currentBlueprint.name}` : 'Theme Spec AI Prompt'}
                      </span>
                      <div className="text-[11px] text-white/40">Paste directly into Claude, Cursor, v0, ChatGPT, or Antigravity</div>
                    </div>
                    <button
                      onClick={() => handleCopy(promptCode)}
                      className="btn-primary py-1.5 px-4 text-xs font-bold shadow-md"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy Build Prompt'}</span>
                    </button>
                  </div>

                  {/* Blueprint Inputs (Placeholders) */}
                  {currentBlueprint && (
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold font-mono text-[11px] text-indigo-300 uppercase tracking-wider">
                          Prompt Variables (Optional · Leave empty to keep bracketed placeholders)
                        </span>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={hasReferenceImage}
                            onChange={e => setHasReferenceImage(e.target.checked)}
                            className="rounded accent-indigo-500"
                          />
                          <span className="text-[11px] text-white/70">I have a reference image (Adds Blocks C & E)</span>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                        <div>
                          <label className="text-[10px] font-mono text-white/50 block pb-0.5">[PROJECT] Name</label>
                          <input
                            type="text"
                            value={project}
                            onChange={e => setProject(e.target.value)}
                            placeholder="e.g. Acme Cloud Console"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-white/50 block pb-0.5">[AUDIENCE] User Group</label>
                          <input
                            type="text"
                            value={audience}
                            onChange={e => setAudience(e.target.value)}
                            placeholder="e.g. Site reliability engineers"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-white/50 block pb-0.5">[APPROVED_CONTENT] Source</label>
                          <input
                            type="text"
                            value={approvedContent}
                            onChange={e => setApprovedContent(e.target.value)}
                            placeholder="e.g. docs/approved-metrics.json"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-white/50 block pb-0.5">[BRAND_RULES] Source</label>
                          <input
                            type="text"
                            value={brandRules}
                            onChange={e => setBrandRules(e.target.value)}
                            placeholder="e.g. Acme Design System v4 tokens"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <pre className="p-4 rounded-xl bg-black/70 border border-white/10 text-xs text-indigo-100 leading-relaxed font-mono whitespace-pre-wrap max-h-80 overflow-y-auto">
                    {promptCode}
                  </pre>
                </div>
              )}

              {activeTab === 'share' && (
                <div className="space-y-3">
                  <span className="text-xs text-white/60">
                    Instant shareable URL encoded with your exact design combination:
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={shareUrl}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white/90 focus:outline-none"
                    />
                    <button
                      onClick={() => handleCopy(shareUrl)}
                      className="btn-primary py-2 px-4 text-xs font-semibold"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy URL'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-white/40">
                    Anyone opening this URL will instantly hydrate this exact combo with zero server dependency.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

