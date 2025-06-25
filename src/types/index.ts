export interface Merchant {
    merchantId: string;
    phoneNumber: string;
    password: string;
    businessName?: string;
    createdAt: string;
    isVerified: boolean;
  }
  
  export interface Transaction {
    id: string;
    merchantId: string;
    amount: number;
    status: 'success' | 'pending' | 'failed';
    paymentMethod: string;
    customerPhone?: string;
    timestamp: string;
    description?: string;
  }
  
  export interface Analytics {
    totalTransactions: number;
    totalAmount: number;
    successRate: number;
    dailyData: {
      date: string;
      amount: number;
      transactions: number;
    }[];
  }
  
  export interface Message {
    role: 'user' | 'model';
    parts: { text: string }[];
  }
  