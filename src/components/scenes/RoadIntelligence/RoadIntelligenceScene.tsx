import React, { useState, useCallback } from 'react';
import { useExperience } from '../../../state/ExperienceContext';
import { RoadSceneCanvas, CHAPTER4_ROAD_EVENTS } from './RoadSceneCanvas';
import { RoadControls } from './RoadControls';
import { getChapterById } from '../../../data/chapters';

export const RoadIntelligenceScene: React.FC = () => {
  const { reducedMotion, setSelectedRoadEventId, setInspectingNodeId, setActiveEvidence } = useExperience();

  const [selectedEventId, setSelectedEventId] = useState<string>('re-01');
  const [showMemoryLayer, setShowMemoryLayer] = useState<boolean>(false);
  const [showVehicleDna, setShowVehicleDna] = useState<boolean>(false);
  const [isReobserving, setIsReobserving] = useState<boolean>(false);

  const activeChap = getChapterById('04');
  const activeEvent = CHAPTER4_ROAD_EVENTS.find((e) => e.id === selectedEventId) || CHAPTER4_ROAD_EVENTS[0];

  const handleSelectEvent = useCallback(
    (eventId: string) => {
      setSelectedEventId(eventId);
      setSelectedRoadEventId(eventId);
      setActiveEvidence('road');
    },
    [setSelectedRoadEventId, setActiveEvidence]
  );

  const handleToggleMemory = () => {
    setShowMemoryLayer((prev) => !prev);
    setActiveEvidence('memory');
  };

  const handleToggleVehicleDna = () => {
    setShowVehicleDna((prev) => !prev);
    setActiveEvidence('speed');
  };

  const handleReplayReobservation = () => {
    setIsReobserving((prev) => !prev);
    setActiveEvidence('memory');
  };

  return (
    <main
      aria-label="Chapter 04 Road Intelligence Spatial Scene Canvas"
      className="relative flex-1 bg-[#0B0D0F] overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none"
    >
      {/* Background Cartographic Matrix Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#35383A_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Chapter 04 Narrative Overlay Header & Active Evidence Subpanel */}
      <div className="relative z-10 max-w-xl space-y-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="tn-tag tn-tag-brass">04 ROAD</span>
          <span className="font-mono text-xs text-[#71869A] tracking-wider uppercase">
            PHYSICAL ROAD LANDMARKS & SENSOR SIGNATURES
          </span>
        </div>
        <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#E8E6E1] tracking-tight">
          {activeChap.title}
        </h2>

        {/* Selected Road Event Detail Evidence Chain Card */}
        <div className="p-3 bg-[#151719]/95 border border-[#35383A] rounded-sm backdrop-blur-sm pointer-events-auto space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#B89562]">
              EVENT: {activeEvent.label.toUpperCase()}
            </span>
            <span className="tn-tag tn-tag-steel text-[9px]">
              CONFIDENCE: {activeEvent.confidenceQualitative}
            </span>
          </div>

          <p className="font-mono text-[10px] text-[#71869A] uppercase">
            SIGNATURE: {activeEvent.imupattern}
          </p>

          <p className="font-sans text-xs text-[#A7A6A1] leading-relaxed border-t border-[#35383A] pt-1.5">
            {activeEvent.sensorSignatureDesc}
          </p>

          {/* Evidence Chain Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 font-mono text-[10px] border-t border-[#35383A]/60">
            <div>
              <span className="text-[#71869A]">VEHICLE DNA: </span>
              <span className="text-[#E8E6E1]">{activeEvent.vehicleDnaResponse}</span>
            </div>
            <div>
              <span className="text-[#B89562]">ROADMEMORY: </span>
              <span className="text-[#E8E6E1]">{activeEvent.matchedMemoryId} (MATCHED)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter 04 Interactive Cartographic Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <svg
          className="w-full h-full max-w-5xl max-h-[700px] p-4 sm:p-8"
          viewBox="0 0 1000 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Spatial Road Scene Canvas */}
          <RoadSceneCanvas
            selectedEventId={selectedEventId}
            onSelectEvent={handleSelectEvent}
            showMemoryLayer={showMemoryLayer}
            showVehicleDna={showVehicleDna}
            isReobserving={isReobserving}
            reducedMotion={reducedMotion}
          />

          {/* Non-Telemetry Safeguard Disclaimer */}
          <text x="20" y="580" fill="#747570" fontSize="10" fontFamily="JetBrains Mono">
            VISUALIZATION: CONCEPTUAL REASONING CANVAS (NON-TELEMETRY)
          </text>
        </svg>
      </div>

      {/* Contextual Action Bar */}
      <RoadControls
        onInspectEvent={() => setInspectingNodeId('node-road')}
        onToggleMemory={handleToggleMemory}
        showMemoryLayer={showMemoryLayer}
        onToggleVehicleDna={handleToggleVehicleDna}
        showVehicleDna={showVehicleDna}
        onReplayReobservation={handleReplayReobservation}
        isReobserving={isReobserving}
      />
    </main>
  );
};
