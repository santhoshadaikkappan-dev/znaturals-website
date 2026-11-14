import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Default Supabase project configuration (Can be overridden via .env)
const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Fallback project configuration if environment variables are not set yet
export const SUPABASE_URL = envUrl || 'https://znaturals-official.supabase.co';
export const SUPABASE_ANON_KEY = envAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    envUrl && 
    envAnonKey && 
    !envUrl.includes('placeholder') && 
    !envAnonKey.includes('placeholder')
  );
};

// Create Supabase singleton client
export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * 1-Click Google OAuth Sign-In via Supabase
 */
export const signInWithGoogle = async () => {
  if (!isSupabaseConfigured()) {
    console.info("Supabase credentials not configured in .env yet. Running in simulation mode.");
    return { data: null, error: new Error("SUPABASE_NOT_CONFIGURED") };
  }

  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
};

/**
 * Send 6-Digit Passwordless Email OTP via Supabase
 */
export const sendEmailOtp = async (email: string) => {
  if (!isSupabaseConfigured()) {
    console.info("Supabase not configured in .env. Falling back to test OTP code.");
    return { data: null, error: new Error("SUPABASE_NOT_CONFIGURED") };
  }

  return await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });
};

/**
 * Verify 6-Digit Email OTP Code via Supabase
 */
export const verifyEmailOtp = async (email: string, token: string) => {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error("SUPABASE_NOT_CONFIGURED") };
  }

  return await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  });
};

/**
 * Sign out of Supabase session
 */
export const signOutSupabase = async () => {
  if (!isSupabaseConfigured()) return { error: null };
  return await supabase.auth.signOut();
};

/**
 * Save Guest or Authenticated Order into Supabase Database
 */
export const insertSupabaseOrder = async (orderData: {
  id: string;
  user_id?: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email?: string | null;
  is_guest: boolean;
  pincode: string;
  city: string;
  state: string;
  address: string;
  landmark?: string | null;
  delivery_slot?: string | null;
  payment_method: string;
  upi_transaction_id?: string | null;
  payment_status: string;
  order_status: string;
  subtotal: number;
  shipping_fee: number;
  grand_total: number;
  total_weight_grams: number;
  notes?: string | null;
}, items: Array<{
  product_id: string;
  product_name: string;
  product_volume: string;
  quantity: number;
  price: number;
  total_price: number;
}>) => {
  if (!isSupabaseConfigured()) {
    console.info("Simulating Supabase order insertion (mock database active).");
    return { data: { id: orderData.id }, error: null };
  }

  try {
    // 1. Insert order header
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Insert order items
    const formattedItems = items.map(item => ({
      order_id: orderData.id,
      ...item
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(formattedItems);

    if (itemsError) throw itemsError;

    return { data: order, error: null };
  } catch (err: any) {
    console.error("Supabase order insert error:", err);
    return { data: null, error: err };
  }
};
