import { SupportedLanguage, UserRole } from '../types';

export interface VoicebotContext {
  language: SupportedLanguage;
  userRole: UserRole;
  userName?: string;
  location?: string;
}

export interface VoicebotResponse {
  markdown: string;
  spokenText: string;
  category: 'weather' | 'fuel' | 'mandi' | 'disease' | 'fertilizer' | 'general';
}

// Closing advice appended to every response, ported from Voicebot bot_logic.CLOSING
export const CLOSING_MESSAGE: Record<SupportedLanguage, string> = {
  en: "The suggestions and predictions given here are estimated from the available data and may vary a little.",
  hi: "यहाँ दी गई सलाह और अनुमान उपलब्ध आँकड़ों पर आधारित हैं और थोड़े अलग हो सकते हैं।",
  pa: "ਇੱਥੇ ਦਿੱਤੀ ਸਲਾਹ ਅਤੇ ਅੰਦਾਜ਼ੇ ਉਪਲਬਧ ਅੰਕੜਿਆਂ ਉੱਤੇ ਆਧਾਰਿਤ ਹਨ ਅਤੇ ਥੋੜ੍ਹੇ ਵੱਖਰੇ ਹੋ ਸਕਦੇ ਹਨ।"
};

// Phonetic native translations for speech synthesis from voice.py _NATIVE
const NATIVE_PHONETICS: Record<string, [string, string][]> = {
  hi: [
    ['urea', 'यूरिया'],
    ['dap', 'डी ए पी'],
    ['mop', 'एम ओ पी'],
    ['ssp', 'एस एस पी'],
    ['potash', 'पोटाश'],
    ['nitrogen', 'नाइट्रोजन'],
    ['phosphorus', 'फॉस्फोरस'],
    ['zinc sulphate', 'ज़िंक सल्फेट'],
    ['msp', 'एम एस पी'],
    ['quintals', 'क्विंटल'],
    ['quintal', 'क्विंटल'],
    ['kilograms', 'किलो'],
    ['kilogram', 'किलो'],
    ['kg', 'किलो'],
    ['acres', 'एकड़'],
    ['acre', 'एकड़'],
    ['bigha', 'बीघा'],
    ['rupees', 'रुपये'],
    ['rs.', 'रुपये'],
    ['tilt', 'टिल्ट'],
    ['propiconazole', 'प्रोपिकोनाजोल'],
    ['puccinia', 'पक्सीनिया'],
    ['hectare', 'हेक्टेयर'],
    ['hp', 'हॉर्स पावर']
  ],
  pa: [
    ['urea', 'ਯੂਰੀਆ'],
    ['dap', 'ਡੀ ਏ ਪੀ'],
    ['mop', 'ਐਮ ਓ ਪੀ'],
    ['ssp', 'ਐਸ ਐਸ ਪੀ'],
    ['potash', 'ਪੋਟਾਸ਼'],
    ['nitrogen', 'ਨਾਈਟ੍ਰੋਜਨ'],
    ['phosphorus', 'ਫਾਸਫੋਰਸ'],
    ['zinc sulphate', 'ਜ਼ਿੰਕ ਸਲਫੇਟ'],
    ['msp', 'ਐਮ ਐਸ ਪੀ'],
    ['quintals', 'ਕੁਇੰਟਲ'],
    ['quintal', 'ਕੁਇੰਟਲ'],
    ['kilograms', 'ਕਿਲੋ'],
    ['kg', 'ਕਿਲੋ'],
    ['acres', 'ਏਕੜ'],
    ['acre', 'ਏਕੜ'],
    ['bigha', 'ਬੀਘਾ'],
    ['rupees', 'ਰੁਪਏ'],
    ['tilt', 'ਟਿਲਟ'],
    ['propiconazole', 'ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ']
  ]
};

// Clean speech helper
function sanitizeForSpeech(markdown: string, language: SupportedLanguage): string {
  // Strip markdown tables, links, images, headings, and asterisks
  let cleaned = markdown
    .replace(/\|[^\n]+\|/g, '') // Remove table rows
    .replace(/[-]{3,}/g, '')
    .replace(/[#*`_~]/g, '') // Remove formatting characters
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [text](url) -> text
    .replace(/\s+/g, ' ')
    .trim();

  // Apply phonetic pronunciations for Hindi/Punjabi
  const phonetics = NATIVE_PHONETICS[language] || [];
  for (const [term, replacement] of phonetics) {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    cleaned = cleaned.replace(regex, replacement);
  }

  // Remove rupee symbol
  cleaned = cleaned.replace(/₹\s*(\d+)/g, language === 'pa' ? '$1 ਰੁਪਏ' : language === 'hi' ? '$1 रुपये' : '$1 Rupees');

  return cleaned;
}

// -------------------------------------------------------------
// Speech Recognition Wrapper (Web Speech API)
// -------------------------------------------------------------
export class SpeechRecognitionHandler {
  private recognition: any = null;
  private isListening = false;
  private onResultCallback?: (transcript: string, isFinal: boolean) => void;
  private onErrorCallback?: (error: string) => void;
  private onEndCallback?: () => void;

  constructor() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        if (this.onResultCallback) {
          this.onResultCallback(final || interim, Boolean(final));
        }
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        if (this.onErrorCallback) {
          this.onErrorCallback(event.error || 'Speech recognition error');
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.onEndCallback) {
          this.onEndCallback();
        }
      };
    }
  }

  public isSupported(): boolean {
    return Boolean(this.recognition);
  }

  public start(
    language: SupportedLanguage,
    onResult: (transcript: string, isFinal: boolean) => void,
    onError?: (err: string) => void,
    onEnd?: () => void
  ) {
    if (!this.recognition) {
      if (onError) onError('Speech recognition is not supported in this browser.');
      return;
    }

    try {
      if (this.isListening) {
        this.recognition.stop();
      }

      this.onResultCallback = onResult;
      this.onErrorCallback = onError;
      this.onEndCallback = onEnd;

      // Set locale based on language
      const langMap: Record<SupportedLanguage, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        pa: 'pa-IN'
      };
      this.recognition.lang = langMap[language] || 'hi-IN';
      this.isListening = true;
      this.recognition.start();
    } catch (err: any) {
      this.isListening = false;
      if (onError) onError(err?.message || 'Could not start microphone');
    }
  }

  public stop() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore
      }
    }
    this.isListening = false;
  }
}

// -------------------------------------------------------------
// Speech Synthesis (Text-to-Speech)
// -------------------------------------------------------------
export class SpeechSynthesisHandler {
  private isMuted = false;

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public speak(text: string, language: SupportedLanguage, onEnd?: () => void) {
    if (this.isMuted || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel();

    const cleanText = sanitizeForSpeech(text, language);
    const closing = CLOSING_MESSAGE[language] || CLOSING_MESSAGE.en;
    const fullSpoken = `${cleanText}. ${closing}`;

    const utterance = new SpeechSynthesisUtterance(fullSpoken);
    utterance.rate = 0.95; // Slightly slower, easy to follow outdoors as specified in voice.py

    const langLocale: Record<SupportedLanguage, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      pa: 'pa-IN'
    };
    utterance.lang = langLocale[language] || 'hi-IN';

    // Find best voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find((v) =>
      v.lang.toLowerCase().startsWith(utterance.lang.toLowerCase())
    ) || voices.find((v) => v.lang.includes('hi') || v.lang.includes('IN'));

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }
}

// Singleton instances
export const voiceRecognition = new SpeechRecognitionHandler();
export const voiceSynthesis = new SpeechSynthesisHandler();

// -------------------------------------------------------------
// Voicebot Reasoning Engine
// -------------------------------------------------------------
export function queryVoicebot(
  prompt: string,
  context: VoicebotContext
): VoicebotResponse {
  const p = prompt.toLowerCase().trim();
  const lang = context.language;
  const userLoc = context.location || 'Sitapur, Uttar Pradesh';
  const userName = context.userName || 'Kisaan Mitra';

  // 1. Weather / Rain: "🌧️ Will it rain today?"
  if (
    p.includes('rain') ||
    p.includes('बारिश') ||
    p.includes('वर्षा') ||
    p.includes('ਮੀਂਹ') ||
    p.includes('weather') ||
    p.includes('मौसम') ||
    p.includes('ਮੌਸਮ')
  ) {
    if (lang === 'hi') {
      const markdown = `
### 🌧️ मौसम पूर्वानुमान व वर्षा चेतावनी (${userLoc})

नमस्ते **${userName}** जी! मौसम उपग्रह रडार एवं IMD आंकड़ों के अनुसार आपके क्षेत्र में अगले 48 घंटों में **85% भारी वर्षा** का प्रबल अनुमान है।

> **महत्वपूर्ण कृषि चेतावनी:** वर्षा से पूर्व यूरिया अथवा किसी भी रासायनिक खाद का टॉप ड्रेसिंग छिड़काव तुरंत स्थगित रखें ताकि लीचिंग (बहाव) से नुकसान न हो।

#### 📊 48-घंटे सूक्ष्म मौसम सारणी:
| समय (Time) | तापमान (°C) | वर्षा संभावना | हवा की गति | कृषि सलाह (Advisory) |
| :--- | :--- | :--- | :--- | :--- |
| **आज दोपहर** | 28°C | **85% (भारी वर्षा)** | 18 km/h | ⚠️ खेतों के जल निकास द्वार खोलें |
| **आज शाम** | 24°C | **90% (तेज़ बौछारें)** | 22 km/h | रासायनिक स्प्रे 48 घंटे स्थगित रखें |
| **कल सुबह** | 22°C | **40% (हल्की वर्षा)** | 12 km/h | खरपतवार नाशी न डालें |
| **कल दोपहर** | 26°C | **15% (साफ)** | 10 km/h | सामान्य कृषि कार्य हेतु अनुकूल |

*सुझाव: पम्प द्वारा सिंचाई तुरंत रोकें ताकि बिजली व डीजल दोनों की बचत हो सके।*
`;
      return {
        markdown,
        spokenText: `${userName} जी, ${userLoc} में अगले अड़तालीस घंटों में पचासी प्रतिशत भारी वर्षा का अनुमान है। यूरिया का छिड़काव तुरंत रोक दें और खेतों की जल निकासी नालियां खोल दें।`,
        category: 'weather'
      };
    } else if (lang === 'pa') {
      const markdown = `
### 🌧️ ਮੌਸਮ ਅਤੇ ਮੀਂਹ ਦੀ ਚਿਤਾਵਨੀ (${userLoc})

ਸਤ ਸ੍ਰੀ ਅਕਾਲ **${userName}** ਜੀ! ਮੌਸਮ ਰਾਡਾਰ ਅਨੁਸਾਰ ਅਗਲੇ 48 ਘੰਟਿਆਂ ਵਿੱਚ ਤੁਹਾਡੇ ਖੇਤਰ ਵਿੱਚ **85% ਭਾਰੀ ਮੀਂਹ** ਪੈਣ ਦੀ ਸੰਭਾਵਨਾ ਹੈ।

> **ਜ਼ਰੂਰੀ ਸਲਾਹ:** ਮੀਂਹ ਤੋਂ ਪਹਿਲਾਂ ਯੂਰੀਆ ਜਾਂ ਕਿਸੇ ਵੀ ਸਪਰੇਅ ਨੂੰ ਤੁਰੰਤ ਰੋਕ ਦਿਓ।

#### 📊 48-ਘੰਟੇ ਮੌਸਮ ਸਾਰਣੀ:
| ਸਮਾਂ (Time) | ਤਾਪਮਾਨ (°C) | ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ | ਹਵਾ ਦੀ ਗਤੀ | ਖੇਤੀ ਸਲਾਹ (Advisory) |
| :--- | :--- | :--- | :--- | :--- |
| **ਅੱਜ ਦੁਪਹਿਰ** | 28°C | **85% (ਭਾਰੀ ਮੀਂਹ)** | 18 km/h | ⚠️ ਖੇਤਾਂ ਦੀ ਨਿਕਾਸੀ ਨਾਲੀ ਸਾਫ਼ ਕਰੋ |
| **ਅੱਜ ਸ਼ਾਮ** | 24°C | **90% (ਤੇਜ਼ ਬੌਛਾਰ)** | 22 km/h | ਸਪਰੇਅ 48 ਘੰਟੇ ਮੁਲਤਵੀ ਰੱਖੋ |
| **ਕੱਲ੍ਹ ਸਵੇਰੇ** | 22°C | **40% (ਹਲਕੀ ਬਾਰਸ਼)** | 12 km/h | ਸਿੰਚਾਈ ਬਿਲਕੁਲ ਨਾ ਕਰੋ |
| **ਕੱਲ੍ਹ ਦੁਪਹਿਰ** | 26°C | **15% (ਸਾਫ਼)** | 10 km/h | ਆਮ ਖੇਤੀਬਾੜੀ ਕੰਮ ਸ਼ੁਰੂ ਕਰੋ |
`;
      return {
        markdown,
        spokenText: `${userName} ਜੀ, ${userLoc} ਵਿੱਚ ਅਗਲੇ ਅਠਤਾਲੀ ਘੰਟਿਆਂ ਦੌਰਾਨ ਪੰਜਾਸੀ ਪ੍ਰਤੀਸ਼ਤ ਭਾਰੀ ਮੀਂਹ ਦਾ ਅਨੁਮਾਨ ਹੈ। ਯੂਰੀਆ ਸਪਰੇਅ ਤੁਰੰਤ ਰੋਕੋ ਅਤੇ ਪਾਣੀ ਦੀ ਨਿਕਾਸੀ ਦਾ ਪ੍ਰਬੰਧ ਕਰੋ।`,
        category: 'weather'
      };
    } else {
      const markdown = `
### 🌧️ Hyperlocal Weather & Rain Radar (${userLoc})

Hello **${userName}**! Meteorological data confirms an **85% probability of heavy precipitation** over the next 48 hours in your region.

> **Critical Agronomy Notice:** Suspend all top-dress Urea applications immediately to avoid surface fertilizer runoff and nitrogen leaching.

#### 📊 48-Hour Micro-Forecast Table:
| Time Window | Temp (°C) | Rain Chance | Wind Speed | Field Action Advisory |
| :--- | :--- | :--- | :--- | :--- |
| **Today Noon** | 28°C | **85% (Heavy Rain)** | 18 km/h | ⚠️ Clear drainage furrows |
| **Today Evening**| 24°C | **90% (Downpour)** | 22 km/h | Postpone chemical sprays 48h |
| **Tomorrow AM** | 22°C | **40% (Showers)** | 12 km/h | Shut off tube-well pumps |
| **Tomorrow PM** | 26°C | **15% (Clearing)** | 10 km/h | Safe for post-rain inspection |
`;
      return {
        markdown,
        spokenText: `${userName}, heavy rainfall of eighty-five percent probability is forecasted across ${userLoc} over the next forty-eight hours. Halt urea applications and open field drainage channels immediately.`,
        category: 'weather'
      };
    }
  }

  // 2. Diesel Irrigation Savings: "⛽ Diesel irrigation savings"
  if (
    p.includes('diesel') ||
    p.includes('डीजल') ||
    p.includes('ਡੀਜ਼ਲ') ||
    p.includes('savings') ||
    p.includes('बचत') ||
    p.includes('बचेगा') ||
    p.includes('irrigation') ||
    p.includes('सिंचाई')
  ) {
    if (lang === 'hi') {
      const markdown = `
### ⛽ वर्षा-पूर्व पम्प बचत विश्लेषण (${userLoc})

आगामी भारी वर्षा से पूर्व डीजल पम्प स्थगित करने पर आपकी डीजल खपत एवं उपकरण सुरक्षा का वैज्ञानिक आकलन:

#### 📊 शुद्ध ईंधन व नकदी बचत गणना:
| मद (Parameter) | मान (Value) | आर्थिक व तकनीकी प्रभाव |
| :--- | :--- | :--- |
| **पम्प क्षमता (Pump HP)** | 7.5 HP (डीजल इंजन) | सामान्य सतही सिंचाई दर |
| **डीजल खपत दर** | 2.5 लीटर प्रति घंटा | ₹95 प्रति लीटर ईंधन दर |
| **स्थगित अवधि (Delay Hours)** | **6 घंटे** (वर्षा पूर्व) | वर्षा द्वारा प्राकृतिक नमी पूर्ति |
| **बचाया गया डीजल (Fuel Saved)**| **15.0 लीटर** | ईंधन संरक्षण |
| **💰 शुद्ध नकदी बचत (Cash Saved)** | **₹1,425** | **तत्काल वित्तीय बचत** |

> **कृषि वैज्ञानिक टिप:** वर्षा के पानी में घुलित प्राकृतिक वायुमंडलीय नाइट्रोजन (NO3) पौधों को मुफ्त जैविक खाद का पोषण प्रदान करती है।
`;
      return {
        markdown,
        spokenText: `बारिश से पहले छह घंटे डीजल पम्प बंद रखने पर आपकी कुल पंद्रह लीटर डीजल और एक हजार चार सौ पच्चीस रुपये की शुद्ध बचत होगी।`,
        category: 'fuel'
      };
    } else if (lang === 'pa') {
      const markdown = `
### ⛽ ਡੀਜ਼ਲ ਸਿੰਚਾਈ ਬਚਤ ਵਿਸ਼ਲੇਸ਼ਣ (${userLoc})

ਮੀਂਹ ਤੋਂ ਪਹਿਲਾਂ ਟਿਊਬਵੈੱਲ ਪੰਪ ਬੰਦ ਰੱਖਣ 'ਤੇ ਤੁਹਾਡੀ ਡੀਜ਼ਲ ਬਚਤ:

#### 📊 ਬਚਤ ਗਣਨਾ ਸਾਰਣੀ:
| ਮਦ (Parameter) | ਮੁੱਲ (Value) | ਵਿੱਤੀ ਪ੍ਰਭਾਵ |
| :--- | :--- | :--- |
| **ਪੰਪ ਸਮਰੱਥਾ** | 7.5 HP ਡੀਜ਼ਲ ਇੰਜਣ | ਮਿਆਰੀ ਸਿੰਚਾਈ ਦਰ |
| **ਖਪਤ ਦਰ** | 2.5 ਲੀਟਰ ਪ੍ਰਤੀ ਘੰਟਾ | ₹95 ਪ੍ਰਤੀ ਲੀਟਰ |
| **ਮੁਲਤਵੀ ਸਮਾਂ** | **6 ਘੰਟੇ** | ਕੁਦਰਤੀ ਮੀਂਹ ਦਾ ਪਾਣੀ |
| **ਕੁੱਲ ਡੀਜ਼ਲ ਬਚਤ** | **15 ਲੀਟਰ** | ਬਾਲਣ ਬਚਤ |
| **💰 ਸ਼ੁੱਧ ਬਚਤ (Cash Saved)** | **₹1,425** | **ਸਿੱਧੀ ਨਕਦ ਬਚਤ** |
`;
      return {
        markdown,
        spokenText: `ਮੀਂਹ ਤੋਂ ਪਹਿਲਾਂ ਛੇ ਘੰਟੇ ਪੰਪ ਬੰਦ ਰੱਖਣ ਨਾਲ ਤੁਹਾਡੇ ਪੰਦਰਾਂ ਲੀਟਰ ਡੀਜ਼ਲ ਅਤੇ ਚੌਦਾਂ ਸੌ ਪੱਚੀ ਰੁਪਏ ਦੀ ਸਿੱਧੀ ਬਚਤ ਹੋਵੇਗੀ।`,
        category: 'fuel'
      };
    } else {
      const markdown = `
### ⛽ Pre-Rainfall Diesel Irrigation Savings Audit

Estimated energy and cash savings by shutting off tractor/pump irrigation ahead of incoming precipitation in **${userLoc}**:

#### 📊 Savings Ledger:
| Operational Metric | Parameter Value | Economic & Field Impact |
| :--- | :--- | :--- |
| **Pump Output** | 7.5 HP Diesel Genset | Standard acre inundation |
| **Fuel Burn Rate** | 2.5 Liters / Hour | At ₹95 / Liter current retail |
| **Avoided Operating Time** | **6.0 Hours** | Replaced by natural precipitation |
| **Gross Fuel Conserved** | **15.0 Liters** | Emissions reduction |
| **💰 Net Cash Saved** | **₹1,425** | **Immediate direct savings** |
`;
      return {
        markdown,
        spokenText: `Halting pump operations six hours ahead of rainfall conserves fifteen liters of diesel, delivering one thousand four hundred and twenty-five rupees in direct cash savings.`,
        category: 'fuel'
      };
    }
  }

  // 3. Wheat Mandi Rate: "🌾 Today Wheat Mandi Rate"
  if (
    p.includes('wheat') ||
    p.includes('गेहूं') ||
    p.includes('ਗੇਂਹੂ') ||
    p.includes('ਕਣਕ') ||
    (p.includes('mandi') && (p.includes('rate') || p.includes('भाव') || p.includes('ਭਾਅ')))
  ) {
    if (lang === 'hi') {
      const markdown = `
### 🌾 आज का गेहूं मंडी भाव बुलेटिन (${userLoc})

सरकारी न्यूनतम समर्थन मूल्य (MSP 2026): **₹2,425/क्विंटल**  
आज आपके क्षेत्र में शरबती एवं लोकवान प्रीमियम ग्रेड की आवक मजबूत है:

#### 📊 क्षेत्रीय मंडी लाइव भाव तुलना (₹ प्रति क्विंटल):
| मंडी यार्ड (Mandi Yard) | किस्म / ग्रेड | न्यूनतम (Min) | मॉडल भाव (Modal) | उच्चतम (Max) | MSP से अंतर |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **सीतापुर मुख्य मंडी** | **शरबती (Grade A)** | ₹2,550 | **₹2,850** | ₹2,920 | **+₹425 (उत्कृष्ट)** |
| **लखीमपुर गल्ला मंडी** | लोकवान (Lokwan 1482)| ₹2,480 | ₹2,650 | ₹2,740 | +₹225 |
| **हरदोई एपीएमसी** | देसी मिल क्वालिटी | ₹2,520 | ₹2,780 | ₹2,860 | +₹355 |
| **सीहोर (मध्य प्रदेश)** | शरबती गोल्ड | ₹2,900 | ₹3,150 | ₹3,320 | +₹725 |

> **बाजार रणनीति:** यदि दाना सूखा है (नमी < 10.5%), तो KisaanSahyog बाज़ार पर सीधे संस्थागत आटा मिलों को ₹2,850/क्विंटल पर टोकन एस्क्रो के साथ बेचें।
`;
      return {
        markdown,
        spokenText: `सीतापुर मंडी में आज शरबती गेहूं दो हजार आठ सौ पचास रुपये प्रति क्विंटल बिका, जो समर्थन मूल्य से चार सौ पच्चीस रुपये अधिक है। अपना लॉट लिस्ट करने का यह उपयुक्त समय है।`,
        category: 'mandi'
      };
    } else if (lang === 'pa') {
      const markdown = `
### 🌾 ਅੱਜ ਦਾ ਕਣਕ ਮੰਡੀ ਭਾਅ ਬੁਲੇਟਿਨ (${userLoc})

ਸਰਕਾਰੀ ਸਮਰਥਨ ਮੁੱਲ (MSP 2026): **₹2,425/ਕੁਇੰਟਲ**  

#### 📊 ਮੰਡੀ ਲਾਈਵ ਭਾਅ ਤੁਲਨਾ (₹ ਪ੍ਰਤੀ ਕੁਇੰਟਲ):
| ਮੰਡੀ ਯਾਰਡ (Mandi Yard) | ਕਿਸਮ / ਗ੍ਰੇਡ | ਘੱਟੋ-ਘੱਟ | ਮਾਡਲ ਭਾਅ | ਵੱਧ ਤੋਂ ਵੱਧ | MSP ਨਾਲੋਂ ਫ਼ਰਕ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ਲੁਧਿਆਣਾ ਮੁੱਖ ਮੰਡੀ** | **ਸ਼ਰਬਤੀ ਸੁਪਰੀਮ** | ₹2,600 | **₹2,880** | ₹2,950 | **+₹455** |
| **ਖੰਨਾ ਏਸ਼ੀਆ ਮੰਡੀ** | ਪੀਬੀਡਬਲਿਊ 725 | ₹2,520 | ₹2,720 | ₹2,800 | +₹295 |
| **ਜਲੰਧਰ ਮੰਡੀ** | ਮਿਲਿੰਗ ਗ੍ਰੇਡ | ₹2,480 | ₹2,660 | ₹2,740 | +₹235 |
`;
      return {
        markdown,
        spokenText: `ਅੱਜ ਸ਼ਰਬਤੀ ਕਣਕ ਦਾ ਮਾਡਲ ਭਾਅ ਅਠਾਈ ਸੌ ਅੱਸੀ ਰੁਪਏ ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਚੱਲ ਰਿਹਾ ਹੈ, ਜੋ ਸਰਕਾਰੀ ਸਮਰਥਨ ਮੁੱਲ ਨਾਲੋਂ ਚਾਰ ਸੌ ਪਚਵੰਜਾ ਰੁਪਏ ਵੱਧ ਹੈ।`,
        category: 'mandi'
      };
    } else {
      const markdown = `
### 🌾 Today's Wheat Mandi Rate Bulletin (${userLoc})

Government MSP Benchmark (2026): **₹2,425 / Quintal**  
Strong institutional buying demand recorded across major regional procurement yards:

#### 📊 Live Mandi Benchmark Comparison (₹ / Quintal):
| Mandi Yard | Grade & Variety | Min Price | Modal (Avg) | Max Realized | Spread vs MSP |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Sitapur Central** | **Sharbati Grade A** | ₹2,550 | **₹2,850** | ₹2,920 | **+₹425 (Bullish)** |
| **Lakhimpur Yard** | Lokwan Cleaned | ₹2,480 | ₹2,650 | ₹2,740 | +₹225 |
| **Hardoi APMC** | Desi Milling Lot | ₹2,520 | ₹2,780 | ₹2,860 | +₹355 |
| **Sehore Terminal** | Golden Durum | ₹2,900 | ₹3,150 | ₹3,320 | +₹725 |
`;
      return {
        markdown,
        spokenText: `Today Sharbati wheat in Sitapur modal trading closed at two thousand eight hundred and fifty rupees per quintal, four hundred and twenty-five rupees above government MSP.`,
        category: 'mandi'
      };
    }
  }

  // 4. Yellow Rust Treatment: "🌿 Yellow Rust treatment"
  if (
    p.includes('yellow rust') ||
    p.includes('रतुआ') ||
    p.includes('ਰਤੂਆ') ||
    p.includes('हल्दी रोग') ||
    p.includes('rust') ||
    p.includes('disease') ||
    p.includes('फंगस')
  ) {
    if (lang === 'hi') {
      const markdown = `
### 🌿 गेहूं में पीला रतुआ (Yellow Rust) निदान एवं उपचार

गेहूं की पत्तियों पर पीले रंग की धारियां एवं पाउडरनुमा फफूंद (*Puccinia striiformis*) के लक्षण दिखने पर तुरंत रासायनिक उपचार आवश्यक है।

#### 📊 ICAR / PAU प्रमाणित कवकनाशी तालिका:
| कवकनाशी (Fungicide) | प्रचलित ब्रांड (Brand) | अनुशंसित खुराक (Dosage) | छिड़काव समय (Timing) | सुरक्षा सावधानी |
| :--- | :--- | :--- | :--- | :--- |
| **प्रोपिकोनाजोल 25% EC** | **टिल्ट (Tilt) / बंपर** | **1.0 मिली प्रति लीटर पानी** (200 मिली/एकड़) | दोपहर 3:00 - 5:00 बजे | हवा शांत होने पर पत्तों पर समान छिड़कें |
| **टेबुकोनाजोल 25.9% EC** | फॉलिकुर (Folicur) | 1.0 मिली प्रति लीटर | सुबह ओस सूखने उपरांत | 15 दिन बाद आवश्यकता पड़ने पर दोहराएं |
| **एजॉक्सीस्ट्रोबिन + टेबुकोनाजोल** | कस्टोडिया (Custodia) | 1.5 मिली प्रति लीटर | गंभीर संक्रमण होने पर | स्टिकर (स्प्रेडर) अवश्य मिलाएं |

> **किसान सुरक्षा सलाह:** पीला रतुआ हवा के माध्यम से फैलता है। प्रभावित खेत से स्वस्थ खेत में जाने से पूर्व जूते एवं कपड़े साफ रखें।
`;
      return {
        markdown,
        spokenText: `पीला रतुआ दिखने पर प्रोपिकोनाजोल पच्चीस प्रतिशत ईसी यानी टिल्ट एक मिलीलीटर प्रति लीटर पानी में घोलकर दोपहर तीन से पांच बजे के बीच तुरंत छिड़कें।`,
        category: 'disease'
      };
    } else if (lang === 'pa') {
      const markdown = `
### 🌿 ਕਣਕ ਵਿੱਚ ਪੀਲਾ ਰਤੂਆ (Yellow Rust) ਰੋਕਥਾਮ

ਕਣਕ ਦੇ ਪੱਤਿਆਂ 'ਤੇ ਪੀਲੀਆਂ ਧਾਰੀਆਂ ਦਿਖਣ 'ਤੇ ਤੁਰੰਤ ਪੀਏਯੂ (PAU) ਪ੍ਰਮਾਣਿਤ ਉਪਚਾਰ ਕਰੋ:

#### 📊 ਫੰਗੀਸਾਈਡ ਸਾਰਣੀ:
| ਉੱਲੀਨਾਸ਼ਕ (Fungicide) | ਬ੍ਰਾਂਡ ਦਾ ਨਾਮ (Brand) | ਸਹੀ ਖੁਰਾਕ (Dosage) | ਛਿੜਕਾਅ ਦਾ ਸਮਾਂ | ਸਾਵਧਾਨੀ |
| :--- | :--- | :--- | :--- | :--- |
| **ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ 25% EC** | **ਟਿਲਟ (Tilt)** | **1.0 ਮਿ.ਲੀ. ਪ੍ਰਤੀ ਲੀਟਰ** (200 ਮਿ.ਲੀ./ਏਕੜ) | ਦੁਪਹਿਰ 3:00 ਤੋਂ 5:00 | ਸਾਫ਼ ਮੌਸਮ ਵਿੱਚ ਛਿੜਕੋ |
| **ਟੈਬੂਕੋਨਾਜ਼ੋਲ 25.9%** | ਫੋਲੀਕੁਰ (Folicur) | 1.0 ਮਿ.ਲੀ. ਪ੍ਰਤੀ ਲੀਟਰ | ਤ੍ਰੇਲ ਸੁੱਕਣ ਤੋਂ ਬਾਅਦ | ਸਾਰੇ ਪੱਤੇ ਗਿੱਲੇ ਕਰੋ |
`;
      return {
        markdown,
        spokenText: `ਪੀਲਾ ਰਤੂਆ ਦਿਖਣ 'ਤੇ ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ ਯਾਨੀ ਟਿਲਟ ਇੱਕ ਮਿਲੀਲੀਟਰ ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਘੋਲ ਕੇ ਦੁਪਹਿਰ ਤਿੰਨ ਤੋਂ ਪੰਜ ਵਜੇ ਦੇ ਵਿਚਕਾਰ ਛਿੜਕਾਅ ਕਰੋ।`,
        category: 'disease'
      };
    } else {
      const markdown = `
### 🌿 Wheat Yellow Rust (Stripe Rust) Diagnosis & Treatment

Symptoms of powdery yellow streaks (*Puccinia striiformis*) require immediate prophylactic and systemic fungicide intervention.

#### 📊 ICAR & PAU Certified Chemical Control Schedule:
| Active Molecule | Trusted Brand | Dosage per Acre | Application Window | Critical Precautions |
| :--- | :--- | :--- | :--- | :--- |
| **Propiconazole 25% EC** | **Tilt / Bumper** | **200 ml / 200L water** (1 ml/L) | Afternoon 3:00 - 5:00 PM | Ensure full canopy foliar coverage |
| **Tebuconazole 25.9% EC** | Folicur | 200 ml / acre | After morning dew dries | Re-spray after 15 days if rust persists |
| **Azoxystrobin + Tebuconazole** | Custodia | 300 ml / acre | For severe outbreak | Tank-mix with non-ionic sticker agent |
`;
      return {
        markdown,
        spokenText: `Upon spotting yellow rust, immediately spray Propiconazole twenty-five percent EC commercially known as Tilt at one milliliter per liter of water between three and five PM.`,
        category: 'disease'
      };
    }
  }

  // 5. Mustard Selling Strategy: "🌱 Best price to sell Mustard"
  if (
    p.includes('mustard') ||
    p.includes('सरसों') ||
    p.includes('ਸਰ੍ਹੋਂ') ||
    p.includes('sell') ||
    p.includes('बेचना') ||
    p.includes('ਵੇਚਣਾ')
  ) {
    if (lang === 'hi') {
      const markdown = `
### 🌱 सरसों विपणन रणनीति एवं भाव दृष्टिकोण (${userLoc})

वर्तमान सरसों का बाजार भाव **₹6,180 - ₹6,240/क्विंटल** पर मजबूत बना हुआ है, जो सरकारी समर्थन मूल्य (MSP **₹5,950**) से **+₹250** अधिक है।

#### 📊 आगामी 30 दिनों का बाजार परिदृश्य:
| समय सीमा (Time Horizon) | भाव अनुमान | बाजार कारक (Drivers) | संस्तुत कार्रवाई (Recommendation) |
| :--- | :--- | :--- | :--- |
| **वर्तमान सप्ताह** | **₹6,180 - ₹6,240** | 📈 सॉल्वेंट मिलों की भारी मांग | **50% लॉट तुरंत बेचें (लाभ सुरक्षित करें)** |
| **अगले 15 दिन** | ₹6,050 - ₹6,150 | 📉 राजस्थान व हरियाणा से नई आवक | होल्ड करने पर मूल्य दबाव का जोखिम |
| **1 माह उपरांत** | ₹5,980 - ₹6,100 | ⚖️ MSP ₹5,950 के नजदीक स्थिरता | केवल वैज्ञानिक भंडारण होने पर ही रोकें |

> **एस्क्रो डील टिप:** KisaanSahyog बाज़ार पर अपनी सरसों सीधे तेल मिल व्यापारियों को बेचकर ₹1,000 अग्रिम टोकन सुरक्षित करें।
`;
      return {
        markdown,
        spokenText: `सरसों अभी छह हजार दो सौ रुपये प्रति क्विंटल के पार चल रही है जो समर्थन मूल्य से ढाई सौ रुपये अधिक है। पचास प्रतिशत स्टॉक तुरंत बेचकर अधिकतम मुनाफा कमाएं।`,
        category: 'mandi'
      };
    } else if (lang === 'pa') {
      const markdown = `
### 🌱 ਸਰ੍ਹੋਂ ਵੇਚਣ ਦੀ ਸਹੀ ਰਣਨੀਤੀ (${userLoc})

ਮੌਜੂਦਾ ਸਰ੍ਹੋਂ ਦਾ ਭਾਅ **₹6,180 - ₹6,240/ਕੁਇੰਟਲ** ਚੱਲ ਰਿਹਾ ਹੈ, ਜੋ ਸਰਕਾਰੀ ਸਮਰਥਨ ਮੁੱਲ (MSP **₹5,950**) ਤੋਂ ਕਾਫ਼ੀ ਜ਼ਿਆਦਾ ਹੈ।

#### 📊 ਮਾਰਕੀਟ ਰੁਝਾਨ ਸਾਰਣੀ:
| ਸਮਾਂ (Timeline) | ਅਨੁਮਾਨਿਤ ਭਾਅ | ਮਾਰਕੀਟ ਸਥਿਤੀ | ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ |
| :--- | :--- | :--- | :--- |
| **ਇਹ ਹਫ਼ਤਾ** | **₹6,180 - ₹6,240** | 📈 ਤੇਲ ਮਿੱਲਾਂ ਦੀ ਮੰਗ | **50% ਮਾਲ ਤੁਰੰਤ ਵੇਚੋ** |
| **15 ਦਿਨਾਂ ਬਾਅਦ** | ₹6,050 - ₹6,150 | 📉 ਨਵੀਂ ਆਮਦ ਦਾ ਦਬਾਅ | ਭਾਅ ਡਿੱਗਣ ਦਾ ਖ਼ਤਰਾ |
| **ਅਗਲੇ ਮਹੀਨੇ** | ₹5,980 - ₹6,100 | ⚖️ MSP ਦੇ ਕਰੀਬ | ਲੰਬਾ ਸਮਾਂ ਰੋਕਣਾ ਠੀਕ ਨਹੀਂ |
`;
      return {
        markdown,
        spokenText: `ਸਰ੍ਹੋਂ ਇਸ ਵੇਲੇ ਬਾਜ਼ਾਰ ਵਿੱਚ ਬਾਹਠ ਸੌ ਰੁਪਏ ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਤੋਂ ਉੱਪਰ ਵਿਕ ਰਹੀ ਹੈ। ਅੱਧਾ ਸਟਾਕ ਤੁਰੰਤ ਵੇਚ ਕੇ ਮੁਨਾਫ਼ਾ ਪੱਕਾ ਕਰੋ।`,
        category: 'mandi'
      };
    } else {
      const markdown = `
### 🌱 Mustard Market Outlook & Optimal Liquidation Schedule

Mustard is trading briskly between **₹6,180 - ₹6,240 / Quintal**, comfortably sitting **+₹250 above the government MSP of ₹5,950**.

#### 📊 Price Trajectory & Action Matrix:
| Horizon | Projected Band | Market Fundamentals | Recommended Trader Action |
| :--- | :--- | :--- | :--- |
| **Current Window** | **₹6,180 - ₹6,240** | 📈 Aggressive crushers' demand | **Liquidate 50% lot immediately** |
| **Next 15 Days** | ₹6,050 - ₹6,150 | 📉 Arrival volumes ramping up | High downside volatility risk |
| **Month Out** | ₹5,980 - ₹6,100 | ⚖️ Converging to ₹5,950 MSP base | Retain only if hermetic silo storage exists |
`;
      return {
        markdown,
        spokenText: `Mustard is trading above six thousand two hundred rupees per quintal, which is two hundred and fifty rupees over MSP. Liquidating fifty percent of your stock today is strongly recommended.`,
        category: 'mandi'
      };
    }
  }

  // 6. Generic / Fertilizer Schedule (e.g. "fertilizer for 2 acres wheat in sitapur")
  const fertilizerMarkdown = `
### 🌾 वैज्ञानिक संतुलित खाद सारणी (${userLoc})

**${userName}** जी, ICAR-IISS भोपाल एवं राज्य कृषि विश्वविद्यालय की सिफ़ਾਰिशों के आधार पर आपकी फसल के लिए पोषक तत्वों की संतुलित सारणी:

#### 📊 प्रति एकड़ खाद उपयोग योजना:
| क्या डालें (Product) | मात्रा (प्रति एकड़) | कब डालें (Application Stage) | मुख्य लाभ (Agronomic Reason) |
| :--- | :--- | :--- | :--- |
| **DAP (18-46-0)** | **55 kg** (1 बोरी से अधिक) | बुवाई के समय (बेसल ड्रेसिंग) | जड़ों का गहन विकास व अंकुरण |
| **Urea (46% N)** | **45 kg** (1 बोरी) | पहली सिंचाई पर (CRI स्टेज, 21 दिन) | कल्लों (Tillers) व वानस्पतिक वृद्धि |
| **Urea (46% N)** | **45 kg** (1 बोरी) | दूसरी सिंचाई (गाभा/फूल आने से पूर्व) | दानों में चमक, प्रोटीन व वजन |
| **जिंक सल्फेट (21%)**| **10 kg** | पहली सिंचाई के समय | पत्तों में पीलापन व खैरा रोग रोकथाम |
| **MOP (पोटाश 60%)** | **20 kg** | बुवाई के समय | तनों की मजबूती व सूखा/कीट प्रतिरोधक |

> **विशेष टिप:** यदि वर्षा की संभावना हो तो यूरिया का भुरकाव रोक दें ताकि नाइट्रोजन हवा में उड़ने अथवा बहने से बच सके।
`;

  const fertilizerSpoken = lang === 'pa'
    ? `ਤੁਹਾਡੀ ਜ਼ਮੀਨ ਲਈ ਡੀ ਏ ਪੀ ਪਚਵੰਜਾ ਕਿਲੋ, ਯੂਰੀਆ ਪੰਤਾਲੀ ਕਿਲੋ ਪਹਿਲੇ ਪਾਣੀ ਤੇ ਅਤੇ ਦਸ ਕਿਲੋ ਜ਼ਿੰਕ ਸਲਫੇਟ ਪਾਉਣ ਦੀ ਸਲਾਹ ਹੈ।`
    : lang === 'hi'
    ? `आपकी फसल के लिए प्रति एकड़ पचपन किलो डी ए पी बुवाई पर, पैंतालीस किलो यूरिया पहली सिंचाई पर और दस किलो जिंक सल्फेट डालना लाभकारी रहेगा।`
    : `For balanced nutrition, apply fifty-five kg DAP at sowing, forty-five kg Urea at first irrigation alongside ten kg Zinc Sulphate per acre.`;

  return {
    markdown: fertilizerMarkdown,
    spokenText: fertilizerSpoken,
    category: 'fertilizer'
  };
}
