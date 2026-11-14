import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult,
  UserCredential
} from 'firebase/auth';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyB2eoCtAu7Zvn8T7MU1EY3Bds7xR1qccFM",
  authDomain: "znaturals-official.firebaseapp.com",
  projectId: "znaturals-official",
  storageBucket: "znaturals-official.firebasestorage.app",
  messagingSenderId: "76690978720",
  appId: "1:76690978720:web:2fb6232f4758affcea56c5",
  measurementId: "G-R7XHN7LJ0N"
};

// Initialize Firebase App singleton
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Helper to initialize invisible reCAPTCHA
export const initRecaptchaVerifier = (containerId: string): RecaptchaVerifier => {
  // If an existing verifier exists on window, clear it first
  if ((window as any).recaptchaVerifier) {
    try {
      (window as any).recaptchaVerifier.clear();
    } catch (e) {
      // Ignore cleanup error
    }
  }

  const verifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved - will allow signInWithPhoneNumber
    },
    'expired-callback': () => {
      // Reset reCAPTCHA on expiration
    }
  });

  (window as any).recaptchaVerifier = verifier;
  return verifier;
};

// Send real SMS OTP to Indian mobile number
export const sendFirebasePhoneOtp = async (
  rawPhone: string,
  appVerifier: RecaptchaVerifier
): Promise<ConfirmationResult> => {
  const cleanDigits = rawPhone.replace(/\D/g, '');
  // Format to E.164: +91XXXXXXXXXX
  const formattedPhone = cleanDigits.startsWith('91') && cleanDigits.length === 12
    ? `+${cleanDigits}`
    : `+91${cleanDigits}`;

  return await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
};

// Verify the received 6-digit SMS OTP
export const verifyFirebasePhoneOtp = async (
  confirmationResult: ConfirmationResult,
  otpCode: string
): Promise<UserCredential> => {
  return await confirmationResult.confirm(otpCode);
};
