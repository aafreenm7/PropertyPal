import React from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import { X, Heart, ArrowRight, CheckCircle2, ShieldCheck, Wrench, FileText, Check } from 'lucide-react';

export const HomeHealthDetailModal: React.FC = () => {
  const {
    health,
    isHealthModalOpen,
    setIsHealthModalOpen,
    setActiveTab,
    setSelectedAppliance,
    setIsConflictModalOpen,
    appliances
  } = useHomeOS();

  if (!isHealthModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) setIsHealthModalOpen(false);
    }}>
      <div className="modal-card" style={{ maxWidth: '640px', padding: '32px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: '#ECFDF5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669'
            }}>
              <Heart size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Home Health Index
              </h2>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Holistic operational score across your Pune Apartment records
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsHealthModalOpen(false)}
            style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Score Ring Hero */}
        <div style={{
          backgroundColor: '#F0FDF4',
          border: '1px solid #BBF7D0',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          marginBottom: '24px'
        }}>
          <div style={{
            position: 'relative',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: `conic-gradient(#10B981 ${health.overall * 3.6}deg, #E5E7EB 0deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <div style={{
              width: '82px',
              height: '82px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#065F46' }}>
                {health.overall}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                / 100
              </span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#065F46' }}>
              {health.statusText}
            </div>
            <div style={{ fontSize: '13px', color: '#047857', marginTop: '4px', lineHeight: 1.4 }}>
              Your household documentation and warranty protection are near perfection. Resolving 2 routine maintenance items will lift your home to 97/100.
            </div>
          </div>
        </div>

        {/* 5-Pillar Score Breakdown */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
            Category Performance Pillars
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-app)', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Documents</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>{health.documents}%</div>
            </div>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-app)', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Bills</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>{health.bills}%</div>
            </div>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-app)', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Maintenance</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#D97706', marginTop: '2px' }}>{health.maintenance}%</div>
            </div>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-app)', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Insurance</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#D97706', marginTop: '2px' }}>{health.insurance}%</div>
            </div>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-app)', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Warranties</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669', marginTop: '2px' }}>{health.warranties}%</div>
            </div>
          </div>
        </div>

        {/* Actionable Score Boosters */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
            ⚡ Actionable Recommendations to Reach 97/100
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {health.recommendations.map(rec => (
              <div
                key={rec.id}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '20px' }}>{rec.icon}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {rec.title} <span style={{ fontSize: '11px', color: '#059669', fontWeight: 800 }}>(+{rec.pointsGain} pts)</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {rec.description}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsHealthModalOpen(false);
                    if (rec.actionTarget === 'view_appliance_ac') {
                      const ac = appliances.find(a => a.id === 'app-ac-01');
                      if (ac) setSelectedAppliance(ac);
                      setActiveTab('appliances');
                    } else if (rec.actionTarget === 'review_insurance') {
                      setActiveTab('insurance');
                    } else if (rec.actionTarget === 'open_conflict') {
                      setIsConflictModalOpen(true);
                    }
                  }}
                  className="btn-secondary"
                  style={{ fontSize: '12px', padding: '6px 12px' }}
                >
                  {rec.actionLabel}
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsHealthModalOpen(false)}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <Check size={16} />
          <span>Done</span>
        </button>

      </div>
    </div>
  );
};
