import { Provider } from '@/lib/types';

export const BENGALURU_PROVIDERS: Provider[] = [
  {
    id: 'cessna-domlur',
    name: 'Cessna Lifeline Veterinary Hospital',
    tagline: '24/7 Multi-Specialty Veterinary Hospital & Emergency Trauma ICU',
    category: 'emergency',
    isVerified: true,
    rating: 4.8,
    reviewCount: 1420,
    area: 'Domlur / Indiranagar',
    address: '148, Amarjyoti Layout, Intermediate Ring Road, Domlur, Bengaluru 560071',
    distanceKm: 2.1,
    coordinates: { lat: 12.9610, lng: 77.6433 },
    isEmergency24x7: true,
    isOpenNow: true,
    openingHours: 'Open 24 Hours (Casualty & ICU always open)',
    phone: '+91 80 4115 1520',
    ambulancePhone: '+91 76763 32211',
    whatsapp: '+91 99000 12345',
    services: [
      '24/7 Emergency Casualty',
      'Advanced Soft Tissue Surgery',
      'Digital Radiography (X-Ray)',
      'In-House Diagnostic Lab (CBC/Biochem)',
      'Canine & Feline ICU',
      'Blood Transfusion Support'
    ],
    facilities: [
      'Dedicated Oxygen Cages',
      'Hydraulic Surgical Suites',
      'Isolation Ward for Infectious Diseases',
      'Ambulance Bay',
      'Wheelchair Access'
    ],
    doctors: [
      { name: 'Dr. Pawan Kumar', qualification: 'MVSc (Surgery), PhD', experience: '18+ yrs', specialization: 'Orthopedic & Trauma Surgery' },
      { name: 'Dr. Rohini Menon', qualification: 'BVSc & AH', experience: '9+ yrs', specialization: 'Emergency & Critical Care' }
    ],
    about: 'Cessna Lifeline is one of Bengaluru’s premier 24/7 veterinary institutions equipped with state-of-the-art life support, in-house emergency diagnostic blood labs, and critical care specialists for acute trauma, cardiac arrest, and poisoning.',
    pricingEstimate: '₹600 - ₹900 Consultation | Emergency fee after 9 PM: ₹1,200',
    demoNotice: 'Prototype Demo Listing — Modeled on standard Bengaluru emergency veterinary facility.'
  },
  {
    id: 'care-jakkur',
    name: "CARE (Charlie's Animal Rescue Centre)",
    tagline: 'Premier Stray Animal Hospital, Trauma Rehabilitation & Rescue Helpline',
    category: 'ngo',
    isVerified: true,
    rating: 4.9,
    reviewCount: 2180,
    area: 'Jakkur / Yelahanka',
    address: 'Survey No. 31/2, Kogilu Village, Near Jakkur Aerodrome, Bengaluru 560064',
    distanceKm: 14.5,
    coordinates: { lat: 13.0845, lng: 77.6150 },
    isEmergency24x7: true,
    isOpenNow: true,
    openingHours: 'Hospital: 9:00 AM - 5:00 PM | Emergency Helpline: 24/7',
    phone: '+91 94839 34329',
    ambulancePhone: '+91 90359 99372',
    whatsapp: '+91 94839 34329',
    services: [
      'Stray Animal Trauma Rescue',
      'Free / Subsidized Emergency Care',
      'Animal Birth Control (ABC) Surgery',
      'Canine Hydrotherapy & Paralysis Rehab',
      'Adoption Coordination',
      'Cruelty Reporting & First Aid'
    ],
    facilities: [
      'Canine Paralysis Rehabilitation Unit',
      'Kitten Nursery',
      'Spacious Recovery Kennels',
      'Dedicated Rescue Van Fleet'
    ],
    doctors: [
      { name: 'Dr. Sudha Narayanan', qualification: 'Founder & Hon. Trustee', experience: '22+ yrs', specialization: 'Shelter Management & Welfare' },
      { name: 'Dr. Chetan Gowda', qualification: 'MVSc (Medicine)', experience: '11+ yrs', specialization: 'Trauma & Infectious Diseases' }
    ],
    about: 'CARE provides life-saving medical care and rehabilitation for abandoned, injured, and distressed street animals in Bengaluru. They run a 24/7 rescue helpline, shelter hospital, and specialized paralysis care center.',
    pricingEstimate: 'Free/Charitable for Community & Stray Animals | Voluntary donation welcome',
    demoNotice: 'Prototype Demo Listing — Modeled on recognized Bengaluru animal welfare trust.'
  },
  {
    id: 'cupa-second-chance',
    name: 'CUPA Second Chance Sanctuary & Clinic',
    tagline: 'Compassion Unlimited Plus Action — Rescue, Medical Care & Adoption',
    category: 'ngo',
    isVerified: true,
    rating: 4.7,
    reviewCount: 1650,
    area: 'Sarjapur Road / Koramangala',
    address: 'Silicon Town, Electronic City Post / Off Sarjapur Road, Bengaluru 560100',
    distanceKm: 8.2,
    coordinates: { lat: 12.8755, lng: 77.6710 },
    isEmergency24x7: false,
    isOpenNow: true,
    openingHours: '10:00 AM - 5:30 PM (Closed on Tuesdays)',
    phone: '+91 80 2294 7300',
    ambulancePhone: '+91 98450 12389',
    whatsapp: '+91 98450 12389',
    services: [
      'Geriatric Dog & Disabled Pet Hospice',
      'Stray Sterilization & Vaccinations',
      'Cruelty Case Rescue',
      'Adoption Counseling',
      'Subsidized Veterinary OPD'
    ],
    facilities: [
      'Open Run Yards',
      'Senior Dog Special Care Block',
      'Community Dog OPD Clinic'
    ],
    doctors: [
      { name: 'Dr. Sandhya Swaminathan', qualification: 'BVSc', experience: '14+ yrs', specialization: 'Preventive Medicine & ABC' }
    ],
    about: 'CUPA is one of South India’s oldest animal welfare organisations, offering sanctuary to abandoned senior dogs, community vaccination drives, and humane rescue operations across Bengaluru.',
    pricingEstimate: 'Subsidized OPD: ₹200 - ₹350 | Free for registered rescuers',
    demoNotice: 'Prototype Demo Listing — Modeled on CUPA Bengaluru.'
  },
  {
    id: 'vetic-indiranagar',
    name: 'Vetic Pet Clinic & Wellness Centre',
    tagline: 'Modern Veterinary Consultation, Diagnostics, Pharmacy & Grooming',
    category: 'vet',
    isVerified: true,
    rating: 4.8,
    reviewCount: 890,
    area: 'Indiranagar 100ft Road',
    address: '618, 100 Feet Rd, Defence Colony, Indiranagar, Bengaluru 560038',
    distanceKm: 1.4,
    coordinates: { lat: 12.9784, lng: 77.6408 },
    isEmergency24x7: false,
    isOpenNow: true,
    openingHours: '8:00 AM - 10:00 PM (Everyday)',
    phone: '+91 80 4718 8899',
    whatsapp: '+91 80 4718 8899',
    services: [
      'General Veterinary OPD',
      'Express In-House Blood Lab (Results in 20m)',
      'Ultrasonography & Digital X-Ray',
      'Dental Scaling & Hygiene',
      'Preventive Vaccinations & Microchipping',
      'Therapeutic Grooming'
    ],
    facilities: [
      'Sterile Examination Suites',
      'Cat-Friendly Waiting Lounge (Separate from dogs)',
      'App-Synced Health Records',
      'On-Site Pharmacy'
    ],
    doctors: [
      { name: 'Dr. Ananya Rao', qualification: 'MVSc (Medicine)', experience: '8+ yrs', specialization: 'Small Animal Internal Medicine' },
      { name: 'Dr. Kiran Deshmukh', qualification: 'BVSc & AH', experience: '6+ yrs', specialization: 'Dermatology & Nutrition' }
    ],
    about: 'Vetic offers clean, hospital-grade veterinary consultations with tech-enabled record keeping, quick blood testing, and gentle pet handling in the heart of East Bengaluru.',
    pricingEstimate: 'Consultation: ₹599 | Lab tests from ₹450',
    demoNotice: 'Prototype Demo Listing — Modeled on modern private clinics.'
  },
  {
    id: 'precise-koramangala',
    name: 'Precise Pet Clinic & Diagnostic Lab',
    tagline: 'Diagnostic Pathology, Specialized Surgery & Senior Pet Care',
    category: 'vet',
    isVerified: true,
    rating: 4.7,
    reviewCount: 730,
    area: 'Koramangala 4th Block',
    address: '92, 5th Cross Rd, 4th Block, Koramangala, Bengaluru 560034',
    distanceKm: 3.8,
    coordinates: { lat: 12.9344, lng: 77.6289 },
    isEmergency24x7: false,
    isOpenNow: true,
    openingHours: '9:30 AM - 1:30 PM, 5:00 PM - 8:30 PM (Mon-Sat)',
    phone: '+91 80 2553 4521',
    whatsapp: '+91 97412 88765',
    services: [
      'Comprehensive Pathology (CBC, Liver/Renal panels)',
      'Tick Fever Diagnostic Profiles',
      'Pre-surgical Cardiac Screening',
      'Senior Dog Arthritis Care',
      'Dermatology & Skin Allergy Testing'
    ],
    facilities: [
      'Advanced Mindray Hematology Analyzers',
      'Ultrasound Doppler',
      'Air-conditioned Day Observation Rooms'
    ],
    doctors: [
      { name: 'Dr. Ramesh B.S.', qualification: 'MVSc (Pathology)', experience: '16+ yrs', specialization: 'Veterinary Pathology & Oncology' }
    ],
    about: 'Known across Bengaluru for rigorous diagnostic workups, differential diagnosis for complex chronic ailments, and specialized geriatric care for aging companion animals.',
    pricingEstimate: 'Consultation: ₹500 | Comprehensive CBC + Renal: ₹1,400',
    demoNotice: 'Prototype Demo Listing — Modeled on Bengaluru diagnostic veterinary practices.'
  },
  {
    id: 'bangalore-pet-hospital-whitefield',
    name: 'Bangalore Pet Hospital & Trauma Centre',
    tagline: '24/7 Critical Care, In-Patient Hospitalization & Ambulance Service',
    category: 'emergency',
    isVerified: true,
    rating: 4.6,
    reviewCount: 1120,
    area: 'Whitefield Main Road',
    address: 'Plot 42, Outer Circle, Near Hope Farm Junction, Whitefield, Bengaluru 560066',
    distanceKm: 11.2,
    coordinates: { lat: 12.9830, lng: 77.7510 },
    isEmergency24x7: true,
    isOpenNow: true,
    openingHours: 'Open 24/7 (365 Days)',
    phone: '+91 80 4160 4111',
    ambulancePhone: '+91 96111 88772',
    whatsapp: '+91 96111 88772',
    services: [
      '24/7 Animal Ambulance (Oxygen equipped)',
      'Emergency Fracture Fixation & Orthopedics',
      'Overnight In-Patient Monitoring',
      'Snake Bite & Poisoning Management',
      'Blood Bank Liaison'
    ],
    facilities: [
      '2 Dedicated Mobile Ambulances',
      'Multiparameter Patient Monitors',
      'Intensive Care Ventilator'
    ],
    doctors: [
      { name: 'Dr. Vinod Sharma', qualification: 'MVSc (Surgery)', experience: '15+ yrs', specialization: 'Trauma & Orthopedic Reconstruction' },
      { name: 'Dr. Preethi Nair', qualification: 'BVSc & AH', experience: '7+ yrs', specialization: 'Emergency Medicine' }
    ],
    about: 'Equipped with rapid-response animal ambulances covering Whitefield, KR Puram, and Mahadevapura, providing emergency stabilization, fracture repair, and acute poisoning treatments around the clock.',
    pricingEstimate: 'Consultation: ₹700 | 24/7 Emergency: ₹1,500 | Ambulance: ₹1,200 base',
    demoNotice: 'Prototype Demo Listing — Modeled on Bengaluru suburban 24/7 animal hospitals.'
  },
  {
    id: 'pawsitive-ambulance-hsr',
    name: 'PawSitive Emergency Animal Ambulance',
    tagline: 'Dedicated Mobile Animal ICU & Critical Transit Services',
    category: 'emergency',
    isVerified: true,
    rating: 4.9,
    reviewCount: 512,
    area: 'HSR Layout / South Bengaluru',
    address: 'Sector 2, 27th Main Road, HSR Layout, Bengaluru 560102',
    distanceKm: 6.4,
    coordinates: { lat: 12.9116, lng: 77.6389 },
    isEmergency24x7: true,
    isOpenNow: true,
    openingHours: '24/7 Mobile Dispatch Across Bengaluru',
    phone: '+91 91080 55443',
    ambulancePhone: '+91 91080 55443',
    whatsapp: '+91 91080 55443',
    services: [
      'Emergency Transit to Closest Hospital',
      'On-Board Oxygen Therapy',
      'Stretcher & Spinal Immobilization for Hit-and-Run Cases',
      'Trained Vet Paramedic On-Board',
      'Stray Animal Rescue Transfer'
    ],
    facilities: [
      '3 GPS-Tracked High-Roof Ambulances',
      'Portable Suction Unit',
      'Temperature-Controlled Cabin'
    ],
    doctors: [
      { name: 'Vijay Anand (Lead Paramedic)', qualification: 'Certified Animal First Responder', experience: '10+ yrs', specialization: 'Field Triage & Trauma Transfer' }
    ],
    about: 'Bengaluru’s fastest non-profit-partnered animal ambulance fleet, specially modified with hydraulic boarding ramps, oxygen concentrators, and field triage kits for pet parents and volunteer street rescuers.',
    pricingEstimate: 'Subsidized for stray rescues (₹300 - ₹500) | Pet parents: ₹1,000 within 10 km',
    demoNotice: 'Prototype Demo Listing — Specialized emergency transit provider.'
  },
  {
    id: 'cat-studio-indiranagar',
    name: 'The Cat Studio & Feline Specialty Clinic',
    tagline: 'India’s Dedicated Low-Stress Feline-Only Medical & Boarding Sanctuary',
    category: 'vet',
    isVerified: true,
    rating: 4.9,
    reviewCount: 640,
    area: 'Indiranagar 12th Main',
    address: '437, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
    distanceKm: 1.8,
    coordinates: { lat: 12.9712, lng: 77.6419 },
    isEmergency24x7: false,
    isOpenNow: true,
    openingHours: '10:00 AM - 7:30 PM (Tues - Sun)',
    phone: '+91 80 4371 9022',
    whatsapp: '+91 98455 43210',
    services: [
      'Cat-Only Quiet Consultations (Zero Barking Stress)',
      'Feline Renal & Thyroid Management',
      'Gentle Low-Stress Handling & Pheromone Rooms',
      'Feline Dental Extraction & Stomatitis Care',
      'Boutique Vertical Cat Boarding Suites'
    ],
    facilities: [
      'Feliway Diffuser Infused Wards',
      'Cat Tree Observation Lounges',
      'Specialized Feline Diagnostic Micro-Sample Kits'
    ],
    doctors: [
      { name: 'Dr. Meera Krishnan', qualification: 'MVSc, ISFM Feline Medicine Certified', experience: '12+ yrs', specialization: 'Feline Internal Medicine' }
    ],
    about: 'Cats experience extreme sensory stress in mixed veterinary clinics. The Cat Studio is a quiet, dog-free sanctuary dedicated exclusively to feline health, kidney care, and luxury vertical boarding.',
    pricingEstimate: 'Feline Consult: ₹750 | Cat Boarding: ₹800/night',
    demoNotice: 'Prototype Demo Listing — Specialized niche feline provider.'
  },
  {
    id: 'maruthi-jayanagar',
    name: 'Maruthi Pet Clinic & Surgery Center',
    tagline: 'Trusted Neighborhood Vet Care, Vaccinations & Ultrasound',
    category: 'vet',
    isVerified: true,
    rating: 4.6,
    reviewCount: 940,
    area: 'Jayanagar 4th Block',
    address: '38, 11th Main, 4th Block, Jayanagar, Bengaluru 560011',
    distanceKm: 6.9,
    coordinates: { lat: 12.9298, lng: 77.5833 },
    isEmergency24x7: false,
    isOpenNow: true,
    openingHours: '9:00 AM - 1:00 PM, 4:30 PM - 8:30 PM (All days)',
    phone: '+91 80 2663 8812',
    whatsapp: '+91 94480 33211',
    services: [
      'General Health Checkups & Vaccinations',
      'Abdominal Ultrasound Scanning',
      'Minor Soft-Tissue Surgeries',
      'Neutering & Spaying',
      'Puppy Deworming & Diet Consultations'
    ],
    facilities: [
      'Ultrasound Diagnostics Room',
      'Post-op Recovery Area',
      'Dedicated Pet Food & Prescription Diet Corner'
    ],
    doctors: [
      { name: 'Dr. S. Venkatesh', qualification: 'BVSc & AH', experience: '20+ yrs', specialization: 'General Practice & Internal Medicine' }
    ],
    about: 'A staple in South Bengaluru for over two decades, known for empathetic, grounded care, practical treatment plans, and trusted preventive medicine for dogs and cats.',
    pricingEstimate: 'Consultation: ₹450 | Vaccination package: from ₹700',
    demoNotice: 'Prototype Demo Listing — Neighborhood family veterinary clinic.'
  },
  {
    id: 'woodstock-boarding-harlur',
    name: 'Woodstock Pet Boarding & Recovery Resort',
    tagline: 'Cage-Free Safe Boarding, Post-Op Care & Dog Swimming Pool',
    category: 'boarding',
    isVerified: true,
    rating: 4.8,
    reviewCount: 820,
    area: 'Harlur Road / Off Sarjapur Rd',
    address: 'Sy 49, Harlur Road, Near Amrita College, Off Sarjapur Road, Bengaluru 560102',
    distanceKm: 7.8,
    coordinates: { lat: 12.8992, lng: 77.6690 },
    isEmergency24x7: false,
    isOpenNow: true,
    openingHours: '8:00 AM - 8:00 PM (Check-in / Pick-up)',
    phone: '+91 98800 77665',
    whatsapp: '+91 98800 77665',
    services: [
      'Cage-Free Climate-Controlled Boarding Suites',
      'Post-Operative Foster & Wound Dressing Support',
      'Hydrotherapy & Recreational Swimming Pool',
      'Daily 3x Play Sessions & Video Updates for Parents',
      'Vet on Call 24/7'
    ],
    facilities: [
      '2-Acre Fenced Agility Grass Lawns',
      'Dedicated Filtered Pet Pool',
      '24/7 CCTV Access for Pet Parents',
      'Quarantine Foster Kennels'
    ],
    doctors: [
      { name: 'Kavitha R. (Head Caretaker)', qualification: 'Canine Behaviorist & First Aid Certified', experience: '9+ yrs', specialization: 'Canine Socialization & Post-Op Foster' }
    ],
    about: 'Designed for pet parents traveling out of station or needing peaceful recovery space for dogs healing from orthopedic surgery. Features trained caretakers, daily updates, and round-the-clock vet support.',
    pricingEstimate: 'Boarding: ₹900 - ₹1,200/day (includes meals & exercise) | Post-op care: ₹1,400/day',
    demoNotice: 'Prototype Demo Listing — Premium pet boarding and recovery.'
  },
  {
    id: 'sanjeevani-hebbal',
    name: 'Sanjeevani Animal Welfare & Rescue Trust',
    tagline: 'North Bengaluru Stray Rescue, Sterilization & Community First Aid',
    category: 'ngo',
    isVerified: true,
    rating: 4.7,
    reviewCount: 610,
    area: 'Hebbal / Bellary Road',
    address: 'Near Hebbal Flyover, Kempapura Main Rd, Bengaluru 560024',
    distanceKm: 9.8,
    coordinates: { lat: 13.0358, lng: 77.5970 },
    isEmergency24x7: true,
    isOpenNow: true,
    openingHours: 'Rescues: 24/7 Helpline | Clinic: 9:30 AM - 5:00 PM',
    phone: '+91 80 2362 9011',
    ambulancePhone: '+91 99800 44321',
    whatsapp: '+91 99800 44321',
    services: [
      'Stray Maggot Wound & Accident Triage',
      'North Bengaluru Animal Ambulance',
      'Rabies & Distemper Vaccination Drives',
      'Puppy Foster Care for Rescued Litters',
      'Community Feeder Support'
    ],
    facilities: [
      'Isolation Treatment Kennels',
      'Mobile First-Aid Van',
      'Free Rabies Ward'
    ],
    doctors: [
      { name: 'Dr. Harish K.', qualification: 'BVSc', experience: '13+ yrs', specialization: 'Wildlife & Stray Animal Medicine' }
    ],
    about: 'Serving North Bengaluru neighborhoods from Hebbal to Yelahanka with free community first-aid for injured strays, anti-rabies vaccination drives, and volunteer rescue coordination.',
    pricingEstimate: 'Charitable donations | Stray emergency assistance is free',
    demoNotice: 'Prototype Demo Listing — Community rescue and NGO service.'
  },
  {
    id: 'krupa-kengeri',
    name: 'Krupa Loving Dogs & Animal Hospital',
    tagline: 'Compassionate Care, Subsidized Surgeries & Rescuer Partner',
    category: 'ngo',
    isVerified: true,
    rating: 4.8,
    reviewCount: 880,
    area: 'Kengeri / Mysore Road',
    address: 'Mylasandra, Near RV College of Engineering, Mysore Rd, Bengaluru 560059',
    distanceKm: 13.1,
    coordinates: { lat: 12.9150, lng: 77.4980 },
    isEmergency24x7: false,
    isOpenNow: true,
    openingHours: '9:00 AM - 6:00 PM (Monday to Saturday)',
    phone: '+91 80 2860 1199',
    whatsapp: '+91 98450 77123',
    services: [
      'Subsidized Major & Minor Animal Surgeries',
      'Permanent Shelter for Abandoned Blind Dogs',
      'Veterinary Diagnostic OPD',
      'Vaccination & Deworming Camp',
      'Volunteer Foster Network'
    ],
    facilities: [
      'Special Care Blind Dog Sanctuary',
      'Subsidized Operation Theatre',
      'Recovery Cages'
    ],
    doctors: [
      { name: 'Dr. Geetha K.', qualification: 'MVSc (Surgery)', experience: '17+ yrs', specialization: 'Soft Tissue Surgery & Shelter Medicine' }
    ],
    about: 'Dedicated rescue haven in West Bengaluru focusing on elderly and blind dogs who cannot survive on the street, alongside low-cost surgical interventions for rescuer volunteers.',
    pricingEstimate: 'Subsidized OPD: ₹200 | Surgeries at non-profit cost',
    demoNotice: 'Prototype Demo Listing — Rescuer-focused sanctuary and clinic.'
  }
];

export const BENGALURU_AREAS = [
  'Indiranagar',
  'Koramangala',
  'Whitefield',
  'HSR Layout',
  'Jayanagar',
  'Domlur',
  'Hebbal',
  'Jakkur / Yelahanka'
];
