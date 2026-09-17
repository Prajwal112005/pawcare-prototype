'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  UploadCloud, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Copy, 
  Check, 
  Share2, 
  ArrowRight, 
  RefreshCw, 
  Info,
  Pill,
  HeartPulse,
  Clock,
  ShieldAlert,
  ChevronRight,
  FileCheck2,
  Calendar
} from 'lucide-react';
import { MedicalReportAnalysis, ScreenType } from '@/lib/types';
import { SAMPLE_REPORTS } from '@/data/sampleReports';
import { aiService } from '@/lib/ai-service';

interface AiReportScreenProps {
  preselectedClinicName?: string;
  onNavigateToDiscovery: () => void;
}

export const AiReportScreen: React.FC<AiReportScreenProps> = ({
  preselectedClinicName,
  onNavigateToDiscovery
}) => {
  const [selectedReportId, setSelectedReportId] = useState<string>(SAMPLE_REPORTS[0].id);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [reportData, setReportData] = useState<MedicalReportAnalysis | null>(SAMPLE_REPORTS[0]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [copiedQuestions, setCopiedQuestions] = useState<boolean>(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState<boolean>(false);

  // Trigger analysis pipeline
  const runAnalysis = async (targetId: string, customName?: string) => {
    setIsAnalyzing(true);
    setAnalysisStep(1);

    // Step 1: OCR
    await new Promise((r) => setTimeout(r, 450));
    setAnalysisStep(2);

    // Step 2: Layman translation
    await new Promise((r) => setTimeout(r, 500));
    setAnalysisStep(3);

    // Step 3: Structuring medications & questions
    await new Promise((r) => setTimeout(r, 550));
    setAnalysisStep(4);

    const result = await aiService.simplifyReport(targetId);
    if (customName) {
      result.title = `Analyzed: ${customName}`;
    }
    setReportData(result);
    setIsAnalyzing(false);
    setAnalysisStep(0);
  };

  const handleSelectSample = (sampleId: string) => {
    setSelectedReportId(sampleId);
    setUploadedFileName(null);
    runAnalysis(sampleId);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setSelectedReportId('custom-uploaded-report');
      runAnalysis('custom-uploaded-report', file.name);
    }
  };

  const handleCopyQuestions = () => {
    if (!reportData) return;
    const text = reportData.questionsForVet
      .map((q, i) => `${i + 1}. [${q.category}] ${q.question}\n   Reason: ${q.rationale}`)
      .join('\n\n');
    navigator.clipboard?.writeText(text);
    setCopiedQuestions(true);
    setTimeout(() => setCopiedQuestions(false), 2000);
  };

  const handleShareWhatsApp = () => {
    if (!reportData) return;
    const text = `*PawCare Vet Consultation Questions for ${reportData.petName}*\n\n` +
      reportData.questionsForVet.map((q, i) => `*${i + 1}. ${q.category}:* ${q.question}`).join('\n\n') +
      `\n\n_Generated via PawCare AI Medical Assistant_`;
    navigator.clipboard?.writeText(text);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Purpose */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>AI Workflow: Medical Report Simplification & Vet Questions</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          AI Medical Report & Prescription Assistant
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed">
          Veterinary blood reports and discharge slips are filled with technical jargon. PawCare AI translates complex parameters into plain English, formats daily medication routines, and equips you with sharp questions for your doctor.
        </p>

        {preselectedClinicName && (
          <div className="p-2.5 bg-brand-50 border border-brand-200 rounded-xl text-xs text-brand-800 inline-block font-medium">
            Preparing medical questions for your visit to: <strong>{preselectedClinicName}</strong>
          </div>
        )}
      </div>

      {/* Mandatory Prominent Medical Safety Notice */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 shadow-sm flex items-start gap-3 text-amber-900 text-xs sm:text-sm">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-amber-950 block mb-0.5">
            Medical Safety & Ethical Guardrail Notice:
          </strong>
          <span>
            This is an AI-generated explanation and educational summary, not a medical diagnosis or clinical treatment plan. Always consult a qualified veterinarian for medical decisions or before administering prescription medicines.
          </span>
        </div>
      </div>

      {/* Upload Box & Preloaded Samples */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Choose a Demo Report or Upload Your Own</h2>
            <p className="text-xs text-slate-500">Test with pre-configured clinical records or select any PDF/JPG</p>
          </div>

          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow transition-colors">
            <UploadCloud className="w-4 h-4" />
            <span>Upload PDF / JPG / PNG</span>
            <input
              type="file"
              accept=".pdf,image/png,image/jpeg"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* 3 Interactive Curated Demo Samples */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {SAMPLE_REPORTS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSelectSample(sample.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                selectedReportId === sample.id && !uploadedFileName
                  ? 'bg-teal-50/70 border-teal-500 ring-2 ring-teal-500/20 shadow-sm'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {sample.reportType}
                </span>
                <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                  {sample.petName} ({sample.species.split(' ')[0]})
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {sample.id === 'sample-cbc-max' ? 'Low Platelets, High WBC (Tick fever risk)' :
                   sample.id === 'sample-prescription-bella' ? 'Post-Op Spay, Antibiotics & Pain Regimen' :
                   'Senior Cat IRIS Stage 2 Renal Elevation'}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-teal-700">
                <span>{selectedReportId === sample.id ? 'Active Report' : 'Load Sample'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>

        {uploadedFileName && (
          <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between text-xs text-teal-900 font-medium">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-teal-600" />
              <span>Loaded Custom File: <strong>{uploadedFileName}</strong></span>
            </div>
            <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-bold">Processed</span>
          </div>
        )}
      </div>

      {/* Simulated Step-by-Step AI Processing Indicator */}
      {isAnalyzing && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-teal-400 animate-spin" />
            <h3 className="text-base font-bold">PawCare AI Processing Pipeline in Progress...</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className={`p-3 rounded-xl border transition-all ${
              analysisStep >= 1 ? 'bg-slate-800 border-teal-500 text-teal-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div className="font-bold mb-1">1. Multimodal OCR</div>
              <p className="text-[11px] opacity-80">Scanning layout, tables, and handwritten signatures</p>
            </div>

            <div className={`p-3 rounded-xl border transition-all ${
              analysisStep >= 2 ? 'bg-slate-800 border-teal-500 text-teal-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div className="font-bold mb-1">2. Layman Simplifier</div>
              <p className="text-[11px] opacity-80">De-jargonizing biomarkers against canine/feline baselines</p>
            </div>

            <div className={`p-3 rounded-xl border transition-all ${
              analysisStep >= 3 ? 'bg-slate-800 border-teal-500 text-teal-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div className="font-bold mb-1">3. Medication Structuring</div>
              <p className="text-[11px] opacity-80">Extracting dosing, timings, and dietary guardrails</p>
            </div>

            <div className={`p-3 rounded-xl border transition-all ${
              analysisStep >= 4 ? 'bg-slate-800 border-teal-500 text-teal-300' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div className="font-bold mb-1">4. Vet Question Generator</div>
              <p className="text-[11px] opacity-80">Synthesizing clinical questions for the next visit</p>
            </div>
          </div>
        </div>
      )}

      {/* Generated Report Content View */}
      {reportData && !isAnalyzing && (
        <div className="space-y-6">
          {/* Metadata Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-teal-100 text-teal-800">
                  {reportData.reportType}
                </span>
                <span className="text-xs text-slate-500 font-medium">{reportData.date}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Patient: {reportData.petName} ({reportData.breed})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {reportData.species} • Age: {reportData.age} • Weight: {reportData.weight}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 sm:text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Originating Clinic</span>
              <strong className="text-slate-900 block">{reportData.clinicName}</strong>
              <span className="text-[11px] text-slate-500">{reportData.doctorName}</span>
            </div>
          </div>

          {/* Layman Summary Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-teal-700">
              <HeartPulse className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">What This Report Means in Plain English</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-teal-50/50 p-4 rounded-2xl border border-teal-100">
              {reportData.laymanSummary}
            </p>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Takeaways</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {reportData.keyFindings.map((finding, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>{finding}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Important Values & Biomarkers Table */}
          {reportData.biomarkers.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Important Values & Lab Biomarkers</h3>
                  <p className="text-xs text-slate-500">Normal reference limits mapped against canine/feline species standards</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                      <th className="py-2.5 px-3">Test Parameter</th>
                      <th className="py-2.5 px-3">Observed Value</th>
                      <th className="py-2.5 px-3">Reference Range</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Layman Explanation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reportData.biomarkers.map((bio, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-semibold text-slate-900 whitespace-nowrap">
                          {bio.name}
                        </td>
                        <td className="py-3 px-3 font-bold font-mono-num text-slate-800">
                          {bio.value} <span className="text-[10px] text-slate-400 font-normal">{bio.unit}</span>
                        </td>
                        <td className="py-3 px-3 text-slate-500 font-mono-num whitespace-nowrap">
                          {bio.referenceRange} {bio.unit}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            bio.status === 'critical' ? 'bg-rose-100 text-rose-800 border border-rose-200 animate-pulse' :
                            bio.status === 'elevated' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                            bio.status === 'low' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}>
                            {bio.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 text-xs min-w-[220px]">
                          {bio.laymanMeaning}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Structured Medications Schedule */}
          {reportData.medications.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-indigo-700">
                <Pill className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900">Structured Medication Schedule</h3>
              </div>
              <p className="text-xs text-slate-500">
                Prescription regimen converted into clear, actionable daily dosing instructions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {reportData.medications.map((med, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                          {med.name}
                        </h4>
                      </div>
                      <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded inline-block mb-2">
                        {med.dosage} • {med.frequency}
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed mb-2">
                        <strong>Purpose:</strong> {med.purpose}
                      </p>
                      <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900">
                        <strong>Instructions:</strong> {med.instructions}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-400 font-semibold flex items-center justify-between">
                      <span>Duration: {med.duration}</span>
                      <Clock className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations & Red Flags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vet Recommendations */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Care & Follow-Up Actions</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {reportData.vetRecommendations.map((rec, idx) => (
                  <li key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                    <span className="text-brand-600 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warning Signs & Red Flags */}
            <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-sm space-y-3 bg-rose-50/20">
              <h3 className="text-base font-bold text-rose-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Urgent Red Flags to Watch For</span>
              </h3>
              <p className="text-xs text-slate-500">
                If you observe any of the following, visit an emergency veterinary ICU immediately:
              </p>
              <ul className="space-y-2 text-xs text-rose-900">
                {reportData.warningSigns.map((sign, idx) => (
                  <li key={idx} className="p-2.5 bg-rose-50 rounded-xl border border-rose-200 flex items-start gap-2">
                    <span className="text-rose-600 font-bold">⚠️</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Vet Question Generator Section */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6 border border-indigo-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold mb-1">
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                  <span>AI Workflow: Smart Vet Consultation Prep</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Questions to Ask Your Veterinarian</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Tailored questions based on {reportData.petName}’s specific abnormal values and prescriptions.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyQuestions}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
                >
                  {copiedQuestions ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedQuestions ? 'Questions Copied' : 'Copy All'}</span>
                </button>

                <button
                  onClick={handleShareWhatsApp}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
                >
                  {copiedWhatsApp ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedWhatsApp ? 'WhatsApp Format Copied' : 'WhatsApp Share'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reportData.questionsForVet.map((q) => (
                <div
                  key={q.id}
                  className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-2 hover:border-indigo-400 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {q.category}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                    “{q.question}”
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    <span className="text-slate-300 font-semibold">Why this matters:</span> {q.rationale}
                  </p>
                </div>
              ))}
            </div>

            {/* Next Steps CTA */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-300">
                Ready for your consultation? Find a verified veterinarian in Bengaluru.
              </span>
              <button
                onClick={onNavigateToDiscovery}
                className="w-full sm:w-auto px-5 py-2.5 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
              >
                <span>Find Nearby Clinics</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
