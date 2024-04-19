import Link from 'next/link';

import { subTitleFont, titleFont } from '@/config/fonts';

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/">
        <span className={`${subTitleFont.className} antialiased font-bold`}>Gaby </span>
        <span className={`${titleFont.className}`}>| Blouses </span>
        <span>© {new Date().getFullYear()}</span>
      </Link>
      <Link href="/" className="mx-3 underline">
        Privacidad & Legal
      </Link>
      <Link href="/" className="mx-3 underline">
        Ubicaciones
      </Link>
    </div>
  );
};
