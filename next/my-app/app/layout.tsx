import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <nav className='flex justify-around py-3 bg-indigo-300'>
          <a href='/'>HOME</a>
          <a href='/about'>ABOUT</a>
          <a href='/hello'>HELLO</a>
          <Link href='/todos'>Todos</Link>
          <Link href='/photos'>Photos</Link>
          <Link href='/api'>APIs</Link>
        </nav>
        <div className='container mx-auto'>{children}</div>
        <footer>&copy; Senior Coding</footer>
      </body>
    </html>
  );
}
