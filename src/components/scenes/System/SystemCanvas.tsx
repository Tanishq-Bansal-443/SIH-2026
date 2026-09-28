import React from 'react';
import type { SystemLoopStageId } from '../../../types/experience';
import { SYSTEM_NODES, COMPONENT_TRACES } from '../../../data/systemFixtures';

interface SystemCanvasProps {
  selectedNodeId: SystemLoopStageId;
  onSelectNode: (id: SystemLoopStageId) => void;
  activeTraceStepIndex: number | null; // 0..6 if FOLLOW SYSTEM active
  activeComponentTraceId: string | null;
  reducedMotion: boolean;
}

// Fixed 2D Coordinates for the 7 Loop Stages around SVG (1000 x 600)
const NODE_COORDINATES: Record<SystemLoopStageId, { x: number; y: number; label: string; num: string }> = {
  SENSE: { x: 500, y: 85, label: 'SENSE', num: '01' },
  LEARN: { x: 760, y: 160, label: 'LEARN', num: '02' },
  REMEMBER: { x: 840, y: 340, label: 'REMEMBER', num: '03' },
  'CROSS-CHECK': { x: 690, y: 480, label: 'CROSS-CHECK', num: '04' },
  NAVIGATE: { x: 310, y: 480, label: 'NAVIGATE', num: '05' },
  REHEARSE: { x: 160, y: 340, label: 'REHEARSE', num: '06' },
  'LEARN AGAIN': { x: 240, y: 160, label: 'LEARN AGAIN', num: '07' },
};

// Sequential stage order in the loop
const LOOP_ORDER: SystemLoopStageId[] = [
  'SENSE',
  'LEARN',
  'REMEMBER',
  'CROSS-CHECK',
  'NAVIGATE',
  'REHEARSE',
  'LEARN AGAIN',
];

export const SystemCanvas: React.FC<SystemCanvasProps> = ({
  selectedNodeId,
  onSelectNode,
  activeTraceStepIndex,
  activeComponentTraceId,
  reducedMotion,
}) => {
  // Determine if a node is currently active in the FOLLOW SYSTEM sequence
  const isNodeInActiveFollow = (stageId: SystemLoopStageId) => {
    if (activeTraceStepIndex === null) return false;
    return LOOP_ORDER[activeTraceStepIndex] === stageId;
  };

  // Determine if a node is in the active component trace
  const activeComponentTrace = COMPONENT_TRACES.find((c) => c.id === activeComponentTraceId);
  const isNodeInComponentTrace = (stageId: SystemLoopStageId) => {
    if (!activeComponentTrace) return false;
    return activeComponentTrace.pathStages.includes(stageId);
  };

  return (
    <g aria-label="TrueNorth Closed-Loop System Architecture Blueprint">
      <defs>
        {/* Glow Gradients for Loop Nodes */}
        <radialGradient id="systemLoopGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B89562" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0B0D0F" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* LAYER 1: OUTER SYSTEM LOOP BACKBONE RING */}
      <path
        d="M 500 85 C 800 85, 890 280, 840 340 C 790 400, 720 480, 500 500 C 280 480, 210 400, 160 340 C 110 280, 200 85, 500 85 Z"
        stroke="#35383A"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 500 85 C 800 85, 890 280, 840 340 C 790 400, 720 480, 500 500 C 280 480, 210 400, 160 340 C 110 280, 200 85, 500 85 Z"
        stroke="#151719"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 500 85 C 800 85, 890 280, 840 340 C 790 400, 720 480, 500 500 C 280 480, 210 400, 160 340 C 110 280, 200 85, 500 85 Z"
        stroke="#71869A"
        strokeWidth="1.5"
        strokeDasharray="6 6"
        strokeOpacity="0.5"
        fill="none"
      />

      {/* LAYER 2: DIRECTED VECTOR EDGES LINKING SEQUENTIAL STAGES */}
      {LOOP_ORDER.map((stageId, idx) => {
        const nextStageId = LOOP_ORDER[(idx + 1) % LOOP_ORDER.length];
        const p1 = NODE_COORDINATES[stageId];
        const p2 = NODE_COORDINATES[nextStageId];

        const isEdgeActive =
          (activeTraceStepIndex !== null && LOOP_ORDER[activeTraceStepIndex] === stageId) ||
          (activeComponentTrace &&
            activeComponentTrace.pathStages.includes(stageId) &&
            activeComponentTrace.pathStages.includes(nextStageId));

        return (
          <line
            key={`edge-${stageId}-${nextStageId}`}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={isEdgeActive ? '#B89562' : '#35383A'}
            strokeWidth={isEdgeActive ? '2.5' : '1.5'}
            strokeDasharray={isEdgeActive ? 'none' : '4 4'}
            strokeOpacity={isEdgeActive ? 1 : 0.6}
            className={isEdgeActive && !reducedMotion ? 'transition-all duration-300' : ''}
          />
        );
      })}

      {/* LAYER 3: CENTRAL SYSTEM FUSED OUTPUT ENDPOINT BOX */}
      <g transform="translate(360, 240)">
        <rect
          width="280"
          height="120"
          rx="4"
          fill="#151719"
          fillOpacity="0.95"
          stroke="#71869A"
          strokeWidth="1.5"
        />
        <rect
          x="6"
          y="6"
          width="268"
          height="108"
          rx="2"
          fill="#0B0D0F"
          stroke="#35383A"
          strokeWidth="1"
        />

        <text x="140" y="28" textAnchor="middle" fill="#E8E6E1" fontSize="11" fontWeight="bold" fontFamily="JetBrains Mono">
          TRUENORTH NAVIGATION STATE
        </text>
        <line x1="20" y1="36" x2="260" y2="36" stroke="#35383A" strokeWidth="1" />

        <g transform="translate(20, 50)" fontSize="9" fontFamily="JetBrains Mono">
          <text x="0" y="10" fill="#71869A">POSITION:</text>
          <text x="100" y="10" fill="#78947F">ESTIMATED (TOPOLOCK)</text>

          <text x="0" y="24" fill="#71869A">VELOCITY / SPEED:</text>
          <text x="100" y="24" fill="#78947F">AI SPEED + IMU HARMONICS</text>

          <text x="0" y="38" fill="#71869A">HEADING / BIAS:</text>
          <text x="100" y="38" fill="#B89562">ADAPTIVE EKF ESTIMATE</text>

          <text x="0" y="52" fill="#71869A">UNCERTAINTY:</text>
          <text x="100" y="52" fill="#E8E6E1">BOUNDED / QUALITATIVE</text>
        </g>
      </g>

      {/* VECTOR LINES CONNECTING CROSS-CHECK & NAVIGATE TO CENTER */}
      <line x1="690" y1="480" x2="500" y2="360" stroke="#71869A" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="310" y1="480" x2="500" y2="360" stroke="#B89562" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* LAYER 4: SYSTEM LOOP NODES & SUB-BADGES */}
      {SYSTEM_NODES.map((node) => {
        const coords = NODE_COORDINATES[node.id];
        const isSelected = selectedNodeId === node.id;
        const isFollowActive = isNodeInActiveFollow(node.id);
        const isTraceActive = isNodeInComponentTrace(node.id);

        const isHighlighted = isSelected || isFollowActive || isTraceActive;

        return (
          <g
            key={node.id}
            onClick={() => onSelectNode(node.id)}
            transform={`translate(${coords.x}, ${coords.y})`}
            className="cursor-pointer group"
          >
            {/* Glow Circle */}
            <circle
              r={isHighlighted ? '28' : '22'}
              fill={isHighlighted ? 'url(#systemLoopGlow)' : '#151719'}
              stroke={
                isSelected
                  ? '#E8E6E1'
                  : isFollowActive || isTraceActive
                  ? '#B89562'
                  : '#35383A'
              }
              strokeWidth={isHighlighted ? '2.5' : '1.5'}
              className={isHighlighted && !reducedMotion ? 'animate-pulse' : ''}
            />

            {/* Inner Stage Circle */}
            <circle
              r="14"
              fill={isHighlighted ? '#151719' : '#0B0D0F'}
              stroke={
                isHighlighted
                  ? '#B89562'
                  : '#71869A'
              }
              strokeWidth="1.5"
            />

            {/* Stage Number */}
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fill={isHighlighted ? '#E8E6E1' : '#71869A'}
              fontSize="9"
              fontWeight="bold"
              fontFamily="JetBrains Mono"
            >
              {node.stageNumber}
            </text>

            {/* Node Title Label */}
            <text
              x="0"
              y={coords.y > 300 ? '42' : '-34'}
              textAnchor="middle"
              fill={isHighlighted ? '#E8E6E1' : '#A7A6A1'}
              fontSize="11"
              fontWeight="bold"
              fontFamily="JetBrains Mono"
              className="group-hover:fill-[#E8E6E1] transition-colors"
            >
              {node.label}
            </text>

            {/* Subsystems Capsule Badge */}
            <rect
              x="-65"
              y={coords.y > 300 ? '48' : '-28'}
              width="130"
              height="16"
              rx="2"
              fill="#151719"
              stroke={isHighlighted ? '#71869A' : '#35383A'}
              strokeWidth="1"
            />
            <text
              x="0"
              y={coords.y > 300 ? '59' : '-17'}
              textAnchor="middle"
              fill={isHighlighted ? '#B89562' : '#747570'}
              fontSize="8"
              fontFamily="JetBrains Mono"
            >
              {node.subsystems[0]}
            </text>
          </g>
        );
      })}

      {/* Active Component Trace Overlay Banner (if selected) */}
      {activeComponentTrace && (
        <g transform="translate(30, 40)">
          <rect
            width="320"
            height="45"
            rx="3"
            fill="#151719"
            fillOpacity="0.95"
            stroke="#B89562"
            strokeWidth="1"
          />
          <text x="12" y="18" fill="#B89562" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono">
            COMPONENT TRACE: {activeComponentTrace.name.toUpperCase()}
          </text>
          <text x="12" y="34" fill="#A7A6A1" fontSize="9" fontFamily="JetBrains Mono">
            {activeComponentTrace.description}
          </text>
        </g>
      )}

      {/* Non-Telemetry Watermark */}
      <text x="20" y="580" fill="#747570" fontSize="10" fontFamily="JetBrains Mono">
        VISUALIZATION: CONCEPTUAL SYSTEM BLUEPRINT (NON-TELEMETRY)
      </text>
    </g>
  );
};
