import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ProductCategory, SkinOrHairConcern } from '../types';

interface VilvahCategoryStripProps {
  onSelectCategory: (category: ProductCategory | null) => void;
  onSelectConcern: (concern: SkinOrHairConcern | null) => void;
  activeCategory: string | null;
}

interface CategoryCard {
  id: string;
  name: string;
  buttonLabel: string;
  badge?: string;
  image: string;
  bgBlobColor: string;
  categoryFilter?: ProductCategory;
  concernFilter?: SkinOrHairConcern;
}

const CATEGORY_ITEMS: CategoryCard[] = [
  {
    id: 'hair',
    name: 'Herbal Haircare',
    buttonLabel: 'Hair >',
    image: './products/advanced_herbs_hair_oil.jpg',
    bgBlobColor: 'bg-[#D2E2C8]',
    categoryFilter: 'Hair',
    concernFilter: 'Hair Fall'
  },
  {
    id: 'face',
    name: 'Botanical Skincare',
    buttonLabel: 'Face >',
    image: './products/kumkumadi_face_serum.jpg',
    bgBlobColor: 'bg-[#EBDDC8]',
    categoryFilter: 'Face',
    concernFilter: 'Daily Glow'
  },
  {
    id: 'body',
    name: 'Herbal Body Care',
    buttonLabel: 'Body >',
    image: './products/kuppaimeni_soap.jpg',
    bgBlobColor: 'bg-[#D0E2C6]',
    categoryFilter: 'Body'
  },
  {
    id: 'milk',
    name: 'Pure Goat Milk Range',
    buttonLabel: 'Milk Range >',
    image: './products/goat_milk_cream.jpg',
    bgBlobColor: 'bg-[#F2EFE8]',
    categoryFilter: 'Milk',
    concernFilter: 'Dry Skin'
  },
  {
    id: 'combo',
    name: 'Curated Combos',
    buttonLabel: 'Combos >',
    image: './products/bridal_glow_combo.jpg',
    bgBlobColor: 'bg-[#EAE2D5]',
    categoryFilter: 'Combo'
  },
  {
    id: 'gift-sets',
    name: 'Luxury Gift Sets',
    buttonLabel: 'Gift Sets >',
    badge: 'New',
    image: './products/chettinad_gift_box.jpg',
    bgBlobColor: 'bg-[#E3DCBA]',
    categoryFilter: 'Gift Sets'
  },
  {
    id: 'bestsellers',
    name: 'All Bestsellers',
    buttonLabel: 'Bestsellers >',
    image: './products/botanical_sunscreen.jpg',
    bgBlobColor: 'bg-[#DFE7D6]',
    categoryFilter: 'Bestsellers'
  }
];

export const VilvahCategoryStrip: React.FC<VilvahCategoryStripProps> = ({
  onSelectCategory,
  onSelectConcern,
  activeCategory
}) => {
  const handleClick = (item: CategoryCard) => {
    if (item.categoryFilter) {
      onSelectCategory(item.categoryFilter);
    } else {
      onSelectCategory(null);
    }
    if (item.concernFilter) {
      onSelectConcern(item.concernFilter);
    } else {
      onSelectConcern(null);
    }

    const el = document.getElementById('bestsellers');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#FCFBF8] border-b border-warm-sand/50 py-5 sm:py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Scrollable Carousel - Exact Vilvah Store Layout */}
        <div className="flex items-center justify-start lg:justify-between gap-5 sm:gap-6 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
          {CATEGORY_ITEMS.map((item) => {
            const isSelected = activeCategory === item.categoryFilter;

            return (
              <div
                key={item.id}
                onClick={() => handleClick(item)}
                className="flex-shrink-0 flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                style={{ width: '135px' }}
              >
                {/* Organic Circular Shape with Botanical Cutout */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                  
                  {item.badge && (
                    <span className="absolute -top-1 right-1 bg-[#A01C1C] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tight shadow-sm z-10 animate-bounce-subtle">
                      {item.badge}
                    </span>
                  )}

                  {/* Organic Soft Green Blob (Matches Vilvah Screenshot) */}
                  <div 
                    className={`absolute inset-1 rounded-[42%_58%_70%_30%/45%_45%_55%_55%] transition-all duration-500 ${item.bgBlobColor} group-hover:scale-105 group-hover:rotate-6 ${
                      isSelected ? 'ring-2 ring-deep-forest' : ''
                    }`}
                  />

                  {/* Botanical Sprig Accents (Left and Right Herb Graphic) */}
                  <span className="absolute -left-1 bottom-2 text-xs opacity-70 group-hover:opacity-100 transition-opacity select-none">
                    🌿
                  </span>
                  <span className="absolute -right-1 top-2 text-[10px] opacity-60 group-hover:opacity-100 transition-opacity select-none">
                    🌾
                  </span>

                  {/* Product Circular Image */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-sm border-2 border-white bg-white">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Vilvah-Style Rounded Pill Button Below Circle */}
                <button
                  type="button"
                  className={`mt-3 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 flex items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-deep-forest text-botanical-ivory border-deep-forest shadow-sm'
                      : 'bg-white text-charcoal/90 border-charcoal/30 hover:border-deep-forest hover:bg-deep-forest hover:text-white shadow-xs'
                  }`}
                >
                  <span>{item.buttonLabel}</span>
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
