// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Or Geist if you are using it
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Nalara | AI Directory & Changelog',
  description: 'Curated AI resources and daily updates.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // antialiased ensures the fonts render as sharp as Linear's
    <html lang="id" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <Header />
        {children}
      </body>
    </html>
  );
}