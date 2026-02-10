'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LandingCTA() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
          Ready to share your story?
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-10">
          Join our community of creators and start publishing today. It's free, fast, and beautiful.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="rounded-full h-14 px-8 text-base font-semibold">
              Start Publishing Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-base font-semibold border-primary/20 hover:border-primary/40 bg-transparent">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
