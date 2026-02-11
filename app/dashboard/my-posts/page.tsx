'use client';

import { DashboardHeader } from '@/app/components/dashboard-header';
import { DashboardPosts } from '@/app/components/dashboard-posts';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getMyPosts } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  excerpt?: string;
  created_at: string;
  views: number;
  likes: number;
  user_id?: string;
  author?: {
    id: string;
    name: string;
    username: string;
  };
}

export default function MyPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        setIsLoading(true);

        const [meResponse, postsResponse] = await Promise.all([
          getCurrentUser(),
          getMyPosts(),
        ]);

        const user = meResponse.data.user;
        setUserId(user.id);
        setPosts(postsResponse || []);
      } catch (err) {
        console.error('Failed to fetch my posts:', err);
        const message = err instanceof Error ? err.message : 'Failed to load posts';
        setError(message);

        if (
          message.includes('401') ||
          message.toLowerCase().includes('unauthorized')
        ) {
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyPosts();
  }, [router]);

  if (isLoading) {
    return (
      <>
        <DashboardHeader />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Loading your posts...</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <DashboardHeader />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-destructive">{error}</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">My Posts</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and view all your published posts
              </p>
            </div>
          </div>

          {/* Posts */}
          <DashboardPosts posts={posts} userId={userId} title="My Posts" />
        </div>
      </main>
    </>
  );
}
