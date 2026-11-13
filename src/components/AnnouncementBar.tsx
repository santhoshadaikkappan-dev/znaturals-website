import React, { useState, useEffect } from 'react';
import { Truck, Sparkles, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const MESSAGES = [
  {
    id: 1,
    icon: Truck,
    text: "Exclusive Free Cash on Delivery (COD) in Karaikudi | Call/WhatsApp: 9344087944 | Daily: 8:00 AM – 4:00 PM",
    badge: "Free Local COD",
    action: "pincode"
  },
  {
    id: 2,
    icon: MapPin,
    text: "Visit Our Weekend Live Experience Stall in Karaikudi | Fri – Sun: 5:30 PM – 9:30 PM",
    badge: "Live Stall",
    action: "stall"
  },
  {
    id: 3,
    icon: Sparkles,
    text: "Chettinad Botanical Formulations • 100% Pure, Safe & Cruelty-Free",
    badge: "100% Pure",
    action: "story"
  }
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setCustomerPincode } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
  };

  const handleBarClick = () => {
    const active = MESSAGES[currentIndex];
    if (active.action === 'stall') {
      const el = document.getElementById('karaikudi-live-stall');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (active.action === 'pincode') {
      const el = document.getElementById('pincode-checker-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (active.action === 'story') {
      const el = document.getElementById('brand-story');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentMsg = MESSAGES[currentIndex];
  const Icon = currentMsg.icon;

  return (
    <div 
      className="bg-deep-forest text-botanical-ivory text-xs py-2 px-3 relative border-b border-champagne-gold/30 cursor-pointer select-none overflow-hidden transition-colors hover:bg-deep-forest-dark"
      onClick={handleBarClick}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Arrow */}
        <button 
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="p-1 hover:text-champagne-gold transition-colors focus:outline-none"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Center Text Banner */}
        <div className="flex items-center justify-center gap-2 text-center px-4 overflow-hidden">
          <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold bg-champagne-gold/20 text-champagne-gold border border-champagne-gold/40">
            {currentMsg.badge}
          </span>
          <Icon className="w-3.5 h-3.5 text-champagne-gold flex-shrink-0 animate-pulse" />
          <span className="font-medium tracking-wide truncate max-w-[280px] sm:max-w-md md:max-w-2xl">
            {currentMsg.text}
          </span>
          <span className="text-[11px] underline text-champagne-gold/90 ml-1 hidden lg:inline hover:text-white">
            Learn More
          </span>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={handleNext}
          aria-label="Next announcement"
          className="p-1 hover:text-champagne-gold transition-colors focus:outline-none"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
