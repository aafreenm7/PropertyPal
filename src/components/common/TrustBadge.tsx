import React from 'react';
import { TrustBadgeType } from '../../types';
import { ShieldCheck, User, Sparkles, AlertCircle, AlertTriangle, HelpCircle } from 'lucide-react';

interface TrustBadgeProps {
  type: TrustBadgeType;
  label?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ type, label, className = '', size = 'sm' }) => {
  const isSm = size === 'sm';
  const sizeClasses = isSm ? 'text-[11px] py-0.5 px-2.5' : 'text-xs py-1 px-3';
  const iconSize = isSm ? 12 : 14;

  switch (type) {
    case 'gov':
      return (
        <span
          className={`badge-trust badge-gov ${sizeClasses} ${className}`}
          title="Verified against state property registry or official utility record"
        >
          <ShieldCheck size={iconSize} className="text-emerald-600" />
          <span>{label || 'Government Verified'}</span>
        </span>
      );
    case 'ai':
      return (
        <span
          className={`badge-trust badge-ai ${sizeClasses} ${className}`}
          title="Extracted and structured automatically by HomeOS AI Document Engine"
        >
          <Sparkles size={iconSize} className="text-purple-600" />
          <span>{label || 'AI Extracted'}</span>
        </span>
      );
    case 'user':
      return (
        <span
          className={`badge-trust badge-user ${sizeClasses} ${className}`}
          title="Manually uploaded or confirmed by household member"
        >
          <User size={iconSize} className="text-blue-600" />
          <span>{label || 'User Provided'}</span>
        </span>
      );
    case 'conflict':
      return (
        <span
          className={`badge-trust badge-urgent ${sizeClasses} ${className}`}
          title="Conflicting data detected between official record and uploaded document"
        >
          <AlertTriangle size={iconSize} className="text-red-600" />
          <span>{label || 'Information Conflict'}</span>
        </span>
      );
    case 'attention':
    case 'unverified':
      return (
        <span
          className={`badge-trust badge-attention ${sizeClasses} ${className}`}
          title="Requires verification from official receipt or technician"
        >
          <HelpCircle size={iconSize} className="text-amber-600" />
          <span>{label || 'Needs Verification'}</span>
        </span>
      );
    default:
      return null;
  }
};
