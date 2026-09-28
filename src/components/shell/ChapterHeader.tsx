import React from 'react';
import { useExperience } from '../../state/ExperienceContext';
import { getChapterById, CHAPTERS } from '../../data/chapters';
import { SystemStateIndicator } from '../primitives/SystemStateIndicator';
import type { ChapterId } from '../../types/experience';
import { Eye, EyeOff } from 'lucide-react';

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
    <header className="h-[56px] border-b border-[#35383A] bg-[#151719] px-4 flex items-center justify-between shrink-0 z-20">
      {/* Mobile Chapter Select Dropdown + Desktop Chapter Context */}
      <div className="flex items-center gap-3">
        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <select
            value={currentChapter}
            onChange={(e) => setChapter(e.target.value as ChapterId)}
            className="bg-[#0B0D0F] border border-[#35383A] text-[#E8E6E1] font-mono text-xs px-2 py-1 rounded-sm focus:outline-none focus:border-[#71869A]"
            aria-label="Select Chapter"
          >
            {CHAPTERS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.number} {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Chapter Title Badge */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="tn-chapter-num">{activeChap.number}</span>
          <span className="text-[#35383A] font-mono">/</span>
          <h2 className="font-sans font-semibold text-sm text-[#E8E6E1] tracking-wide">
            {activeChap.title}
          </h2>
        </div>
      </div>

      {/* Right Controls: System State Indicator & Motion Toggle */}
      <div className="flex items-center gap-4">
        <SystemStateIndicator gnssState={gnssState} firedrillActive={firedrillActive} />

        {/* Reduced Motion Toggle */}
        <button
          type="button"
          onClick={() => setReducedMotion(!reducedMotion)}
          title={reducedMotion ? 'Reduced Motion: ENABLED' : 'Reduced Motion: DISABLED'}
          className={`flex items-center gap-1.5 px-2 py-1 rounded-sm font-mono text-[10px] border transition-colors ${
            reducedMotion
              ? 'bg-[#B89562]/10 border-[#B89562] text-[#B89562]'
              : 'bg-[#0B0D0F] border-[#35383A] text-[#747570] hover:text-[#A7A6A1]'
          }`}
          aria-label="Toggle Reduced Motion"
        >
          {reducedMotion ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          <span className="hidden lg:inline">{reducedMotion ? 'RM: ON' : 'MOTION'}</span>
        </button>
      </div>
    </header>
  );
};
