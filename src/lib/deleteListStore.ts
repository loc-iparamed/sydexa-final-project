import { create } from 'zustand';
import type { Product } from '@/types/product';

interface DeleteListState {
  deletedProducts: Product[];
  addToDelete: (product: Product) => void;
  removeFromDelete: (id: number) => void;
  clearDeleteList: () => void;
}

export const useDeleteListStore = create<DeleteListState>(set => ({
  deletedProducts: [],
  addToDelete: product => set(state => ({ deletedProducts: [...state.deletedProducts, product] })),
  removeFromDelete: id =>
    set(state => ({ deletedProducts: state.deletedProducts.filter(p => p.id !== id) })),
  clearDeleteList: () => set({ deletedProducts: [] }),
}));
