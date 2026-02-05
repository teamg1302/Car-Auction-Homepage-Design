import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch (error) {
    console.warn('ScrollTrigger plugin not available, using fallback animations');
  }
}

// Smooth scroll configuration
export const smoothScrollConfig = {
  duration: 0.7,
  ease: 'power3.inOut',
};

// Animation presets
export const animationPresets = {
  fadeInUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0, duration: 1, ease: 'power4.out' },
  },
  fadeInScale: {
    from: { opacity: 0, scale: 0.95 },
    to: { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' },
  },
  slideInLeft: {
    from: { opacity: 0, x: -100 },
    to: { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
  },
  slideInRight: {
    from: { opacity: 0, x: 100 },
    to: { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
  },
};
