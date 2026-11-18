import { Product, SkinOrHairConcern } from '../types';

export const CONCERN_LIST: { id: SkinOrHairConcern; name: string; tagline: string; icon: string; image: string }[] = [
  { id: 'Daily Glow', name: 'Daily Glow & Radiance', tagline: 'Kashmiri Saffron & Kumkumadi', icon: '✨', image: './concerns/concern_daily_glow.jpg' },
  { id: 'Hair Fall', name: 'Hair Fall Control', tagline: '18 Chettinad Herbs & Bringraj', icon: '🌿', image: './concerns/concern_hair_fall.jpg' },
  { id: 'Pigmentation', name: 'Pigmentation & Tan', tagline: 'Wild Turmeric & Rose Hydrosol', icon: '🌸', image: './concerns/concern_pigmentation.jpg' },
  { id: 'Acne & Blemishes', name: 'Acne & Pimple Clear', tagline: 'Wild Kuppaimeni & Tea Tree', icon: '🍃', image: './concerns/concern_acne.jpg' },
  { id: 'Dry Skin', name: 'Deep Moisture & Barrier', tagline: 'Farm Goat Milk & Shea Butter', icon: '🥛', image: './concerns/concern_dry_skin.jpg' },
  { id: 'Dandruff', name: 'Dandruff & Itchy Scalp', tagline: 'Neem & Shikakai Decoction', icon: '🌱', image: './concerns/concern_dandruff.jpg' },
  { id: 'Sensitive Skin', name: 'Gentle & Calming', tagline: 'Aloe Vera & Chamomile Extract', icon: '💧', image: './concerns/concern_sensitive_skin.jpg' }
];

export const PRODUCTS: Product[] = [
  // ==========================================
  // [CATEGORY: HAIR]
  // ==========================================
  {
    id: 'zn-hair-01',
    name: 'Z Naturals Advanced Herbs Hair Oil',
    slug: 'advanced-herbs-hair-oil',
    tagline: '18 Chettinad Botanicals • Amla • Rosemary • Curry Leaves',
    category: 'Hair',
    concerns: ['Hair Fall', 'Dandruff', 'Daily Glow'],
    price: 399,
    originalPrice: 499,
    volume: '100 ml',
    weightGrams: 140,
    rating: 4.9,
    reviewCount: 218,
    badge: 'Bestseller',
    image: './products/advanced_herbs_hair_oil.jpg',
    secondaryImage: './products/shikakai_shampoo.jpg',
    shortDescription: 'Slow-cooked 72-hour Ayurvedic hair elixir infused with 18 Chettinad herbs to control excessive hair fall and stimulate thick roots.',
    fullDescription: 'Prepared using traditional copper vessels over slow wood-fire heat for 72 hours. Cold-pressed virgin coconut and sesame oils absorb the medicinal power of fresh amla, neem, rosemary, bringraj, and curry leaves to revitalize hair follicles, reduce breakage, and prevent premature greying.',
    targetType: 'Ideal for weak roots, post-monsoon hair fall, and thinning hair',
    botanicalHighlights: ['Slow-Cooked Amla', 'Fresh Curry Leaves', 'Rosemary Leaf Oil', 'Bringraj'],
    inStock: true,
    ingredients: [
      {
        name: 'False Daisy (Bringraj)',
        botanicalSource: 'Eclipta Alba',
        purpose: 'Renowned in classical Ayurveda as the King of Hair, awakening dormant follicles and boosting root strength.'
      },
      {
        name: 'Indian Gooseberry (Amla)',
        botanicalSource: 'Phyllanthus Emblica',
        purpose: 'Packed with natural Vitamin C and antioxidants that strengthen the hair shaft against breakage.'
      },
      {
        name: 'Rosemary Leaf Infusion',
        botanicalSource: 'Salvia Rosmarinus',
        purpose: 'Clinically proven to improve microcirculation to active root bulbs and stimulate new growth.'
      },
      {
        name: 'Fresh Curry Leaves',
        botanicalSource: 'Murraya Koenigii',
        purpose: 'Rich in beta-carotene and essential amino acids that preserve natural melanin and prevent early greying.'
      },
      {
        name: 'Cold-Pressed Sesame & Virgin Coconut Oil',
        botanicalSource: 'Sesamum Indicum & Cocos Nucifera',
        purpose: 'Deeply nourishing natural lipid carrier base that locks moisture deep within the cortex.'
      }
    ],
    benefits: [
      'Visibly reduces hair fall and strand shedding within 14 days of regular use',
      'Stimulates active hair root follicles and adds noticeable volume',
      'Soothes dry, itchy, and irritated scalp barriers naturally',
      'Conditions rough brittle hair shafts without heavy greasy buildup',
      'Provides calming stress-relief and peaceful sleep when massaged before bed'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Warm the Oil',
        description: 'Pour 2-3 tablespoons into a small bowl and warm gently in hot water.'
      },
      {
        step: 2,
        title: 'Section & Apply',
        description: 'Part hair into sections and apply directly to scalp with fingertips.'
      },
      {
        step: 3,
        title: 'Circular Massage',
        description: 'Massage in gentle circular uplifting motions for 10 minutes.'
      },
      {
        step: 4,
        title: 'Leave & Wash',
        description: 'Leave on for at least 1-2 hours or overnight, then wash with Z Naturals Shikakai Shampoo.'
      }
    ]
  },
  {
    id: 'zn-hair-02',
    name: 'Z Naturals Anti-Dandruff Hair Oil',
    slug: 'anti-dandruff-hair-oil',
    tagline: 'Neem Leaf • Tea Tree • Sprouted Methi • Bhimseni Camphor',
    category: 'Hair',
    concerns: ['Dandruff', 'Hair Fall'],
    price: 399,
    originalPrice: 499,
    volume: '100 ml',
    weightGrams: 140,
    rating: 4.8,
    reviewCount: 154,
    badge: 'Customer Favorite',
    image: './products/anti_dandruff_hair_oil.jpg',
    secondaryImage: './products/rosemary_shampoo.jpg',
    shortDescription: 'Potent antifungal herbal hair oil that clears stubborn white flakes, controls scalp itch, and eliminates bacterial buildup.',
    fullDescription: 'Crafted with cold-pressed neem leaves, pure tea tree extract, sprouted fenugreek, and cooling Bhimseni camphor. Purifies the scalp microbiome and creates a healthy moisture barrier that prevents dandruff recurrence.',
    targetType: 'For chronic dandruff, itchy scalps, and seasonal flakiness',
    botanicalHighlights: ['Fresh Neem Leaves', 'Tea Tree Oil', 'Fenugreek Seeds', 'Bhimseni Camphor'],
    inStock: true,
    ingredients: [
      {
        name: 'Wild Neem Leaf Extract',
        botanicalSource: 'Azadirachta Indica',
        purpose: 'Powerful natural antifungal agent that destroys dandruff-causing Malassezia yeasts.'
      },
      {
        name: 'Pure Tea Tree Essential Oil',
        botanicalSource: 'Melaleuca Alternifolia',
        purpose: 'Unclogs congested hair follicles and clarifies scalp sebum buildup.'
      },
      {
        name: 'Sprouted Methi (Fenugreek)',
        botanicalSource: 'Trigonella Foenum-Graecum',
        purpose: 'Provides deep mucilage conditioning to soothe redness and flaking.'
      },
      {
        name: 'Bhimseni Camphor',
        botanicalSource: 'Cinnamomum Camphora',
        purpose: 'Delivers immediate cooling relief from intense scalp itchiness.'
      }
    ],
    benefits: [
      'Eliminates visible dandruff flakes and controls scalp itch from the first wash',
      'Balances excess scalp sebum without drying out hair lengths',
      'Prevents fungal recurrence by creating a sterile, healthy scalp environment',
      'Leaves hair feeling fresh, clean, and lightly conditioned'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Apply to Scalp',
        description: 'Apply directly onto scalp sections focusing on itchy, flaky zones.'
      },
      {
        step: 2,
        title: 'Leave for 45 Mins',
        description: 'Leave on for 45 to 60 minutes before bathing.'
      },
      {
        step: 3,
        title: 'Wash Off',
        description: 'Wash thoroughly with Z Naturals Herbal Shampoo. Use 2-3 times weekly.'
      }
    ]
  },
  {
    id: 'zn-hair-03',
    name: 'Z Naturals Shikakai Herbal Shampoo',
    slug: 'shikakai-herbal-shampoo',
    tagline: 'Wild Shikakai Pods • Red Hibiscus • Reetha • Vetiver',
    category: 'Hair',
    concerns: ['Hair Fall', 'Dandruff'],
    price: 399,
    originalPrice: 480,
    volume: '100 ml',
    weightGrams: 140,
    rating: 4.8,
    reviewCount: 186,
    badge: 'Bestseller',
    image: './products/shikakai_shampoo.jpg',
    secondaryImage: './products/advanced_herbs_hair_oil.jpg',
    shortDescription: 'Gentle sulfate-free traditional hair cleanser rooted in Chettinad herbal decoctions to cleanse without stripping natural scalp moisture.',
    fullDescription: 'Formulated with hand-gathered Shikakai pods, crushed red hibiscus flowers, and saponin-rich soapnuts (Reetha). Gently washes away sweat, pollution, and oil while restoring hair cuticle smoothness and natural bounce.',
    targetType: 'All hair types, specially formulated for hair fall and sensitive scalps',
    botanicalHighlights: ['Wild Shikakai Pods', 'Red Hibiscus Petals', 'Reetha Extract', 'Vetiver Water'],
    inStock: true,
    ingredients: [
      {
        name: 'Wild Shikakai Pod Decoction',
        botanicalSource: 'Acacia Concinna',
        purpose: 'Provides mild natural saponin lather that balances scalp pH and detangles hair.'
      },
      {
        name: 'Red Hibiscus Petal Extract',
        botanicalSource: 'Hibiscus Rosa-Sinensis',
        purpose: 'Rich in amino acids and mucilage to condition locks naturally.'
      },
      {
        name: 'Soapnut (Reetha) Infusion',
        botanicalSource: 'Sapindus Mukorossi',
        purpose: 'Creates a gentle, creamy lather that cleanses without chemical sulfates.'
      },
      {
        name: 'Vetiver (Khus) Water',
        botanicalSource: 'Chrysopogon Zizanioides',
        purpose: 'Cools the scalp and soothes stress-induced heat and seasonal itchiness.'
      }
    ],
    benefits: [
      '100% sulfate-free, paraben-free and silicone-free formula',
      'Cleanses gently without stripping the scalp natural protective sebum',
      'Reduces hair breakage and strand shedding by up to 65% in 4 washes',
      'Leaves hair silky, naturally detangled, and full of healthy body'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Wet Hair',
        description: 'Drench hair and scalp thoroughly with lukewarm water.'
      },
      {
        step: 2,
        title: 'Dilute & Lather',
        description: 'Take 1-2 pumps into palm, dilute with a little water, and massage onto scalp.'
      },
      {
        step: 3,
        title: 'Rinse Clean',
        description: 'Rinse thoroughly until water runs completely clear.'
      }
    ]
  },
  {
    id: 'zn-hair-04',
    name: 'Z Naturals Rosemary Herbal Shampoo',
    slug: 'rosemary-herbal-shampoo',
    tagline: 'Rosemary Essential Oil • Peppermint • Sprouted Fenugreek • Plant Biotin',
    category: 'Hair',
    concerns: ['Hair Fall', 'Daily Glow'],
    price: 430,
    originalPrice: 520,
    volume: '100 ml',
    weightGrams: 140,
    rating: 4.9,
    reviewCount: 122,
    badge: 'New Launch',
    image: './products/rosemary_shampoo.jpg',
    secondaryImage: './products/anti_dandruff_hair_oil.jpg',
    shortDescription: 'Refreshing hair revitalizing shampoo enriched with pure Rosemary and Peppermint to awaken dormant follicles and add glossy volume.',
    fullDescription: 'Infused with steam-distilled rosemary essential oil and plant-derived biotin. Deeply purifies oily roots, improves root oxygenation, and leaves fine thinning hair visibly bouncy, refreshed, and energized.',
    targetType: 'For thinning hair, oily scalps, and limp flat strands',
    botanicalHighlights: ['Rosemary Essential Oil', 'Peppermint Cooling Extract', 'Plant Biotin'],
    inStock: true,
    ingredients: [
      {
        name: 'Rosemary Essential Oil',
        botanicalSource: 'Salvia Rosmarinus',
        purpose: 'Stimulates root microcirculation to promote thicker strand density.'
      },
      {
        name: 'Peppermint Extract',
        botanicalSource: 'Mentha Piperita',
        purpose: 'Imparts a tingling cooling sensation that clarifies buildup.'
      },
      {
        name: 'Plant Biotin',
        botanicalSource: 'Botanical Ferment',
        purpose: 'Fortifies the hair keratin structure to prevent breakage.'
      }
    ],
    benefits: [
      'Awakens sluggish hair roots to boost new baby hair growth',
      'Provides a crisp, refreshing cooling scalp sensation',
      'Volumizes limp hair from root to tip without dryness',
      'Mild daily-use formula suitable for men and women'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Apply to Wet Scalp',
        description: 'Massage gently onto wet scalp to work up a rich botanical lather.'
      },
      {
        step: 2,
        title: 'Wait 2 Minutes',
        description: 'Leave for 2 minutes to allow rosemary nutrients to penetrate.'
      },
      {
        step: 3,
        title: 'Rinse Well',
        description: 'Rinse with cool water.'
      }
    ]
  },

  // ==========================================
  // [CATEGORY: FACE]
  // ==========================================
  {
    id: 'zn-face-01',
    name: 'Z Naturals Kumkumadi Face Serum',
    slug: 'kumkumadi-face-serum',
    tagline: 'Kashmiri Saffron • Sandalwood • Vetiver • 26 Royal Ayurvedic Herbs',
    category: 'Face',
    concerns: ['Daily Glow', 'Pigmentation', 'Acne & Blemishes'],
    price: 449,
    originalPrice: 599,
    volume: '20 ml',
    weightGrams: 80,
    rating: 4.9,
    reviewCount: 342,
    badge: 'Bestseller',
    image: './products/kumkumadi_face_serum.jpg',
    secondaryImage: './products/pure_rose_water.jpg',
    shortDescription: 'The legendary Ayurvedic youth nectar crafted with authentic Kashmiri Saffron and Sandalwood to fade spots and impart golden luminosity.',
    fullDescription: 'Handcrafted according to classical Ashtanga Hridaya texts, this miraculous facial oil combines Grade-A Kashmiri Saffron, Red Sandalwood, Indian Madder (Manjistha), and Blue Lotus infused in cold-pressed sesame oil. Penetrates deep into the dermal matrix to eliminate dark spots, repair sun damage, and restore regal bridal radiance.',
    targetType: 'Suitable for all skin types, especially uneven tone, dullness, and dark spots',
    botanicalHighlights: ['Grade-A Kashmiri Saffron', 'Red Sandalwood', 'Manjistha Root', 'Blue Lotus'],
    inStock: true,
    ingredients: [
      {
        name: 'Pure Kashmiri Saffron (Kesar)',
        botanicalSource: 'Crocus Sativus',
        purpose: 'Rich in crocin and carotenoids that brighten dull skin and naturally suppress excess melanin.'
      },
      {
        name: 'Red Sandalwood (Rakta Chandana)',
        botanicalSource: 'Pterocarpus Santalinus',
        purpose: 'Cools inflammation, fades acne marks, and imparts a refined velvety glow.'
      },
      {
        name: 'Indian Madder (Manjistha)',
        botanicalSource: 'Rubia Cordifolia',
        purpose: 'Purifies blood impurities, evens out hyperpigmentation, and tones facial contours.'
      },
      {
        name: 'Khus Vetiver',
        botanicalSource: 'Chrysopogon Zizanioides',
        purpose: 'Deeply cools facial heat and tightens enlarged pores.'
      }
    ],
    benefits: [
      'Visibly fades stubborn dark spots, sun tanning, and acne scars in 2-3 weeks',
      'Bestows an enduring lit-from-within golden morning glow without greasiness',
      'Smoothens rough skin texture and refines micro-pores',
      'Deeply hydrates and restores skin elasticity for a dewy silk finish'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Cleanse Face',
        description: 'Wash face with Z Naturals Kumkumadi Face Wash and pat dry.'
      },
      {
        step: 2,
        title: 'Dispense 3-4 Drops',
        description: 'Take 3 to 4 drops directly onto your palms or cheeks.'
      },
      {
        step: 3,
        title: 'Gentle Press & Tap',
        description: 'Gently press into skin using upward circular motions. Best used at night before sleep.'
      }
    ]
  },
  {
    id: 'zn-face-02',
    name: 'Z Naturals Anti-Acne & Pimple Face Serum',
    slug: 'anti-acne-pimple-face-serum',
    tagline: 'Tea Tree • Neem Leaf • White Willow Bark • Centella (Gotu Kola)',
    category: 'Face',
    concerns: ['Acne & Blemishes', 'Sensitive Skin'],
    price: 449,
    originalPrice: 550,
    volume: '20 ml',
    weightGrams: 80,
    rating: 4.8,
    reviewCount: 198,
    badge: 'Pure Botanical',
    image: './products/anti_acne_serum.jpg',
    secondaryImage: './products/acne_pimple_soap.jpg',
    shortDescription: 'Fast-action water-light botanical serum that calms active pimples in 48 hours, clears whiteheads, and prevents post-acne blemishes.',
    fullDescription: 'Formulated with cold-extracted Australian Tea Tree, Wild Neem Leaves, and White Willow Bark (natural plant salicylic acid). Decongests clogged sebaceous glands without drying out the skin barrier.',
    targetType: 'For oily, combination, acne-prone, and breakout-troubled skin',
    botanicalHighlights: ['Australian Tea Tree', 'Wild Neem Extract', 'White Willow Bark', 'Centella'],
    inStock: true,
    ingredients: [
      {
        name: 'Australian Tea Tree Leaf Oil',
        botanicalSource: 'Melaleuca Alternifolia',
        purpose: 'Rapidly destroys acne-causing bacteria and dries out active pustules.'
      },
      {
        name: 'White Willow Bark Extract',
        botanicalSource: 'Salix Alba',
        purpose: 'Provides natural beta-hydroxy acid (Salicylic Acid) to dissolve deep pore sebum.'
      },
      {
        name: 'Gotu Kola (Centella Asiatica)',
        botanicalSource: 'Centella Asiatica',
        purpose: 'Calms redness and accelerates tissue regeneration to prevent pitted scars.'
      }
    ],
    benefits: [
      'Visibly reduces pimple size and painful inflammation within 24 to 48 hours',
      'Regulates excess facial sebum and keeps T-zone shine-free all day',
      'Fades red and brown post-inflammatory acne marks',
      'Non-comedogenic, zero alcohol, zero synthetic fragrance'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Cleanse Area',
        description: 'Cleanse face with Z Naturals Acne Clear Soap.'
      },
      {
        step: 2,
        title: 'Apply 2-3 Drops',
        description: 'Apply 2-3 drops over entire face or dab directly onto active pimples.'
      },
      {
        step: 3,
        title: 'Use Twice Daily',
        description: 'Use morning and night for best blemish control.'
      }
    ]
  },
  {
    id: 'zn-face-03',
    name: 'Z Naturals Kumkumadi Face Wash',
    slug: 'kumkumadi-face-wash',
    tagline: 'Kashmiri Saffron • Rose Water • Red Sandalwood • Aloe Vera',
    category: 'Face',
    concerns: ['Daily Glow', 'Pigmentation'],
    price: 469,
    originalPrice: 580,
    volume: '50 ml',
    weightGrams: 90,
    rating: 4.8,
    reviewCount: 164,
    badge: 'Customer Favorite',
    image: './products/kumkumadi_face_wash.jpg',
    secondaryImage: './products/kumkumadi_face_serum.jpg',
    shortDescription: 'Gentle clarifying facial cleanser infused with Kashmiri Saffron and Rose Water to wash away dirt and impart an instant dewy glow.',
    fullDescription: 'A silky foaming gel cleanser enriched with pure saffron hydrosol and cooling sandalwood. Cleanses deeply without stripping moisture, leaving skin radiant, velvety, and supple.',
    targetType: 'Suitable for all skin types, including dry and sensitive skin',
    botanicalHighlights: ['Pure Saffron Infusion', 'Damask Rose Hydrosol', 'Red Sandalwood'],
    inStock: true,
    ingredients: [
      {
        name: 'Kashmiri Saffron Infusion',
        botanicalSource: 'Crocus Sativus',
        purpose: 'Brightens complexion and removes morning dullness.'
      },
      {
        name: 'Pure Damask Rose Water',
        botanicalSource: 'Rosa Damascena',
        purpose: 'Maintains skin optimal pH and provides delicate floral hydration.'
      },
      {
        name: 'Vegetable Glycerin & Aloe Vera',
        botanicalSource: 'Aloe Barbadensis',
        purpose: 'Locks in hydration so skin feels soft rather than tight post-wash.'
      }
    ],
    benefits: [
      'Cleanses grime, sweat, and pollution thoroughly in a single wash',
      'Leaves skin glowing, soft, and refreshed with zero post-wash tightness',
      'Prepares skin for optimal absorption of Kumkumadi Face Serum',
      'Free from harsh sulfates, parabens, and synthetic dyes'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Dispense a Coin Size',
        description: 'Take a coin-sized pump onto wet palms.'
      },
      {
        step: 2,
        title: 'Lather & Massage',
        description: 'Gently massage onto wet face in circular motions for 30-40 seconds.'
      },
      {
        step: 3,
        title: 'Rinse',
        description: 'Rinse with cool water and pat dry with a soft towel.'
      }
    ]
  },
  {
    id: 'zn-face-04',
    name: 'Z Naturals Detan Face Gel',
    slug: 'detan-face-gel',
    tagline: 'Cooling Cucumber • Kasturi Turmeric • Aloe Vera • Papaya Enzyme',
    category: 'Face',
    concerns: ['Pigmentation', 'Daily Glow'],
    price: 399,
    originalPrice: 499,
    volume: '50 gm',
    weightGrams: 110,
    rating: 4.9,
    reviewCount: 204,
    badge: 'Pure Botanical',
    image: './products/detan_face_gel.jpg',
    secondaryImage: './products/botanical_sunscreen.jpg',
    shortDescription: 'Ultra-cooling, oil-free hydration gel that dissolves stubborn sun tan, cools heat redness, and evens out sun-damaged skin.',
    fullDescription: 'Infused with cooling cucumber juice, wild Kasturi turmeric, and green papaya enzymes. Melts onto skin to instantly soothe sun burns, remove outdoor tanning, and brighten dark patches.',
    targetType: 'Best for sun-tanned, heated, oily, or outdoor-exposed skin',
    botanicalHighlights: ['Fresh Cucumber Juice', 'Wild Kasturi Turmeric', 'Papaya Enzyme (Papain)'],
    inStock: true,
    ingredients: [
      {
        name: 'Wild Kasturi Turmeric',
        botanicalSource: 'Curcuma Aromatica',
        purpose: 'Traditional non-staining turmeric that visibly reverses sun tan and fades dark patches.'
      },
      {
        name: 'Fresh Cucumber Juice',
        botanicalSource: 'Cucumis Sativus',
        purpose: 'Cools sun heat, reduces puffiness, and restores cellular water levels.'
      },
      {
        name: 'Papaya Enzyme (Papain)',
        botanicalSource: 'Carica Papaya',
        purpose: 'Gently sloughs off sun-damaged dead skin cells for fresh bright skin.'
      }
    ],
    benefits: [
      'Reverses stubborn outdoor sun tanning in just 5-7 days of daily use',
      'Provides immediate soothing relief from sunburn and prickly heat redness',
      '100% oil-free gel texture absorbs within seconds with zero sticky film',
      'Acts as a refreshing cooling sleeping mask'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Cleanse Face',
        description: 'Cleanse face and neck thoroughly.'
      },
      {
        step: 2,
        title: 'Apply Generously',
        description: 'Smooth a generous layer over face and neck, focusing on tanned areas.'
      },
      {
        step: 3,
        title: 'Leave On',
        description: 'Can be left on overnight or used as a 20-minute wash-off cooling pack.'
      }
    ]
  },
  {
    id: 'zn-face-05',
    name: 'Z Naturals SPF 50 Botanical Sunscreen',
    slug: 'spf-50-botanical-sunscreen',
    tagline: 'Non-Nano Zinc Oxide • Red Raspberry Seed • Green Tea • Aloe Vera',
    category: 'Face',
    concerns: ['Pigmentation', 'Daily Glow', 'Sensitive Skin'],
    price: 410,
    originalPrice: 520,
    volume: '50 ml',
    weightGrams: 100,
    rating: 4.9,
    reviewCount: 230,
    badge: 'Bestseller',
    image: './products/botanical_sunscreen.jpg',
    secondaryImage: './products/pure_rose_water.jpg',
    shortDescription: 'Ultra-light mineral sunscreen offering broad-spectrum PA++++ protection with zero white cast and a velvety matte finish.',
    fullDescription: 'Formulated with safe mineral non-nano zinc oxide and antioxidant-rich red raspberry seed oil. Shields against damaging UVA/UVB rays and blue light while nourishing skin with soothing organic aloe vera.',
    targetType: 'Suitable for all skin types, including sensitive and acne-prone skin',
    botanicalHighlights: ['Non-Nano Zinc Oxide', 'Red Raspberry Seed Oil', 'Organic Green Tea Extract'],
    inStock: true,
    ingredients: [
      {
        name: 'Non-Nano Zinc Oxide (20%)',
        botanicalSource: 'Mineral Sun Filter',
        purpose: 'Provides safe, reef-friendly broad-spectrum UVA and UVB physical barrier.'
      },
      {
        name: 'Red Raspberry Seed Oil',
        botanicalSource: 'Rubus Idaeus',
        purpose: 'Rich in natural Vitamin E and polyphenols that neutralize free radical sun damage.'
      },
      {
        name: 'Organic Aloe Vera Pulp',
        botanicalSource: 'Aloe Barbadensis',
        purpose: 'Soothes heat redness and keeps skin hydrated throughout the day.'
      }
    ],
    benefits: [
      'High PA++++ broad-spectrum UVA/UVB defense against tanning and photoaging',
      'Blends effortlessly with ZERO chalky white cast on Indian skin tones',
      'Water and sweat-resistant for up to 80 minutes of outdoor exposure',
      'Matte velvet finish works seamlessly under makeup as a daily primer'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Two Finger Rule',
        description: 'Dispense two finger-lengths of sunscreen onto index and middle fingers.'
      },
      {
        step: 2,
        title: 'Apply 15 Mins Before Sun',
        description: 'Dot and massage evenly across face, neck, and ears 15 minutes before stepping outdoors.'
      },
      {
        step: 3,
        title: 'Reapply',
        description: 'Reapply every 3-4 hours during prolonged sun exposure.'
      }
    ]
  },
  {
    id: 'zn-face-06',
    name: 'Z Naturals Pure Rose Water Toner',
    slug: 'pure-rose-water-toner',
    tagline: '100% Steam-Distilled Indian Damask Rose Petals (Gulab Jal)',
    category: 'Face',
    concerns: ['Daily Glow', 'Dry Skin', 'Sensitive Skin'],
    price: 190,
    originalPrice: 250,
    volume: '100 ml',
    weightGrams: 140,
    rating: 4.8,
    reviewCount: 278,
    badge: 'Customer Favorite',
    image: './products/pure_rose_water.jpg',
    shortDescription: 'Pure hydro-distilled floral mist crafted from fresh Kannauj Damask rose petals to hydrate, tone pores, and refresh tired skin.',
    fullDescription: 'Created using age-old copper deg-bhapka steam distillation. Captures pure rose essential oil in floral hydrosol without a single drop of alcohol, preservatives, or artificial perfumes.',
    targetType: 'For all skin types, particularly dry, sensitive, or overheated skin',
    botanicalHighlights: ['100% Kannauj Damask Rose', 'Pure Steam Distillate', 'Zero Alcohol'],
    inStock: true,
    ingredients: [
      {
        name: 'Pure Damask Rose Hydrosol',
        botanicalSource: 'Rosa Damascena',
        purpose: 'Naturally astringent floral water that tones pores, balances sebum, and locks hydration.'
      }
    ],
    benefits: [
      'Instantly revitalizes and hydrates tired, parched skin with a fine dewy mist',
      'Restores skin ideal 5.5 pH balance post-cleansing',
      'Tightens pores and cools flushed, heated facial skin',
      'Versatile: Use as toner, makeup setting mist, or mix with Ubtan masks'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Hold 6 Inches Away',
        description: 'Hold bottle 6 inches from face and close your eyes.'
      },
      {
        step: 2,
        title: 'Spritz Generously',
        description: 'Spritz 3-4 pumps generously across face and neck.'
      },
      {
        step: 3,
        title: 'Pat Gently',
        description: 'Allow to air dry or pat gently with clean fingers.'
      }
    ]
  },
  {
    id: 'zn-face-07',
    name: 'Z Naturals Lip Lightening Serum Lip Balm',
    slug: 'lip-lightening-serum-lip-balm',
    tagline: 'Wild Beetroot Extract • Kashmiri Saffron • Raw Cocoa Butter • Almond Oil',
    category: 'Face',
    concerns: ['Pigmentation', 'Dry Skin'],
    price: 190,
    originalPrice: 240,
    volume: '10 gm',
    weightGrams: 30,
    rating: 4.9,
    reviewCount: 312,
    badge: 'Customer Favorite',
    image: './products/lip_balm.jpg',
    shortDescription: 'Nourishing butter balm enriched with Beetroot and Saffron to fade dark lip pigmentation and heal dry, cracked lips with a soft natural rosy tint.',
    fullDescription: 'Whipped raw cocoa butter, cold-pressed sweet almond oil, and pure beetroot extract work together to eliminate dry dead flakes and reverse sun and nicotine-induced lip darkening.',
    targetType: 'For dry, chapped, dark, or pigmented lips',
    botanicalHighlights: ['Wild Beetroot Extract', 'Kashmiri Saffron Oil', 'Raw Cocoa Butter', 'Sweet Almond'],
    inStock: true,
    ingredients: [
      {
        name: 'Wild Beetroot Extract',
        botanicalSource: 'Beta Vulgaris',
        purpose: 'Naturally lightens dark lip pigmentation and imparts a soft rosy flush.'
      },
      {
        name: 'Kashmiri Saffron Oil',
        botanicalSource: 'Crocus Sativus',
        purpose: 'Suppresses hyperpigmentation and restores natural healthy pink tones.'
      },
      {
        name: 'Pure Cocoa Butter & Almond Oil',
        botanicalSource: 'Theobroma Cacao & Prunus Amygdalus',
        purpose: 'Deeply softens cracked lips and forms an enduring moisture barrier.'
      }
    ],
    benefits: [
      'Visibly lightens dark, pigmented, or sun-tanned lips within 14 days',
      'Provides 12-hour intense moisture without sticky or waxy coating',
      'Heals painful chapped lips and prevents seasonal peeling',
      'Imparts a natural glossy rose tint for effortless daily wear'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Take Small Dab',
        description: 'Take a small dab onto fingertip.'
      },
      {
        step: 2,
        title: 'Apply Evenly',
        description: 'Smooth over lips whenever dry, especially before bedtime for overnight repair.'
      }
    ]
  },

  // ==========================================
  // [CATEGORY: BODY]
  // ==========================================
  {
    id: 'zn-body-01',
    name: 'Z Naturals Kuppaimeni Herbal Soap',
    slug: 'kuppaimeni-herbal-soap',
    tagline: 'Wild Kuppaimeni Leaves • Neem • Virgin Coconut Oil • Mahua Oil',
    category: 'Body',
    concerns: ['Acne & Blemishes', 'Sensitive Skin'],
    price: 99,
    originalPrice: 130,
    volume: '125 gm',
    weightGrams: 135,
    rating: 4.9,
    reviewCount: 420,
    badge: 'Bestseller',
    image: './products/kuppaimeni_soap.jpg',
    shortDescription: 'Classical Chettinad cold-processed soap made with wild fresh Kuppaimeni and Neem to clear body acne, skin allergies, and stubborn itching.',
    fullDescription: 'Handmade in small batches and cured for 45 days. Crushed wild Kuppaimeni (Acalypha Indica) leaves and cold-pressed neem oil provide miraculous relief from back acne, fungal infections, heat rashes, and eczema.',
    targetType: 'For all skin types, especially body acne, prickly heat, and itchy skin',
    botanicalHighlights: ['Fresh Kuppaimeni Leaf Pulp', 'Neem Seed Oil', 'Pure Coconut Oil'],
    inStock: true,
    ingredients: [
      {
        name: 'Kuppaimeni Leaf Extract',
        botanicalSource: 'Acalypha Indica',
        purpose: 'Celebrated Tamil Siddha herb that destroys skin bacteria and clears rashes.'
      },
      {
        name: 'Cold-Pressed Neem Oil',
        botanicalSource: 'Azadirachta Indica',
        purpose: 'Antiseptic oil that purifies skin pores and soothes persistent itchiness.'
      },
      {
        name: 'Virgin Coconut Oil & Mahua Oil',
        botanicalSource: 'Cocos Nucifera & Madhuca Longifolia',
        purpose: 'Provides a creamy rich lather that cleanses without skin drying.'
      }
    ],
    benefits: [
      'Clears stubborn back acne (backne), chest pimples, and body blemishes',
      'Provides immediate soothing relief from prickly heat rashes and sweat itch',
      '100% natural, chemical-free cold processed soap cured for 45 days',
      'Gentle everyday antibacterial bath soap for entire family'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Lather between Palms',
        description: 'Rub soap between wet hands or with a natural loofah to create rich foam.'
      },
      {
        step: 2,
        title: 'Apply over Body',
        description: 'Massage over body, leaving on acne/rash areas for 1-2 minutes.'
      },
      {
        step: 3,
        title: 'Rinse with Water',
        description: 'Rinse with water.'
      }
    ]
  },
  {
    id: 'zn-body-02',
    name: 'Z Naturals Kumkumadi Glow Soap',
    slug: 'kumkumadi-glow-soap',
    tagline: 'Kashmiri Saffron • Sandalwood • Sweet Almond Oil • Goat Milk',
    category: 'Body',
    concerns: ['Daily Glow', 'Pigmentation'],
    price: 99,
    originalPrice: 130,
    volume: '125 gm',
    weightGrams: 135,
    rating: 4.9,
    reviewCount: 310,
    badge: 'Bestseller',
    image: './products/kumkumadi_glow_soap.jpg',
    secondaryImage: './products/kumkumadi_face_serum.jpg',
    shortDescription: 'Luxury bathing bar crafted with pure Kashmiri Saffron, Red Sandalwood, and Sweet Almond to brighten full-body tone and soften dry skin.',
    fullDescription: 'Indulge in an authentic royal bathing experience. Saffron strands and farm goat milk gently buff away dullness while almond butter leaves skin velvety, moisturized, and fragrant.',
    targetType: 'For all skin types seeking all-over skin radiance and softening',
    botanicalHighlights: ['Kashmiri Saffron', 'Red Sandalwood', 'Farm Goat Milk'],
    inStock: true,
    ingredients: [
      {
        name: 'Kashmiri Saffron Extract',
        botanicalSource: 'Crocus Sativus',
        purpose: 'Imparts a golden natural glow and helps even out body tanning.'
      },
      {
        name: 'Red Sandalwood Powder',
        botanicalSource: 'Pterocarpus Santalinus',
        purpose: 'Gently polishes dead skin cells and leaves skin silky smooth.'
      },
      {
        name: 'Raw Goat Milk',
        botanicalSource: 'Caprae Lac',
        purpose: 'Natural lactic acid moisturizes and conditions dry ashen patches.'
      }
    ],
    benefits: [
      'Imparts a healthy full-body bridal radiance and golden glow',
      'Smooths rough elbows, dark knees, and textured skin',
      'Creamy, rich conditioning lather that does not dry skin out',
      'Infuses skin with an exquisite, lingering traditional aroma'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Apply to Wet Skin',
        description: 'Work up a creamy lather on wet skin.'
      },
      {
        step: 2,
        title: 'Massage Gently',
        description: 'Massage in circular motions for 1-2 minutes.'
      },
      {
        step: 3,
        title: 'Rinse with Water',
        description: 'Rinse thoroughly.'
      }
    ]
  },
  {
    id: 'zn-body-03',
    name: 'Z Naturals Acne & Pimple Clear Soap',
    slug: 'acne-pimple-clear-soap',
    tagline: 'Australian Tea Tree • Activated Bamboo Charcoal • Neem • Tulsi',
    category: 'Body',
    concerns: ['Acne & Blemishes'],
    price: 99,
    originalPrice: 130,
    volume: '125 gm',
    weightGrams: 135,
    rating: 4.8,
    reviewCount: 188,
    badge: 'Pure Botanical',
    image: './products/acne_pimple_soap.jpg',
    secondaryImage: './products/anti_acne_serum.jpg',
    shortDescription: 'Deep detoxifying bath soap featuring Activated Bamboo Charcoal and Tea Tree to draw out trapped sebum and control body breakouts.',
    fullDescription: 'Activated charcoal micro-particles pull deep impurities and excess sweat from body pores while tea tree and tulsi eliminate odor-causing bacteria.',
    targetType: 'For oily skin, active athletes, gym-goers, and body acne',
    botanicalHighlights: ['Activated Bamboo Charcoal', 'Tea Tree Essential Oil', 'Sacred Tulsi'],
    inStock: true,
    ingredients: [
      {
        name: 'Activated Bamboo Charcoal',
        botanicalSource: 'Bambusa Vulgaris',
        purpose: 'Acts as a magnet to pull out micro-toxins, sweat residue, and dirt from deep pores.'
      },
      {
        name: 'Tea Tree Essential Oil',
        botanicalSource: 'Melaleuca Alternifolia',
        purpose: 'Combats bacteria and neutralizes body odor.'
      }
    ],
    benefits: [
      'Deeply detoxifies pores and clears back, neck, and chest pimples',
      'Controls body odor and leaves skin feeling crisp and clean',
      'Non-drying vegetable oil formula keeps skin barrier intact'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Daily Bath',
        description: 'Use daily during bath or shower, focusing on acne-prone zones.'
      }
    ]
  },
  {
    id: 'zn-body-04',
    name: 'Z Naturals Kasturi Manjal Herbal Soap',
    slug: 'kasturi-manjal-herbal-soap',
    tagline: 'Wild Kasturi Turmeric • Khus Vetiver • Sweet Almond Oil',
    category: 'Body',
    concerns: ['Pigmentation', 'Daily Glow'],
    price: 99,
    originalPrice: 130,
    volume: '125 gm',
    weightGrams: 135,
    rating: 4.9,
    reviewCount: 245,
    badge: 'Customer Favorite',
    image: './products/kasturi_manjal_soap.jpg',
    secondaryImage: './products/kuppaimeni_soap.jpg',
    shortDescription: 'Traditional South Indian bridal bath soap infused with wild non-staining Kasturi Turmeric to brighten skin and reduce unwanted body fuzz.',
    fullDescription: 'Wild Kasturi Turmeric (Curcuma Aromatica) has been treasured by Chettinad women for generations. Tones facial and body skin, reverses dullness, and imparts a bright golden finish without yellow skin staining.',
    targetType: 'For all skin types, particularly for tan reduction and bridal prep',
    botanicalHighlights: ['Wild Kasturi Turmeric', 'Khus Vetiver Extract', 'Sweet Almond Butter'],
    inStock: true,
    ingredients: [
      {
        name: 'Wild Kasturi Turmeric',
        botanicalSource: 'Curcuma Aromatica',
        purpose: 'Natural aromatic turmeric that brightens complexion without yellow stains.'
      },
      {
        name: 'Khus Vetiver',
        botanicalSource: 'Chrysopogon Zizanioides',
        purpose: 'Cools the skin and tones enlarged pores.'
      }
    ],
    benefits: [
      'Gradually softens and reduces unwanted fine body fuzz with daily use',
      'Removes stubborn tan and restores clear, even skin tone',
      'Imparts a fragrant, royal South Indian herbal bath aroma'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Apply Daily',
        description: 'Lather over wet body during daily morning bath.'
      }
    ]
  },

  // ==========================================
  // [CATEGORY: MILK]
  // ==========================================
  {
    id: 'zn-milk-01',
    name: 'Z Naturals Goat Milk Moisturizing Soap',
    slug: 'goat-milk-moisturizing-soap',
    tagline: 'Farm-Fresh Raw Goat Milk • Raw Shea Butter • Extra Virgin Olive Oil',
    category: 'Milk',
    concerns: ['Dry Skin', 'Sensitive Skin', 'Daily Glow'],
    price: 130,
    originalPrice: 160,
    volume: '125 gm',
    weightGrams: 135,
    rating: 5.0,
    reviewCount: 380,
    badge: 'Bestseller',
    image: './products/goat_milk_soap.jpg',
    secondaryImage: './products/goat_milk_cream.jpg',
    shortDescription: 'Super-fatted creamy soap made with fresh raw goat milk and unrefined shea butter to deeply nourish dry, sensitive, or eczema-prone skin.',
    fullDescription: 'Fresh goat milk has the same pH as human skin and is loaded with lactic acid (AHA) and selenium. Gently exfoliates dead flakes while rich milk cream lipids penetrate deep to cure ashen winter dryness.',
    targetType: 'For dry, mature, peeling, or sensitive skin; safe for children',
    botanicalHighlights: ['Fresh Farm Goat Milk', 'Unrefined African Shea Butter', 'Virgin Olive Oil'],
    inStock: true,
    ingredients: [
      {
        name: 'Raw Farm Goat Milk',
        botanicalSource: 'Caprae Lac',
        purpose: 'Loaded with natural lactic acid (AHA) that gently breaks down dead skin cells.'
      },
      {
        name: 'Unrefined Shea Butter',
        botanicalSource: 'Vitellaria Paradoxa',
        purpose: 'Locks in deep lipid moisture to protect against environmental dehydration.'
      },
      {
        name: 'Extra Virgin Olive Oil',
        botanicalSource: 'Olea Europaea',
        purpose: 'Provides deep conditioning fatty acids for velvety touchable softness.'
      }
    ],
    benefits: [
      'Provides intense lipid replenishment for dry, flaky, or eczema-prone skin',
      'Gentle lactic acid exfoliation smooths rough chicken skin (KP) and bumps',
      'Maintains natural skin barrier with zero stripping or tight squeakiness',
      'Produces a dense, creamy whipped lotion-like lather'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Lather Generously',
        description: 'Lather over wet body and face.'
      },
      {
        step: 2,
        title: 'Allow to Soak',
        description: 'Allow rich milk fats to nourish skin for 60 seconds before rinsing.'
      }
    ]
  },
  {
    id: 'zn-milk-02',
    name: 'Z Naturals Goat Milk Active Face Cream',
    slug: 'goat-milk-active-face-cream',
    tagline: 'Goat Milk Peptides • Ceramide Complex • Kashmiri Saffron • Niacinamide',
    category: 'Milk',
    concerns: ['Dry Skin', 'Daily Glow', 'Sensitive Skin'],
    price: 680,
    originalPrice: 799,
    volume: '30 gm',
    weightGrams: 110,
    rating: 4.9,
    reviewCount: 220,
    badge: 'Bestseller',
    image: './products/goat_milk_cream.jpg',
    secondaryImage: './products/kumkumadi_face_serum.jpg',
    shortDescription: 'Rich barrier-repairing facial cream packed with Goat Milk proteins and Ceramides to heal damaged barriers and give plump, dewy elasticity.',
    fullDescription: 'A clinical-strength botanical formulation. Goat milk bio-peptides combine with Ceramides and saffron to repair moisture damage, combat signs of premature aging, and bestow an enduring dewy bounce.',
    targetType: 'For dehydrated, damaged barrier, normal-to-dry, and mature skin',
    botanicalHighlights: ['Goat Milk Bio-Peptides', 'Ceramide Complex', 'Kashmiri Saffron'],
    inStock: true,
    ingredients: [
      {
        name: 'Goat Milk Bio-Peptides',
        botanicalSource: 'Caprae Lac Peptide Extract',
        purpose: 'Boosts natural skin collagen synthesis and reinforces dermal elasticity.'
      },
      {
        name: 'Ceramide Complex (NP, AP, EOP)',
        botanicalSource: 'Plant-derived Lipids',
        purpose: 'Repairs broken skin barriers and prevents moisture evaporation.'
      },
      {
        name: 'Pure Saffron & Niacinamide',
        botanicalSource: 'Botanical Actives',
        purpose: 'Imparts an effortless luminous golden glow.'
      }
    ],
    benefits: [
      'Heals damaged, peeling, and sensitized skin barriers within 7 days',
      'Provides intense 24-hour nourishment without heavy grease or oiliness',
      'Restores youthful bounce and plumps up fine dehydration lines',
      'Acts as a velvety smoothing primer under daily foundation'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Warm Pea-Sized Dab',
        description: 'Take a pea-sized dab between clean fingertips.'
      },
      {
        step: 2,
        title: 'Apply in Upward Strokes',
        description: 'Massage into face and neck in upward lifting strokes morning and night.'
      }
    ]
  },
  {
    id: 'zn-milk-03',
    name: 'Z Naturals Goat Milk Water-Based Face Serum',
    slug: 'goat-milk-water-based-face-serum',
    tagline: 'Goat Milk Hydrosol • Triple Hyaluronic Acid • Fermented Rice Water',
    category: 'Milk',
    concerns: ['Dry Skin', 'Daily Glow'],
    price: 490,
    originalPrice: 599,
    volume: '20 ml',
    weightGrams: 80,
    rating: 4.8,
    reviewCount: 146,
    badge: 'New Launch',
    image: './products/goat_milk_serum.jpg',
    secondaryImage: './products/goat_milk_cream.jpg',
    shortDescription: 'Weightless water-jelly serum that floods deep skin cells with Goat Milk hydration and Hyaluronic acid for glass-skin translucency.',
    fullDescription: 'A modern lightweight formulation that absorbs instantly. Delivers intense cellular hydration, tightens pore walls, and leaves skin plump, bouncy, and radiant.',
    targetType: 'For dehydrated oily skin, combination skin, and glass-skin seekers',
    botanicalHighlights: ['Goat Milk Whey Filtrate', 'Triple Hyaluronic Acid', 'Fermented Rice Water'],
    inStock: true,
    ingredients: [
      {
        name: 'Goat Milk Whey Filtrate',
        botanicalSource: 'Caprae Lac Hydrosol',
        purpose: 'Provides deep weightless water hydration and gentle brightening.'
      },
      {
        name: 'Triple Molecular Hyaluronic Acid',
        botanicalSource: 'Bio-Fermented HA',
        purpose: 'Draws moisture 1000x its weight into all skin levels.'
      }
    ],
    benefits: [
      'Delivers an instant surge of water hydration with zero oily finish',
      'Creates a glass-skin dewy luminescence on bare skin',
      'Smooths micro-texture and refines visible skin pores'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Dispense 3 Drops',
        description: 'Apply 3 drops onto clean damp face and gently press in.'
      }
    ]
  },

  // ==========================================
  // [CATEGORY: COMBO]
  // ==========================================
  {
    id: 'zn-combo-01',
    name: 'Acne & Pimple Clear Routine Combo',
    slug: 'acne-pimple-clear-routine-combo',
    tagline: 'Acne Clear Soap (125g) + Anti-Acne Face Serum (20ml)',
    category: 'Combo',
    concerns: ['Acne & Blemishes', 'Sensitive Skin'],
    price: 548,
    originalPrice: 649,
    volume: 'Soap (125g) + Serum (20ml)',
    weightGrams: 220,
    rating: 4.9,
    reviewCount: 284,
    badge: 'Customer Favorite',
    image: './products/acne_clear_combo.jpg',
    secondaryImage: './products/anti_acne_serum.jpg',
    shortDescription: 'Complete 2-step anti-blemish regimen: Purifying deep cleanser unclogs pores, while potent botanical serum shrinks active pimples overnight.',
    fullDescription: 'The ultimate botanical solution for stubborn acne. Step 1: Acne Clear Soap pulls out bacteria and excess oils with activated charcoal. Step 2: Anti-Acne Serum targets inflammation with tea tree and willow bark salicylic acid.',
    targetType: 'For stubborn pimples, whiteheads, blackheads, and oily breakouts',
    botanicalHighlights: ['Tea Tree Oil', 'Activated Bamboo Charcoal', 'Neem Leaf', 'Willow Bark'],
    inStock: true,
    ingredients: [
      {
        name: 'Pure Australian Tea Tree',
        botanicalSource: 'Melaleuca Alternifolia',
        purpose: 'Neutralizes breakout bacteria rapidly.'
      },
      {
        name: 'White Willow Bark',
        botanicalSource: 'Salix Alba',
        purpose: 'Cleans deep inside pores.'
      }
    ],
    benefits: [
      'Complete 2-step daily routine for blemish-free clear skin',
      'Calms cystic pimples and redness in as little as 48 hours',
      'Clears blackheads and minimizes enlarged pore appearance',
      'Value bundle saves 15% compared to individual items'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Step 1: Cleanse',
        description: 'Wash face morning & night with Acne Clear Soap.'
      },
      {
        step: 2,
        title: 'Step 2: Treat',
        description: 'Apply 2-3 drops of Anti-Acne Serum over face.'
      }
    ]
  },
  {
    id: 'zn-combo-02',
    name: 'Bridal & Daily Skin Glow Combo',
    slug: 'bridal-daily-skin-glow-combo',
    tagline: 'Kumkumadi Soap (125g) + Kumkumadi Face Wash (50ml) + Kumkumadi Face Serum (20ml)',
    category: 'Combo',
    concerns: ['Daily Glow', 'Pigmentation'],
    price: 1017,
    originalPrice: 1250,
    volume: 'Full 3-Step Radiance Set',
    weightGrams: 320,
    rating: 5.0,
    reviewCount: 460,
    badge: 'Bestseller',
    image: './products/bridal_glow_combo.jpg',
    secondaryImage: './products/kumkumadi_face_serum.jpg',
    shortDescription: 'The royal 3-step Chettinad bridal radiance ritual. Cleanse, clarify, and deeply nourish with authentic Kashmiri Saffron and Sandalwood.',
    fullDescription: 'Our most sought-after radiance regimen. Step 1: Kumkumadi Soap polishes skin. Step 2: Kumkumadi Face Wash clears daily impurities. Step 3: Pure Kumkumadi Serum locks in royal golden luminosity and fades dark spots.',
    targetType: 'For brides, festival prep, and anyone desiring an lit-from-within golden glow',
    botanicalHighlights: ['Kashmiri Saffron', 'Red Sandalwood', '26 Royal Herbs', 'Almond Butter'],
    inStock: true,
    ingredients: [
      {
        name: 'Grade-A Kashmiri Saffron',
        botanicalSource: 'Crocus Sativus',
        purpose: 'Imparts intense natural luminosity and fades dark spots.'
      },
      {
        name: 'Red Sandalwood & Goat Milk',
        botanicalSource: 'Botanical Infusion',
        purpose: 'Smooths micro-texture and softens skin.'
      }
    ],
    benefits: [
      'Complete 3-step traditional Indian bridal radiance regimen',
      'Visibly fades sun tan, hyperpigmentation, and blemishes',
      'Imparts a luminous, camera-ready dewy bridal glow',
      'Best value bundle saving over 20% on bestselling lines'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Morning Wash',
        description: 'Cleanse with Kumkumadi Face Wash.'
      },
      {
        step: 2,
        title: 'Bath Soap',
        description: 'Use Kumkumadi Glow Soap for full-body bathing.'
      },
      {
        step: 3,
        title: 'Night Glow Elixir',
        description: 'Massage 3 drops of Kumkumadi Serum before bed.'
      }
    ]
  },
  {
    id: 'zn-combo-03',
    name: 'Karaikudi Sun Protection Combo',
    slug: 'karaikudi-sun-protection-combo',
    tagline: 'Detan Face Gel (50g) + SPF 50 Botanical Sunscreen (50ml)',
    category: 'Combo',
    concerns: ['Pigmentation', 'Daily Glow'],
    price: 809,
    originalPrice: 950,
    volume: 'Gel (50g) + Sunscreen (50ml)',
    weightGrams: 220,
    rating: 4.8,
    reviewCount: 192,
    badge: 'Customer Favorite',
    image: './products/sun_protection_combo.jpg',
    secondaryImage: './products/botanical_sunscreen.jpg',
    shortDescription: 'High-performance sun defense tailored for Tamil Nadu tropical heat. Shield against UV rays by day and cool sun tan by night.',
    fullDescription: 'Pairing our zero-white cast SPF 50 Mineral Sunscreen for daytime defense with our cooling cucumber & wild turmeric Detan Gel for post-sun repair.',
    targetType: 'For active outdoor commuters, sun-exposed skin, and tan prevention',
    botanicalHighlights: ['Zinc Oxide Mineral Filter', 'Cooling Cucumber', 'Kasturi Turmeric'],
    inStock: true,
    ingredients: [
      {
        name: 'Non-Nano Zinc Oxide & Raspberry Seed',
        botanicalSource: 'Mineral UV Shield',
        purpose: 'Broad spectrum PA++++ protection against UVA and UVB.'
      },
      {
        name: 'Cucumber & Kasturi Turmeric',
        botanicalSource: 'Botanical Gel Base',
        purpose: 'Reverses sun heat and prevents tanning pigmentation.'
      }
    ],
    benefits: [
      'Comprehensive AM/PM defense against intense sun damage and tanning',
      'Leaves skin matte, protected, and free from chalky residue',
      'Soothes flushed, overheated skin and sunburn immediately'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Morning Protection',
        description: 'Apply SPF 50 Sunscreen 15 minutes before stepping out.'
      },
      {
        step: 2,
        title: 'Evening Recovery',
        description: 'Apply Detan Face Gel after coming home to cool and repair.'
      }
    ]
  },
  {
    id: 'zn-combo-04',
    name: 'Hair Fall Rescue Combo',
    slug: 'hair-fall-rescue-combo',
    tagline: 'Advanced Herbs Hair Oil (100ml) + Shikakai Herbal Shampoo (100ml)',
    category: 'Combo',
    concerns: ['Hair Fall', 'Dandruff'],
    price: 798,
    originalPrice: 950,
    volume: 'Oil (100ml) + Shampoo (100ml)',
    weightGrams: 300,
    rating: 4.9,
    reviewCount: 384,
    badge: 'Bestseller',
    image: './products/hair_fall_combo.jpg',
    secondaryImage: './products/shikakai_shampoo.jpg',
    shortDescription: 'The time-tested South Indian hair fall therapy. Nourish roots with 18-herb oil and cleanse with mild sulfate-free Shikakai shampoo.',
    fullDescription: 'Two steps to stop shedding and stimulate new growth. Step 1: Deep oiling with 18 Chettinad herbs nourishes roots. Step 2: Shikakai cleanser removes dirt without breaking fragile strands.',
    targetType: 'For excessive hair fall, seasonal shedding, and thinning scalps',
    botanicalHighlights: ['18 Chettinad Herbs', 'Bringraj', 'Shikakai Pods', 'Red Hibiscus'],
    inStock: true,
    ingredients: [
      {
        name: 'Amla, Bringraj & Rosemary Infusion',
        botanicalSource: 'Herbal Oils',
        purpose: 'Strengthens root anchorage and stops breakage.'
      },
      {
        name: 'Shikakai & Hibiscus',
        botanicalSource: 'Natural Saponin',
        purpose: 'Cleanses without stripping natural oils.'
      }
    ],
    benefits: [
      'Reduces hair shedding by up to 70% within 3 weeks of routine use',
      'Fortifies thinning roots and stimulates new baby hair growth',
      'Cleanses scalp thoroughly without chemical sulfates or parabens'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Step 1: Oil',
        description: 'Massage warm hair oil onto scalp and leave for 1-2 hours.'
      },
      {
        step: 2,
        title: 'Step 2: Wash',
        description: 'Wash thoroughly with Shikakai Herbal Shampoo.'
      }
    ]
  },

  // ==========================================
  // [CATEGORY: GIFT SETS]
  // ==========================================
  {
    id: 'zn-gift-01',
    name: 'Z Naturals Chettinad Botanical Glow Gift Box',
    slug: 'chettinad-botanical-glow-gift-box',
    tagline: 'Kumkumadi Serum + Pure Rose Water + Kumkumadi Soap + Lip Lightening Balm',
    category: 'Gift Sets',
    concerns: ['Daily Glow', 'Pigmentation'],
    price: 928,
    originalPrice: 1150,
    volume: '4-Piece Luxury Hamper Box',
    weightGrams: 550,
    rating: 5.0,
    reviewCount: 290,
    badge: 'Bestseller',
    image: './products/chettinad_gift_box.jpg',
    secondaryImage: './products/bridal_glow_combo.jpg',
    shortDescription: 'Exquisite luxury gift hamper box in Deep Forest Green with Champagne Gold foil seal. The complete 4-step royal radiance ritual.',
    fullDescription: 'Housed in an opulent rigid green-and-gold keepsake box with satin ribbon. Contains Kumkumadi Face Serum (20ml), Pure Rose Water Mist (100ml), Kumkumadi Glow Soap (125g), and Lip Lightening Serum Balm (10g). The perfect celebratory gift.',
    targetType: 'A stunning gift for weddings, festive celebrations, and self-care indulgence',
    botanicalHighlights: ['Kashmiri Saffron', 'Kannauj Damask Rose', 'Red Sandalwood', 'Wild Beetroot'],
    inStock: true,
    ingredients: [
      {
        name: 'Kashmiri Saffron & Sandalwood',
        botanicalSource: 'Royal Elixir',
        purpose: 'Fades pigmentation and imparts full-body bridal glow.'
      },
      {
        name: 'Steam-Distilled Rose Petals',
        botanicalSource: 'Pure Hydrosol',
        purpose: 'Refreshes and tones pores.'
      }
    ],
    benefits: [
      'Complete 4-piece head-to-toe luxury skin radiance regimen',
      'Packed in a bespoke Deep Forest Green & Gold foil luxury rigid gift box',
      'Ideal for wedding hampers, Diwali, Pongal, and anniversary gifting',
      'Handcrafted natural formulations free from all synthetic chemicals'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Daily Luxury Ritual',
        description: 'Bathe with Kumkumadi Soap, tone with Pure Rose Water mist, nourish face with Kumkumadi Serum, and soften lips with Lip Lightening Balm.'
      }
    ]
  },
  {
    id: 'zn-gift-02',
    name: 'Z Naturals Complete Hair & Skin Ritual Gift Set',
    slug: 'complete-hair-skin-ritual-gift-set',
    tagline: 'Advanced Herbs Hair Oil + Shikakai Shampoo + Kasturi Manjal Soap + Detan Face Gel',
    category: 'Gift Sets',
    concerns: ['Hair Fall', 'Daily Glow', 'Pigmentation'],
    price: 1296,
    originalPrice: 1550,
    volume: '4-Piece Head-to-Toe Hamper',
    weightGrams: 650,
    rating: 5.0,
    reviewCount: 312,
    badge: 'Bestseller',
    image: './products/complete_ritual_gift_set.jpg',
    secondaryImage: './products/chettinad_gift_box.jpg',
    shortDescription: 'The grand Chettinad self-care hamper. Comprehensive head-to-toe ritual combining our finest herbal hair therapies and skin-brightening formulations.',
    fullDescription: 'Packed in a premium rigid emerald green hamper box. Includes Advanced Herbs Hair Oil (100ml), Shikakai Herbal Shampoo (100ml), Kasturi Manjal Soap (125g), and Detan Face Gel (50g). Restores hair density and brings radiant warmth to the skin.',
    targetType: 'The definitive luxury head-to-toe organic grooming gift set',
    botanicalHighlights: ['18 Chettinad Botanicals', 'Shikakai Pods', 'Kasturi Turmeric', 'Cooling Cucumber'],
    inStock: true,
    ingredients: [
      {
        name: '18 Chettinad Herbs & Shikakai',
        botanicalSource: 'Traditional Hair Care',
        purpose: 'Stops hair fall and gently cleanses scalp.'
      },
      {
        name: 'Wild Kasturi Turmeric & Cucumber',
        botanicalSource: 'Pure Skin Care',
        purpose: 'Clears tan and imparts full-body glow.'
      }
    ],
    benefits: [
      'Complete head-to-toe grooming ritual in a luxury gift box',
      'Replaces synthetic chemical cosmetics with authentic botanical remedies',
      'Exceptional gift presentation designed to delight the recipient',
      'Save over 25% compared to purchasing items individually'
    ],
    howToUse: [
      {
        step: 1,
        title: 'Weekend Spa Ritual',
        description: 'Oil hair with Advanced Herbs Oil, bathe with Kasturi Manjal Soap, cleanse hair with Shikakai Shampoo, and soothe skin with Detan Face Gel.'
      }
    ]
  }
];
