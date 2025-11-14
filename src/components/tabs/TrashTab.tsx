import { RotateCcw, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/stats-card';
import type { Product } from '@/types/product';

interface TrashTabProps {
  deletedProducts: Product[];
  stats: {
    deletedProducts: number;
    totalVariants: number;
    storageUsed: string;
  };
  handleRestoreProduct: (id: number) => void;
  handlePermanentDelete: (id: number) => void;
  clearDeleteList: () => void;
}

const TrashTab = ({
  deletedProducts,
  stats,
  handleRestoreProduct,
  handlePermanentDelete,
  clearDeleteList,
}: TrashTabProps) => {
  return (
    <main className='p-8 bg-linear-to-br from-slate-50 via-white to-slate-100'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-4xl font-bold mb-2 bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent'>
            Trash
          </h1>
          <p className='text-muted-foreground text-lg'>
            Manage deleted products - restore or permanently delete
          </p>
        </div>
        {deletedProducts.length > 0 && (
          <Button
            onClick={clearDeleteList}
            variant='outline'
            className='gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
          >
            <Trash className='w-5 h-5' />
            Clear All Trash
          </Button>
        )}
      </div>

      <div className='grid grid-cols-3 gap-6 mb-8'>
        <StatsCard title='Deleted Products' value={stats.deletedProducts} />
        <StatsCard title='Total Variants' value={stats.totalVariants} />
        <StatsCard title='Storage Used' value={stats.storageUsed} />
      </div>

      <div className='bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden'>
        {deletedProducts.length === 0 ? (
          <div className='p-12 text-center'>
            <div className='text-slate-300 text-6xl mb-4'>🗑️</div>
            <h3 className='text-xl font-semibold text-slate-600 mb-2'>Trash is empty</h3>
            <p className='text-slate-500'>Deleted products will appear here</p>
          </div>
        ) : (
          <div className='p-6'>
            <div className='space-y-4'>
              {deletedProducts.map(product => (
                <div
                  key={product.id}
                  className='border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-4 mb-4'>
                        <img
                          src={product.image}
                          alt={product.name}
                          className='w-16 h-16 object-cover rounded-lg border border-slate-200'
                          onError={e => {
                            e.currentTarget.src = 'https://via.placeholder.com/64x64?text=No+Image';
                          }}
                        />
                        <div>
                          <h3 className='text-lg font-semibold text-slate-800'>{product.name}</h3>
                          <p className='text-sm text-slate-600'>Category: {product.category}</p>
                          <p className='text-sm text-slate-600'>
                            Price: ${product.price} | Stock: {product.stock}
                          </p>
                        </div>
                      </div>

                      {product.variants && product.variants.length > 0 && (
                        <div className='mb-4'>
                          <h4 className='text-sm font-medium text-slate-700 mb-2'>
                            Variants ({product.variants.length}):
                          </h4>
                          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                            {product.variants.map(variant => (
                              <div
                                key={variant.id}
                                className='bg-slate-50 border border-slate-200 rounded p-2 text-xs'
                              >
                                <div className='font-medium'>
                                  {variant.size} - {variant.color}
                                </div>
                                <div className='text-slate-600'>
                                  ${variant.price} | Stock: {variant.stock}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className='flex flex-col gap-2 ml-4'>
                      <Button
                        onClick={() => handleRestoreProduct(product.id)}
                        variant='outline'
                        className='gap-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300'
                      >
                        <RotateCcw className='w-4 h-4' />
                        Restore
                      </Button>
                      <Button
                        onClick={() => handlePermanentDelete(product.id)}
                        variant='destructive'
                        className='gap-2 bg-red-500 hover:bg-red-600 transition-all duration-300'
                      >
                        <Trash className='w-4 h-4' />
                        Delete Forever
                      </Button>
                    </div>
                  </div>

                  <div className='text-xs text-slate-400 mt-4 pt-4 border-t border-slate-100'>
                    Product ID: {product.id} | Deleted: Just now
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default TrashTab;
