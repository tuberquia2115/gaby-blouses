import { redirect } from 'next/navigation';

import { Title } from '@/components';
import { getProductBySlug } from '../../../../../actions/product/get-product-by-slug';
import { ProductForm } from './ui/ProductForm';
import { getCategories } from '@/actions';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProdutPage({ params }: Props) {
  const { slug } = params;

  const [product, categories] = await Promise.all([getProductBySlug(slug), getCategories()]);

  if (!product && slug !== 'new') {
    redirect('/admin/products');
  }

  const title = slug === 'new' ? 'Nuevo Producto' : 'Editar Producto';
  return (
    <div className='px-3'>
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </div>
  );
}
