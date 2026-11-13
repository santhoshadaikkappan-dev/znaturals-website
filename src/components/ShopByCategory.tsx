import React from 'react';
import { ProductCategory } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ShopByCategoryProps {
  selectedCategory: string | null;
  onSelectCategory: (category: ProductCategory | null) => void;
}

const CATEGORIES = [
  {
    id: 'Skincare' as ProductCategory,
    title: 'Botanical Skincare',
    subtitle: 'Nourish & Revitalize',
    description: 'Cold-pressed facial elixirs, saffron-infused creams & antioxidant serums.',
    image: 'https://images.unsplash.com/photo-1608248597359-28192a549646?auto=format&fit=crop&w=700&q=80',
    count: '2 Products'
  },
  {
    id: 'Haircare' as ProductCategory,
    title: 'Botanical Haircare',
    subtitle: 'Strengthen & Volumize',
    description: 'Slow-cooked amla-bhringraj oils and mild herbal shampoo infusions.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
    count: '2 Products'
  },
  {
    id: 'Body Care' as ProductCategory,
    title: 'Heritage Body Care',
    subtitle: 'Polish & Restore',
    description: 'Traditional Nalangu Maavu bath ubtans and aromatic sandalwood body lotions.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80',
    count: '2 Products'
  }
];

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <section className="py-12 bg-botanical-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-warm-sand/50">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sage-green block mb-1">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-deep-forest font-normal">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory(null)}
            className={`mt-3 sm:mt-0 text-xs font-semibold uppercase tracking-wider transition-colors ${
              selectedCategory === null ? 'text-champagne-gold font-bold underline' : 'text-deep-forest hover:text-sage-green'
            }`}
          >
            View All Botanical Lines
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 border ${
                  isSelected 
                    ? 'ring-2 ring-champagne-gold shadow-botanical-lg scale-[1.02]' 
                    : 'border-warm-sand/60 hover:shadow-botanical hover:-translate-y-1'
                }`}
              >
                {/* Background Image Container */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-warm-sand/30">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/40 to-transparent flex flex-col justify-end p-6 text-botanical-ivory">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-champagne-gold uppercase tracking-wider">
                      {cat.subtitle}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-botanical-ivory/20 backdrop-blur-sm flex items-center justify-center text-botanical-ivory group-hover:bg-champagne-gold group-hover:text-deep-forest transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold mb-1">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-botanical-ivory/80 line-clamp-2 leading-relaxed font-sans mb-2">
                    {cat.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/20 text-xs">
                    <span className="text-white/70">{cat.count}</span>
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
