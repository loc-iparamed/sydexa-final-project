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
    <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
      <table className="w-full">
        <thead className="bg-linear-to-r from-slate-100 to-slate-200">
          <tr className="border-b border-slate-300">
            <th className="h-14 px-6 text-left align-middle font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded border-slate-400 focus:ring-blue-500"
              />
            </th>
            <th className="h-14 px-6 text-left align-middle font-semibold text-slate-700">Image</th>
            <th className="h-14 px-6 text-left align-middle font-semibold text-slate-700">Name</th>
            <th className="h-14 px-6 text-left align-middle font-semibold text-slate-700">Category</th>
            <th className="h-14 px-6 text-left align-middle font-semibold text-slate-700">Price</th>
            <th className="h-14 px-6 text-left align-middle font-semibold text-slate-700">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-slate-200 hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50 transition-colors duration-300">
              <td className="p-6 align-middle">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => onSelectProduct(product.id)}
                  className="rounded border-slate-400 focus:ring-blue-500"
                />
              </td>
              <td className="p-6 align-middle">
                <img src={product.image} alt={product.name} className="h-12 w-12 rounded-lg object-cover shadow-sm" />
              </td>
              <td className="p-6 align-middle font-medium text-slate-800">{product.name}</td>
              <td className="p-6 align-middle text-slate-600">{product.category}</td>
              <td className="p-6 align-middle font-semibold text-green-600">${product.price.toFixed(2)}</td>
              <td className="p-6 align-middle text-slate-700">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable