'use client';

import { usePathname } from 'next/navigation';

export function useActiveNav() {
  const pathname = usePathname();

  const isActive = (path: string): boolean => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return { pathname, isActive };
}
