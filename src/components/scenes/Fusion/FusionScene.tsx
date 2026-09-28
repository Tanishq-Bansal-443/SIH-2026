import React, { useState, useCallback } from 'react';
import { useExperience } from '../../../state/ExperienceContext';
import { FusionCanvas, FUSION_SOURCES } from './FusionCanvas';
import type { SoftGnssQuality } from './FusionCanvas';
import { FusionControls } from './FusionControls';
import { getChapterById } from '../../../data/chapters';

export const FusionScene: React.FC = () => {
  const { reducedMotion, setInspectingNodeId, setActiveEvidence, setGNSSState } = useExperience();

  const [activeSourceId, setActiveSourceId] = useState<string>('src-gnss');
  const [softGnssQuality, setSoftGnssQuality] = useState<SoftGnssQuality>('DEGRADED');
  const [showTopoLockConflict, setShowTopoLockConflict] = useState<boolean>(false);

  const activeChap = getChapterById('05');
  const activeSource = FUSION_SOURCES.find((s) => s.id === activeSourceId) || FUSION_SOURCES[0];

  const handleSelectSource = useCallback(
    (sourceId: string) => {
      setActiveSourceId(sourceId);
      const src = FUSION_SOURCES.find((s) => s.id === sourceId);
      if (src) {
        setActiveEvidence(src.type);
        setInspectingNodeId(src.id === 'src-gnss' ? 'node-gnss' : src.id === 'src-imu' ? 'node-imu' : 'node-topology');
      }
    },
    [setActiveEvidence, setInspectingNodeId]
  );

  // Stepping interaction for FOLLOW EVIDENCE
  const handleFollowEvidence = () => {
    const currentIdx = FUSION_SOURCES.findIndex((s) => s.id === activeSourceId);
    const nextIdx = (currentIdx + 1) % FUSION_SOURCES.length;
    handleSelectSource(FUSION_SOURCES[nextIdx].id);
  };

  // SoftGNSS Quality state cycler for INSPECT SIGNAL
  const handleInspectSignal = () => {
    const qualities: SoftGnssQuality[] = ['STRONG', 'DEGRADED', 'UNRELIABLE', 'DENIED'];
    const currentIdx = qualities.indexOf(softGnssQuality);
    const nextQuality = qualities[(currentIdx + 1) % qualities.length];
    setSoftGnssQuality(nextQuality);

    // Map SoftGNSS quality to global GNSS quality state in context
    if (nextQuality === 'STRONG') setGNSSState('healthy');
    else if (nextQuality === 'DEGRADED') setGNSSState('degrading');
    else if (nextQuality === 'UNRELIABLE') setGNSSState('unreliable');
    else setGNSSState('unavailable');

    handleSelectSource('src-gnss');
  };

  // TopoLock constraint evaluation trigger
  const handleTraceConstraint = () => {
    setShowTopoLockConflict((prev) => !prev);
    handleSelectSource('src-topology');
  };

  return (
    <main
      aria-label="Chapter 05 Trust & Fusion Scene Canvas"
      className="relative flex-1 bg-[#0B0D0F] overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none"
    >
      {/* Background Cartographic Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#35383A_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Chapter 05 Narrative Overlay Header */}
      <div className="relative z-10 max-w-xl space-y-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="tn-tag tn-tag-brass">05 FUSION</span>
          <span className="font-mono text-xs text-[#71869A] tracking-wider uppercase">
            EVIDENCE ARBITRATION & TOPOLOCK GATE
          </span>
        </div>
        <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#E8E6E1] tracking-tight">
          {activeChap.title}
        </h2>

        {/* Selected Evidence Source Subpanel */}
        <div className="p-3 bg-[#151719]/95 border border-[#35383A] rounded-sm backdrop-blur-sm pointer-events-auto space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#B89562]">
              EVIDENCE STREAM: {activeSource.name.toUpperCase()}
            </span>
            <span className="tn-tag tn-tag-steel text-[9px]">
              SOFT-GNSS: {softGnssQuality}
            </span>
          </div>
          <p className="font-mono text-[10px] text-[#71869A] uppercase">ROLE: {activeSource.role}</p>
          <p className="font-sans text-xs text-[#A7A6A1] leading-relaxed pt-1">
            "Evidence quality changes continuously. TrustFusion weights every source by consistency, while TopoLock enforces kinematic and road topology constraints."
          </p>
        </div>
      </div>

      {/* Chapter 05 SVG Instrumentation Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <svg
          className="w-full h-full max-w-5xl max-h-[700px] p-4 sm:p-8"
          viewBox="0 0 1000 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <FusionCanvas
            activeSourceId={activeSourceId}
            onSelectSource={handleSelectSource}
            softGnssQuality={softGnssQuality}
            showTopoLockConflict={showTopoLockConflict}
            reducedMotion={reducedMotion}
          />

          {/* Baseline Non-Telemetry Safeguard Disclaimer */}
          <text x="20" y="580" fill="#747570" fontSize="10" fontFamily="JetBrains Mono">
            VISUALIZATION: CONCEPTUAL REASONING CANVAS (NON-TELEMETRY)
          </text>
        </svg>
      </div>

      {/* Contextual Technical Action Controls */}
      <FusionControls
        onFollowEvidence={handleFollowEvidence}
        onInspectSignal={handleInspectSignal}
        onTraceConstraint={handleTraceConstraint}
        softGnssQuality={softGnssQuality}
        showTopoLockConflict={showTopoLockConflict}
      />
    </main>
  );
};
