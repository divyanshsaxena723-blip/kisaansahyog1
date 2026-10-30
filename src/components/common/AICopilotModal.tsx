import React from 'react';
import { useStore } from '../../store/useStore';
import { VoiceModal } from './VoiceModal';

interface AICopilotModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AICopilotModal: React.FC<AICopilotModalProps> = ({ isOpen, onClose }) => {
  const { isVoiceModalOpen, setIsVoiceModalOpen } = useStore();
  const show = isOpen !== undefined ? isOpen : isVoiceModalOpen;
  const handleClose = onClose || (() => setIsVoiceModalOpen(false));

  return <VoiceModal isOpen={show} onClose={handleClose} />;
};

export default AICopilotModal;
