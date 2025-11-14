export interface Category {
  total: number;
  categories: CategoryItem[];
}

export interface CategoryItem {
  count: number;
  name: string;
}
