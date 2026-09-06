import React from 'react';
import { Landmark, ShieldCheck, CheckCircle2, Clock, Info, ExternalLink } from 'lucide-react';
import { TrustBadge } from '../common/TrustBadge';

export const GovernmentIntegrationView: React.FC = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '26px' }}>🏛️</span>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Government Verified Records Hub
            </h1>
          </div>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Future integration architecture for sovereign digital credentials and land registries.
          </p>
        </div>

        <span style={{
          fontSize: '12px',
          fontWeight: 700,
          backgroundColor: '#EEF2FF',
          color: '#4338CA',
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid #C7D2FE'
        }}>
          🚀 Conceptual Architecture (Future Roadmap)
        </span>
      </div>

      {/* Clear Governance Disclaimer (Rule 41 Requirement) */}
      <div style={{
        backgroundColor: '#EFF6FF',
        border: '1px solid #BFDBFE',
        borderRadius: 'var(--radius-lg)',
        padding: '18px 22px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <Info size={20} style={{ color: '#2563EB', flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '13px', color: '#1E40AF', lineHeight: 1.5 }}>
          <strong>Government systems remain the sovereign source of truth.</strong><br />
          HomeOS does not replace official registries; it acts as a citizen-side cognitive bridge to help households understand, organize, and proactively act on verified legal records.
        </div>
      </div>

      {/* Integration Pipelines */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* DigiLocker */}
        <div className="card-clean" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>🇮🇳</span>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  DigiLocker Integration
                </h3>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>National Digital Wallet (MeitY)</div>
              </div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#D97706', backgroundColor: '#FFFBEB', padding: '3px 8px', borderRadius: 'var(--radius-full)' }}>
              Coming Soon
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
            Direct cryptographic pull of Aadhar-linked property deeds, vehicle registrations, and municipal receipts into Home Memory.
          </p>
          <div style={{ fontSize: '12px', color: '#047857', fontWeight: 600 }}>
            ✓ Verified document authenticity via PKI signature
          </div>
        </div>

        {/* Mahabhulekh / IGR Maharashtra */}
        <div className="card-clean" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>📜</span>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Mahabhulekh & IGR Maharashtra
                </h3>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Inspector General of Registration</div>
              </div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#D97706', backgroundColor: '#FFFBEB', padding: '3px 8px', borderRadius: 'var(--radius-full)' }}>
              Coming Soon
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
            Real-time title verification against Survey numbers, 7/12 extracts, and Index II registration records in Pune and across Maharashtra.
          </p>
          <div style={{ fontSize: '12px', color: '#047857', fontWeight: 600 }}>
            ✓ Automatic encumbrance and mortgage tracking
          </div>
        </div>

        {/* PMC Municipal Tax Portal */}
        <div className="card-clean" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>🏢</span>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Pune Municipal Corporation (PMC)
                </h3>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Property Tax & Assessment Engine</div>
              </div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#D97706', backgroundColor: '#FFFBEB', padding: '3px 8px', borderRadius: 'var(--radius-full)' }}>
              Coming Soon
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
            Automated billing sync for property tax assessment ID PMC-PTAX-2024-8819 with 1-click payment and receipt extraction.
          </p>
          <div style={{ fontSize: '12px', color: '#047857', fontWeight: 600 }}>
            ✓ Early payment rebate reminders (up to 10% savings)
          </div>
        </div>

      </div>

    </div>
  );
};
