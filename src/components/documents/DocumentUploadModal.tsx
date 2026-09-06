import React from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import {
  X,
  Upload,
  Camera,
  Mail,
  Sparkles,
  FileText,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';
import { TrustBadge } from '../common/TrustBadge';

export const DocumentUploadModal: React.FC = () => {
  const {
    isUploadModalOpen,
    isProcessingDoc,
    processingProgress,
    processingSteps,
    extractedDocData,
    startDocumentIngestion,
    confirmDocumentAddition,
    cancelDocumentIngestion
  } = useHomeOS();

  if (!isUploadModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget && !isProcessingDoc) cancelDocumentIngestion();
    }}>
      <div className="modal-card" style={{ maxWidth: '640px', padding: '32px' }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--ai-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {isProcessingDoc
                  ? '🧠 Understanding your document...'
                  : extractedDocData
                  ? '✨ Document Understood'
                  : 'Add something to your home memory'}
              </h2>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {isProcessingDoc
                  ? 'HomeOS AI engine is analyzing semantic relationships'
                  : extractedDocData
                  ? 'Verify extracted data & confirm destination'
                  : 'Upload any invoice, warranty, deed, or bill'}
              </div>
            </div>
          </div>

          {!isProcessingDoc && (
            <button
              onClick={cancelDocumentIngestion}
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
          )}
        </div>

        {/* STATE 1: INITIAL UPLOAD OPTIONS */}
        {!isProcessingDoc && !extractedDocData && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Quick Demo Sample Action */}
            <div style={{
              backgroundColor: '#F5F3FF',
              border: '2px dashed #C4B5FD',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#EDE9FE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#7C3AED'
              }}>
                <FileText size={26} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#4C1D95' }}>
                  Try Demo Document (Recommended for Judges)
                </div>
                <div style={{ fontSize: '13px', color: '#6D28D9', marginTop: '4px' }}>
                  Simulate instant upload of <strong>LG 1.5 Ton Split AC Invoice</strong>
                </div>
              </div>
              <button
                onClick={() => startDocumentIngestion('sample_ac')}
                className="btn-ai"
                style={{ marginTop: '6px' }}
              >
                <Sparkles size={16} />
                <span>Use Sample AC Invoice</span>
              </button>
            </div>

            {/* Standard Ingestion Options */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div
                onClick={() => startDocumentIngestion('custom_upload')}
                style={{
                  padding: '16px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-app)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#6366F1')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
              >
                <Upload size={22} style={{ color: 'var(--text-secondary)', margin: '0 auto 8px' }} />
                <div style={{ fontSize: '13px', fontWeight: 700 }}>Upload File</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>PDF, JPG, PNG</div>
              </div>

              <div
                onClick={() => startDocumentIngestion('camera_scan')}
                style={{
                  padding: '16px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-app)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#6366F1')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
              >
                <Camera size={22} style={{ color: 'var(--text-secondary)', margin: '0 auto 8px' }} />
                <div style={{ fontSize: '13px', fontWeight: 700 }}>Scan Camera</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Take mobile photo</div>
              </div>

              <div
                onClick={() => startDocumentIngestion('email_import')}
                style={{
                  padding: '16px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-app)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#6366F1')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
              >
                <Mail size={22} style={{ color: 'var(--text-secondary)', margin: '0 auto 8px' }} />
                <div style={{ fontSize: '13px', fontWeight: 700 }}>Import Email</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Forward bills</div>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>
              🔒 Documents are parsed privately. Only verified data is recorded to your Digital Home Twin.
            </div>
          </div>
        )}

        {/* STATE 2: LIVE AI PROCESSING SCREEN WITH ANIMATION */}
        {isProcessingDoc && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Split Preview: Doc preview on left, Animated stages on right */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.4fr',
              gap: '20px',
              backgroundColor: 'var(--bg-app)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              border: '1px solid var(--border-subtle)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Left: Document Mock Preview with Laser Scan Effect */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #6366F1, transparent)',
                  animation: 'scanLine 2s infinite ease-in-out'
                }} />

                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid #E5E7EB', paddingBottom: '6px' }}>
                  RETAIL TAX INVOICE
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  RELIANCE DIGITAL PUNE<br />
                  Invoice #INV-LG-88391<br />
                  Date: 15/06/2025
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#4338CA', marginTop: '6px' }}>
                  LG 1.5T 5S DUAL INV AC
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                  Qty: 1 | Rate: ₹42,999<br />
                  Warranty: 2 Years Standard
                </div>
                <div style={{ marginTop: 'auto', fontSize: '9px', color: '#10B981', fontWeight: 700 }}>
                  ✓ DIGITALLY VERIFIED
                </div>
              </div>

              {/* Right: Step by Step Pipeline Progress */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  AI Extraction Pipeline:
                </div>
                {processingSteps.map((step, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      color: step.done ? 'var(--text-primary)' : 'var(--text-light)',
                      fontWeight: step.done ? 600 : 400,
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: step.done ? '#10B981' : '#E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '10px',
                      flexShrink: 0
                    }}>
                      {step.done ? '✓' : ''}
                    </div>
                    <span>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Understanding & indexing relationships...</span>
                <span style={{ fontWeight: 700, color: 'var(--ai-primary)' }}>{processingProgress}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: '#E5E7EB', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{
                  width: `${processingProgress}%`,
                  height: '100%',
                  background: 'var(--ai-gradient)',
                  transition: 'width 0.3s ease-in-out'
                }} />
              </div>
            </div>
          </div>
        )}

        {/* STATE 3: EXTRACTED RESULT & "WHERE DOES THIS BELONG?" CONFIRMATION */}
        {!isProcessingDoc && extractedDocData && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Top Extraction Card */}
            <div style={{
              backgroundColor: '#FAF5FF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #E9D5FF',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '24px' }}>❄️</span>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {extractedDocData.product}
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Category: {extractedDocData.category}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrustBadge type="ai" label="AI Extracted" size="sm" />
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: '999px', border: '1px solid #A7F3D0' }}>
                    {extractedDocData.confidence} Confidence
                  </span>
                </div>
              </div>

              {/* Extracted Key-Value Matrix */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                fontSize: '12px',
                border: '1px solid #F3E8FF'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Purchase Date</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{extractedDocData.purchaseDate}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Purchase Price</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{extractedDocData.purchasePrice}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Warranty</span>
                  <div style={{ fontWeight: 700, color: '#059669' }}>{extractedDocData.warranty}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Warranty Expiry</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{extractedDocData.warrantyExpires}</div>
                </div>
              </div>
            </div>

            {/* STEP 7 & 17: "Where does this belong?" */}
            <div style={{
              backgroundColor: 'var(--bg-app)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              padding: '18px'
            }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Where should we save this in your Digital Home Twin?
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--ai-primary)',
                backgroundColor: '#FFFFFF',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #E0E7FF'
              }}>
                <span>🏠 Pune Apartment</span>
                <span>→</span>
                <span>📦 Appliances</span>
                <span>→</span>
                <span>❄️ AC (Living Room)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
              <button
                onClick={confirmDocumentAddition}
                className="btn-ai"
                style={{ flex: 1, justifyContent: 'center', padding: '12px' }}
              >
                <Check size={16} />
                <span>Add to My Home</span>
              </button>
              <button
                onClick={cancelDocumentIngestion}
                className="btn-secondary"
                style={{ padding: '12px 18px' }}
              >
                Review Details
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
