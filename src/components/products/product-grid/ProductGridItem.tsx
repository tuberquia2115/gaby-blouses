'use client';

import Link from 'next/link';

import { Product } from '@/interfaces';
import { useState } from 'react';
import { currencyFormat } from '@/utils';
import { ProductImage } from '@/components/product/product-image/ProductImage';

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImg, setDisplayImg] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <ProductImage
          src={displayImg}
          alt={product.title}
          className="object-cover w-full h-[426px]"
          height={500}
          width={500}
          onMouseEnter={() => setDisplayImg(product.images[1])}
          onMouseLeave={() => setDisplayImg(product.images[0])}
        />
      </Link>

      <div className="p-4 flex flex-col bg-white">
        <Link className="hover:text-blue-600" href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className="font-bold">{currencyFormat(product.price)}</span>
      </div>
    </div>
  );
};
