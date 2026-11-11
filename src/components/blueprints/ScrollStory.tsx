import React, { useState, useRef } from 'react';
import { 
  CheckCircle2, 
  Layers, 
  ArrowDown, 
  EyeOff 
} from 'lucide-react';

interface ScrollStoryProps {
  compact?: boolean;
}

export const ScrollStory: React.FC<ScrollStoryProps> = ({ compact = false }) => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [forceReducedMotion, setForceReducedMotion] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const stages = [
    {
      number: '01',
      badge: 'Initial State',
      title: 'Decoupling Visual Tokens from UI Logic',
      description: 'The foundation starts with pure CSS variables. Rather than baking hex values into components, every visual attribute is mapped to semantic design tokens.',
      details: [
        'Component code references only var(--bg), var(--accent), etc.',
        'Zero compile step required to switch palettes or typography.',
        'Preserves full native performance without CSS-in-JS runtime overhead.',
      ],
      codeSnippet: ':root { --bg: #ffffff; --accent: #22c55e; }',
    },
    {
      number: '02',
      badge: 'Transition Stage',
      title: 'Structural Personality Overrides',
      description: 'Tokens alone cannot express personality. Style archetypes introduce structural CSS selectors that govern shadows, backdrop blurs, and asymmetric alignments.',
      details: [
        'Bento grids introduce micro-borders and nested card geometry.',
        'Brutalism applies thick borders and hard offset drop shadows.',
        'Glassmorphism layers multi-stop translucent blurs on surface cards.',
      ],
      codeSnippet: '[data-style="bento-grid"] .card { border: 1px solid var(--border); }',
    },
    {
      number: '03',
      badge: 'Completed Delivery',
      title: 'Instant Multi-Target Code Export',
      description: 'With style and blueprint validated, the engine compiles clean production assets: CSS variables, Tailwind configurations, JSON schemas, and ready-to-paste AI prompts.',
      details: [
        'Ready to copy directly into modern React or static HTML projects.',
        'Shareable deep links encode the complete theme state into the URL.',
        'Eliminates weeks of back-and-forth design system handoffs.',
      ],
      codeSnippet: 'export const theme = { style: "bento-grid", radius: 24 };',
    },
  ];

  // Manual scroll progress tracking inside the bounded container
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (forceReducedMotion) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = scrollTop / (scrollHeight - clientHeight);
    if (progress < 0.33) {
      setActiveStage(0);
    } else if (progress < 0.66) {
      setActiveStage(1);
    } else {
      setActiveStage(2);
    }
  };

  if (compact) {
    return (
      <div className="p-4 space-y-3 text-xs bg-[var(--bg)] text-[var(--text)] font-body h-full overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
          <div className="flex items-center gap-1.5 font-bold font-heading">
            <Layers className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Scroll Story</span>
          </div>
          <span className="badge-themed text-[9px] px-2 py-0.5">3 Stages</span>
        </div>

        <div className="space-y-2">
          {stages.map((st, i) => (
            <div 
              key={st.number}
              className={`card p-2 text-xs transition-all ${
                i === 0 ? 'border-[var(--accent)]' : 'opacity-60'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="font-bold text-[var(--accent)]">Stage {st.number}</span>
                <span className="text-[var(--muted)]">{st.badge}</span>
              </div>
              <div className="font-bold text-[11px] truncate">{st.title}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-8 space-y-6 bg-[var(--bg)] text-[var(--text)] font-body min-h-[520px]">
      {/* Top Header & Rule Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black font-heading tracking-[var(--tracking)]">
              Scroll Story Section
            </h2>
            <span className="badge-themed text-[10px] font-mono">NO SCROLL HIJACKING</span>
          </div>
          <p className="text-xs text-[var(--muted)] pt-0.5">
            Three narrative stages revealed by native scroll progress. No scroll-locking or trapped content.
          </p>
        </div>

        {/* Story Controls & Reduced Motion Simulator */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setForceReducedMotion(!forceReducedMotion)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius)] text-xs font-semibold border transition-all ${
              forceReducedMotion
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-[var(--surface2)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--text)]'
            }`}
            title="Toggle reduced motion stacked layout"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>{forceReducedMotion ? 'Reduced Motion (Active)' : 'Test Reduced Motion'}</span>
          </button>

          {/* Jump / Skip Controls */}
          <div className="flex items-center p-0.5 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] text-xs">
            {stages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={`px-3 py-1 rounded-[calc(var(--radius)-2px)] font-bold transition-all ${
                  activeStage === idx
                    ? 'bg-[var(--accent)] text-white shadow-sm'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* If Reduced Motion is Active: Stack All 3 Stages Cleanly */}
      {forceReducedMotion ? (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="p-3 rounded-[var(--radius)] bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono">
            <strong>Prefers-Reduced-Motion Active:</strong> All 3 narrative stages stack linearly as normal readable static content with zero motion or pinning.
          </div>

          {stages.map(st => (
            <div key={st.number} className="card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="badge-themed text-xs font-mono font-bold">Stage {st.number} · {st.badge}</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-[var(--text)]">{st.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{st.description}</p>
              <ul className="space-y-1.5 pt-2 text-xs text-[var(--text)]">
                {st.details.map((d, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        /* Normal Interactive Bounded Scroll Story */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Pinned Live Canvas (5 cols) */}
          <div className="lg:col-span-5 sticky top-20 card p-6 space-y-4 bg-[var(--surface)] border border-[var(--border)] shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
                Stage 0{activeStage + 1} of 03
              </span>
              <span className="badge-themed text-[10px] font-mono">
                {stages[activeStage].badge}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold font-heading text-[var(--text)]">
                {stages[activeStage].title}
              </h3>
              <p className="text-xs text-[var(--muted)]">
                Interactive interaction study linked to scroll progress.
              </p>
            </div>

            <div className="p-3 rounded-[var(--radius)] bg-[var(--surface2)] font-mono text-[11px] text-[var(--accent)] border border-[var(--border)] overflow-x-auto">
              <code>{stages[activeStage].codeSnippet}</code>
            </div>

            {/* Stepper Progress Indicator */}
            <div className="pt-2 flex items-center gap-2">
              {stages.map((_, idx) => (
                <div 
                  key={idx}
                  className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                    idx <= activeStage ? 'bg-[var(--accent)]' : 'bg-[var(--surface2)]'
                  }`}
                />
              ))}
            </div>

            <div className="text-[10px] font-mono text-[var(--muted)] flex items-center gap-1.5">
              <ArrowDown className="w-3 h-3 text-[var(--accent)] animate-bounce" />
              <span>Scroll down on the right pane to reveal next stages</span>
            </div>
          </div>

          {/* Right Column: Bounded Scroll Track (7 cols) */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="lg:col-span-7 h-[460px] overflow-y-auto space-y-8 pr-3 scrollbar-thin scrollbar-thumb-[var(--border)]"
          >
            {stages.map((st, idx) => (
              <div 
                key={st.number}
                className={`card p-6 sm:p-8 space-y-4 transition-all duration-300 ${
                  activeStage === idx 
                    ? 'border-[var(--accent)] shadow-xl ring-1 ring-[var(--accent)]/30' 
                    : 'opacity-40 hover:opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[var(--accent)]">
                    STAGE {st.number}
                  </span>
                  <span className="text-xs font-mono text-[var(--muted)]">
                    {st.badge}
                  </span>
                </div>

                <h4 className="text-xl sm:text-2xl font-black font-heading text-[var(--text)]">
                  {st.title}
                </h4>

                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {st.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-[var(--border)]">
                  {st.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[var(--text)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
