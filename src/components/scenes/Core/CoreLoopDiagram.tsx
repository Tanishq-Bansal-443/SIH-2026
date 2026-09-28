import React from 'react';

export type LoopStageId = 'SENSE' | 'LEARN' | 'REMEMBER' | 'CROSS_CHECK' | 'NAVIGATE' | 'REHEARSE' | 'LEARN_AGAIN';

interface CoreLoopDiagramProps {
  activeStage: LoopStageId;
  onSelectStage: (stage: LoopStageId) => void;
  reducedMotion: boolean;
}

export const STAGE_POSITIONS: Record<LoopStageId, { x: number; y: number; label: string; num: string }> = {
  SENSE: { x: 500, y: 85, label: 'SENSE', num: '01' },
  LEARN: { x: 730, y: 155, label: 'LEARN', num: '02' },
  REMEMBER: { x: 820, y: 310, label: 'REMEMBER', num: '03' },
  CROSS_CHECK: { x: 680, y: 460, label: 'CROSS-CHECK', num: '04' },
  NAVIGATE: { x: 320, y: 460, label: 'NAVIGATE', num: '05' },
  REHEARSE: { x: 180, y: 310, label: 'REHEARSE', num: '06' },
  LEARN_AGAIN: { x: 270, y: 155, label: 'LEARN AGAIN', num: '07' },
};

export const STAGE_ORDER: LoopStageId[] = [
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

  // Helper to determine if a stage node or connection is active/connected
  const getStageRelation = (stageId: LoopStageId) => {
    const idx = STAGE_ORDER.indexOf(stageId);
    if (idx === activeIdx) return 'active';
    if (idx === (activeIdx + 1) % 7 || idx === (activeIdx - 1 + 7) % 7) return 'connected';
    return 'inactive';
  };

  return (
    <g aria-label="TrueNorth 7-Stage Reasoning Evidence Loop">
      <defs>
        {/* Glow & Filter Defs for Restrained Vector Highlights */}
        <filter id="coreGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <linearGradient id="senseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#71869A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#B89562" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="loopClosureGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#71869A" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#B89562" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#78947F" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* BACKGROUND SUBDUED ROAD GEOMETRY (Cartographic Canvas Continuity) */}
      <path
        d="M 80 500 C 220 500, 280 230, 500 230 C 720 230, 780 400, 920 400"
        stroke="#35383A"
        strokeWidth="12"
        strokeOpacity="0.25"
        fill="none"
      />
      <path
        d="M 80 500 C 220 500, 280 230, 500 230 C 720 230, 780 400, 920 400"
        stroke="#71869A"
        strokeWidth="1"
        strokeDasharray="4 6"
        strokeOpacity="0.3"
        fill="none"
      />

      {/* HEPTAGONAL LOOP PATHWAYS (Outer Evidence Loop Connections) */}
      {STAGE_ORDER.map((fromStage, idx) => {
        const toStage = STAGE_ORDER[(idx + 1) % 7];
        const p1 = STAGE_POSITIONS[fromStage];
        const p2 = STAGE_POSITIONS[toStage];

        const isLoopClosure = fromStage === 'LEARN_AGAIN' && toStage === 'SENSE';
        const isPathActive =
          activeStage === fromStage ||
          activeStage === toStage ||
          (activeStage === 'CROSS_CHECK' && (fromStage === 'REMEMBER' || toStage === 'NAVIGATE'));

        return (
          <g key={`${fromStage}-${toStage}`}>
            <line
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={
                isLoopClosure
                  ? 'url(#loopClosureGrad)'
                  : isPathActive
                  ? '#B89562'
                  : '#35383A'
              }
              strokeWidth={isPathActive ? '2.5' : '1.5'}
              strokeDasharray={isLoopClosure ? '6 4' : 'none'}
              strokeOpacity={isPathActive ? 0.9 : 0.4}
              className="transition-all duration-300"
            />
            {/* Animated Flow Indicator Marker along path if not reduced motion */}
            {isPathActive && !reducedMotion && (
              <circle
                r="3"
                fill="#B89562"
                className="animate-pulse"
              >
                <animateMotion
                  path={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`}
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        );
      })}

      {/* LOOP CLOSURE HIGHLIGHT: LEARN AGAIN -> SENSE RETURN PATHWAY */}
      <g>
        <path
          d="M 270 155 C 340 90, 420 75, 490 83"
          stroke="#B89562"
          strokeWidth={activeStage === 'LEARN_AGAIN' || activeStage === 'SENSE' ? '2.5' : '1.5'}
          strokeDasharray="6 4"
          strokeOpacity={activeStage === 'LEARN_AGAIN' || activeStage === 'SENSE' ? '0.95' : '0.4'}
          fill="none"
        />
        <polygon
          points="495,84 484,78 486,90"
          fill="#B89562"
          opacity={activeStage === 'LEARN_AGAIN' || activeStage === 'SENSE' ? '1' : '0.5'}
        />
        <text
          x="355"
          y="72"
          fill="#B89562"
          fontSize="9"
          fontFamily="JetBrains Mono"
          letterSpacing="0.05em"
          opacity={activeStage === 'LEARN_AGAIN' || activeStage === 'SENSE' ? '1' : '0.6'}
        >
          [LOOP CLOSURE: LEARN AGAIN → SENSE]
        </text>
      </g>

      {/* ========================================================================= */}
      {/* CENTER REASONING CANVAS: STAGE-SPECIFIC REASONING VISUALS (Center ~ 500,285) */}
      {/* ========================================================================= */}

      {/* STAGE 01: SENSE — Raw Heterogeneous Signals */}
      {activeStage === 'SENSE' && (
        <g transform="translate(340, 205)">
          <rect width="320" height="160" rx="4" fill="#151719" stroke="#71869A" strokeWidth="1" strokeOpacity="0.6" />
          <text x="160" y="24" textAnchor="middle" fill="#E8E6E1" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
            RAW HETEROGENEOUS SIGNALS
          </text>
          <text x="160" y="38" textAnchor="middle" fill="#747570" fontSize="9" fontFamily="JetBrains Mono">
            CONCEPTUAL SENSOR STREAM INPUTS
          </text>

          {/* Accelerometer Waveform */}
          <text x="15" y="62" fill="#B89562" fontSize="9" fontFamily="JetBrains Mono">ACCELEROMETER (3-AXIS)</text>
          <path d="M 150 58 Q 175 45, 200 58 T 250 58 T 300 58" stroke="#B89562" strokeWidth="1.5" fill="none" />

          {/* Gyroscope Waveform */}
          <text x="15" y="86" fill="#71869A" fontSize="9" fontFamily="JetBrains Mono">GYROSCOPE (ANGULAR RATE)</text>
          <path d="M 150 82 Q 165 92, 180 82 T 210 82 T 240 82 T 270 82 T 300 82" stroke="#71869A" strokeWidth="1.5" fill="none" />

          {/* Magnetometer Signal */}
          <text x="15" y="110" fill="#8EA4B8" fontSize="9" fontFamily="JetBrains Mono">MAGNETOMETER (HEADING)</text>
          <line x1="150" y1="106" x2="300" y2="106" stroke="#8EA4B8" strokeWidth="1.5" strokeDasharray="6 3" />

          {/* Soft-GNSS Indicator */}
          <text x="15" y="134" fill="#78947F" fontSize="9" fontFamily="JetBrains Mono">SOFT-GNSS MEASUREMENT</text>
          <rect x="150" y="127" width="150" height="8" rx="2" fill="#0B0D0F" stroke="#78947F" strokeWidth="1" />
          <rect x="152" y="129" width="110" height="4" rx="1" fill="#78947F" />

          <text x="160" y="152" textAnchor="middle" fill="#A7A6A1" fontSize="9" fontFamily="Inter, sans-serif">
            "TrueNorth begins with heterogeneous sensor evidence."
          </text>
        </g>
      )}

      {/* STAGE 02: LEARN — Learned Motion & AI Jobs */}
      {activeStage === 'LEARN' && (
        <g transform="translate(330, 205)">
          <rect width="340" height="165" rx="4" fill="#151719" stroke="#B89562" strokeWidth="1" strokeOpacity="0.8" />
          <text x="170" y="24" textAnchor="middle" fill="#E8E6E1" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
            SPECIFIC AI ESTIMATION JOBS
          </text>
          <text x="170" y="38" textAnchor="middle" fill="#B89562" fontSize="9" fontFamily="JetBrains Mono">
            RAW IMU → MOTION UNDERSTANDING → LEARNED ESTIMATES
          </text>

          {/* AI Jobs Grid */}
          <g transform="translate(15, 48)">
            {/* Job 1 */}
            <rect width="145" height="42" rx="2" fill="#0B0D0F" stroke="#71869A" strokeWidth="1" />
            <text x="10" y="16" fill="#E8E6E1" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">AI SPEED ESTIMATOR</text>
            <text x="10" y="30" fill="#747570" fontSize="8" fontFamily="Inter, sans-serif">Forward velocity from vibration</text>

            {/* Job 2 */}
            <rect x="165" width="145" height="42" rx="2" fill="#0B0D0F" stroke="#71869A" strokeWidth="1" />
            <text x="175" y="16" fill="#E8E6E1" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">MOTION CLASSIFICATION</text>
            <text x="175" y="30" fill="#747570" fontSize="8" fontFamily="Inter, sans-serif">Stationary / Drive / Maneuver</text>

            {/* Job 3 */}
            <rect y="50" width="145" height="42" rx="2" fill="#0B0D0F" stroke="#71869A" strokeWidth="1" />
            <text x="10" y="66" fill="#E8E6E1" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">VEHICLE RESPONSE</text>
            <text x="10" y="80" fill="#747570" fontSize="8" fontFamily="Inter, sans-serif">Learned suspension DNA</text>

            {/* Job 4 */}
            <rect x="165" y="50" width="145" height="42" rx="2" fill="#0B0D0F" stroke="#71869A" strokeWidth="1" />
            <text x="175" y="66" fill="#E8E6E1" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">ROAD EVENT RECOGNITION</text>
            <text x="175" y="80" fill="#747570" fontSize="8" fontFamily="Inter, sans-serif">Curves, bumps & impulses</text>
          </g>

          <text x="170" y="155" textAnchor="middle" fill="#A7A6A1" fontSize="9" fontFamily="Inter, sans-serif">
            "AI extracts specific motion and road information used as evidence."
          </text>
        </g>
      )}

      {/* STAGE 03: REMEMBER — Contextual Memory Role */}
      {activeStage === 'REMEMBER' && (
        <g transform="translate(340, 205)">
          <rect width="320" height="160" rx="4" fill="#151719" stroke="#71869A" strokeWidth="1" strokeOpacity="0.8" />
          <text x="160" y="24" textAnchor="middle" fill="#E8E6E1" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
            CONTEXTUAL MEMORY LOOP
          </text>
          <text x="160" y="38" textAnchor="middle" fill="#71869A" fontSize="9" fontFamily="JetBrains Mono">
            OBSERVE → REMEMBER → RE-OBSERVE → MATCH
          </text>

          <g transform="translate(20, 52)">
            <rect x="0" y="0" width="60" height="24" rx="2" fill="#0B0D0F" stroke="#35383A" />
            <text x="30" y="15" textAnchor="middle" fill="#A7A6A1" fontSize="8" fontFamily="JetBrains Mono">OBSERVE</text>

            <line x1="60" y1="12" x2="80" y2="12" stroke="#B89562" strokeWidth="1.5" />

            <rect x="80" y="0" width="70" height="24" rx="2" fill="#0B0D0F" stroke="#B89562" />
            <text x="115" y="15" textAnchor="middle" fill="#B89562" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">REMEMBER</text>

            <line x1="150" y1="12" x2="170" y2="12" stroke="#B89562" strokeWidth="1.5" />

            <rect x="170" y="0" width="80" height="24" rx="2" fill="#0B0D0F" stroke="#35383A" />
            <text x="210" y="15" textAnchor="middle" fill="#A7A6A1" fontSize="8" fontFamily="JetBrains Mono">RE-OBSERVE</text>

            <line x1="250" y1="12" x2="270" y2="12" stroke="#78947F" strokeWidth="1.5" />
          </g>

          <text x="20" y="100" fill="#E8E6E1" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
            MEMORY ASSETS:
          </text>
          <text x="20" y="116" fill="#747570" fontSize="8" fontFamily="JetBrains Mono">
            • ROAD DNA  • ROADMEMORY  • VEHICLE DNA  • PAST FIRE DRILL HISTORY
          </text>

          <text x="160" y="148" textAnchor="middle" fill="#A7A6A1" fontSize="9" fontFamily="Inter, sans-serif">
            "Observations are persisted so repeated patterns anchor future state."
          </text>
        </g>
      )}

      {/* STAGE 04: CROSS-CHECK — Multi-Evidence Verification */}
      {activeStage === 'CROSS_CHECK' && (
        <g transform="translate(320, 200)">
          <rect width="360" height="175" rx="4" fill="#151719" stroke="#78947F" strokeWidth="1.5" />
          <text x="180" y="24" textAnchor="middle" fill="#E8E6E1" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
            MULTI-EVIDENCE CONVERGENCE & CROSS-CHECK
          </text>

          {/* Converging Stream Nodes */}
          <g transform="translate(15, 40)">
            <rect width="80" height="22" rx="2" fill="#0B0D0F" stroke="#78947F" />
            <text x="40" y="14" textAnchor="middle" fill="#78947F" fontSize="8" fontFamily="JetBrains Mono">SOFT-GNSS</text>

            <rect x="90" width="80" height="22" rx="2" fill="#0B0D0F" stroke="#71869A" />
            <text x="130" y="14" textAnchor="middle" fill="#71869A" fontSize="8" fontFamily="JetBrains Mono">AI SPEED</text>

            <rect x="180" width="75" height="22" rx="2" fill="#0B0D0F" stroke="#B89562" />
            <text x="217" y="14" textAnchor="middle" fill="#B89562" fontSize="8" fontFamily="JetBrains Mono">ROADSENSE</text>

            <rect x="260" width="70" height="22" rx="2" fill="#0B0D0F" stroke="#8EA4B8" />
            <text x="295" y="14" textAnchor="middle" fill="#8EA4B8" fontSize="8" fontFamily="JetBrains Mono">TOPOLOCK</text>
          </g>

          {/* Converging Lines */}
          <path d="M 55 62 L 180 90 M 135 62 L 180 90 M 217 62 L 180 90 M 295 62 L 180 90" stroke="#78947F" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Central Consistency Filter */}
          <rect x="100" y="90" width="160" height="32" rx="2" fill="#0B0D0F" stroke="#78947F" strokeWidth="1.5" />
          <text x="180" y="105" textAnchor="middle" fill="#78947F" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
            TRUST & CONSISTENCY FILTER
          </text>
          <text x="180" y="117" textAnchor="middle" fill="#A7A6A1" fontSize="8" fontFamily="JetBrains Mono">
            VERIFY KINEMATICS & UNCERTAINTY
          </text>

          <text x="180" y="160" textAnchor="middle" fill="#A7A6A1" fontSize="9" fontFamily="Inter, sans-serif">
            "Evidence is cross-checked before it influences navigation state."
          </text>
        </g>
      )}

      {/* STAGE 05: NAVIGATE — Continuous State Fusion */}
      {activeStage === 'NAVIGATE' && (
        <g transform="translate(340, 205)">
          <rect width="320" height="165" rx="4" fill="#151719" stroke="#B89562" strokeWidth="1" strokeOpacity="0.8" />
          <text x="160" y="22" textAnchor="middle" fill="#E8E6E1" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
            CONTINUOUS NAVIGATION STATE ESTIMATE
          </text>

          <g transform="translate(20, 38)">
            {/* Position State */}
            <text x="0" y="12" fill="#A7A6A1" fontSize="8" fontFamily="JetBrains Mono">POSITION</text>
            <rect x="90" y="4" width="190" height="8" rx="1" fill="#0B0D0F" stroke="#35383A" />
            <rect x="91" y="5" width="160" height="6" rx="1" fill="#B89562" />

            {/* Velocity State */}
            <text x="0" y="28" fill="#A7A6A1" fontSize="8" fontFamily="JetBrains Mono">VELOCITY</text>
            <rect x="90" y="20" width="190" height="8" rx="1" fill="#0B0D0F" stroke="#35383A" />
            <rect x="91" y="21" width="140" height="6" rx="1" fill="#71869A" />

            {/* Orientation State */}
            <text x="0" y="44" fill="#A7A6A1" fontSize="8" fontFamily="JetBrains Mono">ORIENTATION</text>
            <rect x="90" y="36" width="190" height="8" rx="1" fill="#0B0D0F" stroke="#35383A" />
            <rect x="91" y="37" width="170" height="6" rx="1" fill="#8EA4B8" />

            {/* Bias Estimate */}
            <text x="0" y="60" fill="#A7A6A1" fontSize="8" fontFamily="JetBrains Mono">SENSOR BIAS</text>
            <rect x="90" y="52" width="190" height="8" rx="1" fill="#0B0D0F" stroke="#35383A" />
            <rect x="91" y="53" width="80" height="6" rx="1" fill="#78947F" />

            {/* Qualitative Uncertainty */}
            <text x="0" y="78" fill="#A7A6A1" fontSize="8" fontFamily="JetBrains Mono">UNCERTAINTY</text>
            <rect x="90" y="70" width="190" height="14" rx="2" fill="#0B0D0F" stroke="#78947F" />
            <text x="185" y="81" textAnchor="middle" fill="#78947F" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">
              QUALITATIVE STATE: LOW / BOUNDED
            </text>
          </g>

          <text x="160" y="152" textAnchor="middle" fill="#A7A6A1" fontSize="9" fontFamily="Inter, sans-serif">
            "Fused navigation output preserves continuity without single point of failure."
          </text>
        </g>
      )}

      {/* STAGE 06: REHEARSE — FireDrill Shadow Engine */}
      {activeStage === 'REHEARSE' && (
        <g transform="translate(330, 205)">
          <rect width="340" height="160" rx="4" fill="#151719" stroke="#9B625E" strokeWidth="1" strokeOpacity="0.8" />
          <text x="170" y="24" textAnchor="middle" fill="#E8E6E1" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
            FIRE DRILL SHADOW NAVIGATION REHEARSAL
          </text>

          <g transform="translate(20, 42)">
            {/* Real Path */}
            <text x="0" y="14" fill="#78947F" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">REAL PATH</text>
            <line x1="110" y1="10" x2="300" y2="10" stroke="#78947F" strokeWidth="2" />

            {/* Shadow Path */}
            <text x="0" y="36" fill="#9B625E" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">FIRE DRILL</text>
            <line x1="110" y1="32" x2="300" y2="32" stroke="#9B625E" strokeWidth="2" strokeDasharray="5 3" />
            <text x="205" y="44" textAnchor="middle" fill="#9B625E" fontSize="7" fontFamily="JetBrains Mono">(GNSS DEPRIVED SHADOW RUN)</text>

            {/* Self-Evaluation Metrics */}
            <rect x="0" y="55" width="300" height="32" rx="2" fill="#0B0D0F" stroke="#35383A" />
            <text x="150" y="68" textAnchor="middle" fill="#E8E6E1" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">
              SELF-EVALUATION: HEADING • SPEED • POSITION CONSISTENCY
            </text>
            <text x="150" y="80" textAnchor="middle" fill="#747570" fontSize="7" fontFamily="JetBrains Mono">
              Evaluates blackout readiness without altering live navigation
            </text>
          </g>

          <text x="170" y="148" textAnchor="middle" fill="#A7A6A1" fontSize="9" fontFamily="Inter, sans-serif">
            "FireDrill measures reliability and identifies weaknesses before failure."
          </text>
        </g>
      )}

      {/* STAGE 07: LEARN AGAIN — Adaptive Feedback Loop */}
      {activeStage === 'LEARN_AGAIN' && (
        <g transform="translate(330, 205)">
          <rect width="340" height="160" rx="4" fill="#151719" stroke="#B89562" strokeWidth="1.5" />
          <text x="170" y="24" textAnchor="middle" fill="#E8E6E1" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
            ADAPTIVE FEEDBACK & TRUST UPDATE
          </text>
          <text x="170" y="38" textAnchor="middle" fill="#B89562" fontSize="9" fontFamily="JetBrains Mono">
            REHEARSE → OBSERVE PERFORMANCE → UPDATE TRUST → LEARN AGAIN
          </text>

          <g transform="translate(20, 52)">
            <rect width="85" height="30" rx="2" fill="#0B0D0F" stroke="#35383A" />
            <text x="42" y="18" textAnchor="middle" fill="#A7A6A1" fontSize="8" fontFamily="JetBrains Mono">OBSERVE</text>

            <line x1="85" y1="15" x2="105" y2="15" stroke="#B89562" strokeWidth="1.5" />

            <rect x="105" width="90" height="30" rx="2" fill="#0B0D0F" stroke="#B89562" />
            <text x="150" y="18" textAnchor="middle" fill="#B89562" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">UPDATE TRUST</text>

            <line x1="195" y1="15" x2="215" y2="15" stroke="#78947F" strokeWidth="1.5" />

            <rect x="215" width="85" height="30" rx="2" fill="#0B0D0F" stroke="#78947F" />
            <text x="257" y="18" textAnchor="middle" fill="#78947F" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">LEARN AGAIN</text>
          </g>

          <text x="170" y="112" fill="#747570" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">
            • UPDATE EXPECTATIONS  • UPDATE CONFIDENCE  • UPDATE MEMORY  • ADAPT FUTURE TRUST
          </text>

          <text x="170" y="148" textAnchor="middle" fill="#A7A6A1" fontSize="9" fontFamily="Inter, sans-serif">
            "Past observations update memory, expectations, and future trust."
          </text>
        </g>
      )}

      {/* ========================================================================= */}
      {/* 7 STAGE INTERACTIVE NODES & SELECTION HALOS (Accessible SVG Buttons) */}
      {/* ========================================================================= */}
      {STAGE_ORDER.map((stageId) => {
        const { x, y, label, num } = STAGE_POSITIONS[stageId];
        const relation = getStageRelation(stageId);
        const isSelected = relation === 'active';
        const isConnected = relation === 'connected';

        return (
          <g
            key={stageId}
            onClick={() => onSelectStage(stageId)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectStage(stageId);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Stage ${num}: ${label}${isSelected ? ' (Selected)' : ''}`}
            aria-pressed={isSelected}
            className="cursor-pointer group focus:outline-none"
          >
            {/* Outer Selection Halo Ring */}
            <circle
              cx={x}
              cy={y}
              r="34"
              fill={isSelected ? '#1E2124' : '#151719'}
              stroke={isSelected ? '#B89562' : isConnected ? '#71869A' : '#35383A'}
              strokeWidth={isSelected ? '2.5' : '1.5'}
              className="transition-all duration-200"
            />

            {/* Rotating / Pulsing Focus Outer Ring */}
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

            {/* Stage Number Badge */}
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

