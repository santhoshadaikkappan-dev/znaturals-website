/**
 * Z NATURALS — Google Sheets Automated Order Sync & Export
 * Synchronizes customer order bills automatically into Google Sheets via Google Apps Script Webhook.
 */

import { Order } from '../types';

// Webhook URL configured via Vite env or configurable in store settings
export const GOOGLE_SHEET_WEBHOOK_URL = 
  import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL || '';

export interface GoogleSheetOrderPayload {
  timestamp: string;
  orderId: string;
  customerName: string;
  phone: string;
  alternatePhone: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  zone: string;
  deliverySlot: string;
  itemsList: string;
  totalItemsCount: number;
  totalWeightGrams: number;
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  paymentRef: string;
  orderStatus: string;
  notes: string;
}

/**
 * Format Order into a clean Google Sheet payload
 */
export const formatOrderForGoogleSheet = (order: Order): GoogleSheetOrderPayload => {
  const formattedDate = new Date(order.createdAt).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const itemsListString = order.items
    .map((item) => `${item.productName} (${item.volume || ''}) x${item.quantity} [₹${item.price * item.quantity}]`)
    .join(' ; ');

  const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    timestamp: formattedDate,
    orderId: order.id,
    customerName: order.customerName,
    phone: `'${order.phone}`, // Leading quote prevents Google Sheets from stripping leading zeros
    alternatePhone: order.alternatePhone ? `'${order.alternatePhone}` : '',
    address: order.address,
    landmark: order.landmark || '',
    city: order.city,
    state: order.state,
    pincode: order.pincode,
    zone: order.zone,
    deliverySlot: order.deliverySlot || '',
    itemsList: itemsListString,
    totalItemsCount: totalQuantity,
    totalWeightGrams: order.totalWeightGrams,
    subtotal: order.subtotal,
    shippingFee: order.shippingFee,
    totalAmount: order.total,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    paymentRef: order.upiUtr || 'N/A',
    orderStatus: order.status,
    notes: order.notes || ''
  };
};

/**
 * Asynchronously posts order data to Google Apps Script Webhook
 */
export const syncOrderToGoogleSheet = async (order: Order): Promise<boolean> => {
  const webhookUrl = GOOGLE_SHEET_WEBHOOK_URL.trim();

  // If no webhook configured yet, save to local backup
  if (!webhookUrl) {
    console.info("ℹ️ Google Sheet Webhook URL not set yet. Set VITE_GOOGLE_SHEET_WEBHOOK_URL in .env to auto-sync rows in real time.");
    return false;
  }

  try {
    const payload = formatOrderForGoogleSheet(order);

    // Using mode: 'no-cors' allows browser requests to Google Apps Script web apps without CORS block
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log(`✓ Order ${order.id} sent to Google Sheet Webhook successfully.`);
    return true;
  } catch (error) {
    console.warn("Could not sync order to Google Sheet webhook:", error);
    return false;
  }
};

/**
 * Download all orders as a systemized CSV file ready to open directly in Google Sheets or Microsoft Excel
 */
export const downloadOrdersCSV = (orders: Order[], filename: string = 'znaturals_orders_bill.csv') => {
  if (!orders || orders.length === 0) return;

  const headers = [
    'Date & Time (IST)',
    'Order ID',
    'Customer Name',
    'Phone Number',
    'Alternate Phone',
    'Delivery Address',
    'Landmark',
    'City',
    'State',
    'Pincode',
    'Zone',
    'Delivery Schedule',
    'Ordered Items',
    'Total Units',
    'Weight (g)',
    'Subtotal (INR)',
    'Delivery Fee (INR)',
    'Total Bill (INR)',
    'Payment Method',
    'Payment Status',
    'Payment Reference / ID',
    'Order Status',
    'Customer Instructions'
  ];

  const escapeCSV = (str: string | number | undefined | null) => {
    if (str === undefined || str === null) return '""';
    const clean = String(str).replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = orders.map((ord) => {
    const sheetData = formatOrderForGoogleSheet(ord);
    return [
      escapeCSV(sheetData.timestamp),
      escapeCSV(sheetData.orderId),
      escapeCSV(sheetData.customerName),
      escapeCSV(sheetData.phone.replace(/^'/, '')),
      escapeCSV(sheetData.alternatePhone.replace(/^'/, '')),
      escapeCSV(sheetData.address),
      escapeCSV(sheetData.landmark),
      escapeCSV(sheetData.city),
      escapeCSV(sheetData.state),
      escapeCSV(sheetData.pincode),
      escapeCSV(sheetData.zone),
      escapeCSV(sheetData.deliverySlot),
      escapeCSV(sheetData.itemsList),
      sheetData.totalItemsCount,
      sheetData.totalWeightGrams,
      sheetData.subtotal,
      sheetData.shippingFee,
      sheetData.totalAmount,
      escapeCSV(sheetData.paymentMethod),
      escapeCSV(sheetData.paymentStatus),
      escapeCSV(sheetData.paymentRef),
      escapeCSV(sheetData.orderStatus),
      escapeCSV(sheetData.notes)
    ].join(',');
  });

  // UTF-8 BOM ensures non-English characters and symbols display correctly in Excel & Sheets
  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
