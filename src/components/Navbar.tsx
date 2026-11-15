import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  ChevronDown, 
  User, 
  Menu, 
  X, 
  Zap,
  MapPin,
  Navigation
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '../context/StoreContext';
import { requestBrowserGeolocation } from '../utils/geolocation';

interface NavbarProps {
  onSearchClick: () => void;
  onOpenPincodeModal?: () => void;
  onSelectCategory: (category: string | null) => void;
  onSelectConcern: (concern: string | null) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSearchClick,
  onOpenPincodeModal,
  onSelectCategory,
  onSelectConcern
}) => {
  const { 
    cartCount, 
    setIsCartOpen, 
    customerPincode, 
    setCustomerPincode,
    setCustomerCity,
    setCustomerState,
    deliveryInfo,
    customerProfile,
    setIsAuthModalOpen,
    showToast
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hairDropdown, setHairDropdown] = useState(false);
  const [faceDropdown, setFaceDropdown] = useState(false);
  const [bodyDropdown, setBodyDropdown] = useState(false);
  const [rangeDropdown, setRangeDropdown] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const scrollToBestsellers = (cat: string | null = null) => {
    onSelectCategory(cat);
    setHairDropdown(false);
    setFaceDropdown(false);
    setBodyDropdown(false);
    setRangeDropdown(false);
    setMobileMenuOpen(false);
    const el = document.getElementById('bestsellers');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickGps = async () => {
    setIsLocating(true);
    try {
      const loc = await requestBrowserGeolocation();
      if (loc.pincode) setCustomerPincode(loc.pincode);
      if (loc.city) setCustomerCity(loc.city);
      if (loc.state) setCustomerState(loc.state);
      showToast(`📍 Detected: ${loc.city} (${loc.pincode})`);
    } catch (err: any) {
      showToast(err.message || "Location access denied");
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-warm-sand/60 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Mobile Menu Hamburger */}
          <div className="flex items-center lg:hidden flex-shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 -ml-1 text-deep-forest hover:text-sage-green focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

          {/* Left Brand Logo (Vilvah style left-aligned) */}
          <div className="flex-shrink-0 flex items-center">
            <BrandLogo 
              size="md" 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />
          </div>

          {/* Center Navigation Menu (Exact layout from Image 1) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 font-sans text-[13px] font-semibold text-charcoal">
            
            {/* 1. Bestsellers */}
            <button 
              onClick={() => scrollToBestsellers('Bestsellers')}
              className="hover:text-sage-green transition-colors py-2 tracking-wide"
            >
              Bestsellers
            </button>

            {/* 2. Hair with Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setHairDropdown(true)}
              onMouseLeave={() => setHairDropdown(false)}
            >
              <button 
                onClick={() => scrollToBestsellers('Hair')}
                className="flex items-center gap-1 hover:text-sage-green transition-colors py-2 tracking-wide"
              >
                <span>Hair</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-charcoal/60" />
              </button>

              {hairDropdown && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl border border-warm-sand/60 rounded-xl py-2 mt-0 z-50 animate-fadeIn">
                  <button
                    onClick={() => scrollToBestsellers('Hair')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs font-semibold text-deep-forest flex justify-between"
                  >
                    <span>All Haircare</span>
                    <span className="text-[10px] text-sage-green">View All</span>
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Hair')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Advanced Herbs Hair Oil (₹399)
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Hair')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Anti-Dandruff Hair Oil (₹399)
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Hair')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Shikakai Herbal Shampoo (₹399)
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Hair')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Rosemary Herbal Shampoo (₹430)
                  </button>
                </div>
              )}
            </div>

            {/* 3. Face with Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setFaceDropdown(true)}
              onMouseLeave={() => setFaceDropdown(false)}
            >
              <button 
                onClick={() => scrollToBestsellers('Face')}
                className="flex items-center gap-1 hover:text-sage-green transition-colors py-2 tracking-wide"
              >
                <span>Face</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-charcoal/60" />
              </button>

              {faceDropdown && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl border border-warm-sand/60 rounded-xl py-2 mt-0 z-50 animate-fadeIn">
                  <button
                    onClick={() => scrollToBestsellers('Face')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs font-semibold text-deep-forest flex justify-between"
                  >
                    <span>All Face Care</span>
                    <span className="text-[10px] text-sage-green">View All</span>
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Face')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Kumkumadi Face Serum (₹449)
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Face')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Anti-Acne & Pimple Serum (₹449)
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Face')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Kumkumadi Face Wash (₹469)
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Face')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    SPF 50 Botanical Sunscreen (₹410)
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Face')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Pure Rose Water Toner (₹190)
                  </button>
                </div>
              )}
            </div>

            {/* 4. Body with Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setBodyDropdown(true)}
              onMouseLeave={() => setBodyDropdown(false)}
            >
              <button 
                onClick={() => scrollToBestsellers('Body')}
                className="flex items-center gap-1 hover:text-sage-green transition-colors py-2 tracking-wide"
              >
                <span>Body</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-charcoal/60" />
              </button>

              {bodyDropdown && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl border border-warm-sand/60 rounded-xl py-2 mt-0 z-50 animate-fadeIn">
                  <button
                    onClick={() => scrollToBestsellers('Body')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs font-semibold text-deep-forest flex justify-between"
                  >
                    <span>All Body Care</span>
                    <span className="text-[10px] text-sage-green">View All</span>
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Body')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Kuppaimeni Herbal Soap (₹99)
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Body')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Kumkumadi Glow Soap (₹99)
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Body')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Acne & Pimple Clear Soap (₹99)
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Body')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Kasturi Manjal Herbal Soap (₹99)
                  </button>
                </div>
              )}
            </div>

            {/* 5. Milk Range with Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setRangeDropdown(true)}
              onMouseLeave={() => setRangeDropdown(false)}
            >
              <button 
                onClick={() => scrollToBestsellers('Milk')}
                className="flex items-center gap-1 hover:text-sage-green transition-colors py-2 tracking-wide"
              >
                <span>Milk Range</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-charcoal/60" />
              </button>

              {rangeDropdown && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl border border-warm-sand/60 rounded-xl py-2 mt-0 z-50 animate-fadeIn">
                  <button
                    onClick={() => scrollToBestsellers('Milk')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs font-semibold text-deep-forest flex justify-between"
                  >
                    <span>All Milk Range</span>
                    <span className="text-[10px] text-sage-green">View All</span>
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Milk')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Goat Milk Moisturizing Soap (₹130)
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Milk')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Goat Milk Active Face Cream (₹680)
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Milk')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Goat Milk Face Serum (₹490)
                  </button>
                </div>
              )}
            </div>

            {/* 6. Combos */}
            <button 
              onClick={() => scrollToBestsellers('Combo')}
              className="hover:text-sage-green transition-colors py-2 tracking-wide"
            >
              Combos
            </button>

            {/* 7. Gift Sets (with "New" red pill badge - Exact from Image 1) */}
            <div className="relative inline-flex items-center">
              <span className="absolute -top-2.5 right-0 bg-[#A01C1C] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
                New
              </span>
              <button 
                onClick={() => scrollToBestsellers('Gift Sets')}
                className="hover:text-sage-green transition-colors py-2 tracking-wide"
              >
                Gift Sets
              </button>
            </div>

            {/* 8. Shop All */}
            <button 
              onClick={() => scrollToBestsellers(null)}
              className="hover:text-sage-green transition-colors py-2 tracking-wide"
            >
              Shop All
            </button>

            {/* 9. About us */}
            <a 
              href="#brand-story"
              className="hover:text-sage-green transition-colors py-2 tracking-wide"
            >
              About us
            </a>

            {/* 10. Reviews */}
            <a 
              href="#reviews"
              className="hover:text-sage-green transition-colors py-2 tracking-wide"
            >
              Reviews
            </a>

          </nav>

          {/* Right Utilities (Image 1 style: Search, Lightning Account, Cart Bag) */}
          <div className="flex items-center gap-1.5 sm:gap-3.5 pr-1 sm:pr-0 flex-shrink-0">
            
            {/* 1. Search Icon */}
            <button
              onClick={onSearchClick}
              aria-label="Search Botanical Products"
              className="p-1.5 sm:p-2 text-charcoal hover:text-sage-green transition-colors focus:outline-none"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* 2. Customer Account Icon with Energy/Lightning Badge (Exact Vilvah Style) */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="relative p-1.5 sm:p-2 text-charcoal hover:text-sage-green transition-colors focus:outline-none flex items-center justify-center"
              title={customerProfile.isLoggedIn ? `Logged in: ${customerProfile.name}` : "Customer Login / Account"}
            >
              <User className="w-5 h-5 stroke-[1.8]" />
              <Zap className="w-3 h-3 text-[#A35212] fill-[#A35212] absolute -top-0.5 -right-0.5 animate-pulse" />
            </button>

            {/* 3. Shopping Cart Bag (Exact Vilvah Style) */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="relative p-1.5 sm:p-2 text-charcoal hover:text-sage-green transition-colors focus:outline-none"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-deep-forest text-botanical-ivory text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-warm-sand/60 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-2 text-sm font-semibold text-deep-forest">
            <button 
              onClick={() => scrollToBestsellers('Bestsellers')}
              className="text-left py-2 border-b border-warm-sand/40"
            >
              Bestsellers
            </button>
            <button 
              onClick={() => scrollToBestsellers('Hair')}
              className="text-left py-2 border-b border-warm-sand/40"
            >
              Hair
            </button>
            <button 
              onClick={() => scrollToBestsellers('Face')}
              className="text-left py-2 border-b border-warm-sand/40"
            >
              Face
            </button>
            <button 
              onClick={() => scrollToBestsellers('Body')}
              className="text-left py-2 border-b border-warm-sand/40"
            >
              Body
            </button>
            <button 
              onClick={() => scrollToBestsellers('Milk')}
              className="text-left py-2 border-b border-warm-sand/40"
            >
              Milk Range
            </button>
            <button 
              onClick={() => scrollToBestsellers('Combo')}
              className="text-left py-2 border-b border-warm-sand/40"
            >
              Combos
            </button>
            <button 
              onClick={() => scrollToBestsellers('Gift Sets')}
              className="text-left py-2 border-b border-warm-sand/40"
            >
              Gift Sets
            </button>
            <button 
              onClick={() => scrollToBestsellers(null)}
              className="text-left py-2 border-b border-warm-sand/40"
            >
              Shop All
            </button>
            <a 
              href="#brand-story"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-warm-sand/40"
            >
              About Us
            </a>
            <a 
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2"
            >
              Customer Reviews
            </a>
          </div>

          <div className="pt-3 border-t border-warm-sand/60 text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-deep-forest text-botanical-ivory font-bold flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-champagne-gold" />
              <span>{customerProfile.isLoggedIn ? 'My Botanical Account' : 'Customer Sign In'}</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
