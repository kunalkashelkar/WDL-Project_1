import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CartBadge } from "@/components/CartBadge";

/**
 * SERVER COMPONENT
 *
 * Statically renders navbar shell, brand logo, and navigation links.
 * Incorporates:
 * - <ThemeToggle /> (Client Component) for theme dropdown
 * - <CartBadge /> (Client Component) subscribed strictly to total item count
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-lg tracking-tight text-foreground transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            aria-label="CartFlow Home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              CF
            </span>
            <span>CartFlow</span>
          </Link>

          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-5 text-sm">
            <Link
              href="#products"
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-0.5"
            >
              Products
            </Link>
            <Link
              href="#cart"
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-0.5"
            >
              Cart Summary
            </Link>
            <Link
              href="#checkout"
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-0.5"
            >
              Checkout
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Accessible Theme Switcher */}
          <ThemeToggle />

          {/* Connected Cart Indicator Badge */}
          <CartBadge />
        </div>
      </div>
    </header>
  );
}
