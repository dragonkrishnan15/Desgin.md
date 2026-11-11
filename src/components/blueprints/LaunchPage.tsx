import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Code2 
} from 'lucide-react';

interface LaunchPageProps {
  compact?: boolean;
}

export const LaunchPage: React.FC<LaunchPageProps> = ({ compact = false }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const workflowInput = 'bento-grid + violet-night + plus-jakarta';

  const capabilities = [
    {
      title: 'Real-Time Token Hot-Swapping',
      summary: 'Change colors, typography stacks, and border radii without recompiling your app.',
      code: 'document.documentElement.style.setProperty("--accent", "#2b5fd9");',
      screenshotTitle: 'Live Style Engine Scope',
    },
    {
      title: 'Automated WCAG AA Verification',
      summary: 'Every generated palette is mathematically contrast-checked before code generation.',
      code: 'const ratio = contrast("#fbfbf8", "#0b1f3a"); // 14.8:1 (AAA Pass)',
      screenshotTitle: 'Contrast Auditor Output',
    },
    {
      title: 'Ready-to-Paste Build Prompts',
      summary: 'Turn your design combination into strict, hallucination-resistant prompts for Claude & Cursor.',
      code: 'Create an interactive frontend prototype for [PROJECT]...',
      screenshotTitle: 'AI Prompt Assembler',
    },
  ];

  if (compact) {
    return (
      <div className="p-4 space-y-3 text-xs bg-[var(--bg)] text-[var(--text)] font-body h-full overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
          <div className="flex items-center gap-1.5 font-bold font-heading">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Launch Page</span>
          </div>
          <span className="badge-themed text-[9px] px-2 py-0.5">Marketing</span>
        </div>

        <div className="card p-3 space-y-1.5 text-center">
          <span className="text-[9px] uppercase font-mono text-[var(--accent)] font-bold">One Promise</span>
          <div className="font-black font-heading text-sm text-[var(--text)] leading-tight">
            Design In Seconds. Ship In Minutes.
          </div>
          <p className="text-[10px] text-[var(--muted)] line-clamp-2">
            The instant design-system generator with zero runtime dependencies.
          </p>
          <button className="btn-primary py-1 px-3 text-[10px] font-bold mx-auto">
            Get Started →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-8 space-y-12 bg-[var(--bg)] text-[var(--text)] font-body min-h-[520px]">
      {/* Hero Section: One Clear Promise */}
      <div className="max-w-3xl mx-auto text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface2)] border border-[var(--border)] text-xs font-mono font-bold text-[var(--accent)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>StyleLab Architecture Preview · No Invented Testimonials</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading tracking-[var(--tracking)] text-[var(--text)] leading-tight">
          One Design System. Instant Production Exports.
        </h1>

        <p className="text-sm sm:text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          Combine 28 styles, 24 contrast-verified palettes, and 14 self-hosted font pairs into production-grade CSS variables and AI prompts in seconds.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button className="btn-primary py-3 px-6 text-xs sm:text-sm font-bold shadow-lg flex items-center gap-2">
            <span>Explore Live Blueprints</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="btn-secondary py-3 px-5 text-xs sm:text-sm font-semibold">
            View Documentation
          </button>
        </div>
      </div>

      {/* Core Workflow Walkthrough: From Input to Result */}
      <div className="card p-6 sm:p-10 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-wider">
              Core Workflow
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-[var(--text)]">
              From Concept to Code in 3 Steps
            </h3>
          </div>
          <span className="text-xs font-mono text-[var(--muted)]">100% Client-Side Engine</span>
        </div>

        {/* 3 Step Interactive Workflow Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { step: '01', title: 'Choose Tokens', desc: 'Pick style archetype & palette' },
            { step: '02', title: 'Verify Live', desc: 'Inspect on real-world blueprints' },
            { step: '03', title: 'Export Spec', desc: 'Copy Tailwind, CSS & prompts' },
          ].map((st, i) => (
            <div
              key={st.step}
              onClick={() => setActiveStep(i)}
              className={`p-4 rounded-[var(--radius)] border cursor-pointer transition-all ${
                activeStep === i
                  ? 'bg-[var(--surface2)] border-[var(--accent)] shadow-md'
                  : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--accent)]/50'
              }`}
            >
              <div className="text-xs font-mono font-bold text-[var(--accent)]">STEP {st.step}</div>
              <div className="font-bold text-sm text-[var(--text)] pt-1">{st.title}</div>
              <div className="text-xs text-[var(--muted)] pt-0.5">{st.desc}</div>
            </div>
          ))}
        </div>

        {/* Workflow Simulated Output */}
        <div className="p-4 rounded-[var(--radius)] bg-[var(--surface2)]/70 border border-[var(--border)] font-mono text-xs space-y-2">
          <div className="flex justify-between items-center text-[var(--muted)] text-[11px]">
            <span>Active Workflow Pipeline</span>
            <span className="text-[var(--success)] font-bold">● Status: Verified Ready</span>
          </div>
          <div className="text-[var(--text)] font-bold">
            Input: <span className="text-[var(--accent)]">{workflowInput}</span>
          </div>
          <div className="text-[11px] text-[var(--muted)]">
            → Generated 12 CSS variables, 1 Tailwind preset, and 1 AI prompt with WCAG AA compliance.
          </div>
        </div>
      </div>

      {/* 3 Verified Capabilities beside Screenshots */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-wider">
            Verified Capabilities
          </span>
          <h3 className="text-2xl font-bold font-heading text-[var(--text)]">
            Concrete Capabilities, Backed by Code
          </h3>
        </div>

        <div className="space-y-4">
          {capabilities.map((cap, i) => (
            <div key={i} className="card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-md">
                <span className="badge-themed text-[10px] font-mono">Capability 0{i + 1}</span>
                <h4 className="text-lg font-bold font-heading text-[var(--text)]">{cap.title}</h4>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{cap.summary}</p>
              </div>

              {/* Code Snippet beside capability explanation */}
              <div className="w-full md:w-80 p-3.5 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] font-mono text-[11px] text-[var(--accent)] overflow-x-auto shrink-0">
                <div className="text-[9px] uppercase tracking-wider text-[var(--muted)] pb-1 border-b border-[var(--border)] mb-1.5 flex justify-between">
                  <span>{cap.screenshotTitle}</span>
                  <Code2 className="w-3 h-3 text-[var(--muted)]" />
                </div>
                <code>{cap.code}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Single Next Action Destination */}
      <div className="p-8 sm:p-12 rounded-[var(--radius)] card text-center space-y-4 max-w-3xl mx-auto border-[var(--accent)]/40 bg-[var(--surface2)]/40">
        <h3 className="text-2xl sm:text-3xl font-black font-heading text-[var(--text)]">
          Start Building with Real Tokens Today
        </h3>
        <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl mx-auto">
          No sign-up wall, zero tracking cookies, and 100% static client-side execution.
        </p>
        <button className="btn-primary py-3 px-8 text-xs sm:text-sm font-bold shadow-xl mx-auto flex items-center gap-2">
          <span>Launch Mix Stage Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
