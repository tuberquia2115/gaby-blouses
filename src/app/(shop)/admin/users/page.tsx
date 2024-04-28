export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { Pagination, Title } from '@/components';
import { redirect } from 'next/navigation';

import { UsersTable } from './ui/UsersTable';
import { getPaginatedUsers } from '@/actions';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function UsersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { ok, users = [], totalPages } = await getPaginatedUsers({ page });

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />
      <div className="mb-10">
        <UsersTable users={users} />
      </div>
      <Pagination totalPages={totalPages!} />
    </>
  );
}
