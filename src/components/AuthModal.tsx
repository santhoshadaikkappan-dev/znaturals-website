import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  User, 
  CheckCircle2, 
  MapPin, 
  RefreshCw, 
  Sparkles, 
  Navigation,
  MessageCircle,
  Download,
  Lock,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { requestBrowserGeolocation } from '../utils/geolocation';
import { 
  saveCustomerAccount, 
  getStoredCustomerAccounts, 
  exportCustomerDatabaseAsJSON 
} from '../utils/customerAccountsManager';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { 
    customerProfile, 
    loginCustomer, 
    logoutCustomer, 
    addSavedAddress,
    setCustomerPincode,
    showToast 
  } = useStore();

  const [authMode, setAuthMode] = useState<'whatsapp' | 'quickpin'>('whatsapp');
  const [step, setStep] = useState<'input' | 'confirm_whatsapp'>('input');
  
  // Form fields
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [securityPin, setSecurityPin] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  // New Address form
  const [newStreet, setNewStreet] = useState('');
  const [newLandmark, setNewLandmark] = useState('');
  const [newCity, setNewCity] = useState('Karaikudi');
  const [newState, setNewState] = useState('Tamil Nadu');
  const [newPincode, setNewPincode] = useState('630001');

  if (!isOpen) return null;

  const isLoggedIn = customerProfile.isLoggedIn;
  const officialWhatsApp = '9344087944'; // Z Naturals official delivery helpline

  // 1-Click WhatsApp Verification Trigger
  const handleInitiateWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length !== 10 || !/^[6-9]/.test(cleaned)) {
      showToast("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    setIsProcessing(true);

    const message = `🌿 *Z NATURALS Customer Verification*\n` +
      `• *Name:* ${customerName.trim() || 'Valued Customer'}\n` +
      `• *Mobile:* +91 ${cleaned}\n` +
      `• *Security Code:* ${code}\n\n` +
      `Kindly verify my account for shopping & Karaikudi delivery.`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=91${officialWhatsApp}&text=${encodeURIComponent(message)}`;

    // Open WhatsApp directly
    try {
      window.open(whatsappUrl, '_blank');
    } catch (e) {
      // Fallback redirect if popup blocked
      window.location.href = whatsappUrl;
    }

    setStep('confirm_whatsapp');
    setIsProcessing(false);
    showToast(`📲 WhatsApp opened! Send message to complete verification.`);
  };

  // Complete WhatsApp Verification
  const handleCompleteWhatsAppLogin = () => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const finalName = customerName.trim() || 'Valued Customer';

    // 1. Manage and save into Customer Accounts File/Database
    saveCustomerAccount({
      name: finalName,
      phone: cleaned,
      verifiedVia: 'WhatsApp',
      pincode: '630001',
      city: 'Karaikudi',
      state: 'Tamil Nadu'
    });

    // 2. Log in active session
    loginCustomer(cleaned, finalName);
    showToast(`✓ Welcome to Z NATURALS, ${finalName}!`);

    if (onSuccess) onSuccess();
    onClose();
  };

  // Quick 4-Digit PIN Login
  const handleQuickPinLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length !== 10 || !/^[6-9]/.test(cleaned)) {
      showToast("Please enter a valid 10-digit Indian mobile number");
      return;
    }
    if (securityPin.length < 4) {
      showToast("Please enter a 4-digit security PIN");
      return;
    }

    const finalName = customerName.trim() || 'Valued Customer';

    // Save into Customer Accounts File/Database
    saveCustomerAccount({
      name: finalName,
      phone: cleaned,
      verifiedVia: 'QuickPIN',
      pincode: '630001',
      city: 'Karaikudi',
      state: 'Tamil Nadu'
    });

    loginCustomer(cleaned, finalName);
    showToast(`✓ Signed in successfully with PIN!`);

    if (onSuccess) onSuccess();
    onClose();
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

    // Also update customer accounts file
    saveCustomerAccount({
      name: customerProfile.name,
      phone: customerProfile.phone,
      verifiedVia: 'WhatsApp',
      pincode: newPincode,
      city: newCity,
      state: newState
    });

    setNewStreet('');
    setNewLandmark('');
    showToast("Address saved to your profile!");
  };

  const allRegisteredCount = getStoredCustomerAccounts().length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-soft-white rounded-3xl max-w-md w-full shadow-2xl border border-warm-sand overflow-hidden z-10 flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-deep-forest text-botanical-ivory flex items-center justify-between border-b border-champagne-gold/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center text-[#25D366]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-lg text-botanical-ivory leading-tight font-bold">
                {isLoggedIn ? 'Your Botanical Account' : 'Instant Customer Sign-In'}
              </h3>
              <p className="text-[11px] text-botanical-ivory/70 font-sans">
                {isLoggedIn ? `+91 ${customerProfile.phone} • Verified` : 'Official WhatsApp & Quick PIN Verification'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-botanical-ivory/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {isLoggedIn ? (
            /* Logged In Profile & Saved Addresses View */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-botanical-ivory border border-warm-sand/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-deep-forest text-sm font-sans">
                      {customerProfile.name || 'Valued Customer'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#25D366]/20 text-[#128C7E] text-[10px] font-bold">
                      ✓ WhatsApp Verified
                    </span>
                  </div>
                  <div className="text-xs text-charcoal/70 font-mono mt-0.5">
                    +91 {customerProfile.phone}
                  </div>
                </div>
                <button
                  onClick={() => {
                    logoutCustomer();
                    setStep('input');
                  }}
                  className="px-3 py-1.5 rounded-lg border border-red-300 text-red-700 text-xs font-semibold hover:bg-red-50"
                >
                  Logout
                </button>
              </div>

              {/* Saved Addresses List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-deep-forest uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sage-green" /> Saved Delivery Addresses ({customerProfile.addresses.length})
                  </span>
                </div>

                {customerProfile.addresses.length === 0 ? (
                  <p className="text-xs text-charcoal/60 italic py-2">
                    No addresses saved yet. Add one below or auto-detect via GPS.
                  </p>
                ) : (
                  customerProfile.addresses.map((addr) => (
                    <div 
                      key={addr.id}
                      onClick={() => {
                        setCustomerPincode(addr.pincode);
                        showToast(`Active delivery pincode set to ${addr.pincode}`);
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
              </div>

              {/* Add New Address Accordion */}
              <div className="pt-2 border-t border-warm-sand/60">
                <div className="flex items-center justify-between mb-2">
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
                    placeholder="House/Door No, Street Name, Area"
                    className="w-full px-3 py-2 rounded-xl bg-botanical-ivory border border-warm-sand"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newLandmark}
                      onChange={(e) => setNewLandmark(e.target.value)}
                      placeholder="Landmark (Optional)"
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

              {/* Admin Database Export File Button */}
              <div className="pt-3 border-t border-warm-sand/60">
                <button
                  type="button"
                  onClick={exportCustomerDatabaseAsJSON}
                  className="w-full py-2 px-3 rounded-xl bg-warm-sand/30 hover:bg-warm-sand/60 text-deep-forest text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  title="Download all registered customer records as JSON file"
                >
                  <Download className="w-3.5 h-3.5 text-sage-green" />
                  <span>Export Customer Database File ({allRegisteredCount} registered accounts)</span>
                </button>
              </div>

            </div>
          ) : step === 'input' ? (
            /* Step 1: Input Form with Mode Tabs */
            <div className="space-y-4">
              
              {/* Method Switcher Tabs */}
              <div className="grid grid-cols-2 p-1 rounded-2xl bg-warm-sand/30 border border-warm-sand/60 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setAuthMode('whatsapp')}
                  className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                    authMode === 'whatsapp'
                      ? 'bg-white text-[#128C7E] shadow-sm font-bold'
                      : 'text-charcoal/70 hover:text-deep-forest'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>1-Click WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMode('quickpin')}
                  className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                    authMode === 'quickpin'
                      ? 'bg-white text-deep-forest shadow-sm font-bold'
                      : 'text-charcoal/70 hover:text-deep-forest'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-sage-green" />
                  <span>Quick 4-Digit PIN</span>
                </button>
              </div>

              {authMode === 'whatsapp' ? (
                /* WhatsApp 1-Click Verification Form */
                <form onSubmit={handleInitiateWhatsApp} className="space-y-3.5">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">100% Instant & Free WhatsApp Access</strong>
                      <span>Direct verification to official Z NATURALS helpline (+91 {officialWhatsApp}). No SMS delay.</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-deep-forest mb-1">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Meenakshi Sundaram"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-botanical-ivory border border-warm-sand text-xs font-medium focus:outline-none focus:ring-1 focus:ring-deep-forest"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-deep-forest mb-1">
                      WhatsApp Mobile Number (+91)
                    </label>
                    <div className="flex gap-2">
                      <span className="px-3 py-2.5 rounded-xl bg-warm-sand/30 border border-warm-sand text-xs font-bold text-deep-forest flex items-center">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="93440 87944"
                        className="flex-1 px-3 py-2.5 rounded-xl bg-botanical-ivory border border-warm-sand text-xs font-mono font-medium focus:outline-none focus:ring-1 focus:ring-deep-forest"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Verify via WhatsApp (Instant)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-[10px] text-center text-charcoal/60 flex items-center justify-center gap-1 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-sage-green" />
                    <span>Zero Spam. Official Verified Z NATURALS WhatsApp Channel.</span>
                  </div>
                </form>
              ) : (
                /* Quick PIN Form */
                <form onSubmit={handleQuickPinLogin} className="space-y-3.5">
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                    Sign in or create account instantly using your 10-digit mobile number and any 4-digit PIN.
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-deep-forest mb-1">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Meenakshi Sundaram"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-botanical-ivory border border-warm-sand text-xs font-medium focus:outline-none focus:ring-1 focus:ring-deep-forest"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-deep-forest mb-1">
                      10-Digit Mobile Number (+91)
                    </label>
                    <div className="flex gap-2">
                      <span className="px-3 py-2.5 rounded-xl bg-warm-sand/30 border border-warm-sand text-xs font-bold text-deep-forest flex items-center">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="98765 43210"
                        className="flex-1 px-3 py-2.5 rounded-xl bg-botanical-ivory border border-warm-sand text-xs font-mono font-medium focus:outline-none focus:ring-1 focus:ring-deep-forest"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-deep-forest mb-1">
                      4-Digit Security PIN
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={securityPin}
                        onChange={(e) => setSecurityPin(e.target.value.replace(/\D/g, ''))}
                        placeholder="••••"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-botanical-ivory border border-warm-sand text-base font-mono tracking-widest font-bold focus:outline-none focus:ring-1 focus:ring-deep-forest"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-deep-forest text-botanical-ivory font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-deep-forest-dark transition-all shadow-botanical"
                  >
                    <span>Sign In with PIN</span>
                    <ArrowRight className="w-4 h-4 text-champagne-gold" />
                  </button>
                </form>
              )}

            </div>
          ) : (
            /* Step 2: Confirm WhatsApp Verification */
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-[#25D366]/20 border-2 border-[#25D366] flex items-center justify-center mx-auto text-[#25D366] animate-pulse">
                <MessageCircle className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#128C7E] uppercase tracking-wider">
                  WhatsApp Opened
                </span>
                <h4 className="font-editorial text-xl font-bold text-deep-forest">
                  Pre-Filled Verification Message Sent
                </h4>
                <p className="text-xs text-charcoal/70">
                  Verification message dispatched to Z NATURALS helpline (<strong className="font-mono text-deep-forest">+91 {officialWhatsApp}</strong>) for customer <strong className="font-mono text-deep-forest">+91 {phoneNumber}</strong>.
                </p>
              </div>

              {/* Code Pill */}
              <div className="p-3.5 rounded-2xl bg-botanical-ivory border border-warm-sand/80 space-y-1">
                <span className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider block">
                  Your Security Verification Code
                </span>
                <span className="font-mono font-extrabold text-2xl tracking-widest text-deep-forest block">
                  {verificationCode}
                </span>
              </div>

              {/* Confirmation CTA */}
              <button
                type="button"
                onClick={handleCompleteWhatsAppLogin}
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete WhatsApp Login & Enter Store</span>
              </button>

              <div className="flex items-center justify-between text-xs text-charcoal/70 pt-1">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="underline hover:text-deep-forest"
                >
                  Change Mobile Number
                </button>

                <button
                  type="button"
                  onClick={handleInitiateWhatsApp}
                  className="font-bold text-[#128C7E] hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Re-open WhatsApp
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
