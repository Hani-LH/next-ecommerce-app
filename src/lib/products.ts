import { Product, ProductCategory } from '@/types';

// Helper to generate consistent image URLs
const getProductImage = (id: number, category: string): string[] => {
  // Using picsum.photos for consistent, high-quality placeholder images
  const baseId = id * 10;
  return [
    `https://picsum.photos/seed/${category}${baseId}/800/800`,
    `https://picsum.photos/seed/${category}${baseId + 1}/800/800`,
    `https://picsum.photos/seed/${category}${baseId + 2}/800/800`,
  ];
};

export const mockProducts: Product[] = [
  // SHOES
  {
    id: 'shoe-001',
    title: 'Nike Air Max 270',
    description: 'The Nike Air Max 270 delivers visible cushioning under every step. Updated for modern comfort, it nods to the original 1991 Air Max 180 with its exaggerated tongue top and heritage tongue logo.',
    price: 150,
    originalPrice: 180,
    category: 'shoes',
    images: getProductImage(1, 'shoes'),
    rating: 4.8,
    reviewCount: 2453,
    inStock: true,
    tags: ['running', 'comfort', 'bestseller'],
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'shoe-002',
    title: 'Adidas Ultraboost 22',
    description: 'These running shoes serve up comfort and responsiveness. The knit upper hugs your foot while BOOST cushioning delivers endless energy. A Linear Energy Push system helps propel you forward.',
    price: 190,
    category: 'shoes',
    images: getProductImage(2, 'shoes'),
    rating: 4.7,
    reviewCount: 1876,
    inStock: true,
    tags: ['running', 'performance', 'sustainable'],
    createdAt: '2024-02-10T00:00:00Z',
  },
  {
    id: 'shoe-003',
    title: 'Converse Chuck Taylor All Star',
    description: 'The iconic Chuck Taylor All Star sneaker, featuring the classic canvas upper and vulcanized rubber sole. A timeless style that goes with everything.',
    price: 65,
    category: 'shoes',
    images: getProductImage(3, 'shoes'),
    rating: 4.6,
    reviewCount: 8234,
    inStock: true,
    tags: ['casual', 'classic', 'versatile'],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'shoe-004',
    title: 'New Balance 574 Core',
    description: 'The most New Balance shoe ever. The 574 was built to be a reliable shoe with a simple goal: deliver comfort and style for everyday wear.',
    price: 89.99,
    category: 'shoes',
    images: getProductImage(4, 'shoes'),
    rating: 4.5,
    reviewCount: 3421,
    inStock: true,
    tags: ['lifestyle', 'retro', 'comfortable'],
    createdAt: '2024-03-05T00:00:00Z',
  },

  // SHIRTS
  {
    id: 'shirt-001',
    title: 'Premium Cotton Oxford Shirt',
    description: 'A wardrobe essential crafted from premium 100% cotton oxford cloth. Features a classic button-down collar, adjustable cuffs, and a comfortable regular fit.',
    price: 79,
    originalPrice: 95,
    category: 'shirts',
    images: getProductImage(5, 'shirts'),
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    tags: ['formal', 'business', 'essential'],
    createdAt: '2024-02-20T00:00:00Z',
  },
  {
    id: 'shirt-002',
    title: 'Linen Summer Shirt',
    description: 'Lightweight linen shirt perfect for warm weather. Features a relaxed fit, mother-of-pearl buttons, and a soft hand feel that gets better with every wash.',
    price: 110,
    category: 'shirts',
    images: getProductImage(6, 'shirts'),
    rating: 4.4,
    reviewCount: 567,
    inStock: true,
    tags: ['summer', 'casual', 'breathable'],
    createdAt: '2024-04-01T00:00:00Z',
  },
  {
    id: 'shirt-003',
    title: 'Graphic Tee - Urban Collection',
    description: 'Express yourself with our urban-inspired graphic tee. Made from soft ringspun cotton with a vintage-wash finish for that lived-in look.',
    price: 35,
    category: 'shirts',
    images: getProductImage(7, 'shirts'),
    rating: 4.3,
    reviewCount: 2134,
    inStock: true,
    tags: ['casual', 'streetwear', 'trendy'],
    createdAt: '2024-03-15T00:00:00Z',
  },
  {
    id: 'shirt-004',
    title: 'Merino Wool Polo',
    description: 'Elevate your polo game with this luxurious merino wool blend. Naturally temperature-regulating, moisture-wicking, and odor-resistant.',
    price: 125,
    category: 'shirts',
    images: getProductImage(8, 'shirts'),
    rating: 4.7,
    reviewCount: 423,
    inStock: false,
    tags: ['premium', 'smart-casual', 'travel'],
    createdAt: '2024-01-25T00:00:00Z',
  },

  // ELECTRONICS
  {
    id: 'elec-001',
    title: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise canceling headphones with exceptional sound quality. Features 30-hour battery life, multipoint connection, and speak-to-chat technology.',
    price: 349,
    originalPrice: 399,
    category: 'electronics',
    images: getProductImage(9, 'electronics'),
    rating: 4.9,
    reviewCount: 5621,
    inStock: true,
    tags: ['audio', 'premium', 'wireless'],
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'elec-002',
    title: 'Apple AirPods Pro 2nd Gen',
    description: 'Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio. MagSafe charging case with precision finding and built-in speaker.',
    price: 249,
    category: 'electronics',
    images: getProductImage(10, 'electronics'),
    rating: 4.8,
    reviewCount: 12453,
    inStock: true,
    tags: ['apple', 'earbuds', 'bestseller'],
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'elec-003',
    title: 'Samsung Galaxy Watch 6',
    description: 'Advanced health monitoring with BioActive Sensor. Personalized heart rate zones, sleep coaching, and body composition analysis.',
    price: 329,
    category: 'electronics',
    images: getProductImage(11, 'electronics'),
    rating: 4.5,
    reviewCount: 3287,
    inStock: true,
    tags: ['wearable', 'fitness', 'smart'],
    createdAt: '2024-03-20T00:00:00Z',
  },
  {
    id: 'elec-004',
    title: 'Anker PowerCore 26800',
    description: 'Massive 26800mAh capacity provides over 6 charges for iPhone, 5 charges for Galaxy, and 2 charges for iPad mini. Dual USB ports for simultaneous charging.',
    price: 65.99,
    category: 'electronics',
    images: getProductImage(12, 'electronics'),
    rating: 4.6,
    reviewCount: 8932,
    inStock: true,
    tags: ['portable', 'charging', 'travel'],
    createdAt: '2024-02-15T00:00:00Z',
  },

  // ACCESSORIES
  {
    id: 'acc-001',
    title: 'Ray-Ban Aviator Classic',
    description: 'The iconic Ray-Ban Aviator sunglasses feature the original shape that started a legend. Crystal lenses ensure superior optical clarity.',
    price: 171,
    category: 'accessories',
    images: getProductImage(13, 'accessories'),
    rating: 4.7,
    reviewCount: 4532,
    inStock: true,
    tags: ['sunglasses', 'classic', 'iconic'],
    createdAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 'acc-002',
    title: 'Leather Minimalist Wallet',
    description: 'Slim, RFID-blocking wallet crafted from full-grain leather. Holds up to 8 cards with a quick-access slot and hidden cash compartment.',
    price: 49,
    originalPrice: 65,
    category: 'accessories',
    images: getProductImage(14, 'accessories'),
    rating: 4.5,
    reviewCount: 2187,
    inStock: true,
    tags: ['leather', 'minimalist', 'everyday'],
    createdAt: '2024-02-28T00:00:00Z',
  },
  {
    id: 'acc-003',
    title: 'Canvas Weekender Bag',
    description: 'Durable waxed canvas weekender with leather trim. Features a spacious main compartment, laptop sleeve, and multiple organization pockets.',
    price: 185,
    category: 'accessories',
    images: getProductImage(15, 'accessories'),
    rating: 4.8,
    reviewCount: 876,
    inStock: true,
    tags: ['travel', 'durable', 'handcrafted'],
    createdAt: '2024-03-10T00:00:00Z',
  },
  {
    id: 'acc-004',
    title: 'Casio G-Shock GA-2100',
    description: 'Thin and light with carbon core guard structure. Features shock-resistant, 200M water resistance, and world time with 31 time zones.',
    price: 99,
    category: 'accessories',
    images: getProductImage(16, 'accessories'),
    rating: 4.6,
    reviewCount: 3654,
    inStock: true,
    tags: ['watch', 'durable', 'sports'],
    createdAt: '2024-04-05T00:00:00Z',
  },

  // PANTS
  {
    id: 'pant-001',
    title: 'Slim Fit Chinos',
    description: 'Versatile slim-fit chinos in a comfortable stretch cotton blend. Perfect for office or weekend wear with a clean, modern silhouette.',
    price: 79,
    originalPrice: 89,
    category: 'pants',
    images: getProductImage(17, 'pants'),
    rating: 4.4,
    reviewCount: 1543,
    inStock: true,
    tags: ['versatile', 'stretch', 'smart-casual'],
    createdAt: '2024-02-05T00:00:00Z',
  },
  {
    id: 'pant-002',
    title: 'Athletic Joggers',
    description: 'Technical joggers with 4-way stretch fabric. Features zippered pockets, moisture-wicking technology, and a tapered fit for active lifestyles.',
    price: 68,
    category: 'pants',
    images: getProductImage(18, 'pants'),
    rating: 4.5,
    reviewCount: 2876,
    inStock: true,
    tags: ['athletic', 'comfortable', 'performance'],
    createdAt: '2024-03-25T00:00:00Z',
  },
  {
    id: 'pant-003',
    title: 'Selvedge Denim Jeans',
    description: 'Premium Japanese selvedge denim with a straight leg fit. Raw construction means these jeans will develop unique fades over time.',
    price: 198,
    category: 'pants',
    images: getProductImage(19, 'pants'),
    rating: 4.8,
    reviewCount: 654,
    inStock: true,
    tags: ['premium', 'raw-denim', 'craftsmanship'],
    createdAt: '2024-01-30T00:00:00Z',
  },

  // OUTERWEAR
  {
    id: 'outer-001',
    title: 'Quilted Puffer Jacket',
    description: 'Lightweight yet warm puffer jacket with recycled synthetic insulation. Water-resistant shell with a packable design for easy travel.',
    price: 149,
    originalPrice: 189,
    category: 'outerwear',
    images: getProductImage(20, 'outerwear'),
    rating: 4.6,
    reviewCount: 1234,
    inStock: true,
    tags: ['winter', 'sustainable', 'packable'],
    createdAt: '2024-01-05T00:00:00Z',
  },
  {
    id: 'outer-002',
    title: 'Wool Blend Overcoat',
    description: 'Timeless double-breasted overcoat in Italian wool blend. Features peak lapels, structured shoulders, and a classic knee-length cut.',
    price: 395,
    category: 'outerwear',
    images: getProductImage(21, 'outerwear'),
    rating: 4.9,
    reviewCount: 432,
    inStock: true,
    tags: ['formal', 'italian', 'investment'],
    createdAt: '2024-02-12T00:00:00Z',
  },
  {
    id: 'outer-003',
    title: 'Waterproof Rain Jacket',
    description: '3-layer waterproof breathable jacket built for serious weather. Fully seam-sealed with adjustable hood and pit zips for ventilation.',
    price: 225,
    category: 'outerwear',
    images: getProductImage(22, 'outerwear'),
    rating: 4.7,
    reviewCount: 1876,
    inStock: true,
    tags: ['waterproof', 'outdoor', 'technical'],
    createdAt: '2024-03-01T00:00:00Z',
  },
];

// Helper function to filter products
export function filterProducts(
  products: Product[],
  filters: {
    category?: string;
    priceRange?: string;
    search?: string;
    sortBy?: string;
  }
): Product[] {
  let filtered = [...products];

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  // Filter by price range
  if (filters.priceRange && filters.priceRange !== 'all') {
    filtered = filtered.filter(p => {
      switch (filters.priceRange) {
        case 'under-50':
          return p.price < 50;
        case '50-100':
          return p.price >= 50 && p.price <= 100;
        case '100-200':
          return p.price >= 100 && p.price <= 200;
        case 'over-200':
          return p.price > 200;
        default:
          return true;
      }
    });
  }

  // Filter by search query
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      p =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Sort products
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        // 'featured' - keep original order
        break;
    }
  }

  return filtered;
}
