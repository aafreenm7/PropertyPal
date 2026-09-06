import React, { useState } from 'react';
import { useHomeOS } from '../../context/HomeOSContext';
import { DocumentItem } from '../../types';
import {
  FileText,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  Download,
  Eye,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { TrustBadge } from '../common/TrustBadge';
import { DocumentDetailModal } from './DocumentDetailModal';

export const DocumentsView: React.FC = () => {
  const {
    documents,
    setIsUploadModalOpen,
    setIsConflictModalOpen,
    selectedDocument,
    setSelectedDocument
  } = useHomeOS();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchDoc, setSearchDoc] = useState<string>('');

  const categories = ['All', 'Property', 'Appliances', 'Insurance', 'Financial'];

  const filteredDocs = documents.filter(doc => {
    const matchesCat = activeCategory === 'All' || doc.category === activeCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchDoc.toLowerCase()) || doc.docType.toLowerCase().includes(searchDoc.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header & Add Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '26px' }}>📄</span>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Documents
            </h1>
          </div>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Organized by household meaning, verified against official sources, and understood by AI.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsConflictModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              fontSize: '13px',
              fontWeight: 700,
              border: '1px solid #FECACA'
            }}
          >
            <AlertTriangle size={15} />
            <span>View Area Conflict Demo</span>
          </button>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="btn-ai"
          >
            <Plus size={16} />
            <span>+ Add Document</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '6px', backgroundColor: 'var(--bg-surface)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: activeCategory === cat ? 700 : 500,
                backgroundColor: activeCategory === cat ? 'var(--text-primary)' : 'transparent',
                color: activeCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
                transition: 'all 0.15s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-full)',
          padding: '6px 14px',
          width: '260px'
        }}>
          <Search size={15} style={{ color: 'var(--text-muted)', marginRight: '8px' }} />
          <input
            type="text"
            placeholder="Filter documents..."
            value={searchDoc}
            onChange={(e) => setSearchDoc(e.target.value)}
            style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '12px', color: 'var(--text-primary)' }}
          />
        </div>
      </div>

      {/* Meaning-Based Document Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px'
      }}>
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            onClick={() => setSelectedDocument(doc)}
            className="card-clean"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              border: doc.hasConflict ? '1px solid #FECACA' : '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: doc.category === 'Property' ? '#ECFDF5' : doc.category === 'Appliances' ? '#EEF2FF' : doc.category === 'Insurance' ? '#FFFBEB' : '#F3F4F6',
                  color: doc.category === 'Property' ? '#047857' : doc.category === 'Appliances' ? '#4F46E5' : doc.category === 'Insurance' ? '#D97706' : '#4B5563',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  {doc.category === 'Property' ? '🏛️' : doc.category === 'Appliances' ? '📦' : doc.category === 'Insurance' ? '🛡️' : '💳'}
                </div>

                <TrustBadge type={doc.trustBadge} size="sm" />
              </div>

              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {doc.title}
              </h3>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {doc.docType} • {doc.fileSize}
              </div>

              {/* Extracted Details Snippet */}
              {doc.extractedDetails && (
                <div style={{
                  marginTop: '12px',
                  backgroundColor: 'var(--bg-app)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 10px',
                  fontSize: '11px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  {Object.entries(doc.extractedDetails).slice(0, 2).map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{k}:</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{v}</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '11px',
              color: 'var(--text-muted)'
            }}>
              <span>Uploaded {doc.uploadDate}</span>
              <span style={{ fontWeight: 600, color: 'var(--accent-brand)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Eye size={12} /> Inspect
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state if filtered */}
      {filteredDocs.length === 0 && (
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>📂</div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Your home memory is empty for this filter.
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '380px', margin: '4px auto 16px' }}>
            Upload your first document and HomeOS AI will organize, verify, and remember it for you.
          </p>
          <button onClick={() => setIsUploadModalOpen(true)} className="btn-ai">
            <Plus size={16} />
            <span>Add Document</span>
          </button>
        </div>
      )}

      {/* Document Detail Preview Modal */}
      {selectedDocument && (
        <DocumentDetailModal
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}

    </div>
  );
};
