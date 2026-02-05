import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Search,
  Gavel,
  ShieldCheck,
  Upload,
  CheckCircle,
  Clock,
  DollarSign,
  Heart,
  FileText,
  Users,
  Zap,
  CreditCard,
  Truck,
  Bell,
  TrendingUp,
  Lock,
  Eye,
  MessageSquare,
} from 'lucide-react';
import { ROUTES } from '@/constants';
import gsap from 'gsap';

const buyerSteps = [
  {
    id: 1,
    number: '01',
    title: 'Create Your Account',
    description:
      'Sign up for free in seconds. No credit card required to browse or bid. Verify your identity to start bidding on auctions.',
    icon: Users,
  },
  {
    id: 2,
    number: '02',
    title: 'Browse & Discover',
    description:
      'Search by make, model, year, price range, and more. Filter by auction state, body type, and condition. Save favorites to your watchlist.',
    icon: Search,
  },
  {
    id: 3,
    number: '03',
    title: 'Inspect & Research',
    description:
      'Review detailed vehicle information, high-resolution photos, and ask sellers questions. Check bid history and current auction status.',
    icon: Eye,
  },
  {
    id: 4,
    number: '04',
    title: 'Place Your Bid',
    description:
      'Set your maximum bid or bid in real-time. Our system automatically bids for you up to your maximum. Get instant notifications when you\'re outbid.',
    icon: Gavel,
  },
  {
    id: 5,
    number: '05',
    title: 'Win & Complete Purchase',
    description:
      'If you win, securely pay through our Stripe integration. Arrange shipping or pickup, and complete title transfer. We handle the transaction securely.',
    icon: ShieldCheck,
  },
];

const sellerSteps = [
  {
    id: 1,
    number: '01',
    title: 'Create Your Listing',
    description:
      'Upload detailed vehicle information including make, model, year, mileage, condition, and history. Add multiple high-resolution photos showcasing your vehicle.',
    icon: Upload,
  },
  {
    id: 2,
    number: '02',
    title: 'Set Auction Details',
    description:
      'Choose your starting bid, reserve price (optional), and auction duration. Set the end date and time for your auction.',
    icon: Clock,
  },
  {
    id: 3,
    number: '03',
    title: 'Submit for Review',
    description:
      'Your listing is reviewed by our team to ensure quality and accuracy. Once approved, your auction goes live and appears in browse listings.',
    icon: CheckCircle,
  },
  {
    id: 4,
    number: '04',
    title: 'Monitor Your Auction',
    description:
      'Track bids in real-time through your seller dashboard. Answer buyer questions and watch as your auction gains attention.',
    icon: TrendingUp,
  },
  {
    id: 5,
    number: '05',
    title: 'Complete the Sale',
    description:
      'Once the auction ends, we handle payment processing. You receive your payout (minus our fee) and coordinate vehicle transfer with the buyer.',
    icon: DollarSign,
  },
];

const auctionFeatures = [
  {
    icon: Zap,
    title: 'Real-Time Bidding',
    description:
      'Watch bids update live as they happen. Our WebSocket technology ensures you see every bid instantly, keeping the competition fair and transparent.',
  },
  {
    icon: Lock,
    title: 'Sniping Protection',
    description:
      'If a bid is placed in the final moments, the auction automatically extends to prevent last-second sniping. This gives everyone a fair chance to participate.',
  },
  {
    icon: ShieldCheck,
    title: 'Reserve Price Protection',
    description:
      'Sellers can set a reserve price. If bidding doesn\'t reach the reserve, the seller isn\'t obligated to sell. Winning bids must meet or exceed the reserve.',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description:
      'Get instant alerts when you\'re outbid, when auctions you\'re watching are ending soon, or when new listings match your saved searches.',
  },
];

const paymentFeatures = [
  {
    icon: CreditCard,
    title: 'Secure Checkout',
    description:
      'All payments are processed securely through Stripe. Your payment information is encrypted and never stored on our servers.',
  },
  {
    icon: DollarSign,
    title: 'Transparent Fees',
    description:
      'Buyers pay a small buyer\'s fee on top of the winning bid. Sellers pay a commission only when their vehicle sells. All fees are clearly displayed.',
  },
  {
    icon: FileText,
    title: 'Transaction History',
    description:
      'View complete transaction history in your dashboard. Download receipts and invoices for all purchases and sales.',
  },
  {
    icon: Truck,
    title: 'Shipping & Pickup',
    description:
      'Coordinate vehicle delivery or pickup directly with the seller. We provide guidance and support throughout the transfer process.',
  },
];

export function HowItWorksPage() {
  const pageRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }
      );
    }, pageRef);

    // Section animations with Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            entry.target,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            }
          );
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      ctx.revert();
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <main ref={pageRef} className="relative pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full py-24 md:py-32 overflow-hidden"
        style={{ opacity: 0 }}
      >
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white mb-4 sm:mb-6 tracking-[0.02em] relative">
              <span className="block">HOW IT</span>
              <span className="block text-gradient-accent">WORKS</span>
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-racing-red to-transparent" />
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
              Everything you need to know about buying and selling cars through our auction platform.
              Simple, transparent, and designed for car enthusiasts.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <Link to={ROUTES.SIGN_UP}>
                <Button className="bg-gradient-to-r from-racing-red to-racing-dark hover:from-racing-dark hover:to-racing-red text-white font-bold px-8 py-3 rounded-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(217,43,43,0.5)] uppercase tracking-wider">
                  Get Started
                </Button>
              </Link>
              <Link to={ROUTES.BROWSE}>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-8 py-3 rounded-xl uppercase tracking-wider"
                >
                  Browse Auctions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* For Buyers Section */}
      <section
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className="relative w-full py-16 sm:py-20 md:py-28"
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-3 sm:mb-4 tracking-[0.02em] relative">
                <span className="block">FOR</span>
                <span className="block text-gradient-accent">BUYERS</span>
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-racing-red to-transparent" />
              </h2>
              <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                Find your dream car and bid with confidence. Here's how the buying process works.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {buyerSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="group relative bg-charcoal-light rounded-2xl p-8 border border-white/[0.06] card-shadow hover-lift overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-racing-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <span className="font-display font-bold text-6xl text-white/5">
                      {step.number}
                    </span>
                  </div>

                  <div className="relative -mt-8 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-racing-red/10 flex items-center justify-center group-hover:bg-racing-red/20 transition-colors duration-300">
                      <step.icon className="w-7 h-7 text-racing-red" />
                    </div>
                  </div>

                  <div className="relative">
                    <h3 className="font-display font-semibold text-xl text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-red/0 via-racing-red/50 to-racing-red/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Sellers Section */}
      <section
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
        className="relative w-full py-16 sm:py-20 md:py-28 bg-charcoal-light/30"
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-3 sm:mb-4 tracking-[0.02em] relative">
                <span className="block">FOR</span>
                <span className="block text-gradient-accent">SELLERS</span>
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-racing-red to-transparent" />
              </h2>
              <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                List your vehicle and reach thousands of serious buyers. Here's how to sell your car
                through our platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sellerSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="group relative bg-charcoal rounded-2xl p-8 border border-white/[0.06] card-shadow hover-lift overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-racing-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <span className="font-display font-bold text-6xl text-white/5">
                      {step.number}
                    </span>
                  </div>

                  <div className="relative -mt-8 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-racing-red/10 flex items-center justify-center group-hover:bg-racing-red/20 transition-colors duration-300">
                      <step.icon className="w-7 h-7 text-racing-red" />
                    </div>
                  </div>

                  <div className="relative">
                    <h3 className="font-display font-semibold text-xl text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-racing-red/0 via-racing-red/50 to-racing-red/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to={ROUTES.SELL}>
                <Button className="bg-gradient-to-r from-racing-red to-racing-dark hover:from-racing-dark hover:to-racing-red text-white font-bold px-8 py-3 rounded-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(217,43,43,0.5)] uppercase tracking-wider">
                  List Your Car
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Auction Features Section */}
      <section
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
        className="relative w-full py-16 sm:py-20 md:py-28"
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-3 sm:mb-4 tracking-[0.02em] relative">
                <span className="block">AUCTION</span>
                <span className="block text-gradient-accent">FEATURES</span>
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-racing-red to-transparent" />
              </h2>
              <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                Our platform is built with fairness and transparency in mind. Here's what makes our
                auctions special.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {auctionFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group glass-card p-8 hover-lift relative overflow-hidden"
                >
                  <div className="absolute inset-0 mesh-gradient opacity-30" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-xl bg-racing-red/10 flex items-center justify-center mb-6 group-hover:bg-racing-red/20 transition-colors duration-300">
                      <feature.icon className="w-8 h-8 text-racing-red" />
                    </div>
                    <h3 className="font-display font-semibold text-2xl text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment & Transactions Section */}
      <section
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
        className="relative w-full py-16 sm:py-20 md:py-28 bg-charcoal-light/30"
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-3 sm:mb-4 tracking-[0.02em] relative">
                <span className="block">PAYMENT &</span>
                <span className="block text-gradient-accent">TRANSACTIONS</span>
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-racing-red to-transparent" />
              </h2>
              <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                Secure, transparent, and straightforward. Here's how payments work on our platform.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {paymentFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group glass-card p-8 hover-lift relative overflow-hidden"
                >
                  <div className="absolute inset-0 mesh-gradient opacity-30" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-xl bg-racing-red/10 flex items-center justify-center mb-6 group-hover:bg-racing-red/20 transition-colors duration-300">
                      <feature.icon className="w-8 h-8 text-racing-red" />
                    </div>
                    <h3 className="font-display font-semibold text-2xl text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* User Features Section */}
      <section
        ref={(el) => {
          sectionRefs.current[4] = el;
        }}
        className="relative w-full py-16 sm:py-20 md:py-28"
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-3 sm:mb-4 tracking-[0.02em] relative">
                <span className="block">USER</span>
                <span className="block text-gradient-accent">FEATURES</span>
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-racing-red to-transparent" />
              </h2>
              <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                Powerful tools to help you track auctions, manage bids, and stay organized.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="group glass-card p-8 hover-lift relative overflow-hidden">
                <div className="absolute inset-0 mesh-gradient opacity-30" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-racing-red/10 flex items-center justify-center mb-6 group-hover:bg-racing-red/20 transition-colors duration-300">
                    <Heart className="w-8 h-8 text-racing-red" />
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-white mb-3">
                    Watchlist
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    Save auctions you're interested in to your watchlist. Get notified when they're
                    ending soon or when new listings match your preferences.
                  </p>
                </div>
              </div>

              <div className="group glass-card p-8 hover-lift relative overflow-hidden">
                <div className="absolute inset-0 mesh-gradient opacity-30" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-racing-red/10 flex items-center justify-center mb-6 group-hover:bg-racing-red/20 transition-colors duration-300">
                    <Gavel className="w-8 h-8 text-racing-red" />
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-white mb-3">
                    Bid History
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    View your complete bidding history, track all your active bids, and see which
                    auctions you've won or lost. Everything in one place.
                  </p>
                </div>
              </div>

              <div className="group glass-card p-8 hover-lift relative overflow-hidden">
                <div className="absolute inset-0 mesh-gradient opacity-30" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-racing-red/10 flex items-center justify-center mb-6 group-hover:bg-racing-red/20 transition-colors duration-300">
                    <FileText className="w-8 h-8 text-racing-red" />
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-white mb-3">
                    Purchase & Sales Overview
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    Manage all your purchases and sales from your dashboard. View transaction
                    details, download receipts, and track vehicle transfers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={(el) => {
          sectionRefs.current[5] = el;
        }}
        className="relative w-full py-16 sm:py-20 md:py-28"
      >
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card-strong p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="absolute inset-0 mesh-gradient opacity-50" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 sm:mb-6 tracking-[0.02em] relative">
                  <span className="block">READY TO</span>
                  <span className="block text-gradient-accent">GET STARTED?</span>
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-racing-red to-transparent" />
                </h2>
                <p className="text-white/70 text-base sm:text-lg mb-6 sm:mb-10 max-w-2xl mx-auto px-4 sm:px-0">
                  Join thousands of car enthusiasts buying and selling through our platform. Create
                  your account today and start bidding or listing.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
                  <Link to={ROUTES.SIGN_UP}>
                    <Button className="bg-gradient-to-r from-racing-red to-racing-dark hover:from-racing-dark hover:to-racing-red text-white font-bold px-10 py-4 rounded-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(217,43,43,0.5)] uppercase tracking-wider text-base">
                      Create Account
                    </Button>
                  </Link>
                  <Link to={ROUTES.BROWSE}>
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-10 py-4 rounded-xl uppercase tracking-wider text-base"
                    >
                      Browse Auctions
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
