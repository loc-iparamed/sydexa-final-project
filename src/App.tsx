import { useState, useMemo } from "react"
import { Search, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import StatsCard from "@/components/stats-card"
import ProductTable from "@/components/product-table"
import CategoryFilter from "@/components/category-filter"

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  image: string
  renderTime?: number
}

const mockProducts: Product[] = [
  {
    id: 10,
    name: "Product 10",
    category: "Electronics",
    price: 349.0,
    stock: 52,
    image: "/modern-laptop-workspace.png",
  },
  {
    id: 1000,
    name: "Product 1000",
    category: "Electronics",
    price: 683.0,
    stock: 58,
    image: "/modern-smartphone.png",
  },
  {
    id: 1002,
    name: "Product 1002",
    category: "Electronics",
    price: 694.0,
    stock: 97,
    image: "/modern-tablet-display.png",
  },
  {
    id: 1003,
    name: "Product 1003",
    category: "Electronics",
    price: 287.0,
    stock: 99,
    image: "/computer-monitor.png",
  },
  {
    id: 1004,
    name: "Product 1004",
    category: "Electronics",
    price: 459.0,
    stock: 42,
    image: "/diverse-people-listening-headphones.png",
  },
  {
    id: 1005,
    name: "Product 1005",
    category: "Electronics",
    price: 129.0,
    stock: 156,
    image: "/mechanical-keyboard.png",
  },
]

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.id.toString().includes(searchTerm)
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const stats = {
    totalProducts: mockProducts.length,
    renderTime: "303ms",
    visibleItems: filteredProducts.length,
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((p) => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
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
            <button className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Products
            </button>
            {/* <button className="text-white/80 hover:text-white transition-colors duration-200 font-medium">Trash</button> */}
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
          <Button className="gap-2 bg-linear-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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
            <Button variant="destructive" onClick={() => setSelectedProducts([])} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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
          />
        </div>
      </main>
    </div>
  )
}

export default App
