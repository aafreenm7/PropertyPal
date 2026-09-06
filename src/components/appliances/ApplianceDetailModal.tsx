import React from 'react';
import { ApplianceItem } from '../../types';
import {
  X,
  Calendar,
  Wrench,
  FileText,
  ShieldCheck,
  Sparkles,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { TrustBadge } from '../common/TrustBadge';

interface Props {
  appliance: ApplianceItem;
  onClose: () => void;
  onBookService?: () => void;
}

export const ApplianceDetailModal: React.FC<Props> = ({ appliance, onClose, onBookService }) => {
  return (
    <div className="modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal-card" style={{ maxWidth: '680px', padding: '32px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: '#EEF2FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              boxShadow: '0 2px 8px rgba(99, 102, 241, 0.15)'
            }}>
              {appliance.icon}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {appliance.name}
                </h2>
                <TrustBadge type={appliance.trustBadge} size="sm" />
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {appliance.locationInHome} • Model: {appliance.model}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
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

        {/* Status / Warranty Banner */}
        <div style={{
          backgroundColor: appliance.isServiceDueNow ? '#FFFBEB' : '#ECFDF5',
          border: `1px solid ${appliance.isServiceDueNow ? '#FDE68A' : '#A7F3D0'}`,
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>{appliance.isServiceDueNow ? '⚠️' : '🟢'}</span>
            <span style={{
              fontSize: '13px',
              fontWeight: 700,
              color: appliance.isServiceDueNow ? '#92400E' : '#065F46'
            }}>
              {appliance.warrantyStatus === 'active' ? '🟢 Warranty Active' : '🟡 Warranty Expiring Soon'}
            </span>
          </div>
          <span style={{
            fontSize: '12px',
            fontWeight: 700,
            color: appliance.isServiceDueNow ? '#B45309' : '#047857'
          }}>
            Next Service: {appliance.nextServiceDue}
          </span>
        </div>

        {/* Core Specs Grid */}
        <div style={{
          backgroundColor: '#F9FAFB',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          padding: '16px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          fontSize: '13px',
          marginBottom: '24px'
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Purchase Date</span>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{appliance.purchaseDate}</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Purchase Price</span>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{appliance.purchasePrice.toLocaleString('en-IN')}</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Warranty Period</span>
            <div style={{ fontWeight: 700, color: '#059669' }}>{appliance.warrantyPeriod}</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Warranty Expires</span>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{appliance.warrantyExpires}</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Last Service</span>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{appliance.lastServiceDate}</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Location in Home</span>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{appliance.locationInHome}</div>
          </div>
        </div>

        {/* SERVICE HISTORY */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Service & Maintenance History
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {appliance.serviceHistory.length} recorded visits
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {appliance.serviceHistory.map(srv => (
              <div
                key={srv.id}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-app)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
                    {srv.date}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {srv.serviceType}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {srv.technician} {srv.notes && `• ${srv.notes}`}
                  </div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  ₹{srv.cost.toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONNECTED DOCUMENTS */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '10px' }}>
            Connected Documents & Receipts
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            {appliance.documents.map(doc => (
              <div
                key={doc.id}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-app)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <FileText size={16} style={{ color: 'var(--ai-primary)' }} />
                  <TrustBadge type={doc.badge} size="sm" />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {doc.title}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  {doc.type} • {doc.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              alert(`Maintenance booking request simulated for ${appliance.name}!`);
              onClose();
            }}
            className="btn-ai"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <Wrench size={16} />
            <span>Schedule Technician Visit</span>
          </button>
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
