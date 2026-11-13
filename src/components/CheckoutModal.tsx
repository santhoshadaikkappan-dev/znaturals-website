import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  Phone, 
  ShoppingBag,
  ExternalLink 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BRAND_CONFIG, isKaraikudiPincode } from '../config/storeConfig';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    customerPincode,
    setCustomerPincode,
    createOrder,
    addToWaitlist
  } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState(customerPincode || '630001');
  const [deliverySlot, setDeliverySlot] = useState<'Daily: 8:00 AM – 12:00 PM' | 'Daily: 12:00 PM – 4:00 PM'>('Daily: 8:00 AM – 12:00 PM');
  const [notes, setNotes] = useState('');

  // Submitted Order State for Receipt View
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Non-Karaikudi Waitlist Form State
  const [waitlistPhone, setWaitlistPhone] = useState('');
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  if (!isCheckoutOpen) return null;

  const isEligible = isKaraikudiPincode(pincode);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEligible) return;

    const newOrder = createOrder({
      customerName: name,
      phone,
      alternatePhone,
      address,
      landmark,
      pincode,
      deliverySlot,
      notes,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        volume: item.product.volume
      })),
      subtotal: cartTotal,
      total: cartTotal
    });

    setCustomerPincode(pincode);
    setCompletedOrder(newOrder);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistPhone) return;
    addToWaitlist(waitlistPhone, pincode, 'Outside Karaikudi Zone');
    setWaitlistSuccess(true);
  };

  const handleClose = () => {
    setCompletedOrder(null);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={handleClose} />

      <div className="relative bg-soft-white rounded-3xl max-w-2xl w-full shadow-2xl border border-warm-sand overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-warm-sand/60 bg-botanical-ivory flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-deep-forest" />
            <h2 className="font-serif font-bold text-xl text-deep-forest">
              {completedOrder ? 'Order Confirmation' : 'Karaikudi Free COD Checkout'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-deep-forest hover:bg-warm-sand/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 flex-1">
          {completedOrder ? (
            /* Order Success Receipt View */
            <div className="text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-700 animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sage-green block mb-1">
                  Karaikudi Doorstep Delivery Booked!
                </span>
                <h3 className="font-serif font-bold text-3xl text-deep-forest">
                  Thank you, {completedOrder.customerName}!
                </h3>
                <p className="font-sans text-sm text-charcoal/80 mt-2 max-w-md mx-auto">
                  Your order has been assigned to our local Karaikudi delivery team. 
                  Payment of <strong className="text-deep-forest">₹{completedOrder.total}</strong> will be collected via 
                  Cash or UPI when delivered.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-5 rounded-2xl bg-botanical-ivory border border-warm-sand text-left space-y-3.5 text-xs">
                <div className="flex justify-between items-center border-b border-warm-sand pb-2">
                  <span className="text-charcoal/60">Order Reference ID:</span>
                  <span className="font-mono font-bold text-sm text-deep-forest">{completedOrder.id}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60">Scheduled Delivery Slot:</span>
                  <span className="font-bold text-deep-forest">{completedOrder.deliverySlot}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60">Delivery Address:</span>
                  <span className="font-medium text-right text-deep-forest max-w-xs truncate">
                    {completedOrder.address}, {completedOrder.pincode}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60">Contact Phone:</span>
                  <span className="font-bold text-deep-forest">+91 {completedOrder.phone}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60">Karaikudi Dispatch Helpline:</span>
                  <a href="tel:9344087944" className="font-bold text-deep-forest hover:underline font-mono">
                    +91 9344087944
                  </a>
                </div>

                <div className="border-t border-warm-sand pt-3 space-y-1">
                  <span className="font-bold text-deep-forest uppercase tracking-wider text-[10px]">
                    Ordered Items:
                  </span>
                  {completedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-charcoal/80">
                      <span>{it.quantity}x {it.productName} ({it.volume})</span>
                      <span className="font-medium">₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-warm-sand/50 font-bold text-sm text-deep-forest">
                    <span>Total Payable (COD):</span>
                    <span>₹{completedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Weekend Stall Plug */}
              <div className="p-3.5 rounded-xl bg-sage-green/10 border border-sage-green/30 text-xs text-left flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sage-green text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  STALL
                </div>
                <div>
                  <div className="font-bold text-deep-forest">Also visiting our Live Stall?</div>
                  <div className="text-charcoal/70">
                    Visit Kallukatti Gandhi Square this Friday–Sunday (5:30–9:30 PM) for free skin consultations!
                  </div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 px-4 rounded-xl bg-deep-forest text-botanical-ivory font-sans font-bold text-xs uppercase tracking-wider hover:bg-deep-forest-dark"
              >
                Back to Botanical Store
              </button>

            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              
              {/* Pincode Check Banner */}
              <div className="p-3.5 rounded-2xl border border-warm-sand bg-botanical-ivory space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-deep-forest flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-sage-green" />
                    Delivery Pincode (Karaikudi Only)
                  </label>
                  <span className="text-[10px] text-sage-green font-semibold uppercase">
                    Daily 8 AM – 4 PM
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter Karaikudi Pincode (e.g. 630001)"
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-warm-sand text-xs font-mono focus:outline-none focus:ring-1 focus:ring-deep-forest"
                  />
                </div>

                {isEligible ? (
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-2 border border-emerald-200">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Eligible for <strong>FREE Karaikudi Cash on Delivery</strong> (Delivered Daily between 8:00 AM – 4:00 PM)</span>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-50 text-amber-900 text-xs space-y-2 border border-amber-200">
                    <div className="flex items-start gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>
                        We currently offer Free COD exclusively within Karaikudi. Pan-India shipping and Chennai stalls are launching soon!
                      </span>
                    </div>

                    {waitlistSuccess ? (
                      <div className="p-2 bg-emerald-100 text-emerald-800 rounded font-bold text-center">
                        ✓ WhatsApp notification registered!
                      </div>
                    ) : (
                      <div className="pt-2 border-t border-amber-200/80">
                        <label className="text-[11px] block font-semibold mb-1">
                          Enter your WhatsApp number to get notified when we launch in {pincode || 'your area'}:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="tel"
                            value={waitlistPhone}
                            onChange={(e) => setWaitlistPhone(e.target.value)}
                            placeholder="WhatsApp Number"
                            className="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-xs"
                          />
                          <button
                            type="button"
                            onClick={handleWaitlistSubmit}
                            className="px-3 py-1.5 rounded-lg bg-deep-forest text-botanical-ivory text-xs font-bold"
                          >
                            Join Waitlist
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Customer Contact & Address */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-deep-forest mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alagappan Chettiar"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-warm-sand text-xs focus:outline-none focus:ring-1 focus:ring-deep-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-deep-forest mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 98421 00000"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-warm-sand text-xs focus:outline-none focus:ring-1 focus:ring-deep-forest"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-deep-forest mb-1">
                      Alternate Contact (Optional)
                    </label>
                    <input
                      type="tel"
                      value={alternatePhone}
                      onChange={(e) => setAlternatePhone(e.target.value)}
                      placeholder="Family member phone"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-warm-sand text-xs focus:outline-none focus:ring-1 focus:ring-deep-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-deep-forest mb-1">
                      Nearest Karaikudi Landmark
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Near New Bus Stand, Sekkalai"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-warm-sand text-xs focus:outline-none focus:ring-1 focus:ring-deep-forest"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-deep-forest mb-1">
                    Door No, Street Name & Area (Karaikudi) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 14, Subramaniapuram 2nd Street, Near Alagappa School"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-warm-sand text-xs focus:outline-none focus:ring-1 focus:ring-deep-forest"
                  />
                </div>

                {/* Delivery Slot Selector */}
                <div>
                  <label className="block text-xs font-bold text-deep-forest mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sage-green" />
                    Preferred Daily Delivery Slot *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                      deliverySlot === 'Daily: 8:00 AM – 12:00 PM'
                        ? 'border-deep-forest bg-deep-forest/5 font-semibold text-deep-forest'
                        : 'border-warm-sand bg-white text-charcoal/70'
                    }`}>
                      <input
                        type="radio"
                        name="deliverySlot"
                        value="Daily: 8:00 AM – 12:00 PM"
                        checked={deliverySlot === 'Daily: 8:00 AM – 12:00 PM'}
                        onChange={() => setDeliverySlot('Daily: 8:00 AM – 12:00 PM')}
                        className="text-deep-forest focus:ring-deep-forest"
                      />
                      <span className="text-xs">Morning: 8:00 AM – 12:00 PM</span>
                    </label>

                    <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                      deliverySlot === 'Daily: 12:00 PM – 4:00 PM'
                        ? 'border-deep-forest bg-deep-forest/5 font-semibold text-deep-forest'
                        : 'border-warm-sand bg-white text-charcoal/70'
                    }`}>
                      <input
                        type="radio"
                        name="deliverySlot"
                        value="Daily: 12:00 PM – 4:00 PM"
                        checked={deliverySlot === 'Daily: 12:00 PM – 4:00 PM'}
                        onChange={() => setDeliverySlot('Daily: 12:00 PM – 4:00 PM')}
                        className="text-deep-forest focus:ring-deep-forest"
                      />
                      <span className="text-xs">Afternoon: 12:00 PM – 4:00 PM</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-deep-forest mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Call before coming, leave with neighbor if locked"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-warm-sand text-xs focus:outline-none focus:ring-1 focus:ring-deep-forest"
                  />
                </div>
              </div>

              {/* Order Total & COD Assurance */}
              <div className="p-4 rounded-2xl bg-botanical-ivory border border-warm-sand space-y-2">
                <div className="flex justify-between items-center text-xs text-charcoal/80">
                  <span>Cart Items ({cart.length})</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-emerald-800 font-semibold">
                  <span>Karaikudi Doorstep COD Delivery</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-warm-sand font-bold text-base text-deep-forest">
                  <span>Total Amount Due on Delivery</span>
                  <span className="text-xl">₹{cartTotal}</span>
                </div>
                <p className="text-[10px] text-charcoal/60 pt-1">
                  💡 Zero online payment risk: inspect your botanical package at doorstep before handing over cash or scanning GPay/UPI.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isEligible || cart.length === 0}
                className={`w-full py-4 px-6 rounded-xl font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-botanical ${
                  isEligible && cart.length > 0
                    ? 'bg-deep-forest text-botanical-ivory hover:bg-deep-forest-dark cursor-pointer'
                    : 'bg-warm-sand/50 text-charcoal/40 cursor-not-allowed'
                }`}
              >
                <span>Confirm & Place Free Karaikudi COD Order</span>
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
