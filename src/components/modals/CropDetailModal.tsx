import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { CropListing } from '../../types';
import {
  X,
  ShieldCheck,
  MapPin,
  Star,
  Package,
  Truck,
  CheckCircle2,
  FileCheck,
  ArrowRight,
  Sparkles,
  Phone,
  MessageCircle,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CropDetailModalProps {
  listing: CropListing | null;
  onClose: () => void;
}

export const CropDetailModal: React.FC<CropDetailModalProps> = ({ listing, onClose }) => {
  const { requestTokenDeal, setBuyerTab, language } = useStore();

  const [quantity, setQuantity] = useState(
    listing ? Math.min(40, listing.quantityQuintals) : 40
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!listing) return null;

  const minQty = Math.min(20, listing.quantityQuintals);
  const maxQty = listing.quantityQuintals;
  const totalAmount = quantity * listing.pricePerQuintal;
  const advanceToken = 1000; // Exact ₹1,000 token escrow advance requested

  const handleSendTokenRequest = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const dealId = requestTokenDeal(listing.id, quantity, advanceToken);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      onClose();
      setBuyerTab('orders');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/10 max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#FAF6EE] border-b border-emerald-900/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[#166534] text-xs font-black border border-emerald-300">
              Active Farm Listing
            </span>
            <span className="text-xs text-gray-500 font-bold">
              {listing.lotNumber}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Crop Hero Banner with Badges */}
          <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-emerald-950 shadow-md">
            <img
              src={listing.image}
              alt={listing.cropNameEn}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#2C5E2E] text-xs font-black shadow-sm flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>नमी: {listing.moisturePercent}% • लैब सत्यापित</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold">
                  {listing.grade}
                </span>
              </div>

              <div className="text-white space-y-0.5">
                <h2 className="text-2xl font-black">{listing.cropNameHi}</h2>
                <p className="text-xs text-emerald-200">
                  {listing.cropNameEn} ({listing.variety}) • {listing.location}
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Highlight Block */}
          <div className="p-4 bg-[#FAF6EE] rounded-2xl border border-emerald-900/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 block">
                {language === 'hi' ? 'खेत से सीधी दर (Farmgate Price)' : 'Direct Farmgate Rate'}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-[#2C5E2E]">
                  ₹{listing.pricePerQuintal.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-gray-500">/ Quintal</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-gray-500 block">
                {language === 'hi' ? 'उपलब्ध स्टॉक' : 'Total Available'}
              </span>
              <span className="text-base font-black text-[#101F16]">
                {listing.quantityQuintals} Quintals
              </span>
            </div>
          </div>

          {/* Quantity Stepper & Range Slider */}
          <div className="p-5 bg-white rounded-2xl border border-emerald-900/15 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#101F16] uppercase tracking-wider">
                {language === 'hi' ? 'ऑर्डर मात्रा चुनें (Select Quantity)' : 'Order Quantity'}
              </span>
              <span className="text-sm font-black text-[#2C5E2E] bg-emerald-50 px-3 py-1 rounded-full">
                {quantity} Quintals
              </span>
            </div>

            <input
              type="range"
              min={minQty}
              max={maxQty}
              step={5}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full accent-[#2C5E2E] h-2 bg-gray-200 rounded-lg cursor-pointer"
            />

            <div className="flex items-center justify-between text-xs text-gray-400 font-bold">
              <span>न्यूनतम: {minQty} Qtl</span>
              <span>अधिकतम: {maxQty} Qtl</span>
            </div>
          </div>

          {/* Producer Profile Snippet */}
          <div className="p-5 bg-white rounded-2xl border border-emerald-900/10 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <span className="text-xs font-extrabold text-[#4A2C17] uppercase tracking-wider">
                {language === 'hi' ? 'किसान परिचय (Farmer Profile)' : 'Farmer Profile'}
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-[#DCFCE7] px-2.5 py-0.5 rounded-full">
                Verified Seller
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#2C5E2E] flex items-center justify-center font-black text-lg shrink-0">
                {listing.farmerName.split(' ')[0][0]}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-black text-base text-[#101F16]">
                    {listing.farmerName}
                  </h4>
                  <span className="text-xs font-bold text-[#E0A526] flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {listing.farmerRating}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {listing.location}, {listing.state} • 4.5 Acres काली दोमट मिट्टी
                </p>
                <p className="text-[11px] text-gray-400">
                  12 पूर्व फसलें सफलतापूर्वक निष्पादित • 100% समय पर डिलीवरी
                </p>
              </div>
            </div>
          </div>

          {/* Quality & Loading Specifications */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 text-xs">
            <h4 className="font-extrabold text-[#101F16]">
              {language === 'hi' ? 'गुणवत्ता व लोडिंग विवरण:' : 'Specifications & Dispatch:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
              <div className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#2C5E2E]" />
                <span>50kg मानक जूट बोरियां (डबल सिलाई)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#2C5E2E]" />
                <span>सीधा खेत से ट्रक / ट्रैक्टर लोडिंग मार्ग उपलब्ध</span>
              </div>
            </div>
          </div>

          {/* Escrow Reassurance */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#2C5E2E] shrink-0" />
            <p className="text-xs text-[#166534] leading-relaxed">
              <strong>किसान सहयोग एस्क्रो सुरक्षा:</strong> आपकी ₹1,000 की बयाना राशि सुरक्षित बैंक एस्क्रो में जमा रहेगी। किसान द्वारा स्वीकृति पर ही फोन व पिकअप शेड्यूल खुलेगा।
            </p>
          </div>
        </div>

        {/* Sticky Footer Action Dock */}
        <div className="p-5 bg-[#FAF6EE] border-t border-emerald-900/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-xs font-bold text-gray-500 block">
              कुल सौदा मूल्य ({quantity} Qtl)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#2C5E2E]">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-extrabold text-[#E0A526] bg-amber-100 px-2 py-0.5 rounded-full">
                अग्रिम टोकन: ₹{advanceToken} (Escrow)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSendTokenRequest}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#2C5E2E] text-white hover:bg-emerald-800 font-black text-sm shadow-md shadow-emerald-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>अनुरोध भेजा जा रहा है...</span>
            ) : (
              <>
                <span>टोकन अनुरोध भेजें (Send ₹1,000 Token)</span>
                <ArrowRight className="w-4 h-4 text-[#E0A526]" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
