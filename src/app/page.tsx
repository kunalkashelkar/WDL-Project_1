import React, { Suspense } from "react";
import { Header } from "@/components/Header";
import { ProductList } from "@/components/ProductList";
import { CartSummary } from "@/components/CartSummary";
import { CartSummarySkeleton } from "@/components/CartSummarySkeleton";
import { CheckoutSection } from "@/components/CheckoutSection";
import { SAMPLE_PRODUCTS } from "@/data/products";

/**
 * SERVER COMPONENT
 *
 * Demonstrates React Server Component architecture:
 * - Statically prerenders catalog and page shell.
 * - Employs a React <Suspense> boundary with a dedicated Skeleton fallback around <CartSummary />
 *   to establish an asynchronous client hydration boundary.
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 container mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {/* Intro banner */}
        <section aria-labelledby="page-heading" className="mb-10 space-y-4 rounded-2xl border border-border/80 bg-linear-to-b from-card/80 to-card/40 p-6 sm:p-8 shadow-xs backdrop-blur-xs">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            WDL Assignment 1 • Production Architecture
          </div>
          <h1 id="page-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            CartFlow <span className="text-primary">Checkout Experience</span>
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            A high-performance e-commerce technical demonstration powered by Next.js App Router,
            TypeScript, Tailwind CSS, shadcn/ui primitives, persistent Zustand state, and Next.js Server Actions.
          </p>
        </section>

        {/* Responsive layout: Products on the left, Cart & Checkout on the right/stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Products Column */}
          <div className="lg:col-span-7 xl:col-span-7">
            <ProductList products={SAMPLE_PRODUCTS} />
          </div>

          {/* Cart & Checkout Column with Suspense Boundary */}
          <aside className="lg:col-span-5 xl:col-span-5 space-y-8" aria-label="Order and Checkout sidebar">
            <Suspense fallback={<CartSummarySkeleton />}>
              <CartSummary />
            </Suspense>
            <CheckoutSection />
          </aside>
        </div>
      </main>

      <footer className="mt-auto border-t border-border/80 bg-background/50 py-6">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 CartFlow. Fullstack Development with Next.js Course Assignment.</p>
          <p>Built with Next.js App Router, Tailwind CSS, and shadcn/ui.</p>
        </div>
      </footer>
    </div>
  );
}
