import type { SystemArchitectureNode, ComponentTraceDefinition } from '../types/experience';

/* Deterministic Conceptual Fixtures for Chapter 08 — System Architecture Synthesis */

export const SYSTEM_NODES: SystemArchitectureNode[] = [
  {
    id: 'SENSE',
    label: 'SENSE',
    stageNumber: '01',
    inputs: ['IMU Accelerometer', 'IMU Gyroscope', 'Magnetometer', 'GNSS Signal', 'Optional Ext-IMU'],
    outputs: ['Raw Sensor Streams', 'Measurement Timestamps', 'GNSS C/N0 Metrics'],
    subsystems: ['SoftGNSS Receiver', 'Triple-axis IMU Sampler', 'Compass Gating'],
    role: 'Capture heterogeneous motion and positioning evidence from physical sensors.',
    description: 'Continuously samples accelerometer, gyroscope, magnetometer, and satellite signals without treating satellite availability as absolute ground truth.',
    connectedNodes: ['LEARN', 'CROSS-CHECK']
  },
  {
    id: 'LEARN',
    label: 'LEARN',
    stageNumber: '02',
    inputs: ['Raw Sensor Streams', 'IMU Waveforms'],
    outputs: ['Forward Speed Estimate', 'Motion State', 'RoadSense Impulses', 'VehicleDNA Profile'],
    subsystems: ['AI Speed Estimator', 'RoadSense Waveform Matcher', 'VehicleDNA Profiler'],
    role: 'Extract interpretable motion features and physical road evidence from raw dynamics.',
    description: 'Learns forward speed from vehicle vibration and identifies physical road curves, stops, and impulse signatures.',
    connectedNodes: ['REMEMBER', 'CROSS-CHECK']
  },
  {
    id: 'REMEMBER',
    label: 'REMEMBER',
    stageNumber: '03',
    inputs: ['RoadSense Impulses', 'Vehicle Response Profile', 'FireDrill Rehearsal History'],
    outputs: ['RoadMemory Anchors', 'Road DNA Signatures', 'Vehicle Response Expectations'],
    subsystems: ['RoadMemory Persistent Store', 'Spatial Anchor Matcher'],
    role: 'Preserve high-confidence road features and vehicle profiles across observations.',
    description: 'Stores re-observed curves, stops, and roughness features as persistent spatial localization constraints.',
    connectedNodes: ['CROSS-CHECK']
  },
  {
    id: 'CROSS-CHECK',
    label: 'CROSS-CHECK',
    stageNumber: '04',
    inputs: ['SoftGNSS Weight', 'AI Speed', 'RoadMemory', 'TopoLock Graph', 'CoNav Peer Packets'],
    outputs: ['Dynamic Trust Weights', 'Validated Peer Evidence', 'Rejected Trajectories'],
    subsystems: ['SoftGNSS Weighting', 'TrustFusion Engine', 'TopoLock NHC Filter', 'CoNav Witness Jury'],
    role: 'Determine dynamic evidence trust and reject topologically impossible trajectories.',
    description: 'Evaluates every evidence source against trust, consistency, uncertainty, and kinematic road topology.',
    connectedNodes: ['NAVIGATE']
  },
  {
    id: 'NAVIGATE',
    label: 'NAVIGATE',
    stageNumber: '05',
    inputs: ['Trust-Weighted Evidence Streams', 'TopoLock Trajectory Constraints'],
    outputs: ['Position', 'Velocity', 'Heading', 'Sensor Bias', 'Uncertainty Bound'],
    subsystems: ['Adaptive Fusion EKF', 'Navigation State Estimator'],
    role: 'Maintain the continuous fused navigation state.',
    description: 'Produces uninterrupted position, velocity, and orientation estimates across GNSS degradation.',
    connectedNodes: ['REHEARSE']
  },
  {
    id: 'REHEARSE',
    label: 'REHEARSE',
    stageNumber: '06',
    inputs: ['Navigation State', 'Live Reference GNSS'],
    outputs: ['FireDrill Shadow Path', 'Reference Comparison', 'Diagnostic Insights'],
    subsystems: ['FireDrill Shadow Engine', 'Blackout Rehearsal Simulator'],
    role: 'Test GNSS-denied navigation behavior before real outages occur.',
    description: 'Runs shadow navigation with GNSS withheld to measure system drift tendency and discover weaknesses.',
    connectedNodes: ['LEARN AGAIN']
  },
  {
    id: 'LEARN AGAIN',
    label: 'LEARN AGAIN',
    stageNumber: '07',
    inputs: ['FireDrill Diagnostics', 'Rehearsal Weakness Reports'],
    outputs: ['Updated System Memory', 'Updated Trust Expectations', 'Weakness Warnings'],
    subsystems: ['Memory Trust Updater', 'Expectation Adjuster'],
    role: 'Feed rehearsal observations back into future expectations and memory trust.',
    description: 'Closes the adaptive reasoning loop by updating system memory and expected evidence trust weights.',
    connectedNodes: ['SENSE']
  }
];

export const COMPONENT_TRACES: ComponentTraceDefinition[] = [
  {
    id: 'trace-roadsense',
    name: 'RoadSense + RoadMemory',
    component: 'Road Intelligence',
    description: 'Physical road impulses → RoadSense extraction → RoadMemory spatial constraint → TrustFusion → Navigation',
    pathStages: ['SENSE', 'LEARN', 'REMEMBER', 'CROSS-CHECK', 'NAVIGATE']
  },
  {
    id: 'trace-softgnss',
    name: 'SoftGNSS Trust Weighting',
    component: 'SoftGNSS',
    description: 'Satellite signal → Quality weighting → TrustFusion dynamic authority → Navigation state',
    pathStages: ['SENSE', 'CROSS-CHECK', 'NAVIGATE']
  },
  {
    id: 'trace-conav',
    name: 'CoNav Peer Evidence',
    component: 'Cooperative Navigation',
    description: 'V2X peer witness packet → Topology validation → TrustFusion weight → Navigation state',
    pathStages: ['SENSE', 'CROSS-CHECK', 'NAVIGATE']
  },
  {
    id: 'trace-firedrill',
    name: 'FireDrill Rehearsal Loop',
    component: 'FireDrill',
    description: 'Navigation state → FireDrill shadow blackout → Subsystem diagnostics → Learn Again memory update',
    pathStages: ['NAVIGATE', 'REHEARSE', 'LEARN AGAIN', 'SENSE']
  }
];
