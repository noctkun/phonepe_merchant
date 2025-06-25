'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MerchantChatbot = dynamic(() => import('@/components/MerchantChatbot'), { ssr: false });

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);
  }, []);

  const features = [
    {
      icon: "💳",
      title: "Instant UPI Payments",
      description: "Accept payments instantly with QR codes and UPI"
    },
    {
      icon: "📊",
      title: "Real-time Analytics",
      description: "Track your business performance with live insights"
    },
    {
      icon: "🤖",
      title: "AI Support",
      description: "Get 24/7 customer support with our smart chatbot"
    }
  ];

  const stats = [
    { number: "10M+", label: "Merchants" },
    { number: "₹500Cr+", label: "Daily Volume" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 overflow-hidden">
      {/* Chatbot Top-Down Modal */}
      {showChatbot && (
        <div className="fixed top-0 left-0 w-full flex justify-center z-50 animate-slide-down">
          <div className="w-full max-w-md bg-white rounded-b-2xl shadow-2xl border border-purple-200 overflow-hidden">
            <div className="flex items-center justify-between bg-purple-600 text-white px-4 py-2">
              <span className="font-semibold">AI Support (Powered by Google Gemini)</span>
              <button onClick={() => setShowChatbot(false)} className="text-white hover:text-purple-200 text-xl">×</button>
            </div>
            <div className="p-0">
              <MerchantChatbot />
            </div>
          </div>
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-bold text-xl">P</span>
          </div>
          <span className="text-white font-bold text-xl">PhonePe Business</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-8 text-white/80">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#support" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Power Your
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Business</span>
              <br />with PhonePe
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join millions of merchants who trust PhonePe for seamless payments, 
              powerful analytics, and business growth solutions.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link href="/signup" className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-full shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Start Free Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link href="/signin" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-full border-2 border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-0 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="pt-0 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <span className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-4 py-1 rounded-full text-sm shadow">AI powered by Google Gemini</span>
          </div>
          {/* Features Carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Everything You Need</h2>
                <div className="flex justify-center space-x-2">
                  {features.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentFeature === index ? 'bg-yellow-400 w-8' : 'bg-white/30'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">
                  {features[currentFeature].icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {features[currentFeature].title}
                </h3>
                <p className="text-white/80 text-lg">
                  {features[currentFeature].description}
                </p>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-20 max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Quick Setup</h3>
              <ul className="text-white/80 space-y-2">
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> 5-minute onboarding</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Instant KYC verification</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Zero setup fees</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Analytics</h3>
              <ul className="text-white/80 space-y-2">
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Real-time dashboards</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Sales predictions</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Customer insights</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Bank-Grade Security</h3>
              <ul className="text-white/80 space-y-2">
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> 256-bit encryption</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> PCI DSS compliant</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Fraud protection</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">24/7 Support</h3>
              <ul className="text-white/80 space-y-2">
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> AI-powered chatbot</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Phone & email support</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Dedicated account manager</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-indigo-800 to-purple-900">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Simple, Transparent Pricing</h2>
          <p className="text-white/80 mb-12 text-lg">No hidden fees. Pay only for what you use.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Starter</h3>
              <div className="text-3xl font-black text-yellow-400 mb-2">0%</div>
              <div className="text-white/70 mb-4">Transaction Fee</div>
              <ul className="text-white/80 space-y-2 mb-6">
                <li>✓ UPI & QR Payments</li>
                <li>✓ Basic Analytics</li>
                <li>✓ Email Support</li>
              </ul>
              <button className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-yellow-300 transition">Get Started</button>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 border-2 border-yellow-400 shadow-xl scale-105">
              <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
              <div className="text-3xl font-black text-yellow-400 mb-2">0.5%</div>
              <div className="text-white/70 mb-4">Transaction Fee</div>
              <ul className="text-white/80 space-y-2 mb-6">
                <li>✓ All Starter Features</li>
                <li>✓ Advanced Analytics</li>
                <li>✓ Priority Support</li>
                <li>✓ AI Chatbot</li>
              </ul>
              <button className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-yellow-300 transition">Upgrade</button>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
              <div className="text-3xl font-black text-yellow-400 mb-2">Custom</div>
              <div className="text-white/70 mb-4">Contact Us</div>
              <ul className="text-white/80 space-y-2 mb-6">
                <li>✓ All Pro Features</li>
                <li>✓ Dedicated Manager</li>
                <li>✓ Custom Integrations</li>
              </ul>
              <button className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-yellow-300 transition">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-32 bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <span className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-4 py-1 rounded-full text-sm shadow">AI powered by Google Gemini</span>
          </div>
          <h2 className="text-5xl font-extrabold text-white mb-8">24/7 AI Support</h2>
          <p className="text-white/80 mb-12 text-2xl">Get instant help from our smart chatbot or connect with our support team.</p>
          <button
            className="bg-purple-600 text-white px-12 py-4 rounded-full font-bold text-2xl shadow-lg hover:bg-purple-700 transition mb-8"
            onClick={() => setShowChatbot(true)}
          >
            Chat with AI Support
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-sm border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/60">
            &copy; {new Date().getFullYear()} PhonePe Merchant Platform. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-white/60 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
