export type UserRole = 'farmer' | 'buyer';

export type CropCategory = 'all' | 'cereals' | 'pulses' | 'oilseeds' | 'cash_crops';

export interface CropBenchmark {
  id: string;
  nameEn: string;
  nameHi: string;
  variety: string;
  category: 'cereals' | 'pulses' | 'oilseeds' | 'cash_crops';
  categoryHi: string;
  msp: number;
  benchmark: number;
  unit: string;
  standardMoisture: number;
  image: string;
  season: 'Rabi' | 'Kharif' | 'Zaid';
  description: string;
}

export interface CropListing {
  id: string;
  cropId: string;
  cropNameEn: string;
  cropNameHi: string;
  variety: string;
  category: 'cereals' | 'pulses' | 'oilseeds' | 'cash_crops';
  quantityQuintals: number;
  pricePerQuintal: number;
  moisturePercent: number;
  grade: string;
  lotNumber: string;
  location: string;
  district: string;
  state: string;
  distanceKm: number;
  farmerName: string;
  farmerPhone: string;
  farmerRating: number;
  farmerSalesCount: number;
  image: string;
  additionalImages?: string[];
  harvestDate: string;
  isVerified: boolean;
  status: 'active' | 'in_negotiation' | 'token_locked' | 'sold';
  description: string;
  reach: 'local' | 'state' | 'nationwide';
  requestsCount: number;
}

export type OrderStatus = 'token_requested' | 'token_accepted' | 'in_transit' | 'completed' | 'cancelled';

export interface DealOrder {
  id: string;
  listingId: string;
  cropNameEn: string;
  cropNameHi: string;
  quantityQuintals: number;
  pricePerQuintal: number;
  totalAmount: number;
  tokenAdvanceAmount: number; // ₹1,000 or calculated escrow
  buyerName: string;
  buyerCompany: string;
  buyerPhone: string;
  buyerGstin: string;
  buyerLocation: string;
  farmerName: string;
  farmerPhone: string;
  farmerLocation: string;
  status: OrderStatus;
  requestedAt: string;
  acceptedAt?: string;
  tokenEscrowStatus: 'unpaid' | 'locked_in_escrow' | 'released_to_farmer' | 'refunded';
  notes?: string;
  cropImage: string;
}

export interface NotificationItem {
  id: string;
  type: 'weather' | 'mandi_spike' | 'token_request' | 'pest_alert';
  titleEn: string;
  titleHi: string;
  messageEn: string;
  messageHi: string;
  timeAgo: string;
  isRead: boolean;
  severity?: 'critical' | 'warning' | 'info' | 'success';
  actionLabel?: string;
  dealId?: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  state: string;
  district: string;
  village: string;
  totalLandAcres: number;
  soilType: string;
  primaryCrops: string[];
  irrigationSource: string;
  kisaanId: string;
  isKycVerified: boolean;
}

export interface BuyerProfile {
  id: string;
  name: string;
  phone: string;
  companyName: string;
  companyType: string;
  gstin: string;
  mandiLicenseNumber: string;
  mandiYardAddress: string;
  city: string;
  state: string;
  primaryProcurement: string[];
  isVerified: boolean;
  dealsCount: number;
  procuredVolume: string;
  clearanceRate: string;
}

export interface CostCalculatorState {
  acres: number;
  selectedCropId: string;
  seedCost: number;
  fertilizerCost: number;
  dieselHours: number;
  dieselRatePerHour: number;
  laborCost: number;
  otherCost: number;
  expectedYieldPerAcre: number;
  expectedSellingRate: number;
}
