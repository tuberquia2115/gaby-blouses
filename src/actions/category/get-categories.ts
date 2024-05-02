'use server';

import prisma from '@/lib/prisma';

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
};
