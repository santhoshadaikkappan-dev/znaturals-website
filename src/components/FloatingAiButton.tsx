import React from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingAiButton: React.FC = () => {
  const { setIsAiAdvisorOpen, isAiAdvisorOpen } = useStore();

  if (isAiAdvisorOpen) return null;

  return (
    <aside aria-label="Interactive AI Consultant" className="fixed bottom-6 right-6 z-40 flex items-center">
      <button
        onClick={() => setIsAiAdvisorOpen(true)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-deep-forest text-botanical-ivory shadow-2xl border-2 border-champagne-gold/70 hover:scale-105 active:scale-95 transition-all duration-300"
        title="Consult Z Naturals Botanical AI Advisor"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-champagne-gold" />
        </span>

        <Sparkles className="w-4 h-4 text-champagne-gold group-hover:rotate-12 transition-transform" />
        
        <span className="text-xs font-bold tracking-wide font-sans">
          Ask Botanical AI
        </span>

        {/* Karaikudi COD Micro-Pill Tooltip */}
        <span className="hidden sm:inline-block ml-1 px-2 py-0.5 rounded-full bg-champagne-gold/20 text-champagne-gold text-[10px] uppercase font-semibold">
          Advisor
        </span>
      </button>
    </aside>
  );
};
