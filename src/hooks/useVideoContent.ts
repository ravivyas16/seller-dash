import { useState, useEffect, useCallback } from 'react';
import { VideoContent, ApiError } from '@/types';
import { apiService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface UseVideoContentReturn {
  videoContent: VideoContent[];
  loading: boolean;
  error: string | null;
  addVideoContent: (video: Omit<VideoContent, 'id' | '_id' | 'createdAt'>) => Promise<void>;
  updateVideoContent: (id: string, video: Partial<VideoContent>) => Promise<void>;
  deleteVideoContent: (id: string) => Promise<void>;
  refreshVideoContent: () => Promise<void>;
  getVideosByProduct: (productId: string) => VideoContent[];
}

export const useVideoContent = (): UseVideoContentReturn => {
  const [videoContent, setVideoContent] = useState<VideoContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchVideoContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For development: use mock data if API is not available
      try {
        const response = await apiService.getVideoContent();
        if (response.success && response.data) {
          setVideoContent(response.data);
        }
      } catch (apiError) {
        // Fallback to mock data for development
        const { initialVideoContent } = await import('@/data/mockData');
        setVideoContent(initialVideoContent);
        console.warn('API not available, using mock data:', apiError);
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch video content';
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

  const addVideoContent = useCallback(async (videoData: Omit<VideoContent, 'id' | '_id' | 'createdAt'>) => {
    try {
      try {
        const response = await apiService.createVideoContent(videoData);
        if (response.success && response.data) {
          setVideoContent(prev => [...prev, response.data!]);
          toast({
            title: 'Video Content Added',
            description: `${videoData.title} has been added.`,
          });
        }
      } catch (apiError) {
        // Fallback for development
        const newVideo: VideoContent = {
          ...videoData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        
        setVideoContent(prev => [...prev, newVideo]);
        toast({
          title: 'Video Content Added (Local)',
          description: `${videoData.title} added locally. Connect to backend to persist.`,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to add video content';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [toast]);

  const updateVideoContent = useCallback(async (id: string, videoData: Partial<VideoContent>) => {
    try {
      try {
        const response = await apiService.updateVideoContent(id, videoData);
        if (response.success && response.data) {
          setVideoContent(prev => prev.map(v => v.id === id ? response.data! : v));
          toast({
            title: 'Video Content Updated',
            description: 'Video content has been successfully updated.',
          });
        }
      } catch (apiError) {
        // Fallback for development
        setVideoContent(prev => prev.map(v => v.id === id ? { ...v, ...videoData } : v));
        toast({
          title: 'Video Content Updated (Local)',
          description: 'Video content updated locally. Connect to backend to persist.',
        });
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to update video content';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [toast]);

  const deleteVideoContent = useCallback(async (id: string) => {
    try {
      const video = videoContent.find(v => v.id === id);
      
      try {
        await apiService.deleteVideoContent(id);
        setVideoContent(prev => prev.filter(v => v.id !== id));
        toast({
          title: 'Content Deleted',
          description: `${video?.title} has been removed.`,
          variant: 'destructive',
        });
      } catch (apiError) {
        // Fallback for development
        setVideoContent(prev => prev.filter(v => v.id !== id));
        toast({
          title: 'Content Deleted (Local)',
          description: `${video?.title} removed locally. Connect to backend to persist.`,
          variant: 'destructive',
        });
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to delete video content';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [videoContent, toast]);

  const refreshVideoContent = useCallback(async () => {
    await fetchVideoContent();
  }, [fetchVideoContent]);

  const getVideosByProduct = useCallback((productId: string): VideoContent[] => {
    return videoContent.filter(video => video.productId === productId);
  }, [videoContent]);

  useEffect(() => {
    fetchVideoContent();
  }, [fetchVideoContent]);

  return {
    videoContent,
    loading,
    error,
    addVideoContent,
    updateVideoContent,
    deleteVideoContent,
    refreshVideoContent,
    getVideosByProduct,
  };
};