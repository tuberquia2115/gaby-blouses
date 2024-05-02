'use server';

import { auth } from '@/auth.config';
import type { Address, Size } from '@/interfaces';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

const TAX = 0.15;

export async function placeOrder(producIds: ProductToOrder[], address: Address) {
  const session = await auth();
  const userId = session?.user.id;

  // Verificar sesión de usuario
  if (!userId) {
    return {
      ok: false,
      message: 'No hay sesión de usuario',
    };
  }
  // Obtener la información de los productos
  // Nota: Recordar que podemos llevar 2+ productos con el mismo ID

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: producIds.map((p) => p.productId),
      },
    },
  });

  // calcular los montos

  const itemsInOrder = producIds.reduce((count, p) => count + p.quantity, 0);

  // Los totales de tax, subtotal, total
  const { subTotal, tax, total } = producIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subTotal = product.price * productQuantity;
      totals.subTotal += subTotal;
      totals.tax += subTotal * TAX;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // Crear la transacción de la base de datos

  try {
    const prismaTx = await prisma.$transaction(
      async (tx) => {
        // 1.  Actualizar el stock de los productos

        const updatedProductsPromises = products.map((product) => {
          // Acumular la cactidad de productos a llevar
          const productQuantity = producIds
            .filter((p) => p.productId === product.id)
            .reduce((acc, item) => item.quantity + acc, 0);

          if (productQuantity === 0) {
            throw new Error(`${product.id}, no tiene cantidad definda`);
          }

          return tx.product.update({
            where: { id: product.id },
            data: {
              // inStock: product.inStock - productQuantity // no hacer
              inStock: {
                decrement: productQuantity,
              },
            },
          });
        });

        const updatedProducts = await Promise.all(updatedProductsPromises);

        // Verificar valores negativos en las exixtencias = no hay stock

        updatedProducts.forEach((product) => {
          if (product.inStock < 0) {
            throw new Error(`(${product.title}) -  no tiene  inventario suficiente`);
          }
        });

        // 2. Crear la orden - Emcabezado - Detalles
        const order = await tx.order.create({
          data: {
            userId,
            itemsInOrder,
            subTotal,
            tax,
            total,
            OrderItem: {
              createMany: {
                data: producIds.map((p) => ({
                  quantity: p.quantity,
                  size: p.size,
                  productId: p.productId,
                  price: products.find((product) => product.id === p.productId)?.price ?? 0,
                })),
              },
            },
          },
        });

        // 3. Crear la dirección de la orden
        const { country, ...restAddress } = address;
        const orderAddress = await tx.orderAddress.create({
          data: {
            ...restAddress,
            countryId: country,
            orderId: order.id,
          },
        });

        return {
          order: order,
          orderAddress: orderAddress,
          updatedProducts: updatedProducts,
        };
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
    );

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
