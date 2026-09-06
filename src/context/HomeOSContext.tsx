import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PropertyInfo,
  NeedAttentionItem,
  ApplianceItem,
  DocumentItem,
  MaintenanceItem,
  HomeMemoryEvent,
  ExpenseItem,
  InsurancePolicy,
  FamilyMember,
  HealthBreakdown,
  ChatMessage,
  ActiveTab,
  TrustBadgeType
} from '../types';

interface UploadingStep {
  label: string;
  done: boolean;
}

interface HomeOSContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  property: PropertyInfo;
  needsAttention: NeedAttentionItem[];
  appliances: ApplianceItem[];
  documents: DocumentItem[];
  maintenanceList: MaintenanceItem[];
  homeMemory: HomeMemoryEvent[];
  expenses: ExpenseItem[];
  insurance: InsurancePolicy;
  familyMembers: FamilyMember[];
  health: HealthBreakdown;
  chatMessages: ChatMessage[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Modals and Active Selections
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;
  isHealthModalOpen: boolean;
  setIsHealthModalOpen: (open: boolean) => void;
  isConflictModalOpen: boolean;
  setIsConflictModalOpen: (open: boolean) => void;
  selectedAppliance: ApplianceItem | null;
  setSelectedAppliance: (appliance: ApplianceItem | null) => void;
  selectedDocument: DocumentItem | null;
  setSelectedDocument: (doc: DocumentItem | null) => void;
  
  // Demo Mode & Onboarding
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  demoStep: number;
  setDemoStep: (step: number) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  activeNotification: string | null;
  setActiveNotification: (msg: string | null) => void;

  // AI Document Ingestion Pipeline
  isProcessingDoc: boolean;
  processingProgress: number;
  processingSteps: UploadingStep[];
  extractedDocData: any | null;
  docInsightAlert: string | null;
  setDocInsightAlert: (insight: string | null) => void;
  startDocumentIngestion: (type?: string) => void;
  confirmDocumentAddition: () => void;
  cancelDocumentIngestion: () => void;

  // AI Chat Engine
  sendMessageToAI: (query: string) => void;
  clearChat: () => void;

  // Actions
  resolveAttentionItem: (id: string) => void;
  addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void;
  resetToDefaultDemo: () => void;
}

const initialProperty: PropertyInfo = {
  id: 'prop-pune-01',
  name: 'Pune Apartment',
  type: 'Apartment',
  bhk: '2 BHK',
  location: 'Kalyani Nagar, Pune',
  city: 'Pune',
  state: 'Maharashtra',
  areaSqFt: 1050,
  ownership: 'Owner Occupied',
  pincode: '411006',
  electricityConsumerNo: 'MSEDCL-492019482',
  propertyTaxId: 'PMC-PTAX-2024-8819',
  societyName: 'Silver Oak Residences Co-op Hsg Soc',
  flatNo: 'A-402, 4th Floor',
  govVerified: true
};

const initialNeedsAttention: NeedAttentionItem[] = [
  {
    id: 'att-1',
    title: 'Electricity Bill',
    subtitle: 'Mahavitaran (MSEDCL) monthly billing cycle',
    category: 'urgent',
    amount: '₹1,840',
    dueInText: 'Due in 2 days',
    daysRemaining: 2,
    urgency: 'urgent',
    actionLabel: 'View Bill',
    actionTarget: 'view_bill',
    isResolved: false
  },
  {
    id: 'att-2',
    title: 'AC Service',
    subtitle: 'LG 1.5 Ton Split AC (Living Room)',
    category: 'maintenance',
    dueInText: 'Last serviced 6 months ago',
    daysRemaining: 0,
    urgency: 'attention',
    actionLabel: 'View Appliance',
    actionTarget: 'view_appliance_ac',
    assetId: 'app-ac-01',
    isResolved: false
  },
  {
    id: 'att-3',
    title: 'Home Insurance',
    subtitle: 'Demo Insurance Co. Comprehensive Policy',
    category: 'insurance',
    amount: '₹12,400/yr',
    dueInText: 'Expires in 18 days',
    daysRemaining: 18,
    urgency: 'attention',
    actionLabel: 'Review Policy',
    actionTarget: 'review_insurance',
    isResolved: false
  }
];

const initialAppliances: ApplianceItem[] = [
  {
    id: 'app-ac-01',
    name: 'LG 1.5 Ton Split AC',
    brand: 'LG',
    category: 'Air Conditioner',
    model: 'Dual Inverter AI Convertible 6-in-1 (MS-Q18YNZA)',
    purchaseDate: '15 June 2025',
    purchasePrice: 42999,
    warrantyPeriod: '2 Years Comprehensive (10Y Compressor)',
    warrantyExpires: '15 June 2027',
    warrantyStatus: 'active',
    lastServiceDate: '12 March 2026',
    nextServiceDue: 'September 2026 (Recommended now)',
    statusText: 'Service Due',
    isServiceDueNow: true,
    trustBadge: 'ai',
    icon: '❄️',
    locationInHome: 'Living Room',
    documents: [
      { id: 'doc-ac-inv', title: 'LG AC Purchase Invoice', type: 'Invoice', date: '15 June 2025', badge: 'ai' },
      { id: 'doc-ac-war', title: 'LG Warranty Certificate', type: 'Warranty Card', date: '15 June 2025', badge: 'ai' },
      { id: 'doc-ac-rec', title: 'Urban Company Service Receipt', type: 'Service Receipt', date: '12 March 2026', badge: 'user' }
    ],
    serviceHistory: [
      { id: 'srv-1', date: '12 March 2026', serviceType: 'AC Deep Clean & Filter Wash', cost: 1200, technician: 'CoolAir Solutions (Ramesh K.)', notes: 'Gas pressure optimal (130 PSI). Coil cleaned.' },
      { id: 'srv-2', date: '15 June 2025', serviceType: 'Initial Installation & Unboxing', cost: 1500, technician: 'LG Authorized Brand Partner' }
    ]
  },
  {
    id: 'app-ref-02',
    name: 'Samsung 253L Refrigerator',
    brand: 'Samsung',
    category: 'Refrigerator',
    model: 'Double Door Frost-Free Smart Connect (RT28T3742S8)',
    purchaseDate: '10 January 2024',
    purchasePrice: 28500,
    warrantyPeriod: '1 Year Comprehensive + 10Y Digital Inverter',
    warrantyExpires: '10 January 2034',
    warrantyStatus: 'active',
    lastServiceDate: '10 January 2024',
    nextServiceDue: 'Annual inspection due Jan 2027',
    statusText: 'Warranty Active',
    isServiceDueNow: false,
    trustBadge: 'user',
    icon: '🧊',
    locationInHome: 'Kitchen',
    documents: [
      { id: 'doc-ref-inv', title: 'Samsung Croma Invoice', type: 'Invoice', date: '10 Jan 2024', badge: 'user' },
      { id: 'doc-ref-war', title: 'Samsung Inverter Warranty', type: 'Warranty Card', date: '10 Jan 2024', badge: 'user' }
    ],
    serviceHistory: [
      { id: 'srv-3', date: '10 January 2024', serviceType: 'Home Delivery & Leveling Setup', cost: 0, technician: 'Croma Installation Team' }
    ]
  },
  {
    id: 'app-wm-03',
    name: 'IFB 7kg Front Load Washing Machine',
    brand: 'IFB',
    category: 'Washing Machine',
    model: 'Senator Smart Touch (7012S)',
    purchaseDate: '05 October 2022',
    purchasePrice: 34990,
    warrantyPeriod: '4 Years Super Warranty',
    warrantyExpires: '05 October 2026',
    warrantyStatus: 'expiring_soon',
    lastServiceDate: '28 August 2026',
    nextServiceDue: 'Routine descaling Dec 2026',
    statusText: 'Warranty expires in 30 days',
    isServiceDueNow: false,
    trustBadge: 'user',
    icon: '🧺',
    locationInHome: 'Utility Balcony',
    documents: [
      { id: 'doc-wm-inv', title: 'IFB Direct Tax Invoice', type: 'Invoice', date: '05 Oct 2022', badge: 'user' },
      { id: 'doc-wm-rec', title: 'Drain Pump Replacement Receipt', type: 'Service Receipt', date: '28 Aug 2026', badge: 'user' }
    ],
    serviceHistory: [
      { id: 'srv-4', date: '28 August 2026', serviceType: 'Drain Filter & Coin Trap Repair', cost: 850, technician: 'IFB Care Specialist (Anil P.)', notes: 'Replaced rubber gasket seal and cleared drain blockage.' }
    ]
  },
  {
    id: 'app-ro-04',
    name: 'Kent Grand Plus RO Water Purifier',
    brand: 'Kent',
    category: 'Water Purifier',
    model: 'RO + UV + UF + TDS Controller (11001)',
    purchaseDate: '20 February 2025',
    purchasePrice: 16200,
    warrantyPeriod: '1 Year + 3 Years Free Service',
    warrantyExpires: '20 February 2029',
    warrantyStatus: 'active',
    lastServiceDate: '20 August 2025',
    nextServiceDue: 'Filter replacement due in 12 days',
    statusText: 'Filter replacement due',
    isServiceDueNow: true,
    trustBadge: 'ai',
    icon: '💧',
    locationInHome: 'Kitchen',
    documents: [
      { id: 'doc-ro-inv', title: 'Kent Purifier Invoice', type: 'Invoice', date: '20 Feb 2025', badge: 'ai' }
    ],
    serviceHistory: [
      { id: 'srv-5', date: '20 August 2025', serviceType: 'Sediment & Carbon Pre-Filter Replacement', cost: 750, technician: 'Kent RO Express Care' }
    ]
  },
  {
    id: 'app-gy-05',
    name: 'Bajaj 15L Storage Geyser',
    brand: 'Bajaj',
    category: 'Water Heater',
    model: 'New Shakti Neo Plus (150338)',
    purchaseDate: '12 November 2024',
    purchasePrice: 8900,
    warrantyPeriod: '2 Years Product + 5 Years Tank',
    warrantyExpires: '12 November 2026',
    warrantyStatus: 'active',
    lastServiceDate: '12 November 2024',
    nextServiceDue: 'Annual safety check in 25 days',
    statusText: 'Checkup in 25 days',
    isServiceDueNow: false,
    trustBadge: 'user',
    icon: '🔥',
    locationInHome: 'Master Bathroom',
    documents: [
      { id: 'doc-gy-inv', title: 'Bajaj Electricals Invoice', type: 'Invoice', date: '12 Nov 2024', badge: 'user' }
    ],
    serviceHistory: [
      { id: 'srv-6', date: '12 November 2024', serviceType: 'Wall Mount & Plumbing Setup', cost: 450, technician: 'Local Electrician (Satish)' }
    ]
  }
];

const initialDocuments: DocumentItem[] = [
  {
    id: 'doc-p-01',
    title: 'Registered Sale Deed',
    category: 'Property',
    docType: 'Official Government Document',
    fileSize: '3.8 MB',
    uploadDate: '14 May 2023',
    trustBadge: 'gov',
    extractedDetails: {
      'Registration No': 'HVN-4-9921-2023',
      'Execution Date': '10 May 2023',
      'Buyer / Owner': 'Aafreen Mansoori',
      'Carpet Area': '1,050 sq.ft. (97.55 sq.m.)',
      'Sub-Registrar Office': 'Haveli No. 4, Pune',
      'Stamp Duty Paid': '₹3,67,500'
    }
  },
  {
    id: 'doc-p-02',
    title: 'Index II (Maharashtra Land Record)',
    category: 'Property',
    docType: 'IGR Maharashtra Certificate',
    fileSize: '1.2 MB',
    uploadDate: '14 May 2023',
    trustBadge: 'gov',
    extractedDetails: {
      'Survey No': 'C.T.S. No. 129/3B',
      'Village': 'Kalyani Nagar (Vadgaon Sheri)',
      'Built-up Area': '1,050 sq.ft.',
      'Verification Status': 'Digitally Signed by Sub-Registrar'
    }
  },
  {
    id: 'doc-p-03',
    title: 'Architect Floor Plan & Society Layout',
    category: 'Property',
    docType: 'CAD / Architectural Drawing',
    fileSize: '4.5 MB',
    uploadDate: '20 June 2024',
    trustBadge: 'conflict',
    hasConflict: true,
    conflictDetails: {
      sourceA: {
        label: 'Official Index II / Sale Deed',
        value: '1,050 sq.ft. Carpet Area',
        source: 'IGR Maharashtra Sub-Registrar',
        badge: 'gov'
      },
      sourceB: {
        label: 'User Uploaded Architect Layout',
        value: '1,400 sq.ft. Super Built-up Area',
        source: 'Uploaded by Aafreen on 20 June 2024',
        badge: 'user'
      },
      message: 'HomeOS detected differing area figures. Index II certifies 1,050 sq.ft. usable carpet area, while the architect plan quotes 1,400 sq.ft. super built-up. HomeOS does not decide which value is correct. Please verify through the official registered source.'
    },
    extractedDetails: {
      'Layout Unit': 'Flat A-402 (2 BHK)',
      'Quoted Floor Area': '1,400 sq.ft. (Includes Balcony & Common Ratio)',
      'Architect Studio': 'Urban Spaces Design Pune'
    }
  },
  {
    id: 'doc-p-04',
    title: 'Pune Municipal Corporation Property Tax Receipt',
    category: 'Property',
    docType: 'PMC Assessment Challan',
    fileSize: '890 KB',
    uploadDate: '05 Sept 2026',
    trustBadge: 'gov',
    extractedDetails: {
      'Receipt No': 'PMC-TX-2026-9921',
      'Assessed Owner': 'Aafreen Mansoori',
      'Financial Year': '2026-2027',
      'Amount Paid': '₹4,820',
      'Next Due Date': '31 March 2027'
    }
  },
  {
    id: 'doc-a-01',
    title: 'LG 1.5 Ton Split AC Tax Invoice',
    category: 'Appliances',
    docType: 'Retail Tax Invoice',
    fileSize: '1.4 MB',
    uploadDate: '15 June 2025',
    trustBadge: 'ai',
    extractedDetails: {
      'Product': 'LG 1.5 Ton 5 Star Split Inverter AC',
      'Invoice No': 'INV-LG-88391',
      'Purchase Date': '15 June 2025',
      'Purchase Price': '₹42,999 (Incl. GST)',
      'Warranty Period': '2 Years Comprehensive',
      'Warranty Expiration': '15 June 2027',
      'Store': 'Reliance Digital Pune'
    }
  },
  {
    id: 'doc-a-02',
    title: 'Samsung Refrigerator Warranty Card',
    category: 'Appliances',
    docType: 'Warranty Card & Proof of Purchase',
    fileSize: '1.1 MB',
    uploadDate: '10 Jan 2024',
    trustBadge: 'user',
    extractedDetails: {
      'Product': 'Samsung 253L Double Door Refrigerator',
      'Serial Number': 'SAM-RT28-9920194A',
      'Compressor Warranty': '10 Years (Valid till 2034)'
    }
  },
  {
    id: 'doc-a-03',
    title: 'IFB Washing Machine Bill & Service Note',
    category: 'Appliances',
    docType: 'Invoice & Service Slip',
    fileSize: '950 KB',
    uploadDate: '28 Aug 2026',
    trustBadge: 'user',
    extractedDetails: {
      'Service Event': 'Drain Pump Repair & Gasket',
      'Date': '28 August 2026',
      'Cost': '₹850',
      'Warranty Status': 'Expiring in 30 days (05 Oct 2026)'
    }
  },
  {
    id: 'doc-i-01',
    title: 'HomeOS Shield — Home Insurance Policy',
    category: 'Insurance',
    docType: 'Structure & Content Insurance Policy',
    fileSize: '2.4 MB',
    uploadDate: '15 Aug 2025',
    trustBadge: 'user',
    extractedDetails: {
      'Policy Number': 'HOM-PN-8891-2025',
      'Insurer': 'Demo Insurance Co. (General Insurance)',
      'Structure Coverage': '₹65,00,000',
      'Content Coverage': '₹15,00,000',
      'Annual Premium': '₹12,400',
      'Expiration Date': '24 September 2026'
    }
  },
  {
    id: 'doc-f-01',
    title: 'SBI Home Loan Sanction & Amortization Statement',
    category: 'Financial',
    docType: 'Banking Loan Statement',
    fileSize: '3.1 MB',
    uploadDate: '01 June 2023',
    trustBadge: 'user',
    extractedDetails: {
      'Bank': 'State Bank of India (RACPC Pune)',
      'Loan Account': 'SBI-HL-3991049281',
      'Sanctioned Amount': '₹48,00,000',
      'Interest Rate': '8.40% p.a. (EBLR Linked)',
      'Monthly EMI': '₹41,250'
    }
  }
];

const initialMaintenance: MaintenanceItem[] = [
  {
    id: 'm-01',
    title: 'AC Service (Pre-Festival Maintenance)',
    asset: 'LG 1.5 Ton Split AC',
    assetId: 'app-ac-01',
    dateText: 'Recommended now (6 mos since last service)',
    cost: 1200,
    technician: 'CoolAir Solutions / Urban Company',
    status: 'attention',
    category: 'Appliance Care',
    relatedDoc: 'LG AC Purchase Invoice'
  },
  {
    id: 'm-02',
    title: 'RO Membrane & Carbon Filter Replacement',
    asset: 'Kent Grand Plus RO',
    assetId: 'app-ro-04',
    dateText: 'Due in 12 days (18 Sept 2026)',
    cost: 1800,
    technician: 'Kent RO Certified Technician',
    status: 'attention',
    category: 'Water Quality',
    relatedDoc: 'Kent Purifier Invoice'
  },
  {
    id: 'm-03',
    title: 'Geyser Anode Rod & Thermostat Inspection',
    asset: 'Bajaj 15L Geyser',
    assetId: 'app-gy-05',
    dateText: 'Due in 25 days (01 Oct 2026)',
    cost: 600,
    technician: 'Local Plumber / Electrician',
    status: 'upcoming',
    category: 'Electrical & Plumbing'
  },
  {
    id: 'm-04',
    title: 'Washing Machine Drain Pump & Seal Repair',
    asset: 'IFB 7kg Washing Machine',
    assetId: 'app-wm-03',
    dateText: 'Completed on 28 Aug 2026',
    cost: 850,
    technician: 'IFB Authorized Service Center (Anil P.)',
    status: 'completed',
    category: 'Repair',
    relatedDoc: 'IFB Washing Machine Bill & Service Note'
  },
  {
    id: 'm-05',
    title: 'AC Pre-Summer Chemical Jet Wash',
    asset: 'LG 1.5 Ton Split AC',
    assetId: 'app-ac-01',
    dateText: 'Completed on 12 March 2026',
    cost: 1200,
    technician: 'Urban Company Pro Tech',
    status: 'completed',
    category: 'Routine Service',
    relatedDoc: 'Urban Company Service Receipt'
  }
];

const initialHomeMemory: HomeMemoryEvent[] = [
  {
    id: 'mem-1',
    date: '12 Sept 2026',
    title: 'AC Service Recommended',
    description: 'HomeOS detected 6 months elapsed since the last professional service of your LG 1.5 Ton AC.',
    type: 'ai_insight',
    badgeText: 'Proactive Alert',
    badgeType: 'ai'
  },
  {
    id: 'mem-2',
    date: '05 Sept 2026',
    title: 'Property Tax Paid',
    description: 'Pune Municipal Corporation annual assessment payment recorded.',
    type: 'tax',
    amount: 4820,
    badgeText: 'Gov Verified',
    badgeType: 'gov'
  },
  {
    id: 'mem-3',
    date: '28 Aug 2026',
    title: 'Washing Machine Repaired',
    description: 'IFB authorized technician replaced drain gasket and cleared coin filter.',
    type: 'maintenance',
    amount: 850,
    badgeText: 'User Logged',
    badgeType: 'user'
  },
  {
    id: 'mem-4',
    date: '15 Aug 2026',
    title: 'Home Insurance Renewal Alert Created',
    description: 'Annual policy renewal cycle logged for Demo Insurance Co. policy #HOM-PN-8891.',
    type: 'insurance',
    badgeText: 'Policy Active',
    badgeType: 'user'
  },
  {
    id: 'mem-5',
    date: '15 June 2025',
    title: 'LG 1.5 Ton Split AC Purchased',
    description: 'Invoice extracted via AI. 2-year warranty connected to Living Room zone.',
    type: 'purchase',
    amount: 42999,
    badgeText: 'AI Extracted',
    badgeType: 'ai'
  }
];

const initialExpenses: ExpenseItem[] = [
  { id: 'exp-1', category: 'Maintenance', amount: 3200, month: 'September 2026', date: '02 Sept 2026', note: 'AC service deposit & RO parts' },
  { id: 'exp-2', category: 'Electricity', amount: 1840, month: 'September 2026', date: '04 Sept 2026', note: 'MSEDCL Bill #4920' },
  { id: 'exp-3', category: 'Society', amount: 2500, month: 'September 2026', date: '01 Sept 2026', note: 'Silver Oak Monthly Maintenance' },
  { id: 'exp-4', category: 'Other', amount: 880, month: 'September 2026', date: '03 Sept 2026', note: 'Water filter cartridge spare' }
];

const initialInsurance: InsurancePolicy = {
  id: 'ins-01',
  title: 'HomeOS Comprehensive Shield Policy',
  provider: 'Demo Insurance Co.',
  policyNumber: 'HOM-PN-8891-2025',
  coverageAmount: '₹80,00,000 (Structure + Contents)',
  premium: '₹12,400 / year',
  expiresDate: '24 Sept 2026',
  daysRemaining: 18,
  status: 'approaching',
  coverageItems: [
    'Building Structure Protection (₹65L)',
    'Appliances & Electronics Fire/Short-circuit Cover (₹15L)',
    'Water Damage & Pipe Burst Shield',
    'Third-Party Household Liability (₹5L)'
  ]
};

const initialFamily: FamilyMember[] = [
  {
    id: 'fam-1',
    name: 'Aafreen Mansoori',
    relation: 'Self',
    role: 'Owner',
    accessDescription: 'Full Access — Property deeds, financials, AI permissions, and family controls.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'aafreen@homeos.local',
    phone: '+91 98230 44910',
    permissions: ['Manage Property', 'View Financials', 'AI Controls', 'Invite Members', 'Approve Payments']
  },
  {
    id: 'fam-2',
    name: 'Tariq Mansoori',
    relation: 'Father / Co-Owner',
    role: 'Owner',
    accessDescription: 'Full Access — Property records, society communications, and utility management.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'tariq.m@homeos.local',
    phone: '+91 98220 11984',
    permissions: ['Manage Property', 'View Bills', 'Maintenance Approvals']
  },
  {
    id: 'fam-3',
    name: 'Farida Mansoori',
    relation: 'Mother',
    role: 'Family Member',
    accessDescription: 'Bills + Property + Maintenance scheduling and technician coordination.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    email: 'farida.m@homeos.local',
    phone: '+91 98220 11985',
    permissions: ['View Bills', 'Schedule Maintenance', 'Appliance Access']
  },
  {
    id: 'fam-4',
    name: 'Zayan Mansoori',
    relation: 'Child / Student',
    role: 'Limited Access',
    accessDescription: 'Limited Access — Wi-Fi credentials, emergency contacts, and shared family calendar.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    email: 'zayan@homeos.local',
    phone: '+91 98220 99401',
    permissions: ['View Emergency Info', 'View Calendar']
  }
];

const initialHealth: HealthBreakdown = {
  overall: 86,
  documents: 92,
  bills: 100,
  maintenance: 78,
  insurance: 85,
  warranties: 94,
  statusText: 'Your home is mostly on track.',
  recommendations: [
    {
      id: 'rec-1',
      icon: '❄️',
      title: 'Schedule AC Routine Service',
      description: 'Your LG AC has gone 6 months without cleaning. Servicing restores 12% cooling efficiency.',
      pointsGain: 6,
      actionLabel: 'Book Service',
      actionTarget: 'view_appliance_ac'
    },
    {
      id: 'rec-2',
      icon: '🛡️',
      title: 'Renew Home Insurance Policy',
      description: 'Demo Insurance Co. policy expires in 18 days. Early renewal guarantees zero gap in coverage.',
      pointsGain: 5,
      actionLabel: 'Review Policy',
      actionTarget: 'review_insurance'
    },
    {
      id: 'rec-3',
      icon: '📄',
      title: 'Resolve Area Conflict in Architect Plan',
      description: 'Review discrepancy between Government Index II (1,050 sq.ft.) and Architect drawing (1,400 sq.ft.).',
      pointsGain: 3,
      actionLabel: 'View Conflict',
      actionTarget: 'open_conflict'
    }
  ]
};

const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: "Good morning, Aafreen! I am your HomeOS Assistant. I am grounded strictly in your Pune Apartment records. Ask me anything about your appliances, bills, insurance, warranties, or maintenance schedules.",
    timestamp: '9:00 AM'
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: "What needs my attention this week?",
    timestamp: '9:02 AM'
  },
  {
    id: 'msg-3',
    sender: 'ai',
    text: "Based on your home records, here are 3 items that require your attention:",
    timestamp: '9:02 AM',
    groundedIn: ['MSEDCL Electricity Record', 'LG AC Service History', 'Demo Insurance Policy #HOM-PN-8891'],
    structuredData: {
      heading: "Here's what needs your attention.",
      items: [
        {
          urgency: 'urgent',
          title: '1. Electricity Bill',
          details: '₹1,840 • Due in 2 days (MSEDCL)',
          actionText: 'Pay / View',
          actionTarget: 'view_bill'
        },
        {
          urgency: 'attention',
          title: '2. AC Service',
          details: 'LG 1.5 Ton AC • Last serviced 6 months ago',
          actionText: 'View Appliance',
          actionTarget: 'view_appliance_ac'
        },
        {
          urgency: 'attention',
          title: '3. Home Insurance',
          details: 'Demo Insurance Co. • Expires in 18 days (24 Sept 2026)',
          actionText: 'Review Policy',
          actionTarget: 'review_insurance'
        },
        {
          urgency: 'ok',
          title: 'Everything else is on track',
          details: 'Warranties, property tax, and society dues are verified.'
        }
      ],
      summaryBadge: '3 actions recommended',
      actionButtons: [
        { label: 'View All in Dashboard', actionTarget: 'go_dashboard' },
        { label: 'Mark Routine Tasks Done', actionTarget: 'mark_all_done' }
      ]
    }
  }
];

const HomeOSContext = createContext<HomeOSContextType | undefined>(undefined);

export const HomeOSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [property, setProperty] = useState<PropertyInfo>(initialProperty);
  const [needsAttention, setNeedsAttention] = useState<NeedAttentionItem[]>(initialNeedsAttention);
  const [appliances, setAppliances] = useState<ApplianceItem[]>(initialAppliances);
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [maintenanceList, setMaintenanceList] = useState<MaintenanceItem[]>(initialMaintenance);
  const [homeMemory, setHomeMemory] = useState<HomeMemoryEvent[]>(initialHomeMemory);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [insurance, setInsurance] = useState<InsurancePolicy>(initialInsurance);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(initialFamily);
  const [health, setHealth] = useState<HealthBreakdown>(initialHealth);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);
  const [selectedAppliance, setSelectedAppliance] = useState<ApplianceItem | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  
  // Demo Mode & Tour
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState(1);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  // AI Pipeline
  const [isProcessingDoc, setIsProcessingDoc] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingSteps, setProcessingSteps] = useState<UploadingStep[]>([
    { label: 'Document detected & uploaded', done: false },
    { label: 'Extracting OCR text & metadata', done: false },
    { label: 'Product identified: LG 1.5 Ton Split AC', done: false },
    { label: 'Purchase date identified: 15 June 2025', done: false },
    { label: 'Warranty detected: 2 Years (Active till 15 June 2027)', done: false },
    { label: 'Property relationship mapped: Pune Apartment → Appliances', done: false },
    { label: 'Home memory & proactive intelligence updated', done: false }
  ]);
  const [extractedDocData, setExtractedDocData] = useState<any | null>(null);
  const [docInsightAlert, setDocInsightAlert] = useState<string | null>(null);

  // Trigger notification auto-dismiss
  useEffect(() => {
    if (activeNotification) {
      const timer = setTimeout(() => setActiveNotification(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  // Start Document Ingestion Simulation
  const startDocumentIngestion = (type = 'sample_ac') => {
    setIsProcessingDoc(true);
    setProcessingProgress(10);
    setExtractedDocData(null);
    setDocInsightAlert(null);

    const steps = [
      { label: 'Document detected & uploaded', done: false },
      { label: 'Extracting OCR text & metadata', done: false },
      { label: 'Product identified: LG 1.5 Ton Split AC', done: false },
      { label: 'Purchase date identified: 15 June 2025', done: false },
      { label: 'Warranty detected: 2 Years (Active till 15 June 2027)', done: false },
      { label: 'Property relationship mapped: Pune Apartment → Appliances', done: false },
      { label: 'Home memory & proactive intelligence updated', done: false }
    ];
    setProcessingSteps(steps);

    // Step-by-step pipeline animation
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progressPercent = Math.min(100, Math.round((currentStep / steps.length) * 100));
      setProcessingProgress(progressPercent);

      setProcessingSteps(prev => 
        prev.map((step, idx) => ({
          ...step,
          done: idx < currentStep
        }))
      );

      if (currentStep >= steps.length) {
        clearInterval(interval);
        setIsProcessingDoc(false);
        setExtractedDocData({
          title: 'LG 1.5 Ton Split AC Invoice',
          product: 'LG 1.5 Ton Split AC',
          category: 'Air Conditioner',
          brand: 'LG',
          model: 'Dual Inverter AI 6-in-1',
          purchaseDate: '15 June 2025',
          purchasePrice: '₹42,999',
          warranty: '2 Years Comprehensive',
          warrantyExpires: '15 June 2027',
          confidence: '96%',
          trustBadge: 'ai' as TrustBadgeType,
          destination: 'Pune Apartment → Appliances → AC'
        });
      }
    }, 450);
  };

  const confirmDocumentAddition = () => {
    // Add document to state if not present
    const newDoc: DocumentItem = {
      id: `doc-ac-${Date.now()}`,
      title: 'LG 1.5 Ton Split AC Invoice',
      category: 'Appliances',
      docType: 'Retail Tax Invoice',
      fileSize: '1.4 MB',
      uploadDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      trustBadge: 'ai',
      extractedDetails: {
        'Product': 'LG 1.5 Ton 5 Star Split Inverter AC',
        'Purchase Date': '15 June 2025',
        'Purchase Price': '₹42,999',
        'Warranty Expires': '15 June 2027'
      }
    };

    setDocuments(prev => [newDoc, ...prev.filter(d => d.title !== newDoc.title)]);

    // Generate Home Memory Event
    const newMemory: HomeMemoryEvent = {
      id: `mem-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      title: 'LG 1.5 Ton AC Connected to Home Twin',
      description: 'AI Extracted from invoice. Added to living room zone with 2-year warranty.',
      type: 'purchase',
      amount: 42999,
      badgeText: 'AI Extracted',
      badgeType: 'ai'
    };
    setHomeMemory(prev => [newMemory, ...prev]);

    // Show AI Insight
    setDocInsightAlert(
      "Your LG AC has been in use for approximately 6 months since its last recorded service. Consider scheduling maintenance soon."
    );

    setActiveNotification('✨ Document understood and connected to your Digital Home Twin!');
    setIsUploadModalOpen(false);
  };

  const cancelDocumentIngestion = () => {
    setIsProcessingDoc(false);
    setProcessingProgress(0);
    setExtractedDocData(null);
    setIsUploadModalOpen(false);
  };

  // Resolve an attention item
  const resolveAttentionItem = (id: string) => {
    setNeedsAttention(prev => prev.map(item => item.id === id ? { ...item, isResolved: true } : item));
    setActiveNotification('Item marked as completed and recorded in Home Memory.');
    setHealth(prev => ({
      ...prev,
      overall: Math.min(100, prev.overall + 4)
    }));
  };

  const addFamilyMember = (member: Omit<FamilyMember, 'id'>) => {
    const newMember: FamilyMember = {
      ...member,
      id: `fam-${Date.now()}`
    };
    setFamilyMembers(prev => [...prev, newMember]);
    setActiveNotification(`Added ${member.name} to Family Access with ${member.role} privileges.`);
  };

  // Grounded AI Chat Assistant response generator
  const sendMessageToAI = (query: string) => {
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);

    const lower = query.toLowerCase();
    setTimeout(() => {
      let aiMsg: ChatMessage;

      if (lower.includes('attention') || lower.includes('this week') || lower.includes('urgent') || lower.includes('need')) {
        aiMsg = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: "Based on your home records, here are the key items that need your attention this week:",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          groundedIn: ['MSEDCL Electricity Account', 'LG AC Maintenance Log', 'Demo Insurance Policy #HOM-PN-8891'],
          structuredData: {
            heading: "Here's what needs your attention.",
            items: [
              { urgency: 'urgent', title: '1. Electricity Bill', details: '₹1,840 • Due in 2 days (MSEDCL)', actionText: 'Pay / View', actionTarget: 'view_bill' },
              { urgency: 'attention', title: '2. AC Service', details: 'LG 1.5 Ton AC • Last serviced 6 months ago', actionText: 'View Appliance', actionTarget: 'view_appliance_ac' },
              { urgency: 'attention', title: '3. Home Insurance', details: 'Demo Insurance Co. • Expires in 18 days (24 Sept 2026)', actionText: 'Review Policy', actionTarget: 'review_insurance' }
            ],
            summaryBadge: '3 actions recommended',
            actionButtons: [
              { label: 'View in Dashboard', actionTarget: 'go_dashboard' },
              { label: 'View Appliance Care', actionTarget: 'go_appliances' }
            ]
          }
        };
      } else if (lower.includes('ac') || lower.includes('air conditioner') || lower.includes('serviced')) {
        aiMsg = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: "I found this in your AC service history: Your LG 1.5 Ton Split AC was last serviced on 12 March 2026 (₹1,200, Urban Company). It has been 6 months since then, and HomeOS recommends a seasonal tune-up now.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          groundedIn: ['LG AC Invoice (15 Jun 2025)', 'Service Receipt #UC-88291 (12 Mar 2026)'],
          structuredData: {
            heading: 'LG 1.5 Ton Split AC Status',
            items: [
              { urgency: 'attention', title: 'Next Recommended Service', details: 'September 2026 (Due now)' },
              { urgency: 'ok', title: 'Warranty Status', details: 'Active till 15 June 2027 (2-Year Comprehensive)' },
              { urgency: 'ok', title: 'Purchase Price', details: '₹42,999 (Reliance Digital)' }
            ],
            actionButtons: [
              { label: 'Open AC Details', actionTarget: 'view_appliance_ac' }
            ]
          }
        };
      } else if (lower.includes('warranty') || lower.includes('warranties') || lower.includes('expire')) {
        aiMsg = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: "Based on your uploaded warranty documents, here is the breakdown of your appliance warranties:",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          groundedIn: ['IFB Washing Machine Invoice', 'LG AC Warranty Card', 'Samsung Inverter Certificate', 'Kent RO Warranty'],
          structuredData: {
            heading: 'Household Warranty Timeline',
            items: [
              { urgency: 'attention', title: 'IFB Washing Machine', details: 'Expires in 30 days (05 Oct 2026)' },
              { urgency: 'ok', title: 'LG 1.5 Ton AC', details: 'Active till 15 June 2027' },
              { urgency: 'ok', title: 'Kent Grand Plus RO', details: 'Active till 20 Feb 2029 (Free service)' },
              { urgency: 'ok', title: 'Samsung Refrigerator', details: 'Compressor covered till 10 Jan 2034' }
            ]
          }
        };
      } else if (lower.includes('spend') || lower.includes('spent') || lower.includes('expense') || lower.includes('cost') || lower.includes('repairs')) {
        aiMsg = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: "Based on your recorded home expenses for this month (September 2026), you have spent ₹8,420 total across household categories.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          groundedIn: ['September 2026 Home Expense Ledger', 'Urban Company Receipts', 'PMC Tax Receipt'],
          structuredData: {
            heading: 'Monthly Home Expenditure (₹8,420)',
            items: [
              { urgency: 'attention', title: 'Maintenance & Repairs', details: '₹3,200 (18% above typical monthly average)' },
              { urgency: 'ok', title: 'Society Maintenance', details: '₹2,500' },
              { urgency: 'ok', title: 'Electricity (MSEDCL)', details: '₹1,840' },
              { urgency: 'ok', title: 'Other Supplies', details: '₹880' }
            ]
          }
        };
      } else if (lower.includes('property') || lower.includes('documents') || lower.includes('tax') || lower.includes('deed')) {
        aiMsg = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: "Your uploaded property records show that your Pune Apartment (Flat A-402, Kalyani Nagar) is fully registered. Your Property Tax of ₹4,820 for 2026-27 was paid on 05 Sept 2026.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          groundedIn: ['Sale Deed #HVN-4-9921', 'PMC Property Tax Receipt #PMC-TX-2026-9921', 'Index II Certificate'],
          structuredData: {
            heading: 'Property & Tax Records',
            items: [
              { urgency: 'ok', title: 'Registered Sale Deed', details: 'Verified by Sub-Registrar Haveli No. 4' },
              { urgency: 'ok', title: 'Property Tax 2026-27', details: 'Paid ₹4,820 (Next due March 2027)' },
              { urgency: 'attention', title: 'Area Conflict Noted', details: 'Official Index II: 1,050 sq.ft. vs Floor Plan: 1,400 sq.ft.' }
            ]
          }
        };
      } else {
        aiMsg = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: "I don't have enough information in your HomeOS records to answer that specifically yet. You can upload relevant receipts, invoices, or utility bills anytime, and I will understand and remember them for you.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }

      setChatMessages(prev => [...prev, aiMsg]);
    }, 500);
  };

  const clearChat = () => {
    setChatMessages([initialChatMessages[0]]);
  };

  const resetToDefaultDemo = () => {
    setProperty(initialProperty);
    setNeedsAttention(initialNeedsAttention);
    setAppliances(initialAppliances);
    setDocuments(initialDocuments);
    setMaintenanceList(initialMaintenance);
    setHomeMemory(initialHomeMemory);
    setExpenses(initialExpenses);
    setInsurance(initialInsurance);
    setFamilyMembers(initialFamily);
    setHealth(initialHealth);
    setChatMessages(initialChatMessages);
    setActiveNotification('✨ Demo data reset to pristine Pune 2 BHK apartment state.');
  };

  return (
    <HomeOSContext.Provider
      value={{
        activeTab,
        setActiveTab,
        property,
        needsAttention,
        appliances,
        documents,
        maintenanceList,
        homeMemory,
        expenses,
        insurance,
        familyMembers,
        health,
        chatMessages,
        searchQuery,
        setSearchQuery,
        isUploadModalOpen,
        setIsUploadModalOpen,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isHealthModalOpen,
        setIsHealthModalOpen,
        isConflictModalOpen,
        setIsConflictModalOpen,
        selectedAppliance,
        setSelectedAppliance,
        selectedDocument,
        setSelectedDocument,
        isDemoMode,
        setIsDemoMode,
        demoStep,
        setDemoStep,
        isOnboardingOpen,
        setIsOnboardingOpen,
        activeNotification,
        setActiveNotification,
        isProcessingDoc,
        processingProgress,
        processingSteps,
        extractedDocData,
        docInsightAlert,
        setDocInsightAlert,
        startDocumentIngestion,
        confirmDocumentAddition,
        cancelDocumentIngestion,
        sendMessageToAI,
        clearChat,
        resolveAttentionItem,
        addFamilyMember,
        resetToDefaultDemo
      }}
    >
      {children}
    </HomeOSContext.Provider>
  );
};

export const useHomeOS = () => {
  const context = useContext(HomeOSContext);
  if (!context) {
    throw new Error('useHomeOS must be used within a HomeOSProvider');
  }
  return context;
};
