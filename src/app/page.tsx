'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
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
        <div className="hidden md:flex space-x-8 text-white/80">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#support" className="hover:text-white transition-colors">Support</a>
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
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
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
