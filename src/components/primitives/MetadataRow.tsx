import React from 'react';

interface MetadataRowProps {
  label: string;
  value: string | number;
  unit?: string;
  status?: 'validated' | 'warning' | 'rejected' | 'steel' | 'brass' | 'muted';
  illustrative?: boolean;
}

export const MetadataRow: React.FC<MetadataRowProps> = ({
  label,
  value,
  unit,
  status = 'steel',
  illustrative = false,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'validated':
        return 'text-[#78947F]';
      case 'warning':
        return 'text-[#A88A58]';
      case 'rejected':
        return 'text-[#9B625E]';
      case 'brass':
        return 'text-[#B89562]';
      case 'muted':
        return 'text-[#747570]';
      case 'steel':
      default:
        return 'text-[#8EA4B8]';
    }
  };

  return (
    <div className="flex items-baseline justify-between py-1 border-b border-[#35383A]/40 text-xs font-mono">
      <div className="flex items-center gap-1.5">
        <span className="tn-metadata-key">{label}</span>
        {illustrative && (
          <span className="text-[9px] px-1 py-0.2 rounded bg-[#35383A]/50 text-[#747570]">
            CONCEPTUAL
          </span>
        )}
      </div>
      <div className={`flex items-baseline gap-1 font-mono font-medium ${getStatusColor()}`}>
        <span>{value}</span>
        {unit && <span className="text-[10px] text-[#747570]">{unit}</span>}
      </div>
    </div>
  );
};
