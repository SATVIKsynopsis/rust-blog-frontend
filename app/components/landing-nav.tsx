'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pen } from 'lucide-react';

export function LandingNav() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <Pen className="w-5 h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            StoryHub
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
            Stories
          </Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
        </nav>

        {/* CTA buttons */}
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="rounded-full">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
