import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-surface-300" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-bold text-xl tracking-tight"
            >
              <span className="bg-accent-500 text-brand-950 w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                M
              </span>
              MiniShop
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Curated collection of premium products. Quality meets style in
              every item we offer.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/?category=shoes"
                  className="hover:text-white transition-colors"
                >
                  Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=shirts"
                  className="hover:text-white transition-colors"
                >
                  Shirts
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=electronics"
                  className="hover:text-white transition-colors"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=accessories"
                  className="hover:text-white transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-surface-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm">
              © {currentYear} MiniShop. All rights reserved.
            </p>
            <p className="text-sm text-surface-500">
              Built by{' '}
              <a
                href="https://github.com/Hani-LH"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-400 hover:text-accent-300 transition-colors"
              >
                Hani Almaleh
              </a>
              {' '}with Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
