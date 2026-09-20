# CartFlow — E-Commerce Checkout Application

A modern, production-grade Next.js App Router application built for **Assignment 1: Fullstack Development with Next.js**. Demonstrates React Server Components (RSC), client-side state management with Zustand, type-safe schema validation with Zod and React Hook Form, native Next.js Server Actions, accessible UI with shadcn/ui and Radix UI primitives, and dark/light theme switching.

---

## 1. Project Title & Overview

- **Project Title**: CartFlow
- **Course**: Fullstack Development with Next.js (WDL) — Assignment 1
- **Focus**: Server Components vs. Client Components, persistent Zustand store, Zod validation, Server Actions, and accessible UI.

---

## 2. Features Implemented

1. **Next.js App Router Foundation**:
   - Clean `src/` architecture with TypeScript, Tailwind CSS v4, and ESLint.
   - Strict separation of Server Components and Client Components.
2. **Accessible Modern UI with shadcn/ui**:
   - Built on Radix UI primitives (`Slot`, `Separator`, `Label`, `DropdownMenu`).
   - Accessible color palettes using OKLCH CSS variables for seamless light/dark theme transitions.
   - Semantic HTML landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
3. **Theme Switching (`next-themes`)**:
   - Supports **Light**, **Dark**, and **System** themes.
   - Persistent across page reloads via `localStorage`.
   - Hydration mismatch prevented via top-level `suppressHydrationWarning` and `useSyncExternalStore`.
4. **Persistent Shopping Cart (`Zustand`)**:
   - Stores `id`, `name`, `price`, and `quantity`.
   - Actions: `addItem`, `removeItem`, `incrementQuantity`, `decrementQuantity`, `clearCart`.
   - Derived atomic selectors: `selectTotalItemCount` and `selectSubtotal` to prevent unnecessary component re-renders.
   - Automatically persists state in browser `localStorage`.
5. **Type-Safe Checkout Form (`React Hook Form` + `Zod`)**:
   - Reusable schema in `src/lib/validations/checkout.ts`.
   - Validates `fullName`, `email`, `phone`, `address`, `city`, and `postalCode`.
   - Accessible inline validation error messaging linked via `aria-describedby` and `aria-invalid`.
6. **Native Next.js Server Action (`"use server"`)**:
   - Mutation handler in `src/actions/checkout.ts`.
   - Reuses the identical Zod schema on the server for authoritative validation (never trusts client validation).
   - Simulates realistic asynchronous mutation with latency.
   - Returns structured order confirmation with unique Order ID (`ORD-...`) and Reference (`REF-...`).
7. **Asynchronous UI & User Feedback**:
   - React `<Suspense>` boundary with a custom `<CartSummarySkeleton />` fallback.
   - `useTransition` pending state disabling inputs and displaying loading spinners.
   - Accessible error and success toast notifications using shadcn `sonner`.
   - Anti-spam guard blocking duplicate submissions during pending mutations.

---

## 3. Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Runtime / Language**: [TypeScript](https://www.typescriptlang.org/) & [Node.js](https://nodejs.org/)
- **UI & Primitives**: [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Client State**: [Zustand](https://zustand-demo.pmnd.rs/) with `persist` middleware
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) via `@hookform/resolvers`
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Toasts**: [Sonner](https://sonner.emilkowal.ski/)

---

## 4. Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/kunalkashelkar/WDL-Project_1.git
cd WDL-Project_1
npm install
```

---

## 5. Environment Variables

This assignment application runs entirely self-contained without external services, third-party databases, or API keys. **No `.env` configuration is required.**

---

## 6. Scripts & Commands

### Development Server
Starts the local development server with Turbopack on port 3000:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Linting
Checks code style and TypeScript rules using ESLint:
```bash
npm run lint
```

### Production Build
Compiles the optimized production bundle and generates static routes:
```bash
npm run build
```

### Production Server
Runs the compiled application locally:
```bash
npm run start
```

---

## 7. Project Architecture & Directory Structure

```text
WDL-Project_1/
├── docs/
│   ├── rsc-client-architecture.md  # Detailed RSC vs Client breakdown
│   ├── state-management.md         # Server state vs Zustand analysis
│   └── lighthouse-audit.md         # Core Web Vitals & a11y audit report
├── src/
│   ├── actions/
│   │   └── checkout.ts             # Server Action: authoritative checkout mutation
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css             # Tailwind v4 theme tokens & OKLCH variables
│   │   ├── layout.tsx              # Root Server Layout with Geist fonts & ThemeProvider
│   │   └── page.tsx                # Home Server Component with Suspense boundary
│   ├── components/
│   │   ├── ui/                     # shadcn UI primitives (button, card, input, etc.)
│   │   ├── AddToCartButton.tsx     # Client Component: add item button
│   │   ├── CartBadge.tsx           # Client Component: header badge count subscriber
│   │   ├── CartItemControls.tsx    # Client Component: item quantity controls (+/-)
│   │   ├── CartSummary.tsx         # Client Component: order summary & subtotal
│   │   ├── CartSummarySkeleton.tsx # Server Component: Suspense fallback skeleton
│   │   ├── CheckoutSection.tsx     # Client Component: RHF form & Server Action trigger
│   │   ├── Header.tsx              # Server Component: header bar with landmarks
│   │   ├── ProductList.tsx         # Server Component: static product catalog grid
│   │   ├── theme-provider.tsx      # Client Component: next-themes wrapper
│   │   └── ThemeToggle.tsx         # Client Component: light/dark/system dropdown
│   ├── data/
│   │   └── products.ts             # Static product catalog dataset
│   ├── hooks/
│   │   └── useMounted.ts           # Hydration hook using useSyncExternalStore
│   ├── lib/
│   │   ├── utils.ts                # cn utility
│   │   └── validations/
│   │       └── checkout.ts         # Shared Zod validation schema & TypeScript types
│   └── store/
│       └── useCartStore.ts         # Persistent Zustand store with atomic selectors
├── components.json                 # shadcn configuration
├── next.config.ts                  # Next.js configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## 8. Server Components vs. Client Components

- **Server Components (Default)**:
  - `layout.tsx`, `page.tsx`, `Header.tsx`, `ProductList.tsx`, and `CartSummarySkeleton.tsx` remain pure Server Components.
  - They execute exclusively on the server, streaming static HTML with zero JavaScript bundle overhead.
- **Client Components (`"use client"`)**:
  - Pushed down to the leaf boundaries (`AddToCartButton`, `CartItemControls`, `CartBadge`, `ThemeToggle`, `CheckoutSection`).
  - Only serializable primitives (`string`, `number`, `boolean`) cross the boundary. No class instances or functions are passed from server to client.

---

## 9. State Management (Zustand)

Located in [src/store/useCartStore.ts](file:///home/kunal/WDL/P1/WDL-Project_1/src/store/useCartStore.ts):
- Persisted to `localStorage` under key `"cartflow-storage"`.
- Uses atomic selectors (`selectTotalItemCount`, `selectSubtotal`, `selectAddItem`) to prevent unnecessary component re-renders.
- Uses `useMounted` (`useSyncExternalStore`) to guarantee consistent SSR markup and prevent hydration mismatches.

---

## 10. Form Validation (React Hook Form + Zod)

Located in [src/lib/validations/checkout.ts](file:///home/kunal/WDL/P1/WDL-Project_1/src/lib/validations/checkout.ts):
- Standardized schema validating `fullName`, `email`, `phone`, `address`, `city`, and `postalCode`.
- Wired to React Hook Form via `@hookform/resolvers/zod`.
- Accessible inline error alerts rendered below inputs with `aria-invalid` and `aria-describedby`.

---

## 11. Next.js Server Action Flow

Located in [src/actions/checkout.ts](file:///home/kunal/WDL/P1/WDL-Project_1/src/actions/checkout.ts):
1. User submits form in [src/components/CheckoutSection.tsx](file:///home/kunal/WDL/P1/WDL-Project_1/src/components/CheckoutSection.tsx).
2. React's `useTransition` sets `isPending = true` (disabling inputs, showing spinner, blocking spam clicks).
3. Payload is passed to `processCheckout(formData, items)` on the server.
4. Server parses the payload with `checkoutSchema.safeParse(formData)`:
   - If invalid: Returns structured field errors mapped back to form fields via `setError()`, and shows an error toast.
   - If valid: Calculates total, generates `ORD-...` and `REF-...` receipt numbers, returns confirmation, clears the Zustand cart, and shows a success toast.

---

## 12. How to Test the Application

1. **Add Items to Cart**: Click "Add to Cart" on any product card. Notice the header cart badge and order summary update immediately.
2. **Adjust Quantities**: Click `+` or `-` in the Cart Summary. Click the trash icon to remove an item. Click "Clear" to empty the cart.
3. **Verify Persistence**: Add products to your cart and reload the browser page (`Ctrl+R` / `Cmd+R`). The cart items and count persist.
4. **Test Theme Switching**: Click the theme toggle icon in the header. Select **Dark**, **Light**, or **System**. Refresh to verify theme persistence.
5. **Test Form Validation**:
   - Leave fields blank and click "Place Order". Observe inline accessible error messages.
   - Enter an invalid email (e.g. `invalid-email`) or invalid phone number.
6. **Test Successful Checkout**:
   - Fill in valid credentials (e.g. Name: `Jane Doe`, Email: `jane@example.com`, Phone: `555-012-3456`, Address: `123 University Way`, City: `San Jose`, Postal: `95192`).
   - Click "Place Order".
   - Notice the loading spinner, success toast notification, structured order receipt with Reference Number, and automatic cart reset.
