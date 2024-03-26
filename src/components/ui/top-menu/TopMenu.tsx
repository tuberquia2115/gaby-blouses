'use client';

import Link from 'next/link';
import { subTitleFont } from '@/config/fonts';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';
import { useUIStore } from '@/store';

export const TopMenu = () => {
  const openMenu = useUIStore((state) => state.openSideMenu);
  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${subTitleFont.className} antialiased font-bold`}>Gaby</span>
          <span> | Blouses</span>
        </Link>
      </div>
      {/** Center Menu */}
      <div className="hidden sm:block">
        <Link href="/gender/men" className="m2 p-2 rounded-md transition-all hover:bg-gray-100">
          Hombres
        </Link>
        <Link href="/gender/women" className="m2 p-2 rounded-md transition-all hover:bg-gray-100">
          Mujeres
        </Link>
        <Link href="/gender/kid" className="m2 p-2 rounded-md transition-all hover:bg-gray-100">
          Niños
        </Link>
        <Link href="/gender/unisex" className="m2 p-2 rounded-md transition-all hover:bg-gray-100">
          Uni-sex
        </Link>
      </div>
      {/* Search  Cart, Menu*/}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href="/cart" className="mx-2">
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
              3
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button onClick={() => openMenu()} className="m-2 p-2 rounded-md transition-all hover:bg-gray-200">
          Menú
        </button>
      </div>
    </nav>
  );
};
