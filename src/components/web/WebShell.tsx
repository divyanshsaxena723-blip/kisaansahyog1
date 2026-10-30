import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { CropListing } from '../../types';
import { WebHeader } from './WebHeader';
import { WebSidebar } from './WebSidebar';
import { WebFarmerDashboard } from './WebFarmerDashboard';
import { FarmerMarketplaceSellView } from '../farmer/FarmerMarketplaceSellView';
import { FarmerProfitEngineView } from '../farmer/FarmerProfitEngineView';
import { FarmerDealsView } from '../farmer/FarmerDealsView';
import { BuyerBazaarView } from '../buyer/BuyerBazaarView';
import { BuyerOrdersView } from '../buyer/BuyerOrdersView';
import { BuyerProfileView } from '../buyer/BuyerProfileView';
import { CropDetailModal } from '../modals/CropDetailModal';
import { FarmerLandModal } from '../modals/FarmerLandModal';

interface WebShellProps {
  onOpenVoiceAssistant?: () => void;
  onInspectListing?: (listing: CropListing) => void;
}

export const WebShell: React.FC<WebShellProps> = ({
  onOpenVoiceAssistant,
  onInspectListing
}) => {
  const {
    activeRole,
    farmerTab,
    buyerTab,
    openVoicebot
  } = useStore();

  const [inspectingListing, setInspectingListing] = useState<CropListing | null>(null);
  const [isLandModalOpen, setIsLandModalOpen] = useState(false);
  const [copilotQuery, setCopilotQuery] = useState<string | undefined>(undefined);

  const handleSelectListing = (listing: CropListing) => {
    if (onInspectListing) {
      onInspectListing(listing);
    } else {
      setInspectingListing(listing);
    }
  };

  const effectiveOpenVoice = onOpenVoiceAssistant || (() => openVoicebot(undefined, true));

  const handleTriggerAiCopilot = (query?: string) => {
    openVoicebot(query, !query);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#101F16] flex flex-col font-sans antialiased">
      {/* 1. Standardized Web Top Header */}
      <WebHeader
        onOpenVoiceAssistant={effectiveOpenVoice}
        onTriggerAiCopilot={handleTriggerAiCopilot}
      />

      {/* 2. Body Container with Left Sidebar & Right Workspace Area */}
      <div className="flex flex-1 min-h-[calc(100vh-4.5rem)]">
        {/* Left Sidebar Panel (w-64) */}
        <WebSidebar onOpenVoiceAssistant={effectiveOpenVoice} />

        {/* Right Main Stage Workspace */}
        <main className="flex-1 min-w-0 p-6 sm:p-8 bg-[#FAF6EE]">
          {activeRole === 'farmer' ? (
            <div>
              {farmerTab === 'home' && (
                <WebFarmerDashboard
                  onOpenVoiceAssistant={onOpenVoiceAssistant}
                  initialQuery={copilotQuery}
                />
              )}
              {farmerTab === 'profit' && <FarmerProfitEngineView />}
              {farmerTab === 'listings' && <FarmerMarketplaceSellView />}
              {farmerTab === 'deals' && <FarmerDealsView />}
            </div>
          ) : (
            <div>
              {buyerTab === 'bazaar' && (
                <BuyerBazaarView onSelectListing={handleSelectListing} />
              )}
              {buyerTab === 'orders' && <BuyerOrdersView />}
              {buyerTab === 'profile' && <BuyerProfileView />}
            </div>
          )}
        </main>
      </div>

      {/* Detail Modals */}
      <CropDetailModal
        listing={inspectingListing}
        onClose={() => setInspectingListing(null)}
      />
      <FarmerLandModal
        isOpen={isLandModalOpen}
        onClose={() => setIsLandModalOpen(false)}
      />
    </div>
  );
};

export default WebShell;
