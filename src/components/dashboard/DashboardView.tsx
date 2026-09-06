import React from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import {
  Zap,
  Clock,
  Shield,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Home,
  Check,
  Calendar,
  Layers,
  Activity,
  Plus
} from 'lucide-react';
import { TrustBadge } from '../common/TrustBadge';

export const DashboardView: React.FC = () => {
  const {
    property,
    needsAttention,
    health,
    appliances,
    homeMemory,
    setActiveTab,
    setSelectedAppliance,
    setIsHealthModalOpen,
    setIsUploadModalOpen,
    resolveAttentionItem,
    docInsightAlert,
    setDocInsightAlert
  } = useHomeOS();

  const unresolvedAttention = needsAttention.filter(item => !item.isResolved);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* AI Ingested Insight Banner if freshly uploaded */}
      {docInsightAlert && (
        <div style={{
          backgroundColor: '#F5F3FF',
          border: '1px solid #DDD6FE',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          boxShadow: '0 4px 14px rgba(139, 92, 246, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--ai-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              flexShrink: 0
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#5B21B6' }}>
                💡 HomeOS Insight
              </div>
              <div style={{ fontSize: '13px', color: '#4C1D95' }}>
                {docInsightAlert}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => {
                const ac = appliances.find(a => a.id === 'app-ac-01');
                if (ac) setSelectedAppliance(ac);
                setActiveTab('appliances');
              }}
              style={{
                backgroundColor: '#7C3AED',
                color: 'white',
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              View AC
            </button>
            <button
              onClick={() => setDocInsightAlert(null)}
              style={{ color: '#6B7280', fontSize: '12px', padding: '6px' }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Hero Greeting & Brand Philosophy Statement */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            lineHeight: 1.2
          }}>
            Good morning, Aafreen 👋
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            marginTop: '6px',
            fontWeight: 500
          }}>
            Here's what your home needs today.
          </p>
        </div>

        {/* Product Differentiator Badge */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '12px 18px',
          boxShadow: 'var(--shadow-sm)',
          maxWidth: '420px'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ai-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} />
            <span>Digital Home Twin Principle</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: 1.4 }}>
            <strong>Others store information. HomeOS understands it.</strong><br />
            Others wait for you to remember. HomeOS remembers for you.
          </div>
        </div>
      </div>

      {/* ⚡ SECTION 1: NEEDS YOUR ATTENTION */}
      <section>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>⚡</span>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Needs Your Attention
              </h2>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Important things HomeOS thinks you should know about.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              backgroundColor: unresolvedAttention.length > 0 ? 'var(--status-urgent-bg)' : 'var(--status-verified-bg)',
              color: unresolvedAttention.length > 0 ? '#B91C1C' : '#047857',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: `1px solid ${unresolvedAttention.length > 0 ? 'var(--status-urgent-border)' : 'var(--status-verified-border)'}`
            }}>
              {unresolvedAttention.length} active alerts
            </span>
          </div>
        </div>

        {/* 3 Action Cards with Subtle Priority */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px'
        }}>
          {/* CARD 1 — URGENT: Electricity Bill */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #FECACA',
            boxShadow: '0 4px 16px -2px rgba(239, 68, 68, 0.08)',
            padding: '22px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#EF4444',
                boxShadow: '0 0 8px #EF4444'
              }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase' }}>
                Urgent
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '18px' }}>🔴</span>
                <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Electricity Bill
                </span>
              </div>
              
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>
                ₹1,840
              </div>
              
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#DC2626', marginBottom: '16px' }}>
                Due in 2 days (Mahavitaran MSEDCL)
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => {
                  resolveAttentionItem('att-1');
                }}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', padding: '8px 14px', fontSize: '13px' }}
              >
                View Bill
              </button>
              <button
                onClick={() => resolveAttentionItem('att-1')}
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                Mark Paid
              </button>
            </div>
          </div>

          {/* CARD 2 — MAINTENANCE: AC Service */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #FDE68A',
            boxShadow: '0 4px 16px -2px rgba(245, 158, 11, 0.08)',
            padding: '22px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#F59E0B'
              }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#D97706', textTransform: 'uppercase' }}>
                Maintenance
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '18px' }}>🟡</span>
                <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  AC Service
                </span>
              </div>
              
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '6px 0 2px' }}>
                LG 1.5 Ton Split AC
              </div>
              
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Last serviced: <strong style={{ color: '#D97706' }}>6 months ago</strong> (12 Mar 2026)
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => {
                  const ac = appliances.find(a => a.id === 'app-ac-01');
                  if (ac) setSelectedAppliance(ac);
                  setActiveTab('appliances');
                }}
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center', padding: '8px 14px', fontSize: '13px' }}
              >
                View Appliance
              </button>
              <button
                onClick={() => {
                  setActiveTab('maintenance');
                }}
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  fontSize: '12px',
                  fontWeight: 700
                }}
              >
                Book Tech
              </button>
            </div>
          </div>

          {/* CARD 3 — INSURANCE: Home Insurance */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #FDE68A',
            boxShadow: '0 4px 16px -2px rgba(245, 158, 11, 0.08)',
            padding: '22px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#F59E0B'
              }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#D97706', textTransform: 'uppercase' }}>
                Insurance
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '18px' }}>🟡</span>
                <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Home Insurance
                </span>
              </div>
              
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '6px 0 2px' }}>
                Demo Insurance Co.
              </div>
              
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Expires: <strong style={{ color: '#D97706' }}>18 days</strong> (24 Sept 2026)
              </div>
            </div>

            <button
              onClick={() => setActiveTab('insurance')}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', padding: '8px 14px', fontSize: '13px' }}
            >
              Review Policy
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: GRID OF CORE INSIGHTS (Home Health + Upcoming + My Home) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px'
      }}>
        
        {/* 🏠 HOME HEALTH CARD */}
        <div className="card-clean" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '18px' }}>🏠</span>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Home Health
                  </h3>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Live operational score for your household
                </div>
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#059669',
                backgroundColor: '#ECFDF5',
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid #A7F3D0'
              }}>
                Optimal State
              </span>
            </div>

            {/* Score Ring & Breakdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '14px 0 20px' }}>
              <div style={{
                position: 'relative',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: `conic-gradient(#10B981 ${health.overall * 3.6}deg, #E5E7EB 0deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <div style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                    {health.overall}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    / 100
                  </span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {health.statusText}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                  Bills are paid, warranties are active, 1 routine service recommended.
                </div>
              </div>
            </div>

            {/* Breakdown Indicators */}
            <div style={{
              backgroundColor: 'var(--bg-app)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>📄 Documents</span>
                <strong style={{ color: 'var(--text-primary)' }}>92% Organized</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>⚡ Bills</span>
                <strong style={{ color: '#059669' }}>✓ Up to date</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>🔧 Maintenance</span>
                <strong style={{ color: '#D97706' }}>2 pending</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>🛡️ Warranties</span>
                <strong style={{ color: '#059669' }}>94% active</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>🛡️ Insurance</span>
                <strong style={{ color: '#D97706' }}>1 renewal approaching</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsHealthModalOpen(true)}
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '16px', fontSize: '13px' }}
          >
            <span>View Home Health</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 📅 COMING UP TIMELINE */}
        <div className="card-clean" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '18px' }}>📅</span>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Coming Up
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('calendar')}
                style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-brand)' }}
              >
                View Calendar
              </button>
            </div>

            {/* Timeline Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', paddingLeft: '8px' }}>
              
              {/* Vertical line indicator */}
              <div style={{
                position: 'absolute',
                top: '8px',
                bottom: '8px',
                left: '14px',
                width: '2px',
                backgroundColor: 'var(--border-subtle)'
              }} />

              {/* Item 1 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#EF4444', border: '2px solid white' }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Electricity Bill (MSEDCL)</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>₹1,840 • Pune Zone</div>
                  </div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#EF4444', backgroundColor: '#FEF2F2', padding: '2px 8px', borderRadius: '6px' }}>
                  2 days
                </span>
              </div>

              {/* Item 2 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F59E0B', border: '2px solid white' }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Society Maintenance</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>₹2,500 • Silver Oak Res.</div>
                  </div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#D97706', backgroundColor: '#FFFBEB', padding: '2px 8px', borderRadius: '6px' }}>
                  5 days
                </span>
              </div>

              {/* Item 3 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F59E0B', border: '2px solid white' }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Home Insurance Renewal</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Demo Insurance Shield</div>
                  </div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#D97706', backgroundColor: '#FFFBEB', padding: '2px 8px', borderRadius: '6px' }}>
                  18 days
                </span>
              </div>

              {/* Item 4 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3B82F6', border: '2px solid white' }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Washing Machine Warranty</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>IFB 4-Year Super Cover</div>
                  </div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px' }}>
                  30 days
                </span>
              </div>

              {/* Item 5 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10B981', border: '2px solid white' }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Property Tax Advance Window</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>PMC Annual Assessment</div>
                  </div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: '6px' }}>
                  45 days
                </span>
              </div>

            </div>
          </div>

          <div style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
            🔔 Automated reminders are synced with your household calendar
          </div>
        </div>

        {/* 🏠 MY HOME SUMMARY & ABSTRACT APARTMENT */}
        <div className="card-clean" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '18px' }}>🏠</span>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    My Home
                  </h3>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {property.name} • {property.bhk}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                <TrustBadge type="gov" size="sm" />
                <TrustBadge type="user" size="sm" />
              </div>
            </div>

            {/* Clean Illustrated / Abstract 2BHK Apartment Layout Representation */}
            <div style={{
              backgroundColor: '#F3F4F6',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              border: '1px dashed #D1D5DB',
              marginBottom: '16px',
              position: 'relative'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px',
                  border: '1px solid #E5E7EB',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '14px' }}>🛋️</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>Living Room</span>
                  <span style={{ fontSize: '10px', color: '#6366F1', fontWeight: 600 }}>LG Split AC (❄️)</span>
                </div>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px',
                  border: '1px solid #E5E7EB',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '14px' }}>🍳</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>Kitchen</span>
                  <span style={{ fontSize: '10px', color: '#059669', fontWeight: 600 }}>Samsung Fridge + RO</span>
                </div>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px',
                  border: '1px solid #E5E7EB',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '14px' }}>🛏️</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>Master Bedroom</span>
                  <span style={{ fontSize: '10px', color: '#D97706', fontWeight: 600 }}>Bajaj Geyser (🔥)</span>
                </div>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px',
                  border: '1px solid #E5E7EB',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '14px' }}>🧺</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>Utility Balcony</span>
                  <span style={{ fontSize: '10px', color: '#2563EB', fontWeight: 600 }}>IFB Washer (🧺)</span>
                </div>
              </div>
            </div>

            {/* Information Key Value Pairs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Location</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{property.location}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Registered Area</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{property.areaSqFt} sq.ft.</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Ownership</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{property.ownership}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Society</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{property.societyName}</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('twin')}
            className="btn-ai"
            style={{ width: '100%', justifyContent: 'center', marginTop: '16px', fontSize: '13px' }}
          >
            <span>Explore Digital Home Twin</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* SECTION 3: HOME MEMORY RECENT ACTIVITY & AI PROACTIVE BANNER */}
      <section style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>🧠</span>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Home Memory — Recent Activity
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Chronological log of what your home has learned, scheduled, and recorded.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('twin')}
            style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ai-primary)' }}
          >
            Full Memory Graph →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {homeMemory.slice(0, 4).map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  width: '90px',
                  flexShrink: 0
                }}>
                  {item.date}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {item.description}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {item.amount && (
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    ₹{item.amount.toLocaleString('en-IN')}
                  </span>
                )}
                {item.badgeType && <TrustBadge type={item.badgeType} label={item.badgeText} size="sm" />}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
