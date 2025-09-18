# Seller Dashboard

A comprehensive, responsive seller dashboard built with React, TypeScript, and Tailwind CSS. This application provides a complete interface for managing products, orders, financial data, and business analytics - all with simulated local data and fully functional CRUD operations.

## Features

### 🏪 **Catalog Management**
- Product inventory with full CRUD operations
- Real-time stock tracking with low-stock alerts
- Category-based organization
- Media management (images and reels tracking)
- Product status management (Active, Draft, Out of Stock)

### 📦 **Order Management**
- Complete order lifecycle tracking
- Status updates (Pending → Shipped → Delivered → Returned)
- Order cancellation functionality
- Customer information management
- Revenue tracking per order

### 💰 **Financial Overview**
- Total income and commission tracking
- Payout management and scheduling
- Interactive income history charts
- Month-over-month comparison analytics
- Payment method configuration

### 📊 **Analytics Dashboard**
- Sales performance metrics
- Conversion rate tracking
- Top-selling products analysis
- Category-wise sales distribution
- Customer satisfaction ratings
- Low stock alerts and business insights

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Components**: Shadcn/ui component library
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect)
- **Routing**: React Router DOM

## Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   ├── Topbar.tsx           # Header with user info
│   │   └── ProductModal.tsx     # Add/Edit product form
│   └── ui/                      # Reusable UI components
├── pages/
│   ├── modules/
│   │   ├── CatalogModule.tsx    # Product management
│   │   ├── OrdersModule.tsx     # Order management
│   │   ├── MoneyModule.tsx      # Financial dashboard
│   │   └── AnalyticsModule.tsx  # Analytics & insights
│   └── Dashboard.tsx            # Main dashboard layout
├── data/
│   └── mockData.ts              # Simulated data & types
└── hooks/
    └── use-toast.ts             # Toast notifications
```

## Key Components

### Dashboard Layout
- **Sidebar Navigation**: Clean, collapsible navigation with active state highlighting
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Professional Theme**: Modern color scheme with proper contrast ratios

### CRUD Operations
All data mutations are handled through local state with immediate UI updates:

```typescript
// Example: Add Product Function
const addProduct = (productData: Omit<Product, 'id'>) => {
  const newProduct: Product = {
    ...productData,
    id: Date.now().toString(),
  };
  setProducts([...products, newProduct]);
  toast({ title: 'Product Added', description: `${productData.name} has been added.` });
};
```

### Data Visualization
Interactive charts built with Recharts:
- Line charts for income trends
- Bar charts for sales comparisons  
- Pie charts for category distribution
- Responsive design with proper theming

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd seller-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Features in Detail

### Product Management
- Add new products with comprehensive details
- Edit existing product information
- Delete products with confirmation
- Visual indicators for stock levels
- Media asset tracking

### Order Processing
- Real-time order status updates
- Bulk actions for order management
- Revenue calculations and tracking
- Customer relationship management

### Financial Analytics
- Automated commission calculations
- Payout scheduling and tracking
- Historical income analysis
- Performance trend identification

### Business Intelligence
- Sales conversion metrics
- Product performance rankings
- Inventory optimization alerts
- Customer satisfaction tracking

## Customization

The application uses a comprehensive design system defined in:
- `src/index.css` - Color tokens and design variables
- `tailwind.config.ts` - Tailwind configuration and theme extension

To customize colors, gradients, or spacing:
1. Update design tokens in `index.css`
2. Modify Tailwind configuration as needed
3. Components automatically inherit the new theme

## Performance Features

- **Efficient Rendering**: React hooks for optimal re-renders
- **Responsive Images**: Placeholder system for media assets
- **Lazy Loading**: Chart components load on demand
- **Optimized Bundling**: Tree-shaking enabled for minimal bundle size

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.