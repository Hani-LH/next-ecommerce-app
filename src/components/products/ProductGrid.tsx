import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { cn } from '@/utils';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  className?: string;
}

export function ProductGrid({ products, loading, className }: ProductGridProps) {
  if (loading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-20 h-20 bg-surface-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-lg font-semibold text-brand-900 mb-2">
          No products found
        </h3>
        <p className="text-surface-500 max-w-md">
          Try adjusting your filters or search terms to find what you&apos;re looking
          for.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8',
        className
      )}
      role="list"
      aria-label="Product list"
    >
      {products.map((product, index) => (
        <div
          key={product.id}
          role="listitem"
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <ProductCard product={product} priority={index < 4} />
        </div>
      ))}
    </div>
  );
}

// Loading skeleton
function ProductGridSkeleton() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
      aria-busy="true"
      aria-label="Loading products"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-square bg-surface-200 rounded-2xl mb-4" />
          <div className="space-y-3">
            <div className="h-3 bg-surface-200 rounded w-1/4" />
            <div className="h-5 bg-surface-200 rounded w-3/4" />
            <div className="h-4 bg-surface-200 rounded w-1/3" />
            <div className="h-6 bg-surface-200 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
