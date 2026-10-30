import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { CROP_BENCHMARKS } from '../../utils/constants';
import {
  Calculator,
  Download,
  Share2,
  TrendingUp,
  Fuel,
  Users,
  Sprout,
  FlaskConical,
  Package,
  Layers,
  Sparkles,
  Info,
  CheckCircle,
  Mic
} from 'lucide-react';

export const FarmerProfitEngineView: React.FC = () => {
  const { costState, updateCostState, language } = useStore();

  const selectedCrop =
    CROP_BENCHMARKS.find((c) => c.id === costState.selectedCropId) || CROP_BENCHMARKS[0];

  // Calculations
  const irrigationCost = costState.dieselHours * costState.dieselRatePerHour;
  const totalCost =
    costState.seedCost +
    costState.fertilizerCost +
    irrigationCost +
    costState.laborCost +
    costState.otherCost;

  const costPerAcre = costState.acres > 0 ? Math.round(totalCost / costState.acres) : 0;
  const totalEstimatedYield = costState.acres * costState.expectedYieldPerAcre;
  const grossReturn = totalEstimatedYield * costState.expectedSellingRate;
  const netProfit = grossReturn - totalCost;
  const profitPerAcre = costState.acres > 0 ? Math.round(netProfit / costState.acres) : 0;
  const roi = totalCost > 0 ? Math.round((netProfit / totalCost) * 100) : 0;

  const costPercentage = grossReturn > 0 ? Math.min(100, Math.round((totalCost / grossReturn) * 100)) : 25;
  const profitPercentage = 100 - costPercentage;

  const mspDiff = costState.expectedSellingRate - selectedCrop.msp;

  const handleDownloadSheet = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `किसान सहयोग - ${selectedCrop.nameHi} मुनाफ़ा रिपोर्ट: कुल लागत ₹${totalCost.toLocaleString('en-IN')}, अनुमानित शुद्ध लाभ ₹${netProfit.toLocaleString('en-IN')} (${roi}% ROI)!`;
    if (navigator.share) {
      navigator.share({ title: 'KisaanSahyog Profit Sheet', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Profit summary copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Scope Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#2C5E2E] text-white flex items-center justify-center shadow-md shadow-emerald-900/20">
            <Calculator className="w-6 h-6 text-[#E0A526]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#101F16]">
                {language === 'hi' ? 'मुनाफ़ा इंजन (लागत व शुद्ध लाभ)' : 'Farmer Profit Engine'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] text-xs font-extrabold">
                Interactive Ledger
              </span>
            </div>
            <p className="text-xs text-[#4A2C17]/80">
              {language === 'hi'
                ? 'प्रति एकड़ वास्तविक खेती खर्च दर्ज करें और एमएसपी से अधिक लाभ अर्जित करें'
                : 'Calculate true cost per acre and maximize market selling margins vs MSP'}
            </p>
          </div>
        </div>

        {/* Crop Selector dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-bold text-gray-500 whitespace-nowrap">
            {language === 'hi' ? 'फसल चुनें:' : 'Crop:'}
          </label>
          <select
            value={costState.selectedCropId}
            onChange={(e) => {
              const newCrop = CROP_BENCHMARKS.find((c) => c.id === e.target.value);
              if (newCrop) {
                updateCostState({
                  selectedCropId: newCrop.id,
                  expectedSellingRate: newCrop.benchmark
                });
              }
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-full bg-emerald-50 text-emerald-900 font-bold text-xs sm:text-sm border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-[#2C5E2E]"
          >
            {CROP_BENCHMARKS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nameHi} ({c.nameEn}) — MSP ₹{c.msp}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Land & Yield Inputs Card */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-emerald-900/10 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-[#101F16] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#2C5E2E]" />
              <span>{language === 'hi' ? '1. ज़मीन व अनुमानित पैदावार' : '1. Land & Projected Yield'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {language === 'hi' ? 'खेत का रकबा (कुल एकड़)' : 'Field Area (Total Acres)'}
                </label>
                <div className="flex items-center px-4 h-12 rounded-2xl bg-gray-50 border border-gray-200 focus-within:border-[#2C5E2E] focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20">
                  <input
                    type="number"
                    min={0.5}
                    step={0.5}
                    value={costState.acres}
                    onChange={(e) => updateCostState({ acres: parseFloat(e.target.value) || 1 })}
                    className="w-full bg-transparent font-extrabold text-base text-[#101F16] focus:outline-none"
                  />
                  <span className="text-xs font-bold text-gray-500 ml-2">Acres</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {language === 'hi' ? 'अनुमानित पैदावार प्रति एकड़' : 'Estimated Yield per Acre'}
                </label>
                <div className="flex items-center px-4 h-12 rounded-2xl bg-gray-50 border border-gray-200 focus-within:border-[#2C5E2E] focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20">
                  <input
                    type="number"
                    min={1}
                    value={costState.expectedYieldPerAcre}
                    onChange={(e) =>
                      updateCostState({ expectedYieldPerAcre: parseFloat(e.target.value) || 1 })
                    }
                    className="w-full bg-transparent font-extrabold text-base text-[#101F16] focus:outline-none"
                  />
                  <span className="text-xs font-bold text-gray-500 ml-2">Qtl / Acre</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-900">
              <span>{language === 'hi' ? 'कुल अनुमानित उपज:' : 'Total Estimated Yield:'}</span>
              <span className="text-sm font-extrabold text-[#2C5E2E]">
                {totalEstimatedYield} {language === 'hi' ? 'क्विंटल' : 'Quintals'}
              </span>
            </div>
          </div>

          {/* Expenses Breakdown Card */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-emerald-900/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-[#101F16] uppercase tracking-wider flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-[#2C5E2E]" />
                <span>{language === 'hi' ? '2. खेती खर्च ब्योरा (कुल लागत)' : '2. Expense Breakdown'}</span>
              </h2>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                5 {language === 'hi' ? 'मद' : 'Categories'}
              </span>
            </div>

            <div className="space-y-3">
              {/* Seed cost */}
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#2C5E2E] flex items-center justify-center shrink-0">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#101F16]">
                      {language === 'hi' ? 'बीज व जुताई खर्च' : 'Seeds & Sowing Cost'}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {language === 'hi' ? 'प्रमाणित बीज व ट्रैक्टर जुताई' : 'Certified seed & tractor tilling'}
                    </p>
                  </div>
                </div>
                <div className="w-32">
                  <div className="flex items-center px-3 h-10 rounded-xl bg-white border border-gray-300 focus-within:border-[#2C5E2E]">
                    <span className="text-xs text-gray-500 mr-1">₹</span>
                    <input
                      type="number"
                      value={costState.seedCost}
                      onChange={(e) => updateCostState({ seedCost: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-transparent font-bold text-sm text-[#101F16] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Fertilizer & Pesticide */}
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#2C5E2E] flex items-center justify-center shrink-0">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#101F16]">
                      {language === 'hi' ? 'खाद, यूरिया व कीटनाशक' : 'Fertilizer & Pesticides'}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {language === 'hi' ? 'DAP, यूरिया, सूक्ष्म पोषक तत्व' : 'DAP, Urea, micronutrients, spray'}
                    </p>
                  </div>
                </div>
                <div className="w-32">
                  <div className="flex items-center px-3 h-10 rounded-xl bg-white border border-gray-300 focus-within:border-[#2C5E2E]">
                    <span className="text-xs text-gray-500 mr-1">₹</span>
                    <input
                      type="number"
                      value={costState.fertilizerCost}
                      onChange={(e) =>
                        updateCostState({ fertilizerCost: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full bg-transparent font-bold text-sm text-[#101F16] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Diesel & Tubewell Irrigation */}
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Fuel className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#101F16]">
                      {language === 'hi' ? 'डीजल व नलकूप सिंचाई' : 'Diesel Irrigation & Tubewell'}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {costState.dieselHours} {language === 'hi' ? 'घंटे @ ₹200/घंटा' : 'hours @ ₹200/hr'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20">
                    <div className="flex items-center px-2 h-10 rounded-xl bg-white border border-gray-300 focus-within:border-[#2C5E2E]">
                      <input
                        type="number"
                        value={costState.dieselHours}
                        onChange={(e) =>
                          updateCostState({ dieselHours: parseFloat(e.target.value) || 0 })
                        }
                        className="w-full bg-transparent font-bold text-sm text-[#101F16] focus:outline-none"
                      />
                      <span className="text-[10px] text-gray-400 ml-1">hrs</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-800 w-16 text-right">
                    ₹{irrigationCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Labor Cost */}
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#2C5E2E] flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#101F16]">
                      {language === 'hi' ? 'मजदूरी (निंदाई, कटाई, भराई)' : 'Labour Cost'}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {language === 'hi' ? 'श्रमिक मजदूरी व कटाई' : 'Weeding, harvesting, bagging labor'}
                    </p>
                  </div>
                </div>
                <div className="w-32">
                  <div className="flex items-center px-3 h-10 rounded-xl bg-white border border-gray-300 focus-within:border-[#2C5E2E]">
                    <span className="text-xs text-gray-500 mr-1">₹</span>
                    <input
                      type="number"
                      value={costState.laborCost}
                      onChange={(e) =>
                        updateCostState({ laborCost: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full bg-transparent font-bold text-sm text-[#101F16] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Other Expenses */}
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-200 text-gray-700 flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#101F16]">
                      {language === 'hi' ? 'अन्य खर्च (बोरी, स्थानीय ढुलाई)' : 'Gunny Bags & Local Freight'}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {language === 'hi' ? 'बारदाना व ट्रैक्टर ट्रॉली' : 'Burlap packaging & hauling'}
                    </p>
                  </div>
                </div>
                <div className="w-32">
                  <div className="flex items-center px-3 h-10 rounded-xl bg-white border border-gray-300 focus-within:border-[#2C5E2E]">
                    <span className="text-xs text-gray-500 mr-1">₹</span>
                    <input
                      type="number"
                      value={costState.otherCost}
                      onChange={(e) =>
                        updateCostState({ otherCost: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full bg-transparent font-bold text-sm text-[#101F16] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Total Cost Summary Bar */}
            <div className="p-4 bg-gray-100 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider block">
                  {language === 'hi' ? 'कुल लागत (Total Cost)' : 'Total Cost Incurred'}
                </span>
                <span className="text-xs text-emerald-800 font-bold">
                  ₹{costPerAcre.toLocaleString('en-IN')} / {language === 'hi' ? 'एकड़ औसत' : 'Acre avg'}
                </span>
              </div>
              <span className="text-2xl font-black text-[#101F16]">
                ₹{totalCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Profit Results & Selling Price (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Selling Price & Benchmark Card */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-emerald-900/10 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-[#101F16] uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#2C5E2E]" />
              <span>{language === 'hi' ? '3. अपेक्षित बिक्री भाव व एमएसपी' : '3. Expected Selling Rate'}</span>
            </h2>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-gray-700">
                  {language === 'hi' ? 'बिक्री दर (₹/क्विंटल)' : 'Expected Rate (₹/Qtl)'}
                </label>
                <span className="text-[11px] font-bold text-[#2C5E2E] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#E0A526]" />
                  {language === 'hi' ? 'बाज़ार भाव: ₹' + selectedCrop.benchmark : 'Mandi: ₹' + selectedCrop.benchmark}
                </span>
              </div>
              <div className="flex items-center px-4 h-12 rounded-2xl bg-gray-50 border border-gray-200 focus-within:border-[#2C5E2E] focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20">
                <span className="text-base font-extrabold text-gray-500 mr-2">₹</span>
                <input
                  type="number"
                  value={costState.expectedSellingRate}
                  onChange={(e) =>
                    updateCostState({ expectedSellingRate: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full bg-transparent font-black text-xl text-[#2C5E2E] focus:outline-none"
                />
                <span className="text-xs font-bold text-gray-500 ml-2">/ Quintal</span>
              </div>
            </div>

            {/* MSP Comparison Pill */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-gray-600 block">
                  {language === 'hi' ? 'सरकारी न्यूनतम समर्थन मूल्य (MSP)' : 'Government MSP Baseline'}
                </span>
                <span className="text-sm font-black text-[#101F16]">
                  ₹{selectedCrop.msp.toLocaleString('en-IN')} / Qtl
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                  mspDiff >= 0
                    ? 'bg-[#DCFCE7] text-[#166534] border border-emerald-300'
                    : 'bg-red-100 text-red-700 border border-red-300'
                }`}
              >
                {mspDiff >= 0 ? `+₹${mspDiff} over MSP` : `-₹${Math.abs(mspDiff)} below MSP`}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs px-1">
              <span className="text-gray-600 font-semibold">
                {language === 'hi' ? 'अनुमानित सकल आय:' : 'Gross Projected Revenue:'}
              </span>
              <span className="text-base font-extrabold text-[#2C5E2E]">
                ₹{grossReturn.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Primary Net Profit Result Banner */}
          <div className="rounded-3xl bg-gradient-to-br from-[#2C5E2E] via-emerald-800 to-emerald-900 text-white p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase font-extrabold text-emerald-200 tracking-wider">
                  {language === 'hi' ? 'शुद्ध अनुमानित लाभ (Net Profit)' : 'Net Estimated Profit'}
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white mt-1">
                  ₹{netProfit.toLocaleString('en-IN')}
                </h3>
                <p className="text-xs text-emerald-200 mt-1">
                  ₹{profitPerAcre.toLocaleString('en-IN')} / {language === 'hi' ? 'एकड़ शुद्ध आमदनी' : 'acre pure earnings'}
                </p>
              </div>

              <div className="px-3.5 py-1.5 rounded-full bg-[#E0A526] text-[#4A2C17] text-xs font-black shadow-md flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>+{roi}% ROI</span>
              </div>
            </div>

            {/* Visual Segmented Cost vs Profit Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-100">
                <span>लागत: ₹{totalCost.toLocaleString('en-IN')} ({costPercentage}%)</span>
                <span>मुनाफ़ा: ₹{netProfit.toLocaleString('en-IN')} ({profitPercentage}%)</span>
              </div>
              <div className="w-full h-4 rounded-full bg-emerald-950/60 p-0.5 overflow-hidden flex shadow-inner">
                <div
                  className="h-full rounded-l-full bg-amber-400 transition-all duration-500"
                  style={{ width: `${costPercentage}%` }}
                  title={`Cost: ${costPercentage}%`}
                />
                <div
                  className="h-full rounded-r-full bg-[#DCFCE7] transition-all duration-500"
                  style={{ width: `${profitPercentage}%` }}
                  title={`Net Profit: ${profitPercentage}%`}
                />
              </div>
            </div>

            {/* Smart Holding Advisory */}
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-xs leading-relaxed text-emerald-50">
              <p className="font-bold text-[#E0A526] mb-0.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'hi' ? 'AI स्मार्ट बिक्री सुझाव' : 'AI Price Holding Advisory'}
              </p>
              <p>
                {language === 'hi'
                  ? 'मौसम अनुकूल होने पर 10-15 दिन स्टॉक रोकने से उत्तर भारत के आटा मिलों से +₹120-180/क्विंटल तक अतिरिक्त प्रीमियम मिल सकता है।'
                  : 'Holding harvest for 10-15 days can yield +₹120-180/Qtl premium driven by north-zone flour mill demand.'}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadSheet}
                className="flex-1 py-3 px-4 rounded-full bg-white text-[#2C5E2E] hover:bg-emerald-50 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'hi' ? 'लागत पर्ची डाउनलोड करें' : 'Download Cost Sheet'}</span>
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors shadow-xs"
                title="Share Sheet"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
