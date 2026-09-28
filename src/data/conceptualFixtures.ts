import type { EvidenceSourceNode, PeerVehicleObservation, RoadEventObservation } from '../types/experience';

/* Deterministic Conceptual Fixtures — Non-telemetry, labeled illustrative */

export const CONCEPTUAL_ROAD_EVENTS: RoadEventObservation[] = [
  {
    id: 're-01',
    type: 'curve',
    label: '90° Sharp Right Bend',
    confidenceQualitative: 'HIGH',
    imupattern: 'Yaw rate impulse + lateral accel shift',
    matchedMemoryId: 'mem-bend-442',
    locationKm: 1.2
  },
  {
    id: 're-02',
    type: 'impulse',
    label: 'Speed Breaker / Impulse Event',
    confidenceQualitative: 'HIGH',
    imupattern: 'Z-axis vertical accel pulse pair',
    matchedMemoryId: 'mem-bump-109',
    locationKm: 2.8
  },
  {
    id: 're-03',
    type: 'intersection',
    label: '4-Way Signal Stop',
    confidenceQualitative: 'MEDIUM',
    imupattern: 'Zero Velocity Update (ZUPT) match',
    locationKm: 4.1
  },
  {
    id: 're-04',
    type: 'roughness',
    label: 'Cobblestone / Rough Segment',
    confidenceQualitative: 'HIGH',
    imupattern: 'High-frequency pitch/roll energy density',
    matchedMemoryId: 'mem-rough-88',
    locationKm: 5.6
  }
];

export const CONCEPTUAL_PEERS: PeerVehicleObservation[] = [
  {
    id: 'peer-alpha',
    callsign: 'VEHICLE-ALPHA',
    roadSegment: 'NH-44 / Chainage 14.2km',
    gnssTrust: 'HEALTHY',
    topologyMatch: true,
    validationState: 'VALIDATED',
    hops: 1
  },
  {
    id: 'peer-bravo',
    callsign: 'VEHICLE-BRAVO',
    roadSegment: 'NH-44 / Chainage 14.8km',
    gnssTrust: 'DEGRADED',
    topologyMatch: true,
    validationState: 'VALIDATED',
    hops: 2
  },
  {
    id: 'peer-charlie',
    callsign: 'VEHICLE-CHARLIE',
    roadSegment: 'Flyover Overpass (Elevation mismatch)',
    gnssTrust: 'HEALTHY',
    topologyMatch: false,
    validationState: 'REJECTED',
    validationReason: 'Road Topology / Vertical Mismatch',
    hops: 1
  }
];

export const CONCEPTUAL_EVIDENCE_NODES: EvidenceSourceNode[] = [
  {
    id: 'node-gnss',
    name: 'SoftGNSS',
    type: 'gnss',
    trustLevel: 0.85,
    status: 'active',
    description: 'Continuously weighted positioning trust based on satellite geometry and C/N0'
  },
  {
    id: 'node-imu',
    name: 'IMU / Kinematics',
    type: 'imu',
    trustLevel: 0.95,
    status: 'active',
    description: 'Triple-axis accelerometer and gyroscope angular rate integration'
  },
  {
    id: 'node-speed',
    name: 'AI Speed Estimator',
    type: 'speed',
    trustLevel: 0.90,
    status: 'active',
    description: 'Learned forward motion velocity from smartphone vibration and wheel-spin harmonics'
  },
  {
    id: 'node-road',
    name: 'RoadSense',
    type: 'road',
    trustLevel: 0.80,
    status: 'active',
    description: 'IMU impulse matching against physical road landmark signatures'
  },
  {
    id: 'node-memory',
    name: 'RoadMemory',
    type: 'memory',
    trustLevel: 0.88,
    status: 'active',
    description: 'Persisted high-confidence landmark constraints re-observed spatially'
  },
  {
    id: 'node-topology',
    name: 'TopoLock',
    type: 'topology',
    trustLevel: 0.98,
    status: 'active',
    description: 'Map graph topology and Non-Holonomic Constraint (NHC) candidate filter'
  },
  {
    id: 'node-peer',
    name: 'CoNav Peer Evidence',
    type: 'peer',
    trustLevel: 0.75,
    status: 'active',
    description: 'Confidence-weighted witness evidence received from nearby vehicles'
  },
  {
    id: 'node-firedrill',
    name: 'FireDrill Shadow Engine',
    type: 'firedrill',
    trustLevel: 1.0,
    status: 'standby',
    description: 'Parallel evaluation subsystem testing blackout readiness without controlling navigation'
  }
];
