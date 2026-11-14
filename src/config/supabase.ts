import { createClient } from '@supabase/supabase-js';
import { Order } from '../types';

// Supabase Project Credentials
export const SUPABASE_URL = "https://tucgcwpkoetikobygrbu.supabase.co";

// Read from Vite environment or use public client key
export const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Y2djd3Brb2V0aWtvYnlncmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ2MzgwMDB9.placeholder_key_until_env_provided";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

/**
 * 1-Click Google OAuth Sign-In
 */
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
  if (error) throw error;
  return data;
};

/**
 * Send 6-Digit Email OTP
 */
export const sendEmailOtp = async (email: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true
    }
  });
  if (error) throw error;
  return data;
};

/**
 * Verify 6-Digit Email OTP
 */
export const verifyEmailOtp = async (email: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email'
  });
  if (error) throw error;
  return data;
};

/**
 * Sign out customer
 */
export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

/**
 * Insert Order and Order Items into Supabase
 * Handles both authenticated customers and Express Guest checkouts safely
 */
export const saveOrderToSupabase = async (order: Order, userId?: string) => {
  try {
    // 1. Insert into public.orders table
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        id: order.id,
        user_id: userId || null,
        customer_name: order.customerName,
        phone: order.phone,
        alternate_phone: order.alternatePhone || null,
        address: order.address,
        landmark: order.landmark || null,
        city: order.city,
        state: order.state,
        pincode: order.pincode,
        zone: order.zone,
        delivery_slot: order.deliverySlot || null,
        notes: order.notes || null,
        subtotal: order.subtotal,
        shipping_fee: order.shippingFee,
        total: order.total,
        total_weight_grams: order.totalWeightGrams,
        status: order.status,
        payment_method: order.paymentMethod,
        payment_status: order.paymentStatus,
        upi_utr: order.upiUtr || null,
        items: order.items
      });

    if (orderError) {
      console.warn("Supabase orders table insert notice (Run supabase_schema.sql if table is missing):", orderError.message);
      return false;
    }

    // 2. Insert into public.order_items table
    if (order.items && order.items.length > 0) {
      const itemsPayload = order.items.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.productName,
        price: item.price,
        quantity: item.quantity,
        volume: item.volume,
        weight_grams: item.weightGrams
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(itemsPayload);

      if (itemsError) {
        console.warn("Supabase order_items table insert notice:", itemsError.message);
      }
    }

    return true;
  } catch (err) {
    console.warn("Supabase order sync error:", err);
    return false;
  }
};
