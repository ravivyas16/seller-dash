import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  DollarSign, 
  Calendar, 
  Image as ImageIcon, 
  Video,
  Tag,
  BarChart3,
  Play,
  Eye,
  Heart,
  Share2,
  MessageCircle,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Product, VideoContent, initialVideoContent } from '@/data/mockData';

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  videoContent?: VideoContent[];
  onDeleteVideo?: (videoId: string) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  onClose,
  product,
  videoContent = [],
  onDeleteVideo
}) => {
  if (!product) return null;

  // Get videos associated with this product
  const productVideos = videoContent.filter(video => video.productId === product.id);

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

  const getStockStatus = (stock: number, status: Product['status']) => {
    if (status === 'out-of-stock') return { color: 'text-destructive', label: 'Out of Stock' };
    if (stock < 20) return { color: 'text-warning', label: 'Low Stock' };
    return { color: 'text-success', label: 'In Stock' };
  };

  const stockStatus = getStockStatus(product.stock, product.status);

  const getContentStatusBadge = (status: VideoContent['status']) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-success text-success-foreground">Published</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'processing':
        return <Badge variant="outline">Processing</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: VideoContent['type']) => {
    return type === 'reel' ? 
      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Reel</Badge> :
      <Badge variant="outline">Video</Badge>;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-xl">
            {product.name}
            {getStatusBadge(product.status)}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Product Hero Section */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      {product.images} image{product.images !== 1 ? 's' : ''} available
                    </p>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Category:</span>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Price:</span>
                        <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Stock:</span>
                        <span className={`font-semibold ${stockStatus.color}`}>
                          {product.stock} units ({stockStatus.label})
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Created:</span>
                        <span className="text-sm">{product.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Media Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Product Images</h4>
                </div>
                <div className="text-center py-6 bg-muted/30 rounded-lg">
                  <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-lg font-semibold">{product.images}</p>
                  <p className="text-sm text-muted-foreground">
                    Image{product.images !== 1 ? 's' : ''} uploaded
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Video className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Product Videos</h4>
                </div>
                <div className="text-center py-6 bg-muted/30 rounded-lg">
                  <Video className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-lg font-semibold">{product.reels}</p>
                  <p className="text-sm text-muted-foreground">
                    Video{product.reels !== 1 ? 's' : ''} uploaded
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Product Performance</h4>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-primary">
                    {Math.floor(Math.random() * 100) + 50}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                </div>
                
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-success">
                    {Math.floor(Math.random() * 20) + 5}
                  </p>
                  <p className="text-sm text-muted-foreground">Sales This Month</p>
                </div>
                
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-warning">
                    {(Math.random() * 5 + 2).toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Videos/Content */}
          {productVideos.length > 0 && (
            <>
              <Separator />
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Video className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Product Content ({productVideos.length})</h4>
                  </div>
                  
                  <div className="space-y-4">
                    {productVideos.map((video) => (
                      <Card key={video.id} className="border-muted">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            {/* Video Thumbnail */}
                            <div className="relative flex-shrink-0">
                              <img 
                                src={video.thumbnail} 
                                alt={video.title}
                                className="w-24 h-16 object-cover rounded-md bg-muted"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Play className="w-6 h-6 text-white drop-shadow-lg" />
                              </div>
                              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                                {formatDuration(video.duration)}
                              </div>
                            </div>
                            
                            {/* Video Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h5 className="font-medium text-sm line-clamp-2">{video.title}</h5>
                                  <p className="text-xs text-muted-foreground mt-1">{video.uploadDate}</p>
                                </div>
                                
                                <div className="flex items-center space-x-2 ml-2">
                                  {getTypeBadge(video.type)}
                                  {getContentStatusBadge(video.status)}
                                </div>
                              </div>
                              
                              {/* Video Metrics */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                                <div className="flex items-center space-x-1">
                                  <Eye className="w-3 h-3 text-muted-foreground" />
                                  <span>{formatNumber(video.views)}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-red-500">
                                  <Heart className="w-3 h-3 fill-current" />
                                  <span>{formatNumber(video.likes)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageCircle className="w-3 h-3 text-muted-foreground" />
                                  <span>{formatNumber(video.comments)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Share2 className="w-3 h-3 text-muted-foreground" />
                                  <span>{formatNumber(video.shares)}</span>
                                </div>
                              </div>
                              
                              {/* Reach */}
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">Total Reach:</span>
                                  <span className="font-semibold text-primary">
                                    {formatNumber(video.reach)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Actions */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-popover">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Analytics
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="mr-2 h-4 w-4" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-destructive"
                                  onClick={() => onDeleteVideo?.(video.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Inventory Alert */}
          {product.stock < 20 && product.status !== 'out-of-stock' && (
            <Card className="border-warning bg-warning/5">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-warning" />
                  <div>
                    <p className="font-semibold text-warning">Low Stock Alert</p>
                    <p className="text-sm text-muted-foreground">
                      Only {product.stock} units remaining. Consider restocking soon.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};