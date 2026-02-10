'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Heart, Eye } from 'lucide-react';

interface DashboardStatsProps {
  totalPosts: number;
  totalLikes: number;
  totalViews: number;
}

export function DashboardStats({
  totalPosts,
  totalLikes,
  totalViews,
}: DashboardStatsProps) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          <FileText className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPosts}</div>
          <p className="text-xs text-muted-foreground">Posts published</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
          <Heart className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLikes}</div>
          <p className="text-xs text-muted-foreground">Likes received</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          <Eye className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalViews}</div>
          <p className="text-xs text-muted-foreground">Views on posts</p>
        </CardContent>
      </Card>
    </>
  );
}
