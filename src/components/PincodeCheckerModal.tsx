import React, { useState } from 'react';
import { X, MapPin, Truck, CheckCircle2, AlertCircle, Phone, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { KARAIKUDI_PINCODES } from '../config/storeConfig';

interface PincodeCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PincodeCheckerModal: React.FC<PincodeCheckerModalProps> = ({
  isOpen,
  onClose
}) => {
  const { customerPincode, verifyPincode, isPincodeEligible, addToWaitlist } = useStore();

  const [inputPincode, setInputPincode] = useState(customerPincode);
  const [result, setResult] = useState<{ checked: boolean; eligible: boolean; message: string }>({
    checked: true,
    eligible: isPincodeEligible,
    message: isPincodeEligible
      ? 'Eligible for FREE Karaikudi Cash on Delivery (Delivered Daily between 8:00 AM – 4:00 PM)'
      : 'Free COD is currently available only in Karaikudi.'
  });

  const [waitlistPhone, setWaitlistPhone] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const res = verifyPincode(inputPincode);
    setResult({
      checked: true,
      eligible: res.eligible,
      message: res.message
    });
  };

  const handleQuickSelect = (pin: string) => {
    setInputPincode(pin);
    const res = verifyPincode(pin);
    setResult({
      checked: true,
      eligible: res.eligible,
      message: res.message
    });
  };

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistPhone.trim()) return;
    addToWaitlist(waitlistPhone, inputPincode);
    setWaitlistSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-soft-white rounded-3xl max-w-lg w-full shadow-2xl border border-warm-sand overflow-hidden z-10 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-deep-forest hover:bg-botanical-ivory transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-botanical-ivory border border-champagne-gold/60 flex items-center justify-center mx-auto text-deep-forest">
            <MapPin className="w-7 h-7 text-sage-green" />
          </div>

          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-deep-forest">
            Karaikudi Free COD Delivery
          </h3>

          <p className="text-xs sm:text-sm text-charcoal/70 max-w-sm mx-auto">
            Free doorstep delivery is available exclusively within Karaikudi daily between 
            <strong className="text-deep-forest"> 8:00 AM – 4:00 PM</strong>.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCheck} className="mt-6 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              required
              maxLength={6}
              value={inputPincode}
              onChange={(e) => setInputPincode(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 6-digit Pincode"
              className="flex-1 px-4 py-2.5 rounded-xl bg-botanical-ivory border border-warm-sand text-sm font-mono focus:outline-none focus:ring-1 focus:ring-deep-forest"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-deep-forest text-botanical-ivory font-bold text-xs uppercase tracking-wider hover:bg-deep-forest-dark transition-all"
            >
              Verify
            </button>
          </div>
        </form>

        {/* Quick Karaikudi Pincode Pills for Demo / Testing */}
        <div className="mt-4 pt-3 border-t border-warm-sand/50">
          <span className="text-[11px] font-bold text-sage-green uppercase tracking-wider block mb-2">
            Quick Select Karaikudi Postal Sectors:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {KARAIKUDI_PINCODES.map((pin) => (
              <button
                key={pin}
                onClick={() => handleQuickSelect(pin)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  inputPincode === pin
                    ? 'bg-deep-forest text-botanical-ivory font-bold'
                    : 'bg-botanical-ivory text-charcoal hover:bg-warm-sand/60'
                }`}
              >
                {pin}
              </button>
            ))}
          </div>
        </div>

        {/* Result Feedback Banner */}
        {result.checked && (
          <div className="mt-5">
            {result.eligible ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>Eligible for Free Karaikudi COD!</span>
                </div>
                <p className="text-emerald-800 leading-relaxed">
                  Orders to <strong>{inputPincode}</strong> qualify for zero delivery charges. 
                  Delivered daily between <strong>8:00 AM – 4:00 PM</strong> directly to your home.
                </p>
                <button
                  onClick={onClose}
                  className="w-full mt-2 py-2.5 rounded-xl bg-deep-forest text-botanical-ivory font-bold uppercase tracking-wider hover:bg-deep-forest-dark text-[11px]"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3 text-xs">
                <div className="flex items-start gap-2 font-bold text-sm">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Exclusive to Karaikudi</span>
                </div>
                <p className="text-amber-800 leading-relaxed">
                  We currently offer Free Cash on Delivery exclusively within Karaikudi. 
                  Pan-India shipping and Chennai live experience stalls are launching soon!
                </p>

                {waitlistSubmitted ? (
                  <div className="p-2.5 bg-emerald-100 text-emerald-800 font-bold rounded-xl text-center">
                    ✓ You will be notified on WhatsApp when we launch in {inputPincode}!
                  </div>
                ) : (
                  <form onSubmit={handleWaitlist} className="pt-1 space-y-2">
                    <label className="text-[11px] font-semibold text-charcoal/80 block">
                      Enter your WhatsApp number to get notified when we launch in your area:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        required
                        value={waitlistPhone}
                        onChange={(e) => setWaitlistPhone(e.target.value)}
                        placeholder="WhatsApp Number"
                        className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-xs"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 rounded-lg bg-deep-forest text-botanical-ivory font-bold text-xs"
                      >
                        Notify Me
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
