// app/layout.tsx or pages/_app.tsx
'use client';

import { ThemeProvider } from 'next-themes'; // Import ThemeProvider

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {/* Your layout code */}
      {children}
    </ThemeProvider>
  );
}


