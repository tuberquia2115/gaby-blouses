import Image from 'next/image';
import { IoCardOutline } from 'react-icons/io5';
import clsx from 'clsx';

import { Title } from '@/components';
import { initialData } from '@/seed/seed';

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

interface Props {
  params: {
    id: string;
  };
}

const PaidOrderBtn = () => (
  <div
    className={clsx('flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5', {
      'bg-red-500': false,
      'bg-green-700': true,
    })}
  >
    <IoCardOutline size={30} />
    {/* <span className="mx-2">Pendiente de pago </span> */}
    <span className="mx-2">Pagada</span>
  </div>
);

export default function OrderByPage({ params }: Props) {
  const { id } = params;

  // Todo: Verificar orden
  // redirect()
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-8/12">
        <Title title={`Orden #${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/** Cart */}
          <div className="flex flex-col mt-5">
            <PaidOrderBtn />

            {/** Items  */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-3 bg-white rounded-full pr-5 shadow-md items-center">
                <Image
                  src={require(`../../../../../public/products/${product.images[0]}`)}
                  style={{ width: '100px', height: '100px' }}
                  alt={product.title}
                  className="mr-5 rounded-s-full"
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price} * 3</p>
                  <p className="font-bold">Subtotal: ${(product.price * 3).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/** Checkout: resummary order */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Jose Manuel Graciano Tuberquia</p>

              <p>Calle 23 Bis Oeste av 6-14</p>
              <p>Alcaldía de Palmira</p>
              <p>Villa del mar</p>
              <p>Cali - Valle del cauca</p>
              <p>CP 70345</p>
              <p>3174263716</p>
            </div>

            {/** divider */}

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de la compra</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 Artículos</span>

              <span>Sub-Total</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total: </span>
              <span className=" mt-5 text-2xl text-right">$ 100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <PaidOrderBtn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
