import React, { useState, useEffect } from 'react';
import { Truck, Sparkles, ChevronLeft, ChevronRight, MapPin, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const MESSAGES = [
  {
    id: 1,
    icon: Tag,
    text: "Product Of The Month : Botanical Glow Face Serum | Use code - HURRY20 and Get FLAT 20% OFF",
    highlight: "FLAT 20% OFF",
    action: "bestsellers"
  },
  {
    id: 2,
    icon: Truck,
    text: "Exclusive Free Cash on Delivery (COD) in Karaikudi | Daily Delivery: 8:00 AM – 4:00 PM | Helpline: 9344087944",
    highlight: "Free Local COD",
    action: "pincode"
  },
  {
    id: 3,
    icon: MapPin,
    text: "Visit Our Weekend Live Experience Stall in Karaikudi | Fri – Sun: 5:30 PM – 9:30 PM",
    highlight: "Weekend Stall",
    action: "stall"
  },
  {
    id: 4,
    icon: Sparkles,
    text: "Pure Chettinad Botanical Formulations • 100% Safe, Chemical-Free & Cruelty-Free",
    highlight: "100% Botanical",
    action: "story"
  }
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    } else if (active.action === 'bestsellers') {
      const el = document.getElementById('bestsellers');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (active.action === 'story') {
      const el = document.getElementById('brand-story');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentMsg = MESSAGES[currentIndex];

  return (
    <div 
      className="bg-[#9B4817] text-white text-[11px] sm:text-xs py-2 px-3 sm:px-6 relative select-none cursor-pointer overflow-hidden transition-colors hover:bg-[#863D13] font-sans"
      onClick={handleBarClick}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Arrow (Image 1 style) */}
        <button 
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="p-1 text-white/90 hover:text-white transition-colors focus:outline-none"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Center Text Banner */}
        <div className="flex items-center justify-center gap-2 text-center px-2 overflow-hidden">
          <span className="font-semibold tracking-wide truncate max-w-[300px] sm:max-w-lg md:max-w-3xl text-white">
            {currentMsg.text}
          </span>
        </div>

        {/* Right Arrow (Image 1 style) */}
        <button 
          onClick={handleNext}
          aria-label="Next announcement"
          className="p-1 text-white/90 hover:text-white transition-colors focus:outline-none"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

