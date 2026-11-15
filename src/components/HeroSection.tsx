import React from 'react';
import { Sparkles, ArrowRight, Truck, Leaf, Shield, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BRAND_CONFIG } from '../config/storeConfig';
import { PRODUCTS } from '../data/products';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const { setIsAiAdvisorOpen, setActiveProductModal } = useStore();

  return (
    <section className="relative overflow-hidden bg-botanical-ivory pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-warm-sand/50">
      {/* Decorative Subtle Botanical Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sage-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-warm-sand/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Brand Heritage Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-soft-white border border-champagne-gold/60 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-champagne-gold" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-deep-forest font-sans">
                Chettinad Botanical Formulations
              </span>
              <span className="text-champagne-gold font-serif text-xs">•</span>
              <span className="text-[11px] font-medium text-sage-green">
                Karaikudi Exclusive COD
              </span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-normal text-deep-forest leading-[1.08] tracking-tight">
                Radiant Beauty, <br className="hidden sm:inline" />
                <span className="font-serif italic text-sage-green font-normal">Naturally.</span>
              </h1>
              
              <h2 className="font-editorial text-xl sm:text-2xl text-deep-forest/90 italic font-normal tracking-wide pt-1">
                {BRAND_CONFIG.heroSubheadline}
              </h2>
            </div>

            {/* Sub-paragraph */}
            <p className="font-sans text-sm sm:text-base text-charcoal/80 max-w-xl leading-relaxed">
              Enriched with nature's finest cold-pressed botanicals, wild herbs, and Chettinad heritage ingredients. 
              Z NATURALS delivers pure, gentle, and results-driven personal care crafted for everyday elegance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Primary CTA */}
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-deep-forest text-botanical-ivory font-sans font-bold text-sm uppercase tracking-wider shadow-botanical hover:bg-deep-forest-dark hover:scale-[1.02] active:scale-[0.98] transition-all group"
              >
                <span>Explore Our Collection</span>
                <ArrowRight className="w-4 h-4 text-champagne-gold group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => setIsAiAdvisorOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-soft-white text-deep-forest border border-champagne-gold/60 font-sans font-semibold text-sm hover:bg-champagne-gold/10 hover:border-champagne-gold transition-all shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-champagne-gold" />
                <span>Ask AI Skin & Hair Advisor</span>
              </button>
            </div>

            {/* Quick Micro-Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-charcoal/70">
              <div className="flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-sage-green" />
                <span className="font-medium">100% Botanical Extracts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-sage-green" />
                <span className="font-medium">No Harsh Sulfates or Parabens</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-sage-green" />
                <span className="font-medium">Dermatologist Tested</span>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Visual Composition (Vilvah & Brand Kit Aesthetic) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Card with Nano Banana Pro Generated Photoshoot */}
              <div 
                onClick={() => {
                  const serum = PRODUCTS.find(p => p.id === 'zn-face-01');
                  if (serum) setActiveProductModal(serum);
                }}
                className="relative rounded-3xl overflow-hidden shadow-botanical-lg border-2 border-warm-sand/60 bg-soft-white aspect-[4/5] group cursor-pointer"
              >
                <img 
                  src="./models/hero_indian_woman.jpg" 
                  alt="Z Naturals Kumkumadi Botanical Beauty" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Elegant Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/80 via-transparent to-black/10" />

                {/* Floating Product Highlight Tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-soft-white/95 backdrop-blur-md border border-warm-sand/80 shadow-botanical text-left">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-champagne-gold uppercase tracking-wider">
                        ★ Bestselling Botanical
                      </span>
                      <h3 className="font-serif font-bold text-lg text-deep-forest leading-snug">
                        Z Naturals Kumkumadi Face Serum
                      </h3>
                      <p className="text-xs text-charcoal/70 mt-0.5">
                        Kashmiri Saffron • Sandalwood • 26 Royal Herbs • 20ml
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-bold text-deep-forest">₹449</span>
                      <span className="text-[11px] text-charcoal/50 line-through block">₹599</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Gold Seal (From Brand Kit) */}
              <div className="absolute -top-6 -right-6 hidden sm:flex flex-col items-center justify-center w-24 h-24 rounded-full bg-soft-white border-2 border-champagne-gold shadow-botanical p-2 text-center animate-pulse-subtle">
                <Leaf className="w-5 h-5 text-sage-green mb-0.5" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-deep-forest leading-tight">
                  100% Pure
                </span>
                <span className="text-[8px] text-champagne-gold font-semibold uppercase">
                  Chettinad
                </span>
              </div>

              {/* Floating Botanical Purity Badge */}
              <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 p-3 rounded-2xl bg-deep-forest text-botanical-ivory shadow-xl border border-champagne-gold/40">
                <div className="w-8 h-8 rounded-full bg-champagne-gold/20 flex items-center justify-center text-champagne-gold font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-champagne-gold" />
                </div>
                <div className="text-left text-xs pr-2">
                  <div className="font-bold text-champagne-gold">100% Pure Botanical</div>
                  <div className="text-[10px] text-botanical-ivory/80">Chettinad Heritage Recipe</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
