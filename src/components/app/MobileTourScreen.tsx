import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  Mic,
  Store,
  FlaskConical,
  Calculator,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sprout
} from 'lucide-react';

interface MobileTourScreenProps {
  onFinish?: () => void;
  onFinishTour?: () => void;
}

export const MobileTourScreen: React.FC<MobileTourScreenProps> = ({ onFinish, onFinishTour }) => {
  const { language, login, userRole } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: 'Feature 1/4 • AI सहायक',
      titleHi: 'AI सहयोग वॉइस असिस्टेंट (बोलकर पूछें)',
      titleEn: 'AI Sahyog Voice Assistant (Hands-Free)',
      descHi: 'अपनी स्थानीय बोली में सीधे पूछें। 48-घंटे बारिश अलर्ट, सीतापुर नलकूप डीजल बचत और फसल रोग निदान।',
      descEn: 'Speak directly in Hindi or English for crop advisory, weather rain warnings, and leaf scan.',
      icon: Mic,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
      tagText: 'बोलकर पूछें • Voice Enabled'
    },
    {
      badge: 'Feature 2/4 • सीधी बिक्री',
      titleHi: 'सीधा मंडी बाज़ार (Zero Middlemen)',
      titleEn: 'Direct Marketplace (Zero Middlemen)',
      descHi: '15 प्रमुख फसलों को अपने मनचाहे मूल्य पर सीधे सत्यापित खरीदारों को बेचें। ₹1,000 बयाना एस्क्रो में सुरक्षित।',
      descEn: 'Sell 15 key crops directly to verified urban buyers with ₹1,000 guaranteed token escrow.',
      icon: Store,
      image: 'https://images.unsplash.com/photo-1608797178974-15b35a633190?auto=format&fit=crop&w=800&q=80',
      tagText: '₹1,000 अग्रिम बयाना • 100% Direct Pay'
    },
    {
      badge: 'Feature 3/4 • ICAR उर्वरक',
      titleHi: 'उर्वरक व पोषण सलाहकार (ICAR Dosage)',
      titleEn: 'ICAR Fertilizer & Nutrient Advisory',
      descHi: 'एकड़ अनुसार यूरिया, DAP, पोटाश व सल्फर की सटीक बोरी आवश्यकता और चरणबद्ध उपयोग समय सारणी।',
      descEn: 'Acre-wise bag requirement for Urea, DAP, MOP & Sulphur with subsidized MRP pricing.',
      icon: FlaskConical,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      tagText: 'ICAR वैज्ञानिक अनुपात • Subsidized MRP'
    },
    {
      badge: 'Feature 4/4 • मुनाफ़ा इंजन',
      titleHi: 'लागत व शुद्ध मुनाफ़ा कैलकुलेटर',
      titleEn: 'Cost Evaluation & Net Margin Engine',
      descHi: 'बीज, खाद, सिंचाई और कटाई मजदूरी जोड़कर न्यूनतम समर्थन मूल्य (MSP) की तुलना में शुद्ध मुनाफ़ा देखें।',
      descEn: 'Calculate actual cost of cultivation, mandi rate vs MSP, and net profit per quintal.',
      icon: Calculator,
      image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
      tagText: '+245% ROI तुलना • Fair Price'
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      if (onFinish) {
        onFinish();
      } else if (onFinishTour) {
        onFinishTour();
      } else {
        login(userRole || 'farmer');
      }
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#FAF6EE] text-[#101F16] font-sans p-5 select-none">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCFCE7] text-[#166534] rounded-full text-xs font-black">
            <Sprout className="w-3.5 h-3.5" />
            <span>किसान यात्रा • Tour</span>
          </div>

          <button
            type="button"
            onClick={onFinishTour}
            className="text-xs font-black text-stone-500 hover:text-stone-900 px-3 py-1.5 rounded-full"
          >
            Skip (छोड़ें)
          </button>
        </div>

        {/* Slide Visual Card */}
        <div className="relative w-full h-52 rounded-2xl overflow-hidden mt-2 bg-stone-900 shadow-md">
          <img
            src={slide.image}
            alt={slide.titleHi}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Floating Pill on image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-[#2C5E2E] flex items-center gap-1.5 shadow-sm">
              <Icon className="w-3.5 h-3.5 text-[#E0A526]" />
              <span>{slide.tagText}</span>
            </div>
          </div>
        </div>

        {/* Slide Description */}
        <div className="pt-5 space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#E0A526] bg-amber-100 px-2.5 py-0.5 rounded-full">
            {slide.badge}
          </span>
          <h2 className="text-xl font-black text-[#101F16] leading-snug">
            {language === 'hi' ? slide.titleHi : slide.titleEn}
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed font-medium">
            {language === 'hi' ? slide.descHi : slide.descEn}
          </p>
        </div>
      </div>

      {/* Bottom Navigation Strip */}
      <div className="pt-4 border-t border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx
                    ? 'w-6 bg-[#2C5E2E]'
                    : 'w-2 bg-stone-300'
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-black text-stone-400">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {currentSlide > 0 && (
            <button
              type="button"
              onClick={() => setCurrentSlide((p) => p - 1)}
              className="py-3 px-4 rounded-xl border border-stone-200 text-xs font-black text-stone-600 hover:bg-stone-50"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-[#2C5E2E] hover:bg-[#1e4220] text-white text-xs font-black shadow-md flex items-center justify-center gap-2 active:scale-95 transition"
          >
            <span>
              {currentSlide === slides.length - 1
                ? 'शुरू करें (Get Started)'
                : 'अगला (Next)'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default MobileTourScreen;
