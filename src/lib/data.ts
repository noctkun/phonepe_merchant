import fs from 'fs';
import path from 'path';
import { Merchant, Transaction } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const MERCHANTS_FILE = path.join(DATA_DIR, 'merchants.json');
const TRANSACTIONS_FILE = path.join(DATA_DIR, 'transactions.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize files if they don't exist
if (!fs.existsSync(MERCHANTS_FILE)) {
  fs.writeFileSync(MERCHANTS_FILE, JSON.stringify([]));
}

if (!fs.existsSync(TRANSACTIONS_FILE)) {
  fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify([]));
}

export const BASE_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn_1001',
    merchantId: 'demo-merchant',
    amount: 1500,
    status: 'success',
    paymentMethod: 'UPI',
    customerPhone: '+911234567890',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Base payment for order #1001',
  },
  {
    id: 'txn_1002',
    merchantId: 'demo-merchant',
    amount: 2200,
    status: 'success',
    paymentMethod: 'UPI',
    customerPhone: '+919876543210',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Base payment for order #1002',
  },
  {
    id: 'txn_1003',
    merchantId: 'demo-merchant',
    amount: 500,
    status: 'pending',
    paymentMethod: 'UPI',
    customerPhone: '+919812345678',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Base payment for order #1003',
  },
];

export const getMerchants = (): Merchant[] => {
  try {
    const data = fs.readFileSync(MERCHANTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const saveMerchant = (merchant: Merchant): void => {
  const merchants = getMerchants();
  const existingIndex = merchants.findIndex(m => m.merchantId === merchant.merchantId);
  
  if (existingIndex >= 0) {
    merchants[existingIndex] = merchant;
  } else {
    merchants.push(merchant);
  }
  
  fs.writeFileSync(MERCHANTS_FILE, JSON.stringify(merchants, null, 2));
};

export const getMerchantById = (merchantId: string): Merchant | null => {
  const merchants = getMerchants();
  return merchants.find(m => m.merchantId === merchantId) || null;
};

export const getTransactions = (): Transaction[] => {
  try {
    const data = fs.readFileSync(TRANSACTIONS_FILE, 'utf8');
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length === 0) {
      // Initialize with base transactions if empty
      fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify(BASE_TRANSACTIONS, null, 2));
      return BASE_TRANSACTIONS;
    }
    return parsed;
  } catch {
    // On error, initialize with base transactions
    fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify(BASE_TRANSACTIONS, null, 2));
    return BASE_TRANSACTIONS;
  }
};

export const getMerchantTransactions = (merchantId: string): Transaction[] => {
  const transactions = getTransactions();
  return transactions.filter(t => t.merchantId === merchantId);
};

// Generate mock transactions for demo
export const generateMockTransactions = (merchantId: string): Transaction[] => {
  const mockTransactions: Transaction[] = [];
  const now = new Date();
  
  for (let i = 0; i < 50; i++) {
    const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
    const amount = Math.floor(Math.random() * 5000) + 100;
    const status = Math.random() > 0.1 ? 'success' : (Math.random() > 0.5 ? 'pending' : 'failed');
    
    mockTransactions.push({
      id: `txn_${Date.now()}_${i}`,
      merchantId,
      amount,
      status,
      paymentMethod: 'UPI',
      customerPhone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      timestamp: date.toISOString(),
      description: `Payment for order #${1000 + i}`
    });
  }
  
  return mockTransactions;
};

export function createTransaction(tx: Transaction) {
  const transactions = getTransactions();
  transactions.unshift(tx);
  // Keep only the latest 20 for recent
  if (transactions.length > 20) transactions.length = 20;
  fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify(transactions, null, 2));
}

export function getAnalytics() {
  const transactions = getTransactions();
  const totalTransactions = transactions.length;
  const totalAmount = transactions.reduce((sum, t) => t.status === 'success' ? sum + t.amount : sum, 0);
  const successCount = transactions.filter(t => t.status === 'success').length;
  const successRate = totalTransactions ? (successCount / totalTransactions) * 100 : 0;
  return {
    totalTransactions,
    totalAmount,
    successRate,
    recentTransactions: transactions.slice(0, 5),
  };
}
