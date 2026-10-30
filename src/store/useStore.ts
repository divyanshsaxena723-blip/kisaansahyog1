import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  UserRole,
  CropListing,
  DealOrder,
  NotificationItem,
  FarmerProfile,
  BuyerProfile,
  CostCalculatorState
} from '../types';
import {
  INITIAL_FARMER_PROFILE,
  INITIAL_BUYER_PROFILE,
  INITIAL_CROP_LISTINGS,
  INITIAL_DEAL_ORDERS,
  INITIAL_NOTIFICATIONS,
  CROP_BENCHMARKS
} from '../utils/constants';

export type FarmerTab = 'home' | 'profit' | 'listings' | 'deals';
export type BuyerTab = 'bazaar' | 'orders' | 'profile';

interface AppState {
  // Navigation & Authentication
  activeRole: UserRole;
  userRole: UserRole; // Alias for activeRole
  viewMode: 'app' | 'web';
  currentPage: 'landing' | 'login' | 'dashboard';
  farmerTab: FarmerTab;
  buyerTab: BuyerTab;
  language: 'hi' | 'en';
  isAuthenticated: boolean;
  userPhone: string;
  isAuthModalOpen: boolean;
  isTourOpen: boolean;
  isNotificationsOpen: boolean;
  isVoiceModalOpen: boolean;
  selectedDealDetailId: string | null;

  // Personas
  farmerProfile: FarmerProfile;
  buyerProfile: BuyerProfile;

  // Datasets
  listings: CropListing[];
  orders: DealOrder[];
  notifications: NotificationItem[];

  // Cost & Profit Engine State
  costState: CostCalculatorState;
  profitInputs: CostCalculatorState; // Alias for costState

  // Actions
  setRole: (role: UserRole) => void;
  setUserRole: (role: UserRole) => void; // Alias for setRole
  setViewMode: (mode: 'app' | 'web') => void;
  toggleViewMode: () => void;
  setCurrentPage: (page: 'landing' | 'login' | 'dashboard') => void;
  setFarmerTab: (tab: FarmerTab) => void;
  setBuyerTab: (tab: BuyerTab) => void;
  setLanguage: (lang: 'hi' | 'en') => void;
  toggleLanguage: () => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsTourOpen: (open: boolean) => void;
  setIsNotificationsOpen: (open: boolean) => void;
  setIsVoiceModalOpen: (open: boolean) => void;
  setSelectedDealDetailId: (dealId: string | null) => void;

  login: (roleOrPhone?: UserRole | string, phoneOrRole?: string | UserRole) => void;
  logout: () => void;

  updateFarmerProfile: (profile: Partial<FarmerProfile>) => void;
  updateBuyerProfile: (profile: Partial<BuyerProfile>) => void;

  // Farmer listing creation
  addListing: (listingData: {
    cropId: string;
    variety: string;
    category: 'cereals' | 'pulses' | 'oilseeds' | 'cash_crops';
    quantityQuintals: number;
    pricePerQuintal: number;
    moisturePercent?: number;
    grade?: string;
    description?: string;
    reach?: 'local' | 'state' | 'nationwide';
    image?: string;
  }) => void;

  updateListingStatus: (id: string, status: CropListing['status']) => void;

  // Deal & Token Escrow
  requestTokenDeal: (listingId: string, quantityQuintals: number, advanceToken?: number) => string;
  acceptDeal: (orderId: string) => void;
  declineDeal: (orderId: string) => void;

  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Cost calculator
  updateCostState: (updates: Partial<CostCalculatorState>) => void;
  setProfitInputs: (updates: Partial<CostCalculatorState>) => void; // Alias for updateCostState

  // Demo reset
  resetDemoData: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => {
      const initialCostState: CostCalculatorState = {
        acres: 4,
        selectedCropId: 'crop_wheat',
        seedCost: 9200,
        fertilizerCost: 14500,
        dieselHours: 32,
        dieselRatePerHour: 200, // ~ ₹6,400 irrigation & diesel power
        laborCost: 18000,
        otherCost: 3100,
        expectedYieldPerAcre: 20, // 20 Qtl per acre = 80 Qtl total
        expectedSellingRate: 2850
      };

      return {
        activeRole: 'farmer',
        userRole: 'farmer',
        viewMode: 'web',
        currentPage: 'landing',
        farmerTab: 'home',
        buyerTab: 'bazaar',
        language: 'hi',
        isAuthenticated: false,
        userPhone: '+91 94250 82194',
        isAuthModalOpen: false,
        isTourOpen: false,
        isNotificationsOpen: false,
        isVoiceModalOpen: false,
        selectedDealDetailId: null,

        farmerProfile: INITIAL_FARMER_PROFILE,
        buyerProfile: INITIAL_BUYER_PROFILE,

        listings: INITIAL_CROP_LISTINGS,
        orders: INITIAL_DEAL_ORDERS,
        notifications: INITIAL_NOTIFICATIONS,

        costState: initialCostState,
        profitInputs: initialCostState,

        setRole: (role) => set({ activeRole: role, userRole: role }),
        setUserRole: (role) => set({ activeRole: role, userRole: role }),
        setViewMode: (mode) => set({ viewMode: mode }),
        toggleViewMode: () => set((s) => ({ viewMode: s.viewMode === 'app' ? 'web' : 'app' })),
        setCurrentPage: (page) => set({ currentPage: page }),
        setFarmerTab: (tab) => set({ farmerTab: tab }),
        setBuyerTab: (tab) => set({ buyerTab: tab }),
        setLanguage: (lang) => set({ language: lang }),
        toggleLanguage: () => set((state) => ({ language: state.language === 'hi' ? 'en' : 'hi' })),
        setIsAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
        setIsTourOpen: (open) => set({ isTourOpen: open }),
        setIsNotificationsOpen: (open) => set({ isNotificationsOpen: open }),
        setIsVoiceModalOpen: (open) => set({ isVoiceModalOpen: open }),
        setSelectedDealDetailId: (dealId) => set({ selectedDealDetailId: dealId }),

        login: (roleOrPhone = 'farmer', phoneOrRole = '+91 94250 82194') => {
          let role: UserRole = 'farmer';
          let phone = '+91 94250 82194';

          if (roleOrPhone === 'farmer' || roleOrPhone === 'buyer') {
            role = roleOrPhone;
            if (typeof phoneOrRole === 'string' && phoneOrRole) {
              phone = phoneOrRole;
            }
          } else if (typeof roleOrPhone === 'string') {
            phone = roleOrPhone;
            if (phoneOrRole === 'farmer' || phoneOrRole === 'buyer') {
              role = phoneOrRole;
            }
          }

          set({
            isAuthenticated: true,
            userPhone: phone,
            activeRole: role,
            userRole: role,
            currentPage: 'dashboard',
            isAuthModalOpen: false
          });
        },

        logout: () => set({
          isAuthenticated: false,
          currentPage: 'landing'
        }),

      updateFarmerProfile: (updates) => set((state) => ({
        farmerProfile: { ...state.farmerProfile, ...updates }
      })),

      updateBuyerProfile: (updates) => set((state) => ({
        buyerProfile: { ...state.buyerProfile, ...updates }
      })),

      addListing: (listingData) => {
        const crop = CROP_BENCHMARKS.find((c) => c.id === listingData.cropId) || CROP_BENCHMARKS[0];
        const state = get();
        const newListing: CropListing = {
          id: `listing_${Date.now()}`,
          cropId: crop.id,
          cropNameEn: crop.nameEn,
          cropNameHi: crop.nameHi,
          variety: listingData.variety || crop.variety,
          category: crop.category,
          quantityQuintals: listingData.quantityQuintals,
          pricePerQuintal: listingData.pricePerQuintal,
          moisturePercent: listingData.moisturePercent || crop.standardMoisture,
          grade: listingData.grade || 'Grade A',
          lotNumber: `Lot #${Math.floor(100 + Math.random() * 900)}`,
          location: `${state.farmerProfile.village}, ${state.farmerProfile.district}`,
          district: state.farmerProfile.district,
          state: state.farmerProfile.state,
          distanceKm: Math.floor(5 + Math.random() * 30),
          farmerName: state.farmerProfile.name,
          farmerPhone: state.farmerProfile.phone,
          farmerRating: 4.9,
          farmerSalesCount: 13,
          image: listingData.image || crop.image,
          harvestDate: 'Taza Fasal (Just Harvested)',
          isVerified: true,
          status: 'active',
          description: listingData.description || 'Farm-fresh harvest direct from farmer field.',
          reach: listingData.reach || 'nationwide',
          requestsCount: 0
        };

        set((s) => ({
          listings: [newListing, ...s.listings],
          notifications: [
            {
              id: `notif_${Date.now()}`,
              type: 'mandi_spike',
              titleEn: `Listing Created: ${newListing.cropNameEn}`,
              titleHi: `नई फसल लिस्ट हुई: ${newListing.cropNameHi}`,
              messageEn: `${newListing.quantityQuintals} Quintals offered @ ₹${newListing.pricePerQuintal}/Qtl. Active for buyers.`,
              messageHi: `${newListing.quantityQuintals} क्विंटल @ ₹${newListing.pricePerQuintal}/क्विंटल पर बाज़ार में लाइव हो चुका है।`,
              timeAgo: 'अभी-अभी',
              isRead: false,
              severity: 'success'
            },
            ...s.notifications
          ]
        }));
      },

      updateListingStatus: (id, status) => set((s) => ({
        listings: s.listings.map((l) => (l.id === id ? { ...l, status } : l))
      })),

      requestTokenDeal: (listingId, quantityQuintals, advanceToken = 1000) => {
        const state = get();
        const listing = state.listings.find((l) => l.id === listingId);
        if (!listing) return '';

        const dealId = `deal_ks${Math.floor(1000 + Math.random() * 9000)}`;
        const totalAmount = quantityQuintals * listing.pricePerQuintal;

        const newOrder: DealOrder = {
          id: dealId,
          listingId: listing.id,
          cropNameEn: listing.cropNameEn,
          cropNameHi: listing.cropNameHi,
          quantityQuintals,
          pricePerQuintal: listing.pricePerQuintal,
          totalAmount,
          tokenAdvanceAmount: advanceToken, // standard ₹1,000 escrow advance
          buyerName: state.buyerProfile.name,
          buyerCompany: state.buyerProfile.companyName,
          buyerPhone: state.buyerProfile.phone,
          buyerGstin: state.buyerProfile.gstin,
          buyerLocation: state.buyerProfile.city + ', ' + state.buyerProfile.state,
          farmerName: listing.farmerName,
          farmerPhone: listing.farmerPhone,
          farmerLocation: `${listing.location}, ${listing.state}`,
          status: 'token_requested',
          requestedAt: 'Just Now',
          tokenEscrowStatus: 'locked_in_escrow',
          notes: `Token of ₹${advanceToken.toLocaleString('en-IN')} locked in Kisaan Sahyog Escrow. Awaiting farmer response.`,
          cropImage: listing.image
        };

        set((s) => ({
          orders: [newOrder, ...s.orders],
          listings: s.listings.map((l) =>
            l.id === listingId ? { ...l, requestsCount: l.requestsCount + 1 } : l
          ),
          notifications: [
            {
              id: `notif_${Date.now()}`,
              type: 'token_request',
              titleEn: `Token Request Sent: ₹${advanceToken}`,
              titleHi: `टोकन अनुरोध भेजा: ₹${advanceToken}`,
              messageEn: `Requested ${quantityQuintals} Qtl of ${listing.cropNameEn} from ${listing.farmerName}. Advance locked in Escrow.`,
              messageHi: `${listing.farmerName} को ${quantityQuintals} क्विंटल ${listing.cropNameHi} हेतु ₹${advanceToken} टोकन अनुरोध भेजा गया।`,
              timeAgo: 'अभी-अभी',
              isRead: false,
              severity: 'info',
              dealId
            },
            ...s.notifications
          ]
        }));

        return dealId;
      },

      acceptDeal: (orderId) => {
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status: 'token_accepted',
                  acceptedAt: 'Just now',
                  tokenEscrowStatus: 'locked_in_escrow'
                }
              : o
          ),
          notifications: [
            {
              id: `notif_${Date.now()}`,
              type: 'token_request',
              titleEn: `Deal Confirmed! Contact Unlocked`,
              titleHi: `सौदा स्वीकृत! संपर्क विवरण अनलॉक हुआ`,
              messageEn: `Advance ₹1,000 is safely locked in Sahyog Escrow. Direct WhatsApp and phone unlocked.`,
              messageHi: `₹1,000 का टोकन एस्क्रो में सुरक्षित जमा है। खरीदार का फ़ोन नंबर और व्हाट्सएप खुल गया है।`,
              timeAgo: 'अभी-अभी',
              isRead: false,
              severity: 'success',
              dealId: orderId
            },
            ...s.notifications
          ]
        }));
      },

      declineDeal: (orderId) => {
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status: 'cancelled',
                  tokenEscrowStatus: 'refunded'
                }
              : o
          ),
          notifications: [
            {
              id: `notif_${Date.now()}`,
              type: 'token_request',
              titleEn: `Deal Declined`,
              titleHi: `सौदा अस्वीकार किया गया`,
              messageEn: `The buyer token request was declined. Escrow token refunded.`,
              messageHi: `खरीदार का टोकन अनुरोध अस्वीकार किया गया। बयाना राशि रिफंड हो गई।`,
              timeAgo: 'अभी-अभी',
              isRead: false,
              severity: 'warning',
              dealId: orderId
            },
            ...s.notifications
          ]
        }));
      },

      markNotificationAsRead: (id) => set((s) => ({
        notifications: s.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      })),

      markAllNotificationsAsRead: () => set((s) => ({
        notifications: s.notifications.map((n) => ({ ...n, isRead: true }))
      })),

      updateCostState: (updates) => set((s) => {
        const nextCost = { ...s.costState, ...updates };
        return { costState: nextCost, profitInputs: nextCost };
      }),

      setProfitInputs: (updates) => set((s) => {
        const nextCost = { ...s.costState, ...updates };
        return { costState: nextCost, profitInputs: nextCost };
      }),

        resetDemoData: () => set({
          listings: INITIAL_CROP_LISTINGS,
          orders: INITIAL_DEAL_ORDERS,
          notifications: INITIAL_NOTIFICATIONS,
          farmerProfile: INITIAL_FARMER_PROFILE,
          buyerProfile: INITIAL_BUYER_PROFILE
        })
      };
    },
    {
      name: 'kisaan_sahyog_store_v2',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        listings: state.listings,
        orders: state.orders,
        notifications: state.notifications,
        farmerProfile: state.farmerProfile,
        buyerProfile: state.buyerProfile,
        costState: state.costState,
        profitInputs: state.profitInputs,
        language: state.language,
        activeRole: state.activeRole,
        userRole: state.userRole,
        viewMode: state.viewMode
        // NOTE: isAuthenticated and currentPage are omitted from storage so
        // that refreshing or opening the app always starts at 'landing' with isAuthenticated: false!
      })
    }
  )
);
