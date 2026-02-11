'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, LogOut, User } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api';
import { useState } from 'react';

export function DashboardHeader() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            B
          </div>
          <h1 className="text-2xl font-bold">Bloggy</h1>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/dashboard/my-posts">
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <User className="w-4 h-4" />
              My Posts
            </Button>
          </Link>
          <Link href="/dashboard/create">
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            onClick={handleLogout}
            disabled={isLoading}
            className="gap-2 bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            {isLoading ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </div>
    </header>
  );
}
