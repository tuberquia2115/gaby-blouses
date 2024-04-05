'use client';

import {
  IoCloseCircleOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';

import { logout } from '@/actions';
import NavItem from './NavItem';

export const SideMenu = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === 'admin';

  return (
    <div className="">
      {/** Background back */}
      {isSideMenuOpen && <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />}

      {/** Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/** side Menu */}

      <nav
        // todo: efecto de lide
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          { 'translate-x-full': !isSideMenuOpen }
        )}
      >
        <IoCloseCircleOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-1 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/** Menú */}
        {isAuthenticated ? (
          <>
            <NavItem
              href="/profile"
              label="Perfil"
              icon={<IoPersonOutline size={30} />}
              onCloseMenu={() => closeMenu()}
            />

            <NavItem
              href="/orders"
              label="Ordenes"
              icon={<IoTicketOutline size={30} />}
              onCloseMenu={() => closeMenu()}
            />
            <button
              onClick={() => logout()}
              className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoLogOutOutline size={30} />
              <span className="ml-3 text-xl">Salir</span>
            </button>
          </>
        ) : (
          <NavItem
            href="/auth/login"
            label="Ingresar"
            icon={<IoLogInOutline size={30} />}
            onCloseMenu={() => closeMenu()}
          />
        )}

        {/** line separator */}
        {isAdmin && (
          <>
            <div className="w-full h-px  bg-gray-200 my-10" />
            <NavItem
              href="/products"
              label="Productos"
              icon={<IoShirtOutline size={30} />}
              onCloseMenu={() => closeMenu()}
            />

            <NavItem
              href="/orders"
              label="Ordenes"
              icon={<IoTicketOutline size={30} />}
              onCloseMenu={() => closeMenu()}
            />

            <NavItem
              href="/users"
              label="Usuarios"
              icon={<IoPeopleOutline size={30} />}
              onCloseMenu={() => closeMenu()}
            />
          </>
        )}
      </nav>
    </div>
  );
};
