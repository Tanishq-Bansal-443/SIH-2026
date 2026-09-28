import type { ChapterDefinition } from '../types/experience';

export const CHAPTERS: ChapterDefinition[] = [
  {
    id: '01',
    number: '01',
    label: 'MISSION',
    title: 'Mission: The GNSS-Denied Navigation Problem',
    shortDescription: 'Explore why modern navigation cannot rely on satellite signals alone when entering degraded environments.',
    primaryQuestion: 'Why does TrueNorth need to exist?',
    dominantIdea: 'GNSS is a useful input, but satellite availability can degrade or disappear entirely.',
    technicalTakeaway: 'GNSS is an input measurement, not an absolute ground truth authority.',
    sceneType: 'mission'
  },
  {
    id: '02',
    number: '02',
    label: 'FAILURE',
    title: 'Failure Modes: Satellite Outage & Inertial Drift',
    shortDescription: 'Examine how conventional inertial dead reckoning rapidly accumulates unbounded position uncertainty.',
    primaryQuestion: 'What happens when GNSS becomes unreliable?',
    dominantIdea: 'Unassisted double integration of IMU sensor noise produces rapid exponential drift.',
    technicalTakeaway: 'The navigation challenge is knowing how much to trust each sensor at every instant.',
    sceneType: 'failure'
  },
  {
    id: '03',
    number: '03',
    label: 'CORE',
    title: 'TrueNorth Core Reasoning Architecture',
    shortDescription: 'The 6-stage adaptive cycle: SENSE → LEARN → REMEMBER → CROSS-CHECK → NAVIGATE → REHEARSE → LEARN AGAIN.',
    primaryQuestion: 'How does TrueNorth reason differently?',
    dominantIdea: 'TrueNorth operates as a continuous evidence loop rather than a single black-box ML model.',
    technicalTakeaway: 'TrueNorth builds navigation confidence by continuously cross-checking multiple evidence streams.',
    sceneType: 'core'
  },
  {
    id: '04',
    number: '04',
    label: 'ROAD',
    title: 'Road Intelligence: RoadSense, Memory & VehicleDNA',
    shortDescription: 'Discover how physical road features leave unique, repeatable inertial signatures in vehicle sensors.',
    primaryQuestion: 'How does the road become a source of information?',
    dominantIdea: 'Curves, impulses, and surface transitions act as spatial landmarks and motion constraints.',
    technicalTakeaway: 'The road leaves repeatable signatures that create localized positioning constraints.',
    sceneType: 'road'
  },
  {
    id: '05',
    number: '05',
    label: 'FUSION',
    title: 'Trust & Fusion: SoftGNSS & TopoLock',
    shortDescription: 'Learn how TrustFusion dynamically weights evidence and TopoLock enforces kinematic road geometry.',
    primaryQuestion: 'How does the system decide what to trust?',
    dominantIdea: 'SoftGNSS replaces binary available/unavailable states with continuous trust weighting.',
    technicalTakeaway: 'No single source gets absolute authority; dynamic trust weights guide fusion state updates.',
    sceneType: 'fusion'
  },
  {
    id: '06',
    number: '06',
    label: 'CoNAV',
    title: 'Cooperative Navigation (CoNav)',
    shortDescription: 'Examine peer-to-peer navigation witness packets with topology and freshness validation.',
    primaryQuestion: 'How can nearby vehicles become additional evidence?',
    dominantIdea: 'Nearby vehicles with healthy GNSS serve as confidence-weighted spatial witnesses.',
    technicalTakeaway: 'CoNav is confidence-weighted peer evidence, validated against road topology and kinematics.',
    sceneType: 'conav'
  },
  {
    id: '07',
    number: '07',
    label: 'FIRE DRILL',
    title: 'FireDrill: Blackout Rehearsal & Readiness',
    shortDescription: 'Shadow navigation engine running blackout simulations to evaluate system readiness before actual failure.',
    primaryQuestion: 'How does TrueNorth test its own readiness?',
    dominantIdea: 'FireDrill isolates shadow navigation to evaluate drift tendency without altering live positioning.',
    technicalTakeaway: 'FireDrill measures navigation reliability and identifies weaknesses before GNSS disappears.',
    sceneType: 'firedrill'
  },
  {
    id: '08',
    number: '08',
    label: 'SYSTEM',
    title: 'Complete System Architecture',
    shortDescription: 'Synthesize the complete TrueNorth IDR framework from raw sensor signals to adaptive fusion output.',
    primaryQuestion: 'How does everything fit together?',
    dominantIdea: 'TrueNorth does not wait for one perfect sensor; it constructs navigation decisions from evidence.',
    technicalTakeaway: 'TrueNorth is an Intelligent Dead Reckoning framework designed for GNSS-degraded reliability.',
    sceneType: 'system'
  }
];

export const getChapterById = (id: string): ChapterDefinition => {
  return CHAPTERS.find((c) => c.id === id) || CHAPTERS[0];
};
