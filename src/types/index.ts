export type TrustBadgeType = 'gov' | 'user' | 'ai' | 'attention' | 'conflict' | 'unverified';

export interface PropertyInfo {
  id: string;
  name: string;
  type: string;
  bhk: string;
  location: string;
  city: string;
  state: string;
  areaSqFt: number;
  ownership: string;
  pincode: string;
  electricityConsumerNo: string;
  propertyTaxId: string;
  societyName: string;
  flatNo: string;
  govVerified: boolean;
}

export interface NeedAttentionItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'urgent' | 'maintenance' | 'insurance' | 'bill' | 'warranty';
  amount?: string;
  dueInText: string;
  daysRemaining?: number;
  urgency: 'urgent' | 'attention' | 'normal';
  actionLabel: string;
  actionTarget: string; // e.g. 'view_bill' | 'view_appliance_ac' | 'review_insurance'
  assetId?: string;
  isResolved?: boolean;
}

export interface ApplianceDocument {
  id: string;
  title: string;
  type: 'Invoice' | 'Warranty Card' | 'Service Receipt';
  date: string;
  badge: TrustBadgeType;
}

export interface ServiceHistoryItem {
  id: string;
  date: string;
  serviceType: string;
  cost: number;
  technician: string;
  notes?: string;
}

export interface ApplianceItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  model: string;
  purchaseDate: string;
  purchasePrice: number;
  warrantyPeriod: string;
  warrantyExpires: string;
  warrantyStatus: 'active' | 'expiring_soon' | 'expired';
  lastServiceDate: string;
  nextServiceDue: string;
  statusText: string;
  isServiceDueNow: boolean;
  trustBadge: TrustBadgeType;
  icon: string;
  documents: ApplianceDocument[];
  serviceHistory: ServiceHistoryItem[];
  locationInHome: string;
}

export interface ConflictDetails {
  sourceA: {
    label: string;
    value: string;
    source: string;
    badge: TrustBadgeType;
  };
  sourceB: {
    label: string;
    value: string;
    source: string;
    badge: TrustBadgeType;
  };
  message: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Property' | 'Appliances' | 'Insurance' | 'Financial';
  docType: string;
  fileSize: string;
  uploadDate: string;
  trustBadge: TrustBadgeType;
  extractedDetails?: Record<string, string>;
  hasConflict?: boolean;
  conflictDetails?: ConflictDetails;
}

export interface MaintenanceItem {
  id: string;
  title: string;
  asset: string;
  assetId: string;
  dateText: string;
  cost: number;
  technician: string;
  status: 'attention' | 'upcoming' | 'completed';
  category: string;
  relatedDoc?: string;
}

export interface HomeMemoryEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'maintenance' | 'tax' | 'purchase' | 'insurance' | 'bill' | 'ai_insight';
  amount?: number;
  badgeText?: string;
  badgeType?: TrustBadgeType;
}

export interface ExpenseItem {
  id: string;
  category: 'Maintenance' | 'Electricity' | 'Society' | 'Other';
  amount: number;
  month: string;
  date: string;
  note: string;
}

export interface InsurancePolicy {
  id: string;
  title: string;
  provider: string;
  policyNumber: string;
  coverageAmount: string;
  premium: string;
  expiresDate: string;
  daysRemaining: number;
  status: 'approaching' | 'active';
  coverageItems: string[];
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  role: 'Owner' | 'Family Member' | 'Limited Access';
  accessDescription: string;
  avatar: string;
  email: string;
  phone: string;
  permissions: string[];
}

export interface HealthBreakdown {
  overall: number;
  documents: number;
  bills: number;
  maintenance: number;
  insurance: number;
  warranties: number;
  statusText: string;
  recommendations: Array<{
    id: string;
    icon: string;
    title: string;
    description: string;
    pointsGain: number;
    actionLabel: string;
    actionTarget: string;
  }>;
}

export interface StructuredAiItem {
  urgency: 'urgent' | 'attention' | 'ok';
  title: string;
  details: string;
  actionText?: string;
  actionTarget?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  structuredData?: {
    heading: string;
    items: StructuredAiItem[];
    summaryBadge?: string;
    actionButtons?: Array<{ label: string; actionTarget: string }>;
  };
  groundedIn?: string[];
}

export type ActiveTab = 
  | 'dashboard'
  | 'twin'
  | 'documents'
  | 'maintenance'
  | 'appliances'
  | 'expenses'
  | 'insurance'
  | 'calendar'
  | 'family'
  | 'assistant'
  | 'settings'
  | 'health_detail'
  | 'future_gov';
