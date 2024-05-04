export const revalidate = 60;

import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions';
import { NavLinks, Pagination, ProductGrid, Title } from '@/components';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  if (products.length === 0) {
    redirect('/');
  }

  return (
    <div className='px-5'>
      <div className="block sm:hidden border-b-2 border-t-gray-400">
        <h5 className='antialiased text-xl pl-2 font-semibold text-blue-600'>
          Categorías
        </h5>
        <div className="flex justify-between">
          <NavLinks />
        </div>
      </div>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </div>
  );
}
