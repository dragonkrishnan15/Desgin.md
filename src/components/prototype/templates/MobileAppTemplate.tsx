import React from 'react';
import { 
  Send, 
  ArrowDownLeft, 
  Plus, 
  Sparkles, 
  Bell, 
  TrendingUp, 
  Wallet
} from 'lucide-react';

export const MobileAppTemplate: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto bg-[var(--bg)] text-[var(--text)] p-4 space-y-6">
      {/* Mobile Top App Bar */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-xs shadow-sm">
            SL
          </div>
          <div>
            <div className="text-[11px] text-[var(--muted)]">Welcome back,</div>
            <div className="text-xs font-bold text-[var(--text)]">Alex Vance</div>
          </div>
        </div>

        <button className="p-2 rounded-full card-subtle text-[var(--muted)] hover:text-[var(--text)]">
          <Bell className="w-4 h-4" />
        </button>
      </div>

      {/* Credit / Balance Card */}
      <div className="card p-6 space-y-5 bg-gradient-to-br from-[var(--surface)] to-[var(--surface2)] border border-[var(--border)] shadow-[var(--shadow)] relative overflow-hidden">
        <div className="flex justify-between items-center text-[var(--muted)] text-xs">
          <span>Total Balance</span>
          <Wallet className="w-4 h-4 text-[var(--accent)]" />
        </div>

        <div className="text-3xl font-extrabold tracking-tight">$34,820.50</div>

        <div className="flex items-center justify-between text-xs pt-2">
          <span className="font-mono text-[var(--muted)]">•••• 8492</span>
          <span className="px-2 py-0.5 rounded-full badge-themed text-[10px]">Active Visa</span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button className="card p-3 flex flex-col items-center gap-1.5 hover:bg-[var(--surface2)] transition-colors">
          <div className="w-8 h-8 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center">
            <Send className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold">Transfer</span>
        </button>

        <button className="card p-3 flex flex-col items-center gap-1.5 hover:bg-[var(--surface2)] transition-colors">
          <div className="w-8 h-8 rounded-full bg-[var(--accent2)]/15 text-[var(--accent2)] flex items-center justify-center">
            <ArrowDownLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold">Request</span>
        </button>

        <button className="card p-3 flex flex-col items-center gap-1.5 hover:bg-[var(--surface2)] transition-colors">
          <div className="w-8 h-8 rounded-full bg-[var(--success)]/15 text-[var(--success)] flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold">Top Up</span>
        </button>
      </div>

      {/* Recent Activity List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs font-bold">
          <span>Recent Activity</span>
          <span className="text-[var(--accent)] text-[11px] cursor-pointer">View All</span>
        </div>

        <div className="space-y-2">
          {[
            { title: 'Figma Subscription', cat: 'Software', amount: '-$15.00', icon: Sparkles },
            { title: 'Cloudflare Workers', cat: 'Hosting', amount: '-$20.00', icon: TrendingUp },
            { title: 'Stripe Payout', cat: 'Revenue', amount: '+$1,450.00', icon: Wallet },
          ].map((item, idx) => (
            <div key={idx} className="card p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[var(--radius)] bg-[var(--surface2)] flex items-center justify-center text-[var(--accent)]">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">{item.title}</div>
                  <div className="text-[10px] text-[var(--muted)]">{item.cat}</div>
                </div>
              </div>
              <span className={`text-xs font-mono font-bold ${item.amount.startsWith('+') ? 'text-[var(--success)]' : 'text-[var(--text)]'}`}>
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
