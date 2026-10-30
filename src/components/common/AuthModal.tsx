import React from 'react';
import { useStore } from '../../store/useStore';
import { X } from 'lucide-react';
import { MultiStepAuth } from './MultiStepAuth';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useStore();

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/10 animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <MultiStepAuth
          variant="modal"
          onLoginSuccess={() => setIsAuthModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default AuthModal;
