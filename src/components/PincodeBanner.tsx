import React, { useState } from 'react';
import { MapPin, Truck, CheckCircle2, Clock, AlertCircle, Compass } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { KARAIKUDI_PINCODES } from '../config/storeConfig';
import { detectCurrentLocation } from '../utils/geolocation';

export const PincodeBanner: React.FC = () => {
  const { customerPincode, verifyPincode, deliveryInfo, setCustomerCity, setCustomerState } = useStore();
  const [pin, setPin] = useState(customerPincode);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin || pin.length < 6) return;
    const res = verifyPincode(pin);
    if (res.isKaraikudi) {
      setFeedback('✓ Eligible for FREE Doorstep Cash on Delivery in Karaikudi! Daily 8:00 AM – 4:00 PM.');
    } else {
      setFeedback(`✓ Delivery Available to ${pin} via Express Courier (${res.slabDescription}).`);
    }
  };

  const handleQuickPick = (p: string) => {
    setPin(p);
    const res = verifyPincode(p);
    setFeedback('✓ Eligible for FREE Doorstep Cash on Delivery in Karaikudi! Daily 8:00 AM – 4:00 PM.');
  };

  const handleGPSDetect = async () => {
    setIsLocating(true);
    const geo = await detectCurrentLocation();
    setIsLocating(false);
    if (geo.pincode) {
      setPin(geo.pincode);
      if (geo.city) setCustomerCity(geo.city);
      if (geo.state) setCustomerState(geo.state);
      const res = verifyPincode(geo.pincode);
      if (res.isKaraikudi) {
        setFeedback(`✓ GPS Detected: ${geo.city || 'Karaikudi'} (${geo.pincode}) — 100% Free Local COD!`);
      } else {
        setFeedback(`✓ GPS Detected: ${geo.city || ''} (${geo.pincode}) — Express Courier Available!`);
      }
    }
  };

  return (
    <section id="pincode-checker-section" className="py-10 bg-soft-white border-y border-warm-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-6 sm:p-8 rounded-3xl bg-botanical-ivory border border-warm-sand shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left Info */}
          <div className="space-y-2 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deep-forest text-botanical-ivory text-[11px] font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5 text-champagne-gold" />
              <span>Doorstep Delivery All Across India</span>
            </div>
            
            <h3 className="font-serif font-bold text-2xl text-deep-forest">
              Free Local COD in Karaikudi & Fast Express Courier Pan-India
            </h3>
            
            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
              <strong>Karaikudi Local (Zone A):</strong> Delivered daily between <strong>8:00 AM – 4:00 PM</strong> with zero shipping fee.<br />
              <strong>Rest of India (Zone B):</strong> Fast weight-based courier dispatch via Delhivery/BlueDart (Free on ₹1499+).
            </p>

            {/* Quick sectors */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-charcoal/60 text-[11px] font-semibold">Karaikudi Sectors:</span>
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
              {/* Karaikudi COD Direct Contact */}
              <div className="pt-2 flex items-center gap-2 text-xs text-charcoal/80">
                <span className="font-semibold text-deep-forest">Local Delivery Helpline:</span>
                <a href="tel:9344087944" className="font-bold text-deep-forest font-mono underline hover:text-sage-green">
                  9344087944
                </a>
              </div>
            </div>
          </div>

          {/* Right Input Form */}
          <div className="w-full lg:max-w-md bg-white p-5 rounded-2xl border border-warm-sand shadow-sm space-y-3">
            <form onSubmit={handleVerify} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-deep-forest block">
                  Enter Delivery Pincode:
                </label>
                <button
                  type="button"
                  onClick={handleGPSDetect}
                  disabled={isLocating}
                  className="text-[11px] text-sage-green hover:text-deep-forest flex items-center gap-1 font-semibold underline"
                >
                  <Compass className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                  {isLocating ? 'Detecting...' : 'Auto-Detect (GPS)'}
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 630001 or 600001"
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
                deliveryInfo.isKaraikudi 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                  : 'bg-blue-50 text-blue-900 border border-blue-200'
              }`}>
                {deliveryInfo.isKaraikudi ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Truck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                )}
                <span>{feedback}</span>
              </div>
            )}

            <div className="pt-2 border-t border-warm-sand/40 flex items-center justify-between text-[11px] text-charcoal/70">
              <span>Current Route: <strong className="text-deep-forest font-semibold">{deliveryInfo.zone}</strong></span>
              <span>{deliveryInfo.isKaraikudi ? 'Fee: ₹0.00' : 'Weight-Based Courier'}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
