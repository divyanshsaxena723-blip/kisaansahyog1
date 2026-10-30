import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  X,
  MapPin,
  Square,
  Sprout,
  Droplets,
  Layers,
  Save,
  CheckCircle2
} from 'lucide-react';

interface FarmerLandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FarmerLandModal: React.FC<FarmerLandModalProps> = ({ isOpen, onClose }) => {
  const { farmerProfile, updateFarmerProfile, language } = useStore();
  const [formData, setFormData] = useState({ ...farmerProfile });

  if (!isOpen) return null;

  const soilOptions = [
    'Black Alluvial Soil (काली दोमट मिट्टी)',
    'Clay Loam (चिकनी दोमट)',
    'Sandy Loam (बलुई दोमट)',
    'Red Soil (लाल मिट्टी)'
  ];

  const cropOptions = [
    'Wheat (गेहूं)',
    'Soybean (सोयाबीन)',
    'Gram (चना)',
    'Mustard (सरसों)',
    'Cotton (कपास)',
    'Paddy (धान)'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateFarmerProfile(formData);
    onClose();
    alert('Land and farm profile saved successfully!');
  };

  const toggleCrop = (crop: string) => {
    const crops = formData.primaryCrops.includes(crop)
      ? formData.primaryCrops.filter((c) => c !== crop)
      : [...formData.primaryCrops, crop];
    setFormData({ ...formData, primaryCrops: crops });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF6EE] border-b border-emerald-900/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2C5E2E] text-white flex items-center justify-center">
              <Sprout className="w-4 h-4 text-[#E0A526]" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#101F16] text-base sm:text-lg">
                {language === 'hi' ? 'खेत व ज़मीन का विवरण' : 'Land & Farm Profile'}
              </h3>
              <p className="text-xs text-[#4A2C17]/70 font-mono">
                {farmerProfile.kisaanId} • {farmerProfile.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto">
          {/* Location */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-[#101F16] uppercase tracking-wider">
              {language === 'hi' ? 'खेत का स्थान (Location)' : 'Farm Location'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] font-bold text-gray-500 block mb-1">State</span>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3.5 h-11 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-[#101F16] focus:bg-white focus:outline-none"
                  required
                />
              </div>
              <div>
                <span className="text-[11px] font-bold text-gray-500 block mb-1">District</span>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3.5 h-11 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-[#101F16] focus:bg-white focus:outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-500 block mb-1">Village / Tehsil</span>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                className="w-full px-3.5 h-11 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-[#101F16] focus:bg-white focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Land size */}
          <div>
            <label className="block text-xs font-bold text-[#101F16] mb-1">
              {language === 'hi' ? 'कुल जोत रकबा (Land Holding in Acres)' : 'Total Land Size'}
            </label>
            <div className="flex items-center px-4 h-12 rounded-xl bg-gray-50 border border-gray-200 focus-within:bg-white focus-within:border-[#2C5E2E]">
              <input
                type="number"
                step={0.5}
                min={0.5}
                value={formData.totalLandAcres}
                onChange={(e) =>
                  setFormData({ ...formData, totalLandAcres: parseFloat(e.target.value) || 1 })
                }
                className="w-full bg-transparent font-extrabold text-sm text-[#101F16] focus:outline-none"
                required
              />
              <span className="text-xs font-bold text-gray-500 ml-2">Acres</span>
            </div>
          </div>

          {/* Soil Type */}
          <div>
            <label className="block text-xs font-bold text-[#101F16] mb-1">
              {language === 'hi' ? 'मिट्टी का प्रकार (Soil Type)' : 'Soil Type'}
            </label>
            <select
              value={formData.soilType}
              onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
              className="w-full px-3.5 h-11 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-[#101F16] focus:bg-white focus:outline-none"
            >
              {soilOptions.map((s, idx) => (
                <option key={idx} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Primary Crops */}
          <div>
            <label className="block text-xs font-bold text-[#101F16] mb-2">
              {language === 'hi' ? 'मुख्य फसलें (Primary Crops Cultivated)' : 'Primary Crops'}
            </label>
            <div className="flex flex-wrap gap-2">
              {cropOptions.map((crop, idx) => {
                const isSelected = formData.primaryCrops.includes(crop);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCrop(crop)}
                    className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                      isSelected
                        ? 'bg-[#2C5E2E] text-white shadow-2xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {crop}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Irrigation Source */}
          <div>
            <label className="block text-xs font-bold text-[#101F16] mb-1">
              {language === 'hi' ? 'सिंचाई साधन (Irrigation Source)' : 'Irrigation Source'}
            </label>
            <input
              type="text"
              value={formData.irrigationSource}
              onChange={(e) => setFormData({ ...formData, irrigationSource: e.target.value })}
              className="w-full px-3.5 h-11 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-[#101F16] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Save button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 rounded-full bg-[#2C5E2E] text-white font-extrabold text-sm shadow-md hover:bg-emerald-800 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{language === 'hi' ? 'विवरण सुरक्षित करें' : 'Save Farm Details'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
