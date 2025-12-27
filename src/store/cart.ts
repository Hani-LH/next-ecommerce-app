import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

// ============================================
// Cart Store Interface
// ============================================

interface CartStore {
  // State
  items: CartItem[];
  isCartOpen: boolean;
  
  // Computed (getters as functions)
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: string) => number;
  isInCart: (productId: string) => boolean;
  
  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

// ============================================
// Cart Store Implementation
// ============================================

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isCartOpen: false,

      // Computed values
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getItemQuantity: (productId: string) => {
        const item = get().items.find(item => item.product.id === productId);
        return item?.quantity ?? 0;
      },

      isInCart: (productId: string) => {
        return get().items.some(item => item.product.id === productId);
      },

      // Actions
      addItem: (product: Product, quantity: number = 1) => {
        set(state => {
          const existingItemIndex = state.items.findIndex(
            item => item.product.id === product.id
          );

          if (existingItemIndex > -1) {
            // Update existing item quantity
            const newItems = [...state.items];
            newItems[existingItemIndex] = {
              ...newItems[existingItemIndex],
              quantity: newItems[existingItemIndex].quantity + quantity,
            };
            return { items: newItems };
          }

          // Add new item
          return {
            items: [...state.items, { product, quantity }],
          };
        });
      },

      removeItem: (productId: string) => {
        set(state => ({
          items: state.items.filter(item => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set(state => ({
          items: state.items.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set(state => ({ isCartOpen: !state.isCartOpen }));
      },

      openCart: () => {
        set({ isCartOpen: true });
      },

      closeCart: () => {
        set({ isCartOpen: false });
      },
    }),
    {
      name: 'cart-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist items, not UI state
      partialize: state => ({ items: state.items }),
    }
  )
);

// ============================================
// Selectors for optimized re-renders
// ============================================

export const selectCartItems = (state: CartStore) => state.items;
export const selectIsCartOpen = (state: CartStore) => state.isCartOpen;
export const selectCartActions = (state: CartStore) => ({
  addItem: state.addItem,
  removeItem: state.removeItem,
  updateQuantity: state.updateQuantity,
  clearCart: state.clearCart,
  toggleCart: state.toggleCart,
  openCart: state.openCart,
  closeCart: state.closeCart,
});
