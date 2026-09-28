import React from 'react';

interface MissionEnvironmentProps {
  progress: number;
}

export const MissionEnvironment: React.FC<MissionEnvironmentProps> = ({ progress }) => {
  // Calculate opacities for geometric corridor structures based on progress
  const urbanOpacity = Math.max(0, Math.min(1, (progress - 0.25) / 0.3));
  const tunnelOpacity = Math.max(0, Math.min(1, (progress - 0.6) / 0.3));

  return (
    <g className="transition-all duration-300">
      {/* LAYER 2A: OPEN ROAD GEOMETRY */}
      {/* Main Highway Path Background Geometry */}
      <path
        d="M 80 480 C 220 480, 320 220, 520 220 C 720 220, 780 360, 920 360"
        stroke="#35383A"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        d="M 80 480 C 220 480, 320 220, 520 220 C 720 220, 780 360, 920 360"
        stroke="#151719"
        strokeWidth="18"
        strokeLinecap="round"
      />
      {/* Centerline Dash */}
      <path
        d="M 80 480 C 220 480, 320 220, 520 220 C 720 220, 780 360, 920 360"
        stroke="#71869A"
        strokeWidth="1.5"
        strokeDasharray="10 10"
        strokeOpacity="0.4"
      />

      {/* LAYER 2B: URBAN CANYON CORRIDOR (Stage B & C) */}
      {urbanOpacity > 0 && (
        <g style={{ opacity: urbanOpacity }} className="transition-opacity duration-300">
          {/* Left/Right Vertical Corridor Bounds along mid-route (x: 350 to 650) */}
          {/* Left Vertical Structure Lines */}
          <line x1="320" y1="130" x2="320" y2="290" stroke="#35383A" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="360" y1="110" x2="360" y2="270" stroke="#35383A" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="400" y1="90" x2="400" y2="250" stroke="#35383A" strokeWidth="2" strokeDasharray="4 4" />

          {/* Right Vertical Structure Lines */}
          <line x1="580" y1="130" x2="580" y2="290" stroke="#35383A" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="620" y1="110" x2="620" y2="270" stroke="#35383A" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="660" y1="90" x2="660" y2="250" stroke="#35383A" strokeWidth="2" strokeDasharray="4 4" />

          {/* Stage B Spatial Label */}
          <text x="350" y="80" fill="#A88A58" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1">
            [STAGE B: URBAN CANYON — SATELLITE MULTIPATH & BLOCKAGE]
          </text>
        </g>
      )}

      {/* LAYER 2C: UNDERPASS / TUNNEL CANOPY (Stage C & Settled) */}
      {tunnelOpacity > 0 && (
        <g style={{ opacity: tunnelOpacity }} className="transition-opacity duration-300">
          {/* Tunnel Canopy Arc Structure around x: 680 to 880 */}
          <path
            d="M 680 260 C 680 180, 880 180, 880 340"
            stroke="#35383A"
            strokeWidth="3"
            strokeDasharray="6 6"
            fill="none"
          />
          <path
            d="M 690 270 C 690 200, 870 200, 870 330"
            fill="#151719"
            fillOpacity="0.7"
            stroke="#9B625E"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          {/* Tunnel Roof Hatching */}
          <line x1="720" y1="200" x2="720" y2="300" stroke="#35383A" strokeWidth="1" />
          <line x1="760" y1="190" x2="760" y2="320" stroke="#35383A" strokeWidth="1" />
          <line x1="800" y1="200" x2="800" y2="350" stroke="#35383A" strokeWidth="1" />
          <line x1="840" y1="220" x2="840" y2="350" stroke="#35383A" strokeWidth="1" />

          {/* Stage C Spatial Label */}
          <text x="700" y="160" fill="#9B625E" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1">
            [STAGE C: UNDERPASS / TUNNEL — GNSS SHADOW]
          </text>
        </g>
      )}

      {/* Stage A Spatial Label */}
      <text x="100" y="420" fill="#78947F" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1">
        [STAGE A: OPEN ROAD — UNIMPEDED SATELLITE VISIBILITY]
      </text>
    </g>
  );
};
