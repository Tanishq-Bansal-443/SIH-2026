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

export type FireDrillStage = 'IDLE' | 'ARMED' | 'RUNNING' | 'EVALUATING' | 'COMPLETE' | 'REVIEW';

export type DiagnosticSubsystemState = 'STABLE' | 'SUPPORTING' | 'MATCHED' | 'CONSISTENT' | 'DEGRADED' | 'REVIEW' | 'INSUFFICIENT';

export interface FireDrillDiagnostic {
  id: string;
  subsystem: string;
  category: 'MOTION ESTIMATION' | 'ROAD EVIDENCE' | 'ROAD MEMORY' | 'TOPOLOGY' | 'PEER EVIDENCE' | 'GNSS DEPENDENCY';
  state: DiagnosticSubsystemState;
  role: string;
  observation: string;
  implication: string;
  isWeakness?: boolean;
}

export type SystemLoopStageId = 'SENSE' | 'LEARN' | 'REMEMBER' | 'CROSS-CHECK' | 'NAVIGATE' | 'REHEARSE' | 'LEARN AGAIN';

export interface SystemArchitectureNode {
  id: SystemLoopStageId;
  label: string;
  stageNumber: string;
  inputs: string[];
  outputs: string[];
  subsystems: string[];
  role: string;
  description: string;
  connectedNodes: SystemLoopStageId[];
}

export interface ComponentTraceDefinition {
  id: string;
  name: string;
  component: string;
  description: string;
  pathStages: SystemLoopStageId[];
}


