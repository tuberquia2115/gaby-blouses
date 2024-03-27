'use client';

import { useState } from 'react';
import { QuantitySelector, SizeSelector } from '@/components';
import type { Product, Size, CartProduct } from '@/interfaces';
import { useCartStore } from '@/store';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [size, setSize] = useState<Size | undefined>();

  const [quantity, setQuantity] = useState(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <span className="text-red-500 p-1 font-bold fade-in">Debe seleccionar una talla</span>
      )}
      {/** TODO: Selector de colores */}

      {/** Selector de tallas */}
      <SizeSelector onSizeChange={setSize} availableSizes={product.sizes} selectedSize={size} />

      {/** Selector de cantidad  */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      {/** Button add card */}
      <button
        onClick={() => addToCart()}
        className="btn-primary my-5 disabled:bg-gray-400"
        disabled={product.inStock === 0}
      >
        Agregar al carrito
      </button>
    </>
  );
};
