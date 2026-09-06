import React, { useState, useRef, useEffect } from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import {
  Search,
  Plus,
  Bell,
  Sparkles,
  AlertOctagon,
  X,
  FileText,
  Package,
  Wrench,
  ChevronRight,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { TrustBadge } from '../common/TrustBadge';

export const Header: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    setIsUploadModalOpen,
    setIsEmergencyModalOpen,
    setIsOnboardingOpen,
    isDemoMode,
    setIsDemoMode,
    appliances,
    documents,
    maintenanceList,
    needsAttention,
    setActiveTab,
    setSelectedAppliance,
    setSelectedDocument,
    resetToDefaultDemo
  } = useHomeOS();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const notifContainerRef = useRef<HTMLDivElement>(null);

  // Close search and notification dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (notifContainerRef.current && !notifContainerRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered search results
  const q = searchQuery.toLowerCase().trim();
  const matchedAppliances = q ? appliances.filter(a => a.name.toLowerCase().includes(q) || a.brand.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)) : [];
  const matchedDocs = q ? documents.filter(d => d.title.toLowerCase().includes(q) || d.category.toLowerCase().includes(q) || d.docType.toLowerCase().includes(q)) : [];
  const matchedMaint = q ? maintenanceList.filter(m => m.title.toLowerCase().includes(q) || m.asset.toLowerCase().includes(q)) : [];
  const totalResults = matchedAppliances.length + matchedDocs.length + matchedMaint.length;

  return (
    <header style={{
      height: '72px',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px'
    }}>
      {/* Brand & Mobile toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div 
          onClick={() => setActiveTab('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'var(--ai-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize: '18px',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)'
          }}>
            H
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                HomeOS
              </span>
              <span style={{
                background: 'rgba(99, 102, 241, 0.1)',
                color: 'var(--ai-primary)',
                fontSize: '10px',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Twin AI
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.1 }}>
              Your home remembers
            </div>
          </div>
        </div>
      </div>

      {/* Global Search Bar */}
      <div ref={searchContainerRef} style={{ position: 'relative', width: '380px', maxWidth: '40vw' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-app)',
          border: `1px solid ${isSearchFocused ? 'var(--border-focus)' : 'var(--border-subtle)'}`,
          borderRadius: 'var(--radius-full)',
          padding: '8px 16px',
          transition: 'all var(--transition-fast)',
          boxShadow: isSearchFocused ? '0 0 0 3px rgba(99, 102, 241, 0.15)' : 'none'
        }}>
          <Search size={16} style={{ color: 'var(--text-muted)', marginRight: '10px', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search documents, appliances, bills, people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            style={{
              border: 'none',
              background: 'transparent',
              width: '100%',
              fontSize: '13px',
              color: 'var(--text-primary)'
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ color: 'var(--text-muted)', padding: '2px' }}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isSearchFocused && searchQuery && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-xl)',
            maxHeight: '380px',
            overflowY: 'auto',
            zIndex: 50,
            padding: '8px'
          }}>
            {totalResults === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                No records found matching "{searchQuery}" in your Digital Home Twin.
              </div>
            ) : (
              <div>
                {matchedAppliances.length > 0 && (
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', padding: '6px 10px', textTransform: 'uppercase' }}>
                      Appliances ({matchedAppliances.length})
                    </div>
                    {matchedAppliances.map(app => (
                      <div
                        key={app.id}
                        onClick={() => {
                          setSelectedAppliance(app);
                          setIsSearchFocused(false);
                          setActiveTab('appliances');
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 10px',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          transition: 'background 0.15s'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-app)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '16px' }}>{app.icon}</span>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{app.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{app.locationInHome} • {app.statusText}</div>
                          </div>
                        </div>
                        <TrustBadge type={app.trustBadge} size="sm" />
                      </div>
                    ))}
                  </div>
                )}

                {matchedDocs.length > 0 && (
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', padding: '6px 10px', textTransform: 'uppercase' }}>
                      Documents ({matchedDocs.length})
                    </div>
                    {matchedDocs.map(doc => (
                      <div
                        key={doc.id}
                        onClick={() => {
                          setSelectedDocument(doc);
                          setIsSearchFocused(false);
                          setActiveTab('documents');
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 10px',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          transition: 'background 0.15s'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-app)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FileText size={16} style={{ color: 'var(--text-muted)' }} />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{doc.title}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{doc.category} • {doc.docType}</div>
                          </div>
                        </div>
                        <TrustBadge type={doc.trustBadge} size="sm" />
                      </div>
                    ))}
                  </div>
                )}

                {matchedMaint.length > 0 && (
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', padding: '6px 10px', textTransform: 'uppercase' }}>
                      Maintenance ({matchedMaint.length})
                    </div>
                    {matchedMaint.map(m => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setIsSearchFocused(false);
                          setActiveTab('maintenance');
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 10px',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          transition: 'background 0.15s'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-app)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Wrench size={16} style={{ color: 'var(--text-muted)' }} />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{m.title}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{m.asset} • {m.dateText}</div>
                          </div>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                          ₹{m.cost.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action CTA Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Hackathon Judge Demo Stepper Trigger */}
        <button
          onClick={() => setIsDemoMode(!isDemoMode)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: isDemoMode ? '#4338CA' : '#EEF2FF',
            color: isDemoMode ? '#FFFFFF' : '#4F46E5',
            fontSize: '13px',
            fontWeight: 700,
            border: '1px solid #C7D2FE',
            transition: 'all var(--transition-fast)'
          }}
          title="Interactive 2-minute Guided Hackathon Demo for Judges"
        >
          <Sparkles size={14} className="animate-spin-slow" />
          <span>🎬 Judge Demo Tour</span>
        </button>

        {/* Emergency Mode Trigger */}
        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 12px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--status-urgent-bg)',
            color: '#B91C1C',
            fontSize: '13px',
            fontWeight: 700,
            border: '1px solid var(--status-urgent-border)',
            transition: 'all var(--transition-fast)'
          }}
          title="Open Emergency Crisis Sheet for Family"
        >
          <AlertOctagon size={15} />
          <span>🚨 Emergency</span>
        </button>

        {/* + Add Document CTA */}
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="btn-ai"
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>+ Add Document</span>
        </button>

        {/* Notifications Dropdown */}
        <div ref={notifContainerRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            style={{
              position: 'relative',
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)'
            }}
          >
            <Bell size={18} />
            {needsAttention.filter(n => !n.isResolved).length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: 'var(--status-urgent)',
                color: 'white',
                fontSize: '10px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--bg-surface)'
              }}>
                {needsAttention.filter(n => !n.isResolved).length}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '340px',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-xl)',
              zIndex: 50,
              padding: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>
                  Home Notifications
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {needsAttention.filter(n => !n.isResolved).length} pending
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {needsAttention.filter(n => !n.isResolved).map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      if (item.category === 'urgent') setActiveTab('dashboard');
                      else if (item.category === 'maintenance') {
                        setSelectedAppliance(appliances.find(a => a.id === item.assetId) || appliances[0]);
                        setActiveTab('appliances');
                      } else if (item.category === 'insurance') setActiveTab('insurance');
                    }}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: item.urgency === 'urgent' ? 'var(--status-urgent-bg)' : 'var(--status-attention-bg)',
                      border: `1px solid ${item.urgency === 'urgent' ? 'var(--status-urgent-border)' : 'var(--status-attention-border)'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: item.urgency === 'urgent' ? '#991B1B' : '#92400E'
                      }}>
                        {item.title}
                      </span>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: item.urgency === 'urgent' ? '#DC2626' : '#D97706'
                      }}>
                        {item.dueInText}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {item.subtitle}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile avatar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '4px 10px 4px 4px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--bg-app)',
          border: '1px solid var(--border-subtle)',
          cursor: 'pointer'
        }}
        onClick={() => setIsOnboardingOpen(true)}
        title="View Profile / Onboarding Tour"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Aafreen"
            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Aafreen</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Home Owner</div>
          </div>
        </div>
      </div>
    </header>
  );
};
