import React, { useState } from 'react';
import { 
  Flame, 
  Clock, 
  MapPin, 
  Users, 
  Calendar, 
  X 
} from 'lucide-react';

interface RestaurantHomeProps {
  compact?: boolean;
}

export const RestaurantHome: React.FC<RestaurantHomeProps> = ({ compact = false }) => {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('Today, 7:30 PM');

  if (compact) {
    return (
      <div className="p-4 space-y-3 text-xs bg-[var(--bg)] text-[var(--text)] font-body h-full overflow-hidden select-none">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
          <div className="flex items-center gap-1.5 font-bold font-heading">
            <Flame className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Osteria Lume</span>
          </div>
          <span className="badge-themed text-[9px] px-2 py-0.5">Wood-Fire</span>
        </div>

        <div className="card p-3 space-y-2 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[var(--accent)] font-mono">
            Wood fire · Fresh pasta
          </span>
          <div className="font-black font-heading text-base leading-tight text-[var(--text)]">
            Slow food, quick to love.
          </div>
          <p className="text-[10px] text-[var(--muted)] line-clamp-2">
            Handcrafted pasta and low-intervention natural wines.
          </p>
          <button className="btn-primary py-1 px-3 text-[10px] font-bold mx-auto">
            Book Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-20 sm:pb-8 bg-[var(--bg)] text-[var(--text)] font-body min-h-[520px] relative">
      {/* Restaurant Header */}
      <header className="w-full px-4 sm:px-8 py-4 border-b border-[var(--border)] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-serif font-black text-sm">
            L
          </div>
          <span className="text-lg font-black font-heading tracking-tight text-[var(--text)]">
            Osteria Lume
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[var(--muted)]">
          <a href="#menu" className="hover:text-[var(--text)] transition-colors">Menu</a>
          <a href="#wine" className="hover:text-[var(--text)] transition-colors">Wine List</a>
          <a href="#private" className="hover:text-[var(--text)] transition-colors">Private Dining</a>
          <a href="#story" className="hover:text-[var(--text)] transition-colors">Story</a>
        </nav>

        <button 
          onClick={() => setIsReserveModalOpen(true)}
          className="btn-primary py-2 px-5 text-xs font-bold shadow-md"
        >
          Reserve Table
        </button>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-20 text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface2)] border border-[var(--border)] text-xs font-mono font-bold text-[var(--accent)]">
          <Flame className="w-3.5 h-3.5" />
          <span>Wood fire · Fresh pasta</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-black font-heading tracking-[var(--tracking)] text-[var(--text)] leading-tight">
          Slow food, quick to love.
        </h1>

        <p className="text-sm sm:text-lg text-[var(--muted)] max-w-xl mx-auto leading-relaxed">
          Daily handmade extruded pastas, wood-fired hearth cooking, and an honest cellar of low-intervention Italian wines.
        </p>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button 
            onClick={() => setIsReserveModalOpen(true)}
            className="btn-primary py-3 px-8 text-xs sm:text-sm font-bold shadow-lg"
          >
            Book a Table
          </button>
          <button className="btn-secondary py-3 px-6 text-xs sm:text-sm font-semibold">
            View the Menu →
          </button>
        </div>
      </section>

      {/* Three Info Blocks with Strict Verified Placeholders */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Hours Card */}
          <div className="card p-6 space-y-3 bg-[var(--surface)] border border-[var(--border)]">
            <div className="w-8 h-8 rounded-full bg-[var(--surface2)] flex items-center justify-center text-[var(--accent)]">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-base font-heading text-[var(--text)]">Service Hours</h4>
            <div className="space-y-1 font-mono text-xs">
              <div className="text-[var(--accent)] font-bold">[Hours to confirm]</div>
              <div className="text-[var(--muted)]">Dinner: Wed – Sun from 5:30 PM</div>
              <div className="text-[var(--muted)]">Lunch: Sat & Sun 12:00 – 3:00 PM</div>
            </div>
          </div>

          {/* Location & Address Card */}
          <div className="card p-6 space-y-3 bg-[var(--surface)] border border-[var(--border)]">
            <div className="w-8 h-8 rounded-full bg-[var(--surface2)] flex items-center justify-center text-[var(--accent)]">
              <MapPin className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-base font-heading text-[var(--text)]">Location & Parking</h4>
            <div className="space-y-1 font-mono text-xs">
              <div className="text-[var(--accent)] font-bold">[Address to confirm]</div>
              <div className="text-[var(--muted)]">Valet parking available at hearth entrance</div>
              <div className="text-[var(--muted)]">Tel: [Phone number to confirm]</div>
            </div>
          </div>

          {/* Private Dining Card */}
          <div className="card p-6 space-y-3 bg-[var(--surface)] border border-[var(--border)]">
            <div className="w-8 h-8 rounded-full bg-[var(--surface2)] flex items-center justify-center text-[var(--accent)]">
              <Users className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-base font-heading text-[var(--text)]">Private Dining</h4>
            <div className="space-y-1 text-xs text-[var(--muted)]">
              <p>The Cantina accommodates groups of 8 to 24 with custom 4-course wood-fire tasting menus.</p>
              <div className="pt-1 text-[var(--accent)] font-semibold cursor-pointer hover:underline">
                Inquire for celebrations →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bottom Reserve Bar (44px Minimum Touch Target Rule) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-[var(--bg)]/90 backdrop-blur-xl border-t border-[var(--border)] flex items-center justify-between gap-3 shadow-2xl">
        <div className="text-left">
          <div className="text-xs font-bold text-[var(--text)] font-heading">Osteria Lume</div>
          <div className="text-[10px] font-mono text-[var(--muted)]">[Hours to confirm]</div>
        </div>
        <button
          onClick={() => setIsReserveModalOpen(true)}
          className="btn-primary min-h-[44px] px-6 text-xs font-bold shadow-lg flex items-center justify-center gap-1.5"
        >
          <Calendar className="w-4 h-4" />
          <span>Reserve</span>
        </button>
      </div>

      {/* Reservation Dialog Modal */}
      {isReserveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="card p-6 w-full max-w-md space-y-4 bg-[var(--surface)] border border-[var(--border)] relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading text-[var(--text)]">Book a Table</h3>
              <button 
                onClick={() => setIsReserveModalOpen(false)}
                className="p-1 rounded-full text-[var(--muted)] hover:text-[var(--text)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[var(--muted)]">Number of Guests</label>
                <select 
                  value={guests} 
                  onChange={e => setGuests(e.target.value)}
                  className="input-themed w-full p-2 rounded-[var(--radius)]"
                >
                  <option value="2">2 Guests (Dining Room)</option>
                  <option value="4">4 Guests (Hearth View)</option>
                  <option value="6">6 Guests (Booth)</option>
                  <option value="8+">8+ Guests (Cantina Group)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-[var(--muted)]">Date & Time</label>
                <input 
                  type="text" 
                  value={date} 
                  onChange={e => setDate(e.target.value)}
                  className="input-themed w-full p-2 rounded-[var(--radius)]"
                />
              </div>

              <div className="p-3 rounded bg-[var(--surface2)] font-mono text-[10px] text-[var(--muted)]">
                Demo reservation booking: no actual table is held without verified restaurant integration.
              </div>
            </div>

            <button 
              onClick={() => setIsReserveModalOpen(false)}
              className="btn-primary w-full py-2.5 text-xs font-bold"
            >
              Confirm Reservation Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
