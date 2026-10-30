import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { UserRole } from '../../types';
import {
  Sprout,
  Store,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Languages,
  Lock,
  Building2,
  Sparkles
} from 'lucide-react';

interface WebLoginPageProps {
  onLoginSuccess?: (role: 'farmer' | 'buyer') => void;
  onBack?: () => void;
}

export const WebLoginPage: React.FC<WebLoginPageProps> = ({ onLoginSuccess, onBack }) => {
  const { userRole, setUserRole, login, setCurrentPage, language, toggleLanguage } = useStore();

  const [selectedRole, setSelectedRole] = useState<UserRole>(userRole || 'farmer');
  const [phoneNumber, setPhoneNumber] = useState('9425082194');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otpCode, setOtpCode] = useState(['8', '4', '2', '1', '0', '9']);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyAndLogin = () => {
    if (onLoginSuccess) {
      onLoginSuccess(selectedRole);
    } else {
      login(selectedRole, phoneNumber);
    }
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    setSelectedRole(role);
    setUserRole(role);
    if (onLoginSuccess) {
      onLoginSuccess(role);
    } else {
      login(role, role === 'farmer' ? '9425082194' : '9826011928');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#101F16] flex flex-col font-sans selection:bg-[#2C5E2E] selection:text-white">
      {/* Top Strip */}
      <header className="h-16 border-b border-stone-200 bg-[#FAF6EE]/90 backdrop-blur-md px-6 lg:px-12 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (onBack) onBack();
            else setCurrentPage('landing');
          }}
          className="flex items-center gap-2 text-xs font-black text-stone-600 hover:text-[#101F16] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>मुख्य पृष्ठ पर लौटें (Back to Home)</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 bg-white border border-stone-200 px-3.5 py-1.5 rounded-full text-xs font-black text-[#101F16]"
          >
            <Languages className="w-3.5 h-3.5 text-[#2C5E2E]" />
            <span>{language === 'hi' ? 'हिन्दी / EN' : 'English / हि'}</span>
          </button>
        </div>
      </header>

      {/* Center Auth Container */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-stone-200 p-8 sm:p-10 relative overflow-hidden">
          {/* Top Branding */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#2C5E2E] text-white flex items-center justify-center shadow-md">
              <Sprout className="w-6 h-6 text-[#E0A526]" />
            </div>
            <div>
              <h1 className="text-xl font-black text-[#101F16]">KisaanSahyog</h1>
              <span className="text-xs font-extrabold text-[#2C5E2E] uppercase tracking-wider block -mt-0.5">
                किसान सहयोग • सुरक्षित लॉगिन
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-black text-[#101F16]">
              {step === 'phone'
                ? 'अपने कृषि नेटवर्क में प्रवेश करें'
                : '6-अंकीय OTP सत्यापन'}
            </h2>
            <p className="text-xs text-stone-500 font-medium mt-1">
              {step === 'phone'
                ? 'अपनी भूमिका चुनें और मोबाइल नंबर दर्ज करें'
                : `+91 ${phoneNumber} पर भेजा गया 6-अंकीय कोड दर्ज करें`}
            </p>
          </div>

          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              {/* Role Selection Tiles */}
              <div>
                <label className="block text-xs font-black uppercase text-stone-600 mb-2">
                  अपनी भूमिका चुनें (Choose Role):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Farmer Role */}
                  <div
                    onClick={() => setSelectedRole('farmer')}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all relative ${
                      selectedRole === 'farmer'
                        ? 'border-[#2C5E2E] bg-emerald-50/60 shadow-xs'
                        : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100'
                    }`}
                  >
                    {selectedRole === 'farmer' && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#2C5E2E] text-white flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-8 h-8 rounded-xl bg-[#2C5E2E]/10 text-[#2C5E2E] flex items-center justify-center">
                        <Sprout className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-black text-[#101F16]">मैं किसान हूँ</span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug">
                      फसल बेचें, मौसम व ICAR खाद सलाह, सीधा ₹1,000 अग्रिम
                    </p>
                  </div>

                  {/* Buyer Role */}
                  <div
                    onClick={() => setSelectedRole('buyer')}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all relative ${
                      selectedRole === 'buyer'
                        ? 'border-[#2C5E2E] bg-emerald-50/60 shadow-xs'
                        : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100'
                    }`}
                  >
                    {selectedRole === 'buyer' && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#2C5E2E] text-white flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-800 flex items-center justify-center">
                        <Store className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-black text-[#101F16]">मैं खरीदार हूँ</span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-snug">
                      15-फसल बाज़ार, सत्यापित किसान लॉट, सुरक्षित टोकन
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Input */}
              <div>
                <label className="block text-xs font-black uppercase text-stone-600 mb-2">
                  मोबाइल नंबर (Mobile Number):
                </label>
                <div className="flex items-center rounded-2xl border border-stone-200 bg-[#FAF6EE] px-4 py-3 focus-within:ring-2 focus-within:ring-[#2C5E2E]">
                  <span className="text-sm font-black text-stone-500 mr-2">+91</span>
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#2C5E2E] hover:bg-[#1e4220] text-white text-sm font-black shadow-lg hover:shadow-xl active:scale-95 transition flex items-center justify-center gap-2"
              >
                <span>OTP प्राप्त करें (Send OTP)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* 6 Digit OTP Input Simulation */}
              <div>
                <label className="block text-xs font-black uppercase text-stone-600 mb-3 text-center">
                  सत्यापन कोड (6-Digit Demo OTP):
                </label>
                <div className="flex items-center justify-center gap-2">
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...otpCode];
                        newOtp[idx] = e.target.value;
                        setOtpCode(newOtp);
                      }}
                      className="w-12 h-14 text-center font-black text-xl rounded-2xl bg-[#FAF6EE] border border-stone-200 text-[#101F16] focus:outline-none focus:ring-2 focus:ring-[#2C5E2E]"
                    />
                  ))}
                </div>
                <p className="text-center text-[11px] text-stone-400 mt-2 font-bold">
                  डेमो OTP: 8 4 2 1 0 9
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="py-3.5 px-5 rounded-full border border-stone-200 text-xs font-black text-stone-600 hover:bg-stone-50 transition"
                >
                  नंबर बदलें
                </button>
                <button
                  type="button"
                  onClick={handleVerifyAndLogin}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#2C5E2E] hover:bg-[#1e4220] text-white text-sm font-black shadow-md hover:scale-102 active:scale-95 transition"
                >
                  सत्यापित करें और प्रवेश करें
                </button>
              </div>
            </div>
          )}

          {/* Quick Demo Instant Access Strip */}
          <div className="mt-8 pt-6 border-t border-stone-100">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block text-center mb-3">
              ⚡ त्वरित 1-क्लिक डेमो प्रवेश (One-Click Demo Roles)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('farmer')}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#166534] text-xs font-black transition"
              >
                <Sprout className="w-3.5 h-3.5" />
                <span>रामचंद्र पटेल (किसान)</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('buyer')}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-black transition"
              >
                <Store className="w-3.5 h-3.5" />
                <span>सिंघानिया एग्रो (खरीदार)</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default WebLoginPage;
