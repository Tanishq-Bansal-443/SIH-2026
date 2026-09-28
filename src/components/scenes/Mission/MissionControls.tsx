import React from 'react';
import { ActionButton } from '../../primitives/ActionButton';
import { Play, Pause, Radio, ArrowRight, RotateCcw } from 'lucide-react';
import { useExperience } from '../../../state/ExperienceContext';

interface MissionControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  onInspectSignal: () => void;
  isSettled: boolean;
}

export const MissionControls: React.FC<MissionControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onReset,
  onInspectSignal,
  isSettled,
}) => {
  const { setChapter } = useExperience();

  return (
    <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#35383A]/60 bg-[#0B0D0F]/85 backdrop-blur-sm p-3 rounded-sm">
      {/* Primary Interaction Controls */}
      <div className="flex items-center gap-2">
        <ActionButton
          action={isPlaying ? 'PAUSE MOTION' : 'FOLLOW THE VEHICLE'}
          variant="primary"
          icon={isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          onClick={onTogglePlay}
        />

        <ActionButton
          action="INSPECT SIGNAL"
          icon={<Radio className="w-3.5 h-3.5" />}
          onClick={onInspectSignal}
        />

        {isSettled && (
          <ActionButton
            action="RESET NARRATIVE"
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={onReset}
          />
        )}
      </div>

      {/* Chapter 02 Restrained Transition Action */}
      <div className="flex items-center gap-2">
        <ActionButton
          action="CONTINUE TO FAILURE"
          variant="brass"
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          onClick={() => setChapter('02')}
        />
      </div>
    </div>
  );
};
