'use server';

import prisma from '@/lib/prisma';
import { Gender } from '@prisma/client';

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}
export async function getPaginatedProductsWithImages({ page = 1, take = 12, gender }: PaginationOptions) {
  if (isNaN(Number(page))) page = 1;
  if (isNaN(Number(take))) take = 12;
  if (page < 1) page = 1;
  if (take === 0) take = 12;

  try {
    // 1. Obtener todos los productos
    const products = await prisma.product.findMany({
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      skip: (page - 1) * take,
      take: 12,
      where: {
        gender: gender,
      },
    });

    // 2. Obtener el total de paginas
    // todo:


    const totalCount = await prisma.product.count({ where: { gender: gender } });
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error('No se pudo cargar los productos');
  }
};
