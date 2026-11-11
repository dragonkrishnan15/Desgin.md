import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  CheckCircle, 
  HelpCircle, 
  Tv 
} from 'lucide-react';

interface StoryPresentationProps {
  compact?: boolean;
}

export const StoryPresentation: React.FC<StoryPresentationProps> = ({ compact = false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);

  const slides = [
    {
      id: 1,
      tag: '01 · The Problem',
      title: 'Context Switching is Crushing Engineering Velocity',
      subtitle: 'Developers jump between 8 disconnected tools to ship one production change.',
      content: [
        'Teams lose 3.4 hours every day re-establishing context across dashboards.',
        'Information fragmentation creates silent handoff bugs and deployment delays.',
        'Existing monolithic platforms impose rigid workflows that break local development.',
      ],
      notes: 'Highlight customer interview data. Emphasize that adding more features to old tools made this worse.',
    },
    {
      id: 2,
      tag: '02 · Current Workflow',
      title: 'The Fragmented Status Quo',
      subtitle: 'Manual handoffs, stale Slack threads, and unverified mockups.',
      content: [
        'Designers export static Figma frames that fall out of date within 48 hours.',
        'Engineers spend days reconstructing CSS variables and responsive rules by hand.',
        'Product managers lack a live, interactive environment to verify real workflows.',
      ],
      notes: 'Walk through the pain of a typical Tuesday deployment cycle.',
    },
    {
      id: 3,
      tag: '03 · Proposed Approach',
      title: 'Single-Source Living Tokens & Real-World Blueprints',
      subtitle: 'Dress realistic, production-tested page archetypes with instant theme tokens.',
      content: [
        'Zero translation loss: tokens drive both previews and exported code simultaneously.',
        'Pre-validated accessibility: WCAG AA contrast checked before export.',
        'Fair comparison: judge aesthetics against the exact same content specimen.',
      ],
      notes: 'This is the inflection point of the story. Reveal the core thesis.',
    },
    {
      id: 4,
      tag: '04 · Three Core Capabilities',
      title: 'Built for Real Engineering Pipelines',
      subtitle: 'Everything needed to build, compare, and ship modern interfaces.',
      capabilities: [
        {
          name: 'Instant Theme Combiner',
          desc: 'Mix styles, palettes, fonts, and geometry in real-time with zero runtime latency.',
        },
        {
          name: 'Live Blueprint Engine',
          desc: 'Test your look against dashboards, launch sites, and full-screen industry portals.',
        },
        {
          name: 'Multi-Stack Exporter',
          desc: 'Generate CSS variables, Tailwind configuration, JSON specs, and prompt-ready AI briefs.',
        },
      ],
      notes: 'Spend time on Capability 2. Point out that the current deck itself is built on this engine.',
    },
    {
      id: 5,
      tag: '05 · Evidence & Verification',
      title: 'Supplied Proof & Benchmark Metrics',
      subtitle: 'Transparent proof with strict placeholder safeguards (No fictional quotes).',
      evidence: [
        {
          metric: '100% Static',
          label: 'Zero backend required · Deploys directly to Cloudflare Pages edge',
          verified: true,
        },
        {
          metric: '60 FPS',
          label: 'Framer Motion springs animating strictly transform and opacity',
          verified: true,
        },
        {
          metric: '[EVIDENCE PENDING]',
          label: 'Customer case study metrics: confirm with beta team before public release',
          verified: false,
        },
      ],
      notes: 'Crucial: point out that missing customer quotes are held as placeholders, preserving content integrity.',
    },
    {
      id: 6,
      tag: '06 · Next Action',
      title: 'Try StyleLab with Your Own Brand Rules',
      subtitle: 'Pick a blueprint, choose your tokens, and export production code.',
      action: {
        headline: 'Ready to build your next design system?',
        cta: 'Open Interactive Combiner',
      },
      notes: 'Invite the audience to take control and try their own combination.',
    },
  ];

  const total = slides.length;
  const slide = slides[currentSlide];

  // Keyboard navigation (Left / Right arrow keys)
  useEffect(() => {
    if (compact) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlide(prev => (prev < total - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [compact, total]);

  if (compact) {
    return (
      <div className="p-4 space-y-3 text-xs bg-[var(--bg)] text-[var(--text)] font-body h-full overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
          <div className="flex items-center gap-1.5 font-bold font-heading">
            <Tv className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Story Presentation</span>
          </div>
          <span className="badge-themed text-[9px] px-2 py-0.5">16:9 Deck</span>
        </div>

        <div className="card p-3 space-y-2 aspect-[16/10] flex flex-col justify-between">
          <div className="text-[10px] uppercase font-mono text-[var(--accent)] font-bold">{slide.tag}</div>
          <div className="font-bold font-heading text-sm text-[var(--text)] leading-tight">{slide.title}</div>
          <div className="text-[10px] text-[var(--muted)] line-clamp-2">{slide.subtitle}</div>
          <div className="flex justify-between items-center text-[9px] font-mono text-[var(--muted)] pt-1 border-t border-[var(--border)]">
            <span>Slide {currentSlide + 1} of {total}</span>
            <span className="text-[var(--accent)]">Use ← → to navigate</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-8 space-y-6 bg-[var(--bg)] text-[var(--text)] font-body min-h-[520px]">
      {/* Top Deck Controls Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black font-heading tracking-[var(--tracking)]">
              Product Story Presentation
            </h2>
            <span className="badge-themed text-[10px] font-mono">16:9 PRESENTATION CANVAS</span>
          </div>
          <p className="text-xs text-[var(--muted)] pt-0.5">
            Six slides, one connected narrative. One idea per slide with verified evidence safeguards.
          </p>
        </div>

        {/* Slide Counter and Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-[var(--radius)] text-xs font-semibold border transition-all ${
              showSpeakerNotes 
                ? 'bg-[var(--accent)] text-white border-[var(--accent)]' 
                : 'bg-[var(--surface2)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--text)]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Speaker Notes</span>
          </button>

          <div className="flex items-center gap-1 px-3 py-1.5 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] font-mono text-xs font-bold">
            <span className="text-[var(--accent)]">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="text-[var(--muted)]">/</span>
            <span className="text-[var(--muted)]">{String(total).padStart(2, '0')}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className="p-2 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] text-[var(--text)] disabled:opacity-30 disabled:pointer-events-none hover:bg-[var(--accent)] hover:text-white transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide(prev => Math.min(total - 1, prev + 1))}
              disabled={currentSlide >= total - 1}
              className="p-2 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] text-[var(--text)] disabled:opacity-30 disabled:pointer-events-none hover:bg-[var(--accent)] hover:text-white transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 16:9 Presentation Canvas Container */}
      <div className="w-full max-w-5xl mx-auto aspect-[16/9] card p-8 sm:p-14 flex flex-col justify-between shadow-2xl relative overflow-hidden select-none border border-[var(--border)] bg-[var(--surface)]">
        {/* Slide Header */}
        <div className="space-y-3 z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
              {slide.tag}
            </span>
            <span className="text-xs font-mono text-[var(--muted)]">StyleLab Story Deck</span>
          </div>

          <h3 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-[var(--text)] tracking-[var(--tracking)] leading-tight max-w-3xl">
            {slide.title}
          </h3>

          <p className="text-sm sm:text-lg text-[var(--muted)] font-medium max-w-2xl">
            {slide.subtitle}
          </p>
        </div>

        {/* Slide Body Content (Varies by slide type) */}
        <div className="my-auto py-4 z-10">
          {/* Bullet Content (Slides 1, 2, 3) */}
          {slide.content && (
            <div className="space-y-3 max-w-3xl">
              {slide.content.map((point, i) => (
                <div key={i} className="flex items-start gap-3 text-sm sm:text-base text-[var(--text)] font-medium">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          )}

          {/* Capabilities Grid (Slide 4) */}
          {slide.capabilities && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {slide.capabilities.map((cap, i) => (
                <div key={i} className="card p-4 space-y-2 bg-[var(--surface2)]/60">
                  <div className="font-bold text-sm text-[var(--text)] font-heading">{cap.name}</div>
                  <div className="text-xs text-[var(--muted)] leading-relaxed">{cap.desc}</div>
                </div>
              ))}
            </div>
          )}

          {/* Evidence Grid (Slide 5) */}
          {slide.evidence && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {slide.evidence.map((ev, i) => (
                <div key={i} className="card p-5 space-y-2 bg-[var(--surface2)]/60">
                  <div className="text-xl sm:text-2xl font-black font-heading text-[var(--accent)]">
                    {ev.metric}
                  </div>
                  <div className="text-xs text-[var(--text)]">{ev.label}</div>
                  <div className="pt-1 flex items-center gap-1 text-[10px] font-mono">
                    {ev.verified ? (
                      <span className="text-[var(--success)] font-bold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified in repo</span>
                      </span>
                    ) : (
                      <span className="text-amber-500 font-bold flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" />
                        <span>Placeholder (Needs proof)</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Next Action Call (Slide 6) */}
          {slide.action && (
            <div className="p-6 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] max-w-xl space-y-3">
              <div className="text-base sm:text-xl font-bold font-heading text-[var(--text)]">
                {slide.action.headline}
              </div>
              <button className="btn-primary py-2.5 px-6 text-xs sm:text-sm font-bold shadow-lg">
                {slide.action.cta}
              </button>
            </div>
          )}
        </div>

        {/* Slide Footer */}
        <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)] pt-3 border-t border-[var(--border)] z-10">
          <span>Press ← → to switch slides</span>
          <span>Slide {currentSlide + 1} / {total}</span>
        </div>
      </div>

      {/* Speaker Notes Drawer */}
      {showSpeakerNotes && (
        <div className="w-full max-w-5xl mx-auto p-4 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] font-mono flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Speaker Notes (Slide {currentSlide + 1})</span>
          </div>
          <p className="text-xs text-[var(--text)] font-sans italic">
            "{slide.notes}"
          </p>
        </div>
      )}
    </div>
  );
};
