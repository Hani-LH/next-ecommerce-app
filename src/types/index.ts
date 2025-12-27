// ============================================
// Product Types
// ============================================

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
  createdAt: string;
}

export type ProductCategory = 
  | 'shoes'
  | 'shirts'
  | 'electronics'
  | 'accessories'
  | 'pants'
  | 'outerwear';

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'shoes', label: 'Shoes' },
  { value: 'shirts', label: 'Shirts' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'pants', label: 'Pants' },
  { value: 'outerwear', label: 'Outerwear' },
];

// ============================================
// Filter Types
// ============================================

export type PriceRange = 
  | 'all'
  | 'under-50'
  | '50-100'
  | '100-200'
  | 'over-200';

export const PRICE_RANGES: { value: PriceRange; label: string; min?: number; max?: number }[] = [
  { value: 'all', label: 'All Prices' },
  { value: 'under-50', label: 'Under $50', max: 50 },
  { value: '50-100', label: '$50 - $100', min: 50, max: 100 },
  { value: '100-200', label: '$100 - $200', min: 100, max: 200 },
  { value: 'over-200', label: 'Over $200', min: 200 },
];

export interface ProductFilters {
  category?: ProductCategory | 'all';
  priceRange?: PriceRange;
  search?: string;
  sortBy?: SortOption;
}

export type SortOption = 
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'newest';

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

// ============================================
// Cart Types
// ============================================

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// ============================================
// API Response Types
// ============================================

export interface ProductsApiResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
}
