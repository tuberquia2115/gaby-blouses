'use client';

import { authenticate } from '@/actions';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { IoInformationOutline } from 'react-icons/io5';

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const [state, dispatch] = useFormState(authenticate, undefined);

  const redirectTo = searchParams.get('callbackUrl');

  useEffect(() => {
    if (state === 'Success') {
      window.location.replace(redirectTo ?? '/');
    }
  }, [state]);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
        placeholder="user@gmail.com"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        name="password"
        type="password"
        placeholder="******"
      />
      {state === 'CredentialsSignin' && (
        <div className="flex items-end space-x-1" aria-live="polite" aria-atomic="true">
          <div className="flex flex-row mb-2">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">Credenciales Invalidas</p>
          </div>
        </div>
      )}
      <LoginButton />

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending,
      })}
    >
      Ingresar
    </button>
  );
};
