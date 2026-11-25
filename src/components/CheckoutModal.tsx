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
  User,
  ChevronDown,
  RefreshCw,
  Printer,
  Download
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { isKaraikudiPincode, INDIAN_STATES } from '../config/storeConfig';
import { requestBrowserGeolocation } from '../utils/geolocation';
import { launchRazorpayCheckout } from '../config/razorpay';
import { downloadOrdersCSV } from '../utils/googleSheetsSync';
import { printSingleOrderSlip } from '../utils/printOrder';
import { calculateDelivery } from '../utils/delivery';
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
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState(customerCity || '');
  const [state, setState] = useState(customerState || '');
  const [pincode, setPincode] = useState(customerPincode || '');
  const [deliverySlot, setDeliverySlot] = useState<string>('Express Delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Razorpay Online (UPI / GPay / PhonePe / Cards)');
  const [notes, setNotes] = useState('');

  // GPS State
  const [isLocating, setIsLocating] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Completed Order State for Receipt View
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Sync profile details when logged in
  useEffect(() => {
    if (customerProfile.isLoggedIn) {
      if (!name && customerProfile.name) setName(customerProfile.name);
      if (!phone && customerProfile.phone) setPhone(customerProfile.phone);

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
    if (!address.trim()) {
      showToast("Please enter your complete delivery street address");
      return;
    }

    // 1. Handling Razorpay Automated Gateway Checkout
    if (paymentMethod === 'Razorpay Online (UPI / GPay / PhonePe / Cards)') {
      setIsProcessingPayment(true);
      launchRazorpayCheckout({
        amount: grandTotal,
        customer: {
          name: name.trim(),
          email: customerProfile.email || undefined,
          contact: phone.trim(),
          address: `${address.trim()}${landmark ? ', Near ' + landmark.trim() : ''}, ${city}, ${state} - ${pincode}`
        },
        description: `Z NATURALS Order (${cart.length} Items)`,
        onSuccess: (paymentId: string) => {
          setIsProcessingPayment(false);
          const order = placeCustomerOrder({
            customerName: name,
            phone,
            alternatePhone,
            address,
            landmark,
            city,
            state,
            pincode,
            deliverySlot: 'Express Delivery',
            notes,
            paymentMethod: 'Razorpay Online (UPI / GPay / PhonePe / Cards)',
            upiUtr: paymentId
          });
          setCompletedOrder(order);
          showToast(`✓ Payment Successful! Order #${order.id} Confirmed.`);
        },
        onDismiss: () => {
          setIsProcessingPayment(false);
          showToast("Payment window closed. Your cart is preserved.");
        },
        onError: (errMsg: string) => {
          setIsProcessingPayment(false);
          showToast(`Payment error: ${errMsg}`);
        }
      });
      return;
    }

    // 2. Handling Doorstep Cash / COD Delivery
    const order = placeCustomerOrder({
      customerName: name,
      phone,
      alternatePhone,
      address,
      landmark,
      city,
      state,
      pincode,
      deliverySlot: 'Express Delivery',
      notes,
      paymentMethod
    });

    setCompletedOrder(order);
  };

  const handleClose = () => {
    setCompletedOrder(null);
    setIsCheckoutOpen(false);
  };

  const hasValidPincode = pincode.trim().length === 6;
  const currentDelivery = hasValidPincode
    ? calculateDelivery(pincode, cartTotalWeight, cartTotal)
    : deliveryInfo;
  const shippingFee = hasValidPincode ? currentDelivery.shippingFee : 0;
  const grandTotal = cartTotal + (hasValidPincode ? shippingFee : 0);

  const isAddressComplete = Boolean(
    name.trim().length >= 2 &&
    phone.trim().replace(/\D/g, '').length >= 10 &&
    address.trim().length >= 5 &&
    state.trim().length > 0 &&
    city.trim().length > 0 &&
    pincode.trim().length === 6
  );

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
                Standard Weight-Based Delivery
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
                  Chettinad Botanical Dispatch
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

                <div className="flex justify-between items-center">
                  <span className="text-charcoal/60">Customer Dispatch Helpline:</span>
                  <a href="tel:9344087944" className="font-bold text-deep-forest font-mono underline">
                    +91 9344087944
                  </a>
                </div>

                {completedOrder.upiUtr && (
                  <div className="flex justify-between items-center bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    <span className="text-emerald-800 font-semibold">UPI Transaction Ref (UTR):</span>
                    <span className="font-mono font-bold text-emerald-900">{completedOrder.upiUtr}</span>
                  </div>
                )}

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

              {/* Action Buttons: Download Bill / Print / Continue Shopping */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => downloadOrdersCSV([completedOrder], `znaturals_order_${completedOrder.id}.csv`)}
                  className="py-3 px-3 rounded-xl border border-champagne-gold/80 bg-white hover:bg-champagne-gold/10 text-deep-forest font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-champagne-gold" />
                  <span>Download Bill (Excel/Sheets)</span>
                </button>
                <button
                  type="button"
                  onClick={() => printSingleOrderSlip(completedOrder)}
                  className="py-3 px-3 rounded-xl border border-warm-sand bg-white hover:bg-gray-50 text-deep-forest font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5 text-sage-green" />
                  <span>Print Receipt</span>
                </button>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3.5 px-4 rounded-xl bg-deep-forest text-botanical-ivory font-sans font-bold text-xs uppercase tracking-wider hover:bg-deep-forest-dark transition-all shadow-botanical"
              >
                Back to Botanical Store
              </button>

            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              
              {/* Customer Account Prompt / Status */}
              {!customerProfile.isLoggedIn ? (
                <div className="p-3 rounded-xl bg-botanical-ivory/80 border border-warm-sand flex items-center justify-between text-xs">
                  <span className="text-charcoal/80">Have a Z NATURALS account?</span>
                  <button
                    type="button"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-deep-forest font-bold underline hover:text-sage-green"
                  >
                    Sign In with Email OTP
                  </button>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-700" />
                    <div>
                      <span className="font-bold text-emerald-900 block">Logged in as {customerProfile.name || 'Valued Customer'}</span>
                      <span className="text-emerald-700 font-mono">{customerProfile.email || `+91 ${customerProfile.phone}`}</span>
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

              {/* 1. Customer Details (Name & Mobile Number First) */}
              <div className="p-4 rounded-2xl border border-warm-sand/80 bg-white shadow-xs space-y-3.5">
                <span className="text-xs font-extrabold text-deep-forest uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-warm-sand/50">
                  <User className="w-4 h-4 text-sage-green" /> 1. Customer Contact Details
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-extrabold text-deep-forest mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-botanical-ivory/30 border border-warm-sand text-xs font-semibold text-deep-forest focus:outline-none focus:ring-1 focus:ring-deep-forest focus:border-deep-forest shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-deep-forest mb-1.5">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-botanical-ivory/30 border border-warm-sand text-xs font-mono font-bold text-deep-forest focus:outline-none focus:ring-1 focus:ring-deep-forest focus:border-deep-forest shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-deep-forest mb-1.5">
                    Alternate Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={alternatePhone}
                    onChange={(e) => setAlternatePhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-botanical-ivory/30 border border-warm-sand text-xs font-mono text-deep-forest focus:outline-none focus:ring-1 focus:ring-deep-forest focus:border-deep-forest shadow-xs"
                  />
                </div>
              </div>

              {/* 2. Delivery Location & Address (After Customer Details) */}
              <div className="p-4 rounded-2xl border border-warm-sand/80 bg-white shadow-xs space-y-3.5">
                <span className="text-xs font-extrabold text-deep-forest uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-warm-sand/50">
                  <MapPin className="w-4 h-4 text-sage-green" /> 2. Delivery Location & Pincode
                </span>

                <div>
                  <label className="block text-xs font-extrabold text-deep-forest mb-1.5">
                    Delivery Street Address / Door No *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-botanical-ivory/30 border border-warm-sand text-xs font-medium text-deep-forest focus:outline-none focus:ring-1 focus:ring-deep-forest focus:border-deep-forest shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-deep-forest mb-1.5">
                    Nearest Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-botanical-ivory/30 border border-warm-sand text-xs font-medium text-deep-forest focus:outline-none focus:ring-1 focus:ring-deep-forest focus:border-deep-forest shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* 1. State (First - Dropdown Selection) */}
                  <div>
                    <label className="block text-xs font-extrabold text-deep-forest mb-1.5">
                      State *
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value);
                          setCustomerState(e.target.value);
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-botanical-ivory/30 border border-warm-sand text-xs appearance-none cursor-pointer pr-9 shadow-xs focus:outline-none focus:ring-1 focus:ring-deep-forest focus:border-deep-forest ${
                          !state ? 'text-charcoal/40 font-normal' : 'text-deep-forest font-semibold'
                        }`}
                      >
                        <option value="" disabled className="text-gray-400 bg-white">
                          Select State / UT...
                        </option>
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st} className="text-deep-forest bg-white py-1.5">
                            {st}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-charcoal/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* 2. City / Town (Second) */}
                  <div>
                    <label className="block text-xs font-extrabold text-deep-forest mb-1.5">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        setCustomerCity(e.target.value);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-botanical-ivory/30 border border-warm-sand text-xs font-semibold text-deep-forest focus:outline-none focus:ring-1 focus:ring-deep-forest focus:border-deep-forest shadow-xs"
                    />
                  </div>

                  {/* 3. Pincode (Third) */}
                  <div>
                    <label className="block text-xs font-extrabold text-deep-forest mb-1.5">
                      Pincode (6-Digit) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-botanical-ivory/30 border border-warm-sand text-xs font-mono font-bold text-deep-forest focus:outline-none focus:ring-1 focus:ring-deep-forest focus:border-deep-forest shadow-xs"
                    />
                  </div>
                </div>

                {/* Delivery Fee Status & Weight-Based Slab Breakdown */}
                {pincode.length === 6 ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50/80 text-deep-forest text-xs border border-emerald-200/90 space-y-1.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                        <span className="font-bold text-deep-forest">
                          Standard Delivery Charge to {city || state || 'your address'}:
                        </span>
                      </div>
                      <span className="font-bold font-mono text-sm text-deep-forest px-2.5 py-0.5 bg-emerald-100/90 border border-emerald-200 rounded-md">
                        +₹{shippingFee}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-deep-forest/80 font-medium">
                      <Scale className="w-3.5 h-3.5 text-sage-green flex-shrink-0" />
                      <span>Parcel Weight: <strong>{cartTotalWeightFormatted}</strong> • {currentDelivery.slabDescription}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-botanical-ivory/80 text-charcoal/70 text-xs border border-warm-sand/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Scale className="w-3.5 h-3.5 text-sage-green flex-shrink-0" />
                      <span>Total Parcel Weight: <strong>{cartTotalWeightFormatted}</strong></span>
                    </div>
                    <span className="text-[11px] text-charcoal/60 font-medium">Enter 6-digit Pincode to view delivery charge</span>
                  </div>
                )}
              </div>

              {/* Sequential Checkout Gating: Address must be filled before Payment options and Submit */}
              {!isAddressComplete ? (
                <div className="space-y-4 pt-2 border-t border-warm-sand/60 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300/80 text-amber-950 text-xs space-y-2.5 shadow-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center text-xs flex-shrink-0">
                        !
                      </div>
                      <span className="font-bold text-deep-forest text-xs uppercase tracking-wide">
                        Step 1 Required: Complete Address Details Above
                      </span>
                    </div>
                    <p className="text-[11.5px] text-charcoal/80 leading-relaxed pl-8">
                      Please fill in your <strong>Full Name</strong>, <strong>10-digit Mobile Number</strong>, <strong>Delivery Street Address</strong>, <strong>State</strong>, <strong>City</strong>, and <strong>6-digit Pincode</strong> to unlock payment methods and proceed with your order.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pl-8 pt-1 text-[10px]">
                      <span className={`px-2 py-0.5 rounded-md font-semibold ${name.trim().length >= 2 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'}`}>
                        {name.trim().length >= 2 ? '✓ Name' : '✗ Name'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md font-semibold ${phone.trim().replace(/\D/g, '').length >= 10 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'}`}>
                        {phone.trim().replace(/\D/g, '').length >= 10 ? '✓ Mobile' : '✗ Mobile (10-digits)'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md font-semibold ${address.trim().length >= 5 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'}`}>
                        {address.trim().length >= 5 ? '✓ Address' : '✗ Street Address'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md font-semibold ${state.trim().length > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'}`}>
                        {state.trim().length > 0 ? '✓ State' : '✗ State'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md font-semibold ${city.trim().length > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'}`}>
                        {city.trim().length > 0 ? '✓ City' : '✗ City'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md font-semibold ${pincode.trim().length === 6 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'}`}>
                        {pincode.trim().length === 6 ? '✓ Pincode' : '✗ 6-Digit Pincode'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled
                    className="w-full py-4 px-6 rounded-xl bg-gray-200 text-gray-500 font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed opacity-75"
                  >
                    <span>Complete Address Details to Select Payment & Proceed</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </button>
                </div>
              ) : (
                <>
                  {/* 3. Payment Method Routing */}
                  <div className="space-y-3 pt-1 border-t border-warm-sand/60 animate-fadeIn">
                    <label className="block text-xs font-bold text-deep-forest uppercase tracking-wider flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-sage-green" /> Choose Payment Option:
                    </label>

                    <div className="grid grid-cols-1 gap-3">
                      {/* Option 1: Razorpay Automated Gateway (GPay, PhonePe, Paytm, Cards) */}
                      <label className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                        paymentMethod === 'Razorpay Online (UPI / GPay / PhonePe / Cards)'
                          ? 'border-deep-forest bg-deep-forest/5 ring-1 ring-deep-forest font-semibold text-deep-forest shadow-xs'
                          : 'border-warm-sand bg-white text-charcoal/80 hover:border-champagne-gold'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Razorpay Online (UPI / GPay / PhonePe / Cards)"
                          checked={paymentMethod === 'Razorpay Online (UPI / GPay / PhonePe / Cards)'}
                          onChange={() => setPaymentMethod('Razorpay Online (UPI / GPay / PhonePe / Cards)')}
                          className="mt-1 text-deep-forest"
                        />
                        <div className="text-xs space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm block text-deep-forest flex items-center gap-1.5">
                              <span>Pay Online via Razorpay</span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                                ⚡ Instant Auto-Confirm
                              </span>
                            </span>
                          </div>
                          <p className="text-[11px] text-charcoal/70 leading-relaxed">
                            Automatic 2-second order confirmation. Pay with Google Pay, PhonePe, Paytm, Supermoney, UPI QR, ATM Cards & NetBanking.
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-bold text-deep-forest/80">
                            <span className="px-2 py-0.5 bg-botanical-ivory border border-warm-sand rounded">PhonePe</span>
                            <span className="px-2 py-0.5 bg-botanical-ivory border border-warm-sand rounded">Google Pay</span>
                            <span className="px-2 py-0.5 bg-botanical-ivory border border-warm-sand rounded">Paytm</span>
                            <span className="px-2 py-0.5 bg-botanical-ivory border border-warm-sand rounded">Supermoney</span>
                            <span className="px-2 py-0.5 bg-botanical-ivory border border-warm-sand rounded">Debit / Credit Cards</span>
                          </div>
                        </div>
                      </label>

                      {/* Option 2: Cash / Doorstep UPI */}
                      <label className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                        paymentMethod === 'Cash on Delivery (COD) / UPI at Doorstep' || paymentMethod === 'Cash on Delivery (COD)' || paymentMethod === 'Free Cash / UPI at Delivery (Karaikudi Exclusive)'
                          ? 'border-deep-forest bg-deep-forest/5 ring-1 ring-deep-forest font-semibold text-deep-forest shadow-xs'
                          : 'border-warm-sand bg-white text-charcoal/80 hover:border-champagne-gold'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Cash on Delivery (COD) / UPI at Doorstep"
                          checked={paymentMethod === 'Cash on Delivery (COD) / UPI at Doorstep' || paymentMethod === 'Cash on Delivery (COD)' || paymentMethod === 'Free Cash / UPI at Delivery (Karaikudi Exclusive)'}
                          onChange={() => setPaymentMethod('Cash on Delivery (COD) / UPI at Doorstep')}
                          className="mt-1 text-deep-forest"
                        />
                        <div className="text-xs space-y-0.5">
                          <span className="font-bold text-sm block">
                            Cash on Delivery (COD) / UPI at Doorstep
                          </span>
                          <p className="text-[11px] text-charcoal/70 leading-relaxed">
                            Pay conveniently with Cash or scan our delivery agent's UPI QR code upon arrival at your doorstep.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* 4. Order Summary & Price Breakdown */}
                  <div className="p-4 rounded-2xl bg-botanical-ivory border border-warm-sand space-y-2 text-xs">
                    <div className="flex justify-between items-center text-charcoal/80">
                      <span>Cart Items ({cart.length}) • Total Weight: {cartTotalWeightFormatted}</span>
                      <span className="font-semibold text-deep-forest">₹{cartTotal}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-sage-green flex-shrink-0" />
                        <span>Delivery Charge ({cartTotalWeightFormatted} Parcel Weight):</span>
                      </span>
                      <span className="font-bold text-deep-forest">
                        {hasValidPincode ? `+₹${shippingFee}` : 'Enter Pincode'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-warm-sand font-bold text-sm text-deep-forest">
                      <span>Final Amount:</span>
                      <span className="text-xl">₹{grandTotal}</span>
                    </div>
                  </div>

                  {/* Submit Order Button */}
                  <button
                    type="submit"
                    disabled={cart.length === 0 || isProcessingPayment}
                    className="w-full py-4 px-6 rounded-xl bg-deep-forest hover:bg-deep-forest-dark text-botanical-ivory font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-botanical active:scale-[0.98] disabled:opacity-50"
                  >
                    {isProcessingPayment ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-champagne-gold" />
                        <span>Connecting to Razorpay Secure Portal...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {paymentMethod === 'Razorpay Online (UPI / GPay / PhonePe / Cards)'
                            ? `Pay ₹${grandTotal} with Razorpay (Instant UPI / Cards)`
                            : `Place Order with Doorstep Delivery • ₹${grandTotal}`}
                        </span>
                        <ArrowRight className="w-4 h-4 text-champagne-gold" />
                      </>
                    )}
                  </button>
                </>
              )}

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
