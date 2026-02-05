import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const endingSoonCars = [
  {
    id: 1,
    image: '/images/mustang-gt.jpg',
    year: 2016,
    make: 'Ford',
    model: 'Mustang GT',
    currentBid: 28500,
    bidCount: 42,
    endsIn: { hours: 4, minutes: 12 },
  },
  {
    id: 2,
    image: '/images/camaro-ss.jpg',
    year: 2019,
    make: 'Chevrolet',
    model: 'Camaro SS',
    currentBid: 34000,
    bidCount: 28,
    endsIn: { hours: 5, minutes: 48 },
  },
  {
    id: 3,
    image: '/images/nissan-gtr.jpg',
    year: 2017,
    make: 'Nissan',
    model: 'GT-R Premium',
    currentBid: 62000,
    bidCount: 56,
    endsIn: { hours: 6, minutes: 22 },
  },
  {
    id: 4,
    image: '/images/challenger-srt.jpg',
    year: 2015,
    make: 'Dodge',
    model: 'Challenger SRT',
    currentBid: 31200,
    bidCount: 35,
    endsIn: { hours: 7, minutes: 5 },
  },
];

export function EndingSoonSection() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with scroll trigger
      gsap.fromTo(
        titleRef.current,
        { x: -80, opacity: 0, scale: 0.95 },
        {
          x: 0,
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

      // Carousel animation with scroll trigger
      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current,
          { x: 100, opacity: 0, scale: 0.95 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: carouselRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Animate carousel cards on scroll
        const cards = carouselRef.current.querySelectorAll('.group');
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: 'back.out(1.1)',
              delay: index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // CTA animation with scroll trigger
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    const container = carouselRef.current;
    if (!container) return;

    const cardWidth = 300 + 24; // card width + gap
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - cardWidth)
      : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + cardWidth);
    
    container.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScrollPosition(newPosition);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-12 md:py-16 lg:py-0 lg:h-screen overflow-hidden dark:bg-charcoal-light bg-card flex items-center justify-center"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 max-w-6xl mx-auto gap-4">
          <h2
            ref={titleRef}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl dark:text-white text-foreground tracking-[0.02em] relative"
          >
            <span className="block">ENDING</span>
            <span className="block text-gradient-accent">SOON</span>
            <span className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-transparent via-racing-red to-transparent" />
          </h2>
          
          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              className="w-10 h-10 rounded-full dark:bg-white/5 bg-black/5 dark:border border-white/10 border-black/10 flex items-center justify-center dark:text-white/60 text-foreground/60 dark:hover:text-white hover:text-foreground dark:hover:bg-white/10 hover:bg-black/10 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="w-10 h-10 rounded-full dark:bg-white/5 bg-black/5 dark:border border-white/10 border-black/10 flex items-center justify-center dark:text-white/60 text-foreground/60 dark:hover:text-white hover:text-foreground dark:hover:bg-white/10 hover:bg-black/10 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 max-w-6xl mx-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {endingSoonCars.map((car) => (
            <div
              key={car.id}
              className="group flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px] snap-start"
            >
              <div className="dark:bg-charcoal bg-card rounded-2xl overflow-hidden dark:border border-white/[0.06] border-black/[0.08] card-shadow hover-lift">
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={car.image}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-charcoal dark:via-transparent dark:to-transparent bg-gradient-to-t from-card via-transparent to-transparent" />
                  
                  {/* Urgency Badge */}
                  <Badge className="absolute top-3 left-3 bg-racing-red text-white animate-pulse-glow">
                    <Timer className="w-3 h-3 mr-1" />
                    Ends in {car.endsIn.hours}h {car.endsIn.minutes}m
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Title */}
                  <h3 className="font-display font-semibold text-lg dark:text-white text-foreground mb-1">
                    {car.year} {car.make} {car.model}
                  </h3>

                  {/* Bid Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs dark:text-white/50 text-foreground/50 mb-0.5">Current bid</p>
                      <p className="font-display font-bold text-lg text-racing-red">
                        {formatPrice(car.currentBid)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs dark:text-white/50 text-foreground/50">
                      <Users className="w-3.5 h-3.5" />
                      <span>{car.bidCount} bids</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center mt-10">
          <Button
            variant="outline"
            className="dark:border-white/20 border-black/20 dark:text-white text-foreground dark:hover:bg-white/5 hover:bg-black/5 rounded-xl px-8 group/btn relative overflow-hidden"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
                duration: 0.3,
                ease: 'power2.out',
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                duration: 0.3,
                ease: 'power2.out',
              });
            }}
          >
            <span className="relative z-10">View all ending soon</span>
            <span className="absolute inset-0 bg-gradient-to-r from-racing-red/0 via-racing-red/10 to-racing-red/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
          </Button>
        </div>
      </div>
    </section>
  );
}
