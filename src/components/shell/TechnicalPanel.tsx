import React from 'react';
import { useExperience } from '../../state/ExperienceContext';
import { getChapterById } from '../../data/chapters';
import { Panel } from '../primitives/Panel';
import { ActionButton } from '../primitives/ActionButton';
import { MetadataRow } from '../primitives/MetadataRow';
import { Activity, Cpu, Layers, ChevronUp, ChevronDown } from 'lucide-react';
import { CONCEPTUAL_EVIDENCE_NODES } from '../../data/conceptualFixtures';
import type { EvidenceType } from '../../types/experience';

export const TechnicalPanel: React.FC = () => {
  const {
    currentChapter,
    gnssState,
    activeEvidence,
    setActiveEvidence,
    setInspectingNodeId,
  } = useExperience();

  const [isMobileExpanded, setIsMobileExpanded] = React.useState(false);
  const activeChap = getChapterById(currentChapter);

  return (
    <aside
      aria-label="Chapter Technical Explanation Panel"
      role="region"
      className={`bg-[#151719] border-t md:border-t-0 md:border-l border-[#35383A] flex flex-col shrink-0 z-20 transition-all duration-200 ${
        isMobileExpanded ? 'h-[75vh]' : 'h-auto max-h-[160px] md:max-h-none md:h-full'
      } w-full md:w-[340px] xl:w-[380px] overflow-y-auto p-4 space-y-4`}
    >
      {/* Mobile Drawer Toggle Bar */}
      <button
        type="button"
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
        className="flex items-center justify-between w-full md:hidden py-1 px-2 bg-[#0B0D0F] border border-[#35383A] rounded-sm font-mono text-xs text-[#A7A6A1]"
      >
        <span className="font-semibold text-[#E8E6E1]">TECHNICAL CONTEXT & REASONING</span>
        {isMobileExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>

      {/* Primary Chapter Overview Panel */}
      <Panel
        title={`${activeChap.number} ${activeChap.label}`}
        subtitle="CHAPTER REASONING SPECIFICATION"
        badge={`GNSS: ${gnssState.toUpperCase()}`}
        badgeType={
          gnssState === 'healthy' ? 'validated' : gnssState === 'unavailable' ? 'rejected' : 'warning'
        }
      >
        <div className="space-y-3 pt-1">
          <div>
            <span className="tn-tech-label block mb-1">PRIMARY QUESTION</span>
            <p className="font-sans font-semibold text-xs text-[#E8E6E1]">
              "{activeChap.primaryQuestion}"
            </p>
          </div>

          <div>
            <span className="tn-tech-label block mb-1">DOMINANT CONCEPT</span>
            <p className="tn-body-text text-xs">{activeChap.dominantIdea}</p>
          </div>

          <div className="p-2.5 bg-[#0B0D0F] border border-[#35383A] rounded-sm">
            <div className="flex items-center gap-1.5 mb-1 text-[#B89562]">
              <Activity className="w-3.5 h-3.5" />
              <span className="font-mono text-[10px] font-semibold tracking-wider">
                TECHNICAL TAKEAWAY
              </span>
            </div>
            <p className="font-mono text-xs text-[#E8E6E1] leading-relaxed">
              {activeChap.technicalTakeaway}
            </p>
          </div>
        </div>
      </Panel>

      {/* System Evidence Stream Inspectors */}
      <Panel title="EVIDENCE STREAM INSPECTION" subtitle="ACTIVE REASONING INPUTS">
        <div className="space-y-2 pt-1">
          {CONCEPTUAL_EVIDENCE_NODES.slice(0, 5).map((node) => {
            const isSelected = activeEvidence === node.type;
            return (
              <div
                key={node.id}
                onClick={() => {
                  setActiveEvidence(isSelected ? null : (node.type as EvidenceType));
                  setInspectingNodeId(node.id);
                }}
                className={`p-2.5 rounded-sm border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#1E2124] border-[#71869A] text-[#E8E6E1]'
                    : 'bg-[#0B0D0F]/60 border-[#35383A] text-[#A7A6A1] hover:border-[#71869A]/50'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs mb-1">
                  <span className="font-semibold text-[#E8E6E1]">{node.name}</span>
                  <span className="text-[10px] text-[#71869A] uppercase font-mono">{node.status}</span>
                </div>
                <p className="text-[11px] text-[#747570] font-sans line-clamp-2">
                  {node.description}
                </p>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* Technical Action Controls */}
      <Panel title="TECHNICAL ACTIONS" subtitle="INTERACTION LANGUAGE">
        <div className="grid grid-cols-1 gap-2 pt-1">
          <ActionButton
            action="INSPECT EVIDENCE"
            icon={<Layers className="w-3.5 h-3.5" />}
            onClick={() => setInspectingNodeId('node-imu')}
            variant="default"
          />
          <ActionButton
            action="TRACE CONSTRAINT"
            icon={<Cpu className="w-3.5 h-3.5" />}
            onClick={() => setInspectingNodeId('node-topology')}
            variant="default"
          />
          <ActionButton
            action="VIEW MEMORY"
            icon={<Activity className="w-3.5 h-3.5" />}
            onClick={() => setInspectingNodeId('node-memory')}
            variant="brass"
          />
        </div>
      </Panel>

      {/* Qualitative System State Metadata */}
      <Panel title="SYSTEM INTEGRITY" subtitle="QUALITATIVE STATE">
        <div className="space-y-1 pt-1">
          <MetadataRow label="IMU INERTIAL SAMPLING" value="CONCEPTUAL" illustrative={true} />
          <MetadataRow label="FUSION ALGORITHM" value="ADAPTIVE EKF + TOPOLOCK" />
          <MetadataRow label="NOISE DRIVER" value="LEARNED VEHICLE DNA" />
          <MetadataRow label="ACCUMULATED DRIFT" value="QUALITATIVE / CONCEPTUAL" status="warning" illustrative={true} />
        </div>
      </Panel>
    </aside>
  );
};
