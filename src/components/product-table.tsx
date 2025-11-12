import React from 'react'

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  image: string
  renderTime?: number
}

interface ProductTableProps {
  products: Product[]
  selectedProducts: number[]
  onSelectAll: (checked: boolean) => void
  onSelectProduct: (productId: number) => void
  allSelected: boolean
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  selectedProducts,
  onSelectAll,
  onSelectProduct,
  allSelected,
}) => {
  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded border-gray-300"
              />
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Image</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-muted/50">
              <td className="p-4 align-middle">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => onSelectProduct(product.id)}
                  className="rounded border-gray-300"
                />
              </td>
              <td className="p-4 align-middle">
                <img src={product.image} alt={product.name} className="h-10 w-10 rounded object-cover" />
              </td>
              <td className="p-4 align-middle font-medium">{product.name}</td>
              <td className="p-4 align-middle text-muted-foreground">{product.category}</td>
              <td className="p-4 align-middle">${product.price.toFixed(2)}</td>
              <td className="p-4 align-middle">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable