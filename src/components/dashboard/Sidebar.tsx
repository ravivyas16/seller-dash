import React from 'react';
import { Package, ShoppingCart, DollarSign, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: 'catalog', name: 'Content & Catalog', icon: Package },
  { id: 'orders', name: 'Orders', icon: ShoppingCart },
  { id: 'money', name: 'Money', icon: DollarSign },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-dashboard-sidebar text-dashboard-sidebar-foreground w-64 min-h-screen flex flex-col flex-shrink-0">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-dashboard-sidebar-hover">
        <h1 className="text-xl font-bold">Seller Central</h1>
        <p className="text-sm text-muted-foreground mt-1">Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={cn(
                  'w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200',
                  'hover:bg-dashboard-sidebar-hover',
                  activeTab === item.id
                    ? 'bg-dashboard-sidebar-active text-white'
                    : 'text-dashboard-sidebar-foreground'
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-dashboard-sidebar-hover">
        <div className="text-xs text-muted-foreground">
          © 2024 Seller Central
        </div>
      </div>
    </div>
  );
};