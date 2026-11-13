import React from 'react';
import { Product } from '../types';
import { Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setActiveProductModal, isPincodeEligible, customerPincode } = useStore();

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="botanical-card rounded-2xl overflow-hidden flex flex-col group relative">
      
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {product.badge && (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-deep-forest text-botanical-ivory shadow-sm">
            {product.badge}
          </span>
        )}
        <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold bg-champagne-gold/20 text-deep-forest border border-champagne-gold/40 backdrop-blur-sm">
          {discountPercent}% OFF
        </span>
      </div>

      {/* Image Container with Hover Zoom & Quick View */}
      <div 
        onClick={() => setActiveProductModal(product)}
        className="relative aspect-square overflow-hidden bg-warm-sand/20 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-deep-forest/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveProductModal(product);
            }}
            className="px-4 py-2 rounded-full bg-soft-white/95 text-deep-forest font-semibold text-xs flex items-center gap-2 shadow-lg hover:bg-white transition-all transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5 text-champagne-gold" />
            <span>Quick View & Details</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Volume */}
          <div className="flex items-center justify-between text-xs text-charcoal/60 mb-1">
            <span className="uppercase font-semibold tracking-wider text-sage-green">
              {product.category}
            </span>
            <span className="font-medium">{product.volume}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setActiveProductModal(product)}
            className="font-serif font-bold text-lg text-deep-forest group-hover:text-sage-green transition-colors cursor-pointer line-clamp-1 leading-snug"
          >
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="font-sans text-xs text-charcoal/70 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>

          {/* Ratings & Concern Badge */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="text-xs font-bold text-amber-900">{product.rating}</span>
            </div>
            <span className="text-[11px] text-charcoal/50">({product.reviewCount})</span>
            
            {/* Primary Concern pill */}
            <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full bg-sage-green/10 text-sage-green truncate max-w-[110px]">
              {product.concerns[0]}
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-warm-sand/40">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-sans font-extrabold text-lg sm:text-xl text-deep-forest">
              ₹{product.price}
            </span>
            <span className="font-sans text-xs text-charcoal/40 line-through">
              ₹{product.originalPrice}
            </span>
            <span className="text-[10px] font-bold text-emerald-700 ml-auto bg-emerald-50 px-1.5 py-0.5 rounded">
              Save ₹{product.originalPrice - product.price}
            </span>
          </div>

          {/* Karaikudi COD Micro-indicator */}
          <div className="text-[10px] text-charcoal/60 mb-2.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>Free COD to Karaikudi ({customerPincode || '630001'})</span>
          </div>

          {/* Full-width Add to Cart Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full py-2.5 px-4 rounded-xl bg-deep-forest text-botanical-ivory font-sans font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-deep-forest-dark active:scale-[0.98] transition-all shadow-sm group/btn"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-champagne-gold group-hover/btn:scale-110 transition-transform" />
            <span>Add to Cart</span>
          </button>
        </div>

      </div>

    </div>
  );
};
