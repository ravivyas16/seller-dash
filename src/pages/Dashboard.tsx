import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import { CatalogModule } from './modules/CatalogModule';
import { OrdersModule } from './modules/OrdersModule';
import { MoneyModule } from './modules/MoneyModule';
import { AnalyticsModule } from './modules/AnalyticsModule';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('catalog');

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'catalog':
        return <CatalogModule />;
      case 'orders':
        return <OrdersModule />;
      case 'money':
        return <MoneyModule />;
      case 'analytics':
        return <AnalyticsModule />;
      default:
        return <CatalogModule />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <Topbar />
          
          {/* Content Area */}
          <main className="flex-1 p-6">
            {renderActiveModule()}
          </main>
        </div>
      </div>
    </div>
  );
};