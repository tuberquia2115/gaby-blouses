import NextAuth, { type NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import * as bcryptjs from 'bcryptjs';

import prisma from '@/lib/prisma';

// Rutas validas si la sessión exixste:
// /auth/login
// /auth/new-account

// Rutas a las que no se puede entrar, si la sessión no existe
// /checkout
// /checkout/address

const authRoutes = ['/auth/login', '/auth/new-account'];
const adminAutheticatedRoutes = ['/admin', '/admin/orders', '/admin/users',]
const autheticatedRoutes = ['/checkout', '/checkout/address', '/profile'];

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },

  callbacks: {
    jwt({ token, user }) {
      // console.log('jwt', { token, user, session, profile, account, trigger });

      if (user) {
        token.data = user;
      }

      return token;
    },

    session({ token, user, session }) {
      session.user = token.data as any;
      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRole = auth?.user.role === 'admin';
      const isOnAuth = authRoutes.includes(nextUrl.pathname);
      const isOnDashboard = autheticatedRoutes.includes(nextUrl.pathname);
      const isOnDashboardAdmin = adminAutheticatedRoutes.includes(nextUrl.pathname)

      if (isOnDashboardAdmin) {
        if (!isAdminRole) {
          return false
        }
        return true;
      }

      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        if (isOnAuth) {
          return Response.redirect(new URL('/', nextUrl));
        }
        return true;
      }
      return true;
    },
  },

  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Buscar el correo
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        if (!user) return null;

        // comparar las contraseñas
        if (!bcryptjs.compareSync(password, user.password)) return null;

        // regresar el usuario
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
