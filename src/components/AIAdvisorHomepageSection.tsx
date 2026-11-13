import React, { useState } from 'react';
import { Sparkles, Bot, ArrowRight, CheckCircle2, Leaf, ShieldCheck, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

export const AIAdvisorHomepageSection: React.FC = () => {
  const { addToCart, setActiveProductModal, setIsAiAdvisorOpen } = useStore();

  const [selectedConcern, setSelectedConcern] = useState('Pigmentation & Dark Spots');
  const [selectedSkinType, setSelectedSkinType] = useState('Combination Skin');

  // Match corresponding products
  const getPrescription = () => {
    if (selectedConcern.includes('Hair')) {
      return {
        title: 'Follicle Regeneration & Scalp Harmony Ritual',
        description: 'Chettinad Amla & 18 Slow-Cooked Botanicals stimulate dormant hair bulbs while pure Bhringraj relieves dandruff flakes.',
        products: PRODUCTS.filter((p) => p.category === 'Haircare'),
      };
    } else if (selectedConcern.includes('Body')) {
      return {
        title: 'Chettinad Nalangu Herbal Body Polish Ritual',
        description: 'Wild Kasthuri Turmeric and stone-ground rose petals naturally eliminate dull body tan and provide all-day skin hydration.',
        products: PRODUCTS.filter((p) => p.category === 'Body Care'),
      };
    } else {
      return {
        title: 'Antioxidant Radiance & Melanin Balance Ritual',
        description: 'High-potency cold-pressed Green Tea and Kashmiri Saffron work synergistically to fade hyperpigmentation without harsh chemicals.',
        products: PRODUCTS.filter((p) => p.id === 'zn-001' || p.id === 'zn-003'),
      };
    }
  };

  const prescription = getPrescription();

  return (
    <section className="py-20 bg-soft-white border-y border-warm-sand/50 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-sage-green/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne-gold/20 text-deep-forest text-xs font-bold uppercase tracking-wider mb-3 border border-champagne-gold/40">
            <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
            <span>Interactive Consultation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-deep-forest font-normal">
            Z Naturals AI Beauty Advisor
          </h2>
          <p className="font-sans text-sm sm:text-base text-charcoal/75 mt-3 leading-relaxed">
            Select your primary concern and skin profile to receive an instant Chettinad botanical diagnosis 
            tailored to your unique beauty rhythm.
          </p>
        </div>

        {/* Interactive Consultation Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-botanical-ivory border-2 border-warm-sand/80 shadow-botanical-lg p-6 sm:p-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive Selectors */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Concern Picker */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-deep-forest block mb-2.5 flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-sage-green" /> 1. Select Primary Concern:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Pigmentation & Dark Spots',
                    'Acne & Active Pimples',
                    'Excessive Hair Fall',
                    'Dry Skin & Dull Tone',
                    'Scalp Dandruff & Itch',
                    'Body Tan & Rough Skin',
                  ].map((con) => (
                    <button
                      key={con}
                      onClick={() => setSelectedConcern(con)}
                      className={`p-3 rounded-xl text-left text-xs font-medium transition-all border ${
                        selectedConcern === con
                          ? 'bg-deep-forest text-botanical-ivory border-deep-forest font-semibold shadow-sm'
                          : 'bg-white text-charcoal border-warm-sand hover:bg-white/80'
                      }`}
                    >
                      {con}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin/Hair Type Picker */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-deep-forest block mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-champagne-gold" /> 2. Select Skin / Hair Profile:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Combination Skin',
                    'Sensitive & Reactive',
                    'Dry & Dehydrated',
                    'Oily & Blemish-Prone',
                  ].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedSkinType(type)}
                      className={`p-2.5 rounded-xl text-center text-xs font-medium transition-all border ${
                        selectedSkinType === type
                          ? 'bg-sage-green text-white border-sage-green font-semibold shadow-sm'
                          : 'bg-white text-charcoal border-warm-sand hover:bg-white/80'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsAiAdvisorOpen(true)}
                  className="w-full py-3 px-4 rounded-xl bg-white border border-champagne-gold text-deep-forest text-xs font-bold uppercase tracking-wider hover:bg-champagne-gold/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Bot className="w-4 h-4 text-champagne-gold" />
                  <span>Open Full AI Chatbot Window</span>
                </button>
              </div>

            </div>

            {/* Right: AI Diagnosis & Recommended Products */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-warm-sand space-y-5 shadow-sm">
              
              <div className="flex items-center justify-between border-b border-warm-sand/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-deep-forest text-champagne-gold flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-deep-forest">
                      AI Botanical Prescription
                    </h3>
                    <span className="text-[10px] text-sage-green font-medium">
                      Matched for: {selectedConcern} • {selectedSkinType}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  98% Botanical Match
                </span>
              </div>

              <div>
                <h4 className="font-serif font-bold text-lg text-deep-forest">
                  {prescription.title}
                </h4>
                <p className="text-xs text-charcoal/80 mt-1 leading-relaxed">
                  {prescription.description}
                </p>
              </div>

              {/* Prescribed Products Grid */}
              <div className="space-y-3 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/60 block">
                  Recommended Regimen Items:
                </span>

                {prescription.products.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center gap-3.5 p-3 rounded-xl bg-botanical-ivory/60 border border-warm-sand/80 hover:border-champagne-gold transition-colors"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-16 h-16 rounded-lg object-cover border border-warm-sand flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h5 className="font-serif font-bold text-sm text-deep-forest truncate">
                          {prod.name}
                        </h5>
                        <span className="text-[10px] font-bold text-sage-green">
                          {prod.volume}
                        </span>
                      </div>
                      <p className="text-[11px] text-charcoal/60 line-clamp-1">
                        {prod.tagline}
                      </p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-extrabold text-sm text-deep-forest">
                          ₹{prod.price}
                        </span>
                        <span className="text-xs text-charcoal/40 line-through">
                          ₹{prod.originalPrice}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => addToCart(prod, 1)}
                        className="px-3.5 py-1.5 rounded-lg bg-deep-forest text-botanical-ivory text-xs font-bold uppercase tracking-wider hover:bg-deep-forest-dark transition-all flex items-center gap-1 shadow-sm"
                      >
                        Add to Bag
                      </button>
                      <button
                        onClick={() => setActiveProductModal(prod)}
                        className="text-[11px] text-sage-green hover:underline text-center"
                      >
                        Details
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Free COD Note */}
              <div className="text-[11px] text-charcoal/70 bg-botanical-ivory p-3 rounded-xl border border-warm-sand flex items-center justify-between">
                <span>Free Doorstep Cash on Delivery in Karaikudi</span>
                <span className="font-bold text-deep-forest">Delivered 8 AM – 4 PM</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
