/**
 * Z NATURALS — Razorpay Payment Gateway Configuration
 * Official standard checkout integration for automated UPI (PhonePe, GPay, Paytm), Cards, NetBanking.
 */

export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_U07S9UJMqBzKvt';

/**
 * Dynamically loads the official Razorpay Checkout SDK
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // If already loaded in window
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK');
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export interface RazorpayCustomerDetails {
  name: string;
  email?: string;
  contact: string;
  address: string;
}

export interface RazorpayCheckoutOptions {
  amount: number; // in INR rupees (will be converted to paise)
  orderId?: string; // Optional backend order ID if generated
  customer: RazorpayCustomerDetails;
  description?: string;
  onSuccess: (paymentId: string) => void;
  onDismiss?: () => void;
  onError?: (errorMessage: string) => void;
}

/**
 * Launch the official Razorpay Standard Checkout Modal
 */
export const launchRazorpayCheckout = async ({
  amount,
  customer,
  description = 'Z NATURALS — Botanical Beauty & Personal Care',
  onSuccess,
  onDismiss,
  onError
}: RazorpayCheckoutOptions): Promise<boolean> => {
  const isLoaded = await loadRazorpayScript();

  if (!isLoaded) {
    if (onError) onError('Could not load Razorpay payment gateway. Please check your internet connection.');
    return false;
  }

  const options = {
    key: RAZORPAY_KEY_ID,
    amount: Math.round(amount * 100), // Razorpay amount in paise (e.g. ₹399 = 39900 paise)
    currency: 'INR',
    name: 'Z NATURALS',
    description: description,
    image: 'https://znaturals.vercel.app/favicon.svg',
    prefill: {
      name: customer.name,
      email: customer.email || 'customer@znaturals.in',
      contact: customer.contact
    },
    notes: {
      delivery_address: customer.address,
      brand: 'Z NATURALS Karaikudi'
    },
    theme: {
      color: '#263D32', // Deep Forest Green brand color
      backdrop_color: 'rgba(38, 61, 50, 0.6)'
    },
    modal: {
      ondismiss: () => {
        if (onDismiss) onDismiss();
      }
    },
    handler: (response: { razorpay_payment_id: string; razorpay_order_id?: string; razorpay_signature?: string }) => {
      if (response && response.razorpay_payment_id) {
        onSuccess(response.razorpay_payment_id);
      } else {
        if (onError) onError('Payment completed but payment ID was not received.');
      }
    }
  };

  try {
    const rzp = new (window as any).Razorpay(options);
    rzp.on('payment.failed', (response: any) => {
      const err = response?.error?.description || 'Payment was unsuccessful or cancelled.';
      if (onError) onError(err);
    });
    rzp.open();
    return true;
  } catch (err: any) {
    console.error('Error opening Razorpay modal:', err);
    if (onError) onError(err.message || 'Error launching payment window.');
    return false;
  }
};
