import React, { useState } from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import { Users, Plus, ShieldCheck, UserCheck, Lock, Mail, Phone, Check, X } from 'lucide-react';

export const FamilyView: React.FC = () => {
  const { familyMembers, addFamilyMember } = useHomeOS();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [newRole, setNewRole] = useState<'Owner' | 'Family Member' | 'Limited Access'>('Family Member');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addFamilyMember({
      name: newName.trim(),
      relation: newRelation.trim() || 'Family',
      role: newRole,
      accessDescription: newRole === 'Owner'
        ? 'Full Access — Property deeds, financials, and family controls.'
        : newRole === 'Family Member'
        ? 'Bills + Property + Maintenance scheduling privileges.'
        : 'Limited Access — Emergency contacts & shared calendar only.',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '')}@homeos.local`,
      phone: newPhone || '+91 98000 00000',
      permissions: newRole === 'Owner'
        ? ['Manage Property', 'View Financials', 'AI Controls']
        : newRole === 'Family Member'
        ? ['View Bills', 'Schedule Maintenance']
        : ['View Emergency Info']
    });

    setNewName('');
    setNewRelation('');
    setNewEmail('');
    setNewPhone('');
    setIsInviteOpen(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '26px' }}>👨👩👧</span>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Family Access & Sharing
            </h1>
          </div>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Give household members appropriate access to deeds, bills, emergency sheets, and appliance history.
          </p>
        </div>

        <button
          onClick={() => setIsInviteOpen(true)}
          className="btn-ai"
        >
          <Plus size={16} />
          <span>+ Invite Family Member</span>
        </button>
      </div>

      {/* Member Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {familyMembers.map((member) => (
          <div
            key={member.id}
            className="card-clean"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {member.name}
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {member.relation}
                    </div>
                  </div>
                </div>

                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: member.role === 'Owner' ? '#EEF2FF' : member.role === 'Family Member' ? '#ECFDF5' : '#F3F4F6',
                  color: member.role === 'Owner' ? '#4338CA' : member.role === 'Family Member' ? '#047857' : '#4B5563',
                  border: `1px solid ${member.role === 'Owner' ? '#C7D2FE' : member.role === 'Family Member' ? '#A7F3D0' : '#E5E7EB'}`
                }}>
                  {member.role}
                </span>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '14px' }}>
                {member.accessDescription}
              </p>

              {/* Permissions list */}
              <div style={{
                backgroundColor: 'var(--bg-app)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px'
              }}>
                {member.permissions.map((perm, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: '#FFFFFF',
                      color: 'var(--text-primary)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    ✓ {perm}
                  </span>
                ))}
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '11px',
              color: 'var(--text-muted)',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '12px'
            }}>
              <span>{member.phone}</span>
              <span>{member.email}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Member Modal */}
      {isInviteOpen && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setIsInviteOpen(false);
        }}>
          <div className="modal-card" style={{ maxWidth: '520px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                👨👩👧 Invite Household Member
              </h2>
              <button
                onClick={() => setIsInviteOpen(false)}
                style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleInvite} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mansoori"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginTop: '4px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>Relationship</label>
                <input
                  type="text"
                  placeholder="e.g. Spouse / Sibling / Co-Owner"
                  value={newRelation}
                  onChange={(e) => setNewRelation(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginTop: '4px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>Role & Access Level</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginTop: '4px', fontSize: '13px', backgroundColor: '#FFFFFF' }}
                >
                  <option value="Owner">Owner (Full Access to Deeds & Financials)</option>
                  <option value="Family Member">Family Member (Bills + Maintenance + Property)</option>
                  <option value="Limited Access">Limited Access (Emergency info & Calendar only)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn-ai" style={{ flex: 1, justifyContent: 'center' }}>
                  <Check size={16} />
                  <span>Send Household Invite</span>
                </button>
                <button type="button" onClick={() => setIsInviteOpen(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
