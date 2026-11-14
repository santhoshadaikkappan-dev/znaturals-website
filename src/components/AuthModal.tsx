import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  RefreshCw, 
  Sparkles, 
  Navigation,
  LogOut,
  ShoppingBag,
  Leaf,
  Phone
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { requestBrowserGeolocation } from '../utils/geolocation';
import { sendEmailOtp, verifyEmailOtp, signOutUser } from '../config/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { 
    customerProfile, 
    customerOrders,
    updateCustomerProfile, 
    logoutCustomer, 
    addSavedAddress,
    setCustomerPincode,
    showToast 
  } = useStore();

  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // Address & GPS state for logged in user
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newLandmark, setNewLandmark] = useState('');
  const [newCity, setNewCity] = useState('Karaikudi');
  const [newState, setNewState] = useState('Tamil Nadu');
  const [newPincode, setNewPincode] = useState('630001');

  if (!isOpen) return null;

  const isLoggedIn = customerProfile.isLoggedIn;

  // 1. Send 6-Digit Email OTP
  const handleSendEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast("Please enter a valid email address");
      return;
    }

    setIsSendingOtp(true);
    try {
      await sendEmailOtp(email.trim());
      setOtpSent(true);
      setOtpCode(['', '', '', '', '', '']);
      showToast(`Verification code sent to ${email}! Check your inbox.`);
    } catch (err: any) {
      console.error("Send OTP error:", err);
      // For testing if Supabase rate limits or invalid credentials in dev
      showToast(err.message || "Failed to send OTP code.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // 3. Verify 6-Digit Email OTP
  const handleVerifyEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otpCode.join('');
    if (token.length !== 6) {
      showToast("Please enter the complete 6-digit verification code");
      return;
    }

    setIsVerifying(true);
    try {
      const data = await verifyEmailOtp(email.trim(), token);
      if (data?.user) {
        updateCustomerProfile({
          id: data.user.id,
          email: data.user.email || email,
          name: data.user.user_metadata?.full_name || email.split('@')[0],
          isLoggedIn: true
        });
        showToast("✓ Welcome to Z NATURALS! Logged in successfully.");
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err: any) {
      console.error("Verify OTP error:", err);
      showToast(err.message || "Invalid or expired OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otpCode];
    updated[index] = val;
    setOtpCode(updated);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`email-otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`email-otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // GPS Auto-detect for logged in profile
  const handleGpsDetect = async () => {
    setIsDetectingGps(true);
    try {
      const loc = await requestBrowserGeolocation();
      setNewPincode(loc.pincode || '630001');
      setNewCity(loc.city);
      setNewState(loc.state);
      if (loc.formattedAddress) {
        setNewStreet(loc.formattedAddress.split(',')[0]);
      }
      setCustomerPincode(loc.pincode || '630001');
      showToast(`📍 Detected: ${loc.city}, ${loc.state} (${loc.pincode})`);
    } catch (err: any) {
      showToast(err.message || "Could not detect GPS location.");
    } finally {
      setIsDetectingGps(false);
    }
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim() || !newPincode.trim()) {
      showToast("Please provide street address and pincode");
      return;
    }

    addSavedAddress({
      street: newStreet,
      landmark: newLandmark,
      city: newCity,
      state: newState,
      pincode: newPincode,
      isDefault: customerProfile.addresses.length === 0
    });

    setNewStreet('');
    setNewLandmark('');
    showToast("Address saved to profile!");
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (e) {
      // Ignore
    }
    logoutCustomer();
    setOtpSent(false);
    setEmail('');
    setOtpCode(['', '', '', '', '', '']);
    showToast("Logged out successfully");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Luxury Slide-Out Drawer (Right Side - Vilvah Style) */}
      <div className="relative w-full max-w-md bg-botanical-ivory h-full shadow-2xl border-l-2 border-champagne-gold/60 z-10 flex flex-col transform transition-transform duration-500 ease-in-out">
        
        {/* Luxury Header */}
        <div className="p-5 bg-deep-forest text-botanical-ivory flex items-center justify-between border-b border-champagne-gold/40 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-champagne-gold/20 border border-champagne-gold/60 flex items-center justify-center text-champagne-gold">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-lg text-botanical-ivory leading-tight font-bold">
                {isLoggedIn ? 'Your Botanical Account' : 'Welcome to Z NATURALS'}
              </h3>
              <p className="text-[11px] text-champagne-gold font-sans uppercase tracking-wider mt-0.5">
                {isLoggedIn ? (customerProfile.email || `+91 ${customerProfile.phone}`) : "Chettinad Botanical Care"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-botanical-ivory/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {isLoggedIn ? (
            /* ========================================================
               VIEW 1: LOGGED IN USER PROFILE & ORDERS
               ======================================================== */
            <div className="space-y-6">
              
              {/* Profile Card */}
              <div className="p-4 rounded-2xl bg-white border border-warm-sand shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-deep-forest text-base">
                      {customerProfile.name || 'Valued Customer'}
                    </h4>
                    {customerProfile.email && (
                      <p className="text-xs text-charcoal/70">{customerProfile.email}</p>
                    )}
                    {customerProfile.phone && (
                      <p className="text-xs text-charcoal/70 font-mono">+91 {customerProfile.phone}</p>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              {/* Saved Addresses Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-deep-forest uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sage-green" /> Saved Addresses ({customerProfile.addresses.length})
                  </span>
                </div>

                {customerProfile.addresses.length === 0 ? (
                  <p className="text-xs text-charcoal/60 italic py-2">
                    No addresses saved yet. Use GPS auto-detect below to save one for fast 1-click orders.
                  </p>
                ) : (
                  customerProfile.addresses.map((addr) => (
                    <div 
                      key={addr.id}
                      onClick={() => {
                        setCustomerPincode(addr.pincode);
                        showToast(`Pincode set to ${addr.pincode}`);
                      }}
                      className="p-3 rounded-xl bg-white border border-warm-sand hover:border-champagne-gold cursor-pointer text-xs space-y-1 transition-all"
                    >
                      <div className="flex items-center justify-between font-bold text-deep-forest">
                        <span>{addr.city}, {addr.state}</span>
                        <span className="font-mono bg-sage-green/10 text-sage-green px-2 py-0.5 rounded text-[11px]">
                          {addr.pincode}
                        </span>
                      </div>
                      <p className="text-charcoal/80 leading-snug">{addr.street}</p>
                      {addr.landmark && <p className="text-charcoal/60 text-[11px]">Landmark: {addr.landmark}</p>}
                    </div>
                  ))
                )}

                {/* Add Address Form */}
                <div className="p-3.5 rounded-2xl bg-white border border-warm-sand/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-deep-forest">Add New Address</span>
                    <button
                      type="button"
                      onClick={handleGpsDetect}
                      disabled={isDetectingGps}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sage-green/10 text-deep-forest text-[11px] font-semibold hover:bg-sage-green/20"
                    >
                      <Navigation className={`w-3 h-3 text-sage-green ${isDetectingGps ? 'animate-spin' : ''}`} />
                      <span>{isDetectingGps ? 'Detecting...' : 'Auto-Detect GPS'}</span>
                    </button>
                  </div>

                  <form onSubmit={handleSaveAddress} className="space-y-2 text-xs">
                    <input
                      type="text"
                      required
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      placeholder="Door No, Street Name, Area"
                      className="w-full px-3 py-2 rounded-xl bg-botanical-ivory border border-warm-sand"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={newLandmark}
                        onChange={(e) => setNewLandmark(e.target.value)}
                        placeholder="Landmark"
                        className="w-full px-3 py-2 rounded-xl bg-botanical-ivory border border-warm-sand"
                      />
                      <input
                        type="text"
                        required
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        placeholder="City"
                        className="w-full px-3 py-2 rounded-xl bg-botanical-ivory border border-warm-sand"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                        placeholder="State"
                        className="w-full px-3 py-2 rounded-xl bg-botanical-ivory border border-warm-sand"
                      />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={newPincode}
                        onChange={(e) => setNewPincode(e.target.value.replace(/\D/g, ''))}
                        placeholder="6-Digit PIN"
                        className="w-full px-3 py-2 rounded-xl bg-botanical-ivory border border-warm-sand font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-deep-forest text-botanical-ivory font-bold uppercase tracking-wider text-xs hover:bg-deep-forest-dark"
                    >
                      Save Address
                    </button>
                  </form>
                </div>
              </div>

              {/* Past Orders List */}
              {customerOrders.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-warm-sand">
                  <span className="text-xs font-bold text-deep-forest uppercase tracking-wider flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-sage-green" /> Your Past Orders ({customerOrders.length})
                  </span>
                  <div className="space-y-2">
                    {customerOrders.slice(0, 3).map((ord) => (
                      <div key={ord.id} className="p-3 rounded-xl bg-white border border-warm-sand text-xs space-y-1">
                        <div className="flex justify-between font-bold text-deep-forest">
                          <span className="font-mono">{ord.id}</span>
                          <span>₹{ord.total}</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-charcoal/70">
                          <span>{ord.items.length} items • {ord.paymentMethod}</span>
                          <span className="font-semibold text-emerald-700">{ord.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* ========================================================
               VIEW 2: FAST & SECURE EMAIL OTP LOGIN
               ======================================================== */
            <div className="space-y-6">
              
              {/* Brand Perks Pill */}
              <div className="p-4 rounded-2xl bg-white border border-warm-sand/80 shadow-xs space-y-2">
                <div className="text-xs font-bold text-deep-forest uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-champagne-gold" /> Member Privileges
                </div>
                <div className="text-xs text-charcoal/80 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sage-green">✓</span>
                    <span>Exclusive Free COD Delivery in Karaikudi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sage-green">✓</span>
                    <span>1-Click Reorder & Real-time Delivery Tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sage-green">✓</span>
                    <span>Saved Prescriptions from AI Skin & Hair Advisor</span>
                  </div>
                </div>
              </div>

              {/* EMAIL OTP LOGIN FORM (DIRECT & FRICTIONLESS) */}
              <div className="space-y-4">
                {!otpSent ? (
                  /* Step 1: Enter Email */
                  <form onSubmit={handleSendEmailOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-deep-forest mb-1.5">
                        Enter your Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. yourname@gmail.com"
                          className="w-full pl-9 pr-3 py-3 rounded-xl bg-white border border-warm-sand text-xs font-medium focus:outline-none focus:border-deep-forest shadow-xs"
                        />
                      </div>
                      <p className="text-[11px] text-charcoal/60 mt-1">
                        We will send a 6-digit verification code to your email for passwordless sign-in.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSendingOtp}
                      className="w-full py-3.5 px-4 rounded-xl bg-deep-forest text-botanical-ivory font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-deep-forest-dark transition-all shadow-botanical disabled:opacity-50 active:scale-[0.99]"
                    >
                      {isSendingOtp ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-champagne-gold" />
                          <span>Sending Verification Code...</span>
                        </>
                      ) : (
                        <>
                          <span>Send 6-Digit OTP</span>
                          <ArrowRight className="w-4 h-4 text-champagne-gold" />
                        </>
                      )}
                    </button>

                    <div className="text-[10px] text-center text-charcoal/60 flex items-center justify-center gap-1.5 pt-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-sage-green" />
                      <span>Secured with Supabase End-to-End Encryption</span>
                    </div>
                  </form>
                ) : (
                  /* Step 2: Enter 6-Digit OTP Code */
                  <form onSubmit={handleVerifyEmailOtp} className="space-y-4">
                    <div className="text-center space-y-1">
                      <span className="text-xs font-bold text-sage-green uppercase tracking-wider">
                        Enter Verification Code
                      </span>
                      <p className="text-xs text-charcoal/70">
                        We have sent a 6-digit code to <strong className="text-deep-forest">{email}</strong>
                      </p>
                    </div>

                    {/* 6 Clean Input Boxes */}
                    <div className="flex justify-center gap-1.5 sm:gap-2 py-2">
                      {otpCode.map((digit, i) => (
                        <input
                          key={i}
                          id={`email-otp-input-${i}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpDigitChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          className="w-10 sm:w-11 h-12 text-center font-mono font-extrabold text-xl rounded-xl bg-white border-2 border-warm-sand focus:border-deep-forest focus:outline-none shadow-xs"
                        />
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={isVerifying || otpCode.join('').length !== 6}
                      className="w-full py-3.5 px-4 rounded-xl bg-deep-forest text-botanical-ivory font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-deep-forest-dark transition-all shadow-botanical disabled:opacity-50 active:scale-[0.99]"
                    >
                      {isVerifying ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-champagne-gold" />
                          <span>Verifying Code...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-champagne-gold" />
                          <span>Verify & Enter Store</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between text-xs text-charcoal/70 pt-1">
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="underline hover:text-deep-forest"
                      >
                        Change Email
                      </button>
                      <button
                        type="button"
                        onClick={handleSendEmailOtp}
                        disabled={isSendingOtp}
                        className="font-bold text-sage-green hover:underline flex items-center gap-1"
                      >
                        <RefreshCw className={`w-3 h-3 ${isSendingOtp ? 'animate-spin' : ''}`} /> Resend OTP
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Drawer Footer Seal */}
        <div className="p-4 bg-botanical-ivory border-t border-warm-sand/60 text-center text-[10px] text-charcoal/60 flex items-center justify-center gap-1.5 flex-shrink-0">
          <Leaf className="w-3 h-3 text-sage-green" />
          <span>Z NATURALS — Botanical Beauty & Personal Care • Karaikudi</span>
        </div>

      </div>
    </div>
  );
};
