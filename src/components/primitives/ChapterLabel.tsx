import React from 'react';

interface ChapterLabelProps {
  number: string;
  label: string;
  isActive?: boolean;
}

export const ChapterLabel: React.FC<ChapterLabelProps> = ({ number, label, isActive = false }) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`font-mono text-xs font-semibold px-1.5 py-0.5 rounded-sm border ${
          isActive
            ? 'bg-[#B89562]/10 border-[#B89562] text-[#B89562]'
            : 'bg-[#151719] border-[#35383A] text-[#747570]'
        }`}
      >
        {number}
      </span>
      <span
        className={`font-sans text-xs font-semibold tracking-wider ${
          isActive ? 'text-[#E8E6E1]' : 'text-[#747570]'
        }`}
      >
        {label}
      </span>
    </div>
  );
};
