import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import {
  Sprout,
  ShieldCheck,
  TrendingUp,
  Percent,
  Wallet,
  Mic,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  LineChart,
  FlaskConical,
  Store,
  PhoneCall,
  Languages,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export interface HeroSlide {
  id: number;
  imageUrl: string;
  badge: string;
  badgeColor: string;
  titleHi: string;
  titleEn: string;
  subtitle: string;
}

export const HERO_FARMING_SLIDES: HeroSlide[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=1200&q=80',
    badge: '🌾 सीधा खेत से बाज़ार (Direct Farm Trade)',
    badgeColor: 'bg-emerald-800/90 text-emerald-100 border-emerald-600',
    titleHi: 'मेहनत किसान की, पूरा मुनाफ़ा किसान का',
    titleEn: 'Hard Work of Farmers, Direct Full Profits',
    subtitle: 'बिचौलियों और आढ़तियों से मुक्ति — सीधे सत्यापित थोक खरीदारों से जुड़ें।'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    badge: '🚜 आधुनिक कृषि व AI सलाह',
    badgeColor: 'bg-amber-800/90 text-amber-100 border-amber-600',
    titleHi: 'मौसम की सटीक चेतावनी व डीजल बचत',
    titleEn: '48-Hour Rain Alerts & Tube-Well Diesel Savings',
    subtitle: 'सीतापुर मौसम पूर्वानुमान और ICAR-आधारित यूरिया/DAP की संतुलित मात्रा।'
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
    badge: '🔒 ₹1,000 सुरक्षित टोकन एस्क्रो',
    badgeColor: 'bg-blue-900/90 text-blue-100 border-blue-600',
    titleHi: 'बिना जोखिम, सुरक्षित अग्रिम भुगतान',
    titleEn: 'Zero-Risk Verified Buyer Token Advance',
    subtitle: 'किसान की स्वीकृति मिलते ही सौदा पक्का और सीधा संपर्क अनलॉक।'
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
    badge: '🌾 15 प्रमुख फसलों के लाइव भाव',
    badgeColor: 'bg-stone-900/90 text-stone-100 border-stone-600',
    titleHi: 'न्यूनतम समर्थन मूल्य (MSP) से बेहतर दाम',
    titleEn: 'Real-Time Mandi Benchmark Engine',
    subtitle: 'गेहूं, सरसों, चना, धान और सोयाबीन के निष्पक्ष बाज़ार भाव।'
  }
];

export const HERO_SLIDES = HERO_FARMING_SLIDES;

interface WebLandingPageProps {
  onGetStarted?: () => void;
  onExploreMarket?: () => void;
}

export const WebLandingPage: React.FC<WebLandingPageProps> = ({
  onGetStarted,
  onExploreMarket
}) => {
  const { setCurrentPage, setUserRole, language, toggleLanguage, setIsVoiceModalOpen } = useStore();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play interval: 4,500ms (4.5s), pauses on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleGetStarted = (role: 'farmer' | 'buyer' = 'farmer') => {
    setUserRole(role);
    if (onGetStarted) {
      onGetStarted();
    } else {
      setCurrentPage('login');
    }
  };

  const handleExploreBazaar = () => {
    setUserRole('buyer');
    if (onExploreMarket) {
      onExploreMarket();
    } else {
      setCurrentPage('dashboard');
    }
  };

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#101F16] flex flex-col font-sans selection:bg-[#2C5E2E] selection:text-white">
      {/* Top Navigation Strip */}
      <header className="sticky top-0 z-40 bg-[#FAF6EE]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#2C5E2E] flex items-center justify-center text-white shadow-md">
              <Sprout className="w-6 h-6 text-[#E0A526]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-[#101F16] tracking-tight">KisaanSahyog</span>
              <span className="text-[11px] font-extrabold text-[#2C5E2E] -mt-1 tracking-wider uppercase">
                किसान सहयोग • Direct Trade
              </span>
            </div>
          </div>

          {/* Center Live Mandi Pulse Indicator */}
          <div className="hidden md:flex items-center gap-2.5 bg-white/90 border border-emerald-900/10 px-4 py-2 rounded-full shadow-2xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2C5E2E]" />
            </span>
            <span className="text-xs font-bold text-gray-700">APMC Live Mandi Ticker:</span>
            <span className="text-xs font-black text-[#2C5E2E]">2,140+ Mandis Active</span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-white hover:bg-stone-100 border border-stone-200 px-3.5 py-2 rounded-full text-xs font-black text-[#101F16] transition shadow-2xs"
            >
              <Languages className="w-3.5 h-3.5 text-[#2C5E2E]" />
              <span>{language === 'hi' ? 'हिन्दी / EN' : 'English / हि'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsVoiceModalOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-emerald-100/70 hover:bg-emerald-100 text-[#166534] px-4 py-2 rounded-full text-xs font-black transition"
            >
              <Mic className="w-3.5 h-3.5 text-[#E0A526]" />
              <span>AI Sahyog Voice</span>
            </button>

            <button
              type="button"
              onClick={() => handleGetStarted('farmer')}
              className="px-5 py-2.5 rounded-full bg-[#2C5E2E] hover:bg-[#1e4220] text-white text-xs font-black shadow-md hover:scale-105 active:scale-95 transition"
            >
              लॉगिन / प्रवेश करें
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Trust Micro-Pill */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 px-4 py-1.5 rounded-full text-[#166534] text-xs font-extrabold shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#2C5E2E]" />
              <span>Direct Bharat Kisan Initiative • National Trust Index 99.4%</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#101F16] tracking-tight leading-[1.15]">
                Grow Smart.<br />
                <span className="text-[#2C5E2E]">Sell Direct.</span>
              </h1>
              <p className="text-base sm:text-lg text-stone-600 font-medium max-w-xl leading-relaxed pt-2">
                बिचौलियों से मुक्ति: भारत का सबसे भरोसेमंद किसान-खरीदार डिजिटल नेटवर्क। ₹1,000 सुरक्षित टोकन एस्क्रो अग्रिम, रीयल-टाइम मंडी भाव, और ICAR उर्वरक व मौसम सलाह।
              </p>
            </div>

            {/* Key Benefits Grid */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="flex items-center gap-2 bg-white border border-stone-200 px-4 py-2.5 rounded-full shadow-2xs">
                <Percent className="w-4 h-4 text-[#2C5E2E]" />
                <span className="text-xs font-black text-[#101F16]">0% Commission (शून्य दलाली)</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-stone-200 px-4 py-2.5 rounded-full shadow-2xs">
                <Wallet className="w-4 h-4 text-[#E0A526]" />
                <span className="text-xs font-black text-[#101F16]">₹1,000 Token Escrow Advance</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-stone-200 px-4 py-2.5 rounded-full shadow-2xs">
                <TrendingUp className="w-4 h-4 text-[#2C5E2E]" />
                <span className="text-xs font-black text-[#101F16]">Real-Time Mandi Prices vs MSP</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-stone-200 px-4 py-2.5 rounded-full shadow-2xs">
                <Mic className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-black text-[#101F16]">Voice-Enabled AI Agronomy</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleGetStarted('farmer')}
                className="inline-flex items-center justify-center gap-3 bg-[#2C5E2E] hover:bg-[#1e4220] text-white text-sm font-black px-8 py-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition group"
              >
                <span>शुरू करें (Get Started)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleExploreBazaar}
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-stone-100 text-[#101F16] border border-stone-200 text-sm font-black px-7 py-4 rounded-full shadow-xs hover:shadow transition"
              >
                <Store className="w-4 h-4 text-[#2C5E2E]" />
                <span>लाइव मंडी बाज़ार देखें (Explore Bazaar)</span>
              </button>
            </div>

            {/* Stat Counters Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 w-full max-w-xl">
              <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs">
                <span className="text-2xl font-black text-[#2C5E2E] block">48,000+</span>
                <span className="text-[11px] font-bold text-gray-500 mt-0.5 block">सत्यापित किसान</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs">
                <span className="text-2xl font-black text-[#2C5E2E] block">₹12.4 Cr</span>
                <span className="text-[11px] font-bold text-gray-500 mt-0.5 block">प्रत्यक्ष किसान कमाई</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs">
                <span className="text-2xl font-black text-[#2C5E2E] block">100%</span>
                <span className="text-[11px] font-bold text-gray-500 mt-0.5 block">MSP सुरक्षा मानक</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column: Interactive Auto-Playing Carousel Card */}
          <div className="lg:col-span-5 relative flex justify-center items-center w-full">
            <div
              className="relative w-full max-w-lg lg:max-w-none rounded-3xl shadow-2xl border-4 border-white/80 overflow-hidden aspect-[4/3] sm:aspect-[16/11] lg:h-[510px] bg-stone-100 group select-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Image Slides with Smooth Cross-fade Transition */}
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlideIndex;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={slide.imageUrl}
                      alt={slide.titleHi}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
                  </div>
                );
              })}

              {/* Floating Top Header Badges */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                <div className={`backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border transition-all duration-300 ${currentSlide.badgeColor || 'bg-white/95 text-[#101F16] border-white/50'}`}>
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span className="text-xs font-black">
                    {currentSlide.badge}
                  </span>
                </div>

                <div className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-mono font-black text-white border border-white/20">
                  {currentSlideIndex + 1} / {HERO_FARMING_SLIDES.length}
                </div>
              </div>

              {/* Manual Navigation Arrows (Left & Right) */}
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous Slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/45 hover:bg-[#2C5E2E] text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 border border-white/30 opacity-80 group-hover:opacity-100 active:scale-90 shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next Slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/45 hover:bg-[#2C5E2E] text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 border border-white/30 opacity-80 group-hover:opacity-100 active:scale-90 shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Bottom Caption Overlay & Interactive CTA */}
              <div className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-5 space-y-3">
                <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#E0A526] animate-ping" />
                      <h3 className="text-sm sm:text-base font-black text-[#101F16]">
                        {language === 'hi' ? currentSlide.titleHi : currentSlide.titleEn}
                      </h3>
                    </div>
                    <p className="text-xs text-stone-600 font-bold line-clamp-1">
                      {currentSlide.subtitle}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleGetStarted('farmer')}
                    className="px-4 py-2 rounded-full bg-[#2C5E2E] hover:bg-[#1e4220] text-white text-xs font-black shadow-md hover:scale-105 active:scale-95 transition flex items-center justify-center gap-1.5 self-start sm:self-auto shrink-0"
                  >
                    <span>सौदा करें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Interactive Pagination Dots */}
                <div className="flex items-center justify-center gap-2 pt-0.5">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlideIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentSlideIndex === idx
                          ? 'w-7 bg-[#E0A526] shadow-md'
                          : 'w-2 bg-white/70 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-20 pt-12 border-t border-stone-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black text-[#2C5E2E] uppercase tracking-wider bg-emerald-100/70 px-3 py-1 rounded-full">
              सम्पूर्ण कृषि समाधान
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#101F16] mt-2">
              किसान से लेकर खरीदार तक, हर कदम पर सहयोग
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#2C5E2E] flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-[#E0A526]" />
              </div>
              <h3 className="text-base font-black text-[#101F16] mb-1">AI सहयोग वॉइस सलाहकार</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                अपनी स्थानीय बोली में पूछें। 48-घंटे बारिश अलर्ट, सीतापुर डीजल बचत व पत्ती रोग निदान।
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Store className="w-6 h-6 text-[#2C5E2E]" />
              </div>
              <h3 className="text-base font-black text-[#101F16] mb-1">15-फसल सीधा बाज़ार</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                गेहूं, सरसों, चना, सोयाबीन, धान आदि को न्यूनतम समर्थन मूल्य (MSP) से ऊपर सीधे बेचें।
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                <FlaskConical className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-base font-black text-[#101F16] mb-1">ICAR उर्वरक व पोषण</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                एकड़ अनुसार यूरिया, DAP, पोटाश व सल्फर की सटीक बोरी गणना और सरकारी सब्सिडी दर।
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
                <LineChart className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="text-base font-black text-[#101F16] mb-1">लागत व शुद्ध मुनाफ़ा इंजन</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                बीज, खाद, डीजल, मजदूरी जोड़कर प्रति क्विंटल शुद्ध लाभ व +245% ROI का सजीव विश्लेषण।
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default WebLandingPage;
