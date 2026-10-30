import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { UserRole } from '../../types';
import {
  X,
  Sprout,
  Building2,
  Lock,
  Phone,
  User,
  ShieldCheck,
  Mic,
  ArrowRight,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    login,
    activeRole,
    setRole,
    language
  } = useStore();

  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [selectedRole, setSelectedRole] = useState<UserRole>(activeRole);
  const [fullName, setFullName] = useState(
    activeRole === 'farmer' ? 'Ramchandra Patel' : 'Vikram Singhania'
  );
  const [phoneNumber, setPhoneNumber] = useState('9425082194');
  const [otp, setOtp] = useState(['4', '8', '2', '0', '', '']);
  const [countdown, setCountdown] = useState(45);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    setSelectedRole(activeRole);
  }, [activeRole]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setStep('otp');
    setCountdown(45);
  };

  const handleVerifyOtp = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setRole(selectedRole);
      login(`+91 ${phoneNumber}`, selectedRole);
      setIsAuthModalOpen(false);
      setStep('details');
    }, 800);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-box-${index + 1}`);
      nextInput?.focus();
    }
  };

  const autoFillOtp = () => {
    setOtp(['9', '8', '4', '2', '0', '1']);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/10">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 bg-[#FAF6EE] border-b border-emerald-900/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2C5E2E] text-white flex items-center justify-center">
              <Sprout className="w-4 h-4 text-[#E0A526]" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#101F16] text-base sm:text-lg">
                {step === 'details'
                  ? language === 'hi'
                    ? 'किसान सहयोग में लॉगिन करें'
                    : 'Sign In to KisaanSahyog'
                  : language === 'hi'
                  ? 'सुरक्षा सत्यापन (OTP)'
                  : 'SMS Verification'}
              </h3>
              <p className="text-xs text-[#4A2C17]/70">
                {language === 'hi' ? 'आपका अपना कृषि साथी' : 'Direct Trade & AI Agronomy Portal'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsAuthModalOpen(false);
              setStep('details');
            }}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSendOtp} className="p-6 space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-[#101F16] mb-2 uppercase tracking-wider">
                {language === 'hi' ? 'अपनी भूमिका चुनें (Select Role)' : 'Select Your Role'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('farmer');
                    setFullName('Ramchandra Patel');
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedRole === 'farmer'
                      ? 'border-[#2C5E2E] bg-emerald-50/70 ring-2 ring-[#2C5E2E]/20 shadow-xs'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#2C5E2E] flex items-center justify-center mb-2">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <p className="font-extrabold text-sm text-[#101F16]">
                    {language === 'hi' ? 'मैं किसान हूँ' : 'I am a Farmer'}
                  </p>
                  <p className="text-[11px] text-[#4A2C17]/70 mt-0.5">
                    {language === 'hi' ? 'सीधे फसल बेचें, 0% दलाली' : 'Sell crops directly at 0% fee'}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('buyer');
                    setFullName('Vikram Singhania');
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedRole === 'buyer'
                      ? 'border-[#2C5E2E] bg-emerald-50/70 ring-2 ring-[#2C5E2E]/20 shadow-xs'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <p className="font-extrabold text-sm text-[#101F16]">
                    {language === 'hi' ? 'मैं खरीदार हूँ' : 'I am a Buyer'}
                  </p>
                  <p className="text-[11px] text-[#4A2C17]/70 mt-0.5">
                    {language === 'hi' ? 'थोक व मंडी व्यापारी' : 'Wholesale mandi trader/mill'}
                  </p>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#101F16] mb-1">
                {language === 'hi' ? 'पूरा नाम (Full Name)' : 'Full Name'}
              </label>
              <div className="flex items-center px-3.5 h-12 rounded-xl bg-gray-50 border border-gray-200 focus-within:bg-white focus-within:border-[#2C5E2E] focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                <User className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full bg-transparent text-sm font-semibold text-[#101F16] focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#101F16]">
                  {language === 'hi' ? 'मोबाइल नंबर (Mobile Number)' : 'Mobile Phone'}
                </label>
                <span className="text-[11px] text-[#2C5E2E] font-bold flex items-center gap-1 cursor-pointer hover:underline">
                  <Mic className="w-3 h-3 text-[#E0A526]" />
                  {language === 'hi' ? 'बोलकर लिखें' : 'Speak'}
                </span>
              </div>
              <div className="flex items-center px-3.5 h-12 rounded-xl bg-gray-50 border border-gray-200 focus-within:bg-white focus-within:border-[#2C5E2E] focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                <span className="text-sm font-bold text-gray-600 mr-2 border-r border-gray-300 pr-2">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="w-full bg-transparent text-sm font-bold tracking-wider text-[#101F16] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-emerald-50/80 rounded-xl text-xs text-[#166534] border border-emerald-200/60">
              <ShieldCheck className="w-4 h-4 text-[#2C5E2E] shrink-0" />
              <span>
                {language === 'hi'
                  ? '100% सुरक्षित • केवल अधिकृत कृषि व्यापार हेतु उपयोग'
                  : '100% Secure • Bank-grade encrypted verification'}
              </span>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-full bg-[#2C5E2E] text-white font-bold text-sm shadow-md shadow-emerald-900/20 hover:bg-emerald-800 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>{language === 'hi' ? 'ओटीपी प्राप्त करें (Get OTP)' : 'Send 6-Digit OTP'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">
                  {language === 'hi' ? 'ओटीपी भेजा गया है:' : 'Verification code sent to:'}
                </p>
                <p className="text-sm font-extrabold text-[#101F16]">
                  +91 {phoneNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs font-bold text-[#2C5E2E] hover:underline"
              >
                {language === 'hi' ? 'नंबर बदलें' : 'Edit Number'}
              </button>
            </div>

            {/* 6-Digit OTP Grid */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#101F16]">
                  {language === 'hi' ? '6-अंकीय कोड दर्ज करें' : 'Enter 6-Digit Code'}
                </span>
                <button
                  type="button"
                  onClick={autoFillOtp}
                  className="text-xs font-bold text-[#2C5E2E] hover:underline flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {language === 'hi' ? 'स्वतः भरें (Demo Fill)' : 'Demo Auto-fill'}
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-box-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-full h-12 sm:h-14 text-center font-extrabold text-xl sm:text-2xl rounded-xl bg-gray-50 border border-gray-300 focus:bg-white focus:border-[#2C5E2E] focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  />
                ))}
              </div>
            </div>

            {/* Countdown / Resend */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">
                {countdown > 0
                  ? language === 'hi'
                    ? `पुनः भेजें: ${countdown}s`
                    : `Resend code in ${countdown}s`
                  : language === 'hi'
                  ? 'ओटीपी नहीं मिला?'
                  : "Didn't receive code?"}
              </span>
              {countdown === 0 && (
                <button
                  type="button"
                  onClick={() => setCountdown(45)}
                  className="text-[#2C5E2E] font-bold hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{language === 'hi' ? 'ओटीपी पुनः भेजें' : 'Resend OTP'}</span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={isVerifying}
              className="w-full h-12 rounded-full bg-[#2C5E2E] text-white font-bold text-sm shadow-md shadow-emerald-900/20 hover:bg-emerald-800 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <span>{language === 'hi' ? 'सत्यापित कर रहे हैं...' : 'Verifying...'}</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>{language === 'hi' ? 'सत्यापित करें व प्रवेश करें' : 'Verify & Continue'}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
