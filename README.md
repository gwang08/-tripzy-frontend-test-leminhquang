# Tripzy - Travel Booking Platform

A modern travel booking platform built with Next.js 15, React 19, and TypeScript for seamless bus, hotel, and flight bookings.

## 🚀 Live Demo

**Vercel**: [xxx](xxx)

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation & Development

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build
npm run build
# or
yarn build
# or
pnpm build

# Start production server
npm start
# or
yarn start
# or
pnpm start
```

## 🏗️ Architecture & Technical Stack

### Core Technologies

- **Next.js 15** (App Router): Modern React framework with server components and streaming SSR
- **React 19**: Latest React with enhanced concurrent features
- **TypeScript 5**: Full type safety across the application
- **Tailwind CSS 4**: Utility-first CSS for rapid development

### Project Structure

```
tripzy/
├── app/                    # Next.js pages (page.tsx, layout.tsx)
├── components/             # Reusable UI components
│   ├── Homepage.tsx        # Main landing page
│   ├── SearchContent.tsx   # Search results display
│   ├── LocationInput.tsx   # Autocomplete location selector
│   ├── DatePicker.tsx      # Dual-month calendar
│   └── *Skeleton.tsx       # Loading states
├── types/                  # TypeScript interfaces
│   ├── location.ts
│   ├── form.ts
│   └── components.ts
├── lib/
│   ├── constants/          # Design tokens (colors, typography, layout)
│   └── utils/              # Helper functions (date, validation, URL)
├── hooks/                  # Custom React hooks
│   └── useClickOutside.ts
└── data/                   # Static JSON data
```

### Key Architectural Decisions

**Modular Architecture**
- Clean separation: components, types, utilities, and hooks in dedicated directories
- Barrel exports (`index.ts`) for simplified imports
- Each component paired with loading skeleton for optimal UX

**Type-Safe Development**
- Centralized TypeScript definitions in `/types`
- Strict type checking enabled
- IntelliSense support throughout

**Design System**
- Design tokens (colors, typography, layout) in `/lib/constants`
- Custom font: Nunito Sans (weights: 400, 600)
- Consistent styling across components

**Reusable Utilities**
- Date formatting and validation in `/lib/utils/date.ts`
- Form validation logic in `/lib/utils/validation.ts`
- URL parameter building in `/lib/utils/url.ts`
- Custom `useClickOutside` hook for dropdowns

**Performance & UX**
- Suspense boundaries with skeleton UI matching actual layouts
- Client-side rendering for interactive forms
- Optimized bundle size with tree-shaking
- Monday-first calendar with weekend highlighting

### Why These Choices?

- **Next.js 15 App Router**: Better code organization, streaming SSR, and React Server Components support
- **TypeScript**: Catches errors at compile-time, improves maintainability
- **Tailwind CSS**: Rapid development, no CSS bloat with purge
- **Modular Structure**: Scalable, testable, and easy to maintain as the project grows
