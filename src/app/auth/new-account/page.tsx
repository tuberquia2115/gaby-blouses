import { subTitleFont, titleFont } from '@/config/fonts';
import Link from 'next/link';
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccountPage() {
  return (
    <div className="flex flex-col">
      <h1 className={`${subTitleFont.className} text-4xl mb-5 text-left antialiased`}>Nueva cuenta</h1>
      <RegisterForm />
    </div>
  );
}
