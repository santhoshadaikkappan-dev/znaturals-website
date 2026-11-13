import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Truck, 
  MapPin, 
  ArrowRight, 
  Scale, 
  Navigation,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { requestBrowserGeolocation } from '../utils/geolocation';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartTotal,
    cartTotalWeightFormatted,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    customerPincode,
    setCustomerPincode,
    setCustomerCity,
    setCustomerState,
    deliveryInfo,
    verifyPincode,
    setIsCheckoutOpen,
    showToast
  } = useStore();

  const [inputPincode, setInputPincode] = useState(customerPincode);
  const [isLocating, setIsLocating] = useState(false);

  if (!isCartOpen) return null;

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyPincode(inputPincode);
  };

  const handleDetectGps = async () => {
    setIsLocating(true);
    try {
      const loc = await requestBrowserGeolocation();
      if (loc.pincode) {
        setInputPincode(loc.pincode);
        verifyPincode(loc.pincode);
      }
      if (loc.city) setCustomerCity(loc.city);
      if (loc.state) setCustomerState(loc.state);
      showToast(`📍 Location: ${loc.city} (${loc.pincode})`);
    } catch (err: any) {
      showToast(err.message || "Could not detect location.");
    } finally {
      setIsLocating(false);
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const shippingFee = deliveryInfo.shippingFee;
  const grandTotal = cartTotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-soft-white shadow-2xl flex flex-col border-l border-warm-sand">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-warm-sand/60 bg-botanical-ivory flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-deep-forest" />
              <h2 className="font-editorial font-bold text-xl text-deep-forest">
                Your Botanical Bag
              </h2>
              <span className="text-xs bg-deep-forest/10 text-deep-forest font-bold px-2 py-0.5 rounded-full font-mono">
                {cartCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-deep-forest hover:bg-warm-sand/50 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Location & Pincode Checker Strip */}
          <div className="px-4 py-3 bg-warm-sand/20 border-b border-warm-sand/40 space-y-2">
            <form onSubmit={handlePincodeSubmit} className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sage-green flex-shrink-0" />
              <input
                type="text"
                maxLength={6}
                value={inputPincode}
                onChange={(e) => setInputPincode(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter Pincode (e.g. 630001)"
                className="flex-1 text-xs bg-white px-2.5 py-1.5 rounded-lg border border-warm-sand font-mono focus:outline-none focus:ring-1 focus:ring-deep-forest"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-deep-forest text-botanical-ivory text-xs font-semibold rounded-lg hover:bg-deep-forest-dark"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={handleDetectGps}
                disabled={isLocating}
                className="p-1.5 rounded-lg border border-warm-sand bg-white text-deep-forest hover:bg-warm-sand/30"
                title="Detect my current location via GPS"
              >
                <Navigation className={`w-3.5 h-3.5 text-sage-green ${isLocating ? 'animate-spin' : ''}`} />
              </button>
            </form>

            {/* Delivery Info Feedback Badge */}
            <div className="text-[11px]">
              {deliveryInfo.isKaraikudi ? (
                <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span><strong>Zone A: Karaikudi Local</strong> • FREE Delivery (8 AM – 4 PM)</span>
                </div>
              ) : (
                <div className="flex items-center justify-between text-blue-900 font-medium bg-blue-50/80 px-2 py-1 rounded-md border border-blue-200">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>Zone B Courier ({deliveryInfo.totalWeightFormatted})</span>
                  </div>
                  <span className="font-bold font-mono">
                    {shippingFee === 0 ? 'FREE' : `+₹${shippingFee}`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-botanical-ivory border border-warm-sand flex items-center justify-center mx-auto text-sage-green">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-editorial font-bold text-xl text-deep-forest">
                  Your bag is empty
                </h3>
                <p className="text-xs text-charcoal/70 max-w-xs mx-auto">
                  Explore our pure botanical formulas cold-pressed for natural radiance.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-deep-forest text-botanical-ivory text-xs font-bold uppercase tracking-wider hover:bg-deep-forest-dark"
                >
                  Explore Bestsellers
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-2xl bg-botanical-ivory/50 border border-warm-sand/50"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-warm-sand flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-xs sm:text-sm text-deep-forest leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-charcoal/40 hover:text-red-600 p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-charcoal/60 mt-0.5">
                        {item.product.volume} • {item.product.weightGrams}g • ₹{item.product.price} each
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-warm-sand rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-deep-forest hover:bg-botanical-ivory"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs text-deep-forest">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-deep-forest hover:bg-botanical-ivory"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total for this line */}
                      <span className="font-bold text-sm text-deep-forest font-sans">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>

                  </div>

                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-warm-sand/60 bg-botanical-ivory space-y-3">
              
              {/* Cost & Weight Summary */}
              <div className="space-y-1.5 text-xs text-charcoal/80">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-semibold text-deep-forest">₹{cartTotal}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <Scale className="w-3 h-3 text-sage-green" /> Total Weight:
                  </span>
                  <span className="font-mono font-medium text-deep-forest">{cartTotalWeightFormatted}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Delivery ({deliveryInfo.isKaraikudi ? 'Karaikudi Local' : 'Courier Slab'}):</span>
                  <span className="font-bold text-emerald-800 font-mono">
                    {shippingFee === 0 ? 'FREE' : `+₹${shippingFee}`}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm font-bold text-deep-forest pt-2 border-t border-warm-sand/50">
                  <span>Total Payable:</span>
                  <span className="text-base font-extrabold text-deep-forest font-sans">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-deep-forest text-botanical-ivory font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-deep-forest-dark active:scale-[0.98] transition-all shadow-botanical"
              >
                <span>
                  Proceed to Checkout • ₹{grandTotal}
                </span>
                <ArrowRight className="w-4 h-4 text-champagne-gold" />
              </button>

              <p className="text-[10px] text-center text-charcoal/60">
                Supports Cash on Delivery, GPay, PhonePe, Paytm & Cards
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
