import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  Sprout,
  Search,
  Mic,
  Sparkles,
  Bell,
  Languages,
  LogOut,
  CheckCircle2
} from 'lucide-react';

interface WebHeaderProps {
  onOpenVoiceAssistant?: () => void;
  onTriggerAiCopilot?: (query?: string) => void;
}

export const WebHeader: React.FC<WebHeaderProps> = ({
  onOpenVoiceAssistant,
  onTriggerAiCopilot
}) => {
  const {
    activeRole,
    language,
    toggleLanguage,
    notifications,
    setIsNotificationsOpen,
    setIsAuthModalOpen,
    farmerProfile,
    buyerProfile,
    logout
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onTriggerAiCopilot) {
      onTriggerAiCopilot(searchQuery.trim());
    } else if (onOpenVoiceAssistant) {
      onOpenVoiceAssistant();
    }
  };

  return (
    <header className="sticky top-0 z-40 h-18 bg-[#FAF6EE] border-b border-stone-200/80 px-6 sm:px-8 flex items-center justify-between gap-4 shadow-xs select-none">
      {/* 1. Left Brand Identity */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-2xl bg-[#2C5E2E] flex items-center justify-center text-white shadow-md shadow-emerald-950/20">
          <Sprout className="w-6 h-6 text-[#E0A526]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-black text-xl text-[#2C5E2E] tracking-tight">
              Kisaan<span className="text-[#E0A526]">Sahyog</span>
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#166534] tracking-wide block -mt-0.5">
            किसान सहायता पोर्टल
          </span>
        </div>
      </div>

      {/* 2. Central Search Input */}
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg hidden md:flex items-center justify-center">
        <div className="relative w-96 flex items-center">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="फसल का भाव, मौसम, या योजना खोजें..."
            className="w-96 h-10 pl-10 pr-11 rounded-full bg-white border border-stone-200 text-xs sm:text-sm font-semibold text-[#101F16] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2C5E2E] shadow-2xs transition-all"
          />
          <button
            type="button"
            onClick={onOpenVoiceAssistant}
            className="w-7 h-7 rounded-full bg-[#2C5E2E] text-white flex items-center justify-center absolute right-1.5 hover:bg-emerald-800 transition-colors shadow-xs"
            title="बोलकर पूछें (Voice Search in Hindi)"
          >
            <Mic className="w-3.5 h-3.5 text-[#E0A526]" />
          </button>
        </div>
      </form>

      {/* 3. Action Buttons (Right) */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* ✨ AI Sahayak Button */}
        <button
          type="button"
          onClick={() => {
            if (onTriggerAiCopilot) {
              onTriggerAiCopilot('सीतापुर में आज का गेहूं भाव और मौसम पूर्वानुमान क्या है?');
            } else if (onOpenVoiceAssistant) {
              onOpenVoiceAssistant();
            }
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 text-xs font-bold transition-colors shadow-2xs"
          title="AI Agronomist Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E0A526]" />
          <span>✨ AI Sahayak</span>
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          onClick={() => setIsNotificationsOpen(true)}
          className="relative p-2 rounded-full bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 transition-colors shadow-2xs"
          title="Notifications"
        >
          <Bell className="w-4 h-4 text-[#2C5E2E]" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white">
            {unreadCount > 0 ? unreadCount : 3}
          </span>
        </button>

        {/* Language Toggle: EN / हिन्दी */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-stone-800 border border-stone-200 text-xs font-bold hover:bg-stone-50 transition-colors shadow-2xs"
          title="Change Language"
        >
          <Languages className="w-3.5 h-3.5 text-[#E0A526]" />
          <span>{language === 'pa' ? 'ਪੰਜਾਬੀ (PA)' : language === 'hi' ? 'हिन्दी (HI)' : 'English (EN)'}</span>
        </button>

        <div className="h-6 w-[1px] bg-stone-200 hidden sm:block mx-0.5" />

        {/* User Badge: Ramchandra (Verified Kisan) */}
        <button
          type="button"
          onClick={() => setIsAuthModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-left hover:bg-stone-50 transition-colors shadow-2xs"
          title="User Profile"
        >
          <div className="w-7 h-7 rounded-full bg-[#2C5E2E] text-white flex items-center justify-center font-bold text-xs shrink-0">
            {activeRole === 'farmer' ? 'RP' : 'VS'}
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-black text-[#101F16] leading-tight">
              {activeRole === 'farmer' ? 'Ramchandra' : buyerProfile.companyName.split(' ')[0]}
            </span>
            <span className="text-[10px] text-emerald-800 font-bold flex items-center gap-0.5 leading-tight">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              {activeRole === 'farmer' ? 'Verified Kisan' : 'Verified Buyer'}
            </span>
          </div>
        </button>

        {/* Logout Button */}
        <button
          type="button"
          onClick={() => logout()}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-700 border border-stone-200 text-xs font-bold transition-colors shadow-2xs"
          title="लॉगआउट"
        >
          <LogOut className="w-3.5 h-3.5 text-stone-500 hover:text-red-600" />
          <span className="hidden sm:inline">लॉगआउट</span>
        </button>
      </div>
    </header>
  );
};
