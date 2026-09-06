import React from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import { ActiveTab } from '../../types';
import {
  Home,
  Cpu,
  FileText,
  Package,
  Wrench,
  DollarSign,
  Shield,
  Calendar,
  Users,
  Bot,
  Settings,
  AlertTriangle,
  Landmark,
  Layers,
  Heart
} from 'lucide-react';

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeColor?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    needsAttention,
    setIsEmergencyModalOpen,
    setIsHealthModalOpen,
    health
  } = useHomeOS();

  const pendingCount = needsAttention.filter(n => !n.isResolved).length;

  const sections: NavSection[] = [
    {
      title: 'HOME',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <Home size={18} /> }
      ]
    },
    {
      title: 'UNDERSTAND',
      items: [
        { id: 'twin', label: 'Digital Home Twin', icon: <Cpu size={18} />, badge: 'Live AI', badgeColor: '#8B5CF6' },
        { id: 'documents', label: 'Documents', icon: <FileText size={18} /> },
        { id: 'appliances', label: 'Appliances', icon: <Package size={18} /> }
      ]
    },
    {
      title: 'MANAGE',
      items: [
        { id: 'maintenance', label: 'Maintenance', icon: <Wrench size={18} />, badge: 2, badgeColor: '#F59E0B' },
        { id: 'expenses', label: 'Expenses', icon: <DollarSign size={18} /> },
        { id: 'insurance', label: 'Insurance', icon: <Shield size={18} />, badge: '18d', badgeColor: '#EF4444' }
      ]
    },
    {
      title: 'REMEMBER',
      items: [
        { id: 'calendar', label: 'Calendar & Dues', icon: <Calendar size={18} /> }
      ]
    },
    {
      title: 'ASK',
      items: [
        { id: 'assistant', label: 'Ask HomeOS', icon: <Bot size={18} />, badge: 'Smart', badgeColor: '#4F46E5' }
      ]
    },
    {
      title: 'SHARE',
      items: [
        { id: 'family', label: 'Family Access', icon: <Users size={18} /> }
      ]
    }
  ];

  return (
    <aside className="sidebar-wrapper">
      {/* Property Chip Header */}
      <div style={{
        padding: '24px 20px 16px',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '15px' }}>🏢</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Pune Apartment
            </span>
          </div>
          <span style={{
            fontSize: '10px',
            fontWeight: 700,
            color: '#047857',
            backgroundColor: '#D1FAE5',
            padding: '2px 6px',
            borderRadius: 'var(--radius-full)'
          }}>
            2 BHK
          </span>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Kalyani Nagar • 1,050 sq.ft.
        </div>

        {/* Quick Health Bar in sidebar */}
        <div
          onClick={() => setIsHealthModalOpen(true)}
          style={{
            marginTop: '12px',
            padding: '8px 12px',
            backgroundColor: 'var(--bg-app)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'background 0.15s'
          }}
          title="Click to view Home Health breakdown"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={14} style={{ color: '#10B981' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Home Health</span>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#059669' }}>
            {health.overall}/100
          </span>
        </div>
      </div>

      {/* Navigation Sections */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px'
      }}>
        {sections.map((sec) => (
          <div key={sec.title}>
            <div style={{
              fontSize: '10px',
              fontWeight: 800,
              color: 'var(--text-light)',
              letterSpacing: '0.08em',
              padding: '0 10px 6px',
              textTransform: 'uppercase'
            }}>
              {sec.title}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {sec.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isActive ? 'var(--text-primary)' : 'transparent',
                      color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '13px',
                      transition: 'all var(--transition-fast)',
                      textAlign: 'left',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-app)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : (item.badgeColor || '#4F46E5') + '18',
                        color: isActive ? '#FFFFFF' : (item.badgeColor || '#4F46E5')
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Future Integrations concept */}
        <div>
          <div style={{
            fontSize: '10px',
            fontWeight: 800,
            color: 'var(--text-light)',
            letterSpacing: '0.08em',
            padding: '0 10px 6px',
            textTransform: 'uppercase'
          }}>
            FUTURE
          </div>
          <button
            onClick={() => setActiveTab('future_gov')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: activeTab === 'future_gov' ? 'var(--text-primary)' : 'transparent',
              color: activeTab === 'future_gov' ? '#FFFFFF' : 'var(--text-secondary)',
              fontWeight: activeTab === 'future_gov' ? 600 : 500,
              fontSize: '13px',
              width: '100%',
              textAlign: 'left'
            }}
          >
            <Landmark size={18} style={{ color: activeTab === 'future_gov' ? '#FFFFFF' : 'var(--text-muted)' }} />
            <span>Gov Registry Hub</span>
          </button>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '9px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--status-urgent-bg)',
            color: '#DC2626',
            fontWeight: 700,
            fontSize: '12px',
            border: '1px solid var(--status-urgent-border)',
            transition: 'all 0.15s'
          }}
        >
          <AlertTriangle size={15} />
          <span>Emergency Mode</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 10px',
            borderRadius: 'var(--radius-md)',
            color: activeTab === 'settings' ? 'var(--text-primary)' : 'var(--text-muted)',
            fontSize: '12px',
            fontWeight: 600,
            width: '100%',
            textAlign: 'left'
          }}
        >
          <Settings size={15} />
          <span>Settings & Privacy</span>
        </button>
      </div>
    </aside>
  );
};
