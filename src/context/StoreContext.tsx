import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, OrderStatus, WaitlistEntry } from '../types';
import { isKaraikudiPincode } from '../config/storeConfig';
import confetti from 'canvas-confetti';

interface StoreContextType {
  // Cart
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Selected Product for PDP Modal
  activeProductModal: Product | null;
  setActiveProductModal: (product: Product | null) => void;

  // Karaikudi Pincode Verification
  customerPincode: string;
  setCustomerPincode: (pin: string) => void;
  isPincodeEligible: boolean;
  pincodeVerified: boolean;
  verifyPincode: (pin: string) => { eligible: boolean; message: string };

  // AI Consultant Modal / Drawer
  isAiAdvisorOpen: boolean;
  setIsAiAdvisorOpen: (open: boolean) => void;

  // Checkout Modal
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Order Management (Admin & User)
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'shipping' | 'paymentMethod'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  
  // Non-Karaikudi Waitlist
  waitlist: WaitlistEntry[];
  addToWaitlist: (phone: string, pincode: string, city?: string) => void;

  // View state: 'store' | 'admin'
  currentView: 'store' | 'admin';
  setCurrentView: (view: 'store' | 'admin') => void;

  // Toast Notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Sample Initial Orders in Karaikudi to showcase delivery workflow
const INITIAL_SAMPLE_ORDERS: Order[] = [
  {
    id: 'ZN-KRI-1082',
    createdAt: '2026-11-13T09:15:00.000Z',
    customerName: 'Meenakshi Sundaram',
    phone: '98421 78430',
    alternatePhone: '94432 11098',
    address: 'Plot 42, 3rd Street, Subramaniapuram',
    landmark: 'Behind Alagappa Matric School',
    pincode: '630006',
    deliverySlot: 'Daily: 8:00 AM – 12:00 PM',
    items: [
      {
        productId: 'zn-001',
        productName: 'Botanical Glow Face Serum',
        price: 649,
        quantity: 1,
        volume: '30 ml'
      },
      {
        productId: 'zn-003',
        productName: 'Nourishing Face Cream with Saffron & Shea',
        price: 549,
        quantity: 1,
        volume: '50 g'
      }
    ],
    subtotal: 1198,
    shipping: 0,
    total: 1198,
    status: 'Delivered',
    paymentMethod: 'Karaikudi Exclusive Free COD'
  },
  {
    id: 'ZN-KRI-1083',
    createdAt: '2026-11-13T10:45:00.000Z',
    customerName: 'Anitha Chidambaram',
    phone: '94426 55891',
    address: 'No. 18, College Road, Sekkalai',
    landmark: 'Opposite Chettinad Silks',
    pincode: '630001',
    deliverySlot: 'Daily: 12:00 PM – 4:00 PM',
    items: [
      {
        productId: 'zn-005',
        productName: 'Herbal Hair Oil with 18 Chettinad Botanicals',
        price: 399,
        quantity: 2,
        volume: '200 ml'
      },
      {
        productId: 'zn-002',
        productName: 'Herbal Shampoo with Bhringraj & Shikakai',
        price: 499,
        quantity: 1,
        volume: '300 ml'
      }
    ],
    subtotal: 1297,
    shipping: 0,
    total: 1297,
    status: 'Out for Delivery',
    paymentMethod: 'Karaikudi Exclusive Free COD'
  },
  {
    id: 'ZN-KRI-1084',
    createdAt: '2026-11-13T11:30:00.000Z',
    customerName: 'Kavitha Ramasamy',
    phone: '97871 23490',
    address: 'B-7, Staff Quarters, Alagappa University Campus',
    landmark: 'Near Central Library',
    pincode: '630003',
    deliverySlot: 'Daily: 12:00 PM – 4:00 PM',
    items: [
      {
        productId: 'zn-006',
        productName: 'Radiant Ubtan Bath Powder (Traditional Nalangu Maavu)',
        price: 349,
        quantity: 2,
        volume: '200 g'
      }
    ],
    subtotal: 698,
    shipping: 0,
    total: 698,
    status: 'Pending',
    paymentMethod: 'Karaikudi Exclusive Free COD'
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zn_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pincode state
  const [customerPincode, setCustomerPincode] = useState<string>(() => {
    try {
      return localStorage.getItem('zn_customer_pincode') || '630001'; // Default to Karaikudi HPO for friendly initial demo
    } catch {
      return '630001';
    }
  });

  const [pincodeVerified, setPincodeVerified] = useState<boolean>(true);
  const [isPincodeEligible, setIsPincodeEligible] = useState<boolean>(true);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('zn_orders');
      return saved ? JSON.parse(saved) : INITIAL_SAMPLE_ORDERS;
    } catch {
      return INITIAL_SAMPLE_ORDERS;
    }
  });

  // Waitlist state
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(() => {
    try {
      const saved = localStorage.getItem('zn_waitlist');
      return saved ? JSON.parse(saved) : [
        { id: 'w-1', phone: '98401 23456', pincode: '600028', city: 'Chennai (R.A. Puram)', createdAt: '2026-11-12T10:00:00Z' },
        { id: 'w-2', phone: '97908 98765', pincode: '625001', city: 'Madurai Central', createdAt: '2026-11-12T14:30:00Z' }
      ];
    } catch {
      return [];
    }
  });

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('zn_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem('zn_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Persist waitlist
  useEffect(() => {
    try {
      localStorage.setItem('zn_waitlist', JSON.stringify(waitlist));
    } catch (e) {
      console.error(e);
    }
  }, [waitlist]);

  // Persist pincode & recheck
  useEffect(() => {
    try {
      localStorage.setItem('zn_customer_pincode', customerPincode);
    } catch (e) {
      console.error(e);
    }
    const eligible = isKaraikudiPincode(customerPincode);
    setIsPincodeEligible(eligible);
  }, [customerPincode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const verifyPincode = (pin: string) => {
    const cleaned = pin.trim().replace(/\s+/g, '');
    const valid = isKaraikudiPincode(cleaned);
    setCustomerPincode(cleaned);
    setPincodeVerified(true);
    setIsPincodeEligible(valid);

    if (valid) {
      return {
        eligible: true,
        message: 'Eligible for FREE Karaikudi Cash on Delivery (Delivered Daily between 8:00 AM – 4:00 PM)'
      };
    } else {
      return {
        eligible: false,
        message: 'We currently offer Free COD exclusively within Karaikudi. Pan-India shipping and Chennai stalls are launching soon!'
      };
    }
  };

  const createOrder = (
    orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'shipping' | 'paymentMethod'>
  ): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ZN-KRI-${randomNum}`,
      createdAt: new Date().toISOString(),
      shipping: 0,
      status: 'Pending',
      paymentMethod: 'Karaikudi Exclusive Free COD'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#263D32', '#66765C', '#C5A16B', '#F5F0E6']
      });
    } catch (e) {
      console.log(e);
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    showToast(`Order ${orderId} updated to ${status}`);
  };

  const addToWaitlist = (phone: string, pincode: string, city?: string) => {
    const entry: WaitlistEntry = {
      id: `w-${Date.now()}`,
      phone,
      pincode,
      city: city || 'Other Area in India',
      createdAt: new Date().toISOString()
    };
    setWaitlist((prev) => [entry, ...prev]);
    showToast("Thank you! You'll be notified on WhatsApp when we launch in your area.");
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        activeProductModal,
        setActiveProductModal,
        customerPincode,
        setCustomerPincode,
        isPincodeEligible,
        pincodeVerified,
        verifyPincode,
        isAiAdvisorOpen,
        setIsAiAdvisorOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        createOrder,
        updateOrderStatus,
        waitlist,
        addToWaitlist,
        currentView,
        setCurrentView,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
