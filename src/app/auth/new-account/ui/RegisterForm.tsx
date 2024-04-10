'use client';
import { useState } from 'react';
import Link from 'next/link';
import { login, registerUser } from '@/actions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FormInput } from '@/components';

const schema = z.object({
  name: z.string().min(4, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'La contraseña debe tener almenos 6 caracteres'),
});

type FormInputs = z.infer<typeof schema>;

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { name, email, password } = data;
    const resp = await registerUser({ name, email, password });

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }
    setErrorMessage('');
    await login(email.toLowerCase(), password);
    window.location.replace('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <FormInput
        label="Nombre Completo"
        id="name"
        type="text"
        placeholder="Name..."
        errors={errors['name']}
        {...register('name')}
      />

      <FormInput
        label="Correo electrónico"
        id="email"
        type="email"
        placeholder="user@gmail.com"
        errors={errors['email']}
        {...register('email')}
      />

      <FormInput
        label="Contraseña"
        id="password"
        type="password"
        placeholder="******"
        errors={errors['password']}
        {...register('password')}
      />

      {errorMessage && <span className="text-sm text-red-500 mb-2">{errorMessage}</span>}
      <button className="btn-primary">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" type="submit" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
