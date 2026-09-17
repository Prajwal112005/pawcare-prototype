'use client';

import React, { useState } from 'react';
import { ScreenType, Provider, ProviderCategory, SmartMatchResult } from '@/lib/types';
import { Header } from '@/components/Header';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { SearchResultsScreen } from '@/components/screens/SearchResultsScreen';
import { ProviderDetailsScreen } from '@/components/screens/ProviderDetailsScreen';
import { AiReportScreen } from '@/components/screens/AiReportScreen';
import { ProductTechMemoModal } from '@/components/ProductTechMemoModal';
import { InformationOrgModal } from '@/components/InformationOrgModal';
import { BENGALURU_PROVIDERS } from '@/data/providers';
import { aiService } from '@/lib/ai-service';
import { Heart, Sparkles, BookOpen, Layers, ShieldCheck, Compass } from 'lucide-react';

export default function PawCareApp() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedArea, setSelectedArea] = useState<string>('Indiranagar');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ProviderCategory | 'all'>('all');
  const [smartMatchResult, setSmartMatchResult] = useState<SmartMatchResult | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [preselectedClinicForAi, setPreselectedClinicForAi] = useState<string | undefined>(undefined);

  // Modals
  const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false);
  const [isOrgModalOpen, setIsOrgModalOpen] = useState<boolean>(false);

  // Navigation handlers
  const handleSearch = async (query: string, category: ProviderCategory | 'all' = 'all') => {
    setSearchQuery(query);
    setSelectedCategory(category);

    if (query.trim()) {
      // Execute Smart Service Matching workflow
      const match = await aiService.matchService(query, selectedArea);
      setSmartMatchResult(match);
      if (match.detectedCategory !== 'all') {
        setSelectedCategory(match.detectedCategory);
      }
    } else {
      setSmartMatchResult(null);
    }

    setCurrentScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (category: ProviderCategory) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setSmartMatchResult(null);
    setCurrentScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProvider = (provider: Provider) => {
    setSelectedProvider(provider);
    setCurrentScreen('provider');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmergencyClick = () => {
    setSearchQuery('Emergency 24/7');
    setSelectedCategory('emergency');
    setSmartMatchResult({
      query: '24/7 Emergency Casualty & Ambulance',
      urgency: 'critical_emergency',
      detectedCategory: 'emergency',
      intentSummary: 'Critical Emergency Triage: Displaying 24/7 trauma ICUs, animal ambulances, and emergency surgery centers in Bengaluru.',
      guidanceNote: 'Call ambulance dispatch immediately or proceed to the nearest trauma casualty.',
      recommendedProviderIds: BENGALURU_PROVIDERS.filter((p) => p.isEmergency24x7).map((p) => p.id)
    });
    setCurrentScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAiReport = (clinicName?: string) => {
    if (clinicName) {
      setPreselectedClinicForAi(clinicName);
    }
    setCurrentScreen('ai-assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProviderFromOrg = (providerName: string) => {
    const found = BENGALURU_PROVIDERS.find((p) => p.name.toLowerCase().includes(providerName.toLowerCase()));
    if (found) {
      setSelectedProvider(found);
      setCurrentScreen('provider');
    } else {
      setSearchQuery(providerName);
      setCurrentScreen('results');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-100 selection:text-brand-900">
      {/* Top Header Navigation */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedArea={selectedArea}
        onSelectArea={(area) => setSelectedArea(area)}
        onOpenMemo={() => setIsMemoOpen(true)}
        onOpenOrgModal={() => setIsOrgModalOpen(true)}
        onEmergencyClick={handleEmergencyClick}
      />

      {/* Screen Orchestrator */}
      <main className="flex-1">
        {currentScreen === 'home' && (
          <HomeScreen
            selectedArea={selectedArea}
            onSearch={handleSearch}
            onSelectCategory={handleSelectCategory}
            onSelectProvider={handleSelectProvider}
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onEmergencyClick={handleEmergencyClick}
          />
        )}

        {currentScreen === 'results' && (
          <SearchResultsScreen
            initialQuery={searchQuery}
            initialCategory={selectedCategory}
            smartMatchResult={smartMatchResult}
            selectedArea={selectedArea}
            onSelectProvider={handleSelectProvider}
            onCallProvider={(p) => handleSelectProvider(p)}
            onBookProvider={(p) => handleSelectProvider(p)}
          />
        )}

        {currentScreen === 'provider' && selectedProvider && (
          <ProviderDetailsScreen
            provider={selectedProvider}
            onBack={() => setCurrentScreen('results')}
            onNavigateToAiReport={handleNavigateToAiReport}
          />
        )}

        {currentScreen === 'ai-assistant' && (
          <AiReportScreen
            preselectedClinicName={preselectedClinicForAi}
            onNavigateToDiscovery={() => {
              setCurrentScreen('results');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              <Heart className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="font-bold text-slate-800">PawCare Bengaluru</span>
            <span className="text-slate-400">|</span>
            <span>Practo for Animals — Product & Technology Screening Prototype</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => setIsMemoOpen(true)}
              className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Product & Tech Memo</span>
            </button>

            <button
              onClick={() => setIsOrgModalOpen(true)}
              className="text-slate-600 hover:text-slate-800 flex items-center gap-1"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>AI Data Pipeline Demo</span>
            </button>

            <button
              onClick={() => {
                setCurrentScreen('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-600 hover:text-slate-800"
            >
              Home
            </button>
          </div>
        </div>
      </footer>

      {/* Product & Tech Strategy Memo Modal (2-page write-up answering the 5 screening questions) */}
      <ProductTechMemoModal
        isOpen={isMemoOpen}
        onClose={() => setIsMemoOpen(false)}
      />

      {/* AI Workflow 4: Unstructured Information Pipeline Demo Modal */}
      <InformationOrgModal
        isOpen={isOrgModalOpen}
        onClose={() => setIsOrgModalOpen(false)}
        onSelectProviderFromOrg={handleSelectProviderFromOrg}
      />
    </div>
  );
}
