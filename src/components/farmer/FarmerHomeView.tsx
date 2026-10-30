import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { VOICE_PROMPT_QUICK_CHIPS } from '../../utils/constants';
import {
  CloudRain,
  Fuel,
  Mic,
  Camera,
  Bot,
  Sparkles,
  TrendingUp,
  MapPin,
  Wind,
  Droplets,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Send,
  Loader2
} from 'lucide-react';

export const FarmerHomeView: React.FC = () => {
  const { language, setFarmerTab, farmerProfile } = useStore();

  const [isListening, setIsListening] = useState(false);
  const [userQuery, setUserQuery] = useState(
    'मेरी गेहूँ की फसल में पीले पत्ते आ रहे हैं, क्या करूँ?'
  );
  const [isAnalyzingLeaf, setIsAnalyzingLeaf] = useState(false);
  const [leafDiagnosisResult, setLeafDiagnosisResult] = useState<string | null>(null);
  const [activeAdvisory, setActiveAdvisory] = useState({
    speaker: 'AI Sahyog Agronomist',
    time: 'अभी-अभी (Just now)',
    text: 'रामचंद्र जी, प्राथमिक लक्षण नाइट्रोजन की कमी अथवा पीला रतुआ (Yellow Rust) के संकेत हैं। कृपया नीचे दिए गए बटन से प्रभावित पत्ती की साफ़ फोटो खींचकर जांचें।'
  });

  const handleChipClick = (chip: typeof VOICE_PROMPT_QUICK_CHIPS[0]) => {
    setUserQuery(chip.query);
    if (chip.id === 'p1') {
      setActiveAdvisory({
        speaker: 'AI Sahyog Weather Desk',
        time: 'अभी-अभी (Live)',
        text: 'सीतापुर में अगले 48 घंटों में 85% भारी बारिश की संभावना है। नलकूप बंद रखें, खेत में जलभराव न होने दें।'
      });
    } else if (chip.id === 'p2') {
      setActiveAdvisory({
        speaker: 'AI Sahyog Fuel Saver',
        time: 'अभी-अभी (Live)',
        text: 'वर्षा के कारण 6 घंटे की पम्पिंग स्थगित करने से लगभग 14-16 लीटर डीजल बचेगा, जिससे आपकी सीधी ₹1,450 की बचत होगी।'
      });
    } else if (chip.id === 'p3') {
      setActiveAdvisory({
        speaker: 'AI Sahyog Mandi Desk',
        time: 'अभी-अभी (Live)',
        text: 'आज सीतापुर व इंदौर मंडी में शरबती गेहूं ₹2,585 - ₹2,850/क्विंटल पर बिका। सरकारी MSP ₹2,425 से यह +₹425 अधिक है।'
      });
    } else if (chip.id === 'p4') {
      setActiveAdvisory({
        speaker: 'AI Agronomy Doctor',
        time: 'अभी-अभी (Live)',
        text: 'पीला रतुआ दिखने पर प्रोपिकोनाजोल 25% EC (टिल्ट) 1 मिलीलीटर प्रति लीटर पानी में मिलाकर तुरंत छिड़काव करें।'
      });
    } else {
      setActiveAdvisory({
        speaker: 'AI Market Advisory',
        time: 'अभी-अभी (Live)',
        text: 'सरसों में इस सप्ताह मिलों की भारी मांग है। ₹6,200/क्विंटल से अधिक भाव पर 50% स्टॉक निकालना अत्यंत लाभकारी रहेगा।'
      });
    }
  };

  const handleMicToggle = () => {
    setIsListening((prev) => !prev);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setActiveAdvisory({
          speaker: 'AI Sahyog Voice',
          time: 'अभी-अभी (Voice Reply)',
          text: 'आपकी आवाज़ दर्ज हुई: "मौसम अनुकूल है, आगामी 48 घंटे में यूरिया टॉप ड्रेसिंग रोक दें क्योंकि भारी बारिश से खाद बह सकती है।"'
        });
      }, 3500);
    }
  };

  const handleLeafScan = () => {
    setIsAnalyzingLeaf(true);
    setLeafDiagnosisResult(null);
    setTimeout(() => {
      setIsAnalyzingLeaf(false);
      setLeafDiagnosisResult(
        'जांच परिणाम: प्रारंभिक पीला रतुआ (Puccinia striiformis) पाया गया (98.4% शुद्धता)। तुरंत प्रोपिकोनाजोल 25% EC @ 1ml/L का छिड़काव अनुशंसित है।'
      );
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* 1. Hyperlocal Weather & Diesel Irrigation Savings Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weather Forecast (Sitapur Default) */}
        <div className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB]/50 to-[#E8F5E9] p-5 sm:p-6 shadow-sm border border-blue-200/60 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-extrabold shadow-xs">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Sitapur (सीतापुर), MP</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>48-hr Alert (85% Rain)</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#101F16] pt-1">
                29°C • {language === 'hi' ? 'भारी वर्षा चेतावनी' : 'Heavy Rain Forecast'}
              </h2>
              <p className="text-xs sm:text-sm text-[#4A2C17]/80 max-w-xl leading-relaxed">
                {language === 'hi'
                  ? 'मौसम विभाग अनुमान: अगले 48 घंटों में 85% संभावना के साथ 45-60mm मूसलाधार बारिश का अनुमान।'
                  : 'IMD Alert: 85% probability of 45-60mm torrential showers within the next 48 hours across Sitapur basin.'}
              </p>
            </div>

            {/* Cloud rain icon graphic */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center text-blue-600 shadow-sm shrink-0 border border-blue-100">
              <CloudRain className="w-10 h-10 sm:w-12 sm:h-12 animate-subtle-float" />
            </div>
          </div>

          {/* Micro stats strip */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-blue-200/60">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-xs px-3 py-2 rounded-xl text-xs font-bold text-gray-700">
              <Wind className="w-4 h-4 text-blue-600" />
              <span>18 km/h Wind</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-xs px-3 py-2 rounded-xl text-xs font-bold text-gray-700">
              <Droplets className="w-4 h-4 text-emerald-600" />
              <span>82% Humidity</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-xs px-3 py-2 rounded-xl text-xs font-bold text-gray-700">
              <CloudRain className="w-4 h-4 text-blue-700" />
              <span>85% Rain Odds</span>
            </div>
          </div>
        </div>

        {/* Diesel Irrigation Savings Widget */}
        <div className="rounded-3xl bg-gradient-to-br from-[#FAF6EE] to-amber-50 p-5 sm:p-6 shadow-sm border border-amber-200 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
              <Fuel className="w-5 h-5 text-white" />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-[#166534] text-xs font-extrabold border border-emerald-200">
              +₹1,450 {language === 'hi' ? 'बचत' : 'Saved'}
            </span>
          </div>

          <div className="my-3">
            <span className="text-xs uppercase font-extrabold text-[#4A2C17]/70 tracking-wider">
              {language === 'hi' ? 'डीजल सिंचाई बचत' : 'Diesel Irrigation Savings'}
            </span>
            <h3 className="text-2xl font-black text-[#2C5E2E] mt-0.5">
              ₹1,450 <span className="text-xs font-normal text-gray-600">/ 6 {language === 'hi' ? 'घंटे' : 'hrs'}</span>
            </h3>
            <p className="text-xs text-[#4A2C17]/80 mt-1 leading-relaxed">
              {language === 'hi'
                ? 'प्राकृतिक वर्षा से पहले डीजल पम्प व नलकूप स्थगित रखें। 15L डीजल व भूमिगत जल दोनों बचेंगे।'
                : 'Pause tubewell pumping before natural downpour. Protect standing wheat from root rot.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setFarmerTab('profit')}
            className="w-full py-2.5 px-3 rounded-full bg-[#2C5E2E] text-white text-xs font-bold hover:bg-emerald-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>{language === 'hi' ? 'लागत बहीखाते में जोड़ें' : 'Log in Profit Engine'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Interactive Voice Agronomy Experience & Dialogue Simulator */}
      <div className="rounded-3xl bg-white p-5 sm:p-7 shadow-sm border border-emerald-900/10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block animate-ping absolute inset-0" />
              <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block relative" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#101F16]">
                {language === 'hi' ? 'AI सहयोग वॉइस एग्रोनॉमिस्ट' : 'AI Sahyog Voice Agronomist'}
              </h2>
              <p className="text-xs text-[#4A2C17]/70">
                {language === 'hi' ? 'बोलकर पूछें या तुरंत समस्या टाइप करें' : 'Hands-free regional voice copilot'}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            हिंदी / English AI Live
          </span>
        </div>

        {/* Pulsing Mic Visual Trigger */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative flex items-center justify-center">
            {isListening && (
              <>
                <div className="absolute w-44 h-44 rounded-full bg-emerald-200/50 animate-ping" />
                <div className="absolute w-36 h-36 rounded-full bg-emerald-400/30 animate-pulse" />
              </>
            )}
            <button
              type="button"
              onClick={handleMicToggle}
              className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-xl transition-all duration-200 active:scale-95 ${
                isListening
                  ? 'bg-red-600 text-white ring-8 ring-red-100 animate-pulse'
                  : 'bg-[#2C5E2E] text-white hover:bg-emerald-800 ring-8 ring-emerald-50'
              }`}
            >
              <Mic className="w-9 h-9" />
              <span className="text-[11px] font-black uppercase mt-0.5 tracking-wider">
                {isListening ? 'LISTENING' : 'LIVE'}
              </span>
            </button>
          </div>
          <p className="font-extrabold text-[#101F16] text-base mt-4 text-center">
            {isListening
              ? language === 'hi'
                ? 'सुन रहे हैं... कृपया बोलें...'
                : 'Listening... Please speak your question...'
              : language === 'hi'
              ? 'माइक दबाकर बोलें (Tap to Speak)'
              : 'Tap microphone to speak your farm question'}
          </p>
          <p className="text-xs text-gray-500 text-center">
            {language === 'hi' ? 'गेहूं, सरसों, खाद, रोग व मौसम संबंधी सभी प्रश्न' : 'Diagnose diseases, fertilizer rates, mandi trends'}
          </p>
        </div>

        {/* Quick-Chips Voice Prompts (Horizontal Rail) */}
        <div className="space-y-2">
          <span className="text-xs font-extrabold text-[#4A2C17]/80 uppercase tracking-wider block">
            {language === 'hi' ? 'त्वरित सहायता प्रश्न (Quick Suggestions)' : 'Quick Voice Prompts'}
          </span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {VOICE_PROMPT_QUICK_CHIPS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => handleChipClick(chip)}
                className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50 text-[#101F16] border border-emerald-200/80 hover:bg-[#2C5E2E] hover:text-white transition-all text-xs font-bold active:scale-95 shadow-xs"
              >
                <span>{chip.emoji}</span>
                <span>{language === 'hi' ? chip.textHi : chip.textEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Conversation Transcript Simulator */}
        <div className="space-y-3 pt-2">
          {/* Farmer Query Bubble */}
          <div className="flex items-end justify-end gap-2">
            <div className="max-w-[85%] bg-emerald-100/70 border border-emerald-200 rounded-2xl rounded-tr-none px-4 py-3 shadow-xs">
              <span className="text-[10px] font-bold text-emerald-800 block mb-0.5">
                {farmerProfile.name.split(' ')[0]} (आप):
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#101F16]">
                "{userQuery}"
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#2C5E2E] text-white flex items-center justify-center text-xs font-bold shrink-0">
              RP
            </div>
          </div>

          {/* AI Diagnosis Bubble */}
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E0A526] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="max-w-[90%] bg-[#2C5E2E] text-white rounded-2xl rounded-tl-none p-4 shadow-md space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-emerald-700/60 pb-2">
                <span className="font-extrabold text-[#E0A526] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {activeAdvisory.speaker}
                </span>
                <span className="text-emerald-200 text-[10px]">{activeAdvisory.time}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-emerald-50">
                {activeAdvisory.text}
              </p>

              {/* Integrated Leaf Scan Trigger Inside AI Bubble */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleLeafScan}
                  disabled={isAnalyzingLeaf}
                  className="w-full py-2.5 px-4 rounded-full bg-white text-[#2C5E2E] hover:bg-emerald-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
                >
                  {isAnalyzingLeaf ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#2C5E2E]" />
                      <span>{language === 'hi' ? 'पत्ती की जांच चल रही है...' : 'Analyzing Leaf Pathology...'}</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 text-[#E0A526]" />
                      <span>{language === 'hi' ? 'पत्ती की फोटो अपलोड करें (AI स्कैन)' : 'Upload Crop Photo for AI Scan'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Result display */}
              {leafDiagnosisResult && (
                <div className="p-3 bg-white/10 rounded-xl border border-white/20 text-xs leading-relaxed text-amber-200 flex items-start gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  <span>{leafDiagnosisResult}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Instant Leaf Diagnostic Scanner Card */}
      <div className="rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-emerald-900/10 flex flex-col sm:flex-row items-center gap-5">
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-emerald-100 shadow-inner">
          <img
            src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80"
            alt="Leaf Scan Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-emerald-900/20 backdrop-blur-2xs flex items-center justify-center">
            <Camera className="w-8 h-8 text-white drop-shadow" />
          </div>
        </div>
        <div className="flex-1 space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h3 className="font-extrabold text-base text-[#101F16]">
              {language === 'hi' ? 'तुरंत पत्ती स्कैनर (48+ रोग जांच)' : 'Instant Crop Health Scanner'}
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] text-[10px] font-extrabold">
              98.4% Acc.
            </span>
          </div>
          <p className="text-xs text-[#4A2C17]/80 leading-relaxed">
            {language === 'hi'
              ? 'गेहूं में पीला रतुआ, पत्ती झुलसा, दीमक व नाइट्रोजन कमी की तुरंत पहचान। सभी किसानों के लिए निःशुल्क।'
              : 'Instant field disease scan powered by deep agricultural computer vision models.'}
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 text-xs font-semibold text-[#2C5E2E]">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {language === 'hi' ? 'निःशुल्क किसान सेवा' : 'Free for all Farmers'}
            </span>
            <span>•</span>
            <span className="text-[#E0A526] font-bold">100% Organic & Chemical Guides</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLeafScan}
          className="px-5 py-3 rounded-full bg-[#2C5E2E] text-white text-xs font-bold hover:bg-emerald-800 transition-all shadow-md active:scale-95 shrink-0"
        >
          {language === 'hi' ? 'फोटो खींचें (Scan Now)' : 'Scan Produce'}
        </button>
      </div>

      {/* 4. Sitapur / Pipariya Regional Mandi Daily Update Banner */}
      <div
        onClick={() => setFarmerTab('listings')}
        className="rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-800 text-white p-5 sm:p-6 shadow-md flex items-center justify-between gap-4 cursor-pointer hover:shadow-lg transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#E0A526] shrink-0 border border-white/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#E0A526] uppercase tracking-wider">
                {language === 'hi' ? 'आज का मंडी भाव अपडेट' : 'Today\'s Mandi Update'}
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                Live
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-extrabold mt-0.5">
              Sitapur / Pipariya Mandi: Gehun (गेहूं) ₹2,585 - ₹2,850 / Qtl
            </h4>
            <p className="text-xs text-emerald-200">
              {language === 'hi'
                ? 'सरकारी MSP (₹2,425) से +₹425 अधिक! अपनी नई फसल अभी सीधे लिस्ट करें।'
                : '+₹425 over Govt MSP benchmark! Click to create new crop listing with 0% brokerage.'}
            </p>
          </div>
        </div>
        <ArrowRight className="w-6 h-6 text-[#E0A526] shrink-0" />
      </div>
    </div>
  );
};
