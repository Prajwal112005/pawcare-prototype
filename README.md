# PawCare — Animal Care Discovery & Medical Intelligence Platform
> **Practo for Animals — Product & Technology Intern Screening Assignment**

PawCare is an animal-care discovery and medical intelligence MVP built for India's veterinary ecosystem, starting with **Bengaluru**. It bridges the information fragmentation between pet parents, street animal rescuers, veterinary specialists, and emergency care providers.

---

## 🐾 Live Interactive Screens

The application features **4 seamlessly connected core screens** with continuous state persistence, interactive filters, simulated AI extraction pipelines, and zero dead-ends:

1. **Screen 1: Home / Discovery**
   - **Hyperlocal Location Selector**: Bengaluru area hub (Indiranagar, Koramangala, Whitefield, HSR Layout, Jayanagar, Hebbal, Jakkur).
   - **Smart Natural Language Search Bar**: "What does your pet need?" with interactive prompt chips (e.g., *"Stray dog hit by car bleeding heavily"*, *"Puppy vaccination and deworming"*, *"Cat-only clinic with kidney blood tests"*).
   - **Emergency 24x7 SOS Banner**: Immediate 1-tap casualty dispatch for trauma, accident cases, and oxygen-equipped ambulances.
   - **4 Category Quick Shortcuts**: Veterinary Clinics, 24/7 Emergency & ICU, NGOs & Rescuers, Boarding & Foster Care.
   - **Recommended Care Preview**: Vetted Bengaluru clinics with live distance badges, ratings, and open status.
   - **AI Medical Assistant Spotlight**: Direct launcher for pet parents to simplify reports.

2. **Screen 2: Search Results & Interactive Bengaluru Map**
   - **Multi-Parameter Filter Toolbar**:
     - **Open Now** toggle
     - **24/7 Emergency Casualty** toggle
     - **Service Category tabs** (All, Vet Clinics, 24x7 Emergency, NGOs/Rescuers, Boarding)
     - **Distance slider** (< 5 km, < 10 km, < 15 km, All)
     - **Rating filter** (4.5+, 4.0+, All)
     - **Sorting**: Recommended, Nearest Distance, Highest Rating
   - **View Switcher**: Clean list view vs. **Split Map & List View** with an interactive stylized Bengaluru coordinate map featuring clickable provider pins and instant profile previews.
   - **Rich Provider Cards**: Verification badge (`PawCare Verified Demo`), 24/7 emergency indicators, distance in km, rating with review counts, operating hours, capability chips, and direct action triggers.

3. **Screen 3: Provider Profile & Action Hub**
   - **Comprehensive Facility Profile**: Verified badges, exact Bengaluru address, operating hours breakdown, indicative pricing guidelines.
   - **Direct Actions**:
     - **Call Clinic Modal**: Direct telephone numbers for OPD, 24/7 emergency casualty line, and WhatsApp quick chat.
     - **Get Directions**: Links directly to Google Maps navigation coordinates.
     - **Interactive Booking / Rescuer Assistance Modal**: Select pet species, requested service, date, time slot, contact number, with immediate confirmation reference toast.
   - **Medical Team & Infrastructure**: Attending veterinary surgeons, specialized equipment (oxygen cages, ultrasound, ICU).
   - **"AI Care Assistant for this Visit" Section**: Direct bridge to Screen 4 pre-configured for the attending veterinarian.

4. **Screen 4: AI Medical Report & Prescription Assistant**
   - **File Upload Zone**: Drag-and-drop or file picker for PDF / JPG / PNG reports.
   - **3 Pre-Loaded Diagnostic Samples** for instant 1-click evaluator testing:
     1. *Max (Golden Retriever) — Complete Blood Count (CBC) Panel* (Low platelets 68k, high WBC, suspected tick fever).
     2. *Bella (Indie Rescue Dog) — Post-Surgery Spay Discharge & Meds* (Antibiotics, Meloxicam pain management, Elizabethan collar).
     3. *Oliver (Persian Cat) — Senior Feline Renal & Biochemistry Panel* (Elevated BUN & Creatinine, IRIS Stage 2).
   - **Simulated Multi-Stage AI Pipeline Animation**:
     1. Multimodal OCR & Document Layout Analysis
     2. Clinical Terminology De-jargonization
     3. Medication Timing & Dietary Guardrails
     4. Veterinarian Question Synthesis
   - **Prominent Medical Safety Notice**:
     > *“⚠️ This is an AI-generated explanation, not a diagnosis. Always consult a qualified veterinarian for medical decisions.”*
   - **Empathetic Layman Summary**: Explains findings clearly without complex medical jargon.
   - **Biomarkers Table**: Normal vs. abnormal parameters with status badges (`Critical`, `Elevated`, `Normal`, `Low`) and plain-English meanings.
   - **Structured Medication Schedule**: Medicine name, dosage, frequency, instructions, and therapeutic purpose.
   - **Vet Care Recommendations & Red Flags**: Warning signs requiring immediate hospital visits.
   - **Vet Question Generator**: High-leverage questions categorized into Diagnosis, Medication, Diet & Care, and Follow-up, with **1-Click Copy to Clipboard** and **WhatsApp Share formatting**.

---

## 🤖 4 AI-Powered Workflows Demonstrated

### 1. Medical Report Simplification
- **Data Processed**: Dense laboratory PDF outputs (CBC, serum biochemistry) and handwritten prescription discharge slips.
- **Automation**: Decouples medical jargon into plain English; maps test values to canine/feline physiological ranges; extracts daily medication routines.
- **Guardrail**: Strictly educational explanations; never makes autonomous diagnoses.

### 2. Vet Consultation Question Generator
- **Data Processed**: Identified abnormal biomarkers + prescribed active pharmaceutical ingredients.
- **Automation**: Synthesizes specific, high-yield questions for the pet parent or rescuer to ask during their next clinic visit. Formats directly for WhatsApp sharing.

### 3. Smart Service Matching & Triage
- **Data Processed**: Natural-language user search queries (e.g. *"puppy vomiting blood at 11pm"*, *"stray dog hit by car in Domlur"*).
- **Automation**: Analyzes clinical urgency (`critical_emergency` vs `routine`), detects species, extracts symptoms, and automatically filters the directory to 24/7 ICU casualty hospitals and oxygen-equipped ambulances.

### 4. Animal-Care Information Organisation
- **Data Processed**: Messy, unstructured social media posts, WhatsApp rescuer forwards, and handwritten clinic slips.
- **Automation**: Demonstrated via an interactive in-app modal (`AI Data Pipeline Demo`) showing how raw messages are automatically parsed into verified provider records with phone numbers, hours, and capabilities.

---

## 🏗️ Architecture & Technology Stack

```
[User Client / Mobile Browser]
       │
       ▼
[Next.js 14 App Router + Tailwind CSS Layer]
       │
  ┌────┴───────────────────────────┐
  ▼                                ▼
[Application / API Layer]       [AI Gateway Abstraction]
  ├─ /api/providers               ├─ Workflow 1: Report Simplifier
  ├─ /api/ai/match                ├─ Workflow 2: Vet Question Generator
  └─ /api/ai/simplify             ├─ Workflow 3: Smart Service Matching
       │                          └─ Workflow 4: Info Organisation
       ▼                                │
[External Integrations (Future)]        ▼
  ├─ Google Maps / Geocoding API  [Pluggable LLM Provider]
  ├─ Google Cloud Document AI OCR ├─ Gemini 1.5 Flash (Default)
  └─ Gupshup / WhatsApp API India └─ OpenAI GPT-4o
```

- **Frontend Framework**: Next.js 14 (App Router), React 18, TypeScript.
- **Styling & UI**: Tailwind CSS, Lucide React icons, Glassmorphic headers.
- **Data & State**: Zero external database friction for MVP — fast in-memory Bengaluru data store with 12 verified facilities.
- **AI Abstraction**: `lib/ai-service.ts` encapsulates all AI logic with clean interfaces so production LLM keys (Gemini / OpenAI) can be connected with a single environment variable (`NEXT_PUBLIC_AI_PROVIDER="gemini"`).

---

## 🎯 MVP Thinking: 30-Day Prioritization Roadmap

### What We Build First (Month 1):
1. **Hyperlocal Location-Based Discovery**: Fast filtering of verified veterinary clinics, 24/7 emergency casualty, and shelters in Bengaluru.
2. **One-Tap Emergency SOS Directory**: Direct telephone lines to animal ambulances and trauma units without login friction.
3. **AI Medical Document Simplifier**: Layman explanations of CBC/renal reports and structured medication schedules.
4. **Smart Vet Question Generator**: Actionable questions for vet visits with 1-click clipboard and WhatsApp export.
5. **Community Rescuer Tagging**: Dedicated filters for animal welfare NGOs, subsidized care, and shelter helplines.

### What We Deliberately Leave Out Initially (Post-MVP):
- ❌ **Telemedicine Video Consultations**: Hands-on physical palpation is vital for animals who cannot speak; high clinical risk for an MVP.
- ❌ **In-App Payment Processing**: Creates checkout friction during emergency trauma admissions.
- ❌ **Complex Multi-Calendar Booking**: Indian veterinary clinics operate primarily on OPD walk-in surges; phone/WhatsApp confirmation is far more dependable in Phase 1.
- ❌ **Social Media Feeds**: Distracts from solving the urgent healthcare and trauma discovery problem.
- ❌ **Autonomous AI Clinical Diagnosis**: Strict regulatory and liability risk.

---

## 🚀 How to Run the Application

### 1. Prerequisites
- Node.js 18.x or later
- npm or yarn

### 2. Installation & Running
```bash
# Clone or navigate to the project directory
cd /Users/prajwalvasistha/Documents/SUAZ

# Start the Next.js development server
npm run dev

# Or build and launch the production server
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Environment Variables (Optional)
The prototype runs deterministically out of the box with zero required environment variables. If you wish to connect live Google Gemini or OpenAI endpoints:
```env
NEXT_PUBLIC_AI_PROVIDER=gemini # or "openai" or "mock"
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

---

## ⏱️ Suggested 2–3 Minute Evaluation Demo Script

1. **Introduction (20s)**:
   - Introduce **PawCare**: *"Animal healthcare in India is fragmented across WhatsApp forwards, broken Google Maps pins, and complex vet jargon. PawCare is an MVP solving discovery and health comprehension for pet parents and rescuers."*
2. **Discovery & Smart Search (40s)**:
   - On the Home screen, highlight the **Bengaluru Hub** selector.
   - Click the prompt chip: *“🚨 Stray dog hit by car, bleeding heavily”*.
   - Show how the AI immediately detects **Critical Emergency Triage** and surfaces 24/7 trauma hospitals (Cessna Lifeline) and oxygen-equipped ambulances (PawSitive Life).
3. **Filters & Interactive Map (30s)**:
   - Toggle **Split Map & List View** on Screen 2.
   - Toggle **24/7 Emergency** and distance sliders to show real-time responsiveness.
   - Click on **Cessna Lifeline** or **CARE Rescue Centre** to view the full profile on Screen 3.
4. **Provider Details & Call/Book (20s)**:
   - Show verified credentials, emergency contact lines, and the **Book Appointment** modal.
   - Click **"Analyze Pet Report with AI"** from the provider profile to jump directly to Screen 4.
5. **AI Medical Report Assistant (40s)**:
   - Select **Sample 1: Max (Canine CBC Blood Panel)**.
   - Watch the 4-step AI analysis pipeline.
   - Walk through the plain-English explanation, biomarker status flags (Low Platelets 68k, High WBC), structured medication schedule, and generated vet consultation questions.
   - Click **"WhatsApp Share"** or **"Copy All"** to demonstrate immediate real-world utility.
6. **Strategy Memo & Conclusion (10s)**:
   - Click **"Product & Tech Memo"** in the top navigation to show the complete 2-page screening response covering Product Concept, Flow, AI, Tech, and 30-Day MVP Thinking.

---

## 📋 Verification Results
- **TypeScript**: Full static type compliance (`tsc` verification).
- **Next.js Production Build**: `npm run build` compiled successfully (Exit code: 0).
- **Interactive Routes**: All 4 screens and 3 API endpoints (`/api/providers`, `/api/ai/simplify`, `/api/ai/match`) tested and functional.