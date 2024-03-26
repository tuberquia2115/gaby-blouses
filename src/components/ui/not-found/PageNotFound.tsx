import Image from 'next/image';
import Link from 'next/link';

import { titleFont } from '@/config/fonts';
import notFoundImg from '../../../../public/imgs/starman_750x750.png';
export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">Whoops! Lo sentimos mucho.</p>
        <p className="font-light">
          <span> Puedes Regresar al </span>
          <Link href="/" className="font-normal hover:underline transition-all">
            Inicio
          </Link>
        </p>
      </div>
      <div className="px-5 mx-5 sm:px-0">
        <Image src={notFoundImg} alt="Starman" className="p-5 sm:p-0" />
      </div>
    </div>
  );
};
