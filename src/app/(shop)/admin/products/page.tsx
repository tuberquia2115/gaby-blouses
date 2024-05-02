export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import Link from 'next/link';

import { Pagination, Title } from '@/components';
import { getPaginatedProductsWithImages } from '@/actions';
import { ProductCard } from './ui/ProductCard';
import { ProductsTable } from './ui/ProductsTable';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function OrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  return (
    <>
      <Title className="px-5 sm:px-0" title="Mantenimiento de productos" />
      <div className="flex justify-end mb-5 pr-5 sm:pr-0">
        <Link href="/admin/product/new" className="btn-primary">
          Nuevo Producto
        </Link>
      </div>

      <div className="block md:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>

      <ProductsTable products={products} className="mb-10 hidden md:block" />

      <Pagination totalPages={totalPages} />
    </>
  );
}
