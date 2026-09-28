import React from 'react';
import type { FireDrillStage } from '../../../types/experience';
import { ActionButton } from '../../primitives/ActionButton';
import { Play, RotateCcw, FileSearch, ArrowRight, RefreshCw } from 'lucide-react';

interface FireDrillControlsProps {
  stage: FireDrillStage;
  onStartFireDrill: () => void;
  onInspectDiagnostic: () => void;
  onTraceShadowPath: () => void;
  onContinueToSystem: () => void;
  onResetFireDrill: () => void;
  isTracing: boolean;
}

export const FireDrillControls: React.FC<FireDrillControlsProps> = ({
  stage,
  onStartFireDrill,
  onInspectDiagnostic,
  onTraceShadowPath,
  onContinueToSystem,
  onResetFireDrill,
  isTracing,
}) => {
  const isCompleteOrReview = stage === 'COMPLETE' || stage === 'REVIEW';
  const isRunningOrEvaluating = stage === 'RUNNING' || stage === 'EVALUATING';

  return (
    <div
      aria-label="FireDrill Controls Toolbar"
      className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#35383A]/60 bg-[#0B0D0F]/85 backdrop-blur-sm p-3 rounded-sm"
    >
      {/* Left Group: Primary Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <ActionButton
          action={
            isRunningOrEvaluating
              ? 'SIMULATING BLACKOUT...'
              : isCompleteOrReview
              ? 'REPLAY FIRE DRILL'
              : 'START FIRE DRILL'
          }
          variant="brass"
          icon={isCompleteOrReview ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          onClick={onStartFireDrill}
          disabled={isRunningOrEvaluating}
        />

        <ActionButton
          action="INSPECT DIAGNOSTIC"
          icon={<FileSearch className="w-3.5 h-3.5" />}
          onClick={onInspectDiagnostic}
          variant={isCompleteOrReview ? 'default' : 'default'}
        />

        <ActionButton
          action={isTracing ? 'TRACING SHADOW...' : 'TRACE SHADOW PATH'}
          icon={<RefreshCw className={`w-3.5 h-3.5 ${isTracing ? 'animate-spin' : ''}`} />}
          onClick={onTraceShadowPath}
          disabled={isRunningOrEvaluating || isTracing}
        />
      </div>

      {/* Right Group: Navigation & Reset */}
      <div className="flex items-center gap-2">
        {stage !== 'IDLE' && (
          <ActionButton
            action="RESET REHEARSAL"
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={onResetFireDrill}
          />
        )}

        <ActionButton
          action="CONTINUE TO SYSTEM"
          variant="brass"
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          onClick={onContinueToSystem}
        />
      </div>
    </div>
  );
};
