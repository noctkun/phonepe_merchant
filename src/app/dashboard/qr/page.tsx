"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';

export default function QRGeneratorPage() {
  const [vpa, setVpa] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderNo, setOrderNo] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setQrUrl(null);
    try {
      const options = {
        method: "GET",
        url: "https://upi-qr-code-generator-with-amount-and-name3.p.rapidapi.com/",
        params: {
          vpa,
          name,
          amount,
          type: "data",
        },
        headers: {
          "x-rapidapi-key": "fa64333aabmshe7a5b21b5c399cbp1843e3jsn08b40465167f",
          "x-rapidapi-host": "upi-qr-code-generator-with-amount-and-name3.p.rapidapi.com",
        },
      };
      const response = await axios.request(options);
      if (response.data && typeof response.data === 'string' && response.data.startsWith('data:image')) {
        setQrUrl(response.data);
      } else if (response.data && response.data.qr) {
        setQrUrl(response.data.qr);
      } else {
        setError("Failed to generate QR code.");
      }
      // Add transaction via API
      const merchantId = typeof window !== 'undefined' ? localStorage.getItem('merchantId') || 'demo-merchant' : 'demo-merchant';
      await axios.post('/api/transactions', {
        id: `txn_${Date.now()}`,
        merchantId,
        amount: Number(amount),
        status: 'pending',
        paymentMethod: 'UPI',
        timestamp: new Date().toISOString(),
        description: `QR generated for ${name} (Order: ${orderNo})`,
      });
      setSuccessMsg('Transaction added to recent activity!');
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Generate UPI QR Code</h2>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-200">VPA (UPI ID)</label>
                <input
                  type="text"
                  value={vpa}
                  onChange={e => setVpa(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-200">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-200">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-gray-200">Order No</label>
                <input
                  type="text"
                  value={orderNo}
                  onChange={e => setOrderNo(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate QR"}
              </button>
            </form>
            {error && <div className="mt-4 text-red-600 dark:text-red-400 text-center">{error}</div>}
            {qrUrl && (
              <div className="mt-8 flex flex-col items-center">
                <img src={qrUrl} alt="UPI QR Code" className="w-48 h-48 object-contain border rounded" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Scan this QR to pay</p>
              </div>
            )}
            {successMsg && <div className="mt-4 text-green-600 dark:text-green-400 text-center">{successMsg}</div>}
          </div>
        </main>
      </div>
    </div>
  );
}
