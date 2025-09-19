# API Documentation

This document outlines all the API endpoints required for the dashboard application, including request/response formats and data types.

## Base Configuration

- **Base URL**: `http://localhost:5000/api` (development) or your production API URL
- **Authentication**: Bearer token (JWT) stored in localStorage
- **Content-Type**: `application/json` for most endpoints, `multipart/form-data` for file uploads

## Authentication

All API requests include an Authorization header when a token is available:
```
Authorization: Bearer <token>
```

## Data Types

### Product
```typescript
interface Product {
  _id?: string;           // MongoDB ObjectId
  id: string;             // Unique identifier
  name: string;           // Product name
  category: string;       // Product category
  price: number;          // Price in rupees
  stock: number;          // Available quantity
  status: 'active' | 'draft' | 'out-of-stock';
  images: number;         // Number of images
  reels: number;          // Number of reels/videos
  createdAt: string;      // ISO date string
  updatedAt?: string;     // ISO date string
}
```

### VideoContent
```typescript
interface VideoContent {
  _id?: string;           // MongoDB ObjectId
  id: string;             // Unique identifier
  title: string;          // Video title
  type: 'video' | 'reel'; // Content type
  thumbnail: string;      // Thumbnail URL
  duration: number;       // Duration in seconds
  views: number;          // View count
  likes: number;          // Like count
  comments: number;       // Comment count
  shares: number;         // Share count
  reach: number;          // Reach count
  uploadDate: string;     // ISO date string
  status: 'published' | 'draft' | 'processing';
  productId: string;      // Reference to Product ID
  createdAt?: string;     // ISO date string
  updatedAt?: string;     // ISO date string
}
```

### Order
```typescript
interface Order {
  _id?: string;           // MongoDB ObjectId
  id: string;             // Unique identifier
  productName: string;    // Name of ordered product
  productId: string;      // Reference to Product ID
  customerName: string;   // Customer's name
  customerEmail?: string; // Customer's email (optional)
  status: 'pending' | 'shipped' | 'delivered' | 'returned' | 'cancelled';
  date: string;           // ISO date string
  amount: number;         // Order amount in rupees
  quantity: number;       // Quantity ordered
  createdAt?: string;     // ISO date string
  updatedAt?: string;     // ISO date string
}
```

### SocialMetrics
```typescript
interface SocialMetrics {
  _id?: string;           // MongoDB ObjectId
  followers: number;      // Follower count
  totalViews: number;     // Total views across all content
  totalLikes: number;     // Total likes across all content
  totalShares: number;    // Total shares across all content
  totalReach: number;     // Total reach across all content
  engagementRate: number; // Engagement rate percentage
  topPerformingContent: VideoContent[]; // Array of top content
  updatedAt?: string;     // ISO date string
}
```

### MoneyData
```typescript
interface MoneyData {
  _id?: string;           // MongoDB ObjectId
  totalIncome: number;    // Total income in rupees
  commission: number;     // Commission amount in rupees
  pendingPayout: number;  // Pending payout in rupees
  incomeHistory: Array<{
    month: string;        // Month identifier (e.g., "Jan", "Feb")
    income: number;       // Income for that month
    commission: number;   // Commission for that month
  }>;
  updatedAt?: string;     // ISO date string
}
```

## API Endpoints

### Products API

#### Get All Products
```
GET /products?page={page}&limit={limit}
```
**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
```typescript
{
  success: boolean;
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}
```

#### Get Single Product
```
GET /products/{id}
```
**Response:**
```typescript
{
  success: boolean;
  data?: Product;
  message?: string;
  error?: string;
}
```

#### Create Product
```
POST /products
```
**Request Body:**
```typescript
{
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'out-of-stock';
  images: number;
  reels: number;
}
```

#### Update Product
```
PUT /products/{id}
```
**Request Body:** Partial Product object (any fields to update)

#### Delete Product
```
DELETE /products/{id}
```

### Video Content API

#### Get Video Content
```
GET /video-content?productId={productId}
```
**Query Parameters:**
- `productId` (optional): Filter by product ID

#### Create Video Content
```
POST /video-content
```
**Request Body:**
```typescript
{
  title: string;
  type: 'video' | 'reel';
  thumbnail: string;
  duration: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  uploadDate: string;
  status: 'published' | 'draft' | 'processing';
  productId: string;
}
```

#### Update Video Content
```
PUT /video-content/{id}
```
**Request Body:** Partial VideoContent object

#### Delete Video Content
```
DELETE /video-content/{id}
```

### Social Metrics API

#### Get Social Metrics
```
GET /social-metrics
```

#### Update Social Metrics
```
PUT /social-metrics
```
**Request Body:** Partial SocialMetrics object

### Orders API

#### Get All Orders
```
GET /orders?page={page}&limit={limit}
```
**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

#### Get Single Order
```
GET /orders/{id}
```

#### Create Order
```
POST /orders
```
**Request Body:**
```typescript
{
  productName: string;
  productId: string;
  customerName: string;
  customerEmail?: string;
  status: 'pending' | 'shipped' | 'delivered' | 'returned' | 'cancelled';
  date: string;
  amount: number;
  quantity: number;
}
```

#### Update Order Status
```
PATCH /orders/{id}/status
```
**Request Body:**
```typescript
{
  status: 'pending' | 'shipped' | 'delivered' | 'returned' | 'cancelled';
}
```

### Money/Analytics API

#### Get Money Data
```
GET /money
```

#### Get Analytics
```
GET /analytics?startDate={startDate}&endDate={endDate}
```
**Query Parameters:**
- `startDate` (optional): Start date for analytics (ISO string)
- `endDate` (optional): End date for analytics (ISO string)

### File Upload API

#### Upload File
```
POST /upload
```
**Request Body:** FormData
- `file`: File object (image or video)
- `type`: 'image' | 'video'

**Response:**
```typescript
{
  success: boolean;
  data?: {
    url: string;
    filename: string;
  };
  message?: string;
  error?: string;
}
```

## Error Handling

### Error Response Format
```typescript
{
  success: false;
  error: string;
  message?: string;
  code?: string;
}
```

### Common HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

## Implementation Notes

1. **Currency**: All monetary values are in Indian Rupees (₹)
2. **Dates**: Use ISO 8601 format for all date strings
3. **Authentication**: JWT tokens should be stored securely and included in API requests
4. **File Uploads**: Support for images and videos with proper validation
5. **Pagination**: Consistent pagination format across list endpoints
6. **Error Handling**: Standardized error responses with appropriate HTTP status codes

## Environment Variables

Frontend should configure:
```
VITE_API_URL=http://localhost:5000/api
```

Backend should handle CORS for the frontend domain and provide these endpoints with proper MongoDB integration.