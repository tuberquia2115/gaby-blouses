'use server';

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';

export const authenticate = async (prevState: string | undefined, formData: FormData) => {
  'use server';
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
      redirectTo: '',
    });

    return 'Success';
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'CredentialsSignin';
        default:
          return 'UnknownError';
      }
    }
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password });
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'no se pudo iniciar sesión',
    };
  }
};
