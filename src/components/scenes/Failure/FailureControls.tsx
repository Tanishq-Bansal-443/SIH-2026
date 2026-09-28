import React from 'react';
import { ActionButton } from '../../primitives/ActionButton';
import { ShieldAlert, Radio, Activity, ArrowRight } from 'lucide-react';
import { useExperience } from '../../../state/ExperienceContext';

interface FailureControlsProps {
  isBlackout: boolean;
  onToggleBlackout: () => void;
  onInspectDrift: () => void;
  onInspectSignal: () => void;
}

export const FailureControls: React.FC<FailureControlsProps> = ({
  isBlackout,
  onToggleBlackout,
  onInspectDrift,
  onInspectSignal,
}) => {
  const { setChapter } = useExperience();

  return (
    <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#35383A]/60 bg-[#0B0D0F]/85 backdrop-blur-sm p-3 rounded-sm">
      {/* Primary Analytical Interaction Controls */}
      <div className="flex items-center gap-2">
        <ActionButton
          action={isBlackout ? 'RESTORE GNSS SIGNAL' : 'TRIGGER GNSS BLACKOUT'}
          variant="primary"
          icon={<ShieldAlert className="w-3.5 h-3.5" />}
          onClick={onToggleBlackout}
        />

        <ActionButton
          action="INSPECT DRIFT"
          icon={<Activity className="w-3.5 h-3.5" />}
          onClick={onInspectDrift}
        />

        <ActionButton
          action="INSPECT SIGNAL"
          icon={<Radio className="w-3.5 h-3.5" />}
          onClick={onInspectSignal}
        />
      </div>

      {/* Chapter 03 Restrained Transition Action */}
      <div className="flex items-center gap-2">
        <ActionButton
          action="CONTINUE TO CORE"
          variant="brass"
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          onClick={() => setChapter('03')}
        />
      </div>
    </div>
  );
};
