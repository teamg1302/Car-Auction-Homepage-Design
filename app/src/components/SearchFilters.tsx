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
      <h3 className="text-white font-display font-semibold text-lg mb-6">
        Filter Listings
      </h3>

      <div className="space-y-4">
        {/* Make */}
        <div>
          <Label className="text-white/70 mb-2 block text-sm">Make</Label>
          <Select
            value={filters.make || 'Any Make'}
            onValueChange={(value) => handleFilterChange('make', value)}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-charcoal-light border-white/10">
              {CAR_MAKES.map((make) => (
                <SelectItem key={make} value={make} className="text-white">
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type */}
        <div>
          <Label className="text-white/70 mb-2 block text-sm">Body Type</Label>
          <Select
            value={filters.type || 'Any'}
            onValueChange={(value) => handleFilterChange('type', value as any)}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Any Type" />
            </SelectTrigger>
            <SelectContent className="bg-charcoal-light border-white/10">
              <SelectItem value="Any" className="text-white">Any Type</SelectItem>
              {CAR_TYPES.map((type) => (
                <SelectItem key={type} value={type} className="text-white">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-white/70 mb-2 block text-sm">Price Range</Label>
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
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Any Price" />
            </SelectTrigger>
            <SelectContent className="bg-charcoal-light border-white/10">
              <SelectItem value="Any" className="text-white">Any Price</SelectItem>
              {PRICE_RANGES.slice(1).map((range) => (
                <SelectItem
                  key={range.label}
                  value={`${range.min}-${range.max === Infinity ? 'inf' : range.max}`}
                  className="text-white"
                >
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Transmission */}
        <div>
          <Label className="text-white/70 mb-2 block text-sm">Transmission</Label>
          <Select
            value={filters.transmission || 'Any'}
            onValueChange={(value) => handleFilterChange('transmission', value as any)}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Any Transmission" />
            </SelectTrigger>
            <SelectContent className="bg-charcoal-light border-white/10">
              <SelectItem value="Any" className="text-white">Any Transmission</SelectItem>
              {TRANSMISSION_TYPES.map((type) => (
                <SelectItem key={type} value={type} className="text-white">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fuel Type */}
        <div>
          <Label className="text-white/70 mb-2 block text-sm">Fuel Type</Label>
          <Select
            value={filters.fuel || 'Any'}
            onValueChange={(value) => handleFilterChange('fuel', value as any)}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Any Fuel Type" />
            </SelectTrigger>
            <SelectContent className="bg-charcoal-light border-white/10">
              <SelectItem value="Any" className="text-white">Any Fuel Type</SelectItem>
              {FUEL_TYPES.map((type) => (
                <SelectItem key={type} value={type} className="text-white">
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
