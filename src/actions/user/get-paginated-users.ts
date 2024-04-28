'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedUsers = async ({ page = 1, take = 5 }: PaginationOptions) => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Debe ser un usuario administrador',
    };
  }

  if (isNaN(Number(page))) page = 1;
  if (isNaN(Number(take))) take = 12;
  if (page < 1) page = 1;
  if (take === 0) take = 12;

  try {
    // obtener todos los usuarios
    const users = await prisma.user.findMany({
      orderBy: { name: 'desc' },
      take: take,
      skip: (page - 1) * take,
    });

    const totalCount = await prisma.user.count();
    const totalPages = Math.ceil(totalCount / take);

    return {
      users: users,
      ok: true,
      currentPage: page,
      totalPages: totalPages,
    };
  } catch (error) {
    throw new Error('No se pudo cargar los usuarios');
  }
};
