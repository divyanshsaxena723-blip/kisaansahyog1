import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { FertilizerCalculator } from '../common/FertilizerCalculator';
import {
  Bot,
  Sparkles,
  TrendingUp,
  CloudRain,
  Fuel,
  ArrowRight,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Wind,
  Droplets,
  Play,
  Share2,
  Send,
  Loader2,
  Mic,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';

interface WebFarmerDashboardProps {
  onOpenVoiceAssistant?: () => void;
  initialQuery?: string;
}

export const WebFarmerDashboard: React.FC<WebFarmerDashboardProps> = ({
  onOpenVoiceAssistant,
  initialQuery
}) => {
  const {
    language,
    farmerProfile,
    setFarmerTab,
    updateCostState,
    openVoicebot
  } = useStore();

  const [chatInput, setChatInput] = useState(initialQuery || '');
  const [activeQuery, setActiveQuery] = useState(
    initialQuery || 'क्या आज गेहूं पर कीटनाशक या फफूंदनाशक का छिड़काव कर सकते हैं? मौसम बादलों से घिरा है।'
  );
  const [activeAdvisory, setActiveAdvisory] = useState({
    speaker: 'Agri-Scientist Engine v4.2',
    time: 'Live Sitapur Station',
    text: 'रामचंद्र जी, सीतापुर क्षेत्र में अगले 48 घंटों में 85% संभावना के साथ 45-60mm मूसलाधार बारिश का अनुमान है। यूरिया टॉप-ड्रेसिंग व नलकूप पम्प 6 घंटे स्थगित रखें और ₹1,450 तक डीजल खर्च बचाएं।',
    audioSec: '0:24'
  });

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isLeafAnalyzing, setIsLeafAnalyzing] = useState(false);
  const [leafResult, setLeafResult] = useState<string | null>(null);

  // Quick Action Pills as specified in requirements
  const QUICK_PILLS = [
    {
      id: 'rain',
      label: '🌧️ Will it rain today?',
      query: 'सीतापुर में आज वर्षा की क्या संभावना है? क्या सिंचाई रोकनी चाहिए?',
      speaker: 'IMD & AI Weather Radar',
      text: 'सीतापुर क्षेत्र में अगले 48 घंटों में भारी वर्षा (85% संभावना)। खेतों में जल निकासी तैयार रखें और यूरिया छिड़काव स्थगित करें।'
    },
    {
      id: 'fuel',
      label: '⛽ Diesel irrigation savings',
      query: 'वर्षा से पहले पम्प बंद करने पर कितना डीजल बचेगा?',
      speaker: 'Fuel Savings Engine',
      text: 'वर्षा से पूर्व 6 घंटे सिंचाई स्थगित करने पर लगभग 15 लीटर डीजल व ₹1,450 की शुद्ध बचत होगी।'
    },
    {
      id: 'mandi',
      label: '🌾 Today Wheat Mandi Rate',
      query: 'आज सीतापुर मंडी में शरबती गेहूं का उच्चतम भाव क्या है?',
      speaker: 'Mandi Rate Desk',
      text: 'सीतापुर मंडी में शरबती गेहूं आज ₹2,850/क्विंटल बिका। यह सरकारी समर्थन मूल्य (MSP ₹2,425) से +₹425 अधिक है।'
    },
    {
      id: 'rust',
      label: '🌿 Yellow Rust treatment',
      query: 'गेहूं में पीला रतुआ दिखने पर कौन सी दवा का छिड़काव करें?',
      speaker: 'Plant Pathology Diagnostic',
      text: 'पीला रतुआ दिखने पर प्रोपिकोनाजोल 25% EC (टिल्ट) @ 1ml प्रति लीटर पानी में घोलकर दोपहर 3 से 5 बजे के बीच छिड़कें।'
    },
    {
      id: 'mustard',
      label: '🌱 Best price to sell Mustard',
      query: 'सरसों की फसल कब बेचना सबसे फायदेमंद रहेगा?',
      speaker: 'Market Price Advisor',
      text: 'सरसों ₹6,200/क्विंटल से ऊपर चल रही है। 50% स्टॉक तुरंत बेचकर अधिकतम लाभ अर्जित करें।'
    }
  ];

  const handlePillClick = (pill: typeof QUICK_PILLS[0]) => {
    setActiveQuery(pill.query);
    setChatInput(pill.query);
    setActiveAdvisory({
      speaker: pill.speaker,
      time: 'Live Agronomy Sync',
      text: pill.text,
      audioSec: '0:22'
    });
    openVoicebot(pill.label);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const query = chatInput.trim();
    setActiveQuery(query);
    openVoicebot(query);
  };

  const handleAudioPlay = () => {
    openVoicebot(activeQuery);
  };

  const handleLeafScan = () => {
    setIsLeafAnalyzing(true);
    setLeafResult(null);
    setTimeout(() => {
      setIsLeafAnalyzing(false);
      setLeafResult('जांच परिणाम: प्रारंभिक पीला रतुआ (Yellow Rust - 98.4% शुद्धता)। तुरंत प्रोपिकोनाजोल 25% EC @ 1ml/लीटर का छिड़काव अनुशंसित है।');
    }, 1800);
  };

  const handleAddToCostLedger = () => {
    // Sync ₹1,450 diesel savings into Profit Engine
    updateCostState({
      dieselHours: Math.max(0, 32 - 6) // Halting pump 6 hours saves diesel
    });
    setFarmerTab('profit');
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Banner Card with Green border & Light Emerald background */}
      <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-[#2C5E2E] text-white flex items-center justify-center shadow-md shadow-emerald-950/20 shrink-0">
              <Bot className="w-7 h-7 text-[#E0A526]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#166534]">
                  KISAN AI COMPANION
                </span>
                <span className="text-stone-400 font-bold">•</span>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-xs font-semibold text-stone-600">
                  Satellite Weather Synced: Sitapur / Sehore Block 04
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#101F16] mt-0.5">
                नमस्ते रामचंद्र जी!{' '}
                <span className="text-[#2C5E2E] font-medium text-base sm:text-lg block sm:inline">
                  What would you like to ask AI Sahyog today?
                </span>
              </h1>
            </div>
          </div>

          {/* Right Status Card: Mandi Price Ticker for Sitapur */}
          <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-xs border border-emerald-200/80 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-[#2C5E2E] shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-stone-700">Sitapur Mandi (सीतापुर)</span>
                <span className="text-[10px] font-black text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                  +₹45 today
                </span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xs font-semibold text-stone-500">Sharbati Wheat:</span>
                <span className="text-base font-black text-[#2C5E2E]">₹2,850</span>
                <span className="text-[11px] text-stone-400 font-bold">/ Qtl</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Pills (हॉरिजॉन्टल चिप्स) */}
        <div className="mt-4 pt-3 border-t border-emerald-200/80 flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-[#4A2C17] pr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#E0A526]" />
            <span>त्वरित प्रश्न (Quick Questions):</span>
          </span>
          {QUICK_PILLS.map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => handlePillClick(pill)}
              className="px-3.5 py-1.5 rounded-full bg-white text-stone-800 hover:bg-[#2C5E2E] hover:text-white border border-stone-200 text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              {pill.label}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Weather & Diesel Savings Row (50/50 Split) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left: 48-Hour Rain Warning */}
        <div className="bg-gradient-to-br from-[#E3F2FD] via-white to-blue-50 rounded-2xl p-5 border border-blue-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider">
                  Sitapur Weather Radar
                </span>
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black border border-red-200 animate-pulse">
                  Heavy Rain Alert 85%
                </span>
              </div>
              <h3 className="text-lg font-black text-blue-950 pt-1">
                48-Hour Rain Warning
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed max-w-sm">
                सीतापुर क्षेत्र में अगले 48 घंटों में 45-60mm मूसलाधार बारिश का अनुमान। खेत में जल निकासी प्रबंध करें।
              </p>
            </div>

            <div className="text-right">
              <span className="text-3xl font-black text-blue-900 block leading-none">29°C</span>
              <span className="text-[11px] font-bold text-stone-500">Thunderstorms</span>
            </div>
          </div>

          {/* Micro telemetry stats */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-blue-100 text-stone-700">
            <div className="bg-white/80 rounded-xl p-2 text-center">
              <span className="text-[10px] text-stone-500 font-bold block">Rain Alert</span>
              <span className="text-xs font-black text-blue-700">85%</span>
            </div>
            <div className="bg-white/80 rounded-xl p-2 text-center">
              <span className="text-[10px] text-stone-500 font-bold block">Wind</span>
              <span className="text-xs font-black text-stone-800">18 km/h</span>
            </div>
            <div className="bg-white/80 rounded-xl p-2 text-center">
              <span className="text-[10px] text-stone-500 font-bold block">Humidity</span>
              <span className="text-xs font-black text-emerald-700">82%</span>
            </div>
          </div>
        </div>

        {/* Right: Diesel Irrigation Savings (₹1,450 / 6 hours saved) */}
        <div className="bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/50 rounded-2xl p-5 border border-amber-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E0A526] text-[#4A2C17] text-[10px] font-black uppercase tracking-wider">
                  Diesel Savings Engine
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] text-[10px] font-black border border-emerald-300">
                  +₹1,450 Net Profit
                </span>
              </div>
              <h3 className="text-lg font-black text-[#101F16] pt-1">
                डीजल सिंचाई बचत (Diesel Savings)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed max-w-sm">
                आगामी भारी वर्षा के कारण नलकूप व डीजल पम्प <strong className="text-[#2C5E2E]">6 घंटे स्थगित</strong> रखें और 15 लीटर डीजल बचाएं।
              </p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <Fuel className="w-6 h-6" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-amber-100">
            <div>
              <span className="text-xs text-stone-500 font-bold">अनुमानित बचत:</span>
              <span className="text-sm font-black text-[#166534] ml-1">₹1,450 / 6 hours</span>
            </div>
            <button
              type="button"
              onClick={handleAddToCostLedger}
              className="px-4 py-2 rounded-xl bg-[#2C5E2E] text-white hover:bg-emerald-800 text-xs font-bold transition-all shadow-xs flex items-center gap-1 group cursor-pointer"
            >
              <span>Add to cost ledger</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. 12-Column Responsive Workspace Grid: Chat Assistant Stream (8 cols) + Scientific Widgets (4 cols) */}
      <section className="grid grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Conversational Stream Canvas */}
        <div className="col-span-12 xl:col-span-8 space-y-5">
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-stone-200 flex flex-col justify-between min-h-[540px] space-y-5">
            {/* Session Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#2C5E2E]" />
                <span className="text-xs font-black text-[#101F16]">
                  Agri-Scientist Engine v4.2 • ICAR & IMD Verified
                </span>
              </div>
              <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                Live Active Consultation
              </span>
            </div>

            {/* Conversation Stream */}
            <div className="space-y-4 flex-1">
              {/* Farmer Query Bubble */}
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-bold text-stone-500 mb-1">
                  {farmerProfile.name} • Voice Query (Hindi)
                </span>
                <div className="max-w-xl bg-[#E1F2E4] rounded-2xl rounded-tr-xs p-4 text-xs sm:text-sm font-semibold text-[#101F16] shadow-2xs">
                  "{activeQuery}"
                </div>
              </div>

              {/* AI Agronomist Response Bubble */}
              <div className="flex flex-col items-start max-w-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-[#2C5E2E] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#E0A526]" />
                    {activeAdvisory.speaker}
                  </span>
                  <span className="text-[10px] text-stone-400">{activeAdvisory.time}</span>
                </div>
                <div className="bg-[#2C5E2E] text-white rounded-2xl rounded-tl-xs p-5 shadow-sm space-y-3 text-xs sm:text-sm leading-relaxed">
                  <p>{activeAdvisory.text}</p>

                  {/* Audio Playback Bar */}
                  <div className="bg-white/10 rounded-xl p-3 border border-white/20 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={handleAudioPlay}
                        className="w-8 h-8 rounded-full bg-[#E0A526] text-[#4A2C17] flex items-center justify-center hover:scale-105 transition-transform shadow-xs"
                        title="आवाज में सुनें"
                      >
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </button>
                      <span className="font-bold">
                        {isPlayingAudio ? 'ऑडियो चल रहा है...' : `आवाज में सुनें (${activeAdvisory.audioSec})`}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
                          `🌾 किसान सहयोग AI परामर्श:\n\n${activeAdvisory.text}\n\n- KisaanSahyog Portal`
                        )}`;
                        window.open(url, '_blank');
                      }}
                      className="flex items-center gap-1 text-[11px] font-bold text-emerald-200 hover:text-white"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>व्हाट्सएप पर भेजें</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Leaf Scan Result Display if active */}
              {leafResult && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-bold text-amber-900 flex items-center gap-2 animate-fadeIn">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{leafResult}</span>
                </div>
              )}
            </div>

            {/* Interaction Input Bar */}
            <form onSubmit={handleSendMessage} className="pt-3 border-t border-stone-100 flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleLeafScan}
                disabled={isLeafAnalyzing}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-emerald-50 text-[#2C5E2E] text-xs font-bold hover:bg-emerald-100 transition-colors border border-emerald-200 shrink-0"
                title="पत्ती फोटो स्कैन"
              >
                <Camera className="w-4 h-4 text-[#E0A526]" />
                <span className="hidden sm:inline">{isLeafAnalyzing ? 'जांच...' : 'पत्ती स्कैन'}</span>
              </button>

              <div className="flex-1 flex items-center px-4 h-11 rounded-full bg-stone-50 border border-stone-200 focus-within:bg-white focus-within:border-[#2C5E2E]">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="खेती की समस्या या मौसम संबंधी सवाल यहां लिखें..."
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[#2C5E2E] text-white hover:bg-emerald-800 text-xs font-bold shadow-xs transition-all flex items-center gap-1"
              >
                <span>पूछें</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column (4 cols): Dedicated Fertilizer Calculator & Instant Leaf Diagnostic Scanner */}
        <div className="col-span-12 xl:col-span-4 space-y-5">
          {/* ICAR Fertilizer & Nutrient Advisory Widget */}
          <FertilizerCalculator inline={true} />

          {/* Instant Leaf Scanner Preview Card */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#101F16] flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#2C5E2E]" />
                <span>पत्ती रोग स्कैनर (Leaf Diagnostic)</span>
              </span>
              <span className="text-[10px] font-black text-emerald-800 bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                98.4% Accuracy
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              कैमरे से पत्ती की फोटो अपलोड करके पीला रतुआ, पत्ती धब्बा व कीट प्रकोप का तुरंत वैज्ञानिक समाधान प्राप्त करें।
            </p>
            <button
              type="button"
              onClick={handleLeafScan}
              className="w-full py-2.5 rounded-full bg-emerald-50 text-[#2C5E2E] border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
            >
              फोटो खींचें व जांचें
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
