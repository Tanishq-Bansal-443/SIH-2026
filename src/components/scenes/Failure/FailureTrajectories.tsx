import React from 'react';
import type { GNSSQualityState } from '../../../types/experience';

interface FailureTrajectoriesProps {
  gnssState: GNSSQualityState;
  blackoutActive: boolean;
  reducedMotion: boolean;
}

export const FailureTrajectories: React.FC<FailureTrajectoriesProps> = ({
  gnssState,
  blackoutActive,
  reducedMotion,
}) => {
  const isBlackout = blackoutActive || gnssState === 'unavailable';

  return (
    <g className="transition-all duration-300">
      {/* BACKGROUND GEOMETRY — Highway Arc & Tunnel Blackout Region */}
      <path
        d="M 100 300 C 300 300, 450 300, 900 300"
        stroke="#35383A"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M 100 300 C 300 300, 450 300, 900 300"
        stroke="#151719"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* GNSS Blackout Region Boundary Line (x: 450) */}
      <line
        x1="450"
        y1="100"
        x2="450"
        y2="500"
        stroke={isBlackout ? '#9B625E' : '#A88A58'}
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />
      <text
        x="460"
        y="120"
        fill={isBlackout ? '#9B625E' : '#A88A58'}
        fontSize="10"
        fontFamily="JetBrains Mono"
      >
        {isBlackout ? '[BLACKOUT BOUNDARY: GNSS UNAVAILABLE]' : '[DEGRADATION BOUNDARY: SOFT-GNSS UNRELIABLE]'}
      </text>

      {/* A. TRUE REFERENCE ROAD PATH */}
      <path
        d="M 100 300 L 900 300"
        stroke="#B89562"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <text x="820" y="285" fill="#B89562" fontSize="10" fontFamily="JetBrains Mono">
        TRUE ROAD PATH
      </text>

      {/* B. PURE INERTIAL DEAD RECKONING DIVERGENT PATH (When Blackout Active) */}
      {isBlackout ? (
        <g>
          {/* EXPANDING UNCERTAINTY ENVELOPE (Funnel) */}
          <polygon
            points="450,300 900,210 900,410"
            fill="#9B625E"
            fillOpacity="0.12"
            stroke="#9B625E"
            strokeWidth="1"
            strokeDasharray="4 4"
            className={reducedMotion ? '' : 'animate-pulse'}
          />

          {/* Divergent Pure Inertial Trajectory Line */}
          <path
            d="M 450 300 C 600 300, 750 240, 900 220"
            stroke="#9B625E"
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />
          <circle cx="900" cy="220" r="6" fill="#9B625E" />
          <text x="730" y="200" fill="#9B625E" fontSize="10" fontFamily="JetBrains Mono">
            UNASSISTED INERTIAL DR (ACCUMULATED ERROR)
          </text>
          <text x="730" y="215" fill="#747570" fontSize="9" fontFamily="JetBrains Mono">
            CONCEPTUAL UNCERTAINTY DIVERGENCE
          </text>
        </g>
      ) : (
        <g>
          {/* Constrained GNSS-Aided Trajectory Path */}
          <line
            x1="100"
            y1="300"
            x2="450"
            y2="300"
            stroke="#78947F"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <text x="250" y="285" fill="#78947F" fontSize="10" fontFamily="JetBrains Mono">
            GNSS-AIDED REFERENCE CONTINUITY
          </text>
        </g>
      )}

      {/* C. INTEGRATION CASCADE SCHEMATIC DIAGRAM (Bottom Left) */}
      <g transform="translate(100, 420)">
        <rect x="0" y="0" width="340" height="70" fill="#151719" stroke="#35383A" rx="2" />
        <text x="12" y="20" fill="#71869A" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="1">
          IMU DOUBLE INTEGRATION ERROR CASCADE
        </text>

        {/* Integration Nodes */}
        <text x="12" y="45" fill="#E8E6E1" fontSize="10" fontFamily="JetBrains Mono">ACCEL</text>
        <text x="65" y="45" fill="#747570" fontSize="10" fontFamily="JetBrains Mono">→</text>

        <text x="80" y="45" fill="#A88A58" fontSize="10" fontFamily="JetBrains Mono">∫ VELOCITY</text>
        <text x="160" y="45" fill="#747570" fontSize="10" fontFamily="JetBrains Mono">→</text>

        <text x="175" y="45" fill="#9B625E" fontSize="10" fontFamily="JetBrains Mono">∫ POSITION</text>

        <text x="12" y="60" fill="#747570" fontSize="9" fontFamily="JetBrains Mono">
          "Error accumulates through repeated double integration."
        </text>
      </g>
    </g>
  );
};
