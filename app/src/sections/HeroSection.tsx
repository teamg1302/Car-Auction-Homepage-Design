import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Shield, Truck, CreditCard } from 'lucide-react';
import { ROUTES } from '@/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const makes = ['Any Make', 'Porsche', 'BMW', 'Mercedes-Benz', 'Audi', 'Ferrari', 'Lamborghini'];
const models = ['Any Model', '911', 'M4', 'C63', 'R8', '488 GTB', 'Huracan'];
const priceRanges = ['Any Price', 'Under $50k', '$50k - $100k', '$100k - $200k', '$200k+'];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const searchCardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const [selectedMake, setSelectedMake] = useState('Any Make');
  const [selectedModel, setSelectedModel] = useState('Any Model');
  const [selectedPriceRange, setSelectedPriceRange] = useState('Any Price');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial load animation with smoother easing
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Background fade in with parallax effect
      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.08 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.4,
          ease: 'power2.out'
        }
      );

      // Parallax effect on scroll
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Headline animation with letter stagger effect
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.9,
          ease: 'back.out(1.2)'
        },
        '-=1.2'
      );

      // Subheadline animation
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          ease: 'power3.out'
        },
        '-=0.5'
      );

      // Search card animation with bounce
      tl.fromTo(
        searchCardRef.current,
        { opacity: 0, y: 50, scale: 0.95, rotationX: 5 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationX: 0,
          duration: 0.9,
          ease: 'back.out(1.1)'
        },
        '-=0.4'
      );

      // Trust badges fade in
      const badges = sectionRef.current?.querySelectorAll('.flex.flex-wrap.items-center');
      if (badges && badges[0]) {
        gsap.fromTo(
          badges[0].children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.8,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/hero-bg.jpg"
          alt="Luxury sports car"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/60 to-charcoal/85" />
        {/* Atmospheric overlay */}
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-charcoal/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 md:pt-28">
        <div className="max-w-6xl mx-auto text-center">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-white tracking-[0.02em] leading-[0.9] mb-6 sm:mb-8 relative"
            style={{ opacity: 0 }}
          >
            <span className="block">BID ON CARS</span>
            <span className="block text-gradient-accent relative">
              WORTH DRIVING
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-racing-red via-racing-red/50 to-transparent opacity-60" />
            </span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4 sm:px-0 font-light tracking-wide"
            style={{ opacity: 0 }}
          >
            <span className="font-semibold text-white">Live auctions.</span> Verified sellers.{' '}
            <span className="font-semibold text-white">Real enthusiasts.</span>
          </p>

          {/* Search Card */}
          <div
            ref={searchCardRef}
            className="glass-card-strong p-4 sm:p-6 md:p-8 lg:p-10 max-w-5xl mx-auto relative overflow-hidden"
            style={{ opacity: 0 }}
          >
            {/* Background mesh gradient */}
            <div className="absolute inset-0 mesh-gradient opacity-50" />
            
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-racing-red/20 to-transparent blur-3xl" />
            
            <h3 className="text-left text-white font-display text-xl sm:text-2xl mb-6 sm:mb-8 tracking-wider relative z-10">
              FIND YOUR NEXT CAR
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative z-10">
              {/* Make Dropdown */}
              <div className="relative">
                <label className="block text-xs text-white/60 uppercase tracking-[0.1em] mb-3 font-semibold">
                  Make
                </label>
                <Select value={selectedMake} onValueChange={setSelectedMake}>
                  <SelectTrigger className="w-full bg-white/[0.08] border-white/15 text-white h-12 px-5 py-3.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-charcoal-light border-white/10">
                    {makes.map((make) => (
                      <SelectItem key={make} value={make} className="text-white">
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Model Dropdown */}
              <div className="relative">
                <label className="block text-xs text-white/60 uppercase tracking-[0.1em] mb-3 font-semibold">
                  Model
                </label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-full bg-white/[0.08] border-white/15 text-white h-12 px-5 py-3.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-charcoal-light border-white/10">
                    {models.map((model) => (
                      <SelectItem key={model} value={model} className="text-white">
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Dropdown */}
              <div className="relative">
                <label className="block text-xs text-white/60 uppercase tracking-[0.1em] mb-3 font-semibold">
                  Price Range
                </label>
                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger className="w-full bg-white/[0.08] border-white/15 text-white h-12 px-5 py-3.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-charcoal-light border-white/10">
                    {priceRanges.map((range) => (
                      <SelectItem key={range} value={range} className="text-white">
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div className="flex items-end sm:col-span-2 lg:col-span-1">
                <Link to={ROUTES.BROWSE} className="w-full">
                  <Button className="relative w-full bg-gradient-to-r from-racing-red to-racing-dark hover:from-racing-dark hover:to-racing-red text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(217,43,43,0.5)] flex items-center justify-center gap-2 uppercase tracking-wider text-xs sm:text-sm overflow-hidden group">
                    <Search className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Search Listings</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12 px-4">
            <div className="flex items-center gap-2 sm:gap-3 text-white/70 text-xs sm:text-sm font-medium group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-racing-red/20 group-hover:border-racing-red/50 transition-all duration-300">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 group-hover:text-racing-red transition-colors" />
              </div>
              <span className="tracking-wide">Free to bid</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-white/70 text-xs sm:text-sm font-medium group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-racing-red/20 group-hover:border-racing-red/50 transition-all duration-300">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 group-hover:text-racing-red transition-colors" />
              </div>
              <span className="tracking-wide">Secure checkout</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-white/70 text-xs sm:text-sm font-medium group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-racing-red/20 group-hover:border-racing-red/50 transition-all duration-300">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 group-hover:text-racing-red transition-colors" />
              </div>
              <span className="tracking-wide">Nationwide shipping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
