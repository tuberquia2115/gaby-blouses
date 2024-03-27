export const revalidate = 604800;

import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from '@/components';

import { titleFont } from '@/config/fonts';
import { getProductBySlug, getStockBySlug } from '@/actions';

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

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      // todo: images: [], https://misitioweb.com/products/image.pnh
      images: [require(`../../../../../public/products/${product?.images[1]}`)],
    },
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);
  const slock = await getStockBySlug(slug);

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
        <p className="text-lg mb-5">${product.price.toFixed(2)}</p>

        {/** TODO: Selector de colores */}

        {/** Selector de tallas */}
        <SizeSelector availableSizes={product.sizes} selectedSize={product.sizes[0]} />

        {/** Selector de cantidad  */}
        <QuantitySelector quantity={2} />

        {/** Button add card */}
        <button type="button" className="btn-primary my-5 disabled:bg-gray-400" disabled={slock === 0}>
          Agregar al carrito
        </button>

        {/** Descripción del prducto */}

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
