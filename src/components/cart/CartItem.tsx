'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/store';
import { formatPrice } from '@/utils';
import { Button } from '@/components/ui';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { product, quantity } = item;
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeItem = useCartStore(state => state.removeItem);

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <article className="flex gap-4 p-4 bg-white rounded-xl shadow-soft">
      {/* Product Image */}
      <Link
        href={`/product/${product.id}`}
        className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg"
      >
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-surface-100">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Title & Category */}
        <div className="flex-1">
          <p className="text-xs text-surface-500 uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <Link
            href={`/product/${product.id}`}
            className="font-semibold text-brand-900 hover:text-brand-700 transition-colors line-clamp-2"
          >
            {product.title}
          </Link>
        </div>

        {/* Price & Quantity */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-surface-600 mr-1">Qty:</span>
            <div className="flex items-center border border-surface-200 rounded-lg">
              <button
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="p-2 hover:bg-surface-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-l-lg"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span
                className="w-10 text-center font-medium text-brand-900"
                aria-label={`Quantity: ${quantity}`}
              >
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="p-2 hover:bg-surface-50 transition-colors rounded-r-lg"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <p className="text-lg font-bold text-brand-900">
              {formatPrice(product.price * quantity)}
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="text-surface-400 hover:text-red-600"
              aria-label={`Remove ${product.title} from cart`}
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
