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
  onOpenPincodeModal: () => void;
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-deep-forest hover:text-sage-green focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              onClick={() => scrollToBestsellers(null)}
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
                onClick={() => scrollToBestsellers('Haircare')}
                className="flex items-center gap-1 hover:text-sage-green transition-colors py-2 tracking-wide"
              >
                <span>Hair</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-charcoal/60" />
              </button>

              {hairDropdown && (
                <div className="absolute top-full left-0 w-52 bg-white shadow-xl border border-warm-sand/60 rounded-xl py-2 mt-0 z-50 animate-fadeIn">
                  <button
                    onClick={() => scrollToBestsellers('Haircare')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs font-semibold text-deep-forest flex justify-between"
                  >
                    <span>All Haircare</span>
                    <span className="text-[10px] text-sage-green">View</span>
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Haircare')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Herbal Hair Oil with 18 Herbs
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Haircare')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Herbal Shampoo with Bhringraj
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
                onClick={() => scrollToBestsellers('Skincare')}
                className="flex items-center gap-1 hover:text-sage-green transition-colors py-2 tracking-wide"
              >
                <span>Face</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-charcoal/60" />
              </button>

              {faceDropdown && (
                <div className="absolute top-full left-0 w-56 bg-white shadow-xl border border-warm-sand/60 rounded-xl py-2 mt-0 z-50 animate-fadeIn">
                  <button
                    onClick={() => scrollToBestsellers('Skincare')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs font-semibold text-deep-forest flex justify-between"
                  >
                    <span>All Face Care</span>
                    <span className="text-[10px] text-sage-green">View</span>
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Skincare')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Botanical Glow Face Serum
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Skincare')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Nourishing Saffron Face Cream
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
                onClick={() => scrollToBestsellers('Body Care')}
                className="flex items-center gap-1 hover:text-sage-green transition-colors py-2 tracking-wide"
              >
                <span>Body</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-charcoal/60" />
              </button>

              {bodyDropdown && (
                <div className="absolute top-full left-0 w-52 bg-white shadow-xl border border-warm-sand/60 rounded-xl py-2 mt-0 z-50 animate-fadeIn">
                  <button
                    onClick={() => scrollToBestsellers('Body Care')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs font-semibold text-deep-forest flex justify-between"
                  >
                    <span>All Body Care</span>
                    <span className="text-[10px] text-sage-green">View</span>
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Body Care')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Sandalwood Botanical Body Lotion
                  </button>
                  <button
                    onClick={() => scrollToBestsellers('Body Care')}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Radiant Ubtan Bath Powder
                  </button>
                </div>
              )}
            </div>

            {/* 5. Milk & Herbal Range with Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setRangeDropdown(true)}
              onMouseLeave={() => setRangeDropdown(false)}
            >
              <button 
                onClick={() => scrollToBestsellers(null)}
                className="flex items-center gap-1 hover:text-sage-green transition-colors py-2 tracking-wide"
              >
                <span>Milk Range</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-charcoal/60" />
              </button>

              {rangeDropdown && (
                <div className="absolute top-full left-0 w-56 bg-white shadow-xl border border-warm-sand/60 rounded-xl py-2 mt-0 z-50 animate-fadeIn">
                  <button
                    onClick={() => scrollToBestsellers(null)}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Chettinad Herbal Formulations
                  </button>
                  <button
                    onClick={() => scrollToBestsellers(null)}
                    className="w-full text-left px-4 py-2 hover:bg-botanical-ivory text-xs text-charcoal"
                  >
                    Cold-Pressed Botanical Butters
                  </button>
                </div>
              )}
            </div>

            {/* 6. Combos */}
            <button 
              onClick={() => scrollToBestsellers(null)}
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
                onClick={() => scrollToBestsellers(null)}
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

            {/* 10. Blog / Weekend Stall */}
            <a 
              href="#karaikudi-live-stall"
              className="hover:text-sage-green transition-colors py-2 tracking-wide"
            >
              Blog
            </a>

          </nav>

          {/* Right Utilities (Image 1 style: Search, Lightning Account, Cart Bag) */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Pincode Pill (Desktop) */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-botanical-ivory border border-warm-sand text-xs shadow-xs">
              <button
                onClick={onOpenPincodeModal}
                className="flex items-center gap-1 text-deep-forest hover:text-sage-green font-medium"
                title="Change delivery pincode"
              >
                <MapPin className="w-3.5 h-3.5 text-sage-green" />
                <span className="font-mono font-bold">{customerPincode}</span>
                <span className="text-[10px] text-charcoal/60">
                  {deliveryInfo.isKaraikudi ? '(Karaikudi COD)' : '(Courier)'}
                </span>
              </button>
              <button
                onClick={handleQuickGps}
                disabled={isLocating}
                className="p-0.5 text-sage-green hover:text-deep-forest"
                title="Detect Current GPS Location"
              >
                <Navigation className={`w-3 h-3 ${isLocating ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* 1. Search Icon */}
            <button
              onClick={onSearchClick}
              aria-label="Search Botanical Products"
              className="p-2 text-charcoal hover:text-sage-green transition-colors focus:outline-none"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* 2. Customer Account Icon with Energy/Lightning Badge (Exact Vilvah Style) */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="relative p-2 text-charcoal hover:text-sage-green transition-colors focus:outline-none flex items-center justify-center"
              title={customerProfile.isLoggedIn ? `Logged in: ${customerProfile.name}` : "Customer Login / Account"}
            >
              <User className="w-5 h-5 stroke-[1.8]" />
              <Zap className="w-3 h-3 text-[#A35212] fill-[#A35212] absolute -top-0.5 -right-0.5 animate-pulse" />
            </button>

            {/* 3. Shopping Cart Bag (Exact Vilvah Style) */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="relative p-2 text-charcoal hover:text-sage-green transition-colors focus:outline-none"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-deep-forest text-botanical-ivory text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
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
              onClick={() => scrollToBestsellers(null)}
              className="text-left py-2 border-b border-warm-sand/40"
            >
              Bestsellers
            </button>
            <button 
              onClick={() => scrollToBestsellers('Haircare')}
              className="text-left py-2 border-b border-warm-sand/40"
            >
              Haircare
            </button>
            <button 
              onClick={() => scrollToBestsellers('Skincare')}
              className="text-left py-2 border-b border-warm-sand/40"
            >
              Skincare
            </button>
            <button 
              onClick={() => scrollToBestsellers('Body Care')}
              className="text-left py-2 border-b border-warm-sand/40"
            >
              Body Care
            </button>
            <button 
              onClick={() => scrollToBestsellers(null)}
              className="text-left py-2 border-b border-warm-sand/40"
            >
              Combos & Gift Sets
            </button>
            <a 
              href="#brand-story"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-warm-sand/40"
            >
              About Us
            </a>
            <a 
              href="#karaikudi-live-stall"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2"
            >
              Weekend Live Stall
            </a>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-warm-sand/60 text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPincodeModal();
              }}
              className="flex items-center gap-1.5 font-bold text-deep-forest"
            >
              <MapPin className="w-4 h-4 text-sage-green" />
              <span>Pincode: {customerPincode}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-deep-forest text-white font-bold"
            >
              {customerProfile.isLoggedIn ? 'My Account' : 'Sign In'}
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
