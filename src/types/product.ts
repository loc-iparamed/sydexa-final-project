export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  price: number;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  stock: number;
  price: number;
  category: string;
  variants: ProductVariant[];
}

export interface ProductsResponse {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  data: Product[];
}

export interface DeleteProductResponse {
  message: string;
  deleted_product: Product;
}
