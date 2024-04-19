import Image from 'next/image';
import { redirect } from 'next/navigation';

import { OrderStatus, PaypalButton, Title } from '@/components';
import { getOrderById } from '@/actions';
import { currencyFormat } from '@/utils';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderByIdPage({ params }: Props) {
  const { id } = params;

  const { order, ok } = await getOrderById(id);

  if (!ok) {
    redirect('/');
  }

  const address = order?.OrderAddress;
  const orderItems = order?.OrderItem;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-8/12">
        <Title title={`Orden #${id.split('-').at(-1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/** Cart */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order!.isPaid} />

            {/** Items  */}
            {orderItems!.map((item) => (
              <div
                key={item.product.slug + '-' + item.size}
                className="flex mb-3 rounded-s-full bg-white pr-5"
              >
                <Image
                  src={require(`../../../../../public/products/${item.product.ProductImage[0].url}`)}
                  style={{ width: '100px', height: '100px' }}
                  alt={item.product.title}
                  className="mr-5 rounded-s-full"
                />
                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price} * {item.quantity}
                  </p>
                  <p className="font-bold">Subtotal:{currencyFormat(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          {/** Checkout: resummary order */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {address!.firstName} {address!.lastName}
              </p>

              <p>{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.postalCode}</p>
              <p>
                {address!.city}, {address!.countryId}
              </p>
              <p>{address!.phone}</p>
            </div>

            {/** divider */}

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de la compra</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order?.itemsInOrder === 1 ? '1 Artículo' : `${order?.itemsInOrder} Artículos`}
              </span>

              <span>Sub-Total</span>
              <span className="text-right">{currencyFormat(order!.subTotal)}</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="mt-5 text-2xl">Total: </span>
              <span className=" mt-5 text-2xl text-right">{currencyFormat(order!.total)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {order?.isPaid ? (
                <OrderStatus isPaid={order!.isPaid} />
              ) : (
                <PaypalButton amount={order?.total!} orderId={order?.id!} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
