# React Server Components (RSC) vs. Client Components Architecture

This document details the architectural boundaries between React Server Components and Client Components in the **CartFlow** Next.js application.

---

## 1. What RSC Means in This Project

In the Next.js App Router, components inside `src/app` and `src/components` are **React Server Components by default** unless explicitly opted into client rendering with the `"use client"` directive.

In CartFlow:
- **Server Components** execute exclusively on the Node.js runtime at build time or during request time. They stream static HTML, pre-render layouts, read static product datasets (`src/data/products.ts`), compute subtotals, and format typography without increasing the browser's JavaScript bundle size.
- **Client Components** are rendered on the server into initial HTML, and then hydrated on the client browser to attach interactive DOM event handlers (`onClick`, `onSubmit`), React state hooks (`useTransition`, `useSyncExternalStore`), and browser Web APIs (e.g. `matchMedia`, `localStorage`).

---

## 2. Component Inventory

### Server Components (`RSC`)
| File | Role & Justification |
| :--- | :--- |
| `src/app/layout.tsx` | Root document shell, Geist typography setup, and global `<head>` metadata. Stays on the server to optimize streaming and avoid bundling fonts on the client. |
| `src/app/page.tsx` | Main page view orchestrator. Passes static product data and coordinates the responsive grid layout without client overhead. Houses the `<Suspense>` boundary. |
| `src/components/Header.tsx` | Sticky brand navbar, accessibility landmarks (`<header>`, `<nav>`), and navigation anchors. Statically rendered. |
| `src/components/ProductList.tsx` | Renders product grid cards, descriptions, tags, stock counts, and prices entirely on the server. Isolates client interactivity down to leaf button components. |
| `src/components/CartSummarySkeleton.tsx` | Static loading skeleton rendered during Suspense fallbacks. |

### Client Components (`"use client"`)
| File | Why `"use client"` is Required |
| :--- | :--- |
| `src/components/theme-provider.tsx` | Wraps `next-themes`'s context provider, which accesses `window.matchMedia`, `localStorage`, and dynamically modifies classes on `document.documentElement`. |
| `src/components/ThemeToggle.tsx` | Interacts with `useTheme()` to dispatch theme changes (`light`, `dark`, `system`), controls open/closed state of the theme menu, and uses `useSyncExternalStore` to coordinate hydration. |
| `src/components/AddToCartButton.tsx` | Handles user interaction via `onClick` to trigger item addition and client state store dispatching (`useCartStore`). |
| `src/components/CartBadge.tsx` | Subscribes to `selectTotalItemCount` from the Zustand cart store to display the live indicator count in the header. |
| `src/components/CartSummary.tsx` | Subscribes to live cart items, subtotal calculations, and the clear cart action. Wrapped inside a `<Suspense>` boundary in `page.tsx`. |
| `src/components/CartItemControls.tsx` | Handles user interaction via `onClick` for quantity adjustments (`+` / `-`) and item removal (`trash`), updating live cart state. |
| `src/components/CheckoutSection.tsx` | Manages form state with React Hook Form, handles `useTransition` pending states for the Server Action, and renders success receipts / error toasts. |
| `src/components/ui/dropdown-menu.tsx` | Radix UI primitives requiring browser event listeners, keyboard traps (`Escape`, arrow navigation), and DOM portal mounting. |
| `src/components/ui/sonner.tsx` | Accessible toast container mounted inside layout to display notifications. |

---

## 3. Server → Client Boundary and Props Serialization

When a Server Component renders a Client Component, props cross a serialization boundary. 

### Rules Enforced:
1. **Only JSON-serializable primitives and plain objects** cross the boundary:
   - Strings: `productId`, `productName`
   - Numbers: `price`, `quantity`
   - Booleans: `emptyState`
2. **Forbidden across the boundary**:
   - Class instances
   - Functions and closures (e.g., callback handlers like `onClick={() => ...}` are never passed from a Server Component to a Client Component)
   - Database clients, secret tokens, or server-only handles

### Example Boundary:
```tsx
// Server Component: src/components/ProductList.tsx
<CardFooter>
  {/* Boundary: Only serializable primitives passed */}
  <AddToCartButton
    productId={product.id}
    productName={product.name}
    price={product.price}
  />
</CardFooter>
```

---

## 4. Hydration and How Unnecessary Hydration is Avoided

### What Hydration Means
Hydration is the process where React takes the pre-rendered HTML sent by the server, matches it against the virtual DOM created by the Client Components, and attaches browser event listeners (like click handlers and keyboard focus listeners).

### How Unnecessary Hydration is Prevented:
1. **Pushing `"use client"` to the Leaves**:
   - `page.tsx`, `layout.tsx`, and `ProductList.tsx` remain Server Components.
   - Catalog descriptions, badges, card layouts, and header landmarks are rendered as pure static HTML with zero hydration cost.
2. **Hydration Warning Management**:
   - `suppressHydrationWarning` is scoped strictly to `<html lang="en">` in `layout.tsx` because `next-themes` runs an inline theme-detection script prior to React hydration.
3. **Synchronous Store Hydration via `useSyncExternalStore`**:
   - Used inside `useMounted.ts` and `ThemeToggle.tsx` to detect client hydration without triggering cascading renders or React 19 `setState-in-effect` errors.
4. **Suspense Boundaries**:
   - `<Suspense fallback={<CartSummarySkeleton />}>` establishes an explicit streaming/hydration boundary around the interactive cart summary.

---

## 5. Component Tree

```text
RootLayout (Server Component) [src/app/layout.tsx]
└── <html> (suppressHydrationWarning)
    └── <body>
        └── ThemeProvider (Client Component) [src/components/theme-provider.tsx]
            ├── Toaster (Client Component / Sonner) [src/components/ui/sonner.tsx]
            └── Home (Server Component) [src/app/page.tsx]
                ├── Header (Server Component) [src/components/Header.tsx]
                │   ├── Link (Server Component / Next Link)
                │   ├── ThemeToggle (Client Component) [src/components/ThemeToggle.tsx]
                │   │   └── DropdownMenu (Client Component) [src/components/ui/dropdown-menu.tsx]
                │   └── CartBadge (Client Component) [src/components/CartBadge.tsx]
                │
                └── <main>
                    ├── Banner Section (Server Component)
                    │
                    ├── ProductList (Server Component) [src/components/ProductList.tsx]
                    │   └── Array.map(product =>
                    │       <article>
                    │           <Card> (Server Component)
                    │               <CardHeader /> (Server Component)
                    │               <CardContent /> (Server Component)
                    │               <CardFooter>
                    │                   └── AddToCartButton (Client Component) [src/components/AddToCartButton.tsx]
                    │               </CardFooter>
                    │           </Card>
                    │       </article>
                    │   )
                    │
                    └── <aside>
                        ├── Suspense (React Boundary)
                        │   └── fallback={<CartSummarySkeleton />} (Server Component)
                        │   └── CartSummary (Client Component) [src/components/CartSummary.tsx]
                        │       <Card>
                        │           └── Array.map(item =>
                        │               <li>
                        │                   <CartItemControls /> (Client Component)
                        │               </li>
                        │           )
                        │       </Card>
                        │
                        └── CheckoutSection (Client Component) [src/components/CheckoutSection.tsx]
                            <Card>
                                <form (React Hook Form + Zod)>
                                    <Input />, <Label />
                                </form>
                                └── [Server Action: processCheckout] ("use server")
                            </Card>
```
