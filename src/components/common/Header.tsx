import React from 'react';
import { useStore } from '../../store/useStore';
import {
  Sprout,
  Building2,
  Bell,
  Languages,
  Sparkles,
  HelpCircle,
  User,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeRole,
    setRole,
    language,
    toggleLanguage,
    notifications,
    setIsNotificationsOpen,
    setIsTourOpen,
    setIsAuthModalOpen,
    farmerProfile,
    buyerProfile,
    resetDemoData
  } = useStore();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#2C5E2E] flex items-center justify-center text-white shadow-md shadow-emerald-900/20">
              <Sprout className="w-6 h-6 text-[#E0A526]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl text-[#2C5E2E] tracking-tight">
                  Kisaan<span className="text-[#E0A526]">Sahyog</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#166534] border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  किसान सहयोग
                </span>
              </div>
              <p className="text-xs text-[#4A2C17]/80 font-medium hidden sm:block">
                Direct Mandi Trade & AI Agronomy Sathi
              </p>
            </div>
          </div>

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Role Switcher Pill */}
            <div className="bg-[#FAF6EE] p-1 rounded-full border border-emerald-900/15 shadow-inner flex items-center">
              <button
                type="button"
                onClick={() => setRole('farmer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  activeRole === 'farmer'
                    ? 'bg-[#2C5E2E] text-white shadow-sm'
                    : 'text-[#4A2C17] hover:bg-emerald-100/50'
                }`}
              >
                <Sprout className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'किसान (Farmer)' : 'Farmer'}</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  activeRole === 'buyer'
                    ? 'bg-[#2C5E2E] text-white shadow-sm'
                    : 'text-[#4A2C17] hover:bg-emerald-100/50'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'खरीदार (Buyer)' : 'Buyer'}</span>
              </button>
            </div>

            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-white text-[#2C5E2E] border border-emerald-900/15 text-xs sm:text-sm font-bold shadow-xs hover:bg-emerald-50 active:scale-95 transition-all"
              title="Change Language"
            >
              <Languages className="w-3.5 h-3.5 text-[#E0A526]" />
              <span>{language === 'hi' ? 'EN' : 'हिन्दी'}</span>
            </button>

            {/* Tour Walkthrough Button */}
            <button
              type="button"
              onClick={() => setIsTourOpen(true)}
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white text-[#4A2C17] border border-emerald-900/15 text-xs font-semibold hover:bg-amber-50 active:scale-95 transition-all"
              title="Tour & Demo"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#E0A526]" />
              <span>{language === 'hi' ? 'मार्गदर्शिका' : 'Tour'}</span>
            </button>

            {/* Notifications Trigger */}
            <button
              type="button"
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2 rounded-full bg-white text-[#2C5E2E] border border-emerald-900/15 hover:bg-emerald-50 active:scale-95 transition-all shadow-xs"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-[#FAF6EE] animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Demo Reset Button */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset sample demo data back to default?')) {
                  resetDemoData();
                }
              }}
              className="hidden sm:flex p-2 rounded-full bg-white text-gray-500 border border-gray-200 hover:text-[#2C5E2E] hover:bg-emerald-50 active:scale-95 transition-all"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Profile Avatar Pill */}
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 p-1 sm:px-3 sm:py-1.5 rounded-full bg-white border border-emerald-900/15 text-[#2C5E2E] hover:bg-emerald-50 active:scale-95 transition-all shadow-xs"
            >
              <div className="w-7 h-7 rounded-full bg-[#2C5E2E] text-white flex items-center justify-center text-xs font-bold">
                {activeRole === 'farmer' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <span>VS</span>
                )}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-[#101F16] leading-tight">
                  {activeRole === 'farmer' ? farmerProfile.name.split(' ')[0] : buyerProfile.companyName.split(' ')[0]}
                </span>
                <span className="text-[10px] text-emerald-800 font-semibold leading-tight">
                  {activeRole === 'farmer' ? farmerProfile.kisaanId : 'Verified Mandi'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
