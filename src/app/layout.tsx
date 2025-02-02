'use client';

import { ThemeProvider } from 'next-themes';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <html lang="en">
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}

