import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  X,
  Volume2,
  Play,
  CheckCheck,
  AlertTriangle,
  CloudRain,
  TrendingUp,
  Bug,
  Handshake,
  ArrowRight,
  Share2
} from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    language,
    setSelectedDealDetailId,
    setFarmerTab
  } = useStore();

  const [activeTab, setActiveTab] = useState<'all' | 'danger' | 'mandi'>('all');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isNotificationsOpen) return null;

  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === 'danger') return item.type === 'weather' || item.type === 'pest_alert';
    if (activeTab === 'mandi') return item.type === 'mandi_spike' || item.type === 'token_request';
    return true;
  });

  const handleAudioPlayback = () => {
    setIsPlayingAudio(true);
    // Use Web Speech API if supported
    if ('speechSynthesis' in window) {
      const textToRead = language === 'hi'
        ? "किसान सहयोग समाचार। अगले 48 घंटों में सीतापुर में 85 प्रतिशत भारी वर्षा का अनुमान है। नलकूप बंद रखें और 1450 रुपये डीजल बचाएं।"
        : "Kisaan Sahyog Voice Bulletin: 85% heavy rain predicted in Sitapur for next 48 hours. Postpone diesel irrigation to save fuel.";
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 3000);
    }
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return <CloudRain className="w-5 h-5 text-blue-600" />;
      case 'pest_alert':
        return <Bug className="w-5 h-5 text-red-600" />;
      case 'mandi_spike':
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case 'token_request':
        return <Handshake className="w-5 h-5 text-[#E0A526]" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsNotificationsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6EE] shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-emerald-900/10 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-[#101F16]">
                {language === 'hi' ? 'सूचनाएं व कृषि अलर्ट' : 'Alerts & Notifications'}
              </h2>
              <p className="text-xs text-[#4A2C17]/70">
                {language === 'hi' ? 'मौसम, मंडी व खरीदार बयाना अपडेट' : 'Weather, mandi rates & token updates'}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={markAllNotificationsAsRead}
                className="p-2 text-emerald-800 hover:bg-emerald-50 rounded-full transition-colors text-xs font-bold flex items-center gap-1"
                title="Mark all as read"
              >
                <CheckCheck className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'hi' ? 'सभी पढ़ें' : 'Mark all read'}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsNotificationsOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Audio Listen Bar */}
          <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2C5E2E] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Volume2 className="w-5 h-5 text-[#E0A526]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#101F16]">
                  {language === 'hi' ? 'सुनिए आज के मुख्य समाचार' : 'Listen to Today\'s Agri Bulletin'}
                </p>
                <p className="text-[11px] text-[#4A2C17]/70">
                  {language === 'hi' ? '2 मौसम अलर्ट और 2 मंडी सौदे' : '2 weather alerts & 2 mandi deals'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAudioPlayback}
              disabled={isPlayingAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm transition-all active:scale-95 ${
                isPlayingAudio ? 'bg-amber-600 animate-pulse' : 'bg-[#2C5E2E] hover:bg-emerald-800'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isPlayingAudio ? (language === 'hi' ? 'बोल रहा है...' : 'Speaking...') : (language === 'hi' ? 'बोलकर सुनाएं' : 'Read Out')}</span>
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="px-4 py-2.5 bg-white border-b border-emerald-900/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'all'
                  ? 'bg-[#2C5E2E] text-white shadow-xs'
                  : 'bg-emerald-50 text-[#4A2C17] hover:bg-emerald-100'
              }`}
            >
              {language === 'hi' ? `सभी (${notifications.length})` : `All (${notifications.length})`}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('danger')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'danger'
                  ? 'bg-[#2C5E2E] text-white shadow-xs'
                  : 'bg-emerald-50 text-[#4A2C17] hover:bg-emerald-100'
              }`}
            >
              {language === 'hi' ? '⚠️ मौसम व कीट' : '⚠️ Weather & Pests'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mandi')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'mandi'
                  ? 'bg-[#2C5E2E] text-white shadow-xs'
                  : 'bg-emerald-50 text-[#4A2C17] hover:bg-emerald-100'
              }`}
            >
              {language === 'hi' ? '📈 मंडी व सौदे' : '📈 Mandi & Deals'}
            </button>
          </div>

          {/* Notification Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12 text-[#4A2C17]/60">
                <p className="text-sm font-semibold">
                  {language === 'hi' ? 'कोई नई सूचना नहीं है' : 'No notifications in this filter'}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationAsRead(notif.id)}
                  className={`p-4 rounded-2xl border transition-all ${
                    notif.severity === 'critical'
                      ? 'bg-red-50 border-red-200'
                      : notif.severity === 'warning'
                      ? 'bg-amber-50 border-amber-200'
                      : notif.severity === 'success'
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-white border-emerald-900/10'
                  } ${!notif.isRead ? 'shadow-sm ring-1 ring-emerald-500/30' : 'opacity-85'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-white shadow-xs shrink-0">
                      {getItemIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-extrabold text-[#101F16] leading-tight">
                          {language === 'hi' ? notif.titleHi : notif.titleEn}
                        </span>
                        <span className="text-[10px] text-gray-500 shrink-0 font-medium">
                          {notif.timeAgo}
                        </span>
                      </div>
                      <p className="text-xs text-[#4A2C17]/90 leading-relaxed mb-2">
                        {language === 'hi' ? notif.messageHi : notif.messageEn}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        {notif.dealId ? (
                          <button
                            type="button"
                            onClick={() => {
                              setIsNotificationsOpen(false);
                              setFarmerTab('deals');
                              setSelectedDealDetailId(notif.dealId || null);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#2C5E2E] hover:underline"
                          >
                            <span>{language === 'hi' ? 'सौदा विवरण देखें' : 'View Deal Details'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : notif.type === 'pest_alert' ? (
                          <button
                            type="button"
                            onClick={() => {
                              setIsNotificationsOpen(false);
                              setFarmerTab('home');
                            }}
                            className="inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:underline"
                          >
                            <span>{language === 'hi' ? 'पत्ती स्कैन करें (AI)' : 'Scan Leaf with AI'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100/60 px-2 py-0.5 rounded-full">
                            {language === 'hi' ? 'सत्यापित अलर्ट' : 'Verified Alert'}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (navigator.share) {
                              navigator.share({
                                title: notif.titleHi,
                                text: notif.messageHi
                              }).catch(() => {});
                            } else {
                              alert('Alert copied to share with your village group!');
                            }
                          }}
                          className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
                          title="Share with Farmer Group"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
