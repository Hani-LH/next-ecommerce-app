import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mockProducts } from '@/lib/products';
import { ProductDetails } from './ProductDetails';

// ============================================
// Generate Static Params (SSG)
// ============================================

export async function generateStaticParams() {
  return mockProducts.map(product => ({
    id: product.id,
  }));
}

// ============================================
// Generate Metadata
// ============================================

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images,
    },
  };
}

// ============================================
// Product Detail Page
// ============================================

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  // Get related products (same category, exclude current)
  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetails product={product} relatedProducts={relatedProducts} />;
}
