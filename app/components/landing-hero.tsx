'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-purple-50 dark:to-purple-950/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-1/4 w-96 h-96 bg-gradient-to-r from-accent/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            The platform for creators
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
          Share Your{' '}
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Stories
          </span>
          <br />
          With the World
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-10">
          Create, publish, and grow your audience. A beautiful platform designed for writers, creators, and storytellers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/register">
            <Button size="lg" className="rounded-full h-14 px-8 text-base font-semibold">
              Start Publishing
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-base font-semibold border-primary/20 hover:border-primary/40 bg-transparent">
              See Features
            </Button>
          </Link>
        </div>

        {/* Social proof */}
        <div className="text-sm text-muted-foreground">
          <p className="mb-4">Trusted by creators worldwide</p>
          <div className="flex justify-center gap-8 items-center flex-wrap">
            <div className="font-semibold text-foreground">10K+ Stories</div>
            <div className="w-1 h-1 bg-border rounded-full" />
            <div className="font-semibold text-foreground">50K+ Readers</div>
            <div className="w-1 h-1 bg-border rounded-full" />
            <div className="font-semibold text-foreground">100+ Communities</div>
          </div>
        </div>
      </div>
    </section>
  );
}
