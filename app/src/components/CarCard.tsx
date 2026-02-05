// Reusable Car Card Component
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer, Users, MapPin, Gauge, Fuel, Settings2 } from 'lucide-react';
import { formatPrice } from '@/utils/formatters';
import { ROUTES } from '@/constants';
import type { Auction } from '@/types';

interface CarCardProps {
  auction: Auction;
  className?: string;
}

export function CarCard({ auction, className = '' }: CarCardProps) {
  const { car, currentBid, bidCount, endsIn, reserveMet } = auction;
  const seller = car.seller;

  return (
    <div
      className={`group relative dark:bg-charcoal-light bg-card rounded-2xl overflow-hidden dark:border border-white/[0.12] border-black/[0.08] card-shadow hover-lift ${className}`}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-racing-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Image */}
      <Link to={`${ROUTES.CAR_DETAILS.replace(':id', car.id)}`}>
        <div className="relative h-48 sm:h-52 overflow-hidden cursor-pointer">
          <img
            src={car.images[0] || '/images/placeholder.jpg'}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-105 car-image-glow"
          />
          <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-charcoal-light dark:via-charcoal-light/50 dark:to-transparent bg-gradient-to-t from-card via-card/50 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
          
          {/* Animated overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-racing-red/0 via-racing-red/0 to-racing-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Reserve Badge */}
          <Badge
            className={`absolute top-4 left-4 font-semibold text-xs uppercase tracking-wider px-3 py-1.5 ${
              reserveMet
                ? 'bg-green-500/95 text-white border-green-400/30 shadow-lg'
                : 'bg-amber-500/95 text-white border-amber-400/30 shadow-lg'
            } border backdrop-blur-sm`}
          >
            {reserveMet ? 'Reserve Met' : 'Reserve Not Met'}
          </Badge>

          {/* Seller Badge */}
          {seller && (
            <Badge
              variant="secondary"
              className="absolute top-4 right-4 dark:bg-charcoal/90 bg-card/90 dark:text-white/90 text-foreground/90 backdrop-blur-md dark:border border-white/10 border-black/10 font-medium text-xs uppercase tracking-wider px-3 py-1.5"
            >
              {seller.type}
            </Badge>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-6 relative z-10">
        {/* Title */}
        <Link to={`${ROUTES.CAR_DETAILS.replace(':id', car.id)}`}>
          <h3 className="font-display text-lg sm:text-xl dark:text-white text-foreground mb-2 hover:text-racing-red transition-colors duration-300 cursor-pointer tracking-wide group-hover:translate-x-1 inline-block">
            {car.year} {car.make} {car.model}
          </h3>
        </Link>

        {/* Meta */}
        <p className="text-xs sm:text-sm dark:text-white/60 text-foreground/60 mb-4 sm:mb-5 font-medium tracking-wide">
          {car.type} · {car.mileageDisplay} · {car.transmission}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-3 sm:gap-5 mb-4 sm:mb-5 text-xs dark:text-white/50 text-foreground/50">
          <div className="flex items-center gap-2 group/spec">
            <div className="w-8 h-8 rounded-lg dark:bg-white/5 bg-black/5 dark:border border-white/10 border-black/10 flex items-center justify-center group-hover/spec:bg-racing-red/20 group-hover/spec:border-racing-red/50 transition-all duration-300">
              <Gauge className="w-3.5 h-3.5 dark:text-white/70 text-foreground/70 group-hover/spec:text-racing-red transition-colors" />
            </div>
            <span className="font-medium">{car.mileageDisplay}</span>
          </div>
          <div className="flex items-center gap-2 group/spec">
            <div className="w-8 h-8 rounded-lg dark:bg-white/5 bg-black/5 dark:border border-white/10 border-black/10 flex items-center justify-center group-hover/spec:bg-racing-red/20 group-hover/spec:border-racing-red/50 transition-all duration-300">
              <Settings2 className="w-3.5 h-3.5 dark:text-white/70 text-foreground/70 group-hover/spec:text-racing-red transition-colors" />
            </div>
            <span className="font-medium">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 group/spec">
            <div className="w-8 h-8 rounded-lg dark:bg-white/5 bg-black/5 dark:border border-white/10 border-black/10 flex items-center justify-center group-hover/spec:bg-racing-red/20 group-hover/spec:border-racing-red/50 transition-all duration-300">
              <Fuel className="w-3.5 h-3.5 dark:text-white/70 text-foreground/70 group-hover/spec:text-racing-red transition-colors" />
            </div>
            <span className="font-medium">{car.fuel}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-xs dark:text-white/50 text-foreground/50 mb-5">
          <MapPin className="w-4 h-4 dark:text-white/60 text-foreground/60" />
          <span className="font-medium">{car.location.displayName}</span>
        </div>

        {/* Bid Info */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl dark:bg-white/5 bg-black/5 dark:border border-white/10 border-black/10 backdrop-blur-sm">
          <div>
            <p className="text-xs dark:text-white/60 text-foreground/60 mb-1 sm:mb-1.5 uppercase tracking-wider font-semibold">Current bid</p>
            <p className="font-display text-xl sm:text-2xl text-gradient-accent">
              {formatPrice(currentBid)}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 sm:gap-1.5 text-xs dark:text-white/60 text-foreground/60 mb-1 sm:mb-1.5 justify-end">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-medium">{bidCount} bids</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 text-xs text-racing-red justify-end">
              <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-bold uppercase tracking-wider">{endsIn}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link to={`${ROUTES.CAR_DETAILS.replace(':id', car.id)}`}>
          <Button className="relative w-full bg-gradient-to-r from-racing-red to-racing-dark hover:from-racing-dark hover:to-racing-red text-white font-bold rounded-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(217,43,43,0.4)] uppercase tracking-wider text-sm py-6 overflow-hidden group">
            <span className="relative z-10">Place Bid</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
