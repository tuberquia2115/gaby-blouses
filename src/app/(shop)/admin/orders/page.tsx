export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import Link from 'next/link';
import clsx from 'clsx';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

import { getPaginatedOrders } from '@/actions';
import { Pagination, Title } from '@/components';


interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function OrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { ok, orders = [], totalPages } = await getPaginatedOrders({ page });

  const classNameToIsPaid = (isPaid: boolean) => ({
    'text-green-800': isPaid,
    'text-red-800': !isPaid,
  });
  if (!ok) {
    redirect('/auth/login');
  }
  return (
    <div className='px-3'>
      <Title title="Todas las ordenes" subtitle='Vista para visualizar el estado de las ordenes de todos los usuarios' />
      <div className='overflow-scroll mb-10'>
        <table className="min-w-full">
          <thead className="bg-blue-600 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                Nombre completo
              </th>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                Estado
              </th>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-blue-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id.split('-').at(-1)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <IoCardOutline className={clsx(classNameToIsPaid(order.isPaid))} />
                  <span className={clsx('mx-2', classNameToIsPaid(order.isPaid))}>
                    {order.isPaid ? 'Pagada' : 'No Pagada'}
                  </span>
                </td>
                <td className="text-sm min-w-32 text-gray-900 font-light px-6 ">
                  <Link href={`/orders/${order.id}`} className="hover:underline">
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalPages={totalPages!} />
    </div>
  );
}
