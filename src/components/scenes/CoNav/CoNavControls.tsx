import React from 'react';
import { ActionButton } from '../../primitives/ActionButton';
import { UserCheck, Eye, ArrowRight, Layers } from 'lucide-react';
import { useExperience } from '../../../state/ExperienceContext';

interface CoNavControlsProps {
  onExaminePeer: () => void;
  onInspectEvidence: () => void;
  onTraceConsistency: () => void;
  selectedPeerCallsign: string;
  isTracingConsistency: boolean;
  showEvidencePacketModal: boolean;
}

export const CoNavControls: React.FC<CoNavControlsProps> = ({
  onExaminePeer,
  onInspectEvidence,
  onTraceConsistency,
  selectedPeerCallsign,
  isTracingConsistency,
  showEvidencePacketModal,
}) => {
  const { setChapter } = useExperience();

  return (
    <div
      aria-label="CoNav Chapter Control Toolbar"
      className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#35383A]/60 bg-[#0B0D0F]/85 backdrop-blur-sm p-3 rounded-sm"
    >
      <div className="flex flex-wrap items-center gap-2">
        {/* Cycle / Select Peer Button */}
        <ActionButton
          action={`EXAMINE PEER [${selectedPeerCallsign.split(' ')[0]}]`}
          variant="primary"
          icon={<UserCheck className="w-3.5 h-3.5" />}
          onClick={onExaminePeer}
          ariaLabel="Examine Peer Vehicle evidence profile"
        />

        {/* Inspect Peer V2X Packet Button */}
        <ActionButton
          action="INSPECT EVIDENCE"
          variant={showEvidencePacketModal ? 'brass' : 'default'}
          icon={<Eye className="w-3.5 h-3.5" />}
          onClick={onInspectEvidence}
          ariaLabel="Inspect Peer V2X Witness Packet Payload"
        />

        {/* Trace Peer Validation Checks Button */}
        <ActionButton
          action={isTracingConsistency ? 'TRACING CHECKS...' : 'TRACE PEER CONSISTENCY'}
          variant={isTracingConsistency ? 'brass' : 'default'}
          icon={<Layers className="w-3.5 h-3.5" />}
          onClick={onTraceConsistency}
          ariaLabel="Trace 4-Step Peer Consistency Checks"
        />
      </div>

      {/* Chapter 06 -> Chapter 07 Transition Primary CTA */}
      <div className="flex items-center gap-2">
        <ActionButton
          action="CONTINUE TO FIRE DRILL"
          variant="brass"
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          onClick={() => setChapter('07')}
          ariaLabel="Continue to Chapter 07 FireDrill Readiness"
        />
      </div>
    </div>
  );
};
