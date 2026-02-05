// Browse Page - Browse all listings with filters
import { useEffect, useState } from 'react';
import { CarCard } from '@/components/CarCard';
import { SearchFiltersComponent } from '@/components/SearchFilters';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { carService } from '@/services';
import { SORT_OPTIONS } from '@/constants';
import type { Auction, SearchFilters } from '@/types';

export function BrowsePage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: 'ending-soon',
    sortOrder: 'asc',
  });

  useEffect(() => {
    loadAuctions();
  }, [filters]);

  const loadAuctions = async () => {
    setIsLoading(true);
    try {
      const response = await carService.getLiveAuctions(filters);
      setAuctions(response.data);
    } catch (error) {
      console.error('Error loading auctions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = () => {
    loadAuctions();
  };

  return (
    <div className="min-h-screen dark:bg-charcoal bg-background">
      <div className="w-full px-4 sm:px-6 lg:px-12 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-gradient-accent mb-3 sm:mb-4 tracking-[0.02em] relative">
              BROWSE AUCTIONS
              <span className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-transparent via-racing-red to-transparent" />
            </h1>
            <p className="dark:text-white/70 text-foreground/70 text-base sm:text-lg font-light tracking-wide">
              Discover your next dream car from our live auctions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <SearchFiltersComponent
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onSearch={handleSearch}
              />
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {/* Sort Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                <p className="dark:text-white/70 text-foreground/70 text-sm sm:text-base">
                  {isLoading ? 'Loading...' : `${auctions.length} listings found`}
                </p>
                <Select
                  value={filters.sortBy || 'ending-soon'}
                  onValueChange={(value) =>
                    setFilters({ ...filters, sortBy: value as any })
                  }
                >
                  <SelectTrigger className="w-full sm:w-[200px] dark:bg-white/5 bg-black/5 dark:border-white/10 border-black/10 dark:text-white text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-charcoal-light bg-card dark:border-white/10 border-black/10">
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="dark:text-white text-foreground">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Loading State */}
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="dark:text-white/50 text-foreground/50">Loading auctions...</p>
                </div>
              ) : auctions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="dark:text-white/50 text-foreground/50">No auctions found. Try adjusting your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {auctions.map((auction) => (
                    <CarCard key={auction.id} auction={auction} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
