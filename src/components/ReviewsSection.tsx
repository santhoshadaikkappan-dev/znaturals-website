import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Dr. Priya Muthuraman',
    location: 'Sekkalai, Karaikudi',
    rating: 5,
    product: 'Botanical Glow Face Serum',
    text: 'Living in Karaikudi, having pure botanical skincare delivered with free COD by 11 AM the next morning is fantastic! My acne marks faded significantly in 3 weeks without any irritation.',
    date: 'Verified Karaikudi Buyer'
  },
  {
    id: 2,
    name: 'Senthil Nathan & Gomathi',
    location: 'Subramaniapuram, Karaikudi',
    rating: 5,
    product: 'Herbal Hair Oil with 18 Chettinad Botanicals',
    text: 'Reminds me of how our grandmothers made hair oil in brass vessels. The fresh curry leaf and amla scent is heavenly. Hair fall reduced noticeably after just 4 washes.',
    date: 'Verified Karaikudi Buyer'
  },
  {
    id: 3,
    name: 'Nandhini Alagappan',
    location: 'Kallukatti, Karaikudi',
    rating: 5,
    product: 'Radiant Ubtan Bath Powder',
    text: 'I bought my first pack at their Kallukatti weekend live stall and now order on this site regularly! It replaced chemical soaps in our home completely. Leaves skin so supple and glowing.',
    date: 'Verified Weekend Stall Customer'
  }
];

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 bg-botanical-ivory border-b border-warm-sand/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-green/15 text-deep-forest text-xs font-semibold uppercase tracking-wider mb-3">
            Real Experiences, Pure Results
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-deep-forest font-normal">
            Loved by Chettinad Families
          </h2>
          <p className="font-sans text-sm text-charcoal/70 mt-2">
            Over 2,400+ satisfied Karaikudi customers enjoying pure botanical personal care daily.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-soft-white border border-warm-sand/70 shadow-sm flex flex-col justify-between hover:shadow-botanical transition-all"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-champagne-gold/30 mb-2" />

                <p className="font-sans text-xs sm:text-sm text-charcoal/80 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-warm-sand/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-deep-forest text-base">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-charcoal/60">
                      {rev.location}
                    </p>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    Verified
                  </span>
                </div>

                <div className="text-[11px] font-semibold text-sage-green mt-1">
                  Product: {rev.product}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
