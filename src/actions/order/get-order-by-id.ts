'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export async function getOrderById(orderId: string) {
  const session = await auth();

  if (!session?.user) {
    return { ok: false, message: 'Debe estar autenticado' };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },

                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw 'No existe la orden con el id' + orderId;
    }

    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) {
        throw `La orden con id ${orderId} no es de ese usuario`;
      }
    }

    return {
      ok: true,
      order: order,
    };
  } catch (error) {
    console.log('error', error);
    return {
      ok: false,
      message: `Orden no existe `,
    };
  }
};
