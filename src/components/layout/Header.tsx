'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCartStore } from '@/store';
import { cn } from '@/utils';
import { Button } from '@/components/ui';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const totalItems = useCartStore(state => state.getTotalItems());
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch for cart count
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-white'
      )}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-brand-900 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="bg-brand-900 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">
              M
            </span>
            <span className="hidden sm:block">MiniShop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-surface-600 hover:text-brand-900 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/?category=shoes"
              className="text-surface-600 hover:text-brand-900 transition-colors font-medium"
            >
              Shoes
            </Link>
            <Link
              href="/?category=shirts"
              className="text-surface-600 hover:text-brand-900 transition-colors font-medium"
            >
              Shirts
            </Link>
            <Link
              href="/?category=electronics"
              className="text-surface-600 hover:text-brand-900 transition-colors font-medium"
            >
              Electronics
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search (visible on larger screens) */}
            <Link href="/?search=" className="hidden sm:block">
              <Button variant="ghost" size="icon" aria-label="Search products">
                <Search className="w-5 h-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Shopping cart">
                <ShoppingCart className="w-5 h-5" />
                {mounted && totalItems > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in"
                    aria-label={`${totalItems} items in cart`}
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-2 pt-2 border-t border-surface-100">
            <Link
              href="/"
              className="px-4 py-2 text-surface-600 hover:text-brand-900 hover:bg-surface-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/?category=shoes"
              className="px-4 py-2 text-surface-600 hover:text-brand-900 hover:bg-surface-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Shoes
            </Link>
            <Link
              href="/?category=shirts"
              className="px-4 py-2 text-surface-600 hover:text-brand-900 hover:bg-surface-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Shirts
            </Link>
            <Link
              href="/?category=electronics"
              className="px-4 py-2 text-surface-600 hover:text-brand-900 hover:bg-surface-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Electronics
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
