import React from 'react';
import { useExperience } from '../../state/ExperienceContext';
import { ChapterHeader } from './ChapterHeader';
import { ChapterNavigator } from '../navigation/ChapterNavigator';
import { TechnicalPanel } from './TechnicalPanel';
import { SceneCanvas } from '../scene/SceneCanvas';
import { ContextPanel } from '../primitives/ContextPanel';
import { CONCEPTUAL_EVIDENCE_NODES, CONCEPTUAL_PEERS, CONCEPTUAL_ROAD_EVENTS } from '../../data/conceptualFixtures';
import { MetadataRow } from '../primitives/MetadataRow';
import { ActionButton } from '../primitives/ActionButton';

export const ExperienceShell: React.FC = () => {
  const {
    selectedRoadEventId,
    setSelectedRoadEventId,
    selectedPeerId,
    setSelectedPeerId,
    inspectingNodeId,
    setInspectingNodeId,
  } = useExperience();

  // Find active inspection object if any
  const selectedEvent = CONCEPTUAL_ROAD_EVENTS.find((e) => e.id === selectedRoadEventId);
  const selectedPeer = CONCEPTUAL_PEERS.find((p) => p.id === selectedPeerId);
  const selectedNode = CONCEPTUAL_EVIDENCE_NODES.find((n) => n.id === inspectingNodeId);

  const isDrawerOpen = Boolean(selectedEvent || selectedPeer || selectedNode);

  const handleCloseDrawer = () => {
    setSelectedRoadEventId(null);
    setSelectedPeerId(null);
    setInspectingNodeId(null);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#0B0D0F] text-[#E8E6E1] overflow-hidden select-none">
      {/* Global Chapter Header */}
      <ChapterHeader />

      {/* Main Workspace Layout (Desktop: Row / Mobile: Column) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Chapter Rail Navigator (Desktop) */}
        <ChapterNavigator />

        {/* Central Cartographic Visual Scene Canvas */}
        <SceneCanvas />

        {/* Right Technical Explanation Panel */}
        <TechnicalPanel />
      </div>

      {/* Inspection Context Drawer / Slide-Out Panel */}
      <ContextPanel
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title={
          selectedEvent
            ? `ROAD EVENT: ${selectedEvent.label}`
            : selectedPeer
            ? `PEER VEHICLE: ${selectedPeer.callsign}`
            : selectedNode
            ? `EVIDENCE NODE: ${selectedNode.name}`
            : 'INSPECTION'
        }
        subtitle="DETAILED TECHNICAL REASONING"
      >
        {selectedEvent && (
          <div className="space-y-3 font-mono text-xs">
            <MetadataRow label="EVENT TYPE" value={selectedEvent.type.toUpperCase()} />
            <MetadataRow label="CONFIDENCE" value={selectedEvent.confidenceQualitative} status="validated" />
            <MetadataRow label="IMU SIGNATURE" value={selectedEvent.imupattern} />
            {selectedEvent.matchedMemoryId && (
              <MetadataRow label="ROADMEMORY MATCH" value={selectedEvent.matchedMemoryId} status="brass" />
            )}
            <p className="font-sans text-xs text-[#A7A6A1] pt-2 border-t border-[#35383A]">
              RoadSense extracts physical motion impulses from accelerometer/gyroscope signals without assuming fixed GPS availability.
            </p>
          </div>
        )}

        {selectedPeer && (
          <div className="space-y-3 font-mono text-xs">
            <MetadataRow label="CALLSIGN" value={selectedPeer.callsign} />
            <MetadataRow label="SEGMENT" value={selectedPeer.roadSegment} />
            <MetadataRow label="GNSS TRUST" value={selectedPeer.gnssTrust} status={selectedPeer.gnssTrust === 'HEALTHY' ? 'validated' : 'warning'} />
            <MetadataRow label="VALIDATION" value={selectedPeer.validationState} status={selectedPeer.validationState === 'VALIDATED' ? 'validated' : 'rejected'} />
            {selectedPeer.validationReason && (
              <MetadataRow label="REASON" value={selectedPeer.validationReason} status="rejected" />
            )}
            <p className="font-sans text-xs text-[#A7A6A1] pt-2 border-t border-[#35383A]">
              CoNav treats nearby vehicles as confidence-weighted witnesses. Validation rejects topological and freshness mismatches.
            </p>
          </div>
        )}

        {selectedNode && (
          <div className="space-y-3 font-mono text-xs">
            <MetadataRow label="NODE NAME" value={selectedNode.name} />
            <MetadataRow label="EVIDENCE TYPE" value={selectedNode.type?.toUpperCase() || 'GENERAL'} />
            <MetadataRow label="STATUS" value={selectedNode.status.toUpperCase()} status="validated" />
            <div className="pt-2 border-t border-[#35383A]">
              <span className="tn-tech-label block mb-1">MECHANISM DESCRIPTION</span>
              <p className="font-sans text-xs text-[#A7A6A1] leading-relaxed">
                {selectedNode.description}
              </p>
            </div>
          </div>
        )}

        <div className="pt-3 mt-3 border-t border-[#35383A] flex justify-end">
          <ActionButton action="CLOSE INSPECTION" onClick={handleCloseDrawer} />
        </div>
      </ContextPanel>
    </div>
  );
};
