import React from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import { Home, Cpu, FileText, Package, Bot, AlertOctagon } from 'lucide-react';
import { ActiveTab } from '../../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setIsEmergencyModalOpen } = useHomeOS();

  const navItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'twin' as ActiveTab, label: 'Twin', icon: <Cpu size={20} /> },
    { id: 'documents' as ActiveTab, label: 'Docs', icon: <FileText size={20} /> },
    { id: 'appliances' as ActiveTab, label: 'Assets', icon: <Package size={20} /> },
    { id: 'assistant' as ActiveTab, label: 'Ask AI', icon: <Bot size={20} /> }
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '64px',
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 40,
      padding: '0 8px',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.05)'
    }}>
      {navItems.map(item => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              padding: '6px 12px',
              color: isActive ? 'var(--ai-primary)' : 'var(--text-muted)',
              fontWeight: isActive ? 700 : 500,
              fontSize: '11px',
              transition: 'all 0.15s'
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
