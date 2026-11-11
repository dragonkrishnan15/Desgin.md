import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  AlertTriangle 
} from 'lucide-react';

interface AnalyticsDashboardProps {
  compact?: boolean;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ compact = false }) => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [comparisonPeriod, setComparisonPeriod] = useState<'prev_period' | 'prev_year'>('prev_period');
  
  // Test case selector for acceptance criteria check
  const [testScenario, setTestScenario] = useState<'normal' | 'zero_prev' | 'missing_day' | 'negative'>('normal');

  // Exact Calculation Rule: Percentage change = (current - previous) / previous * 100
  // If previous is 0 or missing, show "n/a" instead of 0% or infinity
  const calculateChange = (current: number, previous: number | null | undefined): { text: string; isNegative: boolean; isNa: boolean } => {
    if (previous === null || previous === undefined || previous === 0) {
      return { text: 'n/a', isNegative: false, isNa: true };
    }
    const delta = ((current - previous) / previous) * 100;
    const sign = delta > 0 ? '+' : '';
    return {
      text: `${sign}${delta.toFixed(1)}%`,
      isNegative: delta < 0,
      isNa: false,
    };
  };

  // Mock metrics based on dateRange and testScenario
  const metricsData = useMemo(() => {
    if (testScenario === 'zero_prev') {
      return {
        primaryCurrent: 14250,
        primaryPrev: 0, // Zero denominator test case
        primaryLabel: 'Active Workflows Processed',
        unit: 'runs',
        denominator: 'per billing cycle',
        dauCurrent: 820,
        dauPrev: 0,
        latencyCurrent: 142,
        latencyPrev: 130,
      };
    }

    if (testScenario === 'negative') {
      return {
        primaryCurrent: 8400,
        primaryPrev: 12000, // Negative change
        primaryLabel: 'Active Workflows Processed',
        unit: 'runs',
        denominator: 'per billing cycle',
        dauCurrent: 610,
        dauPrev: 780,
        latencyCurrent: 198,
        latencyPrev: 145,
      };
    }

    // Normal based on date range
    const multiplier = dateRange === '7d' ? 1 : dateRange === '30d' ? 4 : 12;
    return {
      primaryCurrent: 18420 * multiplier,
      primaryPrev: 15600 * multiplier,
      primaryLabel: 'Active Workflows Processed',
      unit: 'runs',
      denominator: 'per billing cycle',
      dauCurrent: 1240,
      dauPrev: 1110,
      latencyCurrent: 124,
      latencyPrev: 138,
    };
  }, [dateRange, testScenario]);

  const primaryDelta = calculateChange(metricsData.primaryCurrent, metricsData.primaryPrev);
  const dauDelta = calculateChange(metricsData.dauCurrent, metricsData.dauPrev);
  const latencyDelta = calculateChange(metricsData.latencyCurrent, metricsData.latencyPrev);

  // Daily breakdown with missing-day support (testScenario === 'missing_day')
  const chartDays = [
    { day: 'Mon', value: 340, missing: false },
    { day: 'Tue', value: 420, missing: false },
    { day: 'Wed', value: testScenario === 'missing_day' ? null : 510, missing: testScenario === 'missing_day' },
    { day: 'Thu', value: 480, missing: false },
    { day: 'Fri', value: 620, missing: false },
    { day: 'Sat', value: 310, missing: false },
    { day: 'Sun', value: 290, missing: false },
  ];

  if (compact) {
    return (
      <div className="p-4 space-y-3 text-xs bg-[var(--bg)] text-[var(--text)] font-body h-full overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
          <div className="flex items-center gap-1.5 font-bold font-heading">
            <BarChart2 className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Analytics Overview</span>
          </div>
          <span className="badge-themed text-[9px] px-2 py-0.5">30d vs prev</span>
        </div>

        <div className="card p-3 space-y-1">
          <div className="text-[10px] text-[var(--muted)] font-mono uppercase">Primary Metric</div>
          <div className="text-xl font-black font-heading text-[var(--text)]">
            {metricsData.primaryCurrent.toLocaleString()} <span className="text-[10px] font-normal text-[var(--muted)]">{metricsData.unit}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono">
            {primaryDelta.isNegative ? (
              <span className="text-[var(--danger)] font-bold">↓ {primaryDelta.text}</span>
            ) : primaryDelta.isNa ? (
              <span className="text-[var(--muted)] font-bold">n/a (zero prev)</span>
            ) : (
              <span className="text-[var(--success)] font-bold">↑ {primaryDelta.text}</span>
            )}
            <span className="text-[var(--muted)]">vs prev period</span>
          </div>
        </div>

        <div className="flex items-end gap-1 h-16 pt-2 px-1">
          {chartDays.map(d => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              {d.missing ? (
                <div className="w-full h-full border border-dashed border-[var(--border)] rounded flex items-center justify-center text-[8px] text-[var(--muted)]">
                  gap
                </div>
              ) : (
                <div 
                  className="w-full bg-[var(--accent)] rounded-t transition-all"
                  style={{ height: `${(d.value! / 650) * 100}%` }}
                />
              )}
              <span className="text-[8px] text-[var(--muted)]">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-8 space-y-6 bg-[var(--bg)] text-[var(--text)] font-body min-h-[520px]">
      {/* Header with Period Controls and Acceptance Test Mode */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black font-heading tracking-[var(--tracking)]">
              Analytics Overview
            </h2>
            <span className="badge-themed text-[10px] font-mono">STRICT CALCULATION RULES</span>
          </div>
          <p className="text-xs text-[var(--muted)] pt-0.5">
            Numbers you can trust. No hidden zero substitutions or silent denominator assumptions.
          </p>
        </div>

        {/* Date Range, Comparison Period, and Test Case Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Acceptance test switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] text-xs">
            <span className="text-[10px] font-mono text-[var(--muted)] pl-1">Rule Test:</span>
            <select
              value={testScenario}
              onChange={e => setTestScenario(e.target.value as any)}
              className="bg-transparent text-[var(--text)] text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="normal" className="bg-[var(--surface)]">Standard Data</option>
              <option value="zero_prev" className="bg-[var(--surface)]">Zero Denominator ("n/a")</option>
              <option value="missing_day" className="bg-[var(--surface)]">Missing Day (Explicit Gap)</option>
              <option value="negative" className="bg-[var(--surface)]">Negative Change (Sign + Icon)</option>
            </select>
          </div>

          {/* Date range toggle */}
          <div className="flex items-center p-0.5 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] text-xs">
            {(['7d', '30d', '90d'] as const).map(d => (
              <button
                key={d}
                onClick={() => setDateRange(d)}
                className={`px-3 py-1 rounded-[calc(var(--radius)-2px)] font-bold transition-all ${
                  dateRange === d
                    ? 'bg-[var(--accent)] text-white shadow-sm'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Comparison period basis */}
          <select
            value={comparisonPeriod}
            onChange={e => setComparisonPeriod(e.target.value as any)}
            className="input-themed text-xs py-1 px-2.5 rounded-[var(--radius)] font-medium"
          >
            <option value="prev_period">vs Previous Period</option>
            <option value="prev_year">vs Previous Year</option>
          </select>
        </div>
      </div>

      {/* Primary KPI Hero Card */}
      <div className="card p-6 relative overflow-hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] font-mono">
                {metricsData.primaryLabel}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface2)] border border-[var(--border)] text-[var(--muted)]">
                Unit: {metricsData.unit} · {metricsData.denominator}
              </span>
            </div>
            <div className="text-3xl sm:text-5xl font-black font-heading text-[var(--text)] pt-1">
              {metricsData.primaryCurrent.toLocaleString()}
            </div>
          </div>

          {/* Explicit Delta Display */}
          <div className="p-3.5 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] sm:text-right shrink-0">
            <div className="text-[10px] uppercase font-mono text-[var(--muted)]">Percentage Change</div>
            <div className="flex items-center sm:justify-end gap-1.5 pt-0.5">
              {primaryDelta.isNa ? (
                <span className="text-sm font-bold font-mono text-[var(--muted)] px-2 py-0.5 rounded bg-[var(--surface)]">
                  n/a
                </span>
              ) : primaryDelta.isNegative ? (
                <span className="text-sm font-bold font-mono text-[var(--danger)] flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" />
                  <span>{primaryDelta.text}</span>
                </span>
              ) : (
                <span className="text-sm font-bold font-mono text-[var(--success)] flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>{primaryDelta.text}</span>
                </span>
              )}
            </div>
            <div className="text-[10px] text-[var(--muted)] pt-0.5 font-mono">
              Prev: {metricsData.primaryPrev > 0 ? metricsData.primaryPrev.toLocaleString() : '0 (no base)'}
            </div>
          </div>
        </div>

        {/* Daily Breakdown Histogram with Explicit Missing Data Gap Handling */}
        <div className="pt-2">
          <div className="flex items-center justify-between pb-2 text-xs">
            <span className="font-bold text-[var(--text)]">Daily Throughput Breakdown</span>
            {testScenario === 'missing_day' && (
              <span className="flex items-center gap-1 text-[11px] font-mono text-amber-500 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Explicit Data Gap on Wednesday (Never zeroed out)</span>
              </span>
            )}
          </div>

          <div className="h-44 flex items-end gap-2 sm:gap-4 p-3 rounded-[var(--radius)] bg-[var(--surface2)]/50 border border-[var(--border)]">
            {chartDays.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                {d.missing ? (
                  <div className="w-full h-full rounded border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center p-1 text-center bg-black/5">
                    <span className="text-[10px] font-mono text-[var(--muted)] font-bold">NO DATA</span>
                    <span className="text-[8px] text-[var(--muted)]">sensor offline</span>
                  </div>
                ) : (
                  <>
                    <span className="text-[10px] font-mono text-[var(--muted)] hidden sm:block">
                      {d.value}
                    </span>
                    <div 
                      className="w-full bg-[var(--accent)] hover:opacity-90 transition-all rounded-t-[calc(var(--radius)-4px)]"
                      style={{ height: `${(d.value! / 650) * 100}%` }}
                    />
                  </>
                )}
                <span className="text-xs font-mono font-bold text-[var(--muted)] pt-1">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supporting Metric Breakdowns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-[var(--muted)] font-mono">
            <span>Daily Active Users (DAU)</span>
            <span>unit: users</span>
          </div>
          <div className="text-2xl font-bold font-heading text-[var(--text)]">
            {metricsData.dauCurrent.toLocaleString()}
          </div>
          <div className="text-xs font-mono flex items-center gap-1.5">
            {dauDelta.isNegative ? (
              <span className="text-[var(--danger)] font-bold">↓ {dauDelta.text}</span>
            ) : dauDelta.isNa ? (
              <span className="text-[var(--muted)]">n/a</span>
            ) : (
              <span className="text-[var(--success)] font-bold">↑ {dauDelta.text}</span>
            )}
            <span className="text-[var(--muted)]">vs comparison period</span>
          </div>
        </div>

        <div className="card p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-[var(--muted)] font-mono">
            <span>P99 Engine Latency</span>
            <span>unit: milliseconds</span>
          </div>
          <div className="text-2xl font-bold font-heading text-[var(--text)]">
            {metricsData.latencyCurrent} ms
          </div>
          <div className="text-xs font-mono flex items-center gap-1.5">
            {/* For latency, negative delta is improvement (success) */}
            {latencyDelta.isNegative ? (
              <span className="text-[var(--success)] font-bold">↓ {latencyDelta.text} (improved)</span>
            ) : latencyDelta.isNa ? (
              <span className="text-[var(--muted)]">n/a</span>
            ) : (
              <span className="text-[var(--danger)] font-bold">↑ {latencyDelta.text} (degraded)</span>
            )}
            <span className="text-[var(--muted)]">target &lt; 200ms</span>
          </div>
        </div>
      </div>

      {/* Calculation Formula Verification Banner */}
      <div className="p-3.5 rounded-[var(--radius)] bg-[var(--surface2)] border border-[var(--border)] text-[11px] font-mono text-[var(--muted)] space-y-1">
        <div className="font-bold text-[var(--text)] uppercase tracking-wider">Formula Verification</div>
        <p>Percentage change computed strictly as <code className="text-[var(--accent)] font-bold">(current - previous) / previous × 100</code>. If previous is 0, outputs <span className="font-bold">n/a</span>. Missing data renders as an explicit gap, never 0.</p>
      </div>
    </div>
  );
};
