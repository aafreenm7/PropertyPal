import React from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import { Calendar as CalendarIcon, Clock, AlertTriangle, CheckCircle2, Shield, Wrench, Zap } from 'lucide-react';

export const CalendarView: React.FC = () => {
  const { setActiveTab } = useHomeOS();

  const timelineEvents = [
    { date: '08 Sept 2026', title: 'Electricity Bill Payment Due', entity: 'MSEDCL (₹1,840)', type: 'urgent', days: '2 days' },
    { date: '11 Sept 2026', title: 'Society Monthly Maintenance Due', entity: 'Silver Oak Co-op (₹2,500)', type: 'attention', days: '5 days' },
    { date: '18 Sept 2026', title: 'RO Water Purifier Membrane Check', entity: 'Kent Grand Plus', type: 'attention', days: '12 days' },
    { date: '24 Sept 2026', title: 'Home Insurance Policy Expiration', entity: 'Demo Insurance Co. (₹80L)', type: 'urgent', days: '18 days' },
    { date: '01 Oct 2026', title: 'Geyser Pre-Winter Safety Inspection', entity: 'Bajaj 15L Geyser', type: 'upcoming', days: '25 days' },
    { date: '05 Oct 2026', title: 'Washing Machine 4-Year Warranty Expires', entity: 'IFB Senator Front Load', type: 'attention', days: '30 days' },
    { date: '20 Oct 2026', title: 'Property Tax Advance Rebate Closes', entity: 'PMC Pune Assessment', type: 'upcoming', days: '45 days' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '26px' }}>📅</span>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Household Calendar & Due Dates
          </h1>
        </div>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Forward-looking timeline of bills, warranty expirations, technician visits, and municipal tax windows.
        </p>
      </div>

      {/* Timeline Stream */}
      <div className="card-clean" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', paddingLeft: '14px' }}>
          
          <div style={{
            position: 'absolute',
            top: '8px',
            bottom: '8px',
            left: '22px',
            width: '2px',
            backgroundColor: 'var(--border-subtle)'
          }} />

          {timelineEvents.map((evt, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                position: 'relative',
                zIndex: 1
              }}
            >
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: evt.type === 'urgent' ? '#EF4444' : evt.type === 'attention' ? '#F59E0B' : '#10B981',
                border: '3px solid #FFFFFF',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                flexShrink: 0
              }} />

              <div style={{
                flex: 1,
                backgroundColor: 'var(--bg-app)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
                border: '1px solid var(--border-subtle)'
              }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
                    {evt.date}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {evt.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {evt.entity}
                  </div>
                </div>

                <span style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: evt.type === 'urgent' ? '#FEF2F2' : evt.type === 'attention' ? '#FFFBEB' : '#ECFDF5',
                  color: evt.type === 'urgent' ? '#DC2626' : evt.type === 'attention' ? '#D97706' : '#059669',
                  border: `1px solid ${evt.type === 'urgent' ? '#FECACA' : evt.type === 'attention' ? '#FDE68A' : '#A7F3D0'}`
                }}>
                  {evt.days}
                </span>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};
