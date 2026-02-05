import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const reviews = [
  {
    id: 1,
    name: 'Michael R.',
    car: '2019 Porsche 911',
    rating: 5,
    text: 'Smooth transaction from start to finish. The verification process gave me confidence in my purchase.',
  },
  {
    id: 2,
    name: 'Sarah L.',
    car: '2020 BMW M4',
    rating: 5,
    text: 'Found my dream car at a great price. The bidding system is transparent and exciting.',
  },
  {
    id: 3,
    name: 'David K.',
    car: '2018 Mercedes C63',
    rating: 5,
    text: 'Sold my car in under a week. The platform attracted serious buyers who knew what they wanted.',
  },
];

export function ReviewsNewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const title = sectionRef.current?.querySelector('h2');
      if (title) {
        gsap.fromTo(
          title,
          { y: -40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Reviews animation with scroll trigger
      const reviewCards = reviewsRef.current?.children;
      if (reviewCards) {
        gsap.fromTo(
          Array.from(reviewCards),
          { y: 50, opacity: 0, scale: 0.9, rotationX: 10 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'back.out(1.1)',
            scrollTrigger: {
              trigger: reviewsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Enhanced hover for review cards
        Array.from(reviewCards).forEach((card) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.03,
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
      }

      // Newsletter animation with scroll trigger
      if (newsletterRef.current) {
        gsap.fromTo(
          newsletterRef.current,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: newsletterRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 bg-charcoal"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto">
        {/* Reviews Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white text-center mb-8 sm:mb-12 tracking-[0.02em] relative">
            <span className="block">WHAT THE</span>
            <span className="block text-gradient-accent">COMMUNITY SAYS</span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-racing-red to-transparent" />
          </h2>

          <div ref={reviewsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-charcoal-light rounded-2xl p-6 border border-white/[0.06]"
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-racing-red text-racing-red" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  "{review.text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium text-sm">{review.name}</span>
                  <Badge variant="secondary" className="bg-white/5 text-white/50 text-xs">
                    {review.car}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div
          ref={newsletterRef}
          className="bg-charcoal-light rounded-2xl p-6 sm:p-8 md:p-12 border border-white/[0.06] text-center"
        >
          <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-white mb-3">
            Get the next drop in your inbox
          </h3>
          <p className="text-white/50 text-xs sm:text-sm mb-6 sm:mb-8">
            Weekly auction picks. No spam.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl focus:border-racing-red/50"
            />
            <Button 
              className="bg-racing-red hover:bg-racing-dark text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 uppercase group/btn relative overflow-hidden"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.05,
                  duration: 0.3,
                  ease: 'power2.out',
                });
                gsap.to(e.currentTarget.querySelector('.w-4'), {
                  x: 2,
                  y: -2,
                  duration: 0.3,
                  ease: 'power2.out',
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.3,
                  ease: 'power2.out',
                });
                gsap.to(e.currentTarget.querySelector('.w-4'), {
                  x: 0,
                  y: 0,
                  duration: 0.3,
                  ease: 'power2.out',
                });
              }}
            >
              <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
              <span className="relative z-10">Subscribe</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
