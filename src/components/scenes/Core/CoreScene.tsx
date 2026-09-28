import React, { useState, useCallback } from 'react';
import { useExperience } from '../../../state/ExperienceContext';
import { CoreLoopDiagram } from './CoreLoopDiagram';
import type { LoopStageId } from './CoreLoopDiagram';
import { CoreControls } from './CoreControls';
import { getChapterById } from '../../../data/chapters';
import type { EvidenceType } from '../../../types/experience';

const STAGE_ORDER: LoopStageId[] = [
  'SENSE',
  'LEARN',
  'REMEMBER',
  'CROSS_CHECK',
  'NAVIGATE',
  'REHEARSE',
  'LEARN_AGAIN',
];

const STAGE_DESCRIPTIONS: Record<LoopStageId, { title: string; subtitle: string; body: string; evidenceType: EvidenceType }> = {
  SENSE: {
    title: 'STAGE 01 — SENSE (RAW HETEROGENEOUS SIGNALS)',
    subtitle: 'ACCELEROMETER • GYROSCOPE • MAGNETOMETER • GNSS • OPTIONAL IMU',
    body: 'TrueNorth begins with heterogeneous sensor evidence. Raw multi-modal sensor streams are ingested continuously without assuming any single source is an absolute ground truth authority.',
    evidenceType: 'imu',
  },
  LEARN: {
    title: 'STAGE 02 — LEARN (LEARNED MOTION ESTIMATES)',
    subtitle: 'AI SPEED ESTIMATOR • MOTION CLASSIFICATION • VEHICLE DNA • ROAD SIGNATURES',
    body: 'AI neural estimators have specific estimation jobs: forward speed estimation from vibration, motion state classification, vehicle suspension response learning, and road impulse recognition.',
    evidenceType: 'speed',
  },
  REMEMBER: {
    title: 'STAGE 03 — REMEMBER (CONTEXTUAL MEMORY)',
    subtitle: 'ROAD DNA • ROADMEMORY • VEHICLE DNA • PAST FIRE DRILL HISTORY',
    body: 'TrueNorth does not treat observations as disposable. Repeated road signatures and vehicle characteristics are stored in compact spatial memory to act as landmarks when re-encountered.',
    evidenceType: 'memory',
  },
  CROSS_CHECK: {
    title: 'STAGE 04 — CROSS-CHECK (MULTI-EVIDENCE VERIFICATION)',
    subtitle: 'SOFT-GNSS • AI SPEED • ROADSENSE • TOPOLOCK • CoNAV WITNESSES',
    body: 'Evidence from GNSS quality, AI speed, road memory, map topology, kinematic constraints, and peer vehicles is cross-checked for spatial and physical consistency before influencing state fusion.',
    evidenceType: 'topology',
  },
  NAVIGATE: {
    title: 'STAGE 05 — NAVIGATE (CONTINUOUS STATE FUSION)',
    subtitle: 'POSITION • VELOCITY • ORIENTATION • BIAS • QUALITATIVE CONFIDENCE',
    body: 'Adaptive fusion updates continuous navigation state (position, velocity, orientation, and sensor biases), preserving dead-reckoning continuity even through total GNSS outages.',
    evidenceType: 'gnss',
  },
  REHEARSE: {
    title: 'STAGE 06 — REHEARSE (FIRE DRILL SHADOW ENGINE)',
    subtitle: 'SHADOW NAVIGATION • BLACKOUT REHEARSAL • WEAKNESS DIAGNOSIS',
    body: 'FireDrill shadow navigation simulates GNSS blackouts in parallel to evaluate system readiness, heading stability, and drift tendencies without altering live navigation.',
    evidenceType: 'firedrill',
  },
  LEARN_AGAIN: {
    title: 'STAGE 07 — LEARN AGAIN (ADAPTIVE FEEDBACK LOOP)',
    subtitle: 'UPDATE MEMORY • UPDATE CONFIDENCE • ADAPT FUTURE TRUST • SENSE',
    body: 'Rehearsal outcomes and landmark re-observations update memory, expectations, and future trust weights—closing the adaptive reasoning loop back to SENSE.',
    evidenceType: 'road',
  },
};

export const CoreScene: React.FC = () => {
  const { reducedMotion, setActiveEvidence, setInspectingNodeId } = useExperience();
  const [activeStage, setActiveStage] = useState<LoopStageId>('SENSE');
  const activeChap = getChapterById('03');

  const handleSelectStage = useCallback(
    (stageId: LoopStageId) => {
      setActiveStage(stageId);
      const detail = STAGE_DESCRIPTIONS[stageId];
      setActiveEvidence(detail.evidenceType);
    },
    [setActiveEvidence]
  );

  const handleFollowEvidence = () => {
    const currentIdx = STAGE_ORDER.indexOf(activeStage);
    const nextIdx = (currentIdx + 1) % STAGE_ORDER.length;
    handleSelectStage(STAGE_ORDER[nextIdx]);
  };

  const handleResetLoop = () => {
    handleSelectStage('SENSE');
  };

  const activeDetail = STAGE_DESCRIPTIONS[activeStage];

  return (
    <main
      aria-label="Chapter 03 Core Reasoning Loop Canvas"
      className="relative flex-1 bg-[#0B0D0F] overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none"
    >
      {/* Background Cartographic Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#35383A_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Chapter 03 Narrative Overlay Header */}
      <div className="relative z-10 max-w-xl space-y-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="tn-tag tn-tag-steel">03 CORE</span>
          <span className="font-mono text-xs text-[#71869A] tracking-wider uppercase">
            ADAPTIVE REASONING LOOP
          </span>
        </div>
        <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#E8E6E1] tracking-tight">
          {activeChap.title}
        </h2>
        {/* Active Stage Detail Subpanel */}
        <div className="p-3 bg-[#151719]/95 border border-[#35383A] rounded-sm backdrop-blur-sm pointer-events-auto space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#B89562]">{activeDetail.title}</span>
            <span className="tn-tag tn-tag-steel text-[9px]">{activeStage.replace('_', ' ')}</span>
          </div>
          <p className="font-mono text-[10px] text-[#71869A] uppercase">{activeDetail.subtitle}</p>
          <p className="font-sans text-xs text-[#A7A6A1] leading-relaxed pt-1">
            {activeDetail.body}
          </p>
        </div>
      </div>

      {/* Chapter 03 Interactive Reasoning Loop SVG Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <svg
          className="w-full h-full max-w-5xl max-h-[700px] p-4 sm:p-8"
          viewBox="0 0 1000 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Interactive Core Loop Diagram */}
          <CoreLoopDiagram
            activeStage={activeStage}
            onSelectStage={handleSelectStage}
            reducedMotion={reducedMotion}
          />

          {/* Baseline Non-Telemetry Safeguard Disclaimer */}
          <text x="20" y="580" fill="#747570" fontSize="10" fontFamily="JetBrains Mono">
            VISUALIZATION: CONCEPTUAL REASONING CANVAS (NON-TELEMETRY)
          </text>
        </svg>
      </div>

      {/* Contextual Interaction Controls */}
      <CoreControls
        onFollowEvidence={handleFollowEvidence}
        onInspectSignal={() => setInspectingNodeId('node-gnss')}
        onResetLoop={handleResetLoop}
      />
    </main>
  );
};

