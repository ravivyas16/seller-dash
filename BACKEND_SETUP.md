# Backend Integration Guide

This frontend is designed to work with an Express.js/MongoDB backend. Follow this guide to set up your backend.

## Backend API Endpoints

Your Express backend should implement these endpoints:

### Products API
```
GET    /api/products?page=1&limit=20     # Get paginated products
GET    /api/products/:id                 # Get single product
POST   /api/products                     # Create product
PUT    /api/products/:id                 # Update product
DELETE /api/products/:id                 # Delete product
```

### Video Content API
```
GET    /api/video-content?productId=123  # Get videos (optionally filtered by product)
POST   /api/video-content               # Create video content
PUT    /api/video-content/:id           # Update video content
DELETE /api/video-content/:id           # Delete video content
```

### Social Metrics API
```
GET    /api/social-metrics              # Get social metrics
PUT    /api/social-metrics              # Update social metrics
```

### Orders API
```
GET    /api/orders?page=1&limit=20      # Get paginated orders
GET    /api/orders/:id                  # Get single order
POST   /api/orders                      # Create order
PATCH  /api/orders/:id/status           # Update order status
```

### Analytics API
```
GET    /api/money                       # Get money/income data
GET    /api/analytics?startDate=&endDate= # Get analytics data
```

### File Upload API
```
POST   /api/upload                      # Upload files (images/videos)
```

## MongoDB Schemas

### Product Schema
```javascript
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  status: { type: String, enum: ['active', 'draft', 'out-of-stock'], default: 'active' },
  images: { type: Number, default: 0 },
  reels: { type: Number, default: 0 }
}, { timestamps: true });
```

### Video Content Schema
```javascript
const videoContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['video', 'reel'], required: true },
  thumbnail: { type: String, required: true },
  duration: { type: Number, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  reach: { type: Number, default: 0 },
  uploadDate: { type: String, required: true },
  status: { type: String, enum: ['published', 'draft', 'processing'], default: 'draft' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
}, { timestamps: true });
```

### Order Schema
```javascript
const orderSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String },
  status: { type: String, enum: ['pending', 'shipped', 'delivered', 'returned', 'cancelled'], default: 'pending' },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  quantity: { type: Number, required: true }
}, { timestamps: true });
```

## Response Format

All API endpoints should return responses in this format:

### Single Item Response
```javascript
{
  "success": true,
  "data": { /* item data */ },
  "message": "Optional success message"
}
```

### Paginated Response
```javascript
{
  "success": true,
  "data": [ /* array of items */ ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Error Response
```javascript
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE" // optional
}
```

## Environment Setup

1. Create `.env.local` file in your frontend project:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

2. In your Express backend, set up CORS to allow your frontend:
   ```javascript
   app.use(cors({
     origin: 'http://localhost:8080', // Your Lovable frontend URL
     credentials: true
   }));
   ```

## Authentication (Optional)

If you want to add authentication:

1. The frontend will store JWT tokens in localStorage
2. Include `Authorization: Bearer <token>` header in all requests
3. Implement these auth endpoints in your backend:
   ```
   POST /auth/login
   POST /auth/register
   POST /auth/logout
   GET  /auth/me
   ```

## Development Mode

The frontend includes fallback to mock data when the API is not available, so you can develop the frontend independently. Check the browser console for API connection status.

## File Upload

For file uploads, use a service like AWS S3, Cloudinary, or local file storage. The frontend sends FormData with the file and expects a response with the file URL:

```javascript
{
  "success": true,
  "data": {
    "url": "https://your-cdn.com/uploads/image.jpg",
    "filename": "image.jpg"
  }
}
```