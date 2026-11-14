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
import { 
  supabase, 
  isSupabaseConfigured, 
  signInWithGoogle, 
  sendEmailOtp, 
  verifyEmailOtp, 
  signOutSupabase, 
  insertSupabaseOrder 
} from '../config/supabase';
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

  // Customer Authentication (Supabase Google & Email OTP)
  customerProfile: CustomerProfile;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  loginCustomer: (phoneOrEmail: string, name: string) => void;
  loginWithGoogle: () => Promise<void>;
  sendEmailLoginOtp: (email: string) => Promise<{ success: boolean; message: string; mockOtp?: string }>;
  verifyEmailLoginOtp: (email: string, token: string) => Promise<{ success: boolean; message: string }>;
  logoutCustomer: () => void;
  updateCustomerProfile: (profile: Partial<CustomerProfile>) => void;
  addSavedAddress: (addr: Omit<CustomerAddress, 'id'>) => void;

  // AI Consultant Modal
  isAiAdvisorOpen: boolean;
  setIsAiAdvisorOpen: (open: boolean) => void;

  // Checkout Modal
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Orders Placed by Customer
  customerOrders: Order[];
  placeCustomerOrder: (orderPayload: {
    customerName: string;
    phone: string;
    alternatePhone?: string;
    customerEmail?: string;
    address: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    deliverySlot?: string;
    notes?: string;
    paymentMethod: PaymentMethod;
    upiTransactionId?: string;
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

  // Customer Auth Functions
  useEffect(() => {
    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setCustomerProfile((prev) => ({
            ...prev,
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || prev.name || 'Valued Customer',
            isLoggedIn: true
          }));
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setCustomerProfile((prev) => ({
            ...prev,
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || prev.name || 'Valued Customer',
            isLoggedIn: true
          }));
        } else if (_event === 'SIGNED_OUT') {
          setCustomerProfile((prev) => ({
            ...prev,
            isLoggedIn: false
          }));
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const loginCustomer = (phoneOrEmail: string, name: string) => {
    setCustomerProfile((prev) => ({
      ...prev,
      phone: phoneOrEmail.includes('@') ? prev.phone : phoneOrEmail,
      email: phoneOrEmail.includes('@') ? phoneOrEmail : prev.email,
      name: name || prev.name || 'Valued Customer',
      isLoggedIn: true
    }));
  };

  const loginWithGoogle = async () => {
    const { error } = await signInWithGoogle();
    if (error && error.message === 'SUPABASE_NOT_CONFIGURED') {
      setCustomerProfile((prev) => ({
        ...prev,
        name: 'Botanical Patron',
        email: 'patron@znaturals.in',
        isLoggedIn: true
      }));
      showToast("Signed in as Demo Botanical Patron (Supabase simulation)");
    } else if (error) {
      showToast(error.message || "Failed to sign in with Google");
    }
  };

  const sendEmailLoginOtp = async (email: string) => {
    const { error } = await sendEmailOtp(email);
    if (error && error.message === 'SUPABASE_NOT_CONFIGURED') {
      const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
      return { success: true, message: `Demo Code: ${mockCode}`, mockOtp: mockCode };
    } else if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: "6-digit OTP code sent to your email!" };
  };

  const verifyEmailLoginOtp = async (email: string, token: string) => {
    const { data, error } = await verifyEmailOtp(email, token);
    if (error && error.message === 'SUPABASE_NOT_CONFIGURED') {
      setCustomerProfile((prev) => ({
        ...prev,
        email,
        name: email.split('@')[0],
        isLoggedIn: true
      }));
      return { success: true, message: "Verified successfully!" };
    } else if (error) {
      return { success: false, message: error.message };
    }

    const authUser = data && 'user' in data ? data.user : null;
    if (authUser) {
      setCustomerProfile((prev) => ({
        ...prev,
        id: authUser.id,
        email: authUser.email || email,
        name: authUser.user_metadata?.full_name || email.split('@')[0],
        isLoggedIn: true
      }));
    }
    return { success: true, message: "Logged in successfully!" };
  };

  const logoutCustomer = async () => {
    try {
      await signOutSupabase();
    } catch (e) {
      console.warn("Supabase signout:", e);
    }
    setCustomerProfile((prev) => ({
      ...prev,
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
    customerEmail?: string;
    address: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    deliverySlot?: string;
    notes?: string;
    paymentMethod: PaymentMethod;
    upiTransactionId?: string;
  }): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const isKaraikudi = isKaraikudiPincode(payload.pincode);
    const orderZone = isKaraikudi ? 'Zone A (Karaikudi Local)' : 'Zone B (Rest of India Courier)';
    const shipping = deliveryInfo.shippingFee;
    const finalTotal = cartTotal + shipping;

    const isOnlinePayment = payload.paymentMethod !== 'Cash on Delivery (COD)';

    const newOrder: Order = {
      id: `ZN-${isKaraikudi ? 'KRI' : 'IND'}-${randomNum}`,
      createdAt: new Date().toISOString(),
      customerName: payload.customerName,
      phone: payload.phone,
      alternatePhone: payload.alternatePhone,
      customerEmail: payload.customerEmail || customerProfile.email,
      isGuest: !customerProfile.isLoggedIn,
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
      status: 'Pending',
      paymentMethod: payload.paymentMethod,
      paymentStatus: isOnlinePayment ? 'Paid (Online)' : 'Pending (COD)',
      upiTransactionId: payload.upiTransactionId
    };

    // Update customer orders locally
    setCustomerOrders((prev) => [newOrder, ...prev]);

    // Also sync to global desktop store in localStorage
    try {
      const existingAllOrders = JSON.parse(localStorage.getItem('zn_shared_orders') || '[]');
      localStorage.setItem('zn_shared_orders', JSON.stringify([newOrder, ...existingAllOrders]));
    } catch (e) {
      console.error(e);
    }

    // Background sync to Supabase database with strict RLS
    insertSupabaseOrder({
      id: newOrder.id,
      user_id: customerProfile.id || null,
      customer_name: newOrder.customerName,
      customer_phone: newOrder.phone,
      customer_email: newOrder.customerEmail || null,
      is_guest: Boolean(newOrder.isGuest),
      pincode: newOrder.pincode,
      city: newOrder.city,
      state: newOrder.state,
      address: newOrder.address,
      landmark: newOrder.landmark || null,
      delivery_slot: newOrder.deliverySlot || null,
      payment_method: newOrder.paymentMethod,
      upi_transaction_id: newOrder.upiTransactionId || null,
      payment_status: newOrder.paymentStatus,
      order_status: 'pending',
      subtotal: newOrder.subtotal,
      shipping_fee: newOrder.shippingFee,
      grand_total: newOrder.total,
      total_weight_grams: newOrder.totalWeightGrams,
      notes: newOrder.notes || null,
    }, newOrder.items.map(item => ({
      product_id: item.productId,
      product_name: item.productName,
      product_volume: item.volume,
      quantity: item.quantity,
      price: item.price,
      total_price: item.price * item.quantity
    }))).catch(err => console.warn("Supabase background order sync:", err));

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
        loginWithGoogle,
        sendEmailLoginOtp,
        verifyEmailLoginOtp,
        logoutCustomer,
        updateCustomerProfile,
        addSavedAddress,
        isAiAdvisorOpen,
        setIsAiAdvisorOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
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
