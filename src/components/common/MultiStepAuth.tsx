import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { UserRole, SupportedLanguage, TRANSLATIONS } from '../../types';
import { LANGUAGE_OPTIONS } from '../../utils/translations';
import {
  Sprout,
  Store,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Languages,
  Phone,
  Mail,
  MapPin,
  User,
  KeyRound,
  Sparkles,
  RefreshCw,
  Check
} from 'lucide-react';

interface MultiStepAuthProps {
  variant?: 'mobile' | 'web' | 'modal';
  onLoginSuccess?: (role: UserRole) => void;
  onBack?: () => void;
}

export type AuthStep = 'language' | 'profile' | 'contact' | 'otp';

export const MultiStepAuth: React.FC<MultiStepAuthProps> = ({
  variant = 'web',
  onLoginSuccess,
  onBack
}) => {
  const {
    language,
    setLanguage,
    login,
    userRole,
    setUserRole,
    setIsAuthModalOpen,
    farmerProfile,
    buyerProfile
  } = useStore();

  const [currentStep, setCurrentStep] = useState<AuthStep>('language');
  const [selectedRole, setSelectedRole] = useState<UserRole>(userRole || 'farmer');
  
  // Profile fields
  const [fullName, setFullName] = useState(
    userRole === 'farmer' ? (farmerProfile.name || 'Ramchandra Patel') : (buyerProfile.name || 'Vikram Singhania')
  );
  const [location, setLocation] = useState(
    language === 'pa' ? 'Ludhiana, Punjab' : 'Sitapur, Uttar Pradesh'
  );

  // Contact fields
  const [contactValue, setContactValue] = useState('9425082194');
  const [contactError, setContactError] = useState('');

  // OTP fields
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [otpError, setOtpError] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const stepsList: { key: AuthStep; title: string; num: number }[] = [
    { key: 'language', title: t.step_language, num: 1 },
    { key: 'profile', title: t.step_profile, num: 2 },
    { key: 'contact', title: t.step_contact, num: 3 },
    { key: 'otp', title: t.step_otp, num: 4 },
  ];

  // Validate contact info (phone 10 digits or email)
  const validateContact = (val: string): boolean => {
    const cleaned = val.trim();
    const isPhone = /^[0-9]{10}$/.test(cleaned.replace(/\D/g, ''));
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned);
    return isPhone || isEmail;
  };

  const handleLanguageSelect = (lang: SupportedLanguage) => {
    setLanguage(lang);
    if (lang === 'pa' && location.includes('Uttar Pradesh')) {
      setLocation('Ludhiana, Punjab');
    } else if (lang === 'hi' && location.includes('Punjab')) {
      setLocation('सीतापुर, उत्तर प्रदेश');
    }
  };

  const handleContactSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateContact(contactValue)) {
      setContactError(t.invalid_contact);
      return;
    }
    setContactError('');
    setCurrentStep('otp');
    setCountdown(30);
  };

  const handleOtpChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setOtpError('');

    if (digit && index < 5) {
      const nextInput = document.getElementById(`auth-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const entered = otp.join('');
    // Allow 123456 or any full 6-digit entered during interactive testing
    if (entered.length < 6) {
      setOtpError(t.invalid_otp);
      return;
    }

    if (entered !== '123456' && entered !== '842109') {
      setOtpError(t.invalid_otp);
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setUserRole(selectedRole);
      login(selectedRole, contactValue, {
        name: fullName || (selectedRole === 'farmer' ? 'Ramchandra Patel' : 'Vikram Singhania'),
        location: location
      });
      setIsAuthModalOpen(false);
      if (onLoginSuccess) {
        onLoginSuccess(selectedRole);
      }
    }, 400);
  };

  const fillTestOtp = () => {
    setOtp(['1', '2', '3', '4', '5', '6']);
    setOtpError('');
  };

  const handleQuickDemo = (role: UserRole) => {
    setSelectedRole(role);
    setUserRole(role);
    const demoPhone = role === 'farmer' ? '9425082194' : '9826011928';
    const demoName = role === 'farmer' ? 'Ramchandra Patel' : 'Singhania Agro Mandi';
    login(role, demoPhone, { name: demoName, location: 'Sitapur, Uttar Pradesh' });
    setIsAuthModalOpen(false);
    if (onLoginSuccess) {
      onLoginSuccess(role);
    }
  };

  const isMobile = variant === 'mobile';

  return (
    <div className={`w-full ${isMobile ? 'p-4' : 'p-6 sm:p-8'} flex flex-col justify-between h-full text-[#101F16]`}>
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#2C5E2E] flex items-center justify-center text-white shadow-sm">
              <Sprout className="w-5 h-5 text-[#E0A526]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg text-[#101F16]">KisaanSahyog</span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534]">
                  {language === 'pa' ? 'ਕਿਸਾਨ ਸਹਿਯੋਗ' : language === 'hi' ? 'किसान सहयोग' : 'Direct Mandi'}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium">
                {language === 'pa' ? 'ਸਿੱਧਾ ਮੰਡੀ ਵਪਾਰ ਅਤੇ ਏਆਈ ਸਹਿਯੋਗ' : language === 'hi' ? 'सीधा मंडी व्यापार व एआई सहयोग' : 'Direct Mandi Trade & AI Agronomy'}
              </p>
            </div>
          </div>

          {/* Language Switch pill */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full border border-stone-200">
            {LANGUAGE_OPTIONS.map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => handleLanguageSelect(lang.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-black transition ${
                  language === lang.id
                    ? 'bg-[#2C5E2E] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="mt-5 mb-6">
          <div className="grid grid-cols-4 gap-2">
            {stepsList.map((s, idx) => {
              const activeIndex = stepsList.findIndex((st) => st.key === currentStep);
              const isPast = idx < activeIndex;
              const isCurrent = idx === activeIndex;

              return (
                <div key={s.key} className="flex flex-col gap-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      isPast
                        ? 'bg-[#2C5E2E]'
                        : isCurrent
                        ? 'bg-[#E0A526]'
                        : 'bg-stone-200'
                    }`}
                  />
                  <div className="flex items-center justify-between text-[11px]">
                    <span className={`font-black ${isCurrent ? 'text-[#2C5E2E]' : 'text-stone-500'} truncate`}>
                      {s.num}. {s.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 1: LANGUAGE SELECTION */}
        {currentStep === 'language' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#101F16]">
                {t.select_language}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
                {t.select_language_sub}
              </p>
            </div>

            <div className="space-y-3">
              {LANGUAGE_OPTIONS.map((item) => {
                const isSelected = language === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleLanguageSelect(item.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#2C5E2E] bg-emerald-50/50 shadow-xs ring-1 ring-[#2C5E2E]/20'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${
                        isSelected ? 'bg-[#2C5E2E] text-white' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {item.id.toUpperCase()}
                      </div>
                      <div>
                        <div className="font-black text-sm text-[#101F16]">
                          {item.native}
                        </div>
                        <div className="text-xs text-stone-500">
                          {item.sub}
                        </div>
                      </div>
                    </div>

                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-[#2C5E2E] bg-[#2C5E2E] text-white' : 'border-stone-300'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setCurrentStep('profile')}
              className="w-full py-3.5 rounded-2xl bg-[#2C5E2E] hover:bg-[#1f4220] text-white font-black text-sm shadow-md active:scale-95 transition flex items-center justify-center gap-2 mt-4"
            >
              <span>{t.continue}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: PROFILE & ROLE SELECTION */}
        {currentStep === 'profile' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#101F16]">
                {t.step_profile}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
                {t.select_role}
              </p>
            </div>

            {/* Role Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Farmer */}
              <div
                onClick={() => {
                  setSelectedRole('farmer');
                  if (!fullName || fullName === 'Vikram Singhania') setFullName('Ramchandra Patel');
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedRole === 'farmer'
                    ? 'border-[#2C5E2E] bg-emerald-50/60 shadow-xs ring-1 ring-[#2C5E2E]/20'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center">
                    <Sprout className="w-5 h-5 text-[#2C5E2E]" />
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedRole === 'farmer' ? 'border-[#2C5E2E] bg-[#2C5E2E]' : 'border-stone-300'
                  }`}>
                    {selectedRole === 'farmer' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                <div className="font-black text-sm text-[#101F16]">
                  {t.farmer}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  0% Commission • AI Fertilizer • Mandi Rate
                </div>
              </div>

              {/* Buyer */}
              <div
                onClick={() => {
                  setSelectedRole('buyer');
                  if (!fullName || fullName === 'Ramchandra Patel') setFullName('Vikram Singhania');
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedRole === 'buyer'
                    ? 'border-[#2C5E2E] bg-emerald-50/60 shadow-xs ring-1 ring-[#2C5E2E]/20'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Store className="w-5 h-5" />
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedRole === 'buyer' ? 'border-[#2C5E2E] bg-[#2C5E2E]' : 'border-stone-300'
                  }`}>
                    {selectedRole === 'buyer' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                <div className="font-black text-sm text-[#101F16]">
                  {t.buyer}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Direct Mandi Lots • Verified KYC • Escrow
                </div>
              </div>
            </div>

            {/* Inputs: Full Name & Location */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] font-black uppercase text-stone-600 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#2C5E2E]" />
                  <span>{t.full_name}</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t.enter_name}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-white text-sm font-black text-[#101F16] focus:outline-none focus:ring-2 focus:ring-[#2C5E2E]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-stone-600 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#2C5E2E]" />
                  <span>{t.location}</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t.enter_location}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-white text-sm font-black text-[#101F16] focus:outline-none focus:ring-2 focus:ring-[#2C5E2E]"
                />
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => setCurrentStep('language')}
                className="py-3 px-5 rounded-2xl border border-stone-200 bg-white hover:bg-stone-50 font-black text-xs text-stone-700 transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.back}</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep('contact')}
                className="flex-1 py-3 px-5 rounded-2xl bg-[#2C5E2E] hover:bg-[#1f4220] text-white font-black text-xs shadow-md active:scale-95 transition flex items-center justify-center gap-2"
              >
                <span>{t.continue}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT INFO */}
        {currentStep === 'contact' && (
          <form onSubmit={handleContactSubmit} className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#101F16]">
                {t.step_contact}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
                {t.contact_type}
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase text-stone-600 mb-1.5">
                {t.phone_or_email}
              </label>
              <div className="flex items-center rounded-2xl border border-stone-200 bg-white px-4 py-3.5 focus-within:ring-2 focus-within:ring-[#2C5E2E]">
                <div className="flex items-center gap-1.5 text-stone-500 mr-2 border-r border-stone-200 pr-3">
                  <Phone className="w-4 h-4 text-[#2C5E2E]" />
                  <span className="text-xs font-black">+91</span>
                </div>
                <input
                  type="text"
                  value={contactValue}
                  onChange={(e) => {
                    setContactValue(e.target.value);
                    if (contactError) setContactError('');
                  }}
                  placeholder={t.enter_phone_email}
                  className="w-full bg-transparent font-black text-sm text-[#101F16] focus:outline-none"
                  autoFocus
                />
              </div>

              {contactError && (
                <p className="text-xs text-red-600 font-bold mt-1.5 animate-in fade-in">
                  ⚠️ {contactError}
                </p>
              )}
            </div>

            {/* Quick Demo Pre-fills */}
            <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200 text-xs space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">
                💡 Quick Test Contact Presets
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setContactValue('9425082194');
                    setContactError('');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-[11px] font-bold text-stone-700 hover:bg-emerald-50 hover:text-[#2C5E2E]"
                >
                  Farmer: 9425082194
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setContactValue('9826011928');
                    setContactError('');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-[11px] font-bold text-stone-700 hover:bg-emerald-50 hover:text-[#2C5E2E]"
                >
                  Buyer: 9826011928
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => setCurrentStep('profile')}
                className="py-3 px-5 rounded-2xl border border-stone-200 bg-white hover:bg-stone-50 font-black text-xs text-stone-700 transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.back}</span>
              </button>

              <button
                type="submit"
                className="flex-1 py-3 px-5 rounded-2xl bg-[#2C5E2E] hover:bg-[#1f4220] text-white font-black text-xs shadow-md active:scale-95 transition flex items-center justify-center gap-2"
              >
                <span>{t.send_otp}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: OTP VERIFICATION */}
        {currentStep === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#101F16]">
                {t.step_otp}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
                {t.otp_sent_to} <span className="font-black text-[#101F16]">{contactValue}</span>
              </p>
            </div>

            {/* 6 Digit Inputs */}
            <div>
              <label className="block text-center text-xs font-black uppercase text-stone-600 mb-2.5">
                {t.enter_otp}
              </label>
              <div className="flex items-center justify-center gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`auth-otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center font-black text-xl rounded-2xl bg-white border border-stone-200 text-[#101F16] focus:outline-none focus:ring-2 focus:ring-[#2C5E2E] shadow-2xs"
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-center text-xs text-red-600 font-bold mt-2 animate-in fade-in">
                  ⚠️ {otpError}
                </p>
              )}
            </div>

            {/* Test Helper Strip */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs">
              <div className="flex items-center gap-2 text-amber-900 font-medium">
                <Sparkles className="w-4 h-4 text-[#E0A526]" />
                <span>Test Code: <strong className="font-black">123456</strong></span>
              </div>
              <button
                type="button"
                onClick={fillTestOtp}
                className="px-2.5 py-1 rounded-lg bg-amber-200/60 hover:bg-amber-200 text-amber-900 font-black text-[11px] transition"
              >
                Auto-fill
              </button>
            </div>

            {/* Resend OTP */}
            <div className="flex items-center justify-between text-xs font-medium text-stone-500 px-1">
              <span>{countdown > 0 ? `00:${countdown < 10 ? `0${countdown}` : countdown}` : 'Expired'}</span>
              <button
                type="button"
                onClick={() => {
                  setCountdown(30);
                  fillTestOtp();
                }}
                className="text-[#2C5E2E] font-black hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{t.resend_otp}</span>
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => setCurrentStep('contact')}
                className="py-3 px-5 rounded-2xl border border-stone-200 bg-white hover:bg-stone-50 font-black text-xs text-stone-700 transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.back}</span>
              </button>

              <button
                type="submit"
                disabled={isVerifying}
                className="flex-1 py-3 px-5 rounded-2xl bg-[#2C5E2E] hover:bg-[#1f4220] text-white font-black text-xs shadow-md active:scale-95 transition flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <span>{t.verify_and_proceed}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#E0A526]" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Quick 1-Click Demo Section (Always Accessible) */}
      <div className="pt-5 border-t border-stone-200/80 mt-6">
        <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block text-center mb-2.5">
          ⚡ Quick 1-Click Demo Profiles (त्वरित डेमो प्रवेश)
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemo('farmer')}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#166534] text-xs font-black transition"
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>{language === 'pa' ? 'ਕਿਸਾਨ (ਰਾਮਚੰਦਰ)' : language === 'hi' ? 'किसान (रामचंद्र)' : 'Farmer (Ramchandra)'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemo('buyer')}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-black transition"
          >
            <Store className="w-3.5 h-3.5" />
            <span>{language === 'pa' ? 'ਵਪਾਰੀ (ਸਿੰਘਾਨੀਆ)' : language === 'hi' ? 'खरीदार (सिंघानिया)' : 'Buyer (Singhania)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepAuth;
