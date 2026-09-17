'use client';

import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Target, 
  Workflow, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

interface ProductTechMemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProductTechMemoModal: React.FC<ProductTechMemoModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'concept' | 'flow' | 'ai' | 'tech' | 'mvp'>('concept');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyMemo = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">PawCare — Product & Technology Screening Submission</h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded">
                  2-Page Executive Memo
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Brief: Practo for Animals | Candidate: Product & Technology Intern
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMemo}
              className="p-1.5 text-xs text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Copy memo content"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-1 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('concept')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'concept'
                ? 'bg-white text-indigo-700 shadow-sm border border-slate-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            <span>1. Product Concept</span>
          </button>

          <button
            onClick={() => setActiveTab('flow')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'flow'
                ? 'bg-white text-indigo-700 shadow-sm border border-slate-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Workflow className="w-3.5 h-3.5 text-indigo-600" />
            <span>2. User Flow & Prototype</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'ai'
                ? 'bg-white text-indigo-700 shadow-sm border border-slate-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>3. AI & Automation</span>
          </button>

          <button
            onClick={() => setActiveTab('tech')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'tech'
                ? 'bg-white text-indigo-700 shadow-sm border border-slate-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span>4. Technology & Stack</span>
          </button>

          <button
            onClick={() => setActiveTab('mvp')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'mvp'
                ? 'bg-white text-indigo-700 shadow-sm border border-slate-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>5. 30-Day MVP Thinking</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-700 text-sm leading-relaxed space-y-6">
          {activeTab === 'concept' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">Executive Summary: PawCare India</h4>
                <p className="text-xs text-slate-600">
                  Animal healthcare in India is currently broken by extreme information asymmetry and fragmented discovery. While human healthcare has evolved with Practo and 1mg, pet parents and animal rescuers still scramble through chaotic WhatsApp groups, unreliable Google Maps pins, and word-of-mouth during life-threatening crises.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5 text-indigo-700">
                    <Target className="w-4 h-4" /> Who Uses the Platform?
                  </h5>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li>
                      <strong className="text-slate-800">1. Pet Parents (Dogs, Cats, Exotics):</strong> Urban owners seeking trusted routine OPD, vaccinations, dental, specialized surgery, and post-op care.
                    </li>
                    <li>
                      <strong className="text-slate-800">2. Animal Rescuers & Feeder Volunteers:</strong> Citizens attending to stray accidents, cruelty cases, and sterilization (ABC) needing immediate ambulance & subsidized trauma shelters.
                    </li>
                    <li>
                      <strong className="text-slate-800">3. Veterinary Practitioners & NGOs:</strong> Quality clinics and shelters overburdened by repetitive triage inquiries and unstructured medical records.
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5 text-teal-700">
                    <CheckCircle2 className="w-4 h-4" /> What Problem We Solve First
                  </h5>
                  <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-xs text-teal-900 font-medium italic mb-2">
                    “I need the right animal-care service near me quickly, but information is fragmented and I don't know which service is suitable or trustworthy.”
                  </div>
                  <p className="text-xs text-slate-600">
                    We eliminate the panic of finding whether a clinic has 24/7 oxygen, an active trauma surgeon, or emergency ambulance transit within a 15-minute radius.
                  </p>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
                  Top 5 Prioritized Features for the MVP
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs mb-1.5">1</div>
                    <strong className="text-slate-900 block mb-1">Location-Based Care Triage</strong>
                    <span className="text-slate-500 text-[11px]">Instant filter by Open Now, 24/7 Emergency, Distance, and Verified Credentials.</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs mb-1.5">2</div>
                    <strong className="text-slate-900 block mb-1">One-Tap 24/7 Emergency SOS</strong>
                    <span className="text-slate-500 text-[11px]">Direct mobile dispatch to animal ambulances & trauma ICUs with oxygen cages.</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs mb-1.5">3</div>
                    <strong className="text-slate-900 block mb-1">AI Medical Report Simplifier</strong>
                    <span className="text-slate-500 text-[11px]">Translates dense CBC, bloodwork, and prescriptions into plain layman language.</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xs mb-1.5">4</div>
                    <strong className="text-slate-900 block mb-1">Vet Question Generator</strong>
                    <span className="text-slate-500 text-[11px]">Equips pet parents with targeted questions for their upcoming veterinarian consultation.</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs mb-1.5">5</div>
                    <strong className="text-slate-900 block mb-1">Verified Provider Trust Profiles</strong>
                    <span className="text-slate-500 text-[11px]">Transparent facilities list, doctor credentials, indicative pricing, and real reviews.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'flow' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">Connected 4-Screen User Flow</h4>
                <p className="text-xs text-slate-600">
                  Every user interaction is connected with zero dead-ends. Users can transition seamlessly from natural language discovery to verified providers, or jump straight into the AI Medical Assistant.
                </p>
              </div>

              {/* Flowchart Diagram */}
              <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 text-xs font-mono">
                <div className="text-indigo-400 font-bold mb-2">// Core Navigation Journey</div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
                  <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700 w-full sm:w-auto">
                    <div className="text-teal-400 font-bold">1. Home / Discovery</div>
                    <div className="text-[10px] text-slate-400">Bengaluru Hub + Smart Search + SOS</div>
                  </div>
                  <div className="text-slate-500">──►</div>
                  <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700 w-full sm:w-auto">
                    <div className="text-teal-400 font-bold">2. Search Results</div>
                    <div className="text-[10px] text-slate-400">Filters + Map & List Toggle</div>
                  </div>
                  <div className="text-slate-500">──►</div>
                  <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700 w-full sm:w-auto">
                    <div className="text-teal-400 font-bold">3. Provider Details</div>
                    <div className="text-[10px] text-slate-400">Call + Book + AI Pre-Visit Prep</div>
                  </div>
                  <div className="text-slate-500">──►</div>
                  <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700 w-full sm:w-auto">
                    <div className="text-teal-400 font-bold">4. AI Medical Assistant</div>
                    <div className="text-[10px] text-slate-400">OCR + Plain English + Vet Questions</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-900 block mb-1">Pet Parent Flow: Routine or Chronic</strong>
                  <span className="text-slate-600 text-xs">
                    Pet parent searches “cat clinic for kidney checkup” ➔ Smart matcher isolates Feline Specialty in Indiranagar ➔ Views Doctor profile & low-stress facilities ➔ Uploads previous CBC report to AI Assistant ➔ Gets structured questions to ask Dr. Meera.
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-900 block mb-1">Animal Rescuer Flow: High-Stakes Trauma</strong>
                  <span className="text-slate-600 text-xs">
                    Volunteer spots injured stray dog ➔ Taps 24/7 Emergency SOS ➔ Instantly filters 24/7 ambulance with on-board oxygen (PawSitive Life) or subsidized NGO trauma hospital (CARE Jakkur) ➔ Direct one-tap phone call with ambulance bay.
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">4 AI-Powered Workflows & Data Architecture</h4>
                <p className="text-xs text-slate-600">
                  AI is deployed strictly where it creates high leverage for animal care, with strict medical guardrails preventing dangerous autonomous diagnoses.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-200">
                  <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold text-[10px] uppercase">Workflow 1</span>
                  <h5 className="font-bold text-slate-900 text-sm mt-1 mb-1">Medical Report Simplification</h5>
                  <p className="text-slate-600 mb-2">
                    <strong>Data Processed:</strong> Scanned veterinary CBC bloodwork, biochemistry, and discharge notes.
                  </p>
                  <p className="text-slate-600">
                    <strong>Automation:</strong> Extracts platelet, WBC, and creatinine values; normalizes reference ranges against species (canine vs feline); explains biological significance in empathetic layman language.
                  </p>
                  <div className="mt-2 text-[11px] text-teal-800 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Strict Rule: Explains findings, never diagnoses.
                  </div>
                </div>

                <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-200">
                  <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[10px] uppercase">Workflow 2</span>
                  <h5 className="font-bold text-slate-900 text-sm mt-1 mb-1">Vet Consultation Question Generator</h5>
                  <p className="text-slate-600 mb-2">
                    <strong>Data Processed:</strong> Extracted abnormal biomarkers + prescribed active pharmaceutical ingredients.
                  </p>
                  <p className="text-slate-600">
                    <strong>Automation:</strong> Generates categorized questions for pet parents to ask the vet (e.g., “At what platelet count is a transfusion needed?”, “Can antibiotic nausea be managed?”). Includes 1-click WhatsApp export.
                  </p>
                </div>

                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200">
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px] uppercase">Workflow 3</span>
                  <h5 className="font-bold text-slate-900 text-sm mt-1 mb-1">Smart Service Matching & Triage</h5>
                  <p className="text-slate-600 mb-2">
                    <strong>Data Processed:</strong> Natural-language queries (e.g. “puppy ate chocolate at 11pm”).
                  </p>
                  <p className="text-slate-600">
                    <strong>Automation:</strong> Classifies urgency level (Critical Emergency vs Routine), infers species, extracts clinical symptoms, and filters providers by capability (24/7 ICU, oxygen, surgical theatre).
                  </p>
                </div>

                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px] uppercase">Workflow 4</span>
                  <h5 className="font-bold text-slate-900 text-sm mt-1 mb-1">Unstructured Information Ingestion</h5>
                  <p className="text-slate-600 mb-2">
                    <strong>Data Processed:</strong> Unformatted WhatsApp rescue group forwards, Instagram stories, handwritten clinic slips.
                  </p>
                  <p className="text-slate-600">
                    <strong>Automation:</strong> Converts messy social chatter into structured provider profiles with verified phone numbers, operating hours, and ambulance availability scores.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">Technical Architecture & Integration Stack</h4>
                <p className="text-xs text-slate-600">
                  Lightweight, decoupled, and cost-effective production architecture designed to scale seamlessly across Tier-1 Indian metros.
                </p>
              </div>

              {/* Architecture Diagram */}
              <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 text-xs font-mono space-y-2">
                <div className="text-teal-400 font-bold">// Production Dataflow & Service Topology</div>
                <pre className="text-[11px] leading-tight text-slate-300 overflow-x-auto">
{`[User Client / Mobile PWA]
       │
       ▼
[Next.js App Router & Edge Cache Layer]
       │
  ┌────┴───────────────────────────┐
  ▼                                ▼
[Application & Routing Layer]   [AI & LLM Gateway]
  ├─ Provider Catalog (Postgres)  ├─ Multimodal OCR (Google Cloud Vision)
  ├─ Geolocation & Spatial Index  ├─ Structured Medical Simplifier (Gemini 1.5 Flash)
  └─ Realtime Status & Triage     └─ Safety Guardrail & Verification Parser
       │                                │
       ▼                                ▼
[External Services]             [Output Delivery]
  ├─ Google Maps / Geocoding      ├─ Layman PDF / WhatsApp Question Export
  └─ Gupshup WhatsApp API (India) └─ Instant Provider Telephony Hotline`}
                </pre>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-900 block mb-1">Core Tech Stack</strong>
                  <ul className="text-slate-600 space-y-1 text-xs">
                    <li>• <strong>Frontend:</strong> Next.js 14 App Router, React 18, TypeScript</li>
                    <li>• <strong>Styling:</strong> Tailwind CSS, Lucide Icons, Glassmorphic headers</li>
                    <li>• <strong>AI Layer:</strong> Plug-and-play AI Service abstraction (Gemini 1.5 Flash / OpenAI compatible)</li>
                    <li>• <strong>State Management:</strong> Zero-bloat URL query + lightweight React state</li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-900 block mb-1">Key Third-Party Integrations</strong>
                  <ul className="text-slate-600 space-y-1 text-xs">
                    <li>• <strong>Maps & Geocoding:</strong> Google Maps Distance Matrix API for accurate drive-times in Indian traffic.</li>
                    <li>• <strong>Vision / OCR:</strong> Google Cloud Document AI for veterinary prescription digitisation.</li>
                    <li>• <strong>LLM API:</strong> Gemini 1.5 Flash with structured JSON schema responses for deterministic UI rendering.</li>
                    <li>• <strong>Telephony / Messaging:</strong> Gupshup / Exotel / WhatsApp Business API for rescuer volunteer dispatch.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mvp' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-1">30-Day MVP Thinking: Prioritization Roadmap</h4>
                <p className="text-xs text-slate-600">
                  Ruthless prioritization is critical for consumer and healthcare startups. In Month 1, we validate trust, speed of discovery, and document clarity before taking on complex operational overhead.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
                  <h5 className="font-bold text-emerald-900 text-sm mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> What to Build First (Day 1 - 30)
                  </h5>
                  <ul className="space-y-2 text-slate-700">
                    <li>
                      <strong>1. Hyperlocal Service Discovery:</strong> Fast search across 100+ verified Bengaluru clinics, ambulances, and shelters with accurate 24/7 tags.
                    </li>
                    <li>
                      <strong>2. Direct Emergency SOS Hotline:</strong> Instant phone connectivity with no login barriers — seconds matter in hit-and-run accidents.
                    </li>
                    <li>
                      <strong>3. AI Medical Document Simplifier:</strong> High-leverage feature creating immediate word-of-mouth viral utility for pet parents.
                    </li>
                    <li>
                      <strong>4. Rescuer Tagging & Subsidized Filters:</strong> Empowering community volunteers to locate NGO beds and non-profit sterilization surgeons.
                    </li>
                    <li>
                      <strong>5. Provider Verification Dashboard:</strong> Basic admin flow to verify vet degree certificates and ICU equipment.
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-200">
                  <h5 className="font-bold text-rose-900 text-sm mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600" /> What to Deliberately Leave Out (Post-MVP)
                  </h5>
                  <ul className="space-y-2 text-slate-700">
                    <li>
                      <strong>❌ Telemedicine Video Infrastructure:</strong> High regulatory and operational risk; hands-on physical exam is compulsory for animals who cannot speak.
                    </li>
                    <li>
                      <strong>❌ In-App Payment Gateways:</strong> Adds checkout friction and refund complexity during emergency admissions.
                    </li>
                    <li>
                      <strong>❌ Complex Multi-Slot Scheduling:</strong> Indian vet clinics have unpredictable OPD walk-in surges; phone/WhatsApp confirmation is 10x more reliable in Phase 1.
                    </li>
                    <li>
                      <strong>❌ Social Feed / Pet Instagram:</strong> Distracts from the core high-trust healthcare discovery problem.
                    </li>
                    <li>
                      <strong>❌ Autonomous AI Medical Diagnosis:</strong> Major veterinary liability risk; AI must strictly remain an educational explanation tool.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            PawCare India Prototype — Built for Product & Technology Intern Screening Assignment.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Close Memo
          </button>
        </div>
      </div>
    </div>
  );
};
