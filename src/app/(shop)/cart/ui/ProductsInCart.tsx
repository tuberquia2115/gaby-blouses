'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoTrashOutline } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';

import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { CartProduct } from '@/interfaces';

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const totalItemsInCart = useCartStore((state) => state.getSummaryInformation().itemsInCart);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const router = useRouter();

  const onRemoveProduct = (product: CartProduct) => {
    removeProduct(product);
    if (totalItemsInCart === 1) {
      router.replace('/');
    }
  };

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
            src={require(`../../../../../public/products/${product.image}`)}
            style={{ width: '100px', height: '100px' }}
            alt={product.title}
            className="mr-5 rounded-s-full"
          />
          <div className="flex w-full justify-between items-center py-2">
            <div>
              <Link className="hover:underline cursor-pointer" href={`/product/${product.slug}`}>
                {product.size} - {product.title}
              </Link>
              <p>{currencyFormat(product.price)}</p>
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChange={(quantity) => updateProductQuantity(product, quantity)}
              />
            </div>
            <button onClick={() => onRemoveProduct(product)} className="mt-3">
              <IoTrashOutline size={30} color="red" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
