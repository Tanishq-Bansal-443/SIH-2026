import React, { useState, useCallback, useEffect } from 'react';
import { useExperience } from '../../../state/ExperienceContext';
import { CoNavCanvas, CONAV_PEERS } from './CoNavCanvas';
import type { CoNavPeerDetail } from './CoNavCanvas';
import { CoNavControls } from './CoNavControls';
import { getChapterById } from '../../../data/chapters';
import { ShieldAlert } from 'lucide-react';

export const CoNavScene: React.FC = () => {
  const {
    selectedPeerId,
    setSelectedPeerId,
    reducedMotion,
    setInspectingNodeId,
    setActiveEvidence,
    setActiveAction,
  } = useExperience();

  const [activeValidationStep, setActiveValidationStep] = useState<number | null>(null);
  const [isTracingConsistency, setIsTracingConsistency] = useState<boolean>(false);

  const activeChap = getChapterById('06');

  // Default to Peer A if no peer selected
  const currentPeerId = selectedPeerId || 'peer-a';
  const selectedPeer: CoNavPeerDetail =
    CONAV_PEERS.find((p) => p.id === currentPeerId) || CONAV_PEERS[1];

  // Sync selected peer with experience context & technical panel
  useEffect(() => {
    setActiveEvidence('peer');
    setInspectingNodeId('node-peer');
  }, [setActiveEvidence, setInspectingNodeId]);

  const handleSelectPeer = useCallback(
    (peerId: string) => {
      setSelectedPeerId(peerId);
      setActiveValidationStep(null);
      setIsTracingConsistency(false);
      setActiveAction('EXAMINE_PEER');
    },
    [setSelectedPeerId, setActiveAction]
  );

  // EXAMINE PEER button click cycler
  const handleExaminePeer = () => {
    const peerIds = CONAV_PEERS.map((p) => p.id);
    const currentIndex = peerIds.indexOf(currentPeerId);
    const nextIndex = (currentIndex + 1) % peerIds.length;
    handleSelectPeer(peerIds[nextIndex]);
  };

  // INSPECT EVIDENCE button click
  const handleInspectEvidence = () => {
    setActiveAction('INSPECT_EVIDENCE');
  };

  // TRACE CONSISTENCY sequence step animator
  const handleTraceConsistency = () => {
    if (isTracingConsistency) return;
    setIsTracingConsistency(true);
    setActiveValidationStep(0);
    setActiveAction('TRACE_CONSTRAINT');

    const stepInterval = setInterval(() => {
      setActiveValidationStep((prevStep) => {
        if (prevStep === null || prevStep >= 3) {
          clearInterval(stepInterval);
          setIsTracingConsistency(false);
          return null;
        }
        return prevStep + 1;
      });
    }, 1200);
  };

  return (
    <main
      aria-label="Chapter 06 Cooperative Navigation Scene Canvas"
      className="relative flex-1 bg-[#0B0D0F] overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none"
    >
      {/* Background Cartographic Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#35383A_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Chapter 06 Narrative Overlay Header */}
      <div className="relative z-10 max-w-xl space-y-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="tn-tag tn-tag-brass">06 CoNAV</span>
          <span className="font-mono text-xs text-[#71869A] tracking-wider uppercase">
            CONFIDENCE-WEIGHTED PEER WITNESS ARBITRATION
          </span>
        </div>
        <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#E8E6E1] tracking-tight">
          {activeChap.title}
        </h2>

        {/* Selected Peer Technical Detail Subpanel */}
        <div className="p-3 bg-[#151719]/95 border border-[#35383A] rounded-sm backdrop-blur-sm pointer-events-auto space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#E8E6E1]">
              TARGET: {selectedPeer.callsign}
            </span>
            <span
              className={`tn-tag text-[9px] ${
                selectedPeer.trustStatus === 'SUPPORTING'
                  ? 'tn-tag-green'
                  : selectedPeer.trustStatus === 'STALE'
                  ? 'tn-tag-brass'
                  : selectedPeer.trustStatus === 'REJECTED'
                  ? 'tn-tag-red'
                  : 'tn-tag-steel'
              }`}
            >
              {selectedPeer.trustStatus}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] font-mono border-t border-[#35383A] pt-1.5">
            <div>
              <span className="text-[#71869A]">ROAD CONTEXT: </span>
              <span className="text-[#A7A6A1]">{selectedPeer.roadSegment}</span>
            </div>
            <div>
              <span className="text-[#71869A]">SPEED / HEADING: </span>
              <span className="text-[#A7A6A1]">
                {selectedPeer.speedKmh} km/h @ {selectedPeer.headingDeg}°
              </span>
            </div>
            <div>
              <span className="text-[#71869A]">UNCERTAINTY: </span>
              <span className="text-[#B89562]">{selectedPeer.uncertaintyQualitative}</span>
            </div>
            <div>
              <span className="text-[#71869A]">JURY ROLE: </span>
              <span className="text-[#E8E6E1] font-semibold">{selectedPeer.evidenceRole}</span>
            </div>
          </div>

          {selectedPeer.rejectionReason && (
            <div className="flex items-center gap-1.5 pt-1 text-[#9B625E] font-mono text-[10px]">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
              <span>REJECTION: {selectedPeer.rejectionReason}</span>
            </div>
          )}
        </div>
      </div>

      {/* Chapter 06 Visual Cartographic SVG Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <svg
          className="w-full h-full max-w-5xl max-h-[700px] p-4 sm:p-8"
          viewBox="0 0 1000 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <CoNavCanvas
            selectedPeerId={currentPeerId}
            onSelectPeer={handleSelectPeer}
            activeValidationStep={activeValidationStep}
            showEvidencePacketModal={false}
            reducedMotion={reducedMotion}
          />

          {/* Non-Telemetry Safeguard Disclaimer */}
          <text x="20" y="580" fill="#747570" fontSize="10" fontFamily="JetBrains Mono">
            VISUALIZATION: CONCEPTUAL REASONING CANVAS (NON-TELEMETRY)
          </text>
        </svg>
      </div>

      {/* Action Controls Toolbar */}
      <CoNavControls
        onExaminePeer={handleExaminePeer}
        onInspectEvidence={handleInspectEvidence}
        onTraceConsistency={handleTraceConsistency}
        selectedPeerCallsign={selectedPeer.callsign}
        isTracingConsistency={isTracingConsistency}
        showEvidencePacketModal={false}
      />
    </main>
  );
};
