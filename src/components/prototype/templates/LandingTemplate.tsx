import React from 'react';
import { ArrowRight, Sparkles, Shield, Zap, TrendingUp } from 'lucide-react';

export const LandingTemplate: React.FC = () => {
  return (
    <div className="w-full bg-[var(--bg)] text-[var(--text)] min-h-screen space-y-16 py-8 px-4 sm:px-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-12 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-themed text-xs">
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>Next-Generation Software Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-[var(--tracking)] leading-tight max-w-4xl mx-auto">
          Scale Infrastructure at the Speed of Thought
        </h1>

        <p className="text-base sm:text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          Zero-overhead distributed cloud orchestration. Build, automate, and deploy mission-critical systems with mathematical certainty.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button className="btn-primary py-3 px-8 text-sm font-bold shadow-[var(--shadow)]">
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="btn-secondary py-3 px-8 text-sm font-semibold">
            <span>Schedule Demo</span>
          </button>
        </div>
      </section>

      {/* Stats Counter Banner */}
      <section className="card p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[var(--accent)]">99.99%</div>
          <div className="text-xs text-[var(--muted)] pt-1">Uptime SLA</div>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[var(--text)]">14.2M</div>
          <div className="text-xs text-[var(--muted)] pt-1">Daily Requests</div>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[var(--accent2)]">0.8ms</div>
          <div className="text-xs text-[var(--muted)] pt-1">Edge Latency</div>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[var(--success)]">120+</div>
          <div className="text-xs text-[var(--muted)] pt-1">Global Regions</div>
        </div>
      </section>

      {/* Feature Spotlight */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Engineered for Global Resilience</h2>
          <p className="text-xs sm:text-sm text-[var(--muted)]">Continuous replication across fault-tolerant edge clusters</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--gap)]">
          <div className="card p-6 space-y-4">
            <div className="w-12 h-12 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Sub-Millisecond Cold Starts</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              V8 isolates spin up in less than a millisecond, eliminating idle server expenses while preserving responsiveness.
            </p>
          </div>

          <div className="card p-6 space-y-4">
            <div className="w-12 h-12 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] flex items-center justify-center text-[var(--accent2)]">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Zero-Trust Cryptography</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Automated mutual TLS, hardware-backed key attestation, and compliant audit trails across all environments.
            </p>
          </div>

          <div className="card p-6 space-y-4">
            <div className="w-12 h-12 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] flex items-center justify-center text-[var(--success)]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Instant Elastic Scaling</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Dynamically handle million-request traffic surges with autonomous compute allocation and global cache warming.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Card */}
      <section className="card p-8 sm:p-12 text-center space-y-6 border border-[var(--border)] shadow-[var(--shadow)]">
        <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to modernize your infrastructure?</h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] max-w-lg mx-auto">
          Deploy your first cluster in under three minutes. No credit card required.
        </p>
        <button className="btn-primary py-3.5 px-8 text-sm font-bold shadow-lg">
          <span>Get Started Free</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
