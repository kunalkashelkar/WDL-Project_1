import React, { Suspense } from "react";
import { Header } from "@/components/Header";
import { ProductList } from "@/components/ProductList";
import { CartSummary } from "@/components/CartSummary";
import { CartSummarySkeleton } from "@/components/CartSummarySkeleton";
import { SAMPLE_PRODUCTS } from "@/data/products";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 container mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10 space-y-12">
        {/* Modern Restrained Hero Section */}
        <section aria-labelledby="page-heading" className="space-y-6 rounded-2xl border border-border/80 bg-card p-6 sm:p-8 md:p-10 shadow-2xs">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Curated Workspace Hardware</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 id="page-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl sm:leading-tight">
              Simple shopping,{" "}
              <span className="text-primary">thoughtfully built.</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
              Explore products, manage your cart, and complete checkout through a type-safe Next.js workflow.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button asChild size="default" className="text-xs font-semibold gap-2 shadow-xs cursor-pointer">
              <a href="#products">
                <span>Browse Products</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" size="default" className="text-xs font-medium cursor-pointer">
              <Link href="/checkout">
                Direct to Checkout
              </Link>
            </Button>
          </div>

          {/* Value Props Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border/60 text-xs text-muted-foreground">
            <div className="flex items-center gap-2.5">
              <Truck className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <span>Complimentary 2-day delivery</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <span>2-year manufacturer warranty</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RefreshCw className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <span>30-day hassle-free returns</span>
            </div>
          </div>
        </section>

        {/* Catalog & Quick Cart Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Product Catalog (8 cols) */}
          <div className="lg:col-span-8">
            <ProductList products={SAMPLE_PRODUCTS} />
          </div>

          {/* Quick Cart Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6" aria-label="Cart Summary sidebar">
            <Suspense fallback={<CartSummarySkeleton />}>
              <CartSummary />
            </Suspense>
          </aside>
        </div>
      </main>

      <footer className="mt-auto border-t border-border/80 bg-card py-8">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-[10px]">
              CF
            </span>
            <span className="font-medium text-foreground">CartFlow</span>
            <span>— Fullstack Development with Next.js Course Project.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#products" className="hover:text-foreground transition-colors">Products</a>
            <Link href="/checkout" className="hover:text-foreground transition-colors">Checkout</Link>
            <span className="text-[11px] text-muted-foreground/80">WDL Assignment 1</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
