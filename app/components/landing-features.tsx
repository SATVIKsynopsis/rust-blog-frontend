'use client';

import { Pen, Users, Zap, Shield, Sparkles, TrendingUp as Trending } from 'lucide-react';

const features = [
  {
    icon: Pen,
    title: 'Powerful Editor',
    description: 'Rich text editing with formatting, embeds, and media. Write beautifully without distractions.',
  },
  {
    icon: Users,
    title: 'Build Community',
    description: 'Connect with readers, get feedback, and grow your audience with built-in engagement tools.',
  },
  {
    icon: Trending,
    title: 'Discover & Grow',
    description: 'Get recommended to readers interested in your topics. Track analytics and improve your reach.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Control who reads your work. Publish publicly or share with specific communities.',
  },
  {
    icon: Zap,
    title: 'Fast & Reliable',
    description: 'Lightning-fast loading times and 99.9% uptime. Your stories deserve a fast platform.',
  },
  {
    icon: Sparkles,
    title: 'AI Powered',
    description: 'Get writing suggestions, auto-generated titles, and hashtag recommendations.',
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 sm:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-balance mb-4">
            Everything you need
          </h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            From writing to publishing, we've built the tools creators deserve.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                {/* Title and description */}
                <h3 className="text-xl font-bold mb-3 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-8 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
