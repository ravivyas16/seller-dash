// TypeScript interfaces for MongoDB schemas
export interface Product {
  _id?: string; // MongoDB ObjectId
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'out-of-stock';
  images: number;
  reels: number;
  createdAt: string;
  updatedAt?: string;
}

export interface VideoContent {
  _id?: string; // MongoDB ObjectId
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
  productId: string; // Reference to Product
  createdAt?: string;
  updatedAt?: string;
}

export interface SocialMetrics {
  _id?: string;
  followers: number;
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  totalReach: number;
  engagementRate: number;
  topPerformingContent: VideoContent[];
  updatedAt?: string;
}

export interface Order {
  _id?: string;
  id: string;
  productName: string;
  productId: string; // Reference to Product
  customerName: string;
  customerEmail?: string;
  status: 'pending' | 'shipped' | 'delivered' | 'returned' | 'cancelled';
  date: string;
  amount: number;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface MoneyData {
  _id?: string;
  totalIncome: number;
  commission: number;
  pendingPayout: number;
  incomeHistory: Array<{
    month: string;
    income: number;
    commission: number;
  }>;
  updatedAt?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}

// API Error class
export class ApiError extends Error {
  code?: string;
  status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}