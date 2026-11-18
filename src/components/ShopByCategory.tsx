import React from 'react';
import { ProductCategory } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ShopByCategoryProps {
  selectedCategory: string | null;
  onSelectCategory: (category: ProductCategory | null) => void;
}

const CATEGORIES = [
  {
    id: 'Hair' as ProductCategory,
    title: 'Botanical Haircare',
    subtitle: 'Nourish & Restore',
    description: 'Slow-infused herb oils with amla, bhringraj, rosemary and natural shikakai shampoos.',
    image: './products/advanced_herbs_hair_oil.jpg',
    count: '4 Products'
  },
  {
    id: 'Face' as ProductCategory,
    title: 'Radiant Skincare',
    subtitle: 'Pure & Glowing',
    description: 'Kashmiri saffron serums, anti-acne elixirs, detan face gels & SPF 50 sunscreen.',
    image: './products/kumkumadi_face_serum.jpg',
    count: '7 Products'
  },
  {
    id: 'Body' as ProductCategory,
    title: 'Herbal Soaps & Body',
    subtitle: 'Gentle & Handcrafted',
    description: 'Traditional cold-pressed kuppaimeni, kumkumadi glow, and kasturi manjal herbal soaps.',
    image: './products/kuppaimeni_soap.jpg',
    count: '4 Products'
  },
  {
    id: 'Milk' as ProductCategory,
    title: 'Pure Goat Milk Range',
    subtitle: 'Deep Hydration',
    description: 'Rich moisturizing goat milk soaps, active face creams and hydrating serums.',
    image: './products/goat_milk_cream.jpg',
    count: '3 Products'
  },
  {
    id: 'Combo' as ProductCategory,
    title: 'Curated Routine Combos',
    subtitle: 'Targeted Results',
    description: 'Complete daily care combos for acne cure, bridal radiance, and hair fall rescue.',
    image: './products/bridal_glow_combo.jpg',
    count: '4 Combos'
  },
  {
    id: 'Gift Sets' as ProductCategory,
    title: 'Chettinad Gift Boxes',
    subtitle: 'Luxury Gifting',
    description: 'Rigid heritage gift boxes with gold foil packaging, perfect for weddings & festivals.',
    image: './products/chettinad_gift_box.jpg',
    count: '2 Gift Boxes'
  }
];

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <section className="py-6 sm:py-12 bg-botanical-ivory">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-8 pb-3 sm:pb-4 border-b border-warm-sand/50">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sage-green block mb-0.5 sm:mb-1">
              Curated Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-deep-forest font-normal">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory(null)}
            className={`mt-2 sm:mt-0 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors ${
              selectedCategory === null ? 'text-champagne-gold font-bold underline' : 'text-deep-forest hover:text-sage-green'
            }`}
          >
            View All Botanical Lines
          </button>
        </div>

        {/* Compact 2 Columns on Mobile, 3 Columns on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(isSelected ? null : cat.id);
                  const el = document.getElementById('bestsellers');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative overflow-hidden rounded-xl sm:rounded-3xl cursor-pointer transition-all duration-300 border ${
                  isSelected 
                    ? 'ring-2 ring-champagne-gold shadow-botanical-lg scale-[1.02]' 
                    : 'border-warm-sand/60 hover:shadow-botanical hover:-translate-y-1'
                }`}
              >
                {/* Background Image Container - Compact on Mobile */}
                <div className="h-24 sm:h-auto sm:aspect-[4/3] w-full overflow-hidden bg-warm-sand/30">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/60 to-transparent flex flex-col justify-end p-2 sm:p-6 text-botanical-ivory">
                  <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                    <span className="text-[8px] sm:text-[11px] font-bold text-champagne-gold uppercase tracking-wider line-clamp-1">
                      {cat.subtitle}
                    </span>
                    <span className="w-4 h-4 sm:w-8 sm:h-8 rounded-full bg-botanical-ivory/20 backdrop-blur-sm flex items-center justify-center text-botanical-ivory group-hover:bg-champagne-gold group-hover:text-deep-forest transition-colors flex-shrink-0">
                      <ArrowUpRight className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                    </span>
                  </div>

                  <h3 className="font-serif text-[11px] sm:text-2xl font-bold leading-tight line-clamp-1 sm:line-clamp-none mb-0.5 sm:mb-1">
                    {cat.title}
                  </h3>

                  <p className="hidden sm:block text-xs text-botanical-ivory/80 line-clamp-2 leading-relaxed font-sans mb-2">
                    {cat.description}
                  </p>

                  <div className="flex items-center justify-between pt-0.5 sm:pt-2 border-t border-white/20 text-[8px] sm:text-xs">
                    <span className="text-white/75">{cat.count}</span>
                    <span className="font-semibold text-champagne-gold group-hover:underline">
                      {isSelected ? 'Selected ✓' : 'Explore →'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
