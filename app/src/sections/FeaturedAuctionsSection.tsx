import { useEffect, useRef, useState } from 'react';
import { CarCard } from '@/components/CarCard';
import { carService } from '@/services';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Auction } from '@/types';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function FeaturedAuctionsSection() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const loadFeaturedAuctions = async () => {
      const featured = await carService.getFeaturedAuctions();
      setAuctions(featured);
    };
    loadFeaturedAuctions();
  }, []);

  useEffect(() => {
    if (auctions.length === 0) return;

    const ctx = gsap.context(() => {
      // Title animation with scroll trigger
      gsap.fromTo(
        titleRef.current,
        { y: -60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animations with scroll trigger and smooth stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const isLeft = index === 0;
        const isRight = index === 2;
        const isCenter = index === 1;

        let fromX = 0;
        let fromY = 0;
        let fromRotateY = 0;

        if (isLeft) {
          fromX = -100;
        } else if (isRight) {
          fromX = 100;
        } else if (isCenter) {
          fromY = 80;
        }

        // Smooth entrance animation with scroll trigger
        gsap.fromTo(
          card,
          {
            x: fromX,
            y: fromY,
            opacity: 0,
            scale: 0.9,
            rotateY: fromRotateY,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Hover animation enhancement
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.02,
            y: -5,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [auctions]);

  return (
    <section
      ref={sectionRef}
      id="featured"
      className="relative w-full min-h-screen py-12 md:py-16 lg:py-0 lg:h-screen overflow-hidden dark:bg-charcoal bg-background flex items-center justify-center"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl dark:text-white text-foreground text-center mb-8 md:mb-12 lg:mb-16 tracking-[0.02em] relative"
        >
          <span className="block">FEATURED LIVE</span>
          <span className="block text-gradient-accent">AUCTIONS</span>
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-racing-red to-transparent" />
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {auctions.map((auction, index) => (
            <div
              key={auction.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              style={{ perspective: '1000px' }}
            >
              <CarCard auction={auction} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
