import React from 'react';
import type { GNSSQualityState } from '../../../types/experience';

interface MissionVehicleProps {
  progress: number; // 0.0 to 1.0
  gnssState: GNSSQualityState;
  reducedMotion: boolean;
}

// Compute point along Cubic Bezier: P(t) = (1-t)^3 P0 + 3(1-t)^2 t P1 + 3(1-t) t^2 P2 + t^3 P3
// For main route: Segment 1 (t 0-0.5): P0=(80,480), P1=(220,480), P2=(320,220), P3=(520,220)
// Segment 2 (t 0.5-1.0): P0=(520,220), P1=(720,220), P2=(780,360), P3=(920,360)
const getPointOnRoute = (t: number): { x: number; y: number; headingDeg: number } => {
  const clampT = Math.max(0, Math.min(1, t));

  let x: number;
  let y: number;
  let dx: number;
  let dy: number;

  if (clampT <= 0.5) {
    const localT = clampT * 2;
    const mt = 1 - localT;
    const p0 = { x: 80, y: 480 };
    const p1 = { x: 220, y: 480 };
    const p2 = { x: 320, y: 220 };
    const p3 = { x: 520, y: 220 };

    x = mt * mt * mt * p0.x + 3 * mt * mt * localT * p1.x + 3 * mt * localT * localT * p2.x + localT * localT * localT * p3.x;
    y = mt * mt * mt * p0.y + 3 * mt * mt * localT * p1.y + 3 * mt * localT * localT * p2.y + localT * localT * localT * p3.y;

    dx = 3 * mt * mt * (p1.x - p0.x) + 6 * mt * localT * (p2.x - p1.x) + 3 * localT * localT * (p3.x - p2.x);
    dy = 3 * mt * mt * (p1.y - p0.y) + 6 * mt * localT * (p2.y - p1.y) + 3 * localT * localT * (p3.y - p2.y);
  } else {
    const localT = (clampT - 0.5) * 2;
    const mt = 1 - localT;
    const p0 = { x: 520, y: 220 };
    const p1 = { x: 720, y: 220 };
    const p2 = { x: 780, y: 360 };
    const p3 = { x: 920, y: 360 };

    x = mt * mt * mt * p0.x + 3 * mt * mt * localT * p1.x + 3 * mt * localT * localT * p2.x + localT * localT * localT * p3.x;
    y = mt * mt * mt * p0.y + 3 * mt * mt * localT * p1.y + 3 * mt * localT * localT * p2.y + localT * localT * localT * p3.y;

    dx = 3 * mt * mt * (p1.x - p0.x) + 6 * mt * localT * (p2.x - p1.x) + 3 * localT * localT * (p3.x - p2.x);
    dy = 3 * mt * mt * (p1.y - p0.y) + 6 * mt * localT * (p2.y - p1.y) + 3 * localT * localT * (p3.y - p2.y);
  }

  const headingDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
  return { x, y, headingDeg };
};

export const MissionVehicle: React.FC<MissionVehicleProps> = ({ progress, gnssState, reducedMotion }) => {
  const { x, y, headingDeg } = getPointOnRoute(progress);

  // SoftGNSS Uncertainty Radius
  const getUncertaintyRadius = () => {
    switch (gnssState) {
      case 'healthy':
        return 28;
      case 'degrading':
        return 75;
      case 'unreliable':
      case 'unavailable':
      default:
        return 130;
    }
  };

  const radius = getUncertaintyRadius();

  return (
    <g className="transition-all duration-200">
      {/* SoftGNSS Uncertainty Region Circle */}
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill="url(#gnssUncertainty)"
        stroke={
          gnssState === 'healthy'
            ? '#78947F'
            : gnssState === 'degrading'
            ? '#A88A58'
            : '#9B625E'
        }
        strokeWidth="1.5"
        strokeDasharray="4 4"
        className={reducedMotion ? '' : 'animate-pulse'}
      />

      {/* Traversed Route Highlight Path */}
      <circle cx={x} cy={y} r="2" fill="#B89562" />

      {/* Vehicle Instrument Marker */}
      <g transform={`translate(${x}, ${y}) rotate(${headingDeg + 90})`}>
        <circle r="11" fill="#151719" stroke="#B89562" strokeWidth="2" />
        <polygon points="0,-7 5,5 -5,5" fill="#B89562" />
      </g>
    </g>
  );
};
