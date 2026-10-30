import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  CROP_FERTILIZER_DATA,
  DEFAULT_FERTILIZER_PROFILE,
  SoilCondition,
  calculateFertilizerRequirements,
  generateFertilizerWhatsAppSummary,
  FERTILIZER_PRICES
} from '../../utils/fertilizerData';
import { CROP_BENCHMARKS } from '../../utils/constants';
import {
  FlaskConical,
  Sprout,
  Share2,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

interface FertilizerCalculatorProps {
  onClose?: () => void;
  inline?: boolean;
}

export const FertilizerCalculator: React.FC<FertilizerCalculatorProps> = ({ onClose, inline = false }) => {
  const { language, farmerProfile, profitInputs, setProfitInputs, setFarmerTab } = useStore();

  const [selectedCropId, setSelectedCropId] = useState<string>('crop_wheat');
  const [acres, setAcres] = useState<number>(farmerProfile?.totalLandAcres || profitInputs?.acres || 4);
  const [soilCondition, setSoilCondition] = useState<SoilCondition>('normal');
  const [isCopied, setIsCopied] = useState(false);
  const [isSyncedToCost, setIsSyncedToCost] = useState(false);

  const calc = calculateFertilizerRequirements(selectedCropId, acres, soilCondition);

  const handleAddAcres = (delta: number) => {
    setAcres((prev) => Math.max(0.5, Number((prev + delta).toFixed(1))));
  };

  const handleSyncToProfitEngine = () => {
    setProfitInputs({
      acres: acres,
      fertilizerCost: calc.totalCost
    });
    setIsSyncedToCost(true);
    setTimeout(() => setIsSyncedToCost(false), 3000);
  };

  const handleShareWhatsApp = () => {
    const text = generateFertilizerWhatsAppSummary(calc, farmerProfile?.name || 'किसान साथी');
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={`bg-white rounded-3xl ${inline ? 'border border-emerald-900/10 shadow-sm p-5 sm:p-6' : 'shadow-xl p-5 sm:p-8 max-w-3xl w-full mx-auto'}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center shrink-0">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#2C5E2E] text-white text-[10px] font-extrabold uppercase tracking-wider">
                ICAR वैज्ञानिक मानक
              </span>
              <span className="text-xs text-gray-400 font-bold hidden sm:inline">
                National Soil Nutrient Guide
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#101F16] mt-0.5">
              {language === 'hi' ? 'उर्वरक व पोषण सलाहकार (ICAR Dosage)' : 'Fertilizer & Nutrient Advisory'}
            </h2>
            <p className="text-xs text-gray-500">
              {language === 'hi'
                ? 'सरकारी सब्सिडी मूल्य (Subsidized MRP) व चरणबद्ध उपयोग समय सारणी'
                : 'Government subsidized MRP and stage-wise application schedule'}
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition"
          >
            ✕
          </button>
        )}
      </div>

      {/* Input Form Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-6">
        {/* Crop Selection */}
        <div>
          <label className="block text-xs font-black uppercase text-gray-600 mb-2">
            {language === 'hi' ? '1. फसल का चयन करें (Crop):' : '1. Select Crop:'}
          </label>
          <select
            value={selectedCropId}
            onChange={(e) => setSelectedCropId(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-[#FAF6EE] border border-stone-200 font-bold text-sm text-[#101F16] focus:outline-none focus:ring-2 focus:ring-[#2C5E2E]"
          >
            <option value="crop_wheat">गेहूं (Wheat) — Basal + 2 Split Urea</option>
            <option value="crop_mustard">सरसों (Mustard) — High Sulphur Special</option>
            <option value="crop_paddy">धान (Paddy / Rice) — Zinc + 2 Split Urea</option>
            <option value="crop_gram">चना (Gram / Chana) — Pulses (Zero Urea)</option>
            <option value="crop_potato">आलू (Potato) — High Potash Intensive</option>
            {CROP_BENCHMARKS.filter(
              (c) => !['crop_wheat', 'crop_mustard', 'crop_paddy', 'crop_gram'].includes(c.id)
            ).map((c) => (
              <option key={c.id} value={c.id}>
                {c.nameHi} ({c.nameEn})
              </option>
            ))}
          </select>
        </div>

        {/* Land Size in Acres with Quick Buttons */}
        <div>
          <label className="block text-xs font-black uppercase text-gray-600 mb-2">
            {language === 'hi' ? '2. खेत का रकबा (Land Acres):' : '2. Land Size in Acres:'}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0.5}
              max={100}
              step={0.5}
              value={acres}
              onChange={(e) => setAcres(Math.max(0.5, parseFloat(e.target.value) || 1))}
              className="w-28 px-4 py-3 rounded-2xl bg-[#FAF6EE] border border-stone-200 font-black text-base text-[#101F16] text-center focus:outline-none focus:ring-2 focus:ring-[#2C5E2E]"
            />
            <div className="flex items-center gap-1.5 flex-1">
              <button
                type="button"
                onClick={() => handleAddAcres(1)}
                className="flex-1 py-3 px-2 rounded-xl bg-gray-100 hover:bg-gray-200 font-extrabold text-xs text-[#101F16] transition active:scale-95"
              >
                +1 Acre
              </button>
              <button
                type="button"
                onClick={() => handleAddAcres(2)}
                className="flex-1 py-3 px-2 rounded-xl bg-gray-100 hover:bg-gray-200 font-extrabold text-xs text-[#101F16] transition active:scale-95"
              >
                +2 Acre
              </button>
              <button
                type="button"
                onClick={() => handleAddAcres(5)}
                className="flex-1 py-3 px-2 rounded-xl bg-[#2C5E2E]/10 hover:bg-[#2C5E2E]/20 font-black text-xs text-[#2C5E2E] transition active:scale-95"
              >
                +5 Acre
              </button>
            </div>
          </div>
        </div>

        {/* Soil Condition Modifier Selector */}
        <div className="md:col-span-2">
          <label className="block text-xs font-black uppercase text-gray-600 mb-2">
            {language === 'hi' ? '3. मिट्टी की स्थिति / स्वास्थ्य (Soil Condition):' : '3. Soil Condition:'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'normal', labelHi: 'सामान्य उपजाऊ मिट्टी', labelEn: 'Normal Soil', desc: 'मानक ICAR मात्रा (1.0x)' },
              { id: 'low_nitrogen', labelHi: 'कम नाइट्रोजन / पीली पत्तियां', labelEn: 'Low Nitrogen', desc: 'यूरिया +25% अतिरिक्त' },
              { id: 'saline', labelHi: 'लवणीय / खारी मिट्टी', labelEn: 'Saline / Alkaline', desc: 'DAP -10% + जिप्सम सलाह' },
              { id: 'sandy', labelHi: 'हल्की रेतीली मिट्टी', labelEn: 'Sandy Soil', desc: 'विभाजित किश्तें (Splits)' }
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSoilCondition(s.id as SoilCondition)}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  soilCondition === s.id
                    ? 'border-[#2C5E2E] bg-emerald-50/60 ring-2 ring-[#2C5E2E]/20'
                    : 'border-stone-200 bg-stone-50/60 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-[#101F16]">
                    {language === 'hi' ? s.labelHi : s.labelEn}
                  </span>
                  {soilCondition === s.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#2C5E2E]" />}
                </div>
                <p className="text-[10px] text-gray-500">{s.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bag Count & Subsidized Cost Cards */}
      <div className="bg-[#FAF6EE] rounded-3xl p-5 sm:p-6 border border-stone-200 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#E0A526] bg-amber-900/10 px-2.5 py-0.5 rounded-full">
              कुल आवश्यक खाद • {acres} एकड़ हेतु
            </span>
            <h3 className="text-base sm:text-lg font-black text-[#101F16] mt-1">
              सरकारी दर पर अनुमानित बोरी आवश्यकता
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 font-bold block">कुल अनुमानित खर्च (MRP):</span>
            <span className="text-2xl font-black text-[#2C5E2E]">
              ₹{calc.totalCost.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Urea Card */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-gray-800">नीम कोटेड यूरिया</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  45 kg बोरी
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <span className="text-3xl font-black text-[#101F16]">{calc.ureaBags}</span>
                <span className="text-xs font-bold text-gray-500">बोरी (Bags)</span>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">₹{FERTILIZER_PRICES.urea.pricePerBag} / बोरी</span>
              <span className="font-extrabold text-[#101F16]">₹{calc.ureaCost.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* DAP Card */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-gray-800">DAP (18:46:0)</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                  50 kg बोरी
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <span className="text-3xl font-black text-[#101F16]">{calc.dapBags}</span>
                <span className="text-xs font-bold text-gray-500">बोरी (Bags)</span>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">₹{FERTILIZER_PRICES.dap.pricePerBag} / बोरी</span>
              <span className="font-extrabold text-[#101F16]">₹{calc.dapCost.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* MOP Card */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-gray-800">MOP पोटाश (0:0:60)</span>
                <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full">
                  50 kg बोरी
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <span className="text-3xl font-black text-[#101F16]">{calc.mopBags}</span>
                <span className="text-xs font-bold text-gray-500">बोरी (Bags)</span>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">₹{FERTILIZER_PRICES.mop.pricePerBag} / बोरी</span>
              <span className="font-extrabold text-[#101F16]">₹{calc.mopCost.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Micronutrient Alert Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-950 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-wide text-amber-800">
            {language === 'hi' ? 'सल्फर व सूक्ष्म पोषक तत्व अलर्ट (Critical Micronutrient Notice)' : 'Micronutrient Alert'}
          </p>
          <p className="text-xs font-bold leading-relaxed text-amber-900">
            {calc.profile.micronutrientAlertHi}
          </p>
          <p className="text-xs font-semibold text-amber-800">
            💡 {calc.profile.sulphurRecommendationHi} {calc.profile.zincRecommendationHi}
          </p>
        </div>
      </div>

      {/* Step-by-Step Application Timeline */}
      <div className="space-y-3 mb-6">
        <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-[#2C5E2E]" />
          <span>चरणबद्ध उपयोग समय सारणी (Application Stages Timeline)</span>
        </h4>

        <div className="space-y-3">
          {calc.profile.stages.map((stage, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-[#2C5E2E]/40 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#2C5E2E] text-white text-xs font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-black text-[#101F16]">
                    {language === 'hi' ? stage.stageNameHi : stage.stageNameEn}
                  </span>
                </div>
                <span className="text-xs font-extrabold text-[#E0A526] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 self-start sm:self-auto">
                  {stage.timelineHi}
                </span>
              </div>

              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                {stage.descriptionHi}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {stage.recommendations.map((rec, rIdx) => (
                  <div key={rIdx} className="bg-stone-50 rounded-xl p-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-extrabold text-[#101F16] block">{rec.fertilizerNameHi}</span>
                      <span className="text-[10px] text-gray-500">{rec.notesHi}</span>
                    </div>
                    <span className="font-black text-[#2C5E2E] bg-white px-2 py-1 rounded-md border border-stone-200 shadow-2xs">
                      {rec.quantityPerAcre}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Strip: WhatsApp Share & Sync to Profit Engine */}
      <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs font-extrabold shadow-md active:scale-95 transition"
        >
          <Share2 className="w-4 h-4" />
          <span>WhatsApp पर खाद पर्ची भेजें</span>
        </button>

        <button
          type="button"
          onClick={handleSyncToProfitEngine}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-black shadow-md transition active:scale-95 ${
            isSyncedToCost
              ? 'bg-emerald-600 text-white'
              : 'bg-[#2C5E2E] hover:bg-[#1e4220] text-white'
          }`}
        >
          {isSyncedToCost ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>लागत में सफलतापूर्वक जोड़ा गया! (₹{calc.totalCost.toLocaleString('en-IN')})</span>
            </>
          ) : (
            <>
              <Calculator className="w-4 h-4 text-[#E0A526]" />
              <span>लागत में जोड़ें (Add to Cost Engine: ₹{calc.totalCost.toLocaleString('en-IN')})</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
export default FertilizerCalculator;
