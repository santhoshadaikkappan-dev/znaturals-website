import React from 'react';
import { MapPin, Calendar, Clock, Gift, Sparkles, Navigation, CheckCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../config/storeConfig';

export const LiveStallSection: React.FC = () => {
  const stall = BRAND_CONFIG.weekendLiveStall;

  const handleOpenMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Gandhi Square, Kallukatti, Karaikudi, Tamil Nadu")}`, '_blank');
  };

  return (
    <section id="karaikudi-live-stall" className="py-20 bg-deep-forest text-botanical-ivory relative overflow-hidden">
      {/* Decorative botanical leaf watermark pattern */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-sage-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-champagne-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Stall Details & Live Perks */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne-gold/20 border border-champagne-gold/40 text-champagne-gold text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Karaikudi Weekend Experience</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
                Visit Our Weekend Live Experience Stall in Karaikudi
              </h2>
              <p className="font-editorial text-xl sm:text-2xl text-champagne-gold italic">
                Touch, Smell & Feel Chettinad Botanicals in Person
              </p>
            </div>

            <p className="font-sans text-sm sm:text-base text-botanical-ivory/80 leading-relaxed max-w-2xl">
              Experience the unadulterated aroma of cold-pressed botanicals, wild turmeric, and slow-cooked hair oils. 
              Our botanical specialists are present every weekend in Karaikudi to diagnose your skin & scalp needs in real time.
            </p>

            {/* Time & Location Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Calendar className="w-5 h-5 text-champagne-gold mb-2" />
                <div className="text-xs text-botanical-ivory/60 uppercase tracking-wider font-semibold">Every Weekend</div>
                <div className="font-serif font-bold text-base text-botanical-ivory mt-0.5">Fri, Sat & Sun</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Clock className="w-5 h-5 text-champagne-gold mb-2" />
                <div className="text-xs text-botanical-ivory/60 uppercase tracking-wider font-semibold">Evening Hours</div>
                <div className="font-serif font-bold text-base text-botanical-ivory mt-0.5">5:30 PM – 9:30 PM</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-champagne-gold mb-2" />
                <div className="text-xs text-botanical-ivory/60 uppercase tracking-wider font-semibold">Stall Location</div>
                <div className="font-serif font-bold text-sm text-botanical-ivory mt-0.5 truncate" title={stall.location}>
                  {stall.location}
                </div>
              </div>

            </div>

            {/* Stall Experience Perks List */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-champagne-gold">
                Live Stall Highlights:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-botanical-ivory/90">
                {stall.perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-champagne-gold flex-shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direction Button */}
            <div className="pt-2">
              <button
                onClick={handleOpenMaps}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-champagne-gold text-deep-forest font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-lg group"
              >
                <Navigation className="w-4 h-4 text-deep-forest group-hover:rotate-45 transition-transform" />
                <span>Get Directions to Karaikudi Stall</span>
              </button>
            </div>

          </div>

          {/* Right Column: Stall Visuals Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-champagne-gold/40 shadow-2xl bg-soft-white aspect-[4/5] group">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85"
                alt="Z Naturals Live Stall in Karaikudi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-transparent to-black/20" />

              {/* Bottom Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-botanical-ivory/95 backdrop-blur-md border border-warm-sand text-deep-forest">
                <div className="flex items-center gap-2 text-xs font-bold text-sage-green uppercase tracking-wider mb-1">
                  <Gift className="w-4 h-4 text-champagne-gold" />
                  Weekend Special Gift
                </div>
                <h4 className="font-serif font-bold text-lg leading-tight">
                  Free Chettinad Ubtan Sample
                </h4>
                <p className="text-xs text-charcoal/70 mt-1">
                  Mention this website at our Kallukatti Gandhi Square live stall to receive a complimentary 20g Herbal Ubtan Bath Powder.
                </p>
              </div>

              {/* Live Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-emerald-600/90 text-white text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-sm shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Live Every Weekend in Karaikudi</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
