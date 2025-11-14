import { Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductTable from '@/components/product-table';
import CategoryFilter from '@/components/category-filter';
import ProductModal from '@/components/product-modal';
import SearchInput from '@/components/search-input';
import type { Product } from '@/types/product';
import type { ProductFormData } from '@/schemas/product';

interface ProductsTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedProducts: number[];
  isModalOpen: boolean;
  closeModal: () => void;
  editingProduct: Product | null;
  filteredProducts: Product[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  handleSelectAll: (checked: boolean) => void;
  handleSelectProduct: (productId: number) => void;
  handleAddProduct: () => void;
  handleEditProduct: (product: Product) => void;
  handleDeleteProduct: (productId: number) => void;
  handleSaveProduct: (productData: ProductFormData) => void;
  handleBulkDelete: () => void;
}

const ProductsTab = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedProducts,
  isModalOpen,
  closeModal,
  editingProduct,
  filteredProducts,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  handleSelectAll,
  handleSelectProduct,
  handleAddProduct,
  handleEditProduct,
  handleDeleteProduct,
  handleSaveProduct,
  handleBulkDelete,
}: ProductsTabProps) => {
  return (
    <>
      <main className='p-8 bg-linear-to-br from-slate-50 via-white to-slate-100'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-4xl font-bold mb-2 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Products
            </h1>
            <p className='text-muted-foreground text-lg'>Manage your product catalog with ease</p>
          </div>
          <Button
            className='gap-2 bg-linear-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
            onClick={handleAddProduct}
          >
            <Plus className='w-5 h-5' />
            Add Product
          </Button>
        </div>

        <div className='flex items-center gap-4 mb-6 bg-white p-6 rounded-2xl shadow-lg border border-slate-200'>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder='Search products...'
            className='flex-1'
          />
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          {selectedProducts.length > 0 && (
            <Button
              variant='destructive'
              onClick={handleBulkDelete}
              className='bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
            >
              <Trash2 className='w-5 h-5' />
              Delete ({selectedProducts.length})
            </Button>
          )}
        </div>

        <ProductTable
          products={filteredProducts}
          selectedProducts={selectedProducts}
          onSelectAll={handleSelectAll}
          onSelectProduct={handleSelectProduct}
          allSelected={
            filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length
          }
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </main>

      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveProduct}
        product={editingProduct}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      />
    </>
  );
};

export default ProductsTab;
