import React from 'react';
import { LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Topbar: React.FC = () => {
  return (
    <header className="bg-dashboard-topbar border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl font-semibold text-dashboard-topbar-foreground">
            Dashboard Overview
          </h2>
          <p className="text-muted-foreground text-sm">
            Manage your products, orders, and analytics
          </p>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center space-x-4">
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-dashboard-topbar-foreground">
                Alex Johnson
              </p>
              <p className="text-xs text-muted-foreground">Premium Seller</p>
            </div>
            <Avatar>
              <AvatarImage src="/api/placeholder/40/40" alt="User avatar" />
              <AvatarFallback>
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Logout Button */}
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};