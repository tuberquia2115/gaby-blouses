import Link from 'next/link';

import { Title } from '@/components';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-20 sm:mb-72 px-2">
      <div className="flex flex-col sm:w-10/12 w-full">
        <Title title="Carrito 🛒" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/** Cart */}
          <div className="flex flex-col">
            <span className="text-xl">Agregar más productos</span>
            <Link href="/" className="underline mb-5">
              Continúa comprando
            </Link>

            {/** Items  */}
            <ProductsInCart />
          </div>

          {/** Checkout: resummary order */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de la compra</h2>
            <OrderSummary />
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
