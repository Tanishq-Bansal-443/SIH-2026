import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useExperience } from '../../../state/ExperienceContext';
import { getChapterById } from '../../../data/chapters';
import type { SystemLoopStageId, SystemArchitectureNode } from '../../../types/experience';
import { SYSTEM_NODES, COMPONENT_TRACES } from '../../../data/systemFixtures';
import { SystemCanvas } from './SystemCanvas';
import { SystemControls } from './SystemControls';
import { Layers, X } from 'lucide-react';

export const SystemScene: React.FC = () => {
  const {
    reducedMotion,
    setInspectingNodeId,
    setActiveEvidence,
    setGNSSState,
  } = useExperience();

  const [selectedNodeId, setSelectedNodeId] = useState<SystemLoopStageId>('CROSS-CHECK');
  const [activeTraceStepIndex, setActiveTraceStepIndex] = useState<number | null>(null);
  const [activeComponentTraceId, setActiveComponentTraceId] = useState<string | null>(null);
  const [isLoopRunning, setIsLoopRunning] = useState<boolean>(false);
  const [showNodeDrawer, setShowNodeDrawer] = useState<boolean>(false);

  const loopTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeChap = getChapterById('08');

  // Sync selected scene state with ExperienceContext
  useEffect(() => {
    setActiveEvidence(null);
    setInspectingNodeId('node-topology');
    setGNSSState('healthy');
  }, [setActiveEvidence, setInspectingNodeId, setGNSSState]);

  const selectedNode: SystemArchitectureNode =
    SYSTEM_NODES.find((n) => n.id === selectedNodeId) || SYSTEM_NODES[3];

  // Action: FOLLOW SYSTEM (animates sequential step trace around all 7 loop stages)
  const handleFollowSystem = useCallback(() => {
    if (loopTimerRef.current) {
      clearInterval(loopTimerRef.current);
    }

    setActiveComponentTraceId(null);
    setIsLoopRunning(true);
    setActiveTraceStepIndex(0);

    if (reducedMotion) {
      // Static loop state for reduced motion
      setActiveTraceStepIndex(6);
      setIsLoopRunning(false);
      return;
    }

    let currentStep = 0;
    loopTimerRef.current = setInterval(() => {
      currentStep += 1;
      if (currentStep >= 7) {
        if (loopTimerRef.current) clearInterval(loopTimerRef.current);
        setActiveTraceStepIndex(0); // Complete loop back to SENSE
        setTimeout(() => {
          setIsLoopRunning(false);
        }, 500);
      } else {
        setActiveTraceStepIndex(currentStep);
        setSelectedNodeId(SYSTEM_NODES[currentStep].id);
      }
    }, 1100);
  }, [reducedMotion]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (loopTimerRef.current) {
        clearInterval(loopTimerRef.current);
      }
    };
  }, []);

  // Action: TRACE COMPONENT (cycles through Component Traces)
  const handleTraceComponent = () => {
    if (isLoopRunning) return;
    setActiveTraceStepIndex(null);

    const traceIds = COMPONENT_TRACES.map((t) => t.id);
    const currentIndex = activeComponentTraceId ? traceIds.indexOf(activeComponentTraceId) : -1;
    const nextIndex = (currentIndex + 1) % traceIds.length;
    const nextTraceId = traceIds[nextIndex];

    setActiveComponentTraceId(nextTraceId);

    // Auto-select first stage of the traced component
    const traceDef = COMPONENT_TRACES.find((t) => t.id === nextTraceId);
    if (traceDef && traceDef.pathStages.length > 0) {
      setSelectedNodeId(traceDef.pathStages[0]);
    }
  };

  // Action: INSPECT NODE
  const handleInspectNode = () => {
    setShowNodeDrawer(true);
  };

  // Action: REPLAY LOOP
  const handleReplayLoop = () => {
    handleFollowSystem();
  };

  const activeComponentTrace = COMPONENT_TRACES.find((c) => c.id === activeComponentTraceId);

  return (
    <main
      aria-label="Chapter 08 Complete System Architecture Scene Canvas"
      className="relative flex-1 bg-[#0B0D0F] overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none"
    >
      {/* Background Cartographic Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#35383A_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Chapter 08 Narrative Overlay Header */}
      <div className="relative z-10 max-w-xl space-y-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="tn-tag tn-tag-brass">08 SYSTEM</span>
          <span className="font-mono text-xs text-[#71869A] tracking-wider uppercase">
            COMPLETE SYSTEM ARCHITECTURE SYNTHESIS
          </span>
        </div>
        <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#E8E6E1] tracking-tight">
          {activeChap.title}
        </h2>

        {/* Selected System Node Detail Subpanel */}
        <div className="p-3 bg-[#151719]/95 border border-[#35383A] rounded-sm backdrop-blur-sm pointer-events-auto space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#E8E6E1]">
              STAGE {selectedNode.stageNumber}: {selectedNode.label}
            </span>
            <span className="tn-tag tn-tag-steel text-[9px]">
              CLOSED-LOOP ARCHITECTURE
            </span>
          </div>

          <div className="text-[11px] font-mono text-[#A7A6A1] border-t border-[#35383A] pt-1.5 space-y-1">
            <div>
              <span className="text-[#71869A]">ROLE: </span>
              <span className="text-[#E8E6E1]">{selectedNode.role}</span>
            </div>
            <div>
              <span className="text-[#71869A]">PRIMARY SUBSYSTEM: </span>
              <span className="text-[#B89562]">{selectedNode.subsystems.join(' • ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* NODE INSPECTION DRAWER / SLIDE-OVER MODAL */}
      {showNodeDrawer && (
        <div className="absolute top-24 right-6 z-30 max-w-sm w-full bg-[#151719] border border-[#71869A] p-4 rounded-sm shadow-2xl space-y-3 pointer-events-auto">
          <div className="flex items-center justify-between border-b border-[#35383A] pb-2">
            <div className="flex items-center gap-1.5 text-[#B89562]">
              <Layers className="w-4 h-4" />
              <span className="font-mono text-xs font-bold tracking-wider">
                STAGE {selectedNode.stageNumber}: {selectedNode.label}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowNodeDrawer(false)}
              className="text-[#747570] hover:text-[#E8E6E1]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div>
              <span className="text-[#71869A] block text-[10px]">STAGE DESCRIPTION:</span>
              <p className="text-[#E8E6E1] leading-relaxed font-sans text-xs">
                {selectedNode.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[#35383A]">
              <span className="text-[#71869A] block text-[10px] mb-1">INPUT STREAMS:</span>
              <ul className="list-disc list-inside text-[#A7A6A1] space-y-0.5">
                {selectedNode.inputs.map((inp, idx) => (
                  <li key={idx}>{inp}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-[#35383A]">
              <span className="text-[#B89562] block text-[10px] mb-1">OUTPUT PRODUCTIONS:</span>
              <ul className="list-disc list-inside text-[#E8E6E1] space-y-0.5">
                {selectedNode.outputs.map((out, idx) => (
                  <li key={idx}>{out}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-[#35383A] flex justify-between text-[10px]">
              <span className="text-[#747570]">CONNECTED TO:</span>
              <span className="text-[#78947F] font-bold">
                {selectedNode.connectedNodes.join(' → ')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Cartographic SVG Visual Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <svg
          className="w-full h-full max-w-5xl max-h-[700px] p-4 sm:p-8"
          viewBox="0 0 1000 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <SystemCanvas
            selectedNodeId={selectedNodeId}
            onSelectNode={(id) => {
              setSelectedNodeId(id);
              setShowNodeDrawer(true);
            }}
            activeTraceStepIndex={activeTraceStepIndex}
            activeComponentTraceId={activeComponentTraceId}
            reducedMotion={reducedMotion}
          />
        </svg>
      </div>

      {/* Action Controls Toolbar */}
      <SystemControls
        onFollowSystem={handleFollowSystem}
        onTraceComponent={handleTraceComponent}
        onInspectNode={handleInspectNode}
        onReplayLoop={handleReplayLoop}
        isLoopRunning={isLoopRunning}
        activeComponentTraceName={activeComponentTrace?.name}
      />
    </main>
  );
};
