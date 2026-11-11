import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const PricingTemplate: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const tiers = [
    {
      name: 'Starter',
      price: billingCycle === 'yearly' ? '$19' : '$24',
      subtext: 'For individuals and seed stage developers',
      features: [
        'Up to 3 design environments',
        'Standard token exports (CSS/JSON)',
        'Community support',
        '100GB monthly bandwidth',
      ],
      cta: 'Start Free Trial',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: billingCycle === 'yearly' ? '$49' : '$59',
      subtext: 'For high-growth products and design studios',
      features: [
        'Unlimited design environments',
        'All 28 design style presets',
        'Custom token fine-tuning drawer',
        'WCAG AA contrast validator',
        'Priority SLA & edge routing',
      ],
      cta: 'Get Started with Pro',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: billingCycle === 'yearly' ? '$199' : '$240',
      subtext: 'For scaled engineering organizations and agencies',
      features: [
        'Custom design system synchronization',
        'Dedicated Cloudflare Pages edge routing',
        '24/7 dedicated engineering support',
        'SOC2 & HIPAA compliance export',
        'Custom SSO & audit logging',
      ],
      cta: 'Contact Enterprise',
      highlighted: false,
    },
  ];

  return (
    <div className="w-full bg-[var(--bg)] text-[var(--text)] py-12 px-4 sm:px-8 space-y-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black tracking-[var(--tracking)]">
          Predictable Pricing for High-Velocity Teams
        </h1>
        <p className="text-xs sm:text-base text-[var(--muted)] max-w-xl mx-auto">
          Start building for free, then scale seamlessly with unified token infrastructure.
        </p>

        {/* Toggle Billing */}
        <div className="inline-flex items-center p-1 rounded-full bg-[var(--surface2)] border border-[var(--border)] mt-4">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              billingCycle === 'monthly' ? 'bg-[var(--accent)] text-white shadow-sm' : 'text-[var(--muted)]'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              billingCycle === 'yearly' ? 'bg-[var(--accent)] text-white shadow-sm' : 'text-[var(--muted)]'
            }`}
          >
            <span>Annual</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* 3 Pricing Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--gap)] items-stretch">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`card p-8 flex flex-col justify-between space-y-6 ${
              tier.highlighted ? 'ring-2 ring-[var(--accent)] shadow-2xl relative' : ''
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full badge-themed text-[10px] uppercase font-bold tracking-wider">
                Most Popular
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-bold">{tier.name}</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">{tier.subtext}</p>
              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-4xl font-extrabold">{tier.price}</span>
                <span className="text-xs text-[var(--muted)]">/month</span>
              </div>

              <div className="space-y-3 pt-4 text-xs">
                {tier.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`w-full py-3 px-4 rounded-[var(--radius)] text-xs font-bold transition-all ${
                tier.highlighted
                  ? 'btn-primary shadow-lg'
                  : 'btn-secondary'
              }`}
            >
              <span>{tier.cta}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
