import React, { useState } from 'react';
import { X, MapPin, Truck, CheckCircle2, Phone, Compass, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { KARAIKUDI_PINCODES } from '../config/storeConfig';
import { detectCurrentLocation } from '../utils/geolocation';
import { DeliveryCalculation } from '../utils/delivery';

interface PincodeCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PincodeCheckerModal: React.FC<PincodeCheckerModalProps> = ({
  isOpen,
  onClose
}) => {
  const { customerPincode, verifyPincode, deliveryInfo, setCustomerCity, setCustomerState } = useStore();

  const [inputPincode, setInputPincode] = useState(customerPincode);
  const [result, setResult] = useState<DeliveryCalculation>(deliveryInfo);
  const [isLocating, setIsLocating] = useState(false);

  if (!isOpen) return null;

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPincode || inputPincode.length < 6) return;
    const res = verifyPincode(inputPincode);
    setResult(res);
  };

  const handleQuickSelect = (pin: string) => {
    setInputPincode(pin);
    const res = verifyPincode(pin);
    setResult(res);
  };

  const handleGPS = async () => {
    setIsLocating(true);
    const geo = await detectCurrentLocation();
    setIsLocating(false);
    if (geo.pincode) {
      setInputPincode(geo.pincode);
      if (geo.city) setCustomerCity(geo.city);
      if (geo.state) setCustomerState(geo.state);
      const res = verifyPincode(geo.pincode);
      setResult(res);
    }
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
            Delivery Pincode & Routing
          </h3>

          <p className="text-xs sm:text-sm text-charcoal/70 max-w-sm mx-auto">
            Check your delivery options: <strong>100% Free COD in Karaikudi</strong> and <strong>Express Courier across Tamil Nadu & India</strong>.
          </p>
        </div>

        {/* Input Form with GPS Detect */}
        <form onSubmit={handleCheck} className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-deep-forest block">
              Enter 6-digit Pincode:
            </label>
            <button
              type="button"
              onClick={handleGPS}
              disabled={isLocating}
              className="text-[11px] text-sage-green hover:text-deep-forest flex items-center gap-1 font-semibold underline"
            >
              <Compass className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              {isLocating ? 'Detecting GPS...' : 'Use Current Location'}
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              required
              maxLength={6}
              value={inputPincode}
              onChange={(e) => setInputPincode(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 630001 or 600001"
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
        <div className="mt-5">
          {result.isKaraikudi ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Zone A: Express Doorstep Delivery in Karaikudi!</span>
              </div>
              <p className="text-emerald-800 leading-relaxed">
                Pincode <strong>{inputPincode}</strong> qualifies for <strong>Express Local Delivery</strong> ({result.slabDescription}). 
                Delivered daily between <strong>8:00 AM – 4:00 PM</strong> directly to your home via our local fleet.
              </p>
              <div className="pt-1 flex items-center justify-between text-[11px] text-emerald-900 font-semibold">
                <span>COD & Direct UPI Accepted</span>
                <span>Helpline: 9344087944</span>
              </div>
              <button
                onClick={onClose}
                className="w-full mt-2 py-2.5 rounded-xl bg-deep-forest text-botanical-ivory font-bold uppercase tracking-wider hover:bg-deep-forest-dark text-[11px]"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-sm text-blue-900">
                <Truck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Zone B: Express Courier Delivery Available!</span>
              </div>
              <p className="text-blue-800 leading-relaxed">
                We deliver to <strong>{inputPincode}</strong> via express air/surface courier (Delhivery/BlueDart).
              </p>
              <div className="p-2.5 rounded-xl bg-white/80 border border-blue-200 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Estimated Delivery:</span>
                  <span className="font-semibold text-deep-forest">2 – 4 Business Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Courier Fee:</span>
                  <span className="font-semibold text-deep-forest">Weight-based (₹49 base, Free on ₹1499+)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Payment Modes:</span>
                  <span className="font-semibold text-deep-forest">GPay, PhonePe, Paytm, COD, Cards</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-full mt-2 py-2.5 rounded-xl bg-deep-forest text-botanical-ivory font-bold uppercase tracking-wider hover:bg-deep-forest-dark text-[11px]"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
