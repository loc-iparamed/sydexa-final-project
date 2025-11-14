import { useState, useMemo, useEffect } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getProducts, createProducts, updateProduct } from '@/lib/api';
import { useDeleteListStore } from '@/lib/deleteListStore';
import { useDebounce, useToggle, useMemoizedCallback } from '@/hooks/utils';
import type { Product, ProductsResponse } from '@/types/product';
import type { ProductFormData } from '@/schemas/product';

export const useProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const {
    value: isModalOpen,
    toggle: toggleModal,
    setTrue: openModal,
    setFalse: closeModal,
  } = useToggle(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { deletedProducts, addToDelete } = useDeleteListStore();
  const queryClient = useQueryClient();

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['products'],
      queryFn: ({ pageParam = 1 }) => getProducts(pageParam as number),
      getNextPageParam: (lastPage: ProductsResponse, allPages: ProductsResponse[]) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage.total_pages ? nextPage : undefined;
      },
      initialPageParam: 1,
      staleTime: 5 * 60 * 1000,
      retry: 2,
    });

  const createMutation = useMutation({
    mutationFn: createProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      closeModal();
      toast.success('Product created successfully');
    },
    onError: () => {
      toast.error('Failed to create product');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      closeModal();
      setEditingProduct(null);
      toast.success('Product updated successfully');
    },
    onError: () => {
      toast.error('Failed to update product');
    },
  });

  const allProducts = useMemo(() => {
    return data?.pages?.flatMap(page => page.data) || [];
  }, [data?.pages]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product: Product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.id.toString().includes(debouncedSearchTerm);
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const notDeleted = !deletedProducts.some(deleted => deleted.id === product.id);
      return matchesSearch && matchesCategory && notDeleted;
    });
  }, [debouncedSearchTerm, selectedCategory, allProducts, deletedProducts]);

  // Auto-fetch more data when searching and we don't have enough results
  useEffect(() => {
    if (searchTerm && filteredProducts.length < 50 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [searchTerm, filteredProducts.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const stats = {
    totalProducts: data?.pages?.[0]?.total || 0,
    renderTime: 'N/A',
    visibleItems: filteredProducts.length,
  };

  const handleSelectAll = useMemoizedCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedProducts(filteredProducts.map((p: Product) => p.id));
      } else {
        setSelectedProducts([]);
      }
    },
    [filteredProducts]
  );

  const handleSelectProduct = useMemoizedCallback((productId: number) => {
    setSelectedProducts(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }, []);

  const handleAddProduct = useMemoizedCallback(() => {
    setEditingProduct(null);
    openModal();
  }, [openModal]);

  const handleEditProduct = useMemoizedCallback(
    (product: Product) => {
      setEditingProduct(product);
      openModal();
    },
    [openModal]
  );

  const handleDeleteProduct = (productId: number) => {
    const product = allProducts.find((p: Product) => p.id === productId);
    if (product) {
      addToDelete(product);
      toast.success('Product moved to trash');
    }
  };

  const handleSaveProduct = (productData: ProductFormData) => {
    const product = { ...productData, variants: productData.variants || [] } as Product;
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data: product });
    } else {
      createMutation.mutate([product]);
    }
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return;
    selectedProducts.forEach(id => {
      const product = allProducts.find((p: Product) => p.id === id);
      if (product) addToDelete(product);
    });
    setSelectedProducts([]);
    toast.success(`${selectedProducts.length} products moved to trash`);
  };

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedProducts,
    setSelectedProducts,
    isModalOpen,
    openModal,
    closeModal,
    toggleModal,
    editingProduct,
    setEditingProduct,

    data,
    allProducts,
    filteredProducts,
    stats,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,

    handleSelectAll,
    handleSelectProduct,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleSaveProduct,
    handleBulkDelete,
  };
};
