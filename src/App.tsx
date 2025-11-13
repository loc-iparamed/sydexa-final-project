import { useState, useMemo } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Search, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import StatsCard from "@/components/stats-card"
import ProductTable from "@/components/product-table"
import CategoryFilter from "@/components/category-filter"
import ProductModal from "@/components/product-modal"
import { getProducts, deleteProduct, createProducts, updateProduct } from "@/lib/api"
import type { Product } from "@/types/product"
import type { ProductFormData } from "@/schemas/product"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      setSelectedProducts([])
      toast.success("Product deleted successfully")
    },
    onError: () => {
      toast.error("Failed to delete product")
    },
  })

  const createMutation = useMutation({
    mutationFn: createProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      setIsModalOpen(false)
      toast.success("Product created successfully")
    },
    onError: () => {
      toast.error("Failed to create product")
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      setIsModalOpen(false)
      setEditingProduct(null)
      toast.success("Product updated successfully")
    },
    onError: () => {
      toast.error("Failed to update product")
    },
  })

  const filteredProducts = useMemo(() => {
    const products = data?.data || []
    return products.filter((product: Product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.id.toString().includes(searchTerm)
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, data?.data])

  const stats = {
    totalProducts: data?.total || 0,
    renderTime: "N/A",
    visibleItems: filteredProducts.length,
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((p: Product) => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(productId)
    }
  }

  const handleSaveProduct = (productData: ProductFormData) => {
    const product = { ...productData, variants: productData.variants || [] } as Product
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data: product })
    } else {
      createMutation.mutate([product])
    }
  }

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      // Delete multiple products
      selectedProducts.forEach(id => deleteMutation.mutate(id))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-slate-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-xl text-red-600">Error fetching data</p>
          <p className="text-slate-600 mt-2">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      <header className="border-b border-border bg-linear-to-r from-blue-600 to-purple-600 shadow-lg">
        <div className="flex items-center gap-8 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 font-bold text-lg shadow-md transform hover:scale-110 transition-transform duration-300">
              AD
            </div>
            <span className="font-semibold text-white text-lg">Admin</span>
          </div>
          <nav className="flex gap-6">
            <button className="text-white/80 hover:text-white transition-colors duration-200 font-medium">Admin</button>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Products
            </button>
            <button className="text-white/80 hover:text-white transition-colors duration-200 font-medium">Trash</button>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <button className="text-white/80 hover:text-white transition-colors duration-200 text-xl">👤</button>
            <button className="text-white/80 hover:text-white transition-colors duration-200 text-xl">⚙️</button>
          </div>
        </div>
      </header>

      <main className="p-8 bg-linear-to-br from-slate-50 via-white to-slate-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Products</h1>
            <p className="text-muted-foreground text-lg">Manage your product catalog with ease</p>
          </div>
          <Button className="gap-2 bg-linear-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" onClick={handleAddProduct}>
            <Plus className="w-5 h-5" />
            Add Product
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <StatsCard title="Total Products" value={stats.totalProducts} />
          <StatsCard title="Render Time" value={stats.renderTime} />
          <StatsCard title="Visible Items" value={stats.visibleItems} />
        </div>

        <div className="flex items-center gap-4 mb-6 bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-3 rounded-full border-2 border-slate-300 focus:border-blue-500 transition-colors duration-300 shadow-sm"
            />
          </div>
          <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          {selectedProducts.length > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Trash2 className="w-5 h-5" />
              Delete ({selectedProducts.length})
            </Button>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <ProductTable
            products={filteredProducts}
            selectedProducts={selectedProducts}
            onSelectAll={handleSelectAll}
            onSelectProduct={handleSelectProduct}
            allSelected={filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <Button 
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
            disabled={page === 1}
            className="px-4 py-2 rounded-full bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </Button>
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
            Page {page} of {data?.total_pages || 1}
          </span>
          <Button 
            onClick={() => setPage((prev) => prev + 1)} 
            disabled={page === (data?.total_pages || 1)}
            className="px-4 py-2 rounded-full bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      </main>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
        title={editingProduct ? "Edit Product" : "Add New Product"}
      />
    </div>
  )
}

export default App
