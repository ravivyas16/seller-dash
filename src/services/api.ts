// API service layer for Express/MongoDB backend
import { Product, VideoContent, SocialMetrics, Order, MoneyData, ApiResponse, PaginatedResponse, ApiError } from '@/types';

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available (implement your auth logic)
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `HTTP error! status: ${response.status}`,
          errorData.code,
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error occurred'
      );
    }
  }

  // Products API
  async getProducts(page = 1, limit = 20): Promise<PaginatedResponse<Product>> {
    return this.request(`/products?page=${page}&limit=${limit}`);
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return this.request(`/products/${id}`);
  }

  async createProduct(product: Omit<Product, 'id' | '_id' | 'createdAt'>): Promise<ApiResponse<Product>> {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<ApiResponse<Product>> {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  }

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Video Content API
  async getVideoContent(productId?: string): Promise<ApiResponse<VideoContent[]>> {
    const query = productId ? `?productId=${productId}` : '';
    return this.request(`/video-content${query}`);
  }

  async createVideoContent(video: Omit<VideoContent, 'id' | '_id' | 'createdAt'>): Promise<ApiResponse<VideoContent>> {
    return this.request('/video-content', {
      method: 'POST',
      body: JSON.stringify(video),
    });
  }

  async updateVideoContent(id: string, video: Partial<VideoContent>): Promise<ApiResponse<VideoContent>> {
    return this.request(`/video-content/${id}`, {
      method: 'PUT',
      body: JSON.stringify(video),
    });
  }

  async deleteVideoContent(id: string): Promise<ApiResponse<void>> {
    return this.request(`/video-content/${id}`, {
      method: 'DELETE',
    });
  }

  // Social Metrics API
  async getSocialMetrics(): Promise<ApiResponse<SocialMetrics>> {
    return this.request('/social-metrics');
  }

  async updateSocialMetrics(metrics: Partial<SocialMetrics>): Promise<ApiResponse<SocialMetrics>> {
    return this.request('/social-metrics', {
      method: 'PUT',
      body: JSON.stringify(metrics),
    });
  }

  // Orders API
  async getOrders(page = 1, limit = 20): Promise<PaginatedResponse<Order>> {
    return this.request(`/orders?page=${page}&limit=${limit}`);
  }

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    return this.request(`/orders/${id}`);
  }

  async createOrder(order: Omit<Order, 'id' | '_id' | 'createdAt'>): Promise<ApiResponse<Order>> {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async updateOrderStatus(id: string, status: Order['status']): Promise<ApiResponse<Order>> {
    return this.request(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Money/Analytics API
  async getMoneyData(): Promise<ApiResponse<MoneyData>> {
    return this.request('/money');
  }

  async getAnalytics(startDate?: string, endDate?: string): Promise<ApiResponse<any>> {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/analytics${query}`);
  }

  // File Upload API
  async uploadFile(file: File, type: 'image' | 'video'): Promise<ApiResponse<{ url: string; filename: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.request('/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set boundary for FormData
    });
  }
}

// Create and export singleton instance
export const apiService = new ApiService();

// Export ApiError for error handling
export type { ApiError };