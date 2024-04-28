export const revalidate = 604800;

import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductMobileSlideShow, ProductSlideShow, StockLabel } from '@/components';

import { titleFont } from '@/config/fonts';
import { getProductBySlug } from '@/actions';
import { AddToCart } from './ui/AddToCart';
import { currencyFormat } from '@/utils';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const { slug } = params;

  // fetch data
  const product = await getProductBySlug(slug);
  const hasImages = Boolean(product?.images.length);

  const images = hasImages ? `/products/${product?.images[1]}` : '/imgs/placeholder.jpg';

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      // todo: images: [], https://misitioweb.com/products/image.pnh
      images: [images],
    },
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/** SlideShow */}
      <div className="col-span-1 md:col-span-2">
        {/** Mobile Slideshow */}
        <ProductMobileSlideShow title={product.title} images={product.images} className="block md:hidden" />

        {/** Desktop Slideshow*/}
        <ProductSlideShow title={product.title} images={product.images} className="hidden md:block" />
      </div>

      {/** Detalles */}
      <div className="col-span-1 px-5">
        <StockLabel slug={slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        <p className="text-lg mb-5">{currencyFormat(product.price)}</p>
        <AddToCart product={product} />

        {/** Descripción del prducto */}

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
