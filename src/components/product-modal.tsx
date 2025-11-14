import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FormField from '@/components/ui/form-field';
import { productSchema, type ProductFormData } from '@/schemas/product';
import type { Product } from '@/types/product';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: ProductFormData) => void;
  product?: Product | null;
  title: string;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, product, title }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    control,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      image: '',
      stock: 0,
      price: 0,
      category: '',
      variants: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  });

  useEffect(() => {
    if (isOpen && product) {
      setValue('name', product.name);
      setValue('image', product.image);
      setValue('stock', product.stock);
      setValue('price', product.price);
      setValue('category', product.category);
      setValue('variants', product.variants || []);
    } else if (isOpen && !product) {
      reset({
        name: '',
        image: '',
        stock: 0,
        price: 0,
        category: '',
        variants: [],
      });
    }
  }, [isOpen, product, setValue, reset]);

  const onSubmit = (data: ProductFormData) => {
    onSave(data);
    onClose();
    reset();
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto'>
        <div className='p-6'>
          <h2 className='text-2xl font-bold text-slate-800 mb-6'>{title}</h2>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField label='Name' required error={errors.name?.message}>
                <Input
                  {...register('name')}
                  className={`w-full ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder='Enter product name'
                />
              </FormField>

              <FormField label='Category' required error={errors.category?.message}>
                <Input
                  {...register('category')}
                  className={`w-full ${errors.category ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder='Enter category'
                />
              </FormField>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <FormField label='Price' required error={errors.price?.message}>
                <Input
                  {...register('price', { valueAsNumber: true })}
                  type='number'
                  step='0.01'
                  min='0'
                  className={`w-full ${errors.price ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder='0.00'
                />
              </FormField>

              <FormField label='Stock' required error={errors.stock?.message}>
                <Input
                  {...register('stock', { valueAsNumber: true })}
                  type='number'
                  min='0'
                  className={`w-full ${errors.stock ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder='0'
                />
              </FormField>
            </div>

            <FormField label='Image URL' required error={errors.image?.message}>
              <Input
                {...register('image')}
                type='url'
                className={`w-full ${errors.image ? 'border-red-500 focus:border-red-500' : ''}`}
                placeholder='https://example.com/image.jpg'
              />
            </FormField>

            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-slate-800'>Variants</h3>
              {fields.map((field, index) => (
                <div key={field.id} className='border border-slate-200 rounded-lg p-4 space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField label='Size' error={errors.variants?.[index]?.size?.message}>
                      <Input {...register(`variants.${index}.size`)} placeholder='Enter size' />
                    </FormField>
                    <FormField label='Color' error={errors.variants?.[index]?.color?.message}>
                      <Input {...register(`variants.${index}.color`)} placeholder='Enter color' />
                    </FormField>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField label='Price' error={errors.variants?.[index]?.price?.message}>
                      <Input
                        {...register(`variants.${index}.price`, { valueAsNumber: true })}
                        type='number'
                        step='0.01'
                        min='0'
                        placeholder='0.00'
                      />
                    </FormField>
                    <FormField label='Stock' error={errors.variants?.[index]?.stock?.message}>
                      <Input
                        {...register(`variants.${index}.stock`, { valueAsNumber: true })}
                        type='number'
                        min='0'
                        placeholder='0'
                      />
                    </FormField>
                  </div>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => remove(index)}
                    className='w-full'
                  >
                    Remove Variant
                  </Button>
                </div>
              ))}
              <Button
                type='button'
                variant='outline'
                onClick={() =>
                  append({ id: Date.now().toString(), size: '', color: '', price: 0, stock: 0 })
                }
                className='w-full'
              >
                Add Variant
              </Button>
            </div>

            <div className='flex justify-end gap-3 pt-4 border-t border-slate-200'>
              <Button type='button' variant='outline' onClick={handleClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                type='submit'
                className='bg-blue-600 hover:bg-blue-700 text-white'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
