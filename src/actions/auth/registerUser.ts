'use server';

import prisma from '@/lib/prisma';
import * as bcryptjs from 'bcryptjs';

type UserInfo = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser({ name, email, password }: UserInfo) {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user: user,
      message: 'Usuario creado con éxito',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo crear el usuario',
    };
  }
};
