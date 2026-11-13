import React from 'react';
import { Product } from '../types';
import { Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setActiveProductModal } = useStore();

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  // Vilvah-style badge color coding as shown in Image 1 & 4
  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'Bestseller':
        return 'bg-amber-600 text-white';
      case 'New Launch':
        return 'bg-[#705B49] text-white';
      case 'Customer Favorite':
        return 'bg-[#E05A3E] text-white';
      case 'Pure Botanical':
        return 'bg-[#66765C] text-white';
      default:
        return 'bg-deep-forest text-botanical-ivory';
    }
  };

  return (
    <div className="bg-soft-white rounded-2xl overflow-hidden flex flex-col border border-warm-sand/60 hover:border-champagne-gold hover:shadow-botanical transition-all duration-300 group">
      
      {/* Top Image Container */}
      <div 
        onClick={() => setActiveProductModal(product)}
        className="relative aspect-square overflow-hidden bg-warm-sand/20 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges (Matching Vilvah Store Image 1 & Image 4) */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none gap-1">
          {product.badge && (
            <span className={`px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold tracking-tight shadow-sm ${getBadgeStyle(product.badge)}`}>
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-[#8CA174] text-white shadow-sm">
              FLAT {discountPercent}% off
            </span>
          )}
        </div>
      </div>

      {/* Card Body - Proportions strictly tuned for 2-column mobile and desktop */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Star rating (Matching Image 1 & 4: ★ 4.8 (2621 Ratings)) */}
          <div className="flex items-center gap-1 text-[11px] sm:text-xs text-charcoal/70 mb-1">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-500 text-amber-500" />
            <span className="font-bold text-charcoal">{product.rating}</span>
            <span className="text-charcoal/50 text-[10px] sm:text-xs">
              ({product.reviewCount})
            </span>
          </div>

          {/* Product Title (2-line clamp, clean Vilvah font) */}
          <h3 
            onClick={() => setActiveProductModal(product)}
            className="font-bold text-xs sm:text-sm text-deep-forest group-hover:text-sage-green transition-colors cursor-pointer line-clamp-2 leading-snug min-h-[2rem] sm:min-h-[2.5rem]"
          >
            {product.name}
          </h3>

          {/* Subtitle / Short Benefit Line (Matching "Fades Dark Spots In 4 Weeks" in Image 1 & 4) */}
          <p className="text-[10px] sm:text-xs text-charcoal/60 line-clamp-1 mt-0.5 sm:mt-1">
            {product.benefits[0] || product.tagline}
          </p>
        </div>

        {/* Pricing & Add To Cart Button */}
        <div className="mt-2 sm:mt-3 pt-2 border-t border-warm-sand/30">
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="font-sans font-extrabold text-sm sm:text-base text-deep-forest">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-[10px] sm:text-xs text-charcoal/40 line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded hidden sm:inline">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          {/* Full-width Vilvah-style Olive Sage Green Button (Matching Image 1 & 4) */}
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-[#8CA174] hover:bg-[#7D9366] active:scale-[0.98] text-white font-sans font-bold text-xs sm:text-sm transition-all shadow-sm text-center"
          >
            Add To Cart
          </button>
        </div>

      </div>

    </div>
  );
};
