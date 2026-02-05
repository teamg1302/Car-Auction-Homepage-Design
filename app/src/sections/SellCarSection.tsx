import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const benefits = [
  'Free listing setup',
  'Verified bidder profiles',
  'Secure payment & title transfer',
];

export function SellCarSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance with scroll trigger
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { x: -100, opacity: 0, scale: 0.92, rotationY: -10 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Content stagger with scroll trigger
      const contentElements = contentRef.current?.children;
      if (contentElements) {
        gsap.fromTo(
          Array.from(contentElements),
          { x: -30, opacity: 0, y: 20 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
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
      id="sell"
      className="relative w-full min-h-screen py-12 md:py-16 lg:py-0 lg:h-screen overflow-hidden bg-charcoal flex items-center justify-center"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12">
        {/* Sell Card */}
        <div
          ref={cardRef}
          className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden border border-white/[0.06] card-shadow"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[400px] sm:min-h-[500px]">
            {/* Content Panel (45%) */}
            <div className="lg:col-span-2 bg-charcoal-light/90 backdrop-blur-sm p-4 sm:p-6 lg:p-10 flex flex-col justify-center order-2 lg:order-1">
              <div ref={contentRef}>
                {/* Title */}
                <h2 className="font-display font-bold text-2xl lg:text-3xl text-white mb-4">
                  Sell your car to real enthusiasts
                </h2>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  List in minutes, set your reserve, and let the market decide. 
                  No haggling, no tire kickers—just serious buyers who appreciate 
                  what you have.
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-8">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-racing-red/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-racing-red" />
                      </div>
                      <span className="text-sm text-white/80">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to={ROUTES.SELL}>
                    <Button 
                      className="bg-racing-red hover:bg-racing-dark text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow flex items-center gap-2 group/btn relative overflow-hidden"
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, {
                          scale: 1.03,
                          duration: 0.3,
                          ease: 'power2.out',
                        });
                        gsap.to(e.currentTarget.querySelector('.w-4'), {
                          x: 4,
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
                          duration: 0.3,
                          ease: 'power2.out',
                        });
                      }}
                    >
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      <span className="relative z-10">Start your listing</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                    </Button>
                  </Link>
                  <Link to={ROUTES.HOW_IT_WORKS}>
                    <Button
                      variant="ghost"
                      className="text-white/60 hover:text-white hover:bg-white/5 group/btn"
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, {
                          scale: 1.02,
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
                      }}
                    >
                      Learn more about selling
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Image Panel (55%) */}
            <div className="lg:col-span-3 relative h-64 sm:h-80 md:h-96 lg:h-auto order-1 lg:order-2">
              <img
                src="/images/sell-car.jpg"
                alt="Sell your car"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-charcoal-light/90 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-light via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
