import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { CROP_BENCHMARKS, evaluatePriceGuardrail } from '../../utils/constants';
import {
  PlusCircle,
  Tag,
  ShieldCheck,
  TrendingUp,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  Sparkles,
  Camera,
  X,
  Radio,
  Eye,
  ArrowRight
} from 'lucide-react';

export const FarmerMarketplaceSellView: React.FC = () => {
  const { listings, addListing, language, setFarmerTab, setSelectedDealDetailId } = useStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCropId, setSelectedCropId] = useState('crop_wheat');
  const [quantity, setQuantity] = useState('80');
  const [rate, setRate] = useState('2850');
  const [reach, setReach] = useState<'local' | 'state' | 'nationwide'>('nationwide');
  const [description, setDescription] = useState(
    'Organically grown, moisture level 10.2%, double-cleaned bold grains from Sitapur farm.'
  );

  const selectedCrop =
    CROP_BENCHMARKS.find((c) => c.id === selectedCropId) || CROP_BENCHMARKS[0];

  // Price guardrail real-time evaluation
  const numericRate = parseFloat(rate) || 0;
  const guardrailFeedback = evaluatePriceGuardrail(numericRate, selectedCrop.benchmark);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quantity || !rate) {
      alert('Please enter valid quantity and price rate.');
      return;
    }

    addListing({
      cropId: selectedCrop.id,
      variety: selectedCrop.variety,
      category: selectedCrop.category,
      quantityQuintals: parseFloat(quantity) || 50,
      pricePerQuintal: numericRate,
      moisturePercent: selectedCrop.standardMoisture,
      grade: 'Grade A Export',
      description,
      reach,
      image: selectedCrop.image
    });

    setIsAddModalOpen(false);
    alert(
      language === 'hi'
        ? 'आपकी फसल सफलतापूर्वक लिस्ट हो गई है! अब खरीदार इसे देख सकते हैं।'
        : 'Your crop has been successfully listed in the marketplace!'
    );
  };

  const handleRegenerateDescription = () => {
    setDescription(
      `${selectedCrop.nameHi} - ${selectedCrop.variety}, नमी मात्र ${selectedCrop.standardMoisture}%, खेत से ताज़ा कटाई व साफ़ छना हुआ माल। 50kg बोरियों में सुरक्षित।`
    );
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header Action Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101F16]">
              {language === 'hi' ? 'मेरी फसलें व बिक्री बाज़ार' : 'Farmer Marketplace & Listings'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] text-xs font-extrabold">
              0% Commission
            </span>
          </div>
          <p className="text-xs text-[#4A2C17]/80 mt-0.5">
            {language === 'hi'
              ? 'बिना किसी दलाली के सीधे देशभर के 12,000+ सत्यापित खरीदारों को बेचें'
              : 'Direct trade connecting your harvest to verified institutional buyers'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#2C5E2E] text-white hover:bg-emerald-800 font-extrabold text-sm shadow-md shadow-emerald-900/20 active:scale-95 transition-all"
        >
          <PlusCircle className="w-5 h-5 text-[#E0A526]" />
          <span>{language === 'hi' ? '+ नई फसल जोड़ें' : '+ Add New Crop'}</span>
        </button>
      </div>

      {/* Active Listings Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#101F16] flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#2C5E2E]" />
            <span>{language === 'hi' ? 'मेरी सक्रिय लिस्टिंग (Active Batches)' : 'Active Lots'}</span>
          </h2>
          <span className="text-xs font-bold text-gray-500">
            {listings.length} {language === 'hi' ? 'फसलें लाइव' : 'Lots Live'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((listing) => {
            const cropInfo =
              CROP_BENCHMARKS.find((c) => c.id === listing.cropId) || CROP_BENCHMARKS[0];
            const diffOverMsp = listing.pricePerQuintal - cropInfo.msp;

            return (
              <div
                key={listing.id}
                className="bg-white rounded-3xl border border-emerald-900/10 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
              >
                {/* Image & Lot Tag */}
                <div className="relative h-44 w-full bg-emerald-900 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.cropNameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-extrabold">
                    <span>{listing.lotNumber}</span>
                    <span>•</span>
                    <span className="text-[#E0A526]">{listing.grade}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2C5E2E] text-xs font-extrabold shadow-sm flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>नमी: {listing.moisturePercent}%</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#166534] text-xs font-extrabold">
                      {listing.requestsCount} {language === 'hi' ? 'अनुरोध प्राप्त' : 'Requests'}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-black text-[#101F16]">
                          {listing.cropNameHi}
                        </h3>
                        <p className="text-xs text-gray-500">{listing.variety}</p>
                      </div>
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                        {listing.quantityQuintals} Qtl
                      </span>
                    </div>

                    {/* Price Block */}
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-[#2C5E2E]">
                        ₹{listing.pricePerQuintal.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-bold text-gray-500">/ Quintal</span>
                    </div>

                    {/* MSP Comparison strip */}
                    <div className="mt-2 p-2.5 bg-emerald-50 rounded-2xl flex items-center justify-between text-xs font-bold">
                      <span className="text-gray-600">
                        MSP: ₹{cropInfo.msp}
                      </span>
                      <span
                        className={`font-black ${
                          diffOverMsp >= 0 ? 'text-[#166534]' : 'text-red-600'
                        }`}
                      >
                        {diffOverMsp >= 0 ? `+₹${diffOverMsp} over MSP` : `-₹${Math.abs(diffOverMsp)}`}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setFarmerTab('deals')}
                      className="text-xs font-extrabold text-[#2C5E2E] hover:underline flex items-center gap-1"
                    >
                      <span>
                        {language === 'hi' ? 'खरीदार सौदे देखें' : 'View Inquiries'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <span className="text-[11px] font-semibold text-gray-400">
                      {listing.location}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add New Listing Modal with Exact Price Guardrails */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/10">
            {/* Header */}
            <div className="px-6 py-4 bg-[#FAF6EE] border-b border-emerald-900/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#2C5E2E] text-white flex items-center justify-center">
                  <Tag className="w-4 h-4 text-[#E0A526]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#101F16] text-base sm:text-lg">
                    {language === 'hi' ? 'नई फसल लिस्टिंग जोड़ें' : 'Add New Crop Listing'}
                  </h3>
                  <p className="text-xs text-[#4A2C17]/70">
                    {language === 'hi' ? 'स्मार्ट मूल्य सुरक्षा व स्वचालित खरीदार पहुंच' : 'Smart Price Guardrail & Direct Escrow'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublish} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Crop Selector */}
              <div>
                <label className="block text-xs font-bold text-[#101F16] mb-1">
                  {language === 'hi' ? 'फसल चुनें (Select Crop)' : 'Select Crop'}
                </label>
                <select
                  value={selectedCropId}
                  onChange={(e) => {
                    const found = CROP_BENCHMARKS.find((c) => c.id === e.target.value);
                    if (found) {
                      setSelectedCropId(found.id);
                      setRate(found.benchmark.toString());
                    }
                  }}
                  className="w-full px-4 h-12 rounded-2xl bg-gray-50 border border-gray-200 font-extrabold text-sm text-[#101F16] focus:bg-white focus:border-[#2C5E2E] focus:outline-none"
                >
                  {CROP_BENCHMARKS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameHi} ({c.nameEn}) — {c.variety} | बाज़ार औसत: ₹{c.benchmark}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#101F16] mb-1">
                    {language === 'hi' ? 'मात्रा (क्विंटल में)' : 'Available Quantity (Quintals)'}
                  </label>
                  <div className="flex items-center px-4 h-12 rounded-2xl bg-gray-50 border border-gray-200 focus-within:bg-white focus-within:border-[#2C5E2E]">
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="80"
                      className="w-full bg-transparent font-extrabold text-base text-[#101F16] focus:outline-none"
                      required
                    />
                    <span className="text-xs font-bold text-gray-400 ml-1">Qtl</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101F16] mb-1">
                    {language === 'hi' ? 'अपेक्षित भाव (₹/क्विंटल)' : 'Expected Rate (₹/Qtl)'}
                  </label>
                  <div className="flex items-center px-4 h-12 rounded-2xl bg-gray-50 border border-gray-200 focus-within:bg-white focus-within:border-[#2C5E2E]">
                    <span className="text-sm font-bold text-gray-500 mr-1">₹</span>
                    <input
                      type="number"
                      min={100}
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      placeholder="2850"
                      className="w-full bg-transparent font-extrabold text-base text-[#101F16] focus:outline-none"
                      required
                    />
                    <span className="text-xs font-bold text-gray-400 ml-1">/Qtl</span>
                  </div>
                </div>
              </div>

              {/* Exact Price Guardrail Engine Output Banner */}
              <div
                className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 transition-all ${guardrailFeedback.color}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                    {guardrailFeedback.status === 'distress' && (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                    {guardrailFeedback.status === 'fair' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                    {guardrailFeedback.status === 'high' && (
                      <Info className="w-4 h-4 text-amber-600" />
                    )}
                    <span>मूल्य सुरक्षा जांच (Guardrail Status)</span>
                  </span>
                  <span className="font-bold">
                    बाज़ार मानक: ₹{selectedCrop.benchmark}/क्विंटल
                  </span>
                </div>
                <p className="font-semibold">{guardrailFeedback.message}</p>
              </div>

              {/* Description & AI Generator */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#101F16]">
                    {language === 'hi' ? 'फसल विवरण (AI जनरेटेड)' : 'Crop Description'}
                  </label>
                  <button
                    type="button"
                    onClick={handleRegenerateDescription}
                    className="text-xs font-bold text-[#2C5E2E] hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-[#E0A526]" />
                    <span>{language === 'hi' ? 'AI से नया लिखें' : 'Regenerate'}</span>
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-medium text-[#101F16] focus:bg-white focus:border-[#2C5E2E] focus:outline-none"
                />
              </div>

              {/* Buyer Reach / Visibility Selector */}
              <div>
                <label className="block text-xs font-bold text-[#101F16] mb-1.5">
                  {language === 'hi' ? 'दिखने की सीमा (Buyer Reach)' : 'Buyer Reach & Logistics'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setReach('local')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      reach === 'local'
                        ? 'border-[#2C5E2E] bg-emerald-50 text-[#2C5E2E] font-bold'
                        : 'border-gray-200 bg-white text-gray-600'
                    }`}
                  >
                    <p className="text-xs font-extrabold">स्थानीय (50km)</p>
                    <p className="text-[10px] text-gray-500">ट्रैक्टर पिकअप</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setReach('state')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      reach === 'state'
                        ? 'border-[#2C5E2E] bg-emerald-50 text-[#2C5E2E] font-bold'
                        : 'border-gray-200 bg-white text-gray-600'
                    }`}
                  >
                    <p className="text-xs font-extrabold">राज्य स्तर</p>
                    <p className="text-[10px] text-gray-500">दाल व तेल मिल</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setReach('nationwide')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      reach === 'nationwide'
                        ? 'border-[#2C5E2E] bg-emerald-50 text-[#2C5E2E] font-bold'
                        : 'border-gray-200 bg-white text-gray-600'
                    }`}
                  >
                    <p className="text-xs font-extrabold">पूरे भारत में</p>
                    <p className="text-[10px] text-gray-500">12,000+ खरीदार</p>
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-12 rounded-full bg-[#2C5E2E] text-white font-extrabold text-sm shadow-md shadow-emerald-900/20 hover:bg-emerald-800 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Tag className="w-4 h-4 text-[#E0A526]" />
                  <span>
                    {language === 'hi' ? 'फसल तुरंत लिस्ट करें (Publish Listing)' : 'Publish Listing Now'}
                  </span>
                </button>
                <p className="text-center text-[11px] text-gray-500 mt-2">
                  🔒 0% कमीशन • सीधा भुगतान बैंक खाते में किसान सहयोग एस्क्रो द्वारा सुरक्षित
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
