import React from 'react';
import { ActionButton } from '../../primitives/ActionButton';
import { Play, RotateCcw, FileSearch, GitCommit } from 'lucide-react';

interface SystemControlsProps {
  onFollowSystem: () => void;
  onTraceComponent: () => void;
  onInspectNode: () => void;
  onReplayLoop: () => void;
  isLoopRunning: boolean;
  activeComponentTraceName?: string | null;
}

export const SystemControls: React.FC<SystemControlsProps> = ({
  onFollowSystem,
  onTraceComponent,
  onInspectNode,
  onReplayLoop,
  isLoopRunning,
  activeComponentTraceName,
}) => {
  return (
    <div
      aria-label="System Synthesis Action Controls Toolbar"
      className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#35383A]/60 bg-[#0B0D0F]/85 backdrop-blur-sm p-3 rounded-sm"
    >
      {/* Left Group: Primary Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <ActionButton
          action={isLoopRunning ? 'FOLLOWING LOOP...' : 'FOLLOW SYSTEM'}
          variant="brass"
          icon={<Play className="w-3.5 h-3.5" />}
          onClick={onFollowSystem}
          disabled={isLoopRunning}
        />

        <ActionButton
          action={
            activeComponentTraceName
              ? `TRACE: ${activeComponentTraceName.toUpperCase()}`
              : 'TRACE COMPONENT'
          }
          variant={activeComponentTraceName ? 'brass' : 'default'}
          icon={<GitCommit className="w-3.5 h-3.5" />}
          onClick={onTraceComponent}
          disabled={isLoopRunning}
        />

        <ActionButton
          action="INSPECT NODE"
          icon={<FileSearch className="w-3.5 h-3.5" />}
          onClick={onInspectNode}
        />
      </div>

      {/* Right Group: Loop Replay */}
      <div className="flex items-center gap-2">
        <ActionButton
          action="REPLAY SYSTEM LOOP"
          icon={<RotateCcw className="w-3.5 h-3.5" />}
          onClick={onReplayLoop}
          disabled={isLoopRunning}
        />
      </div>
    </div>
  );
};
