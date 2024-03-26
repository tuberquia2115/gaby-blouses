import {
  ColorSelector,
  ProductMobileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizeSelector,
} from '@/components';
import { titleFont } from '@/config/fonts';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';

const products = initialData.products;

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductBySlugPage({ params }: Props) {
  const { slug } = params;

  const product = products.find((product) => product.slug === slug);

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
        <h1 className={`${titleFont.className} antialiased text-xl`}>{product.title}</h1>
        <p className="text-lg mb-5">${product.price.toFixed(2)}</p>

        {/** TODO: Selector de colores */}
        {product.colors && (
          <ColorSelector selectedColor={product.colors[1]} availableColors={product.colors} />
        )}
        {/** Selector de tallas */}
        <SizeSelector availableSizes={product.sizes} selectedSize={product.sizes[0]} />

        {/** Selector de cantidad  */}
        <QuantitySelector quantity={2} />

        {/** Button add card */}
        <button type="button" className="btn-primary my-5">
          Agregar al carrito
        </button>

        {/** Descripción del prducto */}

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
