import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { BRAND_CONFIG } from '../config/storeConfig';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, Heart, Sparkles, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setIsAuthModalOpen, setIsAiAdvisorOpen, setIsAdminOpen } = useStore();
  const [newsletterPhone, setNewsletterPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterPhone.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-deep-forest text-botanical-ivory pt-16 pb-12 border-t border-champagne-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo 
              theme="light-on-dark" 
              size="md" 
              showTagline 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <p className="font-sans text-xs sm:text-sm text-botanical-ivory/70 leading-relaxed max-w-sm">
              Z NATURALS crafts pure, cold-pressed botanical skincare and haircare inspired by traditional Chettinad herbal wisdom.
            </p>

            <div className="pt-2 text-xs text-champagne-gold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-champagne-gold animate-pulse" />
              <span>Free Cash on Delivery (COD) in Specific Locations</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-base text-botanical-ivory uppercase tracking-wider">
              Botanical Lines
            </h4>
            <ul className="space-y-2 text-xs text-botanical-ivory/75">
              <li>
                <a href="#bestsellers" className="hover:text-champagne-gold transition-colors">
                  Facial Serums & Elixirs
                </a>
              </li>
              <li>
                <a href="#bestsellers" className="hover:text-champagne-gold transition-colors">
                  Botanical Hair Oils & Shampoos
                </a>
              </li>
              <li>
                <a href="#bestsellers" className="hover:text-champagne-gold transition-colors">
                  Nourishing Face Creams
                </a>
              </li>
              <li>
                <a href="#bestsellers" className="hover:text-champagne-gold transition-colors">
                  Traditional Nalangu Ubtans
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setIsAiAdvisorOpen(true)}
                  className="hover:text-champagne-gold transition-colors text-left flex items-center gap-1 text-champagne-gold font-semibold"
                >
                  <Sparkles className="w-3 h-3" /> AI Beauty Consultant
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Chettinad Hub & Doorstep Delivery */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-base text-botanical-ivory uppercase tracking-wider">
              Chettinad Dispatch Hub
            </h4>
            <div className="space-y-2.5 text-xs text-botanical-ivory/75">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-champagne-gold flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Chettinad Dispatch Hub:</strong><br />
                  Sekkalai Road, Karaikudi<br />
                  Direct Doorstep Express Delivery
                </span>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-champagne-gold flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Daily Express Delivery Hours:</strong><br />
                  Daily: 8:00 AM – 4:00 PM
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-champagne-gold flex-shrink-0" />
                <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="hover:text-champagne-gold font-mono">
                  {BRAND_CONFIG.contact.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: WhatsApp VIP Updates */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-base text-botanical-ivory uppercase tracking-wider">
              WhatsApp Club
            </h4>
            <p className="text-xs text-botanical-ivory/70 leading-relaxed">
              Join our Karaikudi botanical circle for exclusive seasonal launches, fresh harvest perks, and skin health tips.
            </p>

            {subscribed ? (
              <div className="p-3 bg-champagne-gold/20 border border-champagne-gold rounded-xl text-xs text-champagne-gold font-bold">
                ✓ Welcome to Z NATURALS WhatsApp Circle!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="tel"
                    required
                    value={newsletterPhone}
                    onChange={(e) => setNewsletterPhone(e.target.value)}
                    placeholder="WhatsApp Number"
                    className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-botanical-ivory placeholder-botanical-ivory/40 focus:outline-none focus:ring-1 focus:ring-champagne-gold"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-champagne-gold text-deep-forest hover:bg-gold-light transition-colors"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-botanical-ivory/50 block">
                  No spam. Only botanical beauty updates & fresh batch alerts.
                </span>
              </form>
            )}

            <div className="pt-2">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-xs text-champagne-gold/90 hover:text-champagne-gold underline font-sans flex items-center gap-1.5 transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                Customer Account & Saved Addresses →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-botanical-ivory/60 gap-4">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Z NATURALS. All rights reserved.</span>
            <span>•</span>
            <span className="italic font-serif text-champagne-gold">"Nature's Goodness. Your Kind of Beauty."</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-champagne-gold" /> 100% Botanical
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-champagne-gold" /> Cruelty-Free
            </span>
            <span>Karaikudi, Tamil Nadu</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
