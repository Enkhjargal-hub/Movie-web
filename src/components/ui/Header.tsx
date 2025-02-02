// components/ui/Header.tsx
'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Only run on the client-side
  }, []);

  if (!mounted) return null;

  return (
    <header className={`flex justify-between items-center p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-indigo-700'} text-white`}>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">Movie Z</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="w-9 h-9">
          Search
        </Button>
        {theme === 'dark' ? (
          <Button variant="outline" className="w-9 h-9" onClick={() => setTheme('light')}>
            <Sun />
          </Button>
        ) : (
          <Button variant="outline" className="w-9 h-9" onClick={() => setTheme('dark')}>
            <Moon />
          </Button>
        )}
      </div>
    </header>
  );
}
