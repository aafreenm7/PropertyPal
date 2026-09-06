import React, { useState } from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import {
  Home,
  FileText,
  Package,
  Wrench,
  DollarSign,
  Shield,
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Layers
} from 'lucide-react';
import { TrustBadge } from '../common/TrustBadge';

interface NodeItem {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  category: 'property' | 'appliances' | 'documents' | 'maintenance' | 'expenses' | 'insurance' | 'family';
  statusBadge?: string;
  badgeType?: 'gov' | 'ai' | 'user' | 'attention';
  x: number;
  y: number;
}

export const DigitalHomeTwinView: React.FC = () => {
  const {
    property,
    appliances,
    documents,
    maintenanceList,
    homeMemory,
    insurance,
    familyMembers,
    expenses,
    setSelectedAppliance,
    setSelectedDocument,
    setActiveTab
  } = useHomeOS();

  const [selectedNodeId, setSelectedNodeId] = useState<string>('app-ac');

  // Interactive Twin Graph Nodes Layout
  const nodes: NodeItem[] = [
    {
      id: 'center-home',
      label: 'Pune Apartment',
      sublabel: '2 BHK • 1,050 sq.ft.',
      icon: '🏠',
      category: 'property',
      statusBadge: 'Gov Verified',
      badgeType: 'gov',
      x: 50,
      y: 50
    },
    {
      id: 'app-ac',
      label: 'LG 1.5 Ton Split AC',
      sublabel: 'Living Room • Warranty Active',
      icon: '❄️',
      category: 'appliances',
      statusBadge: 'Service Due',
      badgeType: 'attention',
      x: 20,
      y: 20
    },
    {
      id: 'app-ref',
      label: 'Samsung Refrigerator',
      sublabel: 'Kitchen • 10Y Inverter',
      icon: '🧊',
      category: 'appliances',
      statusBadge: 'Active',
      badgeType: 'user',
      x: 80,
      y: 20
    },
    {
      id: 'doc-deeds',
      label: 'Registered Sale Deed',
      sublabel: 'Gov Verified Sub-Registrar',
      icon: '📄',
      category: 'documents',
      statusBadge: 'Gov Verified',
      badgeType: 'gov',
      x: 15,
      y: 55
    },
    {
      id: 'maint-ac',
      label: 'AC Routine Service',
      sublabel: 'Recommended (6 mos)',
      icon: '🔧',
      category: 'maintenance',
      statusBadge: 'Due Now',
      badgeType: 'attention',
      x: 28,
      y: 80
    },
    {
      id: 'ins-home',
      label: 'Home Insurance Shield',
      sublabel: 'Demo Insurance Co.',
      icon: '🛡️',
      category: 'insurance',
      statusBadge: 'Expires 18d',
      badgeType: 'attention',
      x: 85,
      y: 55
    },
    {
      id: 'fam-members',
      label: 'Family Access Hub',
      sublabel: '4 Members Linked',
      icon: '👨👩👧',
      category: 'family',
      statusBadge: 'Active',
      badgeType: 'user',
      x: 72,
      y: 80
    },
    {
      id: 'exp-ledger',
      label: 'September Expenses',
      sublabel: '₹8,420 Recorded',
      icon: '💰',
      category: 'expenses',
      statusBadge: 'On Track',
      badgeType: 'user',
      x: 50,
      y: 15
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '26px' }}>🧠</span>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Digital Home Twin
            </h1>
          </div>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            A living graph connecting your Property, Documents, Appliances, Maintenance, Insurance, and Family.
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: '#FFFFFF',
          padding: '8px 14px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Relationships:</span>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ai-primary)' }}>18 Connected Entities</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#D1D5DB' }} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#10B981' }}>Memory Synchronized</span>
        </div>
      </div>

      {/* INTERACTIVE GRAPH CANVAS + DETAILS DRAWER */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(450px, 1.6fr) minmax(320px, 1fr)',
        gap: '24px',
        minHeight: '520px'
      }}>
        
        {/* GRAPH CANVAS CONTAINER */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '480px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Subtle Grid Background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(#E5E7EB 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
            opacity: 0.6,
            pointerEvents: 'none'
          }} />

          {/* SVG Connection Lines */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Center Node (50%, 50%) connected to all outer nodes */}
            {nodes.filter(n => n.id !== 'center-home').map((n) => (
              <g key={n.id}>
                <line
                  x1="50%"
                  y1="50%"
                  x2={`${n.x}%`}
                  y2={`${n.y}%`}
                  stroke={selectedNodeId === n.id ? '#4F46E5' : 'url(#lineGrad)'}
                  strokeWidth={selectedNodeId === n.id ? 2.5 : 1.5}
                  strokeDasharray={selectedNodeId === n.id ? 'none' : '4 4'}
                />
                {selectedNodeId === n.id && (
                  <circle cx={`${(50 + n.x) / 2}%`} cy={`${(50 + n.y) / 2}%`} r="3" fill="#4F46E5" />
                )}
              </g>
            ))}
          </svg>

          {/* Interactive Graph Nodes */}
          <div style={{ position: 'relative', width: '100%', height: '100%', flex: 1, padding: '20px' }}>
            {nodes.map((n) => {
              const isCenter = n.id === 'center-home';
              const isSelected = selectedNodeId === n.id;
              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNodeId(n.id)}
                  style={{
                    position: 'absolute',
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isCenter ? 20 : isSelected ? 15 : 10,
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div style={{
                    backgroundColor: isCenter ? '#111827' : '#FFFFFF',
                    color: isCenter ? '#FFFFFF' : 'var(--text-primary)',
                    borderRadius: isCenter ? 'var(--radius-xl)' : 'var(--radius-lg)',
                    padding: isCenter ? '14px 20px' : '10px 14px',
                    border: isSelected
                      ? '2px solid #4F46E5'
                      : isCenter
                      ? '2px solid #374151'
                      : '1px solid var(--border-subtle)',
                    boxShadow: isSelected
                      ? '0 0 0 4px rgba(99, 102, 241, 0.2), var(--shadow-lg)'
                      : isCenter
                      ? '0 10px 25px -3px rgba(0, 0, 0, 0.3)'
                      : 'var(--shadow-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    whiteSpace: 'nowrap',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                  }}>
                    <span style={{ fontSize: isCenter ? '24px' : '18px' }}>{n.icon}</span>
                    <div>
                      <div style={{ fontSize: isCenter ? '15px' : '13px', fontWeight: 800 }}>
                        {n.label}
                      </div>
                      <div style={{ fontSize: isCenter ? '11px' : '10px', color: isCenter ? '#9CA3AF' : 'var(--text-muted)' }}>
                        {n.sublabel}
                      </div>
                    </div>

                    {n.statusBadge && !isCenter && (
                      <span style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        padding: '1px 5px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: n.badgeType === 'attention' ? '#FEF3C7' : '#ECFDF5',
                        color: n.badgeType === 'attention' ? '#92400E' : '#047857'
                      }}>
                        {n.statusBadge}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{
            padding: '10px 16px',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            color: 'var(--text-muted)'
          }}>
            <span>💡 Click any node to inspect connected relationships & documents</span>
            <span style={{ fontWeight: 600, color: 'var(--ai-primary)' }}>Live Digital Twin Model</span>
          </div>
        </div>

        {/* NODE INSPECTOR DRAWER */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {selectedNodeId === 'app-ac' ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '24px' }}>❄️</span>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      LG 1.5 Ton Split AC
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Living Room • Model MS-Q18YNZA
                    </div>
                  </div>
                </div>
                <TrustBadge type="ai" label="AI Extracted" size="sm" />
              </div>

              {/* Connected Specs */}
              <div style={{
                backgroundColor: 'var(--bg-app)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Purchase Date</span>
                  <strong style={{ color: 'var(--text-primary)' }}>15 June 2025</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Purchase Price</span>
                  <strong style={{ color: 'var(--text-primary)' }}>₹42,999</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Warranty</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Active (2 Years)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Warranty Expires</span>
                  <strong style={{ color: 'var(--text-primary)' }}>15 June 2027</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Last Service</span>
                  <strong style={{ color: 'var(--text-primary)' }}>12 March 2026</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Next Service Due</span>
                  <span style={{ color: '#D97706', fontWeight: 700 }}>September 2026 (Recommended now)</span>
                </div>
              </div>

              {/* Related Connected Documents */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Related Connected Documents:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: 'var(--bg-app)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px'
                  }}>
                    <span>📄 LG AC Purchase Invoice</span>
                    <TrustBadge type="ai" size="sm" />
                  </div>
                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: 'var(--bg-app)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px'
                  }}>
                    <span>📄 LG Warranty Certificate</span>
                    <TrustBadge type="ai" size="sm" />
                  </div>
                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: 'var(--bg-app)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px'
                  }}>
                    <span>📄 Urban Company Service Receipt</span>
                    <TrustBadge type="user" size="sm" />
                  </div>
                </div>
              </div>
            </div>
          ) : selectedNodeId === 'doc-deeds' ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '24px' }}>📄</span>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      Registered Sale Deed
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Sub-Registrar Haveli No. 4, Pune
                    </div>
                  </div>
                </div>
                <TrustBadge type="gov" label="Government Verified" size="sm" />
              </div>

              <div style={{
                backgroundColor: 'var(--bg-app)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Registration Number</span>
                  <strong style={{ color: 'var(--text-primary)' }}>HVN-4-9921-2023</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Execution Date</span>
                  <strong style={{ color: 'var(--text-primary)' }}>10 May 2023</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Certified Carpet Area</span>
                  <strong style={{ color: '#047857' }}>1,050 sq.ft. (97.55 sq.m.)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Stamp Duty Paid</span>
                  <strong style={{ color: 'var(--text-primary)' }}>₹3,67,500</strong>
                </div>
              </div>
            </div>
          ) : selectedNodeId === 'ins-home' ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '24px' }}>🛡️</span>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      Home Insurance Shield
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Policy #{insurance.policyNumber}
                    </div>
                  </div>
                </div>
                <TrustBadge type="attention" label="Expires in 18d" size="sm" />
              </div>

              <div style={{
                backgroundColor: 'var(--bg-app)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Insurer</span>
                  <strong style={{ color: 'var(--text-primary)' }}>Demo Insurance Co.</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Annual Premium</span>
                  <strong style={{ color: 'var(--text-primary)' }}>₹12,400 / year</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Total Coverage</span>
                  <strong style={{ color: '#2563EB' }}>₹80,00,000</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Expires</span>
                  <strong style={{ color: '#DC2626' }}>24 Sept 2026</strong>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span style={{ fontSize: '24px' }}>🏢</span>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {property.name}
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {property.flatNo} • {property.location}
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-app)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Property Type</span>
                  <strong style={{ color: 'var(--text-primary)' }}>2 BHK Apartment</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Registered Carpet Area</span>
                  <strong style={{ color: 'var(--text-primary)' }}>1,050 sq.ft.</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Electricity Consumer #</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{property.electricityConsumerNo}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Property Tax ID</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{property.propertyTaxId}</strong>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => {
                if (selectedNodeId === 'app-ac') {
                  const ac = appliances.find(a => a.id === 'app-ac-01');
                  if (ac) setSelectedAppliance(ac);
                  setActiveTab('appliances');
                } else if (selectedNodeId === 'doc-deeds') {
                  setActiveTab('documents');
                } else if (selectedNodeId === 'ins-home') {
                  setActiveTab('insurance');
                } else {
                  setActiveTab('dashboard');
                }
              }}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center', fontSize: '13px' }}
            >
              <span>Inspect Full Record</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 🧠 HOME MEMORY SECTION ON TWIN PAGE */}
      <section style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-subtle)',
        padding: '28px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>🧠</span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Home Memory
            </h2>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Chronological memory log of your home's lifecycle events, maintenance, and AI insights.
          </p>
        </div>

        {/* Chronological Timeline Stream */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          position: 'relative',
          paddingLeft: '16px'
        }}>
          {/* Vertical Track */}
          <div style={{
            position: 'absolute',
            top: '10px',
            bottom: '10px',
            left: '26px',
            width: '2px',
            backgroundColor: 'var(--border-subtle)'
          }} />

          {homeMemory.map((mem) => (
            <div
              key={mem.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '20px',
                position: 'relative',
                zIndex: 1
              }}
            >
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                backgroundColor: mem.type === 'ai_insight' ? '#8B5CF6' : mem.type === 'tax' ? '#10B981' : '#3B82F6',
                border: '3px solid #FFFFFF',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                flexShrink: 0,
                marginTop: '4px'
              }} />

              <div style={{
                flex: 1,
                backgroundColor: 'var(--bg-app)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 18px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
                    {mem.date}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {mem.title}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {mem.description}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {mem.amount && (
                    <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      ₹{mem.amount.toLocaleString('en-IN')}
                    </span>
                  )}
                  {mem.badgeType && <TrustBadge type={mem.badgeType} label={mem.badgeText} size="sm" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
