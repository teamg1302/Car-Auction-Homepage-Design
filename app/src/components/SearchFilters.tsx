// Search Filters Component
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CAR_MAKES, CAR_TYPES, PRICE_RANGES, TRANSMISSION_TYPES, FUEL_TYPES } from '@/constants';
import type { SearchFilters } from '@/types';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
}

export function SearchFiltersComponent({ filters, onFiltersChange, onSearch }: SearchFiltersProps) {
  const handleFilterChange = (key: keyof SearchFilters, value: string | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value === 'Any' || value === 'Any Make' || value === 'Any Model' ? undefined : value,
    });
  };

  return (
    <div className="glass-card p-6">
      <h3 className="dark:text-white text-foreground font-display font-semibold text-lg mb-6">
        Filter Listings
      </h3>

      <div className="space-y-4">
        {/* Make */}
        <div>
          <Label className="dark:text-white/70 text-foreground/70 mb-2 block text-sm">Make</Label>
          <Select
            value={filters.make || 'Any Make'}
            onValueChange={(value) => handleFilterChange('make', value)}
          >
            <SelectTrigger className="dark:bg-white/5 bg-black/5 dark:border-white/10 border-black/10 dark:text-white text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-charcoal-light bg-card dark:border-white/10 border-black/10">
              {CAR_MAKES.map((make) => (
                <SelectItem key={make} value={make} className="dark:text-white text-foreground">
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type */}
        <div>
          <Label className="dark:text-white/70 text-foreground/70 mb-2 block text-sm">Body Type</Label>
          <Select
            value={filters.type || 'Any'}
            onValueChange={(value) => handleFilterChange('type', value as any)}
          >
            <SelectTrigger className="dark:bg-white/5 bg-black/5 dark:border-white/10 border-black/10 dark:text-white text-foreground">
              <SelectValue placeholder="Any Type" />
            </SelectTrigger>
            <SelectContent className="dark:bg-charcoal-light bg-card dark:border-white/10 border-black/10">
              <SelectItem value="Any" className="dark:text-white text-foreground">Any Type</SelectItem>
              {CAR_TYPES.map((type) => (
                <SelectItem key={type} value={type} className="dark:text-white text-foreground">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Label className="dark:text-white/70 text-foreground/70 mb-2 block text-sm">Price Range</Label>
          <Select
            value={filters.maxPrice ? `${filters.minPrice || 0}-${filters.maxPrice}` : 'Any'}
            onValueChange={(value) => {
              if (value === 'Any') {
                onFiltersChange({ ...filters, minPrice: undefined, maxPrice: undefined });
              } else {
                const [min, max] = value.split('-').map(Number);
                onFiltersChange({ ...filters, minPrice: min, maxPrice: max === Infinity ? undefined : max });
              }
            }}
          >
            <SelectTrigger className="dark:bg-white/5 bg-black/5 dark:border-white/10 border-black/10 dark:text-white text-foreground">
              <SelectValue placeholder="Any Price" />
            </SelectTrigger>
            <SelectContent className="dark:bg-charcoal-light bg-card dark:border-white/10 border-black/10">
              <SelectItem value="Any" className="dark:text-white text-foreground">Any Price</SelectItem>
              {PRICE_RANGES.slice(1).map((range) => (
                <SelectItem
                  key={range.label}
                  value={`${range.min}-${range.max === Infinity ? 'inf' : range.max}`}
                  className="dark:text-white text-foreground"
                >
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Transmission */}
        <div>
          <Label className="dark:text-white/70 text-foreground/70 mb-2 block text-sm">Transmission</Label>
          <Select
            value={filters.transmission || 'Any'}
            onValueChange={(value) => handleFilterChange('transmission', value as any)}
          >
            <SelectTrigger className="dark:bg-white/5 bg-black/5 dark:border-white/10 border-black/10 dark:text-white text-foreground">
              <SelectValue placeholder="Any Transmission" />
            </SelectTrigger>
            <SelectContent className="dark:bg-charcoal-light bg-card dark:border-white/10 border-black/10">
              <SelectItem value="Any" className="dark:text-white text-foreground">Any Transmission</SelectItem>
              {TRANSMISSION_TYPES.map((type) => (
                <SelectItem key={type} value={type} className="dark:text-white text-foreground">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fuel Type */}
        <div>
          <Label className="dark:text-white/70 text-foreground/70 mb-2 block text-sm">Fuel Type</Label>
          <Select
            value={filters.fuel || 'Any'}
            onValueChange={(value) => handleFilterChange('fuel', value as any)}
          >
            <SelectTrigger className="dark:bg-white/5 bg-black/5 dark:border-white/10 border-black/10 dark:text-white text-foreground">
              <SelectValue placeholder="Any Fuel Type" />
            </SelectTrigger>
            <SelectContent className="dark:bg-charcoal-light bg-card dark:border-white/10 border-black/10">
              <SelectItem value="Any" className="dark:text-white text-foreground">Any Fuel Type</SelectItem>
              {FUEL_TYPES.map((type) => (
                <SelectItem key={type} value={type} className="dark:text-white text-foreground">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={onSearch}
          className="w-full bg-racing-red hover:bg-racing-dark text-white font-semibold mt-4"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
