import React from 'react';
import { Leaf, Droplet, Sparkles, FlaskConicalOff, Heart } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: Leaf,
    title: "Botanical Ingredients",
    description: "Pure cold-pressed extracts & herbs sourced from native growers."
  },
  {
    icon: Droplet,
    title: "Gentle & Safe",
    description: "Dermatologically tested formulations crafted for sensitive skin."
  },
  {
    icon: Sparkles,
    title: "Radiant Beauty",
    description: "Visible natural glow that enhances your authentic skin vitality."
  },
  {
    icon: FlaskConicalOff,
    title: "No Harsh Chemicals",
    description: "Zero sulfates, parabens, silicones, synthetic dyes, or mineral oils."
  },
  {
    icon: Heart,
    title: "Cruelty-Free",
    description: "Ethically formulated, never tested on animals, 100% vegetarian."
  }
];

export const BrandTrustStrip: React.FC = () => {
  return (
    <section className="bg-soft-white border-y border-warm-sand/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-botanical-ivory/50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-full bg-botanical-ivory border border-champagne-gold/50 flex items-center justify-center mb-3 text-deep-forest group-hover:bg-sage-green group-hover:text-white group-hover:border-sage-green transition-all shadow-sm">
                  <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                </div>
                <h4 className="font-serif font-bold text-base text-deep-forest mb-1 leading-snug">
                  {pillar.title}
                </h4>
                <p className="font-sans text-xs text-charcoal/70 leading-relaxed max-w-[200px]">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
