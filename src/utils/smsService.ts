// Fast2SMS Delivery Service for Z NATURALS

export interface SendOtpResult {
  success: boolean;
  message: string;
  isSimulated?: boolean;
}

export const sendOtpViaFast2SMS = async (phoneNumber: string, otpCode: string): Promise<SendOtpResult> => {
  const cleanPhone = phoneNumber.replace(/\D/g, '').slice(-10);

  try {
    // 1. First attempt via Vercel Serverless Function (Production Safe & No CORS issues)
    const res = await fetch('/api/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: cleanPhone,
        otp: otpCode,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.return === true || data.status_code === 200) {
        return {
          success: true,
          message: `Real SMS OTP sent to +91 ${cleanPhone}! Check your phone messages.`,
        };
      } else if (data.status_code === 999) {
        // Fast2SMS minimum ₹100 wallet recharge requirement for new accounts
        return {
          success: false,
          message: data.message || "Please complete ₹100 recharge in Fast2SMS wallet to activate API.",
          isSimulated: true,
        };
      } else {
        return {
          success: false,
          message: data.message || "SMS Gateway response error.",
          isSimulated: true,
        };
      }
    }
  } catch (err: any) {
    console.warn("Direct /api/send-otp not reachable, checking fallback:", err);
  }

  // Fallback for static hosting environments (e.g. GitHub Pages)
  return {
    success: false,
    message: "SMS Serverless function unavailable. Switched to test mode.",
    isSimulated: true,
  };
};
