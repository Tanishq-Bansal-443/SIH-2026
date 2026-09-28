import React from 'react';
import { useExperience } from '../../state/ExperienceContext';
import { CHAPTERS } from '../../data/chapters';
import type { ChapterId } from '../../types/experience';
import { Compass, ChevronUp, ChevronDown } from 'lucide-react';

export const ChapterNavigator: React.FC = () => {
  const { currentChapter, setChapter, nextChapter, prevChapter } = useExperience();

  const currentIndex = CHAPTERS.findIndex((c) => c.id === currentChapter);

  return (
    <nav
      aria-label="Chapter Index Navigation"
      className="bg-[#151719] border-r border-[#35383A] w-[220px] shrink-0 flex flex-col justify-between hidden md:flex z-30 select-none"
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-[#35383A]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-sm bg-[#71869A]/15 border border-[#71869A]/40 flex items-center justify-center text-[#71869A]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-sans font-bold text-sm text-[#E8E6E1] tracking-wide">TRUENORTH</h1>
            <p className="font-mono text-[10px] text-[#A7A6A1] tracking-wider uppercase">
              IDR SYSTEM EXP.
            </p>
          </div>
        </div>
      </div>

      {/* Vertical Chapter Rail */}
      <div className="flex-1 py-3 px-2 overflow-y-auto space-y-1">
        <div className="px-3 py-1 font-mono text-[10px] text-[#747570] tracking-widest uppercase">
          CHAPTER INDEX
        </div>

        {CHAPTERS.map((chap) => {
          const isActive = chap.id === currentChapter;
          return (
            <button
              key={chap.id}
              type="button"
              onClick={() => setChapter(chap.id as ChapterId)}
              aria-current={isActive ? 'step' : undefined}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-sm font-mono text-xs transition-all text-left group ${
                isActive
                  ? 'bg-[#1E2124] border-l-2 border-[#B89562] text-[#E8E6E1]'
                  : 'text-[#A7A6A1] hover:text-[#E8E6E1] hover:bg-[#1E2124]/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`font-mono text-[11px] font-semibold ${
                    isActive ? 'text-[#B89562]' : 'text-[#747570] group-hover:text-[#A7A6A1]'
                  }`}
                >
                  {chap.number}
                </span>
                <span className="font-sans font-medium text-xs tracking-wider">{chap.label}</span>
              </div>
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#B89562]" />}
            </button>
          );
        })}
      </div>

      {/* Sequential Nav Controls & Shortcut Hint */}
      <div className="p-3 border-t border-[#35383A] bg-[#0B0D0F]/40 space-y-2">
        <div className="flex items-center justify-between gap-1.5">
          <button
            type="button"
            onClick={prevChapter}
            disabled={currentIndex === 0}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-[#151719] border border-[#35383A] rounded-sm text-xs font-mono text-[#A7A6A1] hover:text-[#E8E6E1] hover:border-[#71869A] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            aria-label="Previous Chapter"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            <span>PREV</span>
          </button>
          <button
            type="button"
            onClick={nextChapter}
            disabled={currentIndex === CHAPTERS.length - 1}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-[#151719] border border-[#35383A] rounded-sm text-xs font-mono text-[#A7A6A1] hover:text-[#E8E6E1] hover:border-[#71869A] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            aria-label="Next Chapter"
          >
            <span>NEXT</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="font-mono text-[9px] text-[#747570] text-center">
          KEYS: [1-8] Jump | [↑/↓] Chapter
        </p>
      </div>
    </nav>
  );
};
