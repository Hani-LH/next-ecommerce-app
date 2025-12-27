'use client';

import { useCartStore } from '@/store';
import { formatPrice } from '@/utils';
import { Button } from '@/components/ui';

export function CartSummary() {
  const items = useCartStore(state => state.items);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  const getTotalItems = useCartStore(state => state.getTotalItems);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
      <h2 className="text-lg font-bold text-brand-900 mb-4">Order Summary</h2>

      {/* Summary Lines */}
      <dl className="space-y-3">
        <div className="flex justify-between text-surface-600">
          <dt>Subtotal ({getTotalItems()} items)</dt>
          <dd className="font-medium text-brand-900">{formatPrice(subtotal)}</dd>
        </div>

        <div className="flex justify-between text-surface-600">
          <dt>Shipping</dt>
          <dd className="font-medium text-brand-900">
            {shipping === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              formatPrice(shipping)
            )}
          </dd>
        </div>

        <div className="flex justify-between text-surface-600">
          <dt>Estimated Tax</dt>
          <dd className="font-medium text-brand-900">{formatPrice(tax)}</dd>
        </div>

        {shipping > 0 && (
          <p className="text-xs text-surface-500 pt-2">
            💡 Add {formatPrice(100 - subtotal)} more for free shipping!
          </p>
        )}

        <div className="border-t border-surface-200 pt-3 mt-3">
          <div className="flex justify-between">
            <dt className="text-lg font-bold text-brand-900">Total</dt>
            <dd className="text-lg font-bold text-brand-900">
              {formatPrice(total)}
            </dd>
          </div>
        </div>
      </dl>

      {/* Checkout Button */}
      <Button
        fullWidth
        size="lg"
        className="mt-6"
        disabled={items.length === 0}
        onClick={() => {
          // Demo: Just alert
          alert('Checkout functionality would go here!');
        }}
      >
        Proceed to Checkout
      </Button>

      {/* Trust Badges */}
      <div className="mt-6 pt-4 border-t border-surface-100">
        <div className="flex items-center justify-center gap-4 text-surface-400 text-xs">
          <span>🔒 Secure Checkout</span>
          <span>📦 Free Returns</span>
        </div>
      </div>
    </div>
  );
}
