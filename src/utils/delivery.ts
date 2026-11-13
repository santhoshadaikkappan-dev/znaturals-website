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
  subtotal: number
): DeliveryCalculation => {
  const isKaraikudi = isKaraikudiPincode(pincode);

  if (isKaraikudi) {
    return {
      zone: 'Zone A (Karaikudi Local)',
      isKaraikudi: true,
      totalWeightGrams,
      totalWeightFormatted: totalWeightGrams >= 1000 
        ? `${(totalWeightGrams / 1000).toFixed(2)} kg` 
        : `${totalWeightGrams} g`,
      shippingFee: 0,
      deliveryTimeEstimate: 'Today: 8:00 AM – 4:00 PM (Local Van Delivery)',
      courierCarrier: 'Z Naturals Karaikudi Local Fleet',
      supportedPaymentMethods: [
        'Cash on Delivery (COD)',
        'Google Pay',
        'PhonePe',
        'Paytm',
        'Supermoney',
        'BHIM / Any UPI App',
        'Cards & Net Banking'
      ],
      slabDescription: '100% FREE Karaikudi Local Doorstep Delivery'
    };
  }

  // Zone B: Rest of Tamil Nadu & India (Weight-based courier slabs)
  // Free courier on high-value orders
  const isFreeCourierQualified = subtotal >= 1499;

  let shippingFee = 0;
  if (!isFreeCourierQualified) {
    // Base slab: Up to 500g = ₹49
    // Additional slabs: Every +500g = +₹30
    if (totalWeightGrams <= 500) {
      shippingFee = 49;
    } else {
      const extraGrams = totalWeightGrams - 500;
      const extraSlabs = Math.ceil(extraGrams / 500);
      shippingFee = 49 + (extraSlabs * 30);
    }
  }

  const weightFormatted = totalWeightGrams >= 1000 
    ? `${(totalWeightGrams / 1000).toFixed(2)} kg` 
    : `${totalWeightGrams} g`;

  return {
    zone: 'Zone B (Rest of India Courier)',
    isKaraikudi: false,
    totalWeightGrams,
    totalWeightFormatted: weightFormatted,
    shippingFee,
    deliveryTimeEstimate: '2 – 4 Business Days (Express Air/Surface Courier)',
    courierCarrier: 'Express Courier (Delhivery / BlueDart / DTDC)',
    supportedPaymentMethods: [
      'Google Pay',
      'PhonePe',
      'Paytm',
      'Supermoney',
      'BHIM / Any UPI App',
      'Cash on Delivery (COD)',
      'Cards & Net Banking'
    ],
    slabDescription: isFreeCourierQualified
      ? `FREE Courier (Order above ₹1499) • Total Weight: ${weightFormatted}`
      : `Weight Slab: ${weightFormatted} (Base ₹49 + ₹30/500g) = ₹${shippingFee}`
  };
};
