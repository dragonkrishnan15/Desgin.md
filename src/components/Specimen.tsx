import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  BarChart3, 
  Layers, 
  ShieldCheck, 
  SlidersHorizontal,
  Bell,
  Search,
  ChevronDown
} from 'lucide-react';

interface SpecimenProps {
  compact?: boolean;
  className?: string;
}

export const Specimen: React.FC<SpecimenProps> = ({
  compact = false,
  className = '',
}) => {
  const [toggleActive, setToggleActive] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  if (compact) {
    // Mini Specimen for Carousel Cards
    return (
      <div className={`w-full h-full flex flex-col justify-between p-4 overflow-hidden select-none pointer-events-none ${className}`}>
        {/* Mini Navbar */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-[10px] font-bold">
              ✦
            </div>
            <span className="text-xs font-bold text-[var(--text)] tracking-wider">LAB</span>
          </div>
          <div className="px-2 py-0.5 text-[9px] rounded-full badge-themed">LIVE</div>
        </div>

        {/* Mini Hero */}
        <div className="my-auto py-2">
          <div className="inline-block text-[9px] font-semibold text-[var(--accent)] mb-1">
            SPECIMEN v2.4
          </div>
          <h4 className="text-base font-bold text-[var(--text)] leading-tight mb-1">
            Autonomous Design
          </h4>
          <p className="text-[11px] text-[var(--muted)] line-clamp-2 leading-relaxed">
            Dynamic theme token engine running on native variables.
          </p>
        </div>

        {/* Mini Component Cards */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <div className="card p-2 text-left">
            <div className="text-[9px] text-[var(--muted)]">Velocity</div>
            <div className="text-xs font-bold text-[var(--text)]">99.8%</div>
          </div>
          <button className="btn-primary py-1.5 px-2 text-[10px] flex items-center justify-center">
            <span>Deploy</span>
          </button>
        </div>
      </div>
    );
  }

  // Full Specimen for Mix Stage, Compare, and Prototype
  return (
    <div className={`w-full bg-[var(--bg)] text-[var(--text)] p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 select-text ${className}`}>
      {/* 1. Navbar */}
      <header className="navbar-themed card flex items-center justify-between px-4 sm:px-6 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[var(--radius)] bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm shadow-[var(--shadow)]">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-sm sm:text-base tracking-tight text-[var(--text)]">StyleLab Studio</span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full badge-themed">
              v1.0
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-[var(--muted)]">
          <span className="text-[var(--text)] font-semibold cursor-pointer">Specimen</span>
          <span className="hover:text-[var(--text)] cursor-pointer transition-colors">Tokens</span>
          <span className="hover:text-[var(--text)] cursor-pointer transition-colors">Components</span>
          <span className="hover:text-[var(--text)] cursor-pointer transition-colors">System</span>
        </nav>

        <div className="flex items-center gap-2.5">
          <button className="btn-secondary px-3 py-1.5 text-xs">
            <Search className="w-3.5 h-3.5 text-[var(--muted)]" />
            <span className="hidden sm:inline">Search</span>
          </button>
          <button className="btn-primary px-3.5 py-1.5 text-xs">
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. Hero Headline + Subtext + 2 Buttons */}
      <section className="text-center max-w-2xl mx-auto py-4 sm:py-6 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-themed text-xs">
          <Sparkles className="w-3 h-3 text-[var(--accent)]" />
          <span>Living Theme Variable System</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text)] tracking-[var(--tracking)] leading-tight">
          Harmonious Design at Pure Native Velocity
        </h1>

        <p className="text-xs sm:text-base text-[var(--muted)] leading-relaxed max-w-xl mx-auto">
          Every token, radius curve, and typographic hierarchy reacts instantly across your interface with zero compilation overhead.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button className="btn-primary px-5 py-2.5 text-xs sm:text-sm shadow-[var(--shadow)]">
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="btn-secondary px-5 py-2.5 text-xs sm:text-sm">
            <span>Documentation</span>
          </button>
        </div>
      </section>

      {/* 3. 3-Card Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-[var(--gap)]">
        {/* Card 1 */}
        <div className="card p-5 space-y-3">
          <div className="w-10 h-10 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[var(--text)]">Atomic Tokens</h3>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            Dynamic runtime CSS variables for borders, surfaces, radiuses, and depth elevation.
          </p>
          <div className="pt-2 text-xs font-semibold text-[var(--accent)] flex items-center gap-1">
            <span>Inspect tokens</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="card p-5 space-y-3">
          <div className="w-10 h-10 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] flex items-center justify-center text-[var(--accent2)]">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[var(--text)]">WCAG 2.1 Contrast</h3>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            Real-time luminance scoring ensuring body copy passes strict 4.5:1 AA contrast rules.
          </p>
          <div className="pt-2 text-xs font-semibold text-[var(--accent2)] flex items-center gap-1">
            <span>Verify ratios</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="card p-5 space-y-3">
          <div className="w-10 h-10 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] flex items-center justify-center text-[var(--success)]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[var(--text)]">Cloudflare Edge</h3>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            100% static client-side performance, instant state hydration via shareable URLs.
          </p>
          <div className="pt-2 text-xs font-semibold text-[var(--success)] flex items-center gap-1">
            <span>Zero server latency</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </section>

      {/* 4. Interactive Section: Pricing Card + Form Controls + Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)] items-start">
        {/* Pricing Card (5 cols) */}
        <div className="lg:col-span-5 card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Pro Tier</span>
            <div className="flex items-center p-1 rounded-full bg-[var(--surface2)] border border-[var(--border)] text-[10px]">
              <button 
                onClick={() => setSelectedPlan('monthly')}
                className={`px-2.5 py-1 rounded-full transition-colors ${selectedPlan === 'monthly' ? 'bg-[var(--accent)] text-white font-bold' : 'text-[var(--muted)]'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setSelectedPlan('yearly')}
                className={`px-2.5 py-1 rounded-full transition-colors ${selectedPlan === 'yearly' ? 'bg-[var(--accent)] text-white font-bold' : 'text-[var(--muted)]'}`}
              >
                Yearly
              </button>
            </div>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-[var(--text)]">
              {selectedPlan === 'monthly' ? '$39' : '$390'}
            </span>
            <span className="text-xs text-[var(--muted)]">/{selectedPlan === 'monthly' ? 'month' : 'year'}</span>
          </div>

          <p className="text-xs text-[var(--muted)]">
            Full access to all 28 design styles, real-time comparison sliders, and AI export generators.
          </p>

          <div className="space-y-2.5 pt-2 text-xs text-[var(--text)]">
            {[
              '28 Curated Design Movements',
              'Self-hosted Fontsource packages',
              'One-click Tailwind & CSS token export',
              'Cloudflare Pages static deployment',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <button className="btn-primary w-full py-2.5 text-xs font-semibold">
            <span>Upgrade to StyleLab Pro</span>
          </button>
        </div>

        {/* Form Controls & Realtime Chart (7 cols) */}
        <div className="lg:col-span-7 space-y-[var(--gap)]">
          {/* Form Card */}
          <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <span className="text-xs font-bold text-[var(--text)] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[var(--accent)]" />
                Form &amp; Input Controls
              </span>
              <span className="text-[10px] font-mono text-[var(--muted)]">Native Specs</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[var(--muted)] mb-1">
                  Design Project Name
                </label>
                <input
                  type="text"
                  defaultValue="Neo-Dashboard 2026"
                  className="input-themed w-full px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[var(--muted)] mb-1">
                  Theme Preset Mode
                </label>
                <div className="relative">
                  <select className="input-themed w-full px-3 py-2 text-xs appearance-none focus:outline-none focus:ring-1 focus:ring-[var(--accent)]">
                    <option>High Precision (SaaS)</option>
                    <option>Experimental (Motion)</option>
                    <option>Editorial (Publication)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[var(--muted)] absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <div className="text-xs font-semibold text-[var(--text)]">Enable Motion Spring Physics</div>
                <div className="text-[11px] text-[var(--muted)]">Calculates inertia and stiffness dynamically</div>
              </div>
              <button
                type="button"
                onClick={() => setToggleActive(!toggleActive)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  toggleActive ? 'bg-[var(--accent)]' : 'bg-[var(--surface2)] border border-[var(--border)]'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    toggleActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Small Sparkline / Performance Chart Card */}
          <div className="card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[var(--text)]">Render Telemetry</span>
                <p className="text-[11px] text-[var(--muted)]">Frame time &amp; CSS variable repaint rate</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono font-bold text-[var(--accent)]">60.0 FPS</span>
                <p className="text-[10px] text-[var(--success)] font-medium">Optimal 16.6ms</p>
              </div>
            </div>

            {/* SVG Wave Chart */}
            <div className="h-20 w-full pt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area */}
                <path
                  d="M0,60 Q50,20 100,45 T200,25 T300,50 T400,15 L400,80 L0,80 Z"
                  fill="url(#chartGradient)"
                />
                {/* Line */}
                <path
                  d="M0,60 Q50,20 100,45 T200,25 T300,50 T400,15"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Accent point */}
                <circle cx="400" cy="15" r="4" fill="var(--accent)" stroke="var(--bg)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Themed Toast Notification */}
      <div className="card flex items-center justify-between p-3.5 border-l-4 border-l-[var(--success)] shadow-[var(--shadow)]">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-[var(--success)]/20 text-[var(--success)] flex items-center justify-center shrink-0">
            <Bell className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[var(--text)]">Style Theme Applied Live</div>
            <div className="text-[11px] text-[var(--muted)]">All components rendered using CSS custom properties</div>
          </div>
        </div>
        <span className="text-[10px] font-mono text-[var(--muted)] px-2 py-1 rounded bg-[var(--surface2)]">
          0ms delay
        </span>
      </div>
    </div>
  );
};

