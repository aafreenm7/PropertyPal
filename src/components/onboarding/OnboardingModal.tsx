import React, { useState } from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import { Sparkles, ArrowRight, Check, Home, FileText, Cpu, X } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, setIsOnboardingOpen, startDocumentIngestion, setIsUploadModalOpen } = useHomeOS();
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('Apartment');

  if (!isOnboardingOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) setIsOnboardingOpen(false);
    }}>
      <div className="modal-card" style={{ maxWidth: '580px', padding: '36px' }}>
        
        {/* Step Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                style={{
                  width: '28px',
                  height: '4px',
                  borderRadius: '999px',
                  backgroundColor: s <= step ? '#4F46E5' : '#E5E7EB'
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setIsOnboardingOpen(false)}
            style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
          >
            <X size={14} />
          </button>
        </div>

        {/* SCREEN 1: Welcome to HomeOS */}
        {step === 1 && (
          <div className="animate-fade-in" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'var(--ai-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '32px',
              boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)'
            }}>
              🏠
            </div>

            <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Welcome to HomeOS
            </h1>
            
            <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ai-primary)' }}>
              Your home remembers. You just live in it.
            </p>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: 1.5 }}>
              HomeOS connects scattered deeds, appliance invoices, warranties, utility bills, and maintenance schedules into an AI-powered Digital Home Twin.
            </p>

            <button
              onClick={() => setStep(2)}
              className="btn-ai"
              style={{ marginTop: '12px', padding: '12px 28px', fontSize: '14px' }}
            >
              <span>Get Started</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* SCREEN 2: Tell us about your home */}
        {step === 2 && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Tell us about your home
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Select the primary dwelling structure for your Digital Twin.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {['Apartment / Flat', 'Independent House / Villa', 'Row House', 'Commercial Shop / Office', 'Plot / Land', 'Other'].map(type => (
                <div
                  key={type}
                  onClick={() => setPropertyType(type)}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    border: propertyType === type ? '2px solid #4F46E5' : '1px solid var(--border-subtle)',
                    backgroundColor: propertyType === type ? '#EEF2FF' : 'var(--bg-app)',
                    color: propertyType === type ? '#4338CA' : 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{type}</span>
                  {propertyType === type && <Check size={16} style={{ color: '#4F46E5' }} />}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => setStep(3)} className="btn-ai" style={{ flex: 1, justifyContent: 'center' }}>
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
              <button onClick={() => setStep(1)} className="btn-secondary">
                Back
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: Add your first memory */}
        {step === 3 && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Add your first memory
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Upload any household receipt or invoice to initialize your home's digital twin.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: '#F9FAFB', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <span style={{ fontSize: '24px' }}>📄</span>
                <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '4px' }}>Sale Deed / Tax</div>
              </div>
              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: '#F9FAFB', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <span style={{ fontSize: '24px' }}>❄️</span>
                <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '4px' }}>Appliance Invoice</div>
              </div>
              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: '#F9FAFB', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <span style={{ fontSize: '24px' }}>🛡️</span>
                <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '4px' }}>Insurance Policy</div>
              </div>
              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: '#F9FAFB', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <span style={{ fontSize: '24px' }}>⚡</span>
                <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '4px' }}>Electricity Bill</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => setStep(4)} className="btn-ai" style={{ flex: 1, justifyContent: 'center' }}>
                <span>Next: AI Setup</span>
                <ArrowRight size={16} />
              </button>
              <button onClick={() => setStep(2)} className="btn-secondary">
                Back
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: HomeOS will take it from here */}
        {step === 4 && (
          <div className="animate-fade-in" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '32px'
            }}>
              🧠
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
              HomeOS will take it from here.
            </h2>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: 1.5 }}>
              We'll organize your information, remember important dates, monitor active warranties, and tell you exactly what needs attention.
            </p>

            <button
              onClick={() => setIsOnboardingOpen(false)}
              className="btn-ai"
              style={{ marginTop: '12px', padding: '14px 32px', fontSize: '15px' }}
            >
              <span>Enter My Home</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
