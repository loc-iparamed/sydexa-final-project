import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteProduct } from '@/lib/api';
import { useDeleteListStore } from '@/lib/deleteListStore';
import { useMemoizedCallback } from '@/hooks/utils';

export const useTrash = () => {
  const { deletedProducts, removeFromDelete, clearDeleteList } = useDeleteListStore();

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success('Product permanently deleted');
    },
    onError: () => {
      toast.error('Failed to delete product');
    },
  });

  const handleRestoreProduct = useMemoizedCallback(
    (id: number) => {
      removeFromDelete(id);
      toast.success('Product restored');
    },
    [removeFromDelete]
  );

  const handlePermanentDelete = useMemoizedCallback(
    (id: number) => {
      if (window.confirm('Are you sure you want to permanently delete this product?')) {
        deleteMutation.mutate(id);
        removeFromDelete(id);
      }
    },
    [deleteMutation.mutate, removeFromDelete]
  );

  const stats = {
    deletedProducts: deletedProducts.length,
    totalVariants: deletedProducts.reduce((sum, p) => sum + (p.variants?.length || 0), 0),
    storageUsed: `${deletedProducts.length * 0.5} KB`,
  };

  return {
    deletedProducts,
    stats,
    handleRestoreProduct,
    handlePermanentDelete,
    clearDeleteList,
  };
};
