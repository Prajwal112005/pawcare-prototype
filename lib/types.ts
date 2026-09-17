export type ProviderCategory = 'vet' | 'emergency' | 'ngo' | 'boarding';

export interface DoctorProfile {
  name: string;
  qualification: string;
  experience: string;
  specialization: string;
}

export interface Provider {
  id: string;
  name: string;
  tagline: string;
  category: ProviderCategory;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  area: string;
  address: string;
  distanceKm: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  isEmergency24x7: boolean;
  isOpenNow: boolean;
  openingHours: string;
  phone: string;
  ambulancePhone?: string;
  whatsapp?: string;
  services: string[];
  facilities: string[];
  doctors: DoctorProfile[];
  about: string;
  pricingEstimate?: string;
  demoNotice: string;
}

export interface Biomarker {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'elevated' | 'low' | 'critical';
  laymanMeaning: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  purpose: string;
}

export interface VetQuestion {
  id: string;
  category: 'Medication' | 'Diagnosis' | 'Diet & Care' | 'Follow-up';
  question: string;
  rationale: string;
}

export interface MedicalReportAnalysis {
  id: string;
  title: string;
  petName: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
  date: string;
  clinicName: string;
  doctorName: string;
  reportType: 'Complete Blood Count (CBC)' | 'Prescription & Discharge' | 'Biochemistry & Renal';
  laymanSummary: string;
  keyFindings: string[];
  biomarkers: Biomarker[];
  medications: Medication[];
  vetRecommendations: string[];
  warningSigns: string[];
  questionsForVet: VetQuestion[];
}

export interface SmartMatchResult {
  query: string;
  urgency: 'critical_emergency' | 'urgent' | 'routine';
  detectedCategory: ProviderCategory | 'all';
  intentSummary: string;
  extractedSpecies?: string;
  extractedSymptoms?: string[];
  recommendedProviderIds: string[];
  guidanceNote: string;
}

export interface RawUnstructuredSource {
  id: string;
  sourceType: 'whatsapp_group' | 'instagram_rescue' | 'clinic_handwritten_slip';
  sourceTitle: string;
  rawText: string;
  extractedProvider: Partial<Provider>;
  confidenceScore: number;
}

export type ScreenType = 'home' | 'results' | 'provider' | 'ai-assistant';
