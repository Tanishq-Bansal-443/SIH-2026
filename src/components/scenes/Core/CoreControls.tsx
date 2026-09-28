import React from 'react';
import { ActionButton } from '../../primitives/ActionButton';
import { Layers, Radio, ArrowRight, RefreshCw } from 'lucide-react';
import { useExperience } from '../../../state/ExperienceContext';

interface CoreControlsProps {
  onFollowEvidence: () => void;
  onInspectSignal: () => void;
  onResetLoop: () => void;
}

export const CoreControls: React.FC<CoreControlsProps> = ({
  onFollowEvidence,
  onInspectSignal,
  onResetLoop,
}) => {
  const { setChapter } = useExperience();

  return (
    <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#35383A]/60 bg-[#0B0D0F]/85 backdrop-blur-sm p-3 rounded-sm">
      {/* Primary Interaction Controls */}
      <div className="flex items-center gap-2">
        <ActionButton
          action="FOLLOW EVIDENCE"
          variant="primary"
          icon={<Layers className="w-3.5 h-3.5" />}
          onClick={onFollowEvidence}
        />

        <ActionButton
          action="INSPECT SIGNAL"
          icon={<Radio className="w-3.5 h-3.5" />}
          onClick={onInspectSignal}
        />

        <ActionButton
          action="RESET LOOP"
          icon={<RefreshCw className="w-3.5 h-3.5" />}
          onClick={onResetLoop}
        />
      </div>

      {/* Chapter 04 Transition Button */}
      <div className="flex items-center gap-2">
        <ActionButton
          action="CONTINUE TO ROAD INTELLIGENCE"
          variant="brass"
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          onClick={() => setChapter('04')}
        />
      </div>
    </div>
  );
};
