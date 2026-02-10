'use client';

import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Toaster
        position="top-center"
        richColors
        closeButton
      />
      {children}
    </ThemeProvider>
  );
}
