'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { IoCartOutline, IoMenuOutline, IoSearchOutline } from 'react-icons/io5';

import { subTitleFont, titleFont } from '@/config/fonts';
import { useCartStore, useUIStore } from '@/store';
import { NavLinks } from '../nav-links/NavLinks';


export const TopMenu = () => {
  const { data: session } = useSession();
  const totalItemsInCart = useCartStore((state) => state.getSummaryInformation().itemsInCart);
  const openMenu = useUIStore((state) => state.openSideMenu);
  const [loaded, setLoaded] = useState(false);
  const isAdmin = session?.user.role === 'admin';

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="">
      <div className="flex px-5 justify-between items-center w-ful h-14">
        {/* Logo */}
        <div>
          <Link href="/">
            <span className={`${subTitleFont.className} antialiased font-bold`}>Gaby</span>
            <span> | Blouses </span>
            {isAdmin && <span className={`${titleFont.className} antialiased font-bold`}>| Administrador</span>}
          </Link>
        </div>
        {/** Center Menu */}
        <div className="hidden sm:block">
          <NavLinks />
        </div>
        {/* Search  Cart, Menu*/}
        <div className="flex items-center">
          <Link href="/search" className="mx-2">
            <IoSearchOutline className="w-5 h-5" />
          </Link>
          <Link href={totalItemsInCart === 0 && loaded ? '/empty' : '/cart'} className="mx-2">
            <div className="relative">
              {loaded && totalItemsInCart > 0 && (
                <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white fade-in">
                  {totalItemsInCart}
                </span>
              )}
              <IoCartOutline className="w-5 h-5" />
            </div>
          </Link>
          <button onClick={() => openMenu()} className="m-2 p-2 rounded-md transition-all hover:bg-gray-200">
            <IoMenuOutline size={30} />
          </button>
        </div>
      </div>
    </nav>
  );
};
