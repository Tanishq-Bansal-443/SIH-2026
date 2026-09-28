import React from 'react';
import { ChapterHeader } from './ChapterHeader';
import { TechnicalPanel } from './TechnicalPanel';
import { SceneCanvas } from '../scene/SceneCanvas';

export const ExperienceShell: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col bg-[#0B0D0F] text-[#E8E6E1] overflow-hidden select-none">
      {/* Global Chapter Header with Integrated Compact Navigation */}
      <ChapterHeader />

      {/* Main Workspace Layout (Desktop: Row / Mobile: Column) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Central Cartographic Visual Scene Canvas (Hero View - Max Space) */}
        <SceneCanvas />

        {/* Right Contextual Technical Reasoning Panel */}
        <TechnicalPanel />
      </div>
    </div>
  );
};
