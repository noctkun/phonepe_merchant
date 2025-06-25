'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';

export default function Analytics() {
  const [merchantId, setMerchantId] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedMerchantId = localStorage.getItem('merchantId');
    if (!storedMerchantId) {
      router.push('/signin');
      return;
    }
    setMerchantId(storedMerchantId);
    fetchAnalytics(storedMerchantId);
  }, [router]);

  const fetchAnalytics = async (merchantId: string) => {
    try {
      const response = await fetch(`/api/merchant/analytics?merchantId=${merchantId}`);
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-2">Detailed insights into your business performance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Revenue</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{analytics?.totalAmount?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Transactions</span>
                  <span className="text-xl font-semibold">
                    {analytics?.totalTransactions?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="text-xl font-semibold text-green-600">
                    {analytics?.successRate?.toFixed(1) || '0'}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Transaction</span>
                  <span className="text-xl font-semibold">
                    ₹{analytics?.totalTransactions > 0 
                      ? Math.round(analytics.totalAmount / analytics.totalTransactions).toLocaleString()
                      : '0'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Daily Average</span>
                  <span className="text-xl font-semibold">
                    ₹{analytics?.dailyData?.length > 0 
                      ? Math.round(analytics.totalAmount / analytics.dailyData.length).toLocaleString()
                      : '0'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {analytics?.recentTransactions?.slice(0, 10).map((transaction: any, index: number) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">₹{transaction.amount}</p>
                    <p className="text-sm text-gray-600">{transaction.description}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'success' 
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
