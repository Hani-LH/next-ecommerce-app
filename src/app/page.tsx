import { Suspense } from 'react';
import { Metadata } from 'next';
import { mockProducts, filterProducts } from '@/lib/products';
import { ProductFilters as FilterTypes } from '@/types';
import { ProductGrid, ProductFilters } from '@/components/products';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'Shop All Products | MiniShop',
  description:
    'Browse our complete collection of premium products including shoes, shirts, electronics, and accessories.',
};

// ============================================
// Page Props
// ============================================

interface HomePageProps {
  searchParams: Promise<{
    category?: string;
    priceRange?: string;
    search?: string;
    sortBy?: string;
  }>;
}

// ============================================
// Home Page Component
// ============================================

export default async function HomePage({ searchParams }: HomePageProps) {
  // Await search params (Next.js 15 async params)
  const params = await searchParams;

  // Apply filters on server side (SSG with dynamic params)
  const filters: FilterTypes = {
    category: (params.category as FilterTypes['category']) ?? 'all',
    priceRange: (params.priceRange as FilterTypes['priceRange']) ?? 'all',
    search: params.search ?? '',
    sortBy: (params.sortBy as FilterTypes['sortBy']) ?? 'featured',
  };

  const filteredProducts = filterProducts(mockProducts, filters);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white py-16 lg:py-24 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-accent-500/20 text-accent-300 rounded-full text-sm font-medium mb-6 animate-fade-in">
              ✨ New Collection Available
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in animation-delay-100">
              Discover{' '}
              <span className="text-accent-400">Premium</span>{' '}
              Products
            </h1>
            <p className="text-lg sm:text-xl text-surface-300 mb-8 animate-fade-in animation-delay-200">
              Curated collection of quality items. Find everything from fashion
              essentials to cutting-edge electronics.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
              <a
                href="#products"
                className="inline-flex items-center px-6 py-3 bg-white text-brand-900 font-semibold rounded-lg hover:bg-surface-100 transition-colors"
              >
                Shop Now
              </a>
              <a
                href="/?category=electronics"
                className="inline-flex items-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                View Electronics
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-brand-900 mb-2">
              {filters.category && filters.category !== 'all'
                ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}`
                : 'All Products'}
            </h2>
            <p className="text-surface-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Filters */}
          <Suspense fallback={<FiltersSkeleton />}>
            <ProductFilters />
          </Suspense>

          {/* Product Grid */}
          <div className="mt-8">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🚚"
              title="Free Shipping"
              description="On orders over $100. Fast delivery to your doorstep."
            />
            <FeatureCard
              icon="↩️"
              title="Easy Returns"
              description="30-day return policy. No questions asked."
            />
            <FeatureCard
              icon="🔒"
              title="Secure Checkout"
              description="SSL encrypted payment for your safety."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================
// Helper Components
// ============================================

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-6">
      <span className="text-4xl mb-4 block">{icon}</span>
      <h3 className="text-lg font-semibold text-brand-900 mb-2">{title}</h3>
      <p className="text-surface-600">{description}</p>
    </div>
  );
}

function FiltersSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 h-11 bg-surface-200 rounded-lg" />
        <div className="w-32 h-11 bg-surface-200 rounded-lg" />
      </div>
    </div>
  );
}
