import React from 'react';
import type { GNSSQualityState } from '../../types/experience';
import { Satellite } from 'lucide-react';

interface SystemStateIndicatorProps {
  gnssState: GNSSQualityState;
  firedrillActive?: boolean;
}

export const SystemStateIndicator: React.FC<SystemStateIndicatorProps> = ({
  gnssState,
  firedrillActive = false,
}) => {
  const getBadgeConfig = () => {
    switch (gnssState) {
      case 'healthy':
        return {
          label: 'SOFT-GNSS: HEALTHY',
          colorClass: 'tn-tag-validated',
          dotBg: 'bg-[#78947F]',
        };
      case 'degrading':
        return {
          label: 'SOFT-GNSS: DEGRADED',
          colorClass: 'tn-tag-warning',
          dotBg: 'bg-[#A88A58]',
        };
      case 'unreliable':
        return {
          label: 'SOFT-GNSS: UNRELIABLE',
          colorClass: 'tn-tag-warning',
          dotBg: 'bg-[#A88A58]',
        };
      case 'unavailable':
      default:
        return {
          label: 'SOFT-GNSS: UNAVAILABLE (DENIED)',
          colorClass: 'tn-tag-rejected',
          dotBg: 'bg-[#9B625E]',
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <div className="flex items-center gap-3">
      <div className={`tn-tag ${config.colorClass}`}>
        <Satellite className="w-3.5 h-3.5" />
        <span className={`w-1.5 h-1.5 rounded-full ${config.dotBg} animate-pulse`} />
        <span>{config.label}</span>
      </div>

      {firedrillActive && (
        <div className="tn-tag tn-tag-brass">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B89562]" />
          <span>SHADOW NAV: FIRE DRILL ACTIVE</span>
        </div>
      )}
    </div>
  );
};
