export const revalidate = 60;

import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

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

  // if (id === 'kids') {
  //   notFound();
  // }

  return (
    <>
      <Title title={`Articulos ${labels[gender]}`} subtitle={'Productos para'} className="mb-2" />

      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
