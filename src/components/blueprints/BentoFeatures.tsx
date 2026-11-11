import React, { useState } from 'react';
import { 
  Zap, 
  Lock, 
  Globe2, 
  Server, 
  HelpCircle,
  EyeOff
} from 'lucide-react';

interface BentoFeaturesProps {
  compact?: boolean;
}

export const BentoFeatures: React.FC<BentoFeaturesProps> = ({ compact = false }) => {
  const [ssoActive, setSsoActive] = useState<string>('okta');
  const [testReducedMotion, setTestReducedMotion] = useState<boolean>(false);

  // Growth bars data for Tile 2
  const barHeights = [40, 65, 52, 85, 72, 95, 60, 88];

  if (compact) {
    return (
      <div className="p-4 space-y-3 text-xs bg-[var(--bg)] text-[var(--text)] font-body h-full overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
          <div className="flex items-center gap-1.5 font-bold font-heading">
            <Zap className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Bento Features</span>
          </div>
          <span className="badge-themed text-[9px] px-2 py-0.5">4 Tiles</span>
        </div>

        <div className="grid grid-cols-2 gap-2 h-44">
          <div className="card p-2 flex flex-col justify-between">
            <span className="text-[9px] font-mono text-[var(--accent)] font-bold">Real-time sync</span>
            <div className="text-[10px] font-bold">14 regions connected</div>
          </div>
          <div className="card p-2 flex flex-col justify-between">
            <span className="text-[9px] font-mono text-[var(--muted)]">99.99% Uptime</span>
            <div className="w-6 h-6 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin mx-auto" />
          </div>
          <div className="card col-span-2 p-2 flex items-center justify-between">
            <span className="text-[10px] font-bold">SSO Authentication</span>
            <Lock className="w-3.5 h-3.5 text-[var(--accent)]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-8 space-y-8 bg-[var(--bg)] text-[var(--text)] font-body min-h-[520px]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <span className="text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-wider">
            Architecture Features
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-heading tracking-[var(--tracking)] text-[var(--text)] pt-1">
            Everything your team needs. Nothing it does not.
          </h2>
        </div>

        {/* Reduced motion toggle */}
        <button
          onClick={() => setTestReducedMotion(!testReducedMotion)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius)] text-xs font-semibold border transition-all self-start sm:self-auto ${
            testReducedMotion
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-[var(--surface2)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--text)]'
          }`}
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span>{testReducedMotion ? 'Reduced Motion: ON' : 'Test Reduced Motion'}</span>
        </button>
      </div>

      {/* 4 Bento Tiles Layout: 2 large + 2 small */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 max-w-5xl mx-auto">
        {/* Tile 1: Large Tile (7 cols) - Real-time Sync */}
        <div className="md:col-span-7 card p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden bg-[var(--surface)] border border-[var(--border)]">
          <div className="space-y-2 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
              <span className="text-xs font-mono uppercase font-bold text-[var(--accent)] tracking-wider">
                Live Sub-Millisecond Replication
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-[var(--text)]">
              Real-time Global Sync
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] max-w-md leading-relaxed">
              Every token mutation, style selection, and user bucket save broadcasts across connected browser sessions without database poll loops.
            </p>
          </div>

          {/* Interactive node visualization */}
          <div className="p-4 rounded-[var(--radius)] bg-[var(--surface2)]/80 border border-[var(--border)] font-mono text-xs flex items-center justify-between z-10">
            <div className="flex items-center gap-2.5">
              <Server className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-[var(--text)] font-bold">edge-node-iad1</span>
            </div>
            <span className="text-[11px] text-[var(--success)] font-bold">● Active (0.4ms)</span>
          </div>
        </div>

        {/* Tile 2: Live Analytics Growing Bars (5 cols) */}
        <div className="md:col-span-5 card p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[var(--surface)] border border-[var(--border)]">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase font-bold text-[var(--accent)] tracking-wider">
              Telemetry
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-heading text-[var(--text)]">
              Live Analytics
            </h3>
            <p className="text-xs text-[var(--muted)]">
              Automatic metrics capture with staggered animation.
            </p>
          </div>

          {/* Staggered animated bar visualizer */}
          <div className="h-28 flex items-end gap-2 p-3 rounded-[var(--radius)] bg-[var(--surface2)]/70 border border-[var(--border)]">
            {barHeights.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div 
                  className="w-full bg-[var(--accent)] rounded-t transition-all"
                  style={{ 
                    height: testReducedMotion ? `${h}%` : `${h}%`,
                    transitionDuration: testReducedMotion ? '0ms' : `${300 + i * 80}ms`
                  }} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tile 3: 99.99% Uptime with Slowly Spinning Ring (5 cols) */}
        <div className="md:col-span-5 card p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[var(--surface)] border border-[var(--border)]">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>[Confirm before publishing]</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black font-heading text-[var(--text)]">
              99.99% Uptime
            </h3>
            <p className="text-xs text-[var(--muted)]">
              Across 14 distributed edge availability regions.
            </p>
          </div>

          {/* Slowly Spinning Ring (40s linear rotation, stopped on reduced motion) */}
          <div className="py-2 flex items-center justify-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div 
                className={`absolute inset-0 rounded-full border-2 border-[var(--border)] border-t-[var(--accent)] border-r-[var(--accent)] ${
                  testReducedMotion ? '' : 'animate-spin'
                }`}
                style={{ animationDuration: '40s' }}
              />
              <div className="text-center">
                <Globe2 className="w-6 h-6 text-[var(--accent)] mx-auto" />
                <span className="text-[10px] font-mono font-bold text-[var(--muted)]">14 Zones</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tile 4: SSO with Okta, Google and Azure (7 cols) */}
        <div className="md:col-span-7 card p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[var(--surface)] border border-[var(--border)]">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase font-bold text-[var(--accent)] tracking-wider">
                Access Security
              </span>
              <h3 className="text-2xl font-black font-heading text-[var(--text)]">
                Enterprise SSO
              </h3>
              <p className="text-xs text-[var(--muted)]">
                Pre-configured SAML 2.0 & OIDC providers.
              </p>
            </div>
            <div className="p-2.5 rounded-full bg-[var(--surface2)] text-[var(--accent)]">
              <Lock className="w-5 h-5" />
            </div>
          </div>

          {/* Interactive Provider Badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'okta', name: 'Okta Verify' },
              { id: 'google', name: 'Google Workspace' },
              { id: 'azure', name: 'Azure Active Directory' },
            ].map(prov => (
              <button
                key={prov.id}
                onClick={() => setSsoActive(prov.id)}
                className={`p-3 rounded-[var(--radius)] border text-left transition-all ${
                  ssoActive === prov.id
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md'
                    : 'bg-[var(--surface2)] border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)]'
                }`}
              >
                <div className="text-[10px] font-mono opacity-80 uppercase">Provider</div>
                <div className="font-bold text-xs pt-0.5 truncate">{prov.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
