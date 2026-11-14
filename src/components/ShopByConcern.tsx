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
    <section className="py-16 bg-botanical-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-green/15 text-deep-forest text-xs font-semibold tracking-wider uppercase mb-3">
            Targeted Botanical Solutions
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-deep-forest font-normal">
            Shop by Concern
          </h2>
          <p className="font-sans text-sm text-charcoal/70 mt-2">
            Chettinad botanical formulations curated to resolve your specific skin and hair goals.
          </p>
        </div>

        {/* Concern Circular Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
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
                className={`relative flex flex-col items-center p-4 rounded-2xl transition-all text-center group border ${
                  isSelected
                    ? 'bg-deep-forest text-botanical-ivory border-deep-forest shadow-botanical scale-105'
                    : 'bg-soft-white text-deep-forest border-warm-sand/60 hover:border-champagne-gold hover:shadow-botanical'
                }`}
              >
                {/* Visual Rounded Icon Circle */}
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-2.5 text-2xl transition-transform group-hover:scale-110 ${
                    isSelected 
                      ? 'bg-botanical-ivory/20 text-champagne-gold' 
                      : 'bg-botanical-ivory text-deep-forest border border-warm-sand'
                  }`}
                >
                  <span>{concern.icon}</span>
                </div>

                {/* Concern Title */}
                <h3 className={`font-serif font-bold text-sm mb-1 line-clamp-1 ${
                  isSelected ? 'text-botanical-ivory' : 'text-deep-forest'
                }`}>
                  {concern.name}
                </h3>

                {/* Subtitle / Tagline */}
                <p className={`font-sans text-[11px] line-clamp-2 ${
                  isSelected ? 'text-botanical-ivory/80' : 'text-charcoal/60'
                }`}>
                  {concern.tagline}
                </p>

                {/* Count Badge */}
                <span className={`mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
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
          <div className="mt-6 text-center">
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
