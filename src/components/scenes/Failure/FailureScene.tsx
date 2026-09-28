import React, { useState, useEffect } from 'react';
import { useExperience } from '../../../state/ExperienceContext';
import { FailureTrajectories } from './FailureTrajectories';
import { FailureControls } from './FailureControls';
import { getChapterById } from '../../../data/chapters';

export const FailureScene: React.FC = () => {
  const { setGNSSState, gnssState, reducedMotion, setInspectingNodeId } = useExperience();
  const [blackoutActive, setBlackoutActive] = useState<boolean>(false);
  const activeChap = getChapterById('02');

  // Synchronize SoftGNSS state in global context
  useEffect(() => {
    if (blackoutActive) {
      setGNSSState('unavailable');
    } else {
      setGNSSState('unreliable');
    }
  }, [blackoutActive, setGNSSState]);

  const handleToggleBlackout = () => {
    setBlackoutActive((prev) => !prev);
  };

  const getNarrativeCopy = () => {
    if (blackoutActive || gnssState === 'unavailable') {
      return 'GNSS is unavailable. The IMU provides motion continuity, but sensor uncertainty accumulates over distance.';
    }
    return 'GNSS quality is unreliable. Trigger blackout to observe unassisted inertial dead reckoning divergence.';
  };

  return (
    <main
      aria-label="Chapter 02 Failure Analytical Canvas"
      className="relative flex-1 bg-[#0B0D0F] overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none"
    >
      {/* Background Cartographic Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#35383A_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Chapter 02 Narrative Overlay Header */}
      <div className="relative z-10 max-w-xl space-y-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="tn-tag tn-tag-warning">02 FAILURE</span>
          <span className="font-mono text-xs text-[#71869A] tracking-wider uppercase">
            ANALYTICAL DRIFT SPECIFICATION
          </span>
        </div>
        <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#E8E6E1] tracking-tight">
          {activeChap.title}
        </h2>
        <div className="p-3 bg-[#151719]/90 border border-[#35383A] rounded-sm backdrop-blur-sm pointer-events-auto">
          <p className="font-mono text-xs text-[#E8E6E1] font-medium leading-relaxed">
            "{getNarrativeCopy()}"
          </p>
        </div>
      </div>

      {/* Chapter 02 SVG Cartographic Scene */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <svg
          className="w-full h-full max-w-5xl max-h-[700px] p-4 sm:p-8"
          viewBox="0 0 1000 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Analytical Trajectories & Integration Diagram */}
          <FailureTrajectories
            gnssState={gnssState}
            blackoutActive={blackoutActive}
            reducedMotion={reducedMotion}
          />

          {/* Baseline Non-Telemetry Safeguard Disclaimer */}
          <text x="20" y="580" fill="#747570" fontSize="10" fontFamily="JetBrains Mono">
            VISUALIZATION: CONCEPTUAL REASONING CANVAS (NON-TELEMETRY)
          </text>
        </svg>
      </div>

      {/* Contextual Interaction Controls */}
      <FailureControls
        isBlackout={blackoutActive || gnssState === 'unavailable'}
        onToggleBlackout={handleToggleBlackout}
        onInspectDrift={() => setInspectingNodeId('node-imu')}
        onInspectSignal={() => setInspectingNodeId('node-gnss')}
      />
    </main>
  );
};
