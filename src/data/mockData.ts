// Mock data for the seller dashboard
import productsData from './products.json';
import ordersData from './orders.json';
import videoContentData from './videoContent.json';
import analyticsJson from './analytics.json';

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

// Sample Products from JSON
export const initialProducts: Product[] = productsData as Product[];

// Sample Orders from JSON
export const initialOrders: Order[] = ordersData as Order[];

// Money Data from JSON
export const moneyData: MoneyData = analyticsJson.moneyData;

// Sample Video Content from JSON
export const initialVideoContent: VideoContent[] = videoContentData as VideoContent[];

// Social Metrics Data from JSON
export const socialMetrics: SocialMetrics = {
  ...analyticsJson.socialMetrics,
  topPerformingContent: initialVideoContent.slice(0, 3)
};

// Analytics Data from JSON
export const analyticsData = analyticsJson.salesData;