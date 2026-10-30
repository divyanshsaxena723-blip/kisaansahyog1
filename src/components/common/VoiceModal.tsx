import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Mic, X, Bot, Sparkles, Volume2, ArrowRight } from 'lucide-react';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({ isOpen, onClose }) => {
  const { language } = useStore();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(
    language === 'hi'
      ? 'सीतापुर में अगले 48 घंटे में बारिश और गेहूं भाव क्या है?'
      : 'What is the 48-hr weather and wheat mandi rate in Sitapur?'
  );
  const [response, setResponse] = useState<string | null>(
    language === 'hi'
      ? 'सीतापुर में 85% भारी वर्षा का अनुमान है। आज गेहूं का भाव ₹2,585 - ₹2,850/क्विंटल चल रहा है।'
      : 'Heavy rain expected (85% chance). Current wheat mandi rate is ₹2,585 - ₹2,850 per quintal.'
  );

  if (!isOpen) return null;

  const handleToggleListening = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setTranscript(
        language === 'hi'
          ? 'सरसों बेचने का सही समय कब है?'
          : 'When is the best time to sell mustard harvest?'
      );
      setResponse(
        language === 'hi'
          ? 'सरसों अभी ₹6,200/क्विंटल के पार है जो एमएसपी ₹5,950 से +₹250 अधिक है। 50% स्टॉक तुरंत बेचना लाभकारी है।'
          : 'Mustard is currently trading above ₹6,200/Qtl (+₹250 above MSP). Favorable time to liquidate 50% stock.'
      );
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/10 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-base font-black text-[#101F16]">
              {language === 'hi' ? 'बोलकर पूछें (AI वॉइस सहायक)' : 'AI Voice Agronomy'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Mic Button */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative flex items-center justify-center">
            {isListening && (
              <div className="absolute w-36 h-36 rounded-full bg-emerald-300/40 animate-ping" />
            )}
            <button
              type="button"
              onClick={handleToggleListening}
              className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-xl active:scale-95 transition-all ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse ring-8 ring-red-100'
                  : 'bg-[#2C5E2E] text-white hover:bg-emerald-800 ring-8 ring-emerald-50'
              }`}
            >
              <Mic className="w-10 h-10" />
              <span className="text-[10px] font-black uppercase tracking-wider mt-0.5">
                {isListening ? 'Listening' : 'Tap to Speak'}
              </span>
            </button>
          </div>
          <p className="text-xs font-bold text-gray-600 mt-4 text-center">
            {isListening
              ? language === 'hi'
                ? 'आवाज़ पहचानी जा रही है...'
                : 'Listening to your dialect...'
              : language === 'hi'
              ? 'माइक दबाएं और अपनी भाषा में पूछें'
              : 'Tap mic to ask questions in Hindi or English'}
          </p>
        </div>

        {/* Dialog bubble */}
        <div className="space-y-3">
          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-800">
            <span className="text-[10px] font-bold text-emerald-800 block mb-0.5">
              {language === 'hi' ? 'आपने पूछा:' : 'You asked:'}
            </span>
            "{transcript}"
          </div>

          {response && (
            <div className="p-4 bg-[#2C5E2E] text-white rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 shadow-sm">
              <div className="flex items-center gap-1.5 text-[#E0A526] font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Sahyog Reply</span>
              </div>
              <p className="text-emerald-50">{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
