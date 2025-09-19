import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Image as ImageIcon, 
  Video, 
  Package, 
  Tag,
  Eye,
  MoreHorizontal,
  Edit,
  Trash2
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ProductDetailsModal } from './ProductDetailsModal';
import { Product, VideoContent } from '@/data/mockData';

interface ProductGridProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  recentlyAdded?: string | null;
  videoContent: VideoContent[];
  onDeleteVideo: (videoId: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onEdit,
  onDelete,
  recentlyAdded,
  videoContent,
  onDeleteVideo
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'out-of-stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStockColor = (stock: number, status: Product['status']) => {
    if (status === 'out-of-stock') return 'text-destructive';
    if (stock < 20) return 'text-warning';
    return 'text-muted-foreground';
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card 
            key={product.id}
            className={`group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
              recentlyAdded === product.id 
                ? 'animate-pulse-success border-success shadow-success/20' 
                : 'hover:shadow-primary/10'
            }`}
            onClick={() => handleProductClick(product)}
          >
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="aspect-square bg-gradient-to-br from-muted to-muted/60 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  {getStatusBadge(product.status)}
                </div>
                
                {/* Actions Menu */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onEdit(product);
                      }}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(product.id);
                        }}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Media Count Overlay */}
                <div className="absolute bottom-3 right-3 flex space-x-2">
                  {product.images > 0 && (
                    <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
                      <ImageIcon className="w-3 h-3 mr-1" />
                      {product.images}
                    </Badge>
                  )}
                  {product.reels > 0 && (
                    <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
                      <Video className="w-3 h-3 mr-1" />
                      {product.reels}
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-xl font-bold text-primary">
                      ₹{(product.price / 100).toFixed(0)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className={`text-sm font-medium ${getStockColor(product.stock, product.status)}`}>
                      {product.stock} units
                    </span>
                  </div>
                </div>
                
                {/* Stock Warning */}
                {product.stock < 20 && product.status !== 'out-of-stock' && (
                  <div className="text-xs text-warning bg-warning/10 px-2 py-1 rounded">
                    Low stock warning
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground">
                  Created: {product.createdAt}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        videoContent={videoContent}
        onDeleteVideo={onDeleteVideo}
      />
    </>
  );
};