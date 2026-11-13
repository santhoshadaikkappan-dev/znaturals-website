import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ProductCategory, SkinOrHairConcern } from '../types';

interface TopCategoryPillStripProps {
  onSelectCategory: (category: ProductCategory | null) => void;
  onSelectConcern?: (concern: SkinOrHairConcern | null) => void;
}

interface CategoryCardItem {
  id: string;
  name: string;
  pillLabel: string;
  imageSrc: string;
  categoryFilter?: ProductCategory;
  concernFilter?: SkinOrHairConcern;
  tagline: string;
}

const CATEGORY_ITEMS: CategoryCardItem[] = [
  {
    id: 'serums',
    name: 'Botanical Serums',
    pillLabel: 'Serums',
    imageSrc: '/categories/serums.png',
    categoryFilter: 'Skincare',
    tagline: 'Glow & Spot Reduction'
  },
  {
    id: 'eyecare',
    name: 'Under Eye Care',
    pillLabel: 'Eye Care',
    imageSrc: '/categories/eyecare.png',
    categoryFilter: 'Skincare',
    concernFilter: 'Pigmentation',
    tagline: 'Under Eye Radiance'
  },
  {
    id: 'sunscreen',
    name: 'Botanical Sunscreen',
    pillLabel: 'Sunscreen',
    imageSrc: '/categories/sunscreen.png',
    categoryFilter: 'Skincare',
    tagline: 'UV & Daily Shield'
  },
  {
    id: 'facewash',
    name: 'Natural Face Wash',
    pillLabel: 'Face Wash',
    imageSrc: '/categories/facewash.png',
    categoryFilter: 'Skincare',
    concernFilter: 'Daily Glow',
    tagline: 'Gentle Cleansing'
  },
  {
    id: 'shampoos',
    name: 'Herbal Shampoos',
    pillLabel: 'Shampoos',
    imageSrc: '/categories/shampoos.png',
    categoryFilter: 'Haircare',
    concernFilter: 'Hair Fall',
    tagline: 'Scalp & Root Care'
  },
  {
    id: 'combos',
    name: 'Signature Combos',
    pillLabel: 'Combos',
    imageSrc: '/categories/combos.png',
    tagline: 'Curated Botanical Sets'
  },
  {
    id: 'lipcare',
    name: 'Natural Lip Care',
    pillLabel: 'Lip Care',
    imageSrc: '/categories/lipcare.png',
    categoryFilter: 'Skincare',
    concernFilter: 'Dry Skin',
    tagline: 'Nourishing Balms'
  }
];

export const TopCategoryPillStrip: React.FC<TopCategoryPillStripProps> = ({
  onSelectCategory,
  onSelectConcern
}) => {
  const handleClick = (item: CategoryCardItem) => {
    if (item.categoryFilter) {
      onSelectCategory(item.categoryFilter);
    }
    if (item.concernFilter && onSelectConcern) {
      onSelectConcern(item.concernFilter);
    }
    const el = document.getElementById('bestsellers');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white border-b border-warm-sand/40 py-3 sm:py-5 shadow-sm overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Category Strip (Image 1 replica: Mobile scrollable, Desktop 7-col centered) */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory">
          {CATEGORY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item)}
              className="flex-shrink-0 flex flex-col items-center cursor-pointer group snap-center transition-transform hover:-translate-y-1 focus:outline-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleClick(item)}
            >
              {/* Visual blob thumbnail container */}
              <div className="relative w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 flex items-center justify-center p-1 rounded-2xl transition-all group-hover:scale-105">
                <img
                  src={item.imageSrc}
                  alt={item.name}
                  className="w-full h-full object-contain drop-shadow-sm transition-transform group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Vilvah-Style Rounded Pill Button Below */}
              <div className="mt-1.5 sm:mt-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-charcoal/30 bg-white group-hover:border-deep-forest group-hover:bg-deep-forest group-hover:text-botanical-ivory transition-all shadow-2xs flex items-center gap-1">
                <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-charcoal group-hover:text-botanical-ivory whitespace-nowrap">
                  {item.pillLabel}
                </span>
                <ChevronRight className="w-3 h-3 text-charcoal/60 group-hover:text-botanical-ivory transition-colors" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
