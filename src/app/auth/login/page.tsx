import { subTitleFont, titleFont } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col">
      <h1 className={`${subTitleFont.className} text-4xl mb-5 text-left antialiased`}>Ingresar</h1>
      <LoginForm />
    </div>
  );
}
