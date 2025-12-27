import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/products/ProductCard';
import { useCartStore } from '@/store/cart';
import type { Product } from '@/types';

const mockProduct: Product = {
  id: '1',
  title: 'Premium Running Shoes',
  description: 'High-performance running shoes with advanced cushioning',
  price: 149.99,
  originalPrice: 199.99,
  category: 'shoes',
  images: ['https://picsum.photos/seed/1/400/400'],
  rating: 4.7,
  reviewCount: 256,
  inStock: true,
  tags: ['running', 'sports', 'athletic'],
  createdAt: '2024-01-15T00:00:00Z',
};

const outOfStockProduct: Product = {
  ...mockProduct,
  id: '2',
  title: 'Limited Edition Sneakers',
  inStock: false,
};

describe('ProductCard Component', () => {
  beforeEach(() => {
    // Reset cart store before each test
    useCartStore.setState({
      items: [],
      isCartOpen: false,
    });
  });

  describe('Rendering', () => {
    it('renders product information correctly', () => {
      render(<ProductCard product={mockProduct} />);
      
      expect(screen.getByText('Premium Running Shoes')).toBeInTheDocument();
      expect(screen.getByText('$149.99')).toBeInTheDocument();
      expect(screen.getByText('shoes')).toBeInTheDocument(); // Displayed with CSS uppercase
    });

    it('displays original price and discount badge when product has discount', () => {
      render(<ProductCard product={mockProduct} />);
      
      expect(screen.getByText('$199.99')).toBeInTheDocument();
      expect(screen.getByText(/25%/)).toBeInTheDocument(); // Discount percentage
    });

    it('displays rating and review count', () => {
      render(<ProductCard product={mockProduct} />);
      
      expect(screen.getByText('4.7')).toBeInTheDocument();
      expect(screen.getByText('(256)')).toBeInTheDocument();
    });

    it('shows out of stock badge for unavailable products', () => {
      render(<ProductCard product={outOfStockProduct} />);
      
      expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    });

    it('renders product image with correct alt text', () => {
      render(<ProductCard product={mockProduct} />);
      
      const image = screen.getByAltText('Premium Running Shoes');
      expect(image).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('adds product to cart when "Add to Cart" button is clicked', () => {
      render(<ProductCard product={mockProduct} />);
      
      const addButton = screen.getByRole('button', { name: /add to cart/i });
      fireEvent.click(addButton);
      
      const { items } = useCartStore.getState();
      expect(items).toHaveLength(1);
      expect(items[0].product.id).toBe('1');
      expect(items[0].quantity).toBe(1);
    });

    it('shows "In Cart" text after adding to cart', () => {
      // Pre-add item to cart
      useCartStore.getState().addItem(mockProduct);
      
      render(<ProductCard product={mockProduct} />);
      
      // Should show "In Cart" instead of Add to Cart
      expect(screen.getByText(/in cart/i)).toBeInTheDocument();
    });

    it('disables Add to Cart button for out of stock products', () => {
      render(<ProductCard product={outOfStockProduct} />);
      
      const addButton = screen.getByRole('button', { name: /add to cart/i });
      expect(addButton).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('has proper link to product details page', () => {
      render(<ProductCard product={mockProduct} />);
      
      const links = screen.getAllByRole('link');
      const productLink = links.find(link => 
        link.getAttribute('href')?.includes('/product/1')
      );
      expect(productLink).toBeInTheDocument();
    });

    it('uses semantic article element', () => {
      const { container } = render(<ProductCard product={mockProduct} />);
      
      expect(container.querySelector('article')).toBeInTheDocument();
    });

    it('has accessible button labels', () => {
      render(<ProductCard product={mockProduct} />);
      
      expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /add to wishlist/i })).toBeInTheDocument();
    });

    it('has focus-visible styles for keyboard navigation', () => {
      render(<ProductCard product={mockProduct} />);
      
      const addButton = screen.getByRole('button', { name: /add to cart/i });
      expect(addButton.className).toContain('focus-visible:');
    });
  });

  describe('Edge Cases', () => {
    it('handles products without original price (no discount)', () => {
      const productWithoutDiscount: Product = {
        ...mockProduct,
        originalPrice: undefined,
      };
      
      render(<ProductCard product={productWithoutDiscount} />);
      
      // Should not show discount badge
      expect(screen.queryByText(/%/)).not.toBeInTheDocument();
      // Should show current price
      expect(screen.getByText('$149.99')).toBeInTheDocument();
    });

    it('handles products with zero reviews', () => {
      const productWithNoReviews: Product = {
        ...mockProduct,
        reviewCount: 0,
      };
      
      render(<ProductCard product={productWithNoReviews} />);
      
      expect(screen.getByText('(0)')).toBeInTheDocument();
    });

    it('handles very long product titles with truncation', () => {
      const productWithLongTitle: Product = {
        ...mockProduct,
        title: 'This is an extremely long product title that should be truncated when displayed in the product card',
      };
      
      render(<ProductCard product={productWithLongTitle} />);
      
      // Title element should exist with truncation class
      const titleElement = screen.getByText(/This is an extremely long/);
      expect(titleElement.className).toContain('line-clamp');
    });
  });
});
