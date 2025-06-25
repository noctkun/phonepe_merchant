'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import MerchantChatbot from '@/components/MerchantChatbot';

export default function Support() {
  const [merchantId, setMerchantId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedMerchantId = localStorage.getItem('merchantId');
    if (!storedMerchantId) {
      router.push('/signin');
      return;
    }
    setMerchantId(storedMerchantId);
  }, [router]);

  if (!merchantId) {
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
            <h1 className="text-3xl font-bold text-gray-900">Support</h1>
            <p className="text-gray-600 mt-2">Get help with your PhonePe merchant account</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Help</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-purple-600 hover:text-purple-700">
                      How to accept payments?
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 hover:text-purple-700">
                      Settlement process
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 hover:text-purple-700">
                      QR code issues
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 hover:text-purple-700">
                      Refund process
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Info</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">1800-123-4567</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">support@phonepeclone.com</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Hours</p>
                    <p className="text-gray-600">24/7 Support</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-purple-600 hover:text-purple-700">
                      User Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 hover:text-purple-700">
                      API Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 hover:text-purple-700">
                      Video Tutorials
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 hover:text-purple-700">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Assistant</h3>
              <MerchantChatbot />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
