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
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    customerPincode,
    verifyPincode,
    isPincodeEligible,
    setIsCheckoutOpen,
    addToWaitlist
  } = useStore();

  const [inputPincode, setInputPincode] = useState(customerPincode);
  const [waitlistPhone, setWaitlistPhone] = useState('');
  const [waitlistSent, setWaitlistSent] = useState(false);

  if (!isCartOpen) return null;

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyPincode(inputPincode);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistPhone.trim()) return;
    addToWaitlist(waitlistPhone, inputPincode);
    setWaitlistSent(true);
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

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
              <h2 className="font-serif font-bold text-xl text-deep-forest">
                Your Botanical Bag
              </h2>
              <span className="text-xs bg-deep-forest/10 text-deep-forest font-bold px-2 py-0.5 rounded-full">
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

          {/* Delivery Eligibility Strip */}
          <div className="px-4 py-3 bg-warm-sand/20 border-b border-warm-sand/40">
            <form onSubmit={handlePincodeSubmit} className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sage-green flex-shrink-0" />
              <div className="flex-1">
                <input
                  type="text"
                  maxLength={6}
                  value={inputPincode}
                  onChange={(e) => setInputPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Karaikudi Pincode"
                  className="w-full text-xs bg-white px-2.5 py-1.5 rounded border border-warm-sand focus:outline-none focus:ring-1 focus:ring-deep-forest"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-deep-forest text-botanical-ivory text-xs font-semibold rounded hover:bg-deep-forest-dark"
              >
                Check
              </button>
            </form>

            <div className="mt-2 text-[11px]">
              {isPincodeEligible ? (
                <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Eligible for <strong>FREE Karaikudi Cash on Delivery</strong> (8 AM – 4 PM)</span>
                </div>
              ) : (
                <div className="flex items-start gap-1.5 text-amber-900 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Free COD is currently exclusive to Karaikudi ({inputPincode} is outside zone).</span>
                </div>
              )}
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-botanical-ivory border border-warm-sand flex items-center justify-center mx-auto text-sage-green">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-xl text-deep-forest">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-charcoal/70 max-w-xs mx-auto">
                  Discover our Chettinad-inspired cold-pressed botanicals crafted for natural radiance.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-deep-forest text-botanical-ivory text-xs font-bold uppercase tracking-wider hover:bg-deep-forest-dark"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-botanical-ivory/50 border border-warm-sand/50"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover border border-warm-sand flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif font-bold text-sm text-deep-forest leading-snug line-clamp-1">
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
                        {item.product.volume} • ₹{item.product.price} each
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
                        <span className="w-7 text-center font-bold text-xs text-deep-forest">
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

          {/* Drawer Footer / Checkout Strip */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-warm-sand/60 bg-botanical-ivory space-y-3">
              
              {/* Cost Summary */}
              <div className="space-y-1.5 text-xs text-charcoal/80">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-semibold text-deep-forest">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    Karaikudi Delivery
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 rounded">FREE</span>
                  </span>
                  <span className="font-bold text-emerald-700">₹0</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-deep-forest pt-2 border-t border-warm-sand/50">
                  <span>Total Amount (COD)</span>
                  <span className="text-base text-deep-forest">₹{cartTotal}</span>
                </div>
              </div>

              {/* Checkout Action or Non-Karaikudi Fallback */}
              {isPincodeEligible ? (
                <div>
                  <button
                    onClick={handleProceedCheckout}
                    className="w-full py-3.5 px-4 rounded-xl bg-deep-forest text-botanical-ivory font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-deep-forest-dark active:scale-[0.98] transition-all shadow-botanical"
                  >
                    <span>Place Free Karaikudi COD Order</span>
                    <ArrowRight className="w-4 h-4 text-champagne-gold" />
                  </button>
                  <p className="text-[10px] text-center text-charcoal/60 mt-1.5">
                    Pay with Cash or UPI upon delivery at your doorstep (8 AM – 4 PM)
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-2">
                  <p className="font-semibold leading-snug">
                    We currently offer Free Cash on Delivery exclusively within Karaikudi.
                  </p>
                  <p className="text-[11px] text-charcoal/70">
                    Pan-India shipping & Chennai live stalls are launching soon! Enter your WhatsApp number to get notified:
                  </p>

                  {waitlistSent ? (
                    <div className="p-2 bg-emerald-100 text-emerald-800 rounded text-center text-xs font-bold">
                      ✓ You are on the VIP Launch list!
                    </div>
                  ) : (
                    <form onSubmit={handleWaitlistSubmit} className="flex gap-2">
                      <input
                        type="tel"
                        value={waitlistPhone}
                        onChange={(e) => setWaitlistPhone(e.target.value)}
                        placeholder="WhatsApp Number"
                        className="flex-1 px-2.5 py-1.5 rounded bg-white border border-amber-300 text-xs"
                        required
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded bg-deep-forest text-botanical-ivory text-xs font-semibold"
                      >
                        Notify Me
                      </button>
                    </form>
                  )}
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
