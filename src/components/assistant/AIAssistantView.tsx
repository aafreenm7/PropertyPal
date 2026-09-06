import React, { useState, useRef, useEffect } from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import {
  Bot,
  Send,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileText,
  CornerDownLeft
} from 'lucide-react';
import { TrustBadge } from '../common/TrustBadge';

export const AIAssistantView: React.FC = () => {
  const {
    chatMessages,
    sendMessageToAI,
    clearChat,
    setActiveTab,
    setSelectedAppliance,
    appliances
  } = useHomeOS();

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'What needs my attention this week?',
    'When was my AC last serviced?',
    'Which warranties expire soon?',
    'How much did we spend on repairs this year?',
    'Show me my property documents.',
    'When is my property tax due?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = () => {
    if (!inputVal.trim()) return;
    sendMessageToAI(inputVal.trim());
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleActionClick = (target: string) => {
    if (target === 'view_bill' || target === 'go_dashboard') {
      setActiveTab('dashboard');
    } else if (target === 'view_appliance_ac') {
      const ac = appliances.find(a => a.id === 'app-ac-01');
      if (ac) setSelectedAppliance(ac);
      setActiveTab('appliances');
    } else if (target === 'review_insurance') {
      setActiveTab('insurance');
    } else if (target === 'go_appliances') {
      setActiveTab('appliances');
    } else {
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)', minHeight: '600px', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--ai-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)'
            }}>
              <Bot size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Ask HomeOS
              </h1>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Household-grounded AI intelligence. Only answers from your verified home records.
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#6D28D9',
            backgroundColor: '#F5F3FF',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid #DDD6FE'
          }}>
            🟣 Context: Pune 2 BHK Apartment
          </span>

          <button
            onClick={clearChat}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="Reset conversation"
          >
            <RotateCcw size={12} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => sendMessageToAI(p)}
            style={{
              whiteSpace: 'nowrap',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              transition: 'all 0.15s',
              boxShadow: 'var(--shadow-sm)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#6366F1';
              e.currentTarget.style.color = '#4F46E5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
        padding: '24px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start',
                gap: '4px',
                maxWidth: '85%',
                alignSelf: isUser ? 'flex-end' : 'flex-start'
              }}
            >
              {/* Message Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                color: 'var(--text-muted)',
                marginBottom: '2px'
              }}>
                <span style={{ fontWeight: 700 }}>
                  {isUser ? 'Aafreen (You)' : 'HomeOS Twin Intelligence'}
                </span>
                <span>• {msg.timestamp}</span>
              </div>

              {/* Message Body */}
              <div style={{
                backgroundColor: isUser ? '#111827' : 'var(--bg-app)',
                color: isUser ? '#FFFFFF' : 'var(--text-primary)',
                padding: '14px 18px',
                borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                border: isUser ? 'none' : '1px solid var(--border-subtle)',
                fontSize: '14px',
                lineHeight: 1.5,
                boxShadow: isUser ? '0 4px 10px rgba(0,0,0,0.1)' : 'none',
                width: '100%'
              }}>
                <div>{msg.text}</div>

                {/* Grounding Source Attribution Chips */}
                {msg.groundedIn && (
                  <div style={{
                    marginTop: '10px',
                    paddingTop: '8px',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Grounded In:
                    </span>
                    {msg.groundedIn.map((src, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '10px',
                          fontWeight: 600,
                          backgroundColor: '#EEF2FF',
                          color: '#4338CA',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          border: '1px solid #C7D2FE',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <FileText size={10} /> {src}
                      </span>
                    ))}
                  </div>
                )}

                {/* Structured Structured Data Cards (Rule 27 Requirement) */}
                {msg.structuredData && (
                  <div style={{
                    marginTop: '14px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-subtle)',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {msg.structuredData.heading}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {msg.structuredData.items.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '10px 12px',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: item.urgency === 'urgent' ? '#FEF2F2' : item.urgency === 'attention' ? '#FFFBEB' : '#ECFDF5',
                            border: `1px solid ${item.urgency === 'urgent' ? '#FECACA' : item.urgency === 'attention' ? '#FDE68A' : '#A7F3D0'}`,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{
                              fontSize: '13px',
                              fontWeight: 700,
                              color: item.urgency === 'urgent' ? '#991B1B' : item.urgency === 'attention' ? '#92400E' : '#065F46'
                            }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                              {item.details}
                            </div>
                          </div>

                          {item.actionText && item.actionTarget && (
                            <button
                              onClick={() => handleActionClick(item.actionTarget!)}
                              style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                backgroundColor: item.urgency === 'urgent' ? '#EF4444' : '#F59E0B',
                                color: 'white',
                                padding: '4px 10px',
                                borderRadius: 'var(--radius-sm)'
                              }}
                            >
                              {item.actionText}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Summary Badge and Quick Actions */}
                    <div style={{
                      marginTop: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {msg.structuredData.summaryBadge && (
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#6366F1' }}>
                          ⚡ {msg.structuredData.summaryBadge}
                        </span>
                      )}

                      {msg.structuredData.actionButtons && (
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {msg.structuredData.actionButtons.map((btn, bIdx) => (
                            <button
                              key={bIdx}
                              onClick={() => handleActionClick(btn.actionTarget)}
                              className="btn-primary"
                              style={{ fontSize: '11px', padding: '5px 10px' }}
                            >
                              {btn.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border-subtle)',
        padding: '6px 12px 6px 20px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <input
          type="text"
          placeholder="Ask something about your home (e.g. When was my AC serviced?)..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            color: 'var(--text-primary)',
            background: 'transparent'
          }}
        />
        <button
          onClick={handleSend}
          className="btn-ai"
          style={{ borderRadius: 'var(--radius-full)', padding: '10px 18px' }}
        >
          <span>Ask</span>
          <Send size={15} />
        </button>
      </div>

    </div>
  );
};
