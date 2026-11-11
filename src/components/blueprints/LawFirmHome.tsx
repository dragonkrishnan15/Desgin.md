import React from 'react';
import { 
  Scale, 
  Briefcase, 
  Users, 
  FileText, 
  AlertCircle 
} from 'lucide-react';

interface LawFirmHomeProps {
  compact?: boolean;
}

export const LawFirmHome: React.FC<LawFirmHomeProps> = ({ compact = false }) => {

  const practiceAreas = [
    {
      title: 'Employment & Labor Law',
      desc: 'Advocacy for executive contracts, non-competes, workplace discrimination, and severance negotiations.',
      cases: 'Over 400 matters resolved across state & federal courts.',
    },
    {
      title: 'Family & Matrimonial Law',
      desc: 'Compassionate representation for asset distribution, custody arrangements, and generational estates.',
      cases: 'Mediation-first philosophy minimizing emotional and financial strain.',
    },
    {
      title: 'Business & Commercial Litigation',
      desc: 'Strategic counsel for partner disputes, breach of contract, intellectual property, and governance.',
      cases: 'Trusted general counsel to regional founders and privately held enterprises.',
    },
  ];

  if (compact) {
    return (
      <div className="p-4 space-y-3 text-xs bg-[var(--bg)] text-[var(--text)] font-body h-full overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
          <div className="flex items-center gap-1.5 font-bold font-heading">
            <Scale className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Ashford & Reyes</span>
          </div>
          <span className="badge-themed text-[9px] px-2 py-0.5">Legal Counsel</span>
        </div>

        <div className="card p-3 space-y-1.5 text-center">
          <div className="font-serif font-black text-sm text-[var(--text)] leading-tight">
            Counsel that stands beside you, not above you.
          </div>
          <p className="text-[10px] text-[var(--muted)] line-clamp-2">
            Employment, family, and commercial business litigation.
          </p>
          <div className="text-[9px] font-mono text-[var(--accent)] font-bold">[Figure to confirm]</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-12 bg-[var(--bg)] text-[var(--text)] font-body min-h-[520px]">
      {/* Firm Header */}
      <header className="w-full px-4 sm:px-8 py-4 border-b border-[var(--border)] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-[var(--accent)]" />
          <span className="text-lg font-black font-heading tracking-tight text-[var(--text)]">
            Ashford & Reyes <span className="text-xs font-normal text-[var(--muted)] font-serif italic">LLP</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[var(--muted)]">
          <a href="#practice" className="hover:text-[var(--text)] transition-colors">Practice Areas</a>
          <a href="#team" className="hover:text-[var(--text)] transition-colors">Our Team</a>
          <a href="#results" className="hover:text-[var(--text)] transition-colors">Results</a>
          <a href="#insights" className="hover:text-[var(--text)] transition-colors">Insights</a>
        </nav>

        <button className="btn-primary py-2 px-5 text-xs font-bold shadow-md">
          Free Consultation
        </button>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-20 text-center space-y-5">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
          Attorneys at Law · Established Practice
        </span>

        <h1 className="text-3xl sm:text-6xl font-black font-heading tracking-[var(--tracking)] text-[var(--text)] leading-tight">
          Counsel that stands beside you, not above you.
        </h1>

        <p className="text-sm sm:text-lg text-[var(--muted)] max-w-xl mx-auto leading-relaxed">
          Principled advocacy in employment disputes, family transitions, and commercial business litigation.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button className="btn-primary py-3 px-8 text-xs sm:text-sm font-bold shadow-lg">
            Book a Consultation
          </button>
          <button className="btn-secondary py-3 px-6 text-xs sm:text-sm font-semibold">
            See Our Practice Record →
          </button>
        </div>
      </section>

      {/* Row of Three Proof Numbers (With strict verification placeholders) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 py-4">
        <div className="card p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center border border-[var(--border)] bg-[var(--surface)]">
          <div className="space-y-1 p-2">
            <div className="text-2xl sm:text-4xl font-black font-heading text-[var(--accent)]">
              [Figure to confirm]
            </div>
            <div className="text-xs font-bold text-[var(--text)]">Years of Combined Trial Practice</div>
            <p className="text-[10px] text-[var(--muted)] font-mono">Senior partners trial history</p>
          </div>

          <div className="space-y-1 p-2 border-y md:border-y-0 md:border-x border-[var(--border)]">
            <div className="text-2xl sm:text-4xl font-black font-heading text-[var(--accent)]">
              [Figure to confirm]
            </div>
            <div className="text-xs font-bold text-[var(--text)]">Commercial & Employment Resolutions</div>
            <p className="text-[10px] text-[var(--muted)] font-mono">Client outcomes to verify</p>
          </div>

          <div className="space-y-1 p-2">
            <div className="text-2xl sm:text-4xl font-black font-heading text-[var(--accent)]">
              100%
            </div>
            <div className="text-xs font-bold text-[var(--text)]">Partner-Led Case Handling</div>
            <p className="text-[10px] text-[var(--muted)] font-mono">No junior delegate handoffs</p>
          </div>
        </div>
      </section>

      {/* Practice Areas Cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-wider">
            Areas of Focus
          </span>
          <h3 className="text-2xl font-bold font-heading text-[var(--text)]">
            Focused Experience Where It Matters Most
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {practiceAreas.map((area, i) => (
            <div key={i} className="card p-6 flex flex-col justify-between space-y-4 bg-[var(--surface)] border border-[var(--border)]">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-[var(--surface2)] flex items-center justify-center text-[var(--accent)]">
                  {i === 0 ? <Briefcase className="w-4 h-4" /> : i === 1 ? <Users className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                </div>
                <h4 className="text-base font-bold font-heading text-[var(--text)]">{area.title}</h4>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{area.desc}</p>
              </div>

              <div className="pt-2 border-t border-[var(--border)] text-[11px] text-[var(--muted)] font-mono">
                {area.cases}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Required Legal Disclaimer & Regulatory Slot */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 pt-6">
        <div className="p-4 rounded-[var(--radius)] bg-[var(--surface2)]/80 border border-[var(--border)] text-xs text-[var(--muted)] space-y-1.5 font-mono">
          <div className="font-bold text-[var(--text)] flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span>ATTORNEY ADVERTISING & MANDATORY REGULATORY NOTICE</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Prior results do not guarantee a similar outcome. The information on this website is for general informational purposes only and does not constitute formal legal advice. No attorney-client relationship is formed until a written engagement agreement is countersigned.
          </p>
          <div className="text-[10px] text-[var(--accent)] pt-1">
            [Insert firm's state bar registration numbers and responsible attorney contact details here before publication]
          </div>
        </div>
      </section>
    </div>
  );
};
