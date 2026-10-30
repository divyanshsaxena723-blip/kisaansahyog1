import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Mic,
  Store,
  Calculator,
  CloudLightning,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const TourModal: React.FC = () => {
  const { isTourOpen, setIsTourOpen, language } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isTourOpen) return null;

  const slides = [
    {
      badge: 'Feature 1/4 • AI सहायक',
      titleHi: 'AI सहयोग वॉइस असिस्टेंट (बोलकर पूछें)',
      titleEn: 'AI Sahyog Voice Assistant (Hands-Free)',
      descHi: 'अपनी क्षेत्रीय भाषा या बोली में सीधे पूछें। फसल रोग निदान हेतु पत्ती की फोटो अपलोड करें और तुरंत जैविक या रासायनिक उपचार सलाह पाएं।',
      descEn: 'Speak directly in Hindi or English for instant crop advisory, leaf disease diagnosis via camera scan, and personalized weather actions.',
      icon: Mic,
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d69106093?auto=format&fit=crop&w=800&q=80',
      tagText: '98.4% Accuracy • Free for Farmers'
    },
    {
      badge: 'Feature 2/4 • सीधी बिक्री',
      titleHi: 'सीधा बाज़ार (शून्य बिचौलिया • डायरेक्ट पेमेंट)',
      titleEn: 'Direct Marketplace (Zero Middlemen)',
      descHi: 'अपनी फसल को अपने तय भाव पर लिस्ट करें। सत्यापित थोक व मिल खरीदारों से सीधे जुड़ें और ₹1,000 सुरक्षित एस्क्रो बयाना प्राप्त करें।',
      descEn: 'List your harvest at your expected price with price guardrail intelligence. Connect with verified buyers and receive escrow advance tokens.',
      icon: Store,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      tagText: '0% Brokerage • 100% Bank Escrow'
    },
    {
      badge: 'Feature 3/4 • मुनाफ़ा कैलकुलेटर',
      titleHi: 'स्मार्ट किसान लागत व शुद्ध लाभ कैलकुलेटर',
      titleEn: 'Smart Cost & Profit Calculator',
      descHi: 'ज़मीन, बीज, खाद, डीजल सिंचाई और मजदूरी खर्च दर्ज कर जाने प्रति एकड़ वास्तविक लागत, मंडी भाव बनाम एमएसपी और शुद्ध लाभ मार्जिन।',
      descEn: 'Interactive input for land acres, seed, fertilizer, diesel hours, and labor. Calculates total cost, projected yield, and net profit vs MSP.',
      icon: Calculator,
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
      tagText: 'True Net Margins vs MSP'
    },
    {
      badge: 'Feature 4/4 • मौसम चेतावनी',
      titleHi: 'हाइपर-लोकल मौसम व डीजल बचत चेतावनी',
      titleEn: 'Hyperlocal Weather & Fuel Savings Alert',
      descHi: 'सीतापुर व आसपास के लिए 48 घंटे पहले 85% भारी वर्षा का अलर्ट। सिंचाई स्थगित कर डीजल के ₹1,450 तक बचाएं और फसल नुकसान से बचें।',
      descEn: '48-hr advance rain alert with 85% probability. Save up to ₹1,450 in diesel irrigation expenses by delaying pumping before natural showers.',
      icon: CloudLightning,
      image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80',
      tagText: '48-Hour Advanced Warning'
    }
  ];

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setIsTourOpen(false);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/10 transition-all">
        {/* Header Strip */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E0A526] animate-pulse" />
            <span className="text-xs font-bold text-[#2C5E2E] uppercase tracking-wider">
              {slide.badge}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsTourOpen(false)}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Preview Card */}
        <div className="p-6 pb-2">
          <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden bg-emerald-900 shadow-md">
            <img
              src={slide.image}
              alt={slide.titleEn}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm text-xs font-bold text-[#2C5E2E]">
                <Icon className="w-4 h-4 text-[#E0A526]" />
                <span>{slide.tagText}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Content */}
        <div className="px-6 py-4 space-y-2">
          <h3 className="text-xl font-extrabold text-[#101F16] leading-snug">
            {language === 'hi' ? slide.titleHi : slide.titleEn}
          </h3>
          <p className="text-sm text-[#4A2C17]/80 leading-relaxed">
            {language === 'hi' ? slide.descHi : slide.descEn}
          </p>
        </div>

        {/* Indicator dots */}
        <div className="flex items-center justify-center gap-1.5 py-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-[#2C5E2E]' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-3 flex items-center justify-between border-t border-gray-100 bg-gray-50/50">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className={`flex items-center gap-1 px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
              currentSlide === 0
                ? 'opacity-40 cursor-not-allowed text-gray-400'
                : 'text-[#4A2C17] hover:bg-white hover:shadow-xs'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{language === 'hi' ? 'पिछला' : 'Back'}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2C5E2E] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-900/20 hover:bg-emerald-800 active:scale-95 transition-all"
          >
            <span>
              {currentSlide === slides.length - 1
                ? language === 'hi'
                  ? 'शुरू करें (Get Started)'
                  : 'Get Started'
                : language === 'hi'
                ? 'अगला (Next)'
                : 'Next'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
