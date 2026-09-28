import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useExperience } from '../../../state/ExperienceContext';
import { getChapterById } from '../../../data/chapters';
import type { FireDrillStage } from '../../../types/experience';
import { FIREDRILL_SUMMARY } from '../../../data/fireDrillFixtures';
import { FireDrillCanvas } from './FireDrillCanvas';
import { FireDrillControls } from './FireDrillControls';

export const FireDrillScene: React.FC = () => {
  const {
    reducedMotion,
    setInspectingNodeId,
    setActiveEvidence,
    setGNSSState,
    nextChapter,
    setActiveAction,
  } = useExperience();

  const [stage, setStage] = useState<FireDrillStage>('IDLE');
  const [progress, setProgress] = useState<number>(0);
  const [selectedDiagnosticId, setSelectedDiagnosticId] = useState<string | null>('diag-memory');
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [memoryUpdated, setMemoryUpdated] = useState<boolean>(false);

  const animFrameRef = useRef<number | null>(null);
  const activeChap = getChapterById('07');

  // Sync selected scene state with ExperienceContext
  useEffect(() => {
    setActiveEvidence('firedrill');
    setInspectingNodeId('node-firedrill');
  }, [setActiveEvidence, setInspectingNodeId]);

  // Handler: Inspect Diagnostic
  const handleInspectDiagnostic = () => {
    setActiveAction('INSPECT_EVIDENCE');
  };

  // Primary Action: START FIRE DRILL / REPLAY FIRE DRILL
  const handleStartFireDrill = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    setStage('ARMED');
    setProgress(0);
    setMemoryUpdated(false);

    if (reducedMotion) {
      // Instant static state transition for reduced motion
      setGNSSState('unavailable');
      setProgress(100);
      setStage('REVIEW');
      return;
    }

    // Smooth deterministic rehearsal timeline
    setTimeout(() => {
      setStage('RUNNING');
      setGNSSState('unavailable');

      const startTime = performance.now();
      const durationMs = 3800; // 3.8 seconds rehearsal run

      const animateRehearsal = (now: number) => {
        const elapsed = now - startTime;
        const currentProgress = Math.min(100, (elapsed / durationMs) * 100);
        setProgress(currentProgress);

        if (currentProgress < 100) {
          animFrameRef.current = requestAnimationFrame(animateRehearsal);
        } else {
          setStage('EVALUATING');
          setTimeout(() => {
            setStage('COMPLETE');
            setTimeout(() => {
              setStage('REVIEW');
            }, 600);
          }, 800);
        }
      };

      animFrameRef.current = requestAnimationFrame(animateRehearsal);
    }, 400);
  }, [reducedMotion, setGNSSState]);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Handler: Trace Shadow Path
  const handleTraceShadowPath = () => {
    if (isTracing) return;
    setIsTracing(true);
    setActiveAction('TRACE_CONSTRAINT');

    if (reducedMotion) {
      setIsTracing(false);
      return;
    }

    const startTime = performance.now();
    const duration = 2000;

    const traceStep = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(100, (elapsed / duration) * 100);
      setProgress(t);

      if (t < 100) {
        requestAnimationFrame(traceStep);
      } else {
        setIsTracing(false);
      }
    };

    requestAnimationFrame(traceStep);
  };

  // Handler: Reset FireDrill
  const handleResetFireDrill = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setStage('IDLE');
    setProgress(0);
    setGNSSState('healthy');
    setMemoryUpdated(false);
    setActiveAction(null);
  };

  return (
    <main
      aria-label="Chapter 07 FireDrill Scene Canvas"
      className="relative flex-1 bg-[#0B0D0F] overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none"
    >
      {/* Background Cartographic Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#35383A_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Chapter 07 Narrative Overlay Header */}
      <div className="relative z-10 max-w-xl space-y-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="tn-tag tn-tag-brass">07 FIRE DRILL</span>
          <span className="font-mono text-xs text-[#71869A] tracking-wider uppercase">
            BLACKOUT REHEARSAL & SHADOW NAVIGATION
          </span>
        </div>
        <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#E8E6E1] tracking-tight">
          {activeChap.title}
        </h2>

        {/* System Readiness & Rehearsal Summary Subpanel */}
        <div className="p-3 bg-[#151719]/95 border border-[#35383A] rounded-sm backdrop-blur-sm pointer-events-auto space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#E8E6E1]">
              SYSTEM READINESS STATE:
            </span>
            <span className="tn-tag tn-tag-brass text-[9px]">
              {FIREDRILL_SUMMARY.readinessState}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] font-mono border-t border-[#35383A] pt-1.5">
            <div>
              <span className="text-[#71869A]">GNSS CONTEXT: </span>
              <span className={stage !== 'IDLE' ? 'text-[#A88A58]' : 'text-[#78947F]'}>
                {stage !== 'IDLE' ? 'SIMULATED OUTAGE (HIDDEN)' : 'AVAILABLE (REFERENCE)'}
              </span>
            </div>
            <div>
              <span className="text-[#71869A]">SHADOW STATE: </span>
              <span className="text-[#B89562]">
                {stage === 'RUNNING' ? 'PROPAGATING...' : stage}
              </span>
            </div>
            <div>
              <span className="text-[#71869A]">WEAKNESS DETECTED: </span>
              <span className="text-[#9B625E] font-semibold">
                RoadMemory (Segment 3)
              </span>
            </div>
            <div>
              <span className="text-[#71869A]">LEARN AGAIN: </span>
              <span className={memoryUpdated ? 'text-[#78947F]' : 'text-[#B89562]'}>
                {memoryUpdated ? 'MEMORY UPDATED ✓' : 'UPDATE PENDING'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cartographic SVG Visual Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <svg
          className="w-full h-full max-w-5xl max-h-[700px] p-4 sm:p-8"
          viewBox="0 0 1000 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <FireDrillCanvas
            stage={stage}
            progress={progress}
            selectedDiagnosticId={selectedDiagnosticId}
            onSelectDiagnostic={(id) => {
              setSelectedDiagnosticId(id);
              setActiveAction('INSPECT_EVIDENCE');
            }}
            reducedMotion={reducedMotion}
          />

          {/* Watermark Safeguard Disclaimer */}
          <text x="20" y="580" fill="#747570" fontSize="10" fontFamily="JetBrains Mono">
            VISUALIZATION: CONCEPTUAL REASONING CANVAS (NON-TELEMETRY)
          </text>
        </svg>
      </div>

      {/* Action Controls Toolbar */}
      <FireDrillControls
        stage={stage}
        onStartFireDrill={handleStartFireDrill}
        onInspectDiagnostic={handleInspectDiagnostic}
        onTraceShadowPath={handleTraceShadowPath}
        onContinueToSystem={nextChapter}
        onResetFireDrill={handleResetFireDrill}
        isTracing={isTracing}
      />
    </main>
  );
};
