import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ orientation = 'horizontal', className = '' }) => {
  if (orientation === 'vertical') {
    return <div className={`w-[1px] bg-[#35383A] self-stretch ${className}`} />;
  }
  return <div className={`h-[1px] bg-[#35383A] w-full ${className}`} />;
};
