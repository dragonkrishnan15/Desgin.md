import React from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { useStore } from '@/state/store';

export const ViewportToggle: React.FC = () => {
  const { viewport, setViewport } = useStore();

  const options: { id: 'desktop' | 'tablet' | 'mobile'; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'desktop', label: 'Desktop', icon: Monitor },
    { id: 'tablet', label: 'Tablet', icon: Tablet },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
  ];

  return (
    <div className="inline-flex items-center p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm">
      {options.map(({ id, label, icon: Icon }) => {
        const isActive = viewport === id;
        return (
          <button
            key={id}
            onClick={() => setViewport(id)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              isActive
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
            title={`Switch to ${label} preview`}
            aria-label={`Switch to ${label} preview`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
};

