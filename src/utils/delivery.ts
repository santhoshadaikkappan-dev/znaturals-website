import { KARAIKUDI_PINCODES, isKaraikudiPincode } from '../config/storeConfig';
import { DeliveryZone, PaymentMethod } from '../types';

export interface DeliveryCalculation {
  zone: DeliveryZone;
  isKaraikudi: boolean;
  totalWeightGrams: number;
  totalWeightFormatted: string;
  shippingFee: number;
  deliveryTimeEstimate: string;
  courierCarrier: string;
  supportedPaymentMethods: PaymentMethod[];
  slabDescription: string;
}

export const calculateDelivery = (
  pincode: string,
  totalWeightGrams: number,
  _subtotal?: number
): DeliveryCalculation => {
  const isKaraikudi = isKaraikudiPincode(pincode);
  const weight = Math.max(totalWeightGrams || 0, 100);

  // Weight-based standard delivery calculation for all orders and all pincodes:
  // Base slab: Up to 500g = ₹49
  // Additional slabs: Every +500g (or portion thereof) = +₹30
  let shippingFee = 49;
  if (weight > 500) {
    const extraGrams = weight - 500;
    const extraSlabs = Math.ceil(extraGrams / 500);
    shippingFee = 49 + (extraSlabs * 30);
  }

  const weightFormatted = weight >= 1000 
    ? `${(weight / 1000).toFixed(2)} kg` 
    : `${weight} g`;

  if (isKaraikudi) {
    return {
      zone: 'Zone A (Karaikudi Local)',
      isKaraikudi: true,
      totalWeightGrams: weight,
      totalWeightFormatted: weightFormatted,
      shippingFee,
      deliveryTimeEstimate: 'Today: 8:00 AM – 4:00 PM (Local Express Delivery)',
      courierCarrier: 'Z Naturals Local Delivery Fleet',
      supportedPaymentMethods: [
        'Razorpay Online (UPI / GPay / PhonePe / Cards)',
        'Cash on Delivery (COD) / UPI at Doorstep'
      ],
      slabDescription: `Parcel Weight: ${weightFormatted} • Standard Delivery: ₹${shippingFee} (Base ₹49 + ₹30/500g)`
    };
  }

  return {
    zone: 'Zone B (Rest of India Courier)',
    isKaraikudi: false,
    totalWeightGrams: weight,
    totalWeightFormatted: weightFormatted,
    shippingFee,
    deliveryTimeEstimate: '2 – 4 Business Days (Express Courier)',
    courierCarrier: 'Express Courier (Delhivery / BlueDart / DTDC)',
    supportedPaymentMethods: [
      'Razorpay Online (UPI / GPay / PhonePe / Cards)',
      'Cash on Delivery (COD) / UPI at Doorstep'
    ],
    slabDescription: `Parcel Weight: ${weightFormatted} • Standard Courier: ₹${shippingFee} (Base ₹49 + ₹30/500g)`
  };
};
