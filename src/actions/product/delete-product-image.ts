'use server';

import cloudinary from '@/lib/cloudinary';
import prisma from '@/lib/prisma';

import { revalidatePath } from 'next/cache';

export async function deleteProductImage(imageId: number, imageUrl: string) {
  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      message: 'No se puede borrar imagenes del file system',
    };
  }

  const imageName = imageUrl.split('/').at(-1)?.split('.').at(0);

  try {
    await cloudinary.uploader.destroy(`product-images/${imageName}`);
    const deleteImage = await prisma.productImage.delete({
      where: { id: imageId },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    // Revalidar los paths
    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${deleteImage.product.slug}`);
    revalidatePath(`/product/${deleteImage.product.slug}`);

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo eliminar la imagen',
    };
  }
};
