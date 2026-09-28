import React from 'react';
import type { EvidenceType } from '../../../types/experience';

export type SoftGnssQuality = 'STRONG' | 'DEGRADED' | 'UNRELIABLE' | 'DENIED';

export interface FusionSourceDetail {
  id: string;
  name: string;
  type: EvidenceType;
  role: string;
  stateLabel: string;
  consistency: 'CONSISTENT' | 'DEGRADED' | 'CONRADICORY' | 'REJECTED';
  fusionRole: 'ACTIVE' | 'DOWN-WEIGHTED' | 'SUPPORTING' | 'PRIMARY' | 'REJECTED';
  color: string;
  y: number;
}

export const FUSION_SOURCES: FusionSourceDetail[] = [
  {
    id: 'src-gnss',
    name: 'SoftGNSS',
    type: 'gnss',
    role: 'Absolute spatial positioning reference',
    stateLabel: 'CONTINUOUS WEIGHT',
    consistency: 'CONSISTENT',
    fusionRole: 'PRIMARY',
    color: '#78947F',
    y: 100,
  },
  {
    id: 'src-imu',
    name: 'IMU / Kinematics',
    type: 'imu',
    role: 'High-frequency motion delta integration',
    stateLabel: 'ACTIVE',
    consistency: 'CONSISTENT',
    fusionRole: 'ACTIVE',
    color: '#71869A',
    y: 170,
  },
  {
    id: 'src-speed',
    name: 'AI Speed Estimator',
    type: 'speed',
    role: 'Forward velocity constraint',
    stateLabel: 'ACTIVE',
    consistency: 'CONSISTENT',
    fusionRole: 'SUPPORTING',
    color: '#8EA4B8',
    y: 240,
  },
  {
    id: 'src-road',
    name: 'RoadSense',
    type: 'road',
    role: 'Physical landmark impulse extraction',
    stateLabel: 'ACTIVE',
    consistency: 'CONSISTENT',
    fusionRole: 'SUPPORTING',
    color: '#B89562',
    y: 310,
  },
  {
    id: 'src-memory',
    name: 'RoadMemory',
    type: 'memory',
    role: 'Spatial landmark memory constraint',
    stateLabel: 'MATCHED',
    consistency: 'CONSISTENT',
    fusionRole: 'SUPPORTING',
    color: '#B89562',
    y: 380,
  },
  {
    id: 'src-topology',
    name: 'Map Topology',
    type: 'topology',
    role: 'Road graph & kinematic candidate filter',
    stateLabel: 'ACTIVE',
    consistency: 'CONSISTENT',
    fusionRole: 'PRIMARY',
    color: '#71869A',
    y: 450,
  },
];

interface FusionCanvasProps {
  activeSourceId: string;
  onSelectSource: (sourceId: string) => void;
  softGnssQuality: SoftGnssQuality;
  showTopoLockConflict: boolean;
  reducedMotion: boolean;
}

export const FusionCanvas: React.FC<FusionCanvasProps> = ({
  activeSourceId,
  onSelectSource,
  softGnssQuality,
  showTopoLockConflict,
  reducedMotion,
}) => {
  const selectedSource = FUSION_SOURCES.find((s) => s.id === activeSourceId) || FUSION_SOURCES[0];

  // Compute GNSS Soft Weight styling based on softGnssQuality
  const gnssTrustColor =
    softGnssQuality === 'STRONG'
      ? '#78947F'
      : softGnssQuality === 'DEGRADED'
      ? '#A88A58'
      : softGnssQuality === 'UNRELIABLE'
      ? '#A88A58'
      : '#9B625E';

  const gnssFusionRole =
    softGnssQuality === 'STRONG'
      ? 'PRIMARY'
      : softGnssQuality === 'DEGRADED'
      ? 'DOWN-WEIGHTED'
      : softGnssQuality === 'UNRELIABLE'
      ? 'WEAK / CAUTION'
      : 'REJECTED';

  return (
    <g aria-label="TrueNorth Trust & Fusion Engineering Instrumentation Canvas">
      <defs>
        <radialGradient id="fusionCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#71869A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0B0D0F" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#71869A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#B89562" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* BACKGROUND SUBDUED CARTOGRAPHIC MATRIX */}
      <line x1="480" y1="50" x2="480" y2="550" stroke="#35383A" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
      <line x1="750" y1="50" x2="750" y2="550" stroke="#35383A" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />

      {/* ========================================================================= */}
      {/* LEFT COLUMN: EVIDENCE STREAM INPUT NODES */}
      {/* ========================================================================= */}
      {FUSION_SOURCES.map((src) => {
        const isSelected = src.id === activeSourceId;
        const isGnss = src.id === 'src-gnss';
        const nodeColor = isGnss ? gnssTrustColor : src.color;
        const nodeRole = isGnss ? gnssFusionRole : src.fusionRole;

        return (
          <g
            key={src.id}
            onClick={() => onSelectSource(src.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectSource(src.id);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Evidence Source: ${src.name}${isSelected ? ' (Selected)' : ''}`}
            aria-pressed={isSelected}
            className="cursor-pointer group focus:outline-none"
          >
            {/* Directional Vector Flow Line: Source -> TrustFusion Core (480, 220) */}
            <path
              d={`M 220 ${src.y} C 320 ${src.y}, 380 220, 420 220`}
              stroke={isSelected ? '#B89562' : nodeColor}
              strokeWidth={isSelected ? '2.5' : '1.5'}
              strokeOpacity={isSelected ? 0.95 : 0.4}
              fill="none"
              strokeDasharray={isGnss && softGnssQuality === 'DENIED' ? '4 4' : 'none'}
            />

            {/* Pulse Motion along flow vector if selected */}
            {isSelected && !reducedMotion && (
              <circle r="3" fill="#B89562" className="animate-pulse">
                <animateMotion
                  path={`M 220 ${src.y} C 320 ${src.y}, 380 220, 420 220`}
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Source Node Card Box */}
            <rect
              x="30"
              y={src.y - 22}
              width="190"
              height="44"
              rx="3"
              fill={isSelected ? '#1E2124' : '#151719'}
              stroke={isSelected ? '#B89562' : '#35383A'}
              strokeWidth={isSelected ? '2' : '1'}
              className="transition-all duration-200"
            />
            {isSelected && (
              <rect
                x="26"
                y={src.y - 26}
                width="198"
                height="52"
                rx="5"
                fill="none"
                stroke="#B89562"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            )}

            {/* Node Title & Metadata */}
            <text x="42" y={src.y - 5} fill={isSelected ? '#E8E6E1' : '#E8E6E1'} fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
              {src.name}
            </text>
            <text x="42" y={src.y + 10} fill="#747570" fontSize="8" fontFamily="JetBrains Mono">
              {isGnss ? `SOFT-GNSS: ${softGnssQuality}` : src.stateLabel}
            </text>

            {/* Node Status Badge */}
            <rect x="155" y={src.y - 14} width="55" height="14" rx="2" fill="#0B0D0F" stroke={nodeColor} strokeWidth="1" />
            <text x="182" y={src.y - 4} textAnchor="middle" fill={nodeColor} fontSize="7" fontFamily="JetBrains Mono" fontWeight="bold">
              {nodeRole}
            </text>
          </g>
        );
      })}

      {/* ========================================================================= */}
      {/* CENTER AREA: TRUSTFUSION ARBITRATION CORE & TOPOLOCK GATE */}
      {/* ========================================================================= */}
      {/* TrustFusion Central Node */}
      <g transform="translate(480, 220)">
        <circle r="55" fill="url(#fusionCoreGlow)" stroke="#71869A" strokeWidth="1.5" strokeOpacity="0.8" />
        <circle
          r="45"
          fill="#151719"
          stroke="#71869A"
          strokeWidth="2"
          className={reducedMotion ? '' : 'animate-pulse'}
        />
        <text x="0" y="-8" textAnchor="middle" fill="#E8E6E1" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
          TRUSTFUSION
        </text>
        <text x="0" y="6" textAnchor="middle" fill="#B89562" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">
          EVIDENCE ARBITRATION
        </text>
        <text x="0" y="18" textAnchor="middle" fill="#747570" fontSize="7" fontFamily="JetBrains Mono">
          DYNAMIC WEIGHTING
        </text>
      </g>

      {/* Connection: TrustFusion Core (480, 220) -> TopoLock Gate (480, 370) */}
      <line x1="480" y1="265" x2="480" y2="345" stroke="#71869A" strokeWidth="2" strokeDasharray="4 4" />
      <polygon points="480,350 475,340 485,340" fill="#71869A" />

      {/* TopoLock Constraint Gate */}
      <g transform="translate(480, 390)">
        <rect
          x="-90"
          y="-25"
          width="180"
          height="50"
          rx="4"
          fill="#151719"
          stroke={showTopoLockConflict ? '#9B625E' : '#78947F'}
          strokeWidth="2"
        />
        <text x="0" y="-8" textAnchor="middle" fill="#E8E6E1" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
          TOPOLOCK CONSTRAINT GATE
        </text>
        <text
          x="0"
          y="7"
          textAnchor="middle"
          fill={showTopoLockConflict ? '#9B625E' : '#78947F'}
          fontSize="8"
          fontFamily="JetBrains Mono"
          fontWeight="bold"
        >
          {showTopoLockConflict ? 'CONTRADICTION DETECTED / REJECTED' : 'PHYSICS & TOPOLOGY VALIDATED'}
        </text>
        <text x="0" y="18" textAnchor="middle" fill="#747570" fontSize="7" fontFamily="JetBrains Mono">
          MAP GRAPH + KINEMATIC CHECK
        </text>
      </g>

      {/* Connection: TopoLock Gate (480, 390) -> Fused State (730, 220) */}
      <path d="M 570 390 C 650 390, 680 220, 730 220" stroke="#78947F" strokeWidth="2" fill="none" />
      <polygon points="735,220 725,215 725,225" fill="#78947F" />

      {/* Connection: TrustFusion Direct Stream -> Fused State */}
      <line x1="535" y1="220" x2="730" y2="220" stroke="#B89562" strokeWidth="2" />

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: FUSED NAVIGATION STATE & CARTOGRAPHIC PREVIEW */}
      {/* ========================================================================= */}
      {/* Fused Navigation State Box */}
      <g transform="translate(735, 90)">
        <rect width="235" height="230" rx="4" fill="#151719" stroke="#B89562" strokeWidth="1.5" />
        <text x="117" y="22" textAnchor="middle" fill="#E8E6E1" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
          FUSED NAVIGATION STATE
        </text>
        <text x="117" y="34" textAnchor="middle" fill="#B89562" fontSize="8" fontFamily="JetBrains Mono">
          CONTINUOUS ESTIMATE VECTOR
        </text>

        {/* Meter 1: Position */}
        <g transform="translate(15, 48)">
          <text x="0" y="10" fill="#A7A6A1" fontSize="8" fontFamily="JetBrains Mono">POSITION</text>
          <rect x="85" y="2" width="120" height="10" rx="1" fill="#0B0D0F" stroke="#35383A" />
          <rect x="86" y="3" width="105" height="8" rx="1" fill="#B89562" />
          <text x="145" y="10" textAnchor="middle" fill="#151719" fontSize="7" fontFamily="JetBrains Mono" fontWeight="bold">CONSTRAINED</text>
        </g>

        {/* Meter 2: Velocity */}
        <g transform="translate(15, 74)">
          <text x="0" y="10" fill="#A7A6A1" fontSize="8" fontFamily="JetBrains Mono">VELOCITY</text>
          <rect x="85" y="2" width="120" height="10" rx="1" fill="#0B0D0F" stroke="#35383A" />
          <rect x="86" y="3" width="95" height="8" rx="1" fill="#71869A" />
          <text x="145" y="10" textAnchor="middle" fill="#151719" fontSize="7" fontFamily="JetBrains Mono" fontWeight="bold">CONSISTENT</text>
        </g>

        {/* Meter 3: Heading */}
        <g transform="translate(15, 100)">
          <text x="0" y="10" fill="#A7A6A1" fontSize="8" fontFamily="JetBrains Mono">HEADING</text>
          <rect x="85" y="2" width="120" height="10" rx="1" fill="#0B0D0F" stroke="#35383A" />
          <rect x="86" y="3" width="112" height="8" rx="1" fill="#8EA4B8" />
          <text x="145" y="10" textAnchor="middle" fill="#151719" fontSize="7" fontFamily="JetBrains Mono" fontWeight="bold">ROAD-ALIGNED</text>
        </g>

        {/* Meter 4: Sensor Bias */}
        <g transform="translate(15, 126)">
          <text x="0" y="10" fill="#A7A6A1" fontSize="8" fontFamily="JetBrains Mono">SENSOR BIAS</text>
          <rect x="85" y="2" width="120" height="10" rx="1" fill="#0B0D0F" stroke="#35383A" />
          <rect x="86" y="3" width="60" height="8" rx="1" fill="#78947F" />
          <text x="116" y="10" textAnchor="middle" fill="#151719" fontSize="7" fontFamily="JetBrains Mono" fontWeight="bold">ESTIMATED</text>
        </g>

        {/* Qualitative Uncertainty Summary */}
        <g transform="translate(15, 155)">
          <rect width="205" height="24" rx="2" fill="#0B0D0F" stroke={gnssTrustColor} />
          <text x="102" y="15" textAnchor="middle" fill={gnssTrustColor} fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">
            UNCERTAINTY: BOUNDED (QUALITATIVE)
          </text>
        </g>

        {/* Active Inspection Source Summary */}
        <g transform="translate(15, 188)">
          <text x="0" y="10" fill="#71869A" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">SELECTED EVIDENCE:</text>
          <text x="0" y="22" fill="#E8E6E1" fontSize="8" fontFamily="Inter, sans-serif" className="line-clamp-1">
            {selectedSource.name} — {selectedSource.role}
          </text>
        </g>
      </g>

      {/* Cartographic TopoLock Constraint Road Preview Box */}
      <g transform="translate(735, 340)">
        <rect width="235" height="170" rx="4" fill="#151719" stroke="#35383A" strokeWidth="1" />
        <text x="117" y="20" textAnchor="middle" fill="#E8E6E1" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
          TOPOLOCK TRAJECTORY EVALUATION
        </text>

        {/* Subdued Cartographic Road Segments */}
        <path d="M 20 120 C 60 120, 100 70, 180 70 L 220 70" stroke="#35383A" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M 100 70 L 140 140" stroke="#35383A" strokeWidth="6" strokeDasharray="3 3" opacity="0.5" fill="none" />

        {/* Accepted Trajectory (Green / Brass) */}
        <path d="M 20 120 C 60 120, 100 70, 180 70" stroke="#78947F" strokeWidth="2.5" fill="none" />
        <text x="120" y="60" fill="#78947F" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">ACCEPTED PATH</text>

        {/* Rejected Candidate Branch (Red if showTopoLockConflict or GNSS Unreliable) */}
        {showTopoLockConflict && (
          <g>
            <path d="M 100 70 L 140 140" stroke="#9B625E" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
            <circle cx="140" cy="140" r="4" fill="#9B625E" />
            <text x="148" y="142" fill="#9B625E" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">
              REJECTED (TOPOLOGY MISMATCH)
            </text>
          </g>
        )}

        <text x="117" y="158" textAnchor="middle" fill="#747570" fontSize="8" fontFamily="Inter, sans-serif">
          "TopoLock rejects candidate branches violating road geometry."
        </text>
      </g>
    </g>
  );
};
