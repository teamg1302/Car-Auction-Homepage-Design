import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer, Users, MapPin, Gauge, Settings2, FileText, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const featuredCars = [
  {
    id: 1,
    year: 2020,
    make: 'Audi',
    model: 'R8',
    trim: 'V10 Performance',
    image: '/images/audi-r8.jpg',
    mileage: '14,200 mi',
    transmission: '7-Speed S tronic',
    drivetrain: 'RWD',
    location: 'Chicago, IL',
    currentBid: 112000,
    bidCount: 32,
    timeLeft: '18h 42m',
    description: 'A daily-usable supercar with a naturally aspirated V10, magnetic ride, and a cockpit that still feels special. This R8 delivers exhilarating performance with the refinement you expect from Audi.',
    specs: [
      { label: 'Engine', value: 'V10 5.2L · 602 hp', icon: Zap },
      { label: 'Acceleration', value: '0-60 mph · 3.1 sec', icon: Gauge },
      { label: 'Top Speed', value: '205 mph', icon: Settings2 },
    ],
  },
  {
    id: 2,
    year: 2019,
    make: 'Porsche',
    model: '911',
    trim: 'Carrera S',
    image: '/images/porsche-911.jpg',
    mileage: '22,400 mi',
    transmission: 'PDK',
    drivetrain: 'RWD',
    location: 'Miami, FL',
    currentBid: 95000,
    bidCount: 28,
    timeLeft: '12h 15m',
    description: 'Immaculate 2019 Porsche 911 Carrera S with low mileage. Single owner, garage kept, all service records available. Features Sport Chrono Package and premium interior upgrades.',
    specs: [
      { label: 'Engine', value: '3.0L Twin-Turbo · 443 hp', icon: Zap },
      { label: 'Acceleration', value: '0-60 mph · 3.5 sec', icon: Gauge },
      { label: 'Top Speed', value: '191 mph', icon: Settings2 },
    ],
  },
  {
    id: 3,
    year: 2020,
    make: 'BMW',
    model: 'M4',
    trim: 'Competition',
    image: '/images/bmw-m4.jpg',
    mileage: '18,500 mi',
    transmission: 'DCT',
    drivetrain: 'RWD',
    location: 'Los Angeles, CA',
    currentBid: 78000,
    bidCount: 45,
    timeLeft: '6h 30m',
    description: '2020 BMW M4 Competition with the iconic S55 engine. Track-ready performance with luxury amenities. Carbon fiber accents and M Performance exhaust included.',
    specs: [
      { label: 'Engine', value: '3.0L Twin-Turbo I6 · 444 hp', icon: Zap },
      { label: 'Acceleration', value: '0-60 mph · 3.8 sec', icon: Gauge },
      { label: 'Top Speed', value: '180 mph', icon: Settings2 },
    ],
  },
  {
    id: 4,
    year: 2018,
    make: 'Mercedes-Benz',
    model: 'C63',
    trim: 'AMG S',
    image: '/images/mercedes-c63.jpg',
    mileage: '25,300 mi',
    transmission: '7-Speed AMG',
    drivetrain: 'RWD',
    location: 'New York, NY',
    currentBid: 68000,
    bidCount: 37,
    timeLeft: '9h 20m',
    description: '2018 Mercedes-AMG C63 S with handcrafted V8 power. Premium interior with AMG Performance Package. Perfect blend of luxury and performance.',
    specs: [
      { label: 'Engine', value: '4.0L Twin-Turbo V8 · 503 hp', icon: Zap },
      { label: 'Acceleration', value: '0-60 mph · 3.9 sec', icon: Gauge },
      { label: 'Top Speed', value: '180 mph', icon: Settings2 },
    ],
  },
];

export function FeaturedListingSection() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with scroll trigger
      if (titleRef.current) {
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
      }

      // Carousel animation with scroll trigger
      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current,
          { opacity: 0, scale: 0.95, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: carouselRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextCar = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredCars.length);
  };

  const prevCar = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredCars.length) % featuredCars.length);
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
      className="relative w-full min-h-screen py-12 md:py-16 lg:py-0 lg:h-screen overflow-hidden dark:bg-charcoal bg-background flex items-center justify-center"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl dark:text-white text-foreground text-center mb-8 md:mb-12 tracking-[0.02em] relative opacity-100"
          style={{ opacity: 1 }}
        >
          <span className="block">FEATURED</span>
          <span className="block text-gradient-accent">LISTINGS</span>
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-racing-red to-transparent" />
        </h2>

        {/* Carousel Container */}
        <div ref={carouselRef} className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevCar}
            className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 lg:-translate-x-12 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full dark:bg-white/10 bg-black/10 dark:border border-white/20 border-black/20 flex items-center justify-center dark:text-white/80 text-foreground/80 dark:hover:text-white hover:text-foreground dark:hover:bg-white/20 hover:bg-black/20 transition-all duration-300 backdrop-blur-sm group/btn"
            aria-label="Previous car"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.1,
                rotation: -5,
                duration: 0.3,
                ease: 'power2.out',
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out',
              });
            }}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover/btn:-translate-x-1" />
          </button>
          <button
            onClick={nextCar}
            className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 lg:translate-x-12 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full dark:bg-white/10 bg-black/10 dark:border border-white/20 border-black/20 flex items-center justify-center dark:text-white/80 text-foreground/80 dark:hover:text-white hover:text-foreground dark:hover:bg-white/20 hover:bg-black/20 transition-all duration-300 backdrop-blur-sm group/btn"
            aria-label="Next car"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: 'power2.out',
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out',
              });
            }}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>

          {/* Carousel Cards */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {featuredCars.map((car, index) => {
                const isActive = index === currentIndex;
                const offset = Math.abs(index - currentIndex);
                const opacity = offset === 0 ? 1 : offset === 1 ? 0.3 : 0.1;
                const scale = offset === 0 ? 1 : offset === 1 ? 0.95 : 0.9;

                return (
                  <div
                    key={car.id}
                    className="w-full flex-shrink-0 px-2 sm:px-4 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      opacity,
                      transform: `scale(${scale}) translateZ(0)`,
                      pointerEvents: isActive ? 'auto' : 'none',
                      willChange: 'transform, opacity',
                    }}
                  >
                    <div className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden dark:border border-white/[0.06] border-black/[0.08] card-shadow">
                      <div className="grid grid-cols-1 lg:grid-cols-5 h-[500px] sm:h-[600px] lg:h-[550px]">
                        {/* Image Panel (60%) */}
                        <div className="lg:col-span-3 relative h-64 sm:h-80 md:h-96 lg:h-full overflow-hidden">
                          <img
                            src={car.image}
                            alt={`${car.year} ${car.make} ${car.model} ${car.trim}`}
                            className="w-full h-full object-contain lg:object-cover"
                          />
                          <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-transparent dark:via-transparent dark:to-charcoal-light/90 bg-gradient-to-r from-transparent via-transparent to-card/90 hidden lg:block" />
                          <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-charcoal-light dark:via-transparent dark:to-transparent bg-gradient-to-t from-card via-transparent to-transparent lg:hidden" />
                          
                          {/* Year Badge */}
                          <Badge className="absolute top-4 left-4 bg-racing-red text-white font-display font-bold text-lg px-4 py-1">
                            {car.year}
                          </Badge>
                        </div>

                        {/* Content Panel (40%) */}
                        <div className="lg:col-span-2 dark:bg-charcoal-light/90 bg-card/90 backdrop-blur-sm p-4 sm:p-6 lg:p-8 flex flex-col h-full overflow-y-auto">
                          {/* Title */}
                          <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl dark:text-white text-foreground mb-2">
                            {car.make} {car.model} {car.trim}
                          </h3>

                          {/* Meta */}
                          <p className="text-xs sm:text-sm dark:text-white/50 text-foreground/50 mb-4 sm:mb-6">
                            Coupe · {car.mileage} · {car.transmission} · {car.drivetrain}
                          </p>

                          {/* Description */}
                          <p className="dark:text-white/70 text-foreground/70 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                            {car.description}
                          </p>

                          {/* Specs */}
                          <div className="space-y-3 mb-6">
                            {car.specs.map((spec) => (
                              <div key={spec.label} className="flex items-center gap-3">
                                <spec.icon className="w-4 h-4 text-racing-red" />
                                <span className="text-sm dark:text-white/60 text-foreground/60">{spec.value}</span>
                              </div>
                            ))}
                          </div>

                          {/* Location */}
                          <div className="flex items-center gap-2 text-sm dark:text-white/40 text-foreground/40 mb-6">
                            <MapPin className="w-4 h-4" />
                            <span>{car.location}</span>
                          </div>

                          {/* Bid Info */}
                          <div className="flex items-center justify-between mb-4 sm:mb-6 p-3 sm:p-4 dark:bg-white/5 bg-black/5 rounded-xl">
                            <div>
                              <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">Current bid</p>
                              <p className="font-display font-bold text-xl sm:text-2xl text-racing-red">
                                {formatPrice(car.currentBid)}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-xs dark:text-white/50 text-foreground/50 mb-1">
                                <Users className="w-3.5 h-3.5" />
                                <span>{car.bidCount} bids</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-racing-red">
                                <Timer className="w-3.5 h-3.5" />
                                <span>{car.timeLeft}</span>
                              </div>
                            </div>
                          </div>

                          {/* CTAs - pushed to bottom with margin auto */}
                          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                            <Button 
                              className="flex-1 bg-racing-red hover:bg-racing-dark text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow group/btn relative overflow-hidden"
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
                              <span className="relative z-10">Place bid</span>
                              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 dark:border-white/20 border-black/20 dark:text-white text-foreground dark:hover:bg-white/5 hover:bg-black/5 rounded-xl group/btn relative overflow-hidden"
                              onMouseEnter={(e) => {
                                gsap.to(e.currentTarget, {
                                  scale: 1.02,
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
                              <FileText className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                              <span className="ml-2">vehicle history</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
            {featuredCars.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 relative ${
                  index === currentIndex
                    ? 'w-8 bg-racing-red'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to car ${index + 1}`}
                onMouseEnter={(e) => {
                  if (index !== currentIndex) {
                    gsap.to(e.currentTarget, {
                      scale: 1.3,
                      duration: 0.2,
                      ease: 'power2.out',
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentIndex) {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      duration: 0.2,
                      ease: 'power2.out',
                    });
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
