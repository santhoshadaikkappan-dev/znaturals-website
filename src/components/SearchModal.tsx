import React, { useState } from 'react';
import { X, Search, Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchTagline = p.tagline.toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        const matchConcern = p.concerns.some((c) => c.toLowerCase().includes(q));
        const matchIngredient = p.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(q) || ing.botanicalSource.toLowerCase().includes(q)
        );
        return matchName || matchTagline || matchCategory || matchConcern || matchIngredient;
      })
    : PRODUCTS.slice(0, 3); // Quick suggestions if empty

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-soft-white rounded-3xl max-w-2xl w-full shadow-2xl border border-warm-sand overflow-hidden z-10">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-warm-sand flex items-center gap-3 bg-botanical-ivory">
          <Search className="w-5 h-5 text-deep-forest flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search botanicals, ingredients (e.g. Saffron, Bhringraj, Acne)..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-deep-forest placeholder-charcoal/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-deep-forest hover:bg-warm-sand/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-sage-green px-1">
            {query.trim() ? `Search Results (${results.length})` : 'Popular Botanical Formulations:'}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-8 text-xs text-charcoal/60">
              No botanical formulation found for "{query}". Try searching "serum", "hair", or "turmeric".
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-botanical-ivory transition-colors cursor-pointer border border-transparent hover:border-warm-sand group"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 rounded-xl object-cover border border-warm-sand flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-sage-green">
                      {product.category}
                    </span>
                    <span className="text-[10px] text-charcoal/40">•</span>
                    <span className="text-[10px] text-charcoal/60">{product.volume}</span>
                  </div>

                  <h4 className="font-serif font-bold text-sm text-deep-forest group-hover:text-sage-green transition-colors truncate">
                    {product.name}
                  </h4>

                  <p className="text-[11px] text-charcoal/60 truncate">
                    {product.tagline}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-sm text-deep-forest">₹{product.price}</div>
                  <span className="text-[10px] text-champagne-gold font-semibold group-hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
