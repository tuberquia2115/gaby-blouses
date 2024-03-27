'use client';

import { useEffect, useState } from 'react';

import { getStockBySlug } from '@/actions';
import { titleFont } from '@/config/fonts';
import clsx from 'clsx';

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const isEmptyStock = stock === 0;

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setIsLoading(false);
  };

  useEffect(() => {
    getStock();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={'animate-pulse bg-gray-200'}>&nbsp;</div>
      ) : (
        <h1
          className={clsx(`${titleFont.className} antialiased font-bold text-lg`, {
            'text-orange-500': isEmptyStock,
          })}
        >
          {isEmptyStock ? 'No hay prendas disponibles.' : `Stock: ${stock}`}
        </h1>
      )}
    </>
  );
};
