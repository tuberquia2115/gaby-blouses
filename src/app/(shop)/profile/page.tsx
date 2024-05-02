import Image from 'next/image';

import { auth } from '@/auth.config';
import { Title } from '@/components';
import defaultAvatar from '../../../../public/imgs/starman_750x750.png';
export default async function ProfilePage() {
  const session = await auth();

  const avatarUrl = session?.user.image ?? defaultAvatar;

  return (
    <div className="max-w-lg mx-auto my-10">
      <Title title={'Perfil'} />
      <Image
        className="w-32 h-32 rounded-full mx-auto"
        src={avatarUrl}
        alt="Profile picture"
        width={100}
        height={100}
        priority
      />
      <h2 className="text-center text-2xl font-semibold mt-3">{session?.user.name}</h2>
      <p className="text-center text-gray-600 mt-1">Rol: {session?.user.role.toUpperCase()}</p>
      <div className="flex justify-center mt-5">
        <p className="font-semibold">
          Correo Electrónico: <span className="font-normal text-gray-600">{session?.user.email}</span>
        </p>
        <p className="font-semibold">
          Correo Electrónico Verificado:{' '}
          <span className="font-normal text-gray-600">{session?.user.emailVerified ? 'Sí' : 'No'}</span>
        </p>
      </div>
    </div>
  );
}
