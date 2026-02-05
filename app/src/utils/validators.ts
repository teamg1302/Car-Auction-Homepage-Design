// Validation utility functions

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const isValidVIN = (vin: string): boolean => {
  // Basic VIN validation (17 characters, alphanumeric)
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
  return vinRegex.test(vin);
};

export const isValidYear = (year: number): boolean => {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear + 1;
};

export const isValidPrice = (price: number): boolean => {
  return price > 0 && price <= 10000000; // Max $10M
};

export const isValidMileage = (mileage: number): boolean => {
  return mileage >= 0 && mileage <= 1000000; // Max 1M miles
};

export const isValidBidAmount = (amount: number, currentBid: number, minIncrement: number = 100): boolean => {
  return amount > currentBid && (amount - currentBid) >= minIncrement;
};
