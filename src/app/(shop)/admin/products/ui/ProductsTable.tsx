import Link from 'next/link';

import { ProductImage } from '@/components';
import { Product } from '@/interfaces';
import { currencyFormat } from '@/utils';

interface IProduct extends Product {
  ProductImage: { url: string }[];
}

interface Props {
  products: IProduct[];
}

export const ProductsTable = ({ products }: Props) => {
  return (
    <div className="mb-10 hidden md:block overflow-scroll">
      <table className="min-w-full">
        <thead className="bg-blue-600 border-b">
          <tr>
            <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
              Imagen
            </th>
            <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
              Titulo
            </th>
            <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
              Precio
            </th>
            <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
              Género
            </th>
            <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
              Inventario
            </th>
            <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
              Tallas
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-blue-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <Link href={`/product/${product.slug}`}>
                  <ProductImage
                    src={product.ProductImage[0]?.url}
                    width={80}
                    height={80}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                </Link>
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <Link href={`/admin/product/${product.slug}`} className="hover:underline">
                  {product.title}
                </Link>
              </td>
              <td className="text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
                {currencyFormat(product.price)}
              </td>
              <td className="text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
                {product.gender}
              </td>
              <td className="text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
                {product.inStock}
              </td>
              <td className="text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
                {product.sizes.join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
