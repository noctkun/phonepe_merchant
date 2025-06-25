import { supabase } from './supabase';
import { Merchant, Transaction } from '@/types';

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

// Get all merchants
export const getMerchants = async (): Promise<Merchant[]> => {
  const { data, error } = await supabase.from('merchants').select('*');
  if (error) throw error;
  return data || [];
};

// Save or update a merchant
export const saveMerchant = async (merchant: Merchant): Promise<void> => {
  const { error } = await supabase.from('merchants').upsert([merchant], { onConflict: 'merchantId' });
  if (error) throw error;
};

// Get merchant by merchantId
export const getMerchantById = async (merchantId: string): Promise<Merchant | null> => {
  const { data, error } = await supabase.from('merchants').select('*').eq('merchantId', merchantId).single();
  if (error && error.code !== 'PGRST116') throw error; // PGRST116: No rows found
  return data || null;
};

// Get all transactions
export const getTransactions = async (): Promise<Transaction[]> => {
  const { data, error } = await supabase.from('transactions').select('*');
  if (error) throw error;
  return data || [];
};

// Get transactions for a specific merchant
export const getMerchantTransactions = async (merchantId: string): Promise<Transaction[]> => {
  const { data, error } = await supabase.from('transactions').select('*').eq('merchantId', merchantId);
  if (error) throw error;
  return data || [];
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

// Create a new transaction
export const createTransaction = async (tx: Transaction): Promise<void> => {
  const { error } = await supabase.from('transactions').insert([tx]);
  if (error) throw error;
};

// Analytics (example: total transactions, total amount, success rate)
export const getAnalytics = async () => {
  const { data: transactions, error } = await supabase.from('transactions').select('*');
  if (error) throw error;
  const totalTransactions = transactions?.length || 0;
  const totalAmount = transactions?.reduce((sum, t) => t.status === 'success' ? sum + t.amount : sum, 0) || 0;
  const successCount = transactions?.filter(t => t.status === 'success').length || 0;
  const successRate = totalTransactions > 0 ? (successCount / totalTransactions) * 100 : 0;
  return {
    totalTransactions,
    totalAmount,
    successRate: Number(successRate.toFixed(2)),
    recentTransactions: transactions?.slice(0, 5) || [],
  };
};
