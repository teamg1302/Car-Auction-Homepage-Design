import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const bodyTypes = [
  { id: 1, name: 'Coupes', image: '/images/type-coupe.jpg', count: 124 },
  { id: 2, name: 'Sedans', image: '/images/type-sedan.jpg', count: 89 },
  { id: 3, name: 'SUVs', image: '/images/type-suv.jpg', count: 156 },
  { id: 4, name: 'Convertibles', image: '/images/type-convertible.jpg', count: 67 },
  { id: 5, name: 'Trucks', image: '/images/type-truck.jpg', count: 93 },
  { id: 6, name: 'Classics', image: '/images/type-classic.jpg', count: 45 },
];

export function BodyTypeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Tiles staggered animation with scroll trigger
      tilesRef.current.forEach((tile, index) => {
        if (!tile) return;

        const row = Math.floor(index / 3);
        const col = index % 3;
        const delay = (row * 3 + col) * 0.08;

        gsap.fromTo(
          tile,
          { 
            y: 60, 
            opacity: 0, 
            scale: 0.88,
            rotation: -2,
          },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: 'back.out(1.1)',
            delay: delay,
            scrollTrigger: {
              trigger: tile,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Enhanced hover animation
        tile.addEventListener('mouseenter', () => {
          gsap.to(tile, {
            scale: 1.05,
            y: -8,
            rotation: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        });

        tile.addEventListener('mouseleave', () => {
          gsap.to(tile, {
            scale: 1,
            y: 0,
            duration: 0.4,
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
      className="relative w-full min-h-screen py-12 md:py-16 lg:py-0 lg:h-screen overflow-hidden bg-charcoal flex items-center justify-center"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white text-center mb-8 md:mb-12 tracking-[0.02em] relative"
        >
          <span className="block">BROWSE BY</span>
          <span className="block text-gradient-accent">BODY TYPE</span>
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-racing-red to-transparent" />
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
          {bodyTypes.map((type, index) => (
            <div
              key={type.id}
              ref={(el) => { tilesRef.current[index] = el; }}
              className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.06] cursor-pointer hover-lift"
            >
              {/* Image */}
              <img
                src={type.image}
                alt={type.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                <h3 className="font-display font-semibold text-base sm:text-xl md:text-2xl text-white mb-1">
                  {type.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/50">{type.count} listings</p>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-racing-red/0 transition-colors duration-300 group-hover:border-racing-red/50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
