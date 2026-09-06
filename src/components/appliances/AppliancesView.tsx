import React from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import {
  Package,
  Plus,
  Wrench,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { TrustBadge } from '../common/TrustBadge';
import { ApplianceDetailModal } from './ApplianceDetailModal';

export const AppliancesView: React.FC = () => {
  const {
    appliances,
    selectedAppliance,
    setSelectedAppliance,
    setIsUploadModalOpen
  } = useHomeOS();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '26px' }}>📦</span>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Appliances & Assets
            </h1>
          </div>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Live status, active warranties, service logs, and maintenance cycles for all household equipment.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="btn-ai"
        >
          <Plus size={16} />
          <span>+ Add Appliance / Invoice</span>
        </button>
      </div>

      {/* Appliances Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {appliances.map((app) => (
          <div
            key={app.id}
            onClick={() => setSelectedAppliance(app)}
            className="card-clean"
            style={{
              padding: '24px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#EEF2FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  {app.icon}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <TrustBadge type={app.trustBadge} size="sm" />
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: app.isServiceDueNow ? '#FFFBEB' : '#ECFDF5',
                    color: app.isServiceDueNow ? '#B45309' : '#047857',
                    border: `1px solid ${app.isServiceDueNow ? '#FDE68A' : '#A7F3D0'}`
                  }}>
                    {app.statusText}
                  </span>
                </div>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {app.name}
              </h3>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {app.locationInHome} • Purchased {app.purchaseDate}
              </div>

              {/* Info Matrix */}
              <div style={{
                backgroundColor: 'var(--bg-app)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                marginTop: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                fontSize: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Warranty:</span>
                  <strong style={{ color: '#059669' }}>{app.warrantyPeriod}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Expires:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{app.warrantyExpires}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Last Service:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{app.lastServiceDate}</strong>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px',
              color: 'var(--text-muted)'
            }}>
              <span>{app.documents.length} docs • {app.serviceHistory.length} service records</span>
              <span style={{ fontWeight: 600, color: 'var(--ai-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View Details <ArrowRight size={12} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Appliance Detail Modal */}
      {selectedAppliance && (
        <ApplianceDetailModal
          appliance={selectedAppliance}
          onClose={() => setSelectedAppliance(null)}
        />
      )}

    </div>
  );
};
