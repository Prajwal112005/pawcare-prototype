import { MedicalReportAnalysis } from '@/lib/types';

export const SAMPLE_REPORTS: MedicalReportAnalysis[] = [
  {
    id: 'sample-cbc-max',
    title: 'Sample 1: Max (Golden Retriever) — Complete Blood Count (CBC) Panel',
    petName: 'Max',
    species: 'Canine (Dog)',
    breed: 'Golden Retriever',
    age: '3 Years 2 Months',
    weight: '29.4 kg',
    date: '14 Sep 2026',
    clinicName: 'Cessna Lifeline Veterinary Hospital, Domlur',
    doctorName: 'Dr. Rohini Menon, BVSc (Emergency & Critical Care)',
    reportType: 'Complete Blood Count (CBC)',
    laymanSummary:
      'Max’s bloodwork shows significant signs of fighting off an acute infection or tick-borne disease. His platelet count is markedly low (thrombocytopenia), which can cause bruising or delayed clotting, while his White Blood Cell (WBC) count is elevated, indicating active immune response. His hemoglobin is borderline low, suggesting mild secondary anemia.',
    keyFindings: [
      'Platelet count is severely depressed (68,000 /µL vs normal >200,000 /µL) — high risk of bleeding/petechiae.',
      'Total Leukocyte Count (WBC) is elevated at 19,400 /µL, pointing to acute infection.',
      'Hemoglobin is slightly reduced (10.8 g/dL), reflecting mild regenerative anemia common in tick-borne illnesses.',
      'RBC count is marginally reduced, requiring close monitoring.'
    ],
    biomarkers: [
      {
        name: 'Platelet Count (PLT)',
        value: '68,000',
        unit: '/µL',
        referenceRange: '200,000 - 500,000',
        status: 'critical',
        laymanMeaning: 'Blood-clotting cells. Dangerously low; avoid vigorous play and monitor for gum bleeding or skin spots.'
      },
      {
        name: 'Total Leukocyte Count (WBC)',
        value: '19,400',
        unit: '/µL',
        referenceRange: '6,000 - 17,000',
        status: 'elevated',
        laymanMeaning: 'Immune defense cells. Elevated count confirms the body is actively battling an infection.'
      },
      {
        name: 'Hemoglobin (Hb)',
        value: '10.8',
        unit: 'g/dL',
        referenceRange: '12.0 - 18.0',
        status: 'low',
        laymanMeaning: 'Oxygen-carrying protein in red cells. Mild drop explains Max’s recent lethargy and lower energy.'
      },
      {
        name: 'Hematocrit (PCV)',
        value: '33.2',
        unit: '%',
        referenceRange: '37.0 - 55.0',
        status: 'low',
        laymanMeaning: 'Percentage of blood volume made of red blood cells. Supports the mild anemia finding.'
      },
      {
        name: 'Granulocytes / Neutrophils',
        value: '82',
        unit: '%',
        referenceRange: '60 - 77',
        status: 'elevated',
        laymanMeaning: 'First-responder infection fighting cells. Elevated in acute systemic inflammatory states.'
      },
      {
        name: 'Lymphocytes',
        value: '12',
        unit: '%',
        referenceRange: '12 - 30',
        status: 'normal',
        laymanMeaning: 'Within normal baseline limits.'
      }
    ],
    medications: [
      {
        name: 'Doxycycline 300mg (Doxyvet)',
        dosage: '1 tablet (300mg)',
        frequency: 'Every 12 hours (Twice daily)',
        duration: '21 to 28 consecutive days',
        instructions: 'MUST be given strictly with a hearty meal to prevent stomach upset or esophagitis.',
        purpose: 'Targeted broad-spectrum antibiotic to eliminate tick-borne pathogens (Ehrlichia / Anaplasma).'
      },
      {
        name: 'Platelet Booster Syrup (Platup / Caripill extract)',
        dosage: '10 ml',
        frequency: 'Twice daily',
        duration: '14 days',
        instructions: 'Administer directly by oral syringe 30 minutes after morning/evening meals.',
        purpose: 'Carica papaya extract herbal supplement to assist bone marrow platelet recovery.'
      },
      {
        name: 'Pantoprazole 20mg (Pantocid)',
        dosage: '1 tablet',
        frequency: 'Once daily (Morning)',
        duration: '14 days',
        instructions: 'Give 30 minutes before the first morning meal.',
        purpose: 'Gastric acid protection against antibiotic nausea.'
      }
    ],
    vetRecommendations: [
      'Strict crate or indoor resting for the next 7 days — avoid jumping, rough tug-of-war, or stair climbing to prevent internal hematoma.',
      'Inspect gums, inner ears, and belly twice daily for tiny red pinprick spots (petechiae) or sudden paleness.',
      'Maintain fresh water hydration with electrolyte broth if appetite is slow.',
      'Schedule a follow-up repeat CBC panel in 7 days to verify if platelets are rising.'
    ],
    warningSigns: [
      'Fresh blood in urine, dark tarry black stool, or bleeding from the nostrils (epistaxis).',
      'Sudden collapse, high fever (>103.5°F), or rapid laboured breathing.',
      'Complete food refusal lasting more than 24 hours.'
    ],
    questionsForVet: [
      {
        id: 'q1',
        category: 'Diagnosis',
        question: 'Has a 4DX SNAP test or PCR panel been done to confirm whether this is Ehrlichia, Babesia, or Anaplasma?',
        rationale: 'Identifies the exact tick-borne organism so the antibiotic course can be tailored.'
      },
      {
        id: 'q2',
        category: 'Medication',
        question: 'If Max vomits the Doxycycline dose, should I repeat the dose immediately or give an antiemetic first?',
        rationale: 'Doxycycline frequently triggers nausea, and keeping consistent blood levels is vital.'
      },
      {
        id: 'q3',
        category: 'Follow-up',
        question: 'At what platelet threshold (e.g. below 30k) would Max require a donor blood or platelet transfusion?',
        rationale: 'Establishes clear contingency emergency criteria for critical scenarios.'
      },
      {
        id: 'q4',
        category: 'Diet & Care',
        question: 'Can we supplement Max’s diet with liver broth, eggs, or iron supplements to accelerate red cell regeneration?',
        rationale: 'Provides nutritional support for his mild anemia without clashing with antibiotics.'
      }
    ]
  },
  {
    id: 'sample-prescription-bella',
    title: 'Sample 2: Bella (Indie Rescued Dog) — Post-Surgery Discharge & Medication Summary',
    petName: 'Bella',
    species: 'Canine (Stray / Indie)',
    breed: 'Indian Pariah Dog',
    age: '1 Year 6 Months',
    weight: '14.2 kg',
    date: '15 Sep 2026',
    clinicName: 'CARE (Charlie’s Animal Rescue Centre), Jakkur',
    doctorName: 'Dr. Chetan Gowda, MVSc (Trauma & Surgery)',
    reportType: 'Prescription & Discharge',
    laymanSummary:
      'Bella underwent an uneventful elective ovariohysterectomy (spay surgery) and minor ear-notch sterilization mark. Her surgical incision is closed with intradermal sutures. The post-operative regimen is designed to prevent bacterial infection at the incision line and control post-surgical inflammation and discomfort.',
    keyFindings: [
      'Incision site is clean, dry, and apposed without active discharge or excessive swelling.',
      'Body temperature is stable at 101.4°F (normal canine range).',
      'Full recovery from general anesthesia achieved; ambulatory and able to bear weight on all four limbs.'
    ],
    biomarkers: [
      {
        name: 'Body Temperature',
        value: '101.4',
        unit: '°F',
        referenceRange: '101.0 - 102.5',
        status: 'normal',
        laymanMeaning: 'Core temperature is healthy; no surgical fever detected.'
      },
      {
        name: 'Heart Rate',
        value: '96',
        unit: 'bpm',
        referenceRange: '70 - 120',
        status: 'normal',
        laymanMeaning: 'Heart rhythm is calm and regular post-sedation.'
      },
      {
        name: 'Incision Healing Score',
        value: 'Grade 1 (Intact)',
        unit: 'Score',
        referenceRange: 'Grade 1 - 4',
        status: 'normal',
        laymanMeaning: 'Wound edges are neatly joined with zero gap.'
      }
    ],
    medications: [
      {
        name: 'Cefpet 200mg (Cefpodoxime Proxetil)',
        dosage: '1 tablet (200mg)',
        frequency: 'Once daily (Every 24 hours)',
        duration: '5 days',
        instructions: 'Give with food at the same hour each evening.',
        purpose: 'Post-operative antibiotic to prevent secondary wound infection.'
      },
      {
        name: 'Melonex 2.5mg (Meloxicam)',
        dosage: '1/2 tablet (approx. 1.25mg)',
        frequency: 'Once daily after a heavy meal',
        duration: '3 days only',
        instructions: 'NEVER administer on an empty stomach. Discontinue if vomiting or dark stool occurs.',
        purpose: 'Non-steroidal anti-inflammatory (NSAID) for pain relief and abdominal swelling control.'
      },
      {
        name: 'Betadine Antiseptic Solution 5%',
        dosage: 'Topical dab using sterile gauze',
        frequency: 'Twice daily',
        duration: '7 days',
        instructions: 'Gently dab along the stitch line. Do NOT rub vigorously or wash with water.',
        purpose: 'Local topical antiseptic barrier against dust and microbes.'
      }
    ],
    vetRecommendations: [
      'Elizabethan Collar (Cone of Shame) MUST remain on 24/7 for 10 days to prevent licking or pulling out stitches.',
      'Keep Bella in a clean, dry indoor room away from street dust or other dogs.',
      'No running, jumping on sofas, or walking without a short leash for 10 full days.',
      'Do NOT bathe Bella until sutures have completely absorbed or are removed on Day 10.'
    ],
    warningSigns: [
      'Redness spreading beyond 1 inch of incision, oozing yellow pus, or foul odor.',
      'Swelling resembling a soft golf ball under the incision (possible seroma or hernia).',
      'Persistent vomiting, lack of urination within 24 hours, or whimpering in severe pain.'
    ],
    questionsForVet: [
      {
        id: 'qb1',
        category: 'Medication',
        question: 'On Day 4 after finishing Meloxicam pain pills, what signs of hidden discomfort should I watch for?',
        rationale: 'Pain meds stop on day 3, so caregiver needs to know if breakthrough pain occurs.'
      },
      {
        id: 'qb2',
        category: 'Follow-up',
        question: 'Are these absorbable intradermal sutures or will Bella need an in-clinic physical suture snipping visit on Day 10?',
        rationale: 'Clarifies whether a follow-up clinic visit is compulsory or optional.'
      },
      {
        id: 'qb3',
        category: 'Diet & Care',
        question: 'When is it safe to transition Bella from soft boiled chicken & rice back to regular dry kibble?',
        rationale: 'Ensures the digestive tract is not stressed post-abdominal surgery.'
      }
    ]
  },
  {
    id: 'sample-renal-oliver',
    title: 'Sample 3: Oliver (Persian Cat) — Senior Feline Renal & Biochemistry Panel',
    petName: 'Oliver',
    species: 'Feline (Cat)',
    breed: 'Persian Longhair',
    age: '9 Years 8 Months',
    weight: '4.1 kg',
    date: '12 Sep 2026',
    clinicName: 'The Cat Studio & Feline Specialty Clinic, Indiranagar',
    doctorName: 'Dr. Meera Krishnan, MVSc (ISFM Certified)',
    reportType: 'Biochemistry & Renal',
    laymanSummary:
      'Oliver’s biochemical profile reflects early-to-moderate Chronic Kidney Disease (IRIS Stage 2). His kidneys are filtering toxins at a reduced efficiency, causing Blood Urea Nitrogen (BUN) and Serum Creatinine to accumulate above baseline. His electrolytes and blood glucose are currently stable, but dietary moisture and renal-friendly nutrition are critical.',
    keyFindings: [
      'Serum Creatinine is elevated at 2.6 mg/dL (feline normal < 1.6 mg/dL).',
      'BUN (Blood Urea Nitrogen) is high at 44 mg/dL (normal 16 - 36 mg/dL).',
      'Phosphorus is slightly borderline high (5.2 mg/dL), warranting phosphate control.',
      'Serum Potassium and ALT (Liver) are within reassuring normal ranges.'
    ],
    biomarkers: [
      {
        name: 'Serum Creatinine',
        value: '2.6',
        unit: 'mg/dL',
        referenceRange: '0.8 - 1.6',
        status: 'elevated',
        laymanMeaning: 'By-product of muscle breakdown cleared by kidneys. Elevation indicates reduced nephron filtering rate.'
      },
      {
        name: 'Blood Urea Nitrogen (BUN)',
        value: '44',
        unit: 'mg/dL',
        referenceRange: '16 - 36',
        status: 'elevated',
        laymanMeaning: 'Waste product of protein digestion. Elevated levels cause mild nausea and reduced appetite.'
      },
      {
        name: 'Serum Phosphorus',
        value: '5.2',
        unit: 'mg/dL',
        referenceRange: '3.1 - 5.5',
        status: 'elevated',
        laymanMeaning: 'Mineral balance regulated by kidneys. High levels accelerate kidney strain; dietary control needed.'
      },
      {
        name: 'Serum Potassium',
        value: '4.2',
        unit: 'mmol/L',
        referenceRange: '3.5 - 5.5',
        status: 'normal',
        laymanMeaning: 'Heart rhythm electrolyte is well-balanced.'
      },
      {
        name: 'ALT (Liver Enzyme)',
        value: '48',
        unit: 'U/L',
        referenceRange: '12 - 130',
        status: 'normal',
        laymanMeaning: 'Liver cells appear healthy and undamaged.'
      }
    ],
    medications: [
      {
        name: 'Renal Diet Formulation (Royal Canin / Farmina Vet Life Renal)',
        dosage: 'Wet food 1.5 pouches/day + controlled wet moisture',
        frequency: 'Divided into 3-4 small meals',
        duration: 'Lifelong ongoing renal management',
        instructions: 'Never feed high-protein dry grocery kibble. Add warm water to increase hydration.',
        purpose: 'Low phosphorus, controlled high-quality protein to ease kidney workload.'
      },
      {
        name: 'Ipakitine / Renal P Phosphate Binder Powder',
        dosage: '1 level scoop (1g)',
        frequency: 'Mixed thoroughly into wet food twice daily',
        duration: 'Ongoing with meals',
        instructions: 'Must be thoroughly blended into wet food so it binds dietary phosphorus in the gut.',
        purpose: 'Prevents phosphorus absorption through intestinal tract.'
      },
      {
        name: 'Subcutaneous Fluid Therapy (Lactated Ringer’s)',
        dosage: '75 ml per session',
        frequency: 'Twice weekly (or as clinic directs)',
        duration: 'As evaluated monthly',
        instructions: 'Administered under the scruff by trained nurse or vet.',
        purpose: 'Direct cellular hydration to flush metabolic toxins.'
      }
    ],
    vetRecommendations: [
      'Place 3 to 4 fresh water ceramic/metal fountains around the home — cats drink significantly more from circulating streams.',
      'Monitor daily urine clump count in the litter box and track weekly body weight.',
      'Check systolic blood pressure in the next clinic visit, as kidney dysfunction frequently correlates with feline hypertension.',
      'Repeat renal profile and SDMA test in 6 weeks.'
    ],
    warningSigns: [
      'Complete loss of appetite for >24 hours (risk of feline hepatic lipidosis).',
      'Frequent vomiting, severe mouth sores, or chemical ammonia breath odor.',
      'Disorientation, sudden blindness (dilated pupils), or hind leg weakness.'
    ],
    questionsForVet: [
      {
        id: 'qo1',
        category: 'Diagnosis',
        question: 'Should we test Oliver’s SDMA level and Urine Specific Gravity (USG) to pinpoint the exact IRIS kidney staging?',
        rationale: 'SDMA detects renal changes earlier and USG measures urine concentrating ability.'
      },
      {
        id: 'qo2',
        category: 'Diet & Care',
        question: 'Oliver is picky with renal prescription wet food. What safe flavor enhancers or transition strategies do you recommend?',
        rationale: 'Keeping caloric intake steady in kidney cats is crucial to avoid liver crisis.'
      },
      {
        id: 'qo3',
        category: 'Medication',
        question: 'Does Oliver need an ACE inhibitor or ARB (like Telmisartan / Semintra) for protein in his urine or blood pressure?',
        rationale: 'Standard of care for feline chronic kidney disease to reduce glomerular pressure.'
      }
    ]
  }
];
