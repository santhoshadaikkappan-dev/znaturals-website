import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, X, Sparkles, ChevronRight } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string | null;
  selectedConcern: string | null;
  searchQuery: string;
  onClearFilters: () => void;
  onOpenAiAdvisor: () => void;
}

// Vilvah-style subcategory visual pills (Image 2)
const QUICK_SUBCATEGORIES = [
  { name: 'Face Serums', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80' },
  { name: 'Nourishing Creams', image: 'https://images.unsplash.com/photo-1608248597359-28192a549646?auto=format&fit=crop&w=200&q=80' },
  { name: 'Herbal Shampoos', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=200&q=80' },
  { name: 'Hair Elixirs', image: 'https://images.unsplash.com/photo-1608248597359-28192a549646?auto=format&fit=crop&w=200&q=80' },
  { name: 'Body Lotions', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=200&q=80' },
  { name: 'Bath Ubtans', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=200&q=80' },
];

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
        
        {/* Vilvah-Style Circular Subcategory Pills Strip (Image 2) */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar justify-start md:justify-center">
            {QUICK_SUBCATEGORIES.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center flex-shrink-0 group cursor-pointer">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden p-1 bg-gradient-to-b from-[#8CA062]/30 to-warm-sand/40 border border-[#8CA062]/40 group-hover:scale-105 transition-all shadow-sm">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="mt-2 px-3 py-1 rounded-full border border-warm-sand bg-white group-hover:border-[#8CA062] group-hover:bg-[#8CA062] group-hover:text-white transition-all text-[11px] sm:text-xs font-semibold text-charcoal/80 flex items-center gap-1 shadow-2xs">
                  <span>{item.name}</span>
                  <ChevronRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Heading matching Vilvah Typography (Image 1) */}
        <div className="text-center mb-8">
          <h2 className="font-vilvah text-3xl sm:text-4xl md:text-5xl text-[#957B38] font-bold tracking-tight">
            Bestsellers
          </h2>
          <p className="font-sans text-xs sm:text-sm text-charcoal/70 mt-1 max-w-md mx-auto">
            Pure botanical formulas loved for radiant skin and healthy, strong hair.
          </p>
        </div>

        {/* Active Filter Pills and Clear button */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6 p-3 bg-white/70 rounded-2xl border border-warm-sand/50">
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

        {/* Product Cards Grid: Exactly 2 Columns on Mobile (Image 4), 3 on Tablet, 4 on Desktop */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="bg-soft-white rounded-3xl p-10 text-center max-w-lg mx-auto border border-warm-sand shadow-sm my-6">
            <div className="w-14 h-14 rounded-full bg-botanical-ivory flex items-center justify-center mx-auto mb-3 text-sage-green">
              <Sparkles className="w-7 h-7 text-champagne-gold" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-deep-forest mb-2">
              No matching botanical found
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/70 mb-5">
              We couldn't find any formulation matching your current filters. 
              Let our AI advisor match the right herbal solution for you!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
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
