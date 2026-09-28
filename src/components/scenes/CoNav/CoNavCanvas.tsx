import React from 'react';

export interface PeerValidationChecks {
  spatial: { status: 'CONSISTENT' | 'DEGRADED' | 'INCONSISTENT'; detail: string };
  temporal: { status: 'FRESH' | 'STALE' | 'INVALID'; freshnessMs: number; detail: string };
  kinematic: { status: 'MATCHED' | 'UNVERIFIED' | 'IMPLAUSIBLE'; detail: string };
  topological: { status: 'VERIFIED' | 'CHECKING' | 'MISMATCH'; detail: string };
}

export interface CoNavPeerDetail {
  id: string;
  callsign: string;
  roleLabel: string;
  trustStatus: 'SUPPORTING' | 'STALE' | 'REJECTED' | 'PRIMARY';
  roadSegment: string;
  speedKmh: number;
  headingDeg: number;
  uncertaintyQualitative: string;
  uncertaintyRadiusPx: number;
  position: { x: number; y: number };
  validationChecks: PeerValidationChecks;
  evidenceRole: string;
  rejectionReason?: string;
}

export const CONAV_PEERS: CoNavPeerDetail[] = [
  {
    id: 'primary',
    callsign: 'PRIMARY VEHICLE [TRUENORTH-01]',
    roleLabel: 'LOCAL ESTIMATOR',
    trustStatus: 'PRIMARY',
    roadSegment: 'NH-44 Corridor / KM 14.4',
    speedKmh: 52,
    headingDeg: 0,
    uncertaintyQualitative: 'ESTIMATED (IDR FUSED)',
    uncertaintyRadiusPx: 35,
    position: { x: 500, y: 300 },
    validationChecks: {
      spatial: { status: 'CONSISTENT', detail: 'Local DR trajectory reference' },
      temporal: { status: 'FRESH', freshnessMs: 0, detail: 'Live onboard sensors' },
      kinematic: { status: 'MATCHED', detail: 'NHC & 6-DOF IMU integrated' },
      topological: { status: 'VERIFIED', detail: 'On-road TopoLock active' },
    },
    evidenceRole: 'PRIMARY REASONING SUBJECT',
  },
  {
    id: 'peer-a',
    callsign: 'PEER A [V2X-ALPHA]',
    roleLabel: 'HIGH-TRUST WITNESS',
    trustStatus: 'SUPPORTING',
    roadSegment: 'NH-44 Main Lane / KM 14.7',
    speedKmh: 54,
    headingDeg: 2,
    uncertaintyQualitative: 'LOW (±1.2m)',
    uncertaintyRadiusPx: 28,
    position: { x: 740, y: 260 },
    validationChecks: {
      spatial: { status: 'CONSISTENT', detail: 'Position aligned within lane boundary' },
      temporal: { status: 'FRESH', freshnessMs: 12, detail: 'Fresh peer timestamp (12ms)' },
      kinematic: { status: 'MATCHED', detail: 'Relative velocity vector matches traffic flow' },
      topological: { status: 'VERIFIED', detail: 'Occupies valid main carriageway graph node' },
    },
    evidenceRole: 'SUPPORTING EVIDENCE (WEIGHTED)',
  },
  {
    id: 'peer-b',
    callsign: 'PEER B [V2X-BRAVO]',
    roleLabel: 'STALE OBSERVER',
    trustStatus: 'STALE',
    roadSegment: 'NH-44 Rear Flank / KM 14.1',
    speedKmh: 48,
    headingDeg: 358,
    uncertaintyQualitative: 'MEDIUM (±8.4m)',
    uncertaintyRadiusPx: 52,
    position: { x: 260, y: 340 },
    validationChecks: {
      spatial: { status: 'DEGRADED', detail: 'Plausible offset, but high uncertainty' },
      temporal: { status: 'STALE', freshnessMs: 3400, detail: 'Stale V2X observation (>3.4s old)' },
      kinematic: { status: 'UNVERIFIED', detail: 'Trajectory unverified due to latency gap' },
      topological: { status: 'CHECKING', detail: 'Graph node consistent, message aged' },
    },
    evidenceRole: 'DOWN-WEIGHTED EVIDENCE',
    rejectionReason: 'High temporal latency degrades evidence trust weight',
  },
  {
    id: 'peer-c',
    callsign: 'PEER C [V2X-CHARLIE]',
    roleLabel: 'TOPOLOGY MISMATCH',
    trustStatus: 'REJECTED',
    roadSegment: 'Overpass Flyover / Elevation Gap',
    speedKmh: 88,
    headingDeg: 42,
    uncertaintyQualitative: 'HIGH (±35m)',
    uncertaintyRadiusPx: 75,
    position: { x: 420, y: 110 },
    validationChecks: {
      spatial: { status: 'INCONSISTENT', detail: 'Lateral position crosses non-navigable boundary' },
      temporal: { status: 'FRESH', freshnessMs: 18, detail: 'Fresh timestamp received (18ms)' },
      kinematic: { status: 'IMPLAUSIBLE', detail: 'Reported velocity vector violates corridor kinematics' },
      topological: { status: 'MISMATCH', detail: 'Disconnected overpass flyover topology node' },
    },
    evidenceRole: 'REJECTED BY JURY',
    rejectionReason: 'TopoLock elevation mismatch & kinematic conflict detected',
  },
];

interface CoNavCanvasProps {
  selectedPeerId: string;
  onSelectPeer: (peerId: string) => void;
  activeValidationStep: number | null; // null or 0=spatial, 1=temporal, 2=kinematic, 3=topological
  showEvidencePacketModal: boolean;
  reducedMotion: boolean;
}

export const CoNavCanvas: React.FC<CoNavCanvasProps> = ({
  selectedPeerId,
  onSelectPeer,
  activeValidationStep,
  reducedMotion,
}) => {
  const primaryPos = CONAV_PEERS[0].position;

  return (
    <g className="conav-canvas-group" role="region" aria-label="Cooperative Navigation Multi-Vehicle Spatial Canvas">
      <defs>
        {/* Gradients for Peer Uncertainty Envelopes */}
        <radialGradient id="primaryUncertainty" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#71869A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#71869A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="peerAUncertainty" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#78947F" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#78947F" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="peerBUncertainty" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A88A58" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#A88A58" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="peerCUncertainty" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9B625E" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#9B625E" stopOpacity="0" />
        </radialGradient>

        {/* Marker arrowhead for evidence links */}
        <marker id="arrow-steel" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#71869A" />
        </marker>
        <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#A88A58" />
        </marker>
        <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#9B625E" />
        </marker>
      </defs>

      {/* ============================================================ */}
      {/* SECTION 1: CARTOGRAPHIC ROAD TOPOLOGY & JUNCTION GRAPH       */}
      {/* ============================================================ */}

      {/* Main Corridor (NH-44 Carriageway) */}
      <path
        d="M 50 380 Q 300 360, 500 300 T 950 220"
        stroke="#1E2124"
        strokeWidth="64"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 50 380 Q 300 360, 500 300 T 950 220"
        stroke="#35383A"
        strokeWidth="56"
        strokeLinecap="round"
        fill="none"
      />

      {/* Lane Centerline (Dashed) */}
      <path
        d="M 50 380 Q 300 360, 500 300 T 950 220"
        stroke="#B89562"
        strokeWidth="1.5"
        strokeDasharray="8,8"
        strokeOpacity="0.4"
        fill="none"
      />

      {/* Disconnected Overpass Flyover (Topology Conflict Node for Peer C) */}
      <path
        d="M 120 180 Q 300 130, 500 110 T 900 80"
        stroke="#151719"
        strokeWidth="36"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 120 180 Q 300 130, 500 110 T 900 80"
        stroke="#35383A"
        strokeWidth="28"
        strokeDasharray="4,4"
        strokeLinecap="round"
        strokeOpacity="0.7"
        fill="none"
      />
      <text x="750" y="70" fill="#747570" fontSize="9" fontFamily="JetBrains Mono">
        ELEVATION FLYOVER (DISCONNECTED GRAPH)
      </text>

      {/* Road Segment Labels */}
      <text x="80" y="420" fill="#71869A" fontSize="10" fontFamily="JetBrains Mono">
        NH-44 MAIN CARRIAGEWAY [CHAINAGE 14.0km - 15.0km]
      </text>

      {/* ============================================================ */}
      {/* SECTION 2: EVIDENCE FLOW PATHS & NAVIGATION JURY GATE        */}
      {/* ============================================================ */}

      {/* Navigation Jury Hub surrounding Primary Vehicle */}
      <g transform={`translate(${primaryPos.x}, ${primaryPos.y})`}>
        <circle r="60" fill="none" stroke="#71869A" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.5" />
        <circle r="85" fill="none" stroke="#B89562" strokeWidth="0.75" strokeDasharray="2,4" strokeOpacity="0.3" />
        <rect x="-65" y="44" width="130" height="18" fill="#151719" rx="2" stroke="#71869A" strokeWidth="0.75" />
        <text x="0" y="56" textAnchor="middle" fill="#E8E6E1" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
          CoNAV JURY ARBITRATOR
        </text>
      </g>

      {/* Peer A Evidence Link (SUPPORTING - Solid Green/Steel) */}
      {(() => {
        const peer = CONAV_PEERS[1];
        const isSelected = selectedPeerId === peer.id;
        return (
          <g key="link-peer-a">
            <line
              x1={peer.position.x}
              y1={peer.position.y}
              x2={primaryPos.x + 40}
              y2={primaryPos.y - 15}
              stroke="#78947F"
              strokeWidth={isSelected ? 2.5 : 1.5}
              strokeDasharray={isSelected ? undefined : '4,4'}
              opacity={isSelected ? 1 : 0.8}
              markerEnd="url(#arrow-steel)"
            />
            {!reducedMotion && (
              <circle r="4" fill="#78947F">
                <animateMotion
                  path={`M ${peer.position.x} ${peer.position.y} L ${primaryPos.x + 40} ${primaryPos.y - 15}`}
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
            {/* Link Label */}
            <rect
              x={(peer.position.x + primaryPos.x) / 2 - 40}
              y={(peer.position.y + primaryPos.y) / 2 - 10}
              width="80"
              height="16"
              fill="#0B0D0F"
              stroke="#78947F"
              strokeWidth="0.75"
              rx="2"
            />
            <text
              x={(peer.position.x + primaryPos.x) / 2}
              y={(peer.position.y + primaryPos.y) / 2 + 1}
              textAnchor="middle"
              fill="#78947F"
              fontSize="8"
              fontFamily="JetBrains Mono"
              fontWeight="bold"
            >
              ACCEPTED (+WT)
            </text>
          </g>
        );
      })()}

      {/* Peer B Evidence Link (STALE - Amber Dashed) */}
      {(() => {
        const peer = CONAV_PEERS[2];
        const isSelected = selectedPeerId === peer.id;
        return (
          <g key="link-peer-b">
            <line
              x1={peer.position.x}
              y1={peer.position.y}
              x2={primaryPos.x - 40}
              y2={primaryPos.y + 15}
              stroke="#A88A58"
              strokeWidth={isSelected ? 2.5 : 1.25}
              strokeDasharray="6,4"
              opacity={isSelected ? 1 : 0.7}
              markerEnd="url(#arrow-amber)"
            />
            {!reducedMotion && (
              <circle r="3" fill="#A88A58">
                <animateMotion
                  path={`M ${peer.position.x} ${peer.position.y} L ${primaryPos.x - 40} ${primaryPos.y + 15}`}
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
            <rect
              x={(peer.position.x + primaryPos.x) / 2 - 45}
              y={(peer.position.y + primaryPos.y) / 2 - 8}
              width="90"
              height="16"
              fill="#0B0D0F"
              stroke="#A88A58"
              strokeWidth="0.75"
              rx="2"
            />
            <text
              x={(peer.position.x + primaryPos.x) / 2}
              y={(peer.position.y + primaryPos.y) / 2 + 3}
              textAnchor="middle"
              fill="#A88A58"
              fontSize="8"
              fontFamily="JetBrains Mono"
              fontWeight="bold"
            >
              STALE (&gt;3.4s) DOWN
            </text>
          </g>
        );
      })()}

      {/* Peer C Evidence Link (REJECTED - Red Terminated at Gate) */}
      {(() => {
        const peer = CONAV_PEERS[3];
        const isSelected = selectedPeerId === peer.id;
        const gateX = (peer.position.x + primaryPos.x) / 2;
        const gateY = (peer.position.y + primaryPos.y) / 2;
        return (
          <g key="link-peer-c">
            {/* Active path from Peer C to Rejection Gate */}
            <line
              x1={peer.position.x}
              y1={peer.position.y}
              x2={gateX}
              y2={gateY}
              stroke="#9B625E"
              strokeWidth={isSelected ? 2.5 : 1.25}
              strokeDasharray="3,3"
              opacity={isSelected ? 1 : 0.8}
            />
            {/* Terminated path with Red X marker */}
            <line
              x1={gateX}
              y1={gateY}
              x2={primaryPos.x - 10}
              y2={primaryPos.y - 40}
              stroke="#9B625E"
              strokeWidth="0.75"
              strokeDasharray="2,6"
              opacity="0.3"
            />
            {/* Rejection Gate Symbol */}
            <circle cx={gateX} cy={gateY} r="10" fill="#151719" stroke="#9B625E" strokeWidth="1.5" />
            <path d={`M ${gateX - 4} ${gateY - 4} L ${gateX + 4} ${gateY + 4} M ${gateX + 4} ${gateY - 4} L ${gateX - 4} ${gateY + 4}`} stroke="#9B625E" strokeWidth="2" />
            <rect
              x={gateX - 55}
              y={gateY + 12}
              width="110"
              height="16"
              fill="#0B0D0F"
              stroke="#9B625E"
              strokeWidth="0.75"
              rx="2"
            />
            <text
              x={gateX}
              y={gateY + 23}
              textAnchor="middle"
              fill="#9B625E"
              fontSize="8"
              fontFamily="JetBrains Mono"
              fontWeight="bold"
            >
              TOPOLOGY REJECTED
            </text>
          </g>
        );
      })()}

      {/* ============================================================ */}
      {/* SECTION 3: VEHICLE NODES & UNCERTAINTY ENVELOPES             */}
      {/* ============================================================ */}

      {CONAV_PEERS.map((peer) => {
        const isSelected = selectedPeerId === peer.id;
        const isPrimary = peer.trustStatus === 'PRIMARY';
        const color =
          peer.trustStatus === 'PRIMARY'
            ? '#71869A'
            : peer.trustStatus === 'SUPPORTING'
            ? '#78947F'
            : peer.trustStatus === 'STALE'
            ? '#A88A58'
            : '#9B625E';

        const gradId =
          peer.id === 'primary'
            ? 'url(#primaryUncertainty)'
            : peer.id === 'peer-a'
            ? 'url(#peerAUncertainty)'
            : peer.id === 'peer-b'
            ? 'url(#peerBUncertainty)'
            : 'url(#peerCUncertainty)';

        return (
          <g
            key={peer.id}
            transform={`translate(${peer.position.x}, ${peer.position.y})`}
            onClick={() => onSelectPeer(peer.id)}
            className="cursor-pointer transition-all duration-200"
            role="button"
            tabIndex={0}
            aria-label={`Select vehicle ${peer.callsign}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectPeer(peer.id);
              }
            }}
          >
            {/* Uncertainty Region Envelope */}
            <ellipse
              rx={peer.uncertaintyRadiusPx}
              ry={peer.uncertaintyRadiusPx * 0.6}
              fill={gradId}
              stroke={color}
              strokeWidth={isSelected ? 2 : 1}
              strokeDasharray={isPrimary ? '4,4' : isSelected ? undefined : '3,3'}
              opacity={isSelected ? 1 : 0.8}
            />

            {/* Selection Pulsing Reticle */}
            {isSelected && (
              <circle
                r={peer.uncertaintyRadiusPx + 10}
                fill="none"
                stroke={color}
                strokeWidth="1"
                strokeDasharray="2,2"
              >
                {!reducedMotion && (
                  <animate attributeName="r" values={`${peer.uncertaintyRadiusPx + 4};${peer.uncertaintyRadiusPx + 14};${peer.uncertaintyRadiusPx + 4}`} dur="2s" repeatCount="indefinite" />
                )}
              </circle>
            )}

            {/* Vehicle Node Body (Cartographic Geometry) */}
            <g transform={`rotate(${peer.headingDeg})`}>
              <rect
                x="-14"
                y="-8"
                width="28"
                height="16"
                fill={isPrimary ? '#71869A' : '#151719'}
                stroke={color}
                strokeWidth={isPrimary ? 2 : 1.5}
                rx="3"
              />
              {/* Heading Indicator Nose */}
              <polygon points="14,0 20,-4 20,4" fill={color} />
            </g>

            {/* Callsign & Status Tag Overlay */}
            <rect
              x="-60"
              y="-38"
              width="120"
              height="22"
              fill="#0B0D0F"
              fillOpacity="0.9"
              stroke={isSelected ? color : '#35383A'}
              strokeWidth={isSelected ? 1.5 : 1}
              rx="2"
            />
            <text x="0" y="-27" textAnchor="middle" fill="#E8E6E1" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
              {peer.callsign.split(' ')[0]}
            </text>
            <text x="0" y="-18" textAnchor="middle" fill={color} fontSize="8" fontFamily="JetBrains Mono">
              {peer.roleLabel}
            </text>

            {/* Interactive Step Highlight Indicator */}
            {activeValidationStep !== null && isSelected && (
              <g transform="translate(0, 32)">
                <rect x="-50" y="0" width="100" height="14" fill="#B89562" rx="2" />
                <text x="0" y="10" textAnchor="middle" fill="#0B0D0F" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">
                  {activeValidationStep === 0
                    ? 'CHECK 1: SPATIAL'
                    : activeValidationStep === 1
                    ? 'CHECK 2: TEMPORAL'
                    : activeValidationStep === 2
                    ? 'CHECK 3: KINEMATIC'
                    : 'CHECK 4: TOPOLOGY'}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Legend & Calibration Footnote */}
      <g transform="translate(40, 520)">
        <rect x="0" y="0" width="420" height="46" fill="#151719" fillOpacity="0.9" stroke="#35383A" strokeWidth="1" rx="2" />
        <text x="12" y="16" fill="#71869A" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
          CoNAV PEER WITNESS LEGEND:
        </text>
        <circle cx="20" cy="30" r="4" fill="#78947F" />
        <text x="30" y="33" fill="#A7A6A1" fontSize="8" fontFamily="JetBrains Mono">
          SUPPORTING (FRESH/MATCHED)
        </text>

        <circle cx="160" cy="30" r="4" fill="#A88A58" />
        <text x="170" y="33" fill="#A7A6A1" fontSize="8" fontFamily="JetBrains Mono">
          STALE (DOWN-WEIGHTED)
        </text>

        <circle cx="300" cy="30" r="4" fill="#9B625E" />
        <text x="310" y="33" fill="#A7A6A1" fontSize="8" fontFamily="JetBrains Mono">
          REJECTED (TOPOLOGY CONFLICT)
        </text>
      </g>
    </g>
  );
};
