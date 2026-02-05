// Car Details Page
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Timer, 
  Users, 
  MapPin, 
  Gauge, 
  Fuel, 
  Settings2, 
  Shield,
  ArrowLeft,
  Heart,
  Share2,
} from 'lucide-react';
import { carService, auctionService } from '@/services';
import { BidForm } from '@/components/BidForm';
import { formatPrice, formatDate } from '@/utils/formatters';
import { ROUTES } from '@/constants';
import type { Car, Auction } from '@/types';

export function CarDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [auction, setAuction] = useState<Auction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWatching, setIsWatching] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const [carData, auctionData] = await Promise.all([
          carService.getCarById(id),
          carService.getAuctionByCarId(id),
        ]);
        
        setCar(carData);
        setAuction(auctionData);
      } catch (error) {
        console.error('Error loading car details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleBidSubmit = async (amount: number) => {
    if (!auction) return;
    
    try {
      await auctionService.placeBid(auction.id, amount, 'user-1');
      // Reload auction data
      const updatedAuction = await auctionService.getAuctionById(auction.id);
      if (updatedAuction) {
        setAuction(updatedAuction);
      }
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  const handleWatch = async () => {
    if (!auction) return;
    setIsWatching(!isWatching);
    await auctionService.watchAuction(auction.id, !isWatching);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen dark:bg-charcoal bg-background flex items-center justify-center">
        <div className="dark:text-white text-foreground text-xl">Loading...</div>
      </div>
    );
  }

  if (!car || !auction) {
    return (
      <div className="min-h-screen dark:bg-charcoal bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="dark:text-white text-foreground text-2xl mb-4">Car not found</h1>
          <Button onClick={() => navigate(ROUTES.HOME)}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-charcoal bg-background">
      <div className="w-full px-4 sm:px-6 lg:px-12 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 dark:text-white/70 text-foreground/70 dark:hover:text-white hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image */}
              <div className="relative aspect-video rounded-2xl overflow-hidden dark:bg-charcoal-light bg-card">
                <img
                  src={car.images[activeImageIndex] || car.images[0]}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleWatch}
                    className={`${isWatching ? 'bg-racing-red' : ''}`}
                  >
                    <Heart className={`w-4 h-4 ${isWatching ? 'fill-white' : ''}`} />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Thumbnail Images */}
              {car.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === index
                          ? 'border-racing-red'
                          : 'dark:border-white/10 border-black/10 dark:hover:border-white/30 hover:border-black/30'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${car.year} ${car.make} ${car.model} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Car Title and Info */}
              <div className="glass-card p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-4 gap-3 sm:gap-0">
                  <div className="flex-1">
                    <h1 className="font-display font-bold text-2xl sm:text-3xl dark:text-white text-foreground mb-2">
                      {car.year} {car.make} {car.model} {car.trim && car.trim}
                    </h1>
                    <div className="flex items-center gap-2 dark:text-white/50 text-foreground/50 text-xs sm:text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{car.location.displayName}</span>
                    </div>
                  </div>
                  <Badge
                    className={`${
                      auction.reserveMet
                        ? 'bg-green-500/90 text-white'
                        : 'bg-amber-500/90 text-white'
                    }`}
                  >
                    {auction.reserveMet ? 'Reserve Met' : 'Reserve Not Met'}
                  </Badge>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 dark:border-t border-white/10 border-black/10">
                  <div>
                    <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">Mileage</p>
                    <div className="flex items-center gap-1 dark:text-white text-foreground">
                      <Gauge className="w-4 h-4" />
                      <span className="font-semibold">{car.mileageDisplay}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">Transmission</p>
                    <div className="flex items-center gap-1 dark:text-white text-foreground">
                      <Settings2 className="w-4 h-4" />
                      <span className="font-semibold">{car.transmission}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">Fuel Type</p>
                    <div className="flex items-center gap-1 dark:text-white text-foreground">
                      <Fuel className="w-4 h-4" />
                      <span className="font-semibold">{car.fuel}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">Condition</p>
                    <span className="font-semibold dark:text-white text-foreground">{car.condition}</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="overview" className="glass-card">
                <TabsList className="dark:bg-white/5 bg-black/5 dark:border-b border-white/10 border-black/10 flex-wrap">
                  <TabsTrigger value="overview" className="dark:text-white/70 text-foreground/70 data-[state=active]:dark:text-white data-[state=active]:text-foreground text-xs sm:text-sm">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="specs" className="dark:text-white/70 text-foreground/70 data-[state=active]:dark:text-white data-[state=active]:text-foreground text-xs sm:text-sm">
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="history" className="dark:text-white/70 text-foreground/70 data-[state=active]:dark:text-white data-[state=active]:text-foreground text-xs sm:text-sm">
                    History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="dark:text-white text-foreground font-semibold mb-2 text-sm sm:text-base">Description</h3>
                      <p className="dark:text-white/70 text-foreground/70 leading-relaxed text-sm sm:text-base">{car.description}</p>
                    </div>
                    {car.features.length > 0 && (
                      <div>
                        <h3 className="dark:text-white text-foreground font-semibold mb-2 text-sm sm:text-base">Features</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {car.features.map((feature, index) => (
                            <li key={index} className="dark:text-white/70 text-foreground/70 flex items-center gap-2 text-sm sm:text-base">
                              <Shield className="w-3 h-3 text-racing-red flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="specs" className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {car.specifications.engine && (
                      <div>
                        <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">Engine</p>
                        <p className="dark:text-white text-foreground font-semibold">{car.specifications.engine}</p>
                      </div>
                    )}
                    {car.specifications.horsepower && (
                      <div>
                        <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">Horsepower</p>
                        <p className="dark:text-white text-foreground font-semibold">{car.specifications.horsepower} HP</p>
                      </div>
                    )}
                    {car.specifications.torque && (
                      <div>
                        <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">Torque</p>
                        <p className="dark:text-white text-foreground font-semibold">{car.specifications.torque} lb-ft</p>
                      </div>
                    )}
                    {car.specifications.drivetrain && (
                      <div>
                        <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">Drivetrain</p>
                        <p className="dark:text-white text-foreground font-semibold">{car.specifications.drivetrain}</p>
                      </div>
                    )}
                    {car.specifications.seats && (
                      <div>
                        <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">Seats</p>
                        <p className="dark:text-white text-foreground font-semibold">{car.specifications.seats}</p>
                      </div>
                    )}
                    {car.specifications.doors && (
                      <div>
                        <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">Doors</p>
                        <p className="dark:text-white text-foreground font-semibold">{car.specifications.doors}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="history" className="p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">Listed</p>
                      <p className="dark:text-white text-foreground">{formatDate(car.createdAt)}</p>
                    </div>
                    {car.vin && (
                      <div>
                        <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">VIN</p>
                        <p className="dark:text-white text-foreground font-mono">{car.vin}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Auction Info */}
            <div className="space-y-4 sm:space-y-6">
              {/* Auction Card */}
              <div className="glass-card p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="dark:text-white text-foreground font-display font-semibold text-lg sm:text-xl">Auction Details</h2>
                  <Badge variant="secondary" className="bg-racing-red/20 text-racing-red text-xs">
                    Live
                  </Badge>
                </div>

                <div className="space-y-4 mb-4 sm:mb-6">
                  <div>
                    <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">Current bid</p>
                    <p className="text-xl sm:text-2xl font-bold text-racing-red">
                      {formatPrice(auction.currentBid)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">Bids</p>
                      <div className="flex items-center gap-1 dark:text-white text-foreground">
                        <Users className="w-4 h-4" />
                        <span className="font-semibold text-sm sm:text-base">{auction.bidCount}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">Ends in</p>
                      <div className="flex items-center gap-1 text-racing-red">
                        <Timer className="w-4 h-4" />
                        <span className="font-semibold text-sm sm:text-base">{auction.endsIn}</span>
                      </div>
                    </div>
                  </div>
                  {auction.reservePrice && (
                    <div>
                      <p className="text-xs dark:text-white/50 text-foreground/50 mb-1">Reserve price</p>
                      <p className="dark:text-white text-foreground font-semibold">
                        {formatPrice(auction.reservePrice)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 dark:border-t border-white/10 border-black/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 dark:text-white/50 text-foreground/50" />
                    <span className="text-sm dark:text-white/70 text-foreground/70">Seller: {car.seller.name}</span>
                  </div>
                  <Badge variant="secondary" className="dark:bg-white/5 bg-black/5 dark:text-white/70 text-foreground/70">
                    {car.seller.type}
                  </Badge>
                </div>
              </div>

              {/* Bid Form */}
              <BidForm auction={auction} onBidSubmit={handleBidSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
