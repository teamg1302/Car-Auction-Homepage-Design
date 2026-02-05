// Core types for the Car Auction application

export interface Car {
  id: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  type: CarType;
  mileage: number;
  mileageDisplay: string;
  transmission: TransmissionType;
  fuel: FuelType;
  color: string;
  vin?: string;
  condition: ConditionType;
  description: string;
  images: string[];
  location: Location;
  seller: Seller;
  specifications: CarSpecifications;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Auction {
  id: string;
  carId: string;
  car: Car;
  currentBid: number;
  startingBid: number;
  reservePrice?: number;
  reserveMet: boolean;
  bidCount: number;
  bids: Bid[];
  status: AuctionStatus;
  startDate: string;
  endDate: string;
  endsIn: string;
  featured: boolean;
  views: number;
  watchers: number;
}

export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  user: User;
  amount: number;
  timestamp: string;
  isWinning: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  rating?: number;
  reviewCount?: number;
  memberSince: string;
  location?: Location;
}

export interface Seller {
  id: string;
  name: string;
  type: SellerType;
  rating?: number;
  reviewCount?: number;
  verified: boolean;
  avatar?: string;
}

export interface Location {
  city: string;
  state: string;
  zipCode?: string;
  country: string;
  displayName: string;
}

export interface CarSpecifications {
  engine?: string;
  horsepower?: number;
  torque?: number;
  drivetrain?: DrivetrainType;
  seats?: number;
  doors?: number;
  mpgCity?: number;
  mpgHighway?: number;
  fuelCapacity?: number;
}

export type CarType = 'Coupe' | 'Sedan' | 'SUV' | 'Truck' | 'Convertible' | 'Classic' | 'Other';
export type TransmissionType = 'Manual' | 'Automatic' | 'CVT' | 'DCT' | 'PDK' | 'Other';
export type FuelType = 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid' | 'Plug-in Hybrid';
export type ConditionType = 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
export type SellerType = 'Private Seller' | 'Verified Dealer' | 'Pro Seller';
export type AuctionStatus = 'upcoming' | 'live' | 'ended' | 'cancelled';
export type DrivetrainType = 'FWD' | 'RWD' | 'AWD' | '4WD';

export interface SearchFilters {
  make?: string;
  model?: string;
  type?: CarType;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  maxMileage?: number;
  transmission?: TransmissionType;
  fuel?: FuelType;
  location?: string;
  condition?: ConditionType[];
  sortBy?: SortOption;
  sortOrder?: 'asc' | 'desc';
}

export type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc' | 'mileage-asc' | 'mileage-desc' | 'ending-soon' | 'newest';

export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
