import { IoTrashOutline } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';

import { QuantitySelector, Title } from '@/components';
import { initialData } from '@/seed/seed';
import { redirect } from 'next/navigation';

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

export default function CartPage() {
  if (productsInCart.length === 0) {
    redirect('/empty');
  }

  return (
    <div className="flex justify-center items-center mb-72 px-2 sm:px-10">
      <div className="flex flex-col sm:w-8/12 w-full">
        <Title title="Carrito" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/** Cart */}
          <div className="flex flex-col">
            <span className="text-xl">Agregar más productos</span>
            <Link href="/" className="underline mb-5">
              Continúa comprando
            </Link>

            {/** Items  */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-3 bg-white rounded-r-full pr-5 shadow-md">
                <Image
                  src={require(`../../../../public/products/${product.images[0]}`)}
                  style={{ width: '100px', height: '100px' }}
                  alt={product.title}
                  className="mr-5 rounded-e-full"
                />
                <div className="flex w-full justify-between items-center py-2">
                  <div>
                    <p>{product.title}</p>
                    <p>${product.price.toFixed(2)}</p>
                    <QuantitySelector quantity={3} />
                  </div>
                  <button className="mt-3">
                    <IoTrashOutline size={30} color="red" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/** Checkout: resummary order */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
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

            <div className="mt-5 mb-2 w-full h-full">
              <Link className="flex btn-primary justify-center" href="/checkout/address">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
