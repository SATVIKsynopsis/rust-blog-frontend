'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Edit } from 'lucide-react';

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
}

interface DashboardUserCardProps {
  user: User;
}

export function DashboardUserCard({ user }: DashboardUserCardProps) {
  if (!user) return null; 

  const initial = user.name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
            {initial}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate">
              {user.name ?? "—"}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {user.username ?? "—"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email ?? "—"}
            </p>
          </div>
        </div>

        {user.bio && (
          <p className="text-sm text-muted-foreground">{user.bio}</p>
        )}
      </CardContent>
    </Card>
  );
}

