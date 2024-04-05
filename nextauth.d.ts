import NextAuth, { DefaultSession, User } from 'next-auth';

interface IUser extends User {
  emailVerified?: boolean;
  role: string;
}

declare module 'next-auth' {
  interface Session {
    user: IUser & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends IUser {}
}
