/* TypeScript Type Definitions for TrueNorth Experience State & Data Models */

export type ChapterId = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08';

export type GNSSQualityState = 'healthy' | 'degrading' | 'unreliable' | 'unavailable';

export type EvidenceType = 
  | 'gnss'
  | 'imu'
  | 'speed'
  | 'road'
  | 'memory'
  | 'topology'
  | 'peer'
  | 'firedrill'
  | null;

export interface ChapterDefinition {
  id: ChapterId;
  number: string; // e.g. '01'
  label: string; // e.g. 'MISSION'
  title: string; // e.g. 'Mission: GNSS-Denied Navigation'
  shortDescription: string;
  primaryQuestion: string;
  dominantIdea: string;
  technicalTakeaway: string;
  sceneType: 'mission' | 'failure' | 'core' | 'road' | 'fusion' | 'conav' | 'firedrill' | 'system';
}

export interface ExperienceState {
  currentChapter: ChapterId;
  gnssState: GNSSQualityState;
  activeEvidence: EvidenceType;
  selectedRoadEventId: string | null;
  selectedPeerId: string | null;
  firedrillActive: boolean;
  reducedMotion: boolean;
  inspectingNodeId: string | null;
}

/* Domain Fixture Types for Visual Instrumentation */
export interface RoadEventObservation {
  id: string;
  type: 'curve' | 'intersection' | 'stop' | 'impulse' | 'roughness';
  label: string;
  confidenceQualitative: 'HIGH' | 'MEDIUM' | 'LOW';
  imupattern: string;
  matchedMemoryId?: string;
  locationKm: number;
}

export interface PeerVehicleObservation {
  id: string;
  callsign: string;
  roadSegment: string;
  gnssTrust: 'HEALTHY' | 'DEGRADED' | 'UNAVAILABLE';
  topologyMatch: boolean;
  validationState: 'VALIDATED' | 'REJECTED' | 'PENDING';
  validationReason?: string;
  hops: number;
}

export interface EvidenceSourceNode {
  id: string;
  name: string;
  type: EvidenceType;
  trustLevel: number; // 0.0 to 1.0 (illustrative weight)
  status: 'active' | 'degraded' | 'rejected' | 'standby';
  description: string;
}
