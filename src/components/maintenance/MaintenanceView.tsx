import React from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import {
  Wrench,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Calendar,
  FileText,
  User,
  Plus
} from 'lucide-react';
import { TrustBadge } from '../common/TrustBadge';

export const MaintenanceView: React.FC = () => {
  const {
    maintenanceList,
    appliances,
    setSelectedAppliance,
    setActiveTab,
    setIsUploadModalOpen
  } = useHomeOS();

  const attentionItems = maintenanceList.filter(m => m.status === 'attention');
  const upcomingItems = maintenanceList.filter(m => m.status === 'upcoming');
  const completedItems = maintenanceList.filter(m => m.status === 'completed');

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '26px' }}>🔧</span>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Maintenance & Repairs
            </h1>
          </div>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Predictive servicing intervals, technician records, and verified repair invoices.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="btn-ai"
        >
          <Plus size={16} />
          <span>+ Log Service Record</span>
        </button>
      </div>

      {/* SECTION 1: NEEDS ATTENTION */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#F59E0B'
          }} />
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Needs Attention ({attentionItems.length})
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {attentionItems.map(item => (
            <div
              key={item.id}
              className="card-clean"
              style={{
                padding: '20px',
                border: '1px solid #FDE68A',
                backgroundColor: '#FFFDF5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <div style={{ fontSize: '13px', color: '#B45309', fontWeight: 600, marginTop: '2px' }}>
                      {item.dateText}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: '#FEF3C7',
                    color: '#92400E',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    Action Recommended
                  </span>
                </div>

                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '12px',
                  border: '1px solid #FEF08A'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Asset:</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{item.asset}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Estimated Cost:</span>
                    <strong style={{ color: 'var(--text-primary)' }}>₹{item.cost.toLocaleString('en-IN')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Technician / Partner:</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{item.technician}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button
                  onClick={() => {
                    const matched = appliances.find(a => a.id === item.assetId);
                    if (matched) setSelectedAppliance(matched);
                    setActiveTab('appliances');
                  }}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '12px', padding: '8px' }}
                >
                  View Appliance
                </button>
                <button
                  onClick={() => alert(`Service booking for ${item.asset} initiated!`)}
                  className="btn-ai"
                  style={{ fontSize: '12px', padding: '8px 12px' }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: UPCOMING */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#3B82F6'
          }} />
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Upcoming Maintenance ({upcomingItems.length})
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {upcomingItems.map(item => (
            <div
              key={item.id}
              className="card-clean"
              style={{ padding: '20px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#2563EB', fontWeight: 600, marginTop: '2px' }}>
                    {item.dateText}
                  </div>
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: '#EFF6FF',
                  color: '#1D4ED8',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)'
                }}>
                  Upcoming
                </span>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-app)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                fontSize: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Asset:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{item.asset}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Est. Cost:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>₹{item.cost.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Contact:</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.technician}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: COMPLETED */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#10B981'
          }} />
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Completed Service History ({completedItems.length})
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {completedItems.map(item => (
            <div
              key={item.id}
              className="card-clean"
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#ECFDF5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#059669'
                }}>
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {item.asset} • {item.technician} • {item.dateText}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {item.relatedDoc && (
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--ai-primary)',
                    backgroundColor: '#F5F3FF',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <FileText size={12} /> {item.relatedDoc}
                  </span>
                )}
                <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  ₹{item.cost.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
