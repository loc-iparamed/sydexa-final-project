import React, { useEffect, useRef } from 'react';
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';
import type { ListRowProps } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMemoizedCallback } from '@/hooks/utils';
import type { Product } from '@/types/product';

interface ProductTableProps {
  products: Product[];
  selectedProducts: number[];
  onSelectAll: (checked: boolean) => void;
  onSelectProduct: (productId: number) => void;
  allSelected: boolean;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const ITEM_HEIGHT = 80;

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  selectedProducts,
  onSelectAll,
  onSelectProduct,
  allSelected,
  onEditProduct,
  onDeleteProduct,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) => {
  const listRef = useRef<List>(null);

  // Scroll to top when products array changes (e.g., when searching)
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToPosition(0);
    }
  }, [products]);

  // Auto-fetch more data if we have less than 10 products and more pages available
  useEffect(() => {
    if (products.length < 10 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [products.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const isRowLoaded = useMemoizedCallback(
    ({ index }: { index: number }) => {
      return !!products[index];
    },
    [products.length]
  );

  const loadMoreRows = useMemoizedCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
      return Promise.resolve();
    }
    return Promise.resolve();
  }, [hasNextPage, isFetchingNextPage]);

  const rowRenderer = useMemoizedCallback(
    ({ index, key, style }: ListRowProps) => {
      const product = products[index];

      if (!product) {
        return (
          <div
            key={key}
            style={style}
            className='flex items-center justify-center p-4 border-b border-slate-200'
          >
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600'></div>
            <span className='ml-2 text-slate-600'>Loading more products...</span>
          </div>
        );
      }

      return (
        <div
          key={key}
          style={style}
          className='flex items-center border-b border-slate-200 hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50 transition-colors duration-300 px-6'
        >
          {/* Checkbox */}
          <div className='w-12 shrink-0'>
            <input
              type='checkbox'
              checked={selectedProducts.includes(product.id)}
              onChange={() => onSelectProduct(product.id)}
              className='rounded border-slate-400 focus:ring-blue-500'
            />
          </div>

          {/* Image */}
          <div className='w-20 shrink-0 p-2'>
            <img
              src={product.image}
              alt={product.name}
              className='h-12 w-12 rounded-lg object-cover shadow-sm'
              onError={e => {
                e.currentTarget.src = 'https://via.placeholder.com/48x48?text=No+Image';
              }}
            />
          </div>

          {/* Name */}
          <div className='flex-1 min-w-0 px-4'>
            <div className='font-medium text-slate-800 truncate'>{product.name}</div>
            <div className='text-sm text-slate-500 truncate'>ID: {product.id}</div>
          </div>

          {/* Category */}
          <div className='w-32 shrink-0 px-4'>
            <span className='text-slate-600'>{product.category}</span>
          </div>

          {/* Price */}
          <div className='w-24 shrink-0 px-4'>
            <span className='font-semibold text-green-600'>${product.price.toFixed(2)}</span>
          </div>

          {/* Stock */}
          <div className='w-20 shrink-0 px-4'>
            <span
              className={`text-sm px-2 py-1 rounded-full ${
                product.stock > 10
                  ? 'bg-green-100 text-green-800'
                  : product.stock > 0
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}
            >
              {product.stock}
            </span>
          </div>

          {/* Actions */}
          <div className='w-32 shrink-0 flex gap-2 px-4'>
            <Button
              onClick={() => onEditProduct(product)}
              size='sm'
              className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md'
            >
              <Edit className='w-4 h-4' />
            </Button>
            <Button
              onClick={() => onDeleteProduct(product.id)}
              size='sm'
              variant='destructive'
              className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md'
            >
              <Trash2 className='w-4 h-4' />
            </Button>
          </div>
        </div>
      );
    },
    [products, selectedProducts]
  );

  // Row count includes potential loading row
  const rowCount = hasNextPage ? products.length + 1 : products.length;

  return (
    <div className='rounded-2xl border border-slate-200 overflow-hidden shadow-lg bg-white'>
      {/* Table Header */}
      <div className='bg-linear-to-r from-slate-100 to-slate-200 border-b border-slate-300'>
        <div className='flex items-center h-14 px-6'>
          <div className='w-12 shrink-0'>
            <input
              type='checkbox'
              checked={allSelected}
              onChange={e => onSelectAll(e.target.checked)}
              className='rounded border-slate-400 focus:ring-blue-500'
            />
          </div>
          <div className='w-20 shrink-0 px-2'>
            <span className='font-semibold text-slate-700'>Image</span>
          </div>
          <div className='flex-1 px-4'>
            <span className='font-semibold text-slate-700'>Name</span>
          </div>
          <div className='w-32 shrink-0 px-4'>
            <span className='font-semibold text-slate-700'>Category</span>
          </div>
          <div className='w-24 shrink-0 px-4'>
            <span className='font-semibold text-slate-700'>Price</span>
          </div>
          <div className='w-20 shrink-0 px-4'>
            <span className='font-semibold text-slate-700'>Stock</span>
          </div>
          <div className='w-32 shrink-0 px-4'>
            <span className='font-semibold text-slate-700'>Actions</span>
          </div>
        </div>
      </div>

      {/* Virtualized List with InfiniteLoader */}
      <div className='relative' style={{ height: ITEM_HEIGHT * 15 }}>
        {products.length === 0 && !isFetchingNextPage ? (
          <div className='flex items-center justify-center h-full text-slate-500'>
            <div className='text-center'>
              <div className='text-4xl mb-2'>📦</div>
              <p>No products found</p>
            </div>
          </div>
        ) : (
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={rowCount}
            threshold={5}
          >
            {({ onRowsRendered, registerChild }) => (
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    ref={ref => {
                      listRef.current = ref;
                      if (registerChild) registerChild(ref);
                    }}
                    height={height}
                    width={width}
                    rowCount={rowCount}
                    rowHeight={ITEM_HEIGHT}
                    rowRenderer={rowRenderer}
                    onRowsRendered={onRowsRendered}
                    overscanRowCount={3}
                  />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        )}
      </div>

      {isFetchingNextPage && hasNextPage && products.length > 0 && (
        <div className='flex items-center justify-center p-4 border-t border-slate-200 bg-slate-50'>
          <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2'></div>
          <span className='text-sm text-slate-600'>Loading more products...</span>
        </div>
      )}

      <div className='flex items-center justify-between p-4 border-t border-slate-200 bg-slate-50 text-sm text-slate-600'>
        <span>Showing {products.length} products</span>
        {hasNextPage && <span className='text-blue-600'>Scroll down for more...</span>}
      </div>
    </div>
  );
};

export default ProductTable;
