'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import type { Category, Gender, Product, ProductImage } from '@/interfaces';
import { createUpdateProduct, deleteProductImage } from '@/actions';
import { FormInput, ProductImage as ProductImg } from '@/components';

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImage[] };
  categories: Category[];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

type FormInputs = {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: Gender;
  categoryId: string;
  images?: FileList;
};

export const ProductForm = ({ product, categories }: Props) => {
  const [isSaving, setIsSaving] = useState(false);
  const [imageIdToDelete, setImageIdToDelete] = useState<number | null>(null);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { isValid, errors },
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product?.tags?.join(', '),
      sizes: product?.sizes ?? [],
      images: undefined,
    },
  });

  watch('sizes');

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues('sizes'));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue('sizes', Array.from(sizes));
  };

  const onDeleteImage = async (imageId: number, imageUrl: string) => {
    setImageIdToDelete(imageId);
    const { ok, message } = await deleteProductImage(imageId, imageUrl);

    if (!ok) {
      alert(message);
    }

    setImageIdToDelete(null);
  };

  const onSubmit = async (data: FormInputs) => {
    setIsSaving(true);

    const formData = new FormData();

    const { images, ...productToSave } = data;
    if (product.id) {
      formData.append('id', product.id);
    }

    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('categoryId', productToSave.categoryId);
    formData.append('gender', productToSave.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }
    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      alert('Producto no se pudo actualizar ');
      return;
    }
    setValue('images', undefined);

    setIsSaving(false);
    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid p-5 mb-16 grid-cols-1 sm:p-5 sm:grid-cols-2 gap-3 bg-white rounded-md shadow-md"
    >
      {/* Textos */}
      <div className="w-full">
        <FormInput
          label="Título"
          type="text"
          errors={errors['title']}
          {...register('title', { required: true })}
        />
        <FormInput
          label="Slug"
          type="text"
          errors={errors['slug']}
          {...register('slug', { required: true })}
        />
        <FormInput
          label="inStock"
          type="number"
          errors={errors['inStock']}
          {...register('inStock', { required: true })}
        />

        <div className="flex flex-col">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="px-5 py-2 border bg-gray-200 rounded mb-2"
            {...register('description', { required: true })}
          />
        </div>
        <FormInput
          label="Price"
          type="number"
          errors={errors['price']}
          {...register('price', { required: true, min: 0 })}
        />
        <FormInput
          label="Tags"
          type="text"
          errors={errors['tags']}
          {...register('tags', { required: true })}
        />

        <div className="flex flex-col">
          <span>Gender</span>
          <select
            className="px-5 py-2 border bg-gray-200 rounded mb-2"
            {...register('gender', { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col">
          <span>Categoria</span>
          <select
            className="px-5 py-2 border bg-gray-200 rounded mb-2"
            {...register('categoryId', { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={clsx('w-full mt-5', {
            'btn-primary': isValid || !isSaving,
            'btn-disabled': !isValid || isSaving,
          })}
          disabled={!isValid || isSaving}
        >
          {isSaving ? 'Guardando...' : 'Guardar'}
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <FormInput
          label="inStock"
          type="number"
          errors={errors['inStock']}
          {...register('inStock', { required: true })}
        />

        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => onSizeChanged(size)}
                className={clsx(
                  'p-2 border cursor-pointer rounded-md mr-2 mb-2 w-14 transition-all text-center',
                  {
                    'bg-blue-500 text-white': getValues('sizes').includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              {...register('images')}
              multiple
              className={clsx('p-2 border rounded-md bg-gray-200', {
                'border-red-500': errors['images'],
              })}
              accept="image/png, image/jpeg, image/avif"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product?.ProductImage?.map((image) => (
              <div key={image.id}>
                <ProductImg
                  alt={product.title ?? ''}
                  src={image.url}
                  width={200}
                  height={200}
                  className="rounded-t shadow-md object-cover w-full"
                />

                <button
                  type="button"
                  disabled={!!imageIdToDelete}
                  className="btn-danger rounded-b-xl w-full"
                  onClick={() => onDeleteImage(image.id, image.url)}
                >
                  {imageIdToDelete === image.id ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
