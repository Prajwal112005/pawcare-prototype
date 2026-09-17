'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  PhoneCall, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  ChevronDown,
  Compass,
  Layers,
  BookOpen
} from 'lucide-react';
import { ScreenType } from '@/lib/types';
import { BENGALURU_AREAS } from '@/data/providers';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  selectedArea: string;
  onSelectArea: (area: string) => void;
  onOpenMemo: () => void;
  onOpenOrgModal: () => void;
  onEmergencyClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  selectedArea,
  onSelectArea,
  onOpenMemo,
  onOpenOrgModal,
  onEmergencyClick
}) => {
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 flex items-center justify-center text-white shadow-sm shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-slate-900">Paw<span className="text-brand-600">Care</span></span>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-200 rounded">
                    MVP
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">Bengaluru Animal Care & Triage</p>
              </div>
            </button>

            {/* Location Selector */}
            <div className="relative">
              <button
                onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                title="Change location in Bengaluru"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                <span className="max-w-[110px] sm:max-w-none truncate">{selectedArea}, Bengaluru</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isAreaDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Bengaluru Hub
                  </div>
                  {BENGALURU_AREAS.map((area) => (
                    <button
                      key={area}
                      onClick={() => {
                        onSelectArea(area);
                        setIsAreaDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                        selectedArea === area
                          ? 'bg-brand-50 text-brand-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{area}</span>
                      {selectedArea === area && <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                currentScreen === 'home'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Discovery</span>
            </button>

            <button
              onClick={() => onNavigate('results')}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                currentScreen === 'results'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Services Directory</span>
            </button>

            <button
              onClick={() => onNavigate('ai-assistant')}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                currentScreen === 'ai-assistant'
                  ? 'bg-teal-50 text-brand-700 font-semibold border border-brand-200'
                  : 'text-slate-600 hover:text-brand-700 hover:bg-teal-50/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>AI Medical Report</span>
              <span className="px-1 text-[9px] font-bold bg-brand-100 text-brand-800 rounded">AI</span>
            </button>
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-2">
            {/* AI Data Organisation Demo */}
            <button
              onClick={onOpenOrgModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
              title="See how AI structures fragmented WhatsApp & Instagram rescue data"
            >
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>AI Data Pipeline</span>
            </button>

            {/* Architecture & Strategy Modal Button */}
            <button
              onClick={onOpenMemo}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-sm transition-all"
              title="View the 2-page Product & Architecture Strategy Memo"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Product & Tech Memo</span>
              <span className="sm:hidden">Memo</span>
            </button>

            {/* 24x7 Emergency One-Tap Button */}
            <button
              onClick={onEmergencyClick}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emergency-600 hover:bg-emergency-700 active:scale-95 rounded-lg shadow-sm shadow-emergency-600/25 transition-all animate-pulse"
              title="Instant 24x7 Emergency Trauma & Ambulance Contacts"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>24/7 Emergency</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
