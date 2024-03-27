'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { IoArrowRedoOutline, IoArrowUndoOutline } from 'react-icons/io5';

import { generatePaginationNumbers } from '@/utils';

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageString = searchParams.get('page') ?? 1;
  const currentPage = isNaN(+pageString) ? 1 : +pageString;

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === '...') {
      return `${pathname}?${params.toString}`;
    }

    if (+pageNumber <= 0) {
      return `${pathname}`;
    }

    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center mb-20">
      <nav aria-label="Page navigation" className="bg-white rounded-full p-2">
        <ul className="flex list-style-none justify-center items-center">
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
            >
              <IoArrowUndoOutline size={30} />
            </Link>
          </li>

          {allPages.map((page, index) => (
            <li className="page-item" key={`${page}-${index}`}>
              <Link
                className={clsx(
                  'relative block py-1.5 px-3 border-0 rounded-full outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none',
                  {
                    'bg-blue-600 text-white font-bold hover:text-white hover:bg-blue-500 shadow-md focus:shadow-md':
                      page === currentPage,
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <IoArrowRedoOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
