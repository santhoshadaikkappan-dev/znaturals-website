import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'zn-001',
    name: 'Botanical Glow Face Serum',
    slug: 'botanical-glow-face-serum',
    tagline: 'Green Tea • Aloe Vera • Botanical Extracts',
    category: 'Skincare',
    concerns: ['Daily Glow', 'Pigmentation', 'Acne & Blemishes'],
    price: 649,
    originalPrice: 799,
    volume: '30 ml',
    weightGrams: 120,
    rating: 4.9,
    reviewCount: 142,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1608248597359-28192a549646?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Potent botanical elixir enriched with Green Tea and Aloe Vera to revive dull complexion and restore youthful radiance.',
    fullDescription: 'Crafted through cold-pressed botanical infusions, this lightweight serum penetrates deeply to nourish skin cells, fade hyperpigmentation, and impart an enduring morning dew glow without greasiness.',
    targetType: 'Suitable for all skin types, especially uneven tone and tired skin',
    botanicalHighlights: ['Cold-Pressed Green Tea', 'Organic Aloe Leaf Extract', 'Licorice Root Ferment'],
    inStock: true,
    ingredients: [
      {
        name: 'Organic Green Tea Extract',
        botanicalSource: 'Camellia Sinensis',
        purpose: 'Rich in polyphenols and EGCG to neutralize oxidative stress and soothe inflammation.'
      },
      {
        name: 'Fresh Aloe Vera Pulp',
        botanicalSource: 'Aloe Barbadensis Miller',
        purpose: 'Provides deep, non-comedogenic cellular hydration while calming redness.'
      },
      {
        name: 'Licorice Root Extract',
        botanicalSource: 'Glycyrrhiza Glabra',
        purpose: 'Naturally inhibits melanin overproduction to brighten dark spots.'
      },
      {
        name: 'Wild Rosehip Seed Oil',
        botanicalSource: 'Rosa Canina',
        purpose: 'High in natural Vitamin A & C to promote cellular turnover and firmness.'
      }
    ],
    benefits: [
      'Visibly fades dark spots and blemishes in 2-3 weeks of continuous use',
      'Provides 24-hour weightless hydration with zero oily residue',
      'Refines pores and smoothens micro-texture for a dewy silk finish',
      'Strengthens the delicate epidermal barrier against urban pollution'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Cleanse Face',
        description: 'Wash face with lukewarm water and pat dry gently with a soft towel.'
      },
      {
        step: 2,
        title: 'Dispense 3-4 Drops',
        description: 'Press the dropper gently to place 3 to 4 drops directly onto your cheeks and forehead.'
      },
      {
        step: 3,
        title: 'Press & Tap',
        description: 'Gently press into skin using upward circular motions. Allow 60 seconds to absorb before applying moisturizer.'
      }
    ]
  },
  {
    id: 'zn-002',
    name: 'Herbal Shampoo with Bhringraj & Shikakai',
    slug: 'herbal-shampoo',
    tagline: 'Bhringraj • Shikakai • Hibiscus Flower',
    category: 'Haircare',
    concerns: ['Hair Fall', 'Dandruff'],
    price: 499,
    originalPrice: 599,
    volume: '300 ml',
    weightGrams: 380,
    rating: 4.8,
    reviewCount: 98,
    badge: 'Customer Favorite',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Gentle sulfate-free hair cleanser rooted in traditional Chettinad herbal decoctions to stop excessive hair fall.',
    fullDescription: 'Formulated with hand-picked Bhringraj, whole Shikakai pods, and crushed hibiscus petals. Gently cleanses without stripping natural scalp lipids, strengthening hair follicles from root to tip.',
    targetType: 'Ideal for weak roots, post-monsoon hair fall, and flaky scalps',
    botanicalHighlights: ['Fresh Bhringraj Leaves', 'Wild Shikakai Pods', 'Red Hibiscus Petals'],
    inStock: true,
    ingredients: [
      {
        name: 'False Daisy (Bhringraj)',
        botanicalSource: 'Eclipta Alba',
        purpose: 'Renowned in classical Ayurveda as the King of Hair, stimulating active follicles.'
      },
      {
        name: 'Shikakai Pod Decoction',
        botanicalSource: 'Acacia Concinna',
        purpose: 'Provides a mild natural saponin lather that balances scalp pH without stripping moisture.'
      },
      {
        name: 'Red Hibiscus Flower Infusion',
        botanicalSource: 'Hibiscus Rosa-Sinensis',
        purpose: 'Rich in amino acids and mucilage to condition locks naturally.'
      },
      {
        name: 'Vetiver (Khus) Water',
        botanicalSource: 'Chrysopogon Zizanioides',
        purpose: 'Cools the scalp and soothes seasonal itchiness and stress-induced heat.'
      }
    ],
    benefits: [
      'Reduces hair breakage and strand shedding by up to 65% in 4 washes',
      'Naturally balances greasy roots while conditioning dry brittle ends',
      'Mild foaming formula free of sulfates, silicones, and synthetic parabens',
      'Leaves hair smelling of authentic fresh crushed botanical herbs'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Wet Scalp Thoroughly',
        description: 'Drench scalp and hair with lukewarm water.'
      },
      {
        step: 2,
        title: 'Lather in Palms',
        description: 'Take 2-3 pumps into palm, dilute with a splash of water, and massage gently onto scalp.'
      },
      {
        step: 3,
        title: 'Rinse with Cool Water',
        description: 'Rinse thoroughly until runoff is crystal clear. No chemical conditioner required.'
      }
    ]
  },
  {
    id: 'zn-003',
    name: 'Nourishing Face Cream with Saffron & Shea',
    slug: 'nourishing-face-cream',
    tagline: 'Kashmiri Saffron • Shea Butter • Almond Oil',
    category: 'Skincare',
    concerns: ['Dry Skin', 'Daily Glow', 'Pigmentation'],
    price: 549,
    originalPrice: 699,
    volume: '50 g',
    weightGrams: 140,
    rating: 4.9,
    reviewCount: 114,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1608248597359-28192a549646?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Velvety day-and-night nourishing cream that melts effortlessly into skin to provide deep replenishment.',
    fullDescription: 'Whipped raw African shea butter meets hand-harvested Kashmiri saffron strands and cold-pressed sweet almond oil. Restores skin barrier elasticity, combats winter dryness, and bestows a pearlescent botanical warmth.',
    targetType: 'Best for normal to dry, dehydrated, or mature skin types',
    botanicalHighlights: ['Pure Kashmiri Saffron', 'Cold-Pressed Sweet Almond', 'Unrefined Raw Shea'],
    inStock: true,
    ingredients: [
      {
        name: 'Kashmiri Saffron (Kesar)',
        botanicalSource: 'Crocus Sativus',
        purpose: 'Imparts a soft natural luminosity and targets stubborn hyperpigmentation.'
      },
      {
        name: 'Unrefined Shea Butter',
        botanicalSource: 'Vitellaria Paradoxa',
        purpose: 'Locks in deep lipid hydration and protects against dryness.'
      },
      {
        name: 'Sweet Almond Oil',
        botanicalSource: 'Prunus Amygdalus Dulcis',
        purpose: 'Packed with Vitamin E to soften dry flakes and smooth fine dehydration lines.'
      },
      {
        name: 'Pure Damask Rose Hydrosol',
        botanicalSource: 'Rosa Damascena',
        purpose: 'Provides botanical hydration and a lingering royal floral essence.'
      }
    ],
    benefits: [
      'Provides rich 24-hour nourishment without sticky or greasy residue',
      'Restores skin firmness and bounce through essential fatty acids',
      'Evens out skin discolouration and gives a healthy golden glow',
      'Acts as a smooth, velvet botanical primer under daily cosmetics'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Scoop a Pea-Sized Amount',
        description: 'Take a small dab using clean fingertips or a spatula.'
      },
      {
        step: 2,
        title: 'Warm Between Palms',
        description: 'Rub lightly between fingers to activate the raw botanical butters.'
      },
      {
        step: 3,
        title: 'Massage in Upward Strokes',
        description: 'Massage into face, neck, and decolletage using upward uplifting strokes every morning & night.'
      }
    ]
  },
  {
    id: 'zn-004',
    name: 'Botanical Body Lotion with Sandalwood & Cocoa',
    slug: 'botanical-body-lotion',
    tagline: 'Chettinad Sandalwood • Raw Cocoa • Virgin Coconut',
    category: 'Body Care',
    concerns: ['Dry Skin', 'Daily Glow'],
    price: 449,
    originalPrice: 550,
    volume: '300 ml',
    weightGrams: 380,
    rating: 4.7,
    reviewCount: 76,
    badge: 'Pure Botanical',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Silky fast-absorbing body lotion that hydrates parched skin with aromatic sandalwood and pure cocoa butter.',
    fullDescription: 'Inspired by South Indian post-bath rituals, this non-sticky body lotion wraps your skin in deep, lingering hydration. Fresh coconut milk and virgin oils soothe weather-chapped skin all day.',
    targetType: 'Suitable for daily full-body hydration across all age groups',
    botanicalHighlights: ['Sandalwood Extract', 'Pure Cocoa Butter', 'Cold-Pressed Virgin Coconut Oil'],
    inStock: true,
    ingredients: [
      {
        name: 'Chettinad Sandalwood Extract',
        botanicalSource: 'Santalum Album',
        purpose: 'Naturally tones the body and imparts a grounding traditional fragrance.'
      },
      {
        name: 'Pure Cocoa Seed Butter',
        botanicalSource: 'Theobroma Cacao',
        purpose: 'Forms a protective moisture barrier against moisture evaporation.'
      },
      {
        name: 'Virgin Coconut Oil',
        botanicalSource: 'Cocos Nucifera',
        purpose: 'Delivers medium-chain fatty acids for soft touchable skin.'
      },
      {
        name: 'Jojoba Seed Wax',
        botanicalSource: 'Simmondsia Chinensis',
        purpose: 'Mimics the skin natural sebum for quick non-greasy absorption.'
      }
    ],
    benefits: [
      'Absorbs in 30 seconds with no sticky clothing cling',
      'Soothes rough elbows, knees, and dry ashen skin instantly',
      'Provides subtle, grounding natural sandalwood aroma throughout the day',
      'Maintains skin elasticity and healthy lipid hydration'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Apply Post-Shower',
        description: 'For best absorption, apply to damp skin immediately after bathing.'
      },
      {
        step: 2,
        title: 'Spread Generously',
        description: 'Pump 2-3 dollops and massage across arms, legs, and torso.'
      },
      {
        step: 3,
        title: 'Target Dry Zones',
        description: 'Pay special attention to knees, elbows, and ankles.'
      }
    ]
  },
  {
    id: 'zn-005',
    name: 'Herbal Hair Oil with 18 Chettinad Botanicals',
    slug: 'herbal-hair-oil',
    tagline: 'Amla • Bringraj • Rosemary • Curry Leaf',
    category: 'Haircare',
    concerns: ['Hair Fall', 'Dandruff'],
    price: 399,
    originalPrice: 499,
    volume: '200 ml',
    weightGrams: 260,
    rating: 4.9,
    reviewCount: 168,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1608248597359-28192a549646?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Traditional slow-cooked herbal hair elixir infused with 18 botanical herbs to stimulate thick hair growth.',
    fullDescription: 'Prepared using traditional copper vessels over slow wood-fire heat for 72 hours. Cold-pressed sesame and virgin coconut oils absorb the medicinal power of fresh amla, neem, rosemary, and curry leaves to stop scalp dryness and premature greying.',
    targetType: 'For all hair textures suffering from thinning, shedding, or dry scalp',
    botanicalHighlights: ['Slow-Cooked Amla', 'Fresh Curry Leaves', 'Pure Rosemary Essential Oil'],
    ingredients: [
      {
        name: 'Indian Gooseberry (Amla)',
        botanicalSource: 'Phyllanthus Emblica',
        purpose: 'High vitamin C concentration revitalizes pigmented hair shafts.'
      },
      {
        name: 'Fresh Curry Leaves',
        botanicalSource: 'Murraya Koenigii',
        purpose: 'Rich in beta-carotene and proteins that rebuild thinning hair strands.'
      },
      {
        name: 'Rosemary Leaf Infusion',
        botanicalSource: 'Salvia Rosmarinus',
        purpose: 'Clinically proven to improve microcirculation to active root hair bulbs.'
      },
      {
        name: 'Black Cumin (Kalonji)',
        botanicalSource: 'Nigella Sativa',
        purpose: 'Deeply soothes scalp inflammation and eliminates dandruff flakes.'
      }
    ],
    benefits: [
      'Visibly reduces hair fall within 14 days of regular oiling',
      'Eliminates itchy dandruff and balances flaky scalp conditions',
      'Conditions dry rough strands and adds noticeable mirror shine',
      'Provides calming stress-relief when massaged before bed'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Warm the Oil',
        description: 'Pour 2 tablespoons into a small bowl and warm gently in hot water.'
      },
      {
        step: 2,
        title: 'Section & Massage',
        description: 'Section hair and apply directly to scalp with fingertips, massaging for 10 minutes.'
      },
      {
        step: 3,
        title: 'Leave On',
        description: 'Leave on for at least 1 hour or overnight, then wash with Z Naturals Herbal Shampoo.'
      }
    ],
    inStock: true
  },
  {
    id: 'zn-006',
    name: 'Radiant Ubtan Bath Powder (Traditional Nalangu Maavu)',
    slug: 'radiant-ubtan-bath-powder',
    tagline: 'Wild Turmeric • Rose Petals • Green Gram • Vetiver',
    category: 'Body Care',
    concerns: ['Acne & Blemishes', 'Pigmentation', 'Daily Glow'],
    price: 349,
    originalPrice: 420,
    volume: '200 g',
    weightGrams: 240,
    rating: 5.0,
    reviewCount: 204,
    badge: 'Customer Favorite',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Heritage stone-ground cleansing bath ubtan that replaces harsh soap with 100% pure botanical herbs.',
    fullDescription: 'Our signature blend passed down through Chettinad grandmothers. Combines aromatic wild turmeric (Kasthuri Manjal), dried damask rose petals, sun-dried green gram, and vetiver roots. Gently polishes away dead skin, controls body acne, and leaves an intoxicating natural botanical fragrance.',
    targetType: 'Suitable for all skin types, including sensitive skin and brides-to-be',
    botanicalHighlights: ['Wild Kasthuri Turmeric', 'Fragrant Damask Rose', 'Cooling Vetiver Roots'],
    ingredients: [
      {
        name: 'Wild Turmeric (Kasthuri Manjal)',
        botanicalSource: 'Curcuma Aromatica',
        purpose: 'Non-staining natural antibacterial that heals body blemishes and clears tan.'
      },
      {
        name: 'Green Gram Flour (Moong Dal)',
        botanicalSource: 'Vigna Radiata',
        purpose: 'Micro-exfoliates dead cells without disrupting natural skin barrier moisture.'
      },
      {
        name: 'Sun-Dried Rose Petals',
        botanicalSource: 'Rosa Centifolia',
        purpose: 'Tones pores and delivers an unforgettable natural herbal fragrance.'
      },
      {
        name: 'Aromatic Vetiver Grass',
        botanicalSource: 'Chrysopogon Zizanioides',
        purpose: 'Cooling Chettinad herb that prevents body heat, prickly heat, and odor.'
      }
    ],
    benefits: [
      'Completely replaces drying chemical body washes and soaps',
      'Removes stubborn sun tan and dead skin layers naturally',
      'Controls body acne on back, chest, and shoulders effectively',
      'Leaves skin silky smooth with a radiant golden glow'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Mix into Paste',
        description: 'Take 2-3 tablespoons in a bowl. Mix with raw milk, rose water, or plain water to form a smooth paste.'
      },
      {
        step: 2,
        title: 'Apply over Body',
        description: 'Rub all over damp skin in gentle circular motions, letting the botanical grains gently polish.'
      },
      {
        step: 3,
        title: 'Rinse with Water',
        description: 'Rinse off thoroughly with lukewarm water. Pat dry to feel the velvety botanical finish.'
      }
    ],
    inStock: true
  }
];

export const CONCERN_LIST = [
  {
    id: 'Acne & Blemishes',
    name: 'Acne & Blemishes',
    tagline: 'Clear, Calm & Heal',
    icon: 'Sparkles',
    color: '#66765C',
    bg: '#EBEFE8',
    count: 3
  },
  {
    id: 'Hair Fall',
    name: 'Hair Fall',
    tagline: 'Root Strength & Density',
    icon: 'ShieldCheck',
    color: '#263D32',
    bg: '#E4ECE7',
    count: 2
  },
  {
    id: 'Pigmentation',
    name: 'Pigmentation',
    tagline: 'Even Tone & Clarity',
    icon: 'Sun',
    color: '#C5A16B',
    bg: '#FAF4EB',
    count: 3
  },
  {
    id: 'Dry Skin',
    name: 'Dry Skin',
    tagline: 'Deep Moisture & Supple Feel',
    icon: 'Droplets',
    color: '#705B49',
    bg: '#F5EFEB',
    count: 3
  },
  {
    id: 'Daily Glow',
    name: 'Daily Glow',
    tagline: 'Luminous Dewy Radiance',
    icon: 'Flame',
    color: '#C5A16B',
    bg: '#FCF8F2',
    count: 4
  }
] as const;
