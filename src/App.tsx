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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="flex items-center gap-8 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-sm">
              AD
            </div>
            <span className="font-semibold">Admin</span>
          </div>
          <nav className="flex gap-6">
            <button className="text-muted-foreground hover:text-foreground transition-colors">Admin</button>
            <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium">
              Products
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">Trash</button>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground">👤</button>
            <button className="text-muted-foreground hover:text-foreground">⚙️</button>
          </div>
        </div>
      </header>

      <main className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatsCard title="Total Products" value={stats.totalProducts} />
          <StatsCard title="Render Time" value={stats.renderTime} />
          <StatsCard title="Visible Items" value={stats.visibleItems} />
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          {selectedProducts.length > 0 && (
            <Button variant="destructive" onClick={() => setSelectedProducts([])}>
              <Trash2 className="w-4 h-4" />
              Delete ({selectedProducts.length})
            </Button>
          )}
        </div>

        <ProductTable
          products={filteredProducts}
          selectedProducts={selectedProducts}
          onSelectAll={handleSelectAll}
          onSelectProduct={handleSelectProduct}
          allSelected={filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length}
        />
      </main>
    </div>
  )
}

export default App
