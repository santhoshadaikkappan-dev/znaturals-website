import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const PROMO_SLIDES = [
  {
    id: 1,
    line1: "Product Of The Month : Botanical Glow Face Serum",
    line2: "Use code - HURRY20 and Get FLAT 20% OFF",
    action: "bestsellers"
  },
  {
    id: 2,
    line1: "Exclusive Free Cash on Delivery (COD) in Karaikudi",
    line2: "Daily Express Delivery: 8:00 AM – 4:00 PM | Helpline: 9344087944",
    action: "pincode"
  },
  {
    id: 3,
    line1: "Visit Our Weekend Live Experience Stall in Karaikudi",
    line2: "Every Fri – Sun: 5:30 PM – 9:30 PM | Try Fresh Samples",
    action: "stall"
  }
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + PROMO_SLIDES.length) % PROMO_SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % PROMO_SLIDES.length);
  };

  const handleBarClick = () => {
    const active = PROMO_SLIDES[currentIndex];
    if (active.action === 'stall') {
      const el = document.getElementById('karaikudi-live-stall');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (active.action === 'pincode') {
      const el = document.getElementById('pincode-checker-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('bestsellers');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const current = PROMO_SLIDES[currentIndex];

  return (
    <div 
      className="bg-[#A35212] text-white text-xs py-2 px-3 sm:px-6 relative select-none cursor-pointer transition-colors hover:bg-[#8F470F] z-50 border-b border-black/10 shadow-xs"
      onClick={handleBarClick}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Arrow (Image 1 style) */}
        <button 
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="p-1 hover:text-white/80 transition-colors focus:outline-none flex-shrink-0"
        >
          <ChevronLeft className="w-4 h-4 text-white/90" />
        </button>

        {/* Center Two-Line Text (Exact from Image 1) */}
        <div className="flex flex-col items-center justify-center text-center px-2 overflow-hidden leading-tight animate-fadeIn">
          <span className="font-semibold text-[11px] sm:text-xs tracking-wide text-white">
            {current.line1}
          </span>
          <span className="font-medium text-[10px] sm:text-[11px] text-white/90 mt-0.5 tracking-wider">
            {current.line2}
          </span>
        </div>

        {/* Right Arrow (Image 1 style) */}
        <button 
          onClick={handleNext}
          aria-label="Next announcement"
          className="p-1 hover:text-white/80 transition-colors focus:outline-none flex-shrink-0"
        >
          <ChevronRight className="w-4 h-4 text-white/90" />
        </button>

      </div>
    </div>
  );
};
