import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { CropListing } from '../types';
import { Header } from '../components/common/Header';
import { BottomNav } from '../components/common/BottomNav';
import { FarmerHomeView } from '../components/farmer/FarmerHomeView';
import { FarmerProfitEngineView } from '../components/farmer/FarmerProfitEngineView';
import { FarmerMarketplaceSellView } from '../components/farmer/FarmerMarketplaceSellView';
import { FarmerDealsView } from '../components/farmer/FarmerDealsView';
import { BuyerBazaarView } from '../components/buyer/BuyerBazaarView';
import { BuyerOrdersView } from '../components/buyer/BuyerOrdersView';
import { BuyerProfileView } from '../components/buyer/BuyerProfileView';
import { CropDetailModal } from '../components/modals/CropDetailModal';
import { FarmerLandModal } from '../components/modals/FarmerLandModal';
import { Mic, Smartphone } from 'lucide-react';

export const MobileAppShell: React.FC = () => {
  const { userRole, farmerTab, buyerTab, language, setIsAuthModalOpen } = useStore();

  const [inspectingListing, setInspectingListing] = useState<CropListing | null>(null);
  const [isLandModalOpen, setIsLandModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#101F16] flex flex-col font-sans pb-20">
      {/* Mobile Top Header */}
      <Header />

      {/* Mobile PWA Shell Indicator Banner */}
      <div className="bg-[#2C5E2E] text-white px-4 py-1.5 text-center text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs">
        <Smartphone className="w-3.5 h-3.5 text-[#E0A526]" />
        <span>
          {language === 'hi'
            ? 'मोबाइल PWA मोड • टच-फ्रेंडली इंटरफ़ेस (Stitch Mobile Shell)'
            : 'Mobile PWA Mode • Touch-Optimized Shell'}
        </span>
      </div>

      {/* Main Mobile Screen Area */}
      <main className="flex-1 max-w-lg w-full mx-auto px-4 py-4">
        {userRole === 'farmer' ? (
          <div>
            {farmerTab === 'home' && <FarmerHomeView />}
            {farmerTab === 'profit' && <FarmerProfitEngineView />}
            {farmerTab === 'listings' && <FarmerMarketplaceSellView />}
            {farmerTab === 'deals' && <FarmerDealsView />}
          </div>
        ) : (
          <div>
            {buyerTab === 'bazaar' && (
              <BuyerBazaarView onSelectListing={(l) => setInspectingListing(l)} />
            )}
            {buyerTab === 'orders' && <BuyerOrdersView />}
            {buyerTab === 'profile' && <BuyerProfileView />}
          </div>
        )}
      </main>

      {/* Sticky Bottom Navigation Bar (h-16) */}
      <BottomNav />

      {/* Crop Inspection & Land Modals */}
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

export default MobileAppShell;
