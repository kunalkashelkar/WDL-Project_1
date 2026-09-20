import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { CheckoutSection } from "@/components/CheckoutSection";
import { CartSummary } from "@/components/CartSummary";
import { CartSummarySkeleton } from "@/components/CartSummarySkeleton";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Checkout — CartFlow",
  description: "Secure, type-safe checkout experience built with Next.js App Router and Server Actions.",
};

/**
 * Dedicated Checkout Page: /checkout
 *
 * Implements a balanced two-column desktop layout:
 * - Left Column: Checkout Details Form (Customer shipping and billing)
 * - Right Column: Order Summary & Review
 */
export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 container mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Store</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span>End-to-end encrypted checkout</span>
          </div>
        </div>

        {/* Two-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Checkout Form (7 cols) */}
          <div className="lg:col-span-7">
            <CheckoutSection />
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <aside className="lg:col-span-5 space-y-6" aria-label="Order Summary Column">
            <Suspense fallback={<CartSummarySkeleton />}>
              <CartSummary />
            </Suspense>

            {/* Security Assurance Card */}
            <div className="rounded-xl border border-border/80 bg-card/60 p-4 text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <Lock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span>Zero Risk Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                All transactions are verified server-side with strict Zod validation.
                30-day money-back guarantee with free domestic returns on all desk gear.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="mt-auto border-t border-border/80 bg-card py-6">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 CartFlow. Fullstack Development with Next.js Course Assignment.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-foreground transition-colors">Products</Link>
            <Link href="/checkout" className="hover:text-foreground transition-colors">Checkout</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
