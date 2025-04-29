import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CoinAddress.io - Cryptocurrency Address Verification Tool',
  description: 'Verify cryptocurrency addresses, generate QR codes, and check balances for Bitcoin, Ethereum, Litecoin, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
<head /> 
      <body className={inter.className}>{children}</body>
    </html>
  );
}
