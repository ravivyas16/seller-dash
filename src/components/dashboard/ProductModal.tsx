import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Upload, Image as ImageIcon, Video } from 'lucide-react';
import { Product } from '@/data/mockData';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => void;
  product?: Product;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'draft' as 'active' | 'draft' | 'out-of-stock'
  });

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: (product.price / 100).toString(),
        stock: product.stock.toString(),
        status: product.status
      });
      // In edit mode, we'd load existing files here if we had URLs
      setUploadedImages([]);
      setUploadedVideos([]);
    } else {
      setFormData({
        name: '',
        category: '',
        price: '',
        stock: '',
        status: 'draft'
      });
      setUploadedImages([]);
      setUploadedVideos([]);
    }
  }, [product, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            const productData: Omit<Product, 'id'> = {
              name: formData.name,
              category: formData.category,
              price: parseFloat(formData.price),
              stock: parseInt(formData.stock),
              status: formData.status,
              images: uploadedImages.length,
              reels: uploadedVideos.length,
              createdAt: product?.createdAt || new Date().toISOString().split('T')[0]
            };
            
            onSave(productData);
            setIsUploading(false);
            setUploadProgress(0);
            onClose();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 150);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Add files with animation
    files.forEach((file, index) => {
      setTimeout(() => {
        setUploadedImages(prev => [...prev, file]);
      }, index * 100);
    });
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Add files with animation
    files.forEach((file, index) => {
      setTimeout(() => {
        setUploadedVideos(prev => [...prev, file]);
      }, index * 100);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setUploadedVideos(prev => prev.filter((_, i) => i !== index));
  };

  const categories = [
    'Electronics',
    'Accessories',
    'Clothing',
    'Home & Kitchen',
    'Sports & Fitness',
    'Beauty & Health',
    'Books & Media'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="0"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-2">
              <Label>Product Images</Label>
              <div className={`border-2 border-dashed border-border rounded-md p-4 transition-all duration-200 ${
                uploadedImages.length > 0 ? 'border-success bg-success/5' : 'hover:border-primary hover:bg-primary/5'
              }`}>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={isUploading}
                />
                <Label 
                  htmlFor="image-upload" 
                  className={`flex flex-col items-center cursor-pointer space-y-2 ${
                    isUploading ? 'pointer-events-none opacity-50' : ''
                  }`}
                >
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload images or drag and drop
                  </span>
                </Label>
                
                {uploadedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {uploadedImages.map((file, index) => (
                      <div key={index} className="relative animate-scale-in">
                        <Badge variant="secondary" className="text-xs animate-fade-in">
                          {file.name.slice(0, 15)}...
                        </Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 hover:scale-110 transition-transform"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-span-2">
              <Label>Product Videos/Reels</Label>
              <div className={`border-2 border-dashed border-border rounded-md p-4 transition-all duration-200 ${
                uploadedVideos.length > 0 ? 'border-success bg-success/5' : 'hover:border-primary hover:bg-primary/5'
              }`}>
                <Input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="video-upload"
                  disabled={isUploading}
                />
                <Label 
                  htmlFor="video-upload" 
                  className={`flex flex-col items-center cursor-pointer space-y-2 ${
                    isUploading ? 'pointer-events-none opacity-50' : ''
                  }`}
                >
                  <Video className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload videos/reels or drag and drop
                  </span>
                </Label>
                
                {uploadedVideos.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {uploadedVideos.map((file, index) => (
                      <div key={index} className="relative animate-scale-in">
                        <Badge variant="secondary" className="text-xs animate-fade-in">
                          {file.name.slice(0, 15)}...
                        </Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 hover:scale-110 transition-transform"
                          onClick={() => removeVideo(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          {isUploading && (
            <div className="w-full bg-secondary rounded-full h-2 animate-fade-in">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isUploading}
              className={`transition-all duration-200 ${
                isUploading ? 'animate-pulse' : 'hover:scale-105'
              }`}
            >
              {isUploading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Uploading...</span>
                </div>
              ) : (
                product ? 'Update Product' : 'Add Product'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};