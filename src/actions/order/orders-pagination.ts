'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedOrdersByUser = async ({ page = 1, take = 5 }: PaginationOptions) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: 'No tiene sessión iniciada',
    };
  }

  if (isNaN(Number(page))) page = 1;
  if (isNaN(Number(take))) take = 12;
  if (page < 1) page = 1;
  if (take === 0) take = 12;

  try {
    // obtener todas las ordernes del usuario
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },

      take: take,
      skip: (page - 1) * take,
    });

    const totalCount = await prisma.order.count({ where: { userId: session.user.id } });
    const totalPages = Math.ceil(totalCount / take);

    return {
      ok: true,
      currentPage: page,
      totalPages: totalPages,
      orders: orders,
    };
  } catch (error) {
    throw new Error('No se pudo cargar las ordenes');
  }
};
