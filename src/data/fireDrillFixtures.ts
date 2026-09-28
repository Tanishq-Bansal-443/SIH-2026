import type { FireDrillDiagnostic } from '../types/experience';

/* Deterministic Conceptual Fixtures for Chapter 07 — FireDrill */
export const FIREDRILL_DIAGNOSTICS: FireDrillDiagnostic[] = [
  {
    id: 'diag-motion',
    subsystem: 'Inertial & Speed Estimation',
    category: 'MOTION ESTIMATION',
    state: 'STABLE',
    role: 'Inertial propagation & learned AI speed',
    observation: 'Accelerometer and forward speed estimator maintained steady velocity tracking.',
    implication: 'Inertial drift remained within bounded kinematic thresholds during simulated outage.'
  },
  {
    id: 'diag-road',
    subsystem: 'RoadSense Extraction',
    category: 'ROAD EVIDENCE',
    state: 'SUPPORTING',
    role: 'Physical landmark impulse extraction',
    observation: 'Road curves and impulse features provided discrete spatial corrections.',
    implication: 'Probabilistic landmark events constrained lateral position uncertainty.'
  },
  {
    id: 'diag-memory',
    subsystem: 'RoadMemory Matcher',
    category: 'ROAD MEMORY',
    state: 'REVIEW',
    isWeakness: true,
    role: 'Persisted landmark spatial constraint',
    observation: 'Re-observation consistency on NH-44 segment 3 was insufficient due to low match confidence.',
    implication: 'Future shadow navigation may require stronger independent evidence or updated memory trust weights.'
  },
  {
    id: 'diag-topology',
    subsystem: 'TopoLock Kinematic Filter',
    category: 'TOPOLOGY',
    state: 'CONSISTENT',
    role: 'Road network geometry & NHC candidate filter',
    observation: 'Road graph topology rejected off-road and impossible turn candidate trajectories.',
    implication: 'Shadow path stayed locked to valid road network geometry.'
  },
  {
    id: 'diag-peer',
    subsystem: 'CoNav Peer Witness',
    category: 'PEER EVIDENCE',
    state: 'SUPPORTING',
    role: 'Confidence-weighted witness evidence',
    observation: 'Peer witness packets from VEHICLE-ALPHA provided additional spatial validation.',
    implication: 'Peer evidence reduced shadow path drift variance.'
  },
  {
    id: 'diag-gnss-dep',
    subsystem: 'GNSS Outage Sensitivity',
    category: 'GNSS DEPENDENCY',
    state: 'REVIEW',
    isWeakness: true,
    role: 'System sensitivity during prolonged outage',
    observation: 'Shadow navigation reliance on high-rate satellite fixes was highlighted in steep curves.',
    implication: 'Identified system area requiring higher weighting on adaptive IMU harmonics.'
  }
];

export const FIREDRILL_SUMMARY = {
  readinessState: 'STABLE SHADOW NAVIGATION — REVIEW REQUIRED',
  qualitativeCondition: 'QUALITATIVE / CONCEPTUAL REHEARSAL COMPLETE',
  weaknessSubsystem: 'RoadMemory Matcher & GNSS Outage Sensitivity',
  recommendedAction: 'UPDATE EXPECTATIONS & RE-WEIGHT MEMORY TRUST'
};
