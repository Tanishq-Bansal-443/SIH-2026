import React from 'react';
import { ActionButton } from '../../primitives/ActionButton';
import { Layers, Radio, Cpu, ArrowRight, ShieldAlert } from 'lucide-react';
import { useExperience } from '../../../state/ExperienceContext';
import type { SoftGnssQuality } from './FusionCanvas';

interface FusionControlsProps {
  onFollowEvidence: () => void;
  onInspectSignal: () => void;
  onTraceConstraint: () => void;
  softGnssQuality: SoftGnssQuality;
  showTopoLockConflict: boolean;
}

export const FusionControls: React.FC<FusionControlsProps> = ({
  onFollowEvidence,
  onInspectSignal,
  onTraceConstraint,
  softGnssQuality,
  showTopoLockConflict,
}) => {
  const { setChapter } = useExperience();

  return (
    <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#35383A]/60 bg-[#0B0D0F]/85 backdrop-blur-sm p-3 rounded-sm">
      {/* Primary Technical Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <ActionButton
          action="FOLLOW EVIDENCE"
          variant="primary"
          icon={<Layers className="w-3.5 h-3.5" />}
          onClick={onFollowEvidence}
        />

        <ActionButton
          action={`INSPECT SIGNAL (SOFT-GNSS: ${softGnssQuality})`}
          variant={softGnssQuality === 'STRONG' ? 'default' : softGnssQuality === 'DENIED' ? 'primary' : 'brass'}
          icon={<Radio className="w-3.5 h-3.5" />}
          onClick={onInspectSignal}
        />

        <ActionButton
          action={showTopoLockConflict ? 'CLEAR TRAJECTORY CONFLICT' : 'TRACE CONSTRAINT'}
          variant={showTopoLockConflict ? 'brass' : 'default'}
          icon={showTopoLockConflict ? <ShieldAlert className="w-3.5 h-3.5" /> : <Cpu className="w-3.5 h-3.5" />}
          onClick={onTraceConstraint}
        />
      </div>

      {/* Chapter 06 Transition CTA */}
      <div className="flex items-center gap-2">
        <ActionButton
          action="CONTINUE TO CoNAV"
          variant="brass"
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          onClick={() => setChapter('06')}
        />
      </div>
    </div>
  );
};
