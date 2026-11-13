import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Check, 
  MapPin, 
  Truck, 
  Sparkles, 
  Leaf, 
  ShieldCheck, 
  Clock, 
  Plus, 
  Minus 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose
}) => {
  const { 
    addToCart, 
    customerPincode, 
    verifyPincode, 
    isPincodeEligible,
    setIsCartOpen 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'ingredients' | 'benefits' | 'howToUse'>('ingredients');
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState<string>('');
  const [inputPincode, setInputPincode] = useState(customerPincode);
  const [pincodeFeedback, setPincodeFeedback] = useState<string | null>(null);

  // Sync state when product opens
  React.useEffect(() => {
    if (product) {
      setSelectedImg(product.image);
      setQuantity(1);
      setInputPincode(customerPincode);
      setPincodeFeedback(null);
    }
  }, [product, customerPincode]);

  if (!product) return null;

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const res = verifyPincode(inputPincode);
    setPincodeFeedback(res.message);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onClose();
    setIsCartOpen(true);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-soft-white rounded-3xl max-w-4xl w-full shadow-2xl border border-warm-sand overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-botanical-ivory/80 text-deep-forest hover:bg-deep-forest hover:text-white transition-colors"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Product Imagery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-warm-sand/20 border border-warm-sand/60">
                <img
                  src={selectedImg || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />

                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-deep-forest text-botanical-ivory shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnail Selector */}
              {product.secondaryImage && (
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedImg(product.image)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImg === product.image ? 'border-deep-forest scale-105' : 'border-warm-sand/50 opacity-70'
                    }`}
                  >
                    <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
                  </button>
                  <button
                    onClick={() => setSelectedImg(product.secondaryImage!)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImg === product.secondaryImage ? 'border-deep-forest scale-105' : 'border-warm-sand/50 opacity-70'
                    }`}
                  >
                    <img src={product.secondaryImage} alt="Thumbnail 2" className="w-full h-full object-cover" />
                  </button>
                </div>
              )}

              {/* Highlights Pill */}
              <div className="p-3.5 rounded-xl bg-botanical-ivory border border-warm-sand/70 text-xs text-charcoal/80 space-y-1">
                <div className="font-bold text-deep-forest flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                  <Leaf className="w-3.5 h-3.5 text-sage-green" /> Botanical Highlights:
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.botanicalHighlights.map((hl, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-warm-sand text-[11px] text-deep-forest">
                      {hl}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Product Details & Purchase Actions */}
            <div className="space-y-5">
              
              {/* Category, Volume, Rating */}
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sage-green">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>{product.volume}</span>
                </div>

                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-deep-forest mt-1 leading-tight">
                  {product.name}
                </h2>

                <p className="font-sans text-xs text-charcoal/70 mt-1">
                  {product.tagline}
                </p>

                {/* Star rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold text-amber-900">{product.rating}</span>
                  </div>
                  <span className="text-xs text-charcoal/60">({product.reviewCount} customer reviews)</span>
                  <span className="text-xs text-emerald-700 font-semibold ml-2">✓ Verified Botanical</span>
                </div>
              </div>

              {/* Price & Savings */}
              <div className="p-3.5 rounded-xl bg-botanical-ivory/60 border border-warm-sand/50 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-deep-forest font-sans">
                  ₹{product.price}
                </span>
                <span className="text-sm text-charcoal/40 line-through font-sans">
                  ₹{product.originalPrice}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                  {discountPercent}% OFF (Save ₹{product.originalPrice - product.price})
                </span>
                <span className="ml-auto text-[11px] text-charcoal/50">Incl. all taxes</span>
              </div>

              {/* Short Description & Suitability */}
              <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans">
                {product.shortDescription}
              </p>
              
              <div className="text-xs text-sage-green font-medium bg-sage-green/10 p-2.5 rounded-lg border border-sage-green/20">
                <strong>Recommended for:</strong> {product.targetType}
              </div>

              {/* Karaikudi Pincode Verification Widget */}
              <div className="p-3.5 rounded-xl border border-warm-sand bg-soft-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-deep-forest flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sage-green" />
                    Check Karaikudi Free COD Delivery:
                  </span>
                  <span className="text-[10px] text-champagne-gold font-bold uppercase">
                    Daily 8 AM – 4 PM
                  </span>
                </div>

                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    value={inputPincode}
                    maxLength={6}
                    onChange={(e) => setInputPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit Pincode (e.g. 630001)"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-warm-sand text-xs font-mono focus:outline-none focus:ring-1 focus:ring-deep-forest"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-deep-forest text-botanical-ivory text-xs font-bold hover:bg-deep-forest-dark"
                  >
                    Verify
                  </button>
                </form>

                {/* Validation Feedback */}
                {pincodeFeedback && (
                  <div className={`p-2 rounded-lg text-xs font-medium flex items-start gap-1.5 ${
                    isPincodeEligible
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border border-amber-200'
                  }`}>
                    <Truck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{pincodeFeedback}</span>
                  </div>
                )}
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-warm-sand rounded-xl bg-botanical-ivory">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2.5 text-deep-forest hover:bg-warm-sand/40 rounded-l-xl transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-deep-forest font-sans">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2.5 text-deep-forest hover:bg-warm-sand/40 rounded-r-xl transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-4 rounded-xl bg-deep-forest text-botanical-ivory font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-deep-forest-dark active:scale-[0.98] transition-all shadow-botanical"
                  >
                    <ShoppingBag className="w-4 h-4 text-champagne-gold" />
                    <span>Add to Cart • ₹{product.price * quantity}</span>
                  </button>
                </div>

                {/* Buy Now / Quick Free COD Checkout */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-2.5 px-4 rounded-xl bg-sage-green text-white font-sans font-semibold text-xs uppercase tracking-wider hover:bg-sage-light transition-all shadow-sm"
                >
                  ⚡ Instant Checkout with Free Karaikudi COD
                </button>
              </div>

            </div>

          </div>

          {/* Vilvah-Style Structured Tabs: Ingredients, Benefits, How to Use */}
          <div className="mt-10 pt-6 border-t border-warm-sand">
            {/* Tabs Header */}
            <div className="flex border-b border-warm-sand/60 gap-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${
                  activeTab === 'ingredients'
                    ? 'text-deep-forest border-b-2 border-deep-forest font-extrabold'
                    : 'text-charcoal/60 hover:text-deep-forest'
                }`}
              >
                1. Botanical Ingredients
              </button>

              <button
                onClick={() => setActiveTab('benefits')}
                className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${
                  activeTab === 'benefits'
                    ? 'text-deep-forest border-b-2 border-deep-forest font-extrabold'
                    : 'text-charcoal/60 hover:text-deep-forest'
                }`}
              >
                2. Proven Benefits
              </button>

              <button
                onClick={() => setActiveTab('howToUse')}
                className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${
                  activeTab === 'howToUse'
                    ? 'text-deep-forest border-b-2 border-deep-forest font-extrabold'
                    : 'text-charcoal/60 hover:text-deep-forest'
                }`}
              >
                3. How to Use
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-6">
              {/* Tab 1: Botanical Ingredients */}
              {activeTab === 'ingredients' && (
                <div className="space-y-4 animate-fadeIn">
                  <p className="text-xs text-charcoal/70">
                    Every ingredient is consciously chosen for purity, biocompatibility, and traditional Chettinad herbal efficacy.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.ingredients.map((ing, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-botanical-ivory/60 border border-warm-sand/60 text-xs">
                        <div className="font-serif font-bold text-deep-forest text-sm">{ing.name}</div>
                        <div className="text-[11px] font-mono text-sage-green italic mt-0.5">({ing.botanicalSource})</div>
                        <p className="text-charcoal/75 mt-1.5 leading-relaxed">{ing.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Benefits */}
              {activeTab === 'benefits' && (
                <div className="space-y-3 animate-fadeIn">
                  <p className="text-xs text-charcoal/70 mb-4">
                    Clinically tested and traditionally cherished results you can see and feel:
                  </p>
                  <div className="grid grid-cols-1 gap-2.5">
                    {product.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-botanical-ivory/40 border border-warm-sand/40">
                        <span className="w-5 h-5 rounded-full bg-deep-forest/10 text-deep-forest flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-deep-forest" />
                        </span>
                        <span className="text-xs sm:text-sm text-charcoal/90 leading-snug">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: How to Use */}
              {activeTab === 'howToUse' && (
                <div className="space-y-4 animate-fadeIn">
                  <p className="text-xs text-charcoal/70">
                    Follow this recommended ritual for maximum botanical potency and deep skin absorption:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {product.howToUse.map((step) => (
                      <div key={step.step} className="p-4 rounded-xl bg-botanical-ivory/60 border border-warm-sand/60 relative">
                        <div className="w-7 h-7 rounded-full bg-deep-forest text-botanical-ivory font-serif font-bold text-xs flex items-center justify-center mb-2">
                          {step.step}
                        </div>
                        <h4 className="font-serif font-bold text-deep-forest text-sm mb-1">{step.title}</h4>
                        <p className="text-xs text-charcoal/75 leading-relaxed">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
