import React from 'react';
import { useExperience } from '../../state/ExperienceContext';
import { CHAPTERS } from '../../data/chapters';
import { SystemStateIndicator } from '../primitives/SystemStateIndicator';
import type { ChapterId } from '../../types/experience';
import { Compass, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';

export const ChapterHeader: React.FC = () => {
  const {
    currentChapter,
    setChapter,
    nextChapter,
    prevChapter,
    gnssState,
    firedrillActive,
    reducedMotion,
    setReducedMotion,
  } = useExperience();

  const currentIndex = CHAPTERS.findIndex((c) => c.id === currentChapter);

  return (
    <header className="h-[56px] border-b border-[#35383A] bg-[#151719] px-3 sm:px-4 flex items-center justify-between shrink-0 z-30 select-none overflow-hidden">
      {/* BRAND IDENTITY */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="w-7 h-7 rounded-sm bg-[#71869A]/15 border border-[#71869A]/40 flex items-center justify-center text-[#71869A]">
          <Compass className="w-4 h-4" />
        </div>
        <div className="hidden lg:block">
          <h1 className="font-sans font-bold text-xs text-[#E8E6E1] tracking-wide leading-none">TRUENORTH</h1>
          <p className="font-mono text-[9px] text-[#747570] tracking-wider uppercase mt-0.5">
            IDR SYSTEM EXP.
          </p>
        </div>
      </div>

      {/* COMPACT CHAPTER NAVIGATION STRIP */}
      <nav
        aria-label="Chapter Index Navigation"
        className="flex-1 max-w-3xl mx-2 sm:mx-4 overflow-x-auto no-scrollbar flex items-center gap-1.5 py-1"
      >
        {CHAPTERS.map((chap) => {
          const isActive = chap.id === currentChapter;
          return (
            <button
              key={chap.id}
              type="button"
              onClick={() => setChapter(chap.id as ChapterId)}
              aria-current={isActive ? 'step' : undefined}
              title={`${chap.number} — ${chap.title}`}
              className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-sm font-mono text-xs transition-all ${
                isActive
                  ? 'bg-[#1E2124] border border-[#B89562] text-[#E8E6E1] font-semibold shadow-sm'
                  : 'bg-[#0B0D0F]/60 border border-[#35383A]/80 text-[#A7A6A1] hover:text-[#E8E6E1] hover:border-[#71869A]/50'
              }`}
            >
              <span className={isActive ? 'text-[#B89562] font-bold' : 'text-[#747570]'}>
                {chap.number}
              </span>
              <span className="font-sans text-[11px] tracking-wide uppercase">
                {chap.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* RIGHT CONTROLS: PREV/NEXT, GNSS INDICATOR, MOTION TOGGLE */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Prev / Next Chapter Buttons */}
        <div className="hidden sm:flex items-center gap-1 bg-[#0B0D0F] p-0.5 border border-[#35383A] rounded-sm">
          <button
            type="button"
            onClick={prevChapter}
            disabled={currentIndex === 0}
            title="Previous Chapter (Left Arrow / Up)"
            aria-label="Previous Chapter"
            className="p-1 text-[#A7A6A1] hover:text-[#E8E6E1] disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[10px] text-[#747570] px-1">
            {currentIndex + 1}/8
          </span>
          <button
            type="button"
            onClick={nextChapter}
            disabled={currentIndex === CHAPTERS.length - 1}
            title="Next Chapter (Right Arrow / Down)"
            aria-label="Next Chapter"
            className="p-1 text-[#A7A6A1] hover:text-[#E8E6E1] disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* GNSS State Indicator */}
        <SystemStateIndicator gnssState={gnssState} firedrillActive={firedrillActive} />

        {/* Reduced Motion Toggle Button */}
        <button
          type="button"
          onClick={() => setReducedMotion(!reducedMotion)}
          title={reducedMotion ? 'Reduced Motion: ENABLED' : 'Reduced Motion: DISABLED'}
          className={`flex items-center gap-1 px-2 py-1 rounded-sm font-mono text-[10px] tracking-wider border transition-colors ${
            reducedMotion
              ? 'bg-[#B89562]/10 border-[#B89562] text-[#B89562]'
              : 'bg-[#0B0D0F] border-[#35383A] text-[#747570] hover:text-[#A7A6A1]'
          }`}
          aria-label="Toggle Reduced Motion"
        >
          {reducedMotion ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
        </button>
      </div>
    </header>
  );
};
