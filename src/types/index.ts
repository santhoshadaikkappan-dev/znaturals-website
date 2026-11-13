export type ProductCategory = 'Skincare' | 'Haircare' | 'Body Care';

export type SkinOrHairConcern = 
  | 'Acne & Blemishes'
  | 'Hair Fall'
  | 'Pigmentation'
  | 'Dry Skin'
  | 'Daily Glow'
  | 'Dandruff'
  | 'Sensitive Skin';

export interface ProductIngredient {
  name: string;
  botanicalSource: string;
  purpose: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: ProductCategory;
  concerns: SkinOrHairConcern[];
  price: number;
  originalPrice: number;
  volume: string;
  rating: number;
  reviewCount: number;
  badge?: 'Bestseller' | 'New Launch' | 'Pure Botanical' | 'Customer Favorite';
  image: string;
  secondaryImage?: string;
  shortDescription: string;
  fullDescription: string;
  targetType: string; // e.g. "All skin types, especially dull & uneven texture"
  ingredients: ProductIngredient[];
  benefits: string[];
  howToUse: {
    step: number;
    title: string;
    description: string;
  }[];
  botanicalHighlights: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Out for Delivery' | 'Delivered' | 'Returned';

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  landmark?: string;
  pincode: string;
  deliverySlot: 'Daily: 8:00 AM – 12:00 PM' | 'Daily: 12:00 PM – 4:00 PM';
  notes?: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    volume: string;
  }[];
  subtotal: number;
  shipping: number; // 0 for Karaikudi Free COD
  total: number;
  status: OrderStatus;
  paymentMethod: 'Karaikudi Exclusive Free COD';
}

export interface WaitlistEntry {
  id: string;
  phone: string;
  pincode: string;
  city?: string;
  createdAt: string;
}
