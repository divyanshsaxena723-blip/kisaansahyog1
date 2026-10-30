import React from 'react';
import { UnifiedAuthModal } from '../common/UnifiedAuthModal';

export const MobileLoginScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col justify-center bg-[#FAF6EE] text-[#101F16] font-sans">
      <UnifiedAuthModal />
    </div>
  );
};

export default MobileLoginScreen;
