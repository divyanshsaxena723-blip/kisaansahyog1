import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { CropCategory, CropListing } from '../../types';
import {
  Search,
  Mic,
  Sparkles,
  MapPin,
  ShieldCheck,
  Star,
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  TrendingUp,
  Tag,
  ArrowRight
} from 'lucide-react';

interface BuyerBazaarViewProps {
  onSelectListing: (listing: CropListing) => void;
}

export const BuyerBazaarView: React.FC<BuyerBazaarViewProps> = ({ onSelectListing }) => {
  const { listings, language } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CropCategory>('all');
  const [sortBy, setSortBy] = useState<'low_to_high' | 'high_to_low' | 'nearest'>('nearest');
  const [maxDistance, setMaxDistance] = useState<number>(150);

  const categories: { id: CropCategory; labelHi: string; labelEn: string; icon: string }[] = [
    { id: 'all', labelHi: 'सभी (All)', labelEn: 'All Produce', icon: '🌾' },
    { id: 'cereals', labelHi: 'अनाज (Grains)', labelEn: 'Cereals', icon: '🌽' },
    { id: 'pulses', labelHi: 'दलहन (Pulses)', labelEn: 'Pulses', icon: '🌱' },
    { id: 'oilseeds', labelHi: 'तिलहन (Oilseeds)', labelEn: 'Oilseeds', icon: '🌻' },
    { id: 'cash_crops', labelHi: 'नकदी फसल', labelEn: 'Cash Crops', icon: '🧵' }
  ];

  // Filtering and sorting logic
  const filteredListings = listings
    .filter((l) => {
      if (selectedCategory !== 'all' && l.category !== selectedCategory) return false;
      if (l.distanceKm > maxDistance) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          l.cropNameEn.toLowerCase().includes(query) ||
          l.cropNameHi.toLowerCase().includes(query) ||
          l.variety.toLowerCase().includes(query) ||
          l.location.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'low_to_high') return a.pricePerQuintal - b.pricePerQuintal;
      if (sortBy === 'high_to_low') return b.pricePerQuintal - a.pricePerQuintal;
      if (sortBy === 'nearest') return a.distanceKm - b.distanceKm;
      return 0;
    });

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Top Search & Filter Bar */}
      <div className="space-y-4">
        {/* Search input with voice icon */}
        <div className="relative flex items-center w-full shadow-sm">
          <div className="absolute left-4 text-gray-400 pointer-events-none">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'गेहूं, सरसों, सोयाबीन, चना या स्थान खोजें...'
                : 'Search wheat, mustard, soybean, organic chana, or district...'
            }
            className="w-full h-14 pl-12 pr-28 rounded-full bg-white border border-emerald-900/10 text-sm font-bold text-[#101F16] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2C5E2E] transition-all"
          />
          <div className="absolute right-2.5 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSearchQuery('गेहूं')}
              className="w-10 h-10 rounded-full bg-emerald-50 text-[#2C5E2E] flex items-center justify-center hover:bg-emerald-100 transition-colors"
              title="Voice Search"
            >
              <Mic className="w-4 h-4 text-[#E0A526]" />
            </button>
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-[#2C5E2E] text-white flex items-center justify-center hover:bg-emerald-800 transition-colors shadow-xs"
              title="Smart Match"
            >
              <Sparkles className="w-4 h-4 text-[#E0A526]" />
            </button>
          </div>
        </div>

        {/* Live Mandi Ticker Pill */}
        <div className="flex items-center justify-between px-4 py-2 rounded-full bg-white border border-emerald-900/10 text-xs font-bold text-[#4A2C17]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
            <span>
              {language === 'hi'
                ? 'लाइव मंडी: आज 15 प्रमुख फसलों के 42 नए फार्म बैच लिस्ट हुए'
                : 'Mandi Live: 42 verified farm harvest batches listed today'}
            </span>
          </div>
          <span className="text-emerald-800 font-extrabold hidden sm:inline">
            {language === 'hi' ? 'सत्यापित किसान सीधे' : 'Verified Farmers Direct'}
          </span>
        </div>

        {/* Category Filter Horizontal Rails */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all shadow-xs active:scale-95 ${
                  isSelected
                    ? 'bg-[#2C5E2E] text-white shadow-md shadow-emerald-900/20'
                    : 'bg-white text-[#4A2C17] border border-emerald-900/10 hover:bg-emerald-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{language === 'hi' ? cat.labelHi : cat.labelEn}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#E0A526]" />}
              </button>
            );
          })}
        </div>

        {/* Sort & Distance Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">
              {language === 'hi' ? 'क्रमबद्ध (Sort):' : 'Sort by:'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-1.5 rounded-full bg-white border border-emerald-900/15 text-xs font-bold text-[#101F16] focus:outline-none focus:ring-1 focus:ring-[#2C5E2E]"
            >
              <option value="nearest">निकटतम दूरी (Nearest Farmer)</option>
              <option value="low_to_high">भाव: कम से अधिक (Price: Low to High)</option>
              <option value="high_to_low">भाव: अधिक से कम (Price: High to Low)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
            <MapPin className="w-4 h-4 text-red-600" />
            <span>दूरी दायरा: ≤{maxDistance} km</span>
            <input
              type="range"
              min={20}
              max={250}
              step={10}
              value={maxDistance}
              onChange={(e) => setMaxDistance(parseInt(e.target.value))}
              className="w-24 sm:w-32 accent-[#2C5E2E]"
            />
          </div>
        </div>
      </div>

      {/* Commodity Listing Grid (Multi-column) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-emerald-900/10">
            <p className="text-base font-extrabold text-[#101F16]">
              {language === 'hi' ? 'कोई फसल नहीं मिली' : 'No produce matched your filters'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              दूरी का दायरा बढ़ाएं या अन्य श्रेणी का चयन करें।
            </p>
          </div>
        ) : (
          filteredListings.map((listing) => (
            <div
              key={listing.id}
              onClick={() => onSelectListing(listing)}
              className="bg-white rounded-3xl border border-emerald-900/10 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
            >
              {/* Image & Badges */}
              <div className="relative h-48 w-full bg-emerald-950 overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.cropNameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#2C5E2E] text-xs font-extrabold shadow-sm flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>सत्यापित किसान</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold">
                    {listing.lotNumber}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                  <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md">
                    नमी: {listing.moisturePercent}% • {listing.grade}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white">
                    {listing.distanceKm} km दूर
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-black text-[#101F16] group-hover:text-[#2C5E2E] transition-colors">
                        {listing.cropNameHi}
                      </h3>
                      <p className="text-xs text-gray-500">{listing.variety}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black">
                      {listing.quantityQuintals} Qtl कुल
                    </span>
                  </div>

                  {/* Price Block */}
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#2C5E2E]">
                      ₹{listing.pricePerQuintal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-gray-500">/ Quintal</span>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                    {listing.description}
                  </p>
                </div>

                {/* Farmer & Escrow Inspection Footer */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#2C5E2E] font-extrabold text-xs flex items-center justify-center shrink-0">
                      {listing.farmerName.split(' ')[0][0]}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-[#101F16] truncate">
                        {listing.farmerName}
                      </p>
                      <p className="text-[10px] text-gray-500 flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-[#E0A526] fill-[#E0A526]" />
                        <span>{listing.farmerRating}</span>
                        <span>• {listing.farmerSalesCount} सौदे</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectListing(listing);
                    }}
                    className="px-4 py-2 rounded-full bg-[#2C5E2E] text-white hover:bg-emerald-800 text-xs font-extrabold flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                  >
                    <span>{language === 'hi' ? 'सौदा करें (Inspect)' : 'Inspect'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E0A526]" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
