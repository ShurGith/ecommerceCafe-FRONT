# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 14 frontend for an e-commerce coffee application built by TarreDev. The application connects to a Strapi backend and includes features for browsing products, managing cart/wishlist, and processing payments via Stripe.

## Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with shadcn/ui components
- **State Management**: Zustand with localStorage persistence
- **UI Components**: Radix UI primitives with custom styling
- **HTTP Client**: Axios for API calls
- **Payments**: Stripe integration
- **Font**: Urbanist from Google Fonts

### Project Structure

```
frontend-ecommerce/
├── app/                    # App Router pages and layouts
│   ├── (routes)/          # Route groups (cart, category, product, etc.)
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx          # Homepage
├── components/           # Reusable UI components
├── hooks/               # Custom React hooks (cart, loved-products)
├── api/                 # API hooks for data fetching
├── types/               # TypeScript type definitions
├── lib/                 # Utility functions and configurations
└── public/              # Static assets
```

### Key Architectural Patterns

1. **App Router Architecture**: Uses Next.js 14 App Router with route groups in `(routes)/` for organizing pages
2. **Zustand State Management**: Two main stores:
   - `useCart`: Shopping cart management with localStorage persistence
   - `useLovedProducts`: Wishlist/favorites functionality
3. **Custom Hooks for API**: Each API endpoint has its own React hook (e.g., `useGetCategories`, `useGetCategoryProduct`)
4. **Component Composition**: Uses shadcn/ui components built on Radix UI primitives
5. **Theme System**: Dark/light mode support via next-themes

### Data Flow
- Backend API calls use custom hooks that manage loading/error states
- All API URLs are configured via `NEXT_PUBLIC_BACKEND_URL` environment variable
- Strapi CMS structure reflected in TypeScript types (nested `data.attributes` pattern)
- Client-side state persisted in localStorage for cart and favorites

## Common Commands

### Development
```bash
npm run dev          # Start development server on http://localhost:3000
```

### Building and Production
```bash
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint checks
```

### Dependency Management
```bash
npm install          # Install all dependencies
npm install <package> # Add new dependency
```

## Environment Configuration

Required environment variables:
- `NEXT_PUBLIC_BACKEND_URL` - Base URL for the Strapi backend API
- Stripe-related variables for payment processing

## Key Components and Features

### State Management Stores
- **Cart Store** (`hooks/use-cart.tsx`): Manages shopping cart with add/remove/clear functionality
- **Loved Products Store** (`hooks/use-loved-products.tsx`): Handles product favorites/wishlist

### API Integration
- All API hooks follow the pattern: `{ result, loading, error }`
- Backend expects Strapi's nested structure: `data.attributes`
- Products have relationships to categories and images

### Routing Structure
- `/` - Homepage with featured products and banners  
- `/category/[categorySlug]` - Category listing pages
- `/product/[productSlug]` - Individual product pages
- `/cart` - Shopping cart page
- `/loved-products` - Favorites/wishlist page
- `/success` - Payment success page

### Component Patterns
- Uses composition pattern with shadcn/ui components
- Toast notifications for user feedback via `useToast`
- Responsive design with TailwindCSS
- Loading skeletons for better UX during data fetching

## Development Notes

### TypeScript Types
Main types are located in `/types/`:
- `ProductType`: Complete product structure with nested category and images
- `CategoryType`: Category structure with main image
- `ResponseType`: Generic API response wrapper

### Styling Conventions
- Uses TailwindCSS with custom design system colors
- CSS custom properties for theme variables
- Component-scoped styling with clsx for conditional classes

### API Patterns
All API hooks are async and return consistent structure:
```typescript
{ result: T | null, loading: boolean, error: string }
```

Backend API endpoints expect Strapi query parameters for population and filtering.
