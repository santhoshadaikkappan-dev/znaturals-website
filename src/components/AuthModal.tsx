import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  User, 
  CheckCircle2, 
  MapPin, 
  RefreshCw, 
  Sparkles, 
  Navigation,
  ShoppingBag,
  Truck,
  Leaf,
  Phone
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { requestBrowserGeolocation } from '../utils/geolocation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const GoogleSvg: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.6-5.2 3.6-9.15z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.73-2.08-6.67-4.89H1.28v3.15C3.27 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.33 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.28C.46 8.2 0 10.04 0 12s.46 3.8 1.28 5.42l4.05-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.64 1.28 6.58l4.05 3.15c.94-2.81 3.57-4.98 6.67-4.98z"
    />
  </svg>
);

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { 
    customerProfile, 
    loginWithGoogle,
    sendEmailLoginOtp,
    verifyEmailLoginOtp,
    logoutCustomer, 
    addSavedAddress,
    setCustomerPincode,
    setIsCheckoutOpen,
    showToast 
  } = useStore();

  const [authStep, setAuthStep] = useState<'input' | 'otp_verify'>('input');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [demoCode, setDemoCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  // New Address form states
  const [newStreet, setNewStreet] = useState('');
  const [newLandmark, setNewLandmark] = useState('');
  const [newCity, setNewCity] = useState('Karaikudi');
  const [newState, setNewState] = useState('Tamil Nadu');
  const [newPincode, setNewPincode] = useState('630001');

  if (!isOpen) return null;

  const isLoggedIn = customerProfile.isLoggedIn;

  // 1-Click Google OAuth Login via Supabase
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      showToast(err.message || "Failed to continue with Google");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Send 6-Digit Passwordless Email OTP via Supabase
  const handleSendEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setOtpCode(['', '', '', '', '', '']);

    try {
      const res = await sendEmailLoginOtp(email);
      if (res.success) {
        if (res.mockOtp) setDemoCode(res.mockOtp);
        setAuthStep('otp_verify');
        showToast(res.message);
      } else {
        showToast(res.message || "Could not send OTP code. Try again.");
      }
    } catch (err: any) {
      showToast(err.message || "Error sending email OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Verify 6-Digit Email OTP
  const handleVerifyEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otpCode.join('');
    if (enteredCode.length !== 6) {
      showToast("Please enter all 6 digits of your login code");
      return;
    }

    setIsLoading(true);
    try {
      const res = await verifyEmailLoginOtp(email, enteredCode);
      if (res.success) {
        showToast("✓ Welcome to Z NATURALS!");
        if (onSuccess) onSuccess();
        onClose();
      } else {
        showToast(res.message || "Invalid OTP code. Please re-check.");
      }
    } catch (err: any) {
      showToast(err.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otpCode];
    updated[index] = val;
    setOtpCode(updated);

    if (val && index < 5) {
      const nextInput = document.getElementById(`email-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleExpressGuestCheckout = () => {
    onClose();
    setIsCheckoutOpen(true);
  };

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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Right Slide-in Luxury Drawer (Vilvah / Luxury D2C Style) */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-botanical-ivory shadow-2xl border-l-2 border-champagne-gold/50 flex flex-col transform transition-transform duration-300 ease-out">
        
        {/* Luxury Drawer Header */}
        <div className="p-5 bg-deep-forest text-botanical-ivory flex items-center justify-between border-b border-champagne-gold/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-champagne-gold/20 border border-champagne-gold flex items-center justify-center text-champagne-gold">
              <Leaf className="w-5 h-5 text-champagne-gold" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-botanical-ivory leading-tight tracking-wide">
                Z NATURALS
              </h3>
              <p className="text-[10px] text-champagne-gold font-sans uppercase tracking-[0.2em] font-semibold">
                Botanical Beauty Account
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

        {/* Drawer Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {isLoggedIn ? (
            /* Logged-In Customer Account Overview */
            <div className="space-y-5">
              {/* Profile Card */}
              <div className="p-4 rounded-2xl bg-white border border-warm-sand shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-sage-green/15 text-deep-forest font-serif font-bold text-base flex items-center justify-center border border-sage-green/30">
                      {(customerProfile.name || customerProfile.email || 'U')[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-serif font-bold text-deep-forest text-base">
                        {customerProfile.name || 'Botanical Patron'}
                      </div>
                      <div className="text-xs text-charcoal/60 font-sans">
                        {customerProfile.email || `+91 ${customerProfile.phone}`}
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-warm-sand/50">
                  <span className="text-xs text-sage-green font-medium">Chettinad VIP Member</span>
                  <button
                    onClick={logoutCustomer}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 underline"
                  >
                    Sign Out
                  </button>
                </div>
              </div>

              {/* Express CTA */}
              <button
                onClick={handleExpressGuestCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-deep-forest text-botanical-ivory font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-deep-forest-dark transition-all shadow-botanical"
              >
                <ShoppingBag className="w-4 h-4 text-champagne-gold" />
                <span>Go to Checkout with Saved Addresses</span>
              </button>

              {/* Saved Delivery Addresses */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-deep-forest uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sage-green" /> Saved Addresses ({customerProfile.addresses.length})
                  </span>
                </div>

                {customerProfile.addresses.map((addr) => (
                  <div 
                    key={addr.id}
                    onClick={() => {
                      setCustomerPincode(addr.pincode);
                      showToast(`Delivery destination set to ${addr.pincode}`);
                    }}
                    className="p-3.5 rounded-xl bg-white border border-warm-sand hover:border-champagne-gold cursor-pointer text-xs space-y-1 transition-all shadow-xs"
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
                ))}
              </div>

              {/* Add New Address Accordion */}
              <div className="p-4 rounded-2xl bg-white border border-warm-sand/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-deep-forest">Add Delivery Address</span>
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

                <form onSubmit={handleSaveAddress} className="space-y-2.5 text-xs">
                  <input
                    type="text"
                    required
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    placeholder="House/Door No, Street Name, Area"
                    className="w-full px-3 py-2 rounded-xl bg-botanical-ivory border border-warm-sand focus:outline-none focus:ring-1 focus:ring-deep-forest"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newLandmark}
                      onChange={(e) => setNewLandmark(e.target.value)}
                      placeholder="Landmark (Optional)"
                      className="w-full px-3 py-2 rounded-xl bg-botanical-ivory border border-warm-sand focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder="City"
                      className="w-full px-3 py-2 rounded-xl bg-botanical-ivory border border-warm-sand focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={newState}
                      onChange={(e) => setNewState(e.target.value)}
                      placeholder="State"
                      className="w-full px-3 py-2 rounded-xl bg-botanical-ivory border border-warm-sand focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={newPincode}
                      onChange={(e) => setNewPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="6-Digit PIN"
                      className="w-full px-3 py-2 rounded-xl bg-botanical-ivory border border-warm-sand font-mono focus:outline-none"
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
          ) : authStep === 'input' ? (
            /* Step 1: Login Options (Google OAuth + Email OTP + Express Guest) */
            <div className="space-y-5">
              
              {/* Welcome Editorial Pitch */}
              <div className="text-center space-y-1.5 pt-2">
                <span className="text-[11px] font-bold text-champagne-gold uppercase tracking-widest font-sans">
                  Exclusive Botanical Member Access
                </span>
                <h4 className="font-serif font-bold text-2xl text-deep-forest">
                  Welcome Back
                </h4>
                <p className="text-xs text-charcoal/70 leading-relaxed font-sans max-w-xs mx-auto">
                  Sign in with 1-click for fast checkout, Karaikudi free COD priority, and order history.
                </p>
              </div>

              {/* 1. PRIMARY: Continue with Google (Supabase Auth) */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-white border-2 border-champagne-gold/60 text-deep-forest font-sans font-bold text-sm flex items-center justify-center gap-3 hover:bg-champagne-gold/10 hover:border-champagne-gold shadow-sm active:scale-[0.99] transition-all group"
              >
                {isGoogleLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin text-deep-forest" />
                ) : (
                  <GoogleSvg />
                )}
                <span>Continue with Google</span>
              </button>

              {/* Luxury Divider */}
              <div className="relative flex items-center justify-center">
                <div className="border-t border-warm-sand w-full" />
                <div className="bg-botanical-ivory px-3 text-[11px] font-semibold uppercase tracking-wider text-charcoal/60">
                  Or Login with Email OTP
                </div>
              </div>

              {/* 2. SECONDARY: Email OTP Login (Passwordless via Supabase) */}
              <form onSubmit={handleSendEmailOtp} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-deep-forest mb-1.5">
                    Your Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. priya.chettiar@gmail.com"
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border border-warm-sand text-xs font-medium focus:outline-none focus:ring-1 focus:ring-deep-forest"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-deep-forest text-botanical-ivory font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-deep-forest-dark transition-all shadow-botanical disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-champagne-gold" />
                      <span>Sending 6-Digit Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Send 6-Digit Login Code</span>
                      <ArrowRight className="w-4 h-4 text-champagne-gold" />
                    </>
                  )}
                </button>
              </form>

              {/* 3. EXPRESS GUEST CHECKOUT CARD (Karaikudi Exclusive) */}
              <div className="p-4 rounded-2xl bg-white border-2 border-dashed border-sage-green/40 text-left space-y-2 mt-6">
                <div className="flex items-center gap-2 text-deep-forest font-bold text-xs">
                  <Truck className="w-4 h-4 text-sage-green" />
                  <span>Shopping from Karaikudi? (630001–630006)</span>
                </div>
                <p className="text-[11px] text-charcoal/70 leading-relaxed font-sans">
                  No password needed. Place your order directly with your WhatsApp number & get 100% Free Doorstep Delivery between 8:00 AM – 4:00 PM.
                </p>
                <button
                  type="button"
                  onClick={handleExpressGuestCheckout}
                  className="w-full py-2.5 px-3 rounded-xl bg-sage-green text-white font-sans font-semibold text-xs hover:bg-sage-green/90 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Proceed to Express Guest Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Trust Badge */}
              <div className="text-[10px] text-center text-charcoal/60 flex items-center justify-center gap-1.5 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-sage-green" />
                <span>Protected by Supabase Row Level Security (RLS)</span>
              </div>

            </div>
          ) : (
            /* Step 2: 6-Digit Email OTP Verification Screen */
            <form onSubmit={handleVerifyEmailOtp} className="space-y-5 pt-2">
              <div className="text-center space-y-1.5">
                <span className="text-[11px] font-bold text-sage-green uppercase tracking-wider">
                  Verification Code
                </span>
                <h4 className="font-serif font-bold text-2xl text-deep-forest">
                  Check Your Inbox
                </h4>
                <p className="text-xs text-charcoal/70 leading-relaxed max-w-xs mx-auto">
                  We've sent a 6-digit login code to <strong className="font-semibold text-deep-forest">{email}</strong>
                </p>

                {demoCode && (
                  <div 
                    onClick={() => {
                      setOtpCode(demoCode.split(''));
                    }}
                    className="inline-block p-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold cursor-pointer hover:bg-amber-100 transition-colors mt-2"
                  >
                    ⚡ Demo Code: <span className="font-mono font-bold tracking-widest text-deep-forest">{demoCode}</span> (Click to auto-fill)
                  </div>
                )}
              </div>

              {/* 6 Clean Input Boxes */}
              <div className="flex justify-center gap-2 py-3">
                {otpCode.map((digit, i) => (
                  <input
                    key={i}
                    id={`email-otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpDigitChange(i, e.target.value)}
                    className="w-10 sm:w-12 h-12 sm:h-14 text-center font-mono font-extrabold text-xl rounded-xl bg-white border-2 border-warm-sand focus:border-deep-forest focus:outline-none shadow-xs"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading || otpCode.join('').length !== 6}
                className="w-full py-3.5 px-4 rounded-xl bg-deep-forest text-botanical-ivory font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-deep-forest-dark transition-all shadow-botanical disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-champagne-gold" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-champagne-gold" />
                    <span>Verify & Continue to Store</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-charcoal/70 pt-2 border-t border-warm-sand/60">
                <button
                  type="button"
                  onClick={() => setAuthStep('input')}
                  className="underline hover:text-deep-forest"
                >
                  Change Email
                </button>
                <button
                  type="button"
                  onClick={handleSendEmailOtp}
                  disabled={isLoading}
                  className="font-bold text-sage-green hover:underline flex items-center gap-1"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} /> Resend Code
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
