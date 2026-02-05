import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap } from 'lucide-react';
import { ROUTES } from '@/constants';

const navLinks = [
  { label: 'Browse', href: ROUTES.BROWSE },
  { label: 'Sell', href: ROUTES.SELL },
  { label: 'How it Works', href: ROUTES.HOW_IT_WORKS },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? 'bg-charcoal/95 backdrop-blur-2xl border-b border-white/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-racing-red to-racing-dark flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 glow-red">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="font-display text-lg sm:text-xl md:text-2xl text-white tracking-[0.05em] relative">
              AUCTION
              <span className="text-racing-red">AUTO</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-racing-red to-transparent group-hover:w-full transition-all duration-500" />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-semibold tracking-wider uppercase transition-all duration-300 relative group ${
                  location.pathname === link.href
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-racing-red to-racing-dark transition-all duration-500 ${
                    location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-racing-red blur-sm transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              to={ROUTES.SIGN_IN}
              className="text-sm font-semibold text-white/60 hover:text-white transition-all duration-300 uppercase tracking-wider relative group"
            >
              Sign In
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-racing-red group-hover:w-full transition-all duration-300" />
            </Link>
            <Link to={ROUTES.SIGN_UP}>
              <Button className="relative bg-gradient-to-r from-racing-red to-racing-dark hover:from-racing-dark hover:to-racing-red text-white font-bold px-8 py-2.5 rounded-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(217,43,43,0.4)] uppercase tracking-wider text-sm overflow-hidden group">
                <span className="relative z-10">Start Bidding</span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-charcoal/95 backdrop-blur-xl border-b border-white/[0.06] transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={handleNavClick}
              className={`text-left text-base font-medium transition-colors duration-300 py-2 ${
                location.pathname === link.href
                  ? 'text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-white/10 my-2" />
          <Link
            to={ROUTES.SIGN_IN}
            onClick={handleNavClick}
            className="text-left text-base font-medium text-white/70 hover:text-white transition-colors duration-300 py-2"
          >
            Sign In
          </Link>
          <Link to={ROUTES.SIGN_UP} onClick={handleNavClick}>
            <Button className="bg-racing-red hover:bg-racing-dark text-white font-semibold w-full rounded-xl mt-2">
              Start Bidding
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
