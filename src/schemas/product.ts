import { z } from 'zod'

export const productSchema = z.object({
  name: z.string()
    .min(1, 'Product name is required')
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name must be less than 100 characters'),
  
  image: z.string()
    .min(1, 'Image URL is required')
    .url('Please enter a valid URL'),
  
  stock: z.number()
    .min(0, 'Stock cannot be negative')
    .int('Stock must be a whole number'),
  
  price: z.number()
    .min(0, 'Price cannot be negative')
    .max(999999, 'Price is too high'),
  
  category: z.string()
    .min(1, 'Category is required')
    .min(2, 'Category must be at least 2 characters')
    .max(50, 'Category must be less than 50 characters'),
  
  variants: z.array(z.object({
    id: z.string(),
    size: z.string(),
    color: z.string(),
    price: z.number().min(0),
    stock: z.number().min(0).int()
  })).optional()
})

export type ProductFormData = z.infer<typeof productSchema>