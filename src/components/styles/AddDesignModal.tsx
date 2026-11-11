import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { StyleDef, Theme } from '@/types';
import { PALETTES } from '@/data/palettes';
import { FONT_PAIRS } from '@/data/fonts';
import { ARCHETYPE_VARIANTS, defineStyle, getCategoriesFromStyles } from '@/data/styleRegistry';
import { useStore } from '@/state/store';
import { ThemeScope } from '@/theme/ThemeScope';
import { Specimen } from '@/components/Specimen';
import { 
  X, 
  Sparkles, 
  Code, 
  Layers, 
  Palette, 
  Type, 
  Maximize2, 
  Download, 
  Upload, 
  Check, 
  Sliders 
} from 'lucide-react';

interface AddDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddDesignModal: React.FC<AddDesignModalProps> = ({ isOpen, onClose }) => {
  const { styles, addCustomStyle, importCustomStyles } = useStore();
  const existingCategories = useMemo(() => getCategoriesFromStyles(styles).filter(c => c !== 'All'), [styles]);

  const [activeTab, setActiveTab] = useState<'visual' | 'json'>('visual');

  // Visual Designer state
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState(existingCategories[0] || 'Clean & Structured');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  
  const [variant, setVariant] = useState<string>('bento-grid');
  const [paletteId, setPaletteId] = useState<string>('bento-midnight');
  const [fontId, setFontId] = useState<string>('plus-jakarta');

  // Geometry
  const [radius, setRadius] = useState<number>(20);
  const [gap, setGap] = useState<number>(16);
  const [borderWidth, setBorderWidth] = useState<number>(1);
  const [shadow, setShadow] = useState<StyleDef['defaults']['geometry']['shadow']>('soft');
  const [blur, setBlur] = useState<number>(8);

  // Rules & Best for
  const [rules, setRules] = useState<string>('Rounded modular tiles with consistent spacing\nHigh-contrast micro-borders\nSubtle ambient backdrops');
  const [bestFor, setBestFor] = useState<string>('Web applications, SaaS landing pages, Dashboards');
  const [customCss, setCustomCss] = useState<string>('');

  // JSON Tab state
  const [jsonInput, setJsonInput] = useState('');
  const [jsonMessage, setJsonMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Compute live preview theme
  const previewTheme: Theme = useMemo(() => {
    return {
      styleId: 'temp-preview',
      paletteId,
      fontId,
      geometry: {
        radius,
        gap,
        borderWidth,
        shadow,
        blur,
      },
      motion: 'subtle',
      locks: { style: false, palette: false, font: false, geometry: false },
    };
  }, [paletteId, fontId, radius, gap, borderWidth, shadow, blur]);

  const previewStyleDef: StyleDef = useMemo(() => {
    return {
      id: 'temp-preview',
      name: name || 'Untitled Design',
      category: isCustomCategory ? customCategoryInput || 'Custom' : category,
      tagline: tagline || 'Your design personality in real-time.',
      defaults: {
        paletteId,
        fontId,
        geometry: {
          radius,
          gap,
          borderWidth,
          shadow,
          blur,
        },
      },
      rules: rules.split('\n').filter(r => r.trim().length > 0),
      bestFor: bestFor.split(',').map(b => b.trim()).filter(b => b.length > 0),
      variant,
      customCss: customCss.trim() || undefined,
      isCustom: true,
    };
  }, [name, tagline, category, isCustomCategory, customCategoryInput, paletteId, fontId, radius, gap, borderWidth, shadow, blur, rules, bestFor, variant, customCss]);

  const handleSaveVisual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalCategory = isCustomCategory ? (customCategoryInput.trim() || 'Custom & Experimental') : category;
    
    const newStyle = defineStyle({
      name: name.trim(),
      category: finalCategory,
      tagline: tagline.trim() || 'Custom created design.',
      paletteId,
      fontId,
      variant,
      geometry: {
        radius,
        gap,
        borderWidth,
        shadow,
        blur,
      },
      rules: rules.split('\n').map(r => r.trim()).filter(Boolean),
      bestFor: bestFor.split(',').map(b => b.trim()).filter(Boolean),
      customCss: customCss.trim() || undefined,
    });

    addCustomStyle(newStyle);
    onClose();
  };

  const handleImportJson = () => {
    setJsonMessage(null);
    if (!jsonInput.trim()) {
      setJsonMessage({ type: 'error', text: 'Please paste JSON content first.' });
      return;
    }

    const res = importCustomStyles(jsonInput);
    if (res.success) {
      setJsonMessage({ type: 'success', text: `Successfully imported ${res.count} design(s)!` });
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setJsonMessage({ type: 'error', text: res.error || 'Failed to import design JSON' });
    }
  };

  const handleExportAll = () => {
    const jsonStr = JSON.stringify(styles, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stylelab-all-designs-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadExampleTemplate = () => {
    const sample = {
      name: "Solarpunk Utopia",
      category: "Futuristic & Eco",
      tagline: "High-tech ecology and warm brass aesthetics.",
      defaults: {
        paletteId: "wabi-sabi-tea",
        fontId: "plus-jakarta",
        geometry: {
          radius: 20,
          gap: 16,
          borderWidth: 1,
          shadow: "glow",
          blur: 12
        }
      },
      rules: [
        "Warm organic brass accents with natural tones",
        "Curved plant-inspired geometry and soft glow",
        "Refined typographic hierarchy with sustainable warmth"
      ],
      bestFor: ["Climate tech", "Clean energy", "Sustainable architecture", "Eco brands"],
      variant: "glassmorphism"
    };
    setJsonInput(JSON.stringify(sample, null, 2));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#12141c] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 text-white"
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#161824]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">Add New Design</h3>
              <p className="text-xs text-white/50">Easily create or import your own design style into StyleLab</p>
            </div>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('visual')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all ${
                activeTab === 'visual' ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Visual Builder</span>
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all ${
                activeTab === 'json' ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>JSON Import / Export</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'visual' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Form Controls (7 cols) */}
              <form onSubmit={handleSaveVisual} className="lg:col-span-7 space-y-4 text-xs">
                {/* Style Name & Tagline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
                      Design Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Solarpunk Utopia"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
                      Category
                    </label>
                    {isCustomCategory ? (
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={customCategoryInput}
                          onChange={e => setCustomCategoryInput(e.target.value)}
                          placeholder="New category..."
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => setIsCustomCategory(false)}
                          className="px-2.5 py-1 bg-white/10 rounded-xl hover:bg-white/15 text-white/70 text-[10px]"
                        >
                          Select
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-1.5">
                        <select
                          value={category}
                          onChange={e => {
                            if (e.target.value === '__new__') {
                              setIsCustomCategory(true);
                            } else {
                              setCategory(e.target.value);
                            }
                          }}
                          className="flex-1 bg-[#161824] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          {existingCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                          <option value="__new__">+ New Category...</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={e => setTagline(e.target.value)}
                    placeholder="e.g. High-tech ecology and warm brass aesthetics."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Personality Archetype */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-white/70 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Structural Personality Archetype</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ARCHETYPE_VARIANTS.map(arch => (
                      <button
                        type="button"
                        key={arch.id}
                        onClick={() => setVariant(arch.id)}
                        className={`p-2 rounded-xl text-left border transition-all ${
                          variant === arch.id
                            ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                            : 'bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="font-bold text-xs">{arch.label}</div>
                        <div className="text-[10px] text-white/40 truncate">{arch.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Default Palette & Font Pair */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-white/70 uppercase tracking-wider flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Default Color Palette</span>
                    </label>
                    <select
                      value={paletteId}
                      onChange={e => setPaletteId(e.target.value)}
                      className="w-full bg-[#161824] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      {PALETTES.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-white/70 uppercase tracking-wider flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5 text-violet-400" />
                      <span>Default Font Pair</span>
                    </label>
                    <select
                      value={fontId}
                      onChange={e => setFontId(e.target.value)}
                      className="w-full bg-[#161824] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      {FONT_PAIRS.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Geometry Quick Controls */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-[11px] font-bold text-white/70 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Default Geometry & Surface</span>
                    </span>
                    <span className="font-mono text-[10px] text-white/50">Radius: {radius}px · Gap: {gap}px</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div>
                      <div className="text-[10px] text-white/50 pb-1">Radius ({radius}px)</div>
                      <input
                        type="range"
                        min={0}
                        max={36}
                        step={2}
                        value={radius}
                        onChange={e => setRadius(parseInt(e.target.value, 10))}
                        className="w-full accent-indigo-500 h-1 bg-white/20 rounded"
                      />
                    </div>

                    <div>
                      <div className="text-[10px] text-white/50 pb-1">Gap ({gap}px)</div>
                      <input
                        type="range"
                        min={8}
                        max={32}
                        step={2}
                        value={gap}
                        onChange={e => setGap(parseInt(e.target.value, 10))}
                        className="w-full accent-indigo-500 h-1 bg-white/20 rounded"
                      />
                    </div>

                    <div>
                      <div className="text-[10px] text-white/50 pb-1">Border ({borderWidth}px)</div>
                      <input
                        type="range"
                        min={0}
                        max={3}
                        value={borderWidth}
                        onChange={e => setBorderWidth(parseInt(e.target.value, 10))}
                        className="w-full accent-indigo-500 h-1 bg-white/20 rounded"
                      />
                    </div>

                    <div>
                      <div className="text-[10px] text-white/50 pb-1">Blur ({blur}px)</div>
                      <input
                        type="range"
                        min={0}
                        max={24}
                        step={2}
                        value={blur}
                        onChange={e => setBlur(parseInt(e.target.value, 10))}
                        className="w-full accent-indigo-500 h-1 bg-white/20 rounded"
                      />
                    </div>

                    <div>
                      <div className="text-[10px] text-white/50 pb-1">Shadow</div>
                      <select
                        value={shadow}
                        onChange={e => setShadow(e.target.value as any)}
                        className="w-full bg-[#161824] border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                      >
                        <option value="none">None</option>
                        <option value="soft">Soft</option>
                        <option value="hard">Hard</option>
                        <option value="glow">Glow</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Rules & Best For */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
                      Signature Rules (1 per line)
                    </label>
                    <textarea
                      rows={2}
                      value={rules}
                      onChange={e => setRules(e.target.value)}
                      placeholder="High whitespace&#10;Consistent borders"
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono text-[11px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
                      Best For (comma-separated)
                    </label>
                    <textarea
                      rows={2}
                      value={bestFor}
                      onChange={e => setBestFor(e.target.value)}
                      placeholder="SaaS, Portfolios, Studios"
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono text-[11px]"
                    />
                  </div>
                </div>

                {/* Optional Custom CSS */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-white/70 uppercase tracking-wider flex items-center justify-between">
                    <span>Optional Custom CSS Rules</span>
                    <span className="text-[10px] font-normal text-white/40">Power user override</span>
                  </label>
                  <textarea
                    rows={2}
                    value={customCss}
                    onChange={e => setCustomCss(e.target.value)}
                    placeholder="[data-style='...'] .card { border-style: dashed; }"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono text-[11px]"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Create & Save Design</span>
                  </button>
                </div>
              </form>

              {/* Right Column: Live Mini Preview (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full text-center pb-2 text-[11px] font-mono text-white/50 uppercase tracking-wider">
                  Live Real-Time Preview
                </div>
                <div className="w-full h-[460px] rounded-2xl overflow-hidden border border-white/15 shadow-xl relative bg-black/40">
                  <ThemeScope theme={previewTheme} className="w-full h-full flex flex-col justify-between overflow-hidden bg-[var(--bg)] border border-[var(--border)]">
                    <div className="p-4 z-20 space-y-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
                        {previewStyleDef.category}
                      </span>
                      <h4 className="text-2xl font-black text-[var(--text)] tracking-[var(--tracking)] leading-tight">
                        {previewStyleDef.name}
                      </h4>
                      <p className="text-[11px] text-[var(--muted)] line-clamp-1">
                        {previewStyleDef.tagline}
                      </p>
                    </div>

                    <div className="flex-1 mx-4 mb-4 rounded-[var(--radius)] overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] relative z-10">
                      <Specimen compact={true} />
                    </div>
                  </ThemeScope>
                </div>
              </div>
            </div>
          ) : (
            /* JSON Import / Export Tab */
            <div className="space-y-4 max-w-3xl mx-auto py-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">Paste or Upload StyleDef JSON</h4>
                  <p className="text-xs text-white/50">Import single design or array of designs</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={loadExampleTemplate}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold border border-white/10 transition-all"
                  >
                    Load Sample Template
                  </button>
                  <button
                    type="button"
                    onClick={handleExportAll}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 text-xs font-semibold transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export All Designs</span>
                  </button>
                </div>
              </div>

              <textarea
                rows={12}
                value={jsonInput}
                onChange={e => setJsonInput(e.target.value)}
                placeholder='{\n  "name": "My Style",\n  "category": "Futuristic",\n  "tagline": "...",\n  "defaults": {\n    "paletteId": "bento-midnight",\n    "fontId": "inter-modern",\n    "geometry": { "radius": 16, "gap": 16, "borderWidth": 1, "shadow": "soft", "blur": 0 }\n  }\n}'
                className="w-full bg-[#0e1017] border border-white/10 rounded-2xl p-4 font-mono text-xs text-indigo-100 placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />

              {jsonMessage && (
                <div className={`p-3 rounded-xl text-xs font-mono ${
                  jsonMessage.type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {jsonMessage.text}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold transition-all"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleImportJson}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import Design(s)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
