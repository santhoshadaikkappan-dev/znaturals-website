import React from 'react';
import { CONCERN_LIST, PRODUCTS } from '../data/products';
import { SkinOrHairConcern } from '../types';

interface ShopByConcernProps {
  selectedConcern: string | null;
  onSelectConcern: (concern: SkinOrHairConcern | null) => void;
}

export const ShopByConcern: React.FC<ShopByConcernProps> = ({
  selectedConcern,
  onSelectConcern
}) => {
  return (
    <section className="py-7 sm:py-14 bg-botanical-ivory border-b border-warm-sand/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sage-green/15 text-deep-forest text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-1.5 sm:mb-2.5">
            Targeted Botanical Solutions
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-deep-forest font-normal">
            Shop by Concern
          </h2>
          <p className="font-sans text-xs sm:text-sm text-charcoal/70 mt-1 sm:mt-1.5">
            Chettinad botanical formulations curated to resolve your specific skin and hair goals.
          </p>
        </div>

        {/* Concern Strip: Compact Horizontal Reel on Mobile, Clean 7-Col Grid on Desktop */}
        <div className="flex sm:grid gap-2 sm:gap-3.5 overflow-x-auto pb-2 sm:pb-0 sm:grid-cols-7 no-scrollbar scroll-smooth snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
          {CONCERN_LIST.map((concern) => {
            const isSelected = selectedConcern === concern.id;
            const botanicalCount = PRODUCTS.filter((p) => p.concerns.includes(concern.id)).length;

            return (
              <button
                key={concern.id}
                onClick={() => {
                  onSelectConcern(isSelected ? null : (concern.id as SkinOrHairConcern));
                  const el = document.getElementById('bestsellers');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`relative flex flex-col items-center w-[108px] sm:w-auto flex-shrink-0 sm:flex-shrink snap-start p-2.5 sm:p-4 rounded-2xl transition-all text-center group border ${
                  isSelected
                    ? 'bg-deep-forest text-botanical-ivory border-deep-forest shadow-botanical scale-[1.02] sm:scale-105'
                    : 'bg-soft-white text-deep-forest border-warm-sand/60 hover:border-champagne-gold hover:shadow-botanical'
                }`}
              >
                {/* Visual Rounded Detailed Botanical Image Circle */}
                <div 
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-1.5 sm:mb-2.5 p-0.5 border-2 transition-all duration-300 group-hover:scale-105 shadow-xs ${
                    isSelected 
                      ? 'border-champagne-gold ring-2 ring-champagne-gold/50 bg-champagne-gold/20' 
                      : 'border-warm-sand bg-white group-hover:border-champagne-gold'
                  }`}
                >
                  <img 
                    src={concern.image} 
                    alt={concern.name}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>

                {/* Concern Title */}
                <h3 className={`font-serif font-bold text-xs sm:text-sm mb-0.5 sm:mb-1 line-clamp-1 ${
                  isSelected ? 'text-botanical-ivory' : 'text-deep-forest'
                }`}>
                  {concern.name}
                </h3>

                {/* Subtitle / Tagline */}
                <p className={`font-sans text-[9px] sm:text-[11px] line-clamp-1 sm:line-clamp-2 ${
                  isSelected ? 'text-botanical-ivory/80' : 'text-charcoal/60'
                }`}>
                  {concern.tagline}
                </p>

                {/* Count Badge */}
                <span className={`mt-1.5 sm:mt-2 text-[8px] sm:text-[10px] font-semibold px-1.5 py-0.5 sm:px-2 rounded-full ${
                  isSelected 
                    ? 'bg-champagne-gold/30 text-champagne-gold' 
                    : 'bg-warm-sand/30 text-sage-green'
                }`}>
                  {botanicalCount} Botanicals
                </span>
              </button>
            );
          })}
        </div>

        {/* Clear Filter button if one is selected */}
        {selectedConcern && (
          <div className="mt-4 sm:mt-6 text-center">
            <button
              onClick={() => onSelectConcern(null)}
              className="text-xs font-semibold text-deep-forest underline hover:text-sage-green"
            >
              Showing results for "{selectedConcern}" — Click to clear filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
