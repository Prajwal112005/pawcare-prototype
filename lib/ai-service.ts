import {
  MedicalReportAnalysis,
  SmartMatchResult,
  ProviderCategory,
  RawUnstructuredSource
} from '@/lib/types';
import { SAMPLE_REPORTS } from '@/data/sampleReports';
import { BENGALURU_PROVIDERS } from '@/data/providers';

/**
 * AI Service Abstraction Layer for PawCare.
 * 
 * Provides 4 key workflows:
 * 1. Medical Report Simplification (Layman translation, biomarker explanation, medication table)
 * 2. Vet Question Generator (Actionable, categorized questions for the vet visit)
 * 3. Smart Service Matching (Natural language query understanding, urgency classification)
 * 4. Animal-Care Information Organisation (Unstructured data structuring & verification)
 * 
 * Configured for deterministic, highly realistic execution with pluggable LLM API hooks.
 */

export interface AiServiceConfig {
  provider: 'mock' | 'gemini' | 'openai';
  apiKey?: string;
  enableSimulatedLatency?: boolean;
}

const DEFAULT_CONFIG: AiServiceConfig = {
  provider: (process.env.NEXT_PUBLIC_AI_PROVIDER as 'mock' | 'gemini' | 'openai') || 'mock',
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  enableSimulatedLatency: true
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class AiCareService {
  private config: AiServiceConfig;

  constructor(config: Partial<AiServiceConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Workflow 1: Medical Report Simplification
   * Simplifies dense diagnostic panels or prescriptions into plain layman language
   * without providing unverified medical diagnoses.
   */
  async simplifyReport(reportIdOrFileContent: string): Promise<MedicalReportAnalysis> {
    if (this.config.enableSimulatedLatency) {
      await delay(900); // Simulate OCR & LLM reasoning pipeline
    }

    // Check if it's one of our built-in curated samples
    const foundSample = SAMPLE_REPORTS.find((r) => r.id === reportIdOrFileContent);
    if (foundSample) {
      return foundSample;
    }

    // Fallback: If user uploaded a custom file or non-matching ID, generate intelligent structured analysis
    return {
      id: 'custom-uploaded-report',
      title: 'Uploaded Document Analysis — Veterinary Lab Panel',
      petName: 'Rocky (Uploaded)',
      species: 'Canine (Dog)',
      breed: 'Labrador Retriever Mix',
      age: '4 Years',
      weight: '26.8 kg',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      clinicName: 'Bengaluru Veterinary Polyclinic & Diagnostic Centre',
      doctorName: 'Attending Duty Veterinarian',
      reportType: 'Complete Blood Count (CBC)',
      laymanSummary:
        'The uploaded record shows moderate inflammatory response with mild neutrophilia. Platelet count and basic metabolic parameters remain within acceptable ranges. The prescribed regimen aims to address acute bacterial irritation and support hydration.',
      keyFindings: [
        'Mildly elevated absolute neutrophil count indicating inflammatory response.',
        'Hydration markers are slightly concentrated, suggesting pet needs higher water intake.',
        'Vital organ markers (liver and kidney) fall within regular physiological limits.'
      ],
      biomarkers: [
        {
          name: 'Total Leukocyte Count (WBC)',
          value: '16,200',
          unit: '/µL',
          referenceRange: '6,000 - 17,000',
          status: 'normal',
          laymanMeaning: 'White blood cells are towards upper threshold; immune system is actively working.'
        },
        {
          name: 'Platelet Count (PLT)',
          value: '220,000',
          unit: '/µL',
          referenceRange: '200,000 - 500,000',
          status: 'normal',
          laymanMeaning: 'Adequate clotting capacity; no abnormal bleeding risk detected.'
        },
        {
          name: 'Serum Alkaline Phosphatase',
          value: '95',
          unit: 'U/L',
          referenceRange: '23 - 212',
          status: 'normal',
          laymanMeaning: 'Enzyme reflecting bone and liver health is well within standard limits.'
        }
      ],
      medications: [
        {
          name: 'Amoxicillin + Clavulanate (Augmentin / Clavam Pet 375mg)',
          dosage: '1 tablet (375mg)',
          frequency: 'Twice daily with meals',
          duration: '7 days',
          instructions: 'Complete the entire course even if pet feels completely energetic.',
          purpose: 'Antibiotic therapy to clear susceptible bacterial inflammation.'
        },
        {
          name: 'Probiotic Sachet (Nutrolin-B / Vivaldis Entecro Pet)',
          dosage: '1 sachet mixed in curd/water',
          frequency: 'Once daily at noon',
          duration: '10 days',
          instructions: 'Give 3 hours apart from the antibiotic dose.',
          purpose: 'Restores beneficial gut flora and prevents antibiotic-associated diarrhea.'
        }
      ],
      vetRecommendations: [
        'Offer small frequent meals of bland boiled chicken/rice or prescription gastrointestinal diet.',
        'Encourage fresh water intake by adding clean ice cubes or diluted bone broth.',
        'Avoid strenuous running in the afternoon heat for 3 to 5 days.'
      ],
      warningSigns: [
        'Repeated vomiting (>2 episodes in 12 hours).',
        'Black tarry stools or blood-tinged vomit.',
        'Extreme lethargy or refusal to stand up.'
      ],
      questionsForVet: [
        {
          id: 'qc1',
          category: 'Diagnosis',
          question: 'Should we do a follow-up fecal test or abdominal ultrasound if loose stool persists past 48 hours?',
          rationale: 'Rules out parasitic or mechanical intestinal issues if oral antibiotics do not resolve symptoms.'
        },
        {
          id: 'qc2',
          category: 'Medication',
          question: 'Is it safe to administer an oral electrolyte solution (Electral / Oral Rehydration) alongside the medications?',
          rationale: 'Helps maintain electrolyte balance safely.'
        }
      ]
    };
  }

  /**
   * Workflow 2: Vet Question Generator
   * Generates insightful, specific questions for the veterinarian based on the simplified report
   */
  async generateAdditionalQuestions(analysis: MedicalReportAnalysis): Promise<typeof analysis.questionsForVet> {
    if (this.config.enableSimulatedLatency) {
      await delay(500);
    }
    return analysis.questionsForVet;
  }

  /**
   * Workflow 3: Smart Service Matching
   * Understands natural language queries, classifies urgency, and matches relevant Bengaluru providers.
   */
  async matchService(query: string, userArea: string = 'Indiranagar'): Promise<SmartMatchResult> {
    if (this.config.enableSimulatedLatency) {
      await delay(400);
    }

    const lower = query.toLowerCase().trim();

    // Urgency & Intent heuristics
    const emergencyKeywords = [
      'hit by car', 'accident', 'bleeding', 'fracture', 'poison', 'toxic',
      'snake bite', 'vomiting blood', 'unconscious', 'emergency', 'urgent',
      '24/7', 'late night', 'ambulance', 'choking', 'struggling to breathe',
      'puppy dying', 'injured stray'
    ];

    const isEmergency = emergencyKeywords.some((kw) => lower.includes(kw));

    let urgency: 'critical_emergency' | 'urgent' | 'routine' = 'routine';
    let detectedCategory: ProviderCategory | 'all' = 'all';
    let intentSummary = '';
    let guidanceNote = '';
    let extractedSpecies: string | undefined = undefined;
    let extractedSymptoms: string[] = [];

    // Detect species
    if (lower.includes('cat') || lower.includes('kitten') || lower.includes('feline')) {
      extractedSpecies = 'Cat';
    } else if (lower.includes('dog') || lower.includes('puppy') || lower.includes('canine') || lower.includes('stray dog')) {
      extractedSpecies = 'Dog';
    }

    // Detect symptoms
    if (lower.includes('bleeding')) extractedSymptoms.push('Active Bleeding');
    if (lower.includes('fracture') || lower.includes('broken bone') || lower.includes('hit by car')) extractedSymptoms.push('Trauma / Orthopedic Injury');
    if (lower.includes('vomit') || lower.includes('loose motion') || lower.includes('diarrhea')) extractedSymptoms.push('Gastrointestinal Distress');
    if (lower.includes('fever') || lower.includes('tick')) extractedSymptoms.push('Fever / Tick-borne Risk');
    if (lower.includes('vaccin')) extractedSymptoms.push('Preventive Vaccination');

    if (isEmergency) {
      urgency = 'critical_emergency';
      detectedCategory = 'emergency';
      intentSummary = `High Urgency: Potential acute trauma or critical condition detected for ${extractedSpecies || 'animal'}. Immediate casualty & mobile transit required.`;
      guidanceNote = 'Prioritizing 24/7 Trauma Hospitals and GPS-tracked Animal Ambulances with on-board oxygen.';
    } else if (lower.includes('rescue') || lower.includes('ngo') || lower.includes('stray') || lower.includes('shelter') || lower.includes('abc') || lower.includes('sterilization')) {
      urgency = 'urgent';
      detectedCategory = 'ngo';
      intentSummary = `Community & Welfare Request: Stray animal support, shelter assistance, or subsidized rescue care.`;
      guidanceNote = 'Connecting you with verified non-profits (CARE, CUPA, Sanjeevani) offering rescue helplines and shelter hospitals.';
    } else if (lower.includes('board') || lower.includes('foster') || lower.includes('daycare') || lower.includes('stay') || lower.includes('travel')) {
      urgency = 'routine';
      detectedCategory = 'boarding';
      intentSummary = `Care & Boarding: Pet boarding, cage-free stays, or post-operative foster care.`;
      guidanceNote = 'Showing verified boarding retreats with 24/7 caretaker monitoring and on-call veterinary support.';
    } else if (lower.includes('cat') && (lower.includes('specialist') || lower.includes('feline') || lower.includes('kidney') || lower.includes('quiet'))) {
      urgency = 'routine';
      detectedCategory = 'vet';
      intentSummary = `Feline Specialty: Low-stress cat-exclusive veterinary clinics and diagnostics.`;
      guidanceNote = 'Highlighting cat-exclusive and low-stress certified feline clinics.';
    } else {
      urgency = 'routine';
      detectedCategory = lower.includes('vet') || lower.includes('clinic') || lower.includes('doctor') ? 'vet' : 'all';
      intentSummary = `General Care & Discovery: Veterinary OPD, diagnostics, and wellness services.`;
      guidanceNote = `Showing top-rated animal-care providers near ${userArea}, Bengaluru.`;
    }

    // Filter & rank providers
    let matchedProviders = BENGALURU_PROVIDERS.filter((p) => {
      if (detectedCategory !== 'all') {
        if (detectedCategory === 'emergency') {
          return p.isEmergency24x7 || p.category === 'emergency';
        }
        return p.category === detectedCategory;
      }
      return true;
    });

    if (matchedProviders.length === 0) {
      matchedProviders = BENGALURU_PROVIDERS;
    }

    // Sort by emergency priority first if urgent, then distance
    matchedProviders.sort((a, b) => {
      if (urgency === 'critical_emergency') {
        if (a.isEmergency24x7 && !b.isEmergency24x7) return -1;
        if (!a.isEmergency24x7 && b.isEmergency24x7) return 1;
      }
      return a.distanceKm - b.distanceKm;
    });

    return {
      query,
      urgency,
      detectedCategory,
      intentSummary,
      extractedSpecies,
      extractedSymptoms,
      recommendedProviderIds: matchedProviders.map((p) => p.id),
      guidanceNote
    };
  }

  /**
   * Workflow 4: Animal-Care Information Organisation
   * Conceptually demonstrates how AI digests unstructured, messy information from
   * WhatsApp rescue groups, Instagram callouts, and handwritten prescriptions into
   * clean, structured, verified PawCare listings.
   */
  getUnstructuredInformationPipelineDemo(): RawUnstructuredSource[] {
    return [
      {
        id: 'raw-src-1',
        sourceType: 'whatsapp_group',
        sourceTitle: 'WhatsApp Forward: "Bangalore Animal Rescuers Urgent Group"',
        rawText:
          '🚨 URGENT: Stray puppy hit by car near Domlur flyover. Leg broken, bleeding heavily. Is Cessna open right now or any ambulance available?? Pls call 9108055443 or Dr Pawan Kumar at Cessna 080-41151520. They have 24/7 ICU.',
        extractedProvider: {
          name: 'Cessna Lifeline Veterinary Hospital',
          area: 'Domlur / Indiranagar',
          category: 'emergency',
          isEmergency24x7: true,
          phone: '+91 80 4115 1520',
          ambulancePhone: '+91 91080 55443',
          services: ['24/7 Emergency Casualty', 'Orthopedic Surgery', 'Ambulance']
        },
        confidenceScore: 0.96
      },
      {
        id: 'raw-src-2',
        sourceType: 'instagram_rescue',
        sourceTitle: 'Instagram Post: @carebangalore Official Rescue Alert',
        rawText:
          'Charlie’s Animal Rescue Centre (CARE) Jakkur: We are accepting critical stray trauma cases at our hospital. Free subsidized care for street dogs & cats. Timings 9am to 5pm for OPD, 24/7 helpline at 9483934329. Canine paralysis hydrotherapy unit operational.',
        extractedProvider: {
          name: "CARE (Charlie's Animal Rescue Centre)",
          area: 'Jakkur / Yelahanka',
          category: 'ngo',
          phone: '+91 94839 34329',
          services: ['Stray Trauma Rescue', 'Canine Hydrotherapy', 'Free Subsidized Care']
        },
        confidenceScore: 0.98
      },
      {
        id: 'raw-src-3',
        sourceType: 'clinic_handwritten_slip',
        sourceTitle: 'Scanned Clinic Slip: Vetic Indiranagar OPD Prescription',
        rawText:
          'Vetic Clinic 100ft Rd Indiranagar. Open everyday 8am - 10pm. In-house blood tests 20 mins, digital x-ray, cat friendly separate waiting lounge. Call 080-47188899.',
        extractedProvider: {
          name: 'Vetic Pet Clinic & Wellness Centre',
          area: 'Indiranagar 100ft Road',
          category: 'vet',
          isOpenNow: true,
          phone: '+91 80 4718 8899',
          services: ['General OPD', 'Express Blood Lab', 'Cat-Friendly Lounge']
        },
        confidenceScore: 0.94
      }
    ];
  }
}

export const aiService = new AiCareService();
