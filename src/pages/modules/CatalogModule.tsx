import React, { useState } from 'react';
import { Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductModal } from '@/components/dashboard/ProductModal';
import { ProductGrid } from '@/components/dashboard/ProductGrid';
import { ProductDetailsModal } from '@/components/dashboard/ProductDetailsModal';
import { Product, socialMetrics } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { useProducts } from '@/hooks/useProducts';
import { useVideoContent } from '@/hooks/useVideoContent';

export const CatalogModule: React.FC = () => {
  const {
    products,
    loading: productsLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    recentlyAdded
  } = useProducts();
  
  const {
    videoContent,
    deleteVideoContent
  } = useVideoContent();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const { toast } = useToast();

  // Add new product function
  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    addProduct(productData);
  };

  // Edit product function
  const handleEditProduct = (productData: Omit<Product, 'id'>) => {
    if (!editingProduct) return;
    updateProduct(editingProduct.id, productData);
    setEditingProduct(undefined);
  };

  const handleContentUpload = () => {
    toast({
      title: 'Upload Started',
      description: 'Your video is being uploaded and processed.',
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === 'active').length,
    lowStock: products.filter(p => p.stock < 20 && p.stock > 0).length,
    outOfStock: products.filter(p => p.status === 'out-of-stock').length,
  };

  if (productsLoading) {
    return <div className="space-y-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Content & Catalog</h1>
          <p className="text-muted-foreground">Manage your products, videos and social content</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Button>
      </div>

      {/* Social Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <div className="text-primary">👥</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(socialMetrics.followers)}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <div className="text-primary">📈</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(socialMetrics.totalReach)}</div>
            <p className="text-xs text-muted-foreground">+23% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{formatNumber(socialMetrics.totalLikes)}</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <div className="text-primary">⚡</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{socialMetrics.engagementRate}%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Product Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.activeProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.lowStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.outOfStock}</div>
          </CardContent>
        </Card>
      </div>


      {/* Products Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Click on any product to view detailed information in a popup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductGrid 
            products={products}
            onEdit={(product) => {
              setEditingProduct(product);
              setIsModalOpen(true);
            }}
            onDelete={deleteProduct}
            recentlyAdded={recentlyAdded}
            videoContent={videoContent}
            onDeleteVideo={deleteVideoContent}
          />
        </CardContent>
      </Card>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(undefined);
        }}
        onSave={editingProduct ? handleEditProduct : handleAddProduct}
        product={editingProduct}
      />
    </div>
  );
};