import React from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import { AlertTriangle, X, ShieldCheck, User, Info, Check } from 'lucide-react';
import { TrustBadge } from '../common/TrustBadge';

export const ConflictModal: React.FC = () => {
  const { isConflictModalOpen, setIsConflictModalOpen } = useHomeOS();

  if (!isConflictModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) setIsConflictModalOpen(false);
    }}>
      <div className="modal-card" style={{ maxWidth: '600px', padding: '32px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#FEF2F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#DC2626'
            }}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                ⚠️ Information Conflict Detected
              </h2>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                HomeOS Responsible AI Verification System
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsConflictModalOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-app)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Conflict Description */}
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
          We detected conflicting property-area values across your stored documents for <strong>Flat A-402, Pune Apartment</strong>:
        </div>

        {/* Source Comparison Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          {/* Source A: Government Record */}
          <div style={{
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: 'var(--radius-md)',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#065F46' }}>Source A (Official)</span>
              <TrustBadge type="gov" size="sm" />
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#065F46' }}>
              1,050 sq.ft.
            </div>
            <div style={{ fontSize: '11px', color: '#047857', marginTop: '6px' }}>
              Carpet Area certified in Registered Sale Deed & Index II (IGR Maharashtra).
            </div>
          </div>

          {/* Source B: User Uploaded Document */}
          <div style={{
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            borderRadius: 'var(--radius-md)',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#1E40AF' }}>Source B (Uploaded)</span>
              <TrustBadge type="user" size="sm" />
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#1E40AF' }}>
              1,400 sq.ft.
            </div>
            <div style={{ fontSize: '11px', color: '#1D4ED8', marginTop: '6px' }}>
              Super Built-up Area noted in Architect Layout / Society Brochure drawing.
            </div>
          </div>
        </div>

        {/* Ethical / Responsible AI Disclaimer */}
        <div style={{
          backgroundColor: '#FFFBEB',
          border: '1px solid #FDE68A',
          borderRadius: 'var(--radius-md)',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          marginBottom: '24px'
        }}>
          <Info size={18} style={{ color: '#D97706', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '12px', color: '#92400E', lineHeight: 1.4 }}>
            <strong>HomeOS does not decide which value is correct.</strong><br />
            Government systems remain the legal source of truth for taxation and title. The user-provided layout reflects super built-up common areas. Please verify through the official sub-registrar source.
          </div>
        </div>

        <button
          onClick={() => setIsConflictModalOpen(false)}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <Check size={16} />
          <span>I Understand — Keep Both Sources Flagged</span>
        </button>

      </div>
    </div>
  );
};
