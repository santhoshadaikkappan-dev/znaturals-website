import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { VilvahCategoryStrip } from './components/VilvahCategoryStrip';
import { HeroSection } from './components/HeroSection';
import { BrandTrustStrip } from './components/BrandTrustStrip';
import { ShopByConcern } from './components/ShopByConcern';
import { ShopByCategory } from './components/ShopByCategory';
import { ProductGrid } from './components/ProductGrid';
import { BotanicalStorySection } from './components/BotanicalStorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { OneRupeeTestCatalogBanner } from './components/OneRupeeTestCatalogBanner';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AIBeautyAdvisor } from './components/AIBeautyAdvisor';
import { FloatingAiButton } from './components/FloatingAiButton';
import { SearchModal } from './components/SearchModal';
import { PincodeCheckerModal } from './components/PincodeCheckerModal';
import { AuthModal } from './components/AuthModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { NotificationToast } from './components/NotificationToast';
import { PRODUCTS } from './data/products';
import { ProductCategory, SkinOrHairConcern, Product } from './types';

const MainStoreContent: React.FC = () => {
  const { 
    activeProductModal, 
    setActiveProductModal,
    setIsAiAdvisorOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isAdminOpen,
    setIsAdminOpen
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [selectedConcern, setSelectedConcern] = useState<SkinOrHairConcern | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);

  // Filter products based on category, concern, and search
  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategory) {
      if (selectedCategory === 'Bestsellers') {
        if (!product.isBestseller && product.badge !== 'Bestseller') return false;
      } else if (product.category !== selectedCategory) {
        return false;
      }
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

      {/* 3. Vilvah-Style Category Circular Strip (Exact from Image 1 Top UI) */}
      <VilvahCategoryStrip
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onSelectConcern={(con) => setSelectedConcern(con)}
        activeCategory={selectedCategory}
      />

      {/* 4. Hero Editorial Section (Existing UI now follows below) */}
      <HeroSection onExploreClick={scrollToBestsellers} />

      {/* 4. Brand Trust Strip (5 Line Icons) */}
      <BrandTrustStrip />

      {/* 5. Shop by Category (Skincare, Haircare, Body Care) */}
      <ShopByCategory
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* 6. Signature Bestsellers Grid (Products Section) */}
      <ProductGrid
        products={filteredProducts}
        selectedCategory={selectedCategory}
        selectedConcern={selectedConcern}
        searchQuery={searchQuery}
        onClearFilters={handleClearFilters}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
      />

      {/* 7. Shop by Concern (Targeted Botanical Solutions - Placed After Products) */}
      <ShopByConcern
        selectedConcern={selectedConcern}
        onSelectConcern={(c) => setSelectedConcern(c)}
      />

      {/* 8. Chettinad Heritage Botanical Story Section */}
      <BotanicalStorySection />

      {/* 9. Verified Customer Reviews */}
      <ReviewsSection />

      {/* 10. ₹1 Live Payment Test & Official Botanical Catalog PDF (Bottom of Website) */}
      <OneRupeeTestCatalogBanner />

      {/* 11. Luxury Footer */}
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

      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
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
