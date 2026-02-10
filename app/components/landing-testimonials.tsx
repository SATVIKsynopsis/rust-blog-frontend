'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex Chen',
    handle: '@alexwrites',
    role: 'Travel Blogger',
    content: 'I went from 0 to 50K followers in 6 months. This platform made it so easy to focus on writing.',
    avatar: '🌍',
  },
  {
    name: 'Sarah Mitchell',
    handle: '@sarahstories',
    role: 'Fiction Writer',
    content: 'The community here is incredible. Real feedback from real readers who care about good writing.',
    avatar: '✍️',
  },
  {
    name: 'James Park',
    handle: '@jamestech',
    role: 'Tech Journalist',
    content: 'Built-in analytics helped me understand my audience better than any other platform I\'ve used.',
    avatar: '💻',
  },
];

export function LandingTestimonials() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-balance mb-4">
            Loved by creators
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of writers already publishing and growing on our platform.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.handle}
              className="p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-card-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.handle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
