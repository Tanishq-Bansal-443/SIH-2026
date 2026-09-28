import React from 'react';
import { useExperience } from '../../state/ExperienceContext';
import { getChapterById } from '../../data/chapters';
import { CONCEPTUAL_ROAD_EVENTS, CONCEPTUAL_PEERS } from '../../data/conceptualFixtures';
import { ActionButton } from '../primitives/ActionButton';
import { Navigation, Radio, ShieldAlert } from 'lucide-react';
import { MissionScene } from '../scenes/Mission/MissionScene';
import { FailureScene } from '../scenes/Failure/FailureScene';
import { CoreScene } from '../scenes/Core/CoreScene';
import { RoadIntelligenceScene } from '../scenes/RoadIntelligence/RoadIntelligenceScene';

export const SceneCanvas: React.FC = () => {
  const {
    currentChapter,
    gnssState,
    selectedRoadEventId,
    setSelectedRoadEventId,
    selectedPeerId,
    setSelectedPeerId,
    firedrillActive,
    toggleFireDrill,
    setInspectingNodeId,
    reducedMotion,
  } = useExperience();

  // Route active scene based on currentChapter
  if (currentChapter === '01') {
    return <MissionScene />;
  }

  if (currentChapter === '02') {
    return <FailureScene />;
  }

  if (currentChapter === '03') {
    return <CoreScene />;
  }

  if (currentChapter === '04') {
    return <RoadIntelligenceScene />;
  }

  const activeChap = getChapterById(currentChapter);

  return (
    <main
      aria-label="TrueNorth Cartographic Visual World"
      className="relative flex-1 bg-[#0B0D0F] overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none"
    >
      {/* LAYER 1: BACKGROUND — Engineering Grid Matrix Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#35383A_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* LAYER 7: NARRATIVE OVERLAY — Chapter Title & Context */}
      <div className="relative z-10 max-w-xl space-y-1 sm:space-y-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="tn-tag tn-tag-brass">{activeChap.number}</span>
          <span className="font-mono text-xs text-[#71869A] tracking-wider uppercase">
            {activeChap.label} SCENE CANVAS
          </span>
        </div>
        <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#E8E6E1] tracking-tight">
          {activeChap.title}
        </h2>
        <p className="font-sans text-xs text-[#A7A6A1] leading-relaxed line-clamp-2 sm:line-clamp-3">
          {activeChap.shortDescription}
        </p>
      </div>

      {/* CENTRAL CARTOGRAPHIC ENGINE (Layers 2-6 Composition) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <svg
          className="w-full h-full max-w-5xl max-h-[700px] p-4 sm:p-8"
          viewBox="0 0 1000 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* SoftGNSS Uncertainty Radial Gradient */}
            <radialGradient id="gnssUncertainty" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor={
                  gnssState === 'healthy'
                    ? '#78947F'
                    : gnssState === 'degrading'
                    ? '#A88A58'
                    : '#9B625E'
                }
                stopOpacity="0.25"
              />
              <stop offset="100%" stopColor="#0B0D0F" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* LAYER 2: MAP / ROAD TOPOLOGY GEOMETRY */}
          <path
            d="M 100 450 C 250 450, 300 200, 500 200 C 700 200, 750 350, 900 350"
            stroke="#35383A"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M 100 450 C 250 450, 300 200, 500 200 C 700 200, 750 350, 900 350"
            stroke="#151719"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M 100 450 C 250 450, 300 200, 500 200 C 700 200, 750 350, 900 350"
            stroke="#71869A"
            strokeWidth="1.5"
            strokeDasharray="8 8"
            strokeOpacity="0.4"
          />

          <path
            d="M 500 50 L 500 550"
            stroke="#35383A"
            strokeWidth="6"
            strokeDasharray="4 4"
            strokeOpacity="0.5"
          />
          <circle cx="500" cy="200" r="16" stroke="#35383A" strokeWidth="1" fill="none" />

          {/* LAYER 3: ROUTE — Active Navigation Trajectory */}
          <path
            d="M 100 450 C 250 450, 300 200, 480 200"
            stroke="#B89562"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* FireDrill Shadow Navigation Trajectory Overlay */}
          {firedrillActive && (
            <g>
              <path
                d="M 100 450 C 250 458, 305 215, 475 225"
                stroke="#9B625E"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              <text x="320" y="243" fill="#9B625E" fontSize="10" fontFamily="JetBrains Mono">
                FIRE DRILL SHADOW PATH (GNSS DEPRIVED)
              </text>
            </g>
          )}

          {/* LAYER 4: SYSTEM STATE — Vehicle Position & Uncertainty Region */}
          <circle
            cx="480"
            cy="200"
            r={
              gnssState === 'healthy'
                ? '32'
                : gnssState === 'degrading'
                ? '65'
                : gnssState === 'unreliable'
                ? '110'
                : '160'
            }
            fill="url(#gnssUncertainty)"
            stroke={
              gnssState === 'healthy'
                ? '#78947F'
                : gnssState === 'degrading'
                ? '#A88A58'
                : '#9B625E'
            }
            strokeWidth="1"
            strokeDasharray="4 4"
            className={reducedMotion ? '' : 'animate-pulse'}
          />

          {/* Vehicle Marker Instrument Node */}
          <g transform="translate(480, 200)">
            <circle r="12" fill="#151719" stroke="#B89562" strokeWidth="2" />
            <polygon points="0,-7 5,5 -5,5" fill="#B89562" />
          </g>

          {/* LAYER 5: EVIDENCE — RoadSense Events & Memory Markers */}
          {CONCEPTUAL_ROAD_EVENTS.map((event, idx) => {
            const posX = 200 + idx * 180;
            const posY = idx % 2 === 0 ? 350 : 220;
            const isSelected = selectedRoadEventId === event.id;

            return (
              <g
                key={event.id}
                onClick={() => setSelectedRoadEventId(isSelected ? null : event.id)}
                className="cursor-pointer group"
              >
                <circle
                  cx={posX}
                  cy={posY}
                  r="10"
                  fill={isSelected ? '#B89562' : '#151719'}
                  stroke={isSelected ? '#E8E6E1' : '#71869A'}
                  strokeWidth="2"
                />
                <circle
                  cx={posX}
                  cy={posY}
                  r="4"
                  fill={isSelected ? '#151719' : '#71869A'}
                />
                <text
                  x={posX + 15}
                  y={posY + 4}
                  fill={isSelected ? '#E8E6E1' : '#A7A6A1'}
                  fontSize="11"
                  fontFamily="JetBrains Mono"
                  className="group-hover:fill-[#E8E6E1] transition-colors"
                >
                  {event.label}
                </text>
              </g>
            );
          })}

          {/* CoNav Peer Vehicle Witness Nodes & Vector Links */}
          {CONCEPTUAL_PEERS.map((peer, idx) => {
            const peerX = 650 + idx * 70;
            const peerY = 220 + idx * 60;
            const isSelected = selectedPeerId === peer.id;
            const isValidated = peer.validationState === 'VALIDATED';

            return (
              <g
                key={peer.id}
                onClick={() => setSelectedPeerId(isSelected ? null : peer.id)}
                className="cursor-pointer"
              >
                {/* LAYER 6: INTERACTION — Peer Constraint Vector Line */}
                <line
                  x1="480"
                  y1="200"
                  x2={peerX}
                  y2={peerY}
                  stroke={isValidated ? '#78947F' : '#9B625E'}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.7"
                />
                <circle
                  cx={peerX}
                  cy={peerY}
                  r="8"
                  fill="#151719"
                  stroke={isValidated ? '#78947F' : '#9B625E'}
                  strokeWidth="2"
                />
                <text
                  x={peerX + 12}
                  y={peerY + 4}
                  fill={isValidated ? '#78947F' : '#9B625E'}
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                >
                  {peer.callsign}
                </text>
              </g>
            );
          })}

          {/* Watermark Requirement Safeguard */}
          <text x="20" y="580" fill="#747570" fontSize="10" fontFamily="JetBrains Mono">
            VISUALIZATION: CONCEPTUAL REASONING CANVAS (NON-TELEMETRY)
          </text>
        </svg>
      </div>

      {/* CONTEXTUAL ACTION BAR (Bottom Canvas Layer) */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#35383A]/60 bg-[#0B0D0F]/85 backdrop-blur-sm p-3 rounded-sm">
        <div className="flex items-center gap-2">
          <ActionButton
            action="INSPECT SIGNAL"
            icon={<Radio className="w-3.5 h-3.5" />}
            onClick={() => setInspectingNodeId('node-gnss')}
          />
          <ActionButton
            action="EXAMINE PEER"
            icon={<Navigation className="w-3.5 h-3.5" />}
            onClick={() => setSelectedPeerId('peer-alpha')}
          />
        </div>

        <div className="flex items-center gap-2">
          <ActionButton
            action={firedrillActive ? 'HALT FIRE DRILL' : 'RUN BLACKOUT REHEARSAL'}
            variant="brass"
            icon={<ShieldAlert className="w-3.5 h-3.5" />}
            onClick={toggleFireDrill}
          />
        </div>
      </div>
    </main>
  );
};
