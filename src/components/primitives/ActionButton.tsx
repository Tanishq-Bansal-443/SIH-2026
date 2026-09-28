import React from 'react';
import type { ReactNode } from 'react';

export type ActionVerb =
  | 'INSPECT EVIDENCE'
  | 'TRACE CONSTRAINT'
  | 'VIEW MEMORY'
  | 'EXAMINE PEER'
  | 'INSPECT SIGNAL'
  | 'EXPAND MODEL'
  | 'FOLLOW EVIDENCE'
  | 'VIEW ARCHITECTURE'
  | 'FOLLOW VEHICLE'
  | 'RUN BLACKOUT REHEARSAL'
  | 'CLOSE INSPECTION';

interface ActionButtonProps {
  action: ActionVerb | string;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'brass';
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  action,
  onClick,
  variant = 'default',
  icon,
  disabled = false,
  className = '',
  ariaLabel,
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'tn-btn-primary';
      case 'brass':
        return 'tn-btn-brass';
      case 'default':
      default:
        return '';
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || action}
      className={`tn-btn ${getVariantClass()} ${className}`}
    >
      {icon && <span className="w-3.5 h-3.5 flex items-center justify-center">{icon}</span>}
      <span>{action}</span>
    </button>
  );
};
