import React from 'react';
import { ActionButton } from '../../primitives/ActionButton';
import { Radio, Cpu, ArrowRight, RefreshCw, Bookmark } from 'lucide-react';
import { useExperience } from '../../../state/ExperienceContext';

interface RoadControlsProps {
  onInspectEvent: () => void;
  onToggleMemory: () => void;
  showMemoryLayer: boolean;
  onToggleVehicleDna: () => void;
  showVehicleDna: boolean;
  onReplayReobservation: () => void;
  isReobserving: boolean;
}

export const RoadControls: React.FC<RoadControlsProps> = ({
  onInspectEvent,
  onToggleMemory,
  showMemoryLayer,
  onToggleVehicleDna,
  showVehicleDna,
  onReplayReobservation,
  isReobserving,
}) => {
  const { setChapter } = useExperience();

  return (
    <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#35383A]/60 bg-[#0B0D0F]/85 backdrop-blur-sm p-3 rounded-sm">
      {/* Primary Interaction Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <ActionButton
          action="INSPECT ROAD EVENT"
          variant="primary"
          icon={<Radio className="w-3.5 h-3.5" />}
          onClick={onInspectEvent}
        />

        <ActionButton
          action={showMemoryLayer ? 'HIDE ROADMEMORY' : 'VIEW MEMORY'}
          variant={showMemoryLayer ? 'brass' : 'default'}
          icon={<Bookmark className="w-3.5 h-3.5" />}
          onClick={onToggleMemory}
        />

        <ActionButton
          action={showVehicleDna ? 'HIDE VEHICLE DNA' : 'EXAMINE VEHICLE DNA'}
          variant={showVehicleDna ? 'brass' : 'default'}
          icon={<Cpu className="w-3.5 h-3.5" />}
          onClick={onToggleVehicleDna}
        />

        <ActionButton
          action={isReobserving ? 'STOP RE-OBSERVATION' : 'REPLAY RE-OBSERVATION'}
          icon={<RefreshCw className="w-3.5 h-3.5" />}
          onClick={onReplayReobservation}
        />
      </div>

      {/* Chapter 05 Transition CTA */}
      <div className="flex items-center gap-2">
        <ActionButton
          action="CONTINUE TO TRUST & FUSION"
          variant="brass"
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          onClick={() => setChapter('05')}
        />
      </div>
    </div>
  );
};
