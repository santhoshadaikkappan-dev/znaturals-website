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
    id: 'serums',
    name: 'Serums',
    buttonLabel: 'Serums >',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=360&q=80',
    bgBlobColor: 'bg-[#D2E2C8]', // Vilvah organic green blob
    categoryFilter: 'Skincare',
    concernFilter: 'Daily Glow'
  },
  {
    id: 'eye-care',
    name: 'Eye & Face Care',
    buttonLabel: 'Eye Care >',
    image: 'https://images.unsplash.com/photo-1608248597359-28192a549646?auto=format&fit=crop&w=360&q=80',
    bgBlobColor: 'bg-[#CCE0C2]',
    categoryFilter: 'Skincare'
  },
  {
    id: 'sunscreen',
    name: 'Sunscreen & Oils',
    buttonLabel: 'Sunscreen >',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=360&q=80',
    bgBlobColor: 'bg-[#D7E6CC]',
    categoryFilter: 'Haircare'
  },
  {
    id: 'face-wash',
    name: 'Face Wash & Ubtan',
    buttonLabel: 'Face Wash >',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=360&q=80',
    bgBlobColor: 'bg-[#D0E2C6]',
    categoryFilter: 'Body Care',
    concernFilter: 'Acne & Blemishes'
  },
  {
    id: 'shampoos',
    name: 'Herbal Shampoos',
    buttonLabel: 'Shampoos >',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=360&q=80',
    bgBlobColor: 'bg-[#CBE0C0]',
    categoryFilter: 'Haircare'
  },
  {
    id: 'combos',
    name: 'Combos & Gift Kits',
    buttonLabel: 'Combos >',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=360&q=80',
    bgBlobColor: 'bg-[#D5E6CD]'
  },
  {
    id: 'lip-care',
    name: 'Lip & Body Care',
    buttonLabel: 'Lip Care >',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=360&q=80',
    bgBlobColor: 'bg-[#CDDFC4]',
    categoryFilter: 'Body Care'
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
