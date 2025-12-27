# MiniShop E-Commerce platform

A modern e-commerce web app I built using Next.js 16, TypeScript, and Tailwind CSS. This project showcases my approach to building scalable frontend applications with clean architecture, solid performance, and accessibility in mind.

**Developer:** Hani Almaleh

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Product Catalog** - Browse 23 products across 6 categories with filtering and search
- **Shopping Cart** - Add, update, remove items with real-time totals
- **Responsive Design** - Mobile-first approach with breakpoint-based layouts
- **URL State Persistence** - Filters and search preserved in URL for shareable links
- **Accessibility** - WCAG compliant with keyboard navigation and screen reader support

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Hani-LH/next-ecommerce-app.git
cd next-ecommerce-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run test suite |
| `npm run test:coverage` | Run tests with coverage report |

## Tech Stack & Why I Chose It

### Next.js 16

I went with Next.js because it handles both static and dynamic rendering really well. The App Router made routing straightforward, and the built-in image optimization saved me a ton of time.

**What I used:**
- SSG for product pages (faster load times)
- API Routes for the products endpoint
- Next/Image for automatic optimization
- Metadata API for SEO stuff

### Zustand for State

I picked Zustand over Redux because honestly, Redux felt like overkill for this project. Zustand is simple, has zero boilerplate, and the persist middleware made cart storage super easy.

```typescript
// This is all you need for optimized selectors
const itemCount = useCartStore(state => state.getTotalItems());
```

### Tailwind CSS

I've been using Tailwind for a while now and it just speeds up my workflow. I set up a custom design system with my own colors and animations in the config.

### TypeScript

Strict mode everywhere. Caught a lot of bugs before they happened, especially with the cart logic and API responses.

## Extra Stuff I Added

### Performance
- Debounced the search input (300ms) so it doesn't spam the API
- Lazy loading images with IntersectionObserver
- Used Zustand selectors properly to avoid unnecessary re-renders
- Pre-rendered all product pages at build time

### Accessibility
- Semantic HTML throughout (not just divs everywhere)
- ARIA labels where needed
- Keyboard navigation works properly
- Skip link for screen readers

### Custom Hooks I Built
- `useDebounce` - delays value updates
- `useMediaQuery` - checks screen size
- `useLocalStorage` - works with SSR
- `useClickOutside` - for closing modals
- `useKeyboardShortcut` - keyboard shortcuts

### Other Features
- Filters stay in the URL (you can share filtered views)
- Cart persists in localStorage
- Loading skeletons instead of spinners
- Error boundaries so the whole app doesn't crash
- Empty states with helpful messages

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/products/       # API endpoints
│   ├── cart/               # Cart page
│   ├── product/[id]/       # Product detail pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/
│   ├── ui/                 # Base components (Button, Input, etc.)
│   ├── layout/             # Header, Footer
│   ├── products/           # ProductCard, ProductGrid, Filters
│   └── cart/               # CartItem, CartSummary
├── hooks/                  # Custom React hooks
├── lib/                    # Data and utilities
├── store/                  # Zustand stores
├── types/                  # TypeScript definitions
└── utils/                  # Helper functions
```

## Testing

I used Vitest with React Testing Library:

```bash
npm run test           # run tests
npm run test:ui        # run with UI
npm run test:coverage  # see coverage
```

Tests cover the cart store, button component, and product cards.

## Lighthouse Scores

Aiming for:
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - do whatever you want with it.

## Author

**Hani Almaleh**
- GitHub: [@Hani-LH](https://github.com/Hani-LH)

---

Built with Next.js, Tailwind CSS, Zustand, and Lucide Icons.
