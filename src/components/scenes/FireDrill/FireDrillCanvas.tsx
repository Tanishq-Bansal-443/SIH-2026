import React from 'react';
import type { FireDrillStage } from '../../../types/experience';
import { FIREDRILL_DIAGNOSTICS } from '../../../data/fireDrillFixtures';

interface FireDrillCanvasProps {
  stage: FireDrillStage;
  progress: number; // 0 to 100
  selectedDiagnosticId: string | null;
  onSelectDiagnostic: (id: string) => void;
  reducedMotion: boolean;
}

export const FireDrillCanvas: React.FC<FireDrillCanvasProps> = ({
  stage,
  progress,
  selectedDiagnosticId,
  onSelectDiagnostic,
  reducedMotion,
}) => {
  // Calculate vehicle positions along SVG parametric curve based on progress percentage
  // Path: M 100 450 C 250 450, 300 180, 500 180 C 700 180, 750 380, 900 380
  const t = Math.max(0, Math.min(1, progress / 100));

  // Reference Trajectory interpolation (Bézier curve approximation)
  // Segment 1 (t: 0..0.5)
  // Segment 2 (t: 0.5..1.0)
  let refX = 100 + t * 800;
  let refY = 450;
  if (t < 0.5) {
    const localT = t * 2;
    refY = Math.pow(1 - localT, 2) * 450 + 2 * (1 - localT) * localT * 315 + Math.pow(localT, 2) * 180;
  } else {
    const localT = (t - 0.5) * 2;
    refY = Math.pow(1 - localT, 2) * 180 + 2 * (1 - localT) * localT * 280 + Math.pow(localT, 2) * 380;
  }

  // Shadow Trajectory interpolation (includes slight divergence at t > 0.6 in segment 3)
  let shadowX = refX;
  let shadowY = refY;
  if (t >= 0.55 && t <= 0.85) {
    // Conceptual divergence during RoadMemory review segment
    shadowY = refY + Math.sin((t - 0.55) / 0.3 * Math.PI) * 28;
    shadowX = refX - Math.sin((t - 0.55) / 0.3 * Math.PI) * 12;
  }

  const isGNSSWithheld = stage !== 'IDLE' && stage !== 'ARMED';

  return (
    <g aria-label="FireDrill Shadow Navigation Visual Canvas">
      <defs>
        {/* Shadow Path Glow & Gradient */}
        <linearGradient id="shadowPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B89562" />
          <stop offset="60%" stopColor="#B89562" />
          <stop offset="78%" stopColor="#9B625E" />
          <stop offset="100%" stopColor="#B89562" />
        </linearGradient>

        {/* Reference Path Gradient */}
        <linearGradient id="refPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#71869A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#71869A" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* LAYER 1: BASE ROAD GEOMETRY */}
      <path
        d="M 100 450 C 250 450, 300 180, 500 180 C 700 180, 750 380, 900 380"
        stroke="#35383A"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M 100 450 C 250 450, 300 180, 500 180 C 700 180, 750 380, 900 380"
        stroke="#151719"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Centerline Lane Geometry */}
      <path
        d="M 100 450 C 250 450, 300 180, 500 180 C 700 180, 750 380, 900 380"
        stroke="#35383A"
        strokeWidth="1.5"
        strokeDasharray="6 6"
      />

      {/* LAYER 2: REFERENCE TRAJECTORY (GNSS Reference / Evaluation Source) */}
      <path
        d="M 100 450 C 250 450, 300 180, 500 180 C 700 180, 750 380, 900 380"
        stroke="url(#refPathGrad)"
        strokeWidth="3"
        strokeDasharray="8 6"
        fill="none"
      />

      {/* LAYER 3: SHADOW NAVIGATION TRAJECTORY (GNSS-Denied Rehearsal) */}
      <path
        d="M 100 450 C 250 450, 305 195, 495 195 C 680 205, 755 410, 900 380"
        stroke="url(#shadowPathGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* CONCEPTUAL DIVERGENCE HIGHLIGHT ZONE (Segment 3 RoadMemory Review) */}
      <path
        d="M 540 188 C 660 198, 745 412, 790 395"
        stroke="#9B625E"
        strokeWidth="6"
        strokeOpacity="0.3"
        strokeDasharray="4 4"
        fill="none"
      />

      {/* LAYER 4: SENSOR EVIDENCE STREAMS FEEDING SHADOW NAVIGATION */}
      {isGNSSWithheld && t > 0.1 && (
        <g opacity={reducedMotion ? 0.8 : 0.9}>
          {/* IMU stream line */}
          <line
            x1="220"
            y1="120"
            x2={shadowX}
            y2={shadowY}
            stroke="#71869A"
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeOpacity="0.5"
          />
          {/* AI Speed stream line */}
          <line
            x1="400"
            y1="100"
            x2={shadowX}
            y2={shadowY}
            stroke="#71869A"
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeOpacity="0.5"
          />
          {/* TopoLock stream line */}
          <line
            x1="500"
            y1="110"
            x2={shadowX}
            y2={shadowY}
            stroke="#78947F"
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeOpacity="0.5"
          />
          {/* RoadMemory stream line (showing review warning near divergence) */}
          <line
            x1="710"
            y1="320"
            x2={shadowX}
            y2={shadowY}
            stroke={t > 0.5 ? '#9B625E' : '#B89562'}
            strokeWidth="1.2"
            strokeDasharray="4 3"
            strokeOpacity="0.7"
          />
        </g>
      )}

      {/* LAYER 5: VEHICLE MARKERS & POSITION INSTRUMENTATION */}
      {/* 5A. Reference Vehicle Marker */}
      <g transform={`translate(${refX}, ${refY})`}>
        <circle r="10" fill="#151719" stroke="#71869A" strokeWidth="1.5" />
        <circle r="3" fill="#71869A" />
        <text
          x="14"
          y="-6"
          fill="#71869A"
          fontSize="9"
          fontFamily="JetBrains Mono"
          className="pointer-events-none"
        >
          REFERENCE (GNSS EVALUATION SOURCE)
        </text>
      </g>

      {/* 5B. Shadow Rehearsal Vehicle Marker */}
      <g transform={`translate(${shadowX}, ${shadowY})`}>
        <circle
          r="14"
          fill="#151719"
          stroke={t > 0.55 && t < 0.85 ? '#9B625E' : '#B89562'}
          strokeWidth="2"
          className={reducedMotion || stage !== 'RUNNING' ? '' : 'animate-pulse'}
        />
        <polygon
          points="0,-6 5,5 -5,5"
          fill={t > 0.55 && t < 0.85 ? '#9B625E' : '#B89562'}
        />
        <text
          x="16"
          y="12"
          fill={t > 0.55 && t < 0.85 ? '#9B625E' : '#B89562'}
          fontSize="10"
          fontWeight="bold"
          fontFamily="JetBrains Mono"
          className="pointer-events-none"
        >
          SHADOW SOLUTION (GNSS-DENIED REHEARSAL)
        </text>
      </g>

      {/* LAYER 6: INTERACTIVE DIAGNOSTIC LANDMARK BADGES ON MAP */}
      {FIREDRILL_DIAGNOSTICS.map((diag) => {
        let posX = 300;
        let posY = 150;

        if (diag.category === 'MOTION ESTIMATION') {
          posX = 200;
          posY = 420;
        } else if (diag.category === 'ROAD EVIDENCE') {
          posX = 320;
          posY = 240;
        } else if (diag.category === 'TOPOLOGY') {
          posX = 500;
          posY = 140;
        } else if (diag.category === 'ROAD MEMORY') {
          posX = 710;
          posY = 320;
        } else if (diag.category === 'PEER EVIDENCE') {
          posX = 830;
          posY = 340;
        } else if (diag.category === 'GNSS DEPENDENCY') {
          posX = 620;
          posY = 220;
        }

        const isSelected = selectedDiagnosticId === diag.id;
        const isWeakness = diag.isWeakness;

        return (
          <g
            key={diag.id}
            onClick={() => onSelectDiagnostic(diag.id)}
            className="cursor-pointer group"
          >
            <circle
              cx={posX}
              cy={posY}
              r={isSelected ? '14' : '10'}
              fill="#151719"
              stroke={
                isSelected
                  ? '#E8E6E1'
                  : isWeakness
                  ? '#9B625E'
                  : '#78947F'
              }
              strokeWidth={isSelected ? '2.5' : '1.5'}
            />
            <circle
              cx={posX}
              cy={posY}
              r="4"
              fill={isWeakness ? '#9B625E' : '#78947F'}
            />

            {/* Badge Text Label */}
            <rect
              x={posX - 40}
              y={posY + 14}
              width="80"
              height="16"
              rx="2"
              fill="#151719"
              stroke={isWeakness ? '#9B625E' : '#35383A'}
              strokeWidth="1"
            />
            <text
              x={posX}
              y={posY + 25}
              textAnchor="middle"
              fill={isSelected ? '#E8E6E1' : isWeakness ? '#9B625E' : '#A7A6A1'}
              fontSize="8"
              fontFamily="JetBrains Mono"
              fontWeight="bold"
            >
              {diag.category.replace('_', ' ')}
            </text>
          </g>
        );
      })}

      {/* LAYER 7: LEGEND BOX & STATUS OVERLAY */}
      <g transform="translate(30, 40)">
        <rect
          width="260"
          height="115"
          rx="3"
          fill="#151719"
          fillOpacity="0.92"
          stroke="#35383A"
          strokeWidth="1"
        />

        <text x="12" y="20" fill="#E8E6E1" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
          FIRE DRILL REHEARSAL CANVAS
        </text>

        {/* Reference Legend */}
        <line x1="12" y1="38" x2="36" y2="38" stroke="#71869A" strokeWidth="2.5" strokeDasharray="4 4" />
        <text x="44" y="41" fill="#A7A6A1" fontSize="9" fontFamily="JetBrains Mono">
          REFERENCE: GNSS Evaluation Source
        </text>

        {/* Shadow Legend */}
        <line x1="12" y1="56" x2="36" y2="56" stroke="#B89562" strokeWidth="2.5" />
        <text x="44" y="59" fill="#A7A6A1" fontSize="9" fontFamily="JetBrains Mono">
          SHADOW: GNSS-Denied Rehearsal
        </text>

        {/* Weakness Legend */}
        <line x1="12" y1="74" x2="36" y2="74" stroke="#9B625E" strokeWidth="2.5" strokeDasharray="3 3" />
        <text x="44" y="77" fill="#9B625E" fontSize="9" fontFamily="JetBrains Mono">
          WEAKNESS: RoadMemory Review Segment
        </text>

        {/* GNSS Withheld State */}
        <rect x="12" y="87" width="236" height="18" rx="2" fill="#0B0D0F" stroke="#35383A" />
        <text x="20" y="100" fill={isGNSSWithheld ? '#A88A58' : '#78947F'} fontSize="8" fontFamily="JetBrains Mono">
          STATUS: {isGNSSWithheld ? 'SIMULATED GNSS OUTAGE (HIDDEN REFERENCE)' : 'GNSS ACTIVE (PRE-REHEARSAL)'}
        </text>
      </g>

      {/* LAYER 8: REHEARSAL STAGE INDICATOR (TOP RIGHT) */}
      <g transform="translate(720, 40)">
        <rect
          width="250"
          height="54"
          rx="3"
          fill="#151719"
          fillOpacity="0.95"
          stroke={stage === 'COMPLETE' || stage === 'REVIEW' ? '#B89562' : '#35383A'}
          strokeWidth="1"
        />
        <text x="12" y="20" fill="#71869A" fontSize="9" fontFamily="JetBrains Mono">
          FIRE DRILL STAGE MACHINE
        </text>
        <text
          x="12"
          y="38"
          fill={
            stage === 'RUNNING'
              ? '#A88A58'
              : stage === 'EVALUATING'
              ? '#71869A'
              : stage === 'COMPLETE' || stage === 'REVIEW'
              ? '#B89562'
              : '#E8E6E1'
          }
          fontSize="12"
          fontWeight="bold"
          fontFamily="JetBrains Mono"
        >
          {stage === 'IDLE'
            ? 'FIRE DRILL READY'
            : stage === 'ARMED'
            ? 'SHADOW NAVIGATION ARMED'
            : stage === 'RUNNING'
            ? 'SIMULATED GNSS OUTAGE'
            : stage === 'EVALUATING'
            ? 'REFERENCE COMPARISON'
            : stage === 'COMPLETE'
            ? 'REHEARSAL COMPLETE'
            : 'DIAGNOSTICS AVAILABLE'}
        </text>
      </g>
    </g>
  );
};
