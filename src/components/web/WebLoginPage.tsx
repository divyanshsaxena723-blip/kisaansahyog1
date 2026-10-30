import React from 'react';
import { useStore } from '../../store/useStore';
import { ArrowLeft } from 'lucide-react';
import { MultiStepAuth } from '../common/MultiStepAuth';

interface WebLoginPageProps {
  onLoginSuccess?: (role: 'farmer' | 'buyer') => void;
  onBack?: () => void;
}

export const WebLoginPage: React.FC<WebLoginPageProps> = ({ onLoginSuccess, onBack }) => {
  const { setCurrentPage, language } = useStore();

  const handleBack = () => {
    if (onBack) onBack();
    else setCurrentPage('landing');
  };

  const backLabel =
    language === 'pa'
      ? 'ਮੁੱਖ ਪੰਨੇ ਤੇ ਵਾਪਸ ਜਾਓ (Back to Home)'
      : language === 'hi'
      ? 'मुख्य पृष्ठ पर लौटें (Back to Home)'
      : 'Back to Home';

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#101F16] flex flex-col font-sans selection:bg-[#2C5E2E] selection:text-white">
      {/* Top Strip */}
      <header className="h-16 border-b border-stone-200 bg-[#FAF6EE]/90 backdrop-blur-md px-6 lg:px-12 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-xs font-black text-stone-600 hover:text-[#101F16] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backLabel}</span>
        </button>
      </header>

      {/* Center Auth Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-stone-200 relative overflow-hidden">
          <MultiStepAuth
            variant="web"
            onLoginSuccess={onLoginSuccess}
            onBack={handleBack}
          />
        </div>
      </main>
    </div>
  );
};

export default WebLoginPage;
