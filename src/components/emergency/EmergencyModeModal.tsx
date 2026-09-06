import React from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import {
  AlertOctagon,
  X,
  Phone,
  Shield,
  FileText,
  DollarSign,
  MapPin,
  Flame,
  Zap,
  Droplets,
  HeartPulse
} from 'lucide-react';

export const EmergencyModeModal: React.FC = () => {
  const { isEmergencyModalOpen, setIsEmergencyModalOpen, property, insurance } = useHomeOS();

  if (!isEmergencyModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) setIsEmergencyModalOpen(false);
    }}>
      <div className="modal-card" style={{
        maxWidth: '780px',
        padding: '36px',
        border: '2px solid #EF4444',
        backgroundColor: '#FFFFFF'
      }}>
        
        {/* Top Crisis Banner */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px',
          borderBottom: '2px solid #FEE2E2',
          paddingBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#FEF2F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#DC2626'
            }}>
              <AlertOctagon size={28} />
            </div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#991B1B', letterSpacing: '-0.02em' }}>
                🚨 Emergency Mode — Critical Household Sheet
              </h1>
              <div style={{ fontSize: '13px', color: '#B91C1C', marginTop: '2px', fontWeight: 600 }}>
                High-priority information for family members when the primary manager is unavailable.
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEmergencyModalOpen(false)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FEF2F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#991B1B'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Emergency Contacts Hotlist */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
            📞 Priority Emergency Contacts
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
            
            <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-md)', backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
              <div style={{ fontSize: '11px', color: '#991B1B', fontWeight: 700 }}>HOME INSURANCE HELPLINE</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#7F1D1D' }}>1800-22-9988</div>
              <div style={{ fontSize: '11px', color: '#B91C1C' }}>Policy #{insurance.policyNumber}</div>
            </div>

            <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-md)', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
              <div style={{ fontSize: '11px', color: '#1E40AF', fontWeight: 700 }}>SOCIETY SECURITY & OFFICE</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#1E3A8A' }}>+91 98220 55001</div>
              <div style={{ fontSize: '11px', color: '#2563EB' }}>Silver Oak Gate Guard</div>
            </div>

            <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-md)', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
              <div style={{ fontSize: '11px', color: '#92400E', fontWeight: 700 }}>VERIFIED ELECTRICIAN</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#78350F' }}>+91 98231 77209</div>
              <div style={{ fontSize: '11px', color: '#B45309' }}>Satish (Kalyani Nagar)</div>
            </div>

            <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-md)', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0' }}>
              <div style={{ fontSize: '11px', color: '#065F46', fontWeight: 700 }}>LOCAL PLUMBER</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#064E3B' }}>+91 98232 44102</div>
              <div style={{ fontSize: '11px', color: '#047857' }}>Ramesh (Society Apprvd)</div>
            </div>

          </div>
        </div>

        {/* Utility Shut-off Locations (Crucial for Home Emergency) */}
        <div style={{
          backgroundColor: '#F9FAFB',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          padding: '18px',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
            ⚡ Critical Utility Shutoff Locations
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} style={{ color: '#EAB308' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Main MCB Board</strong>
                <div style={{ color: 'var(--text-muted)' }}>Behind main entrance door</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Droplets size={18} style={{ color: '#3B82F6' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Master Water Valve</strong>
                <div style={{ color: 'var(--text-muted)' }}>Under utility balcony sink</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={18} style={{ color: '#EF4444' }} />
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Gas Pipeline Knob</strong>
                <div style={{ color: 'var(--text-muted)' }}>Below kitchen counter left</div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Sections Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px', fontSize: '13px' }}>
          
          {/* Property & Ownership */}
          <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-app)' }}>
            <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              🏠 Property Title & Deeds
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-secondary)' }}>
              <div>Flat: <strong>{property.flatNo}</strong></div>
              <div>Sale Deed No: <strong>HVN-4-9921-2023</strong></div>
              <div>PMC Tax ID: <strong>{property.propertyTaxId}</strong></div>
              <div>Electricity Meter: <strong>{property.electricityConsumerNo}</strong></div>
            </div>
          </div>

          {/* Active Loans & Dues */}
          <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-app)' }}>
            <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              💳 Banking & Home Loan
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-secondary)' }}>
              <div>Lender: <strong>State Bank of India (RACPC Pune)</strong></div>
              <div>Loan Acc: <strong>SBI-HL-3991049281</strong></div>
              <div>Monthly EMI: <strong>₹41,250 (Auto-Debit on 5th)</strong></div>
              <div>Insurance: <strong>Demo Insurance Co. (₹80L Cover)</strong></div>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <button
          onClick={() => setIsEmergencyModalOpen(false)}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
        >
          <span>Exit Emergency Mode</span>
        </button>

      </div>
    </div>
  );
};
