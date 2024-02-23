import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Summary Report',
  description: 'Summary Report for keeping track of students',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} w-screen relative text-2xl px-0 mx-0`}
      >
        {children}
      </body>
    </html>
  );
}
