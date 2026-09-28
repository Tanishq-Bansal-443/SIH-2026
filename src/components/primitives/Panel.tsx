import React from 'react';
import type { ReactNode } from 'react';

interface PanelProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeType?: 'steel' | 'brass' | 'validated' | 'warning' | 'rejected';
  className?: string;
  footer?: ReactNode;
}

export const Panel: React.FC<PanelProps> = ({
  children,
  title,
  subtitle,
  badge,
  badgeType = 'steel',
  className = '',
  footer,
}) => {
  return (
    <div className={`tn-panel flex flex-col p-4 bg-[#151719] border border-[#35383A] rounded-sm ${className}`}>
      {(title || badge) && (
        <div className="flex items-center justify-between pb-3 border-b border-[#35383A] mb-3">
          <div>
            {title && <h3 className="font-sans font-semibold text-sm text-[#E8E6E1]">{title}</h3>}
            {subtitle && <p className="font-mono text-xs text-[#A7A6A1] mt-0.5">{subtitle}</p>}
          </div>
          {badge && <span className={`tn-tag tn-tag-${badgeType}`}>{badge}</span>}
        </div>
      )}
      <div className="flex-1">{children}</div>
      {footer && <div className="pt-3 mt-3 border-t border-[#35383A]">{footer}</div>}
    </div>
  );
};
