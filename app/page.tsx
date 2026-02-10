import { LandingNav } from './components/landing-nav';
import { LandingHero } from './components/landing-hero';
import { LandingFeatures } from './components/landing-features';
import { LandingTestimonials } from './components/landing-testimonials';
import { LandingCTA } from './components/landing-cta';

export default function Home() {
  return (
    <>
      <LandingNav />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingTestimonials />
        <LandingCTA />
      </main>
    </>
  );
}
