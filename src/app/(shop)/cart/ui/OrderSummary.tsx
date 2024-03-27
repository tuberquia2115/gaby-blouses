'use client';

import { useCartStore } from '@/store';
import { useEffect, useState } from 'react';
import { currencyFormat } from '@/utils';

export const OrderSummary = () => {
  const { itemsInCart, subtotal, tax, total } = useCartStore((state) => state.getSummaryInformation());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>loading...</p>;
  }

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">{itemsInCart === 1 ? '1 Artículo' : `${itemsInCart} Artículos`}</span>

      <span>Sub-Total</span>
      <span className="text-right">{currencyFormat(subtotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total: </span>
      <span className=" mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  );
};
