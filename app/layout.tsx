import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import TanstackQueryProviders from '@/hooks/useTanstackQuery';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PokeMon Dex',
  description: 'listing pokemon',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackQueryProviders>{children}</TanstackQueryProviders>
      </body>
    </html>
  );
}
