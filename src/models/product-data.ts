import { LandingPageProductData } from "./landing-page-product-data";

export interface ProductData extends LandingPageProductData {
  antiquity: string;
  stratum: string;
  isUsed: boolean;
  longitude: number;
  latitude: number;
  privateArea: number;
  builtArea: number;
  rooms: string;
  bathrooms: string;
  garages: string;
  featured: string[];
  adminPrice: number;
}
