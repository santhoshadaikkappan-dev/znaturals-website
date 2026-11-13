import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, X, Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string | null;
  selectedConcern: string | null;
  searchQuery: string;
  onClearFilters: () => void;
  onOpenAiAdvisor: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  selectedConcern,
  searchQuery,
  onClearFilters,
  onOpenAiAdvisor
}) => {
  const hasActiveFilters = Boolean(selectedCategory || selectedConcern || searchQuery);

  return (
    <section id="bestsellers" className="py-12 sm:py-16 bg-botanical-ivory">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Heading - Centered "Bestsellers" Matching Image 1 */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#7A622A] font-bold tracking-tight">
            Bestsellers
          </h2>
          <p className="font-sans text-xs sm:text-sm text-charcoal/70 mt-1 max-w-xl mx-auto">
            Pure botanical formulations curated for natural beauty & daily wellness.
          </p>

          {/* Active Filter Indicators */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-2">
              <span className="text-xs text-charcoal/60 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-sage-green" /> Filtered by:
              </span>

              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-deep-forest text-botanical-ivory text-xs font-medium">
                  {selectedCategory}
                </span>
              )}

              {selectedConcern && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sage-green text-white text-xs font-medium">
                  {selectedConcern}
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-warm-sand text-charcoal text-xs font-medium">
                  "{searchQuery}"
                </span>
              )}

              <button
                onClick={onClearFilters}
                className="text-xs font-semibold text-deep-forest underline hover:text-sage-green ml-1 flex items-center gap-0.5"
              >
                <X className="w-3 h-3" /> Clear All
              </button>
            </div>
          )}
        </div>

        {/* 
          CRITICAL REQUIREMENT (Image 4):
          Exact 2-column layout on mobile, 3-4 columns on tablet & desktop
        */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="bg-soft-white rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto border border-warm-sand shadow-sm my-6">
            <div className="w-14 h-14 rounded-full bg-botanical-ivory flex items-center justify-center mx-auto mb-3 text-sage-green">
              <Sparkles className="w-7 h-7 text-champagne-gold" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-deep-forest mb-2">
              No matching botanical found
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/70 mb-5">
              We couldn't find any formulation matching your current filters. 
              Let our AI advisor match the right herbal solution for you!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                onClick={onClearFilters}
                className="px-4 py-2 rounded-xl bg-warm-sand/50 text-deep-forest text-xs font-semibold hover:bg-warm-sand transition-all"
              >
                Reset All Filters
              </button>
              <button
                onClick={onOpenAiAdvisor}
                className="px-4 py-2 rounded-xl bg-deep-forest text-botanical-ivory text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
                Ask AI Advisor
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
