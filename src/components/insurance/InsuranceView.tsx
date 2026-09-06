import React, { useState } from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import { Shield, AlertTriangle, CheckCircle2, FileText, ArrowRight, Check } from 'lucide-react';
import { TrustBadge } from '../common/TrustBadge';

export const InsuranceView: React.FC = () => {
  const { insurance, setActiveTab } = useHomeOS();
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '26px' }}>🛡️</span>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Home & Content Insurance
            </h1>
          </div>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Comprehensive risk coverage for Pune Apartment structure, appliances, and contents.
          </p>
        </div>

        <button
          onClick={() => setIsRenewModalOpen(true)}
          className="btn-ai"
        >
          <span>Renew Policy (Zero Gap)</span>
        </button>
      </div>

      {/* Main Insurance Policy Card */}
      <div className="card-clean" style={{
        padding: '28px',
        border: '1px solid #FDE68A',
        backgroundColor: '#FFFDF5',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>🛡️</span>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {insurance.title}
              </h2>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Provider: {insurance.provider} • Policy #{insurance.policyNumber}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid #FDE68A'
            }}>
              🟡 Renewal Approaching ({insurance.daysRemaining} days left)
            </span>
          </div>
        </div>

        {/* Policy Details Grid */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #FDE68A',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          fontSize: '13px'
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Annual Premium</span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{insurance.premium}</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Coverage Amount</span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669' }}>{insurance.coverageAmount}</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Policy Expiration</span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#DC2626' }}>{insurance.expiresDate}</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Insured Asset</span>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Pune Apartment (2 BHK)</div>
          </div>
        </div>

        {/* Coverage Checklist */}
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '12px' }}>
            Active Coverage Inclusions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
            {insurance.coverageItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}
              >
                <CheckCircle2 size={16} style={{ color: '#059669', flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review Action */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
          <button
            onClick={() => setIsRenewModalOpen(true)}
            className="btn-primary"
            style={{ padding: '12px 24px', fontSize: '14px' }}
          >
            <span>Review Policy Document</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Review Policy Modal */}
      {isRenewModalOpen && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setIsRenewModalOpen(false);
        }}>
          <div className="modal-card" style={{ maxWidth: '580px', padding: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
              🛡️ Policy Review & Instant Renewal
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Your current structure & contents policy expires in 18 days (24 Sept 2026). Renewing early preserves continuous no-claim protection.
            </p>

            <div style={{
              backgroundColor: 'var(--bg-app)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '13px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Insurer:</span>
                <strong>Demo Insurance Co.</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Renewal Term:</span>
                <strong>25 Sept 2026 — 24 Sept 2027</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Premium Due:</span>
                <strong style={{ fontSize: '16px', color: 'var(--text-primary)' }}>₹12,400</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  alert('Renewal confirmed! Digital Home Twin memory updated with 2026-2027 insurance shield.');
                  setIsRenewModalOpen(false);
                }}
                className="btn-ai"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Check size={16} />
                <span>Confirm & Pay Premium</span>
              </button>
              <button
                onClick={() => setIsRenewModalOpen(false)}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
