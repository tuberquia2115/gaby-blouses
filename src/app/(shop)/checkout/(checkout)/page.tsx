import Link from 'next/link';

import { Title } from '@/components';
import { ProductsInCart } from './ui/ProductsInCart';
import { PlaceOrder } from './ui/PlaceOrder';

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-20 sm:mb-72 px-2">
      <div className="flex flex-col sm:w-10/12 w-full">
        <Title title="Verificar orden" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/** Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar carrito 🛒
            </Link>

            {/** Items  */}
            <ProductsInCart />
          </div>

          {/** Checkout: resummary order */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
