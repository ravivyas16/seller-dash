// Mock data for the seller dashboard

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'out-of-stock';
  images: number;
  reels: number;
  createdAt: string;
}

export interface VideoContent {
  id: string;
  title: string;
  type: 'video' | 'reel';
  thumbnail: string;
  duration: number; // in seconds
  views: number;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  uploadDate: string;
  status: 'published' | 'draft' | 'processing';
  productId: string; // Associate video with product
}

export interface SocialMetrics {
  followers: number;
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  totalReach: number;
  engagementRate: number;
  topPerformingContent: VideoContent[];
}

export interface Order {
  id: string;
  productName: string;
  customerName: string;
  status: 'pending' | 'shipped' | 'delivered' | 'returned' | 'cancelled';
  date: string;
  amount: number;
  quantity: number;
}

export interface MoneyData {
  totalIncome: number;
  commission: number;
  pendingPayout: number;
  incomeHistory: Array<{
    month: string;
    income: number;
    commission: number;
  }>;
}

// Sample Products
export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    price: 89.99,
    stock: 45,
    status: 'active',
    images: 8,
    reels: 3,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Premium Leather Wallet',
    category: 'Accessories',
    price: 49.99,
    stock: 23,
    status: 'active',
    images: 5,
    reels: 1,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    category: 'Clothing',
    price: 24.99,
    stock: 0,
    status: 'out-of-stock',
    images: 12,
    reels: 2,
    createdAt: '2024-02-01'
  },
  {
    id: '4',
    name: 'Stainless Steel Water Bottle',
    category: 'Home & Kitchen',
    price: 19.99,
    stock: 67,
    status: 'active',
    images: 6,
    reels: 1,
    createdAt: '2024-02-10'
  },
  {
    id: '5',
    name: 'Yoga Mat Pro',
    category: 'Sports & Fitness',
    price: 39.99,
    stock: 15,
    status: 'draft',
    images: 4,
    reels: 0,
    createdAt: '2024-02-15'
  }
];

// Sample Orders
export const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    productName: 'Wireless Bluetooth Headphones',
    customerName: 'John Smith',
    status: 'delivered',
    date: '2024-02-20',
    amount: 89.99,
    quantity: 1
  },
  {
    id: 'ORD-002',
    productName: 'Premium Leather Wallet',
    customerName: 'Sarah Johnson',
    status: 'shipped',
    date: '2024-02-22',
    amount: 49.99,
    quantity: 1
  },
  {
    id: 'ORD-003',
    productName: 'Stainless Steel Water Bottle',
    customerName: 'Mike Wilson',
    status: 'pending',
    date: '2024-02-23',
    amount: 39.98,
    quantity: 2
  },
  {
    id: 'ORD-004',
    productName: 'Wireless Bluetooth Headphones',
    customerName: 'Emma Davis',
    status: 'delivered',
    date: '2024-02-18',
    amount: 89.99,
    quantity: 1
  },
  {
    id: 'ORD-005',
    productName: 'Premium Leather Wallet',
    customerName: 'David Brown',
    status: 'returned',
    date: '2024-02-15',
    amount: 49.99,
    quantity: 1
  },
  {
    id: 'ORD-006',
    productName: 'Yoga Mat Pro',
    customerName: 'Lisa Anderson',
    status: 'pending',
    date: '2024-02-24',
    amount: 39.99,
    quantity: 1
  }
];

// Money Data
export const moneyData: MoneyData = {
  totalIncome: 8500.45,
  commission: 850.05,
  pendingPayout: 2340.20,
  incomeHistory: [
    { month: 'Oct', income: 2200, commission: 220 },
    { month: 'Nov', income: 2800, commission: 280 },
    { month: 'Dec', income: 3200, commission: 320 },
    { month: 'Jan', income: 2900, commission: 290 },
    { month: 'Feb', income: 3500, commission: 350 }
  ]
};

// Sample Video Content
export const initialVideoContent: VideoContent[] = [
  {
    id: '1',
    title: 'Wireless Headphones Unboxing',
    type: 'video',
    thumbnail: '/placeholder.svg',
    duration: 180,
    views: 12500,
    likes: 890,
    comments: 45,
    shares: 123,
    reach: 18700,
    uploadDate: '2024-02-20',
    status: 'published',
    productId: '1'
  },
  {
    id: '2',
    title: 'Headphones Sound Test',
    type: 'reel',
    thumbnail: '/placeholder.svg',
    duration: 45,
    views: 8900,
    likes: 654,
    comments: 78,
    shares: 89,
    reach: 13400,
    uploadDate: '2024-02-18',
    status: 'published',
    productId: '1'
  },
  {
    id: '3',
    title: 'Premium Headphones Review',
    type: 'reel',
    thumbnail: '/placeholder.svg',
    duration: 30,
    views: 6200,
    likes: 445,
    comments: 34,
    shares: 67,
    reach: 9100,
    uploadDate: '2024-02-16',
    status: 'published',
    productId: '1'
  },
  {
    id: '4',
    title: 'Leather Wallet Review',
    type: 'reel',
    thumbnail: '/placeholder.svg',
    duration: 30,
    views: 4500,
    likes: 324,
    comments: 22,
    shares: 45,
    reach: 6700,
    uploadDate: '2024-02-22',
    status: 'published',
    productId: '2'
  },
  {
    id: '5',
    title: 'T-Shirt Fabric Quality',
    type: 'video',
    thumbnail: '/placeholder.svg',
    duration: 90,
    views: 3200,
    likes: 234,
    comments: 18,
    shares: 28,
    reach: 4800,
    uploadDate: '2024-02-01',
    status: 'published',
    productId: '3'
  },
  {
    id: '6',
    title: 'Organic Cotton Benefits',
    type: 'reel',
    thumbnail: '/placeholder.svg',
    duration: 45,
    views: 2800,
    likes: 189,
    comments: 15,
    shares: 22,
    reach: 4100,
    uploadDate: '2024-01-30',
    status: 'published',
    productId: '3'
  },
  {
    id: '7',
    title: 'Water Bottle Features Demo',
    type: 'video',
    thumbnail: '/placeholder.svg',
    duration: 120,
    views: 6700,
    likes: 423,
    comments: 34,
    shares: 67,
    reach: 9800,
    uploadDate: '2024-02-15',
    status: 'published',
    productId: '4'
  },
  {
    id: '8',
    title: 'Yoga Mat Setup Tips',
    type: 'reel',
    thumbnail: '/placeholder.svg',
    duration: 45,
    views: 1500,
    likes: 120,
    comments: 8,
    shares: 15,
    reach: 2200,
    uploadDate: '2024-02-18',
    status: 'draft',
    productId: '5'
  }
];

// Social Metrics Data
export const socialMetrics: SocialMetrics = {
  followers: 25400,
  totalViews: 125000,
  totalLikes: 8900,
  totalShares: 1200,
  totalReach: 185000,
  engagementRate: 7.8,
  topPerformingContent: initialVideoContent.slice(0, 3)
};

// Analytics Data
export const analyticsData = {
  totalSales: 156,
  conversionRate: 3.2,
  topProducts: [
    { name: 'Wireless Headphones', sales: 45 },
    { name: 'Leather Wallet', sales: 32 },
    { name: 'Water Bottle', sales: 28 },
    { name: 'Yoga Mat', sales: 22 },
    { name: 'Cotton T-Shirt', sales: 18 }
  ],
  salesByCategory: [
    { category: 'Electronics', value: 35 },
    { category: 'Accessories', value: 25 },
    { category: 'Clothing', value: 20 },
    { category: 'Home & Kitchen', value: 15 },
    { category: 'Sports & Fitness', value: 5 }
  ],
  lowStockAlerts: [
    { name: 'Yoga Mat Pro', stock: 15 },
    { name: 'Premium Leather Wallet', stock: 23 }
  ]
};