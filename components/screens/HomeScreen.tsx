'use client';

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  PhoneCall, 
  Stethoscope, 
  Ambulance, 
  HeartHandshake, 
  Home as HomeIcon, 
  Sparkles, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Clock, 
  AlertTriangle,
  FileText,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { Provider, ProviderCategory, ScreenType } from '@/lib/types';
import { BENGALURU_PROVIDERS } from '@/data/providers';

interface HomeScreenProps {
  selectedArea: string;
  onSearch: (query: string, category?: ProviderCategory | 'all') => void;
  onSelectCategory: (category: ProviderCategory) => void;
  onSelectProvider: (provider: Provider) => void;
  onNavigate: (screen: ScreenType) => void;
  onEmergencyClick: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  selectedArea,
  onSearch,
  onSelectCategory,
  onSelectProvider,
  onNavigate,
  onEmergencyClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const sampleQueries = [
    { label: '🚨 Stray dog hit by car, bleeding heavily', query: 'Stray dog hit by car, bleeding heavily' },
    { label: '💉 Puppy vaccination & deworming near me', query: 'Puppy vaccination & deworming clinic' },
    { label: '🐱 Cat-only clinic with kidney blood tests', query: 'Cat-only clinic with kidney blood tests' },
    { label: '🏡 Cage-free dog boarding with post-op care', query: 'Cage-free dog boarding with post-op care' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    } else {
      onSearch('', 'all');
    }
  };

  // Top recommended providers in Bengaluru
  const featuredProviders = BENGALURU_PROVIDERS.slice(0, 4);

  return (
    <div className="space-y-10 pb-16">
      {/* Demo Prototype Banner */}
      <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 text-center text-xs text-amber-800 font-medium">
        <span className="font-semibold">⚠️ Bengaluru Screening Prototype:</span> Demo data modeled on real animal-care facilities. For live veterinary emergencies, contact certified clinicians.
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span>Serving Pet Parents & Animal Rescuers in Bengaluru</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Find trusted animal care, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 to-teal-700 bg-clip-text text-transparent">
              near you in Bengaluru.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Quickly locate 24/7 emergency casualty, verified veterinary specialists, subsidized rescue shelters, and ambulance transit without fragmented information.
          </p>

          {/* Smart Search Bar */}
          <div className="pt-2 max-w-2xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center bg-white rounded-2xl shadow-lg border border-slate-200 p-1.5 focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 transition-all"
            >
              <div className="pl-3 pr-2 text-slate-400">
                <Search className="w-5 h-5 text-brand-600" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What does your pet need? (e.g. 'cat vomiting', 'stray dog accident', '24/7 ICU')"
                className="w-full py-2.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center gap-1.5 flex-shrink-0"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4 hidden sm:inline" />
              </button>
            </form>

            {/* Smart Example Chips */}
            <div className="mt-3 flex items-center gap-1.5 flex-wrap justify-center text-xs">
              <span className="text-slate-400 text-[11px] font-medium mr-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-brand-600" /> Try AI prompt:
              </span>
              {sampleQueries.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(item.query);
                    onSearch(item.query);
                  }}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-600 text-[11px] border border-slate-200 transition-all text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency 24/7 Priority CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-emergency-600 via-rose-600 to-emergency-700 rounded-2xl shadow-md text-white p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/20">
              <PhoneCall className="w-6 h-6 text-white animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-white text-emergency-700 rounded-md">
                  Emergency 24x7
                </span>
                <span className="text-xs text-rose-100 font-medium">Critical Triage & Transit</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold mt-0.5">
                Animal In Distress or Road Accident?
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 max-w-xl">
                Immediate access to 24-hour trauma ICUs, animal ambulances with oxygen concentrators, and volunteer stray rescue lines in Bengaluru.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onEmergencyClick}
              className="w-full sm:w-auto px-5 py-2.5 bg-white text-emergency-700 hover:bg-rose-50 font-bold text-xs sm:text-sm rounded-xl shadow transition-all active:scale-95 text-center whitespace-nowrap"
            >
              View 24/7 Emergency Care
            </button>
          </div>
        </div>
      </section>

      {/* 4 Category Discovery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Explore by Service Category</h2>
            <p className="text-xs sm:text-sm text-slate-500">Find the right specialist for your pet or rescue case</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Vet Clinics */}
          <button
            onClick={() => onSelectCategory('vet')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-700 transition-colors">
                  Veterinary Clinics
                </h3>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  5 Nearby
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                General consultations, preventive vaccinations, blood diagnostics, and soft-tissue surgeries.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-600">
              <span>Browse Vets</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Emergency & Ambulance */}
          <button
            onClick={() => onSelectCategory('emergency')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emergency-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Ambulance className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base group-hover:text-emergency-700 transition-colors">
                  Emergency & Ambulance
                </h3>
                <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                  24/7 Open
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Night casualty, fracture trauma surgery, mobile ambulances with oxygen, and intensive care units.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emergency-600">
              <span>View Emergency</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* NGOs & Rescuers */}
          <button
            onClick={() => onSelectCategory('ngo')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-700 transition-colors">
                  NGOs & Rescuers
                </h3>
                <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                  Subsidized
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Animal welfare trusts, stray accident shelters, ABC sterilization programs, and adoption centers.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
              <span>Explore NGOs</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Boarding & Care */}
          <button
            onClick={() => onSelectCategory('boarding')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <HomeIcon className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-700 transition-colors">
                  Boarding & Foster
                </h3>
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                  Cage-Free
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Safe dog & cat boarding retreats, post-operative surgical foster care, and pet day-boarding.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
              <span>Find Boarding</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </section>

      {/* AI Medical Report Assistant Hero Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-brand-900 via-slate-900 to-teal-950 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Feature Spotlight: AI Medical Report Assistant</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Don't struggle with complex vet prescriptions or blood test jargon.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Upload your pet’s CBC blood panels, renal biochemical reports, or discharge slips. PawCare AI explains medical parameters in simple English, extracts dosing schedules, and generates targeted questions for your veterinarian.
              </p>
              <div className="flex items-center gap-4 text-xs text-teal-200/80 pt-1">
                <span>✓ Non-diagnostic safety guardrails</span>
                <span>✓ Structured medication schedule</span>
                <span>✓ 1-Click Vet Questions</span>
              </div>
            </div>

            <div className="flex-shrink-0 w-full lg:w-auto">
              <button
                onClick={() => onNavigate('ai-assistant')}
                className="w-full lg:w-auto px-6 py-3 bg-brand-500 hover:bg-brand-400 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Try AI Report Assistant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended & Verified Care Services Near Bengaluru Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Recommended & Verified Care near {selectedArea}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Vetted for veterinary qualifications, hygiene, and emergency infrastructure
            </p>
          </div>
          <button
            onClick={() => onNavigate('results')}
            className="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1"
          >
            <span>View all 12 providers</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-2xl border border-slate-200 hover:shadow-md transition-all p-4 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    provider.isEmergency24x7
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : provider.category === 'ngo'
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'bg-teal-50 text-teal-700 border border-teal-200'
                  }`}>
                    {provider.isEmergency24x7 ? '24/7 Casualty' : provider.category.toUpperCase()}
                  </span>

                  <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{provider.rating}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({provider.reviewCount})</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-700 transition-colors line-clamp-1">
                  {provider.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{provider.area}</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-semibold text-slate-700">{provider.distanceKm} km</span>
                </div>

                <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {provider.tagline}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {provider.services.slice(0, 2).map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-50 text-slate-600 text-[10px] border border-slate-100"
                    >
                      {s}
                    </span>
                  ))}
                  {provider.services.length > 2 && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 text-[10px]">
                      +{provider.services.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{provider.isOpenNow ? 'Open Now' : 'Closed'}</span>
                </div>

                <button
                  onClick={() => onSelectProvider(provider)}
                  className="px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
