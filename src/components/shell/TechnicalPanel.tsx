import React from 'react';
import { useExperience } from '../../state/ExperienceContext';
import { getChapterById } from '../../data/chapters';
import { ActionButton } from '../primitives/ActionButton';
import { MetadataRow } from '../primitives/MetadataRow';
import {
  Activity,
  Layers,
  ChevronUp,
  ChevronDown,
  Compass,
  X,
  GitCommit,
} from 'lucide-react';
import {
  CONCEPTUAL_EVIDENCE_NODES,
  CONCEPTUAL_PEERS,
  CONCEPTUAL_ROAD_EVENTS,
} from '../../data/conceptualFixtures';
import type { EvidenceType } from '../../types/experience';

interface EvidenceItem {
  id: string;
  name: string;
  type: EvidenceType;
  state: string;
  statusType: 'validated' | 'warning' | 'rejected' | 'brass';
  role: string;
  description: string;
  whyItMatters: string;
  systemResponse: string;
}

// Chapter-Specific State-Driven Evidence Fixtures
const getChapterEvidenceItems = (chapterId: string, gnssState: string): EvidenceItem[] => {
  switch (chapterId) {
    case '01': // Mission
      return [
        {
          id: 'ev-softgnss-01',
          name: 'SoftGNSS Stream',
          type: 'gnss',
          state: gnssState === 'healthy' ? 'ACTIVE' : 'DEGRADED',
          statusType: gnssState === 'healthy' ? 'validated' : 'warning',
          role: 'Satellite positioning measurement input',
          description: 'Continuously weighted positioning trust based on satellite geometry and C/N0.',
          whyItMatters: 'Satellite availability can degrade or disappear entirely in urban canyons.',
          systemResponse: 'Treat GNSS as a dynamic weighted input rather than absolute ground truth authority.',
        },
        {
          id: 'ev-imu-01',
          name: 'Triple-Axis IMU',
          type: 'imu',
          state: 'ACTIVE',
          statusType: 'validated',
          role: 'High-rate inertial propagation',
          description: 'Accelerometer and gyroscope motion rate integration.',
          whyItMatters: 'Provides unbroken kinematic continuity when GNSS signal degrades.',
          systemResponse: 'Maintain continuous short-term velocity and orientation propagation.',
        },
      ];

    case '02': // Failure
      return [
        {
          id: 'ev-gnss-02',
          name: 'GNSS Satellite Fix',
          type: 'gnss',
          state: 'UNAVAILABLE',
          statusType: 'rejected',
          role: 'External positioning signal',
          description: 'Satellite fix degraded by severe multipath and signal attenuation.',
          whyItMatters: 'Conventional systems fail or jump wildly during satellite outages.',
          systemResponse: 'Withdraw GNSS authority and rely on cross-checked inertial & road evidence.',
        },
        {
          id: 'ev-dr-02',
          name: 'Pure Dead Reckoning',
          type: 'imu',
          state: 'ACCUMULATING DRIFT',
          statusType: 'warning',
          role: 'Unassisted inertial propagation',
          description: 'Inertial integration accumulating double-integrated accelerometer noise.',
          whyItMatters: 'Unconstrained inertial integration drifts quadratically over time.',
          systemResponse: 'Apply NHC kinematic constraints and RoadSense landmark corrections.',
        },
      ];

    case '03': // Core
      return [
        {
          id: 'ev-loop-03',
          name: '6-Stage Evidence Loop',
          type: 'topology',
          state: 'ACTIVE CYCLE',
          statusType: 'brass',
          role: 'Closed-loop adaptive navigation reasoning',
          description: 'SENSE → LEARN → REMEMBER → CROSS-CHECK → NAVIGATE → REHEARSE → LEARN AGAIN.',
          whyItMatters: 'TrueNorth is not a single ML model; it is an evidence arbitration loop.',
          systemResponse: 'Continuously re-weight evidence trust based on re-observed consistency.',
        },
        {
          id: 'ev-cross-03',
          name: 'Cross-Check Engine',
          type: 'road',
          state: 'ACTIVE',
          statusType: 'validated',
          role: 'Multi-source evidence arbitration',
          description: 'Evaluates IMU, AI speed, road landmarks, and topology together.',
          whyItMatters: 'No single sensor receives absolute decision authority.',
          systemResponse: 'Reject inconsistent sensor updates and maintain EKF integrity.',
        },
      ];

    case '04': // Road
      return [
        {
          id: 'ev-roadsense-04',
          name: 'RoadSense Waveform Engine',
          type: 'road',
          state: 'ACTIVE',
          statusType: 'validated',
          role: 'Physical motion impulse feature extraction',
          description: 'Identifies road curves, speed bumps, and roughness transitions from IMU signals.',
          whyItMatters: 'Physical road characteristics act as spatial landmarks.',
          systemResponse: 'Convert detected physical road impulses into probabilistic location updates.',
        },
        {
          id: 'ev-roadmem-04',
          name: 'RoadMemory Matcher',
          type: 'memory',
          state: 'RE-OBSERVED',
          statusType: 'brass',
          role: 'Persisted spatial landmark constraints',
          description: 'Matches re-observed road feature signatures against compact remembered anchors.',
          whyItMatters: 'Creates discrete localization constraints without needing fixed GPS coordinates.',
          systemResponse: 'Inject spatial anchor correction into EKF fusion state.',
        },
        {
          id: 'ev-dna-04',
          name: 'VehicleDNA Profile',
          type: 'speed',
          state: 'ACTIVE',
          statusType: 'validated',
          role: 'Vehicle-specific dynamics model',
          description: 'Learned suspension and vehicle response profile.',
          whyItMatters: 'Distinguishes vehicle-induced vibrations from true road surface impulses.',
          systemResponse: 'Filter out vehicle chassis noise to isolate true road geometry.',
        },
      ];

    case '05': // Fusion
      return [
        {
          id: 'ev-softgnss-05',
          name: 'SoftGNSS Continuous Trust',
          type: 'gnss',
          state: 'DOWN-WEIGHTED',
          statusType: 'warning',
          role: 'Continuously weighted GNSS evidence',
          description: 'Down-weights satellite authority based on C/N0 and measurement innovation.',
          whyItMatters: 'Prevents degraded satellite fixes from pulling the navigation solution.',
          systemResponse: 'Adjust measurement covariance dynamically in adaptive EKF.',
        },
        {
          id: 'ev-topolock-05',
          name: 'TopoLock NHC Filter',
          type: 'topology',
          state: 'CONSISTENT',
          statusType: 'validated',
          role: 'Map graph topology & kinematic candidate filter',
          description: 'Enforces road topology and Non-Holonomic Constraints (NHC).',
          whyItMatters: 'Vehicles cannot travel off-road or execute impossible sideways moves.',
          systemResponse: 'Reject candidate trajectory hypotheses that violate road network geometry.',
        },
      ];

    case '06': // CoNav
      return [
        {
          id: 'ev-conav-06',
          name: 'CoNav Witness Arbitration',
          type: 'peer',
          state: 'SUPPORTING',
          statusType: 'validated',
          role: 'Confidence-weighted peer V2X evidence',
          description: 'Evaluates nearby vehicles as spatial witnesses via 4-stage jury validation.',
          whyItMatters: 'Vehicles with healthy GNSS can provide spatial constraints to degraded peers.',
          systemResponse: 'Validate peer state against freshness, kinematics, and road topology.',
        },
        {
          id: 'ev-peer-rej-06',
          name: 'Peer Topology Check',
          type: 'peer',
          state: 'REJECTED (VEHICLE-CHARLIE)',
          statusType: 'rejected',
          role: 'Out-of-topology peer rejection',
          description: 'Rejects peer witness state when road segment or altitude conflicts.',
          whyItMatters: 'Proximity alone is insufficient; flyovers and lower roads must not cross-contaminate.',
          systemResponse: 'Discard witness evidence from topologically incompatible peers.',
        },
      ];

    case '07': // FireDrill
      return [
        {
          id: 'ev-firedrill-07',
          name: 'FireDrill Shadow Engine',
          type: 'firedrill',
          state: 'REHEARSAL ACTIVE',
          statusType: 'brass',
          role: 'Parallel GNSS-denied shadow navigation',
          description: 'Simulates satellite outage while retaining GNSS as a hidden reference source.',
          whyItMatters: 'Evaluates system drift tendency and blackout readiness before real failure.',
          systemResponse: 'Isolate shadow navigation state and compare performance against reference.',
        },
        {
          id: 'ev-diag-07',
          name: 'RoadMemory Review Weakness',
          type: 'memory',
          state: 'REVIEW REQUIRED',
          statusType: 'warning',
          role: 'Diagnostic review condition',
          description: 'Re-observation consistency on segment 3 was insufficient.',
          whyItMatters: 'Identifies specific system weaknesses during controlled rehearsal.',
          systemResponse: 'Update system memory and re-weight future evidence trust (LEARN AGAIN).',
        },
      ];

    case '08': // System
    default:
      return [
        {
          id: 'ev-sys-08',
          name: 'Closed-Loop System Blueprint',
          type: 'topology',
          state: 'CONNECTED',
          statusType: 'validated',
          role: 'Complete multi-source navigation synthesis',
          description: 'Integrates SoftGNSS, RoadSense, RoadMemory, TopoLock, CoNav, and FireDrill.',
          whyItMatters: 'TrueNorth builds a continuous navigation decision from dynamic evidence.',
          systemResponse: 'Maintain continuous position, velocity, and orientation across all environments.',
        },
      ];
  }
};

export const TechnicalPanel: React.FC = () => {
  const {
    currentChapter,
    gnssState,
    activeEvidence,
    setActiveEvidence,
    selectedRoadEventId,
    setSelectedRoadEventId,
    selectedPeerId,
    setSelectedPeerId,
    inspectingNodeId,
    setInspectingNodeId,
    activeAction,
    setActiveAction,
  } = useExperience();

  const [isMobileExpanded, setIsMobileExpanded] = React.useState(false);
  const activeChap = getChapterById(currentChapter);
  const chapterEvidenceItems = getChapterEvidenceItems(currentChapter, gnssState);

  // Active contextual inspection objects
  const selectedEvent = CONCEPTUAL_ROAD_EVENTS.find((e) => e.id === selectedRoadEventId);
  const selectedPeer = CONCEPTUAL_PEERS.find((p) => p.id === selectedPeerId);
  const selectedNode = CONCEPTUAL_EVIDENCE_NODES.find((n) => n.id === inspectingNodeId);

  // Active selected evidence item in chapter evidence list
  const activeItem = chapterEvidenceItems.find((item) => item.type === activeEvidence) || chapterEvidenceItems[0];

  const hasActiveInspection = Boolean(activeAction || selectedEvent || selectedPeer || selectedNode);

  const handleClearInspection = () => {
    setActiveAction(null);
    setSelectedRoadEventId(null);
    setSelectedPeerId(null);
    setInspectingNodeId(null);
  };

  return (
    <aside
      aria-label="Chapter Contextual Reasoning Panel"
      role="region"
      className={`bg-[#151719] border-t md:border-t-0 md:border-l border-[#35383A] flex flex-col shrink-0 z-20 transition-all duration-200 ${
        isMobileExpanded ? 'h-[80vh]' : 'h-auto max-h-[170px] md:max-h-none md:h-full'
      } w-full md:w-[350px] xl:w-[380px] overflow-y-auto p-3.5 space-y-3.5 select-none`}
    >
      {/* Mobile Drawer Toggle Bar */}
      <button
        type="button"
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
        className="flex items-center justify-between w-full md:hidden py-1.5 px-2.5 bg-[#0B0D0F] border border-[#35383A] rounded-sm font-mono text-xs text-[#A7A6A1]"
      >
        <span className="font-semibold text-[#E8E6E1]">CONTEXTUAL REASONING AREA</span>
        {isMobileExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>

      {/* ISOLATED BLOCK 1: CHAPTER OVERVIEW & DOMINANT CONCEPT */}
      <div className="p-3.5 bg-[#0B0D0F]/90 border border-[#35383A] rounded-sm space-y-2.5">
        <div className="flex items-center justify-between border-b border-[#35383A] pb-2">
          <div className="flex items-center gap-2">
            <span className="tn-tag tn-tag-brass font-mono text-[10px]">{activeChap.number}</span>
            <span className="font-mono text-xs font-bold text-[#E8E6E1] tracking-wider">
              {activeChap.label}
            </span>
          </div>
          <span
            className={`tn-tag text-[9px] ${
              gnssState === 'healthy' ? 'tn-tag-green' : gnssState === 'unavailable' ? 'tn-tag-red' : 'tn-tag-amber'
            }`}
          >
            GNSS: {gnssState.toUpperCase()}
          </span>
        </div>

        <div>
          <span className="tn-tech-label block mb-0.5">PRIMARY QUESTION</span>
          <p className="font-sans font-semibold text-xs text-[#E8E6E1]">
            "{activeChap.primaryQuestion}"
          </p>
        </div>

        <div>
          <span className="tn-tech-label block mb-0.5">DOMINANT CONCEPT</span>
          <p className="font-sans text-xs text-[#A7A6A1] leading-relaxed">{activeChap.dominantIdea}</p>
        </div>

        <div className="p-2.5 bg-[#151719] border border-[#35383A] rounded-sm">
          <div className="flex items-center gap-1.5 mb-1 text-[#B89562]">
            <Activity className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px] font-semibold tracking-wider">
              TECHNICAL TAKEAWAY
            </span>
          </div>
          <p className="font-mono text-xs text-[#E8E6E1] leading-relaxed">
            {activeChap.technicalTakeaway}
          </p>
        </div>
      </div>

      {/* ISOLATED BLOCK 2: STATE-DRIVEN CHAPTER EVIDENCE STREAMS */}
      <div className="p-3.5 bg-[#0B0D0F]/90 border border-[#35383A] rounded-sm space-y-2.5">
        <div className="flex items-center justify-between border-b border-[#35383A] pb-2">
          <span className="font-mono text-xs font-bold text-[#E8E6E1] tracking-wider">
            STATE-DRIVEN EVIDENCE
          </span>
          <span className="font-mono text-[10px] text-[#71869A]">CHAPTER {activeChap.number}</span>
        </div>

        <div className="space-y-2">
          {chapterEvidenceItems.map((item) => {
            const isSelected = activeEvidence === item.type;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveEvidence(isSelected ? null : item.type);
                  setActiveAction('INSPECT_EVIDENCE');
                }}
                className={`p-2.5 rounded-sm border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#1E2124] border-[#B89562] text-[#E8E6E1]'
                    : 'bg-[#151719]/80 border-[#35383A] text-[#A7A6A1] hover:border-[#71869A]/50'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs mb-1">
                  <span className="font-semibold text-[#E8E6E1]">{item.name}</span>
                  <span
                    className={`tn-tag text-[8px] ${
                      item.statusType === 'validated'
                        ? 'tn-tag-green'
                        : item.statusType === 'rejected'
                        ? 'tn-tag-red'
                        : item.statusType === 'brass'
                        ? 'tn-tag-brass'
                        : 'tn-tag-amber'
                    }`}
                  >
                    {item.state}
                  </span>
                </div>
                <p className="text-[11px] text-[#747570] font-sans line-clamp-2">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ISOLATED BLOCK 3: TECHNICAL ACTIONS TOOLBAR */}
      <div className="p-3.5 bg-[#0B0D0F]/90 border border-[#35383A] rounded-sm space-y-2">
        <span className="font-mono text-xs font-bold text-[#E8E6E1] tracking-wider block border-b border-[#35383A] pb-1.5">
          CONTEXTUAL ACTIONS
        </span>
        <div className="grid grid-cols-2 gap-2">
          <ActionButton
            action="INSPECT EVIDENCE"
            icon={<Layers className="w-3.5 h-3.5" />}
            onClick={() => setActiveAction(activeAction === 'INSPECT_EVIDENCE' ? null : 'INSPECT_EVIDENCE')}
            variant={activeAction === 'INSPECT_EVIDENCE' ? 'brass' : 'default'}
          />
          <ActionButton
            action="TRACE CONSTRAINT"
            icon={<GitCommit className="w-3.5 h-3.5" />}
            onClick={() => setActiveAction(activeAction === 'TRACE_CONSTRAINT' ? null : 'TRACE_CONSTRAINT')}
            variant={activeAction === 'TRACE_CONSTRAINT' ? 'brass' : 'default'}
          />
          <ActionButton
            action="VIEW MEMORY"
            icon={<Activity className="w-3.5 h-3.5" />}
            onClick={() => setActiveAction(activeAction === 'VIEW_MEMORY' ? null : 'VIEW_MEMORY')}
            variant={activeAction === 'VIEW_MEMORY' ? 'brass' : 'default'}
          />
          <ActionButton
            action="EXAMINE PEER"
            icon={<Compass className="w-3.5 h-3.5" />}
            onClick={() => setActiveAction(activeAction === 'EXAMINE_PEER' ? null : 'EXAMINE_PEER')}
            variant={activeAction === 'EXAMINE_PEER' ? 'brass' : 'default'}
          />
        </div>
      </div>

      {/* ISOLATED BLOCK 4: CONTEXTUAL INSPECTION / REASONING BLOCK (SINGLE ACTIVE BLOCK) */}
      {hasActiveInspection && (
        <div className="p-3.5 bg-[#1E2124] border border-[#B89562] rounded-sm space-y-3 relative animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#35383A] pb-2">
            <div className="flex items-center gap-1.5 text-[#B89562]">
              <span className="w-2 h-2 rounded-full bg-[#B89562] animate-pulse" />
              <span className="font-mono text-xs font-bold tracking-wider">
                {activeAction === 'INSPECT_EVIDENCE'
                  ? `INSPECTION: ${activeItem.name.toUpperCase()}`
                  : activeAction === 'TRACE_CONSTRAINT'
                  ? 'CONSTRAINT REASONING CHAIN'
                  : activeAction === 'VIEW_MEMORY'
                  ? 'ROAD MEMORY ANCHOR'
                  : activeAction === 'EXAMINE_PEER' || selectedPeer
                  ? `PEER WITNESS: ${selectedPeer ? selectedPeer.callsign : 'VEHICLE-CHARLIE'}`
                  : selectedEvent
                  ? `ROAD EVENT: ${selectedEvent.label.toUpperCase()}`
                  : selectedNode
                  ? `NODE: ${selectedNode.name.toUpperCase()}`
                  : 'CONTEXT REASONING'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearInspection}
              className="text-[#747570] hover:text-[#E8E6E1] p-0.5"
              aria-label="Clear Inspection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 4A. INSPECT EVIDENCE CONTENT */}
          {activeAction === 'INSPECT_EVIDENCE' && (
            <div className="space-y-2.5 font-mono text-xs">
              <MetadataRow label="WHAT IS THIS?" value={activeItem.name} />
              <MetadataRow
                label="CURRENT STATE"
                value={activeItem.state}
                status={activeItem.statusType}
              />
              <MetadataRow label="SYSTEM ROLE" value={activeItem.role} />
              <div className="pt-1.5 border-t border-[#35383A]">
                <span className="tn-tech-label block mb-0.5">WHY IT MATTERS</span>
                <p className="font-sans text-xs text-[#A7A6A1] leading-relaxed">
                  {activeItem.whyItMatters}
                </p>
              </div>
              <div className="pt-1.5 border-t border-[#35383A]">
                <span className="text-[#B89562] block text-[10px] mb-0.5">SYSTEM RESPONSE</span>
                <p className="font-sans text-xs text-[#E8E6E1] leading-relaxed">
                  {activeItem.systemResponse}
                </p>
              </div>
            </div>
          )}

          {/* 4B. TRACE CONSTRAINT CONTENT */}
          {activeAction === 'TRACE_CONSTRAINT' && (
            <div className="space-y-2.5 font-mono text-xs">
              <span className="tn-tech-label block mb-1">REASONING CHAIN FLOW</span>
              <div className="space-y-1.5 p-2 bg-[#0B0D0F] border border-[#35383A] rounded-sm text-[11px]">
                <div className="flex items-center gap-1.5 text-[#E8E6E1]">
                  <span className="text-[#B89562]">1.</span> ROAD IMPULSE SIGNATURE
                </div>
                <div className="flex items-center gap-1.5 text-[#E8E6E1]">
                  <span className="text-[#B89562]">2.</span> ROAD MEMORY MATCH
                </div>
                <div className="flex items-center gap-1.5 text-[#E8E6E1]">
                  <span className="text-[#B89562]">3.</span> TOPOLOCK NHC FILTER
                </div>
                <div className="flex items-center gap-1.5 text-[#E8E6E1]">
                  <span className="text-[#B89562]">4.</span> TRUSTFUSION EKF
                </div>
                <div className="flex items-center gap-1.5 text-[#78947F] font-bold">
                  <span className="text-[#B89562]">5.</span> FUSED NAVIGATION STATE
                </div>
              </div>
              <p className="font-sans text-xs text-[#A7A6A1] leading-relaxed pt-1">
                Physical road features are matched against remembered anchors. TopoLock rejects off-road candidate trajectories, creating tight spatial constraints without assumed GPS availability.
              </p>
            </div>
          )}

          {/* 4C. VIEW MEMORY CONTENT */}
          {activeAction === 'VIEW_MEMORY' && (
            <div className="space-y-2.5 font-mono text-xs">
              <MetadataRow label="MEMORY STATE" value="RE-OBSERVED & MATCHED" status="brass" />
              <MetadataRow label="LANDMARK EVENT" value="90° Sharp Right Bend (NH-44)" />
              <MetadataRow label="IMU WAVEFORM" value="Yaw rate impulse + lateral accel shift" />
              <MetadataRow label="MATCH STRENGTH" value="HIGH (0.92)" status="validated" illustrative={true} />
              <div className="pt-1.5 border-t border-[#35383A]">
                <span className="text-[#B89562] block text-[10px] mb-0.5">SPATIAL EFFECT</span>
                <p className="font-sans text-xs text-[#E8E6E1] leading-relaxed">
                  Injects localized spatial position correction into EKF fusion state without requiring GPS updates.
                </p>
              </div>
            </div>
          )}

          {/* 4D. EXAMINE PEER CONTENT */}
          {(activeAction === 'EXAMINE_PEER' || selectedPeer) && (
            <div className="space-y-2 font-mono text-xs">
              <MetadataRow label="CALLSIGN" value={selectedPeer ? selectedPeer.callsign : 'VEHICLE-CHARLIE'} />
              <MetadataRow label="SYSTEM ROLE" value="Peer V2X Navigation Witness" />
              <div className="p-2 bg-[#0B0D0F] border border-[#35383A] rounded-sm space-y-1 text-[11px]">
                <div className="flex justify-between text-[#78947F]">
                  <span>✓ Temporal Freshness:</span>
                  <span>120ms ago</span>
                </div>
                <div className="flex justify-between text-[#78947F]">
                  <span>✓ Kinematic Consistency:</span>
                  <span>Speed / Heading match</span>
                </div>
                <div className="flex justify-between text-[#9B625E]">
                  <span>✕ Topological Check:</span>
                  <span>Elevation Mismatch</span>
                </div>
              </div>
              <MetadataRow
                label="JURY DECISION"
                value={selectedPeer ? selectedPeer.validationState : 'REJECTED'}
                status={selectedPeer && selectedPeer.validationState === 'VALIDATED' ? 'validated' : 'rejected'}
              />
              <p className="font-sans text-xs text-[#A7A6A1] leading-relaxed pt-1 border-t border-[#35383A]">
                Peer state conflicts with current road topology. Discard witness evidence to prevent cross-contamination.
              </p>
            </div>
          )}

          {/* 4E. ROAD EVENT CONTENT */}
          {selectedEvent && activeAction !== 'INSPECT_EVIDENCE' && activeAction !== 'TRACE_CONSTRAINT' && activeAction !== 'VIEW_MEMORY' && (
            <div className="space-y-2 font-mono text-xs">
              <MetadataRow label="EVENT TYPE" value={selectedEvent.type.toUpperCase()} />
              <MetadataRow label="CONFIDENCE" value={selectedEvent.confidenceQualitative} status="validated" />
              <MetadataRow label="IMU SIGNATURE" value={selectedEvent.imupattern} />
              {selectedEvent.matchedMemoryId && (
                <MetadataRow label="ROADMEMORY MATCH" value={selectedEvent.matchedMemoryId} status="brass" />
              )}
              <p className="font-sans text-xs text-[#A7A6A1] pt-1.5 border-t border-[#35383A]">
                RoadSense extracts physical motion impulses from accelerometer/gyroscope signals without assuming fixed GPS availability.
              </p>
            </div>
          )}

          {/* 4F. SYSTEM NODE CONTENT */}
          {selectedNode && activeAction !== 'INSPECT_EVIDENCE' && activeAction !== 'TRACE_CONSTRAINT' && activeAction !== 'VIEW_MEMORY' && !selectedEvent && (
            <div className="space-y-2 font-mono text-xs">
              <MetadataRow label="NODE NAME" value={selectedNode.name} />
              <MetadataRow label="EVIDENCE TYPE" value={selectedNode.type?.toUpperCase() || 'GENERAL'} />
              <MetadataRow label="STATUS" value={selectedNode.status.toUpperCase()} status="validated" />
              <p className="font-sans text-xs text-[#A7A6A1] pt-1.5 border-t border-[#35383A] leading-relaxed">
                {selectedNode.description}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ISOLATED BLOCK 5: QUALITATIVE SYSTEM INTEGRITY SUMMARY */}
      <div className="p-3 bg-[#0B0D0F]/90 border border-[#35383A] rounded-sm space-y-1">
        <span className="font-mono text-[10px] font-bold text-[#71869A] uppercase tracking-wider block mb-1">
          SYSTEM INTEGRITY & QUALITATIVE STATE
        </span>
        <MetadataRow label="FUSION ALGORITHM" value="ADAPTIVE EKF + TOPOLOCK" />
        <MetadataRow label="ACCUMULATED DRIFT" value="QUALITATIVE / CONCEPTUAL" status="warning" illustrative={true} />
      </div>
    </aside>
  );
};
