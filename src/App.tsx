import ProductsTab from '@/components/tabs/ProductsTab';
import TrashTab from '@/components/tabs/TrashTab';
import { useProducts } from '@/hooks/useProducts';
import { useTrash } from '@/hooks/useTrash';
import { useChangeTabs } from '@/hooks/utils';

function App() {
  const [currentTab, setCurrentTab] = useChangeTabs<'products' | 'trash'>(
    'currentTab',
    'products'
  );

  const productsHook = useProducts();
  const trashHook = useTrash();

  if (productsHook.isLoading) {
    return (
      <div className='min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-lg text-slate-600'>Loading products...</p>
        </div>
      </div>
    );
  }

  if (productsHook.error) {
    return (
      <div className='min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-red-500 text-6xl mb-4'>⚠️</div>
          <p className='text-xl text-red-600'>Error fetching data</p>
          <p className='text-slate-600 mt-2'>Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100'>
      <header className='border-b border-border bg-linear-to-r from-blue-600 to-purple-600 shadow-lg'>
        <div className='flex items-center gap-8 px-6 py-4'>
          <div className='flex items-center gap-2'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-600 font-bold text-lg shadow-md transform hover:scale-110 transition-transform duration-300'>
              LOC
            </div>
            <span className='font-semibold text-white text-lg'>Admin</span>
          </div>
          <nav className='flex gap-6'>
            <button
              onClick={() => setCurrentTab('products')}
              className={`transition-colors duration-200 font-medium ${currentTab === 'products' ? 'bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-medium shadow-md' : 'text-white/80 hover:text-white'}`}
            >
              Products
            </button>
            <button
              onClick={() => setCurrentTab('trash')}
              className={`transition-colors duration-200 font-medium ${currentTab === 'trash' ? 'bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-medium shadow-md' : 'text-white/80 hover:text-white'}`}
            >
              Trash
            </button>
          </nav>
          <div className='ml-auto flex items-center gap-4'>
            <button className='text-white/80 hover:text-white transition-colors duration-200 text-xl'>
              👤
            </button>
            <button className='text-white/80 hover:text-white transition-colors duration-200 text-xl'>
              ⚙️
            </button>
          </div>
        </div>
      </header>

      {currentTab === 'products' ? <ProductsTab {...productsHook} /> : <TrashTab {...trashHook} />}
    </div>
  );
}

export default App;
