import type { Metadata, Viewport } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Header, Footer } from '@/components/layout';
import './globals.css';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: {
    default: 'MiniShop - Premium E-Commerce',
    template: '%s | MiniShop',
  },
  description:
    'Discover our curated collection of premium products. Quality meets style in every item we offer.',
  keywords: [
    'ecommerce',
    'shop',
    'fashion',
    'electronics',
    'accessories',
    'shoes',
    'shirts',
  ],
  authors: [{ name: 'Senior Frontend Developer' }],
  creator: 'MiniShop',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'MiniShop',
    title: 'MiniShop - Premium E-Commerce',
    description:
      'Discover our curated collection of premium products. Quality meets style in every item we offer.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MiniShop - Premium E-Commerce',
    description:
      'Discover our curated collection of premium products. Quality meets style in every item we offer.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a1f35',
};

// ============================================
// Root Layout
// ============================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-900 focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>

        <Header />

        <main id="main-content" className="flex-1 pt-16 lg:pt-20">
          {children}
        </main>

        <Footer />

        <SpeedInsights />
      </body>
    </html>
  );
}
