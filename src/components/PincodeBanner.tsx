import React, { useState } from 'react';
import { MapPin, Truck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { KARAIKUDI_PINCODES } from '../config/storeConfig';

export const PincodeBanner: React.FC = () => {
  const { customerPincode, verifyPincode, isPincodeEligible, addToWaitlist } = useStore();
  const [pin, setPin] = useState(customerPincode);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [waitlistPhone, setWaitlistPhone] = useState('');
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const res = verifyPincode(pin);
    setFeedback(res.message);
  };

  const handleQuickPick = (p: string) => {
    setPin(p);
    const res = verifyPincode(p);
    setFeedback(res.message);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistPhone.trim()) return;
    addToWaitlist(waitlistPhone, pin);
    setWaitlistSuccess(true);
  };

  return (
    <section id="pincode-checker-section" className="py-10 bg-soft-white border-y border-warm-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-6 sm:p-8 rounded-3xl bg-botanical-ivory border border-warm-sand shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left Info */}
          <div className="space-y-2 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deep-forest text-botanical-ivory text-[11px] font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5 text-champagne-gold" />
              <span>Karaikudi Exclusive COD</span>
            </div>
            
            <h3 className="font-serif font-bold text-2xl text-deep-forest">
              Free Doorstep Cash on Delivery in Karaikudi
            </h3>
            
            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
              We deliver daily between <strong>8:00 AM – 4:00 PM</strong> across all sectors of Karaikudi. 
              Zero shipping fee, zero prepayment needed. Direct COD Helpline: <strong className="text-deep-forest font-mono">9344087944</strong>.
            </p>

            {/* Quick sectors */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-charcoal/60 text-[11px] font-semibold">Active Hubs:</span>
              {KARAIKUDI_PINCODES.slice(0, 6).map((kPin) => (
                <button
                  key={kPin}
                  onClick={() => handleQuickPick(kPin)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                    pin === kPin ? 'bg-deep-forest text-botanical-ivory font-bold' : 'bg-white text-deep-forest border border-warm-sand hover:bg-warm-sand/30'
                  }`}
                >
                  {kPin}
                </button>
              ))}
            </div>
          </div>

          {/* Right Input Form */}
          <div className="w-full lg:max-w-md bg-white p-5 rounded-2xl border border-warm-sand shadow-sm space-y-3">
            <form onSubmit={handleVerify} className="space-y-2">
              <label className="text-xs font-bold text-deep-forest block">
                Verify Your Delivery Pincode:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 630001"
                  className="flex-1 px-3 py-2 rounded-xl bg-botanical-ivory border border-warm-sand text-xs font-mono focus:outline-none focus:ring-1 focus:ring-deep-forest"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-deep-forest text-botanical-ivory font-bold text-xs uppercase tracking-wider hover:bg-deep-forest-dark"
                >
                  Check
                </button>
              </div>
            </form>

            {feedback && (
              <div className={`p-2.5 rounded-xl text-xs flex items-start gap-2 ${
                isPincodeEligible 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                  : 'bg-amber-50 text-amber-900 border border-amber-200'
              }`}>
                {isPincodeEligible ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                )}
                <span>{feedback}</span>
              </div>
            )}

            {!isPincodeEligible && (
              <div className="pt-2 border-t border-warm-sand/40">
                {waitlistSuccess ? (
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold text-center">
                    ✓ You will be notified on WhatsApp when we launch in {pin}!
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-charcoal/80 block">
                      Get WhatsApp alert when we launch in {pin || 'your city'}:
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        required
                        value={waitlistPhone}
                        onChange={(e) => setWaitlistPhone(e.target.value)}
                        placeholder="WhatsApp Number"
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-botanical-ivory border border-warm-sand text-xs"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-lg bg-deep-forest text-botanical-ivory font-bold text-xs"
                      >
                        Notify Me
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
