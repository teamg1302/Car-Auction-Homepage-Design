import { useEffect, useRef } from 'react';
import { Search, Gavel, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    id: 1,
    number: '01',
    title: 'Browse & Inspect',
    description:
      'Filter by make, price, and location. Review reports and ask sellers questions before placing your bid.',
    icon: Search,
  },
  {
    id: 2,
    number: '02',
    title: 'Place Your Bid',
    description:
      'Set your max bid or bid in real time. We\'ll keep you in the loop at every step with instant notifications.',
    icon: Gavel,
  },
  {
    id: 3,
    number: '03',
    title: 'Win & Secure',
    description:
      'Pay securely, arrange shipping or pickup, and get the title transferred fast. Your dream car is waiting.',
    icon: ShieldCheck,
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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

      // Cards staggered animation with scroll trigger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { 
            x: 100, 
            opacity: 0, 
            scale: 0.9,
            rotationY: 15,
          },
          { 
            x: 0, 
            opacity: 1, 
            scale: 1,
            rotationY: 0,
            duration: 0.9,
            ease: 'back.out(1.1)',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Enhanced hover animation
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.03,
            y: -8,
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative w-full min-h-screen py-12 md:py-16 lg:py-0 lg:h-screen overflow-hidden bg-charcoal flex items-center justify-center"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white text-center mb-8 md:mb-12 lg:mb-16 tracking-[0.02em] relative"
        >
          <span className="block">HOW BIDDING</span>
          <span className="block text-gradient-accent">WORKS</span>
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-racing-red to-transparent" />
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative bg-charcoal-light rounded-2xl p-6 sm:p-8 border border-white/[0.06] card-shadow hover-lift overflow-hidden"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-racing-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Step Number */}
              <div className="relative">
                <span className="font-display font-bold text-6xl text-white/5">
                  {step.number}
                </span>
              </div>

              {/* Icon */}
              <div className="relative -mt-8 mb-6">
                <div className="w-14 h-14 rounded-xl bg-racing-red/10 flex items-center justify-center group-hover:bg-racing-red/20 transition-colors duration-300">
                  <step.icon className="w-7 h-7 text-racing-red" />
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="font-display font-semibold text-xl text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-red/0 via-racing-red/50 to-racing-red/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
