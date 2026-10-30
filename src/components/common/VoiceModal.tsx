import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import {
  Mic,
  MicOff,
  X,
  Sparkles,
  Volume2,
  VolumeX,
  Send,
  Loader2,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  queryVoicebot,
  voiceRecognition,
  voiceSynthesis,
  VoicebotResponse
} from '../../services/voicebotService';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({ isOpen, onClose }) => {
  const {
    language,
    userRole,
    userProfile,
    farmerProfile,
    voiceInitialPrompt,
    voiceAutoListen,
    setVoiceInitialPrompt,
    setVoiceAutoListen
  } = useStore();

  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [currentResponse, setCurrentResponse] = useState<VoicebotResponse | null>(null);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const contextLocation =
    userProfile?.location ||
    `${farmerProfile.district}, ${farmerProfile.state}` ||
    'Sitapur, Uttar Pradesh';

  const contextName = userProfile?.name || farmerProfile.name || 'Kisaan Mitra';

  // Handle incoming prompts or auto-listen when modal opens
  useEffect(() => {
    if (isOpen) {
      if (voiceInitialPrompt) {
        handleExecuteQuery(voiceInitialPrompt);
        setVoiceInitialPrompt(null);
      } else if (voiceAutoListen) {
        startListening();
        setVoiceAutoListen(false);
      } else if (!currentResponse) {
        // Default warm prompt
        const defaultPrompt =
          language === 'pa'
            ? 'ਮੀਂਹ ਦਾ ਅਨੁਮਾਨ ਅਤੇ ਕਣਕ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?'
            : language === 'hi'
            ? 'सीतापुर में अगले 48 घंटे में बारिश और गेहूं भाव क्या है?'
            : 'What is the 48-hr weather and wheat mandi rate in Sitapur?';
        handleExecuteQuery(defaultPrompt, false);
      }
    } else {
      voiceRecognition.stop();
      voiceSynthesis.stop();
      setIsListening(false);
    }
  }, [isOpen, voiceInitialPrompt, voiceAutoListen]);

  // Keep scroll area at the bottom when responses arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentResponse, transcript, isListening]);

  if (!isOpen) return null;

  const handleExecuteQuery = (query: string, speakAudio = true) => {
    setTranscript(query);
    setInputText('');
    setIsProcessing(true);

    setTimeout(() => {
      const response = queryVoicebot(query, {
        language,
        userRole,
        userName: contextName,
        location: contextLocation
      });

      setCurrentResponse(response);
      setIsProcessing(false);

      if (speakAudio && !isMuted) {
        voiceSynthesis.speak(response.spokenText, language);
      }
    }, 250);
  };

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    voiceSynthesis.stop();

    voiceRecognition.start(
      language,
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal && text.trim().length > 1) {
          setIsListening(false);
          handleExecuteQuery(text.trim(), true);
        }
      },
      (error) => {
        console.warn('Speech recognition warning:', error);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const stopListening = () => {
    voiceRecognition.stop();
    setIsListening(false);
    if (transcript.trim().length > 1) {
      handleExecuteQuery(transcript.trim(), true);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    voiceSynthesis.setMuted(next);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (isListening) stopListening();
    handleExecuteQuery(inputText.trim(), true);
  };

  const handleClose = () => {
    voiceRecognition.stop();
    voiceSynthesis.stop();
    setIsListening(false);
    onClose();
  };

  // Quick Chips for immediate tapping inside the modal
  const MODAL_QUICK_CHIPS = [
    { label: '🌧️ Will it rain today?', query: 'सीतापुर में आज वर्षा की क्या संभावना है?' },
    { label: '⛽ Diesel irrigation savings', query: 'वर्षा से पहले पम्प बंद करने पर कितना डीजल बचेगा?' },
    { label: '🌾 Today Wheat Mandi Rate', query: 'आज सीतापुर मंडी में शरबती गेहूं का उच्चतम भाव क्या है?' },
    { label: '🌿 Yellow Rust treatment', query: 'गेहूं में पीला रतुआ दिखने पर कौन सी दवा का छिड़काव करें?' },
    { label: '🌱 Best price to sell Mustard', query: 'सरसों की फसल कब बेचना सबसे फायदेमंद रहेगा?' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/10 flex flex-col max-h-[92vh]">
        
        {/* Header Ribbon */}
        <div className="flex items-center justify-between border-b border-stone-200/80 px-5 py-4 bg-[#FAF6EE] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isListening ? 'bg-red-400' : 'bg-emerald-400'}`} />
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isListening ? 'bg-red-600' : 'bg-[#2C5E2E]'}`} />
            </span>
            <div>
              <h3 className="text-base font-black text-[#101F16]">
                {language === 'pa'
                  ? 'ਏਆਈ ਖੇਤੀਬਾੜੀ ਸਹਾਇਕ (Voicebot)'
                  : language === 'hi'
                  ? 'बोलकर पूछें (AI वॉइस सहायक)'
                  : 'AI Voice Agronomist'}
              </h3>
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block -mt-0.5">
                {contextLocation} • Voice & Multilingual Model
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio Mute/Unmute Toggle */}
            <button
              type="button"
              onClick={handleToggleMute}
              className={`p-2 rounded-full border transition-all ${
                isMuted
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white text-[#2C5E2E] border-stone-200 hover:bg-stone-50'
              }`}
              title={isMuted ? 'Unmute Voice' : 'Mute Voice'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Conversation Content Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#FAF6EE]/30">
          
          {/* User Asked / Live Transcription Bubble */}
          {(transcript || isListening) && (
            <div className="p-3.5 bg-white rounded-2xl border border-stone-200 text-xs font-semibold text-stone-900 shadow-2xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#2C5E2E] block mb-1">
                {isListening ? (
                  <span className="flex items-center gap-1.5 text-red-600 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                    {language === 'pa' ? 'ਸੁਣ ਰਿਹਾ ਹਾਂ...' : language === 'hi' ? 'लाइव आवाज़ पहचानी जा रही है...' : 'Listening in real-time...'}
                  </span>
                ) : (
                  language === 'pa' ? 'ਤੁਸੀਂ ਪੁੱਛਿਆ:' : language === 'hi' ? 'आपने पूछा:' : 'You asked:'
                )}
              </span>
              <p className="text-sm font-bold text-[#101F16]">
                "{transcript || (language === 'hi' ? 'बोलिए, मैं सुन रहा हूँ...' : 'Please speak now...')}"
              </p>
            </div>
          )}

          {/* Assistant Response Area with Rich Markdown & Styled Tables */}
          {isProcessing ? (
            <div className="p-6 bg-white rounded-2xl border border-stone-200 text-center space-y-2">
              <Loader2 className="w-6 h-6 text-[#2C5E2E] animate-spin mx-auto" />
              <p className="text-xs font-bold text-stone-600">
                {language === 'pa'
                  ? 'ਮੌਸਮ, ਮਿੱਟੀ ਅਤੇ ਮੰਡੀ ਦੇ ਅੰਕੜੇ ਦੇਖ ਕੇ ਜਵਾਬ ਤਿਆਰ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...'
                  : language === 'hi'
                  ? 'मौसम, मिट्टी व मंडी डेटा का विश्लेषण कर उत्तर तैयार हो रहा है...'
                  : 'Analyzing agro-meteorological data & generating tables...'}
              </p>
            </div>
          ) : currentResponse ? (
            <div className="p-4 sm:p-5 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div className="flex items-center gap-1.5 text-[#2C5E2E] font-black text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#E0A526]" />
                  <span>KisaanSahyog AI Assistant</span>
                </div>
                {!isMuted && (
                  <button
                    type="button"
                    onClick={() => voiceSynthesis.speak(currentResponse.spokenText, language)}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#2C5E2E] hover:underline"
                    title="Repeat voice reply"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{language === 'hi' ? 'दोबारा सुनें' : 'Listen'}</span>
                  </button>
                )}
              </div>

              {/* Render Markdown with Customized Tailwind Table Components */}
              <div className="prose prose-stone prose-sm max-w-none text-[#101F16]">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    table: ({ node, ...props }) => (
                      <div className="overflow-x-auto my-3 rounded-xl border border-stone-200 shadow-2xs">
                        <table
                          className="w-full text-xs text-left border-collapse border border-stone-200 my-2 rounded-lg overflow-hidden"
                          {...props}
                        />
                      </div>
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        className="bg-emerald-800 text-white p-2 font-semibold text-xs tracking-tight"
                        {...props}
                      />
                    ),
                    td: ({ node, ...props }) => (
                      <td
                        className="p-2 border-b border-stone-200 bg-white/80 text-stone-800 text-xs font-medium"
                        {...props}
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3
                        className="text-base font-black text-[#101F16] mt-1 mb-2"
                        {...props}
                      />
                    ),
                    h4: ({ node, ...props }) => (
                      <h4
                        className="text-sm font-extrabold text-[#2C5E2E] mt-2 mb-1"
                        {...props}
                      />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        className="border-l-4 border-[#E0A526] bg-amber-50/70 p-3 rounded-r-xl text-xs font-medium text-amber-950 my-2"
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-2" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-black text-[#101F16]" {...props} />
                    )
                  }}
                >
                  {currentResponse.markdown}
                </ReactMarkdown>
              </div>

              {/* Spoken Closing Message */}
              <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-400 italic">
                ℹ️ {language === 'pa' ? 'ਇਹ ਸੁਝਾਅ ਉਪਲਬਧ ਅੰਕੜਿਆਂ ਉੱਤੇ ਆਧਾਰਿਤ ਹਨ।' : language === 'hi' ? 'यह सुझाव उपलब्ध आंकड़ों व मौसम मॉडलों पर आधारित अनुमान है।' : 'Projections are based on current data models.'}
              </div>
            </div>
          ) : null}

          {/* Quick-Prompt Suggestions Rail */}
          <div className="pt-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block mb-1.5">
              💡 {language === 'pa' ? 'ਤੁਰੰਤ ਸਵਾਲ (Quick Prompts):' : language === 'hi' ? 'त्वरित प्रश्न चुनें (Quick Prompts):' : 'Suggested Agronomy Queries:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {MODAL_QUICK_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleExecuteQuery(chip.query)}
                  className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-stone-700 hover:text-[#2C5E2E] border border-stone-200 transition shadow-2xs"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Voice Controls & Text Input Fallback */}
        <div className="p-4 bg-white border-t border-stone-200/80 space-y-3 shrink-0">
          
          {/* Large Pulsing Center Record Button */}
          <div className="flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              {isListening && (
                <>
                  <div className="absolute w-28 h-28 rounded-full bg-red-400/30 animate-ping" />
                  <div className="absolute w-24 h-24 rounded-full bg-red-500/20 animate-pulse" />
                </>
              )}
              <button
                type="button"
                onClick={toggleListening}
                className={`relative z-10 w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-lg active:scale-95 transition-all ${
                  isListening
                    ? 'bg-red-600 text-white ring-4 ring-red-100 animate-pulse'
                    : 'bg-[#2C5E2E] text-white hover:bg-emerald-800 ring-4 ring-emerald-50'
                }`}
                title={isListening ? 'Stop Listening' : 'Tap to Speak'}
              >
                {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                <span className="text-[9px] font-black uppercase tracking-wider mt-0.5">
                  {isListening ? 'Stop' : 'Speak'}
                </span>
              </button>
            </div>
          </div>

          <p className="text-[11px] font-bold text-center text-stone-500">
            {isListening
              ? language === 'pa'
                ? 'ਕਿਰਪਾ ਕਰਕੇ ਬੋਲੋ... ਤੁਹਾਡੀ ਆਵਾਜ਼ ਦਰਜ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...'
                : language === 'hi'
                ? 'कृपया बोलें... आपकी आवाज़ दर्ज हो रही है...'
                : 'Listening to your dialect... Speak your query'
              : language === 'pa'
              ? 'ਮਾਈਕ ਦਬਾ ਕੇ ਪੰਜਾਬੀ, ਹਿੰਦੀ ਜਾਂ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਪੁੱਛੋ'
              : language === 'hi'
              ? 'माइक दबाकर हिंदी, पंजाबी या अंग्रेजी में पूछें'
              : 'Tap mic to speak in Hindi, Punjabi, or English'}
          </p>

          {/* Text Input Fallback */}
          <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                language === 'pa'
                  ? 'ਜਾਂ ਇੱਥੇ ਸਵਾਲ ਲਿਖੋ (ਜਿਵੇਂ: ਕਣਕ ਦਾ ਰੇਟ, ਯੂਰੀਆ ਸਪਰੇਅ)...'
                  : language === 'hi'
                  ? 'या यहाँ टाइप करें (उदा. गेहूं भाव, खाद की मात्रा)...'
                  : 'Or type your question here...'
              }
              className="flex-1 px-4 py-2.5 rounded-full border border-stone-200 bg-[#FAF6EE] text-xs font-semibold text-[#101F16] focus:outline-none focus:ring-2 focus:ring-[#2C5E2E]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-full bg-[#2C5E2E] hover:bg-emerald-800 disabled:opacity-40 text-white flex items-center justify-center transition shadow-xs shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default VoiceModal;
