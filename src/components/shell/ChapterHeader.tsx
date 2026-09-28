import React from 'react';
import { useExperience } from '../../state/ExperienceContext';
import { getChapterById, CHAPTERS } from '../../data/chapters';
import { SystemStateIndicator } from '../primitives/SystemStateIndicator';
import type { ChapterId } from '../../types/experience';
import { Eye, EyeOff, Compass } from 'lucide-react';

export const ChapterHeader: React.FC = () => {
  const {
    currentChapter,
    setChapter,
    gnssState,
    firedrillActive,
    reducedMotion,
    setReducedMotion,
  } = useExperience();

  const activeChap = getChapterById(currentChapter);

  return (
    <header className="h-[56px] border-b border-[#35383A] bg-[#151719] px-4 flex items-center justify-between shrink-0 z-20 select-none">
      {/* Brand Identity & Chapter Title */}
      <div className="flex items-center gap-3">
        {/* Mobile Brand Logo & Selector */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-6 h-6 rounded-sm bg-[#71869A]/15 border border-[#71869A]/40 flex items-center justify-center text-[#71869A]">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <select
            value={currentChapter}
            onChange={(e) => setChapter(e.target.value as ChapterId)}
            className="bg-[#0B0D0F] border border-[#35383A] text-[#E8E6E1] font-mono text-xs px-2 py-1 rounded-sm focus:outline-none focus:border-[#71869A]"
            aria-label="Select Chapter Index"
          >
            {CHAPTERS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.number} {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Chapter Title Display */}
        <div className="hidden md:flex items-center gap-2.5">
          <span className="font-mono text-xs font-bold text-[#B89562] tracking-wider">
            {activeChap.number}
          </span>
          <span className="text-[#35383A] font-mono text-xs">/</span>
          <h2 className="font-sans font-semibold text-sm text-[#E8E6E1] tracking-wide uppercase">
            {activeChap.title}
          </h2>
        </div>
      </div>

      {/* Right Controls: SoftGNSS Status Indicator & Reduced Motion Toggle */}
      <div className="flex items-center gap-3">
        <SystemStateIndicator gnssState={gnssState} firedrillActive={firedrillActive} />

        {/* Reduced Motion Toggle Button */}
        <button
          type="button"
          onClick={() => setReducedMotion(!reducedMotion)}
          title={reducedMotion ? 'Reduced Motion: ENABLED' : 'Reduced Motion: DISABLED'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm font-mono text-[10px] tracking-wider border transition-colors ${
            reducedMotion
              ? 'bg-[#B89562]/10 border-[#B89562] text-[#B89562]'
              : 'bg-[#0B0D0F] border-[#35383A] text-[#747570] hover:text-[#A7A6A1] hover:border-[#71869A]/50'
          }`}
          aria-label="Toggle Reduced Motion"
        >
          {reducedMotion ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          <span className="hidden sm:inline">{reducedMotion ? 'RM: ON' : 'MOTION'}</span>
        </button>
      </div>
    </header>
  );
};
