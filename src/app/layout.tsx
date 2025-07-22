import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '2Digits Assessment Jelle Peperzak',
  description: '2Digits assessment - version from Jelle Peperzak',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-w-[320px] min-h-screen h-fit`}>
        <Header/>
          {children}
        <Footer />
      </body>
    </html>
  );
}
