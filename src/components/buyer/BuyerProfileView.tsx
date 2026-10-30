import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  Building2,
  ShieldCheck,
  Award,
  CheckCircle2,
  MapPin,
  FileText,
  BadgeCheck,
  TrendingUp,
  PackageCheck,
  Edit3,
  Phone,
  Save,
  Sprout
} from 'lucide-react';

export const BuyerProfileView: React.FC = () => {
  const { buyerProfile, updateBuyerProfile, language } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...buyerProfile });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBuyerProfile(formData);
    setIsEditing(false);
    alert('Business KYC details updated successfully!');
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header Profile Hero Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-[#2C5E2E] text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-emerald-900/20 shrink-0">
              <span>SA</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-[#101F16]">
                  {buyerProfile.companyName}
                </h1>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#166534] text-xs font-black border border-emerald-300 shadow-2xs">
                  <BadgeCheck className="w-4 h-4 text-[#166534]" />
                  <span>Mandi Verified Trader</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-600">
                {buyerProfile.name} • {buyerProfile.companyType}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>{buyerProfile.city}, {buyerProfile.state}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="px-5 py-2.5 rounded-full bg-emerald-50 text-[#2C5E2E] hover:bg-emerald-100 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition-all active:scale-95 border border-emerald-200"
          >
            <Edit3 className="w-4 h-4 text-[#E0A526]" />
            <span>{isEditing ? (language === 'hi' ? 'रद्द करें' : 'Cancel') : (language === 'hi' ? 'प्रोफ़ाइल बदलें' : 'Edit KYC')}</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 pt-6 border-t border-gray-100">
          <div className="bg-[#FAF6EE] p-3 sm:p-4 rounded-2xl text-center border border-emerald-900/10">
            <span className="text-xl sm:text-2xl font-black text-[#2C5E2E] block">
              {buyerProfile.dealsCount}
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-gray-600">
              {language === 'hi' ? 'सीधे सौदे पूर्ण' : 'Direct Deals Fulfilled'}
            </span>
          </div>

          <div className="bg-[#FAF6EE] p-3 sm:p-4 rounded-2xl text-center border border-emerald-900/10">
            <span className="text-xl sm:text-2xl font-black text-[#E0A526] block">
              {buyerProfile.procuredVolume}
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-gray-600">
              {language === 'hi' ? 'कुल खरीद मात्रा' : 'Procured Volume'}
            </span>
          </div>

          <div className="bg-[#FAF6EE] p-3 sm:p-4 rounded-2xl text-center border border-emerald-900/10">
            <span className="text-xl sm:text-2xl font-black text-[#166534] block">
              {buyerProfile.clearanceRate}
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-gray-600">
              {language === 'hi' ? 'एस्क्रो क्लीयरेंस दर' : 'Escrow Clearance Rate'}
            </span>
          </div>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-900/10 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-[#101F16]">
            {language === 'hi' ? 'व्यापार व मंडी केवाईसी विवरण बदलें' : 'Update Trader KYC Details'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 h-12 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-bold focus:bg-white focus:border-[#2C5E2E] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Contact Person</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 h-12 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-bold focus:bg-white focus:border-[#2C5E2E] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">GSTIN Number</label>
              <input
                type="text"
                value={formData.gstin}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                className="w-full px-4 h-12 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-bold font-mono focus:bg-white focus:border-[#2C5E2E] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mandi License ID</label>
              <input
                type="text"
                value={formData.mandiLicenseNumber}
                onChange={(e) => setFormData({ ...formData, mandiLicenseNumber: e.target.value })}
                className="w-full px-4 h-12 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-bold font-mono focus:bg-white focus:border-[#2C5E2E] focus:outline-none"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">Mandi Yard Address</label>
              <input
                type="text"
                value={formData.mandiYardAddress}
                onChange={(e) => setFormData({ ...formData, mandiYardAddress: e.target.value })}
                className="w-full px-4 h-12 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-semibold focus:bg-white focus:border-[#2C5E2E] focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-[#2C5E2E] text-white font-extrabold text-sm flex items-center gap-2 shadow-md hover:bg-emerald-800 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Updates</span>
          </button>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Statutory Verification Card */}
          <div className="bg-white p-6 rounded-3xl border border-emerald-900/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-[#101F16] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#2C5E2E]" />
                <span>{language === 'hi' ? 'वैधानिक व मंडी अनुज्ञप्ति (Licensing)' : 'Statutory & Licensing'}</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] text-xs font-black">
                Active & Audited
              </span>
            </div>

            <div className="space-y-3">
              {/* GSTIN */}
              <div className="p-3.5 bg-gray-50 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-500 block">GSTIN / जीएसटी नंबर</span>
                  <span className="text-sm font-black font-mono text-[#101F16]">
                    {buyerProfile.gstin}
                  </span>
                </div>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-[#166534] text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </span>
              </div>

              {/* Mandi License */}
              <div className="p-3.5 bg-gray-50 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-500 block">Mandi Trade License</span>
                  <span className="text-sm font-black font-mono text-[#101F16]">
                    {buyerProfile.mandiLicenseNumber}
                  </span>
                </div>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-[#166534] text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Authorized</span>
                </span>
              </div>

              {/* Mandi Yard */}
              <div className="p-3.5 bg-gray-50 rounded-2xl space-y-1">
                <span className="text-[11px] font-bold text-gray-500 block">Mandi Yard Delivery Hub</span>
                <p className="text-xs font-bold text-[#101F16] leading-relaxed">
                  {buyerProfile.mandiYardAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Primary Procurement Commodities Card */}
          <div className="bg-white p-6 rounded-3xl border border-emerald-900/10 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-[#101F16] flex items-center gap-2">
              <Sprout className="w-5 h-5 text-[#2C5E2E]" />
              <span>{language === 'hi' ? 'प्राथमिक खरीद फसलें (Procurement)' : 'Core Procurement Commodities'}</span>
            </h2>

            <div className="flex flex-wrap gap-2">
              {buyerProfile.primaryProcurement.map((crop, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#2C5E2E] border border-emerald-200 text-xs font-extrabold shadow-2xs"
                >
                  🌾 {crop}
                </span>
              ))}
            </div>

            <div className="p-4 bg-[#FAF6EE] rounded-2xl border border-emerald-900/10 space-y-2 mt-4">
              <span className="text-xs font-extrabold text-[#4A2C17] block">
                {language === 'hi' ? 'संस्थागत खरीददार एस्क्रो रेटिंग' : 'Institutional Buyer Escrow Rating'}
              </span>
              <p className="text-xs text-gray-600 leading-relaxed">
                यह फर्म 4.9★ रेटिंग के साथ किसान सहयोग अधिकृत खरीदार है। किसान द्वारा सौदा स्वीकार किए जाने पर 100% समय पर भुगतान दर्ज है।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
