import React from 'react';
import { Leaf, Award, Shield, Sparkles, Heart } from 'lucide-react';
import { BRAND_CONFIG } from '../config/storeConfig';

export const BotanicalStorySection: React.FC = () => {
  return (
    <section id="brand-story" className="py-20 bg-botanical-ivory border-b border-warm-sand/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              <div className="rounded-3xl overflow-hidden shadow-botanical-lg border-2 border-warm-sand/60 aspect-[4/5] bg-warm-sand/20 group">
                <img
                  src="./models/heritage_indian_man.jpg"
                  alt="Z Naturals Botanical Heritage Care"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Inset Quote Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 p-5 rounded-2xl bg-deep-forest text-botanical-ivory shadow-2xl border border-champagne-gold/40 max-w-xs text-left">
                <p className="font-editorial text-sm italic text-champagne-gold mb-1">
                  "{BRAND_CONFIG.tagline}"
                </p>
                <span className="text-[10px] uppercase font-bold tracking-widest text-botanical-ivory/80">
                  Chettinad Heritage Botanical Ethos
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-green/15 text-deep-forest text-xs font-semibold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5 text-sage-green" />
              <span>Our Chettinad Roots</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-deep-forest font-normal leading-tight">
                Rooted in Heritage. <br />
                <span className="italic font-serif text-sage-green">Formulated with Botanical Precision.</span>
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed">
              In the historic soil of Chettinad, beauty rituals were never synthetic. Families simmered fresh amla 
              and curry leaves over gentle wood embers, ground wild turmeric on granite stones, and distilled precious damask rose water.
            </p>

            <p className="font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed">
              At <strong>Z NATURALS</strong>, we honor these time-tested traditions by blending cold-pressed botanicals with modern bio-active scientific balancing. Every jar and bottle is free from synthetic petrochemicals, harsh sulfates, and artificial fragrances.
            </p>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-warm-sand/60">
              <div className="p-3.5 rounded-xl bg-soft-white border border-warm-sand/60">
                <div className="font-serif font-bold text-deep-forest text-base mb-1">Cold-Pressed</div>
                <p className="text-xs text-charcoal/70">Unheated botanical extraction preserving raw plant enzymes.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-soft-white border border-warm-sand/60">
                <div className="font-serif font-bold text-deep-forest text-base mb-1">Chettinad Herbs</div>
                <p className="text-xs text-charcoal/70">Sourced directly from native farmers and ethical cultivators.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-soft-white border border-warm-sand/60">
                <div className="font-serif font-bold text-deep-forest text-base mb-1">Small Batch</div>
                <p className="text-xs text-charcoal/70">Freshly crafted every week to guarantee active freshness.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
