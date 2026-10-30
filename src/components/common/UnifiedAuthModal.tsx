import React, { useState } from 'react';
import { useStore, UserProfile } from '../../store/useStore';
import { TRANSLATIONS, SupportedLanguage } from '../../utils/translations';
import { authService } from '../../services/authService';
import { Globe, User, MapPin, Mail, Phone, Lock, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export const UnifiedAuthModal: React.FC = () => {
  const { language, setLanguage, login, setCurrentPage } = useStore();
  const t = TRANSLATIONS[language];

  // Steps: 1: Language -> 2: Role & Profile -> 3: Contact -> 4: OTP
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [role, setRole] = useState<'farmer' | 'buyer'>('farmer');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Contact Submission & Trigger OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await authService.sendOtp(contact);
    setLoading(false);

    if (res.success) {
      setStep(4);
    } else {
      setError(t.invalid_contact);
    }
  };

  // Handle OTP Verification & Final Login
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const fullOtp = otp.join('');
    setLoading(true);

    const res = await authService.verifyOtp(contact, fullOtp);
    setLoading(false);

    if (res.success) {
      const profile: UserProfile = {
        name: name.trim() || 'Kisan Mitra',
        location: location.trim() || 'Punjab/Haryana Region',
        contact: contact.trim(),
        role: role
      };
      login(profile);
    } else {
      setError(t.invalid_otp);
    }
  };

  const handleOtpChange = (val: string, index: number) => {
    if (val.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-[#FAF6EE] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        
        {/* Header Ribbon */}
        <div className="bg-[#2C5E2E] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">KisaanSahyog</span>
            <span className="text-xs bg-[#E0A526] text-stone-900 px-2 py-0.5 rounded-full font-semibold">
              Step {step} of 4
            </span>
          </div>
          <button 
            onClick={() => setCurrentPage('landing')} 
            className="text-stone-300 hover:text-white text-xs underline"
          >
            {t.back}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">

          {/* STEP 1: Language Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <Globe className="w-10 h-10 text-[#2C5E2E] mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-stone-900">{t.select_language}</h2>
                <p className="text-sm text-stone-600 mt-1">{t.select_language_sub}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { code: 'hi', label: 'हिन्दी', desc: 'Hindi' },
                  { code: 'pa', label: 'ਪੰਜਾਬੀ', desc: 'Punjabi' },
                  { code: 'en', label: 'English', desc: 'English' }
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => setLanguage(item.code as SupportedLanguage)}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center ${
                      language === item.code 
                        ? 'border-[#2C5E2E] bg-emerald-50/80 shadow-md text-[#2C5E2E]' 
                        : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <span className="text-lg font-bold">{item.label}</span>
                    <span className="text-xs text-stone-500">{item.desc}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-[#2C5E2E] text-white rounded-xl font-semibold hover:bg-emerald-900 transition-all shadow-md"
              >
                <span>{t.continue}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Profile Details & Role */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center">
                <User className="w-10 h-10 text-[#2C5E2E] mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-stone-900">{t.step_profile}</h2>
              </div>

              {/* Role Toggle */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">{t.select_role}</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('farmer')}
                    className={`py-2.5 rounded-xl border font-medium text-sm transition-all ${
                      role === 'farmer' ? 'bg-[#2C5E2E] text-white border-[#2C5E2E]' : 'bg-white border-stone-200 text-stone-700'
                    }`}
                  >
                    {t.farmer}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('buyer')}
                    className={`py-2.5 rounded-xl border font-medium text-sm transition-all ${
                      role === 'buyer' ? 'bg-[#2C5E2E] text-white border-[#2C5E2E]' : 'bg-white border-stone-200 text-stone-700'
                    }`}
                  >
                    {t.buyer}
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">{t.full_name}</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.enter_name}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C5E2E] text-sm"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">{t.location}</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t.enter_location}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C5E2E] text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2.5 bg-stone-200 text-stone-700 rounded-xl font-medium text-sm"
                >
                  {t.back}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (name.trim() && location.trim()) setStep(3);
                  }}
                  disabled={!name.trim() || !location.trim()}
                  className="w-2/3 py-2.5 bg-[#2C5E2E] disabled:opacity-50 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-1 shadow-md"
                >
                  <span>{t.continue}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Phone or Email Contact */}
          {step === 3 && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div className="text-center">
                <Phone className="w-10 h-10 text-[#2C5E2E] mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-stone-900">{t.contact_type}</h2>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">{t.phone_or_email}</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t.enter_phone_email}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C5E2E] text-sm"
                  />
                </div>
                {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 py-2.5 bg-stone-200 text-stone-700 rounded-xl font-medium text-sm"
                >
                  {t.back}
                </button>
                <button
                  type="submit"
                  disabled={loading || !contact.trim()}
                  className="w-2/3 py-2.5 bg-[#2C5E2E] disabled:opacity-50 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-1 shadow-md"
                >
                  {loading ? 'Sending...' : t.send_otp}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: OTP Verification */}
          {step === 4 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center">
                <Lock className="w-10 h-10 text-[#2C5E2E] mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-stone-900">{t.enter_otp}</h2>
                <p className="text-xs text-stone-600 mt-1">
                  {t.otp_sent_to} <span className="font-semibold text-stone-800">{contact}</span>
                </p>
                <p className="text-[11px] text-amber-700 bg-amber-50 rounded-lg py-1 px-2 inline-block mt-2">
                  Testing OTP: <strong>123456</strong>
                </p>
              </div>

              <div className="flex justify-center gap-2 my-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    className="w-11 h-12 text-center text-lg font-bold border-2 border-stone-300 rounded-xl bg-white focus:border-[#2C5E2E] focus:outline-none"
                  />
                ))}
              </div>

              {error && <p className="text-xs text-center text-red-600">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-1/3 py-2.5 bg-stone-200 text-stone-700 rounded-xl font-medium text-sm"
                >
                  {t.back}
                </button>
                <button
                  type="submit"
                  disabled={loading || otp.join('').length < 6}
                  className="w-2/3 py-2.5 bg-[#2C5E2E] disabled:opacity-50 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-1 shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {loading ? 'Verifying...' : t.verify_and_proceed}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
