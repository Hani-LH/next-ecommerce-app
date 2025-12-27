'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store';
import { CartItem, CartSummary } from '@/components/cart';
import { Button } from '@/components/ui';

export function CartPageContent() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore(state => state.items);
  const clearCart = useCartStore(state => state.clearCart);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Loading state during hydration
  if (!mounted) {
    return <CartSkeleton />;
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-24 h-24 bg-surface-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-surface-400" />
        </div>
        <h1 className="text-2xl font-bold text-brand-900 mb-2">
          Your cart is empty
        </h1>
        <p className="text-surface-600 mb-8 max-w-md">
          Looks like you haven&apos;t added anything to your cart yet. Start shopping
          to fill it up!
        </p>
        <Link href="/">
          <Button size="lg">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-brand-900">
              Shopping Cart
            </h1>
            <p className="text-surface-600 mt-1">
              {items.length} item{items.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-surface-600 hover:text-brand-900 transition-colors">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={() => {
                if (confirm('Are you sure you want to clear your cart?')) {
                  clearCart();
                }
              }}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Cart Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading skeleton
function CartSkeleton() {
  return (
    <div className="min-h-screen bg-surface-50 py-8 lg:py-12 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 bg-surface-200 rounded w-48 mb-8" />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white rounded-xl">
                <div className="w-24 h-24 bg-surface-200 rounded-lg" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-surface-200 rounded w-3/4" />
                  <div className="h-4 bg-surface-200 rounded w-1/2" />
                  <div className="h-6 bg-surface-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
          <div className="h-64 bg-white rounded-xl" />
        </div>
      </div>
    </div>
  );
}
