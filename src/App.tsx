import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { TopCategoryPillStrip } from './components/TopCategoryPillStrip';
import { HeroSection } from './components/HeroSection';
import { BrandTrustStrip } from './components/BrandTrustStrip';
import { PincodeBanner } from './components/PincodeBanner';
import { ShopByConcern } from './components/ShopByConcern';
import { ShopByCategory } from './components/ShopByCategory';
import { ProductGrid } from './components/ProductGrid';
import { AIAdvisorHomepageSection } from './components/AIAdvisorHomepageSection';
import { LiveStallSection } from './components/LiveStallSection';
import { BotanicalStorySection } from './components/BotanicalStorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AIBeautyAdvisor } from './components/AIBeautyAdvisor';
import { FloatingAiButton } from './components/FloatingAiButton';
import { SearchModal } from './components/SearchModal';
import { PincodeCheckerModal } from './components/PincodeCheckerModal';
import { AuthModal } from './components/AuthModal';
import { NotificationToast } from './components/NotificationToast';
import { PRODUCTS } from './data/products';
import { ProductCategory, SkinOrHairConcern, Product } from './types';

const MainStoreContent: React.FC = () => {
  const { 
    activeProductModal, 
    setActiveProductModal,
    setIsAiAdvisorOpen,
    isAuthModalOpen,
    setIsAuthModalOpen
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [selectedConcern, setSelectedConcern] = useState<SkinOrHairConcern | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);

  // Filter products based on category, concern, and search
  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }
    if (selectedConcern && !product.concerns.includes(selectedConcern)) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchTag = product.tagline.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      return matchName || matchTag || matchCategory;
    }
    return true;
  });

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedConcern(null);
    setSearchQuery('');
  };

  const handleSelectProductFromSearch = (prod: Product) => {
    setActiveProductModal(prod);
  };

  const scrollToBestsellers = () => {
    const el = document.getElementById('bestsellers');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-botanical-ivory text-charcoal flex flex-col font-sans selection:bg-champagne-gold/30">
      
      {/* 1. Top Rotating Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Minimal Header */}
      <Navbar
        onSearchClick={() => setIsSearchOpen(true)}
        onOpenPincodeModal={() => setIsPincodeModalOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat as ProductCategory | null)}
        onSelectConcern={(con) => setSelectedConcern(con as SkinOrHairConcern | null)}
      />

      {/* 3. Vilvah-Style Top Visual Category Strip (Exact Image 1 layout at top) */}
      <TopCategoryPillStrip
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onSelectConcern={(con) => setSelectedConcern(con)}
      />

      {/* 4. Hero Editorial Section (Existing content below top strip) */}
      <HeroSection onExploreClick={scrollToBestsellers} />

      {/* 4. Brand Trust Strip (5 Line Icons) */}
      <BrandTrustStrip />

      {/* 5. Karaikudi Pincode Verification Banner */}
      <PincodeBanner />

      {/* 6. Shop by Concern (Circular Cards) */}
      <ShopByConcern
        selectedConcern={selectedConcern}
        onSelectConcern={(c) => setSelectedConcern(c)}
      />

      {/* 7. Shop by Category (Skincare, Haircare, Body Care) */}
      <ShopByCategory
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* 8. Signature Bestsellers Grid */}
      <ProductGrid
        products={filteredProducts}
        selectedCategory={selectedCategory}
        selectedConcern={selectedConcern}
        searchQuery={searchQuery}
        onClearFilters={handleClearFilters}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
      />

      {/* 9. Interactive Homepage AI Beauty Advisor Section */}
      <AIAdvisorHomepageSection />

      {/* 10. Karaikudi Weekend Live Stall Section */}
      <LiveStallSection />

      {/* 11. Chettinad Heritage Botanical Story Section */}
      <BotanicalStorySection />

      {/* 12. Verified Customer Reviews */}
      <ReviewsSection />

      {/* 13. Luxury Footer */}
      <Footer />

      {/* Modals, Drawers & Overlays */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
      />

      <CartDrawer />

      <CheckoutModal />

      <AIBeautyAdvisor />

      <FloatingAiButton />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProductFromSearch}
      />

      <PincodeCheckerModal
        isOpen={isPincodeModalOpen}
        onClose={() => setIsPincodeModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <NotificationToast />

    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <MainStoreContent />
    </StoreProvider>
  );
}

export default App;
