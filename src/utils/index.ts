import { clsx, type ClassValue } from 'clsx';

/**
 * Merge class names with clsx - handles conditional classes elegantly
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Format price with currency symbol
 */
export function formatPrice(
  price: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Calculate discount percentage
 */
export function getDiscountPercentage(
  originalPrice: number,
  currentPrice: number
): number {
  if (originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Generate star rating display
 */
export function generateStarRating(rating: number): {
  fullStars: number;
  hasHalfStar: boolean;
  emptyStars: number;
} {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return { fullStars, hasHalfStar, emptyStars };
}

/**
 * Debounce function for search optimization
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Format review count for display
 */
export function formatReviewCount(count: number): string {
  if (count >= 10000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toLocaleString();
}

/**
 * Slugify string for URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Parse search params to object
 */
export function parseSearchParams(
  searchParams: URLSearchParams
): Record<string, string> {
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

/**
 * Build URL with search params
 */
export function buildUrlWithParams(
  baseUrl: string,
  params: Record<string, string | undefined>
): string {
  const url = new URL(baseUrl, 'http://localhost');
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== 'all') {
      url.searchParams.set(key, value);
    }
  });
  return `${url.pathname}${url.search}`;
}
