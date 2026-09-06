import React from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import { DollarSign, TrendingUp, Sparkles, Plus, Calendar, ArrowUpRight } from 'lucide-react';

export const ExpensesView: React.FC = () => {
  const { expenses } = useHomeOS();

  const totalThisMonth = 8420;

  const categories = [
    { name: 'Maintenance', amount: 3200, percent: 38, color: '#F59E0B' },
    { name: 'Society', amount: 2500, percent: 30, color: '#3B82F6' },
    { name: 'Electricity', amount: 1840, percent: 22, color: '#EF4444' },
    { name: 'Other', amount: 880, percent: 10, color: '#10B981' }
  ];

  const monthlyHistory = [
    { month: 'Apr', amount: 5400 },
    { month: 'May', amount: 6200 },
    { month: 'Jun', amount: 7100 },
    { month: 'Jul', amount: 5900 },
    { month: 'Aug', amount: 6800 },
    { month: 'Sep', amount: 8420 }
  ];

  const maxSpend = 9000;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '26px' }}>💰</span>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Home Expenses & Bills
            </h1>
          </div>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Unified ledger tracking repairs, utility consumption, society dues, and appliance investments.
          </p>
        </div>

        <button
          onClick={() => alert('Add expense item dialog')}
          className="btn-primary"
        >
          <Plus size={16} />
          <span>+ Add Expense</span>
        </button>
      </div>

      {/* AI Spending Insight Alert */}
      <div style={{
        backgroundColor: '#FFFBEB',
        border: '1px solid #FDE68A',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          backgroundColor: '#FEF3C7',
          color: '#D97706',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Sparkles size={18} />
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#92400E' }}>
            💡 HomeOS Financial Insight
          </div>
          <div style={{ fontSize: '13px', color: '#B45309' }}>
            You spent <strong>18% more on maintenance</strong> this month than your typical household average due to the washing machine repair and pre-festival AC preparation.
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.2fr) minmax(320px, 1.8fr)', gap: '24px' }}>
        
        {/* Total Month Card */}
        <div className="card-clean" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>
              September 2026 Total Household Spend
            </div>
            <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)', margin: '8px 0 16px' }}>
              ₹{totalThisMonth.toLocaleString('en-IN')}
            </div>

            {/* Category Breakdown Bar */}
            <div style={{ width: '100%', height: '10px', borderRadius: '999px', display: 'flex', overflow: 'hidden', marginBottom: '18px' }}>
              {categories.map((c, i) => (
                <div key={i} style={{ width: `${c.percent}%`, backgroundColor: c.color }} title={`${c.name}: ₹${c.amount}`} />
              ))}
            </div>

            {/* Category List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {categories.map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: c.color }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{c.name}</span>
                  </div>
                  <strong style={{ color: 'var(--text-primary)' }}>₹{c.amount.toLocaleString('en-IN')}</strong>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', fontSize: '11px', color: 'var(--text-muted)' }}>
            ✓ Invoices automatically linked from Digital Home Twin
          </div>
        </div>

        {/* 6-Month Trend Chart (Clean SVG) */}
        <div className="card-clean" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Monthly Household Expense Trend
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Last 6 Months</span>
          </div>

          {/* Bar Chart Visualization */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '180px',
            padding: '10px 10px 0',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            {monthlyHistory.map((item, idx) => {
              const heightPercent = Math.round((item.amount / maxSpend) * 100);
              const isCurrent = idx === monthlyHistory.length - 1;
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: isCurrent ? 'var(--ai-primary)' : 'var(--text-muted)' }}>
                    ₹{(item.amount / 1000).toFixed(1)}k
                  </span>
                  <div style={{
                    width: '34px',
                    height: `${heightPercent}%`,
                    backgroundColor: isCurrent ? '#4F46E5' : '#E5E7EB',
                    borderRadius: '6px 6px 0 0',
                    transition: 'all 0.3s ease-out'
                  }} />
                  <span style={{ fontSize: '11px', fontWeight: isCurrent ? 800 : 500, color: isCurrent ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span>Monthly Average: <strong>₹6,600</strong></span>
            <span>Annual Run-Rate: <strong>₹79,200</strong></span>
          </div>
        </div>

      </div>

      {/* Transaction Records List */}
      <div className="card-clean" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px' }}>
          Recent Logged Payments & Receipts
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {expenses.map(e => (
            <div
              key={e.id}
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-app)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {e.note}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {e.category} • {e.date}
                </div>
              </div>
              <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                ₹{e.amount.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
