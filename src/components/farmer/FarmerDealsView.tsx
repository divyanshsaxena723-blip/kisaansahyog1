import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  Handshake,
  ShieldCheck,
  Check,
  X,
  Phone,
  MessageCircle,
  Building2,
  Calendar,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FarmerDealsView: React.FC = () => {
  const { orders, acceptDeal, declineDeal, language } = useStore();
  const [activeTab, setActiveTab] = useState<'pending' | 'accepted' | 'all'>('all');

  const pendingOrders = orders.filter((o) => o.status === 'token_requested');
  const acceptedOrders = orders.filter((o) => o.status === 'token_accepted');

  const displayedOrders = orders.filter((o) => {
    if (activeTab === 'pending') return o.status === 'token_requested';
    if (activeTab === 'accepted') return o.status === 'token_accepted';
    return true;
  });

  const handleAccept = (orderId: string) => {
    acceptDeal(orderId);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // Ignore if canvas-confetti fails
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#2C5E2E] text-white flex items-center justify-center shadow-md shadow-emerald-900/20">
            <Handshake className="w-6 h-6 text-[#E0A526]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#101F16]">
                {language === 'hi' ? 'आवक खरीदार सौदे (टोकन एस्क्रो)' : 'Incoming Deals & Token Escrow'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] text-xs font-extrabold">
                ₹1,000 Advance Escrow
              </span>
            </div>
            <p className="text-xs text-[#4A2C17]/80 mt-0.5">
              {language === 'hi'
                ? 'खरीदार द्वारा सुरक्षित बैंक एस्क्रो में बयाना राशि जमा होने पर ही सौदा यहां आता है'
                : 'Verified token advance locked safely in escrow before unlocking direct logistics contact'}
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-[#2C5E2E] text-white shadow-xs'
                : 'bg-emerald-50 text-[#4A2C17] hover:bg-emerald-100'
            }`}
          >
            {language === 'hi' ? `सभी (${orders.length})` : `All (${orders.length})`}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'pending'
                ? 'bg-[#2C5E2E] text-white shadow-xs'
                : 'bg-emerald-50 text-[#4A2C17] hover:bg-emerald-100'
            }`}
          >
            {language === 'hi' ? `स्वीकृति प्रतीक्षित (${pendingOrders.length})` : `Pending (${pendingOrders.length})`}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('accepted')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'accepted'
                ? 'bg-[#2C5E2E] text-white shadow-xs'
                : 'bg-emerald-50 text-[#4A2C17] hover:bg-emerald-100'
            }`}
          >
            {language === 'hi' ? `स्वीकृत सौदे (${acceptedOrders.length})` : `Accepted (${acceptedOrders.length})`}
          </button>
        </div>
      </div>

      {/* Escrow Guarantee Reassurance Bar */}
      <div className="p-4 bg-gradient-to-r from-[#DCFCE7] via-emerald-50 to-[#FAF6EE] rounded-3xl border border-emerald-300 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#166534] text-white flex items-center justify-center shrink-0 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-[#E0A526]" />
        </div>
        <div className="text-xs">
          <p className="font-extrabold text-[#166534]">
            {language === 'hi'
              ? 'किसान सहयोग 100% एस्क्रो सुरक्षा गारंटी'
              : 'Kisaan Sahyog 100% Escrow Guarantee'}
          </p>
          <p className="text-[#101F16]/80 leading-snug">
            {language === 'hi'
              ? 'प्रत्येक सौदे पर ₹1,000 अग्रिम बयाना पहले ही हमारे सुरक्षित एस्क्रो में जमा है। स्वीकार करते ही खरीदार का सीधा नंबर खुल जाएगा।'
              : 'Every deal holds ₹1,000 advance in secured bank escrow. Accepting reveals direct phone and WhatsApp contact.'}
          </p>
        </div>
      </div>

      {/* Deals Stream */}
      <div className="space-y-5">
        {displayedOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-emerald-900/10">
            <Handshake className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-extrabold text-[#101F16]">
              {language === 'hi' ? 'इस श्रेणी में कोई सौदा नहीं है' : 'No deals in this filter'}
            </p>
          </div>
        ) : (
          displayedOrders.map((deal) => {
            const isPending = deal.status === 'token_requested';
            const isAccepted = deal.status === 'token_accepted';

            return (
              <div
                key={deal.id}
                className="bg-white rounded-3xl border border-emerald-900/10 shadow-sm p-5 sm:p-6 space-y-4 transition-all"
              >
                {/* Header row: ID, Buyer Name, Status pill */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-[#2C5E2E] flex items-center justify-center font-black text-sm shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-base text-[#101F16]">
                          {deal.buyerCompany}
                        </h3>
                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                          <ShieldCheck className="w-3 h-3" />
                          GSTIN Verified
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {deal.buyerName} • {deal.buyerLocation} • GSTIN: {deal.buyerGstin}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-gray-400">
                      #{deal.id.toUpperCase()}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 ${
                        isAccepted
                          ? 'bg-[#DCFCE7] text-[#166534] border border-emerald-300'
                          : isPending
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isAccepted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{language === 'hi' ? 'सौदा स्वीकृत (अनलॉक)' : 'Accepted & Unlocked'}</span>
                        </>
                      ) : isPending ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>{language === 'hi' ? 'नया टोकन अनुरोध' : 'Token Requested'}</span>
                        </>
                      ) : (
                        <span>{deal.status}</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Deal Commodity & Financial Breakdown Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#FAF6EE] rounded-2xl border border-emerald-900/10">
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 block">
                      {language === 'hi' ? 'फसल (Commodity)' : 'Commodity'}
                    </span>
                    <span className="text-sm font-extrabold text-[#101F16] block mt-0.5">
                      {deal.cropNameHi}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 block">
                      {language === 'hi' ? 'मात्रा व भाव' : 'Quantity & Rate'}
                    </span>
                    <span className="text-sm font-extrabold text-[#101F16] block mt-0.5">
                      {deal.quantityQuintals} Qtl @ ₹{deal.pricePerQuintal}/Qtl
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 block">
                      {language === 'hi' ? 'कुल सौदा मूल्य' : 'Total Deal Value'}
                    </span>
                    <span className="text-base font-black text-[#2C5E2E] block mt-0.5">
                      ₹{deal.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-800 block">
                      {language === 'hi' ? 'अग्रिम बयाना (एस्क्रो)' : 'Upfront Escrow Advance'}
                    </span>
                    <span className="text-base font-black text-[#E0A526] block mt-0.5">
                      ₹{deal.tokenAdvanceAmount.toLocaleString('en-IN')} Locked
                    </span>
                  </div>
                </div>

                {/* Actions / Contact Reveal State */}
                {isPending && (
                  <div className="space-y-3 pt-1">
                    <p className="text-xs text-[#4A2C17]/80 text-center font-medium">
                      {language === 'hi'
                        ? 'स्वीकार करने पर खरीदार का व्यक्तिगत फ़ोन नंबर, व्हाट्सएप व ट्रक लोडिंग शेड्यूल प्राप्त होगा।'
                        : 'Accepting will confirm the deal and reveal the verified buyer phone & WhatsApp.'}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => declineDeal(deal.id)}
                        className="py-3 px-4 rounded-full border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 active:scale-98 transition-all"
                      >
                        <X className="w-4 h-4" />
                        <span>{language === 'hi' ? 'अस्वीकार करें (Decline)' : 'Decline Offer'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAccept(deal.id)}
                        className="py-3 px-4 rounded-full bg-[#2C5E2E] text-white hover:bg-emerald-800 font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 active:scale-98 transition-all"
                      >
                        <Unlock className="w-4 h-4 text-[#E0A526]" />
                        <span>
                          {language === 'hi'
                            ? 'स्वीकार करें व संपर्क अनलॉक करें (Accept & Reveal)'
                            : 'Accept & Reveal Contact'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {isAccepted && (
                  <div className="p-4 bg-emerald-50/90 rounded-2xl border border-emerald-200 space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#166534] flex items-center gap-1.5">
                        <Unlock className="w-4 h-4 text-[#2C5E2E]" />
                        <span>{language === 'hi' ? 'खरीदार संपर्क विवरण (Unlocked)' : 'Buyer Verified Contact'}</span>
                      </span>
                      <span className="text-xs font-bold text-gray-600 font-mono">
                        {deal.buyerPhone}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href={`tel:${deal.buyerPhone}`}
                        className="h-11 rounded-full bg-white text-[#2C5E2E] border border-emerald-200 font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-emerald-100 transition-all active:scale-95"
                      >
                        <Phone className="w-4 h-4 text-emerald-700" />
                        <span>{language === 'hi' ? 'सीधा कॉल करें' : 'Direct Call'}</span>
                      </a>

                      <a
                        href={`https://wa.me/${deal.buyerPhone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="h-11 rounded-full bg-[#2C5E2E] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-emerald-800 transition-all active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4 text-[#E0A526]" />
                        <span>{language === 'hi' ? 'व्हाट्सएप पर बात करें' : 'WhatsApp'}</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
