'use client';

import { DashboardHeader } from '../components/dashboard-header';
import { DashboardUserCard } from '../components/dashboard-user-card';
import { DashboardStats } from '../components/dashboard-stats';
import { DashboardPosts } from '../components/dashboard-posts';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getAllPosts } from '@/lib/api';

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
}

interface Post {
  id: string;
  title: string;
  excerpt?: string;
  created_at: string;
  views: number;
  likes: number;
}

interface DashboardData {
  user: User;
  posts: Post[];
  stats: {
    totalPosts: number;
    totalLikes: number;
    totalViews: number;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchDashboard = async () => {
    try {
      setIsLoading(true);

      const [meResponse, postsResponse] = await Promise.all([
  getCurrentUser(),
  getAllPosts(1, 10),
]);

const user = meResponse.data.user; 
const posts = postsResponse.posts ?? postsResponse;

const dashboardData = {
  user,
  posts,
  stats: {
    totalPosts: posts.length,
    totalLikes: posts.reduce((s: number, p: any) => s + (p.likes ?? 0), 0),
    totalViews: posts.reduce((s: number, p: any) => s + (p.views ?? 0), 0),
  },
};

setData(dashboardData);

    } catch (error) {
      console.error("Failed to fetch dashboard:", error);

      const message =
        error instanceof Error ? error.message : "Failed to load dashboard";

      setError(message);

      if (
        message.includes("401") ||
        message.toLowerCase().includes("unauthorized")
      ) {
        router.push("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  fetchDashboard();
}, [router]);



  if (isLoading) {
    return (
      <>
        <DashboardHeader />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </main>
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <DashboardHeader />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-destructive">{error || 'Failed to load dashboard'}</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div>
            
            <p className="text-muted-foreground mt-2">
              Here's your blog dashboard. Manage your posts and track engagement.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardStats
              totalPosts={data.stats.totalPosts}
              totalLikes={data.stats.totalLikes}
              totalViews={data.stats.totalViews}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* User Card */}
            <DashboardUserCard user={data.user} />

            {/* Posts List */}
            <DashboardPosts posts={data.posts} />
          </div>
        </div>
      </main>
    </>
  );
}
