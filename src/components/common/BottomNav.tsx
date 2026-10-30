import React from 'react';
import { useStore, FarmerTab, BuyerTab } from '../../store/useStore';
import {
  Home,
  Calculator,
  Tag,
  Handshake,
  Store,
  PackageCheck,
  UserCheck
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const {
    activeRole,
    farmerTab,
    setFarmerTab,
    buyerTab,
    setBuyerTab,
    language,
    orders
  } = useStore();

  const pendingRequestsCount = orders.filter((o) => o.status === 'token_requested').length;

  if (activeRole === 'farmer') {
    const tabs: { id: FarmerTab; labelHi: string; labelEn: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
      { id: 'home', labelHi: 'सहयोग', labelEn: 'Sahyog', icon: Home },
      { id: 'profit', labelHi: 'मुनाफ़ा', labelEn: 'Profit', icon: Calculator },
      { id: 'listings', labelHi: 'बेचें', labelEn: 'Sell', icon: Tag },
      {
        id: 'deals',
        labelHi: 'सौदे',
        labelEn: 'Deals',
        icon: Handshake,
        badge: pendingRequestsCount > 0 ? pendingRequestsCount : undefined
      }
    ];

    return (
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#FAF6EE]/95 backdrop-blur-xl border-t border-emerald-900/10 shadow-[0_-4px_20px_rgba(44,94,46,0.08)] pb-safe">
        <div className="grid grid-cols-4 h-16 items-center px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = farmerTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFarmerTab(tab.id)}
                className={`flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all active:scale-95 relative ${
                  isActive ? 'text-[#2C5E2E] font-extrabold' : 'text-[#4A2C17]/70 hover:text-[#2C5E2E]'
                }`}
              >
                <div className="relative">
                  <div
                    className={`p-1 rounded-xl transition-all ${
                      isActive ? 'bg-[#DCFCE7] text-[#166534]' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {tab.badge !== undefined && (
                    <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-[#E0A526] text-[#4A2C17] ring-2 ring-[#FAF6EE]">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] leading-tight tracking-tight mt-0.5">
                  {language === 'hi' ? tab.labelHi : tab.labelEn}
                </span>
                {isActive && (
                  <span className="w-8 h-1 bg-[#2C5E2E] rounded-full absolute bottom-1" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // Buyer Persona Mobile Navigation (Strictly 3 Views)
  const buyerTabs: { id: BuyerTab; labelHi: string; labelEn: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'bazaar', labelHi: 'बाज़ार', labelEn: 'Bazaar', icon: Store },
    {
      id: 'orders',
      labelHi: 'ऑर्डर',
      labelEn: 'Orders',
      icon: PackageCheck,
      badge: orders.length > 0 ? orders.length : undefined
    },
    { id: 'profile', labelHi: 'प्रोफ़ाइल', labelEn: 'Profile', icon: UserCheck }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#FAF6EE]/95 backdrop-blur-xl border-t border-emerald-900/10 shadow-[0_-4px_20px_rgba(44,94,46,0.08)] pb-safe">
      <div className="grid grid-cols-3 h-16 items-center px-4">
        {buyerTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = buyerTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setBuyerTab(tab.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all active:scale-95 relative ${
                isActive ? 'text-[#2C5E2E] font-extrabold' : 'text-[#4A2C17]/70 hover:text-[#2C5E2E]'
              }`}
            >
              <div className="relative">
                <div
                  className={`p-1 rounded-xl transition-all ${
                    isActive ? 'bg-[#DCFCE7] text-[#166534]' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-[#E0A526] text-[#4A2C17] ring-2 ring-[#FAF6EE]">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] leading-tight tracking-tight mt-0.5">
                {language === 'hi' ? tab.labelHi : tab.labelEn}
              </span>
              {isActive && (
                <span className="w-8 h-1 bg-[#2C5E2E] rounded-full absolute bottom-1" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
