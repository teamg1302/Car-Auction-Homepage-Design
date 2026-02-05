// Constants and static data for the application

import type { CarType } from '@/types';

export const CAR_MAKES = [
  'Any Make',
  'Porsche',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Ferrari',
  'Lamborghini',
  'McLaren',
  'Aston Martin',
  'Jaguar',
  'Maserati',
  'Bentley',
  'Rolls-Royce',
  'Tesla',
  'Ford',
  'Chevrolet',
  'Dodge',
  'Nissan',
  'Toyota',
  'Honda',
  'Lexus',
  'Acura',
  'Infiniti',
  'Cadillac',
  'Lincoln',
];

export const CAR_TYPES: CarType[] = [
  'Coupe',
  'Sedan',
  'SUV',
  'Truck',
  'Convertible',
  'Classic',
  'Other',
];

export const PRICE_RANGES = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $50k', min: 0, max: 50000 },
  { label: '$50k - $100k', min: 50000, max: 100000 },
  { label: '$100k - $200k', min: 100000, max: 200000 },
  { label: '$200k+', min: 200000, max: Infinity },
];

export const YEAR_RANGES = [
  { label: 'Any Year', min: 1900, max: new Date().getFullYear() + 1 },
  { label: '2020 - Present', min: 2020, max: new Date().getFullYear() + 1 },
  { label: '2015 - 2019', min: 2015, max: 2019 },
  { label: '2010 - 2014', min: 2010, max: 2014 },
  { label: '2000 - 2009', min: 2000, max: 2009 },
  { label: 'Before 2000', min: 1900, max: 1999 },
];

export const TRANSMISSION_TYPES = [
  'Manual',
  'Automatic',
  'CVT',
  'DCT',
  'PDK',
  'Other',
];

export const FUEL_TYPES = [
  'Gasoline',
  'Diesel',
  'Electric',
  'Hybrid',
  'Plug-in Hybrid',
];

export const CONDITION_TYPES = [
  'Excellent',
  'Very Good',
  'Good',
  'Fair',
  'Poor',
];

export const SORT_OPTIONS = [
  { value: 'ending-soon', label: 'Ending Soon' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'year-desc', label: 'Year: Newest First' },
  { value: 'year-asc', label: 'Year: Oldest First' },
  { value: 'mileage-asc', label: 'Mileage: Low to High' },
  { value: 'mileage-desc', label: 'Mileage: High to Low' },
  { value: 'newest', label: 'Newest Listings' },
];

export const ROUTES = {
  HOME: '/',
  BROWSE: '/browse',
  CAR_DETAILS: '/car/:id',
  SELL: '/sell',
  HOW_IT_WORKS: '/how-it-works',
  ABOUT: '/about',
  CONTACT: '/contact',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  MY_BIDS: '/my-bids',
  WATCHLIST: '/watchlist',
} as const;

export const API_ENDPOINTS = {
  CARS: '/api/cars',
  AUCTIONS: '/api/auctions',
  BIDS: '/api/bids',
  USERS: '/api/users',
  AUTH: '/api/auth',
  SEARCH: '/api/search',
} as const;
