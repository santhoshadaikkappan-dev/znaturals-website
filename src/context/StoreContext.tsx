import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  CustomerProfile, 
  CustomerAddress, 
  PaymentMethod 
} from '../types';
import { calculateDelivery, DeliveryCalculation } from '../utils/delivery';
import { isKaraikudiPincode } from '../config/storeConfig';
import { supabase } from '../config/supabase';
import { syncOrderToGoogleSheet } from '../utils/googleSheetsSync';
import confetti from 'canvas-confetti';

interface StoreContextType {
  // Cart
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  cartTotalWeight: number;
  cartTotalWeightFormatted: string;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Selected Product for PDP Modal
  activeProductModal: Product | null;
  setActiveProductModal: (product: Product | null) => void;

  // Delivery & Location Zone Logic
  customerPincode: string;
  setCustomerPincode: (pin: string) => void;
  customerCity: string;
  setCustomerCity: (city: string) => void;
  customerState: string;
  setCustomerState: (state: string) => void;
  deliveryInfo: DeliveryCalculation;
  verifyPincode: (pin: string) => DeliveryCalculation;

  // Customer Authentication (Mobile OTP)
  customerProfile: CustomerProfile;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  loginCustomer: (phone: string, name: string) => void;
  logoutCustomer: () => void;
  updateCustomerProfile: (profile: Partial<CustomerProfile>) => void;
  addSavedAddress: (addr: Omit<CustomerAddress, 'id'>) => void;

  // AI Consultant Modal
  isAiAdvisorOpen: boolean;
  setIsAiAdvisorOpen: (open: boolean) => void;

  // Checkout Modal
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Admin / Store Manager Portal
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  // Orders Placed by Customer
  customerOrders: Order[];
  placeCustomerOrder: (orderPayload: {
    customerName: string;
    phone: string;
    alternatePhone?: string;
    address: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    deliverySlot?: string;
    notes?: string;
    paymentMethod: PaymentMethod;
    upiUtr?: string;
  }) => Order;

  // Toast Notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

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
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    return window.location.hash === '#admin' || window.location.search.includes('admin');
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Location & Pincode state
  const [customerPincode, setCustomerPincode] = useState<string>(() => {
    try {
      return localStorage.getItem('zn_customer_pincode') || '630001';
    } catch {
      return '630001';
    }
  });

  const [customerCity, setCustomerCity] = useState<string>('Karaikudi');
  const [customerState, setCustomerState] = useState<string>('Tamil Nadu');

  // Customer Profile State (Mobile Login)
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile>(() => {
    try {
      const saved = localStorage.getItem('zn_customer_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      name: '',
      phone: '',
      isLoggedIn: false,
      addresses: [
        {
          id: 'addr-default',
          street: '14, Subramaniapuram 2nd Street',
          landmark: 'Near Alagappa Matriculation School',
          city: 'Karaikudi',
          state: 'Tamil Nadu',
          pincode: '630006',
          isDefault: true
        }
      ]
    };
  });

  // Customer Orders List (Saved in unified localStorage shared store)
  const [customerOrders, setCustomerOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('zn_shared_orders');
      return saved ? JSON.parse(saved) : [];
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

  // Persist customer profile
  useEffect(() => {
    try {
      localStorage.setItem('zn_customer_profile', JSON.stringify(customerProfile));
    } catch (e) {
      console.error(e);
    }
  }, [customerProfile]);

  // Persist customer orders
  useEffect(() => {
    try {
      localStorage.setItem('zn_shared_orders', JSON.stringify(customerOrders));
    } catch (e) {
      console.error(e);
    }
  }, [customerOrders]);

  // Persist pincode
  useEffect(() => {
    try {
      localStorage.setItem('zn_customer_pincode', customerPincode);
    } catch (e) {
      console.error(e);
    }
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

  // Total weight in grams (used for dynamic courier slab calculation)
  const cartTotalWeight = cart.reduce(
    (total, item) => total + (item.product.weightGrams || 200) * item.quantity,
    0
  );

  const cartTotalWeightFormatted = cartTotalWeight >= 1000 
    ? `${(cartTotalWeight / 1000).toFixed(2)} kg` 
    : `${cartTotalWeight} g`;

  // Dynamic delivery calculation based on active Pincode, Cart Weight, and Subtotal
  const deliveryInfo = calculateDelivery(customerPincode, cartTotalWeight, cartTotal);

  const verifyPincode = (pin: string) => {
    const cleaned = pin.trim().replace(/\D/g, '').slice(0, 6);
    setCustomerPincode(cleaned);
    return calculateDelivery(cleaned, cartTotalWeight, cartTotal);
  };

  // Sync Supabase Auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const u = session.user;
        const name = u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'Valued Customer';
        setCustomerProfile((prev) => ({
          ...prev,
          id: u.id,
          name: name,
          email: u.email || '',
          phone: prev.phone || u.phone || '',
          isLoggedIn: true
        }));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const u = session.user;
        const name = u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'Valued Customer';
        setCustomerProfile((prev) => ({
          ...prev,
          id: u.id,
          name: name,
          email: u.email || '',
          phone: prev.phone || u.phone || '',
          isLoggedIn: true
        }));
      } else {
        setCustomerProfile((prev) => ({
          ...prev,
          id: undefined,
          email: undefined,
          isLoggedIn: false
        }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Customer Auth Functions
  const loginCustomer = (phone: string, name: string) => {
    setCustomerProfile((prev) => ({
      ...prev,
      phone,
      name: name || prev.name || 'Valued Customer',
      isLoggedIn: true
    }));
  };

  const logoutCustomer = () => {
    setCustomerProfile((prev) => ({
      ...prev,
      id: undefined,
      email: undefined,
      isLoggedIn: false
    }));
    showToast("You have been signed out.");
  };

  const updateCustomerProfile = (updates: Partial<CustomerProfile>) => {
    setCustomerProfile((prev) => ({ ...prev, ...updates }));
  };

  const addSavedAddress = (addr: Omit<CustomerAddress, 'id'>) => {
    const newAddr: CustomerAddress = {
      ...addr,
      id: `addr-${Date.now()}`
    };
    setCustomerProfile((prev) => ({
      ...prev,
      addresses: [newAddr, ...prev.addresses]
    }));
    setCustomerPincode(addr.pincode);
  };

  // Customer Order Placement
  const placeCustomerOrder = (payload: {
    customerName: string;
    phone: string;
    alternatePhone?: string;
    address: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    deliverySlot?: string;
    notes?: string;
    paymentMethod: PaymentMethod;
    upiUtr?: string;
  }): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const isKaraikudi = isKaraikudiPincode(payload.pincode);
    const orderZone = isKaraikudi ? 'Zone A (Karaikudi Local)' : 'Zone B (Rest of India Courier)';
    const shipping = deliveryInfo.shippingFee;
    const finalTotal = cartTotal + shipping;

    const isOnlinePayment = 
      payload.paymentMethod === 'Razorpay Online (UPI / GPay / PhonePe / Cards)' ||
      payload.paymentMethod === 'Pay Online Now via Instant UPI (Zero Fee)';

    const newOrder: Order = {
      id: `ZN-${isKaraikudi ? 'KRI' : 'IND'}-${randomNum}`,
      createdAt: new Date().toISOString(),
      userId: customerProfile.id,
      customerName: payload.customerName,
      phone: payload.phone,
      alternatePhone: payload.alternatePhone,
      address: payload.address,
      landmark: payload.landmark,
      city: payload.city || customerCity,
      state: payload.state || customerState,
      pincode: payload.pincode,
      zone: orderZone,
      deliverySlot: payload.deliverySlot || (isKaraikudi ? 'Daily: 8:00 AM – 12:00 PM' : '2-4 Business Days Courier'),
      courierCarrier: deliveryInfo.courierCarrier,
      notes: payload.notes,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        volume: item.product.volume,
        weightGrams: item.product.weightGrams
      })),
      totalWeightGrams: cartTotalWeight,
      subtotal: cartTotal,
      shippingFee: shipping,
      total: finalTotal,
      status: isOnlinePayment ? 'Confirmed' : 'Pending',
      paymentMethod: payload.paymentMethod,
      paymentStatus: isOnlinePayment ? 'Paid (Online)' : 'Pending (COD)',
      upiUtr: payload.upiUtr
    };

    // Update customer orders locally
    setCustomerOrders((prev) => [newOrder, ...prev]);

    // Asynchronously sync order to Google Sheets
    syncOrderToGoogleSheet(newOrder);

    // Also sync to global desktop store in localStorage
    try {
      const existingAllOrders = JSON.parse(localStorage.getItem('zn_shared_orders') || '[]');
      localStorage.setItem('zn_shared_orders', JSON.stringify([newOrder, ...existingAllOrders]));
    } catch (e) {
      console.error(e);
    }

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

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        cartTotalWeight,
        cartTotalWeightFormatted,
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
        customerCity,
        setCustomerCity,
        customerState,
        setCustomerState,
        deliveryInfo,
        verifyPincode,
        customerProfile,
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginCustomer,
        logoutCustomer,
        updateCustomerProfile,
        addSavedAddress,
        isAiAdvisorOpen,
        setIsAiAdvisorOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAdminOpen,
        setIsAdminOpen,
        customerOrders,
        placeCustomerOrder,
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
