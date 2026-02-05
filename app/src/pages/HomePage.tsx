// Home Page - Main landing page
import { useEffect, useRef } from 'react';
import { HeroSection } from '@/sections/HeroSection';
import { FeaturedAuctionsSection } from '@/sections/FeaturedAuctionsSection';
import { BodyTypeSection } from '@/sections/BodyTypeSection';
import { FeaturedListingSection } from '@/sections/FeaturedListingSection';
import { HowItWorksSection } from '@/sections/HowItWorksSection';
import { EndingSoonSection } from '@/sections/EndingSoonSection';
import { SellCarSection } from '@/sections/SellCarSection';
import { ReviewsNewsletterSection } from '@/sections/ReviewsNewsletterSection';
import gsap from 'gsap';

export function HomePage() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Smooth page fade-in
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        }
      );
    }
  }, []);

  return (
    <main ref={mainRef} className="relative">
      <HeroSection />
      <FeaturedAuctionsSection />
      <BodyTypeSection />
      <FeaturedListingSection />
      <HowItWorksSection />
      <EndingSoonSection />
      <SellCarSection />
      <ReviewsNewsletterSection />
    </main>
  );
}
