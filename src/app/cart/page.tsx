import { Metadata } from 'next';
import { CartPageContent } from './CartPageContent';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Review your cart and proceed to checkout.',
};

// ============================================
// Cart Page
// ============================================

export default function CartPage() {
  return <CartPageContent />;
}
