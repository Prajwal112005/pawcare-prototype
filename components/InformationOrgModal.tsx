'use client';

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  MessageSquare, 
  Camera, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Phone,
  Clock,
  MapPin
} from 'lucide-react';
import { aiService } from '@/lib/ai-service';
import { RawUnstructuredSource } from '@/lib/types';

interface InformationOrgModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProviderFromOrg?: (providerName: string) => void;
}

export const InformationOrgModal: React.FC<InformationOrgModalProps> = ({
  isOpen,
  onClose,
  onSelectProviderFromOrg
}) => {
  const sources = aiService.getUnstructuredInformationPipelineDemo();
  const [activeSourceId, setActiveSourceId] = useState<string>(sources[0].id);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentSource = sources.find((s) => s.id === activeSourceId) || sources[0];

  const handleSwitchSource = (id: string) => {
    setIsProcessing(true);
    setActiveSourceId(id);
    setTimeout(() => {
      setIsProcessing(false);
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">AI Workflow: Animal-Care Information Organisation</h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded">
                  Concept Demo
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Solving data fragmentation: How PawCare AI ingests messy WhatsApp forwards, Instagram alerts, and vet slips into verified listings.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source Selector Tabs */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
          {sources.map((src) => {
            const Icon = 
              src.sourceType === 'whatsapp_group' ? MessageSquare :
              src.sourceType === 'instagram_rescue' ? Camera : FileText;

            return (
              <button
                key={src.id}
                onClick={() => handleSwitchSource(src.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeSourceId === src.id
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-300 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${
                  src.sourceType === 'whatsapp_group' ? 'text-emerald-600' :
                  src.sourceType === 'instagram_rescue' ? 'text-pink-600' : 'text-blue-600'
                }`} />
                <span>{src.sourceTitle.split(':')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body: Left Unstructured Input vs Right Structured Output */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50">
          {/* Left Column: Raw Fragmented Input */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Step 1: Raw Unstructured Source
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                {currentSource.sourceType === 'whatsapp_group' ? 'WhatsApp Forward' :
                 currentSource.sourceType === 'instagram_rescue' ? 'Instagram Post' : 'Prescription Scan'}
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-700 mb-2">
                  {currentSource.sourceTitle}
                </div>
                <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200 text-xs text-slate-700 font-mono leading-relaxed whitespace-pre-wrap">
                  {currentSource.rawText}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Ingestion: Multimodal Parser + Regex Scraper</span>
                <span className="font-semibold text-emerald-600">
                  Confidence: {Math.round(currentSource.confidenceScore * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Structured PawCare Verified Record */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Step 2: AI Structured & Verified Entity
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-teal-600" /> Auto-Normalized
              </span>
            </div>

            <div className={`p-5 bg-white rounded-xl border border-teal-200 shadow-sm flex-1 flex flex-col justify-between transition-opacity ${
              isProcessing ? 'opacity-40' : 'opacity-100'
            }`}>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {currentSource.extractedProvider.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{currentSource.extractedProvider.area}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
                    {currentSource.extractedProvider.category === 'emergency' ? '24x7 Casualty' :
                     currentSource.extractedProvider.category === 'ngo' ? 'Animal NGO' : 'Vet Clinic'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Contact Phone</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-teal-600" />
                      {currentSource.extractedProvider.phone || 'N/A'}
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Ambulance Line</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-rose-600" />
                      {currentSource.extractedProvider.ambulancePhone || 'Standard OPD'}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-medium block mb-1">Extracted Capabilities</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentSource.extractedProvider.services?.map((svc, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[11px] rounded bg-slate-100 text-slate-700 font-medium"
                      >
                        ✓ {svc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Status: Ready for Human Moderator Audit
                </span>
                {onSelectProviderFromOrg && (
                  <button
                    onClick={() => {
                      onClose();
                      onSelectProviderFromOrg(currentSource.extractedProvider.name || '');
                    }}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                  >
                    <span>View in Directory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer info note */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            <strong>The Value:</strong> Eliminates manual directory compilation. Thousands of volunteer posts are automatically structured into search-ready listings.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close Demo
          </button>
        </div>
      </div>
    </div>
  );
};
