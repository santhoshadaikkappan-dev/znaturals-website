import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  MapPin, 
  Menu, 
  X, 
  ChevronDown, 
  User,
  Navigation
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '../context/StoreContext';
import { CONCERN_LIST } from '../data/products';
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
    setIsAiAdvisorOpen, 
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
  const [concernDropdownOpen, setConcernDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const categories = ['Skincare', 'Haircare', 'Body Care'];

  const handleNavCategory = (cat: string | null) => {
    onSelectCategory(cat);
    setCategoryDropdownOpen(false);
    setMobileMenuOpen(false);
    const el = document.getElementById('bestsellers');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavConcern = (con: string | null) => {
    onSelectConcern(con);
    setConcernDropdownOpen(false);
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
      showToast(`📍 Location: ${loc.city} (${loc.pincode})`);
    } catch (err: any) {
      showToast(err.message || "Location access denied");
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-botanical-ivory/95 backdrop-blur-md border-b border-warm-sand/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-deep-forest hover:text-sage-green focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <BrandLogo 
              size="md" 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {/* Shop by Category with Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              onMouseLeave={() => setCategoryDropdownOpen(false)}
            >
              <button className="flex items-center gap-1.5 text-sm font-semibold text-deep-forest hover:text-sage-green transition-colors py-2 uppercase tracking-wider">
                <span>Shop Category</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 w-52 bg-soft-white shadow-botanical-lg border border-warm-sand/60 rounded-xl py-2 mt-0 z-50">
                  <button 
                    onClick={() => handleNavCategory(null)}
                    className="w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-botanical-ivory hover:text-deep-forest font-medium flex items-center justify-between"
                  >
                    <span>All Products</span>
                    <span className="text-xs text-sage-green font-mono">View All</span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleNavCategory(cat)}
                      className="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-botanical-ivory hover:text-deep-forest transition-colors"
                    >
                      {cat === 'Haircare' ? 'Botanical Haircare' : cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shop by Concern with Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setConcernDropdownOpen(true)}
              onMouseLeave={() => setConcernDropdownOpen(false)}
            >
              <button className="flex items-center gap-1.5 text-sm font-semibold text-deep-forest hover:text-sage-green transition-colors py-2 uppercase tracking-wider">
                <span>Shop Concern</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>

              {concernDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-soft-white shadow-botanical-lg border border-warm-sand/60 rounded-xl p-3 mt-0 z-50 grid gap-1">
                  <div className="text-[10px] font-bold text-sage-green uppercase tracking-wider px-2 py-1">
                    Select Your Concern
                  </div>
                  {CONCERN_LIST.map((concern) => (
                    <button
                      key={concern.id}
                      onClick={() => handleNavConcern(concern.id)}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-charcoal hover:bg-botanical-ivory hover:text-deep-forest transition-all flex items-center justify-between group/item"
                    >
                      <span className="font-medium">{concern.name}</span>
                      <span className="text-[11px] text-sage-green opacity-75 group-hover/item:opacity-100">
                        {concern.tagline}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Karaikudi Weekend Live Stall Link */}
            <a 
              href="#karaikudi-live-stall"
              className="text-sm font-semibold text-deep-forest hover:text-sage-green uppercase tracking-wider transition-colors"
            >
              Weekend Stall
            </a>

            {/* AI Beauty Advisor Pill Button */}
            <button
              onClick={() => setIsAiAdvisorOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-green/15 text-deep-forest border border-sage-green/30 hover:bg-sage-green hover:text-white transition-all text-xs font-semibold tracking-wide shadow-sm group"
            >
              <Sparkles className="w-3.5 h-3.5 text-champagne-gold group-hover:text-yellow-200 transition-colors" />
              <span>AI Beauty Advisor</span>
            </button>
          </nav>

          {/* Right Action Icons & Badges */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            
            {/* Pincode & Delivery Zone Pill */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-soft-white border border-warm-sand text-xs shadow-sm">
              <button
                onClick={onOpenPincodeModal}
                className="flex items-center gap-1 text-deep-forest hover:text-sage-green font-medium"
                title="Change delivery pincode"
              >
                <MapPin className="w-3.5 h-3.5 text-sage-green" />
                <span className="font-mono font-bold">{customerPincode}</span>
                <span className="text-[10px] text-charcoal/60">
                  {deliveryInfo.isKaraikudi ? '(Karaikudi Free COD)' : '(Courier)'}
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

            {/* Search Icon */}
            <button
              onClick={onSearchClick}
              aria-label="Search Botanical Products"
              className="p-2 text-deep-forest hover:text-sage-green transition-colors focus:outline-none"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Customer Authentication / Account Pill Button */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-soft-white border border-warm-sand text-deep-forest hover:border-champagne-gold transition-all text-xs font-semibold shadow-sm"
              title={customerProfile.isLoggedIn ? "View Profile & Saved Addresses" : "Login with Mobile Number (OTP)"}
            >
              <User className="w-3.5 h-3.5 text-sage-green" />
              <span className="hidden sm:inline">
                {customerProfile.isLoggedIn 
                  ? (customerProfile.name ? customerProfile.name.split(' ')[0] : 'Account') 
                  : 'Sign In'}
              </span>
            </button>

            {/* Slide-out Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              className="relative p-2 text-deep-forest hover:text-sage-green transition-colors focus:outline-none"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-deep-forest text-botanical-ivory font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-botanical-ivory shadow-sm animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-soft-white border-b border-warm-sand/60 px-4 pt-3 pb-6 shadow-botanical-lg animate-fadeIn">
          {/* Quick Pincode & Login in Mobile */}
          <div className="mb-4 p-3 bg-botanical-ivory rounded-xl border border-warm-sand flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sage-green" />
              <div>
                <div className="text-xs font-semibold text-deep-forest">
                  {deliveryInfo.isKaraikudi ? 'Zone A: Karaikudi Free Delivery' : 'Zone B: Courier Delivery'}
                </div>
                <div className="text-[11px] text-charcoal/70 font-mono">Pincode: {customerPincode}</div>
              </div>
            </div>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPincodeModal();
              }}
              className="text-xs text-deep-forest font-bold underline"
            >
              Change
            </button>
          </div>

          <div className="space-y-3">
            {/* Mobile Auth Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-botanical-ivory border border-warm-sand flex items-center justify-between text-xs font-bold text-deep-forest"
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-sage-green" />
                {customerProfile.isLoggedIn ? `Account (${customerProfile.phone})` : 'Sign In with Mobile OTP'}
              </span>
              <span className="text-sage-green">→</span>
            </button>

            <div className="text-xs font-bold text-sage-green uppercase tracking-wider">Categories</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavCategory(null)}
                className="text-left p-2.5 rounded-lg bg-botanical-ivory text-sm font-medium text-deep-forest"
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleNavCategory(cat)}
                  className="text-left p-2.5 rounded-lg bg-botanical-ivory text-sm font-medium text-deep-forest"
                >
                  {cat === 'Haircare' ? 'Botanical Haircare' : cat}
                </button>
              ))}
            </div>

            <div className="text-xs font-bold text-sage-green uppercase tracking-wider pt-2">Shop By Concern</div>
            <div className="grid grid-cols-2 gap-2">
              {CONCERN_LIST.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleNavConcern(c.id)}
                  className="text-left p-2 rounded-lg bg-botanical-ivory text-xs font-medium text-deep-forest truncate"
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-warm-sand/50 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAiAdvisorOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-deep-forest text-botanical-ivory font-semibold text-sm"
              >
                <Sparkles className="w-4 h-4 text-champagne-gold" />
                Ask AI Beauty Advisor
              </button>

              <a
                href="#karaikudi-live-stall"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-sage-green/15 text-deep-forest font-medium text-sm"
              >
                Visit Weekend Live Stall (Fri - Sun)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
