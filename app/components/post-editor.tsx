'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiFetch } from '@/lib/api';
import { AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createPost } from '@/lib/api';
import { toast } from 'sonner';

export function PostEditor() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    await createPost(title.trim(), content.trim());

    toast.success('Post published successfully 🎉', {
      description: 'Redirecting to your dashboard…',
    });

    router.push('/post/success');

  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to create post');
    toast.error('Failed to publish post');
  } finally {
    setIsLoading(false);
  }
};


  const characterCount = content.length;
  const wordCount = content.trim()
    ? content.trim().split(/\s+/).length
    : 0;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create New Post</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Share your thoughts with the world
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
                      Publishing...
                    </>
                  ) : (
                    'Publish Post'
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
  );
}
