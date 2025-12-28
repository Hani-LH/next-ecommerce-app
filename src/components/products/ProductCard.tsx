'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store';
import { cn, formatPrice, getDiscountPercentage, formatReviewCount } from '@/utils';
import { Button, Badge } from '@/components/ui';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  const isInCart = useCartStore(state => state.isInCart(product.id));

  useEffect(() => {
    setMounted(true);
  }, []);

  const discountPercentage = product.originalPrice
    ? getDiscountPercentage(product.originalPrice, product.price)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  // Use mounted check to avoid hydration mismatch
  const showInCart = mounted && isInCart;

  return (
    <article
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/product/${product.id}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-2xl"
        aria-label={`View ${product.title} - ${formatPrice(product.price)}`}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface-100">
          {/* Loading skeleton */}
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-surface-100 via-surface-200 to-surface-100 animate-shimmer bg-[length:200%_100%]" />
          )}

          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
            className={cn(
              'object-cover transition-all duration-500',
              isHovered && 'scale-105',
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setIsImageLoaded(true)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discountPercentage > 0 && (
              <Badge variant="danger" className="shadow-sm">
                -{discountPercentage}%
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="default" className="shadow-sm">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Quick actions */}
          <div
            className={cn(
              'absolute top-3 right-3 flex flex-col gap-2',
              'transition-all duration-300',
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
            )}
          >
            <button
              className="p-2 bg-white rounded-full shadow-soft hover:bg-surface-50 transition-colors"
              aria-label="Add to wishlist"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Heart className="w-4 h-4 text-surface-600" />
            </button>
          </div>

          {/* Add to cart overlay */}
          <div
            className={cn(
              'absolute inset-x-3 bottom-3',
              'transition-all duration-300',
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <Button
              variant={showInCart ? 'secondary' : 'primary'}
              fullWidth
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              {showInCart ? 'In Cart' : 'Add to Cart'}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-2">
          {/* Category */}
          <p className="text-xs font-medium text-surface-500 uppercase tracking-wide">
            {product.category}
          </p>

          {/* Title */}
          <h3 className="font-semibold text-brand-900 line-clamp-2 group-hover:text-brand-700 transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5" aria-label={`${product.rating} out of 5 stars`}>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-brand-900">
                {product.rating}
              </span>
            </div>
            <span className="text-sm text-surface-500">
              ({formatReviewCount(product.reviewCount)})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-brand-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-surface-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}