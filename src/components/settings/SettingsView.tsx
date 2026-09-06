import React from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import { ShieldCheck, Lock, Download, Trash2, RotateCcw, Check, Sparkles } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { resetToDefaultDemo, setActiveNotification } = useHomeOS();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '26px' }}>⚙️</span>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Settings & Household Privacy
          </h1>
        </div>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Security preferences, sovereign data ownership, and prototype reset controls.
        </p>
      </div>

      {/* Trust & Privacy Card (Rule 40 Requirement) */}
      <div className="card-clean" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
          🔒 Your Household Data & Sovereignty
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', fontSize: '13px' }}>
          <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>📄 Documents & Invoices</div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Encrypted on your personal device/cloud. Never trained on public models.</div>
          </div>

          <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>👨👩👧 Family Sharing</div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Granular role-based controls managed exclusively by Aafreen (Owner).</div>
          </div>

          <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>🤖 AI Processing</div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Used exclusively to build and ground your local Digital Home Twin.</div>
          </div>

          <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>🏛️ Sovereign Registry Sync</div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Official state land records remain source of truth for deed verification.</div>
          </div>
        </div>

        {/* Data Actions */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
          <button
            onClick={() => setActiveNotification('Exporting complete HomeOS Twin JSON archive...')}
            className="btn-secondary"
          >
            <Download size={15} />
            <span>Export My Household Data (JSON/PDF)</span>
          </button>

          <button
            onClick={resetToDefaultDemo}
            className="btn-secondary"
            style={{ color: '#4F46E5', borderColor: '#C7D2FE' }}
          >
            <RotateCcw size={15} />
            <span>Reset Demo Data to Pristine State</span>
          </button>
        </div>
      </div>

    </div>
  );
};
