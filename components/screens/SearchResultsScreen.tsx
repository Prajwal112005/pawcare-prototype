'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  ShieldCheck, 
  PhoneCall, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Map as MapIcon, 
  List, 
  ArrowUpDown, 
  AlertTriangle,
  X,
  ChevronRight,
  Navigation,
  Info
} from 'lucide-react';
import { Provider, ProviderCategory, SmartMatchResult } from '@/lib/types';
import { BENGALURU_PROVIDERS } from '@/data/providers';

interface SearchResultsScreenProps {
  initialQuery?: string;
  initialCategory?: ProviderCategory | 'all';
  smartMatchResult?: SmartMatchResult | null;
  selectedArea: string;
  onSelectProvider: (provider: Provider) => void;
  onCallProvider: (provider: Provider) => void;
  onBookProvider: (provider: Provider) => void;
}

export const SearchResultsScreen: React.FC<SearchResultsScreenProps> = ({
  initialQuery = '',
  initialCategory = 'all',
  smartMatchResult,
  selectedArea,
  onSelectProvider,
  onCallProvider,
  onBookProvider
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<ProviderCategory | 'all'>(initialCategory);
  const [onlyOpenNow, setOnlyOpenNow] = useState(false);
  const [onlyEmergency, setOnlyEmergency] = useState(false);
  const [maxDistance, setMaxDistance] = useState<number>(20); // km
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'recommended' | 'distance' | 'rating'>('recommended');
  const [viewMode, setViewMode] = useState<'list' | 'split'>('split');
  const [selectedMapProviderId, setSelectedMapProviderId] = useState<string | null>(null);

  // Filtered & sorted providers
  const filteredProviders = useMemo(() => {
    let list = [...BENGALURU_PROVIDERS];

    // Search query filter
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => 
        p.name.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.services.some((s) => s.toLowerCase().includes(q)) ||
        p.about.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'emergency') {
        list = list.filter((p) => p.isEmergency24x7 || p.category === 'emergency');
      } else {
        list = list.filter((p) => p.category === selectedCategory);
      }
    }

    // Open Now filter
    if (onlyOpenNow) {
      list = list.filter((p) => p.isOpenNow);
    }

    // Emergency 24/7 filter
    if (onlyEmergency) {
      list = list.filter((p) => p.isEmergency24x7);
    }

    // Distance filter
    list = list.filter((p) => p.distanceKm <= maxDistance);

    // Rating filter
    if (minRating > 0) {
      list = list.filter((p) => p.rating >= minRating);
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default recommended
      if (a.isEmergency24x7 && !b.isEmergency24x7 && onlyEmergency) return -1;
      return a.distanceKm - b.distanceKm;
    });

    return list;
  }, [query, selectedCategory, onlyOpenNow, onlyEmergency, maxDistance, minRating, sortBy]);

  const activeMapProvider = filteredProviders.find((p) => p.id === selectedMapProviderId) || filteredProviders[0];

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setOnlyOpenNow(false);
    setOnlyEmergency(false);
    setMaxDistance(20);
    setMinRating(0);
    setSortBy('recommended');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Smart Match AI Intelligence Banner if active */}
      {smartMatchResult && (
        <div className={`p-4 rounded-2xl border shadow-sm flex items-start justify-between gap-3 ${
          smartMatchResult.urgency === 'critical_emergency'
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : 'bg-teal-50 border-teal-200 text-teal-900'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
              smartMatchResult.urgency === 'critical_emergency'
                ? 'bg-rose-600 text-white'
                : 'bg-brand-600 text-white'
            }`}>
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider">
                  AI Smart Match Insight
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                  smartMatchResult.urgency === 'critical_emergency'
                    ? 'bg-rose-600 text-white'
                    : 'bg-teal-600 text-white'
                }`}>
                  {smartMatchResult.urgency === 'critical_emergency' ? '🚨 Critical Emergency Triage' : 'Routine Care'}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold">
                {smartMatchResult.intentSummary}
              </p>
              <p className="text-xs opacity-80">
                {smartMatchResult.guidanceNote}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Query input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by name, facility, specialty (e.g. ICU, Oxygen, Blood test)..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between md:justify-end gap-2">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>List Only</span>
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'split'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Map & List</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="distance">Sort: Nearest Distance</option>
                <option value="rating">Sort: Highest Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs & Quick Toggles */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'vet', label: 'Veterinary Clinics' },
              { id: 'emergency', label: '24/7 Emergency & ICU' },
              { id: 'ngo', label: 'NGOs & Rescuers' },
              { id: 'boarding', label: 'Boarding & Foster' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setOnlyOpenNow(!onlyOpenNow)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                onlyOpenNow
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${onlyOpenNow ? 'bg-emerald-500' : 'bg-slate-400'}`} />
              <span>Open Now</span>
            </button>

            <button
              onClick={() => setOnlyEmergency(!onlyEmergency)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                onlyEmergency
                  ? 'bg-rose-50 border-rose-300 text-rose-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${onlyEmergency ? 'bg-rose-500' : 'bg-slate-400'}`} />
              <span>24/7 Emergency Only</span>
            </button>

            {/* Distance Filter Selector */}
            <select
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700 cursor-pointer focus:outline-none"
            >
              <option value={5}>Within 5 km</option>
              <option value={10}>Within 10 km</option>
              <option value={15}>Within 15 km</option>
              <option value={20}>All Distances</option>
            </select>

            {/* Rating Filter */}
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700 cursor-pointer focus:outline-none"
            >
              <option value={0}>Any Rating</option>
              <option value={4.5}>4.5+ Stars</option>
              <option value={4.0}>4.0+ Stars</option>
            </select>

            {(query || selectedCategory !== 'all' || onlyOpenNow || onlyEmergency || maxDistance < 20 || minRating > 0) && (
              <button
                onClick={resetFilters}
                className="text-xs text-slate-400 hover:text-slate-700 underline ml-1"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count & Demo Notice */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong>{filteredProviders.length}</strong> animal care providers in Bengaluru
        </span>
        <span className="hidden sm:inline bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px]">
          Demo data for screening assignment
        </span>
      </div>

      {/* Content Layout: Split Map & List OR List Only */}
      <div className={`grid gap-6 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
        {/* Providers Card List */}
        <div className={`space-y-4 ${viewMode === 'split' ? 'lg:col-span-7' : 'max-w-4xl mx-auto w-full'}`}>
          {filteredProviders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">No matching providers found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your distance filter, clearing category restrictions, or resetting keywords.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredProviders.map((provider) => (
              <div
                key={provider.id}
                onMouseEnter={() => setSelectedMapProviderId(provider.id)}
                className={`bg-white rounded-2xl border p-5 transition-all shadow-sm hover:shadow-md flex flex-col justify-between ${
                  selectedMapProviderId === provider.id
                    ? 'border-brand-500 ring-1 ring-brand-500'
                    : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Card Header Badges */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                        <ShieldCheck className="w-3 h-3 text-teal-600" /> PawCare Verified (Demo)
                      </span>

                      {provider.isEmergency24x7 && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
                          🚨 24/7 Emergency ICU
                        </span>
                      )}

                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600">
                        {provider.category === 'ngo' ? 'Animal NGO / Rescue' :
                         provider.category === 'emergency' ? 'Trauma Hospital' :
                         provider.category === 'boarding' ? 'Boarding Resort' : 'Vet Clinic'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-slate-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 flex-shrink-0">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{provider.rating}</span>
                      <span className="text-[10px] text-slate-500 font-normal">({provider.reviewCount})</span>
                    </div>
                  </div>

                  {/* Provider Name & Tagline */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-brand-700 transition-colors">
                    {provider.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    {provider.tagline}
                  </p>

                  {/* Distance & Area */}
                  <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                    <div className="flex items-center gap-1 font-semibold text-slate-700">
                      <Navigation className="w-3.5 h-3.5 text-brand-600" />
                      <span>{provider.distanceKm} km away</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{provider.area}</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center gap-1 text-emerald-700 font-medium">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{provider.openingHours}</span>
                    </div>
                  </div>

                  {/* Services tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {provider.services.map((svc, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[11px] border border-slate-100 font-medium"
                      >
                        ✓ {svc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500 font-medium">
                    {provider.pricingEstimate ? (
                      <span className="text-slate-600">{provider.pricingEstimate.split('|')[0]}</span>
                    ) : (
                      <span>Consultation on request</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onCallProvider(provider)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors"
                      title="Call this provider"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
                      <span>Call</span>
                    </button>

                    <button
                      onClick={() => onBookProvider(provider)}
                      className="px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-xl transition-colors"
                    >
                      Book / Request
                    </button>

                    <button
                      onClick={() => onSelectProvider(provider)}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm flex items-center gap-1"
                    >
                      <span>View Profile</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Interactive Bengaluru Map View (Split Mode) */}
        {viewMode === 'split' && (
          <div className="hidden lg:block lg:col-span-5 sticky top-24 h-[calc(100vh-8rem)]">
            <div className="w-full h-full bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden shadow-lg">
              {/* Map Canvas Background Simulation */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Map Header */}
              <div className="relative z-10 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold">Live Bengaluru Care Map</span>
                </div>
                <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  {selectedArea} Hub
                </span>
              </div>

              {/* Interactive Stylized Coordinate Map Pinboard */}
              <div className="relative z-10 my-auto h-72 border border-slate-800/80 bg-slate-950/70 rounded-xl p-3 flex flex-col justify-center">
                {/* Visual Locality Hubs */}
                <div className="text-center text-[11px] text-slate-500 font-mono mb-2">
                  [Interactive Bengaluru Spatial Grid]
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {/* North Hub */}
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">North BLR</span>
                    <span className="font-bold text-slate-200">Hebbal / Jakkur</span>
                    <span className="text-[10px] text-indigo-400 block mt-0.5">CARE Shelter</span>
                  </div>

                  {/* Central Hub */}
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Central / East</span>
                    <span className="font-bold text-teal-400">Indiranagar / Domlur</span>
                    <span className="text-[10px] text-teal-300 block mt-0.5">Cessna 24/7 ICU</span>
                  </div>

                  {/* East Hub */}
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Suburban East</span>
                    <span className="font-bold text-slate-200">Whitefield</span>
                    <span className="text-[10px] text-rose-400 block mt-0.5">BLR Pet Hospital</span>
                  </div>

                  {/* South-Central */}
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">South-Central</span>
                    <span className="font-bold text-slate-200">Koramangala</span>
                    <span className="text-[10px] text-teal-400 block mt-0.5">Precise Diagnostics</span>
                  </div>

                  {/* South Hub */}
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">South BLR</span>
                    <span className="font-bold text-rose-400">HSR Layout</span>
                    <span className="text-[10px] text-rose-300 block mt-0.5">PawSitive Ambulance</span>
                  </div>

                  {/* South-East Hub */}
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">South-East</span>
                    <span className="font-bold text-slate-200">Sarjapur / Harlur</span>
                    <span className="text-[10px] text-amber-400 block mt-0.5">Woodstock Foster</span>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-[10px] text-slate-400">
                    Hover over cards on the left or select a pin below to preview credentials.
                  </span>
                </div>
              </div>

              {/* Active Selected Provider Mini-Card on Map */}
              {activeMapProvider && (
                <div className="relative z-10 bg-slate-800/95 border border-slate-700 rounded-xl p-3 text-white space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                        Selected Provider Pin
                      </span>
                      <h4 className="text-xs font-bold text-white truncate max-w-[200px]">
                        {activeMapProvider.name}
                      </h4>
                      <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-brand-400" />
                        <span>{activeMapProvider.area} • {activeMapProvider.distanceKm} km</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-amber-400">★ {activeMapProvider.rating}</span>
                      <span className="text-[10px] text-slate-400 block">{activeMapProvider.reviewCount} reviews</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-emerald-400 font-medium">
                      {activeMapProvider.isEmergency24x7 ? '24/7 Trauma Ready' : activeMapProvider.openingHours}
                    </span>
                    <button
                      onClick={() => onSelectProvider(activeMapProvider)}
                      className="px-2.5 py-1 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold rounded-lg text-xs"
                    >
                      Open Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
