import type { Metadata } from 'next';

import './globals.css';
import { inter } from '@/config/fonts';
import { Providers } from '@/components';

export const metadata: Metadata = {
  title: {
    template: '%s - Gaby | Blouses',
    default: 'Home - Gaby | Blouses',
  },
  description: 'Una Tieda virtual de productos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
