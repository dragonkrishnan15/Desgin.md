import React from 'react';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  MoreVertical
} from 'lucide-react';

export const DashboardTemplate: React.FC = () => {
  return (
    <div className="w-full bg-[var(--bg)] text-[var(--text)] p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[var(--tracking)]">System Overview</h1>
          <p className="text-xs text-[var(--muted)]">Real-time telemetry and revenue throughput</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="btn-secondary px-3.5 py-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-[var(--muted)]" />
            <span>Filter</span>
          </button>
          <button className="btn-primary px-4 py-2 text-xs shadow-[var(--shadow)]">
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--gap)]">
        <div className="card p-5 space-y-2">
          <div className="flex items-center justify-between text-[var(--muted)] text-xs">
            <span>Monthly Recurring</span>
            <DollarSign className="w-4 h-4 text-[var(--accent)]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[var(--text)]">$148,220</div>
          <div className="flex items-center gap-1 text-[11px] text-[var(--success)] font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+14.8% from last month</span>
          </div>
        </div>

        <div className="card p-5 space-y-2">
          <div className="flex items-center justify-between text-[var(--muted)] text-xs">
            <span>Active Workspaces</span>
            <Users className="w-4 h-4 text-[var(--accent2)]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[var(--text)]">3,842</div>
          <div className="flex items-center gap-1 text-[11px] text-[var(--success)] font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+8.2% new teams</span>
          </div>
        </div>

        <div className="card p-5 space-y-2">
          <div className="flex items-center justify-between text-[var(--muted)] text-xs">
            <span>Edge Compute Requests</span>
            <Activity className="w-4 h-4 text-[var(--accent)]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[var(--text)]">98.4M</div>
          <div className="flex items-center gap-1 text-[11px] text-[var(--success)] font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+22.1% throughput</span>
          </div>
        </div>

        <div className="card p-5 space-y-2">
          <div className="flex items-center justify-between text-[var(--muted)] text-xs">
            <span>Mean Response Time</span>
            <BarChart3 className="w-4 h-4 text-[var(--muted)]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[var(--text)]">18.4ms</div>
          <div className="flex items-center gap-1 text-[11px] text-[var(--danger)] font-semibold">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>-2.1ms lower (faster)</span>
          </div>
        </div>
      </div>

      {/* Analytics Chart & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)]">
        {/* Main Chart */}
        <div className="lg:col-span-8 card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold">Throughput &amp; Ingestion Curve</h3>
              <p className="text-[11px] text-[var(--muted)]">Aggregated requests per minute</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
              <span className="text-xs text-[var(--muted)]">Active Workers</span>
            </div>
          </div>

          <div className="h-48 w-full pt-4">
            <svg className="w-full h-full" viewBox="0 0 600 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,120 Q80,40 160,80 T320,50 T480,90 T600,20 L600,160 L0,160 Z"
                fill="url(#dashGrad)"
              />
              <path
                d="M0,120 Q80,40 160,80 T320,50 T480,90 T600,20"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="600" cy="20" r="5" fill="var(--accent)" stroke="var(--bg)" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Region Breakdown */}
        <div className="lg:col-span-4 card p-6 space-y-4">
          <h3 className="text-sm font-bold">Traffic by Geography</h3>
          <div className="space-y-3 pt-2 text-xs">
            {[
              { region: 'North America (iad1)', share: '46%', width: '46%' },
              { region: 'Europe West (fra1)', share: '28%', width: '28%' },
              { region: 'Asia East (tyo1)', share: '18%', width: '18%' },
              { region: 'South America (gru1)', share: '8%', width: '8%' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between">
                  <span>{item.region}</span>
                  <span className="font-mono font-bold text-[var(--accent)]">{item.share}</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--surface2)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: item.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Records Table */}
      <div className="card p-6 space-y-4">
        <h3 className="text-sm font-bold">Recent Cluster Deployments</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--muted)] pb-2">
                <th className="py-2.5 font-medium">Deployment ID</th>
                <th className="py-2.5 font-medium">Environment</th>
                <th className="py-2.5 font-medium">Status</th>
                <th className="py-2.5 font-medium">Latency</th>
                <th className="py-2.5 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {[
                { id: 'dep-9824', env: 'Production (US)', status: 'Healthy', time: '1.2ms' },
                { id: 'dep-9823', env: 'Staging (EU)', status: 'Healthy', time: '2.4ms' },
                { id: 'dep-9822', env: 'Production (AP)', status: 'Syncing', time: '4.8ms' },
                { id: 'dep-9821', env: 'Canary Beta', status: 'Healthy', time: '0.9ms' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[var(--surface2)]/50 transition-colors">
                  <td className="py-3 font-mono font-bold text-[var(--accent)]">{row.id}</td>
                  <td className="py-3 font-medium">{row.env}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full badge-themed text-[10px]">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-[var(--muted)]">{row.time}</td>
                  <td className="py-3 text-right">
                    <button className="p-1 text-[var(--muted)] hover:text-[var(--text)]">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

