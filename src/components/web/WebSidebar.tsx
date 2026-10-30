import React from 'react';
import { useStore, FarmerTab, BuyerTab } from '../../store/useStore';
import {
  Sparkles,
  Calculator,
  Tag,
  Handshake,
  Store,
  Package,
  UserCheck,
  PhoneCall,
  Mic,
  Home
} from 'lucide-react';

interface WebSidebarProps {
  onOpenVoiceAssistant?: () => void;
}

export const WebSidebar: React.FC<WebSidebarProps> = ({ onOpenVoiceAssistant }) => {
  const {
    activeRole,
    setRole,
    farmerTab,
    setFarmerTab,
    buyerTab,
    setBuyerTab,
    language,
    orders
  } = useStore();

  const pendingRequestsCount = orders.filter((o) => o.status === 'token_requested').length;

  return (
    <aside className="w-64 min-h-[calc(100vh-4.5rem)] bg-[#FAF6EE] border-r border-stone-200/80 p-4 flex flex-col justify-between shrink-0 select-none">
      <div className="space-y-5">
        {/* Role Switcher at Top: Segmented Pill Toggle */}
        <div className="p-1 bg-stone-100 rounded-2xl border border-stone-200/80 flex items-center gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => setRole('farmer')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeRole === 'farmer'
                ? 'bg-[#2C5E2E] text-white shadow-xs'
                : 'bg-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            🌾 {language === 'hi' ? 'किसान (Farmer)' : 'Farmer'}
          </button>
          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeRole === 'buyer'
                ? 'bg-[#2C5E2E] text-white shadow-xs'
                : 'bg-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            🏢 {language === 'hi' ? 'खरीदार (Buyer)' : 'Buyer'}
          </button>
        </div>

        {/* Navigation Tabs */}
        {activeRole === 'farmer' ? (
          <nav className="space-y-1.5" aria-label="Farmer Navigation">
            {/* 1. AI Sahyog */}
            <button
              type="button"
              onClick={() => setFarmerTab('home')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left ${
                farmerTab === 'home'
                  ? 'bg-[#2C5E2E] text-white shadow-sm'
                  : 'text-[#4A2C17] hover:bg-stone-200/60'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${farmerTab === 'home' ? 'text-[#E0A526]' : 'text-[#2C5E2E]'}`} />
              <span>{language === 'hi' ? 'AI Sahyog (सहयोग)' : 'AI Sahyog (Copilot)'}</span>
            </button>

            {/* 2. Profit Engine */}
            <button
              type="button"
              onClick={() => setFarmerTab('profit')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left ${
                farmerTab === 'profit'
                  ? 'bg-[#2C5E2E] text-white shadow-sm'
                  : 'text-[#4A2C17] hover:bg-stone-200/60'
              }`}
            >
              <Calculator className={`w-4 h-4 ${farmerTab === 'profit' ? 'text-[#E0A526]' : 'text-[#2C5E2E]'}`} />
              <span>{language === 'hi' ? 'Profit Engine (मुनाफ़ा)' : 'Profit Engine'}</span>
            </button>

            {/* 3. Marketplace */}
            <button
              type="button"
              onClick={() => setFarmerTab('listings')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left ${
                farmerTab === 'listings'
                  ? 'bg-[#2C5E2E] text-white shadow-sm'
                  : 'text-[#4A2C17] hover:bg-stone-200/60'
              }`}
            >
              <Tag className={`w-4 h-4 ${farmerTab === 'listings' ? 'text-[#E0A526]' : 'text-[#2C5E2E]'}`} />
              <span>{language === 'hi' ? 'Marketplace (फसल बेचें)' : 'Marketplace (Sell)'}</span>
            </button>

            {/* 4. Deals & Escrow */}
            <button
              type="button"
              onClick={() => setFarmerTab('deals')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left ${
                farmerTab === 'deals'
                  ? 'bg-[#2C5E2E] text-white shadow-sm'
                  : 'text-[#4A2C17] hover:bg-stone-200/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Handshake className={`w-4 h-4 ${farmerTab === 'deals' ? 'text-[#E0A526]' : 'text-[#2C5E2E]'}`} />
                <span>{language === 'hi' ? 'Deals & Escrow (सौदे)' : 'Deals & Escrow'}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#E0A526] text-[#4A2C17] animate-pulse">
                {pendingRequestsCount > 0 ? `${pendingRequestsCount} New` : '1 New'}
              </span>
            </button>
          </nav>
        ) : (
          <nav className="space-y-1.5" aria-label="Buyer Navigation">
            {/* 1. Bazaar */}
            <button
              type="button"
              onClick={() => setBuyerTab('bazaar')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left ${
                buyerTab === 'bazaar'
                  ? 'bg-[#2C5E2E] text-white shadow-sm'
                  : 'text-[#4A2C17] hover:bg-stone-200/60'
              }`}
            >
              <Store className={`w-4 h-4 ${buyerTab === 'bazaar' ? 'text-[#E0A526]' : 'text-[#2C5E2E]'}`} />
              <span>{language === 'hi' ? 'Bazaar (थोक बाज़ार)' : 'Bazaar (Commodities)'}</span>
            </button>

            {/* 2. Orders & Escrow */}
            <button
              type="button"
              onClick={() => setBuyerTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left ${
                buyerTab === 'orders'
                  ? 'bg-[#2C5E2E] text-white shadow-sm'
                  : 'text-[#4A2C17] hover:bg-stone-200/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className={`w-4 h-4 ${buyerTab === 'orders' ? 'text-[#E0A526]' : 'text-[#2C5E2E]'}`} />
                <span>{language === 'hi' ? 'Orders & Escrow (ऑर्डर)' : 'Orders & Escrow'}</span>
              </div>
              {orders.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#E0A526] text-[#4A2C17]">
                  {orders.length}
                </span>
              )}
            </button>

            {/* 3. Profile & License */}
            <button
              type="button"
              onClick={() => setBuyerTab('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left ${
                buyerTab === 'profile'
                  ? 'bg-[#2C5E2E] text-white shadow-sm'
                  : 'text-[#4A2C17] hover:bg-stone-200/60'
              }`}
            >
              <UserCheck className={`w-4 h-4 ${buyerTab === 'profile' ? 'text-[#E0A526]' : 'text-[#2C5E2E]'}`} />
              <span>{language === 'hi' ? 'Profile & License (प्रोफ़ाइल)' : 'Profile & KYC'}</span>
            </button>
          </nav>
        )}
      </div>

      {/* Bottom Call Center Card */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2 mt-6">
        <div className="flex items-center gap-2 text-[#2C5E2E] font-black text-xs">
          <PhoneCall className="w-4 h-4 text-[#2C5E2E]" />
          <span>Kisaan Call Center</span>
        </div>
        <p className="text-[11px] font-mono font-bold text-stone-800">
          Toll Free: 1800-180-1551
        </p>
        <p className="text-[10px] text-stone-500 font-medium">
          24x7 Government Agronomy Support
        </p>
        <button
          type="button"
          onClick={onOpenVoiceAssistant}
          className="w-full mt-1 py-2 px-3 rounded-xl bg-[#2C5E2E] text-white hover:bg-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
        >
          <Mic className="w-3.5 h-3.5 text-[#E0A526]" />
          <span>Voice Sahyog</span>
        </button>
      </div>
    </aside>
  );
};
