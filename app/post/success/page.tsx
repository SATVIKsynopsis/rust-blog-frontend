'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function PostSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="max-w-md w-full text-center">
        <CardContent className="py-10 space-y-4">
          <CheckCircle className="w-14 h-14 mx-auto text-green-500" />
          <h1 className="text-2xl font-bold">Post Published!</h1>
          <p className="text-muted-foreground">
            Your post is live. Redirecting you to the dashboard…
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
