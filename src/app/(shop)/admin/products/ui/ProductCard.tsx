import React from 'react';
import Link from 'next/link';

import { ProductImage } from '@/components';
import { Product } from '@/interfaces';
import { currencyFormat } from '@/utils';

interface Props {
  product: Product & { ProductImage: { url: string }[] };
}

export const ProductCard = ({ product }: Props) => (
  <div className="container mx-auto p-1">
    <div className="card flex flex-col justify-center p-3 bg-white rounded-lg shadow-2xl">
      <div className="prod-title">
        <p className="text-2xl text-gray-900 font-bold">{product.title}</p>
        <p>Inventario: {product.inStock}</p>
        <p className="uppercase text-sm text-gray-400">{product.gender}</p>
      </div>
      <div className="prod-img">
        <ProductImage
          src={product.ProductImage[0]?.url}
          width={150}
          height={150}
          alt={product.title}
          className="w-full object-cover rounded object-center"
        />
      </div>
      <div className="prod-info grid gap-10">
        <div>
          <span className="font-bold block text-center">Tallas</span>
          <ul className="flex flex-row justify-center items-center">
            {product.sizes.map((size) => (
              <li className="mr-4 last:mr-0">
                <span className="block p-1">{size}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
          <p className="font-bold text-xl pb-3">Precio: {currencyFormat(product.price)}</p>
          <Link href={`/admin/product/${product.slug}`} className="btn-primary w-full text-center ">
            Editar producto
          </Link>
        </div>
      </div>
    </div>
  </div>
);
