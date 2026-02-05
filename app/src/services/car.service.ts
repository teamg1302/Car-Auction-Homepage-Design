// Car service - handles car-related operations
// Currently using mock data, will be replaced with API calls in the future
import { mockCars, mockAuctions } from '@/constants/mockData';
import type { Car, Auction, SearchFilters, PaginatedResponse } from '@/types';

class CarService {
  // Get all cars (for demo purposes)
  async getCars(filters?: SearchFilters): Promise<PaginatedResponse<Car>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    let filteredCars = [...mockCars];

    // Apply filters
    if (filters) {
      if (filters.make && filters.make !== 'Any Make') {
        filteredCars = filteredCars.filter(car => car.make === filters.make);
      }
      if (filters.model && filters.model !== 'Any Model') {
        filteredCars = filteredCars.filter(car => car.model === filters.model);
      }
      if (filters.type) {
        filteredCars = filteredCars.filter(car => car.type === filters.type);
      }
      if (filters.minPrice) {
        // This would need auction data to filter by price
      }
      if (filters.maxPrice) {
        // This would need auction data to filter by price
      }
      if (filters.minYear) {
        filteredCars = filteredCars.filter(car => car.year >= filters.minYear!);
      }
      if (filters.maxYear) {
        filteredCars = filteredCars.filter(car => car.year <= filters.maxYear!);
      }
      if (filters.maxMileage) {
        filteredCars = filteredCars.filter(car => car.mileage <= filters.maxMileage!);
      }
      if (filters.transmission) {
        filteredCars = filteredCars.filter(car => car.transmission === filters.transmission);
      }
      if (filters.fuel) {
        filteredCars = filteredCars.filter(car => car.fuel === filters.fuel);
      }
      if (filters.location) {
        filteredCars = filteredCars.filter(
          car => car.location.displayName.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      if (filters.condition && filters.condition.length > 0) {
        filteredCars = filteredCars.filter(car => filters.condition!.includes(car.condition));
      }
    }

    // Apply sorting
    if (filters?.sortBy) {
      filteredCars = this.sortCars(filteredCars, filters.sortBy, filters.sortOrder || 'desc');
    }

    return {
      data: filteredCars,
      pagination: {
        page: 1,
        limit: filteredCars.length,
        total: filteredCars.length,
        totalPages: 1,
      },
    };
  }

  // Get car by ID
  async getCarById(id: string): Promise<Car | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockCars.find(car => car.id === id) || null;
  }

  // Get auction by car ID
  async getAuctionByCarId(carId: string): Promise<Auction | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockAuctions.find(auction => auction.carId === carId) || null;
  }

  // Get featured auctions
  async getFeaturedAuctions(): Promise<Auction[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockAuctions.filter(auction => auction.featured);
  }

  // Get ending soon auctions
  async getEndingSoonAuctions(limit: number = 6): Promise<Auction[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    // Sort by ending time and return limited results
    return mockAuctions
      .filter(auction => auction.status === 'live')
      .sort((a, b) => {
        // Simple sort by endsIn string (in real app, would parse dates)
        return a.endsIn.localeCompare(b.endsIn);
      })
      .slice(0, limit);
  }

  // Get all live auctions
  async getLiveAuctions(filters?: SearchFilters): Promise<PaginatedResponse<Auction>> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredAuctions = mockAuctions.filter(auction => auction.status === 'live');

    // Apply filters similar to cars
    if (filters) {
      if (filters.make && filters.make !== 'Any Make') {
        filteredAuctions = filteredAuctions.filter(
          auction => auction.car.make === filters.make
        );
      }
      if (filters.model && filters.model !== 'Any Model') {
        filteredAuctions = filteredAuctions.filter(
          auction => auction.car.model === filters.model
        );
      }
      if (filters.type) {
        filteredAuctions = filteredAuctions.filter(
          auction => auction.car.type === filters.type
        );
      }
      if (filters.minPrice) {
        filteredAuctions = filteredAuctions.filter(
          auction => auction.currentBid >= filters.minPrice!
        );
      }
      if (filters.maxPrice) {
        filteredAuctions = filteredAuctions.filter(
          auction => auction.currentBid <= filters.maxPrice!
        );
      }
    }

    // Apply sorting
    if (filters?.sortBy) {
      filteredAuctions = this.sortAuctions(filteredAuctions, filters.sortBy, filters.sortOrder || 'desc');
    }

    return {
      data: filteredAuctions,
      pagination: {
        page: 1,
        limit: filteredAuctions.length,
        total: filteredAuctions.length,
        totalPages: 1,
      },
    };
  }

  // Helper: Sort cars
  private sortCars(cars: Car[], sortBy: string, order: 'asc' | 'desc'): Car[] {
    const sorted = [...cars];
    
    switch (sortBy) {
      case 'year-desc':
        sorted.sort((a, b) => b.year - a.year);
        break;
      case 'year-asc':
        sorted.sort((a, b) => a.year - b.year);
        break;
      case 'mileage-asc':
        sorted.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'mileage-desc':
        sorted.sort((a, b) => b.mileage - a.mileage);
        break;
      default:
        break;
    }

    return order === 'desc' ? sorted : sorted.reverse();
  }

  // Helper: Sort auctions
  private sortAuctions(auctions: Auction[], sortBy: string, order: 'asc' | 'desc'): Auction[] {
    const sorted = [...auctions];
    
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.currentBid - b.currentBid);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.currentBid - a.currentBid);
        break;
      case 'ending-soon':
        // Would need proper date parsing in real app
        sorted.sort((a, b) => a.endsIn.localeCompare(b.endsIn));
        break;
      case 'year-desc':
        sorted.sort((a, b) => b.car.year - a.car.year);
        break;
      case 'year-asc':
        sorted.sort((a, b) => a.car.year - b.car.year);
        break;
      default:
        break;
    }

    return order === 'desc' ? sorted : sorted.reverse();
  }
}

export const carService = new CarService();
