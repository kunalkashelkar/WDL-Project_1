import React from "react";
import { Header } from "@/components/Header";
import { ProductList } from "@/components/ProductList";
import { CartSummary, CartItem } from "@/components/CartSummary";
import { CheckoutSection } from "@/components/CheckoutSection";
import { SAMPLE_PRODUCTS } from "@/data/products";

export default function Home() {
  // Demonstration cart state (static for this step as required, no Zustand yet)
  const sampleCartItems: CartItem[] = [
    {
      product: SAMPLE_PRODUCTS[0], // Ergonomic Mechanical Keyboard
      quantity: 1,
    },
    {
      product: SAMPLE_PRODUCTS[3], // Desk Mat Wool Felt & Vegan Leather
      quantity: 1,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header cartCount={sampleCartItems.reduce((sum, item) => sum + item.quantity, 0)} />

      <main className="flex-1 container mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {/* Intro banner */}
        <section aria-labelledby="page-heading" className="mb-8 space-y-2 border-b border-border pb-6">
          <div className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            WDL Assignment 1 Foundation
          </div>
          <h1 id="page-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            CartFlow Checkout Experience
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed">
            A simple, accessible e-commerce foundation built with Next.js App Router,
            TypeScript, Tailwind CSS, and shadcn/ui. Demonstrating accessible product catalogs,
            order summaries, and checkout workflows.
          </p>
        </section>

        {/* Responsive layout: Products on the left, Cart & Checkout on the right/stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Products Column */}
          <div className="lg:col-span-7 xl:col-span-7">
            <ProductList products={SAMPLE_PRODUCTS} />
          </div>

          {/* Cart & Checkout Column */}
          <aside className="lg:col-span-5 xl:col-span-5 space-y-8" aria-label="Order and Checkout sidebar">
            <CartSummary items={sampleCartItems} />
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
