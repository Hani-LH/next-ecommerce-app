import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '@/store/cart';
import type { Product } from '@/types';

// Mock product data for testing
const mockProduct: Product = {
  id: '1',
  title: 'Test Sneakers',
  description: 'Premium running sneakers for athletes',
  price: 129.99,
  category: 'shoes',
  images: ['/test-image.jpg'],
  rating: 4.5,
  reviewCount: 120,
  inStock: true,
  tags: ['running', 'sports'],
  createdAt: '2024-01-15T00:00:00Z',
};

const mockProduct2: Product = {
  id: '2',
  title: 'Cotton T-Shirt',
  description: 'Comfortable cotton t-shirt',
  price: 29.99,
  category: 'shirts',
  images: ['/test-image-2.jpg'],
  rating: 4.2,
  reviewCount: 85,
  inStock: true,
  tags: ['casual', 'cotton'],
  createdAt: '2024-01-16T00:00:00Z',
};

describe('Cart Store', () => {
  // Reset store state before each test
  beforeEach(() => {
    useCartStore.setState({
      items: [],
      isCartOpen: false,
    });
  });

  describe('addItem', () => {
    it('adds a new item to the cart', () => {
      const { addItem, items } = useCartStore.getState();
      
      addItem(mockProduct);
      
      const updatedItems = useCartStore.getState().items;
      expect(updatedItems).toHaveLength(1);
      expect(updatedItems[0].product.id).toBe('1');
      expect(updatedItems[0].quantity).toBe(1);
    });

    it('increments quantity when adding existing item', () => {
      const { addItem } = useCartStore.getState();
      
      addItem(mockProduct);
      addItem(mockProduct);
      addItem(mockProduct);
      
      const updatedItems = useCartStore.getState().items;
      expect(updatedItems).toHaveLength(1);
      expect(updatedItems[0].quantity).toBe(3);
    });

    it('adds multiple different products', () => {
      const { addItem } = useCartStore.getState();
      
      addItem(mockProduct);
      addItem(mockProduct2);
      
      const updatedItems = useCartStore.getState().items;
      expect(updatedItems).toHaveLength(2);
      expect(updatedItems[0].product.id).toBe('1');
      expect(updatedItems[1].product.id).toBe('2');
    });
  });

  describe('removeItem', () => {
    it('removes an item from the cart', () => {
      const { addItem, removeItem } = useCartStore.getState();
      
      addItem(mockProduct);
      addItem(mockProduct2);
      
      expect(useCartStore.getState().items).toHaveLength(2);
      
      removeItem('1');
      
      const updatedItems = useCartStore.getState().items;
      expect(updatedItems).toHaveLength(1);
      expect(updatedItems[0].product.id).toBe('2');
    });

    it('handles removing non-existent item gracefully', () => {
      const { addItem, removeItem } = useCartStore.getState();
      
      addItem(mockProduct);
      removeItem('non-existent-id');
      
      expect(useCartStore.getState().items).toHaveLength(1);
    });
  });

  describe('updateQuantity', () => {
    it('updates item quantity', () => {
      const { addItem, updateQuantity } = useCartStore.getState();
      
      addItem(mockProduct);
      updateQuantity('1', 5);
      
      const updatedItems = useCartStore.getState().items;
      expect(updatedItems[0].quantity).toBe(5);
    });

    it('removes item when quantity is set to 0', () => {
      const { addItem, updateQuantity } = useCartStore.getState();
      
      addItem(mockProduct);
      updateQuantity('1', 0);
      
      expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('removes item when quantity is negative', () => {
      const { addItem, updateQuantity } = useCartStore.getState();
      
      addItem(mockProduct);
      updateQuantity('1', -1);
      
      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('removes all items from the cart', () => {
      const { addItem, clearCart } = useCartStore.getState();
      
      addItem(mockProduct);
      addItem(mockProduct2);
      
      expect(useCartStore.getState().items).toHaveLength(2);
      
      clearCart();
      
      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe('cart toggle methods', () => {
    it('toggles cart open/closed', () => {
      const { toggleCart } = useCartStore.getState();
      
      expect(useCartStore.getState().isCartOpen).toBe(false);
      
      toggleCart();
      expect(useCartStore.getState().isCartOpen).toBe(true);
      
      toggleCart();
      expect(useCartStore.getState().isCartOpen).toBe(false);
    });

    it('opens cart explicitly', () => {
      const { openCart } = useCartStore.getState();
      
      openCart();
      expect(useCartStore.getState().isCartOpen).toBe(true);
    });

    it('closes cart explicitly', () => {
      const { openCart, closeCart } = useCartStore.getState();
      
      openCart();
      closeCart();
      expect(useCartStore.getState().isCartOpen).toBe(false);
    });
  });

  describe('computed values', () => {
    it('calculates total items correctly', () => {
      const { addItem, getTotalItems } = useCartStore.getState();
      
      addItem(mockProduct);
      addItem(mockProduct); // quantity: 2
      addItem(mockProduct2); // quantity: 1
      
      const total = useCartStore.getState().getTotalItems();
      expect(total).toBe(3);
    });

    it('calculates total price correctly', () => {
      const { addItem, getTotalPrice } = useCartStore.getState();
      
      addItem(mockProduct); // $129.99
      addItem(mockProduct); // $129.99 x 2 = $259.98
      addItem(mockProduct2); // $29.99
      
      const totalPrice = useCartStore.getState().getTotalPrice();
      // 259.98 + 29.99 = 289.97
      expect(totalPrice).toBeCloseTo(289.97, 2);
    });

    it('returns 0 for empty cart totals', () => {
      const { getTotalItems, getTotalPrice } = useCartStore.getState();
      
      expect(getTotalItems()).toBe(0);
      expect(getTotalPrice()).toBe(0);
    });

    it('checks if item is in cart', () => {
      const { addItem, isInCart } = useCartStore.getState();
      
      addItem(mockProduct);
      
      expect(useCartStore.getState().isInCart('1')).toBe(true);
      expect(useCartStore.getState().isInCart('2')).toBe(false);
    });

    it('gets item quantity', () => {
      const { addItem, getItemQuantity } = useCartStore.getState();
      
      addItem(mockProduct);
      addItem(mockProduct);
      addItem(mockProduct);
      
      expect(useCartStore.getState().getItemQuantity('1')).toBe(3);
      expect(useCartStore.getState().getItemQuantity('non-existent')).toBe(0);
    });
  });
});
