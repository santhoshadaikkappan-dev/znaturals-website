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
    <section id="bestsellers" className="py-16 bg-botanical-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Filter Indicators */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-warm-sand/60 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-gold/20 text-deep-forest text-xs font-bold uppercase tracking-wider mb-2">
              Bestselling Botanical Formulations
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-deep-forest font-normal">
              Our Signature Collection
            </h2>
            <p className="font-sans text-xs sm:text-sm text-charcoal/70 mt-1">
              Handcrafted in small batches using traditional Chettinad botanical methods.
            </p>
          </div>

          {/* Active Filter Pills and Clear button */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-charcoal/60 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-sage-green" /> Filtered by:
              </span>

              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-deep-forest text-botanical-ivory text-xs font-medium">
                  {selectedCategory}
                </span>
              )}

              {selectedConcern && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sage-green text-white text-xs font-medium">
                  {selectedConcern}
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-warm-sand text-charcoal text-xs font-medium">
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

        {/* Product Cards Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="bg-soft-white rounded-3xl p-12 text-center max-w-lg mx-auto border border-warm-sand shadow-sm my-8">
            <div className="w-16 h-16 rounded-full bg-botanical-ivory flex items-center justify-center mx-auto mb-4 text-sage-green">
              <Sparkles className="w-8 h-8 text-champagne-gold" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-deep-forest mb-2">
              No matching botanical found
            </h3>
            <p className="text-sm text-charcoal/70 mb-6">
              We couldn't find any formulation matching your current filters. 
              Let our AI advisor match the right herbal solution for you!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onClearFilters}
                className="px-5 py-2.5 rounded-xl bg-warm-sand/50 text-deep-forest text-xs font-semibold hover:bg-warm-sand transition-all"
              >
                Reset All Filters
              </button>
              <button
                onClick={onOpenAiAdvisor}
                className="px-5 py-2.5 rounded-xl bg-deep-forest text-botanical-ivory text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
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
