import React from 'react';
import { UserRole } from '../../types';
import { MultiStepAuth } from '../common/MultiStepAuth';
import { Compass } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface MobileLoginScreenProps {
  onStartTour?: () => void;
  onLoginSuccess?: (role: UserRole) => void;
}

export const MobileLoginScreen: React.FC<MobileLoginScreenProps> = ({ onStartTour, onLoginSuccess }) => {
  const { language } = useStore();

  const tourLabel =
    language === 'pa'
      ? 'ਐਪ ਦੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਵੇਖੋ (Feature Tour)'
      : language === 'hi'
      ? 'ऐप की मुख्य विशेषताएं देखें (Feature Tour)'
      : 'Explore App Feature Tour';

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#FAF6EE] text-[#101F16] font-sans overflow-y-auto">
      <MultiStepAuth
        variant="mobile"
        onLoginSuccess={onLoginSuccess}
      />

      {onStartTour && (
        <div className="px-4 pb-4 bg-[#FAF6EE]">
          <button
            type="button"
            onClick={onStartTour}
            className="w-full py-2.5 px-4 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-xs font-black text-[#2C5E2E] flex items-center justify-center gap-2 transition shadow-2xs"
          >
            <Compass className="w-3.5 h-3.5 text-[#E0A526]" />
            <span>{tourLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileLoginScreen;
