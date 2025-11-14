import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCategories } from '@/lib/api';
import type { CategoryItem } from '@/types/category';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const categories = categoriesData?.categories || [];

  return (
    <Select value={selectedCategory} onValueChange={onCategoryChange}>
      <SelectTrigger className='w-[200px] bg-white rounded-full border-2 border-slate-300 focus:border-blue-500 transition-colors duration-300 shadow-sm hover:shadow-md'>
        <SelectValue placeholder={isLoading ? 'Loading...' : 'Select category'} />
      </SelectTrigger>
      <SelectContent className='bg-white rounded-2xl shadow-lg border border-black/20'>
        <SelectItem className='border-b border-black/20' value='All'>
          All Categories
        </SelectItem>
        {categories.map((category: CategoryItem) => (
          <SelectItem key={category.name} value={category.name}>
            {category.name} ({category.count})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
