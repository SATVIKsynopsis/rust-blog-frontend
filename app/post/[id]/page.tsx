'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPostById } from '@/lib/api';
import { DashboardHeader } from '@/app/components/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Eye, Heart, User, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
  views?: number;
  likes?: number;
  author?: {
    id: string;
    name: string;
    username: string;
  };
}

export default function ViewPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchPost = async () => {
    try {
      setIsLoading(true);

      const response = await getPostById(params.id as string);

      const postData = response?.data?.post || response?.post || response;

      setPost(postData);
    } catch (err) {
      console.error('Failed to fetch post:', err);
      setError(err instanceof Error ? err.message : 'Failed to load post');
    } finally {
      setIsLoading(false);
    }
  };

  if (params.id) {
    fetchPost();
  }
}, [params.id]);


  if (isLoading) {
    return (
      <>
        <DashboardHeader />
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Loading post...</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <DashboardHeader />
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[40vh]">
            <Card className="max-w-md w-full text-center">
              <CardContent className="py-10 space-y-4">
                <p className="text-destructive text-lg font-semibold">
                  {error || 'Post not found'}
                </p>
                <p className="text-muted-foreground text-sm">
                  The post you're looking for might have been removed or doesn't exist.
                </p>
                <Link href="/dashboard">
                  <Button className="mt-4 gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <DashboardHeader />
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Back Button */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">Back to Dashboard</p>
          </div>

          {/* Post Card */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-2xl md:text-3xl leading-tight">
                {post.title}
              </CardTitle>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                {post.author && (
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>{post.author.name || post.author.username}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                {post.views !== undefined && (
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>{post.views} views</span>
                  </div>
                )}
                {post.likes !== undefined && (
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes} likes</span>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              {/* Post Content */}
              <article className="prose prose-neutral dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {post.content}
                </div>
              </article>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
