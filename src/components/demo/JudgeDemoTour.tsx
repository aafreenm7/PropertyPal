import React from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import { Sparkles, ArrowRight, ArrowLeft, X, CheckCircle2, Play } from 'lucide-react';

export const JudgeDemoTour: React.FC = () => {
  const {
    isDemoMode,
    setIsDemoMode,
    demoStep,
    setDemoStep,
    setActiveTab,
    setSelectedAppliance,
    setIsUploadModalOpen,
    appliances,
    startDocumentIngestion
  } = useHomeOS();

  if (!isDemoMode) return null;

  const demoSteps = [
    {
      step: 1,
      title: 'Step 1: Dashboard & Proactive Intelligence',
      sayText: '"This is a normal home. But look at what HomeOS knows about it."',
      instruction: 'Observe the ⚡ NEEDS YOUR ATTENTION cards: Electricity Bill due in 2 days, AC Service recommended, and Home Insurance expiring in 18 days.',
      actionLabel: 'Go to Step 2 (AC Service)',
      onTrigger: () => {
        setActiveTab('dashboard');
        setDemoStep(2);
      }
    },
    {
      step: 2,
      title: 'Step 2: Inspect Appliance History',
      sayText: '"HomeOS tracks servicing cycles, technician notes, and active warranties."',
      instruction: 'Opening the LG 1.5 Ton Split AC details showing last service 6 months ago (12 March 2026).',
      actionLabel: 'Go to Step 3 (Digital Twin)',
      onTrigger: () => {
        const ac = appliances.find(a => a.id === 'app-ac-01');
        if (ac) setSelectedAppliance(ac);
        setActiveTab('appliances');
        setDemoStep(3);
      }
    },
    {
      step: 3,
      title: 'Step 3: Explore the Digital Home Twin Graph',
      sayText: '"HomeOS connects Property → Documents → Appliances → Bills → Maintenance → Insurance."',
      instruction: 'Inspect how the home connects all entities and logs chronological Home Memory.',
      actionLabel: 'Go to Step 4 (AI Document Ingestion)',
      onTrigger: () => {
        setSelectedAppliance(null);
        setActiveTab('twin');
        setDemoStep(4);
      }
    },
    {
      step: 4,
      title: 'Step 4: AI Ingestion of Sample AC Invoice',
      sayText: '"Upload any receipt or deed. HomeOS OCR extracts and grounds it in 1 click."',
      instruction: 'Triggering simulated AI extraction of the LG Split AC invoice with confidence score.',
      actionLabel: 'Run AI Ingestion Demo',
      onTrigger: () => {
        setIsUploadModalOpen(true);
        startDocumentIngestion('sample_ac');
        setDemoStep(5);
      }
    },
    {
      step: 5,
      title: 'Step 5: Memory Update & Proactive Insight',
      sayText: '"HomeOS automatically creates proactive insights and updates the household memory."',
      instruction: 'Check the Dashboard insight banner advising AC maintenance based on recorded purchase date.',
      actionLabel: 'Go to Step 6 (AI Assistant)',
      onTrigger: () => {
        setActiveTab('dashboard');
        setDemoStep(6);
      }
    },
    {
      step: 6,
      title: 'Step 6: Ask HomeOS (Grounded Conversational AI)',
      sayText: '"Ask anything about your home. HomeOS answers strictly from your household records."',
      instruction: 'Inspect the structured response for "What needs my attention this week?" with citation badges.',
      actionLabel: 'Go to Step 7 (Final Pitch Statement)',
      onTrigger: () => {
        setActiveTab('assistant');
        setDemoStep(7);
      }
    },
    {
      step: 7,
      title: 'Step 7: Final Brand & Vision Statement',
      sayText: '"We don\'t want people to manage their homes better. We want their homes to remember better."',
      instruction: 'Others store information. HomeOS understands it. Others wait for you to remember. HomeOS remembers for you.',
      actionLabel: 'Complete Demo & Restart',
      onTrigger: () => {
        setActiveTab('dashboard');
        setDemoStep(1);
        setIsDemoMode(false);
      }
    }
  ];

  const current = demoSteps[demoStep - 1] || demoSteps[0];

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '420px',
      maxWidth: 'calc(100vw - 48px)',
      backgroundColor: '#111827',
      color: '#FFFFFF',
      borderRadius: 'var(--radius-xl)',
      boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
      zIndex: 90,
      padding: '20px 24px',
      border: '1px solid #374151',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            background: 'var(--ai-gradient)',
            color: 'white',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)'
          }}>
            🎬 JUDGE DEMO MODE
          </span>
          <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
            Step {current.step} of 7
          </span>
        </div>

        <button
          onClick={() => setIsDemoMode(false)}
          style={{ color: '#9CA3AF', padding: '4px' }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Title */}
      <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
        {current.title}
      </h3>

      {/* Presenter Pitch Quote */}
      <div style={{
        backgroundColor: '#1F2937',
        borderLeft: '3px solid #8B5CF6',
        padding: '8px 12px',
        borderRadius: '0 8px 8px 0',
        fontSize: '12px',
        fontStyle: 'italic',
        color: '#E0E7FF',
        marginBottom: '10px'
      }}>
        {current.sayText}
      </div>

      {/* Context Instruction */}
      <p style={{ fontSize: '12px', color: '#D1D5DB', lineHeight: 1.4, marginBottom: '16px' }}>
        {current.instruction}
      </p>

      {/* Stepper Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <button
          disabled={demoStep === 1}
          onClick={() => {
            const prevStep = Math.max(1, demoStep - 1);
            demoSteps[prevStep - 1].onTrigger();
          }}
          style={{
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#374151',
            color: demoStep === 1 ? '#6B7280' : '#FFFFFF',
            fontSize: '12px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <ArrowLeft size={14} /> Back
        </button>

        <button
          onClick={current.onTrigger}
          className="btn-ai"
          style={{ flex: 1, justifyContent: 'center', padding: '8px 14px', fontSize: '12px' }}
        >
          <span>{current.actionLabel}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
