import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { ChapterId, EvidenceType, ExperienceState, GNSSQualityState } from '../types/experience';
import { CHAPTERS } from '../data/chapters';

interface ExperienceContextType extends ExperienceState {
  setChapter: (id: ChapterId) => void;
  nextChapter: () => void;
  prevChapter: () => void;
  setGNSSState: (state: GNSSQualityState) => void;
  setActiveEvidence: (type: EvidenceType) => void;
  setSelectedRoadEventId: (id: string | null) => void;
  setSelectedPeerId: (id: string | null) => void;
  toggleFireDrill: () => void;
  setReducedMotion: (enabled: boolean) => void;
  setInspectingNodeId: (id: string | null) => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export const ExperienceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentChapter, setCurrentChapter] = useState<ChapterId>('01');
  const [gnssState, setGNSSState] = useState<GNSSQualityState>('healthy');
  const [activeEvidence, setActiveEvidence] = useState<EvidenceType>(null);
  const [selectedRoadEventId, setSelectedRoadEventId] = useState<string | null>(null);
  const [selectedPeerId, setSelectedPeerId] = useState<string | null>(null);
  const [firedrillActive, setFiredrillActive] = useState<boolean>(false);
  const [inspectingNodeId, setInspectingNodeId] = useState<string | null>(null);

  // System reduced-motion preference detection
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Automatically update GNSS state based on chapter context default
  useEffect(() => {
    switch (currentChapter) {
      case '01':
        setGNSSState('healthy');
        break;
      case '02':
        setGNSSState('degrading');
        break;
      case '03':
        setGNSSState('unreliable');
        break;
      case '04':
      case '05':
      case '06':
      case '07':
      case '08':
        setGNSSState('unavailable');
        break;
      default:
        setGNSSState('healthy');
    }
  }, [currentChapter]);

  const setChapter = useCallback((id: ChapterId) => {
    setCurrentChapter(id);
    setSelectedRoadEventId(null);
    setSelectedPeerId(null);
    setInspectingNodeId(null);
  }, []);

  const nextChapter = useCallback(() => {
    const currentIndex = CHAPTERS.findIndex((c) => c.id === currentChapter);
    if (currentIndex < CHAPTERS.length - 1) {
      setChapter(CHAPTERS[currentIndex + 1].id);
    }
  }, [currentChapter, setChapter]);

  const prevChapter = useCallback(() => {
    const currentIndex = CHAPTERS.findIndex((c) => c.id === currentChapter);
    if (currentIndex > 0) {
      setChapter(CHAPTERS[currentIndex - 1].id);
    }
  }, [currentChapter, setChapter]);

  const toggleFireDrill = useCallback(() => {
    setFiredrillActive((prev) => !prev);
  }, []);

  // Listen to prefers-reduced-motion media query changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Keyboard navigation shortcuts: 1-8 keys to jump chapter, ArrowUp/ArrowDown for prev/next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key >= '1' && e.key <= '8') {
        const num = parseInt(e.key, 10);
        const chapterId = `0${num}` as ChapterId;
        setChapter(chapterId);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextChapter();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevChapter();
      } else if (e.key === 'Escape') {
        setSelectedRoadEventId(null);
        setSelectedPeerId(null);
        setInspectingNodeId(null);
        setActiveEvidence(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setChapter, nextChapter, prevChapter]);

  return (
    <ExperienceContext.Provider
      value={{
        currentChapter,
        gnssState,
        activeEvidence,
        selectedRoadEventId,
        selectedPeerId,
        firedrillActive,
        reducedMotion,
        inspectingNodeId,
        setChapter,
        nextChapter,
        prevChapter,
        setGNSSState,
        setActiveEvidence,
        setSelectedRoadEventId,
        setSelectedPeerId,
        toggleFireDrill,
        setReducedMotion,
        setInspectingNodeId,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = (): ExperienceContextType => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return context;
};
