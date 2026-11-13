import React from 'react';
import { Product } from '../types';
import { Star, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setActiveProductModal } = useStore();

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  // Vilvah-style badge color coding
  const getBadgeStyle = () => {
    switch (product.badge) {
      case 'Bestseller':
        return 'bg-[#DF9B35] text-white'; // Warm mustard/orange like "Viral Serum"
      case 'New Launch':
        return 'bg-[#825227] text-white'; // Cocoa brown like "New Launch"
      case 'Customer Favorite':
        return 'bg-[#F26422] text-white'; // Coral orange like "GenZ Favourite"
      case 'Pure Botanical':
      default:
        return 'bg-[#8CA062] text-white'; // Sage green like "FLAT 20% off"
    }
  };

  return (
    <div className="bg-soft-white rounded-2xl overflow-hidden flex flex-col justify-between border border-warm-sand/60 hover:border-champagne-gold hover:shadow-botanical transition-all duration-300 group">
      
      {/* Product Image Container (Vilvah Square Rounded) */}
      <div 
        onClick={() => setActiveProductModal(product)}
        className="relative aspect-square w-full overflow-hidden bg-[#F7F4EE] cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top-Left Vilvah Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className={`px-2 py-0.5 rounded-sm text-[10px] sm:text-[11px] font-bold tracking-wide uppercase shadow-sm ${getBadgeStyle()}`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center p-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveProductModal(product);
            }}
            className="px-3.5 py-1.5 rounded-full bg-white/95 text-deep-forest font-semibold text-xs flex items-center gap-1.5 shadow-md hover:bg-white transition-all transform translate-y-1 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5 text-champagne-gold" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Section (Exact Vilvah Mobile Sizing) */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Star Rating Line */}
          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-charcoal/80 mb-1">
            <Star className="w-3.5 h-3.5 fill-[#ECA43B] text-[#ECA43B]" />
            <span className="font-bold">{product.rating}</span>
            <span className="text-[10px] sm:text-[11px] text-charcoal/50">
              ({product.reviewCount} Ratings)
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setActiveProductModal(product)}
            className="font-sans font-bold text-xs sm:text-sm text-charcoal group-hover:text-[#66765C] transition-colors cursor-pointer line-clamp-1 leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Subtitle / Key Benefit */}
          <p className="font-sans text-[10px] sm:text-xs text-charcoal/60 line-clamp-1 mt-0.5 leading-snug">
            {product.tagline}
          </p>
        </div>

        {/* Price & Add To Cart Button */}
        <div className="mt-2 pt-2 border-t border-warm-sand/30">
          <div className="flex items-baseline gap-1.5 mb-2 font-sans">
            <span className="font-extrabold text-sm sm:text-base text-charcoal">
              ₹{product.price}
            </span>
            <span className="text-[11px] sm:text-xs text-charcoal/40 line-through">
              ₹{product.originalPrice}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded ml-auto">
              {discountPercent}% OFF
            </span>
          </div>

          {/* Vilvah Solid Green Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#8CA062] hover:bg-[#788C4E] active:scale-[0.98] text-white font-sans font-bold text-[11px] sm:text-xs tracking-wide transition-all shadow-sm flex items-center justify-center cursor-pointer"
          >
            Add To Cart
          </button>
        </div>

      </div>

    </div>
  );
};
