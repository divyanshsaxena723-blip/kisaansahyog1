import React from 'react';
import { useStore } from './store/useStore';
import { ViewModeToggle } from './components/common/ViewModeToggle';
import { AICopilotModal } from './components/common/AICopilotModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { TourModal } from './components/common/TourModal';
import { AuthModal } from './components/common/AuthModal';
import { UnifiedAuthModal } from './components/common/UnifiedAuthModal';
import { WebLoginModal } from './components/web/WebLoginModal';
import { WebLandingPage } from './components/web/WebLandingPage';
import { WebShell } from './components/web/WebShell';
import { MobileLoginScreen } from './components/app/MobileLoginScreen';
import { MobileTourScreen } from './components/app/MobileTourScreen';
import { MobileAppShell } from './shells/MobileAppShell';

export default function App() {
  const {
    viewMode,
    isAuthenticated,
    currentPage,
    setCurrentPage,
    setUserRole,
    login
  } = useStore();

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-stone-900 font-sans antialiased selection:bg-[#2C5E2E] selection:text-white">
      {/* Global Utilities */}
      <ViewModeToggle />
      <AICopilotModal />
      <NotificationDrawer />
      <TourModal />
      <AuthModal />

      {/* 1. If not authenticated or on landing/login page: */}
      {!isAuthenticated || currentPage === 'landing' || currentPage === 'login' ? (
        currentPage === 'login' ? (
          <UnifiedAuthModal />
        ) : viewMode === 'web' ? (
          <WebLandingPage
            onGetStarted={() => setCurrentPage('login')}
            onExploreMarket={() => {
              // Allows exploring without login or goes to login
              setCurrentPage('login');
            }}
          />
        ) : (
          <MobileTourScreen onFinish={() => setCurrentPage('login')} />
        )
      ) : (
        /* 2. Authenticated Dashboard View */
        viewMode === 'app' ? (
          <main className="py-0 sm:py-6 flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md min-h-screen sm:min-h-[844px] bg-white sm:rounded-[2.5rem] shadow-2xl border border-stone-200 overflow-hidden relative flex flex-col">
              <MobileAppShell />
            </div>
          </main>
        ) : (
          <main className="w-full min-h-screen flex flex-col">
            <WebShell />
          </main>
        )
      )}
    </div>
  );
}

export { App };
