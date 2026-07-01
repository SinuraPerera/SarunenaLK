export type Language = 'en' | 'si' | 'ta';

export type UserRole = 'Farmer' | 'Officer' | 'Admin';

export interface User {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  district: string;
  avatarUrl?: string;
}

export interface Crop {
  id: string;
  name: { en: string; si: string; ta: string };
  category: 'Vegetable' | 'Paddy' | 'Fruit' | 'Spice' | 'Export';
  healthStatus: 'Excellent' | 'Good' | 'Fair' | 'At Risk';
  growthStage: 'Seeding' | 'Vegetative' | 'Flowering' | 'Harvesting';
  progress: number;
  plantedDate: string;
  expectedHarvest: string;
  areaAcres: number;
  moisture: number;
  soilPH: number;
  alerts: string[];
}

export interface MarketPrice {
  id: string;
  cropName: { en: string; si: string; ta: string };
  category: string;
  pricePerKg: number;
  change: 'up' | 'down' | 'stable';
  changePercentage: number;
  yesterdayPrice: number;
  district: string;
  trendData: number[];
}

export interface Scheme {
  id: string;
  title: { en: string; si: string; ta: string };
  description: { en: string; si: string; ta: string };
  subsidyPercentage: number;
  authority: { en: string; si: string; ta: string };
  eligibility: string[];
  deadline: string;
  category: 'Fertilizer' | 'Equipment' | 'Seed' | 'Loan' | 'Disaster';
  status: 'Open' | 'Closed' | 'Applied';
}

export interface MarketplaceItem {
  id: string;
  title: string;
  category: 'Produce' | 'Seedlings' | 'Equipment' | 'Fertilizer' | 'Services';
  price: number;
  unit: string;
  quantityAvailable: number;
  sellerName: string;
  sellerRole: 'Farmer' | 'Supplier';
  sellerPhone: string;
  location: string;
  district: string;
  imageUrl: string;
  dateAdded: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface WeatherData {
  temp: number;
  condition: 'Sunny' | 'Rainy' | 'Cloudy' | 'Thunderstorm';
  humidity: number;
  windSpeed: number;
  rainProbability: number;
  district: string;
  forecast: { day: string; temp: number; condition: string }[];
}
