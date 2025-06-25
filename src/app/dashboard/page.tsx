'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import StatsCard from '@/components/dashboard/StatsCard';
import { CreditCard, TrendingUp, Users, Banknote } from 'lucide-react';

export default function Dashboard() {
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
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {merchantId}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Transactions"
              value={analytics?.totalTransactions?.toLocaleString() || '0'}
              change="+12% from last month"
              changeType="positive"
              icon={<CreditCard className="text-purple-600" size={24} />}
            />
            <StatsCard
              title="Total Revenue"
              value={`₹${analytics?.totalAmount?.toLocaleString() || '0'}`}
              change="+8% from last month"
              changeType="positive"
              icon={<TrendingUp className="text-purple-600" size={24} />}
            />
            <StatsCard
              title="Success Rate"
              value={`${analytics?.successRate?.toFixed(1) || '0'}%`}
              change="+2% from last month"
              changeType="positive"
              icon={<Users className="text-purple-600" size={24} />}
            />
            <StatsCard
              title="Pending Settlements"
              value="₹25,430"
              change="Settlement in 2 hours"
              changeType="neutral"
              icon={<Banknote className="text-purple-600" size={24} />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
              <div className="space-y-4">
                {analytics?.recentTransactions?.slice(0, 5).map((transaction: any, index: number) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">₹{transaction.amount}</p>
                      <p className="text-sm text-gray-600">{transaction.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'success' 
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => router.push('/dashboard/qr')}
                >
                  <CreditCard className="text-purple-600 mb-2" size={24} />
                  <p className="font-medium text-gray-900">Generate QR</p>
                </button>
                <button
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => router.push('/dashboard/analytics')}
                >
                  <TrendingUp className="text-purple-600 mb-2" size={24} />
                  <p className="font-medium text-gray-900">View Reports</p>
                </button>
                <button
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => router.push('/dashboard/settlements')}
                >
                  <Banknote className="text-purple-600 mb-2" size={24} />
                  <p className="font-medium text-gray-900">Settlements</p>
                </button>
                <button
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => router.push('/dashboard/support')}
                >
                  <Users className="text-purple-600 mb-2" size={24} />
                  <p className="font-medium text-gray-900">Support</p>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
