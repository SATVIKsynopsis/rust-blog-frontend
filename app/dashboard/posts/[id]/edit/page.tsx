'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardHeader } from '@/app/components/dashboard-header';
import { getPostById, updatePost } from '@/lib/api';
import { AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsFetching(true);
        const response = await getPostById(postId);
        const postData = response?.data?.post || response?.post || response;
        setTitle(postData.title || '');
        setContent(postData.content || '');
      } catch (err) {
        console.error('Failed to fetch post:', err);
        const message = err instanceof Error ? err.message : 'Failed to load post';
        setFetchError(message);
      } finally {
        setIsFetching(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    setIsLoading(true);

    try {
      await updatePost(postId, title.trim(), content.trim());

      toast.success('Post updated successfully 🎉', {
        description: 'Redirecting to your dashboard…',
      });

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
      toast.error('Failed to update post');
    } finally {
      setIsLoading(false);
    }
  };

  const characterCount = content.length;
  const wordCount = content.trim()
    ? content.trim().split(/\s+/).length
    : 0;

  if (isFetching) {
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

  if (fetchError) {
    return (
      <>
        <DashboardHeader />
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[40vh]">
            <Card className="max-w-md w-full text-center">
              <CardContent className="py-10 space-y-4">
                <p className="text-destructive text-lg font-semibold">
                  {fetchError}
                </p>
                <p className="text-muted-foreground text-sm">
                  The post you're trying to edit might have been removed or doesn't exist.
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
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Edit Post</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Update your post details below
              </p>
            </div>
          </div>

          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-xl">Post Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">
                    {title.length}/100 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Content</label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={isLoading}
                    rows={15}
                    className="font-mono"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{characterCount} characters</span>
                    <span>{wordCount} words</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    type="submit"
                    disabled={isLoading || !title.trim() || !content.trim()}
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Post'
                    )}
                  </Button>

                  <Link href="/dashboard">
                    <Button variant="outline" size="lg">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
