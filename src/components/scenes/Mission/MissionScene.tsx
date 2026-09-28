import React, { useState, useEffect, useRef } from 'react';
import { useExperience } from '../../../state/ExperienceContext';
import { MissionEnvironment } from './MissionEnvironment';
import { MissionVehicle } from './MissionVehicle';
import { MissionControls } from './MissionControls';
import { getChapterById } from '../../../data/chapters';

export const MissionScene: React.FC = () => {
  const { setGNSSState, gnssState, reducedMotion, setInspectingNodeId } = useExperience();
  const activeChap = getChapterById('01');

  // Animation & progression state
  const [progress, setProgress] = useState<number>(0.0); // 0.0 to 1.0
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Derive conceptual stage based on progress
  const getStage = (p: number): 'A_OPEN' | 'B_URBAN' | 'C_TUNNEL' | 'SETTLED' => {
    if (p >= 0.95) return 'SETTLED';
    if (p >= 0.6) return 'C_TUNNEL';
    if (p >= 0.25) return 'B_URBAN';
    return 'A_OPEN';
  };

  const stage = getStage(progress);

  // Synchronize GNSS state in global context based on spatial progress
  useEffect(() => {
    if (progress >= 0.6) {
      setGNSSState('unreliable');
    } else if (progress >= 0.25) {
      setGNSSState('degrading');
    } else {
      setGNSSState('healthy');
    }
  }, [progress, setGNSSState]);

  // Handle frame progression
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      lastTimeRef.current = null;
      return;
    }

    const tick = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (time - lastTimeRef.current) / 1000;
        setProgress((prev) => {
          const nextP = prev + delta * 0.07;
          if (nextP >= 0.98) {
            setIsPlaying(false);
            return 1.0;
          }
          return nextP;
        });
      }
      lastTimeRef.current = time;
      animFrameRef.current = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (reducedMotion) {
      // Step directly between stages in reduced motion mode
      if (progress < 0.3) {
        setProgress(0.45);
      } else if (progress < 0.7) {
        setProgress(0.95);
      } else {
        setProgress(0.0);
      }
    } else {
      if (progress >= 0.98) {
        setProgress(0.0);
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0.0);
  };

  const getNarrativeCopy = () => {
    switch (stage) {
      case 'A_OPEN':
        return 'GNSS works — until the environment makes it unreliable.';
      case 'B_URBAN':
        return 'Signal quality can degrade before a complete outage.';
      case 'C_TUNNEL':
        return 'The navigation problem begins before GNSS disappears.';
      case 'SETTLED':
      default:
        return 'THE SIGNAL IS STILL THERE. BUT HOW MUCH SHOULD WE TRUST IT?';
    }
  };

  return (
    <main
      aria-label="Chapter 01 Mission Interactive Spatial Canvas"
      className="relative flex-1 bg-[#0B0D0F] overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none"
    >
      {/* Background Cartographic Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#35383A_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Chapter 01 Spatial Narrative Overlay Header */}
      <div className="relative z-10 max-w-xl space-y-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="tn-tag tn-tag-brass">01 MISSION</span>
          <span className="font-mono text-xs text-[#71869A] tracking-wider uppercase">
            SPATIAL PROBLEM NARRATIVE
          </span>
        </div>
        <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#E8E6E1] tracking-tight">
          {activeChap.title}
        </h2>
        <div className="p-3 bg-[#151719]/90 border border-[#35383A] rounded-sm backdrop-blur-sm pointer-events-auto">
          <p className="font-mono text-xs text-[#B89562] font-medium leading-relaxed">
            "{getNarrativeCopy()}"
          </p>
        </div>
      </div>

      {/* Chapter 01 SVG Cartographic Scene */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <svg
          className="w-full h-full max-w-5xl max-h-[700px] p-4 sm:p-8"
          viewBox="0 0 1000 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="gnssUncertainty" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor={
                  gnssState === 'healthy'
                    ? '#78947F'
                    : gnssState === 'degrading'
                    ? '#A88A58'
                    : '#9B625E'
                }
                stopOpacity="0.25"
              />
              <stop offset="100%" stopColor="#0B0D0F" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Environmental Progression Geometry (Stages A, B, C) */}
          <MissionEnvironment progress={progress} />

          {/* Vehicle Position & SoftGNSS Uncertainty Circle */}
          <MissionVehicle progress={progress} gnssState={gnssState} reducedMotion={reducedMotion} />

          {/* Baseline Non-Telemetry Safeguard Disclaimer */}
          <text x="20" y="580" fill="#747570" fontSize="10" fontFamily="JetBrains Mono">
            VISUALIZATION: CONCEPTUAL REASONING CANVAS (NON-TELEMETRY)
          </text>
        </svg>
      </div>

      {/* Contextual Interaction Controls */}
      <MissionControls
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onReset={handleReset}
        onInspectSignal={() => setInspectingNodeId('node-gnss')}
        isSettled={stage === 'SETTLED' || progress > 0.9}
      />
    </main>
  );
};
