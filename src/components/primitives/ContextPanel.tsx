import React from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ContextPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const ContextPanel: React.FC<ContextPanelProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <aside
      aria-label="Context Inspection Panel"
      role="region"
      className="fixed bottom-4 right-4 z-40 w-[360px] max-w-[calc(100vw-2rem)] bg-[#151719] border border-[#35383A] rounded-sm shadow-2xl p-4 transition-all duration-200"
    >
      <div className="flex items-start justify-between pb-3 mb-3 border-b border-[#35383A]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B89562] animate-pulse" />
            <h4 className="font-sans font-semibold text-sm text-[#E8E6E1]">{title}</h4>
          </div>
          {subtitle && <p className="font-mono text-xs text-[#A7A6A1] mt-0.5">{subtitle}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Inspection Panel"
          className="p-1 text-[#A7A6A1] hover:text-[#E8E6E1] hover:bg-[#35383A]/50 rounded-sm transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="max-h-[60vh] overflow-y-auto pr-1">{children}</div>
    </aside>
  );
};
