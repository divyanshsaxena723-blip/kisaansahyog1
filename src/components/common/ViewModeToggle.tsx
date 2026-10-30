import React from 'react';
import { useStore } from '../../store/useStore';
import { Smartphone, Monitor, Repeat, ShieldCheck } from 'lucide-react';

export const ViewModeToggle: React.FC = () => {
  const { viewMode, toggleViewMode, activeRole, setRole, language } = useStore();

  const isMobileApp = viewMode === 'app';

  return (
    <aside aria-label="Viewport Switcher" className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <button
        type="button"
        onClick={toggleViewMode}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#101F16] text-white shadow-2xl hover:bg-black active:scale-95 transition-all duration-200 border-2 border-[#E0A526] group backdrop-blur-md cursor-pointer"
        title="Toggle between Mobile App PWA Shell and Desktop Web UI"
      >
        <div className="w-8 h-8 rounded-full bg-[#2C5E2E] flex items-center justify-center text-[#E0A526] group-hover:rotate-180 transition-transform duration-300">
          <Repeat className="w-4 h-4" />
        </div>

        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#E0A526]">
              {language === 'hi' ? 'इंटरफ़ेस मोड' : 'Viewport Shell'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-xs font-black flex items-center gap-1">
            {isMobileApp ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                <span>Switch to Website View (डेस्कटॉप वेब)</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>Switch to App View (मोबाइल ऐप)</span>
              </>
            )}
          </span>
        </div>
      </button>

      {/* Quick Role Toggle Tag */}
      <button
        type="button"
        onClick={() => setRole(activeRole === 'farmer' ? 'buyer' : 'farmer')}
        className="hidden md:flex items-center gap-1 px-3 py-2 rounded-full bg-white text-[#2C5E2E] text-xs font-black shadow-lg border border-emerald-900/15 hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
        title="Quick Role Toggle"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-[#E0A526]" />
        <span>{activeRole === 'farmer' ? '🌾 Farmer' : '🏢 Buyer'}</span>
      </button>
    </aside>
  );
};
