import axios from 'axios';
import type { ProductsResponse, Product, DeleteProductResponse } from '@/types/product';
import type { Category } from '@/types/category';

const apiClient = axios.create({
  baseURL: 'https://demo.sydexa.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async (page = 1, limit = 20): Promise<ProductsResponse> => {
  const response = await apiClient.get(`/products?page=${page}&limit=${limit}`);
  return response.data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const createProducts = async (products: Product[]): Promise<ProductsResponse> => {
  const response = await apiClient.post(`/products/`, { products });
  return response.data;
};

export const updateProduct = async (
  id: number,
  productData: Partial<Product>
): Promise<Product> => {
  const response = await apiClient.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<DeleteProductResponse> => {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
};

export const getCategories = async (): Promise<Category> => {
  const response = await apiClient.get(`/categories`);
  return response.data.categories;
};

export default apiClient;
