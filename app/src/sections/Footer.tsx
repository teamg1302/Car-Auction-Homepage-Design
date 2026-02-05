import { Zap, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const footerLinks = {
  browse: {
    title: 'Browse',
    links: ['Coupes', 'Sedans', 'SUVs', 'Trucks', 'Classics', 'Ending Soon'],
  },
  sell: {
    title: 'Sell',
    links: ['Start a Listing', 'Seller Fees', 'FAQs', 'Support', 'Seller Guide'],
  },
  company: {
    title: 'Company',
    links: ['About Us', 'Careers', 'Press', 'Partners', 'Contact'],
  },
  legal: {
    title: 'Legal',
    links: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility'],
  },
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="w-full bg-charcoal border-t border-white/[0.06]">
      <div className="w-full px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Brand Column */}
            <div className="col-span-2 sm:col-span-3 md:col-span-1">
              <a href="#" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-racing-red flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl text-white">
                  AuctionAuto
                </span>
              </a>
              <p className="text-white/50 text-sm leading-relaxed">
                Bid on cars worth driving. Live auctions for serious enthusiasts.
              </p>
            </div>

            {/* Link Columns */}
            {Object.values(footerLinks).map((section) => (
              <div key={section.title}>
                <h4 className="font-display font-semibold text-white mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-white/50 text-sm hover:text-white transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 sm:pt-8 border-t border-white/[0.06] gap-4 sm:gap-0">
            {/* Copyright */}
            <p className="text-white/40 text-xs sm:text-sm text-center sm:text-left">
              © 2026 AuctionAuto. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
