'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BarChart3, 
  CreditCard, 
  Banknote, 
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  QrCode
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/qr', icon: QrCode, label: 'QR Code' },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/dashboard/transactions', icon: CreditCard, label: 'Transactions' },
  { href: '/dashboard/settlements', icon: Banknote, label: 'Settlements' },
  { href: '/dashboard/support', icon: MessageCircle, label: 'Support' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`bg-white shadow-sm border-r border-gray-200 min-h-screen transition-all duration-200 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-end p-2">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="p-1 rounded hover:bg-gray-100 focus:outline-none"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-600 border-r-2 border-purple-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <item.icon size={20} />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
