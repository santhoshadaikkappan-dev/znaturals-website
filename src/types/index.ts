export type ProductCategory = 
  | 'Hair' 
  | 'Face' 
  | 'Body' 
  | 'Milk' 
  | 'Combo' 
  | 'Gift Sets' 
  | 'Bestsellers';

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
  weightGrams: number; // e.g. 120g, 380g for dynamic courier calculation
  rating: number;
  reviewCount: number;
  badge?: 'Bestseller' | 'New Launch' | 'Pure Botanical' | 'Customer Favorite';
  isBestseller?: boolean;
  image: string;
  secondaryImage?: string;
  shortDescription: string;
  fullDescription: string;
  targetType: string;
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

export type DeliveryZone = 'Zone A (Karaikudi Local)' | 'Zone B (Rest of India Courier)';

export type PaymentMethod = 
  | 'Razorpay Online (UPI / GPay / PhonePe / Cards)'
  | 'Free Cash / UPI at Delivery (Karaikudi Exclusive)'
  | 'Pay Online Now via Instant UPI (Zero Fee)'
  | 'Cash on Delivery (COD)' 
  | 'Google Pay' 
  | 'PhonePe' 
  | 'Paytm' 
  | 'Supermoney'
  | 'BHIM / Any UPI App'
  | 'Cards & Net Banking';

export type OrderStatus = 'Pending' | 'Out for Delivery' | 'Delivered' | 'Returned';

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  volume: string;
  weightGrams: number;
}

export interface Order {
  id: string;
  createdAt: string;
  userId?: string;
  customerName: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  zone: DeliveryZone;
  deliverySlot?: string;
  courierCarrier?: string;
  notes?: string;
  items: OrderItem[];
  totalWeightGrams: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending (COD)' | 'Paid (Online)';
  assignedRider?: string;
  upiUtr?: string;
}

export interface CustomerAddress {
  id: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface CustomerProfile {
  id?: string;
  name: string;
  email?: string;
  phone: string;
  isLoggedIn: boolean;
  addresses: CustomerAddress[];
}
