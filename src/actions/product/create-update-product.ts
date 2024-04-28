'use server';

import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import cloudinary from '@/lib/cloudinary';
import prisma from '@/lib/prisma';

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    return { ok: false };
  }

  const productData = productParsed.data;
  productData.slug = productData.slug.toLowerCase().replace(/ /g, '-').trim();

  const { id, ...restProductData } = productData;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = restProductData.tags.split(',').map((tag) => tag.trim().toLowerCase());
      const sizesArray = restProductData.sizes as Size[];

      if (id) {
        // Actualizar un Producto
        product = await tx.product.update({
          where: { id },
          data: {
            ...restProductData,
            sizes: {
              set: sizesArray,
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        // Crear un Producto

        product = await tx.product.create({
          data: {
            ...restProductData,
            sizes: {
              set: sizesArray,
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      // Proceso de carga y guardado de imagenes
      // Recorrer las images y guardarlas

      if (formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[]);

        if (!images) {
          throw new Error('No se pudo cargar las imágenes, rollingback');
        }

        await tx.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        });
      }

      return {
        product,
      };
    });

    // Todo: RevalidatePaths
    revalidatePath('/admin/products');
    revalidatePath(`/admin/product${productData.slug}`);
    revalidatePath(`/product${productData.slug}`);

    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Revisar los logs, no se pudo actualizar o crear',
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`, {
            folder: 'product-images',
            resource_type: 'image',
          })
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const oploadedImages = await Promise.all(uploadPromises);
    return oploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
