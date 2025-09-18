import { useState, useEffect, useCallback } from 'react';
import { Product, ApiError } from '@/types';
import { apiService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id' | '_id' | 'createdAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  refreshProducts: () => Promise<void>;
  recentlyAdded: string | null;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For development: use mock data if API is not available
      try {
        const response = await apiService.getProducts();
        if (response.success && response.data) {
          setProducts(response.data);
        }
      } catch (apiError) {
        // Fallback to mock data for development
        const { initialProducts } = await import('@/data/mockData');
        setProducts(initialProducts);
        console.warn('API not available, using mock data:', apiError);
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch products';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const addProduct = useCallback(async (productData: Omit<Product, 'id' | '_id' | 'createdAt'>) => {
    try {
      // For development: add to local state if API is not available
      try {
        const response = await apiService.createProduct(productData);
        if (response.success && response.data) {
          setProducts(prev => [...prev, response.data!]);
          setRecentlyAdded(response.data.id);
          
          // Remove animation after 2 seconds
          setTimeout(() => setRecentlyAdded(null), 2000);
          
          toast({
            title: 'Product Added',
            description: `${productData.name} has been added to your catalog.`,
          });
        }
      } catch (apiError) {
        // Fallback for development
        const newProduct: Product = {
          ...productData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        
        setProducts(prev => [...prev, newProduct]);
        setRecentlyAdded(newProduct.id);
        
        setTimeout(() => setRecentlyAdded(null), 2000);
        
        toast({
          title: 'Product Added (Local)',
          description: `${productData.name} has been added locally. Connect to backend to persist.`,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to add product';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [toast]);

  const updateProduct = useCallback(async (id: string, productData: Partial<Product>) => {
    try {
      try {
        const response = await apiService.updateProduct(id, productData);
        if (response.success && response.data) {
          setProducts(prev => prev.map(p => p.id === id ? response.data! : p));
          toast({
            title: 'Product Updated',
            description: `Product has been successfully updated.`,
          });
        }
      } catch (apiError) {
        // Fallback for development
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productData } : p));
        toast({
          title: 'Product Updated (Local)',
          description: `Product updated locally. Connect to backend to persist.`,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to update product';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [toast]);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const product = products.find(p => p.id === id);
      
      try {
        await apiService.deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
        toast({
          title: 'Product Deleted',
          description: `${product?.name} has been removed from your catalog.`,
          variant: 'destructive',
        });
      } catch (apiError) {
        // Fallback for development
        setProducts(prev => prev.filter(p => p.id !== id));
        toast({
          title: 'Product Deleted (Local)',
          description: `${product?.name} removed locally. Connect to backend to persist.`,
          variant: 'destructive',
        });
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to delete product';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [products, toast]);

  const refreshProducts = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshProducts,
    recentlyAdded,
  };
};