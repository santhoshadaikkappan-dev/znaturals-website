/**
 * Z NATURALS - Store & Business Configuration
 * Centralized configuration for Brand Assets, Delivery Rules, and Karaikudi Stalls.
 */

// Placeholder Logo config: Set this string to a path (e.g. '/assets/logo-final.svg')
// when final designer assets arrive. If null or empty, BrandLogo will render
// the high-end inline SVG/CSS botanical monogram.
export const LOGO_ASSET_PATH: string | null = null;

// Official Brand Info
export const BRAND_CONFIG = {
  name: "Z NATURALS",
  subtitle: "BOTANICAL BEAUTY & PERSONAL CARE",
  tagline: "Nature's Goodness. Your Kind of Beauty.",
  heroHeadline: "Radiant Beauty, Naturally.",
  heroSubheadline: "Botanical Skincare for Timeless Elegance. Pure. Natural. Effective.",
  contact: {
    phone: "+91 94433 82190",
    whatsapp: "+91 94433 82190",
    email: "care@znaturals.in",
    karaikudiLocation: "Near New Bus Stand, Karaikudi, Tamil Nadu 630001",
  },
  delivery: {
    policyTitle: "Exclusive Free Cash on Delivery (COD) in Karaikudi",
    dailyWindow: "Daily Delivery: 8:00 AM – 4:00 PM",
    slots: [
      "Daily: 8:00 AM – 12:00 PM (Morning Slot)",
      "Daily: 12:00 PM – 4:00 PM (Afternoon Slot)",
    ],
  },
  weekendLiveStall: {
    title: "Visit Our Weekend Live Experience Stall",
    location: "Kallukatti Gandhi Square, Karaikudi",
    days: "Every Friday, Saturday & Sunday",
    timings: "5:30 PM – 9:30 PM",
    perks: [
      "Free Live Botanical Skin Consultation",
      "Live Texture & Aroma Experience Bar",
      "Free Mini Ubtan Powder with Every Weekend Order",
      "Instant On-Spot Purchase & Gifting Packs"
    ]
  }
};

/**
 * Valid Karaikudi Pincodes eligible for FREE Cash on Delivery (COD)
 * Daily 8:00 AM - 4:00 PM doorstep delivery.
 */
export const KARAIKUDI_PINCODES: string[] = [
  "630001", // Karaikudi Head Post Office / Sekkalai
  "630002", // Karaikudi West / Alagappa Nagar
  "630003", // Alagappapuram / College Campus
  "630004", // Senjai
  "630005", // Karaikudi Railway Station Area
  "630006", // Subramaniapuram
  "630102", // Kandanur
  "630106", // Puduvayal
  "630204", // Pallathur / Chettinad belt
];

/**
 * Check if a 6-digit pincode belongs to Karaikudi's free COD zone
 */
export const isKaraikudiPincode = (pincode: string | undefined | null): boolean => {
  if (!pincode) return false;
  const cleaned = pincode.trim().replace(/\s+/g, '');
  return KARAIKUDI_PINCODES.includes(cleaned);
};
