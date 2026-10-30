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

export const RoleNav: React.FC = () => {
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
    const farmerNavItems: { id: FarmerTab; labelHi: string; labelEn: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
      { id: 'home', labelHi: '🏠 सहयोग', labelEn: 'Sahyog AI', icon: Home },
      { id: 'profit', labelHi: '💰 मुनाफ़ा इंजन', labelEn: 'Profit Calculator', icon: Calculator },
      { id: 'listings', labelHi: '🏷️ बेचें (फसलें)', labelEn: 'Sell Listings', icon: Tag },
      {
        id: 'deals',
        labelHi: '🤝 सौदे (एस्क्रो)',
        labelEn: 'Deals & Escrow',
        icon: Handshake,
        badge: pendingRequestsCount > 0 ? pendingRequestsCount : undefined
      }
    ];

    return (
      <div className="hidden md:block bg-white border-b border-emerald-900/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <nav className="flex items-center space-x-1 sm:space-x-3 py-2.5">
              {farmerNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = farmerTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFarmerTab(item.id)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-150 ${
                      isActive
                        ? 'bg-[#2C5E2E] text-white shadow-md shadow-emerald-900/20'
                        : 'text-[#4A2C17] hover:bg-emerald-50 hover:text-[#2C5E2E]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#E0A526]' : 'text-[#2C5E2E]'}`} />
                    <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                    {item.badge !== undefined && (
                      <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-extrabold bg-[#E0A526] text-[#4A2C17] animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#166534] bg-[#DCFCE7] px-3 py-1.5 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-[#166534] animate-ping" />
              <span>{language === 'hi' ? 'किसान मोड: 4 समर्पित सुविधाएं' : 'Farmer Portal: 4 Strict Views'}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Buyer Persona Navigation (Strictly 3 Views)
  const buyerNavItems: { id: BuyerTab; labelHi: string; labelEn: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'bazaar', labelHi: '🛒 बाज़ार (कमोडिटी)', labelEn: 'Commodity Bazaar', icon: Store },
    {
      id: 'orders',
      labelHi: '📦 ऑर्डर व एस्क्रो',
      labelEn: 'Orders & Escrow',
      icon: PackageCheck,
      badge: orders.length > 0 ? orders.length : undefined
    },
    { id: 'profile', labelHi: '👤 प्रोफ़ाइल व KYC', labelEn: 'KYC & License', icon: UserCheck }
  ];

  return (
    <div className="hidden md:block bg-white border-b border-emerald-900/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <nav className="flex items-center space-x-1 sm:space-x-3 py-2.5">
            {buyerNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = buyerTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setBuyerTab(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-[#2C5E2E] text-white shadow-md shadow-emerald-900/20'
                      : 'text-[#4A2C17] hover:bg-emerald-50 hover:text-[#2C5E2E]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#E0A526]' : 'text-[#2C5E2E]'}`} />
                  <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                  {item.badge !== undefined && (
                    <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-extrabold bg-[#E0A526] text-[#4A2C17]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#166534] bg-[#DCFCE7] px-3 py-1.5 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-[#166534] animate-ping" />
            <span>{language === 'hi' ? 'खरीदार मोड: 3 समर्पित सुविधाएं' : 'Buyer Portal: 3 Strict Views'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
