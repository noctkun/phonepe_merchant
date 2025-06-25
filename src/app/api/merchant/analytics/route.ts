import { NextResponse } from 'next/server';
import { getMerchantTransactions, generateMockTransactions } from '@/lib/data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json(
        { error: 'Merchant ID is required' },
        { status: 400 }
      );
    }

    // Get only real transactions
    let transactions = getMerchantTransactions(merchantId);

    // Calculate analytics
    const totalTransactions = transactions.length;
    const totalAmount = transactions
      .filter(t => t.status === 'success')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const successfulTransactions = transactions.filter(t => t.status === 'success').length;
    const successRate = totalTransactions > 0 ? (successfulTransactions / totalTransactions) * 100 : 0;

    // Get recent transactions
    const recentTransactions = transactions
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);

    // Daily data for charts
    const dailyData = transactions.reduce((acc: any, transaction) => {
      const date = new Date(transaction.timestamp).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, amount: 0, transactions: 0 };
      }
      if (transaction.status === 'success') {
        acc[date].amount += transaction.amount;
      }
      acc[date].transactions += 1;
      return acc;
    }, {});

    const analytics = {
      totalTransactions,
      totalAmount,
      successRate,
      recentTransactions,
      dailyData: Object.values(dailyData).slice(-30) // Last 30 days
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
