import React from 'react';

export type LoopStageId = 'SENSE' | 'LEARN' | 'REMEMBER' | 'CROSS_CHECK' | 'NAVIGATE' | 'REHEARSE' | 'LEARN_AGAIN';

interface CoreLoopDiagramProps {
  activeStage: LoopStageId;
  onSelectStage: (stage: LoopStageId) => void;
  reducedMotion: boolean;
}

const STAGE_POSITIONS: Record<LoopStageId, { x: number; y: number; label: string; num: string }> = {
  SENSE: { x: 500, y: 100, label: 'SENSE', num: '01' },
  LEARN: { x: 740, y: 170, label: 'LEARN', num: '02' },
  REMEMBER: { x: 820, y: 320, label: 'REMEMBER', num: '03' },
  CROSS_CHECK: { x: 700, y: 450, label: 'CROSS-CHECK', num: '04' },
  NAVIGATE: { x: 300, y: 450, label: 'NAVIGATE', num: '05' },
  REHEARSE: { x: 180, y: 320, label: 'REHEARSE', num: '06' },
  LEARN_AGAIN: { x: 260, y: 170, label: 'LEARN AGAIN', num: '07' },
};

const STAGE_ORDER: LoopStageId[] = [
  'SENSE',
  'LEARN',
  'REMEMBER',
  'CROSS_CHECK',
  'NAVIGATE',
  'REHEARSE',
  'LEARN_AGAIN',
];

export const CoreLoopDiagram: React.FC<CoreLoopDiagramProps> = ({
  activeStage,
  onSelectStage,
  reducedMotion,
}) => {
  const activeIdx = STAGE_ORDER.indexOf(activeStage);

  return (
    <g className="transition-all duration-300">
      {/* BACKGROUND ROAD GEOMETRY (Subdued Navigation Canvas Continuity) */}
      <path
        d="M 100 450 C 250 450, 300 200, 500 200 C 700 200, 750 350, 900 350"
        stroke="#35383A"
        strokeWidth="10"
        strokeOpacity="0.3"
        fill="none"
      />

      {/* LOOP CLOSURE CONNECTING ARCS */}
      {/* Sequential Outer Connections */}
      <path
        d="M 500 100 A 320 180 0 0 1 700 450"
        stroke="#35383A"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 4"
      />
      <path
        d="M 700 450 A 320 180 0 0 1 300 450"
        stroke="#35383A"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 4"
      />
      <path
        d="M 300 450 A 320 180 0 0 1 500 100"
        stroke="#35383A"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 4"
      />

      {/* LOOP CLOSURE RETURN ARROW (LEARN AGAIN -> SENSE) */}
      <path
        d="M 260 170 C 340 100, 420 90, 470 98"
        stroke={activeStage === 'LEARN_AGAIN' || activeStage === 'SENSE' ? '#B89562' : '#71869A'}
        strokeWidth={activeStage === 'LEARN_AGAIN' ? '2.5' : '1.5'}
        strokeDasharray="6 4"
        fill="none"
      />
      <polygon
        points="475,99 465,93 467,104"
        fill={activeStage === 'LEARN_AGAIN' || activeStage === 'SENSE' ? '#B89562' : '#71869A'}
      />
      <text x="330" y="85" fill="#71869A" fontSize="9" fontFamily="JetBrains Mono">
        [ADAPTIVE FEEDBACK: LEARN AGAIN → SENSE]
      </text>

      {/* CROSS-CHECK CONVERGING EVIDENCE FLOW VECTORS (Special visual when CROSS-CHECK active) */}
      {activeStage === 'CROSS_CHECK' && (
        <g className={reducedMotion ? '' : 'animate-pulse'}>
          {/* Converging Stream 1: SoftGNSS */}
          <line x1="520" y1="280" x2="680" y2="430" stroke="#78947F" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="530" y="275" fill="#78947F" fontSize="9" fontFamily="JetBrains Mono">SOFT-GNSS</text>

          {/* Converging Stream 2: AI Speed */}
          <line x1="780" y1="200" x2="720" y2="420" stroke="#71869A" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="790" y="195" fill="#71869A" fontSize="9" fontFamily="JetBrains Mono">AI SPEED</text>

          {/* Converging Stream 3: RoadSense / Landmark */}
          <line x1="840" y1="350" x2="740" y2="440" stroke="#B89562" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="850" y="365" fill="#B89562" fontSize="9" fontFamily="JetBrains Mono">ROADSENSE</text>

          {/* Converging Stream 4: TopoLock */}
          <line x1="450" y1="460" x2="660" y2="455" stroke="#8EA4B8" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="460" y="480" fill="#8EA4B8" fontSize="9" fontFamily="JetBrains Mono">TOPOLOCK</text>

          {/* Converging Stream 5: CoNav Peers */}
          <line x1="800" y1="480" x2="730" y2="465" stroke="#A88A58" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="810" y="495" fill="#A88A58" fontSize="9" fontFamily="JetBrains Mono">CoNAV WITNESS</text>
        </g>
      )}

      {/* STAGE NODES & INTERACTIVE SELECTION BUTTONS */}
      {STAGE_ORDER.map((stageId, idx) => {
        const { x, y, label, num } = STAGE_POSITIONS[stageId];
        const isSelected = activeStage === stageId;
        const isConnected = idx === activeIdx || idx === (activeIdx + 1) % 7 || idx === (activeIdx - 1 + 7) % 7;

        return (
          <g
            key={stageId}
            onClick={() => onSelectStage(stageId)}
            className="cursor-pointer group"
          >
            {/* Outer Focus / Selection Halo */}
            <circle
              cx={x}
              cy={y}
              r="34"
              fill={isSelected ? '#1E2124' : '#151719'}
              stroke={isSelected ? '#B89562' : isConnected ? '#71869A' : '#35383A'}
              strokeWidth={isSelected ? '2.5' : '1.5'}
              className="transition-all duration-200"
            />
            {isSelected && (
              <circle
                cx={x}
                cy={y}
                r="40"
                fill="none"
                stroke="#B89562"
                strokeWidth="1"
                strokeDasharray="4 4"
                className={reducedMotion ? '' : 'animate-spin-slow'}
              />
            )}

            {/* Inner Stage Number Badge */}
            <text
              x={x}
              y={y - 8}
              textAnchor="middle"
              fill={isSelected ? '#B89562' : '#747570'}
              fontSize="10"
              fontFamily="JetBrains Mono"
              fontWeight="bold"
            >
              {num}
            </text>

            {/* Stage Title Label */}
            <text
              x={x}
              y={y + 12}
              textAnchor="middle"
              fill={isSelected ? '#E8E6E1' : isConnected ? '#A7A6A1' : '#747570'}
              fontSize="11"
              fontFamily="JetBrains Mono"
              fontWeight="bold"
              className="group-hover:fill-[#E8E6E1] transition-colors"
            >
              {label}
            </text>
          </g>
        );
      })}
    </g>
  );
};
