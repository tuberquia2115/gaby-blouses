export const revalidate = 60;

import type { Metadata } from 'next';
import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions';
import { NavLinks, Pagination, ProductGrid, Title } from '@/components';

interface Props {
  searchParams: {
    page?: string;
  };
  params: {
    gender: string;
  };
}

const labels: Record<string, string> = {
  men: 'para Hombres',
  women: 'para Mujeres',
  kid: 'para Niños',
  unisex: 'para todos',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Articulos ${labels[params.gender]}`, description: `Products By Gender` };
}

export default async function GenderByPage({ params, searchParams }: Props) {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
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
      <Title title={`Articulos ${labels[gender]}`} className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
