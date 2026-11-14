import React, { useState, useEffect } from 'react';
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
  Navigation,
  CreditCard,
  QrCode,
  ArrowRight,
  PackageCheck,
  Scale,
  Sparkles,
  UserCheck,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { isKaraikudiPincode, BRAND_CONFIG } from '../config/storeConfig';
import { requestBrowserGeolocation } from '../utils/geolocation';
import { Order, PaymentMethod } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartTotal,
    cartTotalWeight,
    cartTotalWeightFormatted,
    isCheckoutOpen,
    setIsCheckoutOpen,
    customerPincode,
    setCustomerPincode,
    customerCity,
    setCustomerCity,
    customerState,
    setCustomerState,
    deliveryInfo,
    customerProfile,
    setIsAuthModalOpen,
    placeCustomerOrder,
    showToast
  } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState(customerCity || 'Karaikudi');
  const [state, setState] = useState(customerState || 'Tamil Nadu');
  const [pincode, setPincode] = useState(customerPincode || '630001');
  const [deliverySlot, setDeliverySlot] = useState<string>('Daily: 8:00 AM – 12:00 PM');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery (COD)');
  const [upiTransactionId, setUpiTransactionId] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [notes, setNotes] = useState('');

  // GPS State
  const [isLocating, setIsLocating] = useState(false);

  // Completed Order State for Receipt View
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Sync profile details when logged in
  useEffect(() => {
    if (customerProfile.isLoggedIn) {
      if (!name && customerProfile.name) setName(customerProfile.name);
      if (!phone && customerProfile.phone) setPhone(customerProfile.phone);
      if (!customerEmail && customerProfile.email) setCustomerEmail(customerProfile.email);

      // Auto-populate default address if available
      if (customerProfile.addresses.length > 0 && !address) {
        const defaultAddr = customerProfile.addresses.find((a) => a.isDefault) || customerProfile.addresses[0];
        setAddress(defaultAddr.street);
        if (defaultAddr.landmark) setLandmark(defaultAddr.landmark);
        setCity(defaultAddr.city);
        setState(defaultAddr.state);
        setPincode(defaultAddr.pincode);
        setCustomerPincode(defaultAddr.pincode);
      }
    }
  }, [customerProfile, customerProfile.isLoggedIn]);

  if (!isCheckoutOpen) return null;

  const isKaraikudi = isKaraikudiPincode(pincode);

  // Trigger GPS Geolocation
  const handleDetectLocation = async () => {
    setIsLocating(true);
    try {
      const loc = await requestBrowserGeolocation();
      if (loc.pincode) {
        setPincode(loc.pincode);
        setCustomerPincode(loc.pincode);
      }
      if (loc.city) {
        setCity(loc.city);
        setCustomerCity(loc.city);
      }
      if (loc.state) {
        setState(loc.state);
        setCustomerState(loc.state);
      }
      showToast(`📍 Location detected: ${loc.city}, ${loc.state} (${loc.pincode})`);
    } catch (err: any) {
      showToast(err.message || "Could not detect GPS location.");
    } finally {
      setIsLocating(false);
    }
  };

  const handlePincodeChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 6);
    setPincode(cleaned);
    setCustomerPincode(cleaned);
  };

  const handleSelectSavedAddress = (addrId: string) => {
    const found = customerProfile.addresses.find((a) => a.id === addrId);
    if (found) {
      setAddress(found.street);
      if (found.landmark) setLandmark(found.landmark);
      setCity(found.city);
      setState(found.state);
      setPincode(found.pincode);
      setCustomerPincode(found.pincode);
      showToast(`Selected saved address for ${found.city}`);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) {
      showToast("Please enter a valid 6-digit delivery pincode");
      return;
    }
    if (!phone || phone.length < 10) {
      showToast("Please enter a valid 10-digit mobile number");
      return;
    }

    if (paymentMethod === 'Online UPI (GPay / PhonePe / Paytm / QR)') {
      if (!upiTransactionId || upiTransactionId.trim().length < 6) {
        showToast("Please enter your 12-digit UPI Transaction ID / UTR number from GPay/PhonePe to confirm the order");
        return;
      }
    }

    const order = placeCustomerOrder({
      customerName: name,
      phone,
      alternatePhone,
      customerEmail: customerEmail || customerProfile.email,
      address,
      landmark,
      city,
      state,
      pincode,
      deliverySlot: isKaraikudi ? deliverySlot : 'Express Courier (2–4 Days)',
      notes,
      paymentMethod,
      upiTransactionId: paymentMethod === 'Online UPI (GPay / PhonePe / Paytm / QR)' ? upiTransactionId : undefined
    });

    setCompletedOrder(order);
  };

  const handleClose = () => {
    setCompletedOrder(null);
    setIsCheckoutOpen(false);
  };

  const shippingFee = deliveryInfo.shippingFee;
  const grandTotal = cartTotal + shippingFee;

  // Dynamic UPI Payment Deep Link & Dynamic QR Code Generator
  const upiId = BRAND_CONFIG.upi?.id || '9344087944@upi';
  const payeeName = BRAND_CONFIG.upi?.payeeName || 'Z NATURALS';
  const upiPaymentUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${grandTotal}&cu=INR&tn=${encodeURIComponent(`ZNaturals-${pincode}`)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(upiPaymentUrl)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={handleClose} />

      <div className="relative bg-soft-white rounded-3xl max-w-2xl w-full shadow-2xl border border-warm-sand overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-warm-sand/60 bg-botanical-ivory flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-deep-forest text-champagne-gold flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-editorial font-bold text-xl text-deep-forest leading-tight">
                {completedOrder ? 'Order Confirmation' : 'Secure Checkout & Delivery'}
              </h2>
              <span className="text-[11px] text-charcoal/70">
                {isKaraikudi ? 'Zone A: Karaikudi Local (Free Delivery)' : 'Zone B: Rest of India (Courier)'}
              </span>
            </div>
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
                  {completedOrder.zone}
                </span>
                <h3 className="font-editorial font-bold text-3xl text-deep-forest">
                  Thank you, {completedOrder.customerName}!
                </h3>
                <p className="font-sans text-sm text-charcoal/80 mt-2 max-w-md mx-auto">
                  Your botanical order has been booked successfully! <br />
                  Payment Mode: <strong className="text-deep-forest">{completedOrder.paymentMethod}</strong> (Total: ₹{completedOrder.total})
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-5 rounded-2xl bg-botanical-ivory border border-warm-sand text-left space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-warm-sand pb-2">
                  <span className="text-charcoal/60">Order Reference:</span>
                  <span className="font-mono font-bold text-sm text-deep-forest">{completedOrder.id}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60">Delivery Route & Schedule:</span>
                  <span className="font-bold text-deep-forest">
                    {completedOrder.deliverySlot || completedOrder.zone}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60">Delivery Address:</span>
                  <span className="font-medium text-right text-deep-forest max-w-xs truncate">
                    {completedOrder.address}, {completedOrder.city}, {completedOrder.pincode}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60">Customer Phone:</span>
                  <span className="font-bold text-deep-forest font-mono">+91 {completedOrder.phone}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60">Total Parcel Weight:</span>
                  <span className="font-bold text-deep-forest">
                    {completedOrder.totalWeightGrams >= 1000 ? `${(completedOrder.totalWeightGrams / 1000).toFixed(2)} kg` : `${completedOrder.totalWeightGrams} g`}
                  </span>
                </div>

                {completedOrder.upiTransactionId && (
                  <div className="flex justify-between items-center bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    <span className="text-emerald-900 font-bold">UPI Transaction ID / UTR:</span>
                    <span className="font-mono font-bold text-emerald-900">{completedOrder.upiTransactionId}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60">Karaikudi Dispatch Helpline:</span>
                  <a href="tel:9344087944" className="font-bold text-deep-forest font-mono underline">
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
                  
                  <div className="flex justify-between text-charcoal/70 pt-1">
                    <span>Shipping / Delivery:</span>
                    <span className="font-semibold text-emerald-800">
                      {completedOrder.shippingFee === 0 ? 'FREE' : `₹${completedOrder.shippingFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-warm-sand/50 font-bold text-sm text-deep-forest">
                    <span>Final Amount:</span>
                    <span>₹{completedOrder.total} ({completedOrder.paymentStatus})</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/919344087944?text=${encodeURIComponent(`Vanakkam Z Naturals! I have placed order ${completedOrder.id} for Rs. ${completedOrder.total}. Customer: ${completedOrder.customerName}, Address: ${completedOrder.address}, ${completedOrder.city} (${completedOrder.pincode}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Phone className="w-4 h-4 fill-white" />
                  <span>Track on WhatsApp (+91 9344087944)</span>
                </a>

                <button
                  onClick={handleClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-deep-forest text-botanical-ivory font-sans font-bold text-xs uppercase tracking-wider hover:bg-deep-forest-dark transition-all"
                >
                  Back to Store
                </button>
              </div>

            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              
              {/* Customer Account Prompt / Status */}
              {!customerProfile.isLoggedIn ? (
                <div className="p-3.5 rounded-2xl bg-white border border-champagne-gold/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
                  <div className="text-xs">
                    <span className="font-bold text-deep-forest flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
                      Express Guest Checkout (No Forced Login)
                    </span>
                    <span className="text-charcoal/70 text-[11px] block mt-0.5">
                      Karaikudi residents can directly enter delivery details below. Or login to save addresses:
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-deep-forest text-botanical-ivory font-bold text-xs hover:bg-deep-forest-dark whitespace-nowrap self-start sm:self-auto shadow-xs"
                  >
                    Login / Google
                  </button>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-700" />
                    <div>
                      <span className="font-bold text-emerald-900 block">Logged in as {customerProfile.name || 'Valued Customer'}</span>
                      <span className="text-emerald-700 font-mono">+91 {customerProfile.phone}</span>
                    </div>
                  </div>
                  {customerProfile.addresses.length > 0 && (
                    <select
                      onChange={(e) => handleSelectSavedAddress(e.target.value)}
                      className="text-xs bg-white border border-emerald-300 rounded-lg px-2 py-1 font-medium text-emerald-900"
                    >
                      <option value="">Use Saved Address...</option>
                      {customerProfile.addresses.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.city} ({a.pincode}) - {a.street.slice(0, 20)}...
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              {/* 1. Location Detection & Pincode Routing Strip */}
              <div className="p-4 rounded-2xl border border-warm-sand bg-botanical-ivory space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-deep-forest flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-sage-green" />
                    Delivery Location & Pincode:
                  </span>
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={isLocating}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-white border border-sage-green text-deep-forest text-xs font-semibold hover:bg-sage-green hover:text-white transition-all shadow-sm"
                  >
                    <Navigation className={`w-3.5 h-3.5 text-sage-green ${isLocating ? 'animate-spin' : ''}`} />
                    <span>{isLocating ? 'Detecting GPS...' : '📍 Auto-Detect GPS'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-charcoal/70 block mb-1">
                      Pincode (6-Digit) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      placeholder="e.g. 630001"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-warm-sand text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-deep-forest"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-charcoal/70 block mb-1">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Karaikudi"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-warm-sand text-xs focus:outline-none focus:ring-1 focus:ring-deep-forest"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-charcoal/70 block mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Tamil Nadu"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-warm-sand text-xs focus:outline-none focus:ring-1 focus:ring-deep-forest"
                    />
                  </div>
                </div>

                {/* Delivery Zone Badge & Pricing Breakdown */}
                {isKaraikudi ? (
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs border border-emerald-200 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Zone A: Karaikudi Local (100% Free Doorstep Delivery)</span>
                      <span className="text-emerald-800 text-[11px]">
                        Delivered daily between 8:00 AM – 4:00 PM by Z Naturals local fleet. Cash on Delivery is 100% free!
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-900 text-xs border border-blue-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-blue-600" />
                        Zone B: Courier Shipping to {city || 'Your City'}
                      </span>
                      <span className="font-bold font-mono text-sm">
                        {shippingFee === 0 ? 'FREE' : `+₹${shippingFee}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-blue-800">
                      <Scale className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>{deliveryInfo.slabDescription}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Customer Contact & Address Form */}
              <div className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="10-digit mobile"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-warm-sand text-xs font-mono focus:outline-none focus:ring-1 focus:ring-deep-forest"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-deep-forest mb-1">
                      Alternate Phone (Optional)
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
                      Nearest Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Near New Bus Stand / Chettinad Silks"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-warm-sand text-xs focus:outline-none focus:ring-1 focus:ring-deep-forest"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-deep-forest mb-1">
                    Delivery Street Address / Door No *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 14, Subramaniapuram 2nd Street"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-warm-sand text-xs focus:outline-none focus:ring-1 focus:ring-deep-forest"
                  />
                </div>

                {/* Delivery Slot Selection (Karaikudi Only) */}
                {isKaraikudi && (
                  <div>
                    <label className="block text-xs font-bold text-deep-forest mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sage-green" />
                      Karaikudi Local Delivery Slot *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <label className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
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
                          className="text-deep-forest"
                        />
                        <span className="text-xs">Morning: 8:00 AM – 12:00 PM</span>
                      </label>

                      <label className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
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
                          className="text-deep-forest"
                        />
                        <span className="text-xs">Afternoon: 12:00 PM – 4:00 PM</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Payment Method Routing */}
              <div className="space-y-3 pt-2 border-t border-warm-sand/60">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-deep-forest uppercase tracking-wider flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-sage-green" /> Choose Payment Option:
                  </label>
                  <span className="text-[10px] text-champagne-gold font-bold uppercase tracking-wider">
                    Zero Extra Fees
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Free Cash / UPI at Delivery */}
                  <label className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'Cash on Delivery (COD)'
                      ? 'border-deep-forest bg-deep-forest/5 ring-1 ring-deep-forest font-semibold text-deep-forest shadow-xs'
                      : 'border-warm-sand bg-white text-charcoal/80 hover:border-warm-sand/80'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery (COD)"
                      checked={paymentMethod === 'Cash on Delivery (COD)'}
                      onChange={() => setPaymentMethod('Cash on Delivery (COD)')}
                      className="mt-1 text-deep-forest"
                    />
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm block">Free Cash / UPI at Delivery</span>
                      </div>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {isKaraikudi ? 'Karaikudi Doorstep Exclusive' : 'Pan-India COD'}
                      </span>
                      <p className="text-[11px] text-charcoal/70 leading-relaxed">
                        Pay by Cash or scan our delivery executive's UPI QR code at your doorstep upon delivery (Daily 8:00 AM – 4:00 PM).
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Pay Online Now via Instant UPI */}
                  <label className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'Online UPI (GPay / PhonePe / Paytm / QR)'
                      ? 'border-deep-forest bg-deep-forest/5 ring-1 ring-deep-forest font-semibold text-deep-forest shadow-xs'
                      : 'border-warm-sand bg-white text-charcoal/80 hover:border-warm-sand/80'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Online UPI (GPay / PhonePe / Paytm / QR)"
                      checked={paymentMethod === 'Online UPI (GPay / PhonePe / Paytm / QR)'}
                      onChange={() => setPaymentMethod('Online UPI (GPay / PhonePe / Paytm / QR)')}
                      className="mt-1 text-deep-forest"
                    />
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm block">Pay Online via Instant UPI</span>
                      </div>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                        Zero Fee • Instant Confirmation
                      </span>
                      <p className="text-[11px] text-charcoal/70 leading-relaxed">
                        Scan Dynamic UPI QR code or tap to open GPay, PhonePe, Paytm, or CRED on mobile.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Expanded Interactive UPI Payment Container */}
                {paymentMethod === 'Online UPI (GPay / PhonePe / Paytm / QR)' && (
                  <div className="p-4 rounded-2xl bg-white border-2 border-champagne-gold/60 shadow-botanical space-y-4 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      {/* Dynamic QR Code */}
                      <div className="bg-botanical-ivory p-3 rounded-2xl border border-warm-sand shadow-inner text-center flex-shrink-0">
                        <img 
                          src={qrCodeUrl} 
                          alt="Z Naturals Dynamic UPI QR Code" 
                          className="w-40 h-40 object-contain mx-auto rounded-xl"
                        />
                        <span className="text-[10px] text-charcoal/60 mt-1 block font-mono">
                          Scan with any UPI app
                        </span>
                      </div>

                      {/* Deep-link button & UPI details */}
                      <div className="flex-1 space-y-3 w-full text-xs">
                        <div>
                          <span className="text-[11px] font-bold text-sage-green uppercase tracking-wider block">
                            Direct Mobile Payment
                          </span>
                          <h4 className="font-serif font-bold text-deep-forest text-base">
                            Paying: ₹{grandTotal}
                          </h4>
                          <p className="text-[11px] text-charcoal/70 mt-0.5">
                            Pre-filled with exact amount and merchant reference.
                          </p>
                        </div>

                        {/* Open UPI App Deep Link */}
                        <a
                          href={upiPaymentUrl}
                          className="w-full py-3 px-4 rounded-xl bg-deep-forest hover:bg-deep-forest-dark text-botanical-ivory font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
                        >
                          <QrCode className="w-4 h-4 text-champagne-gold" />
                          <span>Open GPay / PhonePe / Paytm to Pay</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                        </a>

                        {/* UPI ID copy pill */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-botanical-ivory border border-warm-sand text-xs">
                          <div>
                            <span className="text-[10px] text-charcoal/60 block">Merchant UPI ID:</span>
                            <span className="font-mono font-bold text-deep-forest">{upiId}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(upiId);
                              setCopiedUpi(true);
                              setTimeout(() => setCopiedUpi(false), 2000);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white border border-warm-sand text-[11px] font-bold text-deep-forest hover:bg-champagne-gold/10 flex items-center gap-1"
                          >
                            {copiedUpi ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-charcoal/60" />
                                <span>Copy UPI</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* UTR Input Field */}
                    <div className="pt-3 border-t border-warm-sand/60">
                      <label className="block text-xs font-bold text-deep-forest mb-1">
                        Enter 12-Digit UPI Transaction ID / UTR Number *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={12}
                        value={upiTransactionId}
                        onChange={(e) => setUpiTransactionId(e.target.value.replace(/\D/g, ''))}
                        placeholder="e.g. 432109876543 (from GPay / PhonePe / Paytm)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-botanical-ivory border border-warm-sand text-xs font-mono font-bold tracking-widest text-deep-forest focus:outline-none focus:ring-1 focus:ring-deep-forest"
                      />
                      <p className="text-[10px] text-charcoal/60 mt-1">
                        After completing payment in your UPI app, enter the 12-digit UTR/Ref number to verify and confirm your order.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Order Summary & Price Breakdown */}
              <div className="p-4 rounded-2xl bg-botanical-ivory border border-warm-sand space-y-2 text-xs">
                <div className="flex justify-between items-center text-charcoal/80">
                  <span>Cart Items ({cart.length}) • Total Weight: {cartTotalWeightFormatted}</span>
                  <span className="font-semibold text-deep-forest">₹{cartTotal}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <span>Delivery Charge ({isKaraikudi ? 'Karaikudi Local' : 'Courier Slab'}):</span>
                  </span>
                  <span className="font-bold text-emerald-800">
                    {shippingFee === 0 ? 'FREE' : `+₹${shippingFee}`}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-warm-sand font-bold text-sm text-deep-forest">
                  <span>Final Amount ({paymentMethod === 'Cash on Delivery (COD)' ? 'COD' : 'Online UPI'}):</span>
                  <span className="text-xl">₹{grandTotal}</span>
                </div>
              </div>

              {/* Submit Order Button */}
              <button
                type="submit"
                disabled={cart.length === 0}
                className="w-full py-4 px-6 rounded-xl bg-deep-forest hover:bg-deep-forest-dark text-botanical-ivory font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-botanical active:scale-[0.98]"
              >
                <span>
                  {paymentMethod === 'Cash on Delivery (COD)'
                    ? `Place Order • ₹${grandTotal} (Free Doorstep Delivery)`
                    : `Confirm Order with UPI • ₹${grandTotal}`}
                </span>
                <ArrowRight className="w-4 h-4 text-champagne-gold" />
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
