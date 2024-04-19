'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-3 rounded-s-full bg-white pr-5">
          <Image
            src={require(`../../../../../../public/products/${product.image}`)}
            style={{ width: '100px', height: '100px' }}
            alt={product.title}
            className="mr-5 rounded-s-full"
          />
          <div className="flex w-full flex-col py-4">
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>
            <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
