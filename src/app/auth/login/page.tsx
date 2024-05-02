import { Suspense } from 'react';
import { subTitleFont } from '@/config/fonts';

import { LoginForm } from './ui/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col">
      <h1 className={`${subTitleFont.className} text-4xl mb-5 text-left antialiased`}>Ingresar</h1>
      <Suspense fallback={<div className={'animate-pulse bg-gray-200'}>&nbsp;</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
