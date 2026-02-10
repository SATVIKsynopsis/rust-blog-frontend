'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Edit, Trash2, Eye, Heart } from 'lucide-react';
import { useState } from 'react';
import { apiFetch } from '@/lib/api';

interface Post {
  id: string;
  title: string;
  excerpt?: string;
  created_at: string;
  views: number;
  likes: number;
}

interface DashboardPostsProps {
  posts: Post[];
}

export function DashboardPosts({ posts }: DashboardPostsProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    setIsDeleting(postId);
    try {
      await apiFetch(`/api/posts/post/${postId}`, { method: 'DELETE' });
      window.location.reload();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete post');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Your Posts</CardTitle>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No posts yet</p>
            <Link href="/dashboard/create">
              <Button>Create Your First Post</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {post.excerpt}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4 ml-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Link href={`/dashboard/posts/${post.id}/edit`}>
                    <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2 text-destructive hover:text-destructive bg-transparent"
                    onClick={() => handleDelete(post.id)}
                    disabled={isDeleting === post.id}
                  >
                    <Trash2 className="w-4 h-4" />
                    {isDeleting === post.id ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
