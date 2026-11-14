import { CustomerAddress } from '../types';

export interface RegisteredCustomerAccount {
  id: string;
  name: string;
  phone: string;
  verifiedVia: 'WhatsApp' | 'QuickPIN';
  createdAt: string;
  lastLoginAt: string;
  defaultPincode: string;
  city: string;
  state: string;
  addresses: CustomerAddress[];
  orderCount: number;
}

const STORAGE_KEY = 'zn_customer_accounts_db';

// Retrieve all customer accounts from local persistent storage
export const getStoredCustomerAccounts = (): RegisteredCustomerAccount[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Failed to read customer accounts from storage:", err);
  }
  return [];
};

// Register or update customer account in database
export const saveCustomerAccount = (accountData: {
  name: string;
  phone: string;
  verifiedVia: 'WhatsApp' | 'QuickPIN';
  pincode?: string;
  city?: string;
  state?: string;
  addresses?: CustomerAddress[];
}): RegisteredCustomerAccount => {
  const cleanPhone = accountData.phone.replace(/\D/g, '').slice(-10);
  const accounts = getStoredCustomerAccounts();
  const existingIndex = accounts.findIndex((a) => a.phone === cleanPhone);

  const now = new Date().toISOString();

  let updatedAccount: RegisteredCustomerAccount;

  if (existingIndex >= 0) {
    // Update existing customer record
    updatedAccount = {
      ...accounts[existingIndex],
      name: accountData.name || accounts[existingIndex].name,
      verifiedVia: accountData.verifiedVia,
      lastLoginAt: now,
      defaultPincode: accountData.pincode || accounts[existingIndex].defaultPincode || '630001',
      city: accountData.city || accounts[existingIndex].city || 'Karaikudi',
      state: accountData.state || accounts[existingIndex].state || 'Tamil Nadu',
      addresses: accountData.addresses || accounts[existingIndex].addresses || []
    };
    accounts[existingIndex] = updatedAccount;
  } else {
    // Register new customer
    updatedAccount = {
      id: `CUST-${cleanPhone}-${Date.now().toString().slice(-4)}`,
      name: accountData.name || 'Valued Customer',
      phone: cleanPhone,
      verifiedVia: accountData.verifiedVia,
      createdAt: now,
      lastLoginAt: now,
      defaultPincode: accountData.pincode || '630001',
      city: accountData.city || 'Karaikudi',
      state: accountData.state || 'Tamil Nadu',
      addresses: accountData.addresses || [],
      orderCount: 0
    };
    accounts.unshift(updatedAccount);
  }

  // Persist locally
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts, null, 2));
  } catch (err) {
    console.error("Failed to save customer account locally:", err);
  }

  // Also sync asynchronously to serverless backup endpoint
  try {
    fetch('/api/customer-accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedAccount)
    }).catch(() => {
      // Ignore background sync errors on offline/static hosting
    });
  } catch (err) {
    // Ignore fetch error
  }

  return updatedAccount;
};

// Export complete customer database as downloadable JSON file
export const exportCustomerDatabaseAsJSON = (): void => {
  const accounts = getStoredCustomerAccounts();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(accounts, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `znaturals_customer_database_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};
