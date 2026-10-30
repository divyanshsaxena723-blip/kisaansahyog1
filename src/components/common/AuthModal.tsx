import React from 'react';
import { useStore } from '../../store/useStore';
import { UnifiedAuthModal } from './UnifiedAuthModal';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen } = useStore();

  if (!isAuthModalOpen) return null;

  return <UnifiedAuthModal />;
};

export default AuthModal;
