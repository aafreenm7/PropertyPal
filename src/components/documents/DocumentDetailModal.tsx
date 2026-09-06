import React from 'react';
import { DocumentItem } from '../../types';
import { X, FileText, Download, ShieldCheck, Check, Sparkles, AlertTriangle } from 'lucide-react';
import { TrustBadge } from '../common/TrustBadge';

interface Props {
  document: DocumentItem;
  onClose: () => void;
}

export const DocumentDetailModal: React.FC<Props> = ({ document, onClose }) => {
  return (
    <div className="modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal-card" style={{ maxWidth: '640px', padding: '32px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: document.category === 'Property' ? '#ECFDF5' : '#EEF2FF',
              color: document.category === 'Property' ? '#047857' : '#4F46E5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px'
            }}>
              <FileText size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {document.title}
              </h2>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {document.category} • {document.docType} • {document.fileSize}
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

        {/* Trust Badge Bar */}
        <div style={{
          backgroundColor: 'var(--bg-app)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Verification Status:</span>
          <TrustBadge type={document.trustBadge} size="md" />
        </div>

        {/* Conflict Alert if any */}
        {document.hasConflict && (
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <AlertTriangle size={18} style={{ color: '#DC2626', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '12px', color: '#991B1B' }}>
              <strong>Area figure mismatch:</strong> This user-provided architect layout quotes 1,400 sq.ft. (super built-up), whereas the registered Index II records 1,050 sq.ft. (carpet area).
            </div>
          </div>
        )}

        {/* Extracted Metadata Matrix */}
        {document.extractedDetails && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
              🧠 HomeOS Extracted Key Facts:
            </div>
            <div style={{
              backgroundColor: '#F9FAFB',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {Object.entries(document.extractedDetails).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{key}</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{val}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onClose}
            className="btn-primary"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <Check size={16} />
            <span>Done</span>
          </button>
          <button
            onClick={() => alert(`Downloading ${document.title} (Encrypted Prototype File)...`)}
            className="btn-secondary"
          >
            <Download size={15} />
            <span>Download PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};
