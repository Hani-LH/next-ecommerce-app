'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart, Share2, Star, Truck, ShieldCheck, RefreshCw, Minus, Plus } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store';
import { cn, formatPrice, getDiscountPercentage, formatReviewCount } from '@/utils';
import { Button, Badge } from '@/components/ui';
import { ProductCard } from '@/components/products';

interface ProductDetailsProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const addItem = useCartStore(state => state.addItem);
  const isInCart = useCartStore(state => state.isInCart(product.id));
  const getItemQuantity = useCartStore(state => state.getItemQuantity(product.id));

  const discountPercentage = product.originalPrice
    ? getDiscountPercentage(product.originalPrice, product.price)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-surface-500 hover:text-brand-900 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-surface-400">/</li>
            <li>
              <Link
                href={`/?category=${product.category}`}
                className="text-surface-500 hover:text-brand-900 transition-colors capitalize"
              >
                {product.category}
              </Link>
            </li>
            <li className="text-surface-400">/</li>
            <li className="text-brand-900 font-medium truncate max-w-[200px]">
              {product.title}
            </li>
          </ol>
        </nav>

        {/* Back button (mobile) */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-surface-600 hover:text-brand-900 mb-6 lg:hidden"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        {/* Product Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-soft">
              {/* Loading skeleton */}
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-surface-100 via-surface-200 to-surface-100 animate-shimmer bg-[length:200%_100%]" />
              )}

              <Image
                src={product.images[selectedImageIndex]}
                alt={`${product.title} - Image ${selectedImageIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={cn(
                  'object-cover transition-opacity duration-300',
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                )}
                onLoad={() => setIsImageLoaded(true)}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {discountPercentage > 0 && (
                  <Badge variant="danger">-{discountPercentage}%</Badge>
                )}
                {!product.inStock && (
                  <Badge variant="default">Out of Stock</Badge>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  className="p-2 bg-white rounded-full shadow-soft hover:bg-surface-50 transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-5 h-5 text-surface-600" />
                </button>
                <button
                  className="p-2 bg-white rounded-full shadow-soft hover:bg-surface-50 transition-colors"
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5 text-surface-600" />
                </button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setIsImageLoaded(false);
                  }}
                  className={cn(
                    'relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all',
                    selectedImageIndex === index
                      ? 'ring-2 ring-brand-900 ring-offset-2'
                      : 'opacity-60 hover:opacity-100'
                  )}
                  aria-label={`View image ${index + 1}`}
                  aria-current={selectedImageIndex === index ? 'true' : 'false'}
                >
                  <Image
                    src={image}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:py-4">
            {/* Category */}
            <p className="text-sm font-medium text-surface-500 uppercase tracking-wide mb-2">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-brand-900 mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-5 h-5',
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-surface-200 text-surface-200'
                    )}
                  />
                ))}
              </div>
              <span className="font-medium text-brand-900">{product.rating}</span>
              <span className="text-surface-500">
                ({formatReviewCount(product.reviewCount)} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-brand-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-surface-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="success">Save {formatPrice(product.originalPrice - product.price)}</Badge>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-surface-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-surface-100 text-surface-600 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 mb-8">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-brand-900">Quantity</label>
                <div className="flex items-center border border-surface-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-surface-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-l-lg"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-brand-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-surface-50 transition-colors rounded-r-lg"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {isInCart && (
                  <span className="text-sm text-surface-500">
                    ({getItemQuantity} in cart)
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1"
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-surface-100 rounded-xl">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-brand-600" />
                <div>
                  <p className="text-sm font-medium text-brand-900">Free Shipping</p>
                  <p className="text-xs text-surface-500">Over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-brand-600" />
                <div>
                  <p className="text-sm font-medium text-brand-900">Easy Returns</p>
                  <p className="text-xs text-surface-500">30-day policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-600" />
                <div>
                  <p className="text-sm font-medium text-brand-900">Secure</p>
                  <p className="text-xs text-surface-500">SSL encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="text-2xl font-bold text-brand-900 mb-8">
              You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
