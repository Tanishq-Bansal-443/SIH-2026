import React from 'react';

interface TechnicalLabelProps {
  label: string;
  value?: string | number;
  status?: 'validated' | 'warning' | 'rejected' | 'steel' | 'brass' | 'muted';
  icon?: React.ReactNode;
  className?: string;
}

export const TechnicalLabel: React.FC<TechnicalLabelProps> = ({
  label,
  value,
  status = 'steel',
  icon,
  className = '',
}) => {
  const getStatusDotColor = () => {
    switch (status) {
      case 'validated':
        return 'bg-[#78947F]';
      case 'warning':
        return 'bg-[#A88A58]';
      case 'rejected':
        return 'bg-[#9B625E]';
      case 'brass':
        return 'bg-[#B89562]';
      case 'muted':
        return 'bg-[#747570]';
      case 'steel':
      default:
        return 'bg-[#71869A]';
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 font-mono text-xs ${className}`}>
      <span className={`w-2 h-2 rounded-full ${getStatusDotColor()}`} />
      {icon && <span className="text-[#A7A6A1]">{icon}</span>}
      <span className="tn-tech-label text-[#71869A]">{label}</span>
      {value !== undefined && <span className="font-mono text-[#E8E6E1] font-medium">{value}</span>}
    </div>
  );
};
