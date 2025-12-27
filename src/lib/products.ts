import { Product, ProductCategory } from '@/types';

// Category-specific image collections from Unsplash
const categoryImages: Record<string, string[]> = {
  shoes: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop', // Red Nike
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop', // White sneaker
    'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&h=800&fit=crop', // Nike pair
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop', // Colorful Nike
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop', // Jordan
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop', // White sneaker side
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop', // Vans style
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop', // Colorful sneakers
  ],
  shirts: [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=800&fit=crop', // White shirt
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=800&fit=crop', // Dress shirts
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop', // Black tee
    'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&h=800&fit=crop', // White tee
    'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800&h=800&fit=crop', // Polo shirts
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&h=800&fit=crop', // Casual shirt
    'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=800&fit=crop', // Flannel
    'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&h=800&fit=crop', // Henley
  ],
  electronics: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop', // Headphones
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=800&fit=crop', // AirPods
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop', // Smart watch
    'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=800&fit=crop', // Power bank
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop', // Headphones white
    'https://images.unsplash.com/photo-1610438235354-a6ae5528385c?w=800&h=800&fit=crop', // Earbuds
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop', // Apple watch
    'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=800&h=800&fit=crop', // Charger
  ],
  accessories: [
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop', // Sunglasses
    'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop', // Wallet
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop', // Bag
    'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop', // Watch
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop', // Aviator glasses
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop', // Backpack
    'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&h=800&fit=crop', // Luxury watch
    'https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?w=800&h=800&fit=crop', // Belt
  ],
  pants: [
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=800&fit=crop', // Jeans
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=800&fit=crop', // Blue jeans
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop', // Denim
    'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=800&fit=crop', // Chinos
    'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&h=800&fit=crop', // Joggers
    'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&h=800&fit=crop', // Trousers
  ],
  outerwear: [
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop', // Puffer jacket
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=800&fit=crop', // Coat
    'https://images.unsplash.com/photo-1544923246-77307dd628b8?w=800&h=800&fit=crop', // Rain jacket
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop', // Jacket
    'https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800&h=800&fit=crop', // Bomber
    'https://images.unsplash.com/photo-1520012218364-3dbe62c99bee?w=800&h=800&fit=crop', // Denim jacket
  ],
};

// Get product images based on category and index
const getProductImage = (productIndex: number, category: string): string[] => {
  const images = categoryImages[category] || categoryImages.accessories;
  const startIndex = (productIndex * 3) % images.length;
  return [
    images[startIndex % images.length],
    images[(startIndex + 1) % images.length],
    images[(startIndex + 2) % images.length],
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