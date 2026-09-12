import React from 'react';
import { Header } from '@/components/organisms/sections/Header';
import { Footer } from '@/components/organisms/sections/Footer';
import { PageTransition } from '@/components/foundation';

// ContentLayout.tsx
export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header sticky />
      <main id="main-content" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
