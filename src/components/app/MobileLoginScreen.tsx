import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { UserRole } from '../../types';
import {
  Sprout,
  Store,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Compass,
  Languages,
  Phone
} from 'lucide-react';

interface MobileLoginScreenProps {
  onStartTour?: () => void;
  onLoginSuccess?: (role: UserRole) => void;
}

export const MobileLoginScreen: React.FC<MobileLoginScreenProps> = ({ onStartTour, onLoginSuccess }) => {
  const { userRole, setUserRole, login, language, toggleLanguage } = useStore();

  const [selectedRole, setSelectedRole] = useState<UserRole>(userRole || 'farmer');
  const [phoneNumber, setPhoneNumber] = useState('9425082194');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess(selectedRole);
    } else {
      login(selectedRole, phoneNumber);
    }
  };

  const handleQuickDemo = (role: UserRole) => {
    setSelectedRole(role);
    setUserRole(role);
    if (onLoginSuccess) {
      onLoginSuccess(role);
    } else {
      login(role, role === 'farmer' ? '9425082194' : '9826011928');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#FAF6EE] text-[#101F16] font-sans p-5 select-none">
      {/* Top Mobile Bar */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#2C5E2E] flex items-center justify-center text-white">
              <Sprout className="w-4 h-4 text-[#E0A526]" />
            </div>
            <span className="text-base font-black text-[#101F16]">KisaanSahyog</span>
          </div>

          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-black text-[#101F16] shadow-2xs"
          >
            <Languages className="w-3 h-3 text-[#2C5E2E]" />
            <span>{language === 'hi' ? 'हिन्दी / EN' : 'English / हि'}</span>
          </button>
        </div>

        {/* Greetings */}
        <div className="pt-4 pb-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#2C5E2E] block">
            आपका अपना मंडी साथी • PWA App
          </span>
          <h1 className="text-2xl font-black text-[#101F16] mt-0.5">
            Welcome to KisaanSahyog
          </h1>
          <p className="text-xs text-stone-500 font-medium">
            नमस्ते! शुरू करने के लिए अपनी भूमिका चुनें
          </p>
        </div>

        {/* Role Cards */}
        <div className="space-y-3 my-4">
          {/* Farmer Card */}
          <div
            onClick={() => setSelectedRole('farmer')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
              selectedRole === 'farmer'
                ? 'border-[#2C5E2E] bg-white shadow-sm ring-1 ring-[#2C5E2E]/20'
                : 'border-stone-200/80 bg-white/60 hover:bg-white'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center">
                <Sprout className="w-5 h-5 text-[#2C5E2E]" />
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedRole === 'farmer'
                  ? 'border-[#2C5E2E] bg-[#2C5E2E]'
                  : 'border-stone-300'
              }`}>
                {selectedRole === 'farmer' && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-black text-[#101F16]">I'm a Farmer</span>
              <span className="text-xs font-bold text-[#2C5E2E]">(मैं किसान हूँ)</span>
            </div>
            <p className="text-xs text-stone-500 mt-1 leading-snug">
              फसल बेचें, मौसम व ICAR खाद सलाह, ₹1,000 बयाना एस्क्रो
            </p>
            <div className="mt-2 text-[10px] font-black text-[#166534] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>0% Commission on direct sales</span>
            </div>
          </div>

          {/* Buyer Card */}
          <div
            onClick={() => setSelectedRole('buyer')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
              selectedRole === 'buyer'
                ? 'border-[#2C5E2E] bg-white shadow-sm ring-1 ring-[#2C5E2E]/20'
                : 'border-stone-200/80 bg-white/60 hover:bg-white'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedRole === 'buyer'
                  ? 'border-[#2C5E2E] bg-[#2C5E2E]'
                  : 'border-stone-300'
              }`}>
                {selectedRole === 'buyer' && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-black text-[#101F16]">I'm a Buyer</span>
              <span className="text-xs font-bold text-stone-600">(मैं खरीदार हूँ)</span>
            </div>
            <p className="text-xs text-stone-500 mt-1 leading-snug">
              15-फसल सीधा बाज़ार, किसान संपर्क, टोकन अग्रिम
            </p>
          </div>
        </div>

        {/* Mobile Input */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-black uppercase text-stone-600 mb-1.5">
              मोबाइल नंबर दर्ज करें:
            </label>
            <div className="flex items-center rounded-2xl border border-stone-200 bg-white px-3.5 py-3 focus-within:ring-2 focus-within:ring-[#2C5E2E]">
              <span className="text-xs font-black text-stone-500 mr-2">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="94250 82194"
                className="w-full bg-transparent font-black text-sm text-[#101F16] focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-[#2C5E2E] hover:bg-[#1e4220] text-white text-xs font-black shadow-md active:scale-95 transition flex items-center justify-center gap-2"
          >
            <span>ओटीपी भेजें (Login / Send OTP)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Bottom Quick Tour & Demo Actions */}
      <div className="pt-4 border-t border-stone-200/80 space-y-2.5">
        {onStartTour && (
          <button
            type="button"
            onClick={onStartTour}
            className="w-full py-2.5 px-4 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-xs font-black text-[#2C5E2E] flex items-center justify-center gap-2 transition"
          >
            <Compass className="w-3.5 h-3.5 text-[#E0A526]" />
            <span>ऐप की मुख्य विशेषताएं देखें (Feature Tour)</span>
          </button>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemo('farmer')}
            className="py-2 px-3 rounded-xl bg-emerald-100/70 text-[#166534] text-[11px] font-black hover:bg-emerald-100 transition"
          >
            डेमो किसान
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('buyer')}
            className="py-2 px-3 rounded-xl bg-amber-100/70 text-amber-900 text-[11px] font-black hover:bg-amber-100 transition"
          >
            डेमो खरीदार
          </button>
        </div>
      </div>
    </div>
  );
};
export default MobileLoginScreen;
