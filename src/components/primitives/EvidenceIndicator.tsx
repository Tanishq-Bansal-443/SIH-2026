import React from 'react';
import type { EvidenceType } from '../../types/experience';

interface EvidenceIndicatorProps {
  type: EvidenceType;
  label: string;
  isActive?: boolean;
  status?: 'active' | 'degraded' | 'rejected' | 'standby';
  onClick?: () => void;
}

export const EvidenceIndicator: React.FC<EvidenceIndicatorProps> = ({
  label,
  isActive = false,
  status = 'active',
  onClick,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'border-[#78947F] text-[#78947F] bg-[#78947F]/10';
      case 'degraded':
        return 'border-[#A88A58] text-[#A88A58] bg-[#A88A58]/10';
      case 'rejected':
        return 'border-[#9B625E] text-[#9B625E] bg-[#9B625E]/10';
      case 'standby':
      default:
        return 'border-[#35383A] text-[#747570] bg-[#151719]';
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`tn-tag cursor-pointer transition-all ${
        isActive ? 'ring-2 ring-[#71869A] ring-offset-1 ring-offset-[#0B0D0F]' : ''
      } ${getStatusColor()}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span className="font-mono text-[11px] font-medium tracking-wider">{label}</span>
    </button>
  );
};
