import React from 'react';
import { WebLoginPage } from './WebLoginPage';

interface WebLoginModalProps {
  onLoginSuccess?: (role: 'farmer' | 'buyer') => void;
  onBack?: () => void;
}

export const WebLoginModal: React.FC<WebLoginModalProps> = ({ onLoginSuccess, onBack }) => {
  return <WebLoginPage onLoginSuccess={onLoginSuccess} onBack={onBack} />;
};

export default WebLoginModal;
