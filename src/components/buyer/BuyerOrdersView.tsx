import React from 'react';
import { useStore } from '../../store/useStore';
import {
  PackageCheck,
  ShieldCheck,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle2,
  Lock,
  Unlock,
  Truck,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const BuyerOrdersView: React.FC = () => {
  const { orders, language } = useStore();

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-emerald-900/10 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#2C5E2E] text-white flex items-center justify-center shadow-md shadow-emerald-900/20">
            <PackageCheck className="w-6 h-6 text-[#E0A526]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#101F16]">
                {language === 'hi' ? 'मेरे ऑर्डर व बयाना एस्क्रो' : 'Orders Tracker & Escrow'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] text-xs font-extrabold">
                {orders.length} {language === 'hi' ? 'सक्रिय ऑर्डर' : 'Active Orders'}
              </span>
            </div>
            <p className="text-xs text-[#4A2C17]/80 mt-0.5">
              {language === 'hi'
                ? 'किसान द्वारा स्वीकार किए जाने पर किसान का सत्यापित मोबाइल नंबर व व्हाट्सएप अनलॉक होता है'
                : 'Farmer verification reveals direct WhatsApp & dispatch loading details upon token acceptance'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#166534] bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-[#2C5E2E]" />
          <span>100% Escrow Protected</span>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-emerald-900/10">
            <PackageCheck className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-extrabold text-[#101F16]">
              {language === 'hi' ? 'अभी कोई सक्रिय ऑर्डर नहीं है' : 'No active orders placed'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              बाज़ार से किसी भी फसल पर ₹1,000 टोकन भेजकर सीधा सौदा शुरू करें।
            </p>
          </div>
        ) : (
          orders.map((order) => {
            const isAccepted = order.status === 'token_accepted';
            const isPending = order.status === 'token_requested';

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-emerald-900/10 shadow-sm p-6 space-y-5 overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-emerald-900 shrink-0 shadow-xs">
                      <img
                        src={order.cropImage}
                        alt={order.cropNameEn}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black text-[#101F16]">
                          {order.cropNameHi}
                        </h2>
                        <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                          #{order.id.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        किसान: <strong className="text-[#101F16]">{order.farmerName}</strong> • {order.farmerLocation}
                      </p>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div>
                    {isAccepted ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-[#DCFCE7] text-[#166534] border border-emerald-300 shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                        <span>Token Accepted (Advance ₹{order.tokenAdvanceAmount.toLocaleString('en-IN')} Locked in Escrow)</span>
                      </span>
                    ) : isPending ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 shadow-xs animate-pulse">
                        <Clock className="w-4 h-4 text-amber-800" />
                        <span>Token Requested (Awaiting Farmer Confirmation)</span>
                      </span>
                    ) : (
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                        {order.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Timeline Stepper */}
                <div className="py-2">
                  <div className="flex items-center justify-between text-xs font-extrabold mb-2 text-[#4A2C17]">
                    <span>सौदा प्रगति (Deal Progress)</span>
                    <span className="text-[#2C5E2E]">
                      {isAccepted ? 'चरण 3/5: संपर्क अनलॉक व लोडिंग' : 'चरण 1/5: टोकन भेजा गया'}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex flex-col gap-1">
                      <div className="h-2 rounded-full bg-[#2C5E2E]" />
                      <span className="text-[10px] font-bold text-[#2C5E2E]">
                        1. टोकन भेजा गया ✓
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="h-2 rounded-full bg-[#2C5E2E]" />
                      <span className="text-[10px] font-bold text-[#2C5E2E]">
                        2. ₹1,000 एस्क्रो में लॉक ✓
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div
                        className={`h-2 rounded-full ${
                          isAccepted ? 'bg-[#2C5E2E]' : 'bg-gray-200'
                        }`}
                      />
                      <span
                        className={`text-[10px] font-bold ${
                          isAccepted ? 'text-[#2C5E2E]' : 'text-gray-400'
                        }`}
                      >
                        3. किसान स्वीकृति {isAccepted && '✓'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="h-2 rounded-full bg-gray-200" />
                      <span className="text-[10px] font-bold text-gray-400">
                        4. पिकअप व भुगतान
                      </span>
                    </div>
                  </div>
                </div>

                {/* Deal Financials Card */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#FAF6EE] rounded-2xl border border-emerald-900/10">
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 block">ऑर्डर मात्रा</span>
                    <span className="text-base font-black text-[#101F16]">
                      {order.quantityQuintals} Quintals
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 block">तयशुदा भाव</span>
                    <span className="text-base font-black text-[#101F16]">
                      ₹{order.pricePerQuintal} / Qtl
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 block">सकल सौदा मूल्य</span>
                    <span className="text-base font-black text-[#2C5E2E]">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#166534] block">बयाना टोकन</span>
                    <span className="text-base font-black text-[#E0A526]">
                      ₹{order.tokenAdvanceAmount.toLocaleString('en-IN')} Locked
                    </span>
                  </div>
                </div>

                {/* Contact Unlock Section (Activated upon acceptance!) */}
                {isAccepted ? (
                  <div className="p-5 bg-gradient-to-br from-[#DCFCE7] via-emerald-50 to-white rounded-2xl border-2 border-emerald-400 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Unlock className="w-5 h-5 text-[#2C5E2E]" />
                        <span className="text-sm font-black text-[#166534]">
                          किसान का सत्यापित संपर्क अनलॉक हुआ (Direct Access)
                        </span>
                      </div>
                      <span className="text-xs font-mono font-extrabold text-[#101F16]">
                        {order.farmerPhone}
                      </span>
                    </div>

                    <p className="text-xs text-[#4A2C17]/80">
                      किसान ने आपका ₹1,000 का एस्क्रो बयाना स्वीकार कर लिया है। अब आप सीधे किसान से बात करके पिकअप का समय और वाहन का नंबर साझा कर सकते हैं।
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <a
                        href={`tel:${order.farmerPhone}`}
                        className="h-12 rounded-full bg-white text-[#2C5E2E] border border-emerald-300 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:bg-emerald-50 active:scale-95 transition-all"
                      >
                        <Phone className="w-4 h-4 text-emerald-700" />
                        <span>किसान को कॉल करें ({order.farmerPhone})</span>
                      </a>

                      <a
                        href={`https://wa.me/${order.farmerPhone.replace(/\D/g, '')}?text=Namaste%20${encodeURIComponent(
                          order.farmerName
                        )},%20I%20have%20sent%20escrow%20token%20for%20order%20${order.id}.`}
                        target="_blank"
                        rel="noreferrer"
                        className="h-12 rounded-full bg-[#2C5E2E] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-900/20 hover:bg-emerald-800 active:scale-95 transition-all"
                      >
                        <MessageCircle className="w-4 h-4 text-[#E0A526]" />
                        <span>सीधा व्हाट्सएप पर चैट करें</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between text-xs text-amber-900">
                    <div className="flex items-center gap-2 font-medium">
                      <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        सुरक्षा नियम: किसान के "स्वीकार करें" दबाते ही किसान का संपर्क व खेत का सटीक पता तुरंत अनलॉक हो जाएगा।
                      </span>
                    </div>
                    <span className="text-xs font-bold text-amber-800 whitespace-nowrap ml-2">
                      प्रतीक्षारत
                    </span>
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
