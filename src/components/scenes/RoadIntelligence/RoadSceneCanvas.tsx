import React from 'react';
import type { RoadEventObservation } from '../../../types/experience';

export interface RoadEventDetail extends RoadEventObservation {
  sensorSignatureTitle: string;
  sensorSignatureDesc: string;
  vehicleDnaResponse: string;
  roadSenseInterpretation: string;
  memoryAssociation: string;
  localizationRole: string;
  statusColor: string;
}

export const CHAPTER4_ROAD_EVENTS: RoadEventDetail[] = [
  {
    id: 're-01',
    type: 'curve',
    label: '90° Sharp Right Bend',
    confidenceQualitative: 'HIGH',
    imupattern: 'Yaw rate impulse (ωz) + lateral accel (Ay)',
    locationKm: 1.2,
    matchedMemoryId: 'MEM-BEND-442',
    sensorSignatureTitle: 'LATERAL DYNAMICS & YAW RATE IMPULSE',
    sensorSignatureDesc: 'Sustained lateral acceleration pulse paired with proportional z-axis angular velocity.',
    vehicleDnaResponse: 'Chassis roll angle isolated from true curvature rate using vehicle roll-stiffness model.',
    roadSenseInterpretation: 'High-confidence curve signature candidate matched with topological map geometry.',
    memoryAssociation: 'Matches stored RoadMemory anchor MEM-BEND-442 (3 prior observations).',
    localizationRole: 'Constrains lateral trajectory drift and heading alignment during GNSS outage.',
    statusColor: '#78947F', // Validated Green
  },
  {
    id: 're-02',
    type: 'impulse',
    label: 'Speed Breaker / Vertical Impulse',
    confidenceQualitative: 'HIGH',
    imupattern: 'Dual Z-axis vertical acceleration pulse (±Az)',
    locationKm: 2.8,
    matchedMemoryId: 'MEM-BUMP-109',
    sensorSignatureTitle: 'VERTICAL IMPULSE & SUSPENSION REBOUND',
    sensorSignatureDesc: 'High-amplitude vertical acceleration spike followed by characteristic damper ring-down.',
    vehicleDnaResponse: 'Suspension natural frequency (1.2 Hz) filtered out to extract true physical bump height.',
    roadSenseInterpretation: 'Speed-breaker-like impulse event recognized via temporal pulse spacing.',
    memoryAssociation: 'Spatially matched to RoadMemory anchor MEM-BUMP-109 (5 prior observations).',
    localizationRole: 'Provides discrete longitudinal chainage landmark along the road segment.',
    statusColor: '#78947F', // Validated Green
  },
  {
    id: 're-03',
    type: 'intersection',
    label: '4-Way Signal Stop',
    confidenceQualitative: 'MEDIUM',
    imupattern: 'Longitudinal deceleration + ZUPT stationary state',
    locationKm: 4.1,
    matchedMemoryId: 'MEM-STOP-041',
    sensorSignatureTitle: 'ZERO VELOCITY UPDATE (ZUPT) PATTERN',
    sensorSignatureDesc: 'Monotonic forward deceleration bringing wheel speed and accelerometer variance to zero.',
    vehicleDnaResponse: 'Engine idle vibration harmonics recognized to confirm vehicle is stationary in traffic.',
    roadSenseInterpretation: 'Zero-velocity update opportunity matched with signal intersection topology.',
    memoryAssociation: 'Reinforces RoadMemory anchor MEM-STOP-041 (2 prior observations).',
    localizationRole: 'Resets velocity estimator bias and bounds accumulated distance uncertainty.',
    statusColor: '#A88A58', // Warning/Uncertain Amber
  },
  {
    id: 're-04',
    type: 'roughness',
    label: 'Cobblestone / Rough Surface Segment',
    confidenceQualitative: 'HIGH',
    imupattern: 'High-frequency energy density (15-25 Hz)',
    locationKm: 5.6,
    matchedMemoryId: 'MEM-ROUGH-088',
    sensorSignatureTitle: 'SPECTRAL ENERGY DENSITY TRANSITION',
    sensorSignatureDesc: 'Sudden increase in high-frequency pitch and roll energy variance across 15–25 Hz band.',
    vehicleDnaResponse: 'Tire tread acoustic resonance separated from structural road surface roughness.',
    roadSenseInterpretation: 'Surface transition event candidate indicating transition to cobblestone section.',
    memoryAssociation: 'Associated with RoadMemory anchor MEM-ROUGH-088.',
    localizationRole: 'Constrains probabilistic road segment association and adaptive noise covariance.',
    statusColor: '#71869A', // Steel Accent
  },
];

export interface EventSpatialConfig {
  node: { x: number; y: number };
  labelBox: { x: number; y: number; width: number; height: number };
  leaderLine: { x1: number; y1: number; x2: number; y2: number };
  calloutBox: { x: number; y: number; width: number; height: number };
  calloutLeader: { x1: number; y1: number; x2: number; y2: number };
}

export const SPATIAL_LAYOUT: Record<string, EventSpatialConfig> = {
  're-01': {
    node: { x: 220, y: 410 },
    labelBox: { x: 235, y: 440, width: 170, height: 22 },
    leaderLine: { x1: 220, y1: 410, x2: 245, y2: 440 },
    calloutBox: { x: 60, y: 260, width: 200, height: 65 },
    calloutLeader: { x1: 220, y1: 410, x2: 160, y2: 290 },
  },
  're-02': {
    node: { x: 380, y: 205 },
    labelBox: { x: 250, y: 120, width: 215, height: 22 },
    leaderLine: { x1: 380, y1: 205, x2: 345, y2: 142 },
    calloutBox: { x: 200, y: 260, width: 210, height: 65 },
    calloutLeader: { x1: 380, y1: 205, x2: 300, y2: 260 },
  },
  're-03': {
    node: { x: 620, y: 205 },
    labelBox: { x: 550, y: 120, width: 155, height: 22 },
    leaderLine: { x1: 620, y1: 205, x2: 630, y2: 142 },
    calloutBox: { x: 520, y: 260, width: 210, height: 65 },
    calloutLeader: { x1: 620, y1: 205, x2: 610, y2: 260 },
  },
  're-04': {
    node: { x: 810, y: 330 },
    labelBox: { x: 640, y: 410, width: 235, height: 22 },
    leaderLine: { x1: 810, y1: 330, x2: 760, y2: 410 },
    calloutBox: { x: 620, y: 260, width: 220, height: 65 },
    calloutLeader: { x1: 810, y1: 330, x2: 730, y2: 290 },
  },
};

interface RoadSceneCanvasProps {
  selectedEventId: string | null;
  onSelectEvent: (eventId: string) => void;
  showMemoryLayer: boolean;
  showVehicleDna: boolean;
  isReobserving: boolean;
  reducedMotion: boolean;
}

export const RoadSceneCanvas: React.FC<RoadSceneCanvasProps> = ({
  selectedEventId,
  onSelectEvent,
  showMemoryLayer,
  showVehicleDna,
  isReobserving,
  reducedMotion,
}) => {
  const selectedEvent = CHAPTER4_ROAD_EVENTS.find((e) => e.id === selectedEventId) || CHAPTER4_ROAD_EVENTS[0];
  const selectedLayout = SPATIAL_LAYOUT[selectedEvent.id] || SPATIAL_LAYOUT['re-01'];

  return (
    <g aria-label="Road Intelligence Spatial Canvas">
      <defs>
        <radialGradient id="eventHighlightGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B89562" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0B0D0F" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="roadLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#35383A" />
          <stop offset="50%" stopColor="#71869A" />
          <stop offset="100%" stopColor="#35383A" />
        </linearGradient>
      </defs>

      {/* BACKGROUND SUBDUED CARTOGRAPHIC ROAD GEOMETRY */}
      {/* Outer Road Bed */}
      <path
        d="M 100 450 C 250 450, 300 200, 500 200 C 700 200, 750 350, 900 350"
        stroke="#35383A"
        strokeWidth="24"
        strokeLinecap="round"
        fill="none"
      />
      {/* Asphalt Core */}
      <path
        d="M 100 450 C 250 450, 300 200, 500 200 C 700 200, 750 350, 900 350"
        stroke="#151719"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />
      {/* Road Centerline Dashed Vector */}
      <path
        d="M 100 450 C 250 450, 300 200, 500 200 C 700 200, 750 350, 900 350"
        stroke="#71869A"
        strokeWidth="1.5"
        strokeDasharray="10 10"
        strokeOpacity="0.4"
        fill="none"
      />

      {/* ACTIVE VEHICLE TRAJECTORY & POSITION */}
      <path
        d="M 100 450 C 250 450, 300 200, 480 200"
        stroke="#B89562"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Re-Observation Animated Vehicle Motion Path */}
      {isReobserving && (
        <g>
          <circle r="6" fill="#B89562" className={reducedMotion ? '' : 'animate-pulse'}>
            <animateMotion
              path="M 100 450 C 250 450, 300 200, 500 200"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
          <text x="320" y="270" fill="#B89562" fontSize="9" fontFamily="JetBrains Mono">
            [RE-OBSERVATION RUN: VEHICLE RE-ENCOUNTERING STORED LANDMARK]
          </text>
        </g>
      )}

      {/* Vehicle Marker Instrument Node */}
      <g transform="translate(480, 200)">
        <circle r="14" fill="#151719" stroke="#B89562" strokeWidth="2" />
        <polygon points="0,-8 6,6 -6,6" fill="#B89562" />
        <text x="18" y="4" fill="#E8E6E1" fontSize="10" fontFamily="JetBrains Mono">
          VEHICLE POSITION
        </text>
      </g>

      {/* ========================================================================= */}
      {/* ROADMEMORY OVERLAY LAYER (When showMemoryLayer is active) */}
      {/* ========================================================================= */}
      {showMemoryLayer && (
        <g aria-label="RoadMemory Spatial Anchors">
          <path
            d="M 100 450 C 250 450, 300 200, 500 200 C 700 200, 750 350, 900 350"
            stroke="#78947F"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            strokeOpacity="0.6"
            fill="none"
          />

          {/* Stored Landmark Anchors attached to road coordinates */}
          {[
            { x: 220, y: 410, code: 'MEM-BEND-442', type: 'CURVE MATCHED' },
            { x: 380, y: 205, code: 'MEM-BUMP-109', type: 'IMPULSE RE-OBSERVED' },
            { x: 620, y: 205, code: 'MEM-STOP-041', type: 'STOP REINFORCED' },
            { x: 810, y: 330, code: 'MEM-ROUGH-088', type: 'ROUGHNESS UNCERTAIN' },
          ].map((anchor) => (
            <g key={anchor.code} transform={`translate(${anchor.x}, ${anchor.y - 30})`}>
              <rect x="-55" y="-12" width="110" height="24" rx="2" fill="#0B0D0F" stroke="#78947F" strokeWidth="1" />
              <text x="0" y="-1" textAnchor="middle" fill="#78947F" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">
                {anchor.code}
              </text>
              <text x="0" y="8" textAnchor="middle" fill="#A7A6A1" fontSize="7" fontFamily="JetBrains Mono">
                {anchor.type}
              </text>
              <line x1="0" y1="12" x2="0" y2="30" stroke="#78947F" strokeWidth="1" strokeDasharray="2 2" />
            </g>
          ))}
        </g>
      )}

      {/* ========================================================================= */}
      {/* VEHICLE DNA OVERLAY COMPARISON PANEL (When showVehicleDna is active) */}
      {/* ========================================================================= */}
      {showVehicleDna && (
        <g transform="translate(320, 45)">
          <rect width="360" height="130" rx="4" fill="#151719" stroke="#71869A" strokeWidth="1.5" />
          <text x="180" y="20" textAnchor="middle" fill="#E8E6E1" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
            VEHICLE DNA: RESPONSE DECOUPLING MODEL
          </text>
          <text x="180" y="34" textAnchor="middle" fill="#71869A" fontSize="9" fontFamily="JetBrains Mono">
            SEPARATING VEHICLE SUSPENSION DYNAMICS FROM ROAD SIGNATURES
          </text>

          {/* SUV Profile */}
          <g transform="translate(15, 45)">
            <rect width="160" height="42" rx="2" fill="#0B0D0F" stroke="#35383A" />
            <text x="10" y="15" fill="#B89562" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">VEHICLE A (SUV / SOFT)</text>
            <text x="10" y="28" fill="#747570" fontSize="8" fontFamily="Inter, sans-serif">Low damp frequency (1.1 Hz)</text>
            <path d="M 100 32 Q 115 22, 130 32 T 150 32" stroke="#B89562" strokeWidth="1.5" fill="none" />
          </g>

          {/* Sedan Profile */}
          <g transform="translate(185, 45)">
            <rect width="160" height="42" rx="2" fill="#0B0D0F" stroke="#35383A" />
            <text x="10" y="15" fill="#71869A" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">VEHICLE B (SEDAN / STIFF)</text>
            <text x="10" y="28" fill="#747570" fontSize="8" fontFamily="Inter, sans-serif">High damp frequency (2.4 Hz)</text>
            <path d="M 100 32 Q 110 18, 120 32 T 140 32" stroke="#71869A" strokeWidth="1.5" fill="none" />
          </g>

          <text x="180" y="115" textAnchor="middle" fill="#A7A6A1" fontSize="9" fontFamily="Inter, sans-serif">
            "VehicleDNA learns mounting response so IMU features reflect true road geometry."
          </text>
        </g>
      )}

      {/* ========================================================================= */}
      {/* SPATIAL ROAD EVENT ANNOTATION SYSTEM (Deterministic Layout & Leader Lines) */}
      {/* ========================================================================= */}
      {CHAPTER4_ROAD_EVENTS.map((event) => {
        const isSelected = event.id === selectedEvent.id;
        const layout = SPATIAL_LAYOUT[event.id] || SPATIAL_LAYOUT['re-01'];
        const { node, labelBox, leaderLine } = layout;

        return (
          <g
            key={event.id}
            onClick={() => onSelectEvent(event.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectEvent(event.id);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Road Event: ${event.label}${isSelected ? ' (Selected)' : ''}`}
            aria-pressed={isSelected}
            className="cursor-pointer group focus:outline-none"
          >
            {/* Leader Line Connecting Node to Label Box */}
            <line
              x1={leaderLine.x1}
              y1={leaderLine.y1}
              x2={leaderLine.x2}
              y2={leaderLine.y2}
              stroke={isSelected ? '#B89562' : '#35383A'}
              strokeWidth={isSelected ? '1.5' : '1'}
              strokeDasharray={isSelected ? 'none' : '3 3'}
              strokeOpacity={isSelected ? 0.9 : 0.6}
            />

            {/* Outer Selection Highlight Halo for Active Node */}
            {isSelected && (
              <circle
                cx={node.x}
                cy={node.y}
                r="32"
                fill="url(#eventHighlightGrad)"
                stroke="#B89562"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className={reducedMotion ? '' : 'animate-spin-slow'}
              />
            )}

            {/* Event Marker Core Node */}
            <circle
              cx={node.x}
              cy={node.y}
              r={isSelected ? '14' : '10'}
              fill={isSelected ? '#B89562' : '#151719'}
              stroke={isSelected ? '#E8E6E1' : event.statusColor}
              strokeWidth={isSelected ? '2.5' : '2'}
              className="transition-all duration-200"
            />
            <circle cx={node.x} cy={node.y} r="4" fill={isSelected ? '#151719' : event.statusColor} />

            {/* Event Label Tag (Collision-Free Anchor Box) */}
            <g transform={`translate(${labelBox.x}, ${labelBox.y})`}>
              <rect
                x="0"
                y="0"
                width={labelBox.width}
                height={labelBox.height}
                rx="3"
                fill="#151719"
                stroke={isSelected ? '#B89562' : '#35383A'}
                strokeWidth={isSelected ? '1.5' : '1'}
                className="transition-colors"
              />
              <text
                x={labelBox.width / 2}
                y="14"
                textAnchor="middle"
                fill={isSelected ? '#E8E6E1' : '#A7A6A1'}
                fontSize="10"
                fontFamily="JetBrains Mono"
                fontWeight={isSelected ? 'bold' : 'normal'}
                className="group-hover:fill-[#E8E6E1] transition-colors"
              >
                {event.label}
              </text>
            </g>
          </g>
        );
      })}

      {/* ========================================================================= */}
      {/* SELECTED EVENT SENSOR WAVEFORM / EVIDENCE CALLOUT (Visually Anchored) */}
      {/* ========================================================================= */}
      {selectedEvent && selectedLayout && (
        <g aria-label="Selected Event Evidence Callout">
          {/* Callout Leader Line from Selected Node to Callout Box */}
          <line
            x1={selectedLayout.calloutLeader.x1}
            y1={selectedLayout.calloutLeader.y1}
            x2={selectedLayout.calloutLeader.x2}
            y2={selectedLayout.calloutLeader.y2}
            stroke="#B89562"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            strokeOpacity="0.8"
          />

          <g transform={`translate(${selectedLayout.calloutBox.x}, ${selectedLayout.calloutBox.y})`}>
            <rect
              width={selectedLayout.calloutBox.width}
              height={selectedLayout.calloutBox.height}
              rx="4"
              fill="#0B0D0F"
              stroke="#B89562"
              strokeWidth="1.5"
            />
            <text x="10" y="16" fill="#B89562" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
              SENSOR WAVEFORM SIGNATURE
            </text>

            <path
              d={
                selectedEvent.type === 'curve'
                  ? 'M 10 40 C 30 25, 70 52, 110 28 T 190 40'
                  : selectedEvent.type === 'impulse'
                  ? 'M 10 40 L 70 40 L 90 20 L 110 55 L 130 40 L 190 40'
                  : selectedEvent.type === 'intersection'
                  ? 'M 10 25 L 80 50 L 190 50'
                  : 'M 10 40 Q 30 24, 50 52 T 90 40 T 130 24 T 170 52 L 190 40'
              }
              stroke={selectedEvent.statusColor}
              strokeWidth="1.75"
              fill="none"
            />

            <text x="10" y="56" fill="#747570" fontSize="8" fontFamily="JetBrains Mono">
              {selectedEvent.imupattern}
            </text>
          </g>
        </g>
      )}
    </g>
  );
};

